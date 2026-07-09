import React, { useState } from 'react';
import { UserSession } from '../types';
import { X, Lock, Mail, User, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isForgot) {
        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (res.ok) {
          setSuccess("Recovery link sent! (Simulated to your email inbox.)");
        } else {
          setError(data.error || "An error occurred.");
        }
      } else if (isRegister) {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, displayName })
        });
        const data = await res.json();
        if (res.ok) {
          setSuccess("Registration successful! Initiating quantum travel clearance...");
          // Automatically log in
          setTimeout(() => {
            onAuthSuccess(data.user);
            onClose();
          }, 1500);
        } else {
          setError(data.error || "Failed to register.");
        }
      } else {
        // Login
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
          setSuccess("Travel coordinates unlocked! Welcome back traveler.");
          setTimeout(() => {
            onAuthSuccess(data.user);
            onClose();
          }, 1000);
        } else {
          setError(data.error || "Failed to login.");
        }
      }
    } catch (err: any) {
      setError("Server connection lost. Please check if the port is busy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050a05]/90 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md overflow-hidden bg-brand-green rounded-2xl border border-brand-gold/25 shadow-2xl shadow-brand-gold/5 p-6 md:p-8 animate-fade-in"
        id="auth-modal-card"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent blur-sm" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-brand-cream/60 hover:text-brand-cream rounded-full bg-brand-forest/10 hover:bg-brand-forest/20 transition-colors cursor-pointer"
          id="btn-close-auth"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-forest/15 border border-brand-gold/20 text-brand-gold mb-3 animate-pulse">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-serif tracking-tight text-brand-cream">
            {isForgot ? 'TRAVEL PORTAL RECOVERY' : isRegister ? 'CREATE CHRONOS ID' : 'TRANSMIT CHRONOS ID'}
          </h3>
          <p className="text-xs text-brand-cream/60 mt-1 font-sans">
            {isForgot ? 'Reset your traveler credentials' : 'World Time Machine – Kenya Edition Portal'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-500/30 rounded text-red-300 text-xs mb-4 text-center">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded text-brand-cream text-xs mb-4 text-center animate-pulse">
            ✨ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && !isForgot && (
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-brand-cream/60 mb-1.5 font-bold">FULL NAME</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/40" />
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Jomo Kiprop" 
                  required
                  className="w-full bg-brand-forest/10 border border-brand-gold/15 rounded py-2.5 pl-10 pr-4 text-sm text-brand-cream focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all placeholder-brand-cream/30"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono tracking-wider text-brand-cream/60 mb-1.5 font-bold">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/40" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="traveler@domain.com" 
                required
                className="w-full bg-brand-forest/10 border border-brand-gold/15 rounded py-2.5 pl-10 pr-4 text-sm text-brand-cream focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all placeholder-brand-cream/30"
              />
            </div>
          </div>

          {!isForgot && (
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-brand-cream/60 mb-1.5 font-bold">SECURE KEY (PASSWORD)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/40" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  className="w-full bg-brand-forest/10 border border-brand-gold/15 rounded py-2.5 pl-10 pr-4 text-sm text-brand-cream focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all placeholder-brand-cream/30"
                />
              </div>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-gold hover:bg-brand-gold/90 active:scale-98 text-brand-green font-serif font-extrabold text-sm rounded py-3 transition-all flex items-center justify-center mt-6 disabled:opacity-50 cursor-pointer shadow-lg shadow-brand-gold/15"
            id="auth-submit-btn"
          >
            {loading ? 'TRANSMITTING...' : isForgot ? 'REQUEST RESET KEY' : isRegister ? 'LAUNCH MY CHRONOS PATH' : 'TRANSMIT PORTAL KEY'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-brand-gold/10 text-center space-y-2">
          {!isForgot ? (
            <>
              <p className="text-xs text-brand-cream/60">
                {isRegister ? 'Already registered?' : 'First time traveler?'}
                <button 
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-brand-gold hover:text-brand-cream font-medium ml-1 bg-transparent hover:underline focus:outline-none cursor-pointer"
                  id="auth-toggle-reg"
                >
                  {isRegister ? 'Transmit Credentials' : 'Configure Chronos ID'}
                </button>
              </p>
              {!isRegister && (
                <button 
                  onClick={() => setIsForgot(true)}
                  className="text-xs text-brand-cream/40 hover:text-brand-cream/80 bg-transparent hover:underline focus:outline-none cursor-pointer"
                  id="auth-toggle-forgot"
                >
                  Forgot your Secure Key?
                </button>
              )}
            </>
          ) : (
            <button 
              onClick={() => setIsForgot(false)}
              className="text-xs text-brand-gold hover:text-brand-cream bg-transparent hover:underline font-medium focus:outline-none cursor-pointer"
              id="auth-toggle-login"
            >
              Back to Portal Transmission
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
