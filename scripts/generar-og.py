#!/usr/bin/env python3
"""
Genera las tarjetas 1200x630 que se ven al compartir la web (public/og/).

Uso:  python3 scripts/generar-og.py
Requiere Pillow  ->  pip3 install Pillow

Las fotos del sitio son verticales o cuadradas, así que no sirven como
imagen social: al compartirlas quedan recortadas o en miniatura. Este
script compone cada tarjeta con el título sobre fondo negro y la foto
fundida a la derecha.
"""

from PIL import Image, ImageDraw, ImageFont
import os, sys

W, H = 1200, 630
FONT = "/System/Library/Fonts/Avenir Next.ttc"
ULTRA, REG, DEMI = 10, 7, 2
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public/og")
os.makedirs(OUT, exist_ok=True)

def tracked(draw, xy, text, font, fill, tracking=0):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x - tracking

def tracked_width(draw, text, font, tracking=0):
    return sum(draw.textlength(c, font=font) for c in text) + tracking * (len(text) - 1)

def wrap(draw, text, font, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=font) <= maxw:
            cur = t
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def make(photo_rel, title, subtitle, out_name, focus=0.5, eyebrow=None):
    canvas = Image.new("RGB", (W, H), (0, 0, 0))

    # Foto a la derecha, recortada a una banda vertical y fundida a negro.
    src = Image.open(os.path.join(ROOT, "public", photo_rel)).convert("RGB")
    pane_w = 560
    scale = max(pane_w / src.width, H / src.height)
    new = src.resize((round(src.width * scale), round(src.height * scale)), Image.LANCZOS)
    left = max(0, (new.width - pane_w) // 2)
    top = max(0, min(new.height - H, round(new.height * focus - H / 2)))
    pane = new.crop((left, top, left + pane_w, top + H))

    canvas.paste(pane, (W - pane_w, 0))

    # Degradado horizontal para fundir la foto con el fondo.
    grad = Image.new("L", (pane_w, 1))
    for x in range(pane_w):
        t = x / (pane_w - 1)
        grad.putpixel((x, 0), int(255 * min(1.0, max(0.0, (t - 0.05) / 0.55)) ** 0.9))
    mask = grad.resize((pane_w, H))
    black = Image.new("RGB", (pane_w, H), (0, 0, 0))
    blended = Image.composite(pane, black, mask)
    canvas.paste(blended, (W - pane_w, 0))

    d = ImageDraw.Draw(canvas)
    x0, maxw = 80, 520

    f_eyebrow = ImageFont.truetype(FONT, 20, index=DEMI)
    f_title = ImageFont.truetype(FONT, 92, index=ULTRA)
    f_sub = ImageFont.truetype(FONT, 27, index=REG)

    # Ajusta el cuerpo del título hasta que quepa en una línea.
    size, tracking = 92, 14
    # Se mide el texto tal y como se dibuja (en mayúsculas), o el título
    # se sale de su columna e invade la foto.
    while tracked_width(d, title.upper(), ImageFont.truetype(FONT, size, index=ULTRA), tracking) > maxw and size > 30:
        size -= 2
        tracking = max(4, tracking - 0.3)
    f_title = ImageFont.truetype(FONT, size, index=ULTRA)

    sub_lines = wrap(d, subtitle, f_sub, maxw)
    block_h = (28 if eyebrow else 0) + size + 18 + len(sub_lines) * 38
    y = (H - block_h) // 2

    if eyebrow:
        tracked(d, (x0, y), eyebrow.upper(), f_eyebrow, (150, 150, 150), tracking=3)
        y += 46

    tracked(d, (x0, y), title.upper(), f_title, (255, 255, 255), tracking=tracking)
    y += size + 26

    for line in sub_lines:
        d.text((x0, y), line, font=f_sub, fill=(168, 168, 168))
        y += 38

    path = os.path.join(OUT, out_name)
    canvas.save(path, "JPEG", quality=88, optimize=True, progressive=True)
    print(out_name, canvas.size, f"{os.path.getsize(path)//1024}KB")

if __name__ == "__main__":
    make("images/tats/tats-guitarra.jpeg", "Tats",
         "Cantante, vocalista y poetisa", "home.jpg",
         focus=0.42, eyebrow="Conciertos, bodas y eventos")
    make("images/in-the-mix/poster-featured.jpg", "In The Mix",
         "Cuarteto de Soul, Funk y Pop de Madrid", "in-the-mix.jpg",
         focus=0.45, eyebrow="Tats")
    make("images/deep-roots/photo1.jpg", "Deep Roots",
         "Dúo acústico de Pop-Rock para eventos y bodas", "deep-roots.jpg",
         focus=0.4, eyebrow="Tats")
    make("images/poetry-book.jpeg", "Migajas",
         "Poemario de Tatiana Ravassa", "poesia.jpg",
         focus=0.5, eyebrow="Tats")
    make("images/tats/photo4.jpg", "Colaboraciones",
         "Serie semanal con Olcay Yavuz", "colaboraciones.jpg",
         focus=0.4, eyebrow="Tats")
