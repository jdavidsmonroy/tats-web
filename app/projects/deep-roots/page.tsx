import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";
import InstagramEmbed from "@/components/InstagramEmbed";
import PlaylistPlayer, { Track } from "@/components/PlaylistPlayer";

export default function DeepRootsPage() {
  const images = [
    '/images/deep-roots/photo1.jpg',
    '/images/deep-roots/photo2.jpg',
    '/images/deep-roots/photo3.webp'
  ];

  const tracks: Track[] = [
    {
      id: "1",
      title: "Zombie",
      artist: "The Cranberries - Deep Roots Cover",
      src: "/audio/deep-roots/zombie.mp3"
    },
    {
      id: "2",
      title: "Brown Eyed Girl",
      artist: "Van Morrison - Deep Roots Cover",
      src: "/audio/deep-roots/brown-eyed-girl.mp3"
    },
    {
      id: "3",
      title: "Snowman",
      artist: "Sia - Deep Roots Cover",
      src: "/audio/deep-roots/snowman.mp3"
    },
    {
      id: "4",
      title: "You Gotta Be",
      artist: "Des'ree - Deep Roots Cover",
      src: "/audio/deep-roots/you-gotta-be.mp3"
    },
    {
      id: "5",
      title: "Eternal Flame",
      artist: "The Bangles - Deep Roots Cover",
      src: "/audio/deep-roots/eternal-flame.mp3"
    }
  ];

  const instagramReels = [
    { url: "https://www.instagram.com/reel/DafxZcIoUjd/", title: "Directo acústico en Madrid" },
    { url: "https://www.instagram.com/reel/DZ9h-n7Ijfo/", title: "Ensayo en vivo - Pop Rock" },
    { url: "https://www.instagram.com/reel/DWlMQ-CCMq6/", title: "Cover en concierto" },
    { url: "https://www.instagram.com/reel/DWTHT2aCPdp/", title: "Momento en directo" }
  ];

  return (
    <main className="min-h-screen bg-black pt-24 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <Link href="/#projects" className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a proyectos
        </Link>
        
        {/* Main Info */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold tracking-tight mb-4 text-white">Deep Roots Duo</h1>
            <p className="text-xl text-neutral-400 font-light mb-8">
              Dúo musical especializado en bodas y eventos formado en Madrid en 2024. Nuestro repertorio abarca clásicos del pop-rock, nacional e internacional, en formato acústico.
            </p>
            
            <div className="aspect-[4/3] bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 relative shadow-2xl">
              <ImageSlider images={images} />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight mb-2 text-white">Álbum "En vivo"</h2>
            <p className="text-sm text-neutral-400 font-light mb-6">
              Grabado en directo durante la actuación en la sala Wild Horses de Madrid en octubre de 2024.
            </p>
            
            <PlaylistPlayer tracks={tracks} albumTitle="En vivo - Wild Horses (2024)" />
          </div>
        </div>

        {/* Video Section */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-white">Momentos en directo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {instagramReels.map((reel, i) => (
              <InstagramEmbed key={i} url={reel.url} title={reel.title} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

