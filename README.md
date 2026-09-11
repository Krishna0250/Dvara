# LexFlow — Distributed Judicial Workflow & Case Management Platform

[![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.3-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Security](https://img.shields.io/badge/Spring%20Security-JWT%20RBAC-green?logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Database-MySQL%20%2F%20H2-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)

**LexFlow** is a distributed, enterprise-grade judicial case management and procedural litigation platform. Designed around Indian procedural law (**Code of Civil Procedure (CPC)**, **Bharatiya Nagarik Suraksha Sanhita (BNSS)**, and the **Negotiable Instruments Act (Sec 138)**), LexFlow eliminates procedural bottlenecks through a state-machine driven procedural workflow engine, digital document scrutiny with deficiency loops, role-based access control (RBAC), and tamper-evident audit logging.

---

## 🏛️ High-Level System Architecture

```
                                  ┌────────────────────────┐
                                  │      REACT 19 SPA      │
                                  │  TypeScript + Tailwind │
                                  │   (Port 5173 / Vite)   │
                                  └───────────┬────────────┘
                                              │
                                              │  HTTPS / REST (JWT Bearer)
                                              ▼
            ┌─────────────────────────────────┬────────────────────────────────┐
            │                                 │                                │
            ▼                                 ▼                                ▼
┌───────────────────────┐         ┌───────────────────────┐        ┌───────────────────────┐
│     Case Service      │         │   Workflow Service    │        │    Hearing Service    │
│       Port 8081       │         │       Port 8082       │        │       Port 8083       │
├───────────────────────┤         ├───────────────────────┤        ├───────────────────────┤
│ • E-Filing Lifecycle  │         │ • State Machine Rules │        │ • Hearing Scheduling  │
│ • Scrutiny Audit      │         │ • Next-Action Engine  │        │ • Cause List Gen      │
│ • Deficiency Loop     │         │ • Statutory Deadlines │        │ • Judicial Orders     │
│ • Case Registration   │         │ • CPC / BNSS Templates│        │ • Attendance Logs     │
│ • Audit Trail Logger  │         └───────────────────────┘        └───────────▲───────────┘
│ • JWT / Auth Provider │                                                      │
└───────────┬───────────┘                                                      │
            │                                                                  │
            └──────── Inter-Service REST (Registration Event) ─────────────────┘
                                              │
                                              ▼
                                ┌───────────────────────────┐
                                │     Document Service      │
                                │         Port 8084         │
                                ├───────────────────────────┤
                                │ • Filing Document Store   │
                                │ • Verification Badging    │
                                └───────────────────────────┘
```

---

## 🔄 End-to-End Procedural Lifecycle

```
[Citizen / Advocate]
        │
        ▼
1. E-Filing Petition (Draft ➔ Submitted)  [Filing ID: FL-2026-XXXX]
        │
        ▼
2. Registry Scrutiny Review
   ├── Documents Deficient? ──> Raise Deficiency (OPEN) ──> Advocate Re-uploads ──> Resolved
   └── Documents Verified!
        │
        ▼
3. Registrar Registration Approval
   ├── Generates Official Case Number (e.g., CIV/2026/1024 or CR/2026/001)
   ├── Assigns Presiding Judge & Court Hall
   └── [Inter-Service Event] Triggers Hearing Service:
          ├── Automatically schedules preliminary admission hearing
          └── Creates 30-day statutory Written Statement deadline under CPC Order VIII
        │
        ▼
4. Procedural Next-Action Engine (Workflow Service)
   └── Dynamically recommends statutory deadlines & next actions based on stage
        │
        ▼
5. Hearing Proceedings & Order Issuance (Judge Persona)
   ├── Convenes Hearing (Prosecution / Defense Examination)
   └── Issues Interlocutory, Interim Injunction, or Procedural Court Orders
        │
        ▼
6. Immutable Case Audit Trail
   └── Records every transition, actor, timestamp, and state delta permanently
```

---

## 👥 Role-Based Access Control (RBAC) Matrix

| Persona / Role | Filing & Petitions | Scrutiny & Deficiencies | Registration Approval | Hearing Calendar | Judicial Orders | Audit Logs |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **`CITIZEN` / Litigant** | Create & Submit | View & Resubmit | ❌ | View Own | View Orders | View Public |
| **`ADVOCATE`** | File Pleadings | Resolve Deficiencies | ❌ | View / Request | View Orders | Full Access |
| **`SCRUTINY_OFFICER`** | Audit | Raise / Verify | ❌ | View | View | Full Access |
| **`REGISTRAR`** | Manage | View All | ✅ Approve & Assign | Allocate Hall | Administrative | Full Access |
| **`JUDGE`** | Preside | View Record | View Record | Conduct / Adjourn | ✅ Issue Orders | Full Access |
| **`ADMIN`** | Full System | Full System | Full System | Full System | Full System | Full System |

---

## 📡 Microservices & API Overview

### 1. Case Service (`http://localhost:8081`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Authenticate user & issue signed HMAC-SHA256 JWT | Public |
| `GET` | `/api/v1/auth/token?role={role}` | Direct JWT token generator for demo persona switching | Public |
| `GET` | `/api/v1/cases` | Retrieve all master case dossiers | `Bearer JWT` |
| `POST` | `/api/v1/cases` | Submit new electronic petition | `Bearer JWT` |
| `POST` | `/api/v1/cases/{id}/deficiencies` | Raise statutory document deficiency | `SCRUTINY_OFFICER` |
| `PATCH` | `/api/v1/deficiencies/{id}/resolve` | Submit re-uploaded document resolution | `ADVOCATE`, `CITIZEN` |
| `POST` | `/api/v1/cases/{id}/register` | Approve scrutiny & issue Case Number | `REGISTRAR`, `ADMIN` |
| `GET` | `/api/v1/cases/{id}/audit` | Fetch tamper-evident case audit history | `Bearer JWT` |

### 2. Workflow Service (`http://localhost:8082`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/workflows/templates/{caseType}` | Retrieve procedural stage flow (Pleadings, Evidence, etc.) |
| `GET` | `/api/v1/workflows/next-action/{caseId}` | Compute dynamic recommended statutory action & deadline |

### 3. Hearing Service (`http://localhost:8083`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/hearings` | List scheduled hearings & daily cause list |
| `POST` | `/api/v1/hearings` | Schedule hearing docket date |
| `GET` | `/api/v1/deadlines` | List statutory & court-mandated deadlines |
| `POST` | `/api/v1/orders` | Draft, sign, and issue formal judicial orders |
| `GET` | `/api/v1/orders?caseId={id}` | Retrieve all judicial directions for a case |

### 4. Document Service (`http://localhost:8084`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/documents?caseId={id}` | Retrieve uploaded petition exhibits & orders |
| `POST` | `/api/v1/documents` | Upload and verify electronic filings |

---

## 🧪 Automated Testing Suite

LexFlow includes a **JUnit 5 & Mockito test suite** validating critical business invariants:

```bash
# Run unit tests in case-service
cd backend/case-service
mvn test

# Run unit tests in workflow-service
cd backend/workflow-service
mvn test
```

### Key Tested Scenarios:
- `testRaiseDeficiency_SetsCaseStatusToDeficientAndLogsAudit()`: Verifies that flagging an exhibit immediately transitions the filing status to `DEFICIENT` and generates an audit log entry.
- `testResolveDeficiency_AllResolved_SetsStatusUnderScrutiny()`: Verifies that clearing open deficiencies automatically returns the dossier to `UNDER_SCRUTINY`.
- `testApproveRegistration_AssignsCaseNumberAndInvokesInterService()`: Verifies registration number allocation and mock dispatch to `hearing-service`.
- `testGenerateAndValidateToken_Success()` & `testValidateToken_TamperedToken_ReturnsFalse()`: Verifies HMAC-SHA256 signature verification and tamper rejection.
- `testComputeNextAction_DeficientStatus_ReturnsUrgentDocumentReupload()`: Verifies priority calculation for deficient petitions.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- **Node.js** 18+ & **npm**
- **Java** 17+ (OpenJDK or Oracle JDK)
- **Maven** 3.8+ (Optional if using IDE or wrappers)

### 1. Start the React Frontend
```bash
cd frontend
npm install
npm run dev
```
The application will open at **`http://localhost:5173/`**.

### 2. Start the Backend Microservices
All microservices come pre-configured with **H2 in-memory databases** by default (with automatic seed data), so no external MySQL installation is strictly required to test:

```bash
# Terminal 1: Case Service (Port 8081)
cd backend/case-service
mvn spring-boot:run

# Terminal 2: Workflow Service (Port 8082)
cd backend/workflow-service
mvn spring-boot:run

# Terminal 3: Hearing Service (Port 8083)
cd backend/hearing-service
mvn spring-boot:run

# Terminal 4: Document Service (Port 8084)
cd backend/document-service
mvn spring-boot:run
```

*(Note: If backend services are offline, the frontend's built-in `safeFetch` mechanism seamlessly falls back to the realistic legal mock dataset so the UI remains 100% interactive.)*

---

## 🎭 Demo Personas for Reviewers & Interviewers

You can switch personas at any time using the **Role Switcher** in the top-right header:

| Persona | Name | Credentials | Key Action to Demonstrate |
| :--- | :--- | :--- | :--- |
| **Judge** | Hon'ble Justice A. K. Sikri | `judge@lexflow.gov` / `password` | Open Case Dossier ➔ Orders Tab ➔ Click **"Issue Formal Order"** |
| **Registrar** | Registrar V. K. Deshmukh | `registrar@lexflow.gov` / `password` | Scrutiny Queue ➔ Click **"Approve Registration"** to allocate Case Number |
| **Scrutiny Officer** | Officer Priya Nair | `scrutiny@lexflow.gov` / `password` | Scrutiny Queue ➔ Select Petition ➔ Click **"Raise Deficiency"** |
| **Advocate** | Adv. Rajesh Verma | `advocate@lexflow.org` / `password` | Scrutiny Queue ➔ Click **"Respond & Submit Re-uploaded Document"** |
| **Litigant / Citizen** | Rohan Kumar | `citizen@lexflow.org` / `password` | Track personal petition filing status & review hearing notices |

---

## 📄 License
This project is licensed under the MIT License — designed for engineering portfolios and distributed systems demonstrations.
