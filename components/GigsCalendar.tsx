"use client";

import { useEffect, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";

interface Gig {
  fecha: string;
  titulo: string;
  proyecto?: string;
  lugar?: string;
  entradas?: string;
  dateObj?: Date;
}

const SHEET_ID = "1g3mgzdPoWtYNc49UzYCLAVoMLboWzt_L8OPT97Er0GM";

export default function GigsCalendar() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://opensheet.elk.sh/${SHEET_ID}/1`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const now = new Date();
          now.setHours(0, 0, 0, 0);

          const validGigs = data
            .map((item: any) => {
              if (!item.fecha) return null;
              
              let parsedDate: Date;
              if (item.fecha.includes("/")) {
                const parts = item.fecha.split("/");
                if (parts.length === 3) {
                  // DD/MM/YYYY
                  parsedDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                } else {
                  parsedDate = new Date(item.fecha);
                }
              } else {
                parsedDate = new Date(item.fecha);
              }

              return {
                ...item,
                dateObj: parsedDate,
              };
            })
            .filter((item): item is Gig & { dateObj: Date } => item !== null && !isNaN(item.dateObj.getTime()) && item.dateObj >= now)
            .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

          setGigs(validGigs);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  // Si no hay conciertos futuros o la hoja está vacía, no se muestra la sección
  if (gigs.length === 0) return null;

  return (
    <section id="gigs" className="py-24 bg-neutral-950 text-white px-6 border-t border-white/5">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Próximos conciertos</h2>
          <p className="text-neutral-400 font-light">Próximas fechas en directo y venta de entradas.</p>
        </div>

        <div className="space-y-4">
          {gigs.map((gig, idx) => {
            const date = gig.dateObj!;
            const monthStr = date.toLocaleString("es-ES", { month: "short" }).replace(".", "").toUpperCase();
            const dayStr = date.getDate();

            return (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl bg-neutral-900/60 hover:bg-neutral-900 border border-white/5 transition-all duration-300 group shadow-2xl gap-4"
              >
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors flex-shrink-0 border border-white/5">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{monthStr}</span>
                    <span className="text-2xl font-bold text-white leading-none mt-0.5">{dayStr}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1.5 text-white">{gig.titulo}</h3>
                    <div className="flex flex-wrap items-center text-sm text-neutral-400 gap-3">
                      {gig.proyecto && (
                        <span className="px-3 py-0.5 rounded-full bg-white/10 text-xs text-white/90 font-medium border border-white/10">
                          {gig.proyecto}
                        </span>
                      )}
                      {gig.lugar && (
                        <span className="flex items-center gap-1.5 text-neutral-400 text-xs font-light">
                          <MapPin className="w-3.5 h-3.5 text-neutral-500" /> {gig.lugar}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {gig.entradas && (
                  <a
                    href={gig.entradas}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-6 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 self-start md:self-center flex-shrink-0 shadow-lg"
                  >
                    <span>Entradas</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
