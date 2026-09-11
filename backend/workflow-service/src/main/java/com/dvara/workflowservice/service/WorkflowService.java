package com.dvara.workflowservice.service;

import com.dvara.workflowservice.entity.NextActionRuleEntity;
import com.dvara.workflowservice.entity.WorkflowStageEntity;
import com.dvara.workflowservice.repository.NextActionRuleRepository;
import com.dvara.workflowservice.repository.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WorkflowService {

    private final WorkflowRepository workflowRepository;
    private final NextActionRuleRepository nextActionRuleRepository;

    @Autowired
    public WorkflowService(WorkflowRepository workflowRepository, NextActionRuleRepository nextActionRuleRepository) {
        this.workflowRepository = workflowRepository;
        this.nextActionRuleRepository = nextActionRuleRepository;
    }

    public List<WorkflowStageEntity> getStagesByCaseType(String caseType) {
        List<WorkflowStageEntity> stages = workflowRepository.findByCaseTypeOrderBySequenceOrderAsc(caseType);
        if (stages.isEmpty()) {
            return workflowRepository.findByCaseTypeOrderBySequenceOrderAsc("General");
        }
        return stages;
    }

    public Map<String, Object> computeNextAction(String caseId, String currentStage, String filingStatus) {
        Map<String, Object> result = new HashMap<>();
        result.put("caseId", caseId);
        result.put("currentStage", currentStage != null ? currentStage : "Pleadings & Written Statement");
        result.put("filingStatus", filingStatus);

        if ("DEFICIENT".equalsIgnoreCase(filingStatus)) {
            result.put("suggestedAction", "🔴 Open Scrutiny Deficiencies Found: Re-upload corrected/certified document copies to clear deficiencies.");
            result.put("statutoryDeadlineDays", 7);
            result.put("statutoryReference", "High Court Filing Rules Rule 14");
            result.put("requiredRole", "ADVOCATE");
            result.put("priority", "HIGH");
            return result;
        }

        if ("UNDER_SCRUTINY".equalsIgnoreCase(filingStatus) || "SUBMITTED".equalsIgnoreCase(filingStatus)) {
            result.put("suggestedAction", "🟡 Scrutiny Officer Verification Pending: Audit document completeness & statutory fee compliance.");
            result.put("statutoryDeadlineDays", 3);
            result.put("statutoryReference", "Registry Scrutiny Standards");
            result.put("requiredRole", "SCRUTINY_OFFICER");
            result.put("priority", "MEDIUM");
            return result;
        }

        Optional<NextActionRuleEntity> ruleOpt = nextActionRuleRepository.findFirstByCurrentStage(currentStage);
        if (ruleOpt.isPresent()) {
            NextActionRuleEntity rule = ruleOpt.get();
            result.put("suggestedAction", rule.getRecommendedAction());
            result.put("statutoryDeadlineDays", rule.getStatutoryDeadlineDays());
            result.put("statutoryReference", rule.getStatutoryReference());
            result.put("requiredRole", rule.getRequiredRole());
            result.put("priority", "NORMAL");
        } else {
            result.put("suggestedAction", "Review case dossier and prepare next procedural filing.");
            result.put("statutoryDeadlineDays", 15);
            result.put("statutoryReference", "CPC Order VIII Rule 1 / General Procedure");
            result.put("requiredRole", "ADVOCATE");
            result.put("priority", "NORMAL");
        }

        return result;
    }

    public void seedInitialData() {
        if (workflowRepository.count() == 0) {
            workflowRepository.save(new WorkflowStageEntity("General", "Filing & Registration", 1, "Initial petition submission & registration number assignment", 7));
            workflowRepository.save(new WorkflowStageEntity("General", "Pleadings & Written Statement", 2, "Defendant files written response to petition", 30));
            workflowRepository.save(new WorkflowStageEntity("General", "Discovery & Inspection", 3, "Interrogatories, admission of documents & inspection", 15));
            workflowRepository.save(new WorkflowStageEntity("General", "Framing of Issues", 4, "Judicial determination of points of conflict", 14));
            workflowRepository.save(new WorkflowStageEntity("General", "Evidence & Hearing", 5, "Witness examination & cross-examination", 45));
            workflowRepository.save(new WorkflowStageEntity("General", "Arguments & Judgment", 6, "Final oral arguments & reserved verdict", 30));
        }

        if (nextActionRuleRepository.count() == 0) {
            nextActionRuleRepository.save(new NextActionRuleEntity("Pleadings & Written Statement",
                    "File Written Statement / Defense Response within 30 days of summons service.",
                    30, "CPC Order VIII Rule 1", "ADVOCATE"));

            nextActionRuleRepository.save(new NextActionRuleEntity("Evidence & Hearing",
                    "Schedule witness cross-examination and file affidavit in chief.",
                    14, "BNSS Sec 254 / Indian Evidence Act Sec 137", "ADVOCATE"));

            nextActionRuleRepository.save(new NextActionRuleEntity("Statutory Waiting Period (15 Days)",
                    "15-day demand notice expired. File formal Criminal Complaint under Sec 138 NI Act.",
                    30, "Negotiable Instruments Act Sec 138(b)", "ADVOCATE"));
        }
    }
}
