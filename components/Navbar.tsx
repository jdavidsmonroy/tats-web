"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { ChevronDown, Music, BookOpen, Mic2, Disc, Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";

const projectLinks = [
  {
    href: "/projects/in-the-mix",
    icon: Mic2,
    title: "In The Mix",
    subtitle: "Soul, Funk & Pop",
  },
  {
    href: "/projects/deep-roots",
    icon: Music,
    title: "Deep Roots Duo",
    subtitle: "Dúo acústico Pop-Rock",
  },
  {
    href: "/projects/poesia",
    icon: BookOpen,
    title: "Migajas",
    subtitle: "Poemario de Tatiana Ravassa",
  },
  {
    href: "/projects/colaboraciones",
    icon: Disc,
    title: "Colaboraciones",
    subtitle: "Grabaciones & duetos",
  },
];

export default function Navbar({ hasGigs = false }: { hasGigs?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Con el menú abierto, el fondo no debe poder desplazarse.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sectionLinks = [
    { href: "/#about", label: "Sobre mí" },
    { href: "/bodas-y-eventos", label: "Bodas y eventos" },
    { href: "/#gallery", label: "Galería" },
    // El ancla solo existe cuando hay fechas futuras que mostrar.
    ...(hasGigs ? [{ href: "/#gigs", label: "Conciertos" }] : []),
    { href: "/#contact", label: "Contacto" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-black/85 backdrop-blur-xl border-b border-white/10 py-4"
          : "bg-black/40 backdrop-blur-md py-6 border-b border-white/10"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="text-xl font-thin tracking-[0.25em] pl-[0.25em] uppercase font-[family-name:var(--font-montserrat)] hover:opacity-80 transition-opacity"
        >
          TATS
        </Link>

        <div className="hidden md:flex space-x-8 items-center text-sm font-medium text-white/70">
          <Link href="/#about" className="hover:text-white transition-colors">Sobre mí</Link>

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
                  className="absolute top-full left-0 mt-2 w-64 bg-neutral-900 backdrop-blur-xl border border-white/10 rounded-3xl p-2 z-50"
                >
                  {projectLinks.map(({ href, icon: Icon, title, subtitle }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-white/5 text-white/80 hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-white">{title}</span>
                        <span className="text-[10px] text-neutral-400 font-light">{subtitle}</span>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/bodas-y-eventos" className="hover:text-white transition-colors">Bodas y eventos</Link>
          <Link href="/#gallery" className="hover:text-white transition-colors">Galería</Link>
          {hasGigs && (
            <Link href="/#gigs" className="hover:text-white transition-colors">Conciertos</Link>
          )}
          <Link href="/#contact" className="hover:text-white transition-colors">Contacto</Link>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/5 transition-colors inline-block text-white/70 hover:text-white"
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

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/10 mt-4"
          >
            <div className="container mx-auto px-6 py-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="flex flex-col gap-1">
                {sectionLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-lg text-white/80 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                  Proyectos
                </span>
                <div className="flex flex-col gap-1 mt-3">
                  {projectLinks.map(({ href, icon: Icon, title, subtitle }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 -mx-3 rounded-2xl hover:bg-white/5 text-white/80 hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-white">{title}</span>
                        <span className="text-xs text-neutral-400 font-light">{subtitle}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
