import { motion } from 'motion/react';
import { Download, RefreshCw, Filter, Share2, Printer, ChevronLeft, ChevronRight } from 'lucide-react';
import { DAYS, TIME_SLOTS, MOCK_TIMETABLE } from '../../constants';

export default function TimetablePage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-display font-bold mb-2">Generated Timetable</h2>
          <p className="text-slate-400">Finalized academic schedule for Spring Semester 2026.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-4 py-2 glass rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-all">
            <Filter size={16} /> Filter
          </button>
          <button className="px-4 py-2 glass rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-all">
            <RefreshCw size={16} /> Regenerate
          </button>
          <div className="h-8 w-[1px] bg-white/10 mx-2" />
          <button className="px-4 py-2 glass rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-all">
            <Share2 size={16} /> Share
          </button>
          <button className="px-6 py-2 bg-blue-600 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="glass rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-6 bg-white/5 border-b border-r border-white/10 w-32">
                  <div className="flex items-center justify-center gap-2 text-slate-500">
                    <ChevronLeft size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Time</span>
                    <ChevronRight size={16} />
                  </div>
                </th>
                {DAYS.map(day => (
                  <th key={day} className="p-6 bg-white/5 border-b border-white/10 min-w-[200px]">
                    <span className="text-lg font-display font-bold text-slate-200">{day}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map(time => (
                <tr key={time}>
                  <td className="p-6 border-r border-b border-white/10 text-center">
                    <span className="text-xs font-bold text-slate-500">{time}</span>
                  </td>
                  {DAYS.map(day => {
                    const entry = MOCK_TIMETABLE.find(e => e.day === day && e.time === time);
                    return (
                      <td key={`${day}-${time}`} className="p-3 border-b border-white/10 min-h-[120px] align-top">
                        {entry ? (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-4 rounded-2xl border ${entry.color} h-full flex flex-col justify-between group cursor-pointer hover:brightness-110 transition-all`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-sm">{entry.subject}</h4>
                                <div className="w-2 h-2 rounded-full bg-current opacity-50" />
                              </div>
                              <p className="text-[10px] font-medium opacity-80 mb-1">{entry.teacher}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-black/20 rounded-md border border-white/5">
                                {entry.room}
                              </span>
                              <Printer size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </motion.div>
                        ) : (
                          <div className="h-full min-h-[80px] rounded-2xl border border-dashed border-white/5 hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center group">
                            <Plus size={16} className="text-slate-700 group-hover:text-slate-500 transition-colors" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        {[
          { label: 'Total Hours', value: '40h', sub: 'Per week' },
          { label: 'Subjects', value: '8', sub: 'Active courses' },
          { label: 'Rooms Used', value: '12', sub: 'Capacity: 85%' },
          { label: 'Conflicts', value: '0', sub: 'Fully resolved' }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-bold text-blue-400">{stat.value}</span>
              <span className="text-xs text-slate-600">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Plus({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
