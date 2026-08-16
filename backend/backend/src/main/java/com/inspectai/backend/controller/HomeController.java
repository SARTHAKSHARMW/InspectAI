package com.inspectai.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {

        return "Welcome to InspectAI Backend";

    }

    @GetMapping("/health")
    public String health() {

        return "Backend is Healthy";

    }

}


