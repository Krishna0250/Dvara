import { Compass, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
export const NextActionCard = ({
  nextAction,
  onExecuteAction,
  compact = false
}) => {
  return <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-5 shadow-lg border border-indigo-900/60 relative overflow-hidden">
      {
    /* Background Graphic Accent */
  }
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="space-y-2 flex-1">
          {
    /* Header Badge */
  }
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Compass className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
              Next Procedural Action
            </span>
            <span className="text-xs text-slate-400">Current Stage: <strong className="text-slate-200">{nextAction.currentStage}</strong></span>
            {nextAction.currentState && <span className="text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded">
                State: {nextAction.currentState}
              </span>}
          </div>


          {
    /* Action Title */
  }
          <h3 className="text-base md:text-lg font-bold text-white leading-snug flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-indigo-400 shrink-0" />
            {nextAction.suggestedAction}
          </h3>

          {
    /* Conditions Checked */
  }
          {!compact && nextAction.conditions && <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-medium">Verified Conditions:</span>
              {nextAction.conditions.map((cond, idx) => <span key={idx} className="inline-flex items-center gap-1 text-xs bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  <CheckCircle2 className="w-3 h-3 text-teal-400" />
                  {cond}
                </span>)}
            </div>}

          {
    /* Disclaimer Footnote */
  }
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>{nextAction.disclaimer}</span>
          </div>
        </div>

        {
    /* Action Button */
  }
        {onExecuteAction && <button
    onClick={onExecuteAction}
    className="self-start md:self-center shrink-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-md shadow-indigo-900/50 hover:shadow-indigo-800/80 active:scale-95"
  >
            <span>Proceed With Action</span>
            <ArrowRight className="w-4 h-4" />
          </button>}
      </div>
    </div>;
};
