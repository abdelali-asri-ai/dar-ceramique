import { type ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

interface LegalLayoutProps {
  kicker: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalLayout({
  kicker,
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <main className="relative bg-cream">
      <Header />

      <section className="relative border-b border-charcoal/10 pb-10 pt-40 md:pt-44">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
            {kicker}
          </span>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-charcoal md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-charcoal/50">
            Mis à jour le {lastUpdated}
          </p>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <article className="prose-legal mx-auto max-w-3xl px-6 text-base leading-relaxed text-charcoal/80 md:px-10">
          {children}
        </article>
      </section>

      <Footer />
    </main>
  );
}
