/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Landing from './components/screens/Landing';
import InputPage from './components/screens/InputPage';
import AgentDashboard from './components/screens/AgentDashboard';
import TimetablePage from './components/screens/TimetablePage';
import ConflictPage from './components/screens/ConflictPage';
import SettingsPage from './components/screens/SettingsPage';
import { Screen, Teacher, TimetableEntry, Conflict } from './types';
import { DAYS, TIME_SLOTS, MOCK_TEACHERS } from './constants';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('landing');
  const [subjects, setSubjects] = useState<string[]>(['Mathematics', 'Physics', 'English Literature', 'Computer Science']);
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [classrooms, setClassrooms] = useState<string[]>(['Room 101', 'Room 102', 'Lab A', 'Main Hall']);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTimetable = useCallback(() => {
    setIsGenerating(true);
    const newTimetable: TimetableEntry[] = [];
    const newConflicts: Conflict[] = [];
    const colors = [
      'bg-blue-500/20 text-blue-300 border-blue-500/50',
      'bg-indigo-500/20 text-indigo-300 border-indigo-500/50',
      'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
      'bg-purple-500/20 text-purple-300 border-purple-500/50',
      'bg-amber-500/20 text-amber-300 border-amber-500/50',
    ];

    // More structured generation to ensure we have some data
    DAYS.forEach(day => {
      // Pick 4 slots per day for demo
      const daySlots = [...TIME_SLOTS].sort(() => Math.random() - 0.5).slice(0, 5);

      daySlots.forEach(time => {
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const teacher = teachers[Math.floor(Math.random() * teachers.length)];
        const room = classrooms[Math.floor(Math.random() * classrooms.length)];
        const color = colors[subjects.indexOf(subject) % colors.length];

        newTimetable.push({
          day,
          time,
          subject,
          teacher: teacher.name,
          room,
          color
        });
      });
    });

    // Detect some conflicts for the prototype
    // 1. Room clash: same day, same time, same room
    const roomUsage: Record<string, number> = {};
    newTimetable.forEach(entry => {
      const key = `${entry.day}-${entry.time}-${entry.room}`;
      roomUsage[key] = (roomUsage[key] || 0) + 1;
      if (roomUsage[key] > 1) {
        newConflicts.push({
          id: `conf-${Math.random()}`,
          type: 'clash',
          description: `${entry.room} is double-booked at ${entry.time} on ${entry.day}.`,
          severity: 'high',
          suggestions: [`Move to another room`, `Reschedule ${entry.subject}`]
        });
      }
    });

    setTimetable(newTimetable);
    setConflicts(newConflicts);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  }, [subjects, teachers, classrooms]);

  const handleAddSubject = (subject: string) => {
    if (subject && !subjects.includes(subject)) {
      setSubjects(prev => [...prev, subject]);
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setSubjects(prev => prev.filter(s => s !== subject));
  };

  const handleAddTeacher = (teacher: Teacher) => {
    setTeachers(prev => [...prev, teacher]);
  };

  const handleRemoveTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const handleAddClassroom = (room: string) => {
    if (room && !classrooms.includes(room)) {
      setClassrooms(prev => [...prev, room]);
    }
  };

  const handleRemoveClassroom = (room: string) => {
    setClassrooms(prev => prev.filter(r => r !== room));
  };

  const resolveConflict = (id: string) => {
    setConflicts(prev => prev.filter(c => c.id !== id));
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'landing':
        return <Landing onStart={() => setActiveScreen('input')} />;
      case 'input':
        return (
          <InputPage 
            subjects={subjects} 
            onAddSubject={handleAddSubject} 
            onRemoveSubject={handleRemoveSubject}
            teachers={teachers}
            onAddTeacher={handleAddTeacher}
            onRemoveTeacher={handleRemoveTeacher}
            classrooms={classrooms}
            onAddClassroom={handleAddClassroom}
            onRemoveClassroom={handleRemoveClassroom}
            onGenerate={() => {
              generateTimetable();
              setActiveScreen('dashboard');
            }}
          />
        );
      case 'dashboard':
        return <AgentDashboard isGenerating={isGenerating} onComplete={() => setActiveScreen('timetable')} />;
      case 'timetable':
        return <TimetablePage timetable={timetable} onRegenerate={generateTimetable} />;
      case 'conflicts':
        return <ConflictPage conflicts={conflicts} onResolve={resolveConflict} />;
      case 'settings':
        return <SettingsPage teachers={teachers} onAddTeacher={handleAddTeacher} onRemoveTeacher={handleRemoveTeacher} />;
      default:
        return <Landing onStart={() => setActiveScreen('input')} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      {/* Sidebar - Only show if not on landing page (optional, but prompt says sidebar layout) */}
      {activeScreen !== 'landing' && (
        <Sidebar activeScreen={activeScreen} onNavigate={setActiveScreen} />
      )}

      <main className="flex-1 flex flex-col min-w-0">
        {activeScreen !== 'landing' && <TopNav />}
        
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer for landing page or global */}
        {activeScreen === 'landing' && (
          <footer className="p-8 text-center text-slate-500 text-sm border-t border-white/5 bg-black/20">
            <p>© 2026 Agentic AI Timetable Generation System. All rights reserved.</p>
          </footer>
        )}
      </main>
    </div>
  );
}
