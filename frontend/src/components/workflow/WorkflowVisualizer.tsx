import React from 'react';
import { CheckCircle2, Circle, GitBranch, Clock, Layers } from 'lucide-react';
import type { WorkflowStage, CaseCategory, CaseType } from '../../types/legal';


interface WorkflowVisualizerProps {
  stages: WorkflowStage[];
  category: CaseCategory;
  caseType: CaseType;
  currentStageName: string;
}

export const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({
  stages,
  category,
  caseType,
  currentStageName
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
              Configured Workflow Engine
            </span>
            <span className="text-xs text-slate-500 font-semibold">{category} • {caseType}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            Procedural Path Visualizer
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dynamic stage progression with conditional decision branching
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <div className="flex items-center gap-1.5 font-semibold text-teal-700">
            <span className="w-3 h-3 rounded-full bg-teal-500 inline-block"></span>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-indigo-700">
            <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block animate-pulse"></span>
            <span>Active Stage</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-slate-500">
            <span className="w-3 h-3 rounded-full bg-slate-300 inline-block"></span>
            <span>Upcoming</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-amber-700">
            <GitBranch className="w-3.5 h-3.5 text-amber-600" />
            <span>Conditional Branch</span>
          </div>
        </div>
      </div>

      {/* Interactive Flowchart Diagram */}
      <div className="relative py-4 max-w-4xl mx-auto space-y-4">
        {stages.map((stage, index) => {
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.title.toLowerCase() === currentStageName.toLowerCase() || stage.status === 'current';


          return (
            <div key={stage.id} className="relative group">
              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div className="absolute left-7 top-14 bottom-0 w-0.5 -mb-4 bg-slate-200 z-0">
                  <div className={`h-full w-full ${isCompleted ? 'bg-teal-500' : 'bg-slate-200'}`}></div>
                </div>
              )}

              {/* Node Card */}
              <div className={`relative z-10 p-5 rounded-xl border transition-all flex items-start gap-4 ${
                isCurrent 
                  ? 'bg-gradient-to-r from-indigo-50/90 via-white to-indigo-50/40 border-indigo-500 shadow-md ring-2 ring-indigo-400/30' 
                  : isCompleted 
                  ? 'bg-white border-teal-200 hover:border-teal-300' 
                  : 'bg-slate-50/70 border-slate-200 opacity-80'
              }`}>
                {/* Node Status Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${
                  isCompleted 
                    ? 'bg-teal-600 text-white' 
                    : isCurrent 
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : isCurrent ? (
                    <span className="font-mono text-sm font-bold">{index + 1}</span>
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                {/* Stage Info */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-base font-extrabold ${isCurrent ? 'text-indigo-900' : 'text-slate-900'}`}>
                        {stage.title}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] font-extrabold uppercase bg-indigo-600 text-white px-2 py-0.5 rounded-full tracking-wider animate-pulse">
                          Current Stage
                        </span>
                      )}
                      {stage.isConditional && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded">
                          <GitBranch className="w-3 h-3 text-amber-700" /> Conditional Node
                        </span>
                      )}
                    </div>

                    {stage.estimatedDays && (
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> ~{stage.estimatedDays} days
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {stage.description}
                  </p>

                  {/* Required Documents Tag */}
                  {stage.requiredDocuments && stage.requiredDocuments.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-500 font-semibold">Required Filings:</span>
                      {stage.requiredDocuments.map((doc, dIdx) => (
                        <span key={dIdx} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                          📄 {doc}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Conditional Branching Options */}
                  {stage.isConditional && stage.branches && (
                    <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200 rounded-lg space-y-2">
                      <p className="text-xs font-bold text-amber-900 flex items-center gap-1">
                        <GitBranch className="w-3.5 h-3.5 text-amber-700" />
                        Procedural Decision Paths:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {stage.branches.map((b, bIdx) => (
                          <div key={bIdx} className="bg-white p-2 rounded border border-amber-200 text-xs flex items-center justify-between">
                            <span className="font-semibold text-slate-700">If: {b.condition}</span>
                            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                              → {b.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
