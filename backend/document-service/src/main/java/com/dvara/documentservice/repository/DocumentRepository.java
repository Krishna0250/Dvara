package com.dvara.documentservice.repository;

import com.dvara.documentservice.entity.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<DocumentEntity, String> {
    List<DocumentEntity> findByCaseId(String caseId);
    List<DocumentEntity> findByType(String type);
}
