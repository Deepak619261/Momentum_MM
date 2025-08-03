"use client";

import { useState } from "react";

type Mode = 'single' | 'pair' | 'group';

interface DashboardProps {
  mode: Mode;
  onSectionClick: (section: string) => void;
}

export function Dashboard({ mode, onSectionClick }: DashboardProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
    onSectionClick(section);
  };

  const getModeClasses = () => {
    switch (mode) {
      case 'single':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'pair':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'group':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'single':
        return 'Solo Mode';
      case 'pair':
        return 'Pair Mode';
      case 'group':
        return 'Group Mode';
      default:
        return 'Solo Mode';
    }
  };

  const getRankLabel = () => {
    switch (mode) {
      case 'single':
        return 'Total Points';
      case 'pair':
        return 'Pair Rank';
      case 'group':
        return 'Group Rank';
      default:
        return 'Total Points';
    }
  };

  const getRankValue = () => {
    switch (mode) {
      case 'single':
        return '1,247';
      case 'pair':
        return '#1';
      case 'group':
        return '#3';
      default:
        return '1,247';
    }
  };

  const getRankSubtext = () => {
    switch (mode) {
      case 'single':
        return '+12 today';
      case 'pair':
        return 'vs Partner';
      case 'group':
        return 'of 12 members';
      default:
        return '+12 today';
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gray-400/10 blur-3xl" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-white text-xl">TrackrCollab</span>
              </div>
              
              <div className={`px-2 py-1 rounded text-sm border ${getModeClasses()}`}>
                {getModeLabel()}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {mode !== 'single' && (
                <button className="text-gray-300 hover:text-white flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat
                </button>
              )}
              
              <button className="text-gray-300 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM10.5 6.5L15 2l5 5-4.5 4.5L10.5 6.5z" />
                </svg>
              </button>
              
              <button className="text-gray-300 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl text-white mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-300">Let's make today count. Here's your progress overview.</p>
        </div>

        {/* Today's Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg">
            <div className="p-4">
              <h3 className="text-sm text-gray-300 mb-2">Today's Progress</h3>
              <div className="text-2xl mb-2">6/10</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }} />
              </div>
              <p className="text-xs text-gray-400">Tasks completed</p>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg">
            <div className="p-4">
              <h3 className="text-sm text-gray-300 mb-2">Current Streak</h3>
              <div className="text-2xl mb-2">12 days</div>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5, 6, 7].map((day, i) => (
                  <div 
                    key={day} 
                    className={`w-3 h-3 rounded-sm ${i < 5 ? 'bg-green-400' : 'bg-gray-600'}`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400">Keep it going!</p>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg">
            <div className="p-4">
              <h3 className="text-sm text-gray-300 mb-2">This Week</h3>
              <div className="text-2xl mb-2">85%</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
              <p className="text-xs text-gray-400">Goal completion</p>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg">
            <div className="p-4">
              <h3 className="text-sm text-gray-300 mb-2">{getRankLabel()}</h3>
              <div className="text-2xl mb-2">{getRankValue()}</div>
              <div className="flex items-center gap-1 mb-2">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-xs text-gray-400">{getRankSubtext()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Coding/Skills */}
          <div 
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group rounded-lg"
            onClick={() => handleSectionClick('coding')}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg">Coding/Skills</h3>
                    <p className="text-gray-400 text-sm">2/3 tasks today</p>
                  </div>
                </div>
                <div className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-1 rounded text-sm">
                  7d streak
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">This week: 15/21 problems</span>
                  <span className="text-blue-400 group-hover:underline">View details →</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gym/Workout */}
          <div 
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group rounded-lg"
            onClick={() => handleSectionClick('gym')}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg">Gym/Workout</h3>
                    <p className="text-gray-400 text-sm">1/1 workout today</p>
                  </div>
                </div>
                <div className="bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-1 rounded text-sm">
                  12d streak
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">BMI: 24.4 (Normal)</span>
                  <span className="text-red-400 group-hover:underline">View details →</span>
                </div>
              </div>
            </div>
          </div>

          {/* Diet */}
          <div 
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group rounded-lg"
            onClick={() => handleSectionClick('diet')}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg">Diet</h3>
                    <p className="text-gray-400 text-sm">3/5 meals logged</p>
                  </div>
                </div>
                <div className="bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-1 rounded text-sm">
                  5d streak
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">1,847/2,000 calories</span>
                  <span className="text-green-400 group-hover:underline">View details →</span>
                </div>
              </div>
            </div>
          </div>

          {/* Journaling */}
          <div 
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group rounded-lg"
            onClick={() => handleSectionClick('journaling')}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg">Journaling</h3>
                    <p className="text-gray-400 text-sm">Entry completed today</p>
                  </div>
                </div>
                <div className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-1 rounded text-sm">
                  3d streak
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Mood: Happy 😊</span>
                  <span className="text-purple-400 group-hover:underline">View details →</span>
                </div>
              </div>
            </div>
          </div>

          {/* Self-Talk */}
          <div 
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group rounded-lg"
            onClick={() => handleSectionClick('self-talk')}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg">Self-Talk</h3>
                  <p className="text-gray-400 text-sm">AI Mentor available</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-300">"What's your strength today?"</p>
                <span className="text-yellow-400 group-hover:underline">Start conversation →</span>
              </div>
            </div>
          </div>

          {/* Custom Page */}
          <div 
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group border-dashed rounded-lg"
            onClick={() => handleSectionClick('custom')}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg">Custom Page</h3>
                  <p className="text-gray-400 text-sm">Create your own tracker</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-300">Track meditation, reading, or any custom goal</p>
                <span className="text-gray-400 group-hover:underline">Create page →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button 
            onClick={() => handleSectionClick('tracking-sheet')}
            className="bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-md transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Tracking Sheet
          </button>
          
          <button 
            onClick={() => handleSectionClick('analytics')}
            className="bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-md transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Analytics
          </button>
          
          {mode !== 'single' && (
            <button 
              onClick={() => handleSectionClick('leaderboard')}
              className="bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-md transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {mode === 'pair' ? 'Pair Stats' : 'Leaderboard'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}