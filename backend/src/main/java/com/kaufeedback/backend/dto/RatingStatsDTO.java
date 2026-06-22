package com.kaufeedback.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RatingStatsDTO {

    private Integer rating;
    private Long count;
}