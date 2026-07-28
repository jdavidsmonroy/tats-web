export default function Footer() {
  return (
    <footer className="py-8 bg-neutral-950 border-t border-white/5 text-center text-sm text-neutral-500">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Tats Music. Todos los derechos reservados.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Aviso legal</a>
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
        </div>
      </div>
    </footer>
  );
}
