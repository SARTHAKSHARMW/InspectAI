package com.inspectai.backend.repository;

import com.inspectai.backend.entity.Inspection;
import com.inspectai.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InspectionRepository extends JpaRepository<Inspection, Long> {

    List<Inspection> findByUserOrderByCreatedAtDesc(User user);

    Optional<Inspection> findByIdAndUser(Long id, User user);

}
