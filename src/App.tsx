/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Landing from './components/screens/Landing';
import InputPage from './components/screens/InputPage';
import AgentDashboard from './components/screens/AgentDashboard';
import TimetablePage from './components/screens/TimetablePage';
import ConflictPage from './components/screens/ConflictPage';
import SettingsPage from './components/screens/SettingsPage';
import { Screen } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('landing');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'landing':
        return <Landing onStart={() => setActiveScreen('input')} />;
      case 'input':
        return <InputPage />;
      case 'dashboard':
        return <AgentDashboard />;
      case 'timetable':
        return <TimetablePage />;
      case 'conflicts':
        return <ConflictPage />;
      case 'settings':
        return <SettingsPage />;
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
