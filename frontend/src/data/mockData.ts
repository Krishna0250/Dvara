import type { Case, WorkflowTemplate, EventGroup, LawProvision } from '../types/legal';

export const CORE_EVENT_LIBRARY: { type: string; group: EventGroup }[] = [
  // 1. Case Initiation
  { type: 'Case Created', group: 'Case Initiation' },
  { type: 'Complaint Filed', group: 'Case Initiation' },
  { type: 'FIR Registered', group: 'Case Initiation' },
  { type: 'Petition Filed', group: 'Case Initiation' },
  { type: 'Application Filed', group: 'Case Initiation' },
  { type: 'Case Number Assigned', group: 'Case Initiation' },

  // 2. Investigation & Inquiry
  { type: 'Investigation Started', group: 'Investigation & Inquiry' },
  { type: 'Statement Recorded', group: 'Investigation & Inquiry' },
  { type: 'Witness Identified', group: 'Investigation & Inquiry' },
  { type: 'Evidence Collected', group: 'Investigation & Inquiry' },
  { type: 'Document Obtained', group: 'Investigation & Inquiry' },
  { type: 'Search Conducted', group: 'Investigation & Inquiry' },
  { type: 'Seizure Made', group: 'Investigation & Inquiry' },
  { type: 'Expert Opinion Requested', group: 'Investigation & Inquiry' },
  { type: 'Investigation Completed', group: 'Investigation & Inquiry' },
  { type: 'Further Investigation Ordered', group: 'Investigation & Inquiry' },

  // 3. Accused & Respondent
  { type: 'Accused Identified', group: 'Accused & Respondent' },
  { type: 'Accused Arrested', group: 'Accused & Respondent' },
  { type: 'Accused Appears', group: 'Accused & Respondent' },
  { type: 'Accused Absconding', group: 'Accused & Respondent' },
  { type: 'Bail Application Filed', group: 'Accused & Respondent' },
  { type: 'Bail Granted', group: 'Accused & Respondent' },
  { type: 'Bail Rejected', group: 'Accused & Respondent' },
  { type: 'Custody Ordered', group: 'Accused & Respondent' },

  // 4. Court Proceedings
  { type: 'Notice Issued', group: 'Court Proceedings' },
  { type: 'Notice Served', group: 'Court Proceedings' },
  { type: 'Summons Issued', group: 'Court Proceedings' },
  { type: 'Summons Served', group: 'Court Proceedings' },
  { type: 'Warrant Issued', group: 'Court Proceedings' },
  { type: 'Appearance', group: 'Court Proceedings' },
  { type: 'Plea / Response Filed', group: 'Court Proceedings' },
  { type: 'Charges Framed', group: 'Court Proceedings' },
  { type: 'Discharge Application Filed', group: 'Court Proceedings' },
  { type: 'Application Decided', group: 'Court Proceedings' },

  // 5. Evidence & Trial
  { type: 'Evidence Submitted', group: 'Evidence & Trial' },
  { type: 'Witness Examined (PW/DW)', group: 'Evidence & Trial' },
  { type: 'Cross-Examination Conducted', group: 'Evidence & Trial' },
  { type: 'Re-Examination Conducted', group: 'Evidence & Trial' },
  { type: 'Expert Examined', group: 'Evidence & Trial' },
  { type: 'Document Admitted', group: 'Evidence & Trial' },
  { type: 'Evidence Closed', group: 'Evidence & Trial' },

  // 6. Hearing & Decision
  { type: 'Hearing Conducted', group: 'Hearing & Decision' },
  { type: 'Arguments Heard', group: 'Hearing & Decision' },
  { type: 'Order Reserved', group: 'Hearing & Decision' },
  { type: 'Judgment Delivered', group: 'Hearing & Decision' },
  { type: 'Case Dismissed', group: 'Hearing & Decision' },
  { type: 'Case Withdrawn', group: 'Hearing & Decision' },
  { type: 'Settlement Reached', group: 'Hearing & Decision' },
  { type: 'Acquittal Pronounced', group: 'Hearing & Decision' },
  { type: 'Conviction Pronounced', group: 'Hearing & Decision' },

  // 7. Post-Judgment & Appeal
  { type: 'Sentence Passed', group: 'Post-Judgment & Appeal' },
  { type: 'Compensation Ordered', group: 'Post-Judgment & Appeal' },
  { type: 'Execution Petition Filed', group: 'Post-Judgment & Appeal' },
  { type: 'Appeal Filed in Higher Court', group: 'Post-Judgment & Appeal' },
  { type: 'Revision Petition Filed', group: 'Post-Judgment & Appeal' },
  { type: 'Stay Granted', group: 'Post-Judgment & Appeal' },

  // 8. Case Closure
  { type: 'Case Disposed', group: 'Case Closure' },
  { type: 'Order Complied', group: 'Case Closure' },
  { type: 'Execution Completed', group: 'Case Closure' },
  { type: 'Case Closed', group: 'Case Closure' }
];

export const LAW_PROVISIONS: LawProvision[] = [
  {
    id: 'law-bns-103',
    lawName: 'Bharatiya Nyaya Sanhita (BNS)',
    lawType: 'Central Act',
    year: 2023,
    sectionNumber: 'Section 103',
    title: 'Punishment for Murder',
    description: 'Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.',
    effectiveDate: '2024-07-01',
    statuteVersion: 'BNS 2023 (Current)',
    mappedCategory: 'Criminal',
    mappedCaseType: 'Murder',
    procedureName: 'Bharatiya Nagarik Suraksha Sanhita (BNSS) Sessions Trial Procedure',
    defaultCourt: 'Sessions Court / High Court'
  },
  {
    id: 'law-bns-318',
    lawName: 'Bharatiya Nyaya Sanhita (BNS)',
    lawType: 'Central Act',
    year: 2023,
    sectionNumber: 'Section 318',
    title: 'Cheating & Corporate Financial Fraud',
    description: 'Offence of deception, cheating, and dishonestly inducing delivery of property or corporate funds.',
    effectiveDate: '2024-07-01',
    statuteVersion: 'BNS 2023 (Current)',
    mappedCategory: 'Criminal',
    mappedCaseType: 'Financial Fraud',
    procedureName: 'Warrant Case Trial Procedure before Magistrate',
    defaultCourt: 'Chief Judicial Magistrate / EOW Court'
  },
  {
    id: 'law-ipc-302',
    lawName: 'Indian Penal Code (IPC)',
    lawType: 'Central Act',
    year: 1860,
    sectionNumber: 'Section 302',
    title: 'Punishment for Murder (Legacy Matters)',
    description: 'Offences committed prior to July 1, 2024, governed under legacy IPC provisions.',
    effectiveDate: '1860-10-06',
    statuteVersion: 'IPC 1860 (Legacy)',
    mappedCategory: 'Criminal',
    mappedCaseType: 'Murder',
    procedureName: 'Code of Criminal Procedure (CrPC, 1973) Trial Procedure',
    defaultCourt: 'Sessions Court'
  },
  {
    id: 'law-ni-138',
    lawName: 'Negotiable Instruments Act',
    lawType: 'Special Statute',
    year: 1881,
    sectionNumber: 'Section 138',
    title: 'Dishonour of Cheque for Insufficiency of Funds',
    description: 'Statutory criminal offence for cheque dishonour subject to mandatory 30-day notice and 15-day payment period.',
    effectiveDate: '1881-12-09',
    statuteVersion: 'Active Statute',
    mappedCategory: 'Special / Statutory',
    mappedCaseType: 'Cheque Dishonour',
    procedureName: 'Section 138 NI Act Summary Trial Procedure',
    defaultCourt: 'Metropolitan Magistrate Court / JMFC'
  },
  {
    id: 'law-cpc-order-6',
    lawName: 'Code of Civil Procedure (CPC)',
    lawType: 'Procedural Code',
    year: 1908,
    sectionNumber: 'Order VI & Order VII',
    title: 'Pleadings & Plaint in Civil Suits',
    description: 'Procedure governing institution of civil suits for declaration of title, partition, and perpetual injunction.',
    effectiveDate: '1908-03-21',
    statuteVersion: 'CPC 1908',
    mappedCategory: 'Civil',
    mappedCaseType: 'Property Dispute',
    procedureName: 'CPC Regular Civil Suit Trial Procedure',
    defaultCourt: 'City Civil Court / Senior Division'
  },
  {
    id: 'law-hma-13',
    lawName: 'Hindu Marriage Act',
    lawType: 'Central Act',
    year: 1955,
    sectionNumber: 'Section 13(1)(ia)',
    title: 'Dissolution of Marriage on Grounds of Cruelty',
    description: 'Petition for decree of divorce on grounds of physical or mental cruelty with mandatory court counselling.',
    effectiveDate: '1955-05-18',
    statuteVersion: 'Active Statute',
    mappedCategory: 'Family',
    mappedCaseType: 'Divorce',
    procedureName: 'Family Courts Act & HMA Reconciliation Procedure',
    defaultCourt: 'Family Court / District Court'
  },
  {
    id: 'law-cpa-35',
    lawName: 'Consumer Protection Act',
    lawType: 'Special Statute',
    year: 2019,
    sectionNumber: 'Section 35',
    title: 'Manner in Which Consumer Complaint Shall Be Made',
    description: 'Filing complaint before District Consumer Disputes Redressal Commission for defective goods or deficiency of service.',
    effectiveDate: '2020-07-20',
    statuteVersion: 'Active Statute',
    mappedCategory: 'Consumer',
    mappedCaseType: 'Consumer Complaint',
    procedureName: 'Consumer Commission Summary Redressal Procedure',
    defaultCourt: 'District Consumer Disputes Redressal Commission'
  },
  {
    id: 'law-const-226',
    lawName: 'Constitution of India',
    lawType: 'Constitution',
    year: 1950,
    sectionNumber: 'Article 226',
    title: 'Power of High Courts to Issue Certain Writs',
    description: 'High Court jurisdiction to issue writs of Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari.',
    effectiveDate: '1950-01-26',
    statuteVersion: 'Active Statute',
    mappedCategory: 'Constitutional',
    mappedCaseType: 'Writ Petition',
    procedureName: 'High Court Writ Proceedings Procedure',
    defaultCourt: 'High Court of Judicature'
  },
  {
    id: 'law-contract-73',
    lawName: 'Indian Contract Act',
    lawType: 'Central Act',
    year: 1872,
    sectionNumber: 'Section 73',
    title: 'Compensation for Loss or Damage Caused by Breach of Contract',
    description: 'Civil remedy for unliquidated damages arising naturally from breach of commercial contract.',
    effectiveDate: '1872-09-01',
    statuteVersion: 'Active Statute',
    mappedCategory: 'Commercial',
    mappedCaseType: 'Breach of Contract',
    procedureName: 'Commercial Suit Procedure (Commercial Courts Act)',
    defaultCourt: 'Commercial Court / High Court Original Side'
  }
];

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'tmpl-criminal-murder',
    category: 'Criminal',
    caseType: 'Murder',
    name: 'Criminal Trial Procedure (Murder / BNS Sec 103 / IPC 302)',
    description: 'Standard procedure under Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) / CrPC for sessions trial offences.',
    stages: [
      { id: 's1', title: 'Complaint / FIR', description: 'Registration of First Information Report at police station', status: 'completed', estimatedDays: 2 },
      { id: 's2', title: 'Investigation', description: 'Police investigation, scene inspection, evidence collection', status: 'completed', estimatedDays: 60 },
      { id: 's3', title: 'Accused Identification & Arrest', description: 'Apprehension of suspect or issuance of arrest warrant', status: 'completed', isConditional: true, branches: [{ condition: 'Accused Identified = YES', label: 'Arrest & Custody', targetStageId: 's4' }, { condition: 'Accused Identified = NO', label: 'Continue Investigation', targetStageId: 's2' }], estimatedDays: 14 },
      { id: 's4', title: 'Bail Proceedings', description: 'Application for regular or anticipatory bail', status: 'completed', isConditional: true, branches: [{ condition: 'Bail Granted = YES', label: 'Released on Bail', targetStageId: 's5' }, { condition: 'Bail Granted = NO', label: 'Judicial Custody', targetStageId: 's5' }], estimatedDays: 10 },
      { id: 's5', title: 'Charge-sheet / Final Report', description: 'Filing of police report under BNSS Sec 193 / CrPC Sec 173', status: 'completed', estimatedDays: 90 },
      { id: 's6', title: 'Cognizance & Charges', description: 'Court takes cognizance and frames charges', status: 'completed', estimatedDays: 30 },
      { id: 's7', title: 'Evidence Stage', description: 'Examination of prosecution & defense witnesses (PWs & DWs)', status: 'current', requiredDocuments: ['Witness Statements', 'Forensic Reports', 'Medical Report'], estimatedDays: 120 },
      { id: 's8', title: 'Arguments', description: 'Final oral and written arguments by Prosecution and Defense', status: 'upcoming', estimatedDays: 15 },
      { id: 's9', title: 'Judgment & Sentencing', description: 'Pronouncement of conviction or acquittal and sentencing hearing', status: 'upcoming', estimatedDays: 14 }
    ]
  },
  {
    id: 'tmpl-special-cheque',
    category: 'Special / Statutory',
    caseType: 'Cheque Dishonour',
    name: 'Section 138 Negotiable Instruments Act Procedure',
    description: 'Statutory timeline compliance for cheque bounce complaints.',
    stages: [
      { id: 's1', title: 'Cheque Issued & Presented', description: 'Presentation of cheque to bank within validity', status: 'completed', estimatedDays: 1 },
      { id: 's2', title: 'Cheque Dishonoured', description: 'Bank return memo issued with reason (e.g. Insufficient Funds)', status: 'completed', estimatedDays: 3 },
      { id: 's3', title: 'Statutory Demand Notice', description: 'Issuance of legal notice within 30 days of return memo', status: 'completed', estimatedDays: 30 },
      { id: 's4', title: 'Statutory Waiting Period (15 Days)', description: 'Mandatory 15-day notice period for drawer to make payment', status: 'completed', isConditional: true, branches: [{ condition: 'Payment Received = YES', label: 'Case Closed / Settled', targetStageId: 'closed' }, { condition: 'Payment Received = NO', label: 'Initiate Criminal Complaint', targetStageId: 's5' }], estimatedDays: 15 },
      { id: 's5', title: 'Complaint Filing', description: 'Filing criminal complaint before Magistrate within 30 days', status: 'current', estimatedDays: 30 },
      { id: 's6', title: 'Summons & Pre-Summoning Evidence', description: 'Complainant statement and summons issuance', status: 'upcoming', estimatedDays: 45 },
      { id: 's7', title: 'Trial & Evidence', description: 'Cross-examination of complainant and defense evidence', status: 'upcoming', estimatedDays: 90 },
      { id: 's8', title: 'Judgment & Recovery Order', description: 'Order for fine (up to 2x cheque amount) or imprisonment', status: 'upcoming', estimatedDays: 30 }
    ]
  },
  {
    id: 'tmpl-civil-property',
    category: 'Civil',
    caseType: 'Property Dispute',
    name: 'Civil Suit for Property & Declaration (CPC Order VI)',
    description: 'Procedure governed by Code of Civil Procedure for title & partition suits.',
    stages: [
      { id: 's1', title: 'Plaint Filing & Scrutiny', description: 'Filing of plaint with valuation and court fee', status: 'completed', estimatedDays: 15 },
      { id: 's2', title: 'Summons Issued & Served', description: 'Issuance of court summons to defendants', status: 'completed', estimatedDays: 30 },
      { id: 's3', title: 'Written Statement Filing', description: 'Defendant files written statement within 30-90 days', status: 'current', requiredDocuments: ['Written Statement', 'Documentary Evidence'], estimatedDays: 90 },
      { id: 's4', title: 'Framing of Issues', description: 'Court determines points of dispute for trial', status: 'upcoming', estimatedDays: 30 },
      { id: 's5', title: 'Plaintiff & Defendant Evidence', description: 'Filing of affidavits in chief and cross-examination', status: 'upcoming', estimatedDays: 150 },
      { id: 's6', title: 'Final Arguments', description: 'Oral arguments on framed issues', status: 'upcoming', estimatedDays: 30 },
      { id: 's7', title: 'Judgment & Decree', description: 'Pronouncement of judgment and execution decree', status: 'upcoming', estimatedDays: 30 }
    ]
  },
  {
    id: 'tmpl-family-divorce',
    category: 'Family',
    caseType: 'Divorce',
    name: 'Family Court Petition & Mediation Procedure',
    description: 'Hindu Marriage Act / Special Marriage Act dissolution & custody proceedings.',
    stages: [
      { id: 's1', title: 'Petition Filed', description: 'Filing divorce petition before Family Court under Sec 13 HMA', status: 'completed', estimatedDays: 10 },
      { id: 's2', title: 'Notice Served', description: 'Serving notice on respondent', status: 'completed', estimatedDays: 30 },
      { id: 's3', title: 'Response & Reply', description: 'Filing counter affidavit/reply by respondent', status: 'completed', estimatedDays: 60 },
      { id: 's4', title: 'Mandatory Counselling & Mediation', description: 'Court-referred mediation for reconciliation', status: 'current', isConditional: true, branches: [{ condition: 'Settlement Reached = YES', label: 'Mutual Consent Decree', targetStageId: 's7' }, { condition: 'Settlement Reached = NO', label: 'Contested Trial Evidence', targetStageId: 's5' }], estimatedDays: 60 },
      { id: 's5', title: 'Evidence Stage', description: 'Affidavits and cross-examination on cruelty/desertion grounds', status: 'upcoming', estimatedDays: 90 },
      { id: 's6', title: 'Final Arguments & Decree', description: 'Final hearing and divorce decree order', status: 'upcoming', estimatedDays: 30 }
    ]
  },
  {
    id: 'tmpl-consumer-complaint',
    category: 'Consumer',
    caseType: 'Consumer Complaint',
    name: 'Consumer Protection Act Dispute Resolution',
    description: 'Procedure before District Consumer Disputes Redressal Commission under Sec 35 CPA.',
    stages: [
      { id: 's1', title: 'Consumer Complaint Filed', description: 'Filing complaint with supporting bills and notices', status: 'completed', estimatedDays: 7 },
      { id: 's2', title: 'Scrutiny & Admission', description: 'Admissibility hearing before commission', status: 'completed', estimatedDays: 21 },
      { id: 's3', title: 'Notice to Opposite Party', description: 'Issuance of 30-day notice to manufacturer/provider', status: 'completed', estimatedDays: 30 },
      { id: 's4', title: 'Written Version / Response', description: 'Filing of defense response by opposite party', status: 'current', estimatedDays: 45 },
      { id: 's5', title: 'Evidence by Affidavits', description: 'Filing supporting affidavits and expert testing reports', status: 'upcoming', estimatedDays: 60 },
      { id: 's6', title: 'Final Hearing & Relief Order', description: 'Commission passes order for refund/compensation', status: 'upcoming', estimatedDays: 30 }
    ]
  },
  {
    id: 'tmpl-const-writ',
    category: 'Constitutional',
    caseType: 'Writ Petition',
    name: 'High Court Writ Proceedings (Article 226)',
    description: 'Constitutional writ proceedings before Division Bench / Single Judge.',
    stages: [
      { id: 's1', title: 'Writ Petition Filed', description: 'Filing writ petition along with urgent interim relief notice', status: 'completed', estimatedDays: 3 },
      { id: 's2', title: 'Admission & Notice Motion', description: 'First hearing for admission and issuance of notice to State respondents', status: 'completed', estimatedDays: 14 },
      { id: 's3', title: 'Counter Affidavit by State', description: 'Filing of counter affidavit by Secretary / Government Pleader', status: 'current', requiredDocuments: ['Government Affidavit', 'Rejoinder Affidavit'], estimatedDays: 30 },
      { id: 's4', title: 'Rejoinder & Final Hearing', description: 'Petitioner rejoinder and arguments on constitutional validity', status: 'upcoming', estimatedDays: 30 },
      { id: 's5', title: 'Judgment / Writ Order', description: 'High Court issues writ of Mandamus / Certiorari order', status: 'upcoming', estimatedDays: 15 }
    ]
  },
  {
    id: 'tmpl-comm-contract',
    category: 'Commercial',
    caseType: 'Breach of Contract',
    name: 'Commercial Suit Procedure (Sec 73 Contract Act)',
    description: 'Procedure under Commercial Courts Act, 2015 with mandatory Pre-Institution Mediation.',
    stages: [
      { id: 's1', title: 'Pre-Institution Mediation', description: 'Mandatory Sec 12A mediation before DLSA', status: 'completed', estimatedDays: 90 },
      { id: 's2', title: 'Commercial Suit Filed', description: 'Filing commercial plaint with statement of truth and documents', status: 'completed', estimatedDays: 15 },
      { id: 's3', title: 'Written Statement & Case Management', description: 'Filing written statement within strict 120-day timeline', status: 'current', estimatedDays: 120 },
      { id: 's4', title: 'Discovery & Inspection', description: 'Admission/denial of documents and interrogatories', status: 'upcoming', estimatedDays: 45 },
      { id: 's5', title: 'Trial & Judgment', description: 'Summary judgment or expedited trial under Order XV-A CPC', status: 'upcoming', estimatedDays: 180 }
    ]
  }
];

export const INITIAL_CASES: Case[] = [
  {
    id: 'case-cr-001',
    caseNumber: 'CR-2026-001',
    title: 'State vs Rahul Sharma',
    category: 'Criminal',
    caseType: 'Murder',
    proceduralRoute: 'Police FIR Sessions Trial (BNSS Sec 193)',
    currentState: 'Accused in Judicial Custody',
    applicableLaw: 'Bharatiya Nyaya Sanhita (BNS, 2023)',
    applicableSection: 'Section 103 (Punishment for Murder)',
    court: 'Sessions Court, City Civil & Sessions Complex',
    jurisdiction: 'District Sessions Court, Division I',
    filingDate: '2026-08-08',
    assignedLawyer: 'Adv. Rajesh Verma',
    priority: 'High',
    status: 'Active',
    currentStage: 'Evidence Stage',
    summary: 'Sessions criminal prosecution regarding alleged homicide incident. Charge-sheet submitted by local police station under BNSS Sec 193.',
    nextHearingDate: '2026-09-15',
    nextHearingPurpose: 'Prosecution Witness Examination (PW-1 & PW-2)',
    parties: [
      { id: 'p1', name: 'State of Maharashtra', role: 'Complainant', contact: '+91 22 2202 0111' },
      { id: 'p2', name: 'Rahul Sharma', role: 'Accused', contact: '+91 98200 11223' },
      { id: 'p3', name: 'Dr. A. K. Sundaram (Medical Examiner)', role: 'Witness', contact: '+91 94221 55443' },
      { id: 'p4', name: 'Inspector V. D. Deshmukh', role: 'Witness', contact: '+91 22 2410 8899' }
    ],
    timeline: [
      { id: 'e1', type: 'FIR Registered', group: 'Case Initiation', date: '2026-08-08', description: 'FIR No. 204/2026 registered under BNS Sec 103 at City Central Police Station.', responsiblePerson: 'Inspector V. D. Deshmukh', resultingState: 'Investigation Active', documentId: 'doc-fir-01', documentName: 'FIR_204_2026.pdf' },
      { id: 'e2', type: 'Investigation Started', group: 'Investigation & Inquiry', date: '2026-08-09', description: 'Forensic team visited crime scene, collected blood samples and knife weapon.', responsiblePerson: 'Forensic Unit A' },
      { id: 'e3', type: 'Accused Arrested', group: 'Accused & Respondent', date: '2026-08-16', description: 'Accused Rahul Sharma apprehended from suburban apartment.', responsiblePerson: 'PSI Karan Johar', resultingState: 'Accused Apprehended' },
      { id: 'e4', type: 'Bail Rejected', group: 'Accused & Respondent', date: '2026-08-20', description: 'Bail Application No. 44/2026 rejected by Sessions Judge due to gravity of offense.', responsiblePerson: 'Sessions Judge Mehta', resultingState: 'Accused in Judicial Custody' },
      { id: 'e5', type: 'Charge-sheet Filed', group: 'Investigation & Inquiry', date: '2026-08-22', description: '500-page final charge-sheet submitted under BNSS Section 193.', responsiblePerson: 'Inspector V. D. Deshmukh', documentId: 'doc-cs-01', documentName: 'Charge_Sheet_Final.pdf' },
      { id: 'e6', type: 'Charges Framed', group: 'Court Proceedings', date: '2026-09-01', description: 'Charges formally framed under BNS Section 103. Accused pleaded not guilty.', responsiblePerson: 'Sessions Court Judge', resultingState: 'Trial Evidence Pending' }
    ],
    workflow: WORKFLOW_TEMPLATES[0].stages,
    documents: [
      { id: 'doc-fir-01', caseId: 'case-cr-001', name: 'FIR Copy (No. 204/2026)', type: 'FIR', uploadedDate: '2026-08-08', uploadedBy: 'Police Station Clerk', status: 'Uploaded', relatedEvent: 'FIR Registered', size: '2.4 MB' },
      { id: 'doc-cs-01', caseId: 'case-cr-001', name: 'Police Charge-Sheet', type: 'Charge-sheet', uploadedDate: '2026-08-22', uploadedBy: 'Investigating Officer', status: 'Uploaded', relatedEvent: 'Charge-sheet Filed', size: '14.8 MB' },
      { id: 'doc-med-01', caseId: 'case-cr-001', name: 'Autopsy & Medical Examiner Report', type: 'Evidence', uploadedDate: '2026-08-25', uploadedBy: 'Dr. A. K. Sundaram', status: 'Uploaded', size: '5.1 MB' },
      { id: 'doc-wit-01', caseId: 'case-cr-001', name: 'Eyewitness Statement (PW-1)', type: 'Witness Statement', uploadedDate: '2026-08-28', uploadedBy: 'Adv. Rajesh Verma', status: 'Uploaded', size: '1.2 MB' }
    ],
    hearings: [
      {
        id: 'h1',
        caseId: 'case-cr-001',
        caseNumber: 'CR-2026-001',
        caseTitle: 'State vs Rahul Sharma',
        date: '2026-09-15',
        time: '10:30 AM',
        court: 'Courtroom 4, Sessions Court',
        purpose: 'Prosecution Witness Examination (PW-1 & PW-2)',
        previousOrderSnippet: 'Summons issued to medical officer. Defence instructed to prepare cross-examination.',
        requiredDocuments: ['Autopsy Report', 'PW-1 Statement', 'Weapon Recovery Memo'],
        participants: ['Adv. Rajesh Verma (Defence)', 'Public Prosecutor Kapoor', 'PW-1 Witness'],
        status: 'Scheduled'
      }
    ],
    deadlines: [
      {
        id: 'd1',
        caseId: 'case-cr-001',
        caseNumber: 'CR-2026-001',
        caseTitle: 'State vs Rahul Sharma',
        dueDate: '2026-09-12',
        daysRemaining: 4,
        type: 'Document Submission',
        status: 'Due Soon',
        suggestedAction: 'Submit list of defense witnesses and expert medical opinion affidavit before prosecution examination.'
      }
    ],
    nextAction: {
      currentStage: 'Evidence Stage',
      currentState: 'Accused in Judicial Custody',
      conditions: ['Charges framed: YES (BNS Sec 103)', 'Bail: REJECTED', 'PW Examination: PENDING'],
      suggestedAction: 'Prepare cross-examination strategy for Prosecution Eyewitness PW-1 and inspect forensic weapon recovery memo.',
      actionCategory: 'Evidence Prep',
      priority: 'High',
      disclaimer: 'Procedural guidance based on BNSS Sessions Trial workflow template.'
    }
  },
  {
    id: 'case-ni-014',
    caseNumber: 'NI-2026-014',
    title: 'Apex Traders vs Rohan Kumar',
    category: 'Special / Statutory',
    caseType: 'Cheque Dishonour',
    proceduralRoute: 'Summary Trial Sec 138 NI Act',
    currentState: 'Statutory 15-Day Payment Period Expired',
    applicableLaw: 'Negotiable Instruments Act, 1881',
    applicableSection: 'Section 138 (Cheque Bounce)',
    court: 'Metropolitan Magistrate Court, Division 3',
    jurisdiction: 'Magistrate Court - Financial Offenses Unit',
    filingDate: '2026-08-18',
    assignedLawyer: 'Adv. Sunita Rao',
    priority: 'High',
    status: 'Active',
    currentStage: 'Statutory Waiting Period (15 Days)',
    summary: 'Dishonour of cheque worth ₹12,50,000 issued towards commercial supply invoice. Return memo received due to funds insufficient.',
    nextHearingDate: '2026-09-18',
    nextHearingPurpose: 'Verification of Statutory Notice & Complaint Admission',
    parties: [
      { id: 'p10', name: 'Apex Traders Pvt Ltd', role: 'Complainant', contact: '+91 22 4000 8811' },
      { id: 'p11', name: 'Rohan Kumar (Prop. RK Logistics)', role: 'Accused', contact: '+91 99300 44556' }
    ],
    timeline: [
      { id: 'e10', type: 'Notice Issued', group: 'Court Proceedings', date: '2026-08-20', description: 'Statutory 30-day demand notice dispatched under Sec 138 NI Act via registered AD post.', responsiblePerson: 'Adv. Sunita Rao', documentId: 'doc-not-138', documentName: 'Demand_Notice_138.pdf' },
      { id: 'e11', type: 'Notice Served', group: 'Court Proceedings', date: '2026-08-23', description: 'Postal acknowledgement receipt confirmed delivery to drawer premises.', responsiblePerson: 'India Post AD Receipt', resultingState: 'Statutory Notice Active' }
    ],
    workflow: WORKFLOW_TEMPLATES[1].stages,
    documents: [
      { id: 'doc-chq-01', caseId: 'case-ni-014', name: 'Original Cheque No. 441092', type: 'Evidence', uploadedDate: '2026-08-18', uploadedBy: 'Apex Traders', status: 'Uploaded', size: '850 KB' },
      { id: 'doc-memo-01', caseId: 'case-ni-014', name: 'Bank Return Memo (Insufficient Funds)', type: 'Evidence', uploadedDate: '2026-08-19', uploadedBy: 'HDFC Bank Manager', status: 'Uploaded', size: '640 KB' },
      { id: 'doc-not-138', caseId: 'case-ni-014', name: 'Statutory Legal Demand Notice', type: 'Notice', uploadedDate: '2026-08-20', uploadedBy: 'Adv. Sunita Rao', status: 'Uploaded', size: '1.8 MB' }
    ],
    hearings: [
      {
        id: 'h2',
        caseId: 'case-ni-014',
        caseNumber: 'NI-2026-014',
        caseTitle: 'Apex Traders vs Rohan Kumar',
        date: '2026-09-18',
        time: '11:15 AM',
        court: 'MM Court Room 2',
        purpose: 'Complaint Admission & Verification Oath',
        requiredDocuments: ['Original Cheque', 'Bank Return Memo', 'Postal AD Card'],
        participants: ['Adv. Sunita Rao', 'Complainant Director'],
        status: 'Scheduled'
      }
    ],
    deadlines: [
      {
        id: 'd2',
        caseId: 'case-ni-014',
        caseNumber: 'NI-2026-014',
        caseTitle: 'Apex Traders vs Rohan Kumar',
        dueDate: '2026-09-08',
        daysRemaining: 0,
        type: 'Payment Period',
        status: 'Overdue',
        suggestedAction: 'Statutory 15-day notice payment period expired. Immediately draft and file formal criminal complaint under Sec 138 NI Act.'
      }
    ],
    nextAction: {
      currentStage: 'Statutory Waiting Period (15 Days)',
      currentState: 'Statutory Notice Payment Expired',
      conditions: ['Notice served: YES (23 Aug)', '15-day period elapsed: YES', 'Payment made: NO'],
      suggestedAction: 'Initiate formal Criminal Complaint before Metropolitan Magistrate Court within 30 days of cause of action under Sec 138 NI Act.',
      actionCategory: 'Filing',
      priority: 'High',
      disclaimer: 'Automated workflow engine check for Section 138 NI Act statutory periods.'
    }
  },
  {
    id: 'case-cv-021',
    caseNumber: 'CV-2026-021',
    title: 'Mehta vs Sharma Property Suit',
    category: 'Civil',
    caseType: 'Property Dispute',
    proceduralRoute: 'CPC Order VI Regular Civil Suit',
    currentState: 'Written Statement Pending (30-Day Limit)',
    applicableLaw: 'Code of Civil Procedure (CPC, 1908)',
    applicableSection: 'Order VI & Order VII (Plaint & Pleadings)',
    court: 'City Civil Court, Senior Division',
    jurisdiction: 'Civil Division Court 5',
    filingDate: '2026-07-10',
    assignedLawyer: 'Adv. Vikramaditya Shah',
    priority: 'Medium',
    status: 'Active',
    currentStage: 'Written Statement Filing',
    summary: 'Suit for declaration of title and perpetual injunction regarding commercial property measuring 4,500 sq. ft.',
    nextHearingDate: '2026-09-17',
    nextHearingPurpose: 'Review Defendant Written Statement & Injunction Reply',
    parties: [
      { id: 'p20', name: 'Suresh Mehta', role: 'Plaintiff', contact: '+91 98211 99887' },
      { id: 'p21', name: 'Ramesh Sharma & Ors', role: 'Defendant', contact: '+91 97690 33221' }
    ],
    timeline: [
      { id: 'e20', type: 'Case Filed', group: 'Case Initiation', date: '2026-07-10', description: 'Plaint along with interim injunction application filed under CPC Order 39.', responsiblePerson: 'Adv. Vikramaditya Shah' },
      { id: 'e21', type: 'Summons Served', group: 'Court Proceedings', date: '2026-07-28', description: 'Court summons served upon Defendant 1 & 2 via bailiff.', responsiblePerson: 'Court Bailiff Unit' }
    ],
    workflow: WORKFLOW_TEMPLATES[2].stages,
    documents: [
      { id: 'doc-plt-01', caseId: 'case-cv-021', name: 'Plaint & Property Title Deeds', type: 'Plaint', uploadedDate: '2026-07-10', uploadedBy: 'Adv. Vikramaditya Shah', status: 'Uploaded', size: '8.4 MB' },
      { id: 'doc-ord-01', caseId: 'case-cv-021', name: 'Ad-Interim Status Quo Order', type: 'Court Order', uploadedDate: '2026-07-15', uploadedBy: 'Court Registrar', status: 'Uploaded', size: '1.1 MB' }
    ],
    hearings: [
      {
        id: 'h3',
        caseId: 'case-cv-021',
        caseNumber: 'CV-2026-021',
        caseTitle: 'Mehta vs Sharma Property Suit',
        date: '2026-09-17',
        time: '02:30 PM',
        court: 'Civil Courtroom 8',
        purpose: 'Filing Written Statement & Framing Issues',
        requiredDocuments: ['Sale Deed 1998', 'Property Tax Receipts', 'Replication Draft'],
        participants: ['Adv. Vikramaditya Shah', 'Adv. N. K. Joshi (Defendant Counsel)'],
        status: 'Scheduled'
      }
    ],
    deadlines: [
      {
        id: 'd3',
        caseId: 'case-cv-021',
        caseNumber: 'CV-2026-021',
        caseTitle: 'Mehta vs Sharma Property Suit',
        dueDate: '2026-09-17',
        daysRemaining: 9,
        type: 'Response Filing',
        status: 'Upcoming',
        suggestedAction: 'Review defendant written statement once served and draft replication within 15 days.'
      }
    ],
    nextAction: {
      currentStage: 'Written Statement Filing',
      currentState: 'Summons Served - Reply Pending',
      conditions: ['Summons served: YES', '30-day WS period: Expiring soon'],
      suggestedAction: 'Examine defendant response and prepare replication draft on title validity.',
      actionCategory: 'Filing',
      priority: 'Medium',
      disclaimer: 'Civil trial procedure recommendation.'
    }
  },
  {
    id: 'case-fc-008',
    caseNumber: 'FC-2026-008',
    title: 'Ananya Sharma vs Rohit Sharma',
    category: 'Family',
    caseType: 'Divorce',
    proceduralRoute: 'HMA Sec 13 Family Court Proceedings',
    currentState: 'Reconciliation Mediation Active',
    applicableLaw: 'Hindu Marriage Act, 1955',
    applicableSection: 'Section 13(1)(ia) (Cruelty)',
    court: 'Family Court, Bandra Complex',
    jurisdiction: 'Family Court Principal Judge Bench',
    filingDate: '2026-06-01',
    assignedLawyer: 'Adv. Maya Kulkarni',
    priority: 'Medium',
    status: 'Active',
    currentStage: 'Mandatory Counselling & Mediation',
    summary: 'Petition for dissolution of marriage on grounds of cruelty with interim maintenance application.',
    nextHearingDate: '2026-09-20',
    nextHearingPurpose: '3rd Joint Mediation Counselling Session',
    parties: [
      { id: 'p30', name: 'Ananya Sharma', role: 'Petitioner', contact: '+91 98199 77665' },
      { id: 'p31', name: 'Rohit Sharma', role: 'Respondent', contact: '+91 98201 22334' }
    ],
    timeline: [
      { id: 'e30', type: 'Petition Filed', group: 'Case Initiation', date: '2026-06-01', description: 'Divorce Petition & Sec 125 maintenance application filed.', responsiblePerson: 'Adv. Maya Kulkarni' },
      { id: 'e31', type: 'Order Passed', group: 'Hearing & Decision', date: '2026-07-10', description: 'Court referred parties to Family Court Mediation Center.', responsiblePerson: 'Family Court Mediator' }
    ],
    workflow: WORKFLOW_TEMPLATES[3].stages,
    documents: [
      { id: 'doc-pet-01', caseId: 'case-fc-008', name: 'Divorce Petition & Marriage Certificate', type: 'Petition', uploadedDate: '2026-06-01', uploadedBy: 'Adv. Maya Kulkarni', status: 'Uploaded', size: '3.5 MB' }
    ],
    hearings: [
      {
        id: 'h4',
        caseId: 'case-fc-008',
        caseNumber: 'FC-2026-008',
        caseTitle: 'Ananya Sharma vs Rohit Sharma',
        date: '2026-09-20',
        time: '11:00 AM',
        court: 'Mediation Room B, Family Court',
        purpose: 'Final Reconciliation & Maintenance Terms Session',
        requiredDocuments: ['Income Tax Returns', 'Bank Statements', 'Mediation Terms Draft'],
        participants: ['Ananya Sharma', 'Rohit Sharma', 'Mediator Mrs. S. Rao'],
        status: 'Scheduled'
      }
    ],
    deadlines: [
      {
        id: 'd4',
        caseId: 'case-fc-008',
        caseNumber: 'FC-2026-008',
        caseTitle: 'Ananya Sharma vs Rohit Sharma',
        dueDate: '2026-09-20',
        daysRemaining: 12,
        type: 'Court Filing',
        status: 'Upcoming',
        suggestedAction: 'Finalize financial disclosure affidavit for interim alimony hearing.'
      }
    ],
    nextAction: {
      currentStage: 'Mandatory Counselling & Mediation',
      currentState: 'Mediation Session Active',
      conditions: ['Mediation referred: YES', 'Settlement proposal: PENDING'],
      suggestedAction: 'Attend 3rd mediation session; if non-settlement report is submitted by mediator, prepare trial affidavit in chief.',
      actionCategory: 'Hearing Prep',
      priority: 'Medium',
      disclaimer: 'Family law procedural guidance.'
    }
  },
  {
    id: 'case-cc-014',
    caseNumber: 'CC-2026-014',
    title: 'Kapoor vs SmartTech Electronics',
    category: 'Consumer',
    caseType: 'Consumer Complaint',
    proceduralRoute: 'Consumer Protection Act Sec 35 Redressal',
    currentState: 'Admitted - Opposite Party Version Awaited',
    applicableLaw: 'Consumer Protection Act, 2019',
    applicableSection: 'Section 35 (Manner of Complaint)',
    court: 'District Consumer Disputes Redressal Commission',
    jurisdiction: 'District Commission Bench 1',
    filingDate: '2026-07-22',
    assignedLawyer: 'Adv. Alok Nanda',
    priority: 'Low',
    status: 'Active',
    currentStage: 'Written Version / Response',
    summary: 'Complaint for defective home appliances and deficiency of service claiming ₹3,50,000 refund and compensation.',
    nextHearingDate: '2026-09-22',
    nextHearingPurpose: 'Admission & Reply Verification Hearing',
    parties: [
      { id: 'p40', name: 'Vikram Kapoor', role: 'Complainant', contact: '+91 99870 12345' },
      { id: 'p41', name: 'SmartTech Electronics Ltd', role: 'Respondent', contact: '+91 22 6677 8899' }
    ],
    timeline: [
      { id: 'e40', type: 'Complaint Filed', group: 'Case Initiation', date: '2026-07-22', description: 'Consumer complaint filed under Sec 35 CPA with purchase invoices.', responsiblePerson: 'Adv. Alok Nanda' }
    ],
    workflow: WORKFLOW_TEMPLATES[4].stages,
    documents: [
      { id: 'doc-cc-01', caseId: 'case-cc-014', name: 'Consumer Complaint & Warranty Receipts', type: 'Complaint', uploadedDate: '2026-07-22', uploadedBy: 'Adv. Alok Nanda', status: 'Uploaded', size: '2.1 MB' }
    ],
    hearings: [
      {
        id: 'h5',
        caseId: 'case-cc-014',
        caseNumber: 'CC-2026-014',
        caseTitle: 'Kapoor vs SmartTech Electronics',
        date: '2026-09-22',
        time: '03:00 PM',
        court: 'Consumer Forum Hall 1',
        purpose: 'Defense Written Version Examination',
        requiredDocuments: ['Job Sheets', 'Technical Inspection Report'],
        participants: ['Adv. Alok Nanda', 'SmartTech Legal Officer'],
        status: 'Scheduled'
      }
    ],
    deadlines: [
      {
        id: 'd5',
        caseId: 'case-cc-014',
        caseNumber: 'CC-2026-014',
        caseTitle: 'Kapoor vs SmartTech Electronics',
        dueDate: '2026-09-22',
        daysRemaining: 14,
        type: 'Response Filing',
        status: 'Upcoming',
        suggestedAction: 'Verify opposite party written version service and prepare rejoinder affidavit.'
      }
    ],
    nextAction: {
      currentStage: 'Written Version / Response',
      currentState: 'Notice Served - Reply Awaited',
      conditions: ['Admitted: YES', 'Notice delivered: YES'],
      suggestedAction: 'Review technical inspection report submitted by manufacturer.',
      actionCategory: 'Evidence Prep',
      priority: 'Low',
      disclaimer: 'Consumer forum procedural guidance.'
    }
  },
  {
    id: 'case-const-005',
    caseNumber: 'WP-2026-005',
    title: 'Dr. Meera Nambiar vs Union of India & Ors',
    category: 'Constitutional',
    caseType: 'Writ Petition',
    proceduralRoute: 'High Court Article 226 Division Bench Proceedings',
    currentState: 'State Counter Affidavit Pending',
    applicableLaw: 'Constitution of India, 1950',
    applicableSection: 'Article 226 (Writ of Mandamus)',
    court: 'High Court of Judicature at Bombay',
    jurisdiction: 'Division Bench - Constitutional Matters',
    filingDate: '2026-08-25',
    assignedLawyer: 'Adv. Rajesh Verma',
    priority: 'High',
    status: 'Active',
    currentStage: 'Counter Affidavit by State',
    summary: 'Writ Petition challenging arbitrary cancellation of medical research accreditation and seeking Writ of Mandamus against State Medical Council.',
    nextHearingDate: '2026-09-21',
    nextHearingPurpose: 'State Counter Affidavit & Interim Injunction Hearing',
    parties: [
      { id: 'p50', name: 'Dr. Meera Nambiar', role: 'Petitioner', contact: '+91 98440 22110' },
      { id: 'p51', name: 'Union of India through Ministry of Health', role: 'Respondent', contact: '+91 11 2306 1100' },
      { id: 'p52', name: 'State Medical Council', role: 'Respondent', contact: '+91 22 2262 0450' }
    ],
    timeline: [
      { id: 'e50', type: 'Petition Filed', group: 'Case Initiation', date: '2026-08-25', description: 'Urgent Writ Petition filed with stay application.', responsiblePerson: 'Adv. Rajesh Verma' },
      { id: 'e51', type: 'Notice Issued', group: 'Court Proceedings', date: '2026-08-28', description: 'High Court Bench issued notice to respondents returnable in 3 weeks.', responsiblePerson: 'Division Bench Registrar' }
    ],
    workflow: WORKFLOW_TEMPLATES[5].stages,
    documents: [
      { id: 'doc-wp-01', caseId: 'case-const-005', name: 'Writ Petition Draft & Order Copy', type: 'Petition', uploadedDate: '2026-08-25', uploadedBy: 'Adv. Rajesh Verma', status: 'Uploaded', size: '6.8 MB' }
    ],
    hearings: [
      {
        id: 'h6',
        caseId: 'case-const-005',
        caseNumber: 'WP-2026-005',
        caseTitle: 'Dr. Meera Nambiar vs Union of India',
        date: '2026-09-21',
        time: '10:30 AM',
        court: 'High Court Courtroom 3',
        purpose: 'Interim Stay & Counter Affidavit Motion',
        requiredDocuments: ['Writ Copy', 'State Counter Draft', 'Affidavit in Reply'],
        participants: ['Adv. Rajesh Verma', 'Additional Solicitor General'],
        status: 'Scheduled'
      }
    ],
    deadlines: [
      {
        id: 'd6',
        caseId: 'case-const-005',
        caseNumber: 'WP-2026-005',
        caseTitle: 'Dr. Meera Nambiar vs Union of India',
        dueDate: '2026-09-19',
        daysRemaining: 11,
        type: 'Response Filing',
        status: 'Upcoming',
        suggestedAction: 'Serve copy of petitioner rejoinder on Government Pleader prior to Division Bench hearing.'
      }
    ],
    nextAction: {
      currentStage: 'Counter Affidavit by State',
      currentState: 'State Counter Pending',
      conditions: ['Notice served: YES', 'State reply pending: YES'],
      suggestedAction: 'Inspect State counter affidavit and prepare rejoinder on violation of fundamental rights under Article 19(1)(g).',
      actionCategory: 'Filing',
      priority: 'High',
      disclaimer: 'High Court Constitutional Writ guidance.'
    }
  },
  {
    id: 'case-comm-012',
    caseNumber: 'CS-2026-012',
    title: 'Global Tech Solutions vs Horizon Retail Ltd',
    category: 'Commercial',
    caseType: 'Breach of Contract',
    proceduralRoute: 'Commercial Courts Act Expedited Trial',
    currentState: 'Case Management Phase Active',
    applicableLaw: 'Indian Contract Act, 1872 & Commercial Courts Act',
    applicableSection: 'Section 73 (Unliquidated Damages)',
    court: 'Commercial Court, High Court Original Side',
    jurisdiction: 'Commercial Division Bench',
    filingDate: '2026-07-01',
    assignedLawyer: 'Adv. Sunita Rao',
    priority: 'High',
    status: 'Active',
    currentStage: 'Written Statement & Case Management',
    summary: 'Commercial suit claiming ₹2,40,00,000 damages for wrongful termination of enterprise ERP software licensing contract.',
    nextHearingDate: '2026-09-24',
    nextHearingPurpose: 'Case Management Hearing & Trial Schedule Order',
    parties: [
      { id: 'p60', name: 'Global Tech Solutions Inc', role: 'Plaintiff', contact: '+91 80 4100 9900' },
      { id: 'p61', name: 'Horizon Retail Logistics Ltd', role: 'Defendant', contact: '+91 22 6100 8800' }
    ],
    timeline: [
      { id: 'e60', type: 'Settlement Reached', group: 'Hearing & Decision', date: '2026-06-15', description: 'Pre-Institution Mediation under Sec 12A failed (Non-starter report issued).', responsiblePerson: 'DLSA Mediator', resultingState: 'Mediation Failed - Suit Initiated' },
      { id: 'e61', type: 'Complaint Filed', group: 'Case Initiation', date: '2026-07-01', description: 'Commercial suit filed with Statement of Truth and Audit Statements.', responsiblePerson: 'Adv. Sunita Rao' }
    ],
    workflow: WORKFLOW_TEMPLATES[6].stages,
    documents: [
      { id: 'doc-cs-01', caseId: 'case-comm-012', name: 'Commercial Plaint & Master Service Agreement', type: 'Plaint', uploadedDate: '2026-07-01', uploadedBy: 'Adv. Sunita Rao', status: 'Uploaded', size: '12.4 MB' }
    ],
    hearings: [
      {
        id: 'h7',
        caseId: 'case-comm-012',
        caseNumber: 'CS-2026-012',
        caseTitle: 'Global Tech vs Horizon Retail',
        date: '2026-09-24',
        time: '02:00 PM',
        court: 'Commercial Courtroom 12',
        purpose: 'Case Management Hearing under Order XV-A CPC',
        requiredDocuments: ['Admission/Denial Affidavit', 'Issues Draft', 'Witness List'],
        participants: ['Adv. Sunita Rao', 'Adv. Darius Khambata'],
        status: 'Scheduled'
      }
    ],
    deadlines: [
      {
        id: 'd7',
        caseId: 'case-comm-012',
        caseNumber: 'CS-2026-012',
        caseTitle: 'Global Tech vs Horizon Retail',
        dueDate: '2026-09-20',
        daysRemaining: 12,
        type: 'Court Filing',
        status: 'Upcoming',
        suggestedAction: 'File affidavit of admission/denial of defendant documents prior to Case Management hearing.'
      }
    ],
    nextAction: {
      currentStage: 'Written Statement & Case Management',
      currentState: 'Case Management Active',
      conditions: ['WS filed: YES', '120-day limit: ACTIVE', 'Mediation: FAILED'],
      suggestedAction: 'Finalize draft of proposed trial issues and list of corporate technical witnesses.',
      actionCategory: 'Hearing Prep',
      priority: 'High',
      disclaimer: 'Commercial Suit expedited trial procedure.'
    }
  }
];
