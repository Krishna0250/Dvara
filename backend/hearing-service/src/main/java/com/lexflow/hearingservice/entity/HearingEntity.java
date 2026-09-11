package com.lexflow.hearingservice.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "hearings")
public class HearingEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String caseId;

    @Column(nullable = false)
    private String caseNumber;

    @Column(nullable = false)
    private String caseTitle;

    private LocalDate date;
    private String time;
    private String court;
    private String judge;
    private String purpose;
    private String status;
    private String proceedings;
    private String adjournmentReason;

    public HearingEntity() {}

    public HearingEntity(String id, String caseId, String caseNumber, String caseTitle, LocalDate date, String time, String court, String judge, String purpose, String status) {
        this.id = id;
        this.caseId = caseId;
        this.caseNumber = caseNumber;
        this.caseTitle = caseTitle;
        this.date = date;
        this.time = time;
        this.court = court;
        this.judge = judge;
        this.purpose = purpose;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }

    public String getCaseNumber() { return caseNumber; }
    public void setCaseNumber(String caseNumber) { this.caseNumber = caseNumber; }

    public String getCaseTitle() { return caseTitle; }
    public void setCaseTitle(String caseTitle) { this.caseTitle = caseTitle; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getCourt() { return court; }
    public void setCourt(String court) { this.court = court; }

    public String getJudge() { return judge; }
    public void setJudge(String judge) { this.judge = judge; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getProceedings() { return proceedings; }
    public void setProceedings(String proceedings) { this.proceedings = proceedings; }

    public String getAdjournmentReason() { return adjournmentReason; }
    public void setAdjournmentReason(String adjournmentReason) { this.adjournmentReason = adjournmentReason; }
}
