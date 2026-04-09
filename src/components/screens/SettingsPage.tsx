import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Save, User, BookOpen, Clock, Shield, Bell, Globe, Trash2, Edit2 } from 'lucide-react';
import { Teacher } from '../../types';

interface SettingsPageProps {
  teachers: Teacher[];
  onAddTeacher: (teacher: Teacher) => void;
  onRemoveTeacher: (id: string) => void;
}

export default function SettingsPage({ teachers, onAddTeacher, onRemoveTeacher }: SettingsPageProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');

  const handleAdd = () => {
    if (name && subject) {
      onAddTeacher({
        id: `t-${Math.random()}`,
        name,
        subject,
        availability: ['Monday', 'Wednesday', 'Friday']
      });
      setName('');
      setSubject('');
      setIsAdding(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-display font-bold mb-2">System Settings</h2>
          <p className="text-slate-400">Manage institutional data and global scheduling constraints.</p>
        </div>
        <button className="px-8 py-3 bg-blue-600 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { icon: User, label: 'Teacher Management', active: true },
            { icon: Shield, label: 'Global Constraints', active: false },
            { icon: Bell, label: 'Notifications', active: false },
            { icon: Globe, label: 'Institutional Profile', active: false },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'glass glass-hover text-slate-400'
              }`}
            >
              <item.icon size={20} />
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Teacher Table */}
          <section className="glass rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <User size={18} className="text-blue-400" /> Teacher Directory
              </h3>
              <button 
                onClick={() => setIsAdding(!isAdding)}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                {isAdding ? 'Cancel' : '+ Add New Teacher'}
              </button>
            </div>

            {isAdding && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="p-6 bg-blue-600/5 border-b border-white/10 flex flex-wrap gap-4"
              >
                <input 
                  type="text" 
                  placeholder="Teacher Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/50 text-sm"
                />
                <input 
                  type="text" 
                  placeholder="Subject" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/50 text-sm"
                />
                <button 
                  onClick={handleAdd}
                  className="px-6 py-2 bg-blue-600 rounded-xl text-sm font-bold hover:bg-blue-500 transition-all"
                >
                  Add
                </button>
              </motion.div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Availability</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="group hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-200">{teacher.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-400">{teacher.subject}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {teacher.availability.slice(0, 2).map(day => (
                            <span key={day} className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">
                              {day.slice(0, 3)}
                            </span>
                          ))}
                          {teacher.availability.length > 2 && (
                            <span className="text-[10px] px-2 py-0.5 bg-slate-500/10 text-slate-400 rounded-full">
                              +{teacher.availability.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-blue-600/20 text-blue-400 rounded-lg transition-all">
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => onRemoveTeacher(teacher.id)}
                            className="p-2 hover:bg-red-600/20 text-red-400 rounded-lg transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Constraint Toggles */}
          <section className="glass p-8 rounded-3xl">
            <h3 className="font-bold flex items-center gap-2 mb-6">
              <Shield size={18} className="text-blue-400" /> Global Constraints
            </h3>
            <div className="space-y-6">
              {[
                { label: 'No overlapping classes', desc: 'Prevent teachers and rooms from being double-booked.', active: true },
                { label: 'Max hours per day', desc: 'Limit teachers to a maximum of 6 hours of instruction daily.', active: true },
                { label: 'Mandatory lunch break', desc: 'Ensure a 1-hour gap between 12:00 PM and 2:00 PM.', active: false },
                { label: 'Room capacity check', desc: 'Validate student count against classroom seating capacity.', active: true }
              ].map((toggle, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">{toggle.label}</h4>
                    <p className="text-xs text-slate-500">{toggle.desc}</p>
                  </div>
                  <button 
                    className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                      toggle.active ? 'bg-blue-600' : 'bg-slate-700'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                      toggle.active ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
