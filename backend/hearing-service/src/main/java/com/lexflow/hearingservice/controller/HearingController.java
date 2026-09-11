package com.lexflow.hearingservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class HearingController {

    @GetMapping("/hearings")
    public ResponseEntity<List<Map<String, Object>>> getHearings() {
        List<Map<String, Object>> list = new ArrayList<>();
        
        Map<String, Object> h1 = new HashMap<>();
        h1.put("id", "h1");
        h1.put("caseNumber", "CR-2026-001");
        h1.put("caseTitle", "State vs Rahul Sharma");
        h1.put("date", "2026-09-15");
        h1.put("time", "10:30 AM");
        h1.put("court", "Courtroom 4, Sessions Court");
        h1.put("purpose", "Prosecution Witness Examination (PW-1 & PW-2)");
        h1.put("status", "Scheduled");
        list.add(h1);

        Map<String, Object> h2 = new HashMap<>();
        h2.put("id", "h2");
        h2.put("caseNumber", "NI-2026-014");
        h2.put("caseTitle", "Apex Traders vs Rohan Kumar");
        h2.put("date", "2026-09-18");
        h2.put("time", "11:15 AM");
        h2.put("court", "MM Court Room 2");
        h2.put("purpose", "Complaint Admission & Verification Oath");
        h2.put("status", "Scheduled");
        list.add(h2);

        return ResponseEntity.ok(list);
    }

    @GetMapping("/deadlines")
    public ResponseEntity<List<Map<String, Object>>> getDeadlines() {
        List<Map<String, Object>> list = new ArrayList<>();
        
        Map<String, Object> d1 = new HashMap<>();
        d1.put("id", "d1");
        d1.put("caseNumber", "NI-2026-014");
        d1.put("caseTitle", "Apex Traders vs Rohan Kumar");
        d1.put("dueDate", "2026-09-08");
        d1.put("daysRemaining", 0);
        d1.put("type", "Payment Period");
        d1.put("status", "Overdue");
        d1.put("suggestedAction", "Statutory 15-day notice payment period expired. Immediately draft and file formal criminal complaint under Sec 138 NI Act.");
        list.add(d1);

        Map<String, Object> d2 = new HashMap<>();
        d2.put("id", "d2");
        d2.put("caseNumber", "CR-2026-001");
        d2.put("caseTitle", "State vs Rahul Sharma");
        d2.put("dueDate", "2026-09-12");
        d2.put("daysRemaining", 4);
        d2.put("type", "Document Submission");
        d2.put("status", "Due Soon");
        d2.put("suggestedAction", "Submit list of defense witnesses and expert medical opinion affidavit before prosecution examination.");
        list.add(d2);

        return ResponseEntity.ok(list);
    }
}
