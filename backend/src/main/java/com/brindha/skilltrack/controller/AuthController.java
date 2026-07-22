package com.brindha.skilltrack.controller;

import com.brindha.skilltrack.dto.request.LoginRequest;
import com.brindha.skilltrack.dto.request.RegisterRequest;
import com.brindha.skilltrack.dto.response.AuthResponse;
import com.brindha.skilltrack.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(
            @Valid
            @RequestBody RegisterRequest request){

        return authService.register(request);

    }

    @PostMapping("/login")
    public AuthResponse login(
            @Valid
            @RequestBody LoginRequest request){

        return authService.login(request);

    }

}