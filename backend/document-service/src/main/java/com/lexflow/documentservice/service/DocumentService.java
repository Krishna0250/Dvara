package com.lexflow.documentservice.service;

import com.lexflow.documentservice.entity.DocumentEntity;
import com.lexflow.documentservice.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public List<DocumentEntity> getAllDocuments() {
        return documentRepository.findAll();
    }

    public List<DocumentEntity> getDocumentsByCaseId(String caseId) {
        return documentRepository.findByCaseId(caseId);
    }

    public DocumentEntity uploadDocument(DocumentEntity doc) {
        if (doc.getId() == null || doc.getId().isBlank()) {
            doc.setId("doc-" + System.currentTimeMillis());
        }
        if (doc.getHash() == null) {
            // Generate SHA-256 placeholder hash for integrity checking
            doc.setHash("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        }
        return documentRepository.save(doc);
    }

    public void seedInitialData() {
        if (documentRepository.count() == 0) {
            DocumentEntity d1 = new DocumentEntity("doc-fir-01", "FIR Copy (No. 204/2026)", "FIR",
                    "case-cr-001", "Police Station Clerk", LocalDate.of(2026, 1, 16), "Uploaded",
                    "a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0");
            d1.setAiSummary("First Information Report registered under Section 103 BNSS / Murder. Name of complainant: Inspector V. Sharma.");
            documentRepository.save(d1);

            DocumentEntity d2 = new DocumentEntity("doc-not-138", "Statutory Legal Demand Notice", "Notice",
                    "case-ni-014", "Adv. Sunita Rao", LocalDate.of(2026, 1, 20), "Uploaded",
                    "f0e9d8c7b6a543210987654321fedcba0987654321fedcba0987654321fedcba");
            d2.setAiSummary("Statutory 15-day notice issued demanding dishonoured cheque payment of Rs. 4,50,000/-.");
            documentRepository.save(d2);
        }
    }
}
