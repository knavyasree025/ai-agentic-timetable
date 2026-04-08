export type Screen = 'landing' | 'input' | 'dashboard' | 'timetable' | 'conflicts' | 'settings';

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  availability: string[];
}

export interface Classroom {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  color: string;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'working' | 'completed' | 'error';
  logs: string[];
  icon: string;
}

export interface Conflict {
  id: string;
  type: 'clash' | 'availability' | 'preference';
  description: string;
  severity: 'high' | 'medium' | 'low';
  suggestions: string[];
}
