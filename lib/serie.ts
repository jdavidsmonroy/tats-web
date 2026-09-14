/**
 * Serie semanal Tats & Olcay Yavuz.
 *
 * Esta lista es la única fuente: alimenta el destacado de la portada y el
 * listado de la página de colaboraciones. Para publicar el episodio de la
 * semana basta con añadir su entrada AL PRINCIPIO del array.
 *
 * Solo se añaden aquí los episodios ya publicados en YouTube: lo que no
 * está en el array no existe para la web.
 */

export interface Episodio {
  numero: number;
  titulo: string;
  /** Intérprete original del tema versionado. */
  original: string;
  /** ID del vídeo de YouTube, el que va detrás de `?v=` en la URL. */
  youtubeId?: string;
  /** Alternativa para episodios que de momento solo existen en audio o respaldo. */
  audioSrc?: string;
}

export interface GrabacionExtra {
  titulo: string;
  original: string;
  audioSrc: string;
  descripcion?: string;
}

export const serie = {
  titulo: "Tats & Olcay Yavuz",
  descripcion:
    "Proyecto a dúo junto a Olcay Yavuz, guitarrista de In The Mix. Un formato íntimo con un tema nuevo cada domingo.",
  cadencia: "Nuevo tema cada domingo",
};

export const episodios: Episodio[] = [
  {
    numero: 1,
    titulo: "La perla",
    original: "Rosalía",
    youtubeId: "ZXsfyHQ1Pfw",
    audioSrc: "/audio/olcay-yavuz/la-perla.mp3",
  },
];

/**
 * Otras grabaciones y colaboraciones acústicas de Tats con Olcay Yavuz
 * fuera de la serie semanal de los domingos.
 */
export const grabacionesAdicionalesOlcay: GrabacionExtra[] = [
  {
    titulo: "Hasta la raíz",
    original: "Natalia Lafourcade",
    audioSrc: "/audio/olcay-yavuz/colaboracion-olcay.m4a",
    descripcion: "Grabación acústica en estudio.",
  },
];

/** El episodio más reciente, que es el que se destaca en la portada. */
export function ultimoEpisodio(): Episodio | null {
  return episodios[0] ?? null;
}

