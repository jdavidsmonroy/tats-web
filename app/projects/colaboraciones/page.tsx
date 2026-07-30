import Link from "next/link";
import { ArrowLeft, Disc, ExternalLink, Music2, Guitar } from "lucide-react";
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
          className="inline-flex items-center text-sm text-neutral-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a proyectos
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-white/90 font-medium mb-4 border border-white/10">
            <Music2 className="w-3.5 h-3.5" />
            <span>Grabaciones & duetos</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Colaboraciones
          </h1>
          <p className="text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
            Proyectos paralelos, trabajos de estudio y colaboraciones vocales junto a otros artistas.
          </p>
        </div>

        <div className="space-y-16">
          {/* 1. Most Recent: Tats & Olcay Yavuz */}
          <div className="bg-neutral-900/60 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Guitar className="w-6 h-6 text-neutral-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">Tats & Olcay Yavuz</h2>
                <span className="text-xs text-neutral-400 font-light">Dúo paralelo & producción de estudio</span>
              </div>
            </div>
            <p className="text-neutral-300 text-sm font-light leading-relaxed mb-6">
              Proyecto paralelo en formato dúo junto a Olcay Yavuz (guitarrista de In The Mix). Escucha a continuación su tema publicado.
            </p>

            <AudioPlayer
              src="/audio/olcay-yavuz/colaboracion-olcay.m4a"
              title="Escuchar canción (Tats & Olcay Yavuz)"
            />
          </div>

          {/* 2. Arturo Sordo ft. Tats */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 mb-2">
                <Disc className="w-5 h-5 text-neutral-400" />
                <span>Arturo Sordo ft. Tats</span>
              </h2>
              <p className="text-sm text-neutral-400 font-light">
                Trabajos de estudio y colaboraciones vocales en los temas de Arturo Sordo.
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              {arturoAlbums.map((album, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900/60 border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl overflow-hidden"
                >
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src={`https://open.spotify.com/embed/album/${album.id}?utm_source=generator&theme=0`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen={false}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                  <div className="mt-3 flex justify-end">
                    <a
                      href={album.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-neutral-400 hover:text-white transition-colors gap-1"
                    >
                      <span>Abrir en Spotify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
