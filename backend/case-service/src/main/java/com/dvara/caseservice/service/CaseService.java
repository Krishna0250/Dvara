package com.dvara.caseservice.service;

import com.dvara.caseservice.entity.*;
import com.dvara.caseservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class CaseService {

    private final CaseRepository caseRepository;
    private final DeficiencyRepository deficiencyRepository;
    private final AuditLogRepository auditLogRepository;
    private final UserRepository userRepository;
    private final com.dvara.caseservice.client.HearingServiceClient hearingServiceClient;

    @Autowired
    public CaseService(
            CaseRepository caseRepository,
            DeficiencyRepository deficiencyRepository,
            AuditLogRepository auditLogRepository,
            UserRepository userRepository,
            com.dvara.caseservice.client.HearingServiceClient hearingServiceClient) {
        this.caseRepository = caseRepository;
        this.deficiencyRepository = deficiencyRepository;
        this.auditLogRepository = auditLogRepository;
        this.userRepository = userRepository;
        this.hearingServiceClient = hearingServiceClient;
    }

    public List<CaseEntity> getAllCases() {
        return caseRepository.findAll();
    }

    public Optional<CaseEntity> getCaseById(String id) {
        return caseRepository.findById(id);
    }

    public CaseEntity createCase(CaseEntity newCase) {
        if (newCase.getId() == null || newCase.getId().isBlank()) {
            newCase.setId("case-" + System.currentTimeMillis());
        }
        if (newCase.getFilingId() == null || newCase.getFilingId().isBlank()) {
            newCase.setFilingId("FL-2026-" + (1000 + (int)(Math.random() * 9000)));
        }
        if (newCase.getFilingStatus() == null || newCase.getFilingStatus().isBlank()) {
            newCase.setFilingStatus("SUBMITTED");
        }
        if (newCase.getParties() != null) {
            for (PartyEntity party : newCase.getParties()) {
                party.setCaseEntity(newCase);
            }
        }
        CaseEntity saved = caseRepository.save(newCase);
        logAudit(saved.getId(), "System", "FILING", "Case Filing Submitted", null, saved.getFilingStatus(), "Filing ID generated: " + saved.getFilingId());
        return saved;
    }

    public Optional<CaseEntity> updateCaseStage(String id, String newStage) {
        return caseRepository.findById(id).map(existing -> {
            String oldStage = existing.getCurrentStage();
            existing.setCurrentStage(newStage);
            CaseEntity saved = caseRepository.save(existing);
            logAudit(id, "Court Registrar", "REGISTRAR", "Stage Transition", oldStage, newStage, "Updated procedural workflow stage to " + newStage);
            return saved;
        });
    }

    // Scrutiny & Deficiency Methods
    public DeficiencyEntity raiseDeficiency(String caseId, DeficiencyEntity deficiency) {
        if (deficiency.getId() == null || deficiency.getId().isBlank()) {
            deficiency.setId("def-" + System.currentTimeMillis());
        }
        deficiency.setCaseId(caseId);
        deficiency.setStatus("OPEN");
        DeficiencyEntity saved = deficiencyRepository.save(deficiency);

        // Update case status to DEFICIENT
        caseRepository.findById(caseId).ifPresent(c -> {
            String oldStatus = c.getFilingStatus();
            c.setFilingStatus("DEFICIENT");
            caseRepository.save(c);
            logAudit(caseId, deficiency.getRaisedBy() != null ? deficiency.getRaisedBy() : "Scrutiny Officer", "SCRUTINY_OFFICER", "DEFICIENCY_RAISED", oldStatus, "DEFICIENT", deficiency.getReason());
        });

        return saved;
    }

    public Optional<DeficiencyEntity> resolveDeficiency(String deficiencyId, String remark) {
        return deficiencyRepository.findById(deficiencyId).map(def -> {
            def.setStatus("RESOLVED");
            def.setRemark(remark);
            def.setResolvedAt(LocalDateTime.now());
            DeficiencyEntity saved = deficiencyRepository.save(def);

            // Check if all deficiencies for case are resolved
            List<DeficiencyEntity> openDeficiencies = deficiencyRepository.findByCaseIdAndStatus(def.getCaseId(), "OPEN");
            if (openDeficiencies.isEmpty()) {
                caseRepository.findById(def.getCaseId()).ifPresent(c -> {
                    c.setFilingStatus("UNDER_SCRUTINY");
                    caseRepository.save(c);
                    logAudit(c.getId(), "Citizen / Advocate", "ADVOCATE", "DEFICIENCY_RESOLVED", "DEFICIENT", "UNDER_SCRUTINY", "Resubmitted documents for scrutiny review.");
                });
            }
            return saved;
        });
    }

    public List<DeficiencyEntity> getDeficienciesByCaseId(String caseId) {
        return deficiencyRepository.findByCaseId(caseId);
    }

    // Registration Approval
    public Optional<CaseEntity> approveRegistration(String caseId, String assignedJudge, String assignedCourtroom) {
        return caseRepository.findById(caseId).map(c -> {
            String oldStatus = c.getFilingStatus();
            c.setFilingStatus("REGISTERED");
            if (c.getCaseNumber() == null || c.getCaseNumber().isBlank()) {
                String prefix = c.getCategory() != null && c.getCategory().startsWith("Crim") ? "CR" : "CIV";
                c.setCaseNumber(prefix + "/" + LocalDate.now().getYear() + "/" + (1000 + (int)(Math.random() * 9000)));
            }
            c.setRegistrationDate(LocalDate.now());
            if (assignedJudge != null) c.setJudge(assignedJudge);
            if (assignedCourtroom != null) c.setAssignedCourtroom(assignedCourtroom);
            c.setCurrentStage("Pleadings & Written Statement");
            CaseEntity saved = caseRepository.save(c);

            logAudit(caseId, "Registrar Deshmukh", "REGISTRAR", "CASE_REGISTERED", oldStatus, "REGISTERED", "Filing approved and Case Number " + saved.getCaseNumber() + " assigned.");

            // Inter-Service Communication: Notify hearing-service to schedule admission hearing & statutory deadline
            hearingServiceClient.scheduleInitialAdmissionHearing(saved.getId(), saved.getCaseNumber(), saved.getTitle(), saved.getCourt(), saved.getJudge());
            hearingServiceClient.createStatutoryPleadingsDeadline(saved.getId(), saved.getCaseNumber(), saved.getTitle());

            return saved;
        });
    }

    // Audit Trail
    public List<AuditLogEntity> getAuditLogsByCaseId(String caseId) {
        return auditLogRepository.findByCaseIdOrderByTimestampDesc(caseId);
    }

    public void logAudit(String caseId, String actor, String role, String action, String prev, String next, String details) {
        AuditLogEntity log = new AuditLogEntity("log-" + System.currentTimeMillis() + "-" + (int)(Math.random() * 1000), caseId, actor, role, action, prev, next, details);
        auditLogRepository.save(log);
    }

    // Auth & User Seeding
    public Optional<UserEntity> loginUser(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password));
    }

    public void seedInitialData() {
        // Seed Demo Users
        if (userRepository.count() == 0) {
            userRepository.save(new UserEntity("u-1", "judge@dvara.gov", "password", "Hon'ble Justice A. K. Sikri", "JUDGE"));
            userRepository.save(new UserEntity("u-2", "registrar@dvara.gov", "password", "Registrar V. K. Deshmukh", "REGISTRAR"));
            userRepository.save(new UserEntity("u-3", "scrutiny@dvara.gov", "password", "Officer Priya Nair", "SCRUTINY_OFFICER"));
            userRepository.save(new UserEntity("u-4", "advocate@dvara.org", "password", "Adv. Rajesh Verma", "ADVOCATE"));
            userRepository.save(new UserEntity("u-5", "citizen@dvara.org", "password", "Rohan Kumar (Litigant)", "CITIZEN"));
        }

        if (caseRepository.count() == 0) {
            CaseEntity c1 = new CaseEntity();
            c1.setId("case-cr-001");
            c1.setFilingId("FL-2026-001");
            c1.setFilingStatus("REGISTERED");
            c1.setCaseNumber("CR-2026-001");
            c1.setTitle("State vs Rahul Sharma");
            c1.setCategory("Criminal");
            c1.setCaseType("Murder / BNSS Sec 103");
            c1.setCourt("Sessions Court, Division I");
            c1.setJudge("Hon'ble Justice A. K. Sikri");
            c1.setAssignedCourtroom("Court Hall 3");
            c1.setCurrentStage("Evidence & Hearing");
            c1.setPriority("High");
            c1.setStatus("Active");
            c1.setAssignedLawyer("Adv. Rajesh Verma");
            c1.setFilingDate(LocalDate.of(2026, 1, 15));
            c1.setRegistrationDate(LocalDate.of(2026, 1, 20));
            c1.addParty(new PartyEntity("State of Maharashtra", "Prosecution", "sp.mumbai@gov.in", "Public Prosecutor Sharma"));
            c1.addParty(new PartyEntity("Rahul Sharma", "Accused / Defendant", "+91 98200 11223", "Adv. Rajesh Verma"));
            caseRepository.save(c1);

            logAudit("case-cr-001", "Citizen / Advocate", "ADVOCATE", "CASE_FILED", null, "SUBMITTED", "Initial electronic petition filed.");
            logAudit("case-cr-001", "Officer Priya Nair", "SCRUTINY_OFFICER", "SCRUTINY_APPROVED", "SUBMITTED", "UNDER_SCRUTINY", "All mandatory statutory documents verified.");
            logAudit("case-cr-001", "Registrar Deshmukh", "REGISTRAR", "CASE_REGISTERED", "UNDER_SCRUTINY", "REGISTERED", "Allocated Case Number CR-2026-001.");

            CaseEntity c2 = new CaseEntity();
            c2.setId("case-ni-014");
            c2.setFilingId("FL-2026-014");
            c2.setFilingStatus("DEFICIENT");
            c2.setCaseNumber("NI-2026-014");
            c2.setTitle("Apex Traders vs Rohan Kumar");
            c2.setCategory("Special / Statutory");
            c2.setCaseType("Cheque Dishonour (Sec 138 NI Act)");
            c2.setCourt("Metropolitan Magistrate Court Room 2");
            c2.setJudge("Magistrate V. K. Deshmukh");
            c2.setCurrentStage("Scrutiny & Preliminary Audit");
            c2.setPriority("High");
            c2.setStatus("Active");
            c2.setAssignedLawyer("Adv. Sunita Rao");
            c2.setFilingDate(LocalDate.of(2026, 2, 10));
            c2.addParty(new PartyEntity("Apex Traders Pvt Ltd", "Complainant", "contact@apextraders.com", "Adv. Sunita Rao"));
            c2.addParty(new PartyEntity("Rohan Kumar", "Accused / Drawer", "+91 98111 22334", "Adv. Anil Mehta"));
            caseRepository.save(c2);

            logAudit("case-ni-014", "Adv. Sunita Rao", "ADVOCATE", "CASE_FILED", null, "SUBMITTED", "Filing submitted under Section 138 NI Act.");
            logAudit("case-ni-014", "Officer Priya Nair", "SCRUTINY_OFFICER", "DEFICIENCY_RAISED", "SUBMITTED", "DEFICIENT", "Bank memo missing seal; address proof unreadable.");

            DeficiencyEntity def = new DeficiencyEntity();
            def.setId("def-001");
            def.setCaseId("case-ni-014");
            def.setDocumentTitle("Dishonoured Bank Memo");
            def.setRaisedBy("Officer Priya Nair");
            def.setReason("Bank memo seal is unreadable. Upload a certified clear copy from the bank branch.");
            def.setStatus("OPEN");
            deficiencyRepository.save(def);
        }
    }
}
