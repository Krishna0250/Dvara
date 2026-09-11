package com.lexflow.workflowservice;

import com.lexflow.workflowservice.entity.NextActionRuleEntity;
import com.lexflow.workflowservice.repository.NextActionRuleRepository;
import com.lexflow.workflowservice.repository.WorkflowRepository;
import com.lexflow.workflowservice.service.WorkflowService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class WorkflowServiceTest {

    @Mock
    private WorkflowRepository workflowRepository;

    @Mock
    private NextActionRuleRepository nextActionRuleRepository;

    private WorkflowService workflowService;

    @BeforeEach
    void setUp() {
        workflowService = new WorkflowService(workflowRepository, nextActionRuleRepository);
    }

    @Test
    @DisplayName("Should flag high-priority document re-upload when case filing status is DEFICIENT")
    void testComputeNextAction_DeficientStatus_ReturnsUrgentDocumentReupload() {
        Map<String, Object> result = workflowService.computeNextAction("case-ni-014", "Scrutiny", "DEFICIENT");

        assertNotNull(result);
        assertEquals("HIGH", result.get("priority"));
        assertEquals("ADVOCATE", result.get("requiredRole"));
        assertTrue(result.get("suggestedAction").toString().contains("Open Scrutiny Deficiencies Found"));
    }

    @Test
    @DisplayName("Should assign 30-day statutory written statement deadline when in Pleadings stage")
    void testComputeNextAction_PleadingsStage_ReturnsWrittenStatementRequirement() {
        NextActionRuleEntity rule = new NextActionRuleEntity(
                "Pleadings & Written Statement",
                "File Written Statement under CPC Order VIII Rule 1",
                30,
                "CPC Order VIII Rule 1",
                "ADVOCATE"
        );
        when(nextActionRuleRepository.findFirstByCurrentStage("Pleadings & Written Statement"))
                .thenReturn(Optional.of(rule));

        Map<String, Object> result = workflowService.computeNextAction("case-cr-001", "Pleadings & Written Statement", "REGISTERED");

        assertNotNull(result);
        assertEquals(30, result.get("statutoryDeadlineDays"));
        assertEquals("CPC Order VIII Rule 1", result.get("statutoryReference"));
        assertEquals("ADVOCATE", result.get("requiredRole"));
    }
}
