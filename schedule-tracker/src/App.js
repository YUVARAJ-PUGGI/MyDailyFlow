import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './components/LandingPage';
import ScheduleTracker from './components/ScheduleTracker';
import './App.css';

import { GamificationProvider } from './context/GamificationContext';

/**
 * Main App Component
 * Manages the high-level transition from Landing Page to Schedule Tracker
 */
function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleBackToHome = () => {
    setShowLanding(true);
  };

  return (
    <ErrorBoundary>
      <GamificationProvider>
        <div className="app">
          {showLanding ? (
            <LandingPage onGetStarted={handleGetStarted} />
          ) : (
            <ScheduleTracker onBackToHome={handleBackToHome} />
          )}
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </GamificationProvider>
    </ErrorBoundary>
  );
}

export default App;