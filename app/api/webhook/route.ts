import { NextResponse } from "next/server";
import type Stripe from "stripe";

import {
  sendAtelierNotification,
  sendOrderConfirmation,
  type OrderSummary,
} from "@/lib/email";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !secret) {
    // Pas configuré → on répond 200 pour que Stripe n'insiste pas en dev.
    return NextResponse.json({ received: true, mode: "demo" });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("[webhook] signature verification failed", err);
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const order = await buildOrderSummary(stripe, session);
      await Promise.all([
        sendOrderConfirmation(order),
        sendAtelierNotification(order),
      ]);
    } catch (err) {
      console.error("[webhook] post-processing failed", err);
    }
  }

  return NextResponse.json({ received: true });
}

async function buildOrderSummary(
  stripe: Stripe,
  session: Stripe.Checkout.Session
): Promise<OrderSummary> {
  const reference =
    session.client_reference_id ?? session.metadata?.reference ?? session.id;

  const customerName =
    session.customer_details?.name ??
    session.shipping_details?.name ??
    "Client";
  const customerEmail =
    session.customer_details?.email ??
    session.customer_email ??
    "";

  const li = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ["data.price.product"],
  });

  const lines = li.data.map((item) => {
    const product = item.price?.product as Stripe.Product | undefined;
    const meta = product?.metadata ?? {};
    const unit = meta.unit === "m2" ? "m²" : "carreau";
    return {
      name: item.description ?? product?.name ?? "Article",
      qty: item.quantity ?? 1,
      unit,
      lineTotal: (item.amount_total ?? 0) / 100,
    };
  });

  const total = (session.amount_total ?? 0) / 100;
  // Les montants transmis à Stripe sont TTC (HT × 1.2), on inverse proprement.
  const subtotal = total / 1.2;
  const tax = total - subtotal;

  return {
    reference,
    customerEmail,
    customerName,
    lines,
    subtotal,
    tax,
    total,
  };
}
