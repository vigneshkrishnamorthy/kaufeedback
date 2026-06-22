package com.kaufeedback.backend.controller;

import com.kaufeedback.backend.dto.DashboardResponse;
import com.kaufeedback.backend.dto.FeedbackRequest;
import com.kaufeedback.backend.dto.MastersResponse;
import com.kaufeedback.backend.dto.RatingStatsDTO;
import com.kaufeedback.backend.entity.FeedbackEntry;
import com.kaufeedback.backend.repository.FeedbackEntryRepository;
import com.kaufeedback.backend.service.FeedbackService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final FeedbackEntryRepository feedbackEntryRepository;

    @PostMapping("/feedback")
    public ResponseEntity<String> save(
            @RequestBody FeedbackRequest request) {

        feedbackService.save(request);

        return ResponseEntity.ok("Saved");
    }

    @GetMapping("/masters")
    public MastersResponse getMasters() {

        return feedbackService.getMasters();
    }

    @GetMapping("/dashboard")
    public DashboardResponse dashboard() {

        return feedbackService.getDashboard();
    }

    @GetMapping("/admin/entries")
    public List<FeedbackEntry> entries() {

        return feedbackEntryRepository.findAll();
    }

    @GetMapping("/admin/export")
    public void exportCsv(
            HttpServletResponse response)
            throws IOException {

        response.setContentType("text/csv");

        response.setHeader(
                "Content-Disposition",
                "attachment; filename=feedback.csv");

        PrintWriter writer =
                response.getWriter();

        writer.println(
                "Name,Age,Rating,Comments");

        feedbackEntryRepository.findAll()
                .forEach(entry -> {

                    writer.println(
                            entry.getPatientName()
                                    + ","
                                    + entry.getAge()
                                    + ","
                                    + entry.getRating()
                                    + ","
                                    + entry.getComments());
                });

        writer.flush();
    }

    @GetMapping("/admin/rating-stats")
    public List<RatingStatsDTO> ratingStats() {

        return feedbackEntryRepository
                .getRatingStats()
                .stream()
                .map(obj -> new RatingStatsDTO(
                        (Integer) obj[0],
                        ((Number) obj[1]).longValue()
                ))
                .toList();
    }
}