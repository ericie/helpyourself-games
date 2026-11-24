"""Set "Arrow Strum" from letterforms in the approved lettering sheets.

No sheet contains the words, so each letter is lifted from one: A, r, o, t, u
and m directly, the w as an inverted m, and the S as the Games "s" scaled to
cap height. Design tooling only: pip install vtracer pillow numpy scipy
Run from the repository root: python design/compose-arrow-strum.py
"""
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as nd

ROOT = Path(__file__).resolve().parents[1]
K = 4  # supersampling


def load(name):
    gray = np.asarray(Image.open(ROOT / f"design/generated/{name}.png").convert("RGB")).mean(2)
    labels, _ = nd.label(gray < 128)
    return gray, labels, nd.find_objects(labels)


HEADING, SOLO = load("heading-lettering-sheet"), load("solo-studio-lettering-sheet")


def glyph(sheet, component, scale=1, invert=False):
    gray, labels, boxes = sheet
    box = boxes[component - 1]
    own = nd.binary_dilation(labels == component, iterations=2)[box]
    image = Image.fromarray(np.where(own, 255 - gray[box], 0).clip(0, 255).astype("uint8"))
    if invert:
        image = image.rotate(180)
    return image.resize((int(image.width * scale * K), int(image.height * scale * K)), Image.LANCZOS)


def word(letters):
    pen, x = Image.new("L", (1500 * K, 200 * K), 0), 10 * K
    for image, drop in letters:
        drawn, shape = np.asarray(pen) > 100, np.asarray(image) > 100
        y = 150 * K + drop * K - image.height
        if drawn.any():
            right = np.where(drawn.any(1), drawn.shape[1] - 1 - drawn[:, ::-1].argmax(1), -10**6)
            left = np.where(shape.any(1), shape.argmax(1), 10**6)
            near = nd.maximum_filter1d(right, 24 * K)
            rows = range(shape.shape[0])
            x = int(max(max(right[y + r] - left[r] for r in rows),
                        max(near[y + r] - left[r] for r in rows) - 3 * K) + 3 * K)
        pen.paste(Image.new("L", image.size, 255), (x, y), image)
    return pen.crop((0, 0, pen.getbbox()[2], pen.height))


arrow = word([(glyph(HEADING, 9), 2), (glyph(HEADING, 20), 1), (glyph(HEADING, 58), 1),
              (glyph(HEADING, 23), 0), (glyph(HEADING, 22, invert=True), -1)])
strum = word([(glyph(SOLO, 2, scale=.655), 2), (glyph(HEADING, 48), 1), (glyph(HEADING, 20), 1),
              (glyph(HEADING, 41), 1), (glyph(HEADING, 61), 0)])
art = Image.new("L", (arrow.width + 20 * K + strum.width, arrow.height), 0)
art.paste(arrow, (0, 0))
art.paste(strum, (arrow.width + 20 * K, 0))
mask = np.asarray(art) > 127
labels, count = nd.label(mask)
for i in range(1, count + 1):  # drop slivers of neighbouring letters
    if (labels == i).sum() < 1200 * K:
        mask[labels == i] = False
mask = nd.gaussian_filter(mask.astype(float), 1.5 * K) > .5  # round off raster steps
small = Image.fromarray((mask * 255).astype("uint8"))
small = small.crop(small.getbbox())
mask = np.pad(np.asarray(small) > 127, 4)
Image.fromarray(np.where(mask, 0, 255).astype("uint8")).save(ROOT / "design/generated/arrow-strum-lettering.png")

spec = spec_from_file_location("trace_lettering", ROOT / "design/trace-lettering.py")
tracer = module_from_spec(spec)
spec.loader.exec_module(tracer)
tracer.trace(mask, ROOT / "docs/assets/headings/arrow-strum.svg", "Arrow Strum")
