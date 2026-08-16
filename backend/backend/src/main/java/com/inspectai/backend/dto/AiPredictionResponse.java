package com.inspectai.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AiPredictionResponse {

    private boolean success;

    @JsonProperty("prediction_id")
    private String predictionId;

    @JsonProperty("original_filename")
    private String originalFilename;

    @JsonProperty("saved_image")
    private String savedImage;

    @JsonProperty("result_folder")
    private String resultFolder;

    @JsonProperty("processing_time_seconds")
    private double processingTimeSeconds;

    @JsonProperty("total_detections")
    private int totalDetections;

    private List<DetectionItem> detections;

    private String message;


    public AiPredictionResponse() {
    }


    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getPredictionId() {
        return predictionId;
    }

    public void setPredictionId(String predictionId) {
        this.predictionId = predictionId;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public void setOriginalFilename(String originalFilename) {
        this.originalFilename = originalFilename;
    }

    public String getSavedImage() {
        return savedImage;
    }

    public void setSavedImage(String savedImage) {
        this.savedImage = savedImage;
    }

    public String getResultFolder() {
        return resultFolder;
    }

    public void setResultFolder(String resultFolder) {
        this.resultFolder = resultFolder;
    }

    public double getProcessingTimeSeconds() {
        return processingTimeSeconds;
    }

    public void setProcessingTimeSeconds(double processingTimeSeconds) {
        this.processingTimeSeconds = processingTimeSeconds;
    }

    public int getTotalDetections() {
        return totalDetections;
    }

    public void setTotalDetections(int totalDetections) {
        this.totalDetections = totalDetections;
    }

    public List<DetectionItem> getDetections() {
        return detections;
    }

    public void setDetections(List<DetectionItem> detections) {
        this.detections = detections;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DetectionItem {

        private String name;

        private double confidence;


        public DetectionItem() {
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public double getConfidence() {
            return confidence;
        }

        public void setConfidence(double confidence) {
            this.confidence = confidence;
        }

    }

}
