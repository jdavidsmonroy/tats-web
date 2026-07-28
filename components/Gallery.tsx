"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const images = [
    { src: "/images/artmoniza/tats-guitarra.jpeg", title: "Tats", className: "col-span-2 row-span-2" },
    { src: "/images/artmoniza/photo3.jpg", title: "Tats", className: "col-span-1" },
    { src: "/images/in-the-mix/photo1.jpg", title: "In The Mix", className: "col-span-1" },
    { src: "/images/artmoniza/photo4.jpg", title: "Tats", className: "col-span-2 md:col-span-2" },
    { src: "/images/deep-roots/photo1.jpg", title: "Deep Roots Duo", className: "col-span-1" },
    { src: "/images/artmoniza/photo5.jpg", title: "Tats", className: "col-span-1" },
    { src: "/images/in-the-mix/photo2.jpg", title: "In The Mix en directo", className: "col-span-2 md:col-span-2" },
    { src: "/images/deep-roots/photo3.webp", title: "Deep Roots Duo", className: "col-span-1" },
    { src: "/images/artmoniza/photo1.jpg", title: "Tats", className: "col-span-1" },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  }, [selectedIndex, images.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  }, [selectedIndex, images.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    },
    [selectedIndex, handlePrev, handleNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [handleKeyDown, selectedIndex]);

  return (
    <section id="gallery" className="py-24 bg-black text-white px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Galería visual</h2>
            <p className="text-neutral-400 font-light">Momentos de Tats, In The Mix & Deep Roots</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          {images.map((img, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedIndex(i)}
              className={`bg-neutral-900 rounded-3xl bg-cover bg-center border border-white/5 opacity-85 hover:opacity-100 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-2xl ${img.className}`}
              style={{ backgroundImage: `url(${img.src})` }}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal Slider */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 z-50 text-sm text-neutral-400 font-light bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-8 z-50 p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 z-50 p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Container */}
            <div 
              className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex].src}
                alt={images[selectedIndex].title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
              <p className="mt-4 text-neutral-300 text-sm font-light text-center">
                {images[selectedIndex].title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
