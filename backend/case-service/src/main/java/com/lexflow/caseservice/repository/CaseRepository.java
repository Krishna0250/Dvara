package com.lexflow.caseservice.repository;

import com.lexflow.caseservice.entity.CaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CaseRepository extends JpaRepository<CaseEntity, String> {
    List<CaseEntity> findByCategory(String category);
    List<CaseEntity> findByStatus(String status);
    Optional<CaseEntity> findByCaseNumber(String caseNumber);
}
