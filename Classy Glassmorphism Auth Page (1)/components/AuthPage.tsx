"use client";

import { useState } from "react";

export function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gray-400/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gray-500/5 blur-3xl" />

      {/* Main card */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Close button */}
          <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-8">
            <h1 className="text-white mb-2">Welcome to Momentum</h1>
            <p className="text-gray-400">Join our community today</p>
          </div>

          {/* Tab Navigation */}
          <div className="grid w-full grid-cols-2 mb-6 bg-black/20 border border-white/10 rounded-lg">
            <button 
              onClick={() => setActiveTab('login')}
              className={`py-3 text-center rounded-lg transition-colors ${
                activeTab === 'login' 
                  ? 'bg-white/20 text-white' 
                  : 'text-gray-400'
              }`}
            >
              Login
            </button>
            <button 
              onClick={() => setActiveTab('signup')}
              className={`py-3 text-center rounded-lg transition-colors ${
                activeTab === 'signup' 
                  ? 'bg-white/20 text-white' 
                  : 'text-gray-400'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="login-email" className="text-gray-300 block">Email</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 backdrop-blur-sm px-4 py-2 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="login-password" className="text-gray-300 block">Password</label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 backdrop-blur-sm px-4 py-2 pr-10 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {!showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-200 backdrop-blur-sm shadow-lg py-3 rounded-md">
                Login
              </button>

              <div className="text-center">
                <button className="text-gray-400 hover:text-white transition-colors text-sm">
                  Forgot your password?
                </button>
              </div>
            </div>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="signup-name" className="text-gray-300 block">Full Name</label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 backdrop-blur-sm px-4 py-2 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="signup-email" className="text-gray-300 block">Email</label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 backdrop-blur-sm px-4 py-2 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="signup-password" className="text-gray-300 block">Password</label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 backdrop-blur-sm px-4 py-2 pr-10 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {!showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="signup-confirm-password" className="text-gray-300 block">Confirm Password</label>
                <div className="relative">
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 backdrop-blur-sm px-4 py-2 pr-10 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {!showConfirmPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-200 backdrop-blur-sm shadow-lg py-3 rounded-md">
                Create Account
              </button>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          )}

          {/* Social Login */}
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">or continue with</span>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="flex-1 bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10 hover:text-white backdrop-blur-sm py-3 rounded-md transition-colors">
                Google
              </button>
              <button className="flex-1 bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10 hover:text-white backdrop-blur-sm py-3 rounded-md transition-colors">
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}