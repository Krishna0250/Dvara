package com.lexflow.hearingservice.repository;

import com.lexflow.hearingservice.entity.DeadlineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeadlineRepository extends JpaRepository<DeadlineEntity, String> {
    List<DeadlineEntity> findByCaseId(String caseId);
    List<DeadlineEntity> findByStatus(String status);
}
