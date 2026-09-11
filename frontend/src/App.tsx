import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { CaseListView } from './components/cases/CaseListView';
import { CaseDetailView } from './components/cases/CaseDetailView';
import { CreateCaseWizard } from './components/cases/CreateCaseWizard';
import { HearingsView } from './components/hearings/HearingsView';
import { DeadlinesView } from './components/deadlines/DeadlinesView';
import { DocumentsView } from './components/documents/DocumentsView';
import { NextActionEngineView } from './components/workflow/NextActionEngineView';
import { LawLibraryView } from './components/laws/LawLibraryView';
import { INITIAL_CASES } from './data/mockData';
import type { Case } from './types/legal';

export const App: React.FC = () => {
  const [cases, setCases] = useState<Case[]>(INITIAL_CASES);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [isCreatingCase, setIsCreatingCase] = useState<boolean>(false);

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setIsCreatingCase(false);
  };

  const handleCreateCase = (newCase: Case) => {
    setCases([newCase, ...cases]);
    setIsCreatingCase(false);
    setSelectedCaseId(newCase.id);
  };

  const handleAddEventToCase = (caseId: string, newEvent: any) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          timeline: [...c.timeline, newEvent]
        };
      }
      return c;
    }));
  };

  const activeCaseData = cases.find(c => c.id === selectedCaseId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row antialiased font-sans text-slate-900">
      {/* Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedCaseId(null);
        setIsCreatingCase(false);
      }} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        <Header 
          onOpenCreateCase={() => {
            setIsCreatingCase(true);
            setSelectedCaseId(null);
          }}
          onSelectCase={handleSelectCase}
          cases={cases}
        />

        <main className="flex-1 pb-16">
          {isCreatingCase ? (
            <CreateCaseWizard 
              onCancel={() => setIsCreatingCase(false)} 
              onCreateCase={handleCreateCase} 
            />
          ) : selectedCaseId && activeCaseData ? (
            <CaseDetailView 
              caseData={activeCaseData} 
              onBack={() => setSelectedCaseId(null)}
              onAddEvent={handleAddEventToCase}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardView 
                  cases={cases} 
                  onSelectCase={handleSelectCase} 
                  onOpenCreateCase={() => setIsCreatingCase(true)}
                  onNavigateTab={(t) => setActiveTab(t)}
                />
              )}
              {activeTab === 'laws' && (
                <LawLibraryView 
                  onRegisterCaseFromProvision={(_provision) => {
                    setIsCreatingCase(true);
                  }}
                />
              )}
              {activeTab === 'cases' && (
                <CaseListView 
                  cases={cases} 
                  onSelectCase={handleSelectCase} 
                  onOpenCreateCase={() => setIsCreatingCase(true)} 
                />
              )}
              {activeTab === 'hearings' && (
                <HearingsView cases={cases} onSelectCase={handleSelectCase} />
              )}
              {activeTab === 'deadlines' && (
                <DeadlinesView cases={cases} onSelectCase={handleSelectCase} />
              )}
              {activeTab === 'documents' && (
                <DocumentsView cases={cases} onSelectCase={handleSelectCase} />
              )}
              {activeTab === 'next-action' && (
                <NextActionEngineView cases={cases} onSelectCase={handleSelectCase} />
              )}
              {activeTab === 'parties' && (
                <div className="p-8 max-w-[1600px] mx-auto space-y-6">
                  <h1 className="text-2xl font-black text-slate-900">Litigating Parties Directory</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cases.flatMap(c => c.parties).map((p, idx) => (
                      <div key={idx} className="legal-card p-5 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">
                          {p.role}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base">{p.name}</h3>
                        <p className="text-xs text-slate-500 font-mono">Contact: {p.contact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
