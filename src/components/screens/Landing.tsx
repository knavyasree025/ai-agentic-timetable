import { motion } from 'motion/react';
import { Bot, Calendar, ShieldAlert, Zap, ArrowRight } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
          <Bot size={16} />
          <span>Next-Gen Academic Orchestration</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 leading-tight tracking-tight">
          Agentic AI <br />
          <span className="text-gradient">Timetable System</span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Intelligent scheduling for educational excellence. Leverage multi-agent AI to solve complex constraints and optimize your academic calendar.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-semibold text-lg flex items-center gap-2 shadow-xl shadow-blue-600/25 transition-all hover:-translate-y-1"
          >
            Get Started <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 glass glass-hover text-white rounded-2xl font-semibold text-lg transition-all">
            Watch Demo
          </button>
        </div>
      </motion.div>

      {/* Robot Illustration Placeholder */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-20 relative"
      >
        <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl relative z-10">
          <Bot size={120} className="text-white" />
          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-10 -right-10 w-24 h-24 glass rounded-2xl flex items-center justify-center"
          >
            <Calendar className="text-blue-400" size={32} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
            className="absolute -bottom-6 -left-12 w-20 h-20 glass rounded-2xl flex items-center justify-center"
          >
            <ShieldAlert className="text-red-400" size={28} />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-blue-500/30 blur-[60px] rounded-full -z-10" />
      </motion.div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-6xl">
        {[
          { icon: Calendar, title: 'Automated Scheduling', desc: 'Generate complete timetables in seconds using advanced heuristics.' },
          { icon: ShieldAlert, title: 'Conflict Resolution', desc: 'AI agents automatically detect and resolve room or teacher clashes.' },
          { icon: Zap, title: 'Dynamic Adjustments', desc: 'Real-time updates to schedules with minimal disruption to the flow.' }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="glass p-8 rounded-3xl glass-hover"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
              <feature.icon className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
