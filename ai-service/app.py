from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.get("/")
def index():
    return jsonify({
        "service": "La Ferme de l'Avenir OS - AI Service",
        "version": "0.1.0",
        "status": "running"
    })


@app.get("/health")
def health():
    return jsonify({
        "service": "ai-service",
        "status": "ok"
    })


@app.post("/check-canon")
def check_canon():
    payload = request.get_json(silent=True) or {}
    scene = payload.get("scene", {})
    canon_data = payload.get("canonData", {})

    content = scene.get("content", "") or ""
    title = scene.get("title", "scene sans titre")
    location_name = scene.get("location_name")
    characters = scene.get("characters", [])

    issues = []
    suggestions = []
    score = 100

    if len(content.strip()) < 80:
        score -= 20
        issues.append({
            "type": "structure",
            "severity": "medium",
            "message": "La scene est trop courte pour une verification canon solide."
        })
        suggestions.append("Ajouter le contexte, l'objectif, le conflit et la consequence de la scene.")

    if not location_name and not scene.get("location_id"):
        score -= 10
        issues.append({
            "type": "lieu",
            "severity": "medium",
            "message": "Aucun lieu canonique n'est associe a la scene."
        })
        suggestions.append("Associer la scene a un lieu de la bible creative.")

    if not characters:
        score -= 10
        issues.append({
            "type": "personnage",
            "severity": "low",
            "message": "Aucun personnage canonique n'est associe a la scene."
        })
        suggestions.append("Associer au moins un personnage valide a la scene.")

    lower_content = content.lower()

    if "contradiction" in lower_content or "aucune logique" in lower_content:
        score -= 25
        issues.append({
            "type": "coherence",
            "severity": "high",
            "message": "La scene contient des indices de rupture de coherence."
        })
        suggestions.append("Reformuler les passages qui semblent contredire les regles du monde.")

    score = max(0, min(100, score))

    if score >= 85:
        status = "validated"
    elif score >= 60:
        status = "to_correct"
    else:
        status = "out_of_canon"

    if not suggestions:
        suggestions.append("La scene peut etre integree au canon du MVP.")

    return jsonify({
        "title": title,
        "score": score,
        "status": status,
        "issues": issues,
        "suggestions": suggestions,
        "canon_items_checked": {
            "rules": len(canon_data.get("canon_rules", [])),
            "characters": len(canon_data.get("characters", [])),
            "locations": len(canon_data.get("locations", []))
        },
        "source": "flask-ai-service"
    })


@app.post("/generate-prompt")
def generate_prompt():
    payload = request.get_json(silent=True) or {}
    scene = payload.get("scene", {})
    prompt_type = payload.get("prompt_type", "manga")

    title = scene.get("title", "scene sans titre")
    content = scene.get("content", "")
    location_name = scene.get("location_name", "lieu a definir")
    tone = scene.get("tone", "espoir, mystere, tension douce")
    characters = scene.get("characters", [])

    character_names = []
    for character in characters:
        if character.get("name"):
            character_names.append(character["name"])

    if not character_names:
        character_names_text = "personnages a definir"
    else:
        character_names_text = ", ".join(character_names)

    prompt_text = "\n".join([
        f"Type de prompt: {prompt_type}",
        f"Titre: {title}",
        f"Personnages: {character_names_text}",
        f"Lieu: {location_name}",
        f"Ton: {tone}",
        "Style visuel: manga solarpunk, ferme futuriste, nature abondante, technologie douce, lumiere cinematographique.",
        "Direction artistique: chaleureux, coherent, organique, futuriste et lisible.",
        f"Action principale: {content}",
        "Contraintes: respecter le canon, eviter les contradictions, garder les personnages reconnaissables."
    ])

    return jsonify({
        "prompt_type": prompt_type,
        "prompt_text": prompt_text,
        "source": "flask-ai-service"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
