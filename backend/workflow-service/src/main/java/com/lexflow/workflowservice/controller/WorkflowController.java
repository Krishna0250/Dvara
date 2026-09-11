package com.lexflow.workflowservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/workflows")
@CrossOrigin(origins = "*")
public class WorkflowController {

    @GetMapping("/templates/{caseType}")
    public ResponseEntity<Map<String, Object>> getTemplateByCaseType(@PathVariable String caseType) {
        Map<String, Object> template = new HashMap<>();
        template.put("caseType", caseType);
        template.put("name", caseType + " Procedural Workflow Template");

        List<Map<String, Object>> stages = new ArrayList<>();
        Map<String, Object> stg1 = new HashMap<>();
        stg1.put("id", "s1");
        stg1.put("title", "Initiation / Filing");
        stg1.put("status", "completed");
        stages.add(stg1);

        Map<String, Object> stg2 = new HashMap<>();
        stg2.put("id", "s2");
        stg2.put("title", "Evidence & Hearing");
        stg2.put("status", "current");
        stages.add(stg2);

        template.put("stages", stages);
        return ResponseEntity.ok(template);
    }

    @GetMapping("/next-action/{caseId}")
    public ResponseEntity<Map<String, Object>> getNextAction(@PathVariable String caseId) {
        Map<String, Object> nextAction = new HashMap<>();
        nextAction.put("caseId", caseId);
        nextAction.put("currentStage", "Evidence Stage");
        nextAction.put("suggestedAction", "Schedule witness cross-examination and prepare affidavit in chief.");
        nextAction.put("conditions", Arrays.asList("Charges framed: YES", "PW examination: PENDING"));
        nextAction.put("disclaimer", "Procedural guidance recommendation based on BNSS / CrPC framework.");
        return ResponseEntity.ok(nextAction);
    }
}
