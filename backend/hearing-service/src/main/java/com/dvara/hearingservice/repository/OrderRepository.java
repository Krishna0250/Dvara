package com.dvara.hearingservice.repository;

import com.dvara.hearingservice.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, String> {
    List<OrderEntity> findByCaseIdOrderByIssuedDateDesc(String caseId);
}
