import React, { useState, useEffect } from 'react';
import ThreeScene from './components/ThreeScene';
import LandingPage from './components/LandingPage';
import Timeline from './components/Timeline';
import AIHistorian from './components/AIHistorian';
import HistoricalDatabase from './components/HistoricalDatabase';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import { COUNTIES, HISTORICAL_YEARS } from './data/historyData';
import { UserSession } from './types';
import { 
  Compass, 
  Clock, 
  Database, 
  Sparkles, 
  User, 
  ShieldAlert, 
  LogIn, 
  MapPin, 
  Globe, 
  Tv, 
  Share2, 
  Sun, 
  Moon, 
  Type, 
  Check, 
  X,
  Volume2
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<'landing' | 'timemachine' | 'archives' | 'dashboard' | 'admin'>('landing');
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedCountyId, setSelectedCountyId] = useState('nairobi');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [language, setLanguage] = useState<'EN' | 'SW'>('EN');

  // Authentication & session state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  // Active chat session state (for AI Historian)
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(undefined);

  // Raycast clicked building/model inspector state
  const [inspectedObject, setInspectedObject] = useState<{ title: string; desc: string } | null>(null);

  // Social share dialog simulation state
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Initialize from mock database on mount if session is cached
  useEffect(() => {
    // Try to auto-log in with the default pre-populated traveler Barbrah
    const autoLogin = async () => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'barbrah361@gmail.com', password: 'password123' })
        });
        const data = await res.json();
        if (res.ok) {
          // Unify with saved journeys and achievements
          const r1 = await fetch(`/api/user/${data.user.userId}/saved-journeys`);
          const s1 = await r1.json();

          const r2 = await fetch(`/api/user/${data.user.userId}/achievements`);
          const s2 = await r2.json();

          setUserSession({
            userId: data.user.userId,
            email: data.user.email,
            displayName: data.user.displayName,
            avatar: data.user.avatar,
            isVerified: data.user.isVerified,
            savedJourneys: s1 || [],
            achievements: s2 || [],
            conversationHistory: []
          });
        }
      } catch (err) {
        console.warn("Auto login offline fallback or server not running yet.");
      }
    };
    autoLogin();
  }, []);

  // Handle derived selected county details
  const currentCounty = COUNTIES.find(c => c.id === selectedCountyId) || COUNTIES[0];

  // Actions
  const handleAuthSuccess = (user: any) => {
    setUserSession({
      userId: user.userId,
      email: user.email,
      displayName: user.displayName,
      avatar: user.avatar,
      isVerified: user.isVerified,
      savedJourneys: [],
      achievements: [
        {
          id: 'ach-welcome',
          title: "Portal Clearance",
          description: "Configured your sovereign Chronos traveler ID signal.",
          unlockedAt: new Date().toISOString(),
          icon: "Shield"
        }
      ],
      conversationHistory: []
    });
  };

  const handleLogout = () => {
    setUserSession(null);
    setActiveSection('landing');
  };

  const handleVerifyEmail = async () => {
    if (!userSession) return;
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userSession.userId })
      });
      const data = await res.json();
      if (res.ok) {
        setUserSession(prev => prev ? { ...prev, isVerified: true } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddBookmark = async (year: number, notes: string) => {
    if (!userSession) return;
    try {
      const res = await fetch('/api/user/saved-journeys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userSession.userId,
          countyId: selectedCountyId,
          year,
          notes
        })
      });
      const data = await res.json();
      if (res.ok) {
        // Refresh bookmarks and achievements
        const r1 = await fetch(`/api/user/${userSession.userId}/saved-journeys`);
        const s1 = await r1.json();

        setUserSession(prev => prev ? {
          ...prev,
          savedJourneys: s1 || [],
          achievements: data.achievements || prev.achievements
        } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    if (!userSession) return;
    try {
      const res = await fetch(`/api/user/saved-journeys/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUserSession(prev => prev ? {
          ...prev,
          savedJourneys: prev.savedJourneys.filter(b => b.id !== id)
        } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestoreBookmark = (countyId: string, year: number) => {
    setSelectedCountyId(countyId);
    setCurrentYear(year);
    setActiveSection('timemachine');
  };

  // Jump from timeline predefined list directly to chat Focus
  const handleInitiateAIChat = (suggestedMsg: string) => {
    setInitialQuery(suggestedMsg);
    // Smooth scroll down to chat element
    const chatEl = document.getElementById('ai-historian-chat-window');
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerShareSimulation = () => {
    setShowShareModal(true);
  };

  const confirmShare = () => {
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      setShowShareModal(false);
    }, 2000);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 ${
      theme === 'dark' ? 'bg-brand-green text-brand-cream' : 'bg-[#FAF9F5] text-brand-brown'
    } ${
      fontSize === 'large' ? 'text-base' : fontSize === 'huge' ? 'text-lg' : 'text-sm'
    }`}>
      
      {/* GLOBAL HUD HEADER GLASSBAR */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
        theme === 'dark' ? 'bg-brand-green/80 border-brand-gold/15' : 'bg-[#FAF9F5]/90 border-brand-brown/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveSection('landing')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
            id="brand-logo-trigger"
          >
            <div className="w-8 h-8 border border-brand-gold rotate-45 flex items-center justify-center bg-brand-green">
              <div className="w-2 h-2 bg-brand-gold rounded-full -rotate-45" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-widest font-serif text-brand-cream block">
                CHRONOS <span className="text-brand-gold italic font-light">PORTAL</span>
              </span>
              <span className="text-[9px] font-mono text-brand-gold block uppercase font-bold tracking-[0.15em] -mt-1">
                KENYA EDITION
              </span>
            </div>
          </div>

          {/* Navigation deck */}
          {activeSection !== 'landing' && (
            <nav className="hidden md:flex items-center gap-1 bg-brand-green/30 p-1.5 rounded border border-brand-gold/10 text-[11px] font-mono">
              <button
                onClick={() => setActiveSection('timemachine')}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeSection === 'timemachine' 
                    ? 'bg-brand-gold text-brand-green font-bold' 
                    : 'text-brand-cream/60 hover:text-brand-cream hover:bg-brand-forest/15'
                }`}
                id="nav-link-timemachine"
              >
                <Clock className="w-3.5 h-3.5" />
                TIME TRAVEL
              </button>

              <button
                onClick={() => setActiveSection('archives')}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeSection === 'archives' 
                    ? 'bg-brand-gold text-brand-green font-bold' 
                    : 'text-brand-cream/60 hover:text-brand-cream hover:bg-brand-forest/15'
                }`}
                id="nav-link-archives"
              >
                <Database className="w-3.5 h-3.5" />
                ARCHIVES
              </button>

              <button
                onClick={() => setActiveSection('dashboard')}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeSection === 'dashboard' 
                    ? 'bg-brand-gold text-brand-green font-bold' 
                    : 'text-brand-cream/60 hover:text-brand-cream hover:bg-brand-forest/15'
                }`}
                id="nav-link-dashboard"
              >
                <User className="w-3.5 h-3.5" />
                MY DASHBOARD
              </button>

              <button
                onClick={() => setActiveSection('admin')}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeSection === 'admin' 
                    ? 'bg-brand-gold text-brand-green font-bold' 
                    : 'text-brand-cream/60 hover:text-brand-cream hover:bg-brand-forest/15'
                }`}
                id="nav-link-admin"
              >
                <Sparkles className="w-3.5 h-3.5" />
                ADMIN PANEL
              </button>
            </nav>
          )}

          {/* Accessibility & Theme Toggles bar */}
          <div className="flex items-center gap-3">
            
            {/* Font Sizer */}
            <div className="flex items-center gap-1 border border-brand-gold/15 rounded p-0.5 bg-brand-forest/10">
              <button 
                onClick={() => setFontSize('normal')}
                className={`text-[9px] px-1.5 py-1 rounded font-mono ${fontSize === 'normal' ? 'bg-brand-gold text-brand-green font-bold' : 'text-brand-cream/40 hover:text-brand-cream/80'}`}
                title="Normal text"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`text-[10px] px-1.5 py-1 rounded font-mono ${fontSize === 'large' ? 'bg-brand-gold text-brand-green font-bold' : 'text-brand-cream/40 hover:text-brand-cream/80'}`}
                title="Large text"
              >
                A+
              </button>
              <button 
                onClick={() => setFontSize('huge')}
                className={`text-xs px-1.5 py-1 rounded font-mono ${fontSize === 'huge' ? 'bg-brand-gold text-brand-green font-bold' : 'text-brand-cream/40 hover:text-brand-cream/80'}`}
                title="Huge text"
              >
                A++
              </button>
            </div>

            {/* Language Translate Toggle */}
            <button
              onClick={() => setLanguage(language === 'EN' ? 'SW' : 'EN')}
              className="px-2 py-1 rounded bg-brand-forest/10 border border-brand-gold/25 text-[10px] font-mono text-brand-gold uppercase tracking-widest font-bold hover:bg-brand-forest/20 cursor-pointer"
              title="Toggle Kiswahili translation"
              id="global-translate-toggle"
            >
              {language === 'EN' ? '🇬🇧 EN' : '🇰🇪 SW'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded bg-brand-forest/10 border border-brand-gold/25 text-brand-gold hover:bg-brand-forest/20 cursor-pointer"
              title="Toggle Dark/Light contrast mode"
              id="global-theme-toggle"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4 text-brand-gold" />}
            </button>

            {/* Sharing portal */}
            {activeSection !== 'landing' && (
              <button
                onClick={triggerShareSimulation}
                className="p-1.5 rounded bg-brand-forest/10 border border-brand-gold/25 text-brand-gold hover:text-brand-cream cursor-pointer"
                title="Share temporal timeline coordinates"
                id="global-share-btn"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}

            {/* Auth Portal Button */}
            {userSession ? (
              <div 
                onClick={() => setActiveSection('dashboard')}
                className="flex items-center gap-2 cursor-pointer hover:opacity-95 p-1 rounded border border-brand-gold/20 bg-brand-forest/10"
                id="header-user-avatar-trigger"
              >
                <img src={userSession.avatar} alt="" className="w-6.5 h-6.5 rounded object-cover" />
                <span className="hidden sm:inline text-[10px] font-mono text-brand-gold max-w-[80px] truncate font-bold">
                  {userSession.displayName.split(' ')[0]}
                </span>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-3 py-1.5 bg-transparent border border-brand-gold text-brand-gold font-bold text-[10px] font-mono rounded hover:bg-brand-gold hover:text-brand-green transition-all flex items-center gap-1 cursor-pointer"
                id="connect-portal-btn"
              >
                <LogIn className="w-3.5 h-3.5" />
                CONNECT PORTAL
              </button>
            )}

          </div>

        </div>
      </header>

      {/* RENDER ACTIVE ROUTE OR SECTION */}
      {activeSection === 'landing' ? (
        <LandingPage 
          onEnter={() => setActiveSection('timemachine')} 
          onShowObjectDetails={(title, desc) => setInspectedObject({ title, desc })}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full space-y-12 animate-fade-in">
          
          {/* Quick HUD Navigation bar specifically for mobile */}
          <div className="md:hidden flex justify-around bg-brand-green/80 p-2 border border-brand-gold/20 rounded-xl text-[10px] font-mono">
            <button 
              onClick={() => setActiveSection('timemachine')}
              className={`p-2 rounded ${activeSection === 'timemachine' ? 'text-brand-gold font-bold bg-brand-forest/20' : 'text-brand-cream/50'}`}
            >
              TRAVEL
            </button>
            <button 
              onClick={() => setActiveSection('archives')}
              className={`p-2 rounded ${activeSection === 'archives' ? 'text-brand-gold font-bold bg-brand-forest/20' : 'text-brand-cream/50'}`}
            >
              ARCHIVES
            </button>
            <button 
              onClick={() => setActiveSection('dashboard')}
              className={`p-2 rounded ${activeSection === 'dashboard' ? 'text-brand-gold font-bold bg-brand-forest/20' : 'text-brand-cream/50'}`}
            >
              DASHBOARD
            </button>
            <button 
              onClick={() => setActiveSection('admin')}
              className={`p-2 rounded ${activeSection === 'admin' ? 'text-brand-gold font-bold bg-brand-forest/20' : 'text-brand-cream/50'}`}
            >
              ADMIN
            </button>
          </div>

          {activeSection === 'timemachine' && (
            <div className="space-y-10">
              
              {/* Region and Coordinate selector banner */}
              <div className="p-4 bg-brand-forest/10 rounded-xl border border-brand-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4.5 h-4.5 text-brand-gold animate-bounce" />
                  <span className="text-xs font-mono text-brand-cream/60">SELECT GEOGRAPHIC DESTINATION:</span>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  {/* County selector */}
                  <select
                    value={selectedCountyId}
                    onChange={(e) => setSelectedCountyId(e.target.value)}
                    className="bg-brand-green border border-brand-gold/25 px-3 py-1.5 rounded text-xs text-brand-cream focus:outline-none focus:border-brand-gold/50 cursor-pointer"
                    id="county-picker"
                  >
                    {COUNTIES.map(c => (
                      <option key={c.id} value={c.id} className="bg-brand-green text-brand-cream">County: {c.name}</option>
                    ))}
                  </select>

                  {/* Derived Town/City (Simulated derived coordinate value) */}
                  <div className="px-3 py-1.5 bg-brand-green border border-brand-gold/25 rounded text-xs font-mono text-brand-cream/60">
                    City/Town: <span className="text-brand-gold font-bold">{currentCounty.capital}</span>
                  </div>
                </div>
              </div>

              {/* Main Split: Left (3D view) & Right (Timeline Console) */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                
                {/* Left 3D View Screen (3 Cols) */}
                <div className="lg:col-span-3 h-[450px] lg:h-[550px] flex flex-col justify-between" id="active-3d-scene-container">
                  <ThreeScene 
                    mode="scene" 
                    year={currentYear} 
                    countyId={selectedCountyId} 
                    onObjectClick={(title, desc) => setInspectedObject({ title, desc })}
                  />
                </div>

                {/* Right Timeline profile HUD (2 Cols) */}
                <div className="lg:col-span-2">
                  <Timeline 
                    currentYear={currentYear}
                    onYearChange={setCurrentYear}
                    selectedCountyId={selectedCountyId}
                    selectedCityName={currentCounty.capital}
                    isLoggedIn={!!userSession}
                    userId={userSession?.userId || ''}
                    onAddBookmark={handleAddBookmark}
                    onInitiateAIChat={handleInitiateAIChat}
                  />
                </div>

              </div>

              {/* Bottom: Generative AI Historian Chat Box */}
              <div className="pt-6 border-t border-brand-gold/15">
                <AIHistorian 
                  currentYear={currentYear}
                  selectedCountyName={currentCounty.name}
                  selectedCityName={currentCounty.capital}
                  chatHistory={chatHistory}
                  onAddMessage={(msg) => setChatHistory(prev => [...prev, msg])}
                  onClearHistory={() => setChatHistory([])}
                  initialQuery={initialQuery}
                  onResetInitialQuery={() => setInitialQuery(undefined)}
                />
              </div>

            </div>
          )}

          {activeSection === 'archives' && (
            <HistoricalDatabase onInitiateAIChat={handleInitiateAIChat} />
          )}

          {activeSection === 'dashboard' && (
            <Dashboard 
              userSession={userSession}
              onLogout={handleLogout}
              onVerifyEmail={handleVerifyEmail}
              onDeleteBookmark={handleDeleteBookmark}
              onRestoreBookmark={handleRestoreBookmark}
            />
          )}

          {activeSection === 'admin' && (
            <AdminPanel onAddMessage={(msg) => setChatHistory(prev => [...prev, msg])} />
          )}

        </div>
      )}

      {/* 1. AUTHENTICATION MODAL */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* 2. THREE.JS CLICK INSPECTION OVERLAY */}
      {inspectedObject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-green/90 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-brand-green border border-brand-gold/30 rounded-2xl p-6 space-y-4 shadow-xl gold-glow">
            <button 
              onClick={() => setInspectedObject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-brand-forest/10 border border-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-brand-green transition-all cursor-pointer"
              id="close-inspector-btn"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest font-bold">
                🎯 Chronology Object Inspection
              </span>
              <h3 className="text-xl font-serif font-black text-brand-cream leading-snug">
                {inspectedObject.title}
              </h3>
            </div>

            <p className="text-xs text-brand-cream/80 leading-relaxed font-sans border-t border-brand-gold/15 pt-3">
              {inspectedObject.desc}
            </p>

            <button 
              onClick={() => {
                handleInitiateAIChat(`Can you explain more details and historical significance of: "${inspectedObject.title}"?`);
                setInspectedObject(null);
              }}
              className="w-full py-3 bg-brand-gold text-brand-green hover:bg-brand-cream hover:text-brand-green font-extrabold text-xs tracking-wider rounded transition-all cursor-pointer"
              id="inspect-ask-ai-button"
            >
              CONSULT AI HISTORIAN ABOUT THIS OBJECT
            </button>
          </div>
        </div>
      )}

      {/* 3. SIMULATED SOCIAL SHARING PORTAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-green/95 backdrop-blur-md">
          <div className="relative w-full max-w-sm bg-brand-green border border-brand-gold/30 rounded-2xl p-6 text-center space-y-4 gold-glow">
            <button 
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-brand-gold hover:text-brand-cream cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mx-auto w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold">
              <Share2 className="w-5 h-5 animate-pulse" />
            </div>

            <div>
              <span className="text-xs font-bold text-brand-cream uppercase tracking-wider block">Transmit Travel Coordinates</span>
              <p className="text-[10px] text-brand-cream/60 mt-1">
                Generate a dynamic Chronos link to share your current location node:
              </p>
              <span className="text-[10px] font-mono text-brand-gold block mt-1 bg-brand-forest/10 py-1.5 px-2 rounded border border-brand-gold/15">
                https://chronos.kenya/travel?county={selectedCountyId}&year={currentYear}
              </span>
            </div>

            {shareSuccess && (
              <p className="text-xs text-brand-gold font-mono animate-bounce font-bold">
                ✓ BEACON SIGNAL COPIED TO TRAVEL DECK!
              </p>
            )}

            <button
              onClick={confirmShare}
              className="w-full py-2.5 bg-brand-gold text-brand-green hover:bg-brand-cream font-extrabold text-xs tracking-wider rounded cursor-pointer transition-all"
              id="confirm-share-button"
            >
              COPY CHRONOS SIGNAL LINK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
