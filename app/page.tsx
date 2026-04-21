import AtelierSection from "@/components/AtelierSection";
import CollectionsSection from "@/components/CollectionsSection";
import CustomSection from "@/components/CustomSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";

export default function HomePage() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <CollectionsSection />
      <AtelierSection />
      <CustomSection />
      <TrustStrip />
      <GallerySection />
      <Footer />
    </main>
  );
}
