# KAI — Catálogo y Mapa Técnico de Expresiones Faciales (Fase B)

**Personaje:** KAI — *The Little World Wanderer*  
**Documento:** Entregable B-03 — Mapa de correspondencia técnica, emocional y contextual de expresiones  
**Versión:** 1.0  
**Fecha:** 2026-11-19  
**Referencia maestra:** [`../KAI_VISUAL_DESIGN.md`](../KAI_VISUAL_DESIGN.md) §5.3 y [`../KAI_CHARACTER_BIBLE.md`](../KAI_CHARACTER_BIBLE.md) §3 y §7.

---

## 1. Alcance y reglas de diseño facial

Las expresiones faciales de KAI deforman exclusivamente **ojos, cejas y boca**, acompañados por sutiles **inclinaciones de la cabeza**, manteniendo inalterados los anclajes de identidad:
1. **Módulo craneal inmutable:** La forma y volumen de la cabeza no cambia de proporciones (mandíbula suave, mentón pequeño, cabeza redondeada chibi).
2. **Asimetría fija del cabello:** El flequillo asimétrico con **S1 dominante** en el lado derecho anatómico de KAI (izq. del espectador en vista frontal) y **S2** en la sien izquierda se mantienen intactos.
3. **Paleta estricta de 5 colores:**
   - **Amber (`#D6A441`):** Exclusivo para el iris ocular en todas las expresiones abiertas.
   - **Sumi (`#0E100F`):** Párpados, cejas, pupilas, trazo de boca.
   - **Washi (`#F7F5F0`):** Piel base, esclerótica, brillos de ojos.
   - **Smoke Gray (`#B8B0A5`):** Sombras cel en párpados y pliegues faciales.
   - **Prohibición de rubor o 6º color:** No se aplican manchas rosadas, rojas ni degradados de colorete en las mejillas.
4. **Brillo ocular:** Un único punto de brillo Washi en el cuadrante superior izquierdo del iris (o cierre en arco en expresiones de risa cerrada).

---

## 2. Catálogo oficial de las 10 expresiones canónicas

| ID | Nombre oficial | Emoción base | Intensidad | Contexto principal en el portafolio | Evento Trigger sugerido (React) |
|---|---|---|:---:|---|---|
| **EXP-01** | **Base Neutral** | Calma, reposo despierto | Baja | Estado por defecto; espera atenta sin rigidez. | `IDLE_DEFAULT` |
| **EXP-02** | **Curiosidad** | Interés, atención viva | Media | El usuario hace hover sobre proyectos o tecnologías. | `HOVER_CARD` / `HOVER_TECH_STACK` |
| **EXP-03** | **Travesura** | Complicidad, juego pícaro | Media-Alta | Clic en elementos interactivos o easter eggs del portfolio. | `CLICK_EASTER_EGG` / `INTERACTION_POKE` |
| **EXP-04** | **Sorpresa** | Asombro, reacción súbita | Alta | Revelación de modales, scroll rápido o datos inesperados. | `MODAL_OPEN` / `FAST_SCROLL` |
| **EXP-05** | **Alegría / Celebración** | Entusiasmo, satisfacción | Alta | Envío exitoso de formulario de contacto, logro completado. | `CONTACT_SUCCESS` / `COPY_CLIPBOARD` |
| **EXP-06** | **Concentración / Señalar**| Foco, explicación técnica | Media | Explicación de código, diagramas de arquitectura, lectura. | `CHAPTER_SCROLL` / `CODE_INSPECT` |
| **EXP-07** | **Orgullo** | Seguridad, satisfacción | Media | Resumen de métricas, certificaciones o proyectos destacados.| `SECTION_HIGHLIGHT` / `SKILL_EXPAND` |
| **EXP-08** | **Somnoliento / Descanso**| Inactividad, relajación | Baja | Usuario inactivo durante más de 45 segundos en la página. | `INACTIVITY_TIMEOUT` (>45s) |
| **EXP-09** | **Confusión / Duda** | Perplejidad, desconcierto | Media | Rutas 404, errores de validación de formulario, búsqueda vacía.| `ROUTE_404` / `FORM_INVALID` |
| **EXP-10** | **Decisión** | Determinación, proactividad | Media-Alta | Clic en CTA de contacto, descarga de CV, inicio de demo. | `CLICK_CTA_CONTACT` / `DOWNLOAD_CV` |

---

## 3. Ficha anatómica detallada por expresión

### EXP-01 — Base Neutral
- **Ojos:** Abiertos normalmente, mirada al frente. Iris Amber ocupando ~72% de la abertura expuesta, pupila Sumi centrada, un brillo Washi superior izquierdo.
- **Cejas:** Relajadas, paralelas a la línea superior del ojo, sutilmente arqueadas.
- **Boca:** Línea Sumi fina, recta o con una levísima curvatura neutral.
- **Cabeza y Cabello:** Cabeza perfectamente recta. Cabello en reposo orgánico natural.

### EXP-02 — Curiosidad
- **Ojos:** Ligeramente más abiertos que en neutral (+10% área expuesta), pupilas fijas en el objetivo de interés.
- **Cejas:** Asimétricas: la ceja derecha (espectador) levantada con arco pronunciado; la otra relajada.
- **Boca:** Pequeña forma en "o" o trazo entreabierto sutil.
- **Cabeza y Cabello:** Inclinación lateral de la cabeza de 8° a 10°. Los mechones laterales acompañan la gravedad.

### EXP-03 — Travesura
- **Ojos:** Guiño asimétrico: un ojo entrecerrado con párpado en curva pícara; el otro ojo abierto con mirada lateral.
- **Cejas:** Ceja del ojo entrecerrado baja y tensa; la otra arqueada hacia arriba.
- **Boca:** Comisura lateral levantada en media sonrisa pícara; trazo limpio sin enseñar dientes detallados.
- **Cabeza y Cabello:** Cabeza ladeada con mentón ligeramente alzado; el mechón S1 acompaña dinámicamente el gesto.

### EXP-04 — Sorpresa
- **Ojos:** Máxima apertura circular. Iris expuesto al 100%, pupila contraída (diámetro 20%), esclerótica Washi visible alrededor del iris.
- **Cejas:** Muy elevadas por encima de su línea base, casi tocando el flequillo inferior.
- **Boca:** Apertura vertical limpia en "O" redondeada con fondo Sumi.
- **Cabeza y Cabello:** Cabeza echada sutilmente hacia atrás; mechones superiores del cabello se abren sutilmente hacia arriba.

### EXP-05 — Alegría / Celebración
- **Ojos:** Arcos semicirculares invertidos cerrados ("ojos sonrientes" anime) o abiertos al 90% con brillo ampliado y reflejo secundario sutil.
- **Cejas:** Altas, curvadas y relajadas.
- **Boca:** Sonrisa abierta amplia y limpia, revelando interior Sumi con sombra cel Smoke Gray.
- **Cabeza y Cabello:** Mentón ligeramente hacia arriba; cabello con balanceo dinámico ascendente.

### EXP-06 — Concentración / Señalar
- **Ojos:** Entrecerrados al 50-60%, mirada fija e intensa hacia el contenido señalado.
- **Cejas:** Rectas, bajas, ligeramente inclinadas hacia el centro del ceño (foco analítico sin hostilidad).
- **Boca:** Línea horizontal Sumi firme, compacta y concentrada.
- **Cabeza y Cabello:** Cabeza estable, orientada firmemente hacia el objetivo visual.

### EXP-07 — Orgullo
- **Ojos:** Párpados superiores a media altura (ojos entrecerrados seguros), mirada hacia el espectador con confianza.
- **Cejas:** Una ceja sutilmente alzada, la otra en posición segura.
- **Boca:** Media sonrisa lateral confiada y serena.
- **Cabeza y Cabello:** Barbilla levantada (~12°), cabeza alta, pecho inflado.

### EXP-08 — Somnoliento / Descanso
- **Ojos:** Párpados caídos cubriendo el 75-80% del iris, pupilas bajas, párpado inferior suave.
- **Cejas:** Relajadas y bajas, siguiendo la caída de los párpados.
- **Boca:** Trazo mínimo neutral, levemente curvado hacia abajo en relajación muscular.
- **Cabeza y Cabello:** Cabeza ligeramente inclinada hacia adelante y al costado; cabello y cinta caen por gravedad.

### EXP-09 — Confusión / Duda
- **Ojos:** Desbalanceados: un ojo semicerrado en inspección, el otro abierto con pupila descentrada.
- **Cejas:** Una ceja arqueada arriba en duda, la otra fruncida abajo hacia el puente nasal.
- **Boca:** Línea ondulada sutil Sumi (*wavy mouth* estilizada de anime).
- **Cabeza y Cabello:** Marcada inclinación lateral de la cabeza (~15°).

### EXP-10 — Decisión
- **Ojos:** Mirada frontal fija y resuelta, párpados con tensión media, iris centrado con brillo nítido.
- **Cejas:** Bajas, tensas, convergiendo hacia el centro en ángulo decidido.
- **Boca:** Línea firme recta y cerrada, transmitiendo compromiso y seriedad amistosa.
- **Cabeza y Cabello:** Cabeza ligeramente inclinada hacia adelante; mechones frontales proyectados sutilmente hacia el frente.

---

## 4. Estructura de capas recomendada para la hoja B-01 en Krita

Cada celda de expresión dentro del documento maestro `.kra` debe organizarse con la siguiente jerarquía para permitir el despiece y la animación de parpadeo y habla en las fases D y E:

```text
📁 [EXP_XX_NOMBRE]
├── 📁 Rasgos_Moviles (Capas desacoplables para articulación)
│   ├── Cejas (Sumi #0E100F)
│   ├── Párpados_Superiores (Lineart Sumi + Sombra Smoke Gray)
│   ├── Ojos_Iris_Pupila (Iris Amber #D6A441 + Pupila Sumi + Brillo Washi)
│   ├── Párpados_Inferiores (Lineart Sumi fino)
│   └── Boca (Línea Sumi + Cavidad Sumi/Smoke Gray)
├── 📁 Cabeza_Estructura (Capa común de anclaje)
│   ├── Cabello_Frente_S1_S2 (Sumi + Mechones Washi)
│   ├── Sombras_Rostro (Smoke Gray #B8B0A5 bajo flequillo y orejas)
│   ├── Piel_Rostro (Washi #F7F5F0 base)
│   ├── Orejas (Washi con interior Smoke Gray)
│   └── Cabello_Posterior (Sumi masa dorsal)
```
