package com.kaufeedback.backend.repository;

import com.kaufeedback.backend.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}