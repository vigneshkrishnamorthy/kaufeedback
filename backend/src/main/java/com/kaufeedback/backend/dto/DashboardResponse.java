package com.kaufeedback.backend.dto;

import com.kaufeedback.backend.entity.FeedbackEntry;
import lombok.Data;

import java.util.List;

@Data
public class DashboardResponse {

    private Long totalFeedbackToday;

    private Double averageRating;

    private List<FeedbackEntry> latestFeedback;

    private List<DepartmentRatingDTO> departmentRatings;
}