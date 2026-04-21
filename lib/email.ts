import { Resend } from "resend";

/**
 * Emails transactionnels — Resend en prod, console.log en dev sans clé.
 * On ne bloque jamais une commande sur un échec d'envoi d'email.
 */

let cached: Resend | null | undefined;

function getResend(): Resend | null {
  if (cached !== undefined) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key || key.startsWith("re_...") || key === "") {
    cached = null;
    return null;
  }
  cached = new Resend(key);
  return cached;
}

export interface OrderSummary {
  reference: string;
  customerEmail: string;
  customerName: string;
  lines: { name: string; qty: number; unit: string; lineTotal: number }[];
  subtotal: number;
  tax: number;
  total: number;
}

const euro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

function renderLinesText(order: OrderSummary): string {
  return order.lines
    .map(
      (l) =>
        `  · ${l.name} — ${l.qty} ${l.unit} — ${euro.format(l.lineTotal)}`
    )
    .join("\n");
}

function renderOrderHtml(order: OrderSummary, headline: string): string {
  const rows = order.lines
    .map(
      (l) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1A1A1A;font-family:serif;">${l.name}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;text-align:center;">${l.qty} ${l.unit}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1A1A1A;font-family:serif;text-align:right;">${euro.format(l.lineTotal)}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#FDFCF8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1A1A1A;">
  <div style="max-width:560px;margin:40px auto;padding:32px;background:#fff;border:1px solid #eee;border-radius:16px;">
    <div style="text-align:center;margin-bottom:28px;">
      <div style="display:inline-block;width:42px;height:42px;border-radius:50%;background:#1A1A1A;position:relative;">
        <div style="position:absolute;top:50%;left:50%;width:16px;height:16px;background:#D4AF37;transform:translate(-50%,-50%) rotate(45deg);"></div>
      </div>
      <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;margin:16px 0 0;color:#1A1A1A;font-weight:500;">DAR CERAMIQUE<span style="color:#D4AF37;">.</span></h1>
    </div>
    <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;margin:0 0 8px;color:#1A1A1A;">${headline}</h2>
    <p style="color:#666;font-size:14px;line-height:1.6;margin:0 0 24px;">Bonjour ${order.customerName}, voici le récapitulatif de votre commande <strong>${order.reference}</strong>.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <thead>
        <tr>
          <th style="padding-bottom:10px;text-align:left;text-transform:uppercase;letter-spacing:0.18em;font-size:10px;color:#888;">Article</th>
          <th style="padding-bottom:10px;text-align:center;text-transform:uppercase;letter-spacing:0.18em;font-size:10px;color:#888;">Qté</th>
          <th style="padding-bottom:10px;text-align:right;text-transform:uppercase;letter-spacing:0.18em;font-size:10px;color:#888;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;">
      <div style="display:flex;justify-content:space-between;font-size:13px;color:#666;margin:4px 0;"><span>Sous-total HT</span><span style="font-family:'Cormorant Garamond',Georgia,serif;">${euro.format(order.subtotal)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:13px;color:#666;margin:4px 0;"><span>TVA 20 %</span><span style="font-family:'Cormorant Garamond',Georgia,serif;">${euro.format(order.tax)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:18px;color:#1A1A1A;margin:12px 0 0;padding-top:12px;border-top:1px solid #eee;"><strong>Total TTC</strong><strong style="font-family:'Cormorant Garamond',Georgia,serif;color:#D4AF37;">${euro.format(order.total)}</strong></div>
    </div>
    <p style="margin-top:28px;font-size:12px;color:#888;line-height:1.6;">Nos maâlems préparent votre commande au Maroc. Livraison estimée sous 10 jours ouvrés. Pour toute question, répondez simplement à cet email.</p>
    <div style="margin-top:32px;padding-top:20px;border-top:1px solid #eee;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.28em;color:#888;">Artisans du Maroc · depuis 1924</div>
  </div>
</body></html>`;
}

/** Envoi de l'email client (confirmation de commande). */
export async function sendOrderConfirmation(order: OrderSummary): Promise<void> {
  const resend = getResend();
  const from = process.env.EMAIL_FROM ?? "DAR CERAMIQUE <onboarding@resend.dev>";

  if (!resend) {
    console.log("[email:demo] Commande confirmée →", order.customerEmail);
    console.log("[email:demo]\n" + renderLinesText(order));
    return;
  }

  try {
    await resend.emails.send({
      from,
      to: order.customerEmail,
      subject: `Commande ${order.reference} confirmée — DAR CERAMIQUE`,
      html: renderOrderHtml(order, "Votre commande est confirmée"),
    });
  } catch (err) {
    console.error("[email] client send failed", err);
  }
}

/** Notification interne pour l'atelier. */
export async function sendAtelierNotification(order: OrderSummary): Promise<void> {
  const resend = getResend();
  const to = process.env.EMAIL_TO ?? "abdelali.asri.tr@gmail.com";
  const from = process.env.EMAIL_FROM ?? "DAR CERAMIQUE <onboarding@resend.dev>";

  if (!resend) {
    console.log(`[email:demo] Nouvelle commande ${order.reference} pour ${to}`);
    return;
  }

  try {
    await resend.emails.send({
      from,
      to,
      subject: `Nouvelle commande ${order.reference} — ${order.customerName}`,
      html: renderOrderHtml(order, `Nouvelle commande — ${order.customerName}`),
    });
  } catch (err) {
    console.error("[email] atelier send failed", err);
  }
}
