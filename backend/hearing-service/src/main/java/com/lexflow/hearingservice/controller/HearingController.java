package com.lexflow.hearingservice.controller;

import com.lexflow.hearingservice.entity.DeadlineEntity;
import com.lexflow.hearingservice.entity.HearingEntity;
import com.lexflow.hearingservice.entity.OrderEntity;
import com.lexflow.hearingservice.service.HearingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class HearingController {

    private final HearingService hearingService;

    @Autowired
    public HearingController(HearingService hearingService) {
        this.hearingService = hearingService;
        this.hearingService.seedInitialData();
    }

    @GetMapping("/hearings")
    public ResponseEntity<List<HearingEntity>> getHearings() {
        return ResponseEntity.ok(hearingService.getAllHearings());
    }

    @PostMapping("/hearings")
    public ResponseEntity<HearingEntity> scheduleHearing(@RequestBody HearingEntity hearing) {
        HearingEntity created = hearingService.scheduleHearing(hearing);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/deadlines")
    public ResponseEntity<List<DeadlineEntity>> getDeadlines() {
        return ResponseEntity.ok(hearingService.getAllDeadlines());
    }

    @PostMapping("/deadlines")
    public ResponseEntity<DeadlineEntity> createDeadline(@RequestBody DeadlineEntity deadline) {
        DeadlineEntity created = hearingService.createDeadline(deadline);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Orders API Endpoints
    @GetMapping("/orders")
    public ResponseEntity<List<OrderEntity>> getOrders(
            @RequestParam(required = false) String caseId) {
        if (caseId != null && !caseId.isBlank()) {
            return ResponseEntity.ok(hearingService.getOrdersByCaseId(caseId));
        }
        return ResponseEntity.ok(hearingService.getAllOrders());
    }

    @PostMapping("/orders")
    public ResponseEntity<OrderEntity> createOrder(@RequestBody OrderEntity order) {
        OrderEntity created = hearingService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
