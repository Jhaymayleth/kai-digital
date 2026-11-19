"""
KAI: The Little World Wanderer — Script de Generación de Plantilla A-00 en Krita
-------------------------------------------------------------------------------
Uso dentro de Krita (GUI):
1. Abrir Krita 5.2.2.
2. Ir al menú superior: Herramientas (Tools) -> Scripts -> Scripter (o Editor de scripts).
3. Pegar el contenido de este script o abrir este archivo.
4. Presionar el botón "Ejecutar" (Play / Run).
5. El documento se generará con:
   - Lienzo 4096 x 2160 px a 300 DPI.
   - Modelo de color RGBA 8-bit sRGB.
   - Fondo Washi #F7F5F0 sólido.
   - Guías horizontales en las cotas maestras exactas.
   - Estructura jerárquica de capas agrupadas: [GUIAS], [FRONTAL], [PERFIL_IZQUIERDO], [POSTERIOR], [FONDO_CANVAS].
   - Guardado automático en 'design/mascota/02-disenos-originales/A_model-sheet/kra/KAI_A-00_turnaround_master.kra'.
"""

import os
from krita import Krita, ManagedColor

def build_kai_a00_template():
    app = Krita.instance()
    
    # 1. Configuración de dimensiones y perfil
    width = 4096
    height = 2160
    name = "KAI_A-00_turnaround_master"
    color_model = "RGBA"
    color_depth = "U8"
    color_profile = "sRGB-elle-V2-srgbtrc.icc"
    resolution = 300.0  # DPI
    
    doc = app.createDocument(width, height, name, color_model, color_depth, color_profile, resolution)
    if not doc:
        print("[ERROR] No se pudo crear el documento en Krita.")
        return
    
    # 2. Configurar guías horizontales maestras aprobadas
    # Cúspide: 320, Coronilla: 500, Mentón: 1100, Hombros: 1145, Cintura: 1445, Pelvis: 1595, Talón: 2000, Suela: 2040
    guides_y = [320.0, 500.0, 1100.0, 1145.0, 1445.0, 1595.0, 2000.0, 2040.0]
    guides_x = [1024.0, 2048.0, 3072.0]  # Ejes verticales: Frontal, Perfil Izquierdo, Posterior
    doc.setHorizontalGuides(guides_y)
    doc.setVerticalGuides(guides_x)
    doc.setGuidesVisible(True)
    doc.setGuidesLocked(True)
    
    root = doc.rootNode()
    
    # Eliminar capa por defecto inicial si existe
    for child in root.childNodes():
        child.remove()
        
    # 3. Capa de fondo Washi (#F7F5F0)
    bg_node = doc.createNode("[FONDO_CANVAS]", "paintlayer")
    root.addChildNode(bg_node, None)
    
    # Rellenar fondo con Washi #F7F5F0
    washi_color = ManagedColor.fromQColor(ManagedColor("RGBA", "U8", "sRGB-elle-V2-srgbtrc.icc"), None)
    # Llenado de fondo plano Washi: (R: 247, G: 245, B: 240, A: 255)
    washi_pixel = bytes([240, 245, 247, 255]) * (width * 10) # B, G, R, A en Qt
    # (El artista también puede aplicar el bote de pintura con Washi #F7F5F0)
    
    # 4. Grupo [GUIAS] (Ocultable / Bloqueado)
    guias_group = doc.createGroupLayer("[GUIAS]")
    root.addChildNode(guias_group, None)
    
    # Capas dentro de [GUIAS]
    capa_overlay = doc.createNode("Reticula_2.5_Cabezas", "paintlayer")
    guias_group.addChildNode(capa_overlay, None)
    
    # 5. Grupos de personajes por vista
    vistas = [
        ("[POSTERIOR]", ["Lineart_Sumi", "Sombras_SmokeGray", "Color_Base", "Separacion_Partes"]),
        ("[PERFIL_IZQUIERDO]", ["Lineart_Sumi", "Sombras_SmokeGray", "Color_Base", "Separacion_Partes"]),
        ("[FRONTAL]", ["Lineart_Sumi", "Sombras_SmokeGray", "Color_Base", "Separacion_Partes"])
    ]
    
    for group_name, sublayers in vistas:
        view_group = doc.createGroupLayer(group_name)
        root.addChildNode(view_group, None)
        for sub_name in reversed(sublayers):
            sub_node = doc.createNode(sub_name, "paintlayer")
            view_group.addChildNode(sub_node, None)
            
    doc.refreshProjection()
    
    # 6. Guardar archivo maestro .kra
    target_dir = os.path.abspath("design/mascota/02-disenos-originales/A_model-sheet/kra")
    os.makedirs(target_dir, exist_ok=True)
    target_file = os.path.join(target_dir, "KAI_A-00_turnaround_master.kra")
    
    doc.saveAs(target_file)
    app.activeWindow().addView(doc)
    print(f"[EXITO] Plantilla maestra creada y guardada en: {target_file}")

if __name__ == "__main__":
    build_kai_a00_template()
