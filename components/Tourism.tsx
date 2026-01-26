
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
  Radio
} from 'lucide-react';
import { Attraction } from '../types';

const INITIAL_ATTRACTIONS: Attraction[] = [
  {
    id: '1',
    name: 'Olumo Rock Discovery',
    location: 'Ikija, Abeokuta',
    image: 'https://images.unsplash.com/photo-1599407667664-8b63a2336214?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    category: 'Heritage',
    description: 'The ancient fortress of the Egba people. Features include natural tunnels, historic caves, and the legendary shrines of Lisabi.',
    ticketPrice: 5000,
    hasVR: true
  },
  {
    id: '2',
    name: 'Obasanjo Presidential Library',
    location: 'Oke-Mosan, Abeokuta',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1976&auto=format&fit=crop',
    rating: 4.7,
    category: 'Museum',
    description: 'Africa\'s first presidential library. Explore the life, times, and achievements of Chief Olusegun Obasanjo.',
    ticketPrice: 7500,
    hasVR: false
  },
  {
    id: '3',
    name: 'Bilikisu Sungbo Shrine',
    location: 'Oke-Eiri, Ijebu Ode',
    image: 'https://images.unsplash.com/photo-1518182170546-0766dd6f7271?q=80&w=2070&auto=format&fit=crop',
    rating: 4.5,
    category: 'Heritage',
    description: 'Ancient stone-paved shrine and reputed burial ground of the legendary Bilikisu Sungbo, linked to the Queen of Sheba.',
    ticketPrice: 5000,
    hasVR: true
  },
  {
    id: '4',
    name: 'Omo Forest Safari',
    location: 'Ijebu East',
    image: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    category: 'Nature',
    description: 'One of the last remaining tropical rainforests in the South-West. Spot rare elephants and exotic birds.',
    ticketPrice: 12000,
    hasVR: false
  }
];

const HERITAGE_STORIES = [
  {
    id: 'h1',
    title: 'Legend of Lisabi Agbongbo Akala',
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
    title: 'Adire: The Visual Language',
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

export const Tourism: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'archive' | 'agent'>('explore');
  const [attractions, setAttractions] = useState<Attraction[]>(INITIAL_ATTRACTIONS);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeArchiveStory, setActiveArchiveStory] = useState<typeof HERITAGE_STORIES[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [newAttr, setNewAttr] = useState<Partial<Attraction>>({
    name: '', location: '', image: '', category: 'Experience', ticketPrice: 5000, description: ''
  });

  const handleAddAttraction = (e: React.FormEvent) => {
    e.preventDefault();
    if ((newAttr.ticketPrice || 0) < 5000) {
        alert("Minimum state-standard ticket price is ₦5,000.");
        return;
    }
    const fullAttr: Attraction = {
        ...newAttr,
        id: Date.now().toString(),
        rating: 5.0,
        hasVR: false,
    } as Attraction;
    setAttractions([fullAttr, ...attractions]);
    setIsAdding(false);
    setNewAttr({ name: '', location: '', image: '', category: 'Experience', ticketPrice: 5000, description: '' });
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      
      {/* ATTRACTION BOOKING OVERLAY */}
      {selectedAttraction && (
          <div className="fixed inset-0 z-[200] bg-emerald-950/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500" role="dialog" aria-labelledby="attraction-title">
              <div className="bg-white w-full max-w-7xl h-full md:h-auto md:max-h-[92vh] rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border-[10px] border-white/20">
                  <div className="lg:w-3/5 bg-slate-200 relative group overflow-hidden">
                      <img src={selectedAttraction.image} className="w-full h-full object-cover transition-transform duration-[12s] group-hover:scale-125" alt={`Panoramic view of ${selectedAttraction.name}`} />
                      <button 
                        onClick={() => setSelectedAttraction(null)} 
                        className="absolute top-8 left-8 p-6 bg-white/90 backdrop-blur-md rounded-full shadow-2xl text-slate-900 transition-all hover:rotate-90"
                        aria-label="Close attraction details"
                      >
                        <X className="w-8 h-8" />
                      </button>
                      <div className="absolute bottom-8 left-8">
                          <div className="bg-white/95 backdrop-blur px-8 py-4 rounded-[2rem] text-[10px] font-black text-emerald-800 border border-white shadow-2xl uppercase tracking-[0.4em] flex items-center gap-3">
                              <MapPin className="w-5 h-5" /> {selectedAttraction.location}
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
                      </div>
                      <div className="mt-16">
                          <button 
                            className="w-full py-8 bg-emerald-600 text-white rounded-full font-black text-2xl hover:bg-emerald-700 shadow-2xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-6 group"
                            aria-label={`Generate access ticket for ${selectedAttraction.name} at ₦ ${selectedAttraction.ticketPrice.toLocaleString()}`}
                          >
                              <Ticket className="w-9 h-9 group-hover:rotate-12 transition-transform" /> Generate Access Ticket
                          </button>
                          <p className="text-center text-[9px] text-slate-400 font-black uppercase tracking-[0.4em] mt-8">Secured by ISEYAA ESCROW Node</p>
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
                        aria-label="Go back to heritage archive"
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </button>
                      <div>
                          <h3 id="story-title" className="text-3xl font-black text-white tracking-tighter uppercase italic">{activeArchiveStory.title}</h3>
                          <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.5em] mt-2 flex items-center gap-3"><Radio className="w-3 h-3 animate-pulse" /> Digital Heritage Archive Node</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-6">
                      <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">Download Archive</button>
                      <button 
                        onClick={() => { setActiveArchiveStory(null); setIsPlaying(false); }} 
                        className="p-4 text-slate-500 hover:text-white"
                        aria-label="Close archive player"
                      >
                        <X />
                      </button>
                  </div>
              </header>

              <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                  {/* Media Content */}
                  <div className="lg:w-1/2 h-1/2 lg:h-full relative bg-black group">
                      {activeArchiveStory.type === 'video' ? (
                          <video autoPlay loop muted={!isPlaying} className="w-full h-full object-cover opacity-60">
                              <source src={activeArchiveStory.videoUrl} type="video/mp4" />
                          </video>
                      ) : (
                          <img src={activeArchiveStory.image} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-[3s]" alt={`Visual representation for ${activeArchiveStory.title}`} />
                      )}
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                          <div className="w-60 h-60 rounded-full border-[15px] border-emerald-500/10 flex items-center justify-center relative mb-12 shadow-3xl">
                              <div className={`absolute inset-0 border-[15px] border-emerald-500 border-t-transparent rounded-full ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
                              <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-40 h-40 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-[0_0_80px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-90 transition-all z-20"
                                aria-label={isPlaying ? "Pause archive media" : "Play archive media"}
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

                  {/* Text Content */}
                  <div className="lg:w-1/2 h-1/2 lg:h-full overflow-y-auto p-12 lg:p-24 bg-slate-900 border-l border-white/5 custom-scrollbar">
                      <div className="max-w-2xl mx-auto space-y-16">
                          <div className="space-y-6">
                              <span className="text-emerald-500 font-black tracking-[0.6em] text-[10px] uppercase block">Preserving History</span>
                              <h2 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">{activeArchiveStory.title}</h2>
                              <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                                  <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-500 font-black text-lg shadow-inner" aria-hidden="true">{activeArchiveStory.narrator.charAt(0)}</div>
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
                              <div className="mt-20 p-10 bg-white/5 rounded-[3rem] border border-white/5 space-y-4">
                                  <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-3"><Layers className="w-4 h-4 text-emerald-500" /> Archival Metadata</h4>
                                  <p className="text-sm text-slate-500 leading-relaxed font-medium">Recorded at the Ogun Digital Archive Hub in Jan 2024. This signal is part of the "Ancestral Wisdom" stream for future Egba generations.</p>
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
                <div className="bg-emerald-600 p-4 rounded-[1.5rem] shadow-2xl shadow-emerald-600/20" aria-hidden="true"><Compass className="text-white w-8 h-8" /></div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Tourism <span className="text-emerald-600">&</span> Culture</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.5em] mt-2 flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Gateways Experience Protocol
                    </p>
                </div>
            </div>

            <nav className="flex bg-slate-100 p-2 rounded-full border border-slate-200 shadow-inner overflow-hidden" aria-label="Tourism sections">
                {[
                  { id: 'explore', icon: Compass, label: 'EXPLORE' },
                  { id: 'archive', icon: BookOpen, label: 'ARCHIVE' },
                  { id: 'agent', icon: Award, label: 'AGENT HUB' }
                ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)} 
                      className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black tracking-widest transition-all ${activeTab === tab.id ? 'bg-white shadow-2xl text-emerald-600 scale-105' : 'text-slate-500 hover:text-slate-900'}`}
                      aria-current={activeTab === tab.id ? 'page' : undefined}
                      aria-label={`Switch to ${tab.label} section`}
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
                <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                        <h2 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.9]">Top Tier<br/>Experiences.</h2>
                        <p className="text-xl text-slate-400 mt-6 font-light max-w-xl">Curated state-standard destinations in Ogun. Minimum ticket entry ₦5,000.</p>
                    </div>
                    <div className="bg-emerald-50 px-8 py-4 rounded-full border border-emerald-100 flex items-center gap-6">
                        <div className="flex -space-x-4">
                            {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-md"><img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="Active tourist avatar" /></div>)}
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
                          role="button"
                          aria-label={`View full details for ${attr.name}`}
                        >
                            <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden relative mb-10 shadow-2xl">
                                <img src={attr.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[6s]" alt={`Captivating scenery of ${attr.name}`} />
                                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-5 py-2.5 rounded-full text-[10px] font-black text-emerald-800 border border-white shadow-2xl uppercase tracking-widest">Verified Selection</div>
                                {attr.hasVR && <div className="absolute top-6 right-6 bg-purple-600 text-white p-4 rounded-[1.5rem] shadow-2xl animate-pulse"><Glasses className="w-6 h-6" /></div>}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                                    <span className="text-white font-black text-xl flex items-center gap-3">Quick View <ArrowRight className="w-6 h-6" /></span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-4 px-2">
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-[0.9] group-hover:text-emerald-600 transition-colors uppercase italic">{attr.name}</h3>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] flex items-center gap-2 border-b border-slate-50 pb-6"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> {attr.location}</p>
                                <div className="pt-4 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard Ticket</span>
                                        <span className="text-3xl font-black text-slate-900 tracking-tighter italic">₦{attr.ticketPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="p-5 bg-emerald-50 text-emerald-600 rounded-[2rem] group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xl"><Ticket className="w-7 h-7" /></div>
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
                             <span className="text-emerald-500 font-black uppercase tracking-[0.6em] text-[10px]">ULTIMATE GATEWAY PASS</span>
                             <h2 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic">All 40 Wonder Sites.</h2>
                             <p className="text-2xl text-slate-400 leading-relaxed font-light italic">Access every historic shrine, museum, and safari park in Ogun State with one intelligent digital pass. Verified by ISEYAA Identity.</p>
                             <button 
                                className="px-16 py-8 bg-emerald-600 text-white rounded-full font-black text-3xl hover:bg-emerald-500 transition-all shadow-[0_30px_60px_-10px_rgba(16,185,129,0.5)] active:scale-95 flex items-center gap-8 group"
                                aria-label="Purchase Ultimate Gateway Pass for ₦ 50,000"
                             >
                                Get Pass — ₦ 50k <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                             </button>
                        </div>
                        <div className="hidden lg:grid grid-cols-2 gap-10">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="aspect-square bg-white/[0.03] rounded-[4rem] border border-white/10 p-12 flex flex-col justify-center items-center text-center group hover:bg-white/5 transition-all">
                                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform" aria-hidden="true"><CheckCircle2 className="w-10 h-10" /></div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Verified Protocol Node 0{i}</p>
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
                    <p className="text-2xl text-slate-400 leading-relaxed font-light italic">Traverse the oral histories and ancient practices of the Gateway State through high-fidelity digital artifacts.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-16">
                    {HERITAGE_STORIES.map(story => (
                        <div 
                          key={story.id} 
                          onClick={() => setActiveArchiveStory(story)} 
                          className="group cursor-pointer bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.15)] transition-all flex flex-col h-[650px] hover:-translate-y-4"
                          role="button"
                          aria-label={`Listen and explore ${story.title} narrated by ${story.narrator}`}
                        >
                            <div className="h-3/5 relative overflow-hidden">
                                <img src={story.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[8s]" alt={`Atmospheric image representing ${story.title}`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                <div className="absolute bottom-10 left-10 flex items-center gap-6">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-3xl group-hover:scale-110 transition-all border-[8px] border-white/20" aria-hidden="true"><Play className="w-9 h-9 fill-current ml-2" /></div>
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
                                        <span className="text-xs font-black text-slate-300 font-mono" aria-label={`Duration ${story.duration}`}>{story.duration}</span>
                                    </div>
                                    <p className="text-slate-500 leading-relaxed text-2xl font-light italic">"{story.summary}"</p>
                                </div>
                                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-black" aria-hidden="true">Elder</div>
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
                            aria-label="Add new tourism experience"
                        >
                            <Plus className="w-10 h-10 group-hover:rotate-180 transition-transform" /> NEW EXPERIENCE
                        </button>
                    </div>

                    <div className="divide-y divide-slate-100" role="list">
                        {attractions.map(attr => (
                            <div key={attr.id} className="py-16 flex flex-col md:flex-row justify-between items-center gap-12 group" role="listitem">
                                <div className="flex items-center gap-12">
                                    <div className="w-48 h-48 rounded-[3rem] overflow-hidden border-[10px] border-slate-50 shadow-2xl group-hover:border-emerald-50 transition-colors"><img src={attr.image} className="w-full h-full object-cover" alt={`Preview of ${attr.name}`} /></div>
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
                                    <button 
                                        className="p-6 bg-white border border-slate-100 rounded-[2rem] text-slate-400 hover:text-emerald-600 shadow-3xl hover:-translate-y-2 transition-all"
                                        aria-label={`Expand details for ${attr.name}`}
                                    >
                                        <Maximize2 className="w-8 h-8" />
                                    </button>
                                    <button 
                                        className="p-6 bg-white border border-slate-100 rounded-[2rem] text-slate-400 hover:text-red-500 shadow-3xl hover:-translate-y-2 transition-all"
                                        aria-label={`Remove ${attr.name} experience`}
                                    >
                                        <X className="w-8 h-8" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {isAdding && (
                    <div className="fixed inset-0 z-[400] bg-emerald-950/98 backdrop-blur-[60px] flex items-center justify-center p-4 animate-in fade-in duration-500" role="dialog" aria-labelledby="add-title">
                        <form onSubmit={handleAddAttraction} className="bg-white w-full max-w-4xl rounded-[5rem] shadow-3xl overflow-hidden flex flex-col max-h-[92vh] border-[15px] border-white/20">
                            <div className="p-16 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
                                <div className="space-y-2">
                                    <h3 id="add-title" className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Broadcast New.</h3>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">Verified Ogun Tourism Node</p>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => setIsAdding(false)} 
                                    className="p-6 hover:bg-slate-100 rounded-[2rem] transition-all"
                                    aria-label="Close add attraction modal"
                                >
                                    <X className="w-10 h-10 text-slate-300" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-16 space-y-12 custom-scrollbar">
                                <div className="space-y-4">
                                    <label htmlFor="attr-title" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Experience Official Title</label>
                                    <input id="attr-title" required value={newAttr.name} onChange={e => setNewAttr({...newAttr, name: e.target.value})} placeholder="e.g. Ancient Egba Tunnels Expedition" className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-black text-3xl italic" />
                                </div>
                                <div className="grid grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <label htmlFor="attr-price" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Ticket Fare Node (₦)</label>
                                        <input id="attr-price" required type="number" min={5000} value={newAttr.ticketPrice} onChange={e => setNewAttr({...newAttr, ticketPrice: Number(e.target.value)})} className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-black text-3xl italic" />
                                        <p className="text-[10px] text-amber-600 font-black ml-6 uppercase tracking-widest italic animate-pulse">Minimum ₦5,000 Mandate</p>
                                    </div>
                                    <div className="space-y-4">
                                        <label htmlFor="attr-category" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Category Node</label>
                                        <select id="attr-category" value={newAttr.category} onChange={e => setNewAttr({...newAttr, category: e.target.value as any})} className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-black text-2xl appearance-none bg-white cursor-pointer uppercase tracking-widest italic">
                                            <option>Heritage</option>
                                            <option>Nature</option>
                                            <option>Experience</option>
                                            <option>Museum</option>
                                            <option>Top Pick</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label htmlFor="attr-location" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Geo-Location ID</label>
                                    <input id="attr-location" required value={newAttr.location} onChange={e => setNewAttr({...newAttr, location: e.target.value})} placeholder="e.g. Olumo Axis, Abeokuta" className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-bold text-xl uppercase tracking-widest" />
                                </div>
                                <div className="space-y-4">
                                    <label htmlFor="attr-image" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Hero Media visual Proxy (URL)</label>
                                    <input id="attr-image" required value={newAttr.image} onChange={e => setNewAttr({...newAttr, image: e.target.value})} placeholder="Paste cinematic image URL here..." className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-bold text-lg" />
                                </div>
                                <div className="space-y-4">
                                    <label htmlFor="attr-desc" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Experience Narrative Detail</label>
                                    <textarea id="attr-desc" required rows={5} value={newAttr.description} onChange={e => setNewAttr({...newAttr, description: e.target.value})} placeholder="Describe the ancestral techniques, safety protocols, and unique spirit..." className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100 rounded-[3rem] focus:border-emerald-500 outline-none font-medium text-2xl leading-relaxed italic"></textarea>
                                </div>
                            </div>
                            <div className="p-16 border-t border-slate-50 bg-slate-50 flex gap-10">
                                <button 
                                    type="button" 
                                    onClick={() => setIsAdding(false)} 
                                    className="flex-1 py-8 rounded-full font-black text-slate-400 hover:bg-slate-200 transition-all uppercase tracking-[0.3em] text-sm"
                                    aria-label="Discard new experience entry"
                                >
                                    Discard Node
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-[2] py-8 bg-emerald-600 text-white rounded-full font-black text-2xl hover:bg-emerald-700 shadow-3xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-6 group"
                                    aria-label="Submit and broadcast new experience to the state network"
                                >
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
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};
