from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# Importamos 'pipeline' (ya no necesitamos las clases específicas)
from transformers import pipeline

# --- Carga del Modelo desde el HUB de HUGGING FACE ---
# Esto se ejecuta solo una vez cuando la API se inicia

# 1. Definimos el ID de tu modelo en el Hub
repo_id = "matiasrodriguezc/xlnet-emotion-classifier-es"

print(f"Cargando pipeline para '{repo_id}' desde el Hub de Hugging Face...")

# 2. Creamos el pipeline directamente desde el repo_id
# La función 'pipeline' es lo suficientemente inteligente para
# descargar y cachear tanto el modelo como el tokenizador correctos.
classifier = pipeline(
    "text-classification",
    model=repo_id
)

print("Modelo cargado exitosamente.")

# --- Configuración de la API (esto no cambia) ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las origenes (simple para la demo)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

# --- Endpoint de la API (esto no cambia) ---
@app.post("/analyze")
def analyze_emotion(request: TextInput):
    text_to_analyze = request.text
    if not text_to_analyze:
        return {"error": "El texto no puede estar vacío."}
    
    # Usamos top_k=None para obtener todos los scores, como en tu código original
    predictions = classifier(text_to_analyze, top_k=None)
    return predictions