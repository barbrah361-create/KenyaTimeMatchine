import React from 'react';
import ThreeScene from './ThreeScene';
import { Sparkles, Globe, PlaneTakeoff, Compass } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
  onShowObjectDetails: (title: string, desc: string) => void;
}

export default function LandingPage({ onEnter, onShowObjectDetails }: LandingPageProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between bg-brand-green text-brand-cream overflow-hidden p-6 select-none font-sans">
      
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-brown opacity-20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-brand-forest opacity-30 blur-[100px] rounded-full" />

      {/* Floating particles background (decorative CSS-based) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
        <div className="absolute top-1/2 left-2/3 w-2 h-2 rounded-full bg-brand-forest animate-bounce delay-3000" />
        <div className="absolute top-2/3 left-10 w-1 h-1 rounded-full bg-brand-cream animate-ping" />
      </div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-gold rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
          </div>
          <div>
            <span className="text-sm font-bold tracking-[0.25em] text-brand-cream font-mono uppercase">
              CHRONOS PORTAL
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="glass-panel px-4 py-2 rounded-full border border-white/10 text-[10px] tracking-widest uppercase font-sans">
            ● Kenya Node Active
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-6 flex-1 z-10 py-8">
        
        {/* Left: Interactive 3D Globe */}
        <div className="w-full lg:w-1/2 h-[350px] sm:h-[450px] flex items-center justify-center" id="intro-globe-container">
          <ThreeScene 
            mode="globe" 
            year={2026} 
            countyId="nairobi" 
            onObjectClick={onShowObjectDetails}
          />
        </div>

        {/* Right: Immersive Typography & Invitation */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-xs font-mono text-brand-gold">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>AFRO-FUTURISTIC CHRONICLE ENGINE</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs tracking-[0.6em] uppercase opacity-60 mb-2 font-sans">Initiating Temporal Sequence</h2>
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-serif font-black tracking-tighter leading-none text-brand-cream uppercase">
              WORLD <span className="italic font-light text-brand-gold">TIME</span> <br/>
              MACHINE
            </h1>
            <p className="text-lg sm:text-xl font-light text-brand-cream/90 max-w-md">
              Travel Through Kenya's Past, Present & Future
            </p>
          </div>

          <p className="text-sm text-brand-cream/70 max-w-lg leading-relaxed font-sans font-light">
            Welcome to a luxurious, cinematic journey across time. Slide across centuries, 
            explore interactive 3D historical environments, and consult our advanced 
            Generative AI Historian to experience Kenya like never before. Designed to 
            belong in 2035.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
            <button
              onClick={onEnter}
              className="group relative px-8 py-4 bg-transparent border border-brand-gold text-brand-gold uppercase tracking-[0.2em] text-xs font-semibold overflow-hidden transition-all hover:bg-brand-gold hover:text-brand-green flex items-center justify-center gap-2 cursor-pointer"
              id="enter-time-machine-btn"
            >
              <span className="relative z-10 flex items-center gap-2">
                <PlaneTakeoff className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                ENTER THE TIME MACHINE
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white"></div>
            </button>

            <div className="text-[10px] text-brand-cream/50 font-mono text-center sm:text-left">
              COORDINATES LOCKED: <br/>
              <span className="text-brand-gold">LAT 1.2921° S, LNG 36.8219° E</span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-6 pt-8 w-full border-t border-brand-gold/10">
            <div>
              <div className="text-2xl font-black text-brand-gold font-mono">1895</div>
              <div className="text-[10px] font-mono text-brand-cream/40 uppercase tracking-widest">START EPOCH</div>
            </div>
            <div>
              <div className="text-2xl font-black text-brand-gold font-mono">2100</div>
              <div className="text-[10px] font-mono text-brand-cream/40 uppercase tracking-widest">FUTURE BOUND</div>
            </div>
            <div>
              <div className="text-2xl font-black text-brand-cream font-mono">47</div>
              <div className="text-[10px] font-mono text-brand-cream/40 uppercase tracking-widest">COUNTIES READY</div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer credits */}
      <footer className="w-full text-center py-4 text-[10px] font-mono text-brand-cream/40 z-10 border-t border-brand-gold/10 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>© 2026 World Time Machine – Kenya Edition. All Rights Reserved.</span>
        <span className="text-brand-cream/30 uppercase tracking-[0.1em]">CRAFTED IN LUXURY AFRO-FUTURIST GRID SYSTEM</span>
      </footer>

    </div>
  );
}
