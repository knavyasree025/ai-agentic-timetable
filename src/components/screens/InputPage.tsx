import { motion } from 'motion/react';
import { Plus, Trash2, Users, BookOpen, MapPin, Clock, CheckCircle2 } from 'lucide-react';

export default function InputPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold mb-2">Configure System Inputs</h2>
        <p className="text-slate-400">Define your subjects, teachers, and constraints for the AI agents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subjects & Teachers */}
        <div className="space-y-8">
          <section className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BookOpen className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold">Subjects</h3>
              </div>
              <button className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                <Plus size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              {['Mathematics', 'Physics', 'English Literature', 'Computer Science'].map((sub, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                  <span className="font-medium">{sub}</span>
                  <button className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold">Teachers</h3>
              </div>
              <button className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                <Plus size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Dr. Sarah Smith', sub: 'Mathematics' },
                { name: 'Prof. James Wilson', sub: 'Physics' }
              ].map((teacher, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{teacher.name}</span>
                    <select className="bg-slate-800 border-none rounded-lg text-xs px-2 py-1 outline-none">
                      <option>{teacher.sub}</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    {['Mon', 'Wed', 'Fri'].map(day => (
                      <span key={day} className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Classrooms & Constraints */}
        <div className="space-y-8">
          <section className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold">Classrooms</h3>
              </div>
              <button className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                <Plus size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {['Room 101', 'Room 102', 'Lab A', 'Main Hall'].map((room, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium">{room}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="glass p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-blue-400" size={24} />
              <h3 className="text-xl font-bold">Scheduling Constraints</h3>
            </div>
            
            <div className="space-y-4">
              {[
                'No overlapping classes for teachers',
                'Teacher availability strictly enforced',
                'Morning preference for core subjects',
                'Maximum 4 hours per teacher per day',
                'Gap between consecutive classes'
              ].map((constraint, i) => (
                <label key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer appearance-none w-6 h-6 rounded-lg border-2 border-slate-600 checked:bg-blue-600 checked:border-blue-600 transition-all" defaultChecked={i < 3} />
                    <CheckCircle2 className="absolute left-1 text-white opacity-0 peer-checked:opacity-100 transition-all" size={16} />
                  </div>
                  <span className="text-sm font-medium text-slate-300">{constraint}</span>
                </label>
              ))}
            </div>
          </section>

          <button className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-all hover:-translate-y-1">
            Initialize AI Agents
          </button>
        </div>
      </div>
    </div>
  );
}
