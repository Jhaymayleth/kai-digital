#!/usr/bin/env python3
"""Phase 1 POC: deterministic head separation for KAI.

Input : 01_normalized/kai_idle.png  (working copy, original untouched)
Output: 02_masks/, 03_labels/, 04_layers/, 05_reconstruction/, 10_reports/

No generative models. No external downloads. Pillow + NumPy + OpenCV only.
"""
from __future__ import annotations

import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

WORK = Path(__file__).resolve().parent.parent
SRC = WORK / "01_normalized" / "kai_idle.png"
MASKS = WORK / "02_masks"
LABELS = WORK / "03_labels"
LAYERS = WORK / "04_layers"
RECON = WORK / "05_reconstruction"
REPORTS = WORK / "10_reports"
SHEETS = WORK / "08_contact_sheets"
for d in (MASKS, LABELS, LAYERS, RECON, REPORTS, SHEETS):
    d.mkdir(parents=True, exist_ok=True)

# --- Approved five-colour base palette -------------------------------------
SUMI = (14, 16, 15)
WASHI = (247, 245, 240)
SMOKE = (184, 176, 165)
CRIMSON = (165, 28, 48)
AMBER = (214, 164, 65)

# --- One-time, documented seed geometry (pixels on the 429x939 canvas) -----
# The polygon follows the outer hair silhouette and cuts across the chin so
# that the neck stays with the body. It is deliberately generous around the
# hair tips; a 1 px dilation is applied afterwards.
HEAD_POLY = [
    (215, 10), (280, 14), (340, 35), (385, 75), (410, 130), (420, 190),
    (415, 240), (400, 285), (385, 320), (370, 340), (350, 330), (330, 315),
    (300, 305), (270, 298), (250, 294), (245, 290), (185, 290), (180, 294),
    (160, 300), (130, 305), (100, 315), (75, 330), (50, 340), (35, 320),
    (20, 285), (10, 240), (12, 190), (20, 130), (45, 75), (90, 35), (150, 14),
]

EYE_LEFT = (142, 225, 33, 26)   # cx, cy, rx, ry
EYE_RIGHT = (248, 224, 35, 27)
BROW_LEFT_BOX = (108, 184, 178, 201)   # x0, y0, x1, y1
BROW_RIGHT_BOX = (214, 182, 286, 199)
MOUTH_BOX = (193, 264, 236, 284)
NECK_RECT = (178, 266, 254, 346)
SHOULDER_BACKFILL_Y = 294

# S1 lock silhouette, traced from the approved front-neutral reference. The
# white lock is one anatomical lock with a dark strand through it; this polygon
# keeps the whole lock together instead of only the brightest pixels.
S1_POLY = [
    (160, 40), (190, 55), (178, 90), (165, 125), (150, 160), (136, 195),
    (124, 230), (112, 265), (104, 300), (98, 325), (90, 330), (82, 315),
    (76, 290), (72, 260), (70, 230), (72, 200), (78, 170), (86, 140),
    (98, 110), (112, 85), (130, 60), (145, 45),
]


def log(msg: str) -> None:
    print(msg, flush=True)


def load_rgba(path: Path) -> np.ndarray:
    return np.array(Image.open(path).convert("RGBA"))


def save_rgba(path: Path, rgba: np.ndarray) -> None:
    Image.fromarray(rgba, "RGBA").save(path)


def save_mask(path: Path, mask: np.ndarray) -> None:
    Image.fromarray(mask, "L").save(path)


def poly_mask(shape, points) -> np.ndarray:
    m = np.zeros(shape[:2], np.uint8)
    cv2.fillPoly(m, [np.array(points, np.int32)], 255)
    return m


def ellipse_mask(shape, cx, cy, rx, ry) -> np.ndarray:
    m = np.zeros(shape[:2], np.uint8)
    cv2.ellipse(m, (int(cx), int(cy)), (int(rx), int(ry)), 0, 0, 360, 255, -1)
    return m


def box_mask(shape, x0, y0, x1, y1) -> np.ndarray:
    m = np.zeros(shape[:2], np.uint8)
    m[y0:y1, x0:x1] = 255
    return m


def fill_holes(mask: np.ndarray) -> np.ndarray:
    """Fill enclosed holes in a binary mask (0/255)."""
    m = (mask > 0).astype(np.uint8) * 255
    h, w = m.shape
    flood = m.copy()
    ff = np.zeros((h + 2, w + 2), np.uint8)
    cv2.floodFill(flood, ff, (0, 0), 255)
    holes = cv2.bitwise_not(flood)
    return cv2.bitwise_or(m, holes)


def dilate(mask: np.ndarray, px: int = 1) -> np.ndarray:
    k = np.ones((px * 2 + 1, px * 2 + 1), np.uint8)
    return cv2.dilate(mask, k, iterations=1)


def erode(mask: np.ndarray, px: int = 1) -> np.ndarray:
    k = np.ones((px * 2 + 1, px * 2 + 1), np.uint8)
    return cv2.erode(mask, k, iterations=1)


def color_masks(rgba: np.ndarray) -> dict[str, np.ndarray]:
    rgb = rgba[:, :, :3].astype(np.int32)
    a = rgba[:, :, 3]
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
    mx = rgb.max(axis=2)
    mn = rgb.min(axis=2)
    sat = (mx - mn) / np.maximum(mx, 1)
    hsv = cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2HSV)
    warm = ((r > 205) & (g > 190) & (b > 170) & (r >= g) & (g >= b - 8) & (a > 160)).astype(np.uint8) * 255
    dark = ((lum < 90) & (a > 160)).astype(np.uint8) * 255
    near_white = (((lum > 205) & (sat < 0.12) & (a > 160))).astype(np.uint8) * 255
    amber = (((hsv[:, :, 0] >= 8) & (hsv[:, :, 0] <= 32) & (hsv[:, :, 1] > 90) & (hsv[:, :, 2] > 90) & (a > 160))).astype(np.uint8) * 255
    crimson = ((((hsv[:, :, 0] <= 8) | (hsv[:, :, 0] >= 170)) & (hsv[:, :, 1] > 80) & (hsv[:, :, 2] > 60) & (a > 160))).astype(np.uint8) * 255
    return {"warm": warm, "dark": dark, "near_white": near_white, "amber": amber, "crimson": crimson}


def component_by_bbox(mask: np.ndarray, bbox: tuple[int, int, int, int], tol: int = 2) -> np.ndarray:
    """Return the connected component whose bbox matches the given bbox."""
    n, lab, stats, _ = cv2.connectedComponentsWithStats((mask > 0).astype(np.uint8), 8)
    x0, y0, x1, y1 = bbox
    best = None
    best_score = 1e9
    for i in range(1, n):
        x, y, w, h, area = stats[i]
        score = abs(x - x0) + abs(y - y0) + abs((x + w) - x1) + abs((y + h) - y1)
        if score < best_score and score <= tol * 4:
            best_score = score
            best = i
    if best is None:
        return np.zeros(mask.shape, np.uint8)
    return ((lab == best).astype(np.uint8) * 255)


def extract_layer(rgba: np.ndarray, mask: np.ndarray) -> np.ndarray:
    """Original pixels where mask is set, transparent elsewhere."""
    out = np.zeros_like(rgba)
    sel = mask > 0
    out[sel] = rgba[sel]
    return out


def composite_layers(layers: list[np.ndarray]) -> np.ndarray:
    out = Image.new("RGBA", (layers[0].shape[1], layers[0].shape[0]), (0, 0, 0, 0))
    for arr in layers:
        out.alpha_composite(Image.fromarray(arr, "RGBA"))
    return np.array(out)


def label_map(shape, regions: dict[str, np.ndarray]) -> np.ndarray:
    colours = {
        "body": (60, 60, 60),
        "neck_recon": (120, 90, 70),
        "shoulder_backfill": (30, 30, 30),
        "face": (247, 245, 240),
        "eyes": (214, 164, 65),
        "brows": (120, 80, 40),
        "mouth": (165, 28, 48),
        "hair": (14, 16, 15),
        "S1": (255, 255, 255),
        "S2": (180, 220, 255),
    }
    out = np.zeros((*shape[:2], 3), np.uint8)
    for name, m in regions.items():
        out[m > 0] = colours.get(name, (255, 0, 255))
    return out


def main() -> None:
    rgba = load_rgba(SRC)
    h, w = rgba.shape[:2]
    alpha = ((rgba[:, :, 3] > 8).astype(np.uint8) * 255)
    cm = color_masks(rgba)

    # ---------------- head / body split -----------------------------------
    head_core = poly_mask(rgba.shape, HEAD_POLY)
    head_mask = cv2.bitwise_and(dilate(head_core, 1), alpha)
    body_mask = cv2.bitwise_and(alpha, cv2.bitwise_not(head_mask))
    save_mask(MASKS / "head_mask.png", head_mask)
    save_mask(MASKS / "body_mask.png", body_mask)

    # ---------------- face region -----------------------------------------
    warm_head = cv2.bitwise_and(cm["warm"], head_mask)
    warm_head[300:, :] = 0
    n, lab, stats, cents = cv2.connectedComponentsWithStats((warm_head > 0).astype(np.uint8), 8)
    face_ids = []
    for i in range(1, n):
        x, y, ww, hh, area = stats[i]
        if area < 150:
            continue
        # face core + right ear + small forehead highlights adjacent to face
        if (x <= 110 and y >= 170) or (x >= 300 and 190 <= y <= 270) or area > 5000:
            face_ids.append(i)
    face_raw = np.zeros((h, w), np.uint8)
    for i in face_ids:
        face_raw[lab == i] = 255
    face_region = fill_holes(face_raw)
    face_region = cv2.bitwise_and(face_region, head_mask)
    face_region = cv2.bitwise_and(face_region, box_mask(rgba.shape, 0, 0, w, 301))
    save_mask(MASKS / "face_region.png", face_region)

    # ---------------- eyes -------------------------------------------------
    eye_l_raw = ellipse_mask(rgba.shape, *EYE_LEFT)
    eye_r_raw = ellipse_mask(rgba.shape, *EYE_RIGHT)
    eye_colour = cv2.bitwise_or(cm["dark"], cv2.bitwise_or(cm["amber"], cm["near_white"]))
    eye_l = cv2.bitwise_and(cv2.bitwise_and(eye_l_raw, eye_colour), head_mask)
    eye_r = cv2.bitwise_and(cv2.bitwise_and(eye_r_raw, eye_colour), head_mask)
    eye_l = fill_holes(eye_l)
    eye_r = fill_holes(eye_r)
    eye_l = dilate(eye_l, 1)
    eye_r = dilate(eye_r, 1)
    eyes = cv2.bitwise_or(eye_l, eye_r)
    save_mask(MASKS / "eye_left.png", eye_l)
    save_mask(MASKS / "eye_right.png", eye_r)
    save_mask(MASKS / "eyes_open_mask.png", eyes)

    # ---------------- brows ------------------------------------------------
    brow_l_box = box_mask(rgba.shape, *BROW_LEFT_BOX)
    brow_r_box = box_mask(rgba.shape, *BROW_RIGHT_BOX)
    brow_l = cv2.bitwise_and(cv2.bitwise_and(brow_l_box, cm["dark"]), head_mask)
    brow_r = cv2.bitwise_and(cv2.bitwise_and(brow_r_box, cm["dark"]), head_mask)
    # Keep thin strokes only; drop blobs that are clearly hair.
    def thin_strokes(m):
        n2, l2, s2, _ = cv2.connectedComponentsWithStats((m > 0).astype(np.uint8), 8)
        out = np.zeros_like(m)
        for j in range(1, n2):
            x, y, ww, hh, area = s2[j]
            if area < 6:
                continue
            aspect = ww / max(hh, 1)
            if aspect >= 1.6 and area <= 260:
                out[l2 == j] = 255
        return out
    brow_l = thin_strokes(brow_l)
    brow_r = thin_strokes(brow_r)
    brow_l = dilate(brow_l, 1)
    brow_r = dilate(brow_r, 1)
    brows = cv2.bitwise_or(brow_l, brow_r)
    save_mask(MASKS / "brow_left.png", brow_l)
    save_mask(MASKS / "brow_right.png", brow_r)
    save_mask(MASKS / "brows_mask.png", brows)

    # ---------------- mouth ------------------------------------------------
    mouth_box = box_mask(rgba.shape, *MOUTH_BOX)
    mouth = cv2.bitwise_and(cv2.bitwise_and(mouth_box, cv2.bitwise_or(cm["dark"], cm["crimson"])), head_mask)
    mouth = fill_holes(mouth)
    mouth = dilate(mouth, 1)
    save_mask(MASKS / "mouth_mask.png", mouth)

    # ---------------- S1 / S2 white locks ----------------------------------
    s1 = cv2.bitwise_and(poly_mask(rgba.shape, S1_POLY), head_mask)
    s1 = dilate(s1, 1)
    save_mask(MASKS / "hair_S1_mask.png", s1)
    s2 = np.zeros((h, w), np.uint8)  # not separately visible in the front neutral reference
    save_mask(MASKS / "hair_S2_mask.png", s2)

    # ---------------- hair ------------------------------------------------
    features = cv2.bitwise_or(cv2.bitwise_or(eyes, brows), mouth)
    hair = cv2.bitwise_and(head_mask, cv2.bitwise_not(face_region))
    hair = cv2.bitwise_and(hair, cv2.bitwise_not(features))
    hair = cv2.bitwise_and(hair, cv2.bitwise_not(s1))
    save_mask(MASKS / "hair_front_mask.png", hair)

    # ---------------- face base + hidden skin behind features -------------
    face_feature_zone = cv2.bitwise_and(features, face_region)
    face_skin = cv2.bitwise_and(face_region, cv2.bitwise_not(face_feature_zone))
    # Inpaint skin behind eyes/brows/mouth so blink and future expression swaps
    # never reveal a hole. This is deterministic OpenCV inpainting, not a redraw.
    rgb = rgba[:, :, :3]
    inpainted = cv2.inpaint(rgb, face_feature_zone, 4, cv2.INPAINT_TELEA)
    face_base = np.zeros_like(rgba)
    sel_skin = face_skin > 0
    face_base[sel_skin, :3] = rgba[sel_skin, :3]
    face_base[sel_skin, 3] = 255
    sel_hole = face_feature_zone > 0
    face_base[sel_hole, :3] = inpainted[sel_hole, :3]
    face_base[sel_hole, 3] = 255
    # Keep only the face region alpha
    face_base[face_region == 0, 3] = 0
    save_rgba(RECON / "face_skin_behind_features.png", face_base)

    # ---------------- body + neck / shoulder reconstruction ---------------
    body_base = extract_layer(rgba, body_mask)
    # Sample the visible neck colour (just below the chin) and build a soft
    # vertical gradient for the hidden neck top.
    neck_sample = rgba[300:340, 190:245]
    neck_sample = neck_sample[neck_sample[:, :, 3] > 200]
    if len(neck_sample):
        neck_col = np.median(neck_sample[:, :3], axis=0).astype(np.float32)
    else:
        neck_col = np.array([225, 205, 180], np.float32)
    neck_mask = cv2.bitwise_and(head_mask, box_mask(rgba.shape, *NECK_RECT))
    neck_recon = np.zeros_like(rgba)
    yy = np.arange(h, dtype=np.float32)[:, None]
    t = np.clip((yy - NECK_RECT[1]) / max(1, (NECK_RECT[3] - NECK_RECT[1])), 0, 1)
    # darker under the chin, full skin lower down
    shade = 0.78 + 0.22 * t
    grad = (neck_col[None, None, :] * shade[:, :, None]).clip(0, 255).astype(np.uint8)
    neck_recon[:, :, :3] = np.broadcast_to(grad, (h, w, 3))
    neck_recon[:, :, 3] = neck_mask
    # soften the side edges so the reconstruction blends under the chin
    a = Image.fromarray(neck_recon[:, :, 3], "L").filter(ImageFilter.GaussianBlur(1.2))
    neck_recon[:, :, 3] = np.array(a)
    save_rgba(RECON / "neck_reconstruction_draft.png", neck_recon)

    # Shoulder backfill: the side zones behind the hair tips are black jacket.
    shoulder_mask = cv2.bitwise_and(head_mask, box_mask(rgba.shape, 0, SHOULDER_BACKFILL_Y, w, h))
    shoulder_mask = cv2.bitwise_and(shoulder_mask, cv2.bitwise_not(box_mask(rgba.shape, NECK_RECT[0], 0, NECK_RECT[2], h)))
    # sample the jacket colour from the visible shoulder
    jacket_sample = body_base[340:400, 100:330]
    jacket_sample = jacket_sample[jacket_sample[:, :, 3] > 200]
    if len(jacket_sample):
        jacket_col = np.median(jacket_sample[:, :3], axis=0).astype(np.uint8)
    else:
        jacket_col = np.array(SUMI, np.uint8)
    shoulder_recon = np.zeros_like(rgba)
    shoulder_recon[:, :, :3] = jacket_col
    shoulder_recon[:, :, 3] = shoulder_mask
    a = Image.fromarray(shoulder_recon[:, :, 3], "L").filter(ImageFilter.GaussianBlur(1.5))
    shoulder_recon[:, :, 3] = np.array(a)
    save_rgba(RECON / "shoulder_backfill_draft.png", shoulder_recon)

    body = composite_layers([body_base, neck_recon, shoulder_recon])

    # ---------------- save layers -----------------------------------------
    layers = {
        "body": body,
        "face_base": face_base,
        "eyes_open": extract_layer(rgba, eyes),
        "brows": extract_layer(rgba, brows),
        "mouth": extract_layer(rgba, mouth),
        "hair_front": extract_layer(rgba, hair),
        "hair_S1": extract_layer(rgba, s1),
        "hair_S2": extract_layer(rgba, s2),
    }
    for name, arr in layers.items():
        save_rgba(LAYERS / f"{name}.png", arr)
    # diagnostic composites
    head_group = composite_layers([layers[k] for k in ("face_base", "eyes_open", "brows", "mouth", "hair_front", "hair_S1", "hair_S2")])
    save_rgba(LAYERS / "head_group_neutral.png", head_group)
    neutral = composite_layers([body, head_group])
    save_rgba(LAYERS / "neutral_composite.png", neutral)

    # ---------------- label map -------------------------------------------
    regions = {
        "body": body_mask,
        "neck_recon": neck_mask,
        "shoulder_backfill": shoulder_mask,
        "face": face_region,
        "eyes": eyes,
        "brows": brows,
        "mouth": mouth,
        "hair": hair,
        "S1": s1,
        "S2": s2,
    }
    lm = label_map(rgba.shape, regions)
    Image.fromarray(lm, "RGB").save(LABELS / "segmentation_label_map.png")
    # overlay label map on the original for inspection
    ov = rgba.copy()
    sel = np.zeros((h, w), bool)
    for m in regions.values():
        sel |= m > 0
    ov[sel, :3] = (0.45 * ov[sel, :3] + 0.55 * lm[sel]).astype(np.uint8)
    save_rgba(LABELS / "segmentation_label_overlay.png", ov)

    # ---------------- reports ---------------------------------------------
    def mask_stats(m):
        ys, xs = np.where(m > 0)
        if len(xs) == 0:
            return {"area": 0, "bbox": None, "centroid": None}
        return {
            "area": int(len(xs)),
            "bbox": [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())],
            "centroid": [round(float(xs.mean()), 2), round(float(ys.mean()), 2)],
        }

    report = {
        "source": str(SRC.relative_to(WORK)),
        "canvas": [w, h],
        "head_polygon": HEAD_POLY,
        "seeds": {
            "eye_left": EYE_LEFT,
            "eye_right": EYE_RIGHT,
            "brow_left_box": BROW_LEFT_BOX,
            "brow_right_box": BROW_RIGHT_BOX,
            "mouth_box": MOUTH_BOX,
            "neck_rect": NECK_RECT,
            "s1_polygon": S1_POLY,
        },
        "masks": {name: mask_stats(m) for name, m in regions.items()},
        "neck_sample_rgb": [int(x) for x in neck_col],
        "jacket_sample_rgb": [int(x) for x in jacket_col],
        "notes": [
            "S1 is the single dominant white lock on the viewer-left (character-right).",
            "S2/S3 are not separately visible in this front-neutral approved reference; hair_S2.png is intentionally empty.",
            "The neck and shoulder backfill are deterministic reconstructions hidden behind the head at neutral.",
            "No generative model was used.",
        ],
    }
    (REPORTS / "separation_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    log(json.dumps(report["masks"], indent=2))
    log("wrote layers to " + str(LAYERS))


if __name__ == "__main__":
    main()
