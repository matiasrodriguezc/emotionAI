# Usa una imagen oficial de Python
FROM python:3.9-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de requisitos e instálalo
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia tu código de la API
COPY main.py .

# Expone el puerto que Hugging Face espera (por defecto 7860)
EXPOSE 7860

# Comando para correr la app cuando el contenedor inicie
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]