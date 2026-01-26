
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Globe, 
  Zap, 
  Play, 
  Rocket, 
  Calendar,
  Ticket,
  Sparkles,
  ShoppingBag,
  Timer,
  Star,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Bed,
  MapPin,
  Home,
  Palmtree
} from 'lucide-react';
import { Logo } from './Logo';

interface LandingPageProps {
  onEnterApp: () => void;
}

const SLIDES = [
  {
    id: 1,
    title: "The Heart of Egba Culture",
    subtitle: "Experience Olumo Rock through the ISEYAA AI lens. Guided heritage tours available daily.",
    cta: "Explore Heritage",
    media: "https://images.unsplash.com/photo-1599407667664-8b63a2336214?q=80&w=2070&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-40011-large.mp4",
    type: 'hero'
  },
  {
    id: 2,
    title: "Artisan Flash Sale: 40% OFF",
    subtitle: "Limited Edition Hand-Dyed Adire. State-verified quality from verified merchants.",
    cta: "Buy Authentic",
    media: "https://images.unsplash.com/photo-1550974720-33234d7d130f?q=80&w=2070&auto=format&fit=crop",
    type: 'advert',
    discount: '40% OFF'
  },
  {
    id: 3,
    title: "Ogun Tech & Arts Summit",
    subtitle: "January 2026. Join the global digital economy discourse in Abeokuta.",
    cta: "Book Tickets",
    media: "https://images.unsplash.com/photo-1540575861501-7ad05823c23d?q=80&w=2070&auto=format&fit=crop",
    type: 'event'
  }
];

const LIVE_PULSE_EVENTS = [
  { id: 1, title: 'Adire Carnival 2024', loc: 'Itoku', date: 'Dec 12', img: 'https://images.unsplash.com/photo-1514525253361-bee243870eb2?w=400&fit=crop' },
  { id: 2, title: 'Gateway Music Fest', loc: 'Sagamu', date: 'Dec 15', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&fit=crop' },
  { id: 3, title: 'Ogun Innovate Expo', loc: 'Ota', date: 'Jan 05', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&fit=crop' },
  { id: 4, title: 'Lisabi Heritage Day', loc: 'Ikija', date: 'Jan 12', img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=400&fit=crop' },
  { id: 5, title: 'Ijebu Ode Durbar', loc: 'Ijebu', date: 'Feb 02', img: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=400&fit=crop' },
];

const FEATURED_STAYS = [
  {
    id: 's1',
    title: 'The Rock Heritage Suites',
    location: 'Abeokuta, Ogun',
    price: '35,000',
    type: 'Luxury Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    tag: 'Top Pick'
  },
  {
    id: 's2',
    title: 'Green Springs Golf Resort',
    location: 'Sagamu, Ogun',
    price: '65,000',
    type: 'Resort',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop',
    rating: 4.8,
    tag: 'Elite'
  },
  {
    id: 's3',
    title: 'Modern Studio Ota',
    location: 'Ota, Ogun',
    price: '18,000',
    type: 'Short-let',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7,
    tag: 'Convenient'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream relative overflow-hidden">
      {/* Animated Vector Background - "Ogun Flow" */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute -top-20 -left-20 w-[600px] h-[600px] text-emerald-100/30 animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="1 4" />
           <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 6" />
        </svg>
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-2xl border-b border-white/20 px-8 py-5 flex items-center justify-between">
        <Logo className="h-10" variant="color" />
        <div className="hidden lg:flex items-center gap-12">
            {['Attractions', 'Culture', 'Marketplace', 'Gov'].map(item => (
                <button key={item} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-emerald-600 transition-all">{item}</button>
            ))}
        </div>
        <button onClick={onEnterApp} className="bg-slate-900 text-white px-10 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl hover:scale-105 active:scale-95">
          Access Gateway
        </button>
      </nav>

      {/* Cinematic Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
         {SLIDES.map((slide, index) => (
             <div key={slide.id} className={`absolute inset-0 transition-all duration-[1.5s] ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
                {slide.video ? (
                    <video autoPlay muted loop className="w-full h-full object-cover opacity-70">
                        <source src={slide.video} type="video/mp4" />
                    </video>
                ) : (
                    <img src={slide.media} className="w-full h-full object-cover opacity-70" alt="" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/20 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-24 max-w-7xl mx-auto">
                    <div className="max-w-4xl space-y-8">
                        {slide.type === 'advert' && (
                            <div className="inline-flex items-center gap-3 bg-brand-yellow px-6 py-2.5 rounded-full text-emerald-950 font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl animate-bounce">
                                <Zap className="w-4 h-4 fill-current" /> {slide.discount} ISEYAA FLASH ADVERT
                            </div>
                        )}
                        <h1 className="text-7xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter drop-shadow-2xl italic uppercase">
                            {slide.title.split(' ').map((word, i) => i === 1 ? <span key={i} className="text-emerald-500 block">{word} </span> : word + ' ')}
                        </h1>
                        <p className="text-xl md:text-3xl text-emerald-100/70 font-light max-w-2xl leading-relaxed">
                            {slide.subtitle}
                        </p>
                        <div className="pt-10 flex flex-col sm:flex-row gap-6">
                            <button onClick={onEnterApp} className="px-14 py-7 bg-white text-emerald-950 rounded-full font-black text-xl hover:bg-emerald-500 hover:text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-5 group">
                                {slide.cta} <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
                            </button>
                            <button className="px-14 py-7 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white rounded-full font-black text-xl hover:bg-white/20 transition-all">
                                Discover More
                            </button>
                        </div>
                    </div>
                </div>
             </div>
         ))}
         
         <div className="absolute bottom-16 left-8 md:left-24 flex gap-6 z-20">
             {SLIDES.map((_, i) => (
                 <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-24 bg-brand-yellow shadow-[0_0_15px_#FFE94C]' : 'w-6 bg-white/20 hover:bg-white/40'}`} />
             ))}
         </div>
      </section>

      {/* LIVE PULSE - HORIZONTAL AUTO-SLIDE marquee (Sliding Left) */}
      <section className="bg-emerald-950 py-16 relative overflow-hidden border-t border-white/10">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <svg width="100%" height="100%">
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
          </div>

          <div className="max-w-7xl mx-auto px-8 mb-12 flex justify-between items-end relative z-10">
              <div className="space-y-2">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em] block">Real-time Dashboard Signals</span>
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none italic"><span className="text-emerald-500">Live</span> Pulse</h2>
              </div>
              <div className="flex gap-4">
                   <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-3">
                       <Timer className="w-5 h-5 text-brand-yellow animate-pulse" />
                       <span className="text-xs font-black text-white uppercase tracking-widest">Next Signal: 02m 45s</span>
                   </div>
              </div>
          </div>
          
          <div className="relative w-full overflow-hidden flex">
              <div className="flex gap-8 animate-[marquee_40s_linear_infinite] px-8">
                  {[...LIVE_PULSE_EVENTS, ...LIVE_PULSE_EVENTS].map((evt, idx) => (
                      <div key={`${evt.id}-${idx}`} className="shrink-0 w-[380px] bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] border border-white/10 p-8 group cursor-pointer hover:bg-white/10 transition-all hover:-translate-y-2">
                          <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
                              <img src={evt.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]" alt="" />
                              <div className="absolute top-6 left-6 bg-emerald-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Confirmed</div>
                              <div className="absolute bottom-6 right-6 flex -space-x-4">
                                  {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-emerald-950 bg-slate-200 overflow-hidden"><img src={`https://i.pravatar.cc/100?img=${i+10}`} /></div>)}
                                  <div className="w-10 h-10 rounded-full border-2 border-emerald-950 bg-emerald-500 flex items-center justify-center text-[10px] font-black">+1k</div>
                              </div>
                          </div>
                          <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                  <h3 className="text-3xl font-black text-white leading-[0.9] tracking-tighter uppercase">{evt.title}</h3>
                                  <p className="text-emerald-400/60 font-black uppercase tracking-[0.2em] text-[10px]">{evt.loc} • Gateway State</p>
                              </div>
                              <div className="text-right">
                                  <p className="text-2xl font-mono font-black text-white">{evt.date}</p>
                                  <p className="text-[10px] font-bold text-slate-500 uppercase">2026</p>
                              </div>
                          </div>
                          <button onClick={onEnterApp} className="w-full mt-10 py-5 bg-white text-emerald-950 rounded-2xl font-black text-xs uppercase tracking-widest group-hover:bg-emerald-500 group-hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl">
                              Reserve Spot <Ticket className="w-5 h-5" />
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* FEATURED STAYS SECTION - SLIDING RIGHT */}
      <section className="py-32 bg-[#FDFBF7] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 mb-20">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                  <div className="space-y-6">
                      <span className="text-emerald-600 font-black uppercase tracking-[0.6em] text-[10px] flex items-center gap-4">
                          <div className="w-12 h-px bg-emerald-200" /> HERITAGE HOSPITALITY
                      </span>
                      <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.85]">Luxury<br/>Stay.</h2>
                  </div>
                  <button onClick={onEnterApp} className="group flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl">
                      Explore All Stays <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
              </div>
          </div>

          <div className="relative w-full overflow-hidden flex">
              {/* Marquee sliding to the RIGHT */}
              <div className="flex gap-12 animate-[marquee-reverse_50s_linear_infinite] px-8">
                  {[...FEATURED_STAYS, ...FEATURED_STAYS, ...FEATURED_STAYS].map((stay, idx) => (
                      <div 
                        key={`${stay.id}-${idx}`} 
                        onClick={onEnterApp} 
                        className="shrink-0 w-[420px] group cursor-pointer bg-white rounded-[3.5rem] border-2 border-slate-50 p-8 shadow-sm hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.1)] transition-all flex flex-col hover:-translate-y-4"
                        role="button"
                        aria-label={`View details for ${stay.title}`}
                      >
                          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative mb-10 shadow-2xl">
                              <img src={stay.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[8s]" alt={`Luxury interior of ${stay.title}`} />
                              <div className="absolute top-6 left-6">
                                  <span className="bg-white/95 backdrop-blur px-5 py-2.5 rounded-full text-[9px] font-black text-emerald-800 border border-white shadow-2xl uppercase tracking-widest flex items-center gap-2">
                                      <ShieldCheck className="w-3.5 h-3.5" /> State Verified
                                  </span>
                              </div>
                              <div className="absolute bottom-6 right-6">
                                  <div className="bg-brand-yellow text-emerald-950 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                                      {stay.tag}
                                  </div>
                              </div>
                          </div>
                          <div className="space-y-5 px-2 text-left">
                              <div className="flex justify-between items-start">
                                  <h3 className="text-3xl font-black text-slate-950 tracking-tighter leading-[0.9] group-hover:text-emerald-600 transition-colors uppercase italic">{stay.title}</h3>
                                  <div className="flex items-center gap-1.5 text-amber-500 font-black text-sm">
                                      <Star className="w-4 h-4 fill-current" /> {stay.rating}
                                  </div>
                              </div>
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] flex items-center gap-2 italic"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> {stay.location}</p>
                              <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                                  <div>
                                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rate from</p>
                                      <p className="text-3xl font-black text-emerald-600 italic tracking-tighter">₦ {stay.price}</p>
                                  </div>
                                  <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                      <Bed className="w-6 h-6" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Visionary Section */}
      <section className="py-40 bg-white relative border-t border-slate-50">
          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative group">
                  <div className="aspect-[4/5] rounded-[5rem] overflow-hidden shadow-[0_80px_150px_-20px_rgba(0,0,0,0.2)] relative z-10 border-[15px] border-emerald-50 transition-transform duration-700 group-hover:scale-[1.02]">
                      <img src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1976&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="absolute -bottom-16 -right-16 bg-slate-950 p-12 rounded-[4rem] text-white shadow-3xl z-20 max-w-sm border-[10px] border-white animate-in slide-in-from-bottom-20 duration-1000">
                      <Rocket className="w-14 h-14 text-brand-yellow mb-8" />
                      <h4 className="text-3xl font-black mb-4 tracking-tighter uppercase italic">The Gateway OS</h4>
                      <p className="text-emerald-100/50 leading-relaxed font-light text-lg">Automating state protocols through a unified AI-human hybrid infrastructure.</p>
                  </div>
              </div>
              <div className="space-y-12">
                  <span className="text-emerald-600 font-black uppercase tracking-[0.6em] text-[10px] flex items-center gap-5">
                      <div className="w-16 h-px bg-emerald-200" /> SYSTEM ARCHITECTURE
                  </span>
                  <h2 className="text-7xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter uppercase italic">Unified<br/>Governance.</h2>
                  <p className="text-2xl text-slate-500 font-light leading-relaxed italic">
                      IṢẸ́YÁÁ is not just an app. It is the digital nervous system of Ogun State, orchestrating commerce, safety, and heritage into a singular, responsive ecosystem.
                  </p>
                  <div className="grid grid-cols-2 gap-12 pt-8">
                      <div className="space-y-4">
                          <div className="w-16 h-16 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform"><Globe className="w-8 h-8" /></div>
                          <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase">Global Nodes</h4>
                          <p className="text-sm text-slate-400 font-medium leading-relaxed">Integrated with international commerce and logistics protocols.</p>
                      </div>
                      <div className="space-y-4">
                          <div className="w-16 h-16 bg-brand-yellow/10 rounded-[1.5rem] flex items-center justify-center text-brand-yellow shadow-inner group-hover:scale-110 transition-transform"><Sparkles className="w-8 h-8" /></div>
                          <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase">AI Optimization</h4>
                          <p className="text-sm text-slate-400 font-medium leading-relaxed">Real-time resource allocation for transport and emergency services.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}} />
      
      <footer className="bg-slate-950 text-white py-32 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
              <Logo variant="light" className="h-12" />
              <div className="text-center md:text-right">
                  <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">State Command Core</p>
                  <p className="text-xl font-light text-slate-400 italic max-w-md">"Empowering the Gateway State through intelligent digital acceleration."</p>
              </div>
          </div>
          <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-slate-600 font-bold uppercase tracking-widest text-[9px]">© 2026 OGUN STATE GOVERNMENT • IṢẸ́YÁÁ PROTOCOL V4.2</p>
              <div className="flex gap-12">
                  {['Privacy', 'Security', 'Legal'].map(l => <button key={l} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">{l}</button>)}
              </div>
          </div>
      </footer>
    </div>
  );
};
