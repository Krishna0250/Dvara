package com.lexflow.caseservice.repository;

import com.lexflow.caseservice.entity.DeficiencyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeficiencyRepository extends JpaRepository<DeficiencyEntity, String> {
    List<DeficiencyEntity> findByCaseId(String caseId);
    List<DeficiencyEntity> findByCaseIdAndStatus(String caseId, String status);
}
