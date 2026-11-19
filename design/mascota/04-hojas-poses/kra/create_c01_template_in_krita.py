"""
KAI: The Little World Wanderer — Script de Generación de Plantilla C-01 (Poses) en Krita
--------------------------------------------------------------------------------------
Uso en Krita (GUI):
1. Abrir Krita 5.2.2.
2. Herramientas -> Scripts -> Scripter.
3. Ejecutar este script.
4. Genera el documento maestro de poses a 3840 x 2160 px (300 DPI) organizado en 4 grupos
   principales correspondientes a las familias de poses aprobadas.
"""

import os
from krita import Krita

def build_kai_c01_template():
    app = Krita.instance()
    
    width = 3840
    height = 2160
    name = "KAI_C-01_hoja_poses_maestra"
    color_model = "RGBA"
    color_depth = "U8"
    color_profile = "sRGB-elle-V2-srgbtrc.icc"
    resolution = 300.0
    
    doc = app.createDocument(width, height, name, color_model, color_depth, color_profile, resolution)
    if not doc:
        print("[ERROR] No se pudo crear el documento de poses.")
        return
        
    root = doc.rootNode()
    for child in root.childNodes():
        child.remove()
        
    # Fondo
    bg = doc.createNode("[FONDO_WASHI]", "paintlayer")
    root.addChildNode(bg, None)
    
    # Guías de suelo y alturas
    doc.setHorizontalGuides([500.0, 1100.0, 1445.0, 2000.0, 2040.0])
    doc.setGuidesVisible(True)
    doc.setGuidesLocked(True)
    
    # Grupos por familia de poses
    familias = [
        ("FAMILIA_4_CONTEXTUALES", ["POSE-X01_Guia_Proyectos", "POSE-X02_Inspeccion_Codigo", "POSE-X03_Logros_Metricas"]),
        ("FAMILIA_3_COMICAS_DESCANSO", ["POSE-C01_Caida_Comica", "POSE-C02_Dormitar_Relax"]),
        ("FAMILIA_2_INTERACCIONES", ["POSE-I01_Saludar", "POSE-I02_Senalar", "POSE-I03_Sentarse", "POSE-I04_Pensar", "POSE-I05_Celebrar", "POSE-I06_Asomarse", "POSE-I07_Poke_Reaccion"]),
        ("FAMILIA_1_BASICAS", ["POSE-B01_De_Pie_Idle", "POSE-B02_Respirar_Sway", "POSE-B03_Caminar", "POSE-B04_Correr", "POSE-B05_Saltar", "POSE-B06_Aterrizar"])
    ]
    
    sublayers = ["Lineart_Sumi", "Sombras_SmokeGray", "Color_Base", "Separacion_Miembros"]
    
    for fam_name, poses in familias:
        fam_group = doc.createGroupLayer(f"[{fam_name}]")
        root.addChildNode(fam_group, None)
        for pose_name in reversed(poses):
            pose_group = doc.createGroupLayer(pose_name)
            fam_group.addChildNode(pose_group, None)
            for sub in reversed(sublayers):
                node = doc.createNode(sub, "paintlayer")
                pose_group.addChildNode(node, None)
                
    doc.refreshProjection()
    
    target_dir = os.path.abspath("design/mascota/04-hojas-poses/kra")
    os.makedirs(target_dir, exist_ok=True)
    target_path = os.path.join(target_dir, "KAI_C-01_hoja_poses_maestra.kra")
    doc.saveAs(target_path)
    app.activeWindow().addView(doc)
    print(f"[EXITO] Plantilla de poses guardada en: {target_path}")

if __name__ == "__main__":
    build_kai_c01_template()
