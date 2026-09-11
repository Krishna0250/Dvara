package com.lexflow.workflowservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "workflow_stages")
public class WorkflowStageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String caseType;

    @Column(nullable = false)
    private String stageName;

    private Integer sequenceOrder;
    private String description;
    private Integer defaultDurationDays;

    public WorkflowStageEntity() {}

    public WorkflowStageEntity(String caseType, String stageName, Integer sequenceOrder, String description, Integer defaultDurationDays) {
        this.caseType = caseType;
        this.stageName = stageName;
        this.sequenceOrder = sequenceOrder;
        this.description = description;
        this.defaultDurationDays = defaultDurationDays;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCaseType() { return caseType; }
    public void setCaseType(String caseType) { this.caseType = caseType; }

    public String getStageName() { return stageName; }
    public void setStageName(String stageName) { this.stageName = stageName; }

    public Integer getSequenceOrder() { return sequenceOrder; }
    public void setSequenceOrder(Integer sequenceOrder) { this.sequenceOrder = sequenceOrder; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getDefaultDurationDays() { return defaultDurationDays; }
    public void setDefaultDurationDays(Integer defaultDurationDays) { this.defaultDurationDays = defaultDurationDays; }
}
