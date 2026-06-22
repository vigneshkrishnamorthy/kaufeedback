package com.kaufeedback.backend.repository;

import com.kaufeedback.backend.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
