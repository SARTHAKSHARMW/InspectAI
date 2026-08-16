package com.inspectai.backend.controller;

import com.inspectai.backend.dto.InspectionResponse;
import com.inspectai.backend.service.InspectionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/inspections")
public class InspectionController {

    @Autowired
    private InspectionService inspectionService;


    // =========================
    // CREATE INSPECTION
    // =========================

    @PostMapping
    public ResponseEntity<InspectionResponse> createInspection(
            @RequestParam("image") MultipartFile image
    ) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        InspectionResponse response =
                inspectionService.createInspection(email, image);

        return ResponseEntity
                .status(201)
                .body(response);

    }


    // =========================
    // GET USER INSPECTIONS
    // =========================

    @GetMapping
    public ResponseEntity<List<InspectionResponse>> getUserInspections() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        List<InspectionResponse> inspections =
                inspectionService.getUserInspections(email);

        return ResponseEntity.ok(inspections);

    }


    // =========================
    // GET SINGLE INSPECTION
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<InspectionResponse> getInspection(
            @PathVariable Long id
    ) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        InspectionResponse response =
                inspectionService.getInspection(email, id);

        return ResponseEntity.ok(response);

    }

}
