import type { Metadata } from "next";

import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Confidentialité · DAR CERAMIQUE",
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      kicker="Données"
      title="Politique de confidentialité"
      lastUpdated="17 avril 2026"
    >
      <h2>Responsable du traitement</h2>
      <p>
        <strong>DAR CERAMIQUE</strong>, représenté par Abdelali Asri, joignable à l'adresse <a href="mailto:abdelali.asri.tr@gmail.com">abdelali.asri.tr@gmail.com</a>.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>Identité : prénom, nom.</li>
        <li>Contact : email, téléphone.</li>
        <li>Livraison : adresse postale, code postal, ville, pays.</li>
        <li>Commande : historique des achats, références des commandes, montants.</li>
        <li>Messages : contenu des formulaires de contact.</li>
      </ul>
      <p>
        <strong>Nous ne collectons aucune donnée bancaire</strong> — Stripe gère intégralement la collecte et le stockage chiffré des moyens de paiement.
      </p>

      <h2>Finalités</h2>
      <ul>
        <li>Traitement des commandes et des livraisons.</li>
        <li>Support client et réponse aux demandes.</li>
        <li>Envoi d'emails transactionnels (confirmation, expédition).</li>
        <li>Lettre d'information (opt-in explicite uniquement).</li>
      </ul>

      <h2>Base légale</h2>
      <p>
        Exécution du contrat de vente (RGPD art. 6.1.b) pour les commandes, consentement (art. 6.1.a) pour la newsletter, intérêt légitime (art. 6.1.f) pour le support client.
      </p>

      <h2>Durée de conservation</h2>
      <ul>
        <li>Données de commande : 10 ans (obligations comptables).</li>
        <li>Données de prospection : 3 ans à compter du dernier contact.</li>
        <li>Messages de contact : 1 an.</li>
      </ul>

      <h2>Sous-traitants</h2>
      <ul>
        <li><strong>Stripe</strong> (Dublin, Irlande) — traitement des paiements.</li>
        <li><strong>Resend</strong> (États-Unis, hébergement conforme RGPD via clauses contractuelles types) — envoi d'emails transactionnels.</li>
        <li><strong>Vercel</strong> (États-Unis, hébergement conforme) — hébergement du site.</li>
      </ul>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité. Adressez votre demande à <a href="mailto:abdelali.asri.tr@gmail.com">abdelali.asri.tr@gmail.com</a> — une réponse vous sera apportée sous 30 jours.
      </p>
      <p>
        Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr">cnil.fr</a>).
      </p>

      <h2>Cookies</h2>
      <p>
        Seul un cookie technique (panier persistant via <code>localStorage</code>) est utilisé. Aucun cookie de tracking publicitaire n'est déposé.
      </p>
    </LegalLayout>
  );
}
