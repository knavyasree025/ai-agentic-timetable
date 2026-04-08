import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Calendar, 
  PlusCircle, 
  AlertTriangle, 
  Settings, 
  Home,
  Bot
} from 'lucide-react';
import { Screen } from '../types';

interface SidebarProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function Sidebar({ activeScreen, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'input', label: 'Input Data', icon: PlusCircle },
    { id: 'dashboard', label: 'Agent Hub', icon: Bot },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'conflicts', label: 'Conflicts', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 glass h-screen sticky top-0 flex flex-col p-6 gap-8 z-50">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Bot className="text-white" size={24} />
        </div>
        <h1 className="font-display font-bold text-lg leading-tight">
          Agentic<br/><span className="text-blue-400">Timetable</span>
        </h1>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'group-hover:text-blue-400'} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20">
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-slate-300">All Agents Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
