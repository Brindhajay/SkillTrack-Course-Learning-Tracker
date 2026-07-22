package com.brindha.skilltrack.service;

import com.brindha.skilltrack.dto.response.CourseProgressResponse;
import com.brindha.skilltrack.dto.response.DashboardResponse;
import com.brindha.skilltrack.entity.Course;
import com.brindha.skilltrack.entity.User;
import com.brindha.skilltrack.enums.CourseStatus;
import com.brindha.skilltrack.repository.CourseRepository;
import org.springframework.stereotype.Service;
import com.brindha.skilltrack.entity.User;
import com.brindha.skilltrack.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;

@Service
public class DashboardService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    public DashboardService(CourseRepository courseRepository,
                            UserRepository userRepository) {

        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    public DashboardResponse getDashboard() {

        User currentUser = getCurrentUser();

        List<Course> courses = courseRepository.findByUser(currentUser);

        long totalCourses = courses.size();

        long enrolledCourses = courses.stream()
                .filter(course -> Boolean.TRUE.equals(course.getEnrolled()))
                .count();

        long completedCourses = courses.stream()
                .filter(course -> course.getStatus() == CourseStatus.COMPLETED)
                .count();

        long plannedCourses = courses.stream()
                .filter(course -> course.getStatus() == CourseStatus.PLANNED)
                .count();

        long inProgressCourses = courses.stream()
                .filter(course -> course.getStatus() == CourseStatus.IN_PROGRESS)
                .count();

        long favoriteCourses = courses.stream()
                .filter(course -> Boolean.TRUE.equals(course.getFavorite()))
                .count();

        long beginnerCourses = courses.stream()
                .filter(course -> "Beginner".equalsIgnoreCase(course.getDifficulty()))
                .count();

        long intermediateCourses = courses.stream()
                .filter(course -> "Intermediate".equalsIgnoreCase(course.getDifficulty()))
                .count();

        long advancedCourses = courses.stream()
                .filter(course -> "Advanced".equalsIgnoreCase(course.getDifficulty()))
                .count();

        double averageProgress = courses.stream()
                .mapToInt(Course::getProgressPercentage)
                .average()
                .orElse(0);

        List<CourseProgressResponse> courseProgress =
                courses.stream()
                        .map(course -> new CourseProgressResponse(
                                course.getId(),
                                course.getTitle(),
                                course.getProgressPercentage()
                        ))
                        .toList();

        return new DashboardResponse(
                totalCourses,
                enrolledCourses,
                completedCourses,
                plannedCourses,
                inProgressCourses,
                favoriteCourses,
                beginnerCourses,
                intermediateCourses,
                advancedCourses,
                Math.round(averageProgress * 100.0) / 100.0,
                courseProgress
        );
    }
}