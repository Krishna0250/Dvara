# 📄 Dvara — Resume Project Descriptions & Interview Cheat Sheet

Here are tailored descriptions for **Dvara** formatted for resumes, LinkedIn, and technical interviews. Choose the version that best fits your resume layout and role targets.

---

## Option 1: Standard ATS-Optimized Bullet Points (Recommended for Full-Stack / Software Engineer roles)

> **Dvara — Distributed Judicial Workflow & Case Intelligence Platform** | *Java 17, Spring Boot, React 19, JavaScript, MySQL, Spring Security, Docker*
> - **Architected a distributed microservices platform** with 4 decoupled Spring Boot 3 services (`case-service`, `workflow-service`, `hearing-service`, `document-service`) managing statutory litigation lifecycles for civil and criminal cases.
> - **Engineered a procedural state-machine engine** modeling Indian procedural law (CPC Order VIII, BNSS Sec 103, NI Act Sec 138), automating next-action recommendations, statutory 30-day deadline computations, and 10-stage lifecycle transitions.
> - **Built a digital scrutiny & deficiency audit loop**, enabling Scrutiny Officers to flag structured defects and freeze case docketing until advocates submit certified cure responses, eliminating invalid docket entries.
> - **Implemented stateless HMAC-SHA256 JWT authentication & RBAC** across 5 judicial personas (*Judge, Registrar, Scrutiny Officer, Advocate, Citizen*), securing mutating endpoints with custom Spring Security interceptors.
> - **Designed an event-driven inter-service dispatch client**, automatically scheduling initial court hearings and calendar entries upon Registrar case approval.
> - **Developed a modern, responsive React 19 single-page dashboard** using JavaScript (JSX) and Tailwind CSS with real-time dossier tracking, role simulation, and resilient client-side fallback handling.

---

## Option 2: Compact / 3-Bullet Version (Best for 1-Page Resumes with Tight Space)

> **Dvara — Distributed Judicial Workflow Platform** | *Spring Boot 3, React 19, Java, JavaScript, MySQL, Docker*
> - Developed an enterprise judicial case management platform using Spring Boot 3 microservices and React 19, orchestrating civil/criminal litigation workflows across 5 user personas.
> - Implemented a procedural rule engine modeling statutory deadlines (CPC & BNSS) and a digital scrutiny deficiency loop to audit filings and enforce compliance before registration.
> - Secured distributed endpoints using HMAC-SHA256 JWT authentication and built automated inter-service REST clients for synchronized courtroom scheduling and calendar updates.

---

## Option 3: Backend-Focused Version (Targeting Backend / Java Engineer Roles)

> **Dvara — Distributed Judicial Workflow Engine** | *Java 17, Spring Boot 3, Spring Security, Hibernate, MySQL, JUnit 5, Docker*
> - Architected modular Spring Boot microservices backed by MySQL and JPA/Hibernate to automate complex statutory judicial proceedings and case docketing.
> - Built a stateless token authentication provider (`HMAC-SHA256 JWT`) and custom servlet interceptors to enforce strict Role-Based Access Control (RBAC) across multi-tenant personas.
> - Designed inter-service REST clients with fallback resilience, orchestrating distributed transactions between petition filing, statutory scrutiny, and hearing scheduling services.
> - Created automated unit and integration test suites using JUnit 5 and Mockito, ensuring test verification over state-machine decisions, token parsing, and audit trails.

---

## Option 4: Full-Stack / Frontend-Focused Version (Targeting Web / React Roles)

> **Dvara — Smart Legal Case Management System** | *React 19, JavaScript (ES6+), Tailwind CSS, Spring Boot, REST APIs*
> - Engineered a high-performance legal workflow application in React 19 and Vanilla Tailwind CSS, delivering dynamic case dossiers, visual priority radars, and interactive hearing logs.
> - Integrated Axios request interceptors for dynamic JWT token injection and designed a resilient `safeFetch` fallback mechanism ensuring uninterrupted offline/demo capability.
> - Built role-based interface switching enabling seamless preview across Judge, Registrar, Advocate, and Citizen views without page reloads.

---

## 🎯 Keywords for your Resume "Skills" Section

Add these relevant skills to your resume's technical skills matrix:
- **Languages**: Java (17+), JavaScript (ES6+), SQL, HTML5, CSS3
- **Frameworks & Libraries**: Spring Boot 3, Spring Security, React 19, Tailwind CSS, JPA / Hibernate, Axios
- **Architecture & Concepts**: Microservices, RESTful APIs, State Machines, Role-Based Access Control (RBAC), JWT Authentication, Event-Driven Architecture
- **Databases & Tools**: MySQL, H2 Database, Docker, Docker Compose, Git, Vite, Postman, JUnit 5, Mockito

---

## 🎙️ 30-Second Interview Elevator Pitch

> *"For my major project, I built **Dvara**, a distributed judicial litigation and workflow platform inspired by Indian statutory procedural law like the Civil Procedure Code and BNSS. The challenge in traditional legal systems is backlogs caused by procedural errors and manual docketing.*
> 
> *To solve this, I designed a multi-service architecture using Spring Boot 3 and React 19. It features a digital scrutiny pipeline that catches filing defects before docketing, an automated state-machine engine that computes statutory 30-day deadlines, and cryptographic JWT authentication enforcing role-based permissions across judges, registrars, and lawyers.*
> 
> *The entire system communicates via REST microservices and is backed by a responsive dashboard with role-switching simulations."*
