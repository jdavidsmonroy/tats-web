export const siteConfig = {
  name: "Tats",
  legalName: "Tatiana Ravassa",
  url: "https://www.tatsmusic.com",
  domain: "tatsmusic.com",
  email: "tats@tatsmusic.com",
  instagram: "https://www.instagram.com/artmoniza/",
  youtube: "https://www.youtube.com/@Tats_artmoniza",
  title: "Tats - Cantante & Poetisa",
  description:
    "Cantante, vocalista y poetisa en Madrid. Música en directo para conciertos, bodas y eventos, con In The Mix y Deep Roots Duo.",
  /** Tarjeta 1200x630 que se ve al compartir el enlace. */
  ogImage: "/og/home.jpg",
  locale: "es_ES",
  /** Ciudad base, usada en los datos estructurados. */
  city: "Madrid",
  country: "ES",
} as const;

/** Perfiles externos que confirman la identidad del artista (schema.org sameAs). */
export const sameAs: string[] = [siteConfig.instagram, siteConfig.youtube];
