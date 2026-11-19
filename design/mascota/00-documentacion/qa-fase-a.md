# KAI — Control de Calidad y Cierre Técnico de Fase A (Model Sheet)

**Personaje:** KAI — *The Little World Wanderer*  
**Documento:** Acta de QA y verificación técnica de la Fase A  
**Versión:** 1.0  
**Fecha:** 2026-11-19  
**Estado de la fase:** Entregables técnicos producidos y validados; listo para revisión y paso a Fase B.

---

## 1. Inventario de entregables de Fase A

| ID | Entregable | Formato | Ubicación | Estado |
|---|---|---|---|:---:|
| **A-00** | **Turnaround completo (Guías y Overlay)** | PNG (300 DPI) | [`design/mascota/02-disenos-originales/A_model-sheet/kra/KAI_A-00_guides_overlay.png`](../02-disenos-originales/A_model-sheet/kra/KAI_A-00_guides_overlay.png) | **Producido** |
| **A-04** | **Hoja de proporciones (Canon 2.5)** | PNG (2560×1440) | [`design/mascota/02-disenos-originales/A_model-sheet/exports/KAI_A-04_hoja_proporciones.png`](../02-disenos-originales/A_model-sheet/exports/KAI_A-04_hoja_proporciones.png) | **Producido** |
| **A-05** | **Paleta cromática oficial** | PNG (2560×1440) | [`design/mascota/02-disenos-originales/A_model-sheet/exports/KAI_A-05_paleta_cromatica.png`](../02-disenos-originales/A_model-sheet/exports/KAI_A-05_paleta_cromatica.png) | **Producido** |
| **A-05b** | **Paleta reutilizable GIMP/Krita** | GPL (`.gpl`) | [`design/mascota/01-referencias/KAI_master_palette.gpl`](../01-referencias/KAI_master_palette.gpl) | **Producido** |
| **A-06** | **Detalles de vestimenta y cinta** | PNG (2560×1440) | [`design/mascota/02-disenos-originales/A_model-sheet/exports/KAI_A-06_detalles_vestimenta.png`](../02-disenos-originales/A_model-sheet/exports/KAI_A-06_detalles_vestimenta.png) | **Producido** |
| **A-07** | **Script de plantilla Krita** | Python (`.py`) | [`design/mascota/02-disenos-originales/A_model-sheet/kra/create_a00_template_in_krita.py`](../02-disenos-originales/A_model-sheet/kra/create_a00_template_in_krita.py) | **Producido** |
| **A-08** | **Documento de QA de Fase A** | Markdown (`.md`) | [`design/mascota/00-documentacion/qa-fase-a.md`](qa-fase-a.md) | **Producido** |

---

## 2. Matriz de verificación técnica y cumplimiento (QA Checklist)

### 2.1 Identidad visual y estilo gráfico
- [x] **Estilo 2D Anime Chibi / Superdeformed:** Silueta compacta, expresiva y orgánica; proporciones estilizadas de alta legibilidad.
- [x] **Sin renderizado 3D ni semirrealismo:** Prohibidos sombreados poligonales, modelos CGI, texturas epidérmicas realistas y degradados fotográficos.
- [x] **Estética de tinta Sumi sólida:** Trazo jerarquizado inspirado en caligrafía sumi-e, pero el personaje es una figura sólida, tangible y corpórea; no gotea ni es líquido.

### 2.2 Proporciones y canon anatómico ($H_{anat} = 1500\text{ px}$)
- [x] **Canon de 2.5 cabezas anatómicas ($H_{anat}$):**
  - Cabeza modular: $40.0\% \text{ de } H_{anat} = 600\text{ px}$ (de coronilla ósea a mentón).
  - Cuello ($3\% = 45\text{ px}$) + Torso ($20\% = 300\text{ px}$) = $0.58\text{ cabezas}$ ($23\%$).
  - Pelvis/Shorts ($10\% = 150\text{ px}$) + Piernas ($27\% = 405\text{ px}$) = $0.92\text{ cabezas}$ ($37\%$).
  - Suma total anatómica: $1.00 + 0.58 + 0.92 = 2.50\text{ cabezas}$ ($1500\text{ px}$).
- [x] **Volúmenes exteriores no computables:**
  - Elevación exterior del cabello: $+12\% \text{ de } H_{anat} = 180\text{ px}$ sobre la coronilla ósea (corresponde al $+30\%$ del módulo craneal).
  - Alza de suela chunky: $+2.66\% \text{ de } H_{anat} = 40\text{ px}$ bajo el talón anatómico.
- [x] **Diferenciación de cotas:** Separación rigurosa entre cotas canónicas obligatorias y tolerancias estéticas de dibujo (posición Y de ojos, boca y articulaciones).

### 2.3 Paleta estricta de 5 colores (Cero excepciones)
- [x] **Sumi (`#0E100F`):** Pelo, lineart, ropa exterior, shorts, calzado, pupilas (42%).
- [x] **Washi (`#F7F5F0`):** Piel canónica, forro interior haori, suelas, brillos de ojos, mechones S1/S2/S3 (32%).
- [x] **Smoke Gray (`#B8B0A5`):** Sombras cel en piel y ropa, entresuela, interior orejas (14%).
- [x] **Crimson (`#A51C30`):** Cinta posterior lumbar, ribetes de prendas, taloneras (9%).
- [x] **Amber (`#D6A441`):** **Exclusivo para iris de ojos.** Ausente en cualquier otra zona (3%).
- [x] **Separación Washi/Washi:** Piel delimitada mediante lineart perimetral Sumi cerrado y sombras cel Smoke Gray; cero tono melocotón ni sexto color.

### 2.4 Cabello y anclaje asimétrico de mechones
- [x] **S1 (Dominante frontal):** Ubicado en flequillo derecho anatómico de KAI (izq. del espectador en vista frontal). Mayor masa. Ausente en espalda y perfil izquierdo.
- [x] **S2 (Secundario lateral):** Ubicado en sien izquierda anatómica por delante de la oreja. Visible en frontal y perfil izquierdo.
- [x] **S3 (Secundario posterior):** Ubicado en la nuca izquierda anatómica en capas internas. Visible en perfil izquierdo y espalda (izq. del espectador).
- [x] **No espejado:** Prohibición absoluta de espejado horizontal que invierta las posiciones canónicas.

### 2.5 Vestimenta y accesorios
- [x] **Japanese Fantasy Streetwear:** Haori corto permanentemente abierto, forro Washi visible, ribetes Crimson continuos, camiseta interior Sumi asomando 1–2 cm en el bajo, shorts anchos sobre la rodilla y chunky sneakers con suela Washi gruesa.
- [x] **Cinta carmesí posterior lumbar:** Cosida en el centro posterior de la pretina ($Y = 1445\text{ px}$), con nudo cuadrado central y dos colas planas desiguales (larga a medio muslo, corta a cadera baja). Cero morfología ni comportamiento de cola animal.

---

## 3. Estado de cierre de la Fase A

Con la entrega de los documentos de especificación técnica, las hojas de proporciones, paleta cromática, vestimenta, overlay métrico y plantilla nativa para Krita:

- **Todos los criterios de calidad de la Fase A han sido completados y verificados.**
- **El repositorio Git local y remoto se encuentra sincronizado en la rama `main`.**
- **Se solicita la aprobación formal del titular para dar por cerrada la Fase A y autorizar el inicio de la Fase B (Catálogo de Expresiones Faciales).**
