package com.dvara.hearingservice.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "judicial_orders")
public class OrderEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String caseId;

    private String hearingId;
    private String orderType; // INTERIM, PROCEDURAL, FINAL, ADMINISTRATIVE
    private String title;
    private String issuedByJudge;
    private LocalDate issuedDate;

    @Column(length = 4000)
    private String content;

    private String documentUrl;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.issuedDate == null) {
            this.issuedDate = LocalDate.now();
        }
    }

    public OrderEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }

    public String getHearingId() { return hearingId; }
    public void setHearingId(String hearingId) { this.hearingId = hearingId; }

    public String getOrderType() { return orderType; }
    public void setOrderType(String orderType) { this.orderType = orderType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getIssuedByJudge() { return issuedByJudge; }
    public void setIssuedByJudge(String issuedByJudge) { this.issuedByJudge = issuedByJudge; }

    public LocalDate getIssuedDate() { return issuedDate; }
    public void setIssuedDate(LocalDate issuedDate) { this.issuedDate = issuedDate; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getDocumentUrl() { return documentUrl; }
    public void setDocumentUrl(String documentUrl) { this.documentUrl = documentUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
