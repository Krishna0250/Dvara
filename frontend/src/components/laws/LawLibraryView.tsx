import React, { useState } from 'react';
import { BookOpen, Search, ShieldCheck, ArrowRight, Plus } from 'lucide-react';
import type { LawProvision } from '../../types/legal';
import { LAW_PROVISIONS } from '../../data/mockData';

interface LawLibraryViewProps {
  onRegisterCaseFromProvision: (provision: LawProvision) => void;
}

export const LawLibraryView: React.FC<LawLibraryViewProps> = ({ onRegisterCaseFromProvision }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLawType, setSelectedLawType] = useState<string>('All');
  const [selectedVersion, setSelectedVersion] = useState<string>('All');

  const lawTypes = ['All', 'Constitution', 'Central Act', 'Procedural Code', 'Special Statute'];
  const statuteVersions = ['All', 'BNS 2023 (Current)', 'IPC 1860 (Legacy)', 'Active Statute'];

  const filteredProvisions = LAW_PROVISIONS.filter(p => {
    const matchesSearch = 
      p.lawName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sectionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedLawType === 'All' || p.lawType === selectedLawType;
    const matchesVersion = selectedVersion === 'All' || p.statuteVersion === selectedVersion;

    return matchesSearch && matchesType && matchesVersion;
  });

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded border border-indigo-200">
              Corpus Architecture
            </span>
            <span className="text-xs text-slate-500 font-semibold">Indian Statutory & Procedural Law Library</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            Statutes & Provision Corpus
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Search Acts, Articles, and Provisions $\rightarrow$ Auto-maps to Procedural Rulesets & Dynamic Workflows
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Supports BNS/BNSS 2023 & IPC/CrPC Transitional Versions</span>
        </div>
      </div>

      {/* Concept Architecture Flow Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 rounded-xl shadow-md border border-indigo-900/60">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
          <span className="text-slate-400 font-bold uppercase tracking-wider">Concept Pipeline:</span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-indigo-600/80 px-2.5 py-1 rounded text-white font-mono">1. Select Act & Section</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            <span className="bg-indigo-600/80 px-2.5 py-1 rounded text-white font-mono">2. Legal Classification</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            <span className="bg-indigo-600/80 px-2.5 py-1 rounded text-white font-mono">3. Attach Procedural Ruleset</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            <span className="bg-teal-600 px-2.5 py-1 rounded text-white font-bold font-mono">4. Generate Case Workflow</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Law (e.g., BNS, 138, Murder, Article 226, Contract)..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Law Type:</span>
            {lawTypes.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedLawType(t)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  selectedLawType === t
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Version:</span>
            {statuteVersions.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVersion(v)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  selectedVersion === v
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Provision Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProvisions.map((p) => {
          const isCurrentBNS = p.statuteVersion.includes('Current');
          return (
            <div 
              key={p.id} 
              className="legal-card p-5 space-y-4 hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded border border-indigo-200">
                    {p.sectionNumber}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    isCurrentBNS ? 'bg-teal-100 text-teal-800 border border-teal-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {p.statuteVersion}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{p.lawName} ({p.year})</h3>
                  <p className="text-xs font-bold text-indigo-600 mt-0.5">{p.title}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  {p.description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Mapped Category & Procedure:</span>
                    <span className="font-bold text-slate-800">{p.mappedCategory} • {p.mappedCaseType}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Procedural Ruleset:</span>
                    <span className="font-semibold text-slate-700">{p.procedureName}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onRegisterCaseFromProvision(p)}
                className="mt-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
              >
                <Plus className="w-4 h-4" /> Register Case Under {p.sectionNumber}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
