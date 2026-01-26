
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Navigation, Car, Clock, User, Star, Phone, Bus, Ship, 
  ShieldCheck, Zap, Info, Map as MapIcon, DollarSign, Activity, 
  X, ChevronRight, Search, Power, Bell, TrendingUp, Radio, 
  CheckCircle2, Loader2, Play, ArrowRight, MessageCircle as MessageIcon
} from 'lucide-react';
import { VendorChat } from './VendorChat';

const OGUN_PLACES = [
  "MKO Abiola Stadium, Abeokuta", "Kuto Motor Park", "Sagamu Interchange", 
  "Ilaro Central Market", "OPIC Plaza, Ota", "Redeemed Camp Gate 1", 
  "Mountain of Fire (MFM) Gate", "Ijebu Ode Stadium", "Covenant University Main Gate", 
  "Babcock University Main Gate", "Governor's Office, Oke-Mosan", "Olumo Rock Tourist Center",
  "Federal Medical Centre, Abeokuta", "Abeokuta Train Station (Wole Soyinka)",
  "Agbeloba House", "Alake Palace Grounds"
];

interface RideOption { id: string; type: string; category: 'city' | 'intercity' | 'boat'; price: string; eta: string; capacity: number; surge?: boolean; }

export const Transport: React.FC = () => {
  const [userMode, setUserMode] = useState<'passenger' | 'driver'>('passenger');
  const [activeTab, setActiveTab] = useState<'city' | 'intercity' | 'boat'>('city');
  const [step, setStep] = useState<'input' | 'searching' | 'results' | 'confirmed'>('input');
  
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupSugg, setPickupSugg] = useState<string[]>([]);
  const [dropoffSugg, setDropoffSugg] = useState<string[]>([]);
  const [selectedRide, setSelectedRide] = useState<RideOption | null>(null);

  // Chat States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatParty, setActiveChatParty] = useState<{ name: string; avatar?: string } | null>(null);

  // Driver States
  const [isOnline, setIsOnline] = useState(false);
  const [driverStatus, setDriverStatus] = useState<'idle' | 'searching' | 'request' | 'on_trip'>('idle');
  const [earnings, setEarnings] = useState(14200.50);
  const [incomingRequest, setIncomingRequest] = useState<any>(null);

  const RIDE_OPTIONS: RideOption[] = [
    { id: '1', type: 'ISEYAA Basic', category: 'city', price: '₦ 1,200', eta: '4 mins', capacity: 4 },
    { id: '2', type: 'ISEYAA Comfort', category: 'city', price: '₦ 2,500', eta: '6 mins', capacity: 4, surge: true },
    { id: '3', type: 'Keke (Tricycle)', category: 'city', price: '₦ 600', eta: '2 mins', capacity: 3 },
    { id: '7', type: 'River Ferry', category: 'boat', price: '₦ 800', eta: '15 mins', capacity: 20 },
  ];

  // Driver Mode Logic
  useEffect(() => {
    let interval: any;
    if (isOnline && driverStatus === 'idle') {
      setDriverStatus('searching');
      interval = setTimeout(() => {
        setIncomingRequest({
          user: "Adewale Tunde",
          pickup: "Olumo Rock Tourist Center",
          dropoff: "Governor's Office, Oke-Mosan",
          fare: "₦ 2,800",
          rating: 4.9,
          avatar: "https://i.pravatar.cc/150?u=user"
        });
        setDriverStatus('request');
      }, 5000);
    }
    return () => clearTimeout(interval);
  }, [isOnline, driverStatus]);

  const handlePickupChange = (val: string) => {
    setPickup(val);
    setPickupSugg(val.length > 1 ? OGUN_PLACES.filter(p => p.toLowerCase().includes(val.toLowerCase())) : []);
  };

  const handleDropoffChange = (val: string) => {
    setDropoff(val);
    setDropoffSugg(val.length > 1 ? OGUN_PLACES.filter(p => p.toLowerCase().includes(val.toLowerCase())) : []);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) return;
    setStep('searching');
    setTimeout(() => setStep('results'), 1500);
  };

  const openChatWith = (name: string, avatar?: string) => {
    setActiveChatParty({ name, avatar });
    setIsChatOpen(true);
  };

  const getMapUrl = (query: string) => `https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY}&q=${encodeURIComponent(query || "Ogun State")}`;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Transport <span className="text-emerald-600">&</span> Mobility</h2>
            <p className="text-slate-500 mt-1 font-medium">Real-time GPS synchronization with the Gateway OS.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-full border-2 border-slate-50 shadow-inner">
            <button onClick={() => {setUserMode('passenger'); setStep('input');}} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${userMode === 'passenger' ? 'bg-white shadow-xl text-emerald-600 scale-105' : 'text-slate-500 hover:text-slate-800'}`}>Passenger</button>
            <button onClick={() => setUserMode('driver')} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${userMode === 'driver' ? 'bg-white shadow-xl text-emerald-600 scale-105' : 'text-slate-500 hover:text-slate-800'}`}>Driver</button>
        </div>
      </div>

      {userMode === 'passenger' ? (
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border-[8px] border-slate-50 overflow-hidden min-h-[600px] flex flex-col relative transition-all max-w-3xl mx-auto">
          {step === 'input' && (
            <div className="flex-1 flex flex-col">
              <div className="flex bg-slate-50/50 border-b border-slate-100">
                  {['city', 'intercity', 'boat'].map(tab => (
                      <button key={tab} onClick={() => setActiveTab(tab as any)} className={`flex-1 py-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-4 ${activeTab === tab ? 'border-emerald-600 text-emerald-600 bg-white' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>{tab}</button>
                  ))}
              </div>
              <form onSubmit={handleSearch} className="p-12 space-y-10 flex-1 flex flex-col justify-center">
                <div className="space-y-6 relative">
                  <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-3 ml-2">Departure Node</label>
                    <div className="relative group">
                        <MapPin className="absolute left-6 top-5 w-6 h-6 text-emerald-600 transition-transform group-focus-within:scale-110" />
                        <input type="text" autoComplete="off" value={pickup} onChange={e => handlePickupChange(e.target.value)} placeholder="Current location ID..." className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none font-bold text-xl transition-all" required />
                        {pickupSugg.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 shadow-3xl rounded-[2rem] overflow-hidden z-[100] animate-in slide-in-from-top-2">
                                {pickupSugg.map(s => (
                                    <button key={s} type="button" onClick={() => { setPickup(s); setPickupSugg([]); }} className="w-full px-8 py-5 text-left hover:bg-emerald-50 text-sm font-bold flex items-center gap-4 transition-colors border-b border-slate-50 last:border-0"><MapPin className="w-5 h-5 text-slate-300" /> {s}</button>
                                ))}
                            </div>
                        )}
                    </div>
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-3 ml-2">Destination Node</label>
                    <div className="relative group">
                        <Navigation className="absolute left-6 top-5 w-6 h-6 text-slate-400 transition-transform group-focus-within:rotate-45" />
                        <input type="text" autoComplete="off" value={dropoff} onChange={e => handleDropoffChange(e.target.value)} placeholder="Target landmark..." className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none font-bold text-xl transition-all" required />
                        {dropoffSugg.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 shadow-3xl rounded-[2rem] overflow-hidden z-[100] animate-in slide-in-from-top-2">
                                {dropoffSugg.map(s => (
                                    <button key={s} type="button" onClick={() => { setDropoff(s); setDropoffSugg([]); }} className="w-full px-8 py-5 text-left hover:bg-emerald-50 text-sm font-bold flex items-center gap-4 transition-colors border-b border-slate-50 last:border-0"><Navigation className="w-5 h-5 text-slate-300" /> {s}</button>
                                ))}
                            </div>
                        )}
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full bg-slate-950 text-white py-7 rounded-[2rem] font-black text-2xl hover:bg-emerald-600 transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center gap-5 uppercase tracking-widest italic group">
                    <Search className="w-8 h-8 group-hover:scale-110 transition-transform" /> Sync Route
                </button>
              </form>
            </div>
          )}

          {step === 'searching' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-20 animate-in fade-in zoom-in">
              <div className="relative mb-12">
                  <div className="w-32 h-32 border-[12px] border-emerald-50 border-t-emerald-600 rounded-full animate-spin shadow-inner"></div>
                  <div className="absolute inset-0 flex items-center justify-center"><Zap className="w-10 h-10 text-emerald-500 animate-pulse" /></div>
              </div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Neural Fleet Sync...</h3>
              <p className="text-slate-500 mt-4 text-xl font-light">Identifying optimal verified dispatchers near your node.</p>
            </div>
          )}

          {step === 'results' && (
            <div className="p-10 animate-in slide-in-from-right-10">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Available Modules</h3>
                <button onClick={() => setStep('input')} className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline">Recalibrate Route</button>
              </div>
              <div className="space-y-6">
                {RIDE_OPTIONS.filter(r => r.category === activeTab).map(ride => (
                    <button key={ride.id} onClick={() => {setSelectedRide(ride); setStep('confirmed');}} className="w-full flex items-center justify-between p-8 bg-white border-4 border-slate-50 rounded-[2.5rem] hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group relative overflow-hidden text-left shadow-sm">
                        {ride.surge && <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-black px-4 py-1.5 rounded-bl-2xl flex items-center gap-2 uppercase tracking-widest"><Zap className="w-3.5 h-3.5 fill-current text-brand-yellow" /> Pulse Multiplier</div>}
                        <div className="flex items-center gap-8">
                            <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center group-hover:bg-white transition-colors shadow-inner border border-slate-100">
                                {activeTab === 'boat' ? <Ship className="w-10 h-10 text-slate-400 group-hover:text-emerald-600" /> : <Car className="w-10 h-10 text-slate-400 group-hover:text-emerald-600" />}
                            </div>
                            <div>
                                <h4 className="font-black text-2xl text-slate-900 uppercase italic tracking-tighter">{ride.type}</h4>
                                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold mt-2 uppercase tracking-widest">
                                    <span className="flex items-center gap-2 text-emerald-600"><Clock className="w-4 h-4" /> {ride.eta}</span>
                                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                                    <span className="flex items-center gap-2"><User className="w-4 h-4" /> {ride.capacity} NODES</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-4xl font-black text-slate-900 tracking-tighter italic">{ride.price}</span>
                        </div>
                    </button>
                ))}
              </div>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="flex flex-col flex-1 h-full animate-in zoom-in-95 duration-500">
               <div className="relative h-[350px] shrink-0">
                  <iframe width="100%" height="100%" frameBorder="0" style={{ border: 0 }} src={getMapUrl(pickup)} allowFullScreen></iframe>
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-full border border-white shadow-2xl flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.3em]">Telemetry Signal Locked</span>
                  </div>
               </div>
               <div className="p-10 bg-white flex-1 flex flex-col">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
                    <div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Interceptor Arriving</h3>
                        <p className="text-slate-400 mt-3 font-bold flex items-center gap-3 uppercase text-[10px] tracking-widest"><MapIcon className="w-5 h-5 text-emerald-500" /> Objective: <span className="text-slate-900 font-black italic">{dropoff}</span></p>
                    </div>
                    <div className="text-right">
                        <span className="text-4xl font-black text-emerald-600 tracking-tighter italic">{selectedRide?.price}</span>
                        <p className="text-[9px] text-slate-300 font-black uppercase tracking-[0.4em] mt-2">Digital Ledger Synced</p>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-8 rounded-[3rem] flex items-center gap-8 text-white relative overflow-hidden shadow-3xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[80px] opacity-20 -translate-y-10 translate-x-10"></div>
                      <div className="w-20 h-20 bg-white/10 rounded-[2rem] border border-white/20 flex items-center justify-center overflow-hidden relative group cursor-pointer">
                          <img src="https://i.pravatar.cc/150?u=remi" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                      </div>
                      <div className="flex-1">
                          <div className="flex justify-between items-center">
                              <h4 className="font-black text-2xl tracking-tight italic uppercase">Remi Johnson</h4>
                              <div className="flex items-center gap-2 bg-emerald-600 px-3 py-1 rounded-full text-[10px] font-black"><Star className="w-3.5 h-3.5 fill-current" /> 4.9</div>
                          </div>
                          <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-3"><ShieldCheck className="w-4 h-4" /> OG-DR-221 • VERIFIED DISPATCHER</p>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => openChatWith("Remi Johnson", "https://i.pravatar.cc/150?u=remi")} className="p-6 bg-white/10 hover:bg-emerald-600 rounded-full text-white transition-all hover:scale-110 active:scale-90 border border-white/10"><MessageIcon className="w-7 h-7" /></button>
                        <button className="p-6 bg-white/10 hover:bg-emerald-600 rounded-full text-white transition-all hover:scale-110 active:scale-90 border border-white/10"><Phone className="w-7 h-7" /></button>
                      </div>
                  </div>
                  <div className="mt-auto pt-10 flex gap-6">
                      <button onClick={() => setStep('input')} className="flex-1 py-6 border-4 border-slate-50 text-slate-400 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">Abort Mission</button>
                      <button onClick={() => setStep('input')} className="flex-[2] py-6 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 italic"><ShieldCheck className="w-5 h-5" /> Safety Protocols</button>
                  </div>
               </div>
            </div>
          )}
        </div>
      ) : (
          <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="space-y-8">
                  <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border-[10px] border-white">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -translate-y-20 translate-x-20"></div>
                      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                          <div className="w-32 h-32 rounded-[2.5rem] border-8 border-white/10 overflow-hidden relative">
                              <img src="https://i.pravatar.cc/150?u=remi" className="w-full h-full object-cover" />
                              {isOnline && <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-900 animate-pulse"></div>}
                          </div>
                          <div>
                              <h3 className="text-3xl font-black uppercase italic tracking-tighter">Remi Johnson</h3>
                              <p className="text-emerald-500 text-xs font-black uppercase tracking-[0.4em] mt-1">Veteran Class-A Dispatcher</p>
                          </div>
                          <button 
                            onClick={() => { setIsOnline(!isOnline); if(isOnline) setDriverStatus('idle'); }}
                            className={`w-full py-6 rounded-[2rem] font-black text-xl uppercase tracking-widest transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-2xl ${isOnline ? 'bg-red-600 hover:bg-red-700 shadow-red-900/20' : 'bg-emerald-600 hover:bg-emerald-50 shadow-emerald-900/20'}`}
                          >
                            <Power className={`w-8 h-8 ${isOnline ? 'animate-pulse' : 'group-hover:rotate-180 transition-transform'}`} />
                            {isOnline ? 'Go Offline' : 'Engage Portal'}
                          </button>
                      </div>
                  </div>
                  <div className="bg-white rounded-[2.5rem] p-10 border-4 border-slate-50 shadow-xl space-y-8">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Neural Analytics</h4>
                      <div className="space-y-6">
                          <div className="flex justify-between items-end">
                              <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rating</p>
                                  <p className="text-4xl font-black text-slate-900 italic tracking-tighter">4.96</p>
                              </div>
                              <Star className="w-10 h-10 text-amber-500 fill-current" />
                          </div>
                          <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" style={{ width: '96%' }}></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div className="p-5 bg-slate-50 rounded-3xl text-center">
                                  <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Accept Rate</p>
                                  <p className="text-xl font-black text-emerald-600 italic">98%</p>
                              </div>
                              <div className="p-5 bg-slate-50 rounded-3xl text-center">
                                  <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Safety Score</p>
                                  <p className="text-xl font-black text-blue-600 italic">100</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                  <div className="bg-emerald-600 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-3xl relative overflow-hidden">
                       <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <svg width="100%" height="100%"><pattern id="gridD" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#gridD)" /></svg>
                       </div>
                       <div className="relative z-10">
                           <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-70">Economic Signals Generated (Today)</p>
                           <h2 className="text-7xl font-black tracking-tighter italic">₦ {earnings.toLocaleString()}</h2>
                       </div>
                       <div className="relative z-10 flex gap-6">
                           <div className="text-center bg-white/10 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20">
                               <p className="text-[10px] font-black uppercase tracking-widest mb-1">TRIPS</p>
                               <p className="text-3xl font-black">12</p>
                           </div>
                           <div className="text-center bg-white/10 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20">
                               <p className="text-[10px] font-black uppercase tracking-widest mb-1">ACTIVE</p>
                               <p className="text-3xl font-black">8.4h</p>
                           </div>
                       </div>
                  </div>

                  {!isOnline ? (
                      <div className="bg-slate-50 rounded-[4rem] border-8 border-dashed border-slate-200 p-20 text-center flex flex-col items-center justify-center space-y-8 min-h-[400px]">
                          <div className="p-8 bg-white rounded-full shadow-2xl"><Radio className="w-16 h-16 text-slate-200" /></div>
                          <div>
                              <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">System Idle</h3>
                              <p className="text-slate-400 mt-2 font-medium max-w-sm">Engage the portal to synchronize with the Ogun Mobility Grid.</p>
                          </div>
                      </div>
                  ) : driverStatus === 'searching' ? (
                      <div className="bg-slate-950 rounded-[4rem] p-12 text-center flex flex-col items-center justify-center space-y-12 min-h-[400px] relative overflow-hidden group">
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
                           <div className="relative w-48 h-48 flex items-center justify-center">
                                <div className="absolute inset-0 border-8 border-emerald-500/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
                                <div className="absolute inset-4 border-8 border-emerald-500/40 rounded-full animate-[ping_2.5s_linear_infinite_0.5s]"></div>
                                <div className="absolute inset-8 border-8 border-emerald-500/60 rounded-full animate-[ping_2s_linear_infinite_1s]"></div>
                                <Navigation className="w-12 h-12 text-emerald-500 animate-bounce" />
                           </div>
                           <div>
                               <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Scanning Gateway Grid...</h3>
                               <p className="text-emerald-500/60 mt-3 font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4">
                                   <Activity className="w-5 h-5 animate-pulse" /> Live Telemetry Linked
                               </p>
                           </div>
                           <div className="flex gap-4">
                               <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest">NODE: ABK-STADIUM-AXIS</div>
                               <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest">DEMAND: HIGH</div>
                           </div>
                      </div>
                  ) : driverStatus === 'request' && incomingRequest ? (
                      <div className="bg-white rounded-[4rem] border-[12px] border-emerald-500 p-12 shadow-3xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
                           <div className="absolute top-0 right-0 bg-emerald-500 text-white px-10 py-3 rounded-bl-[2rem] font-black text-xs uppercase tracking-[0.4em] flex items-center gap-3 animate-pulse">
                                <Bell className="w-5 h-5" /> Urgent Dispatch
                           </div>
                           <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 p-1 relative shadow-2xl">
                                     <img src={incomingRequest.avatar} className="w-full h-full object-cover rounded-[2rem]" />
                                     <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-full border-4 border-white flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> {incomingRequest.rating}</div>
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">Target Node Intercept</p>
                                    <h3 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase">{incomingRequest.user}</h3>
                                    <p className="text-emerald-600 font-black text-4xl mt-3 tracking-tighter italic">{incomingRequest.fare}</p>
                                </div>
                           </div>
                           <div className="space-y-8 mb-12 bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                                <div className="flex items-start gap-6">
                                     <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-emerald-600" /></div>
                                     <div className="flex-1">
                                          <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Pick Signal</p>
                                          <p className="text-lg font-bold text-slate-900 italic">{incomingRequest.pickup}</p>
                                     </div>
                                </div>
                                <div className="flex items-start gap-6">
                                     <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0"><Navigation className="w-5 h-5 text-slate-500" /></div>
                                     <div className="flex-1">
                                          <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Drop Objective</p>
                                          <p className="text-lg font-bold text-slate-900 italic">{incomingRequest.dropoff}</p>
                                     </div>
                                </div>
                           </div>
                           <div className="flex gap-6">
                                <button onClick={() => setDriverStatus('searching')} className="flex-1 py-7 bg-slate-100 text-slate-400 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Decline Node</button>
                                <button 
                                    onClick={() => { setDriverStatus('on_trip'); setEarnings(e => e + 2800); }} 
                                    className="flex-[3] py-7 bg-emerald-600 text-white rounded-full font-black text-2xl uppercase tracking-[0.2em] italic shadow-2xl shadow-emerald-900/40 hover:bg-emerald-700 transition-all active:scale-[0.98] flex items-center justify-center gap-6 group"
                                >
                                    ENGAGE MISSION <ArrowRight className="w-9 h-9 group-hover:translate-x-3 transition-transform" />
                                </button>
                           </div>
                      </div>
                  ) : driverStatus === 'on_trip' && incomingRequest && (
                      <div className="bg-slate-900 rounded-[4rem] overflow-hidden shadow-3xl border-[10px] border-white animate-in slide-in-from-right-12 duration-700">
                           <div className="h-[400px] relative">
                                <iframe width="100%" height="100%" frameBorder="0" style={{ border: 0 }} src={getMapUrl(incomingRequest.dropoff)} allowFullScreen></iframe>
                                <div className="absolute bottom-8 left-8 right-8 bg-white p-8 rounded-[2.5rem] shadow-3xl border border-slate-100 flex justify-between items-center">
                                     <div className="flex items-center gap-6">
                                          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white"><Navigation className="w-8 h-8" /></div>
                                          <div>
                                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ETA TO OBJECTIVE</p>
                                              <p className="text-3xl font-black text-slate-900 italic tracking-tighter">12 Mins <span className="text-emerald-600">• 4.2 KM</span></p>
                                          </div>
                                     </div>
                                     <button onClick={() => setDriverStatus('idle')} className="px-10 py-5 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95">Complete Trip</button>
                                </div>
                           </div>
                           <div className="p-12 space-y-8">
                                <div className="flex items-center justify-between">
                                     <div className="flex items-center gap-6">
                                          <img src={incomingRequest.avatar} className="w-16 h-16 rounded-[1.5rem] shadow-xl" />
                                          <div>
                                              <p className="text-white font-black text-xl italic uppercase tracking-tight">{incomingRequest.user}</p>
                                              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">In-Progress Intercept</p>
                                          </div>
                                     </div>
                                     <button onClick={() => openChatWith(incomingRequest.user, incomingRequest.avatar)} className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-emerald-500 transition-all active:scale-90"><MessageIcon className="w-8 h-8" /></button>
                                </div>
                                <div className="flex items-center gap-6 py-6 border-t border-white/5">
                                     <ShieldCheck className="w-8 h-8 text-emerald-500" />
                                     <p className="text-slate-500 text-sm font-medium italic">Mission currently recorded on state ledger. Automatic payment anchoring active.</p>
                                </div>
                           </div>
                      </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 group hover:border-emerald-200 transition-all cursor-pointer">
                            <div className="p-5 bg-blue-50 rounded-[1.5rem] w-fit mb-10 group-hover:scale-110 transition-transform"><TrendingUp className="w-8 h-8 text-blue-600" /></div>
                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">+₦ 4,800</h3>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2">Active Surge Bonus</p>
                       </div>
                       <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 group hover:border-emerald-200 transition-all cursor-pointer">
                            <div className="p-5 bg-amber-50 rounded-[1.5rem] w-fit mb-10 group-hover:scale-110 transition-transform"><CheckCircle2 className="w-8 h-8 text-amber-600" /></div>
                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">Verified</h3>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2">Compliance Level 1</p>
                       </div>
                  </div>
              </div>
          </div>
      )}

      {/* REUSABLE CHAT COMPONENT */}
      {activeChatParty && (
          <VendorChat 
            isOpen={isChatOpen} 
            onClose={() => setIsChatOpen(false)} 
            vendorName={activeChatParty.name} 
            vendorAvatar={activeChatParty.avatar}
          />
      )}
    </div>
  );
};
