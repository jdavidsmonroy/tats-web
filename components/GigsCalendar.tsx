import { CalendarDays, MapPin } from "lucide-react";

export default function GigsCalendar() {
  return (
    <section id="tour" className="py-24 bg-neutral-950 text-white px-6 border-t border-white/5">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Próximos conciertos</h2>
          <p className="text-neutral-400 font-light">
            Fechas de la gira y eventos. (Marcador de posición para la integración con Google Calendar API).
          </p>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900 border border-white/5 transition-colors group"
            >
              <div className="flex items-start md:items-center gap-6 mb-4 md:mb-0">
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">OCT</span>
                  <span className="text-2xl font-bold">24</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Festival In The Mix</h3>
                  <div className="flex items-center text-sm text-neutral-400 gap-4">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Madrid, ES</span>
                  </div>
                </div>
              </div>
              <button className="h-12 px-6 rounded-full border border-white/20 text-sm font-medium hover:bg-white hover:text-black transition-colors md:self-center">
                Tickets / Info
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
