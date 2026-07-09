import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, BookOpen, Trash2, PlusCircle, RefreshCw, BarChart2, ShieldCheck, Thermometer, Cpu } from 'lucide-react';

interface AdminPanelProps {
  onAddMessage: (msg: any) => void;
}

export default function AdminPanel({ onAddMessage }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'articles' | 'users'>('analytics');
  
  // Analytics State
  const [analytics, setAnalytics] = useState({
    totalUsers: 1,
    totalSavedJourneys: 2,
    totalArticles: 3,
    geothermalRenewableIndex: 94.6,
    mostVisitedYear: 1963,
    mostActiveCounty: 'Nairobi',
    systemStatus: 'OPTIMAL',
    quantumNodeTemp: '32.4°C'
  });

  // Articles & Users list State
  const [articles, setArticles] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  
  // Article Creator Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'politics' | 'culture' | 'infrastructure' | 'nature'>('infrastructure');
  const [newContent, setNewContent] = useState('');
  const [newYear, setNewYear] = useState('2026');
  const [newTags, setNewTags] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load analytics & data
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const r1 = await fetch('/api/admin/analytics');
      const d1 = await r1.json();
      if (r1.ok) setAnalytics(d1);

      const r2 = await fetch('/api/admin/articles');
      const d2 = await r2.json();
      if (r2.ok) setArticles(d2);

      const r3 = await fetch('/api/admin/users');
      const d3 = await r3.json();
      if (r3.ok) setUsers(d3);
    } catch (err) {
      console.error("Failed to load administrative endpoints", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    try {
      const tagsArray = newTags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          content: newContent,
          yearContext: parseInt(newYear, 10),
          tags: tagsArray
        })
      });

      if (res.ok) {
        setFormSuccess(true);
        setNewTitle('');
        setNewContent('');
        setNewTags('');
        loadAdminData();
        setTimeout(() => setFormSuccess(false), 3000);
      }
    } catch (err) {
      alert("Failed to connect to the article portal API.");
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8" id="admin-panel-module">
      
      {/* Top Controls Admin bar */}
      <div className="p-4 bg-brand-green border border-brand-gold/15 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Navigation buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono rounded-xl border transition-all cursor-pointer ${
              activeTab === 'analytics' 
                ? 'bg-brand-gold text-brand-green border-brand-gold font-bold' 
                : 'bg-brand-forest/25 text-brand-cream/60 border-brand-gold/10 hover:text-brand-cream'
            }`}
            id="admin-tab-analytics"
          >
            <LayoutDashboard className="w-4 h-4" />
            ANALYTICS PANEL
          </button>
 
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono rounded-xl border transition-all cursor-pointer ${
              activeTab === 'articles' 
                ? 'bg-brand-gold text-brand-green border-brand-gold font-bold' 
                : 'bg-brand-forest/25 text-brand-cream/60 border-brand-gold/10 hover:text-brand-cream'
            }`}
            id="admin-tab-articles"
          >
            <BookOpen className="w-4 h-4" />
            MANAGE ARTICLES
          </button>
 
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono rounded-xl border transition-all cursor-pointer ${
              activeTab === 'users' 
                ? 'bg-brand-gold text-brand-green border-brand-gold font-bold' 
                : 'bg-brand-forest/25 text-brand-cream/60 border-brand-gold/10 hover:text-brand-cream'
            }`}
            id="admin-tab-users"
          >
            <Users className="w-4 h-4" />
            VISITOR REGISTRY
          </button>
        </div>
 
        {/* Sync trigger button */}
        <button 
          onClick={loadAdminData}
          disabled={loading}
          className="p-2 bg-brand-forest/15 hover:bg-brand-forest/25 border border-brand-gold/10 text-brand-gold hover:text-brand-cream rounded-xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-40 font-mono"
          id="btn-sync-admin"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'SYNCING...' : 'SYNC TERMINAL'}
        </button>
      </div>

      {/* ADMIN TABS ROUTER */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Quick Info HUD Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-5 bg-brand-forest/10 border border-brand-gold/15 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-brand-cream/40 uppercase font-bold">Registry Users</span>
              <span className="text-xl font-bold text-brand-cream block font-mono">{analytics.totalUsers} Active</span>
            </div>

            <div className="p-5 bg-brand-forest/10 border border-brand-gold/15 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-brand-cream/40 uppercase font-bold">Jumps Bookmarked</span>
              <span className="text-xl font-bold text-brand-cream block font-mono">{analytics.totalSavedJourneys} saved</span>
            </div>

            <div className="p-5 bg-brand-forest/10 border border-brand-gold/15 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-brand-cream/40 uppercase font-bold">Geothermal Index</span>
              <span className="text-xl font-bold text-brand-gold block font-mono">{analytics.geothermalRenewableIndex}% Green</span>
            </div>

            <div className="p-5 bg-brand-forest/10 border border-brand-gold/15 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-brand-cream/40 uppercase font-bold">Chronos Core Temp</span>
              <span className="text-xl font-bold text-brand-gold block font-mono">{analytics.quantumNodeTemp}</span>
            </div>

          </div>

          {/* Premium Beautiful Custom Hand-Drawn SVG Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Chart 1: Curved area spline representing jumps logged */}
            <div className="p-6 bg-brand-forest/10 border border-brand-gold/15 rounded-2xl space-y-4">
              <div>
                <span className="text-[10px] font-mono text-brand-cream/40 uppercase block font-bold">CHRONOLOGY TIMELINE TRAFFIC</span>
                <h4 className="text-xs font-serif font-bold text-brand-cream uppercase tracking-wider">
                  Temporal Jumps Logged Across Counties (Simulated)
                </h4>
              </div>

              {/* Spline Area SVG */}
              <div className="w-full h-44 mt-4">
                <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="splineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1B5E20" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#1B5E20" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#d4af37" strokeOpacity="0.15" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#d4af37" strokeOpacity="0.15" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="0" y1="130" x2="500" y2="130" stroke="#d4af37" strokeOpacity="0.15" strokeDasharray="3,3" strokeWidth="0.5" />

                  {/* Shaded Area Spline */}
                  <path 
                    d="M 0 130 C 50 120, 80 40, 120 50 C 160 60, 200 110, 250 80 C 300 50, 340 10, 390 15 C 440 20, 470 70, 500 65 L 500 130 Z" 
                    fill="url(#splineGrad)" 
                  />

                  {/* Drawing Spline Border Path */}
                  <path 
                    d="M 0 130 C 50 120, 80 40, 120 50 C 160 60, 200 110, 250 80 C 300 50, 340 10, 390 15 C 440 20, 470 70, 500 65" 
                    fill="none" 
                    stroke="#d4af37" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />

                  {/* Key highlight beacons */}
                  <circle cx="120" cy="50" r="4.5" fill="#f8f5e9" stroke="#d4af37" strokeWidth="1.5" />
                  <circle cx="250" cy="80" r="4.5" fill="#f8f5e9" stroke="#d4af37" strokeWidth="1.5" />
                  <circle cx="390" cy="15" r="4.5" fill="#f8f5e9" stroke="#d4af37" strokeWidth="1.5" />

                  {/* Horizontal Labels */}
                  <text x="5" y="145" fill="#f8f5e9" fillOpacity="0.5" fontSize="8" fontFamily="monospace">MON</text>
                  <text x="120" y="145" fill="#f8f5e9" fillOpacity="0.5" fontSize="8" fontFamily="monospace">WED (Uhuru Peak)</text>
                  <text x="250" y="145" fill="#f8f5e9" fillOpacity="0.5" fontSize="8" fontFamily="monospace">FRI (Future 2050)</text>
                  <text x="390" y="145" fill="#f8f5e9" fillOpacity="0.5" fontSize="8" fontFamily="monospace">SAT (Peak Travel)</text>
                  <text x="470" y="145" fill="#f8f5e9" fillOpacity="0.5" fontSize="8" fontFamily="monospace">SUN</text>
                </svg>
              </div>

              {/* Legend labels */}
              <div className="flex items-center justify-between text-[10px] font-mono text-brand-cream/40 pt-2 border-t border-brand-gold/10">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-gold inline-block" /> Active Jumps logged (Spline Nodes)
                </span>
                <span className="text-brand-gold font-bold">STATUS: OPERATIONAL</span>
              </div>
            </div>

            {/* Chart 2: Beautiful Donut chart of coordinate visited categories */}
            <div className="p-6 bg-brand-forest/10 border border-brand-gold/15 rounded-2xl space-y-4">
              <div>
                <span className="text-[10px] font-mono text-brand-cream/40 uppercase block font-bold">TEMPORAL DOSSIER DISTRIBUTION</span>
                <h4 className="text-xs font-serif font-bold text-brand-cream uppercase tracking-wider">
                  Coordinates Distribution by Categories
                </h4>
              </div>

              {/* Donut SVG */}
              <div className="w-full h-44 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-40 h-40">
                  {/* Outer glowing donut sectors */}
                  {/* Segment A: Politics (Red, 40%) */}
                  <circle 
                    cx="100" cy="100" r="70" 
                    fill="transparent" 
                    stroke="#ef4444" 
                    strokeWidth="15" 
                    strokeDasharray="175.9 263.9" 
                    strokeDashoffset="0"
                  />
                  {/* Segment B: Culture (Amber, 25%) */}
                  <circle 
                    cx="100" cy="100" r="70" 
                    fill="transparent" 
                    stroke="#f59e0b" 
                    strokeWidth="15" 
                    strokeDasharray="109.9 330" 
                    strokeDashoffset="-175.9"
                  />
                  {/* Segment C: Conservation/Nature (Emerald, 20%) */}
                  <circle 
                    cx="100" cy="100" r="70" 
                    fill="transparent" 
                    stroke="#10b981" 
                    strokeWidth="15" 
                    strokeDasharray="87.9 352" 
                    strokeDashoffset="-285.8"
                  />
                  {/* Segment D: Speculative Tech/Future (Gold, 15%) */}
                  <circle 
                    cx="100" cy="100" r="70" 
                    fill="transparent" 
                    stroke="#d4af37" 
                    strokeWidth="15" 
                    strokeDasharray="65.9 374" 
                    strokeDashoffset="-373.7"
                  />
                  
                  {/* Inner blank core */}
                  <circle cx="100" cy="100" r="62.5" fill="#050a05" />

                  {/* Inner Labels */}
                  <text x="100" y="95" fill="#f8f5e9" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">16 COORDINATES</text>
                  <text x="100" y="112" fill="#f8f5e9" fillOpacity="0.4" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Database Nodes</text>
                </svg>

                {/* Vertical legends list */}
                <div className="space-y-1.5 ml-6 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-cream/80">
                    <span className="w-2.5 h-2.5 rounded bg-red-500 inline-block" />
                    <span>Liberation Politics (40%)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-cream/80">
                    <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" />
                    <span>Traditional Culture (25%)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-cream/80">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" />
                    <span>Conservation/Nature (20%)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-cream/80">
                    <span className="w-2.5 h-2.5 rounded bg-brand-gold inline-block" />
                    <span>Silicon/Future Tech (15%)</span>
                  </div>
                </div>
              </div>

              {/* Status footer */}
              <div className="text-[9px] font-mono text-brand-cream/30 text-center uppercase tracking-wider">
                TEMPORAL COOPERATIVE MATRIX INDEX: ACTIVE
              </div>
            </div>

          </div>

        </div>
      )}

      {activeTab === 'articles' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Article publisher Form */}
          <form onSubmit={handleCreateArticle} className="p-5 bg-brand-forest/10 border border-brand-gold/15 rounded-2xl space-y-4">
            <h3 className="text-xs font-mono tracking-widest text-brand-gold font-bold uppercase flex items-center gap-1.5 font-bold">
              <PlusCircle className="w-4.5 h-4.5" />
              Publish Custom Historical Article
            </h3>

            {formSuccess && (
              <div className="p-3 bg-brand-forest/20 border border-brand-gold/30 rounded-lg text-brand-cream text-xs text-center font-mono">
                ✨ Article published successfully to the global timeline dossiers!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-brand-cream/50 mb-1 font-bold">ARTICLE TITLE</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. The Legend of Nabongo Mumia"
                  required
                  className="w-full bg-brand-green border border-brand-gold/15 rounded px-3 py-2 text-xs text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold/40"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-brand-cream/50 mb-1 font-bold">CATEGORY</label>
                <select 
                  value={newCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="w-full bg-brand-green border border-brand-gold/15 rounded px-3 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-gold/40"
                >
                  <option value="politics" className="bg-brand-green text-brand-cream">Politics & Resistance</option>
                  <option value="culture" className="bg-brand-green text-brand-cream">Culture & Traditional society</option>
                  <option value="infrastructure" className="bg-brand-green text-brand-cream">Infrastructure & Tech</option>
                  <option value="nature" className="bg-brand-green text-brand-cream">Nature & Ecological Preservation</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-brand-cream/50 mb-1 font-bold">YEAR CONTEXT (EPOCH NODE)</label>
                <input 
                  type="number" 
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  placeholder="e.g. 1920"
                  className="w-full bg-brand-green border border-brand-gold/15 rounded px-3 py-2 text-xs text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold/40"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-brand-cream/50 mb-1 font-bold">TAGS (COMMA SEPARATED)</label>
                <input 
                  type="text" 
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. traditional, king, kingdom"
                  className="w-full bg-brand-green border border-brand-gold/15 rounded px-3 py-2 text-xs text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-brand-cream/50 mb-1 font-bold">ARTICLE CONTENT DOSSIER</label>
              <textarea 
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                placeholder="Write the full historic article details..."
                required
                className="w-full bg-brand-green border border-brand-gold/15 rounded px-3 py-2 text-xs text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold/40"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-serif font-extrabold text-xs tracking-wider rounded cursor-pointer shadow-lg transition-transform hover:scale-102"
              id="btn-publish-article"
            >
              PUBLISH DOSSIER ARTICLE
            </button>
          </form>

          {/* Current Articles list */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-brand-cream/40 font-bold uppercase">
              Current Published Articles ({articles.length})
            </h4>

            <div className="space-y-3">
              {articles.map((art) => (
                <div key={art.id} className="p-4 bg-brand-green/60 rounded border border-brand-gold/10 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-brand-cream">{art.title}</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-forest/20 text-brand-gold uppercase tracking-widest border border-brand-gold/15">
                        {art.category} • Year {art.yearContext}
                      </span>
                    </div>
                    <p className="text-xs text-brand-cream/80 font-sans font-light leading-relaxed">
                      {art.content}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteArticle(art.id)}
                    className="p-1.5 rounded bg-brand-forest/10 hover:bg-brand-forest/20 border border-brand-gold/15 text-brand-cream/40 hover:text-red-400 transition-colors cursor-pointer"
                    id={`delete-article-${art.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {activeTab === 'users' && (
        <div className="p-6 bg-brand-forest/10 border border-brand-gold/15 rounded-2xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-brand-gold/10">
            <h3 className="text-sm font-serif font-bold text-brand-cream uppercase tracking-wider">
              System Traveler Registry ({users.length})
            </h3>
            <span className="text-[9px] font-mono text-brand-cream/40 font-bold">ACTIVE CHRONOS ID DATABASE</span>
          </div>

          <div className="space-y-3">
            {users.map((u, idx) => (
              <div key={idx} className="p-4 bg-brand-green/60 rounded border border-brand-gold/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={u.avatar} alt="" className="w-9 h-9 rounded border border-brand-gold/25 object-cover" />
                  <div>
                    <span className="text-xs font-bold text-brand-cream block">{u.displayName}</span>
                    <span className="text-[10px] font-mono text-brand-cream/40 block">{u.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {u.isVerified ? (
                    <span className="text-[9px] font-mono text-brand-gold font-bold flex items-center gap-1 bg-brand-forest/15 border border-brand-gold/15 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-brand-gold/70 bg-brand-gold/5 border border-brand-gold/10 px-2 py-0.5 rounded">
                      UNVERIFIED
                    </span>
                  )}
                  <span className="text-[9px] font-mono text-brand-cream/40">ID: {u.userId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
