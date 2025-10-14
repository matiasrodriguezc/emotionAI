from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline, XLNetForSequenceClassification, XLNetTokenizer

# --- Carga del Modelo LOCALMENTE ---
# Esto se ejecuta solo una vez cuando la API se inicia
print("Cargando modelo y tokenizador LOCALMENTE...")
model_path = "./fine_tuned_model"  # <-- La ruta a tu carpeta local

# Carga el tokenizer y el modelo desde la carpeta local
tokenizer = XLNetTokenizer.from_pretrained(model_path)
model = XLNetForSequenceClassification.from_pretrained(model_path)

# Creamos el pipeline que hará la predicción
classifier = pipeline(
    "text-classification",
    model=model,
    tokenizer=tokenizer
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

    predictions = classifier(text_to_analyze, top_k=None)
    return predictions