"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email, website, source: "waitlist" }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(data.error || "No se pudo guardar tu correo.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setEmail("");
    } catch {
      setErrorMessage("No hay conexión con el servidor. Inténtalo de nuevo.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex items-start gap-3 text-sm text-neutral-300">
        <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />
        <p>
          Apuntado. Te avisaré en cuanto <em>Migajas</em> esté listo para preventa.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="waitlist-email" className="sr-only">
          Tu correo electrónico
        </label>
        <input
          type="email"
          id="waitlist-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={160}
          autoComplete="email"
          disabled={status === "sending"}
          placeholder="Tu correo electrónico"
          className="bg-neutral-800 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 flex-grow disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-white text-black font-medium px-6 py-3 rounded-2xl text-sm hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <>
              <span>Enviando</span>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              <span>Avisarme</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="waitlist-website">No rellenar</label>
        <input
          type="text"
          id="waitlist-website"
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
    </form>
  );
}
