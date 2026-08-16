from ultralytics import YOLO
from pathlib import Path
from fastapi import UploadFile, HTTPException
import shutil
import uuid
import time

from config import (
    MODEL_PATH,
    UPLOAD_FOLDER,
    RESULT_FOLDER
)

# ---------------------------------------
# Create Required Folders
# ---------------------------------------
UPLOAD_FOLDER.mkdir(exist_ok=True)
RESULT_FOLDER.mkdir(exist_ok=True)

# ---------------------------------------
# Load YOLO Model Once
# ---------------------------------------
print("Loading YOLO Model...")

try:
    model = YOLO(MODEL_PATH)
    print("YOLO Model Loaded Successfully")

except Exception as e:
    print(e)
    raise e


# ---------------------------------------
# Prediction Function
# ---------------------------------------
def run_prediction(image: UploadFile):

    try:

        # -------------------------------
        # Validate Image
        # -------------------------------

        if image.filename == "":
            raise HTTPException(
                status_code=400,
                detail="No image selected."
            )

        allowed_extensions = [
            ".jpg",
            ".jpeg",
            ".png"
        ]

        extension = Path(image.filename).suffix.lower()

        if extension not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail="Only JPG, JPEG and PNG images are allowed."
            )

        # -------------------------------
        # Start Timer
        # -------------------------------

        start_time = time.time()

        # -------------------------------
        # Unique Prediction ID
        # -------------------------------

        prediction_id = str(uuid.uuid4())[:8]

        unique_filename = f"{prediction_id}_{image.filename}"

        image_path = UPLOAD_FOLDER / unique_filename

        # -------------------------------
        # Save Uploaded Image
        # -------------------------------

        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # -------------------------------
        # Run YOLO
        # -------------------------------

        results = model.predict(
            source=str(image_path),
            save=True,
            project=str(RESULT_FOLDER),
            name="prediction",
            exist_ok=True
        )

        prediction = results[0]

        # -------------------------------
        # Detection List
        # -------------------------------

        detections = []

        for box in prediction.boxes:

            class_id = int(box.cls[0])

            confidence = float(box.conf[0])

            detections.append({

                "name": model.names[class_id],

                "confidence": round(confidence, 2)

            })

        # -------------------------------
        # Processing Time
        # -------------------------------

        processing_time = round(
            time.time() - start_time,
            2
        )

        # -------------------------------
        # Return Response
        # -------------------------------

        return {

            "success": True,

            "prediction_id": prediction_id,

            "original_filename": image.filename,

            "saved_image": str(image_path),

            "result_folder": "results/prediction",

            "processing_time_seconds": processing_time,

            "total_detections": len(detections),

            "detections": detections,

            "message": "Prediction Completed Successfully"

        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction Failed : {str(e)}"
        )