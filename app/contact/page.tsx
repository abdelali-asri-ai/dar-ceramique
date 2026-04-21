import type { Metadata } from "next";

import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ZelligeTiling from "@/components/ZelligeTiling";
import { getCollection } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Contact · DAR CERAMIQUE",
  description: "Contactez l'atelier du Maroc — devis, projets sur-mesure, visite de l'atelier.",
};

const NIGHT_PALETTE = getCollection("midnight-casablanca")!.palette;

export default function ContactPage() {
  return (
    <main className="relative bg-cream">
      <Header />

      <section className="relative border-b border-charcoal/10 pb-10 pt-40 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
            Contact
          </span>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] text-charcoal md:text-6xl">
            Écrivez à l'atelier
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/70">
            Devis sur-mesure, visite de l'atelier du Maroc, échantillons, presse — nous répondons à chaque demande sous 48 h.
          </p>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-[1.2fr_1fr] md:px-10">
          <ContactForm />

          <aside className="relative overflow-hidden rounded-3xl bg-charcoal text-cream">
            <div className="absolute inset-0 opacity-40">
              <ZelligeTiling colors={NIGHT_PALETTE} gridSize={3} />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/80 to-charcoal/40"
            />
            <div className="relative flex h-full flex-col justify-between gap-10 p-9">
              <div>
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">
                  L'atelier
                </span>
                <h3 className="mt-3 font-serif text-3xl">Maroc</h3>
                <p className="mt-4 text-sm leading-relaxed text-cream/70">
                  FCXR+736, Unnamed Road, Bouskoura, Casablanca — Maroc. Visites sur rendez-vous, du mardi au samedi.
                </p>
              </div>

              <dl className="space-y-5 text-sm">
                <InfoRow label="Email" value="atelier@darceramique.com" href="mailto:atelier@darceramique.com" />
                <InfoRow label="Téléphone" value="+212 5 35 00 00 00" href="tel:+212535000000" />
                <InfoRow label="WhatsApp" value="+212 6 00 00 00 00" href="https://wa.me/212600000000" />
              </dl>

              <div className="flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.28em] text-cream/50">
                <span>Instagram</span>
                <span className="h-px flex-1 bg-cream/15" />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-gold"
                >
                  @darceramique
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div>
      <dt className="text-[0.6rem] uppercase tracking-[0.26em] text-cream/50">
        {label}
      </dt>
      <dd className="mt-1">
        <a href={href} className="font-serif text-xl text-cream transition hover:text-gold">
          {value}
        </a>
      </dd>
    </div>
  );
}
