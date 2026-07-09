import React, { useState } from 'react';
import { LEADERS, COUNTIES } from '../data/historyData';
import { Search, BookOpen, Shield, Award, Map, Leaf, Cpu, GraduationCap, ChevronRight } from 'lucide-react';

interface HistoricalDatabaseProps {
  onInitiateAIChat: (suggestedMsg: string) => void;
}

interface HistoricalDocument {
  id: string;
  title: string;
  category: 'resistance' | 'governance' | 'conservation' | 'society' | 'sport';
  summary: string;
  details: string;
  icon: any;
  tags: string[];
}

const TEMPORAL_DOCUMENTS: HistoricalDocument[] = [
  {
    id: 'doc-maumau',
    title: 'The Mau Mau Freedom Struggle (KLFA)',
    category: 'resistance',
    summary: 'The armed rebellion against colonial oppression from the thick forests of Mount Kenya and Aberdares.',
    details: 'The Kenya Land and Freedom Army (KLFA), widely known as the Mau Mau, arose in the late 1940s in response to colonial land theft, forced labor, and racial segregation. Led by Field Marshal Dedan Kimathi, they established strategic bases deep in mountain forests. Though the rebellion was met with a brutal state of emergency and detention camps by the British, it broke the financial and political will of the colonial empire, directly forcing Kenya\'s path to independence.',
    icon: Shield,
    tags: ['freedom', 'resistance', 'colonial', 'kimathi']
  },
  {
    id: 'doc-independence',
    title: 'Uhuru Sasa: The Independence Covenant',
    category: 'governance',
    summary: 'The historic transition of sovereign power on December 12, 1963.',
    details: 'On December 12, 1963, thousands of citizens gathered at Uhuru Gardens in Nairobi to witness the Union Jack being lowered and the black, red, green, and white flag of Kenya rising. Jomo Kenyatta was sworn in as Prime Minister, later becoming the First President. The era established the "Harambee" spirit, urging a young multicultural nation to pull together to conquer poverty, ignorance, and disease.',
    icon: BookOpen,
    tags: ['uhuru', 'independence', 'kenyatta', 'politics']
  },
  {
    id: 'doc-parks',
    title: 'Wildlife Sanctuaries & Conservation Landmarks',
    category: 'conservation',
    summary: 'Kenya\'s pioneering role in global preservation and ecosystem restoration.',
    details: 'From the vast savannas of the Maasai Mara to the red-clay dust of Tsavo, Kenya has pioneered global ecological conservation. Landmark decisions, such as the 1989 Ivory Burning led by President Moi and Richard Leakey, sent a clear global signal that ivory belongs on elephants. The Green Belt Movement founded by Prof. Wangari Maathai mobilized thousands of women to plant millions of trees, recognizing that ecological security is directly tied to political democracy.',
    icon: Leaf,
    tags: ['conservation', 'wildlife', 'maathai', 'nature']
  },
  {
    id: 'doc-silicon',
    title: 'The Silicon Savannah & M-Pesa Revolution',
    category: 'society',
    summary: 'How Kenya became the global fintech leader and technological lighthouse of Africa.',
    details: 'In 2007, Safaricom launched M-Pesa, a revolutionary mobile peer-to-peer money transfer service. Operating initially on basic GSM Nokia bricks, it quickly evolved into a global benchmark, processing billions of dollars and lifting millions from poverty. Today, Nairobi\'s smart digital hubs and startups have earned it the nickname "Silicon Savannah", pioneering high-speed geothermal computing, electric public transport, and smart agricultural networks.',
    icon: Cpu,
    tags: ['technology', 'mpesa', 'silicon', 'economy']
  },
  {
    id: 'doc-sports',
    title: 'Cradle of Legends: Athletics Mastery',
    category: 'sport',
    summary: 'Dominating global long-distance running, from Kipchoge Keino to Eliud Kipchoge.',
    details: 'In high-altitude training camps around Eldoret, Iten, and Kaptagat, Kenyan runners have forged a global athletics dynasty. Kipchoge Keino\'s gold medals in the 1968 Mexico Olympics set the stage. Decades later, Eliud Kipchoge proved that "No Human Is Limited" by running a sub-2 hour marathon in Vienna, cementing Kenya as the historical powerhouse of athletic endurance and mental resilience.',
    icon: Award,
    tags: ['sports', 'running', 'kipchoge', 'athletics']
  }
];

export default function HistoricalDatabase({ onInitiateAIChat }: HistoricalDatabaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<HistoricalDocument | null>(null);

  const filteredDocs = TEMPORAL_DOCUMENTS.filter(doc => {
    const q = searchQuery.toLowerCase();
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.summary.toLowerCase().includes(q) ||
      doc.details.toLowerCase().includes(q) ||
      doc.tags.some(t => t.includes(q))
    );
  });

  const filteredLeaders = LEADERS.filter(leader => {
    const q = searchQuery.toLowerCase();
    return (
      leader.name.toLowerCase().includes(q) ||
      leader.title.toLowerCase().includes(q) ||
      leader.legacy.toLowerCase().includes(q)
    );
  });

  const filteredCounties = COUNTIES.filter(c => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.historicalHighlight.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8" id="historical-encyclopedia-module">
      
      {/* Search Header Banner */}
      <div className="p-6 bg-gradient-to-r from-brand-green to-brand-brown/50 rounded-2xl border border-brand-gold/15 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-brand-cream tracking-tight">
            TEMPORAL ARCHIVES DATABASE
          </h2>
          <p className="text-xs text-brand-cream/70 mt-1">
            Search leaders, ecological milestones, and political declarations of sovereign Kenya
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-gold" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, counties, leaders..."
            className="w-full bg-brand-forest/10 border border-brand-gold/20 rounded pl-10 pr-4 py-2.5 text-xs text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Main database directories */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section A: Historical files list */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono tracking-widest text-brand-gold font-bold uppercase">
              Chronology Dossiers ({filteredDocs.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredDocs.map((doc) => {
                const DocIcon = doc.icon;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`p-5 backdrop-blur-sm border rounded-2xl cursor-pointer transition-all ${
                      selectedDoc?.id === doc.id ? 'border-brand-gold bg-brand-forest/20 shadow-lg shadow-brand-gold/5' : 'border-brand-gold/10 bg-brand-forest/10 hover:bg-brand-forest/15'
                    }`}
                    id={`dossier-card-${doc.id}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded bg-brand-green border border-brand-gold/20 text-brand-gold">
                        <DocIcon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <span className="text-xs font-bold text-brand-cream hover:text-brand-gold block transition-colors">
                          {doc.title}
                        </span>
                        <p className="text-[11px] text-brand-cream/70 leading-relaxed">
                          {doc.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section B: Leader Bios cards */}
          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-mono tracking-widest text-brand-gold font-bold uppercase">
              Spotlight National Leaders ({filteredLeaders.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredLeaders.map((leader, idx) => (
                <div key={idx} className="p-5 bg-brand-green/60 border border-brand-gold/15 rounded-2xl flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-serif font-bold text-brand-cream">{leader.name}</span>
                      <span className="text-[10px] font-mono text-brand-cream/40">{leader.years}</span>
                    </div>
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest block mt-0.5">
                      {leader.title}
                    </span>
                    <p className="text-xs text-brand-cream/70 mt-2.5 leading-relaxed font-sans">
                      {leader.legacy}
                    </p>
                  </div>

                  <button
                    onClick={() => onInitiateAIChat(`Tell me more details about ${leader.name} and their impact on Kenyan history.`)}
                    className="text-[10px] font-mono text-brand-gold hover:text-brand-cream flex items-center gap-1 cursor-pointer bg-transparent transition-colors"
                    id={`ask-ai-leader-${idx}`}
                  >
                    ASK AI ABOUT THIS LEADER <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section C: County Files */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono tracking-widest text-brand-cream/40 font-bold uppercase">
                Counties Coordinates Highlight ({filteredCounties.length})
              </h3>
              {searchQuery && (
                <span className="text-[10px] font-mono text-brand-gold/60">
                  Filtered Results
                </span>
              )}
            </div>
            
            <div className="max-h-[350px] overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-brand-gold/20 scrollbar-track-transparent">
              {filteredCounties.length === 0 ? (
                <div className="text-center py-8 text-xs font-mono text-brand-cream/30">
                  No counties found matching "{searchQuery}"
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {filteredCounties.map((c) => (
                    <div key={c.id} className="p-4 bg-brand-forest/10 border border-brand-gold/10 rounded space-y-1 hover:border-brand-gold/25 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <Map className="w-3.5 h-3.5 text-brand-gold" />
                        <span className="text-xs font-bold text-brand-cream">{c.name}</span>
                      </div>
                      <span className="text-[9px] font-mono text-brand-cream/40 block">Capital: {c.capital}</span>
                      <p className="text-[10px] text-brand-cream/70 leading-normal mt-1 font-sans">
                        {c.historicalHighlight}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Col: Interactive Dossier Document Inspection Glass */}
        <div>
          {selectedDoc ? (
            <div className="p-6 bg-brand-green border border-brand-gold/20 rounded-2xl space-y-4 shadow-xl shadow-brand-gold/5 sticky top-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-gold/10 text-brand-gold uppercase font-semibold">
                  TEMPORAL DOSSIER DOS-01
                </span>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="text-brand-cream/40 hover:text-brand-cream text-xs font-mono cursor-pointer"
                >
                  CLOSE
                </button>
              </div>

              <h3 className="text-lg font-serif font-black text-brand-cream tracking-tight leading-snug">
                {selectedDoc.title}
              </h3>

              <p className="text-xs text-brand-cream/80 leading-relaxed font-sans border-t border-b border-brand-gold/15 py-3">
                {selectedDoc.details}
              </p>

              <div className="space-y-2">
                <span className="text-[9px] font-mono text-brand-cream/40 block">INDEXED TEMPORAL TAGS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDoc.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-forest/15 text-brand-cream/75 border border-brand-gold/15">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onInitiateAIChat(`Explain the dossier "${selectedDoc.title}" in greater depth and context.`)}
                className="w-full py-2.5 bg-brand-gold hover:bg-brand-cream text-brand-green font-bold text-xs tracking-wider rounded hover:scale-102 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                id="doc-inspect-ask-ai"
              >
                <Cpu className="w-4 h-4" />
                CONSULT AI HISTORIAN ON THIS
              </button>
            </div>
          ) : (
            <div className="p-6 bg-brand-green border border-brand-gold/15 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 h-[350px]">
              <div className="w-12 h-12 rounded-full border border-brand-gold/10 flex items-center justify-center text-brand-cream/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-cream/50 block uppercase">No Dossier Inspected</span>
                <p className="text-[10px] text-brand-cream/40 max-w-xs mt-1 leading-relaxed font-mono">
                  Click on any historical chronology dossier file to load it into the quantum reader console.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
