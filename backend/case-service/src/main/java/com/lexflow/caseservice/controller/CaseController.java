package com.lexflow.caseservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/cases")
@CrossOrigin(origins = "*")
public class CaseController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllCases(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status) {
        List<Map<String, Object>> cases = new ArrayList<>();
        
        Map<String, Object> c1 = new HashMap<>();
        c1.put("id", "case-cr-001");
        c1.put("caseNumber", "CR-2026-001");
        c1.put("title", "State vs Rahul Sharma");
        c1.put("category", "Criminal");
        c1.put("caseType", "Murder");
        c1.put("currentStage", "Evidence Stage");
        c1.put("priority", "High");
        c1.put("status", "Active");
        c1.put("assignedLawyer", "Adv. Rajesh Verma");
        cases.add(c1);

        Map<String, Object> c2 = new HashMap<>();
        c2.put("id", "case-ni-014");
        c2.put("caseNumber", "NI-2026-014");
        c2.put("title", "Apex Traders vs Rohan Kumar");
        c2.put("category", "Special / Statutory");
        c2.put("caseType", "Cheque Dishonour");
        c2.put("currentStage", "Statutory Waiting Period (15 Days)");
        c2.put("priority", "High");
        c2.put("status", "Active");
        c2.put("assignedLawyer", "Adv. Sunita Rao");
        cases.add(c2);

        return ResponseEntity.ok(cases);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCaseById(@PathVariable String id) {
        Map<String, Object> c = new HashMap<>();
        c.put("id", id);
        c.put("caseNumber", "CR-2026-001");
        c.put("title", "State vs Rahul Sharma");
        c.put("category", "Criminal");
        c.put("caseType", "Murder");
        c.put("court", "Sessions Court, Division I");
        c.put("currentStage", "Evidence Stage");
        c.put("priority", "High");
        c.put("status", "Active");
        return ResponseEntity.ok(c);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createCase(@RequestBody Map<String, Object> payload) {
        payload.put("id", "case-" + System.currentTimeMillis());
        payload.put("status", "Active");
        return ResponseEntity.status(201).body(payload);
    }
}
