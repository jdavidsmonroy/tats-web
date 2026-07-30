import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, Send, Volume2 } from "lucide-react";
import Image from "next/image";

export default function PoetryPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <Link href="/#projects" className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a proyectos
        </Link>

        {/* Main Info */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium w-fit mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Próximo lanzamiento</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight mb-2 text-white">Migajas</h1>
            <p className="text-sm font-medium text-neutral-400 mb-6 uppercase tracking-wider">
              Poemario de Mariaa Monroy <span className="text-neutral-500 font-normal">(Tatiana Ravasa)</span>
            </p>

            <p className="text-xl text-neutral-400 font-light mb-8 leading-relaxed">
              Una obra donde las palabras retenidas encuentran su cauce, abriendo una brecha por donde la memoria del alma se expresa, se libera y vuelve a respirar.
            </p>

            {/* Waitlist Form */}
            <div className="bg-neutral-900/60 p-6 rounded-3xl border border-white/5 shadow-2xl">
              <h3 className="text-lg font-medium text-white mb-2">Sé el primero en enterarte</h3>
              <p className="text-sm text-neutral-400 font-light mb-4">Déjame tu correo para recibir un aviso exclusivo cuando el libro esté listo para preventa.</p>

              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="bg-neutral-800 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-black font-medium px-6 py-3 rounded-2xl text-sm hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span>Avisarme</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/images/poetry-book.jpeg"
                alt="Portada de Migajas - Poemario de Mariaa Monroy (Tatiana Ravasa)"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>

        {/* Audio Poem Recitations Section */}
        <div className="bg-neutral-900/40 rounded-3xl p-8 md:p-10 border border-white/5 mb-16 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Volume2 className="w-6 h-6 text-neutral-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Recitados en audio</h2>
              <p className="text-xs text-neutral-400 font-light">Poemas narrados en voz de la autora (Mariaa Monroy).</p>
            </div>
          </div>
          <p className="text-sm text-neutral-400 font-light italic">
            Próximamente audios de los poemas recitados en directo por Mariaa Monroy.
          </p>
        </div>

        {/* Prologue Excerpt Section */}
        <div className="bg-neutral-900/30 rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen className="w-8 h-8 text-neutral-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-6">Extracto del prólogo</h2>

            <blockquote className="text-lg md:text-xl text-neutral-300 font-serif italic leading-relaxed space-y-4 mb-6">
              <p>«Este texto es una brecha, una puerta violeta por donde la memoria del alma se va expresando, liberando. Tati, gracias por este texto, por haber aparecido en mi vida y por aportar coraje y dignidad a la mente colectiva humana.</p>
              <p>Libre te quiero, amiga mía (pues Él ya te hizo libre) y compártelo a cada instante.»</p>
            </blockquote>

            <span className="text-xs text-neutral-400 font-medium uppercase tracking-widest">— Vicente Carrasco (Prólogo a Migajas)</span>
          </div>
        </div>
      </div>
    </main>
  );
}
