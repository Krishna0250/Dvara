import axios from 'axios';
import type { Case, Hearing, Deadline, LegalDocument, Deficiency, AuditLog, JudicialOrder } from '../types/legal';
import { INITIAL_CASES } from '../data/mockData';

const CASE_SERVICE_BASE = 'http://localhost:8081/api/v1';
const CASE_SERVICE_URL = `${CASE_SERVICE_BASE}/cases`;
const WORKFLOW_SERVICE_URL = 'http://localhost:8082/api/v1/workflows';
const HEARING_SERVICE_URL = 'http://localhost:8083/api/v1';
const DOCUMENT_SERVICE_URL = 'http://localhost:8084/api/v1/documents';

const ALL_HEARINGS = INITIAL_CASES.flatMap(c => c.hearings || []);
const ALL_DEADLINES = INITIAL_CASES.flatMap(c => c.deadlines || []);
const ALL_DOCUMENTS = INITIAL_CASES.flatMap(c => c.documents || []);

let currentAuthToken = localStorage.getItem('dvara_jwt') || '';

// Axios interceptor to attach JWT bearer token to every outgoing request
axios.interceptors.request.use((config) => {
  if (currentAuthToken) {
    config.headers.Authorization = `Bearer ${currentAuthToken}`;
  }
  return config;
});

// Helper to fallback to local mock data if backend service is offline
const safeFetch = async <T>(apiCall: () => Promise<T>, fallbackData: T): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    console.warn('Backend API offline or unreachable, falling back to local dataset:', error);
    return fallbackData;
  }
};

export const setAuthTokenForRole = async (role: string) => {
  try {
    const res = await axios.get(`${CASE_SERVICE_BASE}/auth/token?role=${role}`);
    if (res.data?.token) {
      currentAuthToken = res.data.token;
      localStorage.setItem('dvara_jwt', res.data.token);
    }
  } catch {
    // If backend offline, create local HMAC-demo token
    currentAuthToken = `jwt-mock-${role.toLowerCase()}`;
  }
};

export const api = {
  // Case Service APIs
  getCases: async (): Promise<Case[]> => {
    return safeFetch(async () => {
      const res = await axios.get<Case[]>(CASE_SERVICE_URL);
      return res.data;
    }, INITIAL_CASES);
  },

  getCaseById: async (id: string): Promise<Case | undefined> => {
    return safeFetch(async () => {
      const res = await axios.get<Case>(`${CASE_SERVICE_URL}/${id}`);
      return res.data;
    }, INITIAL_CASES.find(c => c.id === id));
  },

  createCase: async (newCase: Partial<Case>): Promise<Case> => {
    return safeFetch(async () => {
      const res = await axios.post<Case>(CASE_SERVICE_URL, newCase);
      return res.data;
    }, newCase as Case);
  },

  updateCaseStage: async (id: string, newStage: string): Promise<Case | undefined> => {
    return safeFetch(async () => {
      const res = await axios.patch<Case>(`${CASE_SERVICE_URL}/${id}/stage`, { newStage });
      return res.data;
    }, undefined);
  },

  // Scrutiny & Deficiency APIs
  getDeficiencies: async (caseId: string): Promise<Deficiency[]> => {
    return safeFetch(async () => {
      const res = await axios.get<Deficiency[]>(`${CASE_SERVICE_URL}/${caseId}/deficiencies`);
      return res.data;
    }, []);
  },

  raiseDeficiency: async (caseId: string, deficiency: Partial<Deficiency>): Promise<Deficiency> => {
    return safeFetch(async () => {
      const res = await axios.post<Deficiency>(`${CASE_SERVICE_URL}/${caseId}/deficiencies`, deficiency);
      return res.data;
    }, deficiency as Deficiency);
  },

  resolveDeficiency: async (deficiencyId: string, remark: string): Promise<Deficiency> => {
    return safeFetch(async () => {
      const res = await axios.patch<Deficiency>(`${CASE_SERVICE_BASE}/deficiencies/${deficiencyId}/resolve`, { remark });
      return res.data;
    }, { id: deficiencyId, remark, status: 'RESOLVED' } as Deficiency);
  },

  // Registration Approval API
  approveRegistration: async (caseId: string, judge: string, courtroom: string): Promise<Case> => {
    return safeFetch(async () => {
      const res = await axios.post<Case>(`${CASE_SERVICE_URL}/${caseId}/register`, { judge, courtroom });
      return res.data;
    }, {} as Case);
  },

  // Audit Logs API
  getAuditLogs: async (caseId: string): Promise<AuditLog[]> => {
    return safeFetch(async () => {
      const res = await axios.get<AuditLog[]>(`${CASE_SERVICE_URL}/${caseId}/audit`);
      return res.data;
    }, []);
  },

  // Hearing & Orders APIs
  getHearings: async (): Promise<Hearing[]> => {
    return safeFetch(async () => {
      const res = await axios.get<Hearing[]>(`${HEARING_SERVICE_URL}/hearings`);
      return res.data;
    }, ALL_HEARINGS);
  },

  getDeadlines: async (): Promise<Deadline[]> => {
    return safeFetch(async () => {
      const res = await axios.get<Deadline[]>(`${HEARING_SERVICE_URL}/deadlines`);
      return res.data;
    }, ALL_DEADLINES);
  },

  getOrders: async (caseId?: string): Promise<JudicialOrder[]> => {
    return safeFetch(async () => {
      const url = caseId ? `${HEARING_SERVICE_URL}/orders?caseId=${caseId}` : `${HEARING_SERVICE_URL}/orders`;
      const res = await axios.get<JudicialOrder[]>(url);
      return res.data;
    }, []);
  },

  createOrder: async (order: Partial<JudicialOrder>): Promise<JudicialOrder> => {
    return safeFetch(async () => {
      const res = await axios.post<JudicialOrder>(`${HEARING_SERVICE_URL}/orders`, order);
      return res.data;
    }, order as JudicialOrder);
  },

  // Document Service APIs
  getDocuments: async (caseId?: string): Promise<LegalDocument[]> => {
    return safeFetch(async () => {
      const url = caseId ? `${DOCUMENT_SERVICE_URL}?caseId=${caseId}` : DOCUMENT_SERVICE_URL;
      const res = await axios.get<LegalDocument[]>(url);
      return res.data;
    }, ALL_DOCUMENTS);
  },

  uploadDocument: async (doc: Partial<LegalDocument>): Promise<LegalDocument> => {
    return safeFetch(async () => {
      const res = await axios.post<LegalDocument>(DOCUMENT_SERVICE_URL, doc);
      return res.data;
    }, doc as LegalDocument);
  },

  // Workflow Service APIs
  getNextAction: async (caseId: string, currentStage?: string, filingStatus?: string) => {
    return safeFetch(async () => {
      const statusParam = filingStatus ? `&filingStatus=${encodeURIComponent(filingStatus)}` : '';
      const res = await axios.get(`${WORKFLOW_SERVICE_URL}/next-action/${caseId}?currentStage=${encodeURIComponent(currentStage || '')}${statusParam}`);
      return res.data;
    }, null);
  }
};
