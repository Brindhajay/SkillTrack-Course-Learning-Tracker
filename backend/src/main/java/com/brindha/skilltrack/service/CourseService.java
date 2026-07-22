package com.brindha.skilltrack.service;

import com.brindha.skilltrack.dto.request.CourseRequest;
import com.brindha.skilltrack.dto.response.CourseResponse;
import com.brindha.skilltrack.entity.Course;
import com.brindha.skilltrack.enums.CourseStatus;
import com.brindha.skilltrack.enums.Priority;
import com.brindha.skilltrack.exception.BadRequestException;
import com.brindha.skilltrack.exception.ResourceNotFoundException;
import com.brindha.skilltrack.repository.CourseRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.brindha.skilltrack.entity.User;
import com.brindha.skilltrack.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;

@Service
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CourseService(CourseRepository courseRepository,
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

    @Transactional(readOnly = true)
    public Page<CourseResponse> getCourses(
            String search,
            CourseStatus status,
            Priority priority,
            String sortBy,
            String direction,
            int page,
            int size
    ) {

        User currentUser = getCurrentUser();

        Specification<Course> specification = Specification.where(hasUser(currentUser))
                .and(titleOrInstructorContains(search))
                .and(hasStatus(status))
                .and(hasPriority(priority));

        Sort sort = Sort.by(
                "desc".equalsIgnoreCase(direction)
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC,
                sortBy
        );

        Pageable pageable = PageRequest.of(page, size, sort);

        return courseRepository
                .findAll(specification, pageable)
                .map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public CourseResponse getCourse(Long id) {
        return toResponse(findCourseById(id));
    }

    public CourseResponse createCourse(CourseRequest request) {

        validateBusinessRules(request);

        Course course = new Course();

        course.setUser(getCurrentUser());

        copyRequestToCourse(request, course);

        return toResponse(courseRepository.save(course));
    }

    public CourseResponse updateCourse(Long id, CourseRequest request) {
        validateBusinessRules(request);
        Course course = findCourseById(id);
        copyRequestToCourse(request, course);
        return toResponse(courseRepository.save(course));
    }

    public void deleteCourse(Long id) {
        courseRepository.delete(findCourseById(id));
    }

    private Course findCourseById(Long id) {

        User currentUser = getCurrentUser();

        return courseRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Course not found"));
    }

    private void validateBusinessRules(CourseRequest request) {
        if (request.startDate() != null && request.targetCompletionDate() != null
                && request.targetCompletionDate().isBefore(request.startDate())) {
            throw new BadRequestException("Target completion date cannot be before the start date");
        }

        if (request.status() == CourseStatus.COMPLETED && request.progressPercentage() != 100) {
            throw new BadRequestException("A completed course must have 100% progress");
        }
    }

    private void copyRequestToCourse(CourseRequest request, Course course) {

        course.setTitle(request.title().trim());
        course.setInstructor(request.instructor().trim());
        course.setPlatform(request.platform().trim());
        course.setCategory(request.category().trim());

        course.setDescription(request.description().trim());
        course.setDifficulty(request.difficulty());
        course.setDurationHours(request.durationHours());
        course.setRating(request.rating());
        course.setImageUrl(request.imageUrl());

        course.setEnrolled(Boolean.TRUE.equals(request.enrolled()));
        course.setFavorite(Boolean.TRUE.equals(request.favorite()));

        course.setStatus(request.status());
        course.setProgressPercentage(request.progressPercentage());
        course.setPriority(request.priority());

        course.setStartDate(request.startDate());
        course.setTargetCompletionDate(request.targetCompletionDate());

        course.setLastAccessedDate(request.lastAccessedDate());
        course.setCompletionDate(request.completionDate());
        course.setCertificateUrl(request.certificateUrl());

        course.setNotes(request.notes() == null ? null : request.notes().trim());
    }

    private CourseResponse toResponse(Course course) {

        return new CourseResponse(

                course.getId(),

                course.getTitle(),

                course.getInstructor(),

                course.getPlatform(),

                course.getCategory(),

                course.getDescription(),

                course.getDifficulty(),

                course.getDurationHours(),

                course.getRating(),

                course.getImageUrl(),

                course.getEnrolled(),

                course.getFavorite(),

                course.getStatus(),

                course.getProgressPercentage(),

                course.getPriority(),

                course.getStartDate(),

                course.getTargetCompletionDate(),

                course.getLastAccessedDate(),

                course.getCompletionDate(),

                course.getCertificateUrl(),

                course.getNotes(),

                course.getCreatedAt(),

                course.getUpdatedAt()
        );
    }

    private Specification<Course> titleOrInstructorContains(String search) {
        return (root, query, criteriaBuilder) -> {
            if (search == null || search.isBlank()) {
                return criteriaBuilder.conjunction();
            }
            String pattern = "%" + search.trim().toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), pattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("instructor")), pattern)
            );
        };
    }

    private Specification<Course> hasStatus(CourseStatus status) {
        return (root, query, criteriaBuilder) -> status == null
                ? criteriaBuilder.conjunction()
                : criteriaBuilder.equal(root.get("status"), status);
    }

    private Specification<Course> hasPriority(Priority priority) {
        return (root, query, criteriaBuilder) -> priority == null
                ? criteriaBuilder.conjunction()
                : criteriaBuilder.equal(root.get("priority"), priority);
    }

    private Specification<Course> hasUser(User user) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("user"), user);

    }

    public CourseResponse enrollCourse(Long id) {

        Course course = findCourseById(id);

        course.setEnrolled(true);

        if (course.getStatus() == CourseStatus.PLANNED) {
            course.setStatus(CourseStatus.IN_PROGRESS);
        }

        return toResponse(courseRepository.save(course));
    }

    public CourseResponse favoriteCourse(Long id) {

        Course course = findCourseById(id);

        course.setFavorite(!course.getFavorite());

        return toResponse(courseRepository.save(course));
    }

    public CourseResponse updateProgress(Long id, Integer progress) {

        Course course = findCourseById(id);

        course.setProgressPercentage(progress);

        course.setLastAccessedDate(java.time.LocalDate.now());

        if (progress >= 100) {

            course.setProgressPercentage(100);

            course.setStatus(CourseStatus.COMPLETED);

            course.setCompletionDate(java.time.LocalDate.now());
        } else if (progress > 0) {

            course.setStatus(CourseStatus.IN_PROGRESS);
        }

        return toResponse(courseRepository.save(course));
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getEnrolledCourses() {

        User currentUser = getCurrentUser();

        return courseRepository.findByUserAndEnrolledTrue(currentUser)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getFavoriteCourses() {

        User currentUser = getCurrentUser();

        return courseRepository.findByUserAndFavoriteTrue(currentUser)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getCompletedCourses() {

        User currentUser = getCurrentUser();

        return courseRepository
                .findByUserAndStatusOrderByUpdatedAtDesc(
                        currentUser,
                        CourseStatus.COMPLETED
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getRecommendedCourses() {

        User currentUser = getCurrentUser();

        return courseRepository
                .findTop5ByUserOrderByRatingDesc(currentUser)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getRecentCourses() {

        User currentUser = getCurrentUser();

        return courseRepository
                .findTop5ByUserOrderByCreatedAtDesc(currentUser)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getCoursesByPlatform(String platform) {

        User currentUser = getCurrentUser();

        return courseRepository
                .findByUserAndPlatformIgnoreCase(currentUser, platform)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getCoursesByDifficulty(String difficulty) {

        User currentUser = getCurrentUser();

        return courseRepository
                .findByUserAndDifficultyIgnoreCase(currentUser, difficulty)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getTopRatedCourses(Double rating) {

        User currentUser = getCurrentUser();

        return courseRepository
                .findByUserAndRatingGreaterThanEqual(currentUser, rating)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getCoursesByDuration(Integer min, Integer max) {

        User currentUser = getCurrentUser();

        return courseRepository
                .findByUserAndDurationHoursBetween(currentUser, min, max)
                .stream()
                .map(this::toResponse)
                .toList();
    }
}
