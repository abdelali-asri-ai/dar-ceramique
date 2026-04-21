import Stripe from "stripe";

/**
 * Client Stripe côté serveur. Instancié paresseusement pour éviter
 * de planter au build quand la clé n'est pas encore renseignée.
 *
 * Retourne `null` si STRIPE_SECRET_KEY est absent — l'API checkout
 * bascule alors en mode démo.
 */
let cached: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (cached !== undefined) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.startsWith("sk_test_...") || key === "") {
    cached = null;
    return null;
  }
  cached = new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    appInfo: {
      name: "DAR CERAMIQUE",
      url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://darceramique.com",
    },
  });
  return cached;
}

export function isStripeConfigured(): boolean {
  return getStripe() !== null;
}
