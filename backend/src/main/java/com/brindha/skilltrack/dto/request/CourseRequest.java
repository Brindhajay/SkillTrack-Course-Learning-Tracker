package com.brindha.skilltrack.dto.request;

import com.brindha.skilltrack.enums.CourseStatus;
import com.brindha.skilltrack.enums.Priority;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record CourseRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 100)
        String title,

        @NotBlank(message = "Instructor is required")
        @Size(max = 100)
        String instructor,

        @NotBlank(message = "Platform is required")
        @Size(max = 60)
        String platform,

        @NotBlank(message = "Category is required")
        @Size(max = 60)
        String category,

        @NotBlank(message = "Description is required")
        @Size(max = 1000)
        String description,

        @NotBlank(message = "Difficulty is required")
        String difficulty,

        @NotNull(message = "Duration is required")
        @Min(1)
        Integer durationHours,

        @DecimalMin("0.0")
        @DecimalMax("5.0")
        Double rating,

        String imageUrl,

        Boolean enrolled,

        Boolean favorite,

        @NotNull(message = "Status is required")
        CourseStatus status,

        @NotNull(message = "Progress is required")
        @Min(0)
        @Max(100)
        Integer progressPercentage,

        @NotNull(message = "Priority is required")
        Priority priority,

        LocalDate startDate,

        LocalDate targetCompletionDate,

        LocalDate lastAccessedDate,

        LocalDate completionDate,

        String certificateUrl,

        @Size(max = 500)
        String notes

) {
}