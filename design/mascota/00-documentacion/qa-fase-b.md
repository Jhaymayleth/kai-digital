# KAI — Control de Calidad y Cierre Técnico de Fase B (Expresiones Faciales)

**Personaje:** KAI — *The Little World Wanderer*  
**Documento:** Acta de QA y verificación técnica de la Fase B  
**Versión:** 1.0  
**Fecha:** 2026-11-19  
**Estado de la fase:** Entregables producidos, verificados y listos para revisión y paso a Fase C.

---

## 1. Inventario de entregables de Fase B

| ID | Entregable | Formato | Ubicación | Estado |
|---|---|---|---|:---:|
| **B-01** | **Hoja oficial de 10 expresiones** | PNG (3840×2160, 4K) | [`design/mascota/03-hojas-expresiones/exports/KAI_B-01_hoja_expresiones.png`](../03-hojas-expresiones/exports/KAI_B-01_hoja_expresiones.png) | **Producido** |
| **B-01w** | **Assets WebP individuales (10)** | WebP (512×512) | [`design/mascota/03-hojas-expresiones/web/`](../03-hojas-expresiones/web/) | **Producido** |
| **B-02** | **Script de plantilla Krita B-01** | Python (`.py`) | [`design/mascota/03-hojas-expresiones/kra/create_b01_template_in_krita.py`](../03-hojas-expresiones/kra/create_b01_template_in_krita.py) | **Producido** |
| **B-03** | **Mapa técnico de expresiones** | Markdown (`.md`) | [`design/mascota/03-hojas-expresiones/KAI_EXPRESSION_MAP.md`](../03-hojas-expresiones/KAI_EXPRESSION_MAP.md) | **Producido** |
| **B-04** | **Documento de QA de Fase B** | Markdown (`.md`) | [`design/mascota/00-documentacion/qa-fase-b.md`](qa-fase-b.md) | **Producido** |

---

## 2. Matriz de verificación de criterios de aceptación (QA Checklist)

### 2.1 Catálogo y coherencia de expresiones
- [x] **Exactamente 10 expresiones canónicas:**
  1. `EXP-01` Base Neutral (Reposo despierto)
  2. `EXP-02` Curiosidad (Interés vivo)
  3. `EXP-03` Travesura (Guiño pícaro)
  4. `EXP-04` Sorpresa (Asombro súbito)
  5. `EXP-05` Alegría / Celebración (Éxito y entusiasmo)
  6. `EXP-06` Concentración / Señalar (Foco analítico)
  7. `EXP-07` Orgullo (Satisfacción y confianza)
  8. `EXP-08` Somnoliento / Descanso (Inactividad prolongada)
  9. `EXP-09` Confusión / Duda (Perplejidad reflexiva)
  10. `EXP-10` Decisión (Determinación proactiva)
- [x] **Resolución formal de B.0:** La lista de 10 expresiones unifica el catálogo según [`KAI_VISUAL_DESIGN.md`](../KAI_VISUAL_DESIGN.md) §5.3, consolidando Concentración/Señalización y descartando ambigüedades.

### 2.2 Consistencia del modelo facial y proporciones
- [x] **Módulo craneal inalterado:** Todas las expresiones parten exactamente de la misma cabeza redondeada, mandíbula suave y mentón pequeño chibi aprobados en Fase A.
- [x] **Cabello asimétrico intacto:** El mechón dominante blanco **S1** se conserva en el flequillo derecho de KAI (izq. del espectador), y **S2** en la sien izquierda. No se espejan ni se desplazan.
- [x] **Inclinaciones de cabeza justificadas:** Las deformaciones faciales respetan los ejes de inclinación estipulados (curiosidad +8°, travesura -6°, confusión -10°, orgullo +6°).

### 2.3 Fidelidad cromática estricta (5 colores)
- [x] **Iris Amber (`#D6A441`) exclusivo:** El ámbar se utiliza única y exclusivamente en el iris ocular.
- [x] **Pupila y lineart Sumi (`#0E100F`):** Pupilas circulares centradas, contornos limpios.
- [x] **Brillo Washi (`#F7F5F0`):** Un brillo principal en el cuadrante superior izquierdo en ojos abiertos.
- [x] **Sombras cel Smoke Gray (`#B8B0A5`):** Sombras de párpados y pliegues sin degradados ni difuminados.
- [x] **Cero rubor / cero 6º color:** No se incorporaron tintes rosados, durazno ni rojeces en las mejillas.

### 2.4 Desacoplamiento técnico para animación y React
- [x] **Capas independientes:** Cejas, ojos (esclerótica, iris, pupila, brillo) y boca están estructurados para animación de parpadeo, cambio de mirada y lipsync (fases D y E).
- [x] **Triggers de React definidos:** Cada expresión cuenta con su evento interactivo mapeado (`onHover`, `onClick`, `onScroll`, `onIdle`, `routeChange`).
- [x] **Legibilidad a tamaños reducidos:** Probada y validada en exportaciones WebP a 512×512 px y comprobada su nitidez visual a resoluciones de 128 px y 64 px.

---

## 3. Estado de cierre de la Fase B

- **Todos los criterios de calidad de la Fase B han sido completados y validados.**
- **Se solicita la aprobación formal del titular para cerrar la Fase B y autorizar el paso a la Fase C (Catálogo de Poses Corporales).**
