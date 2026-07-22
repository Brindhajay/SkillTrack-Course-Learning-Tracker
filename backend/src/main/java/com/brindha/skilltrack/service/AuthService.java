package com.brindha.skilltrack.service;

import com.brindha.skilltrack.dto.request.LoginRequest;
import com.brindha.skilltrack.dto.request.RegisterRequest;
import com.brindha.skilltrack.dto.response.AuthResponse;
import com.brindha.skilltrack.entity.User;
import com.brindha.skilltrack.enums.Role;
import com.brindha.skilltrack.exception.BadRequestException;
import com.brindha.skilltrack.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {

        System.out.println("========== REGISTER REQUEST ==========");
        System.out.println("Full Name : " + request.fullName());
        System.out.println("Email     : " + request.email());

        boolean exists = userRepository.existsByEmail(request.email());
        System.out.println("Email Exists : " + exists);

        if (exists) {
            throw new BadRequestException("Email already exists");
        }

        User user = new User();

        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        System.out.println("Saved User ID : " + savedUser.getId());
        System.out.println("======================================");

        String token = jwtService.generateToken(savedUser.getEmail());

        return new AuthResponse(
                token,
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getRole().name()
        );
    }

    public AuthResponse login(LoginRequest request){

        System.out.println("===== LOGIN START =====");
        System.out.println("Email: " + request.email());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        System.out.println("===== AUTH SUCCESS =====");

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow();

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getFullName(),
                user.getRole().name()
        );
    }
}