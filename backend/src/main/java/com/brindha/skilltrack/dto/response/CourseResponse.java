package com.brindha.skilltrack.dto.response;

import com.brindha.skilltrack.enums.CourseStatus;
import com.brindha.skilltrack.enums.Priority;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record CourseResponse(

        Long id,

        String title,

        String instructor,

        String platform,

        String category,

        String description,

        String difficulty,

        Integer durationHours,

        Double rating,

        String imageUrl,

        Boolean enrolled,

        Boolean favorite,

        CourseStatus status,

        Integer progressPercentage,

        Priority priority,

        LocalDate startDate,

        LocalDate targetCompletionDate,

        LocalDate lastAccessedDate,

        LocalDate completionDate,

        String certificateUrl,

        String notes,

        LocalDateTime createdAt,

        LocalDateTime updatedAt

) {
}