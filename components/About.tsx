export default function About() {
  return (
    <section id="about" className="py-24 bg-black text-white px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] bg-neutral-900 rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl group">
            <div className="w-full h-full bg-[url('/images/artmoniza/tats-guitarra.jpeg')] bg-cover bg-center -scale-x-100 opacity-95" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">Sobre mí</h2>
            <p className="text-xl text-neutral-400 font-light leading-relaxed">
              Cantante, vocalista y poetisa. Con años de experiencia en los escenarios, me especializo en fusionar géneros y conectar con el público desde la honestidad y la emoción. Ya sea como vocalista en un cuarteto de soul-funk, en formato acústico íntimo o a través de la palabra escrita en mi primer poemario, mi objetivo es transmitir sensibilidad y energía viva.
            </p>
            <div className="flex gap-8 pt-4">
              <div className="flex flex-col border-l-2 border-white/20 pl-4">
                <span className="text-3xl font-bold">10+</span>
                <span className="text-sm text-neutral-500">años de exp.</span>
              </div>
              <div className="flex flex-col border-l-2 border-white/20 pl-4">
                <span className="text-3xl font-bold">500+</span>
                <span className="text-sm text-neutral-500">conciertos</span>
              </div>
              <div className="flex flex-col border-l-2 border-white/20 pl-4">
                <span className="text-3xl font-bold">1</span>
                <span className="text-sm text-neutral-500">libro de poesía</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
