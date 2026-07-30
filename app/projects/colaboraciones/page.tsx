import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";

export default function ColaboracionesPage() {
  const arturoAlbums = [
    {
      id: "1FsNF3k6PKPPu3GA6U7cDT",
      url: "https://open.spotify.com/album/1FsNF3k6PKPPu3GA6U7cDT",
    },
    {
      id: "3IZ8W460dKyPbj7MGbLuqO",
      url: "https://open.spotify.com/album/3IZ8W460dKyPbj7MGbLuqO",
    },
    {
      id: "5w5TY3R2WS5MToKQ0L93ge",
      url: "https://open.spotify.com/album/5w5TY3R2WS5MToKQ0L93ge",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/#projects"
          className="inline-flex items-center text-sm text-neutral-400 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a proyectos
        </Link>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Colaboraciones
          </h1>
          <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
            Proyectos paralelos, canciones grabadas en estudio e interpretaciones vocales junto a otros artistas.
          </p>
        </div>

        {/* Collaborations List */}
        <div className="space-y-16">
          {/* Collaboration Project 1: Tats & Olcay Yavuz */}
          <div className="border-t border-white/10 pt-10">
            <div className="mb-6">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider block mb-1">
                Proyecto en desarrollo
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Tats & Olcay Yavuz</h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-xl">
                Proyecto a dúo junto a Olcay Yavuz (guitarrista de In The Mix). Un formato íntimo donde irán publicando canciones y versiones.
              </p>
            </div>

            {/* Released Tracks Subsection */}
            <div className="pl-4 border-l-2 border-white/10 space-y-3 mt-8">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                Temas publicados
              </span>
              <AudioPlayer
                src="/audio/olcay-yavuz/colaboracion-olcay.m4a"
                title="Hasta la raíz"
                artist="Cover de Natalia Lafourcade"
              />
            </div>
          </div>

          {/* Collaboration Project 2: Arturo Sordo ft. Tats */}
          <div className="border-t border-white/10 pt-10">
            <div className="mb-6">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider block mb-1">
                Colaboración en estudio
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Arturo Sordo ft. Tats</h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-xl">
                Interpretación y colaboraciones vocales en producciones de estudio de Arturo Sordo.
              </p>
            </div>

            {/* Released Tracks Subsection */}
            <div className="pl-4 border-l-2 border-white/10 space-y-4 mt-8">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                Temas publicados en Spotify
              </span>
              <div className="grid md:grid-cols-1 gap-4">
                {arturoAlbums.map((album, idx) => (
                  <div key={idx} className="overflow-hidden">
                    <iframe
                      style={{ borderRadius: "16px" }}
                      src={`https://open.spotify.com/embed/album/${album.id}?utm_source=generator&theme=0`}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowFullScreen={false}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
