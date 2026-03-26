import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';

// Componente Page: La página principal (Landing Page) que ensambla todos los componentes.
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <MapSection />
      <Footer />
    </main>
  );
}
