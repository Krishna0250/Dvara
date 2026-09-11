import React, { useState } from 'react';
import { Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import type { Case } from '../../types/legal';


interface DeadlinesViewProps {
  cases: Case[];
  onSelectCase: (caseId: string) => void;
}

export const DeadlinesView: React.FC<DeadlinesViewProps> = ({ cases, onSelectCase }) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const allDeadlines = cases.flatMap(c => c.deadlines);

  const filteredDeadlines = allDeadlines.filter(d => 
    filterStatus === 'All' || d.status === filterStatus
  );

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-600" />
            Statutory & Court Deadlines
          </h1>
          <p className="text-xs text-slate-500 font-medium">Monitor statutory notice periods, court response filings, and limitation dates</p>
        </div>
        <div className="flex items-center gap-2">
          {['All', 'Overdue', 'Due Soon', 'Upcoming'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterStatus === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredDeadlines.map((d) => {
          const isOverdue = d.status === 'Overdue';
          return (
            <div 
              key={d.id} 
              className={`legal-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 ${
                isOverdue ? 'border-l-red-600 bg-red-50/20' : 'border-l-amber-500 bg-white'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isOverdue ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {isOverdue ? 'CRITICAL OVERDUE' : `${d.daysRemaining} DAYS REMAINING`}
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {d.caseNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{d.type}</span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900">{d.caseTitle}</h3>
                <p className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  {d.suggestedAction}
                </p>
              </div>

              <button
                onClick={() => onSelectCase(d.caseId)}
                className="self-start md:self-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-all shrink-0 flex items-center gap-1.5"
              >
                <span>Take Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
