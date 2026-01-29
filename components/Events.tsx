import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Music, Ticket, Users, Search, Heart, 
  Share2, Clock, QrCode, CheckCircle2, Mic2, Trophy, Palette,
  ShieldCheck, Plus, TrendingUp, BarChart3, 
  Eye, X, Loader2, Zap, Radio,
  ChevronLeft, ChevronRight, Cpu, Target, Megaphone, Star,
  Activity, ArrowRight, ImageOff
} from 'lucide-react';

interface TicketTier {
  id: string;
  name: string;
  price: number;
  available: number;
  description: string;
}

interface Event {
  id: string;
  title: string;
  category: 'Festival' | 'Concert' | 'Sports' | 'Conference' | 'Exhibition';
  date: string;
  time: string;
  location: string;
  image: string;
  priceStart: number;
  organizer: string;
  verified: boolean;
  virtualAvailable: boolean;
  ticketTiers: TicketTier[];
  isPriority: boolean;
  isAIRecommended: boolean;
  neuralScore: number;
}

const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Ogun State Cultural Festival 2024',
    category: 'Festival',
    date: 'Dec 12, 2024',
    time: '10:00 AM',
    location: 'MKO Abiola Stadium, Abeokuta',
    image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2070&auto=format&fit=crop',
    priceStart: 2000,
    organizer: 'Ministry of Culture',
    verified: true,
    virtualAvailable: true,
    isPriority: true,
    isAIRecommended: true,
    neuralScore: 98,
    ticketTiers: [
      { id: 't1', name: 'Regular', price: 2000, available: 5000, description: 'General admission.' },
      { id: 't2', name: 'VIP', price: 10000, available: 500, description: 'Front row seats.' }
    ]
  },
  {
    id: '2',
    title: 'Gateway United vs. Remo Stars',
    category: 'Sports',
    date: 'Oct 24, 2024',
    time: '04:00 PM',
    location: 'Gateway International Stadium',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093&auto=format&fit=crop',
    priceStart: 500,
    organizer: 'Ogun FA',
    verified: true,
    virtualAvailable: false,
    isPriority: true,
    isAIRecommended: false,
    neuralScore: 85,
    ticketTiers: [
      { id: 's1', name: 'Popular Side', price: 500, available: 10000, description: 'Open seating.' }
    ]
  },
  {
    id: '3',
    title: 'Adire Tech Fusion Expo',
    category: 'Exhibition',
    date: 'Nov 15, 2024',
    time: '09:00 AM',
    location: 'June 12 Cultural Centre',
    image: 'https://images.unsplash.com/photo-1550974720-33234d7d130f?q=80&w=2070&auto=format&fit=crop',
    priceStart: 0,
    organizer: 'Ogun Tech Hub',
    verified: true,
    virtualAvailable: true,
    isPriority: false,
    isAIRecommended: true,
    neuralScore: 94,
    ticketTiers: [
      { id: 'e1', name: 'Free Entry', price: 0, available: 1000, description: 'Register for badge.' }
    ]
  }
];

const OptimizedImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin opacity-20" />
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-200 text-slate-400 p-4 text-center">
          <ImageOff className="w-10 h-10 mb-2 opacity-50" />
          <span className="text-[9px] font-black uppercase tracking-widest">Media Node Offline</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
        />
      )}
    </div>
  );
};

export const Events: React.FC<{ user?: any }> = ({ user }) => {
  const [userMode, setUserMode] = useState<'attendee' | 'organizer'>('attendee');
  const [activeTab, setActiveTab] = useState('All');
  const [eventsList, setEventsList] = useState<Event[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewState, setViewState] = useState<'list' | 'detail' | 'ticket'>('list');
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSelection, setTicketSelection] = useState<{[key: string]: number}>({});
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const priorityEvents = eventsList.filter(e => e.isPriority || e.isAIRecommended).sort((a, b) => b.neuralScore - a.neuralScore);

  const isSuperAdmin = user?.activeRole === 'super-admin';

  useEffect(() => {
    let interval: any;
    if (isAutoPlaying && priorityEvents.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % priorityEvents.length);
      }, 5000); 
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, priorityEvents.length]);

  const togglePriority = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSuperAdmin) return;
    setEventsList(prev => prev.map(evt => evt.id === id ? { ...evt, isPriority: !evt.isPriority } : evt));
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setViewState('detail');
    setTicketSelection({});
  };

  const handlePurchase = () => {
    if (getTotalPrice() === 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setViewState('ticket');
    }, 1500);
  };

  const updateTicketCount = (tierId: string, delta: number) => {
    setTicketSelection(prev => {
      const current = prev[tierId] || 0;
      const newValue = Math.max(0, current + delta);
      return { ...prev, [tierId]: newValue };
    });
  };

  const getTotalPrice = () => {
    if (!selectedEvent) return 0;
    return selectedEvent.ticketTiers.reduce((total, tier) => {
      return total + (tier.price * (ticketSelection[tier.id] || 0));
    }, 0);
  };

  const categories = [
    { name: 'All', icon: null },
    { name: 'Festival', icon: Music },
    { name: 'Sports', icon: Trophy },
    { name: 'Conference', icon: Users },
    { name: 'Exhibition', icon: Palette },
    { name: 'Concert', icon: Mic2 },
  ];

  if (viewState === 'ticket' && selectedEvent) {
    return (
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
         <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-emerald-500/10 animate-in zoom-in-95">
            <div className="bg-slate-900 p-12 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent"></div>
                <div className="relative z-10">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter uppercase italic">Signal Confirmed</h2>
                    <p className="text-slate-400 mt-2 font-bold uppercase tracking-widest text-[10px]">Encryption: ISEYAA-SEC-V4</p>
                </div>
            </div>
            <div className="p-12 space-y-10">
                <div className="flex flex-col md:flex-row gap-10 items-center border-b border-dashed border-slate-200 pb-10">
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <h3 className="text-3xl font-black text-slate-900 leading-none uppercase italic">{selectedEvent.title}</h3>
                        <div className="space-y-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                            <p className="flex items-center justify-center md:justify-start gap-2"><Calendar className="w-4 h-4 text-emerald-500" /> {selectedEvent.date} • {selectedEvent.time}</p>
                            <p className="flex items-center justify-center md:justify-start gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> {selectedEvent.location}</p>
                        </div>
                    </div>
                    <div className="w-40 h-40 bg-white border-4 border-slate-900 rounded-[2rem] p-4 shrink-0 shadow-2xl">
                        <QrCode className="w-full h-full text-slate-900" />
                    </div>
                </div>
                <div className="space-y-6">
                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Ledger Entry</h4>
                    {selectedEvent.ticketTiers.map(tier => {
                        const count = ticketSelection[tier.id] || 0;
                        if (count === 0) return null;
                        return (
                            <div key={tier.id} className="flex justify-between items-center text-sm font-bold border-l-2 border-emerald-500 pl-4">
                                <span className="text-slate-500 uppercase">{count}x {tier.name} Node</span>
                                <span className="text-slate-900 font-mono tracking-tighter">₦ {(tier.price * count).toLocaleString()}</span>
                            </div>
                        );
                    })}
                    <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                        <span className="font-black text-slate-950 uppercase tracking-widest text-sm">Authorized Total</span>
                        <span className="font-black text-4xl text-emerald-600 tracking-tighter">₦ {getTotalPrice().toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex gap-4 pt-4">
                    <button onClick={() => setViewState('list')} className="flex-1 py-6 border-2 border-slate-100 rounded-full font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50">Discard</button>
                    <button className="flex-[2] py-6 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-black flex items-center justify-center gap-3 shadow-2xl active:scale-95">
                        <Share2 className="w-4 h-4" /> Share Protocol
                    </button>
                </div>
            </div>
         </div>
      </div>
    );
  }

  if (viewState === 'detail' && selectedEvent) {
    return (
      <div className="flex flex-col h-full bg-[#FDFBF7] overflow-y-auto animate-in fade-in duration-700">
        <div className="relative h-[50vh] md:h-[65vh] shrink-0 overflow-hidden">
            <OptimizedImage src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/20 to-transparent"></div>
            
            <div className="absolute top-10 left-10 flex gap-4">
                <button 
                    onClick={() => setViewState('list')}
                    className="bg-white/90 backdrop-blur-xl p-5 rounded-full text-slate-900 hover:bg-white shadow-2xl transition-all hover:scale-110 active:scale-90"
                >
                    <ArrowRight className="w-7 h-7 rotate-180" />
                </button>
            </div>

            <div className="absolute bottom-10 left-10 right-10">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                         <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full shadow-2xl">{selectedEvent.category}</span>
                         {selectedEvent.isAIRecommended && (
                             <span className="bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full flex items-center gap-2 shadow-2xl animate-pulse">
                                 <Cpu className="w-4 h-4" /> Neural High Match
                             </span>
                         )}
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter uppercase italic">{selectedEvent.title}</h1>
                    <div className="flex items-center gap-6 text-slate-500 font-bold uppercase text-xs tracking-widest border-l-4 border-emerald-500 pl-6">
                        <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600" /> {selectedEvent.location}</p>
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                        <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-600" /> {selectedEvent.time}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex-1 max-w-7xl mx-auto w-full px-10 py-20 grid lg:grid-cols-3 gap-24">
             <div className="lg:col-span-2 space-y-16">
                 <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-slate-50">
                     <h3 className="font-black text-slate-950 uppercase tracking-[0.3em] text-[10px] mb-10 flex items-center gap-3">
                        <Ticket className="w-6 h-6 text-emerald-600" /> Access Tier Selection
                     </h3>
                     <div className="space-y-6">
                         {selectedEvent.ticketTiers.map(tier => (
                             <div key={tier.id} className="flex items-center justify-between p-8 bg-slate-50/50 rounded-[2.5rem] border-2 border-transparent hover:border-emerald-500 hover:bg-white transition-all group">
                                 <div>
                                     <div className="flex items-center gap-4">
                                        <span className="font-black text-2xl text-slate-900 uppercase italic tracking-tighter">{tier.name}</span>
                                        <span className="text-xl font-mono font-black text-emerald-600">₦ {tier.price.toLocaleString()}</span>
                                     </div>
                                     <p className="text-sm font-medium text-slate-400 mt-2 italic">{tier.description}</p>
                                 </div>
                                 <div className="flex items-center gap-6 bg-white rounded-full p-2 border border-slate-100 shadow-xl">
                                     <button 
                                        onClick={() => updateTicketCount(tier.id, -1)}
                                        className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-red-500 transition-all active:scale-90"
                                        disabled={!ticketSelection[tier.id]}
                                     >
                                         <X className="w-5 h-5" />
                                     </button>
                                     <span className="font-black text-2xl text-slate-900 w-8 text-center">{ticketSelection[tier.id] || 0}</span>
                                     <button 
                                        onClick={() => updateTicketCount(tier.id, 1)}
                                        className="w-12 h-12 flex items-center justify-center bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-90"
                                     >
                                         <Plus className="w-6 h-6" />
                                     </button>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
                 
                 <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-3xl relative overflow-hidden border-[10px] border-white">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[120px] opacity-10" />
                      <h3 className="font-black text-xs uppercase tracking-[0.5em] mb-10 opacity-50">Venue Intelligent Map</h3>
                      <div className="aspect-video bg-white/5 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
                          <OptimizedImage src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1976&auto=format&fit=crop" alt="Venue Map" className="absolute inset-0 w-full h-full opacity-20 blur-sm scale-110 group-hover:scale-100 transition-transform duration-[10s]" />
                          <MapPin className="w-16 h-16 text-emerald-500 animate-bounce relative z-10" />
                          <p className="text-xl font-black tracking-widest relative z-10 uppercase italic">Interactive 3D Grid Syncing...</p>
                          <div className="absolute bottom-6 px-8 py-3 bg-white/10 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 z-10">GPS Node Active</div>
                      </div>
                 </div>
             </div>
             
             <div className="lg:col-span-1">
                 <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-slate-200/40 border-4 border-slate-50 sticky top-10 space-y-12">
                     <h3 className="font-black text-slate-900 uppercase tracking-[0.3em] text-[10px]">Order Protocol</h3>
                     <div className="space-y-6">
                         <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                             <span className="text-slate-400">Node Sync</span>
                             <span className="text-slate-900">₦ {getTotalPrice().toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                             <span className="text-slate-400">Ledger Tax (7.5%)</span>
                             <span className="text-slate-900">₦ {(getTotalPrice() * 0.075).toLocaleString()}</span>
                         </div>
                         <div className="border-t border-slate-100 pt-8 flex justify-between items-center">
                             <span className="font-black text-slate-950 uppercase tracking-widest text-xs">Total Authorized</span>
                             <span className="font-black text-4xl text-emerald-600 tracking-tighter italic">₦ {(getTotalPrice() * 1.075).toLocaleString()}</span>
                         </div>
                     </div>
                     <button 
                        onClick={handlePurchase}
                        disabled={getTotalPrice() === 0 || isSubmitting}
                        className="w-full bg-emerald-600 text-white py-8 rounded-full font-black text-xl hover:bg-emerald-700 transition-all shadow-[0_30px_60px_-10px_rgba(16,185,129,0.3)] disabled:grayscale disabled:opacity-30 active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-6"
                     >
                         {isSubmitting ? (
                             <Loader2 className="w-8 h-8 animate-spin" />
                         ) : (
                             <>COMMIT TRANSACTION <ArrowRight className="w-6 h-6" /></>
                         )}
                     </button>
                     <p className="text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Encrypted via ISEYAA-FIN-CORE</p>
                 </div>
             </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      
      <section className="relative h-[65vh] w-full bg-slate-900 overflow-hidden">
          {priorityEvents.map((evt, idx) => (
              <div 
                key={evt.id} 
                className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
              >
                  <OptimizedImage src={evt.image} alt={evt.title} className="w-full h-full opacity-50 grayscale hover:grayscale-0 transition-all duration-[10s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 max-w-7xl mx-auto">
                      <div className="max-w-4xl space-y-10">
                          <div className="flex items-center gap-4">
                              <div className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-3xl border border-emerald-400/30">
                                  <Radio className="w-4 h-4 animate-pulse" /> PRIORITY SIGNAL
                              </div>
                              {evt.isAIRecommended && (
                                  <div className="inline-flex items-center gap-3 bg-purple-600/90 backdrop-blur-xl text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-3xl">
                                      <Cpu className="w-4 h-4 animate-spin-slow" /> Neural Match {evt.neuralScore}%
                                  </div>
                              )}
                          </div>
                          <h2 className="text-7xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase italic drop-shadow-2xl animate-in slide-in-from-left-20 duration-1000">
                              {evt.title}
                          </h2>
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 pt-6 animate-in slide-in-from-bottom-10 delay-300">
                               <div className="flex items-center gap-4 text-emerald-400 font-black uppercase tracking-[0.3em] text-xs">
                                   <MapPin className="w-6 h-6" /> {evt.location}
                               </div>
                               <button 
                                 onClick={() => handleEventClick(evt)}
                                 className="px-16 py-8 bg-white text-slate-900 rounded-full font-black text-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] flex items-center gap-8 group active:scale-95"
                               >
                                   GENERATE ACCESS <Ticket className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                               </button>
                          </div>
                      </div>
                  </div>
              </div>
          ))}

          <div className="absolute bottom-12 right-20 flex items-center gap-8 z-20">
              <div className="flex gap-4">
                  {priorityEvents.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => { setCurrentSlide(i); setIsAutoPlaying(false); }}
                        className={`h-2.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-24 bg-emerald-500 shadow-[0_0_15px_#10b981]' : 'w-4 bg-white/20 hover:bg-white/40'}`} 
                      />
                  ))}
              </div>
              <div className="h-12 w-px bg-white/10 mx-4" />
              <div className="flex gap-4">
                  <button onClick={() => setCurrentSlide(prev => (prev - 1 + priorityEvents.length) % priorityEvents.length)} className="p-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all"><ChevronLeft /></button>
                  <button onClick={() => setCurrentSlide(prev => (prev + 1) % priorityEvents.length)} className="p-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all"><ChevronRight /></button>
              </div>
          </div>

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      </section>

      <div className="bg-emerald-600 py-4 overflow-hidden whitespace-nowrap border-b border-white/10 relative z-10 shadow-2xl">
        <div className="flex animate-[marquee_120s_linear_infinite] gap-20 text-[11px] font-black uppercase tracking-[0.4em] text-white/90">
            {eventsList.map(n => (
                <span key={n.id} className="flex items-center gap-4">
                    <Zap className="w-4 h-4 fill-white" /> {n.title} <span className="bg-black/20 px-3 py-1 rounded-full text-[9px]">TICKETS LIVE</span>
                </span>
            ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-10 py-24 space-y-32">
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
              <div className="space-y-6">
                  <span className="text-emerald-600 font-black uppercase tracking-[0.6em] text-[10px] flex items-center gap-4">
                      <div className="w-12 h-px bg-emerald-200" /> EXPLORE CATEGORIES
                  </span>
                  <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.85]">Gateways<br/>Calendar.</h2>
              </div>
              <div className="flex flex-col items-end gap-6">
                  <div className="flex bg-slate-100 p-2 rounded-full border-2 border-slate-50 shadow-inner">
                      <button onClick={() => setUserMode('attendee')} className={`px-12 py-4 rounded-full text-[10px] font-black tracking-widest transition-all ${userMode === 'attendee' ? 'bg-white shadow-2xl text-emerald-600 scale-105' : 'text-slate-400 hover:text-slate-900'}`}>ATTENDEE</button>
                      <button onClick={() => setUserMode('organizer')} className={`px-12 py-4 rounded-full text-[10px] font-black tracking-widest transition-all ${userMode === 'organizer' ? 'bg-white shadow-2xl text-emerald-600 scale-105' : 'text-slate-400 hover:text-slate-900'}`}>ORGANIZER</button>
                  </div>
              </div>
          </div>

          {userMode === 'attendee' ? (
              <div className="space-y-20">
                  <div className="flex overflow-x-auto gap-6 scrollbar-hide py-2">
                      {categories.map((cat) => (
                          <button 
                            key={cat.name} 
                            onClick={() => setActiveTab(cat.name)} 
                            className={`flex items-center gap-4 px-10 py-4 rounded-full whitespace-nowrap text-[10px] font-black tracking-widest transition-all border-2 ${activeTab === cat.name ? 'bg-slate-950 text-white border-slate-950 shadow-3xl scale-110' : 'bg-white text-slate-400 border-slate-50 hover:border-emerald-200'}`}
                          >
                              {cat.icon && <cat.icon className="w-4 h-4" />} {cat.name.toUpperCase()}
                          </button>
                      ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
                      {eventsList.filter(e => activeTab === 'All' || e.category === activeTab).map((event, idx) => (
                          <div key={event.id} onClick={() => handleEventClick(event)} className="group cursor-pointer bg-white rounded-[4rem] border-2 border-slate-50 p-8 shadow-sm hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out flex flex-col h-full hover:-translate-y-3 hover:scale-[1.02] relative animate-in slide-in-from-bottom-10" style={{ animationDelay: `${idx * 100}ms` }}>
                              
                              {isSuperAdmin && (
                                  <button 
                                    onClick={(e) => togglePriority(event.id, e)}
                                    className={`absolute top-12 right-12 z-20 p-4 rounded-2xl shadow-2xl transition-all border-4 ${event.isPriority ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-white text-slate-300 border-slate-100 hover:text-emerald-500'}`}
                                  >
                                      <Star className={`w-6 h-6 ${event.isPriority ? 'fill-current' : ''}`} />
                                  </button>
                              )}

                              <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden relative mb-10 shadow-2xl">
                                  <OptimizedImage src={event.image} alt={event.title} className="w-full h-full group-hover:scale-110 transition-transform duration-[8s]" />
                                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                                      <span className="bg-white/95 backdrop-blur px-5 py-2.5 rounded-full text-[9px] font-black text-emerald-800 border border-white shadow-2xl uppercase tracking-widest flex items-center gap-2">
                                          <Target className="w-3.5 h-3.5" /> Official Node
                                      </span>
                                      {event.isAIRecommended && (
                                          <span className="bg-purple-600 text-white px-5 py-2.5 rounded-full text-[9px] font-black shadow-2xl uppercase tracking-widest flex items-center gap-2">
                                              <Cpu className="w-3.5 h-3.5" /> Neural Pick
                                          </span>
                                      )}
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                                      <span className="text-white font-black text-2xl flex items-center gap-4">Commence <ArrowRight className="w-8 h-8" /></span>
                                  </div>
                              </div>
                              <div className="flex-1 space-y-6 px-2">
                                  <div className="flex justify-between items-start">
                                      <h3 className="text-4xl font-black text-slate-950 tracking-tighter leading-[0.9] group-hover:text-emerald-600 transition-colors uppercase italic">{event.title}</h3>
                                      <div className="text-right">
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fare From</p>
                                          <p className="text-2xl font-black text-emerald-600 italic font-mono tracking-tighter">₦{event.priceStart.toLocaleString()}</p>
                                      </div>
                                  </div>
                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] flex items-center gap-3 border-t border-slate-50 pt-8 italic"><MapPin className="w-4 h-4 text-emerald-500" /> {event.location}</p>
                                  <div className="flex items-center gap-6">
                                      <div className="flex -space-x-3">
                                          {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 overflow-hidden"><img src={`https://i.pravatar.cc/100?img=${i+30}`} /></div>)}
                                      </div>
                                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">+1.2k attending</p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          ) : (
              <div className="space-y-12 animate-in fade-in duration-700">
                  <div className="bg-white p-12 rounded-[4rem] border-[10px] border-emerald-50 shadow-3xl flex flex-col md:flex-row items-center justify-between gap-12">
                      <div className="flex items-start gap-10">
                          <div className="p-8 bg-emerald-100 rounded-[2.5rem] text-emerald-600 shadow-inner group-hover:scale-110 transition-transform"><Megaphone className="w-12 h-12" /></div>
                          <div>
                              <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Broadcast Node.</h3>
                              <p className="text-slate-400 text-xl font-light italic mt-3 max-w-xl">Register your festival, summit, or game with the central ISEYAA event ledger for automated SEO scaling.</p>
                          </div>
                      </div>
                      <button onClick={() => setIsCreating(true)} className="bg-slate-950 text-white px-16 py-8 rounded-full font-black text-2xl hover:bg-emerald-600 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.4)] transition-all flex items-center gap-6 active:scale-95 group">
                          <Plus className="w-10 h-10 group-hover:rotate-180 transition-transform" /> NEW SIGNAL
                      </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      {[
                        { t: 'Live Revenue', v: '₦ 8.4M', i: BarChart3, c: 'text-blue-600', bg: 'bg-blue-50' },
                        { t: 'Total Admissions', v: '14,282', i: Users, c: 'text-amber-600', bg: 'bg-amber-50' },
                        { t: 'Engagement Score', v: '94%', i: Activity, c: 'text-purple-600', bg: 'bg-purple-50' }
                      ].map(s => (
                          <div key={s.t} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 group hover:border-emerald-200 transition-all">
                              <div className={`p-5 ${s.bg} rounded-[1.5rem] w-fit mb-10 group-hover:scale-110 transition-transform`}><s.i className={`w-10 h-10 ${s.c}`} /></div>
                              <h3 className="text-5xl font-black text-slate-950 tracking-tighter italic">{s.v}</h3>
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-3">{s.t} (November)</p>
                          </div>
                      ))}
                  </div>
              </div>
          )}
      </main>

      {isCreating && (
          <div className="fixed inset-0 z-[400] bg-slate-950/98 backdrop-blur-[40px] flex items-center justify-center p-6 animate-in fade-in duration-500">
              <form onSubmit={(e) => { e.preventDefault(); setIsCreating(false); }} className="bg-white w-full max-w-5xl rounded-[5rem] shadow-3xl overflow-hidden border-[15px] border-white/20 flex flex-col max-h-[92vh]">
                   <div className="p-16 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
                       <div className="space-y-2">
                           <h3 className="text-5xl font-black text-slate-950 tracking-tighter uppercase italic leading-none">Neural Dispatch.</h3>
                           <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.5em]">Central Event Configuration Protocol</p>
                       </div>
                       <button type="button" onClick={() => setIsCreating(false)} className="p-6 hover:bg-slate-100 rounded-full transition-all"><X className="w-10 h-10 text-slate-300" /></button>
                   </div>
                   <div className="flex-1 overflow-y-auto p-16 space-y-12 custom-scrollbar">
                       <div className="space-y-4">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-10">Event Protocol Name</label>
                           <input required placeholder="e.g. Ogun Digital Arts Summit 2026" className="w-full px-12 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-black text-3xl italic" />
                       </div>
                       <div className="grid grid-cols-2 gap-10">
                           <div className="space-y-4">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-10">Category Hub</label>
                               <select className="w-full px-12 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-black text-2xl appearance-none bg-white italic uppercase tracking-widest">
                                   <option>Festival</option><option>Sports</option><option>Concert</option><option>Conference</option>
                               </select>
                           </div>
                           <div className="space-y-4">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-10">Verification Node (Geo)</label>
                               <input required placeholder="MKO Abiola Stadium" className="w-full px-12 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-bold text-xl uppercase tracking-widest" />
                           </div>
                       </div>
                       <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-10">Media Proxy URL</label>
                            <input required placeholder="Paste cinemetic banner URL..." className="w-full px-12 py-8 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-bold text-lg" />
                       </div>
                   </div>
                   <div className="p-16 border-t border-slate-50 bg-slate-50 flex gap-10">
                       <button type="button" onClick={() => setIsCreating(false)} className="flex-1 py-8 rounded-full font-black text-slate-400 hover:bg-slate-200 transition-all uppercase tracking-[0.4em] text-sm italic">Discard Node</button>
                       <button type="submit" className="flex-[2] py-8 bg-emerald-600 text-white rounded-full font-black text-2xl hover:bg-emerald-700 shadow-3xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-6 group">
                           BROADCAST TO WORLD <Zap className="w-8 h-8 group-hover:scale-125 transition-transform" />
                       </button>
                   </div>
              </form>
          </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
      `}} />
    </div>
  );
};