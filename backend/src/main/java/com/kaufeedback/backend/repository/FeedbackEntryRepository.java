package com.kaufeedback.backend.repository;

import com.kaufeedback.backend.dto.DepartmentRatingDTO;
import com.kaufeedback.backend.entity.FeedbackEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface FeedbackEntryRepository extends JpaRepository<FeedbackEntry, Long> {

    Long countByCreatedAtAfter(LocalDateTime date);

    List<FeedbackEntry> findTop10ByOrderByCreatedAtDesc();

    @Query("""
        SELECT f.rating, COUNT(f)
        FROM FeedbackEntry f
        GROUP BY f.rating
    """)
    List<Object[]> getRatingStats();

    @Query("""
        SELECT new com.kaufeedback.backend.dto.DepartmentRatingDTO(
            d.name,
            AVG(f.rating)
        )
        FROM FeedbackEntry f
        JOIN f.department d
        GROUP BY d.name
        ORDER BY AVG(f.rating) DESC
    """)
    List<DepartmentRatingDTO> getDepartmentWiseRatings();
}