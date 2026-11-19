# Mascota del portafolio — Espacio de producción de KAI

**Personaje:** KAI — *The Little World Wanderer*
**Fase actual:** Fase A — Diseño maestro (lista para turnaround A-00).
**Estado:** especificación visual v1.1 aprobada.

---

## 📌 Guía de lectura y optimización de contexto (Ahorro de tokens)

Para evitar consumo innecesario de tokens y confusiones conceptuales, consulta exclusivamente los documentos en el siguiente orden:

1. **Ilustración y diseño visual (Lectura única obligatoria):**
   👉 [`KAI_VISUAL_DESIGN.md`](KAI_VISUAL_DESIGN.md) (v1.1): Fuente de verdad definitiva para silueta, anatomía, 2.5 cabezas, paleta estricta de 5 colores, cabello (S1/S2/S3), vestimenta, cinta y vistas.
2. **Identidad y rol narrativo:**
   👉 [`KAI_CHARACTER_BIBLE.md`](KAI_CHARACTER_BIBLE.md): Origen ficticio, psicología, comportamiento en la app y límites éticos.
3. **Plan de trabajo y puertas de aprobación:**
   👉 [`KAI_PRODUCTION_PLAN.md`](KAI_PRODUCTION_PLAN.md): Fases A–G, entregables, Krita y QA.

> [!TIP]
> **Archivos que NO deben leerse durante producción gráfica (para ahorrar tokens):**
> - `00-documentacion/decisiones-pendientes.md`: Las decisiones P-02 a P-08 ya están cerradas e integradas en `KAI_VISUAL_DESIGN.md`.
> - `00-documentacion/inventario-fase-01.md`: Respaldo histórico del intento inicial descartado.

---

## Estructura del espacio de producción

| Directorio | Propósito |
|---|---|
| `00-documentacion/` | Histórico de decisiones y registros de control. |
| `01-referencias/` | Referencias visuales internas aprobadas. |
| `02-disenos-originales/` | Model sheet canónico (A-00) y bocetos conceptuales. |
| `03-hojas-expresiones/` | Hojas de expresiones faciales aprobadas (Fase B). |
| `04-hojas-poses/` | Hojas de poses y lenguaje corporal (Fase C). |
| `05-animacion/` | Recursos de animación, capas y secuencias (Fase 05). |
| `06-exportaciones-finales/` | Assets finales aprobados para integración web. |
| `07-editables-krita/` | Archivos fuente `.kra` multicapa editables. |

---

## Reglas de producción

1. **La especificación manda:** No se introduce ningún rasgo fuera de `KAI_VISUAL_DESIGN.md` v1.1.
2. **Paleta estricta:** 5 colores (`#0E100F`, `#F7F5F0`, `#B8B0A5`, `#A51C30`, `#D6A441`). No existe un sexto color ni tono piel adicional.
3. **Control por puertas:** No se avanza de fase sin aprobación explícita del titular.
4. **Respaldo de v1:** El avatar v1 está descartado y archivado en `_archive/avatar-v1/`. No se toma como referencia para KAI.
