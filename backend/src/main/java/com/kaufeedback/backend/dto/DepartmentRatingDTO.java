package com.kaufeedback.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DepartmentRatingDTO {

    private String departmentName;

    private Double averageRating;
}