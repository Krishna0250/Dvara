export type CaseCategory = 
  | 'Criminal' 
  | 'Civil' 
  | 'Family' 
  | 'Consumer' 
  | 'Special / Statutory' 
  | 'Constitutional'
  | 'Commercial'
  | 'Arbitration / ADR';

export type CaseType = 
  | 'Murder' 
  | 'Financial Fraud'
  | 'Property Dispute' 
  | 'Partition Suit'
  | 'Breach of Contract'
  | 'Cheque Dishonour' 
  | 'Divorce' 
  | 'Child Custody'
  | 'Consumer Complaint'
  | 'Writ Petition'
  | 'Arbitration Challenge';

export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type CaseStatus = 'Active' | 'Pending' | 'Disposed' | 'Appealed' | 'Execution';
export type StageStatus = 'completed' | 'current' | 'upcoming' | 'skipped';

export type EventGroup = 
  | 'Case Initiation' 
  | 'Investigation & Inquiry' 
  | 'Accused & Respondent' 
  | 'Court Proceedings' 
  | 'Evidence & Trial' 
  | 'Hearing & Decision' 
  | 'Post-Judgment & Appeal' 
  | 'Case Closure';

export type LawType = 
  | 'Constitution' 
  | 'Central Act' 
  | 'State Act' 
  | 'Procedural Code' 
  | 'Special Statute' 
  | 'Rule / Regulation';

export interface LawProvision {
  id: string;
  lawName: string;
  lawType: LawType;
  year: number;
  sectionNumber: string;
  title: string;
  description: string;
  effectiveDate: string;
  statuteVersion: 'BNS 2023 (Current)' | 'IPC 1860 (Legacy)' | 'BNSS 2023 (Current)' | 'CrPC 1973 (Legacy)' | 'CPC 1908' | 'Active Statute';
  mappedCategory: CaseCategory;
  mappedCaseType: CaseType;
  procedureName: string;
  defaultCourt: string;
}

export interface CoreEvent {
  id: string;
  type: string;
  group: EventGroup;
  category?: string;
  date: string;
  description: string;
  responsiblePerson: string;
  resultingState?: string;
  documentId?: string;
  documentName?: string;
}


export interface ConditionalBranch {
  condition: string;
  label: string;
  targetStageId: string;
}

export interface WorkflowStage {
  id: string;
  title: string;
  description: string;
  status: StageStatus;
  isConditional?: boolean;
  branches?: ConditionalBranch[];
  requiredDocuments?: string[];
  estimatedDays?: number;
}

export interface WorkflowTemplate {
  id: string;
  category: CaseCategory;
  caseType: CaseType;
  name: string;
  description: string;
  stages: WorkflowStage[];
}

export interface Party {
  id: string;
  name: string;
  role: 'Complainant' | 'Accused' | 'Plaintiff' | 'Defendant' | 'Petitioner' | 'Respondent' | 'Witness' | 'Lawyer';
  contact: string;
  email?: string;
}

export interface LegalDocument {
  id: string;
  caseId: string;
  name: string;
  type: 'FIR' | 'Complaint' | 'Notice' | 'Court Order' | 'Evidence' | 'Witness Statement' | 'Charge-sheet' | 'Judgment' | 'Plaint' | 'Petition' | 'Other';
  uploadedDate: string;
  uploadedBy: string;
  status: 'Uploaded' | 'Pending' | 'Verified' | 'Rejected';
  relatedEvent?: string;
  size?: string;
}

export interface Hearing {
  id: string;
  caseId: string;
  caseNumber: string;
  caseTitle: string;
  date: string;
  time: string;
  court: string;
  purpose: string;
  previousOrderSnippet?: string;
  requiredDocuments: string[];
  participants: string[];
  status: 'Scheduled' | 'Completed' | 'Adjourned' | 'Cancelled';
}

export interface Deadline {
  id: string;
  caseId: string;
  caseNumber: string;
  caseTitle: string;
  dueDate: string;
  daysRemaining: number;
  type: 'Statutory' | 'Court Filing' | 'Response Filing' | 'Payment Period' | 'Document Submission';
  status: 'Overdue' | 'Due Soon' | 'Upcoming' | 'Completed';
  suggestedAction: string;
}

export interface NextActionEngineResult {
  currentStage: string;
  currentState: string;
  conditions: string[];
  suggestedAction: string;
  actionCategory: 'Filing' | 'Notice' | 'Evidence Prep' | 'Hearing Prep' | 'Appeal Check';
  priority: PriorityLevel;
  disclaimer: string;
}

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  category: CaseCategory;
  caseType: CaseType;
  proceduralRoute: string; // e.g. "Police FIR Sessions Trial", "Summary Trial Sec 138", "Commercial Suit Expedited"
  currentState: string;   // e.g. "Accused in Judicial Custody", "Statutory 15-Day Period Expired"
  applicableLaw: string;
  applicableSection?: string;
  court: string;
  jurisdiction: string;
  filingDate: string;
  assignedLawyer: string;
  priority: PriorityLevel;
  status: CaseStatus;
  currentStage: string;
  summary: string;
  nextHearingDate?: string;
  nextHearingPurpose?: string;
  parties: Party[];
  timeline: CoreEvent[];
  workflow: WorkflowStage[];
  documents: LegalDocument[];
  hearings: Hearing[];
  deadlines: Deadline[];
  nextAction: NextActionEngineResult;
}
