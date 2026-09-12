"use client";

import { useState } from "react";
import { Send, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // campo trampa para bots
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(data.error || "No se pudo enviar el mensaje.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMessage("No hay conexión con el servidor. Inténtalo de nuevo.");
      setStatus("error");
    }
  };

  const disabled = status === "sending";

  return (
    <section id="contact" className="py-24 bg-black text-white px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Contacto & booking</h2>
          <p className="text-neutral-400 font-light mb-4">¿Quieres contar conmigo para tu próximo evento? Hablemos.</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full shadow-lg"
          >
            <Mail className="w-4 h-4 text-neutral-400" />
            <span>{siteConfig.email}</span>
          </a>
        </div>

        <div className="bg-neutral-900 rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
          {status === "sent" ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 mx-auto text-white" />
              <h3 className="text-2xl font-medium">Mensaje enviado</h3>
              <p className="text-neutral-400 font-light">
                Gracias por escribir. Te responderé lo antes posible.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-sm text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-neutral-300">Nombre / empresa</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={120}
                    disabled={disabled}
                    autoComplete="name"
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all disabled:opacity-50"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-neutral-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={160}
                    disabled={disabled}
                    autoComplete="email"
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all disabled:opacity-50"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-neutral-300">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  maxLength={5000}
                  disabled={disabled}
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all resize-none disabled:opacity-50"
                  placeholder="Cuéntame sobre tu evento..."
                />
              </div>

              <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">No rellenar</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {status === "error" && (
                <p className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={disabled}
                className="w-full h-14 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {disabled ? (
                  <>Enviando <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : (
                  <>Enviar mensaje <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
