package com.lexflow.caseservice.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cases")
public class CaseEntity {

    @Id
    private String id;

    @Column(unique = true)
    private String caseNumber;

    private String filingId;
    private String filingStatus; // DRAFT, SUBMITTED, UNDER_SCRUTINY, DEFICIENT, REGISTERED, DISPOSED
    private String assignedJudgeId;
    private String assignedCourtroom;

    @Column(nullable = false)
    private String title;

    private String category;
    private String caseType;
    private String court;
    private String judge;
    private String currentStage;
    private String priority;
    private String status;
    private String assignedLawyer;
    private LocalDate filingDate;
    private LocalDate registrationDate;

    @OneToMany(mappedBy = "caseEntity", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<PartyEntity> parties = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.filingDate == null) {
            this.filingDate = LocalDate.now();
        }
        if (this.status == null) {
            this.status = "Active";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public CaseEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFilingId() { return filingId; }
    public void setFilingId(String filingId) { this.filingId = filingId; }

    public String getFilingStatus() { return filingStatus; }
    public void setFilingStatus(String filingStatus) { this.filingStatus = filingStatus; }

    public String getAssignedJudgeId() { return assignedJudgeId; }
    public void setAssignedJudgeId(String assignedJudgeId) { this.assignedJudgeId = assignedJudgeId; }

    public String getAssignedCourtroom() { return assignedCourtroom; }
    public void setAssignedCourtroom(String assignedCourtroom) { this.assignedCourtroom = assignedCourtroom; }

    public String getCaseNumber() { return caseNumber; }
    public void setCaseNumber(String caseNumber) { this.caseNumber = caseNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCaseType() { return caseType; }
    public void setCaseType(String caseType) { this.caseType = caseType; }

    public String getCourt() { return court; }
    public void setCourt(String court) { this.court = court; }

    public String getJudge() { return judge; }
    public void setJudge(String judge) { this.judge = judge; }

    public String getCurrentStage() { return currentStage; }
    public void setCurrentStage(String currentStage) { this.currentStage = currentStage; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAssignedLawyer() { return assignedLawyer; }
    public void setAssignedLawyer(String assignedLawyer) { this.assignedLawyer = assignedLawyer; }

    public LocalDate getFilingDate() { return filingDate; }
    public void setFilingDate(LocalDate filingDate) { this.filingDate = filingDate; }

    public LocalDate getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(LocalDate registrationDate) { this.registrationDate = registrationDate; }

    public List<PartyEntity> getParties() { return parties; }
    public void setParties(List<PartyEntity> parties) { this.parties = parties; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void addParty(PartyEntity party) {
        parties.add(party);
        party.setCaseEntity(this);
    }
}
