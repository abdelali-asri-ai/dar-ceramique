import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { PRODUCTS_BY_SLUG } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Incoming {
  lines: { slug: string; qty: number }[];
  email?: string;
  name?: string;
}

export async function POST(req: Request) {
  let body: Incoming;
  try {
    body = (await req.json()) as Incoming;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const lines = Array.isArray(body.lines) ? body.lines : [];
  if (lines.length === 0) {
    return NextResponse.json({ error: "empty_cart" }, { status: 400 });
  }

  const resolved = lines
    .map((l) => {
      const product = PRODUCTS_BY_SLUG[l.slug];
      if (!product) return null;
      const qty = Math.max(1, Math.floor(Number(l.qty) || 0));
      return { product, qty };
    })
    .filter((x): x is { product: NonNullable<ReturnType<typeof findProduct>>; qty: number } => x !== null);

  if (resolved.length === 0) {
    return NextResponse.json({ error: "no_valid_lines" }, { status: 400 });
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    req.headers.get("origin") ??
    "http://localhost:3000";

  const reference = `ZLJ-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;

  const stripe = getStripe();

  // ---------- Mode démo : Stripe non configuré ----------
  if (!stripe) {
    return NextResponse.json({
      demo: true,
      reference,
      sessionUrl: `${origin}/commande/succes?demo=1&ref=${encodeURIComponent(reference)}`,
    });
  }

  // ---------- Mode production : Stripe Checkout Session ----------
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: body.email,
      line_items: resolved.map(({ product, qty }) => ({
        quantity: qty,
        price_data: {
          currency: "eur",
          // Stripe prend le prix en centimes. Le prix catalogue est HT :
          // on applique la TVA 20 % pour un TTC cohérent côté paiement.
          unit_amount: Math.round(product.price * 1.2 * 100),
          product_data: {
            name: product.name,
            description: product.subtitle,
            images: [`${origin}${product.image}`],
            metadata: {
              sku: product.sku,
              unit: product.unit,
              category: product.category,
            },
          },
        },
      })),
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "LU", "CH", "DE", "ES", "IT", "NL", "PT", "GB", "MA"],
      },
      locale: "fr",
      client_reference_id: reference,
      metadata: {
        reference,
        internal_order_id: randomUUID(),
      },
      success_url: `${origin}/commande/succes?session_id={CHECKOUT_SESSION_ID}&ref=${encodeURIComponent(reference)}`,
      cancel_url: `${origin}/commande/annule`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "stripe_no_url" }, { status: 502 });
    }

    return NextResponse.json({
      demo: false,
      reference,
      sessionUrl: session.url,
    });
  } catch (err) {
    console.error("[checkout] stripe error", err);
    return NextResponse.json({ error: "stripe_failed" }, { status: 502 });
  }
}

function findProduct(slug: string) {
  return PRODUCTS_BY_SLUG[slug];
}
