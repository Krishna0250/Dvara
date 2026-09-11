import axios from "axios";
import { INITIAL_CASES } from "../data/mockData";
const CASE_SERVICE_BASE = "http://localhost:8081/api/v1";
const CASE_SERVICE_URL = `${CASE_SERVICE_BASE}/cases`;
const WORKFLOW_SERVICE_URL = "http://localhost:8082/api/v1/workflows";
const HEARING_SERVICE_URL = "http://localhost:8083/api/v1";
const DOCUMENT_SERVICE_URL = "http://localhost:8084/api/v1/documents";
const ALL_HEARINGS = INITIAL_CASES.flatMap((c) => c.hearings || []);
const ALL_DEADLINES = INITIAL_CASES.flatMap((c) => c.deadlines || []);
const ALL_DOCUMENTS = INITIAL_CASES.flatMap((c) => c.documents || []);
let currentAuthToken = localStorage.getItem("dvara_jwt") || "";
axios.interceptors.request.use((config) => {
  if (currentAuthToken) {
    config.headers.Authorization = `Bearer ${currentAuthToken}`;
  }
  return config;
});
const safeFetch = async (apiCall, fallbackData) => {
  try {
    return await apiCall();
  } catch (error) {
    console.warn("Backend API offline or unreachable, falling back to local dataset:", error);
    return fallbackData;
  }
};
export const setAuthTokenForRole = async (role) => {
  try {
    const res = await axios.get(`${CASE_SERVICE_BASE}/auth/token?role=${role}`);
    if (res.data?.token) {
      currentAuthToken = res.data.token;
      localStorage.setItem("dvara_jwt", res.data.token);
    }
  } catch {
    currentAuthToken = `jwt-mock-${role.toLowerCase()}`;
  }
};
export const api = {
  // Case Service APIs
  getCases: async () => {
    return safeFetch(async () => {
      const res = await axios.get(CASE_SERVICE_URL);
      return res.data;
    }, INITIAL_CASES);
  },
  getCaseById: async (id) => {
    return safeFetch(async () => {
      const res = await axios.get(`${CASE_SERVICE_URL}/${id}`);
      return res.data;
    }, INITIAL_CASES.find((c) => c.id === id));
  },
  createCase: async (newCase) => {
    return safeFetch(async () => {
      const res = await axios.post(CASE_SERVICE_URL, newCase);
      return res.data;
    }, newCase);
  },
  updateCaseStage: async (id, newStage) => {
    return safeFetch(async () => {
      const res = await axios.patch(`${CASE_SERVICE_URL}/${id}/stage`, { newStage });
      return res.data;
    }, void 0);
  },
  // Scrutiny & Deficiency APIs
  getDeficiencies: async (caseId) => {
    return safeFetch(async () => {
      const res = await axios.get(`${CASE_SERVICE_URL}/${caseId}/deficiencies`);
      return res.data;
    }, []);
  },
  raiseDeficiency: async (caseId, deficiency) => {
    return safeFetch(async () => {
      const res = await axios.post(`${CASE_SERVICE_URL}/${caseId}/deficiencies`, deficiency);
      return res.data;
    }, deficiency);
  },
  resolveDeficiency: async (deficiencyId, remark) => {
    return safeFetch(async () => {
      const res = await axios.patch(`${CASE_SERVICE_BASE}/deficiencies/${deficiencyId}/resolve`, { remark });
      return res.data;
    }, { id: deficiencyId, remark, status: "RESOLVED" });
  },
  // Registration Approval API
  approveRegistration: async (caseId, judge, courtroom) => {
    return safeFetch(async () => {
      const res = await axios.post(`${CASE_SERVICE_URL}/${caseId}/register`, { judge, courtroom });
      return res.data;
    }, {});
  },
  // Audit Logs API
  getAuditLogs: async (caseId) => {
    return safeFetch(async () => {
      const res = await axios.get(`${CASE_SERVICE_URL}/${caseId}/audit`);
      return res.data;
    }, []);
  },
  // Hearing & Orders APIs
  getHearings: async () => {
    return safeFetch(async () => {
      const res = await axios.get(`${HEARING_SERVICE_URL}/hearings`);
      return res.data;
    }, ALL_HEARINGS);
  },
  getDeadlines: async () => {
    return safeFetch(async () => {
      const res = await axios.get(`${HEARING_SERVICE_URL}/deadlines`);
      return res.data;
    }, ALL_DEADLINES);
  },
  getOrders: async (caseId) => {
    return safeFetch(async () => {
      const url = caseId ? `${HEARING_SERVICE_URL}/orders?caseId=${caseId}` : `${HEARING_SERVICE_URL}/orders`;
      const res = await axios.get(url);
      return res.data;
    }, []);
  },
  createOrder: async (order) => {
    return safeFetch(async () => {
      const res = await axios.post(`${HEARING_SERVICE_URL}/orders`, order);
      return res.data;
    }, order);
  },
  // Document Service APIs
  getDocuments: async (caseId) => {
    return safeFetch(async () => {
      const url = caseId ? `${DOCUMENT_SERVICE_URL}?caseId=${caseId}` : DOCUMENT_SERVICE_URL;
      const res = await axios.get(url);
      return res.data;
    }, ALL_DOCUMENTS);
  },
  uploadDocument: async (doc) => {
    return safeFetch(async () => {
      const res = await axios.post(DOCUMENT_SERVICE_URL, doc);
      return res.data;
    }, doc);
  },
  // Workflow Service APIs
  getNextAction: async (caseId, currentStage, filingStatus) => {
    return safeFetch(async () => {
      const statusParam = filingStatus ? `&filingStatus=${encodeURIComponent(filingStatus)}` : "";
      const res = await axios.get(`${WORKFLOW_SERVICE_URL}/next-action/${caseId}?currentStage=${encodeURIComponent(currentStage || "")}${statusParam}`);
      return res.data;
    }, null);
  }
};
