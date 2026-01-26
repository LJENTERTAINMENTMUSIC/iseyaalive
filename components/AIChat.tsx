
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Image as ImageIcon, Download, MapPin, ExternalLink, RefreshCcw, ShieldCheck } from 'lucide-react';
import { sendMessageToGemini, generateImageWithGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ExtendedChatMessage extends ChatMessage {
    groundingChunks?: any[];
}

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "ISEYAA Command Node Initialized. I'm your Google Maps-powered assistant for Ogun State. How can I help you navigate the Gateway State today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageMode, setIsImageMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ExtendedChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    const currentMode = isImageMode;
    
    setInput('');
    setIsLoading(true);

    try {
      if (currentMode) {
        const result = await generateImageWithGemini(currentInput);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: result.text,
          imageUrl: result.imageUrl,
          timestamp: new Date()
        }]);
        setIsImageMode(false);
      } else {
        const history = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));
        const response = await sendMessageToGemini(currentInput, history);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: response.text,
          groundingChunks: response.groundingChunks,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Neural signal lost. Please retry protocol.",
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen bg-brand-cream overflow-hidden">
      {/* OS Style Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-600/20">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Command Agent</h2>
            <p className="text-[9px] text-emerald-600 font-black uppercase tracking-[0.4em] mt-1.5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div> Live Neural Link
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setIsImageMode(!isImageMode)}
             className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isImageMode ? 'bg-purple-600 text-white shadow-xl scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
           >
              <ImageIcon className="w-4 h-4" />
              {isImageMode ? 'Imagery Core Active' : 'Image Protocol'}
           </button>
           <button onClick={() => setMessages([messages[0]])} className="p-2.5 text-slate-400 hover:text-red-500 transition-colors" title="Clear Protocol">
              <RefreshCcw className="w-5 h-5" />
           </button>
        </div>
      </header>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 md:gap-6 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-lg ${
                msg.role === 'user' ? 'bg-slate-900 border-2 border-slate-700' : 'bg-emerald-600 border-2 border-emerald-400/30'
            }`}>
              {msg.role === 'user' ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
            </div>

            <div className={`max-w-[85%] md:max-w-[65%] space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`relative p-5 md:p-8 rounded-[2.5rem] shadow-2xl border-4 ${
                    msg.role === 'user'
                    ? 'bg-white text-slate-800 border-slate-50 rounded-tr-none'
                    : 'bg-emerald-600 text-white border-emerald-500/30 rounded-tl-none italic'
                } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}>
                    <p className="text-base md:text-xl font-medium leading-relaxed leading-[1.6] whitespace-pre-wrap">
                        {msg.text}
                    </p>
                    
                    {msg.imageUrl && (
                        <div className="mt-8 group relative overflow-hidden rounded-[2rem] border-4 border-white/20 shadow-2xl">
                            <img src={msg.imageUrl} alt="AI Visual" className="w-full h-auto object-cover max-h-[500px] transition-transform duration-[10s] group-hover:scale-110" />
                            <button 
                                onClick={() => {
                                    const a = document.createElement('a'); a.href = msg.imageUrl!; a.download = `iseyaa-${msg.id}.png`; a.click();
                                }}
                                className="absolute top-6 right-6 p-4 bg-white/90 backdrop-blur rounded-full text-emerald-950 shadow-2xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                            >
                                <Download className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>

                {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                        {msg.groundingChunks.map((chunk, idx) => (
                            chunk.maps?.uri && (
                                <a 
                                    key={idx}
                                    href={chunk.maps.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-slate-100 rounded-full text-[10px] font-black text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-md animate-in slide-in-from-left-2"
                                >
                                    <MapPin className="w-3.5 h-3.5 text-red-500 group-hover:animate-bounce" />
                                    {chunk.maps.title?.toUpperCase() || "GEOLOCATION NODE"}
                                    <ExternalLink className="w-3 h-3 opacity-30" />
                                </a>
                            )
                        ))}
                    </div>
                )}
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex items-start gap-4 md:gap-6 animate-in fade-in duration-500">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-[1.2rem] bg-emerald-600 flex items-center justify-center border-2 border-emerald-400/30">
                  <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white border-4 border-slate-50 px-8 py-5 rounded-[2rem] rounded-tl-none shadow-2xl flex items-center gap-5">
                  <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
                    {isImageMode ? 'SYNTHESIZING VISUALS...' : 'SCANNING STATE LEDGER...'}
                  </span>
              </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* OS Style Input Dock */}
      <div className="p-6 md:p-10 bg-white border-t border-slate-100 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto space-y-6">
            <div className={`relative flex items-end gap-4 bg-slate-50 border-[3px] rounded-[3rem] p-4 transition-all ${isImageMode ? 'border-purple-500 ring-4 ring-purple-500/10' : 'border-slate-100 focus-within:border-emerald-500 focus-within:bg-white shadow-inner focus-within:shadow-2xl'}`}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                    placeholder={isImageMode ? "Describe the state-verified visual you need..." : "Enter coordinates or query the state digital archive..."}
                    className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-40 min-h-[50px] py-4 px-6 text-slate-900 font-medium placeholder:text-slate-300 text-lg md:text-xl custom-scrollbar"
                    rows={1}
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className={`h-16 w-16 md:h-20 md:w-20 rounded-full text-white shadow-2xl transition-all active:scale-90 disabled:opacity-30 flex items-center justify-center shrink-0 ${isImageMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                >
                    <Send className="w-8 h-8" />
                </button>
            </div>
            <div className="flex justify-between items-center px-8">
                <div className="flex items-center gap-3 text-slate-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">ISEYAA SECURITY CORE V4.2</span>
                </div>
                {isImageMode && <span className="text-[9px] font-black text-purple-600 uppercase tracking-[0.3em] animate-pulse">Neural Render Protocol Engaged</span>}
            </div>
        </div>
      </div>
    </div>
  );
};
