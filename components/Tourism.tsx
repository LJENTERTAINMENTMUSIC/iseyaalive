
import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  BookOpen, 
  Compass, 
  Star, 
  ChevronRight, 
  Glasses, 
  Ticket,
  Play,
  Globe,
  Plus,
  X,
  Save,
  ChevronLeft,
  Award,
  Pause,
  Volume2,
  Video,
  FileText,
  Search,
  CheckCircle2,
  Lock,
  Camera,
  Layers,
  ArrowRight,
  Maximize2,
  Radio,
  Loader2,
  Thermometer,
  CloudSun,
  Users,
  Fingerprint,
  Zap,
  Sparkles,
  SearchCode,
  ShieldCheck,
  Target,
  QrCode,
  Smartphone,
  Clapperboard,
  History,
  AlertTriangle,
  ExternalLink,
  Cpu,
  Download,
  FileDown,
  Info,
  Palette,
  QrCode as QrIcon,
  Verified
} from 'lucide-react';
import { Attraction } from '../types';
import { GoogleGenAI } from "@google/genai";

// Specialized sub-component for high-performance image delivery
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
                    <div className="w-full h-full bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
                    <Camera className="absolute w-8 h-8 text-slate-200" />
                </div>
            )}
            {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-300">
                    <Camera className="w-8 h-8 mb-2" />
                    <span className="text-[8px] font-black uppercase">Signal Lost</span>
                </div>
            )}
            <img 
                src={src} 
                alt={alt} 
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} ${imgClassName}`}
            />
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
    description: 'The ancient fortress of the Egba people. Features include natural tunnels, historic caves, and the legendary shrines of Lisabi.',
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
    description: 'Africa\'s first presidential library. Explore the life, times, and achievements of Chief Olusegun Obasanjo.',
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

const HERITAGE_STORIES = [
  {
    id: 'h1',
    title: 'Legend of Lisabi',
    narrator: 'Chief Ifayemi',
    type: 'audio',
    category: 'Folk Legend',
    duration: '12:40',
    summary: 'The story of how one man unified the Egba people against tyranny.',
    content: "Lisabi was a giant of a man, not just in stature but in spirit. While others feared the tax collectors, Lisabi planned in silence. He turned the 'Aro' farmers cooperative into a secret army. When the signal was given, the Egba people rose as one. This is the story of how agriculture became the sword of liberation.",
    image: 'https://images.unsplash.com/photo-1533552033664-64906f2364c7?q=80&w=2071&auto=format&fit=crop',
    audioUrl: '#'
  },
  {
    id: 'h2',
    title: 'Adire: Visual Language',
    narrator: 'Iya Heritage Hub',
    type: 'video',
    category: 'Craftsmanship',
    duration: '08:22',
    summary: 'Decoding the ancient motifs and patterns of Egba indigo dyeing.',
    content: "Every pattern on a piece of Adire is a sentence. When you see the 'Ibadandun' pattern, you are looking at a celebration of beauty. When you see the 'Lace' design, you see the influence of European trade on Egba artisans. Our indigo is not just dye; it is the blood of our ancestors' creativity.",
    image: 'https://images.unsplash.com/photo-1550974720-33234d7d130f?q=80&w=2070&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-water-movement-in-slow-motion-4186-large.mp4'
  }
];

const LOADING_MESSAGES = [
  "Initializing Ancestral Signal...",
  "Synthesizing 4K Illustrator Textures...",
  "Rendering Egba Cultural Story Action...",
  "Synchronizing Hand-Painted Heritage Nodes...",
  "Optimizing Visual Storytelling Engine...",
  "Verifying Historical Accuracy on State Ledger...",
  "Engaging 3.1 Neural Weaver Protocol...",
  "Finalizing Cinematic 4K Playback Core..."
];

export const Tourism: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'archive' | 'agent'>('explore');
  const [attractions, setAttractions] = useState<ExtendedAttraction[]>(INITIAL_ATTRACTIONS);
  const [selectedAttraction, setSelectedAttraction] = useState<ExtendedAttraction | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeArchiveStory, setActiveArchiveStory] = useState<typeof HERITAGE_STORIES[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<ExtendedAttraction | null>(null);
  const [showIseyaaInfo, setShowIseyaaInfo] = useState(false);

  // Ticket States
  const [isProcessingTicket, setIsProcessingTicket] = useState(false);
  const [showTicketOverlay, setShowTicketOverlay] = useState(false);
  const [ticketRef, setTicketRef] = useState('');

  // Video Generation States
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoPrompt, setVideoPrompt] = useState('A cinematic 4K illustrator-style animation of Olumo Rock during the ancient wars, featuring epic action, traditional Egba warriors, and rich hand-painted textures.');
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
        const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
        setHasApiKey(!!hasKey);
    };
    checkKey();
  }, []);

  useEffect(() => {
    let interval: any;
    if (isGeneratingVideo) {
      interval = setInterval(() => {
        setLoadingMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isGeneratingVideo]);

  const handleSelectApiKey = async () => {
    await (window as any).aistudio?.openSelectKey();
    setHasApiKey(true); 
  };

  const handleDownloadArchive = (story: any) => {
    if (!story) return;
    const header = "IṢẸ́YÁÁ DIGITAL HERITAGE ARCHIVE - OFFICIAL STATE TRANSCRIPT\n";
    const subHeader = "==================================================\n";
    const timestamp = `Signal Timestamp: ${new Date().toLocaleString()}\n`;
    const auth = `Verification Node: IṢẸ́YÁÁ-V4-LEAD\n\n`;
    const body = `ARCHIVE TITLE: ${story.title}\nNARRATOR: ${story.narrator}\nCATEGORY: ${story.category}\n\nCONTENT NARRATIVE:\n${story.content}`;
    const footer = "\n\n==================================================\nThis document is a verified artifact of the Ogun State Digital OS.";
    
    try {
        const fullContent = header + subHeader + timestamp + auth + body + footer;
        const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `iseyaa-heritage-${story.title.toLowerCase().replace(/\s+/g, '-')}.txt`);
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);
    } catch (e) {
        console.error("Archive Protocol Failure:", e);
        alert("Digital download node interrupted. Re-routing through secondary buffer...");
    }
  };

  const generateHeritageVideo = async () => {
    if (!hasApiKey) {
        handleSelectApiKey();
        return;
    }

    setIsGeneratingVideo(true);
    setGeneratedVideoUrl(null);
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-generate-preview',
            prompt: `4K Illustrator style animation storytelling: ${videoPrompt}. High fidelity, dynamic action sequences, rich hand-painted artistic textures, epic scale, Ogun State heritage focus.`,
            config: {
                numberOfVideos: 1,
                resolution: '1080p',
                aspectRatio: '16:9'
            }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 8000));
            operation = await ai.operations.getVideosOperation({ operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
            const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setGeneratedVideoUrl(url);
        }
    } catch (error: any) {
        console.error("Veo Error:", error);
        const errMsg = error?.message || "";
        if (errMsg.includes("permission") || errMsg.includes("403") || errMsg.includes("Requested entity was not found")) {
            setHasApiKey(false);
            alert("ISEYAA Permission Error: Accessing high-fidelity video models requires a PAID Google Cloud Project API Key. Please verify billing at ai.google.dev/gemini-api/docs/billing and re-select your key.");
            await (window as any).aistudio?.openSelectKey();
            setHasApiKey(true);
        } else {
            alert("Neural Weaver signal interrupted. Checking bandwidth and network node integrity...");
        }
    } finally {
        setIsGeneratingVideo(false);
    }
  };

  const handleGenerateTicket = () => {
    if (!selectedAttraction) return;
    setIsProcessingTicket(true);
    setTimeout(() => {
        setTicketRef(`ISEYAA-TKT-${Math.floor(100000 + Math.random() * 900000)}`);
        setIsProcessingTicket(false);
        setShowTicketOverlay(true);
    }, 2000);
  };

  const openWeaverForStory = (story: any) => {
    const prompt = `A cinematic 4K illustrator-style action storytelling animation for "${story.title}". Illustrate the action: ${story.summary}. Vivid hand-painted textures, realistic character motion, Ogun heritage motifs.`;
    setVideoPrompt(prompt);
    setIsVideoModalOpen(true);
  };

  const [newAttr, setNewAttr] = useState<Partial<ExtendedAttraction>>({
    name: '', location: '', image: '', category: 'Experience', ticketPrice: 5000, description: ''
  });

  const handleNeuralScan = () => {
    setIsScanning(true);
    setTimeout(() => {
        setIsScanning(false);
        const randomAttr = attractions[Math.floor(Math.random() * attractions.length)];
        setScannedResult(randomAttr);
    }, 2500);
  };

  const handleAddAttraction = (e: React.FormEvent) => {
    e.preventDefault();
    if ((newAttr.ticketPrice || 0) < 5000) {
        alert("Minimum state-standard ticket price is ₦5,000.");
        return;
    }
    const fullAttr: ExtendedAttraction = {
        ...newAttr,
        id: Date.now().toString(),
        rating: 5.0,
        hasVR: false,
        status: 'Operational',
        historicalEra: 'New Discovery',
        neuralFormFactor: 100
    } as ExtendedAttraction;
    setAttractions([fullAttr, ...attractions]);
    setIsAdding(false);
    setNewAttr({ name: '', location: '', image: '', category: 'Experience', ticketPrice: 5000, description: '' });
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      
      {/* ACCESS TICKET OVERLAY */}
      {showTicketOverlay && selectedAttraction && (
          <div className="fixed inset-0 z-[650] bg-emerald-950/95 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-500">
               <div className="bg-white rounded-[4rem] shadow-3xl w-full max-w-lg overflow-hidden border-[15px] border-white/20 flex flex-col relative perspective">
                   <div className="bg-emerald-600 p-12 text-center text-white relative overflow-hidden">
                       <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                       <div className="relative z-10">
                            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-xl border border-white/30 shadow-2xl">
                                <Ticket className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Access Pass</h2>
                            <p className="text-[10px] text-emerald-100 font-black uppercase tracking-[0.4em] mt-3">Gateway Tourism Authorization</p>
                       </div>
                   </div>
                   
                   <div className="p-12 space-y-10">
                       <div className="space-y-4">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attraction Node</p>
                           <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase italic">{selectedAttraction.name}</h3>
                           <div className="flex items-center gap-3 text-slate-500 font-bold uppercase text-[10px] tracking-widest italic">
                               <MapPin className="w-4 h-4 text-emerald-500" /> {selectedAttraction.location}
                           </div>
                       </div>

                       <div className="bg-slate-50 p-10 rounded-[3rem] flex flex-col items-center justify-center border-4 border-slate-100 relative group">
                            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <QrIcon className="w-48 h-48 text-slate-900 mb-8 relative z-10" />
                            <div className="text-center relative z-10">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pass Hash ID</p>
                                <p className="font-mono font-black text-lg text-emerald-600">{ticketRef}</p>
                            </div>
                       </div>

                       <div className="space-y-4 border-t border-slate-100 pt-10">
                           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                               <span>Security Tier</span>
                               <span className="text-emerald-600 flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> Tier 3 Verified</span>
                           </div>
                           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                               <span>Authorized Fare</span>
                               <span className="text-slate-900 font-mono text-lg">₦ {selectedAttraction.ticketPrice.toLocaleString()}</span>
                           </div>
                       </div>

                       <div className="flex gap-4">
                            <button onClick={() => setShowTicketOverlay(false)} className="flex-1 py-5 border-4 border-slate-100 text-slate-400 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Dismiss Pass</button>
                            <button className="flex-[2] py-5 bg-slate-950 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl flex items-center justify-center gap-3 group">
                                <Smartphone className="w-4 h-4 group-hover:animate-bounce" /> Save to Wallet
                            </button>
                       </div>
                   </div>

                   <div className="p-6 bg-slate-950 text-center text-[8px] text-emerald-500/40 font-black uppercase tracking-[0.5em] border-t border-white/5">
                       IṢẸ́YÁÁ PROTOCOL V4.2 • CRYPTO-ANCHORED IDENTITY
                   </div>
               </div>
          </div>
      )}

      {/* VEO VIDEO GENERATION LOADING OVERLAY */}
      {isGeneratingVideo && (
          <div className="fixed inset-0 z-[600] bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-12">
              <div className="relative w-96 h-96 mb-16">
                  <div className="absolute inset-0 border-[15px] border-emerald-500/5 rounded-full" />
                  <div className="absolute inset-0 border-[15px] border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                      <Clapperboard className="w-24 h-24 text-emerald-500 animate-pulse" />
                      <div className="flex gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '200ms'}} />
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '400ms'}} />
                      </div>
                  </div>
              </div>
              <div className="space-y-6 max-w-2xl">
                  <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter">Action Synthesis</h3>
                  <p className="text-emerald-500 font-bold uppercase tracking-[0.5em] text-xs h-6 animate-in fade-in slide-in-from-bottom-2" key={loadingMsgIdx}>
                      {LOADING_MESSAGES[loadingMsgIdx]}
                  </p>
                  <p className="text-slate-500 text-sm font-medium mt-10 max-w-lg mx-auto leading-relaxed">
                      Please wait. Our Veo 3.1 engine is deep-dreaming this heritage action story in high-fidelity 4K illustrator style. This requires a paid authorization node.
                  </p>
              </div>
          </div>
      )}

      {/* TICKET PROCESSING OVERLAY */}
      {isProcessingTicket && (
          <div className="fixed inset-0 z-[620] bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-12">
              <div className="relative w-72 h-72 mb-12">
                  <div className="absolute inset-0 border-[15px] border-emerald-500/10 rounded-full"></div>
                  <div className="absolute inset-0 border-[15px] border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                      <Ticket className="w-20 h-20 text-emerald-500 animate-pulse" />
                  </div>
              </div>
              <div className="space-y-4">
                  <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Authorizing...</h3>
                  <p className="text-emerald-500 font-bold uppercase tracking-[0.5em] text-[10px]">Syncing Fare Node with State Ledger</p>
              </div>
          </div>
      )}

      {/* VIDEO PLAYER MODAL */}
      {isVideoModalOpen && (
          <div className="fixed inset-0 z-[550] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-500">
               <div className="bg-white rounded-[4rem] shadow-2xl w-full max-w-6xl overflow-hidden border-[15px] border-white/10 flex flex-col h-[85vh]">
                   <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
                       <div className="flex items-center gap-6">
                           <div className="p-4 bg-emerald-600 rounded-2xl shadow-xl text-white">
                               <Sparkles className="w-6 h-6" />
                           </div>
                           <div>
                               <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Illustrator Story Weaver</h3>
                               <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.5em]">Veo 3.1 Cinema Protocol Active</p>
                           </div>
                       </div>
                       <button onClick={() => setIsVideoModalOpen(false)} className="p-5 hover:bg-slate-100 rounded-full text-slate-400 transition-all"><X className="w-8 h-8" /></button>
                   </div>
                   
                   <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar bg-slate-50/50">
                       {!generatedVideoUrl ? (
                           <div className="space-y-10">
                               <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-emerald-50">
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6 mb-4 block">Visual Action Prompt</label>
                                   <textarea 
                                       value={videoPrompt}
                                       onChange={(e) => setVideoPrompt(e.target.value)}
                                       className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:border-emerald-500 outline-none font-black text-3xl italic leading-tight text-slate-900"
                                       rows={3}
                                   />
                               </div>

                               <div className="grid md:grid-cols-3 gap-8">
                                   {[
                                       { t: 'Style', v: '4K Illustrator', i: Palette },
                                       { t: 'Aspect Ratio', v: '16:9 Cinematic', i: Clapperboard },
                                       { t: 'Quality', v: 'State Standard 1080p', i: Cpu }
                                   ].map(spec => (
                                       <div key={spec.t} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-md flex items-center gap-6">
                                           <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600"><spec.i className="w-6 h-6" /></div>
                                           <div><p className="text-[8px] font-black uppercase text-slate-400">{spec.t}</p><p className="font-bold text-slate-900">{spec.v}</p></div>
                                       </div>
                                   ))}
                               </div>

                               {!hasApiKey ? (
                                   <div className="bg-amber-50 border-2 border-amber-200 p-10 rounded-[3rem] space-y-6 text-center">
                                       <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
                                       <h4 className="text-2xl font-black text-amber-900 uppercase italic">Paid Authorization Mandate</h4>
                                       <p className="text-amber-800 text-lg font-medium max-w-lg mx-auto">To engage high-fidelity video synthesis, you must select an API key from a <strong>Paid Google Cloud Project</strong>. Keys from the free tier do not have permission for the Veo engine.</p>
                                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documentation: <a href="https://ai.google.dev/gemini-api/docs/billing" className="underline text-emerald-600" target="_blank" rel="noreferrer">ai.google.dev/billing</a></p>
                                       <button onClick={handleSelectApiKey} className="px-12 py-5 bg-amber-600 text-white rounded-full font-black text-xl hover:bg-amber-700 transition-all shadow-xl shadow-amber-900/20 active:scale-95">Select Protocol Key</button>
                                   </div>
                               ) : (
                                   <button 
                                       onClick={generateHeritageVideo}
                                       className="w-full py-10 bg-emerald-600 text-white rounded-full font-black text-4xl hover:bg-emerald-700 shadow-2xl shadow-emerald-600/40 transition-all active:scale-95 flex items-center justify-center gap-8 group"
                                   >
                                       <Zap className="w-12 h-12 group-hover:scale-125 transition-transform" /> COMMENCE WEAVING
                                   </button>
                               )}
                           </div>
                       ) : (
                           <div className="space-y-12 animate-in zoom-in-95 duration-700">
                               <div className="aspect-video bg-black rounded-[4rem] overflow-hidden shadow-3xl border-[10px] border-white relative group">
                                   <video src={generatedVideoUrl} controls autoPlay className="w-full h-full object-contain" />
                                   <div className="absolute top-8 left-8 bg-emerald-600 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center gap-3">
                                       <ShieldCheck className="w-4 h-4" /> AUTHENTICATED AI SYNTHESIS
                                   </div>
                               </div>
                               <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                   <div className="space-y-2">
                                       <h4 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Synthesized Legend</h4>
                                       <p className="text-slate-400 font-medium italic text-xl">4K Illustrator Action Narrative • Veo 3.1 Engine</p>
                                   </div>
                                   <div className="flex gap-4">
                                       <button onClick={() => setGeneratedVideoUrl(null)} className="px-10 py-5 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl">Reset Session</button>
                                       <a href={generatedVideoUrl} download="iseyaa-heritage-action.mp4" className="px-10 py-5 border-4 border-slate-100 text-slate-400 rounded-full font-black text-xs uppercase tracking-widest hover:text-emerald-600 hover:border-emerald-50 transition-all flex items-center gap-3">
                                           <Smartphone className="w-4 h-4" /> Download Node
                                       </a>
                                   </div>
                               </div>
                           </div>
                       )}
                   </div>
                   
                   <div className="p-8 bg-slate-950 text-center text-[10px] text-emerald-500/60 font-black uppercase tracking-[0.5em] border-t border-white/5">
                       IṢẸ́YÁÁ NEURAL OS • POWERED BY VEO-3.1 CINEMA ENGINE
                   </div>
               </div>
          </div>
      )}

      {/* IṢẸ́YÁÁ INFO MODAL */}
      {showIseyaaInfo && (
          <div className="fixed inset-0 z-[700] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-500">
               <div className="bg-white rounded-[4rem] shadow-2xl w-full max-w-3xl overflow-hidden border-[15px] border-emerald-600/10 flex flex-col p-16 space-y-10">
                   <div className="flex justify-between items-center">
                       <div className="bg-emerald-600 p-5 rounded-3xl text-white shadow-xl">
                           <Globe className="w-10 h-10" />
                       </div>
                       <button onClick={() => setShowIseyaaInfo(false)} className="p-4 hover:bg-slate-100 rounded-full text-slate-400 transition-all"><X className="w-8 h-8" /></button>
                   </div>
                   <div className="space-y-6">
                       <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">What is IṢẸ́YÁÁ?</h2>
                       <p className="text-xl text-slate-500 leading-relaxed font-light italic">
                           IṢẸ́YÁÁ (Integrated Sports, Events, Youth, Arts & Attractions) is the official government-owned, AI-powered digital OS of Ogun State.
                       </p>
                       <p className="text-lg text-slate-400 leading-relaxed font-light">
                           It serves as a unified economic hub connecting citizens, vendors, and tourists to state services, heritage archives, and global trade nodes using high-fidelity neural processing and the state's digital ledger.
                       </p>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                       {[
                           { l: 'Vision', v: 'Integrated Economy', i: Zap },
                           { l: 'Auth', v: 'State Biometric Core', i: Fingerprint }
                       ].map(node => (
                           <div key={node.l} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center gap-6">
                               <node.i className="w-8 h-8 text-emerald-600" />
                               <div><p className="text-[10px] font-black uppercase text-slate-400">{node.l}</p><p className="font-bold text-slate-900">{node.v}</p></div>
                           </div>
                       ))}
                   </div>
               </div>
          </div>
      )}

      {/* NEURAL DISCOVERY SCANNER OVERLAY */}
      {isScanning && (
          <div className="fixed inset-0 z-[500] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-12">
              <div className="relative w-80 h-80 mb-12">
                  <div className="absolute inset-0 border-[15px] border-emerald-500/10 rounded-full"></div>
                  <div className="absolute inset-0 border-[15px] border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                      <SearchCode className="w-24 h-24 text-emerald-500 animate-pulse" />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500 shadow-[0_0_20px_#10b981] animate-[scan_2s_ease-in-out_infinite] z-20"></div>
              </div>
              <div className="space-y-4">
                  <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Neural Scan</h3>
                  <p className="text-emerald-500 font-bold uppercase tracking-[0.6em] text-xs">Triangulating Cultural Nodes...</p>
              </div>
          </div>
      )}

      {/* DISCOVERY RESULT MODAL */}
      {scannedResult && !isScanning && (
          <div className="fixed inset-0 z-[450] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in zoom-in-95 duration-500">
               <div className="bg-white rounded-[4rem] shadow-2xl w-full max-w-4xl overflow-hidden border-[15px] border-white/20 relative">
                   <div className="absolute top-8 right-8 z-30">
                       <button onClick={() => setScannedResult(null)} className="p-4 bg-white/90 backdrop-blur rounded-full text-slate-900 shadow-2xl hover:scale-110 active:scale-90 transition-all"><X className="w-8 h-8" /></button>
                   </div>
                   <div className="flex flex-col lg:flex-row h-[600px]">
                        <div className="lg:w-1/2 relative group overflow-hidden">
                             <img src={scannedResult.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s]" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                             <div className="absolute bottom-8 left-8">
                                 <span className="bg-emerald-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Discovery Match Found</span>
                             </div>
                        </div>
                        <div className="lg:w-1/2 p-16 flex flex-col justify-between">
                            <div className="space-y-6">
                                <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.5em]">{scannedResult.category} Node Identified</p>
                                <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">{scannedResult.name}</h2>
                                <p className="text-slate-500 text-lg leading-relaxed italic">"{scannedResult.description}"</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                                        <Award className="w-6 h-6 text-emerald-600" />
                                        <div><p className="text-[8px] font-black text-slate-400 uppercase">Neural Rank</p><p className="font-bold text-slate-900 text-lg">Top 1%</p></div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                                        <Zap className="w-6 h-6 text-emerald-600" />
                                        <div><p className="text-[8px] font-black text-slate-400 uppercase">Power Status</p><p className="font-bold text-slate-900 text-lg">High</p></div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => { setSelectedAttraction(scannedResult); setScannedResult(null); }} className="w-full py-7 bg-slate-900 text-white rounded-full font-black text-xl hover:bg-emerald-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4">
                                Initialize Travel Protocol <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                   </div>
               </div>
          </div>
      )}

      {/* ATTRACTION BOOKING OVERLAY */}
      {selectedAttraction && (
          <div className="fixed inset-0 z-[200] bg-emerald-950/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500" role="dialog" aria-labelledby="attraction-title">
              <div className="bg-white w-full max-w-7xl h-full md:h-auto md:max-h-[92vh] rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border-[10px] border-white/20">
                  <div className="lg:w-3/5 bg-slate-200 relative group overflow-hidden">
                      <OptimizedImage 
                        src={selectedAttraction.image} 
                        alt={selectedAttraction.name}
                        className="w-full h-full"
                        imgClassName="transition-transform duration-[12s] group-hover:scale-125"
                      />
                      <button 
                        onClick={() => setSelectedAttraction(null)} 
                        className="absolute top-8 left-8 p-6 bg-white/90 backdrop-blur-md rounded-full shadow-2xl text-slate-900 transition-all hover:rotate-90 z-30"
                        aria-label="Close attraction details"
                      >
                        <X className="w-8 h-8" />
                      </button>
                      <div className="absolute bottom-8 left-8 flex gap-4 z-20">
                          <div className="bg-white/95 backdrop-blur px-8 py-4 rounded-[2rem] text-[10px] font-black text-emerald-800 border border-white shadow-2xl uppercase tracking-[0.4em] flex items-center gap-3">
                              <MapPin className="w-5 h-5" /> {selectedAttraction.location}
                          </div>
                          <div className="bg-white/95 backdrop-blur px-8 py-4 rounded-[2rem] text-[10px] font-black text-blue-600 border border-white shadow-2xl uppercase tracking-[0.4em] flex items-center gap-3">
                              <CloudSun className="w-5 h-5" /> {selectedAttraction.temperature}°C • {selectedAttraction.weather}
                          </div>
                      </div>
                      <div className="absolute top-8 right-8 space-y-4 z-20">
                          <div className="bg-black/60 backdrop-blur px-5 py-3 rounded-2xl border border-white/10 text-white flex items-center gap-4">
                              <div className="w-2 h-10 bg-emerald-500 rounded-full"></div>
                              <div><p className="text-[8px] font-black uppercase text-slate-400">Crowd Density</p><p className="font-bold text-lg">Low (12%)</p></div>
                          </div>
                          <div className="bg-black/60 backdrop-blur px-5 py-3 rounded-2xl border border-white/10 text-white flex items-center gap-4">
                              <div className="w-2 h-10 bg-blue-500 rounded-full"></div>
                              <div><p className="text-[8px] font-black uppercase text-slate-400">Historical Age</p><p className="font-bold text-lg">{selectedAttraction.historicalEra}</p></div>
                          </div>
                      </div>
                  </div>
                  <div className="lg:w-2/5 p-12 lg:p-24 flex flex-col bg-white overflow-y-auto custom-scrollbar">
                      <div className="flex-1 space-y-12">
                          <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                  <span className="px-6 py-2 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">{selectedAttraction.category}</span>
                                  {selectedAttraction.hasVR && <span className="px-6 py-2 bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">VR Ready</span>}
                              </div>
                              <h2 id="attraction-title" className="text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic">{selectedAttraction.name}</h2>
                              <div className="flex items-center gap-2 text-amber-500 font-black">
                                  <Star className="w-6 h-6 fill-current" /> {selectedAttraction.rating} <span className="text-slate-300 font-bold ml-3 uppercase tracking-widest text-xs">Official Rating</span>
                              </div>
                          </div>
                          <p className="text-slate-500 leading-relaxed text-2xl font-light italic">"{selectedAttraction.description}"</p>
                          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-inner">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Gate Protocol Access</p>
                               <div className="flex justify-between items-baseline">
                                   <span className="text-6xl font-black text-slate-900 tracking-tighter">₦ {selectedAttraction.ticketPrice.toLocaleString()}</span>
                                   <span className="text-slate-400 font-black uppercase text-xs tracking-widest">/ Per User</span>
                               </div>
                          </div>
                          <div className="space-y-4">
                             <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                 <span>Neural Integration Score</span>
                                 <span className="text-emerald-600">{selectedAttraction.neuralFormFactor}%</span>
                             </div>
                             <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: `${selectedAttraction.neuralFormFactor}%` }}></div>
                             </div>
                          </div>
                      </div>
                      <div className="mt-16 space-y-6">
                          <button 
                            onClick={handleGenerateTicket}
                            className="w-full py-8 bg-emerald-600 text-white rounded-full font-black text-2xl hover:bg-emerald-700 shadow-2xl transition-all flex items-center justify-center gap-6 group active:scale-[0.98]"
                            aria-label={`Generate access ticket for ${selectedAttraction.name} at ₦ ${selectedAttraction.ticketPrice.toLocaleString()}`}
                          >
                              <Ticket className="w-9 h-9 group-hover:rotate-12 transition-transform" /> Generate Access Ticket
                          </button>
                          <div className="flex gap-4">
                              <button className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3">
                                  <Smartphone className="w-4 h-4" /> Save to Wallet
                              </button>
                              <button className="flex-1 py-4 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 transition-all flex items-center justify-center gap-3">
                                  <Glasses className="w-4 h-4" /> Launch VR Preview
                              </button>
                          </div>
                          <p className="text-center text-[9px] text-slate-400 font-black uppercase tracking-[0.4em] mt-8 flex items-center justify-center gap-2">
                             <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secured by IṢẸ́YÁÁ Neural Identity Hub
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* HERITAGE ARCHIVE PLAYER */}
      {activeArchiveStory && (
          <div className="fixed inset-0 z-[300] bg-slate-950 flex flex-col animate-in fade-in duration-700" role="dialog" aria-labelledby="story-title">
              <header className="p-8 flex justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-3xl">
                  <div className="flex items-center gap-8">
                      <button 
                        onClick={() => { setActiveArchiveStory(null); setIsPlaying(false); }} 
                        className="p-5 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all"
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </button>
                      <div>
                          <h3 id="story-title" className="text-3xl font-black text-white tracking-tighter uppercase italic">{activeArchiveStory.title}</h3>
                          <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.5em] mt-2 flex items-center gap-3"><Radio className="w-3 h-3 animate-pulse" /> Digital Heritage Archive Node</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-6">
                      <button 
                        onClick={() => handleDownloadArchive(activeArchiveStory)}
                        className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 group"
                      >
                          <FileDown className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" /> Download Archive
                      </button>
                      <button 
                        onClick={() => { setActiveArchiveStory(null); setIsPlaying(false); }} 
                        className="p-4 text-slate-500 hover:text-white"
                      >
                        <X />
                      </button>
                  </div>
              </header>

              <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                  <div className="lg:w-1/2 h-1/2 lg:h-full relative bg-black group">
                      {activeArchiveStory.type === 'video' ? (
                          <video autoPlay loop muted={!isPlaying} className="w-full h-full object-cover opacity-60">
                              <source src={activeArchiveStory.videoUrl} type="video/mp4" />
                          </video>
                      ) : (
                          <OptimizedImage 
                            src={activeArchiveStory.image} 
                            alt={activeArchiveStory.title}
                            className="w-full h-full opacity-40 grayscale group-hover:grayscale-0"
                          />
                      )}
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                          <div className="w-60 h-60 rounded-full border-[15px] border-emerald-500/10 flex items-center justify-center relative mb-12 shadow-3xl">
                              <div className={`absolute inset-0 border-[15px] border-emerald-500 border-t-transparent rounded-full ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
                              <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-40 h-40 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-[0_0_80px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-90 transition-all z-20"
                              >
                                  {isPlaying ? <Pause className="w-16 h-16 fill-current" /> : <Play className="w-16 h-16 fill-current ml-3" />}
                              </button>
                          </div>
                          <div className="space-y-6 w-full max-w-lg">
                              <div className="flex items-center gap-3 justify-center">
                                  {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
                                      <div key={i} className={`w-2 rounded-full bg-emerald-500 transition-all duration-300 ${isPlaying ? 'animate-bounce' : 'h-1.5 opacity-20'}`} style={{ height: isPlaying ? `${Math.random() * 40 + 10}px` : '6px', animationDelay: `${i * 100}ms` }} />
                                  ))}
                              </div>
                              <div className="flex justify-between items-center text-[10px] font-mono text-emerald-500/60 uppercase tracking-[0.3em]">
                                  <span>Archive Sync Active</span>
                                  <span>{activeArchiveStory.duration}</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="lg:w-1/2 h-1/2 lg:h-full overflow-y-auto p-12 lg:p-24 bg-slate-900 border-l border-white/5 custom-scrollbar">
                      <div className="max-w-2xl mx-auto space-y-16">
                          <div className="space-y-6">
                              <div className="flex justify-between items-center">
                                  <span className="text-emerald-500 font-black tracking-[0.6em] text-[10px] uppercase block">Preserving History</span>
                                  <button 
                                    onClick={() => openWeaverForStory(activeArchiveStory)}
                                    className="bg-purple-600/20 text-purple-400 border border-purple-500/30 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-purple-600 hover:text-white transition-all animate-pulse"
                                  >
                                      <Clapperboard className="w-3 h-3" /> Synthesize AI Animation
                                  </button>
                              </div>
                              <h2 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">{activeArchiveStory.title}</h2>
                              <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                                  <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-500 font-black text-lg shadow-inner">{activeArchiveStory.narrator.charAt(0)}</div>
                                      <div>
                                          <p className="text-white font-bold uppercase tracking-widest text-xs">{activeArchiveStory.narrator}</p>
                                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Verified Cultural Elder</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="prose prose-invert max-w-none">
                              <p className="text-3xl lg:text-5xl font-light text-slate-400 leading-[1.4] italic first-letter:text-9xl first-letter:font-black first-letter:text-emerald-500 first-letter:mr-6 first-letter:float-left first-letter:leading-[0.8] selection:bg-emerald-500/40">
                                  {activeArchiveStory.content}
                              </p>
                              <div className="mt-20 p-10 bg-white/5 rounded-[3rem] border border-white/5 space-y-8">
                                  <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-3"><Layers className="w-4 h-4 text-emerald-500" /> Archival Metadata</h4>
                                  <p className="text-sm text-slate-500 leading-relaxed font-medium">Recorded at the Ogun Digital Archive Hub in Jan 2024. This signal is part of the "Ancestral Wisdom" stream for future Egba generations.</p>
                                  <button 
                                      onClick={() => handleDownloadArchive(activeArchiveStory)}
                                      className="flex items-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                                  >
                                      <FileText className="w-4 h-4" /> Download Full Transcript Node
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </main>
          </div>
      )}

      {/* Main Header */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-[60] px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
                <div className="bg-emerald-600 p-4 rounded-[1.5rem] shadow-2xl shadow-emerald-600/20"><Compass className="text-white w-8 h-8" /></div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Tourism <span className="text-emerald-600">&</span> Culture</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.5em] mt-2 flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Gateways Experience Protocol
                    </p>
                </div>
            </div>

            <nav className="flex bg-slate-100 p-2 rounded-full border border-slate-200 shadow-inner overflow-hidden">
                {[
                  { id: 'explore', icon: Compass, label: 'EXPLORE' },
                  { id: 'archive', icon: BookOpen, label: 'ARCHIVE' },
                  { id: 'agent', icon: Award, label: 'AGENT HUB' }
                ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)} 
                      className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black tracking-widest transition-all ${activeTab === tab.id ? 'bg-white shadow-2xl text-emerald-600 scale-105' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                      <tab.icon className="w-4 h-4" /> {tab.label}
                    </button>
                ))}
            </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-16">
        
        {activeTab === 'explore' && (
            <div className="space-y-24 animate-in fade-in duration-700">
                
                {/* NEURAL DISCOVERY BAR */}
                <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-3xl border-[8px] border-white group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-4 text-center md:text-left">
                            <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px] flex items-center justify-center md:justify-start gap-3">
                                <Sparkles className="w-4 h-4" /> AI Personalized Recommendations
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Find Your Next Story.</h2>
                            <p className="text-slate-400 text-lg font-light italic max-w-xl">Let our Neural Agent scan verified wonder sites to match your unique cultural blueprint.</p>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setShowIseyaaInfo(true)}
                                className="p-7 bg-white/5 border-2 border-white/10 rounded-full text-white hover:bg-white/10 transition-all active:scale-95"
                            >
                                <Info className="w-8 h-8" />
                            </button>
                            <button 
                                onClick={handleNeuralScan}
                                className="px-12 py-7 bg-emerald-600 text-white rounded-full font-black text-xl hover:bg-emerald-500 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] active:scale-95 flex items-center gap-4 group/btn"
                            >
                                <Fingerprint className="w-7 h-7 group-hover/btn:scale-110" /> ENGAGE NEURAL SCAN
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                        <h2 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.9]">Wonder<br/>Signals.</h2>
                        <p className="text-xl text-slate-400 mt-6 font-light max-w-xl">Curated state-standard destinations in Ogun. Minimum ticket entry ₦5,000.</p>
                    </div>
                    <div className="bg-emerald-50 px-8 py-4 rounded-full border border-emerald-100 flex items-center gap-6">
                        <div className="flex -space-x-4">
                            {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-md"><img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="Active tourist" /></div>)}
                        </div>
                        <p className="text-xs font-black text-emerald-800 uppercase tracking-widest">4.2k Active Tourists</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                    {attractions.map(attr => (
                        <div 
                          key={attr.id} 
                          onClick={() => setSelectedAttraction(attr)} 
                          className="group cursor-pointer bg-white rounded-[4rem] border-2 border-slate-50 p-8 shadow-sm hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full hover:-translate-y-3"
                        >
                            <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden relative mb-10 shadow-2xl">
                                <OptimizedImage 
                                    src={attr.image} 
                                    alt={attr.name}
                                    className="w-full h-full"
                                    imgClassName="group-hover:scale-110 duration-[6s]"
                                />
                                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-5 py-2.5 rounded-full text-[9px] font-black text-emerald-800 border border-white shadow-2xl uppercase tracking-widest">Verified Selection</div>
                                <div className="absolute top-6 right-6 flex flex-col gap-2">
                                    {attr.hasVR && <div className="bg-purple-600 text-white p-3 rounded-2xl shadow-2xl animate-pulse"><Glasses className="w-5 h-5" /></div>}
                                    <div className="bg-white/90 backdrop-blur p-3 rounded-2xl shadow-2xl flex flex-col items-center">
                                        <Thermometer className="w-4 h-4 text-orange-500" />
                                        <span className="text-[8px] font-black text-slate-900 mt-1">{attr.temperature}°</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                                    <span className="text-white font-black text-xl flex items-center gap-3">Commence Discovery <ArrowRight className="w-6 h-6" /></span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-4 px-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-[0.9] group-hover:text-emerald-600 transition-colors uppercase italic">{attr.name}</h3>
                                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${attr.status === 'Operational' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                        {attr.status}
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] flex items-center gap-2 border-b border-slate-50 pb-6 italic">
                                    <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {attr.location} • {attr.distance}
                                </p>
                                <div className="pt-4 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pass From</span>
                                        <span className="text-3xl font-black text-slate-900 tracking-tighter italic">₦{attr.ticketPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="p-5 bg-emerald-50 text-emerald-600 rounded-[2rem] group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xl active:scale-90"><Ticket className="w-7 h-7" /></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* THE 40 ATTRACTIONS PASS SECTION */}
                <div className="bg-slate-950 rounded-[5rem] p-16 lg:p-32 text-white relative overflow-hidden shadow-3xl border-[15px] border-white">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[150px] opacity-20 -translate-y-40 translate-x-40" />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                             <span className="text-emerald-500 font-black uppercase tracking-[0.6em] text-[10px] flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center"><Globe className="w-5 h-5" /></div>
                                ULTIMATE GATEWAY PASS
                             </span>
                             <h2 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic">The 40 Wonder Sites.</h2>
                             <p className="text-2xl text-slate-400 leading-relaxed font-light italic">Access every historic shrine, museum, and safari park in Ogun State with one intelligent digital pass. Verified by IṢẸ́YÁÁ Identity.</p>
                             <div className="space-y-6">
                                <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                                    <span className="text-emerald-500">Node Completion Progress</span>
                                    <span>12/40 Nodes Sync</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 shadow-[0_0_20px_#10b981]" style={{ width: '30%' }}></div>
                                </div>
                             </div>
                             <button 
                                className="px-16 py-8 bg-emerald-600 text-white rounded-full font-black text-3xl hover:bg-emerald-500 transition-all shadow-[0_30px_60px_-10px_rgba(16,185,129,0.5)] active:scale-95 flex items-center gap-8 group"
                             >
                                Get Pass — ₦ 50k <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                             </button>
                        </div>
                        <div className="hidden lg:grid grid-cols-2 gap-10">
                            {[
                                { l: 'Bio-Log 01', v: 'Verified', i: Fingerprint },
                                { l: 'GPS Core', v: 'Optimal', i: Target },
                                { l: 'Ledger Node', v: 'Synced', i: Smartphone },
                                { l: 'Auth Signal', v: 'Ready', i: QrCode }
                            ].map((p, i) => (
                                <div key={i} className="aspect-square bg-white/[0.03] rounded-[4rem] border border-white/10 p-12 flex flex-col justify-center items-center text-center group hover:bg-white/5 transition-all">
                                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform"><p.i className="w-10 h-10" /></div>
                                    <p className="text-xl font-black italic mb-2 tracking-tighter uppercase">{p.v}</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{p.l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'archive' && (
            <div className="space-y-24 animate-in fade-in duration-700">
                <div className="text-center max-w-4xl mx-auto space-y-10">
                    <span className="text-emerald-600 font-black uppercase tracking-[0.6em] text-[10px]">Oral History & Lore</span>
                    <h2 className="text-7xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase leading-[0.8] italic">Digital <span className="text-emerald-600">Heritage</span> Archive.</h2>
                    <p className="text-2xl text-slate-400 leading-relaxed font-light italic">Traverse oral histories and ancient practices through high-fidelity digital artifacts.</p>
                </div>

                {/* NEURAL STORY WEAVER CTA */}
                <div className="bg-slate-900 rounded-[3rem] p-16 text-white relative overflow-hidden shadow-3xl border-[10px] border-white group">
                    <div className="absolute top-0 right-0 w-[600px] h-full bg-emerald-500/10 -skew-x-12 translate-x-20 group-hover:scale-110 transition-transform duration-[5s]" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 text-center md:text-left">
                            <div className="flex items-center gap-4 justify-center md:justify-start">
                                <div className="p-3 bg-emerald-600 rounded-2xl shadow-xl animate-pulse">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px]">NEW: IṢẸ́YÁÁ AI STORY WEAVER</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">Synthesize Illustrator Legends.</h2>
                            <p className="text-slate-400 text-xl font-light italic max-w-2xl">Use our Neural 4K Storytelling engine to create cinematic illustrator-style action videos of folklore. Powered by Veo 3.1 Synthesis Engine.</p>
                        </div>
                        <button 
                            onClick={() => {
                                setVideoPrompt('A cinematic 4K illustrator-style action animation of the Egba liberation war, featuring legendary warriors and vivid hand-painted textures.');
                                setIsVideoModalOpen(true);
                            }}
                            className="px-16 py-8 bg-emerald-600 text-white rounded-full font-black text-2xl hover:bg-emerald-500 transition-all shadow-[0_30px_60px_-10px_rgba(16,185,129,0.5)] active:scale-95 flex items-center gap-6 group/btn"
                        >
                            <Clapperboard className="w-9 h-9 group-hover/btn:rotate-12 transition-transform" /> START WEAVING
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-16">
                    {HERITAGE_STORIES.map(story => (
                        <div 
                          key={story.id} 
                          onClick={() => setActiveArchiveStory(story)} 
                          className="group cursor-pointer bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.15)] transition-all flex flex-col h-[650px] hover:-translate-y-4"
                        >
                            <div className="h-3/5 relative overflow-hidden">
                                <OptimizedImage 
                                    src={story.image} 
                                    alt={story.title}
                                    className="w-full h-full"
                                    imgClassName="group-hover:scale-110 duration-[8s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                <div className="absolute bottom-10 left-10 flex items-center gap-6">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-3xl group-hover:scale-110 transition-all border-[8px] border-white/20"><Play className="w-9 h-9 fill-current ml-2" /></div>
                                    <div className="space-y-1">
                                        <p className="text-white font-black text-2xl leading-none uppercase italic">{story.title}</p>
                                        <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2"><Layers className="w-3.5 h-3.5" /> Start {story.type} Protocol</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-2/5 p-12 space-y-8 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="px-6 py-2 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100">Category: {story.category}</span>
                                        <span className="text-xs font-black text-slate-300 font-mono">{story.duration}</span>
                                    </div>
                                    <p className="text-slate-500 leading-relaxed text-2xl font-light italic">"{story.summary}"</p>
                                </div>
                                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-black">Elder</div>
                                        <p className="text-sm font-bold text-slate-900">Narrated by {story.narrator}</p>
                                    </div>
                                    <ChevronRight className="text-emerald-500 w-8 h-8 group-hover:translate-x-3 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'agent' && (
            <div className="space-y-24 animate-in fade-in duration-700">
                <div className="bg-white rounded-[5rem] border-[15px] border-emerald-50 p-16 lg:p-32 shadow-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-full bg-emerald-500 opacity-[0.02] -skew-x-12 translate-x-20" />
                    
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-16 mb-24">
                        <div className="space-y-6">
                            <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase italic">Agent Hub.</h2>
                            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.6em] mt-3">Gateway Tourism Upload Protocol</p>
                        </div>
                        <button 
                            onClick={() => setIsAdding(true)} 
                            className="bg-slate-900 text-white px-16 py-8 rounded-full font-black text-2xl hover:bg-emerald-600 shadow-3xl shadow-slate-900/20 transition-all flex items-center gap-6 active:scale-95 group"
                        >
                            <Plus className="w-10 h-10 group-hover:rotate-180 transition-transform" /> NEW EXPERIENCE
                        </button>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {attractions.map(attr => (
                            <div key={attr.id} className="py-16 flex flex-col md:flex-row justify-between items-center gap-12 group">
                                <div className="flex items-center gap-12">
                                    <OptimizedImage 
                                        src={attr.image} 
                                        alt={attr.name} 
                                        className="w-48 h-48 rounded-[3rem] border-[10px] border-slate-50 shadow-2xl group-hover:border-emerald-50"
                                    />
                                    <div className="space-y-4">
                                        <h4 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">{attr.name}</h4>
                                        <div className="flex flex-wrap items-center gap-8">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard Fare</span>
                                                <span className="text-2xl font-black text-emerald-600 italic">₦ {attr.ticketPrice.toLocaleString()}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</span>
                                                <span className="bg-emerald-50 text-emerald-700 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Broadcasting</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Location Node</span>
                                                <span className="text-slate-500 text-xs font-black uppercase tracking-widest flex items-center gap-3 italic"><MapPin className="w-4 h-4 text-emerald-500" /> {attr.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-6 opacity-0 group-hover:opacity-100 transition-all">
                                    <button className="p-6 bg-white border border-slate-100 rounded-[2rem] text-slate-400 hover:text-emerald-600 shadow-3xl hover:-translate-y-2 transition-all">
                                        <Maximize2 className="w-8 h-8" />
                                    </button>
                                    <button className="p-6 bg-white border border-slate-100 rounded-[2rem] text-slate-400 hover:text-red-500 shadow-3xl hover:-translate-y-2 transition-all">
                                        <X className="w-8 h-8" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {isAdding && (
                    <div className="fixed inset-0 z-[400] bg-emerald-950/98 backdrop-blur-[60px] flex items-center justify-center p-4 animate-in fade-in duration-500">
                        <form onSubmit={handleAddAttraction} className="bg-white w-full max-w-4xl rounded-[5rem] shadow-3xl overflow-hidden flex flex-col max-h-[92vh] border-[15px] border-white/20">
                            <div className="p-16 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
                                <div className="space-y-2">
                                    <h3 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Broadcast New.</h3>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">Verified Ogun Tourism Node</p>
                                </div>
                                <button type="button" onClick={() => setIsAdding(false)} className="p-6 hover:bg-slate-100 rounded-[2rem] transition-all">
                                    <X className="w-10 h-10 text-slate-300" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-16 space-y-12 custom-scrollbar">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Experience Official Title</label>
                                    <input required value={newAttr.name} onChange={e => setNewAttr({...newAttr, name: e.target.value})} placeholder="e.g. Ancient Egba Tunnels Expedition" className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-black text-3xl italic" />
                                </div>
                                <div className="grid grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Ticket Fare Node (₦)</label>
                                        <input required type="number" min={5000} value={newAttr.ticketPrice} onChange={e => setNewAttr({...newAttr, ticketPrice: Number(e.target.value)})} className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-black text-3xl italic" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Category Node</label>
                                        <select value={newAttr.category} onChange={e => setNewAttr({...newAttr, category: e.target.value as any})} className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-black text-2xl appearance-none bg-white cursor-pointer uppercase tracking-widest italic">
                                            <option>Heritage</option><option>Nature</option><option>Experience</option><option>Museum</option><option>Top Pick</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Geo-Location ID</label>
                                    <input required value={newAttr.location} onChange={e => setNewAttr({...newAttr, location: e.target.value})} placeholder="e.g. Olumo Axis, Abeokuta" className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-bold text-xl uppercase tracking-widest" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Experience Narrative Detail</label>
                                    <textarea required rows={5} value={newAttr.description} onChange={e => setNewAttr({...newAttr, description: e.target.value})} placeholder="Describe the ancestral techniques, safety protocols, and unique spirit..." className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-[3rem] focus:border-emerald-500 outline-none font-medium text-2xl leading-relaxed italic"></textarea>
                                </div>
                            </div>
                            <div className="p-16 border-t border-slate-50 bg-slate-50 flex gap-10">
                                <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-8 rounded-full font-black text-slate-400 hover:bg-slate-200 transition-all uppercase tracking-[0.3em] text-sm">Discard Node</button>
                                <button type="submit" className="flex-[2] py-8 bg-emerald-600 text-white rounded-full font-black text-2xl hover:bg-emerald-700 shadow-3xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-6 group">
                                    <Save className="w-8 h-8 group-hover:scale-125 transition-transform" /> COMMIT BROADCAST
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        )}

      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar-none::-webkit-scrollbar { display: none; }
        .custom-scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes scan {
          0% { top: 0; opacity: 1; }
          50% { top: 100%; opacity: 0.5; }
          100% { top: 0; opacity: 1; }
        }
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .perspective { perspective: 1000px; }
      `}} />
    </div>
  );
};
