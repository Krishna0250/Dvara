package com.dvara.hearingservice.repository;

import com.dvara.hearingservice.entity.HearingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HearingRepository extends JpaRepository<HearingEntity, String> {
    List<HearingEntity> findByCaseId(String caseId);
    List<HearingEntity> findByStatus(String status);
}
