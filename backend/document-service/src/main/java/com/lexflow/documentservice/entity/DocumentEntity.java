package com.lexflow.documentservice.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
public class DocumentEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String caseId;

    private String uploadedBy;
    private LocalDate uploadedDate;
    private String status;
    private String hash; // SHA-256 integrity hash
    private String storagePath;
    private String aiSummary;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.uploadedDate == null) {
            this.uploadedDate = LocalDate.now();
        }
        if (this.status == null) {
            this.status = "Uploaded";
        }
    }

    public DocumentEntity() {}

    public DocumentEntity(String id, String name, String type, String caseId, String uploadedBy, LocalDate uploadedDate, String status, String hash) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.caseId = caseId;
        this.uploadedBy = uploadedBy;
        this.uploadedDate = uploadedDate;
        this.status = status;
        this.hash = hash;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }

    public String getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(String uploadedBy) { this.uploadedBy = uploadedBy; }

    public LocalDate getUploadedDate() { return uploadedDate; }
    public void setUploadedDate(LocalDate uploadedDate) { this.uploadedDate = uploadedDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getHash() { return hash; }
    public void setHash(String hash) { this.hash = hash; }

    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }

    public String getAiSummary() { return aiSummary; }
    public void setAiSummary(String aiSummary) { this.aiSummary = aiSummary; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
