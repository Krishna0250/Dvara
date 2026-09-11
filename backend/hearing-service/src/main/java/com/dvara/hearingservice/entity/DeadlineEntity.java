package com.dvara.hearingservice.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "deadlines")
public class DeadlineEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String caseId;

    @Column(nullable = false)
    private String caseNumber;

    @Column(nullable = false)
    private String caseTitle;

    private LocalDate dueDate;
    private String type;
    private String status;
    private String suggestedAction;
    private String assignedUser;

    public DeadlineEntity() {}

    public DeadlineEntity(String id, String caseId, String caseNumber, String caseTitle, LocalDate dueDate, String type, String status, String suggestedAction) {
        this.id = id;
        this.caseId = caseId;
        this.caseNumber = caseNumber;
        this.caseTitle = caseTitle;
        this.dueDate = dueDate;
        this.type = type;
        this.status = status;
        this.suggestedAction = suggestedAction;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }

    public String getCaseNumber() { return caseNumber; }
    public void setCaseNumber(String caseNumber) { this.caseNumber = caseNumber; }

    public String getCaseTitle() { return caseTitle; }
    public void setCaseTitle(String caseTitle) { this.caseTitle = caseTitle; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSuggestedAction() { return suggestedAction; }
    public void setSuggestedAction(String suggestedAction) { this.suggestedAction = suggestedAction; }

    public String getAssignedUser() { return assignedUser; }
    public void setAssignedUser(String assignedUser) { this.assignedUser = assignedUser; }
}
