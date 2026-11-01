"""Rebuild lettering SVGs from their source artwork; not needed to serve the site.

Design tooling only: pip install vtracer==0.6.12 pillow numpy
Run from the repository root: python design/trace-lettering.py
"""
from io import BytesIO
from pathlib import Path
import xml.etree.ElementTree as ET

import numpy as np
from PIL import Image
import vtracer

ROOT = Path(__file__).resolve().parents[1]
NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", NS)
HEADINGS = [
    ("our-games", "Our games"),
    ("a-little-more-play", "A little more play."),
    ("help-us-keep-playing", "Help us keep playing."),
    ("your-time-is-for-playing", "Your time is for playing."),
    ("page-not-found", "Page not found."),
]


def trace(mask, destination, label):
    # VTracer's binary mode reads luminance, not the PNG's alpha mask.
    # Flatten the shape to black on white first so transparency is not
    # accidentally traced as a filled rectangle.
    image = Image.fromarray(np.where(mask, 0, 255).astype("uint8")).convert("RGBA")
    stream = BytesIO()
    image.save(stream, format="PNG")
    svg = vtracer.convert_raw_image_to_svg(
        stream.getvalue(), img_format="png", colormode="binary",
        mode="spline", filter_speckle=2, path_precision=2,
    )
    root = ET.fromstring(svg)
    width, height = image.size
    root.set("viewBox", f"0 0 {width} {height}")
    root.set("focusable", "false")
    title = ET.Element(f"{{{NS}}}title")
    title.text = label
    root.insert(0, title)
    paths = root.findall(f"{{{NS}}}path")
    assert len(paths) > 1, f"Unexpected empty/rectangle trace: {destination}"
    for path in paths:
        path.set("fill", "#232323")
    assert not root.findall(f".//{{{NS}}}image")
    assert not root.findall(f".//{{{NS}}}text")
    destination.parent.mkdir(parents=True, exist_ok=True)
    ET.indent(root)
    ET.ElementTree(root).write(destination, encoding="unicode", xml_declaration=True)
    print(f"{destination.relative_to(ROOT)}: {width}×{height}, {len(paths)} paths")


sheet = Image.open(ROOT / "design/generated/heading-lettering-sheet.png").convert("RGB")
ink = np.asarray(sheet).mean(axis=2) < 128
rows = np.flatnonzero(ink.sum(axis=1) > 10)
bands = []
for y in rows:
    if bands and y - bands[-1][-1] < 30:
        bands[-1].append(int(y))
    else:
        bands.append([int(y)])
assert len(bands) == len(HEADINGS), f"Expected five separated headings, got {len(bands)}"
for (slug, label), band in zip(HEADINGS, bands):
    row = ink[band[0]:band[-1] + 1]
    columns = np.flatnonzero(row.any(axis=0))
    crop = row[:, columns[0]:columns[-1] + 1]
    crop = np.pad(crop, 4, constant_values=False)
    trace(crop, ROOT / f"docs/assets/headings/{slug}.svg", label)

for slug, label in [("help-yourself-wordmark", "Help Yourself"), ("our-promise", "Our Promise")]:
    image = Image.open(ROOT / f"docs/assets/brand/{slug}.png").convert("RGBA")
    trace(np.asarray(image)[:, :, 3] >= 128, ROOT / f"docs/assets/brand/{slug}.svg", label)
