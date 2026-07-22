package com.brindha.skilltrack.dto.response;

import java.util.List;

public record DashboardResponse(

        long totalCourses,

        long enrolledCourses,

        long completedCourses,

        long plannedCourses,

        long inProgressCourses,

        long favoriteCourses,

        long beginnerCourses,

        long intermediateCourses,

        long advancedCourses,

        double averageProgress,

        List<CourseProgressResponse> courseProgress

) {
}