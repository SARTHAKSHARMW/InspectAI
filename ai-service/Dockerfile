FROM python:3.11-slim-bookworm

WORKDIR /app

# Install system dependencies required by OpenCV and YOLO
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Pre-install CPU-only PyTorch to dramatically reduce image size and prevent CI timeouts
RUN pip install --no-cache-dir torch==2.12.1 torchvision==0.27.1 --index-url https://download.pytorch.org/whl/cpu

RUN pip install --no-cache-dir -r requirements.txt

COPY app/ app/
# We copy models and other folders if they exist or they will be downloaded/created on the fly.
# The app creates UPLOAD_FOLDER and RESULT_FOLDER internally in predictor.py

EXPOSE 8000

# Working directory inside app so that sibling imports work
WORKDIR /app/app
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
