# KAI_PRODUCTION_PLAN

**Personaje:** KAI — *The Little World Wanderer*
**Proyecto:** mascota interactiva del portafolio de José Mauricio Rangel Núñez
**Documento base:** [`KAI_CHARACTER_BIBLE.md`](KAI_CHARACTER_BIBLE.md)
**Versión del plan:** 1.0
**Fecha:** 2026-11-19
**Estado:** plan presentado. **Ninguna fase iniciada.** Sin imágenes, animaciones ni código.

> **Regla de oro.** No se avanza de una fase a otra sin aprobación explícita del titular. Cada puerta se cierra con evidencia verificable, no con una impresión visual.
>
> **Alcance de este documento.** Planificar la producción. No sustituye la Biblia ni aprueba decisiones pendientes. Si el plan y la Biblia entran en conflicto, prevalece la Biblia.

---

## 1. Objetivo general

Producir un personaje original, consistente y de cuerpo completo, en estilo **Superdeformed Anime / Chibi**, preparado para funcionar como mascota interactiva de un portafolio web.

El resultado debe permitir:

- Visualizar a KAI en diferentes poses.
- Mantener consistencia anatómica y visual entre todos los recursos.
- Cambiar expresiones sin perder el modelo.
- Animarlo con una técnica híbrida: ilustración preparada + movimiento articulado.
- Usarlo en diferentes tamaños, incluidos tamaños pequeños.
- Entregarlo documentado para una integración posterior con React y TypeScript.

### Resultado verificable

Un paquete de producción con:

1. Model sheet aprobado.
2. Hoja de expresiones aprobada.
3. Hoja de poses aprobada.
4. Mapa de separación y articulación.
5. Animaciones prioritarias y secundarias aprobadas.
6. Exportaciones finales con transparencia y manifiesto.
7. Documento de integración React/TypeScript, sin implementación.

---

## 2. Principios de producción

1. **La Biblia manda.** Ningún rasgo, color, accesorio o comportamiento se añade fuera de `KAI_CHARACTER_BIBLE.md` sin aprobación y actualización del documento.
2. **Primero el modelo, después la variación.** No se produce una expresión o pose si el modelo maestro no está aprobado.
3. **Una sola fuente editable.** Cada entregable conserva su `.kra` o archivo fuente; las exportaciones no reemplazan la fuente.
4. **Consistencia antes que cantidad.** Es preferible un catálogo pequeño y sólido a muchos recursos con deriva visual.
5. **Legibilidad a tamaño pequeño.** Todo asset se prueba reducido antes de aprobarse.
6. **Transparencia real.** Nada de fondos incrustados, halos o recortes accidentales.
7. **Herramientas libres primero.** Krita es la base. Rive se evalúa con su plan gratuito y sus límites; no se compra nada sin necesidad demostrada.
8. **Aprobación por puerta.** Cada fase termina con revisión y espera. No hay avance automático.
9. **Trazabilidad.** Nombres, versiones, manifiesto y registro de cambios.
10. **El avatar v1 no es referencia.** KAI se diseña desde la Biblia, no desde el intento archivado.

---

## 3. Definición de terminado

Un entregable solo se considera terminado cuando tiene:

- **Fuente editable** identificada y guardada.
- **Exportación** en el formato acordado.
- **Vista previa** para revisión.
- **Ficha de QA** con los criterios comprobados.
- **Aprobación explícita** del titular.
- **Registro** en el manifiesto y en el control de versiones.

Un PNG sin `.kra`, una animación sin metadatos o una hoja sin QA no se consideran terminados.

---

## 4. Fase 0 — Cierre de decisiones bloqueantes

### Objetivo

Resolver las decisiones que impiden empezar el diseño maestro sin inventar datos.

### Actividades

- Revisar `00-documentacion/decisiones-pendientes.md`.
- Aprobar o corregir, como mínimo, las decisiones que afectan la Fase A:
  - P-01 — lore del mundo de origen.
  - P-02 — especie, edad, género, tono de piel y altura.
  - P-03 — proporciones exactas y tamaño de exportación.
  - P-04 — silueta y distribución del cabello.
  - P-05 — forma de ojos, cejas, boca y catálogo de expresiones.
  - P-06 — corte del haori, pantalones y calzado.
  - P-07 — forma, largo y física de la cinta.
  - P-08 — uso de paleta, línea y sombreado.
- Resolver la discrepancia de expresiones: la Biblia contiene **11 categorías funcionales**, no una lista cerrada de diez. La Fase B necesita una lista de diez aprobada.
- Confirmar si la arquitectura de integración seguirá siendo la app externa o si KAI se montará en el portafolio. No es bloqueante para A, pero sí para G.

### Entregables

- Registro de decisiones actualizado con estado `Aprobada`, fecha y responsable.
- `KAI_CHARACTER_BIBLE.md` actualizado con las decisiones cerradas.
- Lista de expresiones aprobada para la Fase B, o instrucción explícita de cómo obtener las diez.

### Herramientas

- Documentación del proyecto.
- Revisión del titular. No se requiere software gráfico.

### Dependencias

- Disponibilidad del titular para decidir.
- Ninguna dependencia gráfica.

### Criterios de aceptación

- No queda ningún `TBD` que afecte la Fase A.
- La lista de diez expresiones está aprobada o existe una regla clara para seleccionarlas.
- Las decisiones aprobadas están reflejadas en la Biblia, no solo en una conversación.

### Posibles problemas

- Decidir demasiadas cosas a la vez.
- Cambiar una decisión después de empezar el modelo.
- Asumir que una opción propuesta ya está aprobada.

### Condiciones para avanzar

Aprobación explícita de la Fase 0. Sin ella, no se dibuja la Fase A.

---

## 5. Fase A — Diseño maestro

### Objetivo

Crear el diseño visual definitivo de KAI y la referencia contra la que se medirá todo lo demás.

### Actividades

1. Construir la retícula de proporciones de **2.5 cabezas**.
2. Dibujar el cuerpo completo en vista **frontal**, **lateral** y **posterior**.
3. Definir la base de la cabeza, la mandíbula, los ojos, las cejas, la nariz y la boca.
4. Definir la silueta del cabello, el volumen y la posición asimétrica de los mechones blancos.
5. Definir la chaqueta corta de inspiración haori: cierre, mangas, forro, bordes carmesí y largo.
6. Definir pantalones, calzado y cinta carmesí.
7. Crear la hoja de paleta con los cinco colores y sus usos aprobados.
8. Probar lineart, cel shading y sombras sobre fondo claro y oscuro.
9. Organizar capas y nombres en el `.kra`.
10. Producir una hoja de detalles de vestimenta y una hoja de proporciones.

### Entregables

| ID | Entregable | Formato | Contenido |
|---|---|---|---|
| A-00 | Turnaround completo | PNG/PDF | Las tres vistas en una hoja de comparación |
| A-01 | Turnaround frontal | PNG + `.kra` | Cuerpo completo, vista frontal |
| A-02 | Turnaround lateral | PNG + `.kra` | Cuerpo completo, vista lateral |
| A-03 | Turnaround posterior | PNG + `.kra` | Cuerpo completo, vista posterior, cinta visible |
| A-04 | Hoja de proporciones | PNG/PDF | Retícula de 2.5 cabezas, unidades y puntos de articulación |
| A-05 | Paleta cromática | PNG/PDF | Cinco colores, hex, usos y contrastes |
| A-06 | Detalles de vestimenta | PNG/PDF | Haori, forro, bordes, pantalones, calzado y cinta |
| A-07 | Fuente editable | `.kra` | Capas nombradas y agrupadas |
| A-08 | QA de Fase A | Markdown/PDF | Checklist firmado |

### Herramientas

- **Krita 5.2.2** para dibujo, capas, paleta, retícula y exportación.
- Documento `.kra` autónomo; evitar capas de archivo externo.
- Pruebas de contraste en fondos Sumi y Washi.

### Dependencias

- Fase 0 aprobada.
- P-01 a P-08 resueltas.
- Referencias visuales aprobadas, si existen. No se usan fotos personales sin autorización.

### Criterios de aceptación

- KAI mide aproximadamente **2.5 cabezas**.
- Las tres vistas conservan la misma anatomía, ropa y peinado.
- Los mechones blancos son asimétricos y consistentes entre vistas.
- Los ojos son ámbar dorado y las pupilas oscuras.
- La chaqueta se lee como haori corto, no como kimono ni uniforme samurái.
- La cinta carmesí posterior es visible y comprensible.
- La paleta se limita a los cinco colores aprobados.
- El lineart, el cel shading y las sombras cumplen la Biblia.
- El personaje se lee sobre fondo claro y oscuro.
- No hay elementos cortados.
- El `.kra` tiene capas nombradas y agrupadas.
- La hoja de QA está completa y la Fase A tiene aprobación explícita.

### Posibles problemas

- Deriva de proporciones entre vistas.
- Distribución simétrica de los mechones blancos.
- La ropa se interpreta como kimono o samurái.
- La cinta se oculta en la vista posterior.
- Contraste insuficiente en uno de los dos temas.
- Cambios de última hora en decisiones de Fase 0.

### Condiciones para avanzar

Fase A aprobada por escrito. La Biblia actualizada si alguna decisión cambió. Sin aprobación, no se inicia la Fase B.

---

## 6. Fase B — Expresiones

### Objetivo

Crear la hoja oficial de expresiones faciales de KAI, manteniendo exactamente el mismo rostro, cabello, proporciones y características físicas.

### B.0 — Puerta de catálogo

La Biblia contiene **11 categorías funcionales** y la fase pide **diez expresiones**. Antes de dibujar hay que cerrar la lista.

Categorías actuales:

1. Curiosidad / atención.
2. Saludo amistoso.
3. Entusiasmo / celebración.
4. Travesura / juego.
5. Sorpresa / reacción.
6. Concentración / explicación.
7. Orgullo.
8. Pensativo.
9. Somnoliento.
10. Cómica / caída.
11. Señalización.

Opciones para obtener diez, **no aprobadas**:

- **A.** Fusionar “Señalización” con “Curiosidad / atención”, porque señalar es una acción de atención más un gesto corporal.
- **B.** Fusionar “Cómica / caída” con “Sorpresa / reacción”, porque la caída cómica se apoya en la reacción.
- **C.** Fusionar “Pensativo” con “Concentración / explicación”, porque son estados cercanos.
- **D.** Mantener las once y producir una hoja adicional, si el titular prefiere no recortar el catálogo.

La decisión se registra en P-05 y se refleja en la Biblia. **Este plan no elige por el titular.**

### Actividades

1. Partir de la cabeza base aprobada en Fase A.
2. Diseñar las diez expresiones aprobadas en B.0.
3. Separar ojos, cejas, boca y efectos faciales en capas.
4. Definir la emoción, el contexto de uso y la intensidad de cada expresión.
5. Probar cada expresión a tamaño pequeño.
6. Probar sobre fondo claro y oscuro.
7. Revisar que el cabello no oculte los ojos ni cambie de forma entre expresiones.
8. Crear una ficha de correspondencia expresión → contexto.

### Entregables

| ID | Entregable | Formato | Contenido |
|---|---|---|---|
| B-01 | Hoja de expresiones | PNG/PDF | Diez expresiones aprobadas, mismo rostro y encuadre |
| B-02 | Fuente editable | `.kra` | Grupos por expresión, capas separadas |
| B-03 | Mapa de expresiones | Markdown | Nombre, emoción, contexto e intensidad |
| B-04 | QA de Fase B | Markdown/PDF | Consistencia y legibilidad |

### Herramientas

- Krita.
- Cabeza base de Fase A como plantilla.
- Paleta aprobada.

### Dependencias

- Fase A aprobada.
- P-05 y B.0 aprobados.
- Lista de diez expresiones cerrada.

### Criterios de aceptación

- Hay exactamente diez expresiones aprobadas.
- Todas usan el mismo rostro, cabello, ojos, proporciones y paleta.
- Ninguna cambia el color de ojos ni la distribución de los mechones.
- Cada expresión se distingue de las demás a tamaño pequeño.
- No hay recortes, elementos flotantes ni capas fuera de encuadre.
- Las capas están separadas y nombradas.
- La hoja funciona sobre fondo claro y oscuro.
- B.0, B-01 y B-03 tienen aprobación explícita.

### Posibles problemas

- Deriva facial entre expresiones.
- Expresiones demasiado parecidas.
- El cabello tapa los ojos.
- Cambios de color en el iris.
- Boca o cejas fuera del modelo.
- La lista de diez se cambia después de dibujar.

### Condiciones para avanzar

Fase B aprobada y catálogo de expresiones bloqueado. Sin aprobación, no se inicia la Fase C.

---

## 7. Fase C — Poses

### Objetivo

Crear una hoja de poses de cuerpo completo que cubra movimientos básicos, interacciones, comedia y contextos del portafolio.

### Actividades

1. Partir del modelo de Fase A y del rostro de Fase B.
2. Dibujar al menos una pose clave por acción aprobada.
3. Cubrir las cuatro familias:
   - **Básicas:** de pie, respirar/balancearse, caminar, correr, saltar, aterrizar.
   - **Interacción:** saludar, señalar, sentarse, pensar, celebrar, asomarse, reaccionar a la interfaz.
   - **Cómicas:** caerse de forma cómica, dormitar.
   - **Contextuales:** correr hacia proyectos, señalar elementos importantes, concentración/explicación, orgullo.
4. Marcar centro de gravedad, apoyos y articulaciones.
5. Definir el comportamiento de la cinta y del cabello en cada pose.
6. Revisar siluetas y tangentes.
7. Probar las poses a tamaño pequeño.

### Entregables

| ID | Entregable | Formato | Contenido |
|---|---|---|---|
| C-01 | Hoja de poses básicas | PNG/PDF | De pie, respirar, caminar, correr, saltar, aterrizar |
| C-02 | Hoja de interacciones | PNG/PDF | Saludar, señalar, sentarse, pensar, celebrar, asomarse, reaccionar |
| C-03 | Hoja cómica y de descanso | PNG/PDF | Caída cómica, dormitar |
| C-04 | Hoja contextual | PNG/PDF | Proyectos, Tecnologías, Experiencia |
| C-05 | Fuente editable | `.kra` | Grupos por pose |
| C-06 | Mapa de poses | Markdown | Nombre, acción, contexto y notas de articulación |
| C-07 | QA de Fase C | Markdown/PDF | Silueta, articulación y consistencia |

### Herramientas

- Krita.
- Model sheet de Fase A.
- Hoja de expresiones de Fase B.

### Dependencias

- Fase A aprobada.
- Fase B aprobada.
- P-09 aprobada: catálogo y cantidad de poses.

### Criterios de aceptación

- Todas las poses son de cuerpo completo y sin recortes.
- La anatomía y la ropa se mantienen estables.
- La cinta y el cabello siguen las reglas del modelo.
- Las poses cómicas no rompen la identidad ni la silueta.
- Las poses contextuales se entienden sin necesidad de texto adicional.
- Las articulaciones son legibles para la Fase D.
- Las poses funcionan a tamaño pequeño y sobre ambos fondos.
- El `.kra` conserva grupos y capas nombradas.
- La Fase C tiene aprobación explícita.

### Posibles problemas

- Deriva de proporciones al forzar escorzos.
- Tangentes entre brazos, torso y cinta.
- Oclusiones que impiden separar partes.
- Poses contextuales ambiguas.
- La cinta se cruza con la pierna o desaparece.

### Condiciones para avanzar

Fase C aprobada y catálogo de poses bloqueado. Sin aprobación, no se inicia la Fase D.

---

## 8. Fase D — Preparación para animación

### Objetivo

Determinar qué partes deben ser ilustraciones independientes, qué partes se articulan y cómo se producirán los ciclos sin romper el modelo.

### D.0 — Prueba técnica de pipeline

Antes de separar todo:

- Evaluar **Rive** con su plan gratuito.
- Evaluar **spritesheets** con exportación desde Krita.
- Evaluar **CSS** para movimientos complementarios.
- Documentar límites, licencias, peso y calidad.
- No integrar nada en React todavía.

**Hallazgo de herramientas:** Rive Free permite editar y exportar `.riv`, pero la exportación gratuita incluye el splash de Rive; el plan Cadet de pago lo elimina. Para un portafolio profesional, el splash puede ser inaceptable. La decisión se toma en D.0, no se asume.

### Actividades

1. Separar cabeza y cuerpo.
2. Separar brazos y manos.
3. Separar piernas y pies.
4. Separar cabello frontal y posterior.
5. Separar la cinta carmesí.
6. Identificar elementos secundarios: efectos de tinta, partículas carmesí, aparición.
7. Definir puntos de articulación, pivotes, rangos y orden de capas.
8. Definir qué se resuelve con ilustración y qué con articulación.
9. Definir ciclos, acciones one-shot, transiciones y estados.
10. Probar un ensamblaje con una pose neutra y una pose extrema.
11. Crear el manifiesto de partes y animaciones.

### Entregables

| ID | Entregable | Formato | Contenido |
|---|---|---|---|
| D-01 | Mapa de separación | PNG/PDF | Partes, capas, jerarquía y máscaras |
| D-02 | Mapa de articulaciones | PNG/PDF | Pivotes, rangos y límites |
| D-03 | Especificación de animación | Markdown | Acción, loop/one-shot, timing, frames y efectos |
| D-04 | Decisión de pipeline | Markdown | Rive, spritesheet, CSS o híbrido, con costos y límites |
| D-05 | Prueba de ensamblaje | PNG/PDF | Pose neutra y pose extrema sin costuras visibles |
| D-06 | Fuente separada | `.kra` | Capas y grupos por parte |
| D-07 | QA de Fase D | Markdown/PDF | Seams, pivotes, pesos y exportación |

### Herramientas

- Krita para separación, onion skin y timeline.
- Rive Free para prueba de rig, si se elige.
- Python/Pillow para pruebas de atlas y transparencia.
- Navegador para revisar exportaciones, sin integrar KAI.

### Dependencias

- Fases A, B y C aprobadas.
- P-07 resuelta: forma y física de la cinta.
- P-10 aprobada: prioridades y pipeline.
- P-12 al menos parcialmente resuelta: dónde se integrará y qué runtime se usará.

### Criterios de aceptación

- Todas las partes están separadas y nombradas.
- Los pivotes y rangos están documentados.
- La prueba de ensamblaje no muestra costuras visibles.
- La cinta y el cabello tienen una estrategia de movimiento secundario.
- El pipeline elegido tiene límites y costos documentados.
- No se integró nada en React.
- La Fase D tiene aprobación explícita.

### Posibles problemas

- Costuras en cuello, hombros, cadera o rodillas.
- Explosión de capas y complejidad de rig.
- Rive Free con splash o límites insuficientes.
- La física de la cinta no se puede resolver con la técnica elegida.
- El pipeline de exportación no coincide con el runtime previsto.

### Condiciones para avanzar

Fase D aprobada y pipeline bloqueado. Sin aprobación, no se inicia la Fase E.

---

## 9. Fase E — Animaciones

### Objetivo

Producir primero los ciclos prioritarios y después las animaciones secundarias, con calidad de portafolio.

### Actividades

La fase se ejecuta en dos bloques secuenciales: E.1 y E.2. Cada bloque tiene sus propias actividades y su propia aprobación; E.2 no empieza hasta que E.1 esté aprobada.

### E.1 — Animaciones prioritarias

Orden obligatorio:

1. Idle.
2. Blink.
3. Walk.
4. Run.
5. Jump.
6. Land.
7. Wave.
8. Point.

#### Actividades

- Bloquear poses y timing.
- Producir roughs y claves.
- Limpiar lineart y aplicar color.
- Añadir movimiento secundario de cabello y cinta.
- Exportar frames o rig.
- Revisar loops y contactos.
- Crear vista previa y metadatos.

#### Entregables

| ID | Entregable | Formato | Contenido |
|---|---|---|---|
| E1-01 | Idle | Frames/`.riv` + preview | Respirar, balancearse, parpadear |
| E1-02 | Blink | Frames/`.riv` + preview | Parpadeo corto y limpio |
| E1-03 | Walk | Frames/`.riv` + preview | Ciclo de caminata |
| E1-04 | Run | Frames/`.riv` + preview | Ciclo de carrera |
| E1-05 | Jump | Frames/`.riv` + preview | Impulso, aire, descenso |
| E1-06 | Land | Frames/`.riv` + preview | Impacto y recuperación |
| E1-07 | Wave | Frames/`.riv` + preview | Saludo |
| E1-08 | Point | Frames/`.riv` + preview | Señalización |
| E1-09 | Manifiesto E1 | JSON/Markdown | Nombres, frames, loop, fps y fuente |
| E1-10 | QA de E1 | Markdown/PDF | Loops, silueta, cinta y transparencia |

### E.2 — Animaciones secundarias

Después de aprobar E.1:

#### Actividades

1. Producir sentarse, pensar, celebrar, caerse de forma cómica, asomarse, dormitar y reaccionar a la interfaz.
2. Producir las variantes contextuales: correr hacia proyectos, señalar elementos importantes, concentración/explicación y orgullo.
3. Producir los efectos de tinta, partículas carmesí y aparición.
4. Revisar transiciones y continuidad con E.1.
5. Exportar, previsualizar y documentar cada recurso.

#### Entregables

| ID | Entregable | Formato | Contenido |
|---|---|---|---|
| E2-01 | Sentarse | Frames/`.riv` + preview | Pose y transición |
| E2-02 | Pensar | Frames/`.riv` + preview | Loop de concentración |
| E2-03 | Celebrar | Frames/`.riv` + preview | Celebración |
| E2-04 | Caída cómica | Frames/`.riv` + preview | Caída y recuperación |
| E2-05 | Asomarse | Frames/`.riv` + preview | Aparición desde un borde |
| E2-06 | Dormitar | Frames/`.riv` + preview | Loop de sueño |
| E2-07 | Reacción UI | Frames/`.riv` + preview | Sorpresa/atención |
| E2-08 | Contextuales | Frames/`.riv` + preview | Proyectos, Tecnologías, Experiencia |
| E2-09 | Efectos | Frames/`.riv` + preview | Tinta, partículas carmesí, aparición |
| E2-10 | Manifiesto E2 | JSON/Markdown | Nombres, frames, loop, fps y fuente |
| E2-11 | QA de E2 | Markdown/PDF | Consistencia y transiciones |

### Herramientas

- Krita para ilustración y frames.
- Rive Free o spritesheets, según D.0.
- Python/Pillow para atlas y optimización.
- CSS solo para movimientos complementarios, si el pipeline lo permite.

### Dependencias

- Fase D aprobada.
- P-10 aprobada: duración, fps, loops y pipeline.
- P-11 al menos parcialmente resuelta para animaciones contextuales.
- P-12 resuelta para accesibilidad y runtime.

### Criterios de aceptación

- Las ocho animaciones prioritarias están completas y aprobadas antes de empezar E.2.
- Los loops no tienen saltos visibles.
- No hay deslizamiento de pies ni pérdida de volumen.
- La cinta y el cabello acompañan el movimiento sin atravesar el cuerpo.
- KAI se mantiene on-model en todo frame.
- La transparencia es limpia y no hay recortes.
- Cada animación tiene fuente, exportación, preview y metadatos.
- Funciona a tamaño pequeño y sobre ambos fondos.
- E.1 y E.2 tienen aprobación explícita.

### Posibles problemas

- Saltos en el loop.
- Deslizamiento de pies.
- Deriva de volumen entre frames.
- Colisiones de cinta y cabello.
- Peso excesivo de assets.
- Rive Free con splash o límites.
- Animaciones contextuales sin triggers claros.

### Condiciones para avanzar

E.1 aprobada antes de E.2. E.2 aprobada antes de F. Sin aprobación, no se exporta como final.

---

## 10. Fase F — Exportación y organización

### Objetivo

Preparar todos los recursos finales, editables y optimizados para web, con nombres y estructura verificables.

### Actividades

1. Aprobar la matriz de exportación: resoluciones, formatos, escalas y presupuesto de peso.
2. Exportar PNG/WebP con transparencia.
3. Empaquetar spritesheets y metadatos, si aplica.
4. Exportar `.riv` y `preview`, si aplica.
5. Recortar bounding boxes sin cortar elementos.
6. Optimizar peso sin destruir alpha ni legibilidad.
7. Aplicar la convención de nombres.
8. Crear el manifiesto de assets.
9. Archivar fuentes editables en `07-editables-krita/`.
10. Ejecutar QA de exportación.

### Entregables

| ID | Entregable | Formato | Contenido |
|---|---|---|---|
| F-01 | Matriz de exportación | Markdown/PDF | Tamaños, formatos, escalas y límites |
| F-02 | Assets web | PNG/WebP | Capas, poses y animaciones finales |
| F-03 | Spritesheets | PNG/WebP + JSON | Atlas y metadatos, si aplica |
| F-04 | Rive | `.riv` + preview | Archivo de runtime, si se aprueba |
| F-05 | Manifiesto | JSON/Markdown | ID, archivo, estado, tamaño, loop, fps y fuente |
| F-06 | Fuentes editables | `.kra`/`.riv` | Versiones editables archivadas |
| F-07 | QA de exportación | Markdown/PDF | Alpha, recortes, peso, nombres y contraste |

### Herramientas

- Krita.
- Python/Pillow o ImageMagick para optimización y atlas.
- Rive para `.riv`, si se aprobó.
- Navegador para pruebas de carga y contraste.

### Dependencias

- Fases E.1 y E.2 aprobadas.
- P-12 aprobada: resolución, rendimiento y runtime.
- Matriz de exportación aprobada.

### Criterios de aceptación

- Todos los assets del manifiesto existen y coinciden con su nombre.
- La transparencia es correcta.
- No hay elementos cortados.
- Los colores coinciden con la paleta.
- Los pesos están dentro del presupuesto acordado.
- Las fuentes editables están archivadas.
- El manifiesto permite reconstruir la integración sin ambigüedad.
- La Fase F tiene aprobación explícita.

### Posibles problemas

- Artefactos de alpha en WebP.
- Recortes accidentales.
- Nombres inconsistentes.
- Assets faltantes o duplicados.
- Peso excesivo.
- Pérdida de calidad por compresión.

### Condiciones para avanzar

Fase F aprobada y manifiesto cerrado. Sin aprobación, no se inicia la Fase G.

---

## 11. Fase G — Preparación para integración

### Objetivo

Documentar cómo se usarán los recursos desde React y TypeScript, sin implementar la mascota en el portafolio.

### Actividades

1. Definir el contrato de integración: componente, props, eventos y estados.
2. Mapear secciones del portafolio a estados de KAI.
3. Mapear cada estado a sus assets y animaciones.
4. Definir carga, precarga y fallback de assets.
5. Definir pausa, reanudación, interrupciones y prioridades.
6. Definir el comportamiento con `prefers-reduced-motion`.
7. Definir accesibilidad: rol, texto alternativo, navegación y control.
8. Documentar el runtime elegido: Rive, spritesheet o híbrido.
9. Crear un plan de pruebas manuales para la futura implementación.
10. Revisar que el documento no incluya código de implementación.

### Entregables

| ID | Entregable | Formato | Contenido |
|---|---|---|---|
| G-01 | Especificación de integración | Markdown | Componente, props, eventos y estados |
| G-02 | Mapa de estados | Markdown/JSON | Sección → estado → animación |
| G-03 | Mapa de assets | Markdown/JSON | Estado → archivo → formato → loop |
| G-04 | Contrato de accesibilidad | Markdown | Reduced motion, teclado, ARIA y fallback |
| G-05 | Plan de pruebas | Markdown | Casos manuales para la futura implementación |
| G-06 | QA de Fase G | Markdown/PDF | Completitud y ausencia de código |

### Herramientas

- Documentación.
- Navegador para verificar nombres y formatos, sin montar KAI.
- No se requiere implementar React.

### Dependencias

- Fase F aprobada.
- P-11 y P-12 resueltas.
- Decisión de arquitectura: portafolio, app externa o ambos.

### Criterios de aceptación

- Cada estado tiene un asset asociado.
- Cada sección tiene un comportamiento definido.
- Existe un fallback claro.
- La accesibilidad está documentada.
- El runtime y sus límites están documentados.
- No hay código de implementación.
- La Fase G tiene aprobación explícita.

### Posibles problemas

- La arquitectura cambia entre el plan y la implementación.
- Un estado no tiene animación.
- Rive o el runtime elegido no cubre el caso.
- La accesibilidad se trata como añadido tardío.
- El equipo futuro no puede reconstruir la integración.

### Condiciones para avanzar

Fase G aprobada. La implementación será una fase separada, con autorización explícita.

---

## 12. Cronograma lógico y dependencias

No se fijan fechas de calendario porque no se ha acordado disponibilidad. La unidad es una **sesión de producción** (bloque de trabajo con revisión), no una hora exacta.

| Orden | Fase | Esfuerzo estimado | Depende de | Puerta |
|---|---|---|---:|---|
| 0 | Cierre de decisiones | 1 sesión | Titular | G0 |
| 1 | A — Diseño maestro | 4–6 sesiones | G0 | G-A |
| 2 | B — Expresiones | 3–4 sesiones | G-A, P-05/B.0 | G-B |
| 3 | C — Poses | 4–6 sesiones | G-A, G-B, P-09 | G-C |
| 4 | D — Preparación de animación | 3–5 sesiones | G-C, P-07, P-10, P-12 parcial | G-D |
| 5 | E.1 — Animaciones prioritarias | 6–9 sesiones | G-D, P-10 | G-E1 |
| 6 | E.2 — Animaciones secundarias | 6–9 sesiones | G-E1, P-11 | G-E2 |
| 7 | F — Exportación | 2–4 sesiones | G-E2, P-12 | G-F |
| 8 | G — Integración documentada | 2–3 sesiones | G-F, P-11, P-12 | G-G |

**Ruta crítica:** 0 → A → B → C → D → E.1 → E.2 → F → G.

**Estimación total inicial:** 31–47 sesiones de producción, sujeta a revisión después de la Fase A. No es un compromiso de calendario.

### Dependencias críticas

- Sin Fase 0 no hay Fase A.
- Sin A no hay B ni C.
- Sin B no se aprueba C, porque las poses contextuales necesitan expresiones consistentes.
- Sin C no se separa el rig.
- Sin D no se anima.
- Sin E.1 no se produce E.2.
- Sin F no se documenta G.
- Sin P-12 no se puede cerrar F ni G.

### Trabajo que puede solaparse

- B y C pueden compartir la misma cabeza base y el mismo model sheet, pero C no se aprueba antes de B.
- La documentación de G puede empezar a redactarse durante F, pero no se aprueba hasta que F esté cerrada.
- La preparación de nombres y carpetas puede adelantarse durante D, sin producir assets finales.

---

## 13. Herramientas y pipeline

| Herramienta | Uso previsto | Coste / límite | Decisión |
|---|---|---|---|
| **Krita 5.2.2** | Ilustración, capas, paleta, retícula, onion skin, timeline y exportación | Gratis / open source; ya instalado | Herramienta principal |
| **PNG/WebP** | Capas, poses y frames con transparencia | Gratis | Formato base |
| **Spritesheets** | Ciclos y secuencias empaquetadas | Gratis; requiere packer | Evaluar en D.0 |
| **Rive Free** | Rig, state machine y export `.riv` | Gratis con splash de Rive; 3 archivos colaborativos y 50 publishes CLI/mes | Evaluar en D.0; no asumir |
| **Rive Cadet** | Export sin splash | Pago, desde $9/seat/mes | Solo si el splash es inaceptable y se justifica |
| **CSS** | Movimientos complementarios y transiciones de contenedor | Gratis | Complemento, no base del rig |
| **React + TypeScript** | Control futuro de estados y assets | Gratis | Documentar en G; no implementar |
| **Python/Pillow** | Atlas, recorte, optimización y QA de alpha | Gratis | Apoyo técnico |
| **Navegador/DevTools** | Pruebas de carga, contraste y tamaño | Gratis | QA |

### Notas de herramientas

- **Krita** no empaqueta atlas ni exporta `.riv`. Esas tareas se resuelven con scripts libres o con Rive, según D.0.
- **Rive Free** permite exportar, pero el splash puede invalidar su uso en un portafolio profesional. Si se elige Rive sin splash, hay que presupuestar el plan pago; no se compra por defecto.
- **Spritesheets + CSS** es la alternativa sin coste si Rive no cumple.
- **React/TypeScript** se documenta en G; no se implementa en este plan.
- No se incorporan herramientas de pago innecesarias.
- Los documentos `.kra` deben ser autónomos: sin capas de archivo externo que puedan romper la fuente.

---

## 14. Criterios de calidad y QA

| # | Criterio | Cómo se verifica | Evidencia |
|---|---|---|---|
| 1 | Consistencia con el diseño maestro | Superposición contra el model sheet | Comparativa lado a lado |
| 2 | Anatomía y proporciones estables | Retícula de 2.5 cabezas | Hoja de proporciones |
| 3 | Vestimenta sin variaciones | Checklist de haori, forro, bordes, pantalones, calzado y cinta | Ficha de vestuario |
| 4 | Colores coherentes | Muestreo de hex contra la paleta | Paleta + captura |
| 5 | Transparencia correcta | Inspección de alpha sobre ambos fondos | Captura de QA |
| 6 | Sin elementos cortados | Revisión de bounding box y bordes | Captura de QA |
| 7 | Legibilidad a tamaño pequeño | Prueba al tamaño mínimo acordado | Comparativa reducida |
| 8 | Preparación para animación | Capas, pivotes y rangos documentados | Mapa de rig |
| 9 | Archivos editables y organizados | `.kra` fuente, nombres y manifiesto | Árbol + manifiesto |
| 10 | Calidad profesional | Revisión contra la Biblia y el portafolio | Aprobación del titular |

### QA mínimo por asset

- [ ] Fuente editable presente.
- [ ] Exportación presente.
- [ ] Transparencia verificada.
- [ ] Sin recortes.
- [ ] Paleta correcta.
- [ ] On-model.
- [ ] Legible a tamaño pequeño.
- [ ] Contraste en fondo claro y oscuro.
- [ ] Nombre correcto.
- [ ] Registrado en el manifiesto.
- [ ] Aprobado por el titular.

---

## 15. Sistema de aprobación

### Puertas

| Puerta | Qué se aprueba | Evidencia mínima | Estado |
|---|---|---|---|
| G0 | Decisiones de Fase 0 | Registro actualizado + Biblia | Pendiente |
| G-A | Diseño maestro | Turnaround, paleta, vestuario, proporciones, QA | Pendiente |
| G-B0 | Lista de diez expresiones | Decisión P-05 actualizada | Pendiente |
| G-B | Hoja de expresiones | Hoja, mapa, `.kra`, QA | Pendiente |
| G-C | Hoja de poses | Hojas, mapa, `.kra`, QA | Pendiente |
| G-D | Preparación de animación | Mapas, pipeline, prueba de ensamblaje, QA | Pendiente |
| G-E1 | Animaciones prioritarias | 8 animaciones, manifiesto, previews, QA | Pendiente |
| G-E2 | Animaciones secundarias | Animaciones, efectos, manifiesto, QA | Pendiente |
| G-F | Exportación final | Assets, manifiesto, fuentes, QA | Pendiente |
| G-G | Integración documentada | Specs, mapas, accesibilidad, QA | Pendiente |

### Reglas

1. Cada puerta se aprueba explícitamente; el silencio no es aprobación.
2. No se avanza con entregables parciales.
3. Si un entregable falla, se corrige y se vuelve a presentar la misma puerta.
4. Un cambio después de una aprobación exige:
   - impacto en fases posteriores,
   - actualización de la Biblia o del registro de decisiones,
   - nueva versión del entregable,
   - nueva aprobación.
5. Las decisiones pendientes no se convierten en canon por conveniencia de producción.
6. La aprobación de una fase no autoriza la siguiente.

---

## 16. Riesgos y mitigaciones

| Riesgo | Fase | Impacto | Mitigación |
|---|---|---|---|
| Decisiones de identidad sin cerrar | 0/A | Retrabajo total | G0 obligatoria; no dibujar con `TBD` |
| Deriva de proporciones | A/B/C | Pérdida de consistencia | Retícula y superposición contra model sheet |
| Mechones blancos simétricos | A/B/C | Pérdida de identidad | Plantilla de cabello y revisión de vistas |
| Ropa leída como kimono/samurái | A | Identidad incorrecta | Checklist de streetwear y revisión de silueta |
| Cinta oculta o rígida | A/C/D/E | Accesorio no reconocible | Vista posterior obligatoria y física secundaria |
| Expresiones demasiado parecidas | B | Catálogo débil | Prueba a tamaño pequeño y contraste de formas |
| Deriva facial | B/C | Pérdida de modelo | Cabeza base y capas separadas |
| Poses ambiguas | C | Mala lectura contextual | Silueta y mapa de poses |
| Costuras de rig | D | Animación sucia | Prueba de pose neutra y extrema |
| Complejidad excesiva de capas | D | Producción lenta | Priorizar articulación necesaria; documentar |
| Rive Free con splash | D | Inaceptable para portafolio | Evaluar Cadet o pasar a spritesheet/CSS |
| Saltos en loops | E | Mala calidad | QA de primer/último frame y contactos |
| Deslizamiento de pies | E | Animación poco creíble | Guías de contacto y pruebas de ciclo |
| Peso excesivo | E/F | Carga lenta | Atlas, recorte, WebP y presupuesto |
| Alpha defectuoso | F | Halos o bordes sucios | QA sobre fondos claro/oscuro |
| Nombres inconsistentes | F/G | Integración rota | Convención única y manifiesto |
| Arquitectura indefinida | G | Retrabajo de integración | P-12 antes de F/G |
| Accesibilidad tardía | G | Mala experiencia | Contrato de reduced motion y teclado en G |

---

## 17. Estructura de carpetas propuesta

La estructura base ya existe. Este plan propone subdivisiones que se crearán **cuando la fase correspondiente empiece**, no ahora.

```text
design/mascota/
├─ KAI_CHARACTER_BIBLE.md
├─ KAI_PRODUCTION_PLAN.md
├─ 00-documentacion/
│  ├─ decisiones-pendientes.md
│  ├─ inventario-fase-01.md
│  ├─ QA/
│  └─ aprobaciones/
├─ 01-referencias/
├─ 02-disenos-originales/
│  └─ A_model-sheet/
├─ 03-hojas-expresiones/
│  └─ B_expression-sheet/
├─ 04-hojas-poses/
│  └─ C_pose-sheet/
├─ 05-animacion/
│  ├─ D_rig/
│  ├─ E1_priority/
│  └─ E2_secondary/
├─ 06-exportaciones-finales/
│  ├─ png/
│  ├─ webp/
│  ├─ atlas/
│  └─ rive/
└─ 07-editables-krita/
   ├─ A_model-sheet/
   ├─ B_expressions/
   ├─ C_poses/
   ├─ D_rig/
   └─ E_animation/
```

### Convención de nombres propuesta

| Tipo | Patrón | Ejemplo |
|---|---|---|
| Model sheet | `kai_a_[vista]_v01.png` | `kai_a_front_v01.png` |
| Paleta | `kai_a_palette_v01.png` | `kai_a_palette_v01.png` |
| Expresión | `kai_b_[expresion]_v01.png` | `kai_b_curious_v01.png` |
| Pose | `kai_c_[accion]_v01.png` | `kai_c_run_v01.png` |
| Animación | `kai_e1_[accion]_v01` | `kai_e1_walk_v01` |
| Export final | `kai_f_[destino]_[tamano]_v01.webp` | `kai_f_web_256_v01.webp` |
| Fuente | `kai_[fase]_v01.kra` | `kai_a_model_v01.kra` |

La convención definitiva se cierra en Fase F. Los nombres no se cambian después de aprobar un asset sin actualizar el manifiesto.

---

## 18. Supuestos, exclusiones y preguntas abiertas

### Supuestos

- Krita 5.2.2 sigue disponible y es la herramienta principal.
- El titular aprueba cada fase antes de la siguiente.
- Las decisiones pendientes se resuelven antes de la fase que las necesita.
- KAI se produce en `design/mascota/` y se integra después en el destino que se apruebe.
- No se usan herramientas de pago sin justificación.
- El avatar v1 no se usa como referencia.

### Exclusiones

- No se implementa React, TypeScript, CSS de producción ni Rive runtime en este plan.
- No se define voz, idioma, guion ni personalidad fuera de la Biblia.
- No se produce deploy, backend, analítica ni integración con el portafolio.
- No se diseñan versiones alternativas de KAI.
- No se generan imágenes en esta fase.

### Preguntas abiertas

1. ¿Cuáles son exactamente las diez expresiones aprobadas?
2. ¿KAI tendrá especie, edad, género, tono de piel y altura definidos?
3. ¿La integración final será en la app externa, en el portafolio o en ambos?
4. ¿Se acepta el splash de Rive Free o se prefiere spritesheet/CSS?
5. ¿KAI tendrá voz e idioma definidos?
6. ¿Cómo se comportará con `prefers-reduced-motion`?
7. ¿Cuál es el tamaño mínimo de legibilidad y el presupuesto de peso?
8. ¿Se producirá una hoja de modelo adicional en 3/4 o solo las tres vistas pedidas?

---

## 19. Anexo A — Matriz de entregables

| Fase | Entregables principales | Fuente editable | Exportación | QA | Aprobación |
|---|---|---|---|---|---|
| 0 | Decisiones + Biblia | Markdown | — | Revisión | G0 |
| A | Turnaround, paleta, vestuario, proporciones | `.kra` | PNG/PDF | Sí | G-A |
| B | 10 expresiones | `.kra` | PNG/PDF | Sí | G-B |
| C | Poses básicas, interacción, comedia, contexto | `.kra` | PNG/PDF | Sí | G-C |
| D | Mapas de rig, pipeline, prueba | `.kra`/Rive | PNG/PDF | Sí | G-D |
| E.1 | Idle, blink, walk, run, jump, land, wave, point | `.kra`/Rive | Frames/`.riv` | Sí | G-E1 |
| E.2 | Secundarias y efectos | `.kra`/Rive | Frames/`.riv` | Sí | G-E2 |
| F | Assets web, atlas, manifiesto | `.kra`/Rive | PNG/WebP/JSON | Sí | G-F |
| G | Specs de integración y mapas | Markdown/JSON | — | Revisión | G-G |

---

## 20. Anexo B — Estados y animaciones previstos

| Estado / acción | Sección o uso | Prioridad | Notas |
|---|---|---|---|
| Idle | Todas | E.1 | Respirar, balancearse, parpadear |
| Blink | Todas | E.1 | Capa facial |
| Walk | Transiciones | E.1 | Ciclo |
| Run | Proyectos | E.1 | Ciclo |
| Jump | Inicio | E.1 | One-shot |
| Land | Inicio | E.1 | One-shot |
| Wave | Inicio, Contacto | E.1 | Interacción |
| Point | Sobre mí, Proyectos | E.1 | Interacción |
| Sit | Descanso | E.2 | Pose/loop |
| Think | Tecnologías | E.2 | Loop |
| Celebrate | Experiencia | E.2 | One-shot |
| Comical fall | Reacción | E.2 | One-shot |
| Peek | Aparición | E.2 | One-shot |
| Doze | Descanso | E.2 | Loop |
| React UI | Interfaz | E.2 | One-shot |
| Contextual run | Proyectos | E.2 | Variante |
| Contextual point | Proyectos | E.2 | Variante |
| Concentrate/explain | Tecnologías | E.2 | Variante |
| Proud | Experiencia | E.2 | Variante |

---

## 21. Control de versiones

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-11-19 | Plan inicial presentado. Ninguna fase iniciada. |
