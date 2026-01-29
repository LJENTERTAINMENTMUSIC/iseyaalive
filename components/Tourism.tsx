import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, BookOpen, Compass, Star, ChevronRight, Glasses, Ticket,
  Play, Globe, Plus, X, Save, ChevronLeft, Award, Pause, Volume2,
  Video, FileText, Search, CheckCircle2, Lock, Camera, Layers,
  ArrowRight, Maximize2, Radio, Loader2, Thermometer, CloudSun,
  Users, Fingerprint, Zap, Sparkles, SearchCode, ShieldCheck,
  Target, QrCode, Smartphone, Clapperboard, History, AlertTriangle,
  ExternalLink, Cpu, Download, FileDown, Info, Palette, Verified
} from 'lucide-react';
import { Attraction } from '../types.ts';
import { GoogleGenAI } from "@google/genai";

const OptimizedImage: React.FC<{ 
    src: string; 
    alt: string; 
    className?: string; 
    imgClassName?: string;
}> = ({ src, alt, className = "", imgClassName = "" }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    return (
        <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-pulse" />
                </div>
            )}
            <img src={src} alt={alt} loading="lazy" onLoad={() => setIsLoaded(true)} onError={() => setHasError(true)} className={`w-full h-full object-cover transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} ${imgClassName}`} />
        </div>
    );
};

interface ExtendedAttraction extends Attraction {
    weather?: string;
    temperature?: number;
    status: 'Operational' | 'Limited Access' | 'Maintenance';
    distance?: string;
    historicalEra: string;
    neuralFormFactor: number;
}

const INITIAL_ATTRACTIONS: ExtendedAttraction[] = [
  {
    id: '1',
    name: 'Olumo Rock Discovery',
    location: 'Ikija, Abeokuta',
    image: 'https://images.unsplash.com/photo-1599407667664-8b63a2336214?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    category: 'Heritage',
    description: 'The ancient fortress of the Egba people.',
    ticketPrice: 5000,
    hasVR: true,
    weather: 'Sunny',
    temperature: 28,
    status: 'Operational',
    distance: '2.4km from Center',
    historicalEra: '19th Century',
    neuralFormFactor: 98
  },
  {
    id: '2',
    name: 'Obasanjo Library Hub',
    location: 'Oke-Mosan, Abeokuta',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1976&auto=format&fit=crop',
    rating: 4.7,
    category: 'Museum',
    description: 'Africa\'s first presidential library.',
    ticketPrice: 7500,
    hasVR: false,
    weather: 'Clear',
    temperature: 30,
    status: 'Operational',
    distance: '5.1km from Center',
    historicalEra: 'Contemporary',
    neuralFormFactor: 85
  }
];

const LOADING_MESSAGES = [
  "Initializing Ancestral Signal...",
  "Synthesizing 4K Illustrator Textures...",
  "Rendering Egba Cultural Story Action...",
  "Engaging 3.1 Neural Weaver Protocol..."
];

export const Tourism: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'archive' | 'agent'>('explore');
  const [attractions, setAttractions] = useState<ExtendedAttraction[]>(INITIAL_ATTRACTIONS);
  const [selectedAttraction, setSelectedAttraction] = useState<ExtendedAttraction | null>(null);
  
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoPrompt, setVideoPrompt] = useState('A cinematic 4K illustrator-style animation of Olumo Rock.');
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
        if (window.aistudio) {
            const hasKey = await window.aistudio.hasSelectedApiKey();
            setHasApiKey(!!hasKey);
        }
    };
    checkKey();
  }, []);

  useEffect(() => {
    let interval: any;
    if (isGeneratingVideo) {
      interval = setInterval(() => setLoadingMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length), 3500);
    }
    return () => clearInterval(interval);
  }, [isGeneratingVideo]);

  const handleSelectApiKey = async () => {
    if (window.aistudio) {
        await window.aistudio.openSelectKey();
        setHasApiKey(true);
    }
  };

  const generateHeritageVideo = async () => {
    if (!hasApiKey) {
        handleSelectApiKey();
        return;
    }
    setIsGeneratingVideo(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-generate-preview',
            prompt: `4K Illustrator style animation storytelling: ${videoPrompt}. High fidelity, dynamic action sequences, rich hand-painted artistic textures, epic scale, Ogun State heritage focus.`,
            config: { numberOfVideos: 1, resolution: '1080p', aspectRatio: '16:9' }
        });
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation });
        }
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
            const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
            const blob = await response.blob();
            setGeneratedVideoUrl(URL.createObjectURL(blob));
        }
    } catch (error: any) {
        console.error("Veo Error:", error);
        if (error?.message?.includes("entity was not found") || error?.message?.includes("403")) {
            setHasApiKey(false);
            alert("ISEYAA Secure Node Error: Access requires a PAID API key. Please re-select your protocol key.");
            await handleSelectApiKey();
        } else {
            alert("Neural Weaver signal interrupted. Checking bandwidth nodes...");
        }
    } finally {
        setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {isGeneratingVideo && (
          <div className="fixed inset-0 z-[600] bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-12">
              <Clapperboard className="w-24 h-24 text-emerald-500 animate-pulse mb-8" />
              <h3 className="text-4xl font-black text-white uppercase italic">{LOADING_MESSAGES[loadingMsgIdx]}</h3>
          </div>
      )}
      {isVideoModalOpen && (
          <div className="fixed inset-0 z-[550] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in">
              <div className="bg-white rounded-[4rem] w-full max-w-6xl overflow-hidden p-12 relative flex flex-col h-[85vh]">
                  <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-8 right-8 p-4 text-slate-400"><X /></button>
                  {!generatedVideoUrl ? (
                    <div className="flex-1 flex flex-col justify-center gap-10">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Story Weaver Protocol</h2>
                        <textarea value={videoPrompt} onChange={e => setVideoPrompt(e.target.value)} className="w-full p-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:border-emerald-500 outline-none font-black text-3xl italic" rows={3} />
                        <button onClick={generateHeritageVideo} className="w-full py-10 bg-emerald-600 text-white rounded-full font-black text-4xl shadow-2xl hover:bg-emerald-700 transition-all">COMMENCE WEAVING</button>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col gap-10">
                        <video src={generatedVideoUrl} controls autoPlay className="w-full h-full object-contain rounded-[3rem] bg-black" />
                        <button onClick={() => setGeneratedVideoUrl(null)} className="py-6 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest">Reset Core</button>
                    </div>
                  )}
              </div>
          </div>
      )}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-[60] px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
                <div className="bg-emerald-600 p-4 rounded-[1.5rem]"><Compass className="text-white w-8 h-8" /></div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Tourism <span className="text-emerald-600">&</span> Culture</h1>
            </div>
            <nav className="flex bg-slate-100 p-2 rounded-full border border-slate-200">
                {[{ id: 'explore', icon: Compass, label: 'EXPLORE' }, { id: 'archive', icon: BookOpen, label: 'ARCHIVE' }].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black tracking-widest transition-all ${activeTab === tab.id ? 'bg-white shadow-xl text-emerald-600' : 'text-slate-500 hover:text-slate-900'}`}>
                      <tab.icon className="w-4 h-4" /> {tab.label}
                    </button>
                ))}
            </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="bg-slate-900 rounded-[3rem] p-16 text-white relative overflow-hidden mb-24">
            <h2 className="text-6xl font-black italic tracking-tighter uppercase mb-6">Experience Legends.</h2>
            <p className="text-2xl text-slate-400 font-light italic mb-10 max-w-2xl">Use our Neural Storytelling engine to create 4K illustrator videos of heritage folklore.</p>
            <button onClick={() => setIsVideoModalOpen(true)} className="px-16 py-8 bg-emerald-600 text-white rounded-full font-black text-2xl hover:bg-emerald-700 transition-all flex items-center gap-6 group active:scale-95">
                <Clapperboard className="w-9 h-9" /> START WEAVING
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 animate-in fade-in">
            {attractions.map(attr => (
                <div key={attr.id} onClick={() => setSelectedAttraction(attr)} className="group cursor-pointer bg-white rounded-[4rem] border-2 border-slate-50 p-8 shadow-sm hover:shadow-2xl transition-all">
                    <OptimizedImage src={attr.image} alt={attr.name} className="aspect-[4/5] rounded-[3.5rem] mb-10" />
                    <h3 className="text-3xl font-black text-slate-900 uppercase italic mb-4">{attr.name}</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> {attr.location}</p>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
};