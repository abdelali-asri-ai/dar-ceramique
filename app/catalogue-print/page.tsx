import Image from "next/image";

/**
 * Catalogue imprimable A4 paysage (297 × 210 mm).
 * Accessible via http://localhost:3000/catalogue-print
 *
 * Pour générer le PDF :
 *   google-chrome --headless --disable-gpu --no-sandbox \
 *     --print-to-pdf="/home/aagp/Bureau/DAR-CERAMIQUE/Catalogue-Dar-Ceramique-2026.pdf" \
 *     --no-pdf-header-footer --print-to-pdf-no-header \
 *     http://localhost:3000/catalogue-print
 */

export const metadata = {
  title: "Catalogue Dar Céramique 2026",
};

type Tile = {
  slug: string;
  image: string;
  name: string;
  format: string;
  shape: string;
  description: string;
  accent: string;
};

const VERTS: Tile[] = [
  {
    slug: "vert-emeraude",
    image: "/catalogue-tiles/vert-emeraude.jpg",
    name: "Vert Émeraude",
    format: "Zellige 10 × 10 cm · Carré classique",
    shape: "Composition murale pleine",
    description:
      "La profondeur des jardins royaux du Maroc capturée sous émail. Chaque carreau vibre d'un vert vitré où se noie la lumière — une intensité précieuse qui transforme riad, hammam et salle à manger en écrins d'élégance.",
    accent: "#1F6B4A",
  },
  {
    slug: "vert-deau",
    image: "/catalogue-tiles/vert-deau.jpg",
    name: "Vert d'Eau Céladon",
    format: "Zellige 10 × 10 cm · Carré classique",
    shape: "Composition murale pleine",
    description:
      "Un vert d'eau paisible, évoquant les patios ombragés et les fontaines en marbre. Son fini satiné apaise l'espace comme une brise fraîche — l'allié idéal des salles de bain, cuisines lumineuses et chambres contemplatives.",
    accent: "#7FB09D",
  },
  {
    slug: "mix-verts",
    image: "/catalogue-tiles/mix-verts.jpg",
    name: "Harmonie Verts",
    format: "Zellige 10 × 10 cm · Assortiment 6 nuances",
    shape: "Composition chromatique",
    description:
      "Six tons — sauge, céladon, jade, mousse, menthe, olive — composés en un kaléidoscope vivant. Chaque carreau est un accord différent, chaque mur devient une partition. Le luxe du dégradé, le caractère de l'imperfection artisanale.",
    accent: "#5C8C6B",
  },
  {
    slug: "vert-sauge",
    image: "/catalogue-tiles/vert-sauge.jpg",
    name: "Vert Sauge Monolithe",
    format: "Zellige 20 × 20 cm · Grand carré",
    shape: "Surface généreuse",
    description:
      "Un grand carré vert-gris aux reflets profonds, taillé comme une pierre précieuse. Sa surface généreuse laisse parler l'émail et la main du maâlem. Pour sols, patios et murs qui veulent respirer.",
    accent: "#8CA896",
  },
  {
    slug: "vert-olive",
    image: "/catalogue-tiles/vert-olive.jpg",
    name: "Vert Olive Antique",
    format: "Zellige 20 × 20 cm · Grand carré",
    shape: "Surface généreuse",
    description:
      "La patine d'une olive mûre, fixée dans l'argile. Ce grand format au vert bronze sourd convient aux intérieurs feutrés — bibliothèques, bureaux, murs d'accueil. Un caractère dense qui gagne en profondeur avec les années.",
    accent: "#6E6E3C",
  },
  {
    slug: "vert-bouteille",
    image: "/catalogue-tiles/vert-bouteille.jpg",
    name: "Vert Bouteille Bejmat",
    format: "Bejmat 10 × 5 cm · Pose verticale",
    shape: "Rectangle allongé",
    description:
      "Le vert sombre d'une forêt de cèdres du Maroc, magnifié par le format Bejmat élancé. Posés à la verticale, ces rectangles dessinent une élévation sculpturale et contemporaine — crédence de cuisine, douche à l'italienne, mur signature.",
    accent: "#2F5C3D",
  },
  {
    slug: "vert-beryl",
    image: "/catalogue-tiles/vert-beryl.jpg",
    name: "Vert Béryl",
    format: "Bejmat 5 × 10 cm · Pose verticale",
    shape: "Rectangle serré",
    description:
      "L'éclat d'un béryl précieux sur un format Bejmat serré. Chaque rectangle capte la lumière différemment, créant un moiré rare. Une signature chromatique marocaine pour douches, crédences et murs d'accent.",
    accent: "#1F7A5A",
  },
  {
    slug: "vert-chevron",
    image: "/catalogue-tiles/vert-chevron.jpg",
    name: "Chevron Vert Mousse",
    format: "Bejmat 10 × 5 cm · Pose chevron",
    shape: "Herringbone traditionnel",
    description:
      "Le chevron européen exécuté en zellige vert mousse marocain. Cette pose croisée anime la surface d'un rythme élégant, entre modernité scandinave et savoir-faire marocain — idéal pour murs d'escalier et fonds de crédence.",
    accent: "#5A8C53",
  },
  {
    slug: "vert-mosaique",
    image: "/catalogue-tiles/vert-mosaique.jpg",
    name: "Mosaïque Vert Forêt",
    format: "Mosaïque 3 × 3 cm · Trame fine",
    shape: "Micro-carreaux",
    description:
      "La trame fine d'une mosaïque vert forêt, pour les détails qui font la différence. Ces micro-carreaux s'enroulent autour des courbes, tapissent fonds de douche et entourages de bassin avec une finesse graphique rare.",
    accent: "#2C5C3E",
  },
];

const BLEUS: Tile[] = [
  {
    slug: "bleu-turquoise",
    image: "/catalogue-tiles/bleu-turquoise.jpg",
    name: "Turquoise du Maroc",
    format: "Zellige 10 × 10 cm · Carré classique",
    shape: "Composition murale pleine",
    description:
      "Le bleu chauffé au four à bois, devenu turquoise sous l'alchimie du maâlem. Ses carreaux respirent la Méditerranée et la piscine d'un riad. Un bleu franc, lumineux, qui éclaire immédiatement toute pièce qui l'accueille.",
    accent: "#4DA4B8",
  },
  {
    slug: "bleu-fonce",
    image: "/catalogue-tiles/bleu-fonce.jpg",
    name: "Bleu Cobalt Bejmat",
    format: "Bejmat 5 × 15 cm · Pose verticale",
    shape: "Rectangle serré brillant",
    description:
      "Un cobalt intense, brillant comme un émail marocain à son apogée. La pose verticale du Bejmat amplifie la tension chromatique — un mur de cobalt devient une œuvre à part entière. Pour chambres, bars et salles d'eau graphiques.",
    accent: "#1B3A8F",
  },
  {
    slug: "bleu-agadir",
    image: "/catalogue-tiles/bleu-agadir.jpg",
    name: "Bleu Atlantique Subway",
    format: "Subway 7 × 28 cm · Pose horizontale",
    shape: "Rectangle long",
    description:
      "L'ardoise adoucie par l'océan marocain. Ce format subway long, à l'émaillage irrégulier, apporte une touche bord-de-mer contemporaine — idéal pour cuisines modernes, salles de bain épurées et espaces traversants.",
    accent: "#7FA0B4",
  },
];

const NEUTRES: Tile[] = [
  {
    slug: "blanc-neige",
    image: "/catalogue-tiles/blanc-neige.jpg",
    name: "Blanc Neige",
    format: "Zellige 10 × 10 cm · Carré classique",
    shape: "Composition murale pleine",
    description:
      "La pureté d'un blanc de chaux rehaussée par les irrégularités de la main. Carrés mats, vivants, imparfaits — exactement ce qu'un blanc industriel ne sera jamais. La toile immaculée des architectes minimalistes.",
    accent: "#F3EEE3",
  },
  {
    slug: "gris-perle",
    image: "/catalogue-tiles/gris-perle.jpg",
    name: "Gris Perle",
    format: "Zellige 10 × 10 cm · Carré classique",
    shape: "Composition 4 pièces",
    description:
      "Un gris presque blanc, aux reflets laiteux. Ses carreaux au format 10 × 10 cm captent la lumière différemment selon l'heure — l'écrin parfait pour un mobilier en bois clair ou un luminaire en laiton.",
    accent: "#D9D4CC",
  },
  {
    slug: "jaunatre",
    image: "/catalogue-tiles/jaunatre.jpg",
    name: "Ivoire Doux",
    format: "Zellige 10 × 10 cm · Carré classique",
    shape: "Composition murale pleine",
    description:
      "L'ivoire chaud d'une médina au crépuscule. Doux, lumineux, ce blanc teinté de miel enveloppe l'espace d'une chaleur discrète. Il s'allie superbement aux bois bruts, au cuivre et aux textiles écrus.",
    accent: "#EEDFC0",
  },
  {
    slug: "beige-tribeca",
    image: "/catalogue-tiles/beige-tribeca.jpg",
    name: "Beige Tribeca",
    format: "Subway 6 × 24,6 cm · Pose brique",
    shape: "Rectangle long cireux",
    description:
      "L'esprit loft new-yorkais rencontre la cire des zelligeurs marocains. Ses rectangles longs, posés en quinconce, affichent un émaillage vintage aux nuances chaudes. Une texture architecte pour lofts, ateliers et bars.",
    accent: "#D9CDB5",
  },
  {
    slug: "ivoire-bejmat",
    image: "/catalogue-tiles/ivoire-bejmat.jpg",
    name: "Ivoire Bejmat",
    format: "Bejmat 5 × 15 cm · Pose horizontale",
    shape: "Rectangle crémeux",
    description:
      "L'élégance feutrée d'un ivoire Bejmat, posé comme une briquette raffinée. Son grain subtil et sa brillance cirée habillent cheminées, dosserets et murs signature avec une retenue toute parisienne.",
    accent: "#E8DCBE",
  },
  {
    slug: "nature-long",
    image: "/catalogue-tiles/nature-long.jpg",
    name: "Nude Atelier",
    format: "Bejmat 7 × 20 cm · Pose verticale",
    shape: "Rectangle élancé",
    description:
      "Le nude poudré des matins de printemps, porté par un Bejmat vertical sculptural. Les variations naturelles de la cuisson dessinent un camaïeu vivant — pour chambres, dressings et salles d'eau intimes.",
    accent: "#E9D5BE",
  },
  {
    slug: "nature-mix",
    image: "/catalogue-tiles/nature-mix.jpg",
    name: "Nude Composition",
    format: "Bejmat mixte · Pose horizontale & verticale",
    shape: "Trame graphique",
    description:
      "Une composition libre entre briquettes longues et courtes, unies par la même teinte nude cireuse. L'esprit bohème d'un atelier, la rigueur d'une galerie. Pour ceux qui aiment raconter une histoire sur leurs murs.",
    accent: "#EAD3B6",
  },
];

const CHAUDS: Tile[] = [
  {
    slug: "miel",
    image: "/catalogue-tiles/miel.jpg",
    name: "Miel du Maroc",
    format: "Zellige 10 × 10 cm · Carré classique",
    shape: "Composition murale pleine",
    description:
      "Un ambre liquide capturé dans l'argile cuite. Ses carreaux déploient des éclats mordorés qui rappellent le soleil couchant sur la médina. Chaque pièce, unique, révèle les nuances du miel brut — vivant, intemporel, irremplaçable.",
    accent: "#D39F47",
  },
  {
    slug: "terra-cotta",
    image: "/catalogue-tiles/terra-cotta.jpg",
    name: "Terra Cotta Poudrée",
    format: "Zellige 10 × 10 cm · Carré classique",
    shape: "Composition murale pleine",
    description:
      "La douceur d'une terre cuite adoucie par le vent chaud du Maroc. Ce rose-argile poudré, presque pêche, apporte chaleur et tendresse — parfait pour un salon méditerranéen, une chambre bohème ou une salle de bain minimaliste.",
    accent: "#D9B195",
  },
  {
    slug: "vieux-rose",
    image: "/catalogue-tiles/vieux-rose.jpg",
    name: "Vieux Rose",
    format: "Zellige 10 × 10 cm · Carré classique",
    shape: "Composition murale pleine",
    description:
      "Le rose fané des pétales de grenadier séchés. Une couleur d'archives, riche, légèrement grisée, qui échappe à l'effet de mode. Sur les murs d'un boudoir, d'un café littéraire ou d'une boutique d'orfèvre, il joue la partition de l'élégance rare.",
    accent: "#C26E7D",
  },
  {
    slug: "rose-fonce",
    image: "/catalogue-tiles/rose-fonce.jpg",
    name: "Framboise Bejmat",
    format: "Bejmat 5 × 15 cm · Pose verticale",
    shape: "Rectangle brillant",
    description:
      "L'audace d'une framboise mûre, en format Bejmat brillant. Ces rectangles gorgés de pigment transforment un pan de mur en pièce maîtresse. Pour ceux qui refusent le neutre et cherchent la signature colorée.",
    accent: "#A22953",
  },
];

const SIGNATURE: Tile[] = [
  {
    slug: "noir-metal",
    image: "/catalogue-tiles/noir-metal.jpg",
    name: "Noir Métal",
    format: "Zellige 10 × 10 cm · Carré classique",
    shape: "Composition murale pleine",
    description:
      "Le noir ennobli d'un feu de bois, aux reflets argentés et cuivrés. Chaque carreau est une nébuleuse minérale unique — jamais deux ne sont identiques. Pour salles de bain sculpturales, bars intimistes et murs signature qui veulent imposer le silence.",
    accent: "#2C2A28",
  },
];

const ALL_TILES = [...VERTS, ...BLEUS, ...NEUTRES, ...CHAUDS, ...SIGNATURE];

export default function CataloguePrintPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      <main className="catalogue">
        <CoverPage />
        <AboutPage />
        <WorkshopPage />
        <CollectionsIntroPage />
        <GalleryPage title="Harmonies Vertes" subtitle="Greens · Jardins & forêts" tiles={VERTS.slice(0, 6)} />
        <GalleryPage title="Harmonies Vertes" subtitle="Greens · Poses graphiques" tiles={[...VERTS.slice(6), ...BLEUS.slice(0, 0)]} alternate tiles2={[]} />
        <GalleryPage title="Tons Profonds" subtitle="Blues · Bord de mer & cobalt" tiles={BLEUS} />
        <GalleryPage title="Naturels" subtitle="Crèmes · Ivoires · Nudes" tiles={NEUTRES.slice(0, 6)} />
        <GalleryPage title="Naturels" subtitle="Signature nude" tiles={NEUTRES.slice(6)} />
        <GalleryPage title="Tons Chauds" subtitle="Miel · Terre · Rose" tiles={CHAUDS} />
        <GalleryPage title="Signature" subtitle="Noir minéral" tiles={SIGNATURE} />
        <NuancierPage />
        <BackCoverPage />
      </main>
    </>
  );
}

// ---------- Pages ----------

function CoverPage() {
  return (
    <section className="page page--cover">
      <div className="cover-grid">
        <div className="cover-brand">
          <Image
            src="/logo-dar-ceramique.jpg"
            alt="DAR CERAMIQUE"
            width={220}
            height={220}
            className="cover-logo"
          />
          <span className="cover-wordmark">DAR CERAMIQUE</span>
          <span className="cover-kicker">Artisans du patrimoine marocain · Maroc</span>
        </div>

        <div className="cover-title-block">
          <h1 className="cover-title">Catalogue</h1>
          <h2 className="cover-year">2026</h2>
          <div className="cover-rule" aria-hidden />
          <p className="cover-tagline">
            Vingt-quatre teintes, <br /> une tradition vivante.
          </p>
        </div>

        <div className="cover-footer">
          <span>www.darceramique.com</span>
          <span>Maroc</span>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="page page--light">
      <SectionHeader title="À propos" sub="About us" />
      <div className="text-two-col">
        <div>
          <p className="lead-fr">
            <strong>DAR CERAMIQUE</strong> est né au Maroc de la rencontre entre
            maîtres-artisans (Mâalems) et une équipe tournée vers l'innovation
            paramétrique. Nous faisons vivre un savoir-faire millénaire — le zellige —
            en le projetant dans les grammaires du design contemporain.
          </p>
          <p className="body-fr">
            Chaque fragment est taillé à la main, émaillé, cuit dans des fours à bois,
            puis assemblé en motifs vivants. L'argile, le feu, la main : ces trois
            gestes constituent notre signature.
          </p>
          <p className="body-fr">
            Notre atelier au Maroc dialogue avec un studio de R&amp;D numérique qui
            permet à chaque client de composer son propre motif avant fabrication.
            Le résultat : des surfaces uniques, traçables, enracinées dans leur terre
            d'origine.
          </p>
        </div>

        <div>
          <p className="lead-en">
            <strong>DAR CERAMIQUE</strong> was born in Morocco from the encounter between
            Mâalem master craftsmen and a team dedicated to parametric innovation. We
            preserve a millennial Moroccan craft — zellige — and project it into the
            grammars of contemporary design.
          </p>
          <p className="body-en">
            Every fragment is hand-cut, glazed, wood-fired, then assembled into
            living patterns. Clay, fire, hand: these three gestures are our signature.
            Our workshop in Morocco dialogues with a digital R&amp;D studio, letting each
            client compose their own pattern before fabrication.
          </p>

          <div className="divider" />

          <div className="stat-row">
            <div className="stat">
              <span className="stat-num">100+</span>
              <span className="stat-lbl">Années de savoir-faire</span>
            </div>
            <div className="stat">
              <span className="stat-num">24</span>
              <span className="stat-lbl">Teintes au catalogue</span>
            </div>
            <div className="stat">
              <span className="stat-num">6</span>
              <span className="stat-lbl">Formats disponibles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkshopPage() {
  return (
    <section className="page page--light">
      <SectionHeader title="Atelier" sub="Workshop" />
      <div className="text-two-col">
        <div>
          <p className="lead-fr">
            Nos ateliers sont installés dans les médinas du Maroc, berceau historique
            du zellige depuis le XIVᵉ siècle. Chaque commande suit le même parcours :
            argile locale, émaillage pigment par pigment, cuisson au bois, taille à
            la marteline par nos Mâalems.
          </p>
          <p className="body-fr">
            Deux labels du Ministère de l'Artisanat du Maroc garantissent la rigueur
            de nos productions : le <strong>Label National de l'Artisanat</strong> et
            le <strong>Label Zellige du Maroc</strong>.
          </p>
          <p className="body-fr">
            Un atelier de recherche complète l'ensemble : algorithmes de tessellation,
            simulation de palette, calcul de calepinage — pour permettre à nos clients
            d'explorer, itérer, puis valider leur projet avant la taille du premier
            fragment.
          </p>
        </div>

        <div className="process-col">
          <h3 className="process-title">Les six gestes</h3>
          <ol className="process-list">
            <li><span>01</span> Argile locale, tamisée &amp; malaxée</li>
            <li><span>02</span> Émaillage à la main, pigment par pigment</li>
            <li><span>03</span> Cuisson au four à bois, 48 h de montée</li>
            <li><span>04</span> Taille à la marteline par le Mâalem</li>
            <li><span>05</span> Assemblage du motif, à l'envers sur sable</li>
            <li><span>06</span> Contrôle qualité, 6 critères</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function CollectionsIntroPage() {
  return (
    <section className="page page--dark">
      <div className="intro-block">
        <span className="intro-kicker">La collection 2026</span>
        <h2 className="intro-title">
          Vingt-quatre teintes, <br /> cinq familles chromatiques.
        </h2>
        <div className="intro-rule" aria-hidden />
        <p className="intro-body">
          Des verts émaillés des jardins royaux aux bleus chauffés au four à bois, des
          ivoires poudrés aux noirs minéraux, chaque teinte porte son histoire, son
          format et son caractère. Un vocabulaire chromatique pensé pour dialoguer
          avec l'architecture contemporaine — sans jamais trahir la main du Mâalem.
        </p>
      </div>

      <div className="family-grid">
        <Family label="Harmonies vertes" count={9} accent="#1F6B4A" />
        <Family label="Tons profonds" count={3} accent="#1B3A8F" />
        <Family label="Naturels" count={7} accent="#E8DCBE" />
        <Family label="Tons chauds" count={4} accent="#D39F47" />
        <Family label="Signature" count={1} accent="#2C2A28" />
      </div>
    </section>
  );
}

function Family({ label, count, accent }: { label: string; count: number; accent: string }) {
  return (
    <div className="family">
      <span className="family-swatch" style={{ background: accent }} />
      <div className="family-meta">
        <div className="family-name">{label}</div>
        <div className="family-count">{count} {count > 1 ? "références" : "référence"}</div>
      </div>
    </div>
  );
}

function GalleryPage({
  title,
  subtitle,
  tiles,
}: {
  title: string;
  subtitle: string;
  tiles: Tile[];
  alternate?: boolean;
  tiles2?: Tile[];
}) {
  if (tiles.length === 0) return null;
  const layout = tiles.length <= 2 ? "gallery-grid--2" : tiles.length <= 3 ? "gallery-grid--3" : "gallery-grid--6";
  return (
    <section className="page page--light">
      <SectionHeader title={title} sub={subtitle} />
      <div className={`gallery-grid ${layout}`}>
        {tiles.map((t) => (
          <TileCard key={t.slug} tile={t} featured={tiles.length <= 3} />
        ))}
      </div>
    </section>
  );
}

function TileCard({ tile, featured }: { tile: Tile; featured: boolean }) {
  return (
    <article className={`tile-card ${featured ? "tile-card--featured" : ""}`}>
      <div className="tile-img">
        <Image
          src={tile.image}
          alt={tile.name}
          width={600}
          height={600}
          className="full-image"
        />
      </div>
      <div className="tile-meta">
        <div className="tile-header">
          <span className="tile-swatch" style={{ background: tile.accent }} />
          <h3 className="tile-name">{tile.name}</h3>
        </div>
        <div className="tile-format">{tile.format}</div>
        <div className="tile-shape">{tile.shape}</div>
        <p className="tile-desc">{tile.description}</p>
      </div>
    </article>
  );
}

function NuancierPage() {
  return (
    <section className="page page--light">
      <SectionHeader title="Nuancier" sub="24 teintes · 6 formats" />
      <p className="section-lead">
        L'ensemble de la palette DAR CERAMIQUE, des verts des jardins royaux aux
        noirs minéraux. Chaque teinte est tirée de minéraux naturels, sans plomb.
      </p>
      <div className="nuancier-grid">
        {ALL_TILES.map((t) => (
          <div key={t.slug} className="nuancier-item">
            <div className="nuancier-swatch" style={{ background: t.accent }} />
            <div className="nuancier-meta">
              <div className="nuancier-name">{t.name}</div>
              <div className="nuancier-format">{tileFormatShort(t.format)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function tileFormatShort(format: string): string {
  return format.split("·")[0].trim();
}

function BackCoverPage() {
  return (
    <section className="page page--cover">
      <div className="back-grid">
        <div className="back-brand">
          <Image
            src="/logo-dar-ceramique.jpg"
            alt="DAR CERAMIQUE"
            width={180}
            height={180}
            className="cover-logo"
          />
          <span className="cover-wordmark">DAR CERAMIQUE</span>
        </div>

        <div className="back-contact">
          <h3 className="back-h3">Contact</h3>
          <div className="back-rule" aria-hidden />
          <div className="back-row">
            <span className="back-label">Atelier</span>
            <span className="back-value">
              FCXR+736, Unnamed Road, Bouskoura<br />
              Casablanca — Maroc
            </span>
          </div>
          <div className="back-row">
            <span className="back-label">Email</span>
            <span className="back-value">info@darceramique.com</span>
          </div>
          <div className="back-row">
            <span className="back-label">Téléphone</span>
            <span className="back-value">+212 5 35 00 00 00</span>
          </div>
          <div className="back-row">
            <span className="back-label">Web</span>
            <span className="back-value">www.darceramique.com</span>
          </div>
        </div>

        <div className="back-footer">
          <span>© 2026 DAR CERAMIQUE · Artisans du Maroc</span>
          <span>Catalogue 2026</span>
        </div>
      </div>
    </section>
  );
}

// ---------- Primitives ----------

function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <header className="section-head">
      <span className="section-bar" aria-hidden />
      <div>
        <h2 className="section-title">{title}</h2>
        <span className="section-sub">{sub}</span>
      </div>
    </header>
  );
}

// ---------- Styles ----------

const PRINT_CSS = `
@page {
  size: A4 landscape;
  margin: 0;
}

:root {
  --espresso: #0F3D24;          /* fond sombre : vert Maroc profond */
  --espresso-ink: #08261A;      /* ombre / contour */
  --sand: #FAF4E6;
  --sand-deep: #EAD9B9;
  --honey: #C1272D;             /* accent principal : rouge Maroc (drapeau) */
  --honey-deep: #006233;        /* accent secondaire : vert Maroc (drapeau) */
  --ink: #1F1A16;
  --muted: rgba(31, 26, 22, 0.58);
  --rule: rgba(31, 26, 22, 0.18);
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--sand);
  color: var(--espresso);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.catalogue {
  font-family: var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 10.5pt;
  line-height: 1.55;
  color: var(--espresso);
}

.catalogue strong { font-weight: 600; }
.catalogue em { font-style: italic; }

.page {
  position: relative;
  width: 297mm;
  height: 210mm;
  padding: 16mm 18mm;
  box-sizing: border-box;
  overflow: hidden;
  page-break-after: always;
  break-after: page;
}
.page:last-child { page-break-after: auto; break-after: auto; }

.page--light {
  background-color: var(--sand);
}
.page--dark {
  background-color: var(--espresso);
  color: var(--sand);
}
.page--cover {
  background-color: var(--espresso);
  background-image:
    linear-gradient(rgba(15, 61, 36, 0.78), rgba(15, 61, 36, 0.78)),
    url("/zellige-bg.jpg");
  background-repeat: repeat, repeat;
  background-size: auto, 160mm auto;
  background-position: center, top left;
  color: var(--sand);
  padding: 18mm 22mm;
}

/* ======== Cover ======== */
.cover-grid {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
}

.cover-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.cover-logo {
  width: 18mm !important;
  height: 18mm !important;
  object-fit: contain !important;
  background: var(--sand);
  border-radius: 50%;
  padding: 1.5mm;
  box-shadow: 0 2mm 6mm rgba(0,0,0,0.25);
}
.cover-wordmark {
  font-family: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
  font-size: 24pt;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--sand);
}
.cover-kicker {
  margin-left: auto;
  font-size: 8.5pt;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(250, 244, 230, 0.65);
}

.cover-title-block {
  align-self: center;
  max-width: 200mm;
}
.cover-title {
  font-family: var(--font-cormorant), serif;
  font-size: 92pt;
  line-height: 0.95;
  margin: 0;
  color: var(--sand);
  font-weight: 400;
  letter-spacing: -0.01em;
}
.cover-year {
  font-family: var(--font-cormorant), serif;
  font-size: 48pt;
  margin: 6mm 0 0;
  color: var(--honey);
  font-weight: 500;
  font-style: italic;
}
.cover-rule {
  margin: 10mm 0 8mm;
  width: 60mm;
  height: 1px;
  background: var(--honey);
}
.cover-tagline {
  font-family: var(--font-cormorant), serif;
  font-size: 18pt;
  font-style: italic;
  color: rgba(250, 244, 230, 0.82);
  line-height: 1.35;
  margin: 0;
}

.cover-footer {
  display: flex;
  justify-content: space-between;
  font-size: 8.5pt;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(250, 244, 230, 0.6);
}

/* ======== Section header ======== */
.section-head {
  display: flex;
  align-items: flex-start;
  gap: 10mm;
  margin-bottom: 10mm;
}
.section-bar {
  width: 2mm;
  height: 18mm;
  background: var(--honey);
  flex: 0 0 auto;
  margin-top: 2mm;
}
.section-title {
  font-family: var(--font-cormorant), serif;
  font-size: 32pt;
  font-weight: 500;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.005em;
}
.section-sub {
  display: block;
  margin-top: 2mm;
  font-size: 8.5pt;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--muted);
}
.page--dark .section-sub { color: rgba(250, 244, 230, 0.55); }

.section-lead {
  max-width: 200mm;
  font-family: var(--font-cormorant), serif;
  font-size: 14pt;
  line-height: 1.45;
  font-style: italic;
  color: rgba(43, 36, 32, 0.75);
  margin: 0 0 8mm;
}

/* ======== Text two-col (About / Workshop) ======== */
.text-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14mm;
  height: calc(100% - 40mm);
  align-items: start;
}
.lead-fr {
  font-family: var(--font-cormorant), serif;
  font-size: 14pt;
  line-height: 1.5;
  margin: 0 0 5mm;
  color: var(--ink);
}
.body-fr {
  font-size: 10pt;
  line-height: 1.65;
  margin: 0 0 4mm;
  color: rgba(43, 36, 32, 0.82);
}
.lead-en, .body-en {
  color: rgba(43, 36, 32, 0.55);
  font-style: italic;
  margin: 0 0 4mm;
}
.lead-en {
  font-family: var(--font-cormorant), serif;
  font-size: 12pt;
  line-height: 1.5;
}
.body-en {
  font-size: 9.5pt;
  line-height: 1.6;
}

.divider {
  width: 20mm;
  height: 0.5pt;
  background: var(--honey);
  margin: 6mm 0;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4mm;
  margin-top: 4mm;
}
.stat { display: flex; flex-direction: column; gap: 1mm; }
.stat-num {
  font-family: var(--font-cormorant), serif;
  font-size: 30pt;
  color: var(--honey-deep);
  line-height: 1;
}
.stat-lbl {
  font-size: 7.5pt;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}

.process-col { padding-top: 2mm; }
.process-title {
  font-family: var(--font-cormorant), serif;
  font-size: 22pt;
  margin: 0 0 6mm;
  font-weight: 500;
}
.process-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 3mm;
}
.process-list li {
  display: grid;
  grid-template-columns: 12mm 1fr;
  align-items: baseline;
  font-size: 11pt;
  line-height: 1.35;
  padding: 2.5mm 0;
  border-top: 0.5pt solid var(--rule);
  color: var(--ink);
}
.process-list li:last-child { border-bottom: 0.5pt solid var(--rule); }
.process-list span {
  font-family: 'Menlo', 'Courier New', monospace;
  font-size: 9pt;
  color: var(--honey-deep);
  letter-spacing: 0.12em;
}

/* ======== Collections intro ======== */
.intro-block {
  max-width: 180mm;
  margin-bottom: 14mm;
}
.intro-kicker {
  font-size: 8.5pt;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--honey);
}
.intro-title {
  font-family: var(--font-cormorant), serif;
  font-size: 46pt;
  font-weight: 400;
  line-height: 1.02;
  margin: 4mm 0 6mm;
  color: var(--sand);
}
.intro-rule {
  width: 40mm;
  height: 1px;
  background: var(--honey);
  margin-bottom: 6mm;
}
.intro-body {
  max-width: 200mm;
  font-family: var(--font-cormorant), serif;
  font-size: 13pt;
  font-style: italic;
  line-height: 1.5;
  color: rgba(250, 239, 225, 0.75);
  margin: 0;
}

.family-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6mm;
}
.family {
  display: flex;
  flex-direction: column;
  gap: 4mm;
  border: 0.5pt solid rgba(250, 244, 230, 0.22);
  padding: 6mm;
  border-radius: 1.5mm;
}
.family-swatch {
  width: 100%;
  aspect-ratio: 2 / 1;
  border-radius: 1mm;
  box-shadow: inset 0 0 0 0.5pt rgba(255,255,255,0.1);
}
.family-name {
  font-family: var(--font-cormorant), serif;
  font-size: 16pt;
  color: var(--sand);
  line-height: 1.1;
}
.family-count {
  font-size: 7.5pt;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(250, 244, 230, 0.55);
  margin-top: 1mm;
}

/* ======== Gallery ======== */
.gallery-grid {
  display: grid;
  gap: 6mm;
  height: calc(100% - 44mm);
}
.gallery-grid--6 {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
.gallery-grid--3 {
  grid-template-columns: repeat(3, 1fr);
}
.gallery-grid--2 {
  grid-template-columns: repeat(2, 1fr);
}

.tile-card {
  display: grid;
  grid-template-rows: 1fr auto;
  border: 0.5pt solid var(--rule);
  border-radius: 1.5mm;
  overflow: hidden;
  background: #fff;
}
.tile-img {
  position: relative;
  background: var(--sand-deep);
  min-height: 0;
}
.full-image {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block;
}
.tile-meta {
  padding: 3.5mm 4mm 4mm;
  border-top: 0.5pt solid var(--rule);
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 1mm;
}
.tile-header {
  display: flex;
  align-items: center;
  gap: 2.5mm;
  margin-bottom: 0.5mm;
}
.tile-swatch {
  width: 5mm;
  height: 5mm;
  border-radius: 50%;
  border: 0.4pt solid var(--rule);
  flex: 0 0 auto;
}
.tile-name {
  font-family: var(--font-cormorant), serif;
  font-size: 13pt;
  margin: 0;
  line-height: 1.1;
  font-weight: 500;
}
.tile-format {
  font-family: 'Menlo', 'Courier New', monospace;
  font-size: 7pt;
  letter-spacing: 0.06em;
  color: var(--muted);
  margin-top: 0.5mm;
}
.tile-shape {
  font-size: 7pt;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--honey-deep);
  margin-bottom: 1mm;
}
.tile-desc {
  margin: 0;
  font-size: 7.5pt;
  line-height: 1.5;
  color: rgba(43, 36, 32, 0.82);
}

.tile-card--featured .tile-name { font-size: 17pt; }
.tile-card--featured .tile-desc { font-size: 9pt; line-height: 1.55; }
.tile-card--featured .tile-format { font-size: 8pt; }
.tile-card--featured .tile-shape { font-size: 8pt; }

/* ======== Nuancier ======== */
.nuancier-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4mm;
  margin-top: 4mm;
}
.nuancier-item {
  display: flex;
  flex-direction: column;
  gap: 2mm;
  border: 0.5pt solid var(--rule);
  padding: 3mm;
  border-radius: 1.5mm;
  background: #fff;
}
.nuancier-swatch {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 1mm;
  box-shadow: inset 0 1pt 2pt rgba(0,0,0,0.08);
}
.nuancier-meta { display: flex; flex-direction: column; gap: 0.5mm; }
.nuancier-name {
  font-family: var(--font-cormorant), serif;
  font-size: 10.5pt;
  line-height: 1.1;
}
.nuancier-format {
  font-family: 'Menlo', monospace;
  font-size: 6.5pt;
  color: var(--muted);
  letter-spacing: 0.04em;
}

/* ======== Steps / installation ======== */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6mm;
  margin-top: 4mm;
}
.step {
  padding: 6mm;
  border: 0.5pt solid var(--rule);
  border-radius: 1.5mm;
  background: #fff;
}
.step-num {
  font-family: var(--font-cormorant), serif;
  font-size: 28pt;
  color: var(--honey);
  line-height: 1;
  margin-bottom: 2mm;
}
.step-title-fr {
  font-family: var(--font-cormorant), serif;
  font-size: 15pt;
  margin-bottom: 0.5mm;
}
.step-title-en {
  font-size: 8pt;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 2mm;
}
.step-body {
  font-size: 9pt;
  line-height: 1.55;
  color: rgba(43,36,32,0.78);
  margin: 0;
}
.recos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6mm;
  margin-top: 8mm;
  padding-top: 6mm;
  border-top: 0.5pt solid var(--rule);
}
.reco-title {
  font-size: 8pt;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--honey-deep);
  margin-bottom: 1.5mm;
}
.reco-body {
  font-family: var(--font-cormorant), serif;
  font-size: 12pt;
  line-height: 1.3;
  color: var(--espresso);
}

/* ======== Back cover ======== */
.back-grid {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
}
.back-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.back-contact {
  align-self: center;
  max-width: 180mm;
}
.back-h3 {
  font-family: var(--font-cormorant), serif;
  font-size: 54pt;
  margin: 0 0 6mm;
  color: var(--sand);
  font-weight: 400;
}
.back-rule {
  width: 40mm;
  height: 1px;
  background: var(--honey);
  margin-bottom: 10mm;
}
.back-row {
  display: grid;
  grid-template-columns: 40mm 1fr;
  gap: 6mm;
  padding: 3.5mm 0;
  border-top: 0.5pt solid rgba(250, 244, 230, 0.2);
  align-items: baseline;
}
.back-row:last-child { border-bottom: 0.5pt solid rgba(250, 244, 230, 0.2); }
.back-label {
  font-size: 8pt;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--honey);
}
.back-value {
  font-family: var(--font-cormorant), serif;
  font-size: 14pt;
  color: var(--sand);
  line-height: 1.35;
}
.back-footer {
  display: flex;
  justify-content: space-between;
  font-size: 8pt;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(250, 244, 230, 0.5);
}
`;
