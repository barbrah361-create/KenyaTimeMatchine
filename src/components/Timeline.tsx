import React, { useState } from 'react';
import { HISTORICAL_YEARS, HistoricalYearData } from '../data/historyData';
import { Bookmark, Volume2, VolumeX, Sparkles, AlertCircle, MapPin, Calendar, HelpCircle, ArrowRight } from 'lucide-react';

interface TimelineProps {
  currentYear: number;
  onYearChange: (year: number) => void;
  selectedCountyId: string;
  selectedCityName: string;
  isLoggedIn: boolean;
  userId: string;
  onAddBookmark: (year: number, notes: string) => void;
  onInitiateAIChat: (suggestedMsg: string) => void;
}

export default function Timeline({
  currentYear,
  onYearChange,
  selectedCountyId,
  selectedCityName,
  isLoggedIn,
  userId,
  onAddBookmark,
  onInitiateAIChat
}: TimelineProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'SW'>('EN');
  const [bookmarkNotes, setBookmarkNotes] = useState('');
  const [showBookmarkPrompt, setShowBookmarkPrompt] = useState(false);

  const eraData: HistoricalYearData = HISTORICAL_YEARS.find(y => y.year === currentYear) || HISTORICAL_YEARS[HISTORICAL_YEARS.length - 2];

  // Narrate current era using native browser Speech Synthesis (Kiswahili / English!)
  const handleVoiceNarration = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToSpeak = language === 'EN' 
          ? `In ${eraData.year}, the era of ${eraData.title}. Technology: ${eraData.technology}. Transport: ${eraData.transport}. Environment: ${eraData.description}`
          : `Katika mwaka wa ${eraData.year}. ${eraData.kiswahiliSummary}. Teknolojia: ${eraData.technology}. Usafiri: ${eraData.transport}`;

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        // Try to match a Swahili or British voice if available
        const voices = window.speechSynthesis.getVoices();
        if (language === 'SW') {
          const swahiliVoice = voices.find(v => v.lang.startsWith('sw') || v.lang.startsWith('it')); // Swahili or phonetic match
          if (swahiliVoice) utterance.voice = swahiliVoice;
        } else {
          const ukVoice = voices.find(v => v.lang.startsWith('en-GB') || v.lang.startsWith('en-US'));
          if (ukVoice) utterance.voice = ukVoice;
        }

        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);

        setIsPlayingAudio(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert("Voice speech synthesis is not supported on your browser container.");
    }
  };

  const submitBookmark = () => {
    onAddBookmark(currentYear, bookmarkNotes || `Saved coordinates for ${selectedCityName} in ${currentYear}`);
    setBookmarkNotes('');
    setShowBookmarkPrompt(false);
  };

  return (
    <div className="w-full space-y-6" id="chronos-timeline-module">
      
      {/* Year Horizontal Slider Slider Rail */}
      <div className="p-5 bg-brand-forest/10 backdrop-blur-md rounded-2xl border border-brand-gold/15">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-brand-gold animate-pulse" />
            <h4 className="text-xs font-mono font-bold text-brand-cream/80 tracking-widest uppercase">
              Drag Quantum Slider to Travel
            </h4>
          </div>
          <div className="text-sm font-black text-brand-gold font-mono">
            COORDINATE NODE: <span className="text-brand-cream underline">{currentYear}</span>
          </div>
        </div>

        {/* Dynamic Timeline Slider */}
        <div className="relative flex items-center justify-between mt-6 px-1.5">
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-brand-forest/20 via-brand-gold/20 to-brand-brown/20 rounded-full" />
          
          {HISTORICAL_YEARS.map((data) => {
            const isSelected = data.year === currentYear;
            return (
              <button
                key={data.year}
                onClick={() => {
                  if (isPlayingAudio) {
                    window.speechSynthesis.cancel();
                    setIsPlayingAudio(false);
                  }
                  onYearChange(data.year);
                }}
                className={`relative z-10 flex flex-col items-center group cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-110' : 'hover:scale-105'
                }`}
                id={`timeline-btn-${data.year}`}
              >
                {/* Year dot */}
                <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                  isSelected 
                    ? 'bg-brand-gold border-brand-green shadow-lg shadow-brand-gold/50 ring-4 ring-brand-gold/20' 
                    : 'bg-brand-green border-brand-gold/20 group-hover:border-brand-gold/50'
                }`} />

                {/* Mini year indicator tag */}
                <span className={`text-[9px] font-mono font-bold mt-2 tracking-wider ${
                  isSelected ? 'text-brand-gold font-black' : 'text-brand-cream/40 group-hover:text-brand-cream/80'
                }`}>
                  {data.year}
                </span>

                {data.isFuture && (
                  <span className="absolute -top-4 text-[7px] font-mono px-1 rounded bg-brand-gold/20 text-brand-gold uppercase scale-75 font-semibold">
                    AI Future
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Epoch Content Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Chronology Details */}
        <div className="md:col-span-2 space-y-6 bg-brand-forest/10 backdrop-blur-lg border border-brand-gold/15 p-6 sm:p-8 rounded-2xl relative overflow-hidden">
          {/* Glass background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-forest/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-brand-gold/15">
            <div>
              <div className="text-[10px] font-mono text-brand-gold tracking-widest uppercase mb-1 font-bold">
                {eraData.era}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-cream tracking-tight">
                {eraData.title}
              </h2>
            </div>

            {/* Quick Narration Toggles */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setLanguage(language === 'EN' ? 'SW' : 'EN')}
                className="px-2.5 py-1 rounded bg-brand-forest/10 border border-brand-gold/20 text-[10px] font-mono text-brand-cream/80 hover:text-brand-cream cursor-pointer"
                id="toggle-narration-lang"
              >
                {language === 'EN' ? '🇬🇧 ENGLISH' : '🇰🇪 KISWAHILI'}
              </button>
              <button
                onClick={handleVoiceNarration}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono transition-colors cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-red-900/10 border-red-500/30 text-red-400 hover:bg-red-900/30'
                    : 'bg-brand-forest/10 border-brand-gold/30 text-brand-gold hover:bg-brand-forest/20'
                }`}
                id="voice-narrator-btn"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                    STOP
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    AUDIO NARRATE
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono tracking-widest uppercase text-brand-cream/40">ERA SUMMARY</h4>
            <p className="text-brand-cream/80 text-sm leading-relaxed">
              {eraData.description}
            </p>
            {language === 'SW' && (
              <p className="text-brand-cream/70 text-xs italic bg-brand-green/40 p-3 rounded border border-brand-gold/10 mt-2">
                Kiswahili: {eraData.kiswahiliSummary}
              </p>
            )}
          </div>

          {/* Historic Events Timeline Block */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono tracking-widest uppercase text-brand-cream/40">CRITICAL CHRONOLOGY EVENTS</h4>
            <div className="space-y-3">
              {eraData.events.map((ev, idx) => (
                <div key={idx} className="p-3.5 bg-brand-green/60 rounded border border-brand-gold/10 flex items-start gap-3">
                  <div className={`mt-1.5 w-2 h-2 rounded-full ${
                    ev.category === 'politics' ? 'bg-red-400' :
                    ev.category === 'culture' ? 'bg-brand-gold' :
                    ev.category === 'nature' ? 'bg-brand-forest' : 'bg-blue-400'
                  }`} />
                  <div>
                    <span className="text-xs font-bold text-brand-cream block">{ev.title}</span>
                    <p className="text-xs text-brand-cream/60 mt-1">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Facts & Trivia */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono tracking-widest uppercase text-brand-cream/40">CHRONOS RECORDINGS & TRIVIA</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {eraData.facts.map((fact, idx) => (
                <div key={idx} className="p-3 bg-brand-forest/10 border border-brand-gold/10 rounded">
                  <p className="text-[11px] text-brand-cream/70 leading-relaxed font-sans">
                    💡 {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Speculative Labeled Notice if Future */}
          {eraData.isFuture && (
            <div className="p-3 bg-brand-gold/10 border border-brand-gold/20 rounded flex gap-2">
              <AlertCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-brand-gold font-mono leading-relaxed">
                <strong>SPECULATIVE FUTURE RECORD:</strong> This scenario is generated dynamically based on ongoing technological paths in the Silicon Savannah, ecological targets, and geothermal indexes. It is not historical fact.
              </p>
            </div>
          )}

        </div>

        {/* Right Col: Travelers Info & Quick Action Console */}
        <div className="space-y-6">
          
          {/* 1. Quick Metrics HUD */}
          <div className="p-5 bg-brand-forest/10 border border-brand-gold/15 rounded-2xl space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase pb-2 border-b border-brand-gold/15">
              TRAVEL COORDINATES HUB
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-mono text-brand-cream/40 block">POPULATION</span>
                <span className="text-xs font-bold text-brand-cream">{eraData.population}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-brand-cream/40 block">CORE TECHNOLOGY</span>
                <span className="text-xs font-bold text-brand-cream">{eraData.technology}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-brand-cream/40 block">PRIMARY TRANSPORT</span>
                <span className="text-xs font-bold text-brand-cream">{eraData.transport}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-brand-cream/40 block">MUSIC STYLE</span>
                <span className="text-xs font-bold text-brand-cream">{eraData.music}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-brand-cream/40 block">LOCAL DIALECT</span>
                <span className="text-xs font-bold text-brand-cream">{eraData.language}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-brand-cream/40 block">ECOSYSTEM STATUS</span>
                <span className="text-xs font-bold text-brand-cream">{eraData.environment}</span>
              </div>
            </div>
          </div>

          {/* 2. Leader Spotlight */}
          <div className="p-5 bg-brand-forest/10 border border-brand-gold/15 rounded-2xl space-y-3">
            <h4 className="text-[10px] font-mono tracking-widest text-brand-cream/40 font-bold">
              SPOTLIGHT FOR THIS ERA
            </h4>
            <div>
              <span className="text-xs font-bold text-brand-gold block">{eraData.leader}</span>
              <span className="text-[10px] font-mono text-brand-cream/40 block">{eraData.leaderTitle}</span>
              <p className="text-xs text-brand-cream/70 mt-2 leading-relaxed font-sans font-light">
                {eraData.leaderBio}
              </p>
            </div>
          </div>

          {/* 3. Action Deck (AI prompts & Bookmark Trigger) */}
          <div className="p-5 bg-brand-green/60 border border-brand-gold/15 rounded-2xl space-y-3">
            <h4 className="text-[10px] font-mono tracking-widest text-brand-cream/40">
              TRAVELER COMMAND DECK
            </h4>

            {/* Bookmark button */}
            {isLoggedIn ? (
              <div className="space-y-2">
                {!showBookmarkPrompt ? (
                  <button
                    onClick={() => setShowBookmarkPrompt(true)}
                    className="w-full py-2.5 bg-transparent border border-brand-gold text-brand-gold uppercase tracking-wider text-xs font-mono flex items-center justify-center gap-2 cursor-pointer hover:bg-brand-gold hover:text-brand-green transition-all"
                    id="bookmark-journey-init"
                  >
                    <Bookmark className="w-4 h-4 text-brand-gold" />
                    BOOKMARK COORDINATE NODE
                  </button>
                ) : (
                  <div className="space-y-2 pt-1 animate-fade-in">
                    <input 
                      type="text" 
                      placeholder="Add personal traveler notes..."
                      value={bookmarkNotes}
                      onChange={(e) => setBookmarkNotes(e.target.value)}
                      className="w-full bg-brand-green border border-brand-gold/20 py-2 px-3 rounded text-xs text-brand-cream focus:outline-none focus:border-brand-gold/50"
                    />
                    <div className="flex gap-2">
                      <button 
                        onClick={submitBookmark}
                        className="flex-1 py-1.5 bg-brand-gold text-brand-green text-[10px] font-mono font-bold rounded cursor-pointer"
                        id="bookmark-save-confirm"
                      >
                        CONFIRM SAVE
                      </button>
                      <button 
                        onClick={() => setShowBookmarkPrompt(false)}
                        className="px-2 py-1.5 bg-brand-forest/10 border border-brand-gold/20 text-brand-cream/60 text-[10px] font-mono rounded cursor-pointer"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-[11px] text-brand-cream/40 text-center py-1">
                🔒 Log in to bookmark coordinates & achievements.
              </p>
            )}

            {/* Predefined AI Questions list */}
            <div className="space-y-2 pt-2 border-t border-brand-gold/15">
              <span className="text-[10px] font-mono text-brand-cream/40 block">INQUIRE THE AI HISTORIAN:</span>
              
              <button
                onClick={() => onInitiateAIChat(`What did Nairobi look like in ${currentYear}?`)}
                className="w-full text-left p-2 rounded bg-brand-forest/10 hover:bg-brand-forest/20 border border-brand-gold/15 text-brand-cream/70 hover:text-brand-cream text-xs flex justify-between items-center group transition-colors cursor-pointer"
                id="predefined-ai-q1"
              >
                <span>What did Nairobi look like in {currentYear}?</span>
                <ArrowRight className="w-3 h-3 text-brand-cream/40 group-hover:text-brand-gold transition-colors" />
              </button>

              <button
                onClick={() => onInitiateAIChat(`Who was leading Kenya during ${currentYear}?`)}
                className="w-full text-left p-2 rounded bg-brand-forest/10 hover:bg-brand-forest/20 border border-brand-gold/15 text-brand-cream/70 hover:text-brand-cream text-xs flex justify-between items-center group transition-colors cursor-pointer"
                id="predefined-ai-q2"
              >
                <span>Who was leading in {currentYear}?</span>
                <ArrowRight className="w-3 h-3 text-brand-cream/40 group-hover:text-brand-gold transition-colors" />
              </button>

              <button
                onClick={() => onInitiateAIChat(`Explain the lifestyle, transport, and music of ${currentYear}.`)}
                className="w-full text-left p-2 rounded bg-brand-forest/10 hover:bg-brand-forest/20 border border-brand-gold/15 text-brand-cream/70 hover:text-brand-cream text-xs flex justify-between items-center group transition-colors cursor-pointer"
                id="predefined-ai-q3"
              >
                <span>What was daily life like in {currentYear}?</span>
                <ArrowRight className="w-3 h-3 text-brand-cream/40 group-hover:text-brand-gold transition-colors" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
