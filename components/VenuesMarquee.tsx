"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function VenuesMarquee() {
  const venues = [
    "Moe",
    "Gauderes",
    "Monkey Rock",
    "La Prensa",
    "El Patio",
    "Trotaconventos",
    "El Nogal",
    "La Vida Tiene Sentidos",
    "Café Artesanal",
  ];

  // Duplicate array for seamless infinite scroll
  const marqueeItems = [...venues, ...venues];

  return (
    <section className="py-12 bg-neutral-950 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-6">
        <p className="text-center text-xs uppercase tracking-widest text-neutral-500 font-medium flex items-center justify-center gap-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>Salas y escenarios donde he actuado</span>
        </p>
      </div>

      <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
          className="flex flex-nowrap gap-6 items-center min-w-max"
        >
          {marqueeItems.map((venue, i) => (
            <div
              key={i}
              className="px-6 py-3 rounded-full bg-neutral-900/80 border border-white/5 text-sm text-neutral-300 font-light backdrop-blur-md hover:border-white/20 transition-all flex items-center gap-3 whitespace-nowrap shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span>{venue}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
