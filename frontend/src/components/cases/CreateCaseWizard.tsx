import React, { useState } from 'react';
import { 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  GitBranch,
  Upload
} from 'lucide-react';
import type { CaseCategory, CaseType, PriorityLevel, Case } from '../../types/legal';

import { WORKFLOW_TEMPLATES, LAW_PROVISIONS } from '../../data/mockData';


interface CreateCaseWizardProps {
  onCancel: () => void;
  onCreateCase: (newCase: Case) => void;
}

export const CreateCaseWizard: React.FC<CreateCaseWizardProps> = ({
  onCancel,
  onCreateCase
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [category, setCategory] = useState<CaseCategory>('Criminal');
  const [caseType, setCaseType] = useState<CaseType>('Murder');
  const [applicableLaw, setApplicableLaw] = useState<string>('Section 302 IPC / Section 103 BNSS');
  const [court, setCourt] = useState<string>('Sessions Court, Division I');
  const [jurisdiction] = useState<string>('District Court Jurisdiction');


  const [caseNumber, setCaseNumber] = useState<string>(`CR-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [title, setTitle] = useState<string>('State vs Vivek Kumar');
  const [filingDate, setFilingDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<PriorityLevel>('High');
  const [assignedLawyer, setAssignedLawyer] = useState<string>('Adv. Rajesh Verma');
  const [summary, setSummary] = useState<string>('Criminal trial proceedings initialized under statutory framework.');

  const [complainantName, setComplainantName] = useState<string>('State of Maharashtra');
  const [respondentName, setRespondentName] = useState<string>('Vivek Kumar');

  const [nextHearingDate, setNextHearingDate] = useState<string>('2026-09-25');
  const [nextHearingPurpose, setNextHearingPurpose] = useState<string>('Pre-Trial Scrutiny & Summons Verification');

  // Dynamic Case Type options based on category selection
  const handleCategoryChange = (cat: CaseCategory) => {
    setCategory(cat);
    if (cat === 'Criminal') {
      setCaseType('Murder');
      setApplicableLaw('Section 302 IPC / BNSS');
      setCaseNumber(`CR-2026-${Math.floor(100 + Math.random() * 900)}`);
    } else if (cat === 'Civil') {
      setCaseType('Property Dispute');
      setApplicableLaw('Code of Civil Procedure, 1908');
      setCaseNumber(`CV-2026-${Math.floor(100 + Math.random() * 900)}`);
    } else if (cat === 'Special / Statutory') {
      setCaseType('Cheque Dishonour');
      setApplicableLaw('Section 138 Negotiable Instruments Act');
      setCaseNumber(`NI-2026-${Math.floor(100 + Math.random() * 900)}`);
    } else if (cat === 'Family') {
      setCaseType('Divorce');
      setApplicableLaw('Hindu Marriage Act / Special Marriage Act');
      setCaseNumber(`FC-2026-${Math.floor(100 + Math.random() * 900)}`);
    } else if (cat === 'Consumer') {
      setCaseType('Consumer Complaint');
      setApplicableLaw('Consumer Protection Act, 2019');
      setCaseNumber(`CC-2026-${Math.floor(100 + Math.random() * 900)}`);
    }
  };

  // Get matching template for workflow preview
  const activeTemplate = WORKFLOW_TEMPLATES.find(t => t.caseType === caseType) || WORKFLOW_TEMPLATES[0];

  const handleSubmit = () => {
    const createdCase: Case = {
      id: `case-${Date.now()}`,
      caseNumber,
      title,
      category,
      caseType,
      proceduralRoute: activeTemplate.name,
      currentState: `${activeTemplate.stages[0].title} Active`,
      applicableLaw,
      court,
      jurisdiction,
      filingDate,
      assignedLawyer,
      priority,
      status: 'Active',
      currentStage: activeTemplate.stages[0].title,
      summary,
      nextHearingDate,
      nextHearingPurpose,
      parties: [
        { id: 'p1', name: complainantName, role: 'Complainant', contact: '+91 98000 11223' },
        { id: 'p2', name: respondentName, role: 'Accused', contact: '+91 99000 44556' }
      ],
      timeline: [
        {
          id: `evt-${Date.now()}`,
          type: 'Case Created',
          group: 'Case Initiation',
          date: filingDate,
          description: `Case initialized using ${activeTemplate.name} template.`,
          responsiblePerson: assignedLawyer
        }
      ],
      workflow: activeTemplate.stages,
      documents: [
        {
          id: `doc-${Date.now()}`,
          caseId: caseNumber,
          name: 'Initial Case Filing Document',
          type: 'Complaint',
          uploadedDate: filingDate,
          uploadedBy: assignedLawyer,
          status: 'Uploaded'
        }
      ],
      hearings: [
        {
          id: `h-${Date.now()}`,
          caseId: caseNumber,
          caseNumber,
          caseTitle: title,
          date: nextHearingDate,
          time: '11:00 AM',
          court,
          purpose: nextHearingPurpose,
          requiredDocuments: ['Initial Complaint Copy', 'Filing Fee Voucher'],
          participants: [complainantName, assignedLawyer],
          status: 'Scheduled'
        }
      ],
      deadlines: [],
      nextAction: {
        currentStage: activeTemplate.stages[0].title,
        currentState: `${activeTemplate.stages[0].title} Active`,
        conditions: ['Workflow initialized: YES', 'First stage pending: YES'],
        suggestedAction: `Complete initial ${activeTemplate.stages[0].title} procedure and file supporting documentation.`,
        actionCategory: 'Filing',
        priority,
        disclaimer: 'Generated based on selected workflow template.'
      }
    };


    onCreateCase(createdCase);
  };

  const steps = [
    { num: 1, title: 'Classification' },
    { num: 2, title: 'Information' },
    { num: 3, title: 'Parties' },
    { num: 4, title: 'Dates' },
    { num: 5, title: 'Documents' },
    { num: 6, title: 'Workflow Preview' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Wizard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create New Legal Matter</h1>
          <p className="text-xs text-slate-500 font-medium">Select case classification to automatically attach procedural workflow templates</p>
        </div>
        <button 
          onClick={onCancel}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded border border-slate-200"
        >
          Cancel
        </button>
      </div>

      {/* Multi-Step Indicator Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        {steps.map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              currentStep === s.num 
                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' 
                : currentStep > s.num 
                ? 'bg-teal-600 text-white' 
                : 'bg-slate-200 text-slate-500'
            }`}>
              {currentStep > s.num ? <Check className="w-4 h-4" /> : s.num}
            </div>
            <span className={`text-xs font-semibold hidden md:inline ${currentStep === s.num ? 'text-indigo-900 font-extrabold' : 'text-slate-500'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Step Forms */}
      <div className="legal-card p-6 min-h-[400px]">
        {/* Step 1: Classification */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900">
                Step 1: Search Law Corpus & Case Classification
              </h3>
              <span className="text-[11px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded font-bold">
                Law/Section $\rightarrow$ Procedure $\rightarrow$ Workflow
              </span>
            </div>

            {/* Quick Law Provision Selector */}
            <div className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-200/80 space-y-2">
              <label className="text-xs font-bold text-indigo-900 block flex items-center justify-between">
                <span>Select Law / Provision from Legal Library:</span>
                <span className="text-[10px] text-indigo-600 font-mono font-normal">Auto-maps Procedural Ruleset</span>
              </label>
              <select
                onChange={(e) => {
                  const prov = LAW_PROVISIONS.find(p => p.id === e.target.value);
                  if (prov) {
                    setCategory(prov.mappedCategory);
                    setCaseType(prov.mappedCaseType);
                    setApplicableLaw(`${prov.lawName} (${prov.statuteVersion})`);
                    setCourt(prov.defaultCourt);
                  }
                }}
                className="w-full text-xs p-2.5 border border-indigo-300 rounded-lg bg-white font-bold text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Choose from Indian Law Library --</option>
                {LAW_PROVISIONS.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.lawName} — {p.sectionNumber} ({p.title}) [{p.statuteVersion}]
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value as CaseCategory)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-medium"
                >
                  <option value="Criminal">Criminal</option>
                  <option value="Civil">Civil</option>
                  <option value="Special / Statutory">Special / Statutory</option>
                  <option value="Family">Family</option>
                  <option value="Consumer">Consumer</option>
                  <option value="Constitutional">Constitutional</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Case Type</label>
                <select
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value as CaseType)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-bold text-indigo-700"
                >
                  {category === 'Criminal' && <option value="Murder">Murder (Sessions Trial - BNS / IPC)</option>}
                  {category === 'Civil' && <option value="Property Dispute">Property Dispute (Civil Suit - CPC)</option>}
                  {category === 'Special / Statutory' && <option value="Cheque Dishonour">Cheque Dishonour (Sec 138 NI Act)</option>}
                  {category === 'Family' && <option value="Divorce">Divorce (Sec 13 HMA)</option>}
                  {category === 'Consumer' && <option value="Consumer Complaint">Consumer Complaint (Sec 35 CPA)</option>}
                  {category === 'Constitutional' && <option value="Writ Petition">Writ Petition (Article 226 / 32)</option>}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Applicable Statute / Provision</label>
                <input
                  type="text"
                  value={applicableLaw}
                  onChange={(e) => setApplicableLaw(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Court Name</label>
                <input
                  type="text"
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
            </div>
          </div>
        )}


        {/* Step 2: Information */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Step 2: Case Information & Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Case Number</label>
                <input
                  type="text"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Case Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Assigned Counsel</label>
                <input
                  type="text"
                  value={assignedLawyer}
                  onChange={(e) => setAssignedLawyer(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Case Summary</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 h-24"
              />
            </div>
          </div>
        )}

        {/* Step 3: Parties */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Step 3: Litigating Parties
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Complainant / Plaintiff / Petitioner</label>
                <input
                  type="text"
                  value={complainantName}
                  onChange={(e) => setComplainantName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Accused / Defendant / Respondent</label>
                <input
                  type="text"
                  value={respondentName}
                  onChange={(e) => setRespondentName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-semibold"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Dates */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Step 4: Important Dates & Hearings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Filing Date</label>
                <input
                  type="date"
                  value={filingDate}
                  onChange={(e) => setFilingDate(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Initial Hearing Date</label>
                <input
                  type="date"
                  value={nextHearingDate}
                  onChange={(e) => setNextHearingDate(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Initial Hearing Purpose</label>
              <input
                type="text"
                value={nextHearingPurpose}
                onChange={(e) => setNextHearingPurpose(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50"
              />
            </div>
          </div>
        )}

        {/* Step 5: Documents */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Step 5: Initial Documents Upload
            </h3>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center space-y-3 bg-slate-50">
              <Upload className="w-8 h-8 text-indigo-600 mx-auto" />
              <p className="text-xs font-bold text-slate-800">Drag and drop FIR, Complaint, or Legal Notice files here</p>
              <p className="text-[11px] text-slate-400">PDF, DOCX or JPEG up to 25MB</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded text-xs font-semibold">Browse Files</button>
            </div>
          </div>
        )}

        {/* Step 6: Workflow Preview */}
        {currentStep === 6 && (
          <div className="space-y-5">
            <div className="bg-indigo-900 text-white p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] text-indigo-300 font-bold uppercase tracking-wider">Generated Workflow</span>
                <h4 className="text-lg font-bold">{activeTemplate.name}</h4>
              </div>
              <span className="bg-indigo-700 px-3 py-1 rounded text-xs font-bold">{activeTemplate.stages.length} Configured Stages</span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {activeTemplate.stages.map((stg, idx) => (
                <div key={stg.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-800">{stg.title}</span>
                  </div>
                  {stg.isConditional && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded flex items-center gap-1">
                      <GitBranch className="w-3 h-3" /> Branching Path
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(currentStep - 1)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>

        {currentStep < 6 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-sm"
          >
            Next Step <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 shadow-md"
          >
            <Sparkles className="w-4 h-4" /> Confirm & Create Case
          </button>
        )}
      </div>
    </div>
  );
};
