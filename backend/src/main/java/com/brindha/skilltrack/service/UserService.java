package com.brindha.skilltrack.service;

import com.brindha.skilltrack.dto.request.ChangePasswordRequest;
import com.brindha.skilltrack.dto.request.UpdateProfileRequest;
import com.brindha.skilltrack.dto.response.ProfileResponse;
import com.brindha.skilltrack.entity.User;
import com.brindha.skilltrack.exception.BadRequestException;
import com.brindha.skilltrack.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public ProfileResponse getProfile() {

        User user = getCurrentUser();

        return new ProfileResponse(

                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                user.isEnabled(),
                user.getCreatedAt()

        );
    }

    public ProfileResponse updateProfile(UpdateProfileRequest request) {

        User user = getCurrentUser();

        user.setFullName(request.fullName());

        userRepository.save(user);

        return getProfile();
    }

    public String changePassword(ChangePasswordRequest request) {

        User user = getCurrentUser();

        boolean matches = passwordEncoder.matches(
                request.currentPassword(),
                user.getPassword()
        );

        System.out.println("==================================");
        System.out.println("Email          : " + user.getEmail());
        System.out.println("Entered        : " + request.currentPassword());
        System.out.println("Password Match : " + matches);
        System.out.println("Stored Hash    : " + user.getPassword());
        System.out.println("==================================");

        if (!matches) {
            throw new BadRequestException("Current password is incorrect");
        }

        if (request.currentPassword().equals(request.newPassword())) {

            throw new IllegalArgumentException(
                    "New password must be different from current password"
            );
        }

        user.setPassword(
                passwordEncoder.encode(request.newPassword())
        );

        userRepository.save(user);

        return "Password changed successfully";
    }
}