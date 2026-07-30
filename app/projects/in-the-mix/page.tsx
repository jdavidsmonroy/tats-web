import Link from "next/link";
import { ArrowLeft, Headphones } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import PlaylistPlayer, { Track } from "@/components/PlaylistPlayer";

export default function InTheMixPage() {
  const images = [
    '/images/in-the-mix/photo1.jpg',
    '/images/in-the-mix/photo2.jpg',
    '/images/in-the-mix/photo3.jpg'
  ];

  const audioTracks: Track[] = [
    {
      id: "itm-1",
      title: "Sesión en directo - Tema 1",
      artist: "In The Mix",
      src: "/audio/in-the-mix/track-1.m4a",
    },
    {
      id: "itm-2",
      title: "Sesión en directo - Tema 2",
      artist: "In The Mix",
      src: "/audio/in-the-mix/track-2.m4a",
    },
    {
      id: "itm-3",
      title: "Sesión en directo - Tema 3",
      artist: "In The Mix",
      src: "/audio/in-the-mix/track-3.m4a",
    },
    {
      id: "itm-4",
      title: "Sesión en directo - Tema 4",
      artist: "In The Mix",
      src: "/audio/in-the-mix/track-4.m4a",
    },
  ];

  const videos = [
    { id: "OuZmQrFIocg", title: "I Dont Need No Doctor" },
    { id: "IvM60YLpIF4", title: "Play That Funky Music" },
    { id: "ZjqBppcb2zs", title: "Respect Yourself" },
    { id: "UgqEHsS_yT4", title: "My Favourite Game" },
    { id: "MoS11kailzE", title: "Ain´t No Sunshine" },
    { id: "JKs3Fr5P4Lo", title: "Favourite Game" },
    { id: "_quJOuMxZCc", title: "Take Me to the River" }
  ];

  return (
    <main className="min-h-screen bg-black pt-24 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <Link href="/#projects" className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a proyectos
        </Link>
        
        {/* Main Info */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold tracking-tight mb-4 text-white">In The Mix</h1>
            <p className="text-xl text-neutral-400 font-light mb-8">
              Cuarteto de Soul, Funk y Pop alternativo con base en Madrid. La banda perfecta para aportar alta energía y groove a festivales, conciertos y grandes fiestas.
            </p>
            
            <div className="aspect-[4/3] bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 relative shadow-2xl">
              <ImageSlider images={images} />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Destacado</h2>
            <div className="bg-neutral-900/50 rounded-3xl p-6 border border-white/5 h-fit shadow-2xl space-y-6">
              <div className="w-full h-[280px] rounded-xl overflow-hidden border border-white/10">
                <YouTubeEmbed videoId="Kwgd9jIEdag" title="In The Mix Live" />
              </div>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Nuestra puesta en escena destaca por la frescura y la conexión con el público. Hacemos que cada concierto sea una auténtica fiesta de Soul y Funk.
              </p>
            </div>
          </div>
        </div>

        {/* Audio Player Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Headphones className="w-6 h-6 text-neutral-400" />
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">Extractos de audio</h2>
              <p className="text-neutral-400 text-sm font-light">Escucha grabaciones y directos de In The Mix.</p>
            </div>
          </div>
          <PlaylistPlayer tracks={audioTracks} albumTitle="In The Mix - Directos & Demos" />
        </div>

        {/* Video Section */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-white">Más conciertos en directo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 aspect-video shadow-2xl">
                <YouTubeEmbed videoId={video.id} title={video.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
