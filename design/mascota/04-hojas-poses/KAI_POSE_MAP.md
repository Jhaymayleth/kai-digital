# KAI — Catálogo y Mapa Técnico de Poses Corporales (Fase C)

**Personaje:** KAI — *The Little World Wanderer*  
**Documento:** Entregable C-06 — Mapa de articulación, cinemática y contexto de poses  
**Versión:** 1.0  
**Fecha:** 2026-11-19  
**Referencia maestra:** [`../KAI_VISUAL_DESIGN.md`](../KAI_VISUAL_DESIGN.md) §4.4, §6, §7.3 y [`../KAI_PRODUCTION_PLAN.md`](../KAI_PRODUCTION_PLAN.md) §7.

---

## 1. Principios de cinemática y animación de KAI

1. **Canon de 2.5 cabezas inamovible:** En ninguna pose dinámica (saltos, agachados o carreras) se estiran los miembros más allá de las proporciones aprobadas ($H_{anat} = 1500\text{ px}$).
2. **Jerarquía del cabello en movimiento:**
   - La masa superior y dorsal reacciona por inercia física (retraso en inicio, sobreoscilación en frenado).
   - Los mechones **S1 (derecho)**, **S2 (sien izq.)** y **S3 (nuca izq.)** permanecen sólidamente anclados a sus masas craneales anatómicas; jamás se invierten ni se despegan.
3. **Física de la cinta carmesí posterior:**
   - El nudo central cuadrado permanece anclado a la pretina dorsal lumbar ($Y=1445\text{ px}$).
   - Las dos colas planas desiguales caen por gravedad pura en reposo y ondean horizontalmente hacia atrás en carreras y saltos. Cero curvatura prensil, cero animación como cola animal.
4. **Legibilidad de silueta (Silueta de alto contraste):**
   - Evitar tangentes confusas entre manos, solapas del haori y colas de la cinta.
   - En vistas tres cuartos o perfiles de acción, las solapas abiertas y el forro Washi deben leerse nítidamente despegados del fondo.

---

## 2. Catálogo de las 4 familias de poses oficiales

### Familia 1: Poses Básicas (Locomoción y Ciclos de Vida)

| ID | Nombre de pose | Centro de gravedad | Apoyos de pies | Dinámica del cabello | Dinámica de la cinta | Trigger React sugerido |
|---|---|---|---|---|---|---|
| **POSE-B01** | **De pie (Neutral Idle)** | Centrado simétrico ($X=0, Y=1445$) | Ambos pies planos en suelo ($Y=2040$) | Reposo orgánico | Caída vertical por gravedad | `APP_LOAD` / `DEFAULT_IDLE` |
| **POSE-B02** | **Respirar / Balanceo** | Desplazamiento vertical leve ($\pm 15\text{ px}$) | Ambos pies en suelo, ligero balanceo | Sutil subida y bajada de mechones | Balanceo pendular suave ($\pm 3^\circ$) | `IDLE_BREATHING_CYCLE` |
| **POSE-B03** | **Caminar (Walk Cycle)** | Oscilación rítmica entre apoyos | Paso alternado (contacto talón-punta) | Inercia de rebote vertical suave | Acompaña el vaivén de la cadera | `PAGE_SCROLL_SLOW` |
| **POSE-B04** | **Correr (Sprint Chibi)** | Inclinado hacia adelante $18^\circ$ | Zancada amplia, impulsos de puntera | Nuca proyectada hacia atrás | Ondeado horizontal hacia atrás | `PAGE_SCROLL_FAST` / `RUN_TO_CARD` |
| **POSE-B05** | **Saltar (Jump Apex)** | Elevado sobre suelo ($-180\text{ px}$) | Sin apoyo; pies recogidos flexionados | Masas se elevan por inercia | Flotan hacia arriba y atrás | `SECTION_TRANSITION` |
| **POSE-B06** | **Aterrizar (Landing)** | Bajo; compresión squash | Ambos pies plantados con flexión | Caída súbita y rebote elástico | Golpea suavemente los muslos | `SECTION_LAND` |

### Familia 2: Poses de Interacción UI

| ID | Nombre de pose | Centro de gravedad | Gesto corporal | Acción facial asociada | Trigger React sugerido |
|---|---|---|---|---|---|
| **POSE-I01** | **Saludar (Wave)** | Neutro sobre pie izquierdo | Brazo derecho alzado saludando con mano abierta | `EXP-01` o `EXP-05` (Alegría) | `HERO_FIRST_VIEW` / `WELCOME` |
| **POSE-I02** | **Señalar (Pointing)** | Adelantado hacia el objetivo | Brazo extendido señalando con dedo índice claro | `EXP-06` (Concentración) | `NAVIGATE_CHAPTER` / `TOOLTIP` |
| **POSE-I03** | **Sentarse (Sitting)** | Bajo; reposo sobre superficie | Piernas colgando o cruzadas sobre tarjeta UI | `EXP-01` o `EXP-02` (Curiosidad) | `CARD_DOCK_REST` |
| **POSE-I04** | **Pensar (Thinking)** | Ligeramente ladeado | Mano en barbilla, mirada hacia arriba | `EXP-09` (Duda) / `EXP-06` | `CODE_SNIPPET_HOVER` |
| **POSE-I05** | **Celebrar (Celebration)**| Elevado en salto de victoria | Ambos brazos en V alzados, salto festivo | `EXP-05` (Alegría / Éxito) | `CONTACT_FORM_SUCCESS` |
| **POSE-I06** | **Asomarse (Peeking)** | Oculto tras borde de pantalla | Cabeza y un hombro asomando desde marco | `EXP-02` (Curiosidad) / `EXP-03` | `VIEWPORT_BORDER_TRIGGER` |
| **POSE-I07** | **Reacción de Toque** | Compresión elástica lateral | Pequeño sobresalto con rebote | `EXP-03` (Travesura) / `EXP-04` | `CLICK_AVATAR_POKE` |

### Familia 3: Poses Cómicas y de Descanso

| ID | Nombre de pose | Centro de gravedad | Gesto corporal | Comportamiento cinta / pelo | Trigger React sugerido |
|---|---|---|---|---|---|
| **POSE-C01** | **Caída Cómica (Stumble)** | Pérdida de balance hacia adelante | Tropezón chibi con brazos abiertos y zapatillas al aire | Pelo alzado por impacto; cinta ondea arriba | `ROUTE_404` / `BROKEN_LINK` |
| **POSE-C02** | **Dormitar (Dozing Off)** | Relajado en piso o tarjeta UI | Sentado con cabeza cabeceando hacia adelante | Mechones caídos; cinta inerte en piso | `IDLE_TIMEOUT` (>60s) |

### Familia 4: Poses Contextuales del Portafolio

| ID | Nombre de pose | Contexto del Portafolio | Composición y gesto | Articulación clave |
|---|---|---|---|---|
| **POSE-X01** | **Guía hacia Proyectos** | Sección de Proyectos destacados | Corriendo en tres cuartos señalando hacia la tarjeta del proyecto | Brazo director extendido; zancada dinámica |
| **POSE-X02** | **Inspección de Código** | Sección Técnica / Arquitectura | Inclinado hacia adelante inspeccionando bloques de código | Cuello adelantado; manos cerca del mentón |
| **POSE-X03** | **Presentación de Logros** | Métricas, experiencia y CV | De pie firme, pecho fuera, presentando con mano abierta | Postura erguida; codo flectado elegante |

---

## 3. Mapa de puntos de articulación (Rigging Guide para Fase D)

Para asegurar que cada pose sea reproducible y vectorizable para animación por CSS/React y spritesheets:

```text
       [CORONILLA: (X=0, Y=500)]
                 |
        [CUELLO: (X=0, Y=1100)] (Pivote Cabeza: Rotación ±15°)
         /               \
[HOMBRO DER: (-150, 1145)] [HOMBRO IZQ: (+150, 1145)] (Pivote Brazos: 360°)
        |                         |
[CODO DER: (-180, 1300)]   [CODO IZQ: (+180, 1300)] (Pivote Codos: 0° a 140°)
        |                         |
[MUÑECA DER: (-200, 1445)] [MUÑECA IZQ: (+200, 1445)] (Pivote Manos: ±45°)
                 |
        [PELVIS: (X=0, Y=1445)] (Pivote Cintura & Nudo Cinta)
         /               \
[CADERA DER: (-100, 1595)] [CADERA IZQ: (+100, 1595)] (Pivote Piernas: Rotación ±60°)
        |                         |
[RODILLA DER: (-100, 1800)][RODILLA IZQ: (+100, 1800)] (Pivote Rodillas: 0° a 130°)
        |                         |
[TOBILLO DER: (-100, 2000)][TOBILLO IZQ: (+100, 2000)] (Pivote Pies/Zapatillas: ±30°)
        |                         |
[SUELA DER: (-100, 2040)]  [SUELA IZQ: (+100, 2040)] (Línea de suelo)
```
