# KAI — Control de Calidad y Cierre Técnico de Fase C (Catálogo de Poses)

**Personaje:** KAI — *The Little World Wanderer*  
**Documento:** Acta de QA y verificación técnica de la Fase C  
**Versión:** 1.0  
**Fecha:** 2026-11-19  
**Estado de la fase:** Entregables producidos, verificados y listos para revisión y paso a Fase D.

---

## 1. Inventario de entregables de Fase C

| ID | Entregable | Formato | Ubicación | Estado |
|---|---|---|---|:---:|
| **C-01** | **Hoja de poses básicas (6 poses)** | PNG (3840×2160, 4K) | [`design/mascota/04-hojas-poses/exports/KAI_C-01_hoja_poses_basicas.png`](../04-hojas-poses/exports/KAI_C-01_hoja_poses_basicas.png) | **Producido** |
| **C-02** | **Hoja de interacciones UI (7 poses)** | PNG (3840×2160, 4K) | [`design/mascota/04-hojas-poses/exports/KAI_C-02_hoja_interacciones.png`](../04-hojas-poses/exports/KAI_C-02_hoja_interacciones.png) | **Producido** |
| **C-03** | **Hoja cómica y contextual (5 poses)** | PNG (3840×2160, 4K) | [`design/mascota/04-hojas-poses/exports/KAI_C-03_hoja_comica_contextual.png`](../04-hojas-poses/exports/KAI_C-03_hoja_comica_contextual.png) | **Producido** |
| **C-05** | **Script de plantilla Krita C-01** | Python (`.py`) | [`design/mascota/04-hojas-poses/kra/create_c01_template_in_krita.py`](../04-hojas-poses/kra/create_c01_template_in_krita.py) | **Producido** |
| **C-06** | **Mapa técnico de poses y articulación**| Markdown (`.md`) | [`design/mascota/04-hojas-poses/KAI_POSE_MAP.md`](../04-hojas-poses/KAI_POSE_MAP.md) | **Producido** |
| **C-07** | **Documento de QA de Fase C** | Markdown (`.md`) | [`design/mascota/00-documentacion/qa-fase-c.md`](qa-fase-c.md) | **Producido** |

---

## 2. Matriz de verificación de criterios de aceptación (QA Checklist)

### 2.1 Cobertura de las 4 familias de poses
- [x] **Familia 1 — Poses Básicas (6 poses):** De pie (idle), respirar/balanceo, caminar, correr (sprint), saltar (apex) y aterrizar (cushion).
- [x] **Familia 2 — Poses de Interacción UI (7 poses):** Saludar, señalar, sentarse, pensar, celebrar, asomarse y reacción a toque (poke).
- [x] **Familia 3 — Poses Cómicas y de Descanso (2 poses):** Caída cómica (tropezón chibi) y dormitar (inactividad prolongada).
- [x] **Familia 4 — Poses Contextuales (3 poses):** Guía hacia proyectos, inspección de código y presentación de logros/métricas.

### 2.2 Estabilidad anatómica y canon chibi
- [x] **Canon de 2.5 cabezas respetado:** Ninguna pose de acción ni salto deforma la escala estructural de 2.5 cabezas ($H_{anat} = 1500\text{ px}$).
- [x] **Centros de gravedad definidos:** Cada pose cuenta con su centro de gravedad (CoG) y puntos de contacto con el suelo ($Y=2040\text{ px}$) claramente especificados.
- [x] **Línea de suelo consistente:** Se mantiene la distinción entre talón óseo ($Y=2000$) y suela chunky de contacto ($Y=2040$).

### 2.3 Dinámica del cabello y de la cinta carmesí
- [x] **Física inerte de la cinta:** La cinta carmesí reacciona a la gravedad en reposo y a la inercia horizontal en sprint; se mantiene nudo central lumbar cuadrado y dos colas desiguales sin apariencia animal.
- [x] **Anclaje de mechones blancos:** S1 se conserva rígidamente en el flequillo derecho y S2 en la sien izquierda sin alteración durante el movimiento.
- [x] **Ausencia de tangentes visuales:** Espacios libres limpios entre brazos, mangas del haori y la caída de la cinta.

### 2.4 Preparación para rigging y React 19 (Fase D)
- [x] **Mapa de articulación documentado:** Pivotes de hombros ($360^\circ$), codos ($0^\circ\text{ a }140^\circ$), cadera ($\pm 60^\circ$) y rodillas ($0^\circ\text{ a }130^\circ$) desglosados en coordenadas relativas.
- [x] **Triggers de React asignados:** Eventos de interacción (`onScroll`, `onHoverSkill`, `onModalOpen`, `onIdleTimeout`) integrados en el mapa de poses.
- [x] **Aceleración GPU y accesibilidad:** Especificaciones preparadas para transformadas CSS nativas con respeto a `prefers-reduced-motion`.

---

## 3. Estado de cierre de la Fase C

- **Todos los entregables técnicos y visuales de la Fase C han sido generados y validados.**
- **Se solicita la aprobación formal del titular para cerrar la Fase C y autorizar el paso a la Fase D (Preparación para Animación y Separación de Capas).**
