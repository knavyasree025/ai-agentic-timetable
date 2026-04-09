import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Users, BookOpen, MapPin, Clock, CheckCircle2 } from 'lucide-react';

import { Teacher } from '../../types';

interface InputPageProps {
  subjects: string[];
  onAddSubject: (subject: string) => void;
  onRemoveSubject: (subject: string) => void;
  teachers: Teacher[];
  onAddTeacher: (teacher: Teacher) => void;
  onRemoveTeacher: (id: string) => void;
  classrooms: string[];
  onAddClassroom: (room: string) => void;
  onRemoveClassroom: (room: string) => void;
  onGenerate: () => void;
}

export default function InputPage({ 
  subjects, onAddSubject, onRemoveSubject, 
  teachers, onAddTeacher, onRemoveTeacher,
  classrooms, onAddClassroom, onRemoveClassroom,
  onGenerate 
}: InputPageProps) {
  const [newSubject, setNewSubject] = useState('');
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherSubject, setNewTeacherSubject] = useState('');
  const [newClassroom, setNewClassroom] = useState('');

  const handleAddSubjectLocal = () => {
    if (newSubject.trim()) {
      onAddSubject(newSubject.trim());
      setNewSubject('');
    }
  };

  const handleAddTeacherLocal = () => {
    if (newTeacherName.trim() && newTeacherSubject.trim()) {
      onAddTeacher({
        id: `t-${Math.random()}`,
        name: newTeacherName.trim(),
        subject: newTeacherSubject.trim(),
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      });
      setNewTeacherName('');
      setNewTeacherSubject('');
    }
  };

  const handleAddClassroomLocal = () => {
    if (newClassroom.trim()) {
      onAddClassroom(newClassroom.trim());
      setNewClassroom('');
    }
  };

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
            </div>
            
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSubjectLocal()}
                placeholder="Add new subject..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/50 transition-all text-sm"
              />
              <button 
                onClick={handleAddSubjectLocal}
                className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {subjects.map((sub, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={sub} 
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-all"
                >
                  <span className="font-medium">{sub}</span>
                  <button 
                    onClick={() => onRemoveSubject(sub)}
                    className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold">Teachers</h3>
              </div>
            </div>
            
            <div className="space-y-4 mb-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  placeholder="Teacher Name"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/50 transition-all text-sm"
                />
                <input 
                  type="text" 
                  value={newTeacherSubject}
                  onChange={(e) => setNewTeacherSubject(e.target.value)}
                  placeholder="Subject"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/50 transition-all text-sm"
                />
                <button 
                  onClick={handleAddTeacherLocal}
                  className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{teacher.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{teacher.subject}</span>
                      <button 
                        onClick={() => onRemoveTeacher(teacher.id)}
                        className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {teacher.availability.slice(0, 3).map(day => (
                      <span key={day} className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                        {day.slice(0, 3)}
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
            </div>
            
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                value={newClassroom}
                onChange={(e) => setNewClassroom(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddClassroomLocal()}
                placeholder="Room Name (e.g. 101)"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/50 transition-all text-sm"
              />
              <button 
                onClick={handleAddClassroomLocal}
                className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {classrooms.map((room, i) => (
                <div key={room} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium">{room}</span>
                  </div>
                  <button 
                    onClick={() => onRemoveClassroom(room)}
                    className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
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

          <button 
            onClick={onGenerate}
            className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-all hover:-translate-y-1"
          >
            Initialize AI Agents
          </button>
        </div>
      </div>
    </div>
  );
}
