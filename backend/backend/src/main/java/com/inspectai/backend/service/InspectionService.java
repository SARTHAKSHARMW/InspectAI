package com.inspectai.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inspectai.backend.dto.AiPredictionResponse;
import com.inspectai.backend.dto.InspectionResponse;
import com.inspectai.backend.entity.Inspection;
import com.inspectai.backend.entity.User;
import com.inspectai.backend.repository.InspectionRepository;
import com.inspectai.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InspectionService {

    @Autowired
    private InspectionRepository inspectionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AiServiceClient aiServiceClient;

    private final ObjectMapper objectMapper = new ObjectMapper();


    // =========================
    // CREATE INSPECTION
    // =========================

    public InspectionResponse createInspection(String userEmail, MultipartFile image) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "User not found"
                ));

        if (image.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Image file is empty"
            );
        }

        String contentType = image.getContentType();

        if (contentType == null ||
                (!contentType.equals("image/jpeg") &&
                        !contentType.equals("image/png") &&
                        !contentType.equals("image/jpg"))) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid image type. Only JPG, JPEG and PNG are allowed"
            );
        }

        AiPredictionResponse prediction = aiServiceClient.predict(image);

        Inspection inspection = new Inspection();
        inspection.setUser(user);
        inspection.setOriginalFilename(image.getOriginalFilename());
        inspection.setPredictionId(prediction.getPredictionId());
        inspection.setTotalDetections(prediction.getTotalDetections());
        inspection.setProcessingTimeSeconds(prediction.getProcessingTimeSeconds());
        inspection.setStatus("COMPLETED");

        try {

            String detectionsJson = objectMapper.writeValueAsString(
                    prediction.getDetections()
            );
            inspection.setDetections(detectionsJson);

        } catch (JsonProcessingException e) {

            inspection.setDetections("[]");

        }

        inspectionRepository.save(inspection);

        return mapToResponse(inspection);

    }


    // =========================
    // GET USER INSPECTIONS
    // =========================

    public List<InspectionResponse> getUserInspections(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "User not found"
                ));

        List<Inspection> inspections =
                inspectionRepository.findByUserOrderByCreatedAtDesc(user);

        return inspections.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

    }


    // =========================
    // GET SINGLE INSPECTION
    // =========================

    public InspectionResponse getInspection(String userEmail, Long inspectionId) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "User not found"
                ));

        Inspection inspection = inspectionRepository
                .findByIdAndUser(inspectionId, user)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Inspection not found"
                ));

        return mapToResponse(inspection);

    }


    // =========================
    // MAP ENTITY TO RESPONSE
    // =========================

    private InspectionResponse mapToResponse(Inspection inspection) {

        InspectionResponse response = new InspectionResponse();

        response.setId(inspection.getId());
        response.setOriginalFilename(inspection.getOriginalFilename());
        response.setPredictionId(inspection.getPredictionId());
        response.setTotalDetections(inspection.getTotalDetections());
        response.setDetections(inspection.getDetections());
        response.setProcessingTimeSeconds(inspection.getProcessingTimeSeconds());
        response.setStatus(inspection.getStatus());
        response.setCreatedAt(inspection.getCreatedAt().toString());

        return response;

    }

}
