package com.inspectai.backend.service;

import com.inspectai.backend.dto.ApiResponse;
import com.inspectai.backend.dto.LoginRequest;
import com.inspectai.backend.dto.LoginResponse;
import com.inspectai.backend.dto.RegisterRequest;
import com.inspectai.backend.entity.User;
import com.inspectai.backend.exception.EmailAlreadyExistsException;
import com.inspectai.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;


    // =========================
    // REGISTER
    // =========================

    public ApiResponse register(RegisterRequest request) {

        Optional<User> existingUser =
                userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {

            throw new EmailAlreadyExistsException(
                    "Email Already Exists"
            );
        }

        User user = new User();

        user.setName(request.getName());

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        userRepository.save(user);

        return new ApiResponse(
                "User Registered Successfully"
        );
    }


    // =========================
    // LOGIN
    // =========================

    public LoginResponse login(LoginRequest request) {

        Optional<User> existingUser =
                userRepository.findByEmail(request.getEmail());


        if (existingUser.isEmpty()) {

            throw new BadCredentialsException(
                    "Invalid Email or Password"
            );
        }


        User user = existingUser.get();


        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );


        if (!passwordMatches) {

            throw new BadCredentialsException(
                    "Invalid Email or Password"
            );
        }


        String token =
                jwtService.generateToken(
                        user.getEmail()
                );


        return new LoginResponse(
                "Login Successful",
                token
        );
    }
}


