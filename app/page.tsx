import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import GigsCalendar from "@/components/GigsCalendar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-white/20">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Gallery />
      <GigsCalendar />
      <Contact />
      <Footer />
    </main>
  );
}
