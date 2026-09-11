package com.lexflow.workflowservice.controller;

import com.lexflow.workflowservice.entity.WorkflowStageEntity;
import com.lexflow.workflowservice.service.WorkflowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/workflows")
@CrossOrigin(origins = "*")
public class WorkflowController {

    private final WorkflowService workflowService;

    @Autowired
    public WorkflowController(WorkflowService workflowService) {
        this.workflowService = workflowService;
        this.workflowService.seedInitialData();
    }

    @GetMapping("/templates/{caseType}")
    public ResponseEntity<Map<String, Object>> getTemplateByCaseType(@PathVariable String caseType) {
        List<WorkflowStageEntity> stages = workflowService.getStagesByCaseType(caseType);

        Map<String, Object> template = new HashMap<>();
        template.put("caseType", caseType);
        template.put("name", caseType + " Procedural Workflow Template");
        template.put("stages", stages);

        return ResponseEntity.ok(template);
    }

    @GetMapping("/next-action/{caseId}")
    public ResponseEntity<Map<String, Object>> getNextAction(
            @PathVariable String caseId,
            @RequestParam(required = false, defaultValue = "Evidence & Hearing") String currentStage,
            @RequestParam(required = false) String filingStatus) {
        Map<String, Object> nextAction = workflowService.computeNextAction(caseId, currentStage, filingStatus);
        return ResponseEntity.ok(nextAction);
    }
}
