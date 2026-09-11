package com.lexflow.documentservice.controller;

import com.lexflow.documentservice.entity.DocumentEntity;
import com.lexflow.documentservice.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/documents")
@CrossOrigin(origins = "*")
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
        this.documentService.seedInitialData();
    }

    @GetMapping
    public ResponseEntity<List<DocumentEntity>> getDocuments(
            @RequestParam(required = false) String caseId) {
        if (caseId != null && !caseId.isBlank()) {
            return ResponseEntity.ok(documentService.getDocumentsByCaseId(caseId));
        }
        return ResponseEntity.ok(documentService.getAllDocuments());
    }

    @PostMapping
    public ResponseEntity<DocumentEntity> uploadDocument(@RequestBody DocumentEntity doc) {
        DocumentEntity created = documentService.uploadDocument(doc);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
