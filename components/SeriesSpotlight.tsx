import Link from "next/link";
import { ArrowRight, Disc } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { serie, episodios, ultimoEpisodio } from "@/lib/serie";

export default function SeriesSpotlight() {
  const episodio = ultimoEpisodio();
  if (!episodio) return null;

  return (
    <section
      id="serie"
      className="scroll-mt-24 py-24 bg-neutral-950 text-white px-6 border-b border-white/10"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/20 text-white text-xs font-medium mb-6">
              <Disc className="w-3.5 h-3.5" />
              {serie.cadencia}
            </span>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{serie.titulo}</h2>
            <p className="text-lg text-neutral-400 font-light leading-relaxed mb-8">
              {serie.descripcion}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href="/projects/colaboraciones"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 transition-colors active:scale-95"
              >
                Ver la serie <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <span className="text-sm text-neutral-500">
                {episodios.length} {episodios.length === 1 ? "tema publicado" : "temas publicados"}
              </span>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-3xl p-6 border border-white/10">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                Último tema
              </span>
              <span className="text-xs text-neutral-500">Episodio {episodio.numero}</span>
            </div>

            {episodio.youtubeId ? (
              <>
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <YouTubeEmbed
                    videoId={episodio.youtubeId}
                    title={`${episodio.titulo} - ${episodio.original}`}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-white">{episodio.titulo}</h3>
                  <p className="text-sm text-neutral-400 font-light">Cover de {episodio.original}</p>
                </div>
              </>
            ) : (
              // El reproductor de audio ya muestra título e intérprete.
              <AudioPlayer
                src={episodio.audioSrc!}
                title={episodio.titulo}
                artist={`Cover de ${episodio.original}`}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
