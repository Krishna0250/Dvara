import {
  Briefcase,
  Calendar,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  FileCheck,
  Building2
} from "lucide-react";
export const DashboardView = ({
  cases,
  onSelectCase,
  onOpenCreateCase,
  onNavigateTab
}) => {
  const activeCasesCount = cases.filter((c) => c.status === "Active").length + 40;
  const hearingsThisWeek = 12;
  const deadlinesCount = 7;
  const actionRequiredCount = 9;
  const allHearings = cases.flatMap((c) => c.hearings);
  const allDeadlines = cases.flatMap((c) => c.deadlines);
  return <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {
    /* Welcome Banner */
  }
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Good morning, Advocate
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Here's what needs your attention today across your active matters.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
    onClick={() => onNavigateTab("cases")}
    className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
  >
            View All Cases (42)
          </button>
          <button
    onClick={onOpenCreateCase}
    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all"
  >
            + Create New Case
          </button>
        </div>
      </div>

      {
    /* KPI Stats Grid */
  }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="legal-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Cases</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{activeCasesCount}</h3>
            <p className="text-[11px] text-teal-600 font-medium mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +3 added this month
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="legal-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hearings This Week</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{hearingsThisWeek}</h3>
            <p className="text-[11px] text-slate-500 font-medium mt-1">3 scheduled today</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="legal-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Upcoming Deadlines</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{deadlinesCount}</h3>
            <p className="text-[11px] text-amber-600 font-medium mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> 1 urgent statutory notice
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="legal-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Action Required</p>
            <h3 className="text-3xl font-black text-indigo-600 mt-1">{actionRequiredCount}</h3>
            <p className="text-[11px] text-indigo-700 font-medium mt-1">Requires procedural step</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {
    /* Today's Priorities Section */
  }
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Today's Priorities</h2>
            <p className="text-xs text-slate-500">Representative case matters requiring workflow decisions</p>
          </div>
          <button
    onClick={() => onNavigateTab("cases")}
    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
  >
            View all priority cases <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.slice(0, 4).map((c) => {
    const badgeClass = c.priority === "High" ? "badge-high" : c.priority === "Medium" ? "badge-medium" : "badge-low";
    return <div
      key={c.id}
      onClick={() => onSelectCase(c.id)}
      className="legal-card p-5 cursor-pointer hover:border-indigo-300 transition-all flex flex-col justify-between gap-4 group"
    >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-indigo-600 font-mono bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {c.caseNumber}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">{c.category} • {c.caseType}</span>
                      <span className={`legal-badge ${badgeClass}`}>{c.priority}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-base">
                    {c.title}
                  </h3>

                  <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-medium block">Current Stage:</span>
                      <span className="font-semibold text-slate-800">{c.currentStage}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">Next Hearing / Deadline:</span>
                      <span className="font-semibold text-slate-800">{c.nextHearingDate || "No date set"}</span>
                    </div>
                  </div>
                </div>

                {
      /* Micro Next Action Preview */
    }
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 flex items-start gap-2 text-xs">
                  <ChevronRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Next Action: </span>
                    <span className="text-slate-700">{c.nextAction.suggestedAction}</span>
                  </div>
                </div>
              </div>;
  })}
        </div>
      </div>

      {
    /* Grid Split: Upcoming Hearings & Approaching Deadlines */
  }
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {
    /* Hearings Widget */
  }
        <div className="legal-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-base">Upcoming Court Hearings</h3>
            </div>
            <button
    onClick={() => onNavigateTab("hearings")}
    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
  >
              Calendar View →
            </button>
          </div>

          <div className="space-y-3">
            {allHearings.map((h) => <div key={h.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100/80 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{h.date} at {h.time}</span>
                    <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                      {h.caseNumber}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">{h.caseTitle}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" /> {h.court} • Purpose: {h.purpose}
                  </p>
                </div>
                <button
    onClick={() => onSelectCase(h.caseId)}
    className="px-2.5 py-1 text-xs font-semibold text-indigo-600 bg-white border border-indigo-200 rounded hover:bg-indigo-50"
  >
                  View Case
                </button>
              </div>)}
          </div>
        </div>

        {
    /* Deadlines Widget */
  }
        <div className="legal-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-base">Critical Statutory Deadlines</h3>
            </div>
            <button
    onClick={() => onNavigateTab("deadlines")}
    className="text-xs font-semibold text-amber-600 hover:text-amber-800"
  >
              All Deadlines →
            </button>
          </div>

          <div className="space-y-3">
            {allDeadlines.map((d) => <div key={d.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${d.status === "Overdue" ? "bg-red-100 text-red-800 border border-red-200" : "bg-amber-100 text-amber-800 border border-amber-200"}`}>
                      {d.daysRemaining === 0 ? "DUE TODAY" : `${d.daysRemaining} days remaining`}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600">{d.caseNumber}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{d.type}: {d.caseTitle}</p>
                  <p className="text-[11px] text-slate-600">{d.suggestedAction}</p>
                </div>
                <button
    onClick={() => onSelectCase(d.caseId)}
    className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-100 shrink-0"
  >
                  Inspect
                </button>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
