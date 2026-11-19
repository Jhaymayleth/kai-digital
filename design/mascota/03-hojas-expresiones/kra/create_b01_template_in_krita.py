"""
KAI: The Little World Wanderer — Script de Generación de Plantilla B-01 (Expresiones) en Krita
--------------------------------------------------------------------------------------------
Uso en Krita (GUI):
1. Abrir Krita 5.2.2 en el escritorio.
2. Ir a Herramientas (Tools) -> Scripts -> Scripter.
3. Abrir o pegar este script y ejecutar.
4. Genera la hoja oficial de 10 expresiones en cuadrícula 2x5 a 3840 x 2160 px (300 DPI),
   con grupos individuales para cada expresión y capas separadas de cejas, ojos y bocas.
"""

import os
from krita import Krita

def build_kai_b01_template():
    app = Krita.instance()
    
    width = 3840
    height = 2160
    name = "KAI_B-01_hoja_expresiones"
    color_model = "RGBA"
    color_depth = "U8"
    color_profile = "sRGB-elle-V2-srgbtrc.icc"
    resolution = 300.0
    
    doc = app.createDocument(width, height, name, color_model, color_depth, color_profile, resolution)
    if not doc:
        print("[ERROR] No se pudo crear el documento de expresiones.")
        return
        
    root = doc.rootNode()
    for child in root.childNodes():
        child.remove()
        
    # 1. Fondo Washi #F7F5F0
    bg = doc.createNode("[FONDO_WASHI]", "paintlayer")
    root.addChildNode(bg, None)
    
    # 2. Grupo [GUIAS_CUADRICULA]
    guias = doc.createGroupLayer("[GUIAS_CUADRICULA]")
    root.addChildNode(guias, None)
    
    # Guías horizontales y verticales para 10 celdas (2 filas x 5 columnas)
    # Filas: Centros en Y=650 y Y=1550
    # Columnas: Centros en X=440, X=1180, X=1920, X=2660, X=3400
    doc.setHorizontalGuides([200.0, 1100.0, 1150.0, 2050.0])
    doc.setVerticalGuides([100.0, 780.0, 840.0, 1520.0, 1580.0, 2260.0, 2320.0, 3000.0, 3060.0, 3740.0])
    doc.setGuidesVisible(True)
    doc.setGuidesLocked(True)
    
    # 3. Grupos por expresión (10 oficiales de KAI)
    expresiones = [
        "EXP-01_Base_Neutral",
        "EXP-02_Curiosidad",
        "EXP-03_Travesura",
        "EXP-04_Sorpresa",
        "EXP-05_Alegria_Celebracion",
        "EXP-06_Concentracion_Senalar",
        "EXP-07_Orgullo",
        "EXP-08_Somnoliento_Descanso",
        "EXP-09_Confusion_Duda",
        "EXP-10_Decision"
    ]
    
    subcapas = [
        "Lineart_Rasgos",
        "Cejas",
        "Ojos_Iris_Pupila",
        "Boca",
        "Sombras_Cel",
        "Cabeza_Base"
    ]
    
    for exp_name in reversed(expresiones):
        exp_group = doc.createGroupLayer(f"[{exp_name}]")
        root.addChildNode(exp_group, None)
        for sub in reversed(subcapas):
            node = doc.createNode(sub, "paintlayer")
            exp_group.addChildNode(node, None)
            
    doc.refreshProjection()
    
    target_dir = os.path.abspath("design/mascota/03-hojas-expresiones/kra")
    os.makedirs(target_dir, exist_ok=True)
    target_path = os.path.join(target_dir, "KAI_B-01_hoja_expresiones.kra")
    doc.saveAs(target_path)
    app.activeWindow().addView(doc)
    print(f"[EXITO] Plantilla de expresiones B-01 guardada en: {target_path}")

if __name__ == "__main__":
    build_kai_b01_template()
