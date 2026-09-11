import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, FileText, Send, UserCheck, Scale, ArrowRight } from 'lucide-react';
import type { Case, Deficiency, UserRole } from '../../types/legal';
import { api } from '../../api/apiClient';

interface ScrutinyViewProps {
  cases: Case[];
  currentRole: UserRole;
  onRefreshCases: () => void;
  onSelectCase: (caseId: string) => void;
}

export const ScrutinyView: React.FC<ScrutinyViewProps> = ({ cases, currentRole, onRefreshCases, onSelectCase }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [deficiencies, setDeficiencies] = useState<Deficiency[]>([]);
  const [loading, setLoading] = useState(false);

  // Raise Deficiency State
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [reason, setReason] = useState('');

  // Resolve Deficiency State
  const [resolveRemark, setResolveRemark] = useState('');
  const [activeDefId, setActiveDefId] = useState<string | null>(null);

  // Registration State
  const [assignedJudge, setAssignedJudge] = useState("Hon'ble Justice A. K. Sikri");
  const [assignedCourtroom, setAssignedCourtroom] = useState("Court Hall 3, Division I");

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  useEffect(() => {
    if (selectedCaseId) {
      loadDeficiencies(selectedCaseId);
    }
  }, [selectedCaseId]);

  const loadDeficiencies = async (caseId: string) => {
    setLoading(true);
    const data = await api.getDeficiencies(caseId);
    setDeficiencies(data);
    setLoading(false);
  };

  const handleRaiseDeficiency = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle || !reason || !selectedCaseId) return;

    await api.raiseDeficiency(selectedCaseId, {
      documentTitle: docTitle,
      reason,
      raisedBy: currentRole === 'SCRUTINY_OFFICER' ? 'Officer Priya Nair' : 'Court Clerk',
    });

    setDocTitle('');
    setReason('');
    setShowRaiseModal(false);
    loadDeficiencies(selectedCaseId);
    onRefreshCases();
  };

  const handleResolveDeficiency = async (defId: string) => {
    if (!resolveRemark) return;
    await api.resolveDeficiency(defId, resolveRemark);
    setResolveRemark('');
    setActiveDefId(null);
    loadDeficiencies(selectedCaseId);
    onRefreshCases();
  };

  const handleApproveRegistration = async () => {
    if (!selectedCaseId) return;
    await api.approveRegistration(selectedCaseId, assignedJudge, assignedCourtroom);
    onRefreshCases();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-indigo-900/50">
        <div>
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-indigo-400" />
            <span>Procedural Scrutiny & Deficiency Audit Console</span>
          </div>
          <h1 className="text-2xl font-black text-white">Registry Scrutiny & Registration Queue</h1>
          <p className="text-slate-300 text-xs mt-1 max-w-2xl">
            Inspect incoming electronic petitions, raise statutory compliance deficiencies, manage document re-submissions, and officially issue registered Case Numbers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-indigo-900/60 border border-indigo-700/50 px-3 py-2 rounded-xl text-center">
            <span className="text-[10px] text-indigo-300 font-bold block uppercase">Active Persona</span>
            <span className="text-xs font-black text-emerald-400">{currentRole}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Case Queue */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">Petitions Pending Review</h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {cases.map((c) => {
              const isSelected = c.id === selectedCaseId;
              const status = c.filingStatus || (c.status === 'Active' ? 'REGISTERED' : 'SUBMITTED');
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-indigo-700">{c.filingId || c.caseNumber}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      status === 'DEFICIENT'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : status === 'REGISTERED'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {status}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{c.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-1">{c.caseType} • {c.court}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Scrutiny & Deficiency Workspace */}
        {selectedCase && (
          <div className="lg:col-span-8 space-y-6">
            {/* Case Header Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                      {selectedCase.filingId || 'FL-2026-PENDING'}
                    </span>
                    {selectedCase.caseNumber && (
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {selectedCase.caseNumber}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedCase.title}</h2>
                  <p className="text-xs text-slate-500">{selectedCase.caseType} | Filed on {selectedCase.filingDate}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectCase(selectedCase.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Filing Status:</span>
                  <span className="text-xs font-bold text-indigo-800 bg-white px-2.5 py-1 rounded-md border border-slate-300">
                    {selectedCase.filingStatus || 'UNDER_SCRUTINY'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {(currentRole === 'SCRUTINY_OFFICER' || currentRole === 'ADMIN') && (
                    <button
                      onClick={() => setShowRaiseModal(true)}
                      className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs transition-all"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Raise Deficiency</span>
                    </button>
                  )}

                  {(currentRole === 'REGISTRAR' || currentRole === 'ADMIN') && selectedCase.filingStatus !== 'REGISTERED' && (
                    <button
                      onClick={handleApproveRegistration}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Registration</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Registration Config Modal / Controls if Registrar */}
              {(currentRole === 'REGISTRAR' || currentRole === 'ADMIN') && selectedCase.filingStatus !== 'REGISTERED' && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>Registrar Bench & Judicial Assignment</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Assign Presiding Judge</label>
                      <input
                        type="text"
                        value={assignedJudge}
                        onChange={(e) => setAssignedJudge(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Assign Courtroom / Hall</label>
                      <input
                        type="text"
                        value={assignedCourtroom}
                        onChange={(e) => setAssignedCourtroom(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Deficiencies List Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-bold text-slate-900">Statutory Deficiencies ({deficiencies.length})</h3>
                </div>
              </div>

              {loading ? (
                <div className="p-8 text-center text-xs text-slate-400">Loading audit deficiencies...</div>
              ) : deficiencies.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  No open procedural deficiencies found for this petition. Ready for registration approval.
                </div>
              ) : (
                <div className="space-y-3">
                  {deficiencies.map((def) => (
                    <div
                      key={def.id}
                      className={`p-4 rounded-xl border transition-all ${
                        def.status === 'OPEN'
                          ? 'border-rose-200 bg-rose-50/40'
                          : 'border-emerald-200 bg-emerald-50/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{def.documentTitle || 'Filing Document'}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              def.status === 'OPEN' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {def.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 mt-1 font-medium">{def.reason}</p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Raised by {def.raisedBy} on {new Date(def.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Remark / Resolution Box */}
                      {def.remark && (
                        <div className="mt-3 p-2.5 bg-white/80 border border-slate-200 rounded-lg text-xs text-slate-700">
                          <span className="font-bold text-slate-900">Resolution Remark: </span>
                          {def.remark}
                        </div>
                      )}

                      {/* Resolve Controls for Advocate/Citizen */}
                      {def.status === 'OPEN' && (currentRole === 'ADVOCATE' || currentRole === 'CITIZEN' || currentRole === 'ADMIN') && (
                        <div className="mt-3 pt-3 border-t border-rose-200 space-y-2">
                          {activeDefId === def.id ? (
                            <div className="space-y-2">
                              <textarea
                                value={resolveRemark}
                                onChange={(e) => setResolveRemark(e.target.value)}
                                placeholder="Describe action taken or certified document re-upload URL..."
                                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500"
                                rows={2}
                              />
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => setActiveDefId(null)}
                                  className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleResolveDeficiency(def.id)}
                                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                                >
                                  <Send className="w-3 h-3" />
                                  Submit Resolution
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setActiveDefId(def.id)}
                              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Respond & Submit Re-uploaded Document</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Raise Deficiency */}
      {showRaiseModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-bold text-slate-900">Raise Scrutiny Deficiency</h3>
              </div>
              <button
                onClick={() => setShowRaiseModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRaiseDeficiency} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bank Dishonour Memo, Address Proof, Power of Attorney"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deficiency Reason & Compliance Direction</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Specify why document is deficient and instructions for advocate re-submission..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRaiseModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Confirm & Raise Deficiency
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
