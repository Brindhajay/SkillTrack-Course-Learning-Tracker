package com.brindha.skilltrack.controller;

import com.brindha.skilltrack.dto.request.ChangePasswordRequest;
import com.brindha.skilltrack.dto.request.UpdateProfileRequest;
import com.brindha.skilltrack.dto.response.ProfileResponse;
import com.brindha.skilltrack.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> getProfile() {

        return ResponseEntity.ok(
                userService.getProfile()
        );

    }

    @PutMapping("/profile")
    public ResponseEntity<ProfileResponse> updateProfile(

            @Valid
            @RequestBody
            UpdateProfileRequest request

    ) {

        return ResponseEntity.ok(
                userService.updateProfile(request)
        );

    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(

            @Valid
            @RequestBody
            ChangePasswordRequest request

    ) {

        return ResponseEntity.ok(
                userService.changePassword(request)
        );

    }

}