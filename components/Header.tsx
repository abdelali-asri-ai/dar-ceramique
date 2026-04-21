"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useCart } from "@/lib/cart";

const NAV = [
  { label: "Boutique", href: "/boutique" },
  { label: "Collections", href: "/#collections" },
  { label: "Atelier", href: "/#atelier" },
  { label: "Sur-mesure", href: "/#custom" },
  { label: "Galerie", href: "/#galerie" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totals, hydrated } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const count = hydrated ? totals.itemCount : 0;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "bg-cream/70 backdrop-blur-xl backdrop-saturate-150 border-b border-charcoal/10 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <Link
            href="/"
            className="group flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/logo-artisans.png"
              alt="Artisans du Patrimoine Marocain"
              width={160}
              height={56}
              className="h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-widest text-charcoal/70 transition hover:text-charcoal"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CartButton count={count} />

            <Link
              href="/boutique"
              className="hidden rounded-full bg-charcoal px-5 py-2.5 text-xs uppercase tracking-widest text-cream transition hover:bg-charcoal/90 md:inline-flex"
            >
              Boutique
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-charcoal/20 md:hidden"
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={[
                    "absolute left-0 top-0 h-px w-4 bg-charcoal transition",
                    menuOpen ? "translate-y-1.5 rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-1.5 h-px w-4 bg-charcoal transition",
                    menuOpen ? "opacity-0" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-3 h-px w-4 bg-charcoal transition",
                    menuOpen ? "-translate-y-1.5 -rotate-45" : "",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-cream md:hidden"
          >
            <nav className="flex h-full flex-col justify-between px-8 pb-10 pt-28">
              <ul className="space-y-5">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between border-b border-charcoal/10 pb-4"
                    >
                      <span className="font-serif text-3xl text-charcoal">
                        {item.label}
                      </span>
                      <span className="text-charcoal/40 transition group-hover:text-charcoal">
                        →
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-charcoal/50">
                <span>Maroc</span>
                <span>Depuis 1924</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CartButton({ count }: { count: number }) {
  return (
    <Link
      href="/panier"
      aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-charcoal/20 text-charcoal transition hover:border-charcoal"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M2 3h2l1.2 8.2a1 1 0 0 0 1 .8h5.6a1 1 0 0 0 1-.8L14 5H5" />
        <circle cx="6.5" cy="14" r="0.8" />
        <circle cx="11.5" cy="14" r="0.8" />
      </svg>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 520, damping: 22 }}
            className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 font-serif text-[0.7rem] tabular-nums text-charcoal"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
