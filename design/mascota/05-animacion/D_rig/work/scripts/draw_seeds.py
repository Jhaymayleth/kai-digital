#!/usr/bin/env python3
"""Draw proposed segmentation seeds on the KAI idle reference for inspection."""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

WORK = Path(__file__).resolve().parent.parent
SRC = WORK / "01_normalized" / "kai_idle.png"
OUT = WORK / "08_contact_sheets" / "segmentation_seeds.png"

HEAD_POLY = [
    (215, 10), (280, 14), (340, 35), (385, 75), (410, 130), (420, 190),
    (415, 240), (400, 285), (385, 320), (370, 340), (350, 330), (330, 315),
    (300, 305), (270, 298), (250, 294), (245, 290), (185, 290), (180, 294),
    (160, 300), (130, 305), (100, 315), (75, 330), (50, 340), (35, 320),
    (20, 285), (10, 240), (12, 190), (20, 130), (45, 75), (90, 35), (150, 14),
]

EYE_LEFT = (142, 225, 34, 27)   # cx, cy, rx, ry
EYE_RIGHT = (245, 224, 36, 28)
BROW_LEFT = (142, 197, 38, 13)
BROW_RIGHT = (245, 195, 40, 13)
MOUTH = (215, 270, 22, 12)


def ellipse_poly(cx, cy, rx, ry, n=64):
    return [(cx + rx * np.cos(2 * np.pi * i / n), cy + ry * np.sin(2 * np.pi * i / n)) for i in range(n)]


def main():
    im = Image.open(SRC).convert("RGBA")
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
    bg.alpha_composite(im)
    d = ImageDraw.Draw(bg, "RGBA")
    d.polygon(HEAD_POLY, outline=(0, 160, 255, 255))
    for (cx, cy, rx, ry), col in [((EYE_LEFT), (255, 0, 0, 255)), ((EYE_RIGHT), (255, 0, 0, 255))]:
        d.polygon(ellipse_poly(cx, cy, rx, ry), outline=col)
    for (cx, cy, rx, ry) in (BROW_LEFT, BROW_RIGHT):
        d.polygon(ellipse_poly(cx, cy, rx, ry), outline=(0, 200, 0, 255))
    cx, cy, rx, ry = MOUTH
    d.polygon(ellipse_poly(cx, cy, rx, ry), outline=(255, 0, 255, 255))
    # labels
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 16)
    except Exception:
        font = ImageFont.load_default()
    d.text((10, 350), "HEAD_POLY", fill=(0, 120, 220, 255), font=font)
    d.text((100, 250), "eyes", fill=(200, 0, 0, 255), font=font)
    d.text((100, 175), "brows", fill=(0, 150, 0, 255), font=font)
    d.text((190, 285), "mouth", fill=(200, 0, 200, 255), font=font)
    bg.convert("RGB").save(OUT)
    print(OUT)


if __name__ == "__main__":
    main()
