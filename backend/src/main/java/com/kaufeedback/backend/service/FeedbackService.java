package com.kaufeedback.backend.service;

import com.kaufeedback.backend.dto.DashboardResponse;
import com.kaufeedback.backend.dto.FeedbackRequest;
import com.kaufeedback.backend.dto.MastersResponse;
import com.kaufeedback.backend.entity.Department;
import com.kaufeedback.backend.entity.FeedbackEntry;
import com.kaufeedback.backend.entity.HospitalService;
import com.kaufeedback.backend.entity.Location;
import com.kaufeedback.backend.repository.DepartmentRepository;
import com.kaufeedback.backend.repository.FeedbackEntryRepository;
import com.kaufeedback.backend.repository.HospitalServiceRepository;
import com.kaufeedback.backend.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.kaufeedback.backend.dto.DepartmentRatingDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final DepartmentRepository departmentRepository;
    private final HospitalServiceRepository hospitalServiceRepository;
    private final LocationRepository locationRepository;
    private final FeedbackEntryRepository feedbackEntryRepository;

    public void save(FeedbackRequest request) {

        Department department =
                departmentRepository
                        .findById(request.getDepartmentId())
                        .orElse(null);

        HospitalService service =
                hospitalServiceRepository
                        .findById(request.getServiceId())
                        .orElse(null);

        Location location =
                locationRepository
                        .findById(request.getLocationId())
                        .orElse(null);

        FeedbackEntry entry = new FeedbackEntry();

        entry.setPatientName(request.getPatientName());
        entry.setAge(request.getAge());
        entry.setVisitType(request.getVisitType());
        entry.setRating(request.getRating());
        entry.setComments(request.getComments());
        entry.setCreatedAt(LocalDateTime.now());

        entry.setDepartment(department);
        entry.setService(service);
        entry.setLocation(location);

        feedbackEntryRepository.save(entry);
    }

    public MastersResponse getMasters() {

        MastersResponse response =
                new MastersResponse();

        response.setDepartments(
                departmentRepository.findAll());

        response.setServices(
                hospitalServiceRepository.findAll());

        response.setLocations(
                locationRepository.findAll());

        return response;
    }

    public DashboardResponse getDashboard() {

    DashboardResponse response =
            new DashboardResponse();

    response.setTotalFeedbackToday(
            feedbackEntryRepository.countByCreatedAtAfter(
                    LocalDate.now().atStartOfDay()));

    double avg =
            feedbackEntryRepository.findAll()
                    .stream()
                    .mapToInt(FeedbackEntry::getRating)
                    .average()
                    .orElse(0);

    response.setAverageRating(avg);

    response.setLatestFeedback(
            feedbackEntryRepository
                    .findTop10ByOrderByCreatedAtDesc());

    response.setDepartmentRatings(
            feedbackEntryRepository
                    .getDepartmentWiseRatings());

    return response;
}
}