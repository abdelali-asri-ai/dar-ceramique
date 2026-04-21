const POINTS: { title: string; text: string }[] = [
  {
    title: "Taillé à la main",
    text: "Chaque fragment est frappé par un maâlem du Maroc, à la massette tranchante.",
  },
  {
    title: "Livraison Europe",
    text: "Emballage double protection · 10 jours ouvrés · frais offerts dès 300 €.",
  },
  {
    title: "Échantillon offert",
    text: "Demandez jusqu'à 3 teintes à tester en situation, sous 48 h.",
  },
  {
    title: "Paiement sécurisé",
    text: "Stripe, 3D Secure, chiffrement SSL — 100 % des commandes.",
  },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Nos engagements"
      className="relative border-y border-charcoal/10 bg-cream/60"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-charcoal/10 px-6 md:grid-cols-4 md:divide-x md:px-0">
        {POINTS.map((p, i) => (
          <div
            key={p.title}
            className={[
              "flex flex-col gap-2 px-6 py-8 md:px-8",
              i < 2 ? "border-b border-charcoal/10 md:border-b-0" : "",
              i % 2 === 0 ? "border-r border-charcoal/10 md:border-r-0" : "",
            ].join(" ")}
          >
            <span className="font-serif text-[0.65rem] uppercase tracking-[0.3em] text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-lg leading-tight text-charcoal">
              {p.title}
            </h3>
            <p className="text-[0.75rem] leading-relaxed text-charcoal/60">
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
