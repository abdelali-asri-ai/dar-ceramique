"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { PRODUCTS_BY_SLUG, type Product } from "./products";

const STORAGE_KEY = "darceramique.cart.v1";

/** Ligne panier compacte — on ne persiste que le slug et la quantité. */
interface PersistedLine {
  slug: string;
  qty: number;
}

export interface CartItem {
  product: Product;
  qty: number;
  /** Sous-total HT de la ligne (prix × qty). */
  lineTotal: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number; // HT
  tax: number; // TVA 20 %
  total: number; // TTC
}

interface CartState {
  lines: PersistedLine[];
  /** Évite d'écrire en localStorage avant la 1re hydratation. */
  hydrated: boolean;
}

type CartAction =
  | { type: "hydrate"; lines: PersistedLine[] }
  | { type: "add"; slug: string; qty: number }
  | { type: "set-qty"; slug: string; qty: number }
  | { type: "remove"; slug: string }
  | { type: "clear" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, hydrated: true };
    case "add": {
      const existing = state.lines.find((l) => l.slug === action.slug);
      const lines = existing
        ? state.lines.map((l) =>
            l.slug === action.slug
              ? { ...l, qty: Math.max(1, l.qty + action.qty) }
              : l
          )
        : [...state.lines, { slug: action.slug, qty: Math.max(1, action.qty) }];
      return { ...state, lines };
    }
    case "set-qty": {
      if (action.qty <= 0) {
        return {
          ...state,
          lines: state.lines.filter((l) => l.slug !== action.slug),
        };
      }
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.slug === action.slug ? { ...l, qty: action.qty } : l
        ),
      };
    }
    case "remove":
      return {
        ...state,
        lines: state.lines.filter((l) => l.slug !== action.slug),
      };
    case "clear":
      return { ...state, lines: [] };
    default:
      return state;
  }
}

export const TAX_RATE = 0.2;

interface CartContextValue {
  items: CartItem[];
  totals: CartTotals;
  hydrated: boolean;
  addItem: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    lines: [],
    hydrated: false,
  });

  // Hydratation depuis localStorage (côté client uniquement)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed: PersistedLine[] = raw ? JSON.parse(raw) : [];
      const valid = Array.isArray(parsed)
        ? parsed.filter(
            (l): l is PersistedLine =>
              typeof l?.slug === "string" &&
              typeof l?.qty === "number" &&
              !!PRODUCTS_BY_SLUG[l.slug]
          )
        : [];
      dispatch({ type: "hydrate", lines: valid });
    } catch {
      dispatch({ type: "hydrate", lines: [] });
    }
  }, []);

  // Persistance
  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* quota ou mode privé — on ignore */
    }
  }, [state.lines, state.hydrated]);

  const items = useMemo<CartItem[]>(() => {
    return state.lines
      .map((l) => {
        const product = PRODUCTS_BY_SLUG[l.slug];
        if (!product) return null;
        return {
          product,
          qty: l.qty,
          lineTotal: product.price * l.qty,
        } satisfies CartItem;
      })
      .filter((x): x is CartItem => x !== null);
  }, [state.lines]);

  const totals = useMemo<CartTotals>(() => {
    const subtotal = items.reduce((sum, it) => sum + it.lineTotal, 0);
    const itemCount = items.reduce((sum, it) => sum + it.qty, 0);
    const tax = subtotal * TAX_RATE;
    return {
      itemCount,
      subtotal,
      tax,
      total: subtotal + tax,
    };
  }, [items]);

  const addItem = useCallback(
    (slug: string, qty = 1) => dispatch({ type: "add", slug, qty }),
    []
  );
  const setQty = useCallback(
    (slug: string, qty: number) => dispatch({ type: "set-qty", slug, qty }),
    []
  );
  const remove = useCallback(
    (slug: string) => dispatch({ type: "remove", slug }),
    []
  );
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totals,
      hydrated: state.hydrated,
      addItem,
      setQty,
      remove,
      clear,
    }),
    [items, totals, state.hydrated, addItem, setQty, remove, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart doit être utilisé dans un <CartProvider>.");
  }
  return ctx;
}

/** Hook silencieux quand rendu hors provider (utile pour UI optionnelle). */
export function useCartSafe(): CartContextValue | null {
  return useContext(CartContext);
}
