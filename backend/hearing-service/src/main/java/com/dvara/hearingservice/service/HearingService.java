package com.dvara.hearingservice.service;

import com.dvara.hearingservice.entity.*;
import com.dvara.hearingservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HearingService {

    private final HearingRepository hearingRepository;
    private final DeadlineRepository deadlineRepository;
    private final OrderRepository orderRepository;

    @Autowired
    public HearingService(
            HearingRepository hearingRepository,
            DeadlineRepository deadlineRepository,
            OrderRepository orderRepository) {
        this.hearingRepository = hearingRepository;
        this.deadlineRepository = deadlineRepository;
        this.orderRepository = orderRepository;
    }

    public List<HearingEntity> getAllHearings() {
        return hearingRepository.findAll();
    }

    public HearingEntity scheduleHearing(HearingEntity hearing) {
        if (hearing.getId() == null || hearing.getId().isBlank()) {
            hearing.setId("h-" + System.currentTimeMillis());
        }
        if (hearing.getStatus() == null) {
            hearing.setStatus("Scheduled");
        }
        return hearingRepository.save(hearing);
    }

    public List<DeadlineEntity> getAllDeadlines() {
        return deadlineRepository.findAll();
    }

    public DeadlineEntity createDeadline(DeadlineEntity deadline) {
        if (deadline.getId() == null || deadline.getId().isBlank()) {
            deadline.setId("d-" + System.currentTimeMillis());
        }
        return deadlineRepository.save(deadline);
    }

    // Orders Management
    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<OrderEntity> getOrdersByCaseId(String caseId) {
        return orderRepository.findByCaseIdOrderByIssuedDateDesc(caseId);
    }

    public OrderEntity createOrder(OrderEntity order) {
        if (order.getId() == null || order.getId().isBlank()) {
            order.setId("ord-" + System.currentTimeMillis());
        }
        if (order.getIssuedDate() == null) {
            order.setIssuedDate(LocalDate.now());
        }
        return orderRepository.save(order);
    }

    public void seedInitialData() {
        if (hearingRepository.count() == 0) {
            HearingEntity h1 = new HearingEntity("h1", "case-cr-001", "CR-2026-001", "State vs Rahul Sharma",
                    LocalDate.now().plusDays(4), "10:30 AM", "Courtroom 4, Sessions Court",
                    "Hon'ble Justice A. K. Sikri", "Prosecution Witness Examination (PW-1 & PW-2)", "Scheduled");
            hearingRepository.save(h1);

            HearingEntity h2 = new HearingEntity("h2", "case-ni-014", "NI-2026-014", "Apex Traders vs Rohan Kumar",
                    LocalDate.now().plusDays(7), "11:15 AM", "MM Court Room 2",
                    "Magistrate V. K. Deshmukh", "Complaint Admission & Verification Oath", "Scheduled");
            hearingRepository.save(h2);
        }

        if (deadlineRepository.count() == 0) {
            DeadlineEntity d1 = new DeadlineEntity("d1", "case-ni-014", "NI-2026-014", "Apex Traders vs Rohan Kumar",
                    LocalDate.now().minusDays(3), "Payment Period", "Overdue",
                    "Statutory 15-day notice payment period expired. Immediately draft and file formal criminal complaint under Sec 138 NI Act.");
            deadlineRepository.save(d1);

            DeadlineEntity d2 = new DeadlineEntity("d2", "case-cr-001", "CR-2026-001", "State vs Rahul Sharma",
                    LocalDate.now().plusDays(2), "Document Submission", "Due Soon",
                    "Submit list of defense witnesses and expert medical opinion affidavit before prosecution examination.");
            deadlineRepository.save(d2);
        }

        if (orderRepository.count() == 0) {
            OrderEntity o1 = new OrderEntity();
            o1.setId("ord-101");
            o1.setCaseId("case-cr-001");
            o1.setHearingId("h1");
            o1.setOrderType("PROCEDURAL");
            o1.setTitle("Order on Summons & Witness Appearance");
            o1.setIssuedByJudge("Hon'ble Justice A. K. Sikri");
            o1.setIssuedDate(LocalDate.now().minusDays(5));
            o1.setContent("Court hereby directs issuing summons to Prosecution Witnesses PW-1 and PW-2 for appearance on next hearing date. Defense counsel granted liberty to inspect seized forensic material.");
            o1.setDocumentUrl("/orders/CR-2026-001-Order-1.pdf");
            orderRepository.save(o1);
        }
    }
}
