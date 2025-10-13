from http.server import BaseHTTPRequestHandler
import json
from transformers import pipeline
from huggingface_hub import snapshot_download

# --- Modelo y Tokenizador (se descargarán bajo demanda) ---
class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Leer el cuerpo de la petición
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        body = json.loads(post_data)
        text_to_analyze = body.get('text', '')

        if not text_to_analyze:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "El texto no puede estar vacío."}).encode())
            return

        try:
            # --- LÓGICA DE DESCARGA Y CARGA DEL MODELO ---
            # Reemplaza con tu usuario/nombre_del_repo de Hugging Face
            repo_id = "matiasrodriguezc/xlnet-emotion-classifier-es"
            
            # Vercel solo permite escribir en el directorio /tmp
            cache_path = "/tmp/model_cache"
            
            # Descarga el modelo desde el Hub a la carpeta temporal
            model_path = snapshot_download(repo_id=repo_id, cache_dir=cache_path)
            
            # Carga el pipeline desde la carpeta donde se descargó
            classifier = pipeline("text-classification", model=model_path)
            
            # Realiza la predicción
            predictions = classifier(text_to_analyze, top_k=None)
            
            # Enviar respuesta exitosa
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            # Añadir cabeceras CORS para permitir la comunicación
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(predictions).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
            
    def do_OPTIONS(self):
        # Manejar peticiones pre-flight de CORS
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()