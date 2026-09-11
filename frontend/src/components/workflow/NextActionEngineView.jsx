import { Compass, ShieldCheck } from "lucide-react";
import { NextActionCard } from "../common/NextActionCard";
export const NextActionEngineView = ({ cases, onSelectCase }) => {
  return <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-indigo-600" />
            Next Procedural Action Engine
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Rule-based workflow engine matching case state, events, deadlines, and conditions to standard procedural steps
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Workflow Management Guidance (Not AI Legal Advice)</span>
        </div>
      </div>

      <div className="space-y-6">
        {cases.map((c) => <div key={c.id} className="legal-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono font-bold text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded border border-indigo-200 mr-2">
                  {c.caseNumber}
                </span>
                <span className="text-xs font-bold text-slate-500">{c.category} • {c.caseType}</span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">{c.title}</h3>
              </div>
              <button
    onClick={() => onSelectCase(c.id)}
    className="px-3.5 py-1.5 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 self-start sm:self-auto"
  >
                Inspect Case Flow →
              </button>
            </div>

            <NextActionCard nextAction={c.nextAction} onExecuteAction={() => onSelectCase(c.id)} />
          </div>)}
      </div>
    </div>;
};
