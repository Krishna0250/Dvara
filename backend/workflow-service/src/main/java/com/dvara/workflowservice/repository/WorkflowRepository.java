package com.dvara.workflowservice.repository;

import com.dvara.workflowservice.entity.WorkflowStageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkflowRepository extends JpaRepository<WorkflowStageEntity, Long> {
    List<WorkflowStageEntity> findByCaseTypeOrderBySequenceOrderAsc(String caseType);
}
