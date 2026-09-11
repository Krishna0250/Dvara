import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Users, 
  GitCommit, 
  Layers, 
  Plus, 
  Building2, 
  CheckCircle2, 
  FileCheck,
  Upload
} from 'lucide-react';
import type { Case } from '../../types/legal';

import { NextActionCard } from '../common/NextActionCard';
import { WorkflowVisualizer } from '../workflow/WorkflowVisualizer';

interface CaseDetailViewProps {
  caseData: Case;
  onBack: () => void;
  onAddEvent: (caseId: string, newEvent: any) => void;
}

export const CaseDetailView: React.FC<CaseDetailViewProps> = ({
  caseData,
  onBack,
  onAddEvent
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'workflow' | 'documents' | 'hearings' | 'parties'>('overview');
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState('Court');
  const [newEventDesc, setNewEventDesc] = useState('');

  const badgeClass = caseData.priority === 'High' ? 'badge-high' : caseData.priority === 'Medium' ? 'badge-medium' : 'badge-low';

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;
    const evt = {
      id: `evt-${Date.now()}`,
      type: newEventTitle,
      category: newEventCategory as any,
      date: new Date().toISOString().split('T')[0],
      description: newEventDesc || 'Event logged by counsel.',
      responsiblePerson: caseData.assignedLawyer
    };
    onAddEvent(caseData.id, evt);
    setNewEventTitle('');
    setNewEventDesc('');
    setShowAddEventModal(false);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Navigation & Case Summary Bar */}
      <div className="flex flex-col gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cases List
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono font-bold text-sm bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded border border-indigo-200">
                {caseData.caseNumber}
              </span>
              <span className="text-xs font-bold text-slate-500">{caseData.category} • {caseData.caseType}</span>
              <span className={`legal-badge ${badgeClass}`}>{caseData.priority} Priority</span>
              <span className="bg-teal-50 text-teal-800 border border-teal-200 text-xs px-2 py-0.5 rounded font-bold">
                {caseData.status}
              </span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {caseData.title}
            </h1>

            <p className="text-xs text-slate-500 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{caseData.court} ({caseData.jurisdiction})</span>
              <span>•</span>
              <span>Counsel: <strong className="text-slate-800">{caseData.assignedLawyer}</strong></span>
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddEventModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Event
            </button>
            <button 
              onClick={() => setActiveTab('documents')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all"
            >
              <Upload className="w-4 h-4 text-slate-500" /> Upload Document
            </button>
            <button 
              onClick={() => setActiveTab('hearings')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all"
            >
              <Calendar className="w-4 h-4 text-slate-500" /> Schedule Hearing
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Next Action Procedural Engine Card */}
      <NextActionCard nextAction={caseData.nextAction} />

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-sm font-bold text-slate-500">
        {[
          { id: 'overview', label: 'Overview', icon: FileText },
          { id: 'timeline', label: `Timeline (${caseData.timeline.length})`, icon: GitCommit },
          { id: 'workflow', label: 'Workflow View', icon: Layers },
          { id: 'documents', label: `Documents (${caseData.documents.length})`, icon: FileCheck },
          { id: 'hearings', label: `Hearings (${caseData.hearings.length})`, icon: Calendar },
          { id: 'parties', label: `Parties (${caseData.parties.length})`, icon: Users },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Status Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="legal-card p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Case Summary & Legal Framework
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {caseData.summary}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div>
                  <span className="text-slate-400 font-medium block">Governing Law:</span>
                  <span className="font-bold text-slate-800">{caseData.applicableLaw}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Filing Date:</span>
                  <span className="font-bold text-slate-800">{caseData.filingDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Jurisdiction:</span>
                  <span className="font-bold text-slate-800">{caseData.jurisdiction}</span>
                </div>
              </div>
            </div>

            {/* Recent Timeline Snapshot */}
            <div className="legal-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Recent Procedural Milestones</h3>
                <button 
                  onClick={() => setActiveTab('timeline')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Full Timeline →
                </button>
              </div>
              <div className="space-y-3">
                {caseData.timeline.slice(-3).reverse().map((evt) => (
                  <div key={evt.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{evt.type}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{evt.date}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{evt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Key Details Sidebar */}
          <div className="space-y-6">
            <div className="legal-card p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Upcoming Hearing Details
              </h3>
              {caseData.hearings.length > 0 ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-lg space-y-1">
                    <p className="font-bold text-indigo-900">{caseData.hearings[0].date} at {caseData.hearings[0].time}</p>
                    <p className="font-semibold text-slate-800">{caseData.hearings[0].purpose}</p>
                    <p className="text-slate-500 text-[11px]">{caseData.hearings[0].court}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Required Documents:</span>
                    <ul className="space-y-1 pl-4 list-disc text-slate-600">
                      {caseData.hearings[0].requiredDocuments.map((doc, idx) => (
                        <li key={idx}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500">No hearings currently scheduled.</p>
              )}
            </div>

            {/* Parties Summary */}
            <div className="legal-card p-6 space-y-3">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Litigating Parties
              </h3>
              <div className="space-y-2 text-xs">
                {caseData.parties.map(p => (
                  <div key={p.id} className="p-2 rounded bg-slate-50 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">{p.name}</span>
                      <span className="text-[10px] text-slate-500">{p.role}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-600">{p.contact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="legal-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Chronological Event Timeline</h2>
              <p className="text-xs text-slate-500">Record of 25 core procedural events, filings, and court orders</p>
            </div>
            <button
              onClick={() => setShowAddEventModal(true)}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700"
            >
              + Log New Event
            </button>
          </div>

          <div className="relative pl-6 space-y-6 border-l-2 border-slate-200">
            {caseData.timeline.map((evt) => (
              <div key={evt.id} className="relative group">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-indigo-100"></div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{evt.type}</span>
                      <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                        {evt.category}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono font-semibold">{evt.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{evt.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60">
                    <span>Logged by: <strong className="text-slate-700">{evt.responsiblePerson}</strong></span>
                    {evt.documentName && (
                      <span className="text-indigo-600 font-semibold flex items-center gap-1">
                        📄 {evt.documentName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workflow View Tab */}
      {activeTab === 'workflow' && (
        <WorkflowVisualizer
          stages={caseData.workflow}
          category={caseData.category}
          caseType={caseData.caseType}
          currentStageName={caseData.currentStage}
        />
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="legal-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">Case Documents Library</h2>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700">
              Upload Document
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseData.documents.map((doc) => (
              <div key={doc.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{doc.name}</span>
                    <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      {doc.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Uploaded {doc.uploadedDate} by {doc.uploadedBy}</p>
                  <p className="text-[11px] text-teal-700 font-semibold">Status: {doc.status} ({doc.size || '1.5 MB'})</p>
                </div>
                <button className="text-xs text-indigo-600 font-bold hover:underline">Download</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hearings Tab */}
      {activeTab === 'hearings' && (
        <div className="legal-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Scheduled Hearings & Prep</h2>
          <div className="space-y-3">
            {caseData.hearings.map((h) => (
              <div key={h.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{h.date} at {h.time}</span>
                  <span className="text-xs font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">{h.status}</span>
                </div>
                <p className="text-xs font-bold text-slate-800">{h.purpose}</p>
                <p className="text-xs text-slate-500">{h.court}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parties Tab */}
      {activeTab === 'parties' && (
        <div className="legal-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Litigating Parties & Contacts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseData.parties.map(p => (
              <div key={p.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{p.role}</span>
                <p className="font-extrabold text-slate-900 text-base">{p.name}</p>
                <p className="text-xs text-slate-500 font-mono">Contact: {p.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 border border-slate-200 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Log Core Procedural Event</h3>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Event Title</label>
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Summons Served, Witness Examined"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={newEventCategory}
                  onChange={(e) => setNewEventCategory(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50"
                >
                  <option value="Case">Case</option>
                  <option value="Court">Court</option>
                  <option value="Investigation">Investigation</option>
                  <option value="Application">Application</option>
                  <option value="Outcome">Outcome</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Event Description</label>
                <textarea
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  placeholder="Enter details of event or order..."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 h-20"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Log Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
