# Usa una imagen oficial de Python
FROM python:3.9-slim

# Establece el directorio de trabajo
WORKDIR /app

# Establece las variables de entorno para el caché
ENV TRANSFORMERS_CACHE /app/cache
ENV HF_HOME /app/cache

# ---- LA NUEVA CORRECCIÓN ESTÁ AQUÍ ----
# Crea la carpeta de caché y dale permisos de escritura a todos
RUN mkdir -p /app/cache && chmod -R 777 /app/cache
# -------------------------------------

# Copia el archivo de requisitos e instálalo
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia tu código de la API
COPY main.py .

# Expone el puerto que Hugging Face espera
EXPOSE 7860

# Comando para correr la app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]