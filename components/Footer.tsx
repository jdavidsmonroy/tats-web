import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="py-8 bg-neutral-950 border-t border-white/10 text-center text-sm text-neutral-500">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Tats Music. Todos los derechos reservados.</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-white transition-colors"
          >
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
