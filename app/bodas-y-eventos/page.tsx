import Link from "next/link";
import { ArrowRight, Mail, Music, Users, Mic2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Música para bodas y eventos",
  description:
    "Música en directo para bodas, ceremonias y eventos de empresa en Madrid y Segovia. Formato acústico a dúo o banda de soul y funk, con repertorio adaptado a cada momento.",
  path: "/bodas-y-eventos",
  image: "/og/bodas-y-eventos.jpg",
  imageAlt: "Tats cantando con guitarra: música en directo para bodas y eventos",
});

const formatos = [
  {
    icon: Music,
    nombre: "Dúo acústico",
    proyecto: "Deep Roots Duo",
    href: "/projects/deep-roots",
    descripcion:
      "Voz y guitarra para ceremonias, cócteles y momentos en los que la música acompaña sin invadir. Repertorio de clásicos del pop-rock en versión acústica.",
    encaja: "Ceremonia, cóctel, comida",
  },
  {
    icon: Users,
    nombre: "Banda completa",
    proyecto: "In The Mix",
    href: "/projects/in-the-mix",
    descripcion:
      "Cuarteto de soul, funk y pop alternativo para la parte de la fiesta. Alta energía y repertorio pensado para llenar la pista de baile.",
    encaja: "Fiesta, barra libre, eventos de empresa",
  },
  {
    icon: Mic2,
    nombre: "Voz solista",
    proyecto: null,
    href: null,
    descripcion:
      "Interpretación vocal para momentos concretos: la entrada, el primer baile o una canción con un significado especial.",
    encaja: "Momentos señalados",
  },
];

const repertorio = [
  { tema: "Hasta la raíz", autor: "Natalia Lafourcade" },
  { tema: "Hay amores", autor: "Shakira" },
  { tema: "La perla", autor: "Rosalía" },
  { tema: "Eternal Flame", autor: "The Bangles" },
  { tema: "Brown Eyed Girl", autor: "Van Morrison" },
  { tema: "You Gotta Be", autor: "Des'ree" },
  { tema: "Zombie", autor: "The Cranberries" },
  { tema: "Walking On Sunshine", autor: "Katrina & The Waves" },
  { tema: "Respect", autor: "Aretha Franklin" },
  { tema: "Kiss", autor: "Prince" },
  { tema: "Seven Nation Army", autor: "The White Stripes" },
  { tema: "One Way or Another", autor: "Blondie" },
];

const faqs = [
  {
    pregunta: "¿En qué zonas tocáis?",
    respuesta:
      "La base está en Madrid y es la zona habitual de trabajo, con actuaciones también en la provincia de Segovia. Para otras zonas, lo mejor es escribir y consultarlo.",
  },
  {
    pregunta: "¿Qué formato encaja mejor en una boda?",
    respuesta:
      "Depende del momento. El dúo acústico funciona bien en ceremonia y cóctel, donde la música acompaña la conversación. La banda completa está pensada para la fiesta. En muchas bodas se combinan los dos.",
  },
  {
    pregunta: "¿Se puede pedir una canción concreta?",
    respuesta:
      "Sí. El repertorio es amplio y adaptable, y es habitual preparar una canción especial para un momento señalado. Conviene comentarlo con tiempo para poder ensayarla.",
  },
  {
    pregunta: "¿Qué estilos tocáis?",
    respuesta:
      "Pop, rock, soul, funk y blues, en versiones que van desde lo acústico e íntimo hasta la banda completa. Puedes escuchar ejemplos en las páginas de cada proyecto.",
  },
  {
    pregunta: "¿Cómo se reserva una fecha?",
    respuesta:
      `Escribiendo a ${siteConfig.email} o a través del formulario de contacto, indicando la fecha, el lugar y el tipo de evento. A partir de ahí se concretan formato, duración y condiciones.`,
  },
];

export default function BodasYEventosPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-24 px-6">
      <JsonLd data={serviceSchema()} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Bodas y eventos", path: "/bodas-y-eventos" },
        ])}
      />

      <div className="container mx-auto max-w-5xl">
        <header className="mb-20 max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium block mb-4">
            Madrid y Segovia
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
            Música en directo para bodas y eventos
          </h1>
          <p className="text-xl text-neutral-400 font-light leading-relaxed">
            Más de diez años cantando en directo, en formatos que van del dúo
            acústico a la banda completa. La música se elige según el momento:
            una ceremonia no pide lo mismo que una pista de baile a la una de la
            madrugada.
          </p>
        </header>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white">
            Formatos
          </h2>
          <p className="text-neutral-400 font-light mb-10 max-w-2xl">
            Tres maneras de sonar, que pueden combinarse dentro de un mismo día.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {formatos.map(({ icon: Icon, nombre, proyecto, href, descripcion, encaja }) => (
              <div
                key={nombre}
                className="bg-neutral-900 rounded-3xl border border-white/10 p-8 flex flex-col"
              >
                <Icon className="w-6 h-6 text-neutral-400 mb-5" />
                <h3 className="text-xl font-bold mb-2 text-white">{nombre}</h3>
                {proyecto && (
                  <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">
                    {proyecto}
                  </span>
                )}
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-5 flex-grow">
                  {descripcion}
                </p>
                <span className="text-xs text-neutral-500 font-light block mb-4">
                  Encaja en: {encaja}
                </span>
                {href && (
                  <Link
                    href={href}
                    className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    Escuchar <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white">
            Algunos temas del repertorio
          </h2>
          <p className="text-neutral-400 font-light mb-10 max-w-2xl">
            Una muestra de lo que suena habitualmente. El repertorio completo es
            más amplio y se adapta a cada evento.
          </p>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
            {repertorio.map(({ tema, autor }) => (
              <li
                key={tema}
                className="flex items-baseline justify-between gap-4 py-3 border-b border-white/10"
              >
                <span className="text-white font-light">{tema}</span>
                <span className="text-xs text-neutral-500 text-right shrink-0">{autor}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10 text-white">
            Preguntas frecuentes
          </h2>

          <div className="space-y-8 max-w-3xl">
            {faqs.map(({ pregunta, respuesta }) => (
              <div key={pregunta}>
                <h3 className="text-lg font-medium text-white mb-2">{pregunta}</h3>
                <p className="text-neutral-400 font-light leading-relaxed">{respuesta}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 pt-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white">
            Consultar disponibilidad
          </h2>
          <p className="text-neutral-400 font-light mb-8 max-w-2xl">
            Cuéntame la fecha, el lugar y qué tienes en mente. Te respondo con
            propuesta de formato y condiciones.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
            >
              Escribir desde la web
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex h-14 items-center gap-2 justify-center rounded-full border border-white/10 hover:border-white/20 px-8 text-sm font-medium text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              {siteConfig.email}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
