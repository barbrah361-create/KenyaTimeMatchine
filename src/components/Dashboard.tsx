import React, { useState } from 'react';
import { UserSession } from '../types';
import { Bookmark, Award, Clock, Trash2, MailCheck, ShieldCheck, Compass, CheckCircle } from 'lucide-react';

interface DashboardProps {
  userSession: UserSession | null;
  onLogout: () => void;
  onVerifyEmail: () => void;
  onDeleteBookmark: (id: string) => void;
  onRestoreBookmark: (countyId: string, year: number) => void;
}

export default function Dashboard({
  userSession,
  onLogout,
  onVerifyEmail,
  onDeleteBookmark,
  onRestoreBookmark
}: DashboardProps) {
  const [successVerify, setSuccessVerify] = useState(false);

  if (!userSession) {
    return (
      <div className="p-12 text-center bg-brand-forest/10 border border-brand-gold/15 rounded-2xl flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border border-brand-gold/10 flex items-center justify-center text-brand-cream/20 animate-pulse">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-brand-cream uppercase tracking-widest font-mono">Chronos Vault Encrypted</h3>
          <p className="text-xs text-brand-cream/60 max-w-xs mt-1 leading-relaxed font-sans">
            Please register or sign in via the top corner portal to access travel achievements, saved coordinate nodes, and historical diaries.
          </p>
        </div>
      </div>
    );
  }

  const handleVerify = () => {
    onVerifyEmail();
    setSuccessVerify(true);
    setTimeout(() => setSuccessVerify(false), 3000);
  };

  return (
    <div className="space-y-8" id="traveler-dashboard-module">
      
      {/* Bento Row 1: Profile Header Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="p-6 bg-brand-green border border-brand-gold/15 rounded-2xl flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
          
          <img 
            src={userSession.avatar} 
            alt={userSession.displayName} 
            className="w-16 h-16 rounded-2xl border-2 border-brand-gold/30 object-cover"
          />

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-serif font-bold text-brand-cream">{userSession.displayName}</span>
              {userSession.isVerified ? (
                <ShieldCheck className="w-4.5 h-4.5 text-brand-gold" title="Quantum Verified Traveler" />
              ) : (
                <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-brand-gold/20 text-brand-gold font-semibold">UNVERIFIED</span>
              )}
            </div>
            <span className="text-xs text-brand-cream/60 block font-mono">{userSession.email}</span>

            {/* Simulated instant email verification button */}
            {!userSession.isVerified && (
              <button
                onClick={handleVerify}
                className="mt-2 text-[10px] font-mono text-brand-gold hover:text-brand-cream flex items-center gap-1 bg-transparent hover:underline cursor-pointer"
                id="verify-email-btn"
              >
                {successVerify ? <CheckCircle className="w-3.5 h-3.5 text-brand-gold animate-bounce" /> : <MailCheck className="w-3.5 h-3.5" />}
                {successVerify ? 'VERIFY SIGNAL REGISTERED!' : 'SIMULATE EMAIL VERIFICATION'}
              </button>
            )}
          </div>
        </div>

        {/* Traveler stats node */}
        <div className="p-6 bg-brand-forest/10 border border-brand-gold/15 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-brand-cream/40 tracking-wider block uppercase font-bold">CURRENT LEVEL</span>
            <span className="text-2xl font-serif font-black text-brand-gold tracking-tight block mt-1">CHRONOS CADET</span>
          </div>
          <div className="flex justify-between text-xs pt-4 border-t border-brand-gold/10">
            <div>
              <span className="text-brand-cream/40 text-[9px] block font-mono">JUMPS LOCKED</span>
              <span className="font-bold text-brand-cream font-mono">14 / 16 Era Coordinates</span>
            </div>
            <div>
              <span className="text-brand-cream/40 text-[9px] block font-mono">BADGES ACQUIRED</span>
              <span className="font-bold text-brand-cream font-mono">{userSession.achievements.length}</span>
            </div>
          </div>
        </div>

        {/* Quick controls panel */}
        <div className="p-6 bg-brand-forest/10 border border-brand-gold/15 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-brand-cream/40 tracking-wider block uppercase font-bold">PORTAL SECURITY</span>
            <span className="text-xs text-brand-cream/70 block mt-1 leading-relaxed">
              Your session history is secured within this container sandbox.
            </span>
          </div>
          <button 
            onClick={onLogout}
            className="w-full mt-4 py-2 bg-red-900/10 hover:bg-red-900/20 text-red-300 hover:text-red-200 border border-red-500/20 text-xs font-mono rounded cursor-pointer transition-colors"
            id="btn-logout"
          >
            DISCONNECT TIME TERMINAL
          </button>
        </div>

      </div>

      {/* Bento Row 2: Bookmarked Coordinates & Achievements List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bookmarks (Left 2 columns) */}
        <div className="lg:col-span-2 p-6 bg-brand-forest/10 border border-brand-gold/15 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-gold/10">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4.5 h-4.5 text-brand-gold" />
              <h3 className="text-sm font-serif font-bold text-brand-cream uppercase tracking-wider">
                Bookmarked Coordinate Nodes ({userSession.savedJourneys.length})
              </h3>
            </div>
            <span className="text-[9px] font-mono text-brand-cream/40 font-bold">SAVED DECK</span>
          </div>

          {userSession.savedJourneys.length === 0 ? (
            <div className="py-12 text-center text-brand-cream/40 font-mono text-xs">
              📂 Coordinate files empty. Travel to any year and tap "BOOKMARK COORDINATE" to store nodes here.
            </div>
          ) : (
            <div className="space-y-3">
              {userSession.savedJourneys.map((j) => (
                <div 
                  key={j.id}
                  className="p-4 bg-brand-green/60 rounded border border-brand-gold/10 flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-brand-forest/20 border border-brand-gold/20 text-[9px] font-mono text-brand-gold uppercase tracking-widest font-bold">
                        {j.countyId}
                      </span>
                      <span className="text-xs font-bold text-brand-gold font-mono">
                        Node Year: {j.year}
                      </span>
                      <span className="text-[9px] font-mono text-brand-cream/40">
                        ({new Date(j.savedAt).toLocaleDateString()})
                      </span>
                    </div>
                    <p className="text-xs text-brand-cream/80 leading-relaxed font-sans font-light">
                      {j.notes}
                    </p>
                    <button
                      onClick={() => onRestoreBookmark(j.countyId, j.year)}
                      className="text-[10px] font-mono text-brand-gold hover:text-brand-cream flex items-center gap-1 mt-1 bg-transparent hover:underline cursor-pointer"
                      id={`restore-bookmark-${j.id}`}
                    >
                      ACTIVATE QUANTUM BRIDGE 🚀
                    </button>
                  </div>

                  <button
                    onClick={() => onDeleteBookmark(j.id)}
                    title="Delete record"
                    className="p-1.5 rounded bg-brand-forest/10 border border-brand-gold/15 text-brand-cream/40 hover:text-red-400 hover:bg-brand-forest/20 transition-all cursor-pointer"
                    id={`delete-bookmark-${j.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Achievements (Right 1 column) */}
        <div className="p-6 bg-brand-forest/10 border border-brand-gold/15 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-gold/10">
            <div className="flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-brand-gold" />
              <h3 className="text-sm font-serif font-bold text-brand-cream uppercase tracking-wider">
                Travel Badges ({userSession.achievements.length})
              </h3>
            </div>
            <span className="text-[9px] font-mono text-brand-cream/40 font-bold">UNLOCKED</span>
          </div>

          <div className="space-y-4">
            {userSession.achievements.map((ach) => (
              <div key={ach.id} className="flex gap-3 p-3 bg-brand-green/40 rounded border border-brand-gold/10">
                <div className="w-10 h-10 rounded bg-brand-forest/15 border border-brand-gold/25 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <Award className="w-5 h-5 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-brand-cream block">
                    {ach.title}
                  </span>
                  <p className="text-[10px] text-brand-cream/70 leading-normal font-sans font-light">
                    {ach.description}
                  </p>
                  <span className="text-[8px] font-mono text-brand-cream/40 block pt-0.5">
                    Unlocked: {new Date(ach.unlockedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
