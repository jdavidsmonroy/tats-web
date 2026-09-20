import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

interface PageSeo {
  title: string;
  description: string;
  /** Ruta absoluta dentro del sitio, empezando por "/". */
  path: string;
  /** Tarjeta social propia; si se omite se usa la del sitio. */
  image?: string;
  imageAlt?: string;
}

/**
 * Construye los metadatos de una página.
 *
 * Existe para que ninguna página pueda quedarse a medias: al declarar
 * `openGraph` en una página, Next NO hereda las imágenes del layout, así que
 * definir el bloque a mano hacía que se perdiera la tarjeta social sin que
 * nada fallara. Aquí se rellenan siempre los tres bloques a la vez.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
}: PageSeo): Metadata {
  const ogImage = image ?? siteConfig.ogImage;
  const alt = imageAlt ?? title;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [{ url: ogImage, alt }],
    },
  };
}
