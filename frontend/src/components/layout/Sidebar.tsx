import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  Clock, 
  FileText, 
  Users, 
  Compass, 
  Settings,
  Scale,
  BookOpen,
  ShieldAlert
} from 'lucide-react';


interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scrutiny', label: 'Scrutiny & Registration', icon: ShieldAlert },
    { id: 'laws', label: 'Law & Provision Library', icon: BookOpen },
    { id: 'cases', label: 'Cases', icon: Briefcase },
    { id: 'hearings', label: 'Hearings', icon: Calendar },
    { id: 'deadlines', label: 'Deadlines', icon: Clock },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'next-action', label: 'Workflow Guidance', icon: Compass },
    { id: 'parties', label: 'Parties Directory', icon: Users },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 h-screen sticky top-0 select-none z-20">
      <div>
        {/* Brand Header */}
        <div className="p-5 flex items-center gap-3 border-b border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              Dvara
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-1.5 py-0.5 rounded font-mono font-normal">v1.0</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Smart Legal Management</p>

          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Main Workspace
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/90 text-white shadow-md shadow-indigo-900/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile */}
      <div className="p-3 border-t border-slate-800/80">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/40 border border-slate-800">
          <div className="w-9 h-9 rounded-full bg-indigo-700/50 border border-indigo-500/30 flex items-center justify-center text-indigo-200 font-bold text-sm">
            RV
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Adv. Rajesh Verma</p>
            <p className="text-[11px] text-slate-400 truncate">Senior Counsel / Partner</p>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors p-1" title="Settings">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
