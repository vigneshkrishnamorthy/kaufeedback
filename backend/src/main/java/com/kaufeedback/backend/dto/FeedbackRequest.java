package com.kaufeedback.backend.dto;

import lombok.Data;

@Data
public class FeedbackRequest {

    private String patientName;

    private Integer age;

    private String visitType;

    private Long departmentId;

    private Long serviceId;

    private Long locationId;

    private Integer rating;

    private String comments;
}