import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Globe, Zap, Rocket, Calendar, Ticket, Sparkles, Timer, 
  Star, ShieldCheck, Bed, MapPin, ShieldHalf
} from 'lucide-react';
import { Logo } from './Logo.tsx';

interface LandingPageProps {
  onEnterApp: () => void;
}

const SLIDES = [
  {
    id: 1,
    title: "The Heart of Egba Culture",
    subtitle: "Experience Olumo Rock through the IṢẸ́YÁÁ AI lens. Guided heritage tours available daily.",
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
  }
];

const LIVE_PULSE_EVENTS = [
  { id: 1, title: 'Adire Carnival 2024', loc: 'Itoku', date: 'Dec 12', img: 'https://images.unsplash.com/photo-1514525253361-bee243870eb2?w=400&fit=crop' },
  { id: 2, title: 'Gateway Music Fest', loc: 'Sagamu', date: 'Dec 15', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&fit=crop' },
  { id: 3, title: 'Ogun Innovate Expo', loc: 'Ota', date: 'Jan 05', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&fit=crop' },
];

const FEATURED_STAYS = [
  { id: 's1', title: 'The Rock Heritage Suites', location: 'Abeokuta, Ogun', price: '35,000', type: 'Luxury Hotel', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', rating: 4.9, tag: 'Top Pick' },
  { id: 's2', title: 'Green Springs Golf Resort', location: 'Sagamu, Ogun', price: '65,000', type: 'Resort', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop', rating: 4.8, tag: 'Elite' },
  { id: 's3', title: 'Modern Studio Ota', location: 'Ota, Ogun', price: '18,000', type: 'Short-let', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop', rating: 4.7, tag: 'Convenient' }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length), 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream relative overflow-hidden">
      <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-3xl border-b border-white/20 px-8 py-5 flex items-center justify-between shadow-sm">
        <Logo className="h-10" variant="color" />
        <div className="hidden lg:flex items-center gap-12">
            {['Attractions', 'Culture', 'Marketplace', 'Gov'].map(item => (
                <button key={item} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-emerald-600 transition-all">{item}</button>
            ))}
        </div>
        <button onClick={onEnterApp} className="bg-slate-900 text-white px-10 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl">
          Access Gateway
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
         {SLIDES.map((slide, index) => (
             <div key={slide.id} className={`absolute inset-0 transition-all duration-[1.5s] ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {slide.video ? (
                    <video autoPlay muted loop className="w-full h-full object-cover opacity-80"><source src={slide.video} type="video/mp4" /></video>
                ) : (
                    <img src={slide.media} className="w-full h-full object-cover opacity-80" alt={slide.title} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-24 max-w-7xl mx-auto">
                    <div className="max-w-4xl space-y-8">
                        {slide.type === 'advert' && <div className="inline-flex bg-brand-yellow px-6 py-2.5 rounded-full text-emerald-950 font-black text-[10px] uppercase tracking-widest animate-bounce">Flash Sale 40% OFF</div>}
                        <h1 className="text-7xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic">{slide.title}</h1>
                        <p className="text-xl md:text-3xl text-emerald-100/70 font-light max-w-2xl">{slide.subtitle}</p>
                        <div className="pt-10 flex gap-6">
                            <button onClick={onEnterApp} className="px-14 py-7 bg-white text-emerald-950 rounded-full font-black text-xl hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-5 group">
                                {slide.cta} <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
             </div>
         ))}
      </section>

      {/* Live Pulse */}
      <section className="bg-emerald-950 py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 mb-12 flex justify-between items-end relative z-10">
              <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic"><span className="text-emerald-500">Live</span> Pulse</h2>
              <div className="bg-white/10 border border-white/20 px-6 py-3 rounded-full flex items-center gap-3">
                  <Timer className="w-5 h-5 text-brand-yellow animate-pulse" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Real-time Signals Active</span>
              </div>
          </div>
          <div className="relative w-full overflow-hidden flex">
              <div className="flex gap-8 animate-marquee px-8">
                  {[...LIVE_PULSE_EVENTS, ...LIVE_PULSE_EVENTS].map((evt, idx) => (
                      <div key={`${evt.id}-${idx}`} className="shrink-0 w-[380px] bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] border border-white/10 p-8">
                          <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
                              <img src={evt.img} className="w-full h-full object-cover" alt={evt.title} />
                          </div>
                          <h3 className="text-3xl font-black text-white uppercase italic">{evt.title}</h3>
                          <p className="text-emerald-400/60 font-black uppercase tracking-widest text-[10px] mt-2">{evt.loc} • Gateway State</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Luxury Stays */}
      <section className="py-32 bg-[#FDFBF7] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 mb-20">
              <span className="text-emerald-600 font-black uppercase tracking-[0.6em] text-[10px]">HERITAGE HOSPITALITY</span>
              <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.85] mt-4">Luxury Stay.</h2>
          </div>
          <div className="relative w-full overflow-hidden flex">
              <div className="flex gap-12 animate-marquee-reverse px-8">
                  {[...FEATURED_STAYS, ...FEATURED_STAYS, ...FEATURED_STAYS].map((stay, idx) => (
                      <div key={`${stay.id}-${idx}`} onClick={onEnterApp} className="shrink-0 w-[420px] group cursor-pointer bg-white rounded-[3.5rem] border-2 border-slate-50 p-8 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-4" role="button" aria-label={`View stay: ${stay.title}`}>
                          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative mb-10 shadow-2xl">
                              <img src={stay.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[8s]" alt={`Luxury interior of ${stay.title}`} />
                              <div className="absolute top-6 left-6 flex gap-2">
                                  <span className="bg-white/95 px-4 py-2 rounded-full text-[9px] font-black text-emerald-800 border border-white shadow-2xl uppercase tracking-widest">State Verified</span>
                              </div>
                          </div>
                          <h3 className="text-3xl font-black text-slate-950 tracking-tighter uppercase italic">{stay.title}</h3>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2 italic flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> {stay.location}</p>
                          <div className="pt-8 border-t border-slate-50 flex justify-between items-center mt-6">
                              <span className="text-3xl font-black text-emerald-600 italic">₦ {stay.price}</span>
                              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all"><Bed className="w-6 h-6" /></div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <footer className="bg-slate-950 text-white py-32 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
              <Logo variant="light" className="h-12" />
              <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px]">© 2026 OGUN STATE GOVERNMENT • IṢẸ́YÁÁ PROTOCOL V4.4</p>
          </div>
      </footer>
    </div>
  );
};