package com.dvara.caseservice;

import com.dvara.caseservice.client.HearingServiceClient;
import com.dvara.caseservice.entity.AuditLogEntity;
import com.dvara.caseservice.entity.CaseEntity;
import com.dvara.caseservice.entity.DeficiencyEntity;
import com.dvara.caseservice.repository.AuditLogRepository;
import com.dvara.caseservice.repository.CaseRepository;
import com.dvara.caseservice.repository.DeficiencyRepository;
import com.dvara.caseservice.repository.UserRepository;
import com.dvara.caseservice.service.CaseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CaseServiceTest {

    @Mock
    private CaseRepository caseRepository;

    @Mock
    private DeficiencyRepository deficiencyRepository;

    @Mock
    private AuditLogRepository auditLogRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private HearingServiceClient hearingServiceClient;

    private CaseService caseService;

    @BeforeEach
    void setUp() {
        caseService = new CaseService(
                caseRepository,
                deficiencyRepository,
                auditLogRepository,
                userRepository,
                hearingServiceClient
        );
    }

    @Test
    @DisplayName("Should raise deficiency, mark case as DEFICIENT, and log audit event")
    void testRaiseDeficiency_SetsCaseStatusToDeficientAndLogsAudit() {
        // Arrange
        String caseId = "case-101";
        CaseEntity mockCase = new CaseEntity();
        mockCase.setId(caseId);
        mockCase.setFilingStatus("UNDER_SCRUTINY");

        DeficiencyEntity def = new DeficiencyEntity();
        def.setReason("Missing certified copy of bank dishonour slip");
        def.setRaisedBy("Officer Priya Nair");

        when(caseRepository.findById(caseId)).thenReturn(Optional.of(mockCase));
        when(deficiencyRepository.save(any(DeficiencyEntity.class))).thenAnswer(i -> i.getArgument(0));

        // Act
        DeficiencyEntity result = caseService.raiseDeficiency(caseId, def);

        // Assert
        assertNotNull(result);
        assertEquals("OPEN", result.getStatus());
        assertEquals("DEFICIENT", mockCase.getFilingStatus());
        verify(caseRepository, times(1)).save(mockCase);
        verify(auditLogRepository, times(1)).save(any(AuditLogEntity.class));
    }

    @Test
    @DisplayName("Should resolve deficiency and return case to UNDER_SCRUTINY when all open deficiencies cleared")
    void testResolveDeficiency_AllResolved_SetsStatusUnderScrutiny() {
        // Arrange
        String defId = "def-001";
        String caseId = "case-101";

        DeficiencyEntity def = new DeficiencyEntity();
        def.setId(defId);
        def.setCaseId(caseId);
        def.setStatus("OPEN");

        CaseEntity mockCase = new CaseEntity();
        mockCase.setId(caseId);
        mockCase.setFilingStatus("DEFICIENT");

        when(deficiencyRepository.findById(defId)).thenReturn(Optional.of(def));
        when(deficiencyRepository.save(any(DeficiencyEntity.class))).thenAnswer(i -> i.getArgument(0));
        when(deficiencyRepository.findByCaseIdAndStatus(caseId, "OPEN")).thenReturn(Collections.emptyList());
        when(caseRepository.findById(caseId)).thenReturn(Optional.of(mockCase));

        // Act
        Optional<DeficiencyEntity> resolved = caseService.resolveDeficiency(defId, "Certified copy uploaded.");

        // Assert
        assertTrue(resolved.isPresent());
        assertEquals("RESOLVED", resolved.get().getStatus());
        assertEquals("UNDER_SCRUTINY", mockCase.getFilingStatus());
        verify(caseRepository, times(1)).save(mockCase);
    }

    @Test
    @DisplayName("Should approve registration, generate case number, and trigger inter-service scheduling")
    void testApproveRegistration_AssignsCaseNumberAndInvokesInterService() {
        // Arrange
        String caseId = "case-202";
        CaseEntity mockCase = new CaseEntity();
        mockCase.setId(caseId);
        mockCase.setCategory("Civil");
        mockCase.setTitle("Sharma vs Mehta");
        mockCase.setFilingStatus("UNDER_SCRUTINY");

        when(caseRepository.findById(caseId)).thenReturn(Optional.of(mockCase));
        when(caseRepository.save(any(CaseEntity.class))).thenAnswer(i -> i.getArgument(0));

        // Act
        Optional<CaseEntity> registered = caseService.approveRegistration(caseId, "Hon'ble Justice Sikri", "Court Hall 2");

        // Assert
        assertTrue(registered.isPresent());
        assertEquals("REGISTERED", registered.get().getFilingStatus());
        assertNotNull(registered.get().getCaseNumber());
        assertTrue(registered.get().getCaseNumber().startsWith("CIV/"));
        assertEquals("Hon'ble Justice Sikri", registered.get().getJudge());

        // Verify inter-service client invocation
        verify(hearingServiceClient, times(1)).scheduleInitialAdmissionHearing(eq(caseId), any(), any(), any(), eq("Hon'ble Justice Sikri"));
        verify(hearingServiceClient, times(1)).createStatutoryPleadingsDeadline(eq(caseId), any(), any());
    }
}
