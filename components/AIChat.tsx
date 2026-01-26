
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Image as ImageIcon, Download, MapPin, ExternalLink } from 'lucide-react';
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
      text: "Hello! I'm the ISEYAA Intelligent Agent. I'm now powered by Google Maps! I can help you find exact directions, check nearby attractions, or help you navigate Ogun State. How can I help you today?",
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
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

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
      let aiMessage: ExtendedChatMessage;

      if (currentMode) {
        const result = await generateImageWithGemini(currentInput);
        aiMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: result.text,
          imageUrl: result.imageUrl,
          timestamp: new Date()
        };
        setIsImageMode(false);
      } else {
        const history = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));
        const response = await sendMessageToGemini(currentInput, history);
        aiMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: response.text,
          groundingChunks: response.groundingChunks,
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat Error", error);
      const errorMessage: ExtendedChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I encountered an issue processing your request. Please try again.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-100 p-4 flex items-center justify-between bg-white shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-full">
            <Sparkles className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">ISEYAA Agent</h2>
            <p className="text-xs text-slate-500">Google Maps Grounded Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={() => setIsImageMode(!isImageMode)}
             className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isImageMode ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
           >
              <ImageIcon className="w-3.5 h-3.5" />
              {isImageMode ? 'Image Mode Active' : 'Enable Image Mode'}
           </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-slate-200' : 'bg-emerald-600'
              }`}
            >
              {msg.role === 'user' ? (
                <User className="w-5 h-5 text-slate-600" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="max-w-[85%] md:max-w-[70%] space-y-2">
                <div
                className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                    ? 'bg-white text-slate-800 border border-slate-200 rounded-tr-none'
                    : 'bg-emerald-600 text-white rounded-tl-none'
                } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                >
                {msg.text}
                
                {msg.imageUrl && (
                    <div className="mt-4 group relative">
                    <div className="rounded-xl overflow-hidden border border-white/20 bg-slate-900/10">
                        <img 
                        src={msg.imageUrl} 
                        alt="AI Generated Content" 
                        className="w-full h-auto object-cover max-h-[400px] hover:scale-[1.02] transition-transform duration-300" 
                        />
                    </div>
                    <button 
                        onClick={() => downloadImage(msg.imageUrl!, `iseyaa-gen-${msg.id}.png`)}
                        className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur text-slate-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        title="Download Image"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    </div>
                )}
                </div>

                {/* Grounding Sources (Google Maps Links) */}
                {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {msg.groundingChunks.map((chunk, idx) => {
                            if (!chunk.maps?.uri) return null;
                            return (
                                <a 
                                    key={idx}
                                    href={chunk.maps.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
                                >
                                    <MapPin className="w-3 h-3 text-red-500" />
                                    {chunk.maps.title || "View on Google Maps"}
                                    <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span className="text-xs text-slate-500 font-medium">
                    {isImageMode ? 'Synthesizing visual content...' : 'Scanning Google Maps & platform data...'}
                  </span>
              </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className={`max-w-4xl mx-auto relative flex items-end gap-2 bg-slate-50 border rounded-xl p-2 transition-all ${isImageMode ? 'ring-2 ring-purple-500/20 border-purple-500' : 'focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 border-slate-200'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={isImageMode ? "Describe the image you want me to create..." : "Ask for directions, nearby attractions, or state services..."}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-2.5 px-2 text-slate-800 placeholder:text-slate-400 text-sm"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2.5 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${isImageMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-between items-center max-w-4xl mx-auto mt-2 px-1">
            <p className="text-[10px] text-slate-400">
                ISEYAA AI uses live Google Maps data. Always verify road safety conditions.
            </p>
            {isImageMode && (
              <p className="text-[10px] text-purple-600 font-bold animate-pulse">
                IMAGE GENERATION MODE
              </p>
            )}
        </div>
      </div>
    </div>
  );
};