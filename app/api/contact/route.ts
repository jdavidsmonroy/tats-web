import nodemailer from "nodemailer";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const MAX_LENGTHS = { name: 120, email: 160, message: 5000 };

// Ventana simple anti-abuso en memoria. Se reinicia con cada instancia
// serverless, asi que frena ráfagas pero no sustituye a un captcha.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentRequests.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  hits.push(now);
  recentRequests.set(ip, hits);

  if (recentRequests.size > 500) {
    for (const [key, times] of recentRequests) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        recentRequests.delete(key);
      }
    }
  }

  return hits.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Evita que un salto de linea en el asunto inyecte cabeceras extra.
function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Petición no válida." }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;

  // Campo trampa: los humanos no lo ven, los bots suelen rellenarlo.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // La lista de espera del poemario solo pide el correo.
  const isWaitlist = body.source === "waitlist";

  if (!email || (!isWaitlist && (!name || !message))) {
    return Response.json(
      {
        error: isWaitlist
          ? "Escribe tu correo."
          : "Rellena nombre, email y mensaje.",
      },
      { status: 400 }
    );
  }

  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return Response.json({ error: "El mensaje es demasiado largo." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "El email no es válido." }, { status: 400 });
  }

  // Solo cuentan los mensajes válidos: un error de validación no debe
  // gastar el cupo de quien se equivoca al rellenar el formulario.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Demasiados envíos seguidos. Inténtalo en un minuto." },
      { status: 429 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("Faltan variables SMTP en el entorno");
    return Response.json(
      { error: "El envío no está configurado ahora mismo." },
      { status: 500 }
    );
  }

  const port = Number(SMTP_PORT);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // 465 es SSL directo; 587 arranca en claro y sube a TLS con STARTTLS.
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subject = sanitizeHeader(
    isWaitlist ? `Lista de espera Migajas: ${email}` : `Booking web: ${name}`
  );
  const lines = isWaitlist
    ? [
        "Nueva suscripción a la lista de espera del poemario Migajas.",
        "",
        `Email: ${email}`,
      ]
    : [
        `Nombre / empresa: ${name}`,
        `Email de contacto: ${email}`,
        "",
        message,
      ];

  try {
    await transporter.sendMail({
      // El remitente debe ser la cuenta autenticada o Hostinger rechaza el envío.
      from: `"Web ${siteConfig.domain}" <${SMTP_USER}>`,
      to: CONTACT_TO || siteConfig.email,
      replyTo: name ? `${sanitizeHeader(name)} <${email}>` : email,
      subject,
      text: lines.join("\n"),
      html: `<p>${lines
        .map((line) => escapeHtml(line))
        .join("</p><p>")
        .replace(/\n/g, "<br />")}</p>`,
    });
  } catch (error) {
    console.error("Fallo al enviar el correo de contacto", error);
    return Response.json(
      { error: "No se pudo enviar el mensaje. Escríbenos directamente." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
