from fastapi import FastAPI, UploadFile, File
from predictor import run_prediction

# ---------------------------------------
# FastAPI Application
# ---------------------------------------
app = FastAPI()


# ---------------------------------------
# Home API
# ---------------------------------------
@app.get("/")
def home():
    return {
        "message": "Welcome to InspectAI AI Service"
    }


# ---------------------------------------
# Health API
# ---------------------------------------
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# ---------------------------------------
# Predict API
# ---------------------------------------
@app.post("/predict")
async def predict(image: UploadFile = File(...)):

    result = run_prediction(image)

    return result
