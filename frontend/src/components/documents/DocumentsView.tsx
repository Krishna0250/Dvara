import React, { useState } from 'react';
import { FileText, Upload, Download, FileCheck } from 'lucide-react';
import type { Case } from '../../types/legal';


interface DocumentsViewProps {
  cases: Case[];
  onSelectCase?: (caseId: string) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ cases }) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');


  const allDocuments = cases.flatMap(c => c.documents);

  const docTypes = ['All', 'FIR', 'Complaint', 'Notice', 'Court Order', 'Evidence', 'Witness Statement', 'Charge-sheet', 'Plaint', 'Petition'];

  const filteredDocs = allDocuments.filter(d => {
    const matchesType = selectedType === 'All' || d.type === selectedType;
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.caseId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-indigo-600" />
            Central Documents Repository
          </h1>
          <p className="text-xs text-slate-500 font-medium">Manage legal pleadings, evidence exhibits, orders, and police reports</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm">
          <Upload className="w-4 h-4" /> Upload New Document
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search documents by name or case #..."
          className="w-full sm:w-80 px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">

        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filter Type:</span>
        {docTypes.map(t => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === t
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="legal-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">Document Name</th>
              <th className="py-3.5 px-4">Category Type</th>
              <th className="py-3.5 px-4">Case #</th>
              <th className="py-3.5 px-4">Uploaded Date</th>
              <th className="py-3.5 px-4">Uploaded By</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredDocs.map(doc => (
              <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{doc.name}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold text-[11px]">
                    {doc.type}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">{doc.caseId}</td>
                <td className="py-3.5 px-4 text-slate-500">{doc.uploadedDate}</td>
                <td className="py-3.5 px-4 font-medium text-slate-800">{doc.uploadedBy}</td>
                <td className="py-3.5 px-4">
                  <span className="bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-bold px-2 py-0.5 rounded">
                    {doc.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1 ml-auto">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
