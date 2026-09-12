import Hero from "@/components/Hero";
import About from "@/components/About";
import SeriesSpotlight from "@/components/SeriesSpotlight";
import VenuesMarquee from "@/components/VenuesMarquee";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import GigsCalendar from "@/components/GigsCalendar";
import Contact from "@/components/Contact";
import { getUpcomingGigs } from "@/lib/gigs";

export default async function Home() {
  const gigs = await getUpcomingGigs();

  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <SeriesSpotlight />
      <About />
      <VenuesMarquee />
      <Projects />
      <Gallery />
      <GigsCalendar gigs={gigs} />
      <Contact />
    </main>
  );
}
