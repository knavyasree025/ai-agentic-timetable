import { motion } from 'motion/react';
import { Bot, ShieldAlert, Zap, Send, Terminal, Activity, CheckCircle2, Loader2 } from 'lucide-react';
import { MOCK_AGENTS } from '../../constants';

interface AgentDashboardProps {
  isGenerating: boolean;
  onComplete: () => void;
}

export default function AgentDashboard({ isGenerating, onComplete }: AgentDashboardProps) {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-display font-bold mb-2">Multi-Agent Orchestration</h2>
          <p className="text-slate-400">Monitor and interact with specialized AI agents in real-time.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 glass rounded-xl flex items-center gap-2">
            <Activity size={16} className={isGenerating ? 'text-blue-400 animate-pulse' : 'text-emerald-400'} />
            <span className="text-sm font-medium">System Load: {isGenerating ? '88%' : '12%'}</span>
          </div>
          <button 
            disabled={isGenerating}
            onClick={onComplete}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-lg ${
              isGenerating 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20'
            }`}
          >
            {isGenerating ? 'Agents Working...' : 'View Timetable'}
          </button>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {MOCK_AGENTS.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-20 transition-all group-hover:opacity-40 ${
              agent.status === 'working' ? 'bg-blue-500' : agent.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-500'
            }`} />

            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                agent.status === 'working' ? 'bg-blue-600' : agent.status === 'completed' ? 'bg-emerald-600' : 'bg-slate-700'
              }`}>
                {agent.icon === 'Bot' && <Bot size={28} className="text-white" />}
                {agent.icon === 'ShieldAlert' && <ShieldAlert size={28} className="text-white" />}
                {agent.icon === 'Zap' && <Zap size={28} className="text-white" />}
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                agent.status === 'working' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                agent.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                'bg-slate-500/10 text-slate-400 border-slate-500/20'
              }`}>
                {agent.status}
              </div>
            </div>

            <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
            <p className="text-slate-400 text-sm mb-6">{agent.role}</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-widest">
                <span>Live Logs</span>
                <Terminal size={12} />
              </div>
              <div className="bg-black/20 rounded-xl p-4 font-mono text-[11px] space-y-2 h-32 overflow-y-auto border border-white/5">
                {agent.logs.map((log, j) => (
                  <div key={j} className="flex gap-2">
                    <span className="text-blue-500/50">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]</span>
                    <span className="text-slate-300">{log}</span>
                  </div>
                ))}
                {agent.status === 'working' && (
                  <div className="flex items-center gap-2 text-blue-400">
                    <Loader2 size={10} className="animate-spin" />
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: agent.status === 'completed' ? '100%' : agent.status === 'working' ? '65%' : '0%' }}
                className={`h-full ${agent.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Panels & Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-3xl border-l-4 border-l-red-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Conflict Overview</h4>
                  <p className="text-xs text-slate-500">2 Critical issues detected</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Room 101 has a scheduling overlap between Math and Science. Conflict Resolver is evaluating alternatives.
              </p>
            </div>

            <div className="glass p-6 rounded-3xl border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Optimization Stats</h4>
                  <p className="text-xs text-slate-500">98% Constraint satisfaction</p>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-display font-bold">4.8</span>
                <span className="text-xs text-slate-500 mb-1.5">/ 5.0 efficiency score</span>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl h-64 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="text-blue-400" size={20} />
              <h4 className="font-bold">Agent Communication Channel</h4>
            </div>
            <div className="flex-1 bg-black/20 rounded-2xl p-4 mb-4 overflow-y-auto text-sm space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-[10px]">S</div>
                <div className="bg-blue-600/10 p-3 rounded-2xl rounded-tl-none border border-blue-500/10">
                  I've completed the initial draft. Conflict Resolver, please scan for room overlaps.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-[10px]">C</div>
                <div className="bg-red-600/10 p-3 rounded-2xl rounded-tl-none border border-red-500/10">
                  Scanning... Found 2 issues. Working on resolution suggestions now.
                </div>
              </div>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Message AI Agent..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-14 outline-none focus:border-blue-500/50 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition-all">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl">
          <h4 className="font-bold mb-6">System Health</h4>
          <div className="space-y-6">
            {[
              { label: 'Neural Engine', value: 92 },
              { label: 'Constraint Solver', value: 78 },
              { label: 'Database Sync', value: 100 },
              { label: 'API Latency', value: 15 }
            ].map((metric, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-400 uppercase tracking-wider">{metric.label}</span>
                  <span className={metric.value > 80 ? 'text-emerald-400' : 'text-blue-400'}>{metric.value}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${metric.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20">
            <h5 className="text-sm font-bold text-blue-300 mb-2">Pro Tip</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              You can manually override any agent decision by clicking on the conflict resolution suggestions in the next step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
