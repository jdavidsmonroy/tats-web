import Link from "next/link";
import { ArrowLeft, Disc, ExternalLink, Music2, Guitar, Sparkles } from "lucide-react";
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
            Proyectos paralelos, canciones grabadas en estudio e interpretaciones vocales junto a otros artistas.
          </p>
        </div>

        {/* List of Collaborations with clear cards */}
        <div className="space-y-12">
          {/* Card 1: Tats & Olcay Yavuz */}
          <section className="bg-neutral-900/80 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-neutral-400 font-medium uppercase tracking-wider mb-2">
                  <Guitar className="w-4 h-4 text-neutral-400" />
                  <span>Dúo paralelo & estudio</span>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Tats & Olcay Yavuz</h2>
                <p className="text-sm text-neutral-400 font-light mt-1">
                  Proyecto a dúo junto a Olcay Yavuz, guitarrista de In The Mix.
                </p>
              </div>

              <span className="self-start md:self-center px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/10 whitespace-nowrap">
                Publicado
              </span>
            </div>

            <div className="space-y-4">
              <AudioPlayer
                src="/audio/olcay-yavuz/colaboracion-olcay.m4a"
                title="Hasta la raíz"
                artist="Tats & Olcay Yavuz (Cover de Natalia Lafourcade)"
                badge="Grabación publicada"
              />
            </div>
          </section>

          {/* Card 2: Arturo Sordo ft. Tats */}
          <section className="bg-neutral-900/80 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-neutral-400 font-medium uppercase tracking-wider mb-2">
                  <Disc className="w-4 h-4 text-neutral-400" />
                  <span>Colaboraciones vocales</span>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Arturo Sordo ft. Tats</h2>
                <p className="text-sm text-neutral-400 font-light mt-1">
                  Grabaciones e interpretación vocal en producciones de Arturo Sordo.
                </p>
              </div>

              <span className="self-start md:self-center px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/10 whitespace-nowrap">
                Álbumes en Spotify
              </span>
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              {arturoAlbums.map((album, idx) => (
                <div
                  key={idx}
                  className="bg-black/50 border border-white/10 rounded-2xl p-4 shadow-xl overflow-hidden"
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
                      className="inline-flex items-center text-xs text-neutral-400 hover:text-white transition-colors gap-1.5"
                    >
                      <span>Abrir en Spotify</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
