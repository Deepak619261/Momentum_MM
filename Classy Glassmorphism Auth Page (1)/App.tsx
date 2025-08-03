"use client";

import { useState } from "react";
import { LandingPage } from "./components/LandingPage.tsx";
import { AuthPage } from "./components/AuthPage.tsx";
import { ModeSelection } from "./components/ModeSelection.tsx";
import { Dashboard } from "./components/Dashboard.tsx";

type AppState = 'landing' | 'auth' | 'mode-selection' | 'dashboard';
type Mode = 'single' | 'pair' | 'group';

export default function App() {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [selectedMode, setSelectedMode] = useState<Mode>('single');
  const [currentSection, setCurrentSection] = useState<string>('dashboard');

  const handleGetStarted = (mode: Mode) => {
    setSelectedMode(mode);
    setCurrentView('auth');
  };

  const handleLogin = () => {
    setCurrentView('auth');
  };

  const handleAuthSuccess = () => {
    setCurrentView('mode-selection');
  };

  const handleModeSelect = (mode: Mode) => {
    setSelectedMode(mode);
    setCurrentView('dashboard');
  };

  const handleSectionClick = (section: string) => {
    setCurrentSection(section);
    // Here you would navigate to specific section components
    console.log('Navigate to section:', section);
  };

  switch (currentView) {
    case 'landing':
      return (
        <LandingPage 
          onGetStarted={handleGetStarted}
          onLogin={handleLogin}
        />
      );
    
    case 'auth':
      return (
        <div className="relative">
          <AuthPage />
          {/* Simulate auth success after 2 seconds for demo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button 
              onClick={handleAuthSuccess}
              className="pointer-events-auto mt-96 text-white/50 hover:text-white text-sm underline"
            >
              Skip to Dashboard (Demo)
            </button>
          </div>
        </div>
      );
    
    case 'mode-selection':
      return (
        <ModeSelection onModeSelect={handleModeSelect} />
      );
    
    case 'dashboard':
      return (
        <Dashboard 
          mode={selectedMode}
          onSectionClick={handleSectionClick}
        />
      );
    
    default:
      return <LandingPage onGetStarted={handleGetStarted} onLogin={handleLogin} />;
  }
}