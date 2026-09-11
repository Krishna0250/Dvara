import React, { useState } from 'react';
import { Calendar, Plus, Search } from 'lucide-react';
import type { Case } from '../../types/legal';


interface HearingsViewProps {
  cases: Case[];
  onSelectCase: (caseId: string) => void;
}

export const HearingsView: React.FC<HearingsViewProps> = ({ cases, onSelectCase }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const allHearings = cases.flatMap(c => c.hearings);

  const filteredHearings = allHearings.filter(h => 
    h.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" />
            Court Hearings Schedule
          </h1>
          <p className="text-xs text-slate-500 font-medium">Calendar & preparation requirements for upcoming trial proceedings</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm">
          <Plus className="w-4 h-4" /> Schedule Hearing
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search hearings by case #, court, purpose..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHearings.map(h => (
          <div key={h.id} className="legal-card p-6 space-y-4 hover:border-indigo-300 transition-all">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded border border-indigo-200">
                  {h.caseNumber}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mt-1">{h.caseTitle}</h3>
              </div>
              <span className="text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded">
                {h.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-medium block">Date & Time:</span>
                <span className="font-bold text-slate-900">{h.date} at {h.time}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-medium block">Court Forum:</span>
                <span className="font-bold text-slate-900 truncate block">{h.court}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-700">Purpose of Hearing: </span>
                <span className="text-slate-800">{h.purpose}</span>
              </div>
              {h.previousOrderSnippet && (
                <div className="p-2.5 bg-indigo-50/60 border border-indigo-100 rounded text-[11px] text-indigo-900">
                  <strong>Previous Order: </strong> {h.previousOrderSnippet}
                </div>
              )}
              <div>
                <span className="font-bold text-slate-700 block mb-1">Required Prep Documents:</span>
                <div className="flex flex-wrap gap-1.5">
                  {h.requiredDocuments.map((doc, idx) => (
                    <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      📄 {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => onSelectCase(h.caseId)}
              className="w-full py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-lg hover:bg-indigo-600 hover:text-white transition-all text-center"
            >
              Inspect Case Workspace
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
