import { useState } from "react";
import { Search, Filter, Plus, Eye } from "lucide-react";
export const CaseListView = ({
  cases,
  onSelectCase,
  onOpenCreateCase
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = ["All", "Criminal", "Civil", "Family", "Consumer", "Special / Statutory"];
  const filteredCases = cases.filter((c) => {
    const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || c.status === selectedStatus;
    const matchesSearch = c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) || c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.court.toLowerCase().includes(searchTerm.toLowerCase()) || c.assignedLawyer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesStatus && matchesSearch;
  });
  return <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Cases Directory</h1>
          <p className="text-sm text-slate-500 font-medium">
            Manage legal proceedings across 5 representative case categories
          </p>
        </div>
        <button
    onClick={onOpenCreateCase}
    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-sm transition-all self-start sm:self-auto"
  >
          <Plus className="w-4 h-4" />
          <span>New Case</span>
        </button>
      </div>

      {
    /* Category Filter Pills */
  }
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Category:
        </span>
        {categories.map((cat) => <button
    key={cat}
    onClick={() => setSelectedCategory(cat)}
    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedCategory === cat ? "bg-slate-900 text-white shadow-xs" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
  >
            {cat}
          </button>)}
      </div>

      {
    /* Search & Status Filter Row */
  }
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by case #, name, lawyer, court..."
    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800"
  />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          {["All", "Active", "Pending", "Disposed"].map((st) => <button
    key={st}
    onClick={() => setSelectedStatus(st)}
    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${selectedStatus === st ? "bg-indigo-100 text-indigo-800 font-bold border border-indigo-200" : "text-slate-600 hover:bg-slate-100"}`}
  >
              {st}
            </button>)}
        </div>
      </div>

      {
    /* Cases Table */
  }
      <div className="legal-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Case ID & Title</th>
                <th className="py-3.5 px-4">Category / Type</th>
                <th className="py-3.5 px-4">Current Stage</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Next Hearing</th>
                <th className="py-3.5 px-4">Assigned Lawyer</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredCases.length > 0 ? filteredCases.map((c) => {
    const badgeClass = c.priority === "High" ? "badge-high" : c.priority === "Medium" ? "badge-medium" : "badge-low";
    return <tr
      key={c.id}
      onClick={() => onSelectCase(c.id)}
      className="hover:bg-indigo-50/40 cursor-pointer transition-colors group"
    >
                      <td className="py-4 px-4 font-medium">
                        <div className="font-mono font-bold text-indigo-600 group-hover:text-indigo-800">
                          {c.caseNumber}
                        </div>
                        <div className="font-bold text-slate-900 text-sm">{c.title}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">{c.court}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-800">{c.category}</div>
                        <div className="text-[11px] text-slate-500">{c.caseType}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                          {c.currentStage}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`legal-badge ${badgeClass}`}>{c.priority}</span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-800">
                        {c.nextHearingDate ? <div>
                            <div>{c.nextHearingDate}</div>
                            <div className="text-[11px] text-slate-400 font-normal">{c.nextHearingPurpose}</div>
                          </div> : <span className="text-slate-400 font-normal">None scheduled</span>}
                      </td>
                      <td className="py-4 px-4 font-medium text-slate-700">
                        {c.assignedLawyer}
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded text-[11px] font-bold">
                          {c.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
      onClick={(e) => {
        e.stopPropagation();
        onSelectCase(c.id);
      }}
      className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-600 hover:text-white transition-all inline-flex items-center gap-1"
    >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>;
  }) : <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No matching cases found for the selected filter parameters.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
