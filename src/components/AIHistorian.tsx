import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, HelpCircle, RefreshCw, Trash } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  yearContext?: number;
}

interface AIHistorianProps {
  currentYear: number;
  selectedCountyName: string;
  selectedCityName: string;
  chatHistory: ChatMessage[];
  onAddMessage: (msg: ChatMessage) => void;
  onClearHistory: () => void;
  initialQuery?: string;
  onResetInitialQuery?: () => void;
}

export default function AIHistorian({
  currentYear,
  selectedCountyName,
  selectedCityName,
  chatHistory,
  onAddMessage,
  onClearHistory,
  initialQuery,
  onResetInitialQuery
}: AIHistorianProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when chat updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Handle external query injections from the timeline predefined questions
  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
      if (onResetInitialQuery) onResetInitialQuery();
    }
  }, [initialQuery]);

  const handleSend = async (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    // Clear input
    if (!textToSend) setInput('');

    // Add user message
    const userMsg: ChatMessage = {
      role: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      yearContext: currentYear
    };
    onAddMessage(userMsg);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          history: chatHistory,
          yearContext: currentYear,
          countyName: selectedCountyName,
          cityName: selectedCityName
        })
      });

      const data = await response.json();
      if (response.ok) {
        const modelMsg: ChatMessage = {
          role: 'model',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          yearContext: currentYear
        };
        onAddMessage(modelMsg);
      } else {
        const errMsg: ChatMessage = {
          role: 'model',
          text: `⚠️ Travel terminal reported an error: ${data.error || "Connection lost. Ensure server is active."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        onAddMessage(errMsg);
      }
    } catch (err: any) {
      const errMsg: ChatMessage = {
        role: 'model',
        text: `⚠️ Critical interference in quantum channel. Please verify server is online on port 3000.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      onAddMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Simple Markdown translation helper for a beautiful render without external library reliance
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-sm font-bold text-brand-gold mt-3 mb-1.5">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="text-base font-black text-brand-gold mt-4 mb-2">{line.replace('## ', '')}</h3>;
      }
      // Lists
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-brand-cream/80 text-xs py-0.5 leading-relaxed">
            {line.trim().substring(2)}
          </li>
        );
      }
      // Standard line formatting for bold **
      const parts = line.split('**');
      if (parts.length > 1) {
        return (
          <p key={idx} className="text-xs text-brand-cream/90 py-1 leading-relaxed">
            {parts.map((p, i) => (i % 2 === 1 ? <strong key={i} className="text-brand-gold font-bold">{p}</strong> : p))}
          </p>
        );
      }

      return <p key={idx} className="text-xs text-brand-cream/80 py-1 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="flex flex-col h-[500px] bg-brand-forest/10 backdrop-blur-md border border-brand-gold/15 rounded-2xl overflow-hidden" id="ai-historian-chat-window">
      
      {/* Chat header */}
      <div className="p-4 bg-brand-green border-b border-brand-gold/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brand-gold animate-spin" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-brand-cream uppercase tracking-wider font-sans">
              AI Historian Guide
            </h4>
            <span className="text-[10px] font-mono text-brand-gold block uppercase">
              EPOCH CORE LINK: {currentYear} • {selectedCityName}
            </span>
          </div>
        </div>

        <button 
          onClick={onClearHistory}
          title="Clear temporal context"
          className="p-1.5 rounded bg-brand-forest/10 border border-brand-gold/20 text-brand-gold hover:text-brand-cream transition-colors cursor-pointer"
          id="clear-chat-btn"
        >
          <Trash className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Message box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <HelpCircle className="w-8 h-8 text-brand-cream/10" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-cream/50 block">NO TEMPORAL CONVERSATIONS RECORDED</span>
              <p className="text-[10px] text-brand-cream/40 max-w-xs leading-relaxed font-mono">
                Ask about political struggles, Nairobi's skyline transitions, the Mau Mau forest resistance, or Kenya's Solarpunk equatorial launchpads!
              </p>
            </div>
          </div>
        ) : (
          chatHistory.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div 
                key={idx}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                {/* Message bubble */}
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl border ${
                  isUser 
                    ? 'bg-brand-forest/25 border-brand-gold/25 text-brand-cream rounded-tr-none' 
                    : 'bg-brand-green border-brand-gold/15 text-brand-cream/90 rounded-tl-none'
                }`}>
                  {/* Epoch contextual badge inside bubble */}
                  {!isUser && msg.yearContext && (
                    <span className="text-[8px] font-mono font-bold tracking-widest text-brand-gold block uppercase mb-1">
                      🛰️ RECORDED EPOCH: {msg.yearContext}
                    </span>
                  )}
                  
                  {isUser ? (
                    <p className="text-xs font-sans whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  ) : (
                    <div className="space-y-1">{renderFormattedText(msg.text)}</div>
                  )}
                </div>

                {/* Metadata */}
                <span className="text-[9px] font-mono text-brand-cream/40 px-1">
                  {isUser ? 'Traveler' : 'AI Historian'} • {msg.timestamp}
                </span>
              </div>
            );
          })
        )}

        {loading && (
          <div className="flex items-center gap-2 p-3 bg-brand-green/60 border border-brand-gold/15 rounded max-w-[200px] animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 text-brand-gold animate-spin" />
            <span className="text-[10px] font-mono text-brand-cream/60">ANALYZING ARCHIVES...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input row */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="p-3 bg-brand-green border-t border-brand-gold/15 flex gap-2"
      >
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask the historian about ${currentYear} in ${selectedCityName}...`}
          disabled={loading}
          className="flex-1 bg-brand-forest/5 border border-brand-gold/15 rounded px-4 py-2.5 text-xs text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/10"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2.5 rounded bg-brand-gold hover:bg-brand-cream text-brand-green font-bold flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
          id="send-message-btn"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
