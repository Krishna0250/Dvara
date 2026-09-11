package com.lexflow.workflowservice.repository;

import com.lexflow.workflowservice.entity.NextActionRuleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NextActionRuleRepository extends JpaRepository<NextActionRuleEntity, Long> {
    Optional<NextActionRuleEntity> findFirstByCurrentStage(String currentStage);
}
