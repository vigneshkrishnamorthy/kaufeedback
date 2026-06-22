package com.kaufeedback.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "feedback_entries")
public class FeedbackEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;

    private Integer age;

    private String visitType;

    private Integer rating;

    @Column(length = 1000)
    private String comments;

    private LocalDateTime createdAt;

    @ManyToOne
    private Department department;

    @ManyToOne
    private HospitalService service;

    @ManyToOne
    private Location location;
}