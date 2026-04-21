"use client";

import Link from "next/link";
import { useState } from "react";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Boutique",
    links: [
      { label: "Tout le catalogue", href: "/boutique" },
      { label: "Carreaux unis", href: "/boutique" },
      { label: "Motifs composés", href: "/boutique" },
      { label: "Panier", href: "/panier" },
    ],
  },
  {
    title: "Atelier",
    links: [
      { label: "Savoir-faire", href: "/#atelier" },
      { label: "Collections", href: "/#collections" },
      { label: "Configurateur", href: "/#custom" },
      { label: "Galerie", href: "/#galerie" },
    ],
  },
  {
    title: "Maison",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Échantillons", href: "/contact" },
      { label: "Presse", href: "/contact" },
      { label: "Projets sur-mesure", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer id="contact" className="relative border-t border-charcoal/10 bg-cream">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-charcoal/20">
                <span className="h-4 w-4 rotate-45 bg-gold" />
              </span>
              <span className="font-serif text-2xl tracking-wide text-charcoal">
                DAR CERAMIQUE<span className="text-gold">.</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-charcoal/65">
              Atelier paramétrique de zellige, entre les médinas du Maroc et le web. Chaque fragment est taillé, émaillé et cuit à la main — puis scellé dans le motif que vous avez choisi.
            </p>

            <form onSubmit={handleNewsletter} className="mt-8 max-w-sm">
              <label className="text-[0.6rem] uppercase tracking-[0.3em] text-charcoal/55">
                Lettre de l'atelier
              </label>
              <div className="mt-3 flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="votre@email.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full border border-charcoal/20 bg-cream px-5 py-3 font-serif text-sm text-charcoal placeholder:text-charcoal/35 focus:border-charcoal focus:outline-none"
                  aria-label="Adresse email pour la newsletter"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-[0.65rem] uppercase tracking-[0.26em] text-cream transition hover:bg-charcoal/90"
                >
                  {submitted ? "Merci ✓" : "S'abonner"}
                </button>
              </div>
              <p className="mt-3 text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/40">
                Une lettre trimestrielle — pas de spam, jamais.
              </p>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[0.65rem] uppercase tracking-[0.3em] text-charcoal/60">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-charcoal/75">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 transition hover:text-charcoal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-t border-charcoal/10 pt-10 md:grid-cols-3">
          <InfoBlock label="Adresse" value={`FCXR+736, Unnamed Road, Bouskoura\nCasablanca — Maroc`} />
          <InfoBlock label="Email" value="atelier@darceramique.com" href="mailto:atelier@darceramique.com" />
          <InfoBlock label="Téléphone" value="+212 5 35 00 00 00" href="tel:+212535000000" />
        </div>
      </div>

      <div className="border-t border-charcoal/10 bg-cream/70 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-[0.6rem] uppercase tracking-[0.3em] text-charcoal/50 md:flex-row md:px-10">
          <span>© {new Date().getFullYear()} DAR CERAMIQUE · Artisans du Maroc</span>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="hover:text-charcoal">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-charcoal">CGV</Link>
            <Link href="/confidentialite" className="hover:text-charcoal">Confidentialité</Link>
          </div>
          <div className="flex items-center gap-4">
            <Social label="Instagram" href="https://instagram.com">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-4 w-4">
                <rect x="3" y="3" width="14" height="14" rx="4" />
                <circle cx="10" cy="10" r="3.5" />
                <circle cx="14.5" cy="5.5" r="0.8" fill="currentColor" />
              </svg>
            </Social>
            <Social label="Pinterest" href="https://pinterest.com">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-4 w-4">
                <circle cx="10" cy="10" r="7.5" />
                <path d="M9 6c3 0 4.5 2 4.5 4s-1.5 4-3.5 4c-0.5 0-1-0.2-1-0.2s-0.5 2-0.6 2.3" />
              </svg>
            </Social>
          </div>
        </div>
      </div>
    </footer>
  );
}

function InfoBlock({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="mt-2 block whitespace-pre-line font-serif text-lg text-charcoal">
      {value}
    </span>
  );
  return (
    <div>
      <span className="text-[0.6rem] uppercase tracking-[0.28em] text-charcoal/50">
        {label}
      </span>
      {href ? (
        <a href={href} className="transition hover:text-gold">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

function Social({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="grid h-8 w-8 place-items-center rounded-full border border-charcoal/20 text-charcoal/70 transition hover:border-charcoal hover:text-charcoal"
    >
      {children}
    </a>
  );
}
