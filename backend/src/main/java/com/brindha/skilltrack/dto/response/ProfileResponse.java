package com.brindha.skilltrack.dto.response;

import java.time.LocalDateTime;

public record ProfileResponse(

        Long id,

        String fullName,

        String email,

        String role,

        boolean enabled,

        LocalDateTime createdAt

) {
}