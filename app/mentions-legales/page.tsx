import type { Metadata } from "next";

import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales · DAR CERAMIQUE",
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout kicker="Légal" title="Mentions légales" lastUpdated="17 avril 2026">
      <h2>Éditeur du site</h2>
      <p>
        <strong>DAR CERAMIQUE</strong> — atelier artisanal de zellige, immatriculé au Maroc (Maroc).
        <br />
        Siège : FCXR+736, Unnamed Road, Bouskoura, Casablanca — Maroc.
      </p>
      <p>
        Directeur de la publication : Abdelali Asri.
        <br />
        Contact : <a href="mailto:abdelali.asri.tr@gmail.com">abdelali.asri.tr@gmail.com</a>
      </p>

      <h2>Hébergement</h2>
      <p>
        Ce site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site — textes, photographies, motifs vectoriels, compositions, code — est la propriété exclusive de DAR CERAMIQUE, protégée par les lois en vigueur sur la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, modification ou adaptation, partielle ou intégrale, sans autorisation écrite préalable, est strictement interdite.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Les données collectées via les formulaires de commande et de contact sont traitées dans les conditions décrites sur la page <a href="/confidentialite">Confidentialité</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site n'utilise pas de cookies publicitaires. Seuls des cookies techniques strictement nécessaires au fonctionnement (panier, préférences) sont déposés.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Le présent site est régi par le droit français pour les commandes passées depuis l'Union européenne. Tout litige relève de la juridiction compétente.
      </p>
    </LegalLayout>
  );
}
