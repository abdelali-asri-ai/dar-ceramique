"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Status = "idle" | "sending" | "sent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => window.setTimeout(r, 700));
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Prénom" name="firstName" required autoComplete="given-name" />
        <Input label="Nom" name="lastName" required autoComplete="family-name" />
      </div>
      <Input label="Email" name="email" type="email" required autoComplete="email" />
      <Input label="Sujet" name="subject" required />

      <label className="relative block">
        <textarea
          name="message"
          required
          rows={5}
          placeholder=" "
          className="peer w-full rounded-xl border border-charcoal/15 bg-cream px-4 pb-3 pt-7 font-serif text-base leading-relaxed text-charcoal placeholder-transparent transition focus:border-charcoal focus:outline-none"
        />
        <span className="pointer-events-none absolute left-4 top-2.5 text-[0.55rem] uppercase tracking-[0.28em] text-charcoal/55">
          Votre message
        </span>
      </label>

      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/45">
          Réponse sous 48 h ouvrées
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-3 rounded-full bg-charcoal px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-cream transition hover:bg-charcoal/90 disabled:opacity-70"
        >
          {status === "sending" ? "Envoi…" : "Envoyer le message"}
          <span aria-hidden>→</span>
        </button>
      </div>

      <AnimatePresence>
        {status === "sent" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 inline-flex items-center gap-3 rounded-full bg-charcoal/95 py-2 pl-2 pr-4 text-cream"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-charcoal">
              ✓
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.28em]">
              Message reçu — merci
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Input({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="relative block">
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full rounded-xl border border-charcoal/15 bg-cream px-4 pb-2.5 pt-6 font-serif text-base text-charcoal placeholder-transparent transition focus:border-charcoal focus:outline-none"
      />
      <span className="pointer-events-none absolute left-4 top-2 text-[0.55rem] uppercase tracking-[0.28em] text-charcoal/55">
        {label}
      </span>
    </label>
  );
}
