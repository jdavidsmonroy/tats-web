export interface Gig {
  fecha: string;
  titulo: string;
  proyecto?: string;
  lugar?: string;
  entradas?: string;
}

export interface UpcomingGig extends Gig {
  date: Date;
}

const SHEET_ID = "1g3mgzdPoWtYNc49UzYCLAVoMLboWzt_L8OPT97Er0GM";

// opensheet solo admite el parámetro `raw`: cualquier otro (por ejemplo uno
// para romper la caché) hace que devuelva un error en vez de las filas.
const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/1`;

function parseFecha(fecha: string): Date | null {
  if (!fecha) return null;

  // La hoja usa dd/mm/aaaa, que Date interpreta al revés si se le pasa tal cual.
  if (fecha.includes("/")) {
    const parts = fecha.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts.map((p) => parseInt(p, 10));
      if ([day, month, year].some(Number.isNaN)) return null;
      const parsed = new Date(year, month - 1, day);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
  }

  const parsed = new Date(fecha);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Devuelve los conciertos futuros ordenados por fecha.
 * Si la hoja falla, devuelve una lista vacía: la agenda es contenido
 * secundario y nunca debe tumbar la página.
 */
export async function getUpcomingGigs(): Promise<UpcomingGig[]> {
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 300 } });
    if (!res.ok) return [];

    const data = await res.json();
    if (!Array.isArray(data)) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return data
      .map((item: Gig) => {
        const date = parseFecha(item.fecha);
        return date ? { ...item, date } : null;
      })
      .filter((item): item is UpcomingGig => item !== null && item.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  } catch {
    return [];
  }
}
