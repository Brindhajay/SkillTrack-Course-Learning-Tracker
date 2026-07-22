package com.brindha.skilltrack.controller;

import com.brindha.skilltrack.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PatchMapping;
import com.brindha.skilltrack.dto.request.CourseRequest;
import com.brindha.skilltrack.dto.response.CourseResponse;
import com.brindha.skilltrack.enums.CourseStatus;
import com.brindha.skilltrack.enums.Priority;
import org.springframework.data.domain.Page;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(
        name = "Course Management",
        description = "Course APIs"
)
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @Operation(summary = "Get all courses")
    @GetMapping
    public Page<CourseResponse> getCourses(

            @RequestParam(required = false) String search,

            @RequestParam(required = false) CourseStatus status,

            @RequestParam(required = false) Priority priority,

            @RequestParam(defaultValue = "updatedAt") String sortBy,

            @RequestParam(defaultValue = "desc") String direction,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size

    ) {

        return courseService.getCourses(
                search,
                status,
                priority,
                sortBy,
                direction,
                page,
                size
        );
    }

    @GetMapping("/{id}")
    public CourseResponse getCourse(@PathVariable Long id) {
        return courseService.getCourse(id);
    }

    @GetMapping("/enrolled")
    public List<CourseResponse> getEnrolledCourses() {
        return courseService.getEnrolledCourses();
    }

    @GetMapping("/favorites")
    public List<CourseResponse> getFavoriteCourses() {
        return courseService.getFavoriteCourses();
    }

    @GetMapping("/completed")
    public List<CourseResponse> getCompletedCourses() {
        return courseService.getCompletedCourses();
    }

    @GetMapping("/recommended")
    public List<CourseResponse> getRecommendedCourses() {
        return courseService.getRecommendedCourses();
    }

    @GetMapping("/recent")
    public List<CourseResponse> getRecentCourses() {
        return courseService.getRecentCourses();
    }

    @GetMapping("/platform/{platform}")
    public List<CourseResponse> getByPlatform(@PathVariable String platform) {
        return courseService.getCoursesByPlatform(platform);
    }

    @GetMapping("/difficulty/{difficulty}")
    public List<CourseResponse> getByDifficulty(@PathVariable String difficulty) {
        return courseService.getCoursesByDifficulty(difficulty);
    }

    @GetMapping("/rating/{rating}")
    public List<CourseResponse> getTopRated(@PathVariable Double rating) {
        return courseService.getTopRatedCourses(rating);
    }

    @GetMapping("/duration")
    public List<CourseResponse> getByDuration(
            @RequestParam Integer min,
            @RequestParam Integer max
    ) {
        return courseService.getCoursesByDuration(min, max);
    }

    @Operation(summary = "Create course")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CourseResponse createCourse(@Valid @RequestBody CourseRequest request) {
        return courseService.createCourse(request);
    }

    @Operation(summary = "Enroll into course")
    @PostMapping("/{id}/enroll")
    public CourseResponse enrollCourse(@PathVariable Long id) {
        return courseService.enrollCourse(id);
    }

    @Operation(summary = "Update learning progress")
    @PutMapping("/{id}")
    public CourseResponse updateCourse(@PathVariable Long id, @Valid @RequestBody CourseRequest request) {
        return courseService.updateCourse(id, request);
    }

    @Operation(summary = "Favorite or unfavorite course")
    @PatchMapping("/{id}/favorite")
    public CourseResponse favoriteCourse(@PathVariable Long id) {
        return courseService.favoriteCourse(id);
    }

    @PatchMapping("/{id}/progress")
    public CourseResponse updateProgress(
            @PathVariable Long id,
            @RequestParam Integer progress
    ) {
        return courseService.updateProgress(id, progress);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }
}
