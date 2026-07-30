import Link from "next/link";
import { ArrowLeft, Headphones } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";
import PlaylistPlayer, { Track } from "@/components/PlaylistPlayer";
import VideoGallery, { VideoItem } from "@/components/VideoGallery";

export default function InTheMixPage() {
  const images = [
    '/images/in-the-mix/photo1.jpg',
    '/images/in-the-mix/photo2.jpg',
    '/images/in-the-mix/photo3.jpg'
  ];

  const audioTracks: Track[] = [
    {
      id: "itm-1",
      title: "Kiss",
      artist: "Prince and The Revolution - In The Mix Cover",
      src: "/audio/in-the-mix/track-1.m4a",
    },
    {
      id: "itm-2",
      title: "Seven Nation Army",
      artist: "The White Stripes - In The Mix Cover",
      src: "/audio/in-the-mix/track-2.m4a",
    },
    {
      id: "itm-3",
      title: "Take Me to the River",
      artist: "Al Green - In The Mix Cover",
      src: "/audio/in-the-mix/track-3.m4a",
    },
    {
      id: "itm-4",
      title: "My Favourite Game",
      artist: "The Cardigans - In The Mix Cover",
      src: "/audio/in-the-mix/track-4.m4a",
    },
  ];

  const featuredVideo: VideoItem = {
    id: "featured-walking-on-sunshine",
    type: "mp4",
    title: "Walking On Sunshine",
    subtitle: "Katrina & The Waves Cover - Directo",
    mp4Src: "/videos/in-the-mix/featured.mp4",
    posterSrc: "/images/in-the-mix/poster-featured.jpg",
  };

  const gridVideos: VideoItem[] = [
    {
      id: "mp4-one-way",
      type: "mp4",
      title: "One Way or Another",
      subtitle: "Blondie Cover",
      mp4Src: "/videos/in-the-mix/one-way-or-another.mp4",
      posterSrc: "/images/in-the-mix/poster-one-way.jpg",
    },
    {
      id: "mp4-respect",
      type: "mp4",
      title: "Respect",
      subtitle: "Aretha Franklin Cover",
      mp4Src: "/videos/in-the-mix/respect.mp4",
      posterSrc: "/images/in-the-mix/poster-respect.jpg",
    },
    {
      id: "yt-1",
      type: "youtube",
      title: "I Dont Need No Doctor",
      subtitle: "Ray Charles Cover - Live",
      youtubeId: "OuZmQrFIocg",
    },
    {
      id: "yt-2",
      type: "youtube",
      title: "Play That Funky Music",
      subtitle: "Wild Cherry Cover - Live",
      youtubeId: "IvM60YLpIF4",
    },
    {
      id: "yt-3",
      type: "youtube",
      title: "Respect Yourself",
      subtitle: "The Staple Singers Cover - Live",
      youtubeId: "ZjqBppcb2zs",
    },
    {
      id: "yt-4",
      type: "youtube",
      title: "My Favourite Game",
      subtitle: "The Cardigans Cover - Live",
      youtubeId: "UgqEHsS_yT4",
    },
    {
      id: "yt-5",
      type: "youtube",
      title: "Ain´t No Sunshine",
      subtitle: "Bill Withers Cover - Live",
      youtubeId: "MoS11kailzE",
    },
    {
      id: "yt-6",
      type: "youtube",
      title: "Favourite Game",
      subtitle: "The Cardigans Cover - Live",
      youtubeId: "JKs3Fr5P4Lo",
    },
    {
      id: "yt-7",
      type: "youtube",
      title: "Take Me to the River",
      subtitle: "Al Green Cover - Live",
      youtubeId: "_quJOuMxZCc",
    },
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
          
          <VideoGallery featuredVideo={featuredVideo} videos={gridVideos} />
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
      </div>
    </main>
  );
}
