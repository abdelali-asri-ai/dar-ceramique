# Zelij.com — Relais de session

> Dernière mise à jour : **17 avril 2026**
> Dépôt : `/home/aagp/Bureau/zelij.com` · Next.js 14 · TypeScript strict · Tailwind

---

## 1. Contexte en deux phrases

Site e-commerce premium d'un atelier de zellige (mosaïque marocaine) basé à Fès. Single-page artisanale + boutique Next.js avec configurateur paramétrique, panier persistant, checkout Stripe, emails Resend, pages légales complètes.

---

## 2. Ce qui a été fait dans la session

### 2.1 Réparations post-refactor collections
- Corrections de 3 composants cassés après le renommage des collections : `components/AtelierSection.tsx`, `components/Hero.tsx`, `components/CollectionsSection.tsx` (références `nuit-atlas` → `midnight-casablanca`, accès à `COLLECTIONS[1]` remplacés par `getCollection("...")`).

### 2.2 Intégration du catalogue produits
- 10 SKUs créés dans `lib/products.ts` à partir des images de `/ImagesZelij/` :
  - 7 carreaux unis 10×10 (Vert d'Eau, Terracotta, Miel, Noir Charbon, Vieux Rose, Bleu Turquoise, Blanc Neige)
  - 3 motifs composés m² (Khatam Ocre, Entrelacs Vert d'Eau, Classique de Fès)
- 9 items galerie éditoriale.
- Helpers : `formatPrice()`, `getProduct()`, `PRODUCTS_BY_SLUG`.

### 2.3 Opérationnalisation du site
- **Panier** : `lib/cart.tsx` (Context + reducer + persistance localStorage, clé `zelij.cart.v1`, TVA 20 %).
- **Header** : mini-cart avec badge doré, menu mobile off-canvas, scroll detection.
- **Pages** : `/boutique`, `/boutique/[slug]`, `/panier`, `/checkout`, `/commande/succes`, `/commande/annule`, `/contact`.
- **404 custom** avec tiling zellige en fond.
- **Favicon** : étoile 8 branches dorée sur charcoal (`app/icon.svg`).
- **TrustStrip** : 4 engagements (taillé à la main, livraison Europe, échantillon offert, paiement sécurisé), posé sur accueil et `/boutique`.

### 2.4 Stack e-commerce (Stripe + Resend)
- **Stripe Checkout hosted** : `app/api/checkout/route.ts` crée une session EUR, TVA appliquée à `price * 1.2`, 11 pays livrés.
- **Webhook** : `app/api/webhook/route.ts` valide la signature, envoie les 2 emails sur `checkout.session.completed`.
- **Emails Resend** : `lib/email.ts` avec template HTML aux couleurs du site (Cormorant serif + accents dorés). `sendOrderConfirmation()` au client, `sendAtelierNotification()` à `abdelali.asri.tr@gmail.com`.
- **Mode démo** : si `STRIPE_SECRET_KEY` ou `RESEND_API_KEY` manquent, les routes renvoient des stubs réalistes sans planter. Le site tourne 100 % en local sans aucune clé.
- **Pages légales** : `/cgv`, `/mentions-legales`, `/confidentialite` avec `components/LegalLayout` + classe `.prose-legal`. Dernière mise à jour 17 avril 2026.
- **Env** : `.env.local.example` documente toutes les clés (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`).

### 2.5 Recherche + filtres avancés (fonctionnalité #3 du backlog)
- **Modèle produit enrichi** (`lib/products.ts`) : nouveaux champs `colorFamily` (9 teintes canoniques), `rooms` (7 pièces), `format` (10×10 ou panneau 30×30).
- **Constantes exportées** : `COLOR_FAMILIES` (avec swatch hex), `ROOMS`, `FORMATS`.
- **BoutiqueCatalog réécrit** (`components/BoutiqueCatalog.tsx`) :
  - Recherche diacritic-insensitive sur name/subtitle/description.
  - Picker couleur à pastilles (9 swatches) — sélection multiple (OR interne).
  - Pills pièce (7) et format (2) — sélection multiple.
  - Chips filtres actifs avec bouton × individuel + « Tout effacer ».
  - Empty state soigné avec bouton reset.
  - Compteur live « N références filtrées ».

### 2.6 Configurateur : picker catalogue + aperçu mur
- **Onglet « Catalogue »** ajouté à `EditorPanel` à côté de « Collections » — grille 3 colonnes de tous les produits avec photo miniature.
- **Collections synthétiques** : sélectionner un produit crée une `Collection` à la volée (`collectionFromProduct()` dans `lib/collections.ts`) avec palette dérivée de l'accent via `paletteFromAccent()` dans `lib/colors.ts`.
- **Devis recalculé** automatiquement : prix × 100 pour unis 10×10, prix/m² direct pour motifs.
- **Nouveau composant `components/TileWallPreview.tsx`** : quand un carreau catalogue est choisi, le grand cadre carré n'affiche plus le motif SVG paramétrique — il est **pavé avec l'image réelle du carreau**, répétée `gridSize × gridSize` fois, avec joints simulés + voile lumineux.
- **Refactoring** : `CustomSection` stocke désormais un `Collection` entier (au lieu d'un `ColorMap` + id séparés). `EditorPanel` consomme `activeCollection` + `onCollectionChange`. `calculateEstimateFromCollection()` ajouté pour éviter un lookup par id inutile.

---

## 3. État actuel — ce qui marche

| Zone | Statut |
|---|---|
| `npm run dev` | ✓ tourne sur `localhost:3000` |
| `npx tsc --noEmit` | ✓ passe sans erreur |
| Accueil `/` | ✓ Hero, Atelier, Collections, Custom, Galerie, Footer |
| `/boutique` | ✓ avec recherche + filtres avancés |
| `/boutique/[slug]` | ✓ fiche produit + AddToCartBlock |
| `/panier` → `/checkout` | ✓ flux complet en mode démo |
| `/commande/succes` | ✓ clear cart sur mount |
| Configurateur `#custom` | ✓ Collections OU Catalogue, preview live |
| Pages légales | ✓ CGV, mentions, confidentialité |
| Contact `/contact` | ✓ formulaire (pas de backend pour l'instant) |
| Stripe webhook | ✓ implémenté, testé uniquement via stubs |

---

## 4. Reste à faire

### 4.1 Fonctionnalités manquantes identifiées (backlog e-commerce)
Le user a demandé dans la session 2-3 fonctionnalités manquantes vs sites concurrents. Trois ont été listées, seule la #3 a été implémentée. **À recaper au début de la prochaine session** — les #1 et #2 sont probablement dans la famille :
- **Wishlist / favoris** (localStorage persistant, icône cœur sur les cartes produits)
- **Comparateur de carreaux** (2 à 3 SKUs côte à côte, specs + prix)
- **Avis clients / testimonials** (statique ou dynamique)
- **Calculateur de devis avancé** (déjà partiellement en place dans EditorPanel)
- **Échantillons** (flux de commande d'échantillons à 5 € port inclus)
- **Simulateur de pièce / AR** (très ambitieux)

> **Action** : demander au user de relister les 2 manquantes, ou lui proposer la liste ci-dessus pour arbitrer.

### 4.2 Intégrations externes à activer
Le site tourne en **mode démo** tant que les clés ne sont pas renseignées dans `.env.local`. Pour passer en production :

1. **Stripe** :
   - Créer un compte Stripe, récupérer `sk_live_...` et `pk_live_...`.
   - Créer un endpoint webhook vers `https://zelij.com/api/webhook` avec l'event `checkout.session.completed` et récupérer `whsec_...`.
   - Tester en mode Test d'abord (`sk_test_...`) — le code accepte les deux.

2. **Resend** :
   - Créer un compte Resend, ajouter le domaine `zelij.com` (SPF/DKIM).
   - Récupérer `re_...` dans `RESEND_API_KEY`.
   - Régler `EMAIL_FROM=atelier@zelij.com` et `EMAIL_TO=abdelali.asri.tr@gmail.com`.

3. **Newsletter** (Footer.tsx) : actuellement uniquement un toast « Merci ✓ », aucun backend. Options :
   - Endpoint Resend Audiences.
   - Formulaire Mailchimp/Brevo.
   - Table Supabase/Postgres si on héberge la data en interne.

4. **Formulaire contact** (`/contact`) : même situation — aucun POST effectif. Le plus rapide : ajouter `app/api/contact/route.ts` qui envoie un email via `lib/email.ts`.

### 4.3 Contenu / éditorial
- Photos actuelles : `public/catalog/P*_...jpg` — noms techniques, pas optimisés en plusieurs tailles. Envisager :
  - Tri/renommage des assets (`vert-deau-1x1.jpg` plutôt que `P2_VERT_DEAU_10-10_1.jpg`).
  - Génération de variantes responsives (Next.js `Image` le fait déjà à la volée, mais ça reste pertinent d'avoir des sources propres).
  - Photos d'ambiance supplémentaires pour la galerie.
- Textes des fiches produits : courts, à étoffer si besoin.
- Page `À propos` / histoire de l'atelier : n'existe pas encore, pourrait enrichir `AtelierSection` ou être une page dédiée.

### 4.4 QA / prod
- Tester le flux de commande complet en mode Stripe Test (carte `4242 4242 4242 4242`) → vérifier que l'email arrive bien à `abdelali.asri.tr@gmail.com`.
- Lighthouse sur `/boutique` et `/` — objectifs : perfs > 90, a11y > 95.
- Vérifier le mobile menu sur iOS Safari (bug connu avec `body.style.overflow`).
- Déploiement Vercel : pousser sur GitHub, connecter le repo, renseigner les env vars en prod.
- Certificat SSL + redirection `www` ↔ apex.
- Plan de sauvegarde pour la base de commandes (actuellement Stripe est la seule source de vérité).

### 4.5 Dette technique légère
- `components/ContactForm.tsx` : pas encore examiné dans cette session, vérifier qu'il pointe bien vers une API route.
- `components/Footer.tsx` : newsletter stubbée — voir §4.2.
- `lib/products.ts` : prix en dur dans le fichier. À terme, migrer vers Stripe Products + une base de données pour gérer le stock.
- Aucun test automatisé (unit/e2e). Pas bloquant pour un MVP mais à prévoir.

---

## 5. Par où commencer la prochaine session

**Ordre suggéré, du plus rentable au plus optionnel** :

1. **Recaper les fonctionnalités #1 et #2** du backlog e-commerce (cf. §4.1) et décider laquelle traiter — ou faire un choix nouveau basé sur les priorités business.

2. **Câbler le formulaire de contact** (§4.2 point 4) — petit delta, gain réel : les prospects peuvent vraiment écrire à l'atelier.

3. **Câbler la newsletter** (§4.2 point 3) — même logique, et nécessaire si on veut parler aux clients post-vente.

4. **Tester le flux Stripe en mode Test** dès que les clés sont disponibles — c'est la brique qui a le plus de risque de casser en prod.

5. **Préparer le déploiement Vercel** (§4.4) — pousser le projet sur GitHub, configurer l'URL de prod, valider la config.

---

## 6. Commandes essentielles

```bash
cd /home/aagp/Bureau/zelij.com

npm run dev              # Dev server sur http://localhost:3000
npm run build            # Build de production
npm run start            # Sert le build
npx tsc --noEmit         # Typecheck strict
```

### Fichiers à connaître en priorité

| Fichier | Rôle |
|---|---|
| `lib/products.ts` | Source de vérité catalogue |
| `lib/collections.ts` | Palettes du configurateur + devis |
| `lib/cart.tsx` | Context panier + localStorage |
| `lib/stripe.ts` | Client Stripe paresseux |
| `lib/email.ts` | Wrapper Resend + template HTML |
| `components/EditorPanel.tsx` | Configurateur paramétrique |
| `components/BoutiqueCatalog.tsx` | Grid boutique + filtres |
| `components/TileWallPreview.tsx` | Preview mur pavé (nouveau) |
| `app/api/checkout/route.ts` | Création Stripe session |
| `app/api/webhook/route.ts` | Réception Stripe events |
| `.env.local.example` | Toutes les env vars à connaître |
