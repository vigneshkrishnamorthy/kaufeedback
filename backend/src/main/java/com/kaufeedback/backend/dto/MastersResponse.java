package com.kaufeedback.backend.dto;

import com.kaufeedback.backend.entity.Department;
import com.kaufeedback.backend.entity.HospitalService;
import com.kaufeedback.backend.entity.Location;
import lombok.Data;

import java.util.List;

@Data
public class MastersResponse {

    private List<Department> departments;
    private List<HospitalService> services;
    private List<Location> locations;
}