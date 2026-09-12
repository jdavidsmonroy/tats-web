import { MapPin, ExternalLink } from "lucide-react";
import type { UpcomingGig } from "@/lib/gigs";

export default function GigsCalendar({ gigs }: { gigs: UpcomingGig[] }) {
  if (gigs.length === 0) return null;

  return (
    <section
      id="gigs"
      className="scroll-mt-24 py-24 bg-neutral-950 text-white px-6 border-t border-white/10"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Próximos conciertos</h2>
          <p className="text-neutral-400 font-light">Próximas fechas en directo y venta de entradas.</p>
        </div>

        <div className="space-y-4">
          {gigs.map((gig, idx) => {
            const monthStr = gig.date
              .toLocaleString("es-ES", { month: "short" })
              .replace(".", "")
              .toUpperCase();

            return (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl bg-neutral-900 hover:border-white/20 border border-white/10 transition-colors duration-300 group gap-4"
              >
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors flex-shrink-0 border border-white/10">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{monthStr}</span>
                    <span className="text-2xl font-bold text-white leading-none mt-0.5">{gig.date.getDate()}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1.5 text-white">{gig.titulo}</h3>
                    <div className="flex flex-wrap items-center text-sm text-neutral-400 gap-3">
                      {gig.proyecto && (
                        <span className="px-3 py-0.5 rounded-full bg-white/5 text-xs text-white/90 font-medium border border-white/10">
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
                    className="h-11 px-6 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 self-start md:self-center flex-shrink-0"
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
