"use client";

type Mode = 'single' | 'pair' | 'group';

interface ModeSelectionProps {
  onModeSelect: (mode: Mode) => void;
}

export function ModeSelection({ onModeSelect }: ModeSelectionProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gray-400/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gray-500/5 blur-3xl" />

      <div className="relative w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white text-xl">TrackrCollab</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl text-white mb-4">Choose Your Journey</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Select how you'd like to track your goals. You can always switch modes later.
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Single Mode */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer group rounded-lg">
            <div className="text-center pb-4 p-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl mb-2">Single Mode</h2>
              <p className="text-gray-300 mb-4">
                Personal tracking for solo achievers
              </p>
            </div>
            <div className="space-y-4 p-6 pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm">Private goal tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm">Personal heatmaps & analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm">AI-powered insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm">Custom page creation</span>
                </div>
              </div>
              
              <button 
                onClick={() => onModeSelect('single')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-6 group py-3 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                Start Solo Journey
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Pair Mode */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer group rounded-lg">
            <div className="text-center pb-4 p-6">
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h2 className="text-2xl mb-2">Pair Mode</h2>
              <p className="text-gray-300 mb-2">
                Collaborate with one partner
              </p>
              <div className="bg-green-500/20 text-green-300 border border-green-500/30 w-fit mx-auto px-2 py-1 rounded text-sm">
                Popular
              </div>
            </div>
            <div className="space-y-4 p-6 pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm">1:1 chat & challenges</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm">Friendly competition</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">Shared goal tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm">Progress comparisons</span>
                </div>
              </div>
              
              <button 
                onClick={() => onModeSelect('pair')}
                className="w-full bg-green-500 hover:bg-green-600 text-white mt-6 group py-3 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                Find a Partner
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Group Mode */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer group rounded-lg">
            <div className="text-center pb-4 p-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl mb-2">Group Mode</h2>
              <p className="text-gray-300 mb-4">
                Join or create a community
              </p>
            </div>
            <div className="space-y-4 p-6 pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm">2+ member groups</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm">Group leaderboards</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm">Real-time group chat</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">Collective goals</span>
                </div>
              </div>
              
              <button 
                onClick={() => onModeSelect('group')}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white mt-6 group py-3 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                Join Community
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            You can switch between modes anytime in your dashboard settings
          </p>
        </div>
      </div>
    </div>
  );
}