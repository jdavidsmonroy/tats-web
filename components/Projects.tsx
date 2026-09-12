import { ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    href: "/projects/in-the-mix",
    title: "In The Mix",
    description:
      "Cuarteto de Soul, Funk y Pop alternativo con base en Madrid. Alta energía para festivales y grandes fiestas.",
    image: "/images/in-the-mix/photo1.jpg",
  },
  {
    href: "/projects/deep-roots",
    title: "Deep Roots Duo",
    description:
      "Dúo musical formado en Madrid en 2024. Repertorio acústico de clásicos del Pop-Rock ideal para eventos y bodas.",
    image: "/images/deep-roots/photo1.jpg",
  },
  {
    href: "/projects/poesia",
    title: "Migajas",
    description:
      "Poemario de Tatiana Ravassa. Una obra íntima sobre la memoria del alma, el coraje y la libertad.",
    image: "/images/poetry-book.jpeg",
    badge: "Próximamente",
  },
  {
    href: "/projects/colaboraciones",
    title: "Colaboraciones",
    description:
      "Proyectos paralelos y colaboraciones vocales en estudio junto a otros artistas.",
    image: "/images/tats/photo4.jpg",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-24 bg-neutral-950 text-white px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Proyectos actuales</h2>
          <p className="text-neutral-400 font-light">Diferentes facetas artísticas y formatos para cada ocasión.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map(({ href, title, description, image, badge }) => (
            // La tarjeta entera es el enlace: antes solo lo era el "Ver más",
            // aunque el hover diera a entender lo contrario.
            <Link
              key={href}
              href={href}
              className="group relative block overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 hover:border-white/20 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <div className="aspect-[16/10] bg-neutral-900 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out"
                  style={{ backgroundImage: `url(${image})` }}
                />
                {badge && (
                  <span className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1 rounded-full font-medium z-10">
                    {badge}
                  </span>
                )}
              </div>
              <div className="p-8 relative bg-gradient-to-t from-neutral-900 via-neutral-900 to-transparent -mt-20">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-neutral-400 mb-6 font-light">{description}</p>
                <span className="inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Ver más <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
