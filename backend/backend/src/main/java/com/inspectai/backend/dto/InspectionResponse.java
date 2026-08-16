package com.inspectai.backend.dto;

public class InspectionResponse {

    private Long id;
    private String originalFilename;
    private String predictionId;
    private int totalDetections;
    private String detections;
    private double processingTimeSeconds;
    private String status;
    private String createdAt;


    public InspectionResponse() {
    }

    public InspectionResponse(
            Long id,
            String originalFilename,
            String predictionId,
            int totalDetections,
            String detections,
            double processingTimeSeconds,
            String status,
            String createdAt
    ) {
        this.id = id;
        this.originalFilename = originalFilename;
        this.predictionId = predictionId;
        this.totalDetections = totalDetections;
        this.detections = detections;
        this.processingTimeSeconds = processingTimeSeconds;
        this.status = status;
        this.createdAt = createdAt;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public void setOriginalFilename(String originalFilename) {
        this.originalFilename = originalFilename;
    }

    public String getPredictionId() {
        return predictionId;
    }

    public void setPredictionId(String predictionId) {
        this.predictionId = predictionId;
    }

    public int getTotalDetections() {
        return totalDetections;
    }

    public void setTotalDetections(int totalDetections) {
        this.totalDetections = totalDetections;
    }

    public String getDetections() {
        return detections;
    }

    public void setDetections(String detections) {
        this.detections = detections;
    }

    public double getProcessingTimeSeconds() {
        return processingTimeSeconds;
    }

    public void setProcessingTimeSeconds(double processingTimeSeconds) {
        this.processingTimeSeconds = processingTimeSeconds;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

}
