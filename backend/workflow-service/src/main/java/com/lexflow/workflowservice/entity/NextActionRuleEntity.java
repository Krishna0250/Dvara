package com.lexflow.workflowservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "next_action_rules")
public class NextActionRuleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String currentStage;

    @Column(nullable = false)
    private String recommendedAction;

    private Integer statutoryDeadlineDays;
    private String statutoryReference;
    private String requiredRole;

    public NextActionRuleEntity() {}

    public NextActionRuleEntity(String currentStage, String recommendedAction, Integer statutoryDeadlineDays, String statutoryReference, String requiredRole) {
        this.currentStage = currentStage;
        this.recommendedAction = recommendedAction;
        this.statutoryDeadlineDays = statutoryDeadlineDays;
        this.statutoryReference = statutoryReference;
        this.requiredRole = requiredRole;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCurrentStage() { return currentStage; }
    public void setCurrentStage(String currentStage) { this.currentStage = currentStage; }

    public String getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; }

    public Integer getStatutoryDeadlineDays() { return statutoryDeadlineDays; }
    public void setStatutoryDeadlineDays(Integer statutoryDeadlineDays) { this.statutoryDeadlineDays = statutoryDeadlineDays; }

    public String getStatutoryReference() { return statutoryReference; }
    public void setStatutoryReference(String statutoryReference) { this.statutoryReference = statutoryReference; }

    public String getRequiredRole() { return requiredRole; }
    public void setRequiredRole(String requiredRole) { this.requiredRole = requiredRole; }
}
