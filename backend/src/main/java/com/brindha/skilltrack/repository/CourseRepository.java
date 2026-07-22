package com.brindha.skilltrack.repository;

import com.brindha.skilltrack.entity.Course;
import com.brindha.skilltrack.entity.User;
import com.brindha.skilltrack.enums.CourseStatus;
import com.brindha.skilltrack.enums.Priority;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long>, JpaSpecificationExecutor<Course> {

    Optional<Course> findByIdAndUser(Long id, User user);

    List<Course> findByUser(User user);

    List<Course> findByUserAndStatus(User user, CourseStatus status);

    List<Course> findByUserAndPriority(User user, Priority priority);

    List<Course> findByUserAndCategoryIgnoreCase(User user, String category);

    List<Course> findByUserAndTitleContainingIgnoreCase(User user, String title);

    List<Course> findByUser(User user, Sort sort);

    List<Course> findByUserAndEnrolledTrue(User user);

    List<Course> findByUserAndFavoriteTrue(User user);

    List<Course> findTop5ByUserOrderByRatingDesc(User user);

    List<Course> findTop5ByUserOrderByCreatedAtDesc(User user);

    List<Course> findByUserAndStatusOrderByUpdatedAtDesc(User user, CourseStatus status);

    List<Course> findByUserAndPlatformIgnoreCase(User user, String platform);

    List<Course> findByUserAndDifficultyIgnoreCase(User user, String difficulty);

    List<Course> findByUserAndRatingGreaterThanEqual(User user, Double rating);

    List<Course> findByUserAndDurationHoursBetween(User user, Integer min, Integer max);

    List<Course> findByUserAndEnrolledTrueAndProgressPercentageGreaterThanAndProgressPercentageLessThan(
            User user,
            Integer min,
            Integer max
    );

    List<Course> findByUserAndEnrolledTrueOrderByLastAccessedDateDesc(User user);

    List<Course> findTop5ByUserOrderByRatingDescDurationHoursAsc(User user);

    List<Course> findByUserAndFavoriteTrueOrderByUpdatedAtDesc(User user);
}