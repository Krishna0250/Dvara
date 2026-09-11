import React, { useState } from 'react';
import { Search, Bell, Plus, PlayCircle, ShieldCheck, ChevronDown } from 'lucide-react';
import type { Case, UserRole } from '../../types/legal';

interface HeaderProps {
  onOpenCreateCase: () => void;
  onSelectCase: (caseId: string) => void;
  cases: Case[];
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreateCase, onSelectCase, cases, currentRole, onRoleChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const filteredCases = cases.filter(c => 
    c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.caseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10 shadow-xs">
      {/* Search Bar */}
      <div className="relative w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by case #, party, law, court..."
          className="block w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
        />
        {searchQuery && (
          <div className="absolute left-0 right-0 top-11 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-30 max-h-64 overflow-y-auto">
            {filteredCases.length > 0 ? (
              filteredCases.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCase(c.id);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-0"
                >
                  <div>
                    <span className="font-semibold text-xs text-indigo-600 mr-2">{c.caseNumber}</span>
                    <span className="text-sm font-medium text-slate-800">{c.title}</span>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{c.caseType}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-xs text-slate-500">No matching cases found</div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls & Demo Scenarios */}
      <div className="flex items-center gap-3">
        {/* Quick Demo Scenario Switcher Button */}
        <div className="relative">
          <button
            onClick={() => setShowDemoMenu(!showDemoMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-all shadow-2xs"
          >
            <PlayCircle className="w-4 h-4 text-amber-600" />
            <span>Demo Scenarios</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-700" />
          </button>

          {showDemoMenu && (
            <div className="absolute right-0 top-10 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-30 space-y-1">
              <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Case Type Presentation
              </div>
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCase(c.id);
                    setShowDemoMenu(false);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-indigo-50/80 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">{c.caseNumber}</div>
                    <div className="text-[11px] text-slate-500">{c.caseType} ({c.category})</div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {c.currentStage}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50/70 text-indigo-950 text-xs font-semibold hover:bg-indigo-100 transition-all shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Role: <strong className="text-indigo-700">{currentRole}</strong></span>
            <ChevronDown className="w-3.5 h-3.5 text-indigo-600" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 top-10 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-30 space-y-1">
              <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Switch Active Persona / RBAC
              </div>
              {[
                { role: 'JUDGE' as UserRole, name: "Hon'ble Justice Sikri", badge: 'Judge / Bench' },
                { role: 'REGISTRAR' as UserRole, name: 'Registrar Deshmukh', badge: 'Court Admin' },
                { role: 'SCRUTINY_OFFICER' as UserRole, name: 'Officer Priya Nair', badge: 'Filing Audit' },
                { role: 'ADVOCATE' as UserRole, name: 'Adv. Rajesh Verma', badge: 'Legal Counsel' },
                { role: 'CITIZEN' as UserRole, name: 'Rohan Kumar', badge: 'Litigant' },
              ].map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    onRoleChange(r.role);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex items-center justify-between group ${
                    currentRole === r.role ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{r.name}</div>
                    <div className={`text-[10px] ${currentRole === r.role ? 'text-indigo-100' : 'text-slate-500'}`}>{r.badge}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    currentRole === r.role ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {r.role}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* New Case CTA */}
        <button
          onClick={onOpenCreateCase}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>New Case</span>
        </button>
      </div>
    </header>
  );
};
