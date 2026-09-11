package com.dvara.caseservice.controller;

import com.dvara.caseservice.entity.*;
import com.dvara.caseservice.service.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import com.dvara.caseservice.security.JwtUtils;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class CaseController {

    private final CaseService caseService;
    private final JwtUtils jwtUtils;

    @Autowired
    public CaseController(CaseService caseService, JwtUtils jwtUtils) {
        this.caseService = caseService;
        this.jwtUtils = jwtUtils;
        this.caseService.seedInitialData();
    }

    @GetMapping("/cases")
    public ResponseEntity<List<CaseEntity>> getAllCases() {
        List<CaseEntity> cases = caseService.getAllCases();
        return ResponseEntity.ok(cases);
    }

    @GetMapping("/cases/{id}")
    public ResponseEntity<CaseEntity> getCaseById(@PathVariable String id) {
        return caseService.getCaseById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/cases")
    public ResponseEntity<CaseEntity> createCase(@RequestBody CaseEntity newCase) {
        CaseEntity created = caseService.createCase(newCase);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/cases/{id}/stage")
    public ResponseEntity<CaseEntity> updateStage(
            @PathVariable String id,
            @RequestBody StageUpdateRequest request) {
        return caseService.updateCaseStage(id, request.getNewStage())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Deficiency Endpoints
    @GetMapping("/cases/{id}/deficiencies")
    public ResponseEntity<List<DeficiencyEntity>> getDeficiencies(@PathVariable String id) {
        return ResponseEntity.ok(caseService.getDeficienciesByCaseId(id));
    }

    @PostMapping("/cases/{id}/deficiencies")
    public ResponseEntity<DeficiencyEntity> raiseDeficiency(
            @PathVariable String id,
            @RequestBody DeficiencyEntity deficiency) {
        DeficiencyEntity created = caseService.raiseDeficiency(id, deficiency);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/deficiencies/{deficiencyId}/resolve")
    public ResponseEntity<DeficiencyEntity> resolveDeficiency(
            @PathVariable String deficiencyId,
            @RequestBody Map<String, String> request) {
        String remark = request.getOrDefault("remark", "Deficiency addressed by applicant.");
        return caseService.resolveDeficiency(deficiencyId, remark)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Registration Endpoint
    @PostMapping("/cases/{id}/register")
    public ResponseEntity<CaseEntity> approveRegistration(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        String assignedJudge = request.get("judge");
        String assignedCourtroom = request.get("courtroom");
        return caseService.approveRegistration(id, assignedJudge, assignedCourtroom)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Audit Trail Endpoint
    @GetMapping("/cases/{id}/audit")
    public ResponseEntity<List<AuditLogEntity>> getAuditLogs(@PathVariable String id) {
        return ResponseEntity.ok(caseService.getAuditLogsByCaseId(id));
    }

    // Auth Login Endpoint (Generates Real HMAC-SHA256 Signed JWT)
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        return caseService.loginUser(email, password)
                .map(user -> {
                    String token = jwtUtils.generateToken(user.getId(), user.getEmail(), user.getRole());
                    Map<String, Object> resp = new HashMap<>();
                    resp.put("token", token);
                    resp.put("user", user);
                    return ResponseEntity.ok(resp);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials")));
    }

    // Direct Token Issuer for Demo Role Switcher
    @GetMapping("/auth/token")
    public ResponseEntity<?> getTokenForRole(@RequestParam(defaultValue = "JUDGE") String role) {
        String token = jwtUtils.generateToken("demo-" + role.toLowerCase(), role.toLowerCase() + "@dvara.gov", role);
        return ResponseEntity.ok(Map.of("token", token, "role", role));
    }

    public static class StageUpdateRequest {
        private String newStage;
        public String getNewStage() { return newStage; }
        public void setNewStage(String newStage) { this.newStage = newStage; }
    }
}
