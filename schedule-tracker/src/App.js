import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './components/LandingPage';
import ScheduleTracker from './components/ScheduleTracker';
import './App.css';

import { GamificationProvider } from './context/GamificationContext';
import { ThemeProvider } from './context/ThemeContext';

/**
 * Main App Component
 * Manages the high-level transition from Landing Page to Schedule Tracker
 */
function App() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return (
      <GamificationProvider>
        <ThemeProvider>
          <LandingPage onGetStarted={() => setShowLanding(false)} />
        </ThemeProvider>
      </GamificationProvider>
    );
  }

  return (
    <GamificationProvider>
      <ThemeProvider>
        <div className="App">
          <ScheduleTracker onBackToHome={() => setShowLanding(true)} />
          <ToastContainer position="bottom-right" theme="colored" />
        </div>
      </ThemeProvider>
    </GamificationProvider>
  );
}

export default App;