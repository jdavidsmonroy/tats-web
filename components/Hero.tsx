"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Placeholder */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black z-10" />
        {/* Aquí iría la imagen/video */}
        <div className="w-full h-full bg-[url('/images/artmoniza/photo1.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay" />
      </div>

      <div className="relative z-10 text-center px-6 mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-9xl font-black tracking-tighter mb-4 text-white"
        >
          TATS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-neutral-300 max-w-2xl mx-auto mb-10 font-light"
        >
          Versatilidad vocal y escénica. Llevando la energía de la música en directo a otro nivel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="#contact"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition-transform active:scale-95 hover:bg-neutral-200"
          >
            Contactar / booking
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
