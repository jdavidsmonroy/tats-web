import { siteConfig, sameAs } from "@/lib/site";
import type { UpcomingGig } from "@/lib/gigs";

const abs = (path: string) => new URL(path, siteConfig.url).toString();

/** Identificador estable del artista, para poder referenciarlo desde otros nodos. */
export const personId = `${siteConfig.url}/#tats`;
const siteId = `${siteConfig.url}/#website`;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": personId,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    image: abs(siteConfig.ogImage),
    description: siteConfig.description,
    // Mismos estilos que declara su perfil de Instagram, para que la
    // entidad sea coherente allá donde Google la encuentre.
    genre: ["Pop", "Rock", "Soul", "Blues", "Funk", "Acústico"],
    foundingLocation: {
      "@type": "Place",
      name: siteConfig.city,
    },
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    sameAs,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId,
    url: siteConfig.url,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: "es-ES",
    publisher: { "@id": personId },
  };
}

/** Migas de pan: ayudan a que Google muestre la ruta en el resultado. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function musicGroupSchema({
  name,
  description,
  path,
  image,
  genre,
}: {
  name: string;
  description: string;
  path: string;
  image: string;
  genre: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name,
    description,
    url: abs(path),
    image: abs(image),
    genre,
    member: { "@id": personId },
  };
}

export function eventsSchema(gigs: UpcomingGig[]) {
  return gigs.map((gig) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: gig.titulo,
    // Sin hora en la hoja, se declara solo la fecha, que es lo que se conoce.
    startDate: gig.date.toISOString().slice(0, 10),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(gig.lugar
      ? {
          location: {
            "@type": "Place",
            name: gig.lugar,
            address: { "@type": "PostalAddress", addressCountry: "ES" },
          },
        }
      : {}),
    performer: { "@id": personId },
    organizer: { "@id": personId },
    image: abs(siteConfig.ogImage),
    ...(gig.entradas
      ? {
          offers: {
            "@type": "Offer",
            url: gig.entradas,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  }));
}

export function videoSchema({
  name,
  description,
  youtubeId,
  path,
}: {
  name: string;
  description: string;
  youtubeId: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
    url: abs(path),
    publisher: { "@id": personId },
  };
}

export function bookSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Migajas",
    author: {
      "@type": "Person",
      name: siteConfig.legalName,
    },
    inLanguage: "es",
    bookFormat: "https://schema.org/Paperback",
    description:
      "Poemario de Tatiana Ravassa. Una obra íntima sobre la memoria del alma, el coraje y la libertad.",
    image: abs("/og/poesia.jpg"),
    url: abs("/projects/poesia"),
  };
}

/** Servicio de música en directo: lo que se contrata desde la web. */
export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Música en directo para bodas y eventos",
    name: "Música en directo para bodas y eventos",
    description:
      "Música en directo para bodas, ceremonias y eventos de empresa en formato acústico a dúo, banda completa o voz solista.",
    provider: { "@id": personId },
    areaServed: [
      { "@type": "City", name: "Madrid" },
      { "@type": "AdministrativeArea", name: "Segovia" },
    ],
    url: abs("/bodas-y-eventos"),
    image: abs("/og/bodas-y-eventos.jpg"),
  };
}

/** Preguntas frecuentes: Google puede mostrarlas desplegadas en el resultado. */
export function faqSchema(faqs: { pregunta: string; respuesta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.respuesta,
      },
    })),
  };
}
