/**
 * Inserta datos estructurados schema.org.
 *
 * El escapado de "<" evita que un texto de la hoja de conciertos pueda
 * cerrar la etiqueta script e inyectar HTML en la página.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
