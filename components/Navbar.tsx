"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { ChevronDown, Music, BookOpen, Mic2 } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-black/85 backdrop-blur-xl border-b border-white/10 shadow-lg py-4" 
          : "bg-black/40 backdrop-blur-md py-6 border-b border-white/5"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-thin tracking-[0.25em] pl-[0.25em] uppercase font-[family-name:var(--font-montserrat)] hover:opacity-80 transition-opacity">
          TATS
        </Link>

        <div className="hidden md:flex space-x-8 items-center text-sm font-medium text-white/70">
          <Link href="/#about" className="hover:text-white transition-colors">Sobre mí</Link>
          
          {/* Proyectos Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link 
              href="/#projects" 
              className="hover:text-white transition-colors flex items-center gap-1 py-1"
            >
              <span>Proyectos</span>
              <ChevronDown className={clsx("w-3.5 h-3.5 transition-transform duration-200", dropdownOpen && "rotate-180")} />
            </Link>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-60 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50"
                >
                  <Link
                    href="/projects/in-the-mix"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  >
                    <Mic2 className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-white">In The Mix</span>
                      <span className="text-[10px] text-neutral-400 font-light">Soul, Funk & Pop</span>
                    </div>
                  </Link>

                  <Link
                    href="/projects/deep-roots"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  >
                    <Music className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-white">Deep Roots Duo</span>
                      <span className="text-[10px] text-neutral-400 font-light">Dúo acústico Pop-Rock</span>
                    </div>
                  </Link>

                  <Link
                    href="/projects/poesia"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-white">Migajas</span>
                      <span className="text-[10px] text-neutral-400 font-light">Poemario de Tatiana Ravasa</span>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/#gallery" className="hover:text-white transition-colors">Galería</Link>
          <Link href="/#gigs" className="hover:text-white transition-colors">Conciertos</Link>
          <Link href="/#contact" className="hover:text-white transition-colors">Contacto</Link>
        </div>

        <div>
          <a
            href="https://www.instagram.com/artmoniza/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/10 transition-colors inline-block text-white/70 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span className="sr-only">Instagram</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
