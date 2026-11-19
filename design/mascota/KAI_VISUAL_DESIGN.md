# KAI_VISUAL_DESIGN

**Personaje:** KAI — *The Little World Wanderer*
**Documento:** especificación visual maestra para ilustración y producción
**Versión:** 1.1
**Fecha:** 2026-11-19
**Estado:** especificación visual maestra aprobada para turnaround A-00. Sin imágenes, poses, animaciones ni código.
**Base:** ficha conceptual aprobada, `KAI_CHARACTER_BIBLE.md` y revisión técnica v1.1.

> **Referencia vigente.** Este documento sustituye como guía visual a la propuesta A-00 v02 descartada. No reutiliza el avatar v1 ni la estética de la propuesta anterior.
>
> **Identidad fija.** KAI es un chico espiritual de un mundo fantástico, de apariencia humanoide, sin rasgos animales y con identidad visual propia. Es pequeño, chibi, curioso, juguetón y travieso. No es un retrato del titular ni un personaje humano realista.

---

## 0. Alcance y reglas de diseño

Este documento fija cómo se ve KAI para que ilustración, modelo, expresiones, poses y animación futuras partan de la misma base. No define lore nuevo, nombres del mundo, poderes, voz, historia ni relaciones.

Reglas:

1. La identidad aprobada no se reinterpreta. Cualquier cambio de especie, edad, género, silueta, ropa o paleta requiere aprobación explícita.
2. La paleta está cerrada a cinco colores. No se introduce ningún otro color, incluido un tono de piel melocotón, sin justificación y aprobación.
3. El cabello es la firma visual principal. Debe sostener la lectura de KAI incluso sin rostro y a tamaño pequeño.
4. La cinta carmesí es parte de la silueta y del lenguaje de movimiento. No es un accesorio opcional.
5. La estética es **Japanese Fantasy Streetwear**, no kimono tradicional, no uniforme samurái, no armadura.
6. No se añaden rasgos animales, armas, logotipos, mochilas, auriculares, joyas ni símbolos de lore.
7. Si una decisión no aparece aquí, no se inventa: se registra como pendiente y se consulta.
8. La Biblia 0.1 conserva campos marcados como pendientes. Este documento resuelve los visuales de la ficha aprobada; su traslado formal a la Biblia se hará en una tarea aparte, sin alterar la identidad.

---

## 1. Dirección de ilustración

KAI es un personaje en estilo **2D Anime Chibi** (*Superdeformed*), diseñado para comunicar frescura, dinamismo y carisma con una estética estilizada y gráfica de alta legibilidad.

### 1.1 Acabado visual y técnica

- **Lineart limpio y variable:** Trazo digital definido, con sutiles variaciones de grosor inspiradas en la presión orgánica de la plumilla o el pincel japonés, sin perder precisión geométrica.
- **Jerarquía de contornos:** Los contornos exteriores que definen la silueta perimetral del personaje son notablemente más gruesos que las líneas interiores de detalle (pliegues de tela, rasgos faciales, costuras). Esto garantiza un despegue claro respecto a cualquier fondo.
- **Cel shading controlado:** Sombreado plano por zonas de **uno o dos niveles como máximo**, con límites de sombra nítidos y limpios. No se emplean sombras difusas, desenfoques gaussianos ni aerógrafo suave.
- **Colores planos y sólidos:** Tratamiento tonal con rellenos uniformes basados estrictamente en la paleta maestra de cinco colores.
- **Formas redondeadas y expresivas:** Silueta orgánica, curva y dinámica; hombros caídos, extremidades suaves y cabeza redondeada que refuerzan el carácter infantil y travieso.
- **Mechones de cabello definidos:** El cabello se agrupa en masas grandes y mechones sólidos con puntas afiladas y controladas, evitando hebras finas individuales o texturas deshilachadas.
- **Anatomía estilizada y consistente:** Proporciones chibi estructuradas y respetadas entre vistas, con manos y pies simplificados pero anatómicamente consistentes.
- **Expresiones faciales de alta legibilidad:** Rasgos faciales claros y contrastados, optimizados para transmitir la emoción inmediatamente, incluso cuando el personaje se visualiza a resoluciones reducidas (desde 32 px hasta 128 px).

### 1.2 Qué evitar estrictamente

- **Renderizado 3D:** Prohibido el sombreado poligonal, motores CGI, mapas de normales, reflejos especulares fotorrealistas o iluminación calculada por computadora.
- **Realismo o semirrealismo:** Prohibidas proporciones humanas estándar, texturas epidérmicas realistas, poros, arrugas o musculatura anatómica detallada.
- **Acabado fotográfico:** Prohibida la simulación de óptica de cámara (desenfoque de campo, aberración cromática, grano fotográfico).
- **Efectos de iluminación excesivos:** Prohibidos destellos (*lens flares*), resplandores mágicos (*glows* intensos), iluminación volumétrica o degradados luminosos teatrales.
- **Texturas pictóricas:** Prohibido el uso de texturas al óleo, empastes densos o manchas de acuarela que ensucien o difuminen el lineart.
- **Estilo de mascota corporativa genérica:** Prohibidas las figuras vectoriales impersonales, estáticas, planas sin tensión o asimilables a clip-art corporativo de software empresarial.

### 1.3 Personalidad de tinta japonesa

La estética tradicional japonesa de tinta (*sumi-e*) se canaliza exclusivamente a través de la **personalidad, tensión, peso caligráfico y ritmo del lineart Sumi**, así como en la pureza de los contrastes gráficos.

> [!IMPORTANT]
> **El personaje no está hecho de tinta:** KAI no es una criatura etérea, líquida, disuelta ni manchada de tinta. No gotea, no se desvanece en bordes aguados ni tiene extremidades translúcidas. Es un personaje tangible, sólido y corpóreo, resuelto mediante ilustración 2D anime y cel shading.

---

## 2. Silueta

### 2.1 Proporción base y medición anatómica

KAI mide **2.5 cabezas de altura total**. La unidad modular de 1 cabeza equivale al **40 % de la altura total anatómica ($H_{anat}$)**, medida verticalmente desde la **coronilla anatómica (vértice superior del cráneo)** hasta la punta del mentón.

```
+-- Vértice craneal anatómico (0.0 H)
|   [ 1.0 Cabeza = 40 % H ] -> Cabeza y rostro (hasta el mentón)
+-- Mentón (0.40 H)
|   [ 0.58 Cabezas = ~23 % H ] -> Cuello (~3 %) + Torso (~20 %)
+-- Cintura / Pelvis (0.63 H)
|   [ 0.92 Cabezas = ~37 % H ] -> Pelvis / Shorts (~10 %) + Piernas anatómicas (~27 %)
+-- Talón anatómico (1.00 H)
```

| Zona | Proporción anatómica | Nota técnica |
|---|---:|---|
| **Cabeza anatómica** | 40 % de $H_{anat}$ | 1.0 cabeza de módulo base. De coronilla ósea a mentón. |
| **Cuello** | 3 % de $H_{anat}$ | Corto y en su mayor parte cubierto por el cuello del haori. |
| **Torso** | 20 % de $H_{anat}$ | Compacto, cilíndrico, sin musculatura marcada. |
| **Pelvis y shorts** | 10 % de $H_{anat}$ | Volumen ancho que define la base del tronco. |
| **Piernas anatómicas** | 27 % de $H_{anat}$ | Cortas, desde la articulación coxofemoral hasta el talón óseo. |
| **Ancho de hombros** | 30 % de $H_{anat}$ | Ligeramente inferior al ancho craneal. |
| **Ancho de cabeza** | 36 % de $H_{anat}$ | Cráneo prominente que sostiene el impacto chibi. |
| **Largo de brazo** | 22 % de $H_{anat}$ | Del hombro a la muñeca. |
| **Largo de pie anatómico** | 9 % de $H_{anat}$ | Base anatómica del pie. |

#### Diferenciación entre proporciones anatómicas y dimensiones exteriores

1. **Estructura anatómica interior (2.5 cabezas):** Las medidas descritas en la tabla corresponden al esqueleto y volumen corporal base del personaje. Esta proporción conceptual de 2.5 cabezas es inamovible.
2. **Volumen exterior del cabello:** La masa de cabello no reduce la escala del cuerpo. Sobresale aproximadamente un 30 % por encima del cráneo anatómico y un 15 % a los laterales, creando la silueta externa sin sumar altura a las 2.5 cabezas anatómicas.
3. **Volumen exterior del calzado:** Las zapatillas tipo *chunky* añaden una suela Washi de unos 2–3 % de elevación física en la base y un largo aproximadamente 10 % superior al pie anatómico para consolidar la base visual chibi, sin computar como alargamiento de la pierna anatómica.

### 2.2 Lectura a tamaño pequeño

A **32 px de alto**, la silueta debe reconocerse por:

- La masa redondeada del cabello, más ancha que el torso.
- El mechón blanco dominante (**S1**) a la izquierda del espectador en vista frontal.
- Los ojos ámbar como dos puntos cálidos de alto contraste.
- El haori corto y abierto, con el forro Washi claramente legible.
- Los shorts anchos y las zapatillas con suela clara Washi.
- Las dos colas carmesí de la cinta, desiguales, visibles detrás de la cadera.

Prioridad de lectura: **cabello → cinta → ojos → silueta de haori corto → shorts y zapatillas**.

### 2.3 Qué evitar en la silueta

- Cabeza pequeña, cuerpo alargado o piernas largas.
- Cabello plano, simétrico o con forma de casco.
- Chaqueta rígida, rectangular o con hombreras.
- Shorts estrechos, leggings o falda.
- Zapatillas minimalistas que desaparezcan a tamaño pequeño.
- Cinta oculta o demasiado corta para leerse.
- Silueta de asistente corporativo, mascota genérica o personaje de acción.

---

## 3. Anatomía

### 3.1 Cabeza y rostro

- Cabeza grande, redondeada, ligeramente más ancha en las sienes que en la mandíbula.
- Mandíbula suave y mentón pequeño; sin ángulos afilados.
- Frente amplia, parcialmente cubierta por el flequillo.
- Orejas humanas pequeñas y redondeadas, a la altura de los ojos. Sin punta élfica, sin orejas animales.
- Nariz pequeña, resuelta como un punto o una breve línea Sumi.
- Boca pequeña, de trazo fino Sumi, sin labios carnosos ni color adicional.
- La cara debe leerse como la de un chico espiritual infantil y atemporal, no como la de un adulto.

### 3.2 Cuello y torso

- Cuello corto (~3 % de H), en su mayor parte oculto por el cuello del haori.
- Torso compacto y blando, sin pectorales, abdominales ni cintura marcada.
- Hombros redondeados y caídos; el corte del haori acompaña la caída natural.
- Cadera neutra; el volumen inferior lo generan los shorts anchos.

### 3.3 Brazos y manos

- Brazos cortos y cilíndricos, sin musculación visible.
- Codos a la altura de la cintura.
- Muñecas finas.
- Manos pequeñas, con cinco dedos simplificados; el pulgar debe leerse con nitidez.
- A tamaño pequeño, la mano se simplifica en forma de manopla con pulgar marcado.
- Las mangas amplias del haori pueden cubrir parte del antebrazo, pero no las manos en poses activas.

### 3.4 Piernas y pies

- Piernas cortas y suaves, sin relieve de pantorrilla.
- Rodillas redondeadas situadas en el tercio inferior de la pierna.
- Muslos cubiertos por los shorts hasta por encima de la rodilla.
- Pies protegidos por zapatillas con suela visible en todas las vistas; no ocultar los pies con los bajos del pantalón.

### 3.5 Piel y reglas de separación con el fondo

La piel de KAI se resuelve con **Washi `#F7F5F0`** como color base y **Smoke Gray `#B8B0A5`** para el sombreado cel, contorneada con **lineart Sumi `#0E100F`**.

> [!IMPORTANT]
> **Separación garantizada entre piel Washi y fondo Washi (5 colores estrictos):**
> 1. **Lineart Sumi perimetral continuo:** El borde exterior de toda superficie de piel (rostro, orejas, cuello, piernas, manos) está rigurosamente cerrado con un trazo exterior continuo de lineart Sumi `#0E100F`. Jamás se deja una arista de piel abierta que entre en contacto directo con un fondo Washi.
> 2. **Sombras de corte en Smoke Gray `#B8B0A5`:** Las sombras de oclusión cel (debajo del flequillo sobre la frente, sombra arrojada de la barbilla sobre el cuello, pliegues interiores de orejas y bajo los párpados) se rellenan con Smoke Gray sólido, generando un contraste tridimensional evidente frente a cualquier plano claro.
> 3. **Enmarcado por prendas oscuras:** Las áreas de piel están circunscritas internamente por masas de contraste elevado: la melena Sumi enmarca el rostro, el cuello del haori Sumi abraza el cuello, y los ribetes Crimson aíslan las muñecas y los muslos.
> 4. **Cero tonos adicionales:** No se aplica ningún sexto color, tinte beige, tono melocotón ni gradación térmica sobre la piel.

- Sin rubor, pecas, marcas tribales, escamas ni patrones.
- Sin cuernos, garras, colmillos, orejas animales ni alas.
- Sin tatuajes, runas ni simbología mágica.

---

## 4. Diseño del cabello

El cabello es la **principal firma visual de KAI**. Debe reconocerse por su volumen, su asimetría marcada y la posición anatómica fija de los mechones blancos.

### 4.1 Corte y longitud

- Corte tipo **shag/bob desestructurado**, con capas internas y puntas irregulares y controladas.
- Largo base hasta la mandíbula; la nuca queda ligeramente más larga, sin llegar a tocar los hombros.
- Volumen concentrado en la corona y los laterales; no es un casco liso.
- Flequillo asimétrico, con partición desplazada del centro y caída hacia el lado derecho anatómico de KAI.
- Mechones separados y puntiagudos con remate limpio: despeinado no significa ruido caótico.
- No es melena larga, no es afro, no es cabello pegado al cráneo ni bob simétrico.

### 4.2 Volumen y distribución

- La masa sobresale aproximadamente un 30 % por encima del cráneo anatómico y un 15 % a los lados.
- Se organiza en **5–7 grupos grandes** de mechones principales, no en hebras individuales.
- El flequillo cubre parte de la frente, pero **nunca cubre ambos ojos** en la expresión base.
- Las orejas asoman entre mechones laterales; no deben quedar completamente soterradas.
- El cabello negro es una masa Sumi `#0E100F` con brillos angulares Smoke Gray `#B8B0A5`, nunca una superficie azulada.

### 4.3 Mechones blancos: jerarquía y mapa anatómico fijo

Los acentos blancos se definen rigurosamente por el **lado anatómico de KAI** (no por la perspectiva del espectador):

```
       [FRENTE]
         S1 (Flequillo der. anatómico - Dominante)
        /
     [KAI]
    /     \
   S2      S3 (Nuca izq. anatómica - Secundario)
(Sien izq. anatómica - Secundario)
```

| ID | Ubicación anatómica | Jerarquía y forma | Vista frontal | Perfil izquierdo | Vista posterior |
|---|---|---|---|---|---|
| **S1** | Flequillo, lado derecho de KAI, desde la partición hacia la ceja derecha. | **Mechón dominante principal:** Grueso, angular, con masa propia. Es la firma facial clave. | Visible a la **izquierda del espectador**. | **No visible.** No inventar blanco en el perfil derecho. | **No visible.** |
| **S2** | Sien izquierda de KAI, inmediatamente por delante de la oreja izquierda. | **Acento secundario lateral:** Mechón corto, fino y estilizado. | Visible a la **derecha del espectador**. | **Visible**, delante de la oreja izquierda. | No visible (salvo borde mínimo). |
| **S3** | Nuca izquierda de KAI, en la capa interior detrás de la oreja izquierda. | **Acento secundario posterior:** Franja estrecha y alargada en capas internas. | **No visible.** | **Visible** detrás de la oreja hacia la nuca. | Visible a la **izquierda del espectador**. |

#### Reglas de jerarquía y contención de mechones blancos

- **S1 es el mechón dominante:** Posee mayor masa y pregnancia visual que S2 y S3 combinados.
- **S2 y S3 son acentos secundarios:** Funcionan como contrapuntos asimétricos; no deben competir en grosor ni presencia con S1.
- **Prohibición de franjas extensas:** Ninguno de los mechones blancos (S1, S2 o S3) debe deformarse o extenderse hasta convertirse en una franja blanca ancha, mecha corrida ni banda que recorra la cabeza.
- **Delimitación estricta:** Todo mechón blanco está completamente perfilado con lineart Sumi `#0E100F` para evitar que se desvanezca sobre fondo Washi.
- Los tres mechones conservan su posición fija: no se espejan, no se trasladan de hemisferio craneal y no se duplican.

### 4.4 Comportamiento dinámico del cabello

El cabello responde a las fuerzas físicas agrupado en **3–4 masas principales**:

- **En reposo:** Caída con balanceo suave y curvatura orgánica.
- **En salto:** La masa superior e inferior se separan sutilmente por inercia ascendente; los mechones blancos acompañan estrictamente a su grupo anatómico.
- **En caída:** El cabello se eleva por resistencia al aire y rebota al aterrizar.
- **En carrera:** La masa de la nuca se orienta hacia atrás; el flequillo se despeja sin tapar los ojos.
- **En expresiones:** Puede erizarse sutilmente en sorpresa o energía, sin transformarse en aura energética permanente.

> [!NOTE]
> **Separación entre diseño estático y animación:**
> Las descripciones dinámicas que incluyan desfases temporales (como *«retraso de 2–3 frames respecto al cuerpo»*) se definen como **referencias preliminares para la futura fase de animación (Fase 05 del plan)**. En la **ilustración maestra estática (turnaround A-00 de la Fase A)**, el cabello se dibuja en reposo dinámico natural sin aplicar cálculos de interpolación temporal.

---

## 5. Diseño facial

### 5.1 Ojos

- Forma **redondo-almendrada**, con sutil inclinación ascendente hacia el extremo exterior.
- Tamaño equilibrado: ocupan aproximadamente un 28–30 % del ancho facial cada uno.
- Párpado superior trazado con línea Sumi gruesa; párpado inferior fino y sutilmente abierto en el lagrimal.
- Iris grande y cálido, color **Amber `#D6A441`**, abarcando un 70–75 % de la altura ocular expuesta.
- Pupila **Sumi `#0E100F`**, circular, centrada, ocupando un 35–40 % del diámetro del iris.
- **Un único brillo principal Washi `#F7F5F0`** por ojo, ubicado en el cuadrante superior izquierdo del iris (opcionalmente un micro-punto secundario adyacente).
- Esclerótica en blanco Washi, con sombra cel Smoke Gray `#B8B0A5` en el borde superior bajo el párpado.
- Anillo limbal Sumi fino, sin iris de colores alternativos ni degradados multicolor.
- Mirada base: abierta, curiosa, viva y ligeramente pícara; nunca vacía, inexpresiva o amenazante.

### 5.2 Cejas, nariz, boca y orejas

- **Cejas:** Trazos Sumi cortos, flexibles y muy expresivos, visibles entre los mechones del flequillo.
- **Nariz:** Reducida a un punto o trazo mínimo Sumi, sin volumen nasal realista ni fosas detalladas.
- **Boca:** Línea Sumi fina; en descanso presenta comisura neutra o levemente juguetona. Sin labial ni dientes hiperdetallados.
- **Orejas:** Pequeñas, redondeadas, anatómicamente humanas; interior sombreado en Smoke Gray.
- Sin accesorios faciales, piercings, cicatrices ni pecas.

### 5.3 Guía de expresiones

Las expresiones deforman ojos, cejas y boca manteniendo inalterados los anclajes de identidad (forma ocular base, iris ámbar, un brillo, S1 en el flequillo y mandíbula suave).

| Expresión | Ojos | Cejas | Boca | Cabeza / cabello |
|---|---|---|---|---|
| **Base neutral** | Abiertos, mirada al frente. | Relajadas. | Línea pequeña neutra. | Recta; cabello en calma. |
| **Curiosidad** | Ligeramente más abiertos, pupila centrada. | Una ceja levantada. | Pequeña “o” o entreabierta. | Inclinación de 5–10°. |
| **Travesura** | Un ojo entrecerrado; mirada lateral. | Asimétricas. | Comisura levantada. | Inclinación pícara; S1 acompaña. |
| **Sorpresa** | Muy abiertos, pupila pequeña. | Altas. | “O” clara. | Cabeza atrás; cabello se eleva. |
| **Alegría / celebración** | Abiertos y brillantes; cierre breve permitido. | Altas y relajadas. | Sonrisa abierta. | Cabeza arriba; cabello rebota. |
| **Concentración / señalar** | Entrecerrados, mirada fija. | Rectas o una leve inclinación. | Línea firme. | Cabeza estable; cuerpo orientado al objetivo. |
| **Orgullo** | Medio cerrados, mirada segura. | Una ceja alta. | Media sonrisa. | Mentón arriba; pecho fuera. |
| **Somnoliento / descanso** | Párpados al 70–80 %. | Relajadas. | Pequeña, neutra. | Cabeza inclinada; cabello y cinta caen. |
| **Confusión / preocupación** | Un ojo más abierto que el otro. | Una arriba, otra abajo. | Línea ondulada. | Inclinación lateral; una mano cerca de la cabeza. |
| **Decisión** | Fijos, brillo contenido. | Bajas y juntas. | Línea firme. | Cabeza al frente; cabello hacia adelante. |

No se utilizan colores nuevos para expresar emociones. Rubor o símbolos gráficos cómic solo se consideran si se aprueban explícitamente en la hoja de expresiones de la Fase B.

---

## 6. Vestimenta

Estilo: **Japanese Fantasy Streetwear**. Atuendo urbano contemporáneo de inspiración japonesa funcional, no indumentaria ceremonial ni armadura de combate.

### 6.1 Capas y prendas

| Capa | Prenda | Color | Detalle |
|---|---|---|---|
| **1** | Camiseta interior de cuello redondo, manga corta, holgada. | Sumi `#0E100F` | Visible en el pecho y bajo el dobladillo; lisa, sin gráficos. |
| **2** | Chaqueta corta inspirada en haori, abierta al frente. | Exterior Sumi `#0E100F`; forro Washi `#F7F5F0`. | Ribete continuo Crimson `#A51C30` en solapas frontales, bajo y puños. |
| **3** | Shorts anchos inspirados en hakama, sobre la rodilla. | Sumi `#0E100F` | Pliegues suaves, corte cómodo tipo streetwear, ribete Crimson fino opcional. |
| **4** | Zapatillas modernas de inspiración japonesa (*chunky*). | Upper Sumi; suela Washi; entresuela Smoke Gray; talón Crimson. | Suela ancha moderna, cordones Sumi, sin logotipos comerciales. |
| **5** | Cinta carmesí posterior anclada a la cintura. | Crimson `#A51C30` | Nudo central y dos colas planas desiguales. Ver sección 7. |

### 6.2 Haori corto

- **Longitud:** Termina a la altura de la cadera alta, quedando ligeramente más corto que el dobladillo de la camiseta interior.
- **Corte:** Holgado, hombros con caída suave y mangas anchas que rematan a medio antebrazo.
- **Frente:** Abierto de forma permanente; no se cruza al pecho, no utiliza cinturón obi ni botones frontales.
- **Solapas:** Visibles en forro Washi (unos 2–3 cm de ancho) con ribete perimetral Crimson continuo (~1.5 cm).
- **Puños y bajo:** Ribete Crimson continuo y limpio.
- **Espalda:** Panel liso sin inscripciones, emblemas ni kanjis.
- **Bolsillos:** Ocultos en costura lateral, sin cremalleras metálicas expuestas.
- **Acabado textil:** Mate, con textura plana de algodón o lona cepillada; sin brillos sintéticos.

### 6.3 Camiseta interior

- Cuello redondo básico, corte relajado en Sumi sólido.
- El bajo sobresale aproximadamente 1–2 cm por debajo del haori, creando capas visibles en la silueta.

### 6.4 Shorts

- Inspiración estructural en la hakama pero adaptada al formato de bermuda urbana ancha.
- Longitud por encima de la rodilla, garantizando que las piernas queden despejadas.
- Pliegues frontales amplios y naturales; no simulan una falda rígida.
- Pretina elástica limpia sin cordones colgantes frontales.

### 6.5 Zapatillas

- Formato **low-top chunky sneaker**, robusto y moderno.
- Suela exterior Washi gruesa con entresuela Smoke Gray; empeine Sumi con lengüeta limpia; pieza de talón Crimson.
- Ligeramente sobredimensionadas para equilibrar el peso visual de la cabeza chibi.
- No son geta, sandalias de paja ni botas militares.

### 6.6 Restricciones de vestuario

- Prohibido kimono largo tradicional, yukata, obi ceremonioso, armaduras o hombreras samurái.
- Prohibido uniforme escolar, ropa formal ejecutiva o trajes corporativos.
- Prohibido cualquier tipo de logotipo comercial, marcas, textos o tipografías.
- Prohibidas cadenas, tachuelas pesadas, hebillas gigantes o correas superfluas.
- Prohibido el uso de vinilo brillante, cuero reflectante o telas transparentes.

---

## 7. Accesorios

El único accesorio aprobado del personaje es la **cinta carmesí posterior**.

### 7.1 Construcción física

- Tira de tela plana tejida, acabado mate, color Crimson `#A51C30`.
- Ancho regular proporcional: aproximadamente 2.5–3 % de H.
- **Nudo central cuadrado y compacto**, fijado en el centro posterior sobre la cinturilla del pantalón.
- **Dos colas planas desiguales** que descienden libremente sin flecos ni borlas:
  - Cola larga: desciende hasta la mitad del muslo.
  - Cola corta: desciende hasta la altura de la cadera baja.
- Extremos rematados con corte angular nítido; sin deshilachados ni costuras desaliñadas.
- Sin herrajes metálicos, cascabeles, cuentas ni bordados.

### 7.2 Anclaje y lectura visual

- La cinta está cosida a la espalda de la cinturilla; el nudo es el origen tangible de ambas colas.
- No brota de la columna vertebral ni simula una extensión corporal orgánica.
- **No es una cola animal:** No es prensil, no tiene articulaciones vertebrales, no se curva como tentáculo y no se estrecha en la punta.
- **Lectura en vistas:**
  - *Vista frontal:* Las colas no caen hacia adelante; únicamente asoma el borde lateral del nudo a los costados de la cintura.
  - *Perfil izquierdo:* Se aprecia el perfil limpio del nudo y la cola lateral correspondiente.
  - *Vista posterior:* Vista completa del nudo central y la caída de las dos colas asimétricas.

### 7.3 Dinámica de la cinta y desacoplamiento con animación

- En reposo, la cinta cae por gravedad con una curvatura natural sin rigidez ni flotabilidad mágica.
- Al correr, las colas ondean horizontalmente hacia atrás.
- Al saltar, se elevan siguiendo la inercia corporal y se asientan suavemente tras el impacto.
- No debe enrollarse alrededor de las piernas ni cruzarse de forma que confunda la silueta del personaje.

> [!NOTE]
> **Separación entre diseño estático y animación:**
> Las notas operativas de desfase temporal (tales como *«seguimiento de cadera con retraso de 2–4 frames»*) constituyen **referencias dinámicas preliminares para la fase de animación (Fase 05 del plan)**. En la **ilustración maestra estática de turnaround A-00**, la cinta se ilustra en reposo dinámico natural estático.

---

## 8. Paleta cromática

### 8.1 Colores y proporciones

La paleta se restringe estrictamente a **cinco colores planos**:

| Color | Hex | Uso principal | Proporción aproximada |
|---|---|---|---:|
| **Sumi** | `#0E100F` | Cabello, exterior de haori, camiseta, shorts, cuerpo de zapatillas, lineart, pupilas. | 42 % |
| **Washi** | `#F7F5F0` | Piel, forro del haori, suela de zapatillas, brillos de ojos, mechones blancos S1/S2/S3. | 32 % |
| **Smoke Gray** | `#B8B0A5` | Sombras cel en piel, sombras en forro/ropa, entresuela, detalles técnicos, interior de orejas. | 14 % |
| **Crimson** | `#A51C30` | Cinta posterior, ribetes de prendas, talón de zapatillas, acentos de color. | 9 % |
| **Amber** | `#D6A441` | Iris de los ojos exclusivamente. | 3 % |

Las proporciones tonales son estimadas sobre el cuerpo completo del personaje, excluyendo el fondo de lienzo.

### 8.2 Reglas de color y contraste

- **Paleta cerrada de cinco colores:** No se permite la inclusión de ningún sexto color ni tintes cálidos alternativos.
- **Uso reservado del Ámbar:** El color Amber `#D6A441` se reserva **exclusivamente para el iris ocular**. Prohibido su uso en vestimenta, calzado, cinta o efectos.
- **Carmesí como acento:** Crimson `#A51C30` actúa como contraste puntual; no debe ocupar áreas dominantes ni fondos textiles completos.
- **Tratamiento de piel Washi:** La piel es Washi `#F7F5F0`. No se mezcla con tintes melocotón, rosados ni ocres.
- **Separación visual en fondos Washi:**
  - El lineart Sumi `#0E100F` perimetral continuo separa obligatoriamente la piel Washi y el forro Washi del fondo del lienzo.
  - El sombreado cel en Smoke Gray `#B8B0A5` proporciona la profundidad y el volumen necesarios.
- **Separación visual en fondos oscuros Sumi:**
  - Los contornos Washi, ribetes Crimson y suelas claras sostienen la legibilidad en modo oscuro.
- **Sombras y luces:** Las sombras se resuelven exclusivamente mediante planos sólidos de Sumi y Smoke Gray; las luces mediante Washi puro. Máximo 1–2 niveles tonales por material. Prohibidos degradados continuos o reflejos en colores no inventariados.

---

## 9. Vistas de referencia

### 9.1 Convención anatómica

| Vista | Orientación | Lado visible | Finalidad técnica |
|---|---|---|---|
| **Frontal** | KAI mira directamente al frente. | La derecha anatómica de KAI queda a la izquierda del espectador. | Canon facial, flequillo dominante S1, solapas abiertas, camiseta y calzado frontal. |
| **Lateral izquierda** | KAI mira hacia la izquierda de la imagen. | Lado izquierdo anatómico de KAI. | Perfil canónico: silueta del rostro, oreja izquierda, mechones S2 y S3, manga y cinta. |
| **Posterior** | KAI de espaldas al espectador. | La izquierda anatómica de KAI queda a la izquierda del espectador. | Volumen dorsal del cabello, nuca con S3, panel trasero de haori y nudo central de cinta. |
| **Tres cuartos izquierdo** | Rotación de ~45° hacia la izquierda de KAI. | Ángulo 3/4 izquierdo. | Vista auxiliar de apoyo para tridimensionalidad (no sustituye las ortográficas). |

*Regla de oro:* El perfil derecho y el tres cuartos derecho están prohibidos para evitar inversiones erróneas de los mechones asimétricos S1, S2 y S3.

### 9.2 Vista frontal

Debe mostrar con precisión:
- Ojos simétricos con iris ámbar, pupila Sumi y un brillo Washi superior izquierdo cada uno.
- Flequillo asimétrico con S1 claramente posicionado a la izquierda del espectador y S2 a la derecha.
- Haori corto y abierto mostrando forro Washi y ribete Crimson continuo.
- Camiseta interior Sumi centrada en el pecho y bajo asomando 1–2 cm.
- Shorts anchos y zapatillas completas con punteras y suelas visibles.
- La cinta permanece detrás: las colas no cuelgan hacia adelante.

### 9.3 Perfil izquierdo

Debe mostrar con precisión:
- Nariz apuntando hacia la izquierda del lienzo.
- Oreja izquierda humana, con S2 claramente ubicado por delante y S3 en la nuca.
- Nuca del cabello con mayor longitud sin tocar los hombros.
- Manga izquierda holgada con caída natural y forro Washi expuesto en el puño.
- Ribete Crimson visible en solapa y bajo de chaqueta.
- Nudo central de la cinta visible de perfil con la cola izquierda descendiendo recta.
- Zapatilla izquierda completa con suela Washi, entresuela Smoke Gray y talón Crimson.

### 9.4 Vista posterior

Debe mostrar con precisión:
- Nuca del cabello con S3 situado a la izquierda del espectador.
- Ausencia total de S1 en la nuca.
- Cuello del haori cayendo recto sobre la espalda limpia.
- Dobladillo del haori y bajo de la camiseta visibles.
- Shorts anchos y talones Crimson de las zapatillas.
- **Nudo central cuadrado de la cinta**, perfectamente centrado en la pretina, con las dos colas planas desiguales descendiendo hacia el muslo y la cadera.

### 9.5 Hoja de referencia canónica (A-00)

La hoja de turnaround para el entregable A-00 de la Fase A debe cumplir:
- Formato apaisado sobre fondo continuo **Washi `#F7F5F0`**.
- Línea de apoyo del suelo fina en **Smoke Gray `#B8B0A5`**.
- Las tres figuras (frontal, perfil izquierdo, posterior) a la **misma escala exacta**, alineadas en altura total, línea de ojos, hombros, cintura, bajos y suelas.
- Sin textos renderizados dentro del dibujo; las cotas y rótulos se colocan en capa vectorial separada.
- Sin sombras de piso arrojadas ni fondos escénicos.
- Queda prohibido espejar digitalmente las vistas para crear las restantes.

---

## 10. Reglas de consistencia y aceptación

Criterios obligatorios de QA visual antes de dar por aprobada cualquier ilustración o turnaround de KAI:

- [ ] **Dirección de ilustración:** Acabado 2D Anime Chibi respetado; lineart limpio con contorno exterior jerarquizado; cel shading de 1–2 niveles; sin 3D, realismo ni estilo corporativo.
- [ ] **Estética de tinta:** Línea expresiva y viva inspirada en sumi-e, pero el personaje es una figura sólida, no líquida ni disuelta.
- [ ] **Proporciones anatómicas:** Mide exactamente 2.5 cabezas anatómicas desde la coronilla hasta el talón, con la cabeza ocupando el 40 % ($H_{anat}$).
- [ ] **Volumen exterior:** La masa externa del cabello (+30 % arriba, +15 % lados) y el calzado chunky (+10 % ancho, suela) respetan la lectura chibi sin alterar las 2.5 cabezas internas.
- [ ] **Separación Washi/Washi:** La piel Washi y el forro se distinguen inequívocamente del lienzo Washi mediante contorno Sumi cerrado y sombras Smoke Gray.
- [ ] **Paleta estricta de 5 colores:** Únicamente Sumi, Washi, Smoke Gray, Crimson y Amber. Sin sexto color (sin piel melocotón).
- [ ] **Uso del Ámbar:** El ámbar se encuentra única y exclusivamente en los iris de los ojos.
- [ ] **Jerarquía del cabello:** S1 es el mechón dominante en el flequillo derecho de KAI; S2 y S3 son acentos secundarios contenidos. Ninguno forma una franja o banda corrida.
- [ ] **Anclaje de mechones:** S1, S2 y S3 están en sus posiciones anatómicas fijas y no se espejan.
- [ ] **Expresión facial:** Base despierta, curiosa y ligeramente traviesa; iris ámbar con un brillo Washi claro por ojo.
- [ ] **Vestimenta Japanese Fantasy Streetwear:** Haori corto, abierto, con forro Washi y ribete Crimson; camiseta interior visible; shorts anchos; sneakers modernos.
- [ ] **Cinta posterior:** Color Crimson, nudo central visible en cintura, dos colas desiguales planas; no parece cola animal.
- [ ] **Desacoplamiento con animación:** Las notas dinámicas en frames quedan identificadas como referencias preliminares para la Fase 05 y no se exigen a la ilustración estática.
- [ ] **Convención de vistas:** Vistas frontal, lateral izquierda y posterior alineadas canónicamente; sin perfil derecho.
- [ ] **Integridad conceptual:** No se añaden rasgos animales, alas, cuernos, armas ni logotipos. No se reutilizan elementos descartados.

---

## 11. Control de versión

| Versión | Fecha | Cambios introducidos | Estado |
|---|---|---|---|
| **1.0** | 2026-11-19 | Especificación visual maestra inicial: silueta, anatomía, cabello, rostro, vestuario, cinta, paleta de 5 colores y vistas canónicas. | Superada |
| **1.1** | 2026-11-19 | Revisión final técnica para autorización de A-00: adición de la sección «Dirección de ilustración» (2D Anime Chibi, jerarquía de contornos, cel shading, filosofía de tinta no-líquida); clarificación métrica de 2.5 cabezas anatómicas vs dimensiones exteriores de cabello y calzado; reglas de contraste piel/fondo Washi mediante lineart Sumi y sombras Smoke Gray sin sexto color; jerarquía de mechones blancos (S1 dominante, S2/S3 secundarios, prohibición de franjas extensas); y desacoplamiento de frames como referencias dinámicas exclusivas para la animación. | **Aprobado para ilustración A-00** |

**Siguiente paso:** Proceder con la autorización y ejecución de la primera ilustración canónica: el model sheet turnaround (A-00) según la Fase A de `KAI_PRODUCTION_PLAN.md`.
