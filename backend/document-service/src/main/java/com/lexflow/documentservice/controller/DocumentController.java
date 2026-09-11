package com.lexflow.documentservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/documents")
@CrossOrigin(origins = "*")
public class DocumentController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getDocuments() {
        List<Map<String, Object>> docs = new ArrayList<>();

        Map<String, Object> d1 = new HashMap<>();
        d1.put("id", "doc-fir-01");
        d1.put("name", "FIR Copy (No. 204/2026)");
        d1.put("type", "FIR");
        d1.put("caseId", "CR-2026-001");
        d1.put("uploadedDate", "2026-08-08");
        d1.put("uploadedBy", "Police Station Clerk");
        d1.put("status", "Uploaded");
        docs.add(d1);

        Map<String, Object> d2 = new HashMap<>();
        d2.put("id", "doc-not-138");
        d2.put("name", "Statutory Legal Demand Notice");
        d2.put("type", "Notice");
        d2.put("caseId", "NI-2026-014");
        d2.put("uploadedDate", "2026-08-20");
        d2.put("uploadedBy", "Adv. Sunita Rao");
        d2.put("status", "Uploaded");
        docs.add(d2);

        return ResponseEntity.ok(docs);
    }
}
