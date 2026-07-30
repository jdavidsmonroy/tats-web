"use client";

import { Send, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-black text-white px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Contacto & booking</h2>
          <p className="text-neutral-400 font-light mb-4">¿Quieres contar conmigo para tu próximo evento? Hablemos.</p>
          <a
            href="mailto:musiclookandmore@gmail.com"
            className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full shadow-lg"
          >
            <Mail className="w-4 h-4 text-neutral-400" />
            <span>musiclookandmore@gmail.com</span>
          </a>
        </div>

        <div className="bg-neutral-900 rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-neutral-300">Nombre / empresa</label>
                <input 
                  type="text" 
                  id="name"
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-300">Email</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-neutral-300">Mensaje</label>
              <textarea 
                id="message"
                rows={5}
                className="w-full bg-neutral-950 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all resize-none"
                placeholder="Cuéntame sobre tu evento..."
              />
            </div>
            <button 
              type="submit"
              className="w-full h-14 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors active:scale-[0.98]"
            >
              Enviar mensaje <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
