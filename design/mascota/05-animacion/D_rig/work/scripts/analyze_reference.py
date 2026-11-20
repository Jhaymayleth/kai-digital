#!/usr/bin/env python3
"""Reference comparison and technical analysis for the KAI Phase 1 POC.

Read-only with respect to the original project assets. All outputs are written
inside design/mascota/05-animacion/D_rig/work/.

Dependencies: Pillow, NumPy, OpenCV (already present in the audited environment).
"""
from __future__ import annotations

import hashlib
import json
import math
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

WORK = Path(__file__).resolve().parent.parent
INPUT = WORK / "00_input"
NORMALIZED = WORK / "01_normalized"
MASKS = WORK / "02_masks"
LABELS = WORK / "03_labels"
SHEETS = WORK / "08_contact_sheets"
REPORTS = WORK / "10_reports"
for d in (NORMALIZED, MASKS, LABELS, SHEETS, REPORTS):
    d.mkdir(parents=True, exist_ok=True)

# Approved five-colour base palette (design/mascota/01-referencias/KAI_master_palette.gpl)
PALETTE = {
    "sumi": (14, 16, 15),        # #0E100F
    "washi": (247, 245, 240),    # #F7F5F0
    "smoke": (184, 176, 165),    # #B8B0A5
    "crimson": (165, 28, 48),    # #A51C30
    "amber": (214, 164, 65),     # #D6A441
}
PALETTE_HEX = {k: "#%02X%02X%02X" % v for k, v in PALETTE.items()}


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def load_rgba(path: Path) -> np.ndarray:
    return np.array(Image.open(path).convert("RGBA"))


def alpha_bbox(rgba: np.ndarray) -> list[int] | None:
    a = rgba[:, :, 3]
    ys, xs = np.where(a > 8)
    if len(xs) == 0:
        return None
    return [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())]


def color_stats(rgba: np.ndarray) -> dict:
    a = rgba[:, :, 3]
    opaque = rgba[a > 200][:, :3].astype(np.int32)
    n = int(len(opaque))
    if n == 0:
        return {"opaque_pixels": 0}
    # exact top colours (quantized to 4 bits per channel to keep the report small)
    q = (opaque // 8) * 8
    uniq, counts = np.unique(q, axis=0, return_counts=True)
    order = np.argsort(counts)[-15:][::-1]
    top = [
        {
            "rgb": [int(x) for x in uniq[i]],
            "hex": "#%02X%02X%02X" % tuple(int(x) for x in uniq[i]),
            "pixels": int(counts[i]),
            "percent": round(100.0 * counts[i] / n, 3),
        }
        for i in order
    ]
    # nearest canonical palette colour in RGB
    pal = np.array(list(PALETTE.values()), dtype=np.int32)
    dist = np.sqrt(((opaque[:, None, :] - pal[None, :, :]) ** 2).sum(axis=2))
    nearest = dist.argmin(axis=1)
    mind = dist.min(axis=1)
    names = list(PALETTE.keys())
    coverage = {}
    for i, name in enumerate(names):
        sel = nearest == i
        coverage[name] = {
            "pixels": int(sel.sum()),
            "percent": round(100.0 * sel.sum() / n, 3),
            "within_12": int((sel & (mind <= 12)).sum()),
            "within_24": int((sel & (mind <= 24)).sum()),
            "within_48": int((sel & (mind <= 48)).sum()),
        }
    return {
        "opaque_pixels": n,
        "top_colours_quantized": top,
        "palette_coverage": coverage,
        "within_12_percent": round(100.0 * (mind <= 12).mean(), 3),
        "within_24_percent": round(100.0 * (mind <= 24).mean(), 3),
        "within_48_percent": round(100.0 * (mind <= 48).mean(), 3),
        "median_distance": round(float(np.median(mind)), 3),
        "mean_distance": round(float(mind.mean()), 3),
    }


def palette_masks(rgba: np.ndarray) -> dict[str, np.ndarray]:
    rgb = rgba[:, :, :3].astype(np.int32)
    a = rgba[:, :, 3]
    masks = {}
    for name, col in PALETTE.items():
        d = np.sqrt(((rgb - np.array(col, dtype=np.int32)) ** 2).sum(axis=2))
        masks[name] = ((d <= 36) & (a > 160)).astype(np.uint8) * 255
    # dark ink: low luminance, useful for hair / lineart / jacket
    lum = (0.2126 * rgb[:, :, 0] + 0.7152 * rgb[:, :, 1] + 0.0722 * rgb[:, :, 2])
    masks["dark"] = ((lum < 80) & (a > 160)).astype(np.uint8) * 255
    # near-white: bright, low saturation, useful for S1/S2 candidates
    mx = rgb.max(axis=2)
    mn = rgb.min(axis=2)
    sat = (mx - mn) / np.maximum(mx, 1)
    masks["near_white"] = (((lum > 210) & (sat < 0.10) & (a > 160))).astype(np.uint8) * 255
    # warm skin / cream (face and inner kimono)
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    masks["warm_cream"] = (((r > 205) & (g > 190) & (b > 170) & (r >= g) & (g >= b - 8) & (a > 160))).astype(np.uint8) * 255
    # amber / iris
    hsv = cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2HSV)
    masks["amber_iris"] = (((hsv[:, :, 0] >= 8) & (hsv[:, :, 0] <= 32) & (hsv[:, :, 1] > 90) & (hsv[:, :, 2] > 90) & (a > 160))).astype(np.uint8) * 255
    # crimson
    masks["crimson_strong"] = (((hsv[:, :, 0] <= 8) | (hsv[:, :, 0] >= 170)) & (hsv[:, :, 1] > 80) & (hsv[:, :, 2] > 60) & (a > 160)).astype(np.uint8) * 255
    return masks


def components(mask: np.ndarray, min_area: int = 20) -> list[dict]:
    n, lab, stats, cents = cv2.connectedComponentsWithStats(mask, connectivity=8)
    out = []
    for i in range(1, n):
        x, y, w, h, area = stats[i]
        if area < min_area:
            continue
        out.append({
            "id": int(i),
            "bbox": [int(x), int(y), int(x + w), int(y + h)],
            "area": int(area),
            "centroid": [round(float(cents[i][0]), 2), round(float(cents[i][1]), 2)],
            "aspect": round(float(w) / max(h, 1), 3),
        })
    out.sort(key=lambda d: d["area"], reverse=True)
    return out


def save_mask(path: Path, mask: np.ndarray) -> None:
    Image.fromarray(mask).save(path)


def overlay_mask(rgba: np.ndarray, mask: np.ndarray, colour=(255, 0, 255)) -> Image.Image:
    base = Image.fromarray(rgba).convert("RGBA")
    arr = np.array(base)
    sel = mask > 0
    arr[sel, 0] = colour[0]
    arr[sel, 1] = colour[1]
    arr[sel, 2] = colour[2]
    arr[sel, 3] = 255
    return Image.fromarray(arr)


def comparison_sheet(idle: np.ndarray, shared: np.ndarray, out: Path) -> dict:
    """Side-by-side comparison at equal character height on a checker background."""
    H = 900
    pad = 40
    label_h = 46

    def prep(rgba):
        im = Image.fromarray(rgba).convert("RGBA")
        bbox = im.getchannel("A").getbbox()
        if bbox:
            im = im.crop(bbox)
        scale = H / im.height
        im = im.resize((max(1, round(im.width * scale)), H), Image.LANCZOS)
        return im

    a = prep(idle)
    b = prep(shared)
    gap = 60
    W = pad * 2 + a.width + gap + b.width
    canvas = Image.new("RGB", (W, H + pad * 2 + label_h), (245, 243, 238))
    d = ImageDraw.Draw(canvas)
    # checkerboard behind each figure
    def checker(x0, y0, w, h, size=12):
        for yy in range(y0, y0 + h, size):
            for xx in range(x0, x0 + w, size):
                if ((xx - x0) // size + (yy - y0) // size) % 2 == 0:
                    d.rectangle([xx, yy, min(xx + size - 1, x0 + w - 1), min(yy + size - 1, y0 + h - 1)], fill=(232, 229, 222))
    checker(pad, pad, a.width, H)
    checker(pad + a.width + gap, pad, b.width, H)
    canvas.paste(a, (pad, pad), a)
    canvas.paste(b, (pad + a.width + gap, pad), b)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 22)
        small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 15)
    except Exception:
        font = ImageFont.load_default()
        small = font
    d.text((pad, pad + H + 6), "kai-idle.webp — 429x939 — front neutral", fill=(30, 30, 30), font=font)
    d.text((pad + a.width + gap, pad + H + 6), "public/og-cover.webp — 469x939 — shared/guide pose", fill=(30, 30, 30), font=font)
    d.text((pad, 12), "KAI Phase 1 — reference comparison (equal character height, checkerboard = transparency)", fill=(80, 80, 80), font=small)
    canvas.save(out)
    return {"sheet": str(out.relative_to(WORK)), "idle_scaled": list(a.size), "shared_scaled": list(b.size)}


def landmark_report(rgba: np.ndarray, masks: dict[str, np.ndarray]) -> dict:
    h, w = rgba.shape[:2]
    amber = masks["amber_iris"]
    comps = components(amber, min_area=30)
    eyes = [c for c in comps if c["centroid"][1] < h * 0.5][:4]
    # merge close components into left/right eye clusters
    eyes.sort(key=lambda c: c["centroid"][0])
    eye_clusters = []
    for c in eyes:
        if eye_clusters and abs(c["centroid"][0] - eye_clusters[-1]["centroid"][0]) < w * 0.08:
            e = eye_clusters[-1]
            e["bbox"] = [min(e["bbox"][0], c["bbox"][0]), min(e["bbox"][1], c["bbox"][1]),
                         max(e["bbox"][2], c["bbox"][2]), max(e["bbox"][3], c["bbox"][3])]
            e["area"] += c["area"]
            e["centroid"] = [round((e["centroid"][0] + c["centroid"][0]) / 2, 2),
                             round((e["centroid"][1] + c["centroid"][1]) / 2, 2)]
        else:
            eye_clusters.append(dict(c))
    # face: largest warm-cream component in the upper 55 %
    warm = masks["warm_cream"].copy()
    warm[int(h * 0.55):, :] = 0
    face_comps = components(warm, min_area=500)
    face = face_comps[0] if face_comps else None
    # white streaks: near-white components in the upper 45 %, excluding the face bbox
    white = masks["near_white"].copy()
    white[int(h * 0.45):, :] = 0
    if face:
        fx0, fy0, fx1, fy1 = face["bbox"]
        # keep only components whose centroid is outside the central face core
        wc = []
        for c in components(white, min_area=40):
            cx, cy = c["centroid"]
            if not (fx0 + 0.15 * (fx1 - fx0) < cx < fx1 - 0.15 * (fx1 - fx0) and fy0 + 0.25 * (fy1 - fy0) < cy < fy1):
                wc.append(c)
        white_comps = wc[:8]
    else:
        white_comps = components(white, min_area=40)[:8]
    return {
        "image_size": [w, h],
        "alpha_bbox": alpha_bbox(rgba),
        "eye_clusters": eye_clusters,
        "face_component": face,
        "white_streak_candidates": white_comps,
    }


def analyze(path: Path, name: str) -> dict:
    rgba = load_rgba(path)
    h, w = rgba.shape[:2]
    bbox = alpha_bbox(rgba)
    stats = color_stats(rgba)
    masks = palette_masks(rgba)
    lm = landmark_report(rgba, masks)
    # save normalised PNG and masks
    Image.fromarray(rgba).save(NORMALIZED / f"{name}.png")
    for mname, m in masks.items():
        save_mask(MASKS / f"{name}__{mname}.png", m)
    # diagnostic label map: nearest palette colour (or black for effect colours)
    rgb = rgba[:, :, :3].astype(np.int32)
    pal = np.array(list(PALETTE.values()), dtype=np.int32)
    dist = np.sqrt(((rgb[:, :, None, :] - pal[None, None, :, :]) ** 2).sum(axis=3))
    nearest = dist.argmin(axis=2)
    mind = dist.min(axis=2)
    label = np.zeros((h, w, 3), dtype=np.uint8)
    for i, col in enumerate(PALETTE.values()):
        label[nearest == i] = col
    label[(rgba[:, :, 3] < 8)] = 0
    # mark far-from-palette pixels in magenta for inspection
    far = (mind > 60) & (rgba[:, :, 3] > 160)
    label[far] = (255, 0, 255)
    Image.fromarray(label).save(LABELS / f"{name}__palette_label.png")
    # overlay masks for inspection
    for mname in ("dark", "near_white", "warm_cream", "amber_iris", "crimson_strong"):
        overlay_mask(rgba, masks[mname]).save(MASKS / f"{name}__{mname}_overlay.png")
    return {
        "name": name,
        "source": str(path.relative_to(WORK)),
        "sha256": sha256(path),
        "dimensions": [w, h],
        "mode": "RGBA",
        "alpha_bbox": bbox,
        "bbox_center": [round((bbox[0] + bbox[2]) / 2, 2), round((bbox[1] + bbox[3]) / 2, 2)] if bbox else None,
        "ground_anchor_y": bbox[3] if bbox else None,
        "opaque_pixels": int((rgba[:, :, 3] > 200).sum()),
        "color": stats,
        "landmarks": lm,
    }


def main() -> None:
    idle_path = INPUT / "candidate_kai_idle.webp"
    shared_path = INPUT / "candidate_shared_og_cover.webp"
    idle = load_rgba(idle_path)
    shared = load_rgba(shared_path)
    sheet = comparison_sheet(idle, shared, SHEETS / "reference_comparison.png")
    idle_report = analyze(idle_path, "kai_idle")
    shared_report = analyze(shared_path, "shared_og_cover")
    report = {
        "generated_by": "scripts/analyze_reference.py",
        "workspace": str(WORK),
        "candidates": {
            "kai_idle": idle_report,
            "shared_og_cover": shared_report,
        },
        "comparison_sheet": sheet,
        "note": (
            "public/og-cover.webp is byte-identical to src/assets/kai/kai-guide.webp "
            "(SHA-256 20f2ae34...). No separate attachment file exists in the workspace; "
            "the public OG cover is the only project asset that represents the previously "
            "shared approved illustration. It is a pointing/guide pose, not a neutral front view."
        ),
    }
    (REPORTS / "reference_comparison.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps({
        "comparison_sheet": str(SHEETS / "reference_comparison.png"),
        "report": str(REPORTS / "reference_comparison.json"),
        "idle": {"size": idle_report["dimensions"], "bbox": idle_report["alpha_bbox"], "sha256": idle_report["sha256"]},
        "shared": {"size": shared_report["dimensions"], "bbox": shared_report["alpha_bbox"], "sha256": shared_report["sha256"]},
    }, indent=2))


if __name__ == "__main__":
    main()
