import { motion } from 'motion/react';
import { ShieldAlert, CheckCircle2, RefreshCw, Download, ChevronRight, AlertCircle, MapPin, Clock, User } from 'lucide-react';
import { Conflict } from '../../types';

interface ConflictPageProps {
  conflicts: Conflict[];
  onResolve: (id: string) => void;
}

export default function ConflictPage({ conflicts, onResolve }: ConflictPageProps) {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-display font-bold mb-2">Conflict Resolution</h2>
          <p className="text-slate-400">Review and resolve scheduling overlaps detected by AI agents.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 glass rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-all">
            <RefreshCw size={16} /> Regenerate Solutions
          </button>
          <button className="px-6 py-2 bg-blue-600 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-500 transition-all">
            <Download size={16} /> Download Report
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {conflicts.length === 0 ? (
          <div className="glass p-12 rounded-[40px] text-center">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-2xl font-display font-bold mb-2">No Conflicts Detected</h3>
            <p className="text-slate-400">Your timetable is perfectly optimized and constraint-compliant.</p>
          </div>
        ) : (
          conflicts.map((conflict, i) => (
            <motion.div
              key={conflict.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass p-8 rounded-[32px] border-l-8 ${
                conflict.severity === 'high' ? 'border-l-red-500' : 'border-l-amber-500'
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-xl ${
                      conflict.severity === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      <ShieldAlert size={24} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${
                      conflict.severity === 'high' ? 'text-red-400' : 'text-amber-400'
                    }`}>
                      {conflict.severity} Severity Conflict
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-slate-200">{conflict.description}</h3>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <AlertCircle size={14} /> AI Suggested Resolutions
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {conflict.suggestions.map((suggestion, j) => (
                        <button 
                          key={j}
                          onClick={() => onResolve(conflict.id)}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-400 font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-all">
                              {j + 1}
                            </div>
                            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                              {suggestion}
                            </span>
                          </div>
                          <ChevronRight size={18} className="text-slate-600 group-hover:text-blue-400 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:w-80 flex flex-col gap-4">
                  <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20">
                    <h4 className="font-bold text-blue-300 mb-2">Agent Analysis</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Conflict Resolver Agent detected this clash during the validation phase. Resolving this will improve overall schedule stability.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                      <CheckCircle2 size={12} /> Confidence: 95%
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onResolve(conflict.id)}
                    className="w-full py-4 glass glass-hover rounded-2xl text-sm font-bold text-slate-300 hover:text-white transition-all mt-auto"
                  >
                    Dismiss Conflict
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="mt-12 p-10 glass rounded-[40px] text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <h3 className="text-2xl font-display font-bold mb-4">Ready to finalize?</h3>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Once all high-severity conflicts are resolved, you can proceed to export the final timetable for distribution.
        </p>
        <button className="px-10 py-4 bg-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
          Finalize & Export Timetable
        </button>
      </div>
    </div>
  );
}
