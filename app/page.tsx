import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import GigsCalendar from "@/components/GigsCalendar";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <Projects />
      <Gallery />
      <GigsCalendar />
      <Contact />
    </main>
  );
}
