import type { Metadata } from "next";

import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Conditions générales de vente · DAR CERAMIQUE",
};

export default function CGVPage() {
  return (
    <LegalLayout
      kicker="Vente"
      title="Conditions générales de vente"
      lastUpdated="17 avril 2026"
    >
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent les ventes de carreaux de zellige et de motifs composés entre <strong>DAR CERAMIQUE</strong> (le « Vendeur ») et toute personne physique ou morale (le « Client ») passant commande sur <a href="https://darceramique.com">darceramique.com</a>.
      </p>

      <h2>2. Produits</h2>
      <p>
        Les produits sont fabriqués à la main au Maroc. Chaque pièce présente de légères variations de teinte, de brillance et de craquelure — caractéristiques inhérentes à l'émail artisanal et faisant partie intégrante de la valeur du produit. Ces variations ne constituent pas un défaut.
      </p>

      <h2>3. Prix</h2>
      <p>
        Les prix sont affichés en euros. Les carreaux unis sont facturés à l'unité, les motifs composés au mètre carré. La TVA applicable (20 % en France) est calculée automatiquement à l'étape du paiement. Les frais de livraison sont offerts dès 300 € TTC ; ils sont affichés avant validation finale.
      </p>

      <h2>4. Commande</h2>
      <p>
        Toute commande vaut acceptation des présentes conditions. Le Client reçoit un email de confirmation dès validation du paiement. L'atelier se réserve le droit d'annuler une commande en cas de rupture de stock prolongée, avec remboursement intégral.
      </p>

      <h2>5. Paiement</h2>
      <p>
        Les paiements sont traités par <strong>Stripe Payments Europe, Ltd.</strong> via connexion chiffrée (SSL 256 bits) et authentification forte 3D Secure. Aucune donnée bancaire ne transite par nos serveurs.
      </p>

      <h2>6. Livraison</h2>
      <ul>
        <li>Délai indicatif : <strong>10 jours ouvrés</strong> à compter de la validation de la commande pour l'Europe.</li>
        <li>Emballage double protection en carton alvéolé et mousse de calage.</li>
        <li>Zones servies : France, Belgique, Luxembourg, Suisse, Allemagne, Espagne, Italie, Pays-Bas, Portugal, Royaume-Uni, Maroc.</li>
      </ul>

      <h2>7. Droit de rétractation</h2>
      <p>
        Conformément à l'article L221-18 du Code de la consommation, le Client dispose d'un délai de <strong>14 jours</strong> à compter de la réception pour retourner un produit non conforme à ses attentes, à ses frais, en parfait état et dans son emballage d'origine. Les commandes sur-mesure (motifs adaptés, teintes personnalisées) ne sont pas éligibles.
      </p>

      <h2>8. Garanties</h2>
      <p>
        Les produits bénéficient de la garantie légale de conformité (articles L217-4 et suivants du Code de la consommation) et de la garantie des vices cachés (articles 1641 et suivants du Code civil).
      </p>

      <h2>9. Réclamations</h2>
      <p>
        Toute réclamation doit être formulée par email à <a href="mailto:abdelali.asri.tr@gmail.com">abdelali.asri.tr@gmail.com</a> dans les 7 jours suivant la réception, photos à l'appui pour tout produit endommagé en transport.
      </p>

      <h2>10. Droit applicable</h2>
      <p>
        Les présentes conditions sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents du ressort du siège du Vendeur, après tentative préalable de règlement amiable.
      </p>
    </LegalLayout>
  );
}
