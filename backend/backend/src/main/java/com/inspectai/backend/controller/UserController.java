package com.inspectai.backend.controller;


import com.inspectai.backend.dto.ApiResponse;
import com.inspectai.backend.dto.LoginRequest;
import com.inspectai.backend.dto.LoginResponse;
import com.inspectai.backend.dto.RegisterRequest;
import com.inspectai.backend.service.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {


    @Autowired
    private UserService userService;



    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(
            @Valid
            @RequestBody RegisterRequest request
    ){

        ApiResponse response = userService.register(request);


        return ResponseEntity
                .status(201)
                .body(response);

    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid
            @RequestBody LoginRequest request
    ) {

        LoginResponse response = userService.login(request);

        return ResponseEntity.ok(response);

    }

}
