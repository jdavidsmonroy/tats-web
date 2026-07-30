import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-neutral-950 text-white px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Proyectos actuales</h2>
          <p className="text-neutral-400">Diferentes facetas artísticas y formatos para cada ocasión.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="group relative block overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 hover:border-white/20 transition-all duration-300">
            <div className="aspect-[16/10] bg-neutral-800 relative">
               <div className="absolute inset-0 bg-[url('/images/in-the-mix/photo1.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out" />
            </div>
            <div className="p-8 relative bg-gradient-to-t from-neutral-900 via-neutral-900 to-transparent -mt-20">
              <h3 className="text-2xl font-bold mb-2">In The Mix</h3>
              <p className="text-neutral-400 mb-6 font-light">Cuarteto de Soul, Funk y Pop alternativo con base en Madrid. Alta energía para festivales y grandes fiestas.</p>
              <Link href="/projects/in-the-mix" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors relative z-20">
                Ver más <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative block overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 hover:border-white/20 transition-all duration-300">
            <div className="aspect-[16/10] bg-neutral-800 relative">
               <div className="absolute inset-0 bg-[url('/images/deep-roots/photo1.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out" />
            </div>
            <div className="p-8 relative bg-gradient-to-t from-neutral-900 via-neutral-900 to-transparent -mt-20">
              <h3 className="text-2xl font-bold mb-2">Deep Roots Duo</h3>
              <p className="text-neutral-400 mb-6 font-light">Dúo musical formado en Madrid en 2024. Repertorio acústico de clásicos del Pop-Rock ideal para eventos y bodas.</p>

              <Link href="/projects/deep-roots" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors relative z-20">
                Ver más <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 3 - Poetry Book */}
          <div className="group relative block overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 hover:border-white/20 transition-all duration-300">
            <div className="aspect-[16/10] bg-neutral-800 relative">
               <div className="absolute inset-0 bg-[url('/images/poetry-book.jpeg')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-all duration-700 ease-out" />
               <span className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1 rounded-full font-medium z-10">
                 Próximamente
               </span>
            </div>
            <div className="p-8 relative bg-gradient-to-t from-neutral-900 via-neutral-900 to-transparent -mt-20">
              <h3 className="text-2xl font-bold mb-2">Migajas</h3>
              <p className="text-neutral-400 mb-6 font-light">Poemario de Tatiana Ravassa. Una obra íntima sobre la memoria del alma, el coraje y la libertad.</p>
              <Link href="/projects/poesia" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors relative z-20">
                Ver más <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 4 - Arturo Sordo Collaborations */}
          <div className="group relative block overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 hover:border-white/20 transition-all duration-300">
            <div className="aspect-[16/10] bg-neutral-800 relative">
               <div className="absolute inset-0 bg-[url('/images/tats/photo4.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out" />
            </div>
            <div className="p-8 relative bg-gradient-to-t from-neutral-900 via-neutral-900 to-transparent -mt-20">
              <h3 className="text-2xl font-bold mb-2">Arturo Sordo ft. Tats</h3>
              <p className="text-neutral-400 mb-6 font-light">Trabajos de estudio y colaboraciones vocales. Producción musical e interpretación en varios temas.</p>
              <Link href="/projects/arturo-sordo" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors relative z-20">
                Ver más <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
