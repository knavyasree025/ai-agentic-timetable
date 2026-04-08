import { AIAgent, Conflict, Teacher, TimetableEntry } from './types';

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

export const MOCK_TEACHERS: Teacher[] = [
  { id: '1', name: 'Dr. Sarah Smith', subject: 'Mathematics', availability: ['Monday', 'Wednesday', 'Friday'] },
  { id: '2', name: 'Prof. James Wilson', subject: 'Science', availability: ['Tuesday', 'Thursday'] },
  { id: '3', name: 'Ms. Emily Brown', subject: 'English', availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
];

export const MOCK_AGENTS: AIAgent[] = [
  {
    id: '1',
    name: 'Scheduler Agent',
    role: 'Primary Orchestrator',
    status: 'completed',
    logs: ['Initializing schedule...', 'Mapping constraints...', 'Drafting initial slots...'],
    icon: 'Bot'
  },
  {
    id: '2',
    name: 'Conflict Resolver',
    role: 'Constraint Validator',
    status: 'working',
    logs: ['Scanning for overlaps...', 'Detected room clash in 101', 'Evaluating alternatives...'],
    icon: 'ShieldAlert'
  },
  {
    id: '3',
    name: 'Optimization Agent',
    role: 'Efficiency Expert',
    status: 'idle',
    logs: ['Waiting for draft...', 'Ready to optimize teacher load.'],
    icon: 'Zap'
  }
];

export const MOCK_TIMETABLE: TimetableEntry[] = [
  { day: 'Monday', time: '09:00 AM', subject: 'Mathematics', teacher: 'Dr. Sarah Smith', room: 'Room 101', color: 'bg-blue-500/20 text-blue-300 border-blue-500/50' },
  { day: 'Monday', time: '11:00 AM', subject: 'English', teacher: 'Ms. Emily Brown', room: 'Room 102', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50' },
  { day: 'Tuesday', time: '10:00 AM', subject: 'Science', teacher: 'Prof. James Wilson', room: 'Room 101', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' },
  { day: 'Wednesday', time: '09:00 AM', subject: 'Mathematics', teacher: 'Dr. Sarah Smith', room: 'Room 101', color: 'bg-blue-500/20 text-blue-300 border-blue-500/50' },
  { day: 'Thursday', time: '02:00 PM', subject: 'English', teacher: 'Ms. Emily Brown', room: 'Room 103', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50' },
];

export const MOCK_CONFLICTS: Conflict[] = [
  {
    id: 'c1',
    type: 'clash',
    description: 'Room 101 is double-booked for Math and Science at 10:00 AM on Tuesday.',
    severity: 'high',
    suggestions: ['Move Science to Room 102', 'Reschedule Math to 11:00 AM']
  },
  {
    id: 'c2',
    type: 'availability',
    description: 'Dr. Sarah Smith is not available on Tuesday mornings.',
    severity: 'medium',
    suggestions: ['Assign substitute teacher', 'Swap with Wednesday slot']
  }
];
