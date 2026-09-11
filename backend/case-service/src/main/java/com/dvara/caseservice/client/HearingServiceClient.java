package com.dvara.caseservice.client;

import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.LocalDate;

/**
 * Inter-Service Communication Client.
 * Connects case-service with hearing-service for automated docketing upon registration.
 */
@Component
public class HearingServiceClient {

    private final HttpClient httpClient;
    private static final String HEARING_SERVICE_URL = "http://localhost:8083/api/v1";

    public HearingServiceClient() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(3))
                .build();
    }

    public void scheduleInitialAdmissionHearing(String caseId, String caseNumber, String caseTitle, String court, String judge) {
        try {
            LocalDate hearingDate = LocalDate.now().plusDays(14);
            String jsonBody = String.format(
                    "{\"caseId\":\"%s\",\"caseNumber\":\"%s\",\"caseTitle\":\"%s\",\"date\":\"%s\",\"time\":\"10:30 AM\",\"court\":\"%s\",\"purpose\":\"Preliminary Admission Hearing & Verification Oath\",\"status\":\"Scheduled\"}",
                    caseId, caseNumber, caseTitle, hearingDate, court != null ? court : "Court Hall 1"
            );

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(HEARING_SERVICE_URL + "/hearings"))
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(4))
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenAccept(res -> System.out.println("[Inter-Service] Successfully scheduled admission hearing in hearing-service: " + res.statusCode()))
                    .exceptionally(ex -> {
                        System.err.println("[Inter-Service] Hearing service unreachable (fallback to local mock): " + ex.getMessage());
                        return null;
                    });
        } catch (Exception e) {
            System.err.println("[Inter-Service] Failed to dispatch hearing request: " + e.getMessage());
        }
    }

    public void createStatutoryPleadingsDeadline(String caseId, String caseNumber, String caseTitle) {
        try {
            LocalDate dueDate = LocalDate.now().plusDays(30);
            String jsonBody = String.format(
                    "{\"caseId\":\"%s\",\"caseNumber\":\"%s\",\"caseTitle\":\"%s\",\"dueDate\":\"%s\",\"type\":\"Response Filing\",\"status\":\"Upcoming\",\"suggestedAction\":\"File Written Statement / Statement of Defense under CPC Order VIII Rule 1 within 30 days of registration.\"}",
                    caseId, caseNumber, caseTitle, dueDate
            );

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(HEARING_SERVICE_URL + "/deadlines"))
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(4))
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenAccept(res -> System.out.println("[Inter-Service] Successfully registered statutory deadline in hearing-service: " + res.statusCode()))
                    .exceptionally(ex -> {
                        System.err.println("[Inter-Service] Hearing service unreachable: " + ex.getMessage());
                        return null;
                    });
        } catch (Exception e) {
            System.err.println("[Inter-Service] Failed to dispatch deadline request: " + e.getMessage());
        }
    }
}
