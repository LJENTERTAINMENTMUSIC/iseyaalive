
import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Timer, 
  Medal, 
  ClipboardList, 
  Activity, 
  Search,
  ChevronRight,
  UserPlus,
  Flag,
  BarChart3,
  Video,
  Map,
  CheckCircle2,
  Wrench,
  Zap,
  Target,
  ShieldCheck,
  Radio,
  Star,
  ArrowRight,
  Play,
  Maximize2,
  Flame,
  Dna,
  Lock,
  MoreHorizontal,
  // Fix: Added missing TrendingUp and MapPin imports from lucide-react to resolve "Cannot find name" errors
  TrendingUp,
  MapPin
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  score: string;
  status: 'Live' | 'Finished' | 'Upcoming';
  time: string;
  league: string;
  intensity: number;
}

interface Athlete {
  id: string;
  name: string;
  sport: string;
  age: number;
  club: string;
  image: string;
  verified: boolean;
  neuralPotential: number;
  marketValue: string;
  stats: { subject: string; A: number; fullMark: number }[];
}

const LIVE_MATCHES: Match[] = [
  { id: '1', homeTeam: 'Gateway Utd', awayTeam: 'Remo Stars', homeLogo: 'GU', awayLogo: 'RS', score: '2 - 1', status: 'Live', time: '78\'', league: 'Ogun Premier League', intensity: 92 },
  { id: '2', homeTeam: 'Abeokuta Stormers', awayTeam: 'Ijebu United', homeLogo: 'AS', awayLogo: 'IU', score: '0 - 0', status: 'Upcoming', time: '16:00', league: 'Ogun Premier League', intensity: 45 },
];

const TALENT_POOL: Athlete[] = [
  {
    id: 'a1',
    name: 'Chioma Ajunwa Jr.',
    sport: 'Athletics (100m)',
    age: 17,
    club: 'Alake Sports Academy',
    image: 'https://images.unsplash.com/photo-1552674605-469555f96752?q=80&w=1974&auto=format&fit=crop',
    verified: true,
    neuralPotential: 98,
    marketValue: '₦ 12.5M',
    stats: [
      { subject: 'Speed', A: 95, fullMark: 100 },
      { subject: 'Stamina', A: 82, fullMark: 100 },
      { subject: 'Mental', A: 90, fullMark: 100 },
      { subject: 'Agility', A: 88, fullMark: 100 },
      { subject: 'Power', A: 85, fullMark: 100 },
    ]
  },
  {
    id: 'a2',
    name: 'Tunde Bakare',
    sport: 'Football (Forward)',
    age: 18,
    club: 'Gateway Academy',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1972&auto=format&fit=crop',
    verified: true,
    neuralPotential: 94,
    marketValue: '₦ 28.0M',
    stats: [
      { subject: 'Finishing', A: 92, fullMark: 100 },
      { subject: 'Pace', A: 95, fullMark: 100 },
      { subject: 'Passing', A: 78, fullMark: 100 },
      { subject: 'Dribbling', A: 88, fullMark: 100 },
      { subject: 'Strength', A: 82, fullMark: 100 },
    ]
  }
];

export const Sports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leagues' | 'scouting' | 'venues' | 'licensing'>('overview');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  const startAuthorization = (target: string) => {
    setIsAuthorizing(true);
    setTimeout(() => setIsAuthorizing(false), 2000);
  };

  return (
    <div className="p-6 md:p-12 max-w-[1600px] mx-auto space-y-12 animate-in fade-in duration-700">
      
      {/* Authorization Overlay */}
      {isAuthorizing && (
          <div className="fixed inset-0 z-[300] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center text-center p-8">
              <div className="space-y-8 animate-in zoom-in-95">
                  <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-10 h-10 text-emerald-500 animate-pulse" />
                      </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Neural Verification</h2>
                    <p className="text-emerald-500 font-bold uppercase tracking-[0.4em] text-xs">Accessing State Sports Ledger...</p>
                  </div>
              </div>
          </div>
      )}

      {/* Main Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-l-4 border-emerald-500 pl-8">
        <div>
           <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.6em] mb-4 block">Central Sports Administration</span>
           <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.85]">Neural<br/>Sports.</h2>
        </div>
        
        <div className="flex flex-wrap gap-4">
            <button className="bg-white border-4 border-slate-50 text-slate-900 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:border-emerald-500 transition-all flex items-center gap-3">
                <Video className="w-5 h-5 text-red-600" /> LIVE BROADCAST
            </button>
            <button 
                onClick={() => startAuthorization('licensing')}
                className="bg-emerald-600 text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-emerald-700 shadow-2xl shadow-emerald-600/30 transition-all active:scale-95 flex items-center gap-3"
            >
                Athlete Identity Core <ShieldCheck className="w-4 h-4 fill-white" />
            </button>
        </div>
      </div>

      {/* Navigation OS Bar */}
      <div className="flex bg-slate-100 p-2 rounded-full border-4 border-slate-50 shadow-inner w-fit overflow-x-auto scrollbar-hide">
          {[
            { id: 'overview', icon: Activity, label: 'OVERVIEW' },
            { id: 'leagues', icon: Trophy, label: 'LEAGUES' },
            { id: 'scouting', icon: Target, label: 'SCOUTING' },
            { id: 'venues', icon: Map, label: 'INFRASTRUCTURE' },
            { id: 'licensing', icon: ClipboardList, label: 'LICENSING' }
          ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white shadow-2xl text-emerald-600 scale-105' : 'text-slate-500 hover:text-slate-900'}`}
              >
                  <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
          ))}
      </div>

      {activeTab === 'overview' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-700">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Live Match Center Card */}
                  <div className="lg:col-span-2 bg-slate-950 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl border-[10px] border-white group">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-10 -translate-y-20 translate-x-20 group-hover:scale-125 transition-transform duration-[10s]"></div>
                      <div className="flex justify-between items-center mb-16 relative z-10">
                          <div className="flex items-center gap-4">
                              <div className="p-3 bg-red-600 rounded-2xl animate-pulse shadow-lg shadow-red-900/50">
                                  <Radio className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Live Match Center</h3>
                                  <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.4em]">Signal: Ogun Premier League</p>
                              </div>
                          </div>
                          <div className="px-6 py-2 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">Intensity: {LIVE_MATCHES[0].intensity}%</div>
                      </div>

                      <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                           <div className="flex flex-col items-center gap-6">
                               <div className="w-24 h-24 bg-white/5 rounded-full border-4 border-white/10 flex items-center justify-center text-4xl font-black text-emerald-400 shadow-2xl">{LIVE_MATCHES[0].homeLogo}</div>
                               <h4 className="text-2xl font-black uppercase italic tracking-tighter">{LIVE_MATCHES[0].homeTeam}</h4>
                           </div>
                           <div className="flex flex-col items-center gap-4">
                               <div className="text-8xl font-black tracking-tighter italic tabular-nums bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">{LIVE_MATCHES[0].score}</div>
                               <div className="bg-emerald-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest animate-pulse">{LIVE_MATCHES[0].time}</div>
                           </div>
                           <div className="flex flex-col items-center gap-6">
                               <div className="w-24 h-24 bg-white/5 rounded-full border-4 border-white/10 flex items-center justify-center text-4xl font-black text-blue-400 shadow-2xl">{LIVE_MATCHES[0].awayLogo}</div>
                               <h4 className="text-2xl font-black uppercase italic tracking-tighter">{LIVE_MATCHES[0].awayTeam}</h4>
                           </div>
                      </div>

                      <div className="mt-16 flex gap-4 relative z-10 pt-10 border-t border-white/5">
                          <button className="flex-1 py-5 bg-white text-slate-900 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Match Stats</button>
                          <button className="flex-1 py-5 bg-white/10 text-white rounded-[2rem] border border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">Neural Commentary</button>
                      </div>
                  </div>

                  {/* Quick Stats Matrix */}
                  <div className="space-y-8">
                       <div className="bg-white p-10 rounded-[3rem] border-4 border-slate-50 shadow-sm relative overflow-hidden group">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Network Reach</p>
                           <h3 className="text-5xl font-black text-slate-900 tracking-tighter italic">420k <span className="text-emerald-500">Live</span></h3>
                           <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500" /> Active Viewership Signal</p>
                           <div className="mt-8 h-2 bg-slate-50 rounded-full overflow-hidden">
                               <div className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" style={{ width: '85%' }}></div>
                           </div>
                       </div>
                       <div className="bg-emerald-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                           <p className="text-[10px] font-black text-emerald-200 uppercase tracking-[0.4em] mb-4">Talent Discovered</p>
                           <h3 className="text-5xl font-black tracking-tighter italic">14,282</h3>
                           <p className="text-white/60 text-xs font-bold mt-2 uppercase tracking-widest flex items-center gap-2"><Target className="w-4 h-4" /> Global Scouting Nodes</p>
                       </div>
                       <div className="bg-white p-10 rounded-[3rem] border-4 border-slate-50 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">System Revenue</p>
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">₦ 84.2M</h3>
                            </div>
                            <div className="p-4 bg-emerald-50 rounded-2xl">
                                <TrendingUp className="w-8 h-8 text-emerald-600" />
                            </div>
                       </div>
                  </div>
              </div>

              {/* Module Entry Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { t: 'Register Club', d: 'Affiliate with state FA.', i: Flag, c: 'text-blue-600', bg: 'bg-blue-50' },
                    { t: 'Scout Network', d: 'Access deep talent data.', i: Target, c: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { t: 'Match Tickets', d: 'Secure entry protocols.', i: Calendar, c: 'text-purple-600', bg: 'bg-purple-50' },
                    { t: 'Academy License', d: 'Official certification core.', i: ShieldCheck, c: 'text-amber-600', bg: 'bg-amber-50' }
                  ].map(entry => (
                      <div key={entry.t} className="bg-white p-10 rounded-[3rem] border-4 border-slate-50 shadow-sm hover:shadow-2xl transition-all cursor-pointer group hover:-translate-y-2">
                          <div className={`p-5 ${entry.bg} rounded-[1.5rem] w-fit mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                              <entry.i className={`w-10 h-10 ${entry.c}`} />
                          </div>
                          <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{entry.t}</h4>
                          <p className="text-slate-400 mt-2 font-medium italic text-lg">{entry.d}</p>
                          <div className="mt-8 flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                              ACCESS NODE <ArrowRight className="w-4 h-4" />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {activeTab === 'scouting' && (
          <div className="space-y-16 animate-in fade-in duration-700">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                  <div>
                      <h3 className="text-5xl font-black text-slate-950 uppercase italic tracking-tighter">Neural Scouting.</h3>
                      <p className="text-xl text-slate-400 mt-4 font-light max-w-xl italic">Identifying the next generation of African excellence through state-verified biometrics and performance telemetry.</p>
                  </div>
                  <div className="bg-blue-50 px-8 py-4 rounded-full border border-blue-100 flex items-center gap-5">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
                      <span className="text-xs font-black text-blue-900 uppercase tracking-widest">34 Scouts Online</span>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {TALENT_POOL.map(athlete => (
                      <div key={athlete.id} className="bg-white rounded-[4rem] border-4 border-slate-50 p-10 shadow-sm hover:shadow-3xl transition-all group overflow-hidden flex flex-col md:flex-row gap-12 relative">
                          <div className="absolute top-0 right-0 p-8">
                               <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border border-emerald-100">
                                   <Flame className="w-3.5 h-3.5 fill-current" /> ELITE SIGNAL
                               </div>
                          </div>
                          
                          <div className="md:w-1/2 space-y-8 flex flex-col justify-between">
                               <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                                   <div className="relative">
                                       <div className="w-40 h-40 rounded-[3rem] overflow-hidden border-8 border-slate-50 shadow-2xl group-hover:border-emerald-50 transition-colors">
                                           <img src={athlete.image} className="w-full h-full object-cover" />
                                       </div>
                                       <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-xl">
                                           <p className="text-[9px] font-black uppercase tracking-widest opacity-50">Potential</p>
                                           <p className="text-xl font-black text-emerald-400 italic leading-none">{athlete.neuralPotential}%</p>
                                       </div>
                                   </div>
                                   <div>
                                       <h4 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">{athlete.name}</h4>
                                       <p className="text-emerald-600 text-xs font-black uppercase tracking-[0.4em] mt-2">{athlete.sport}</p>
                                       <div className="flex items-center gap-6 mt-6">
                                           <div className="text-center bg-slate-50 px-5 py-2 rounded-2xl">
                                               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Age</p>
                                               <p className="text-lg font-black text-slate-900">{athlete.age}</p>
                                           </div>
                                           <div className="text-center bg-slate-50 px-5 py-2 rounded-2xl">
                                               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Value</p>
                                               <p className="text-lg font-black text-emerald-600 italic">{athlete.marketValue}</p>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <button 
                                  onClick={() => startAuthorization('scout_link')}
                                  className="w-full py-6 bg-slate-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-emerald-600 shadow-2xl transition-all flex items-center justify-center gap-4 group/btn"
                               >
                                  <Target className="w-5 h-5 group-hover/btn:scale-110 transition-transform" /> Engage Discovery Link
                               </button>
                          </div>

                          <div className="md:w-1/2 bg-slate-50 rounded-[3rem] p-6 flex flex-col items-center justify-center shadow-inner relative group-hover:bg-white transition-colors duration-500 border border-slate-100">
                               <div className="w-full h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={athlete.stats}>
                                            <PolarGrid stroke="#cbd5e1" strokeWidth={2} />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                                            <Radar name={athlete.name} dataKey="A" stroke="#05a446" fill="#05a446" fillOpacity={0.6} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                               </div>
                               <div className="absolute bottom-6 flex gap-2">
                                   <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest">TELEMETRY: VERIFIED</div>
                               </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {activeTab === 'venues' && (
          <div className="space-y-16 animate-in fade-in duration-700">
               <div className="grid lg:grid-cols-2 gap-20 items-center">
                   <div className="space-y-10">
                        <h3 className="text-6xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">Smart<br/>Infras.</h3>
                        <p className="text-2xl text-slate-400 font-light italic leading-relaxed">Book state-of-the-art sports facilities directly via the ISEYAA Neural Ledger. Instant confirmation for verified academies.</p>
                        
                        <div className="space-y-6">
                            {[
                                { n: 'MKO Abiola Stadium', l: 'Abeokuta', s: 'Operational', c: '25k Nodes', i: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2070&auto=format&fit=crop' },
                                { n: 'Gateway International', l: 'Sagamu', s: 'Booked', c: '20k Nodes', i: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2038&auto=format&fit=crop' }
                            ].map(venue => (
                                <div key={venue.n} className="bg-white p-6 rounded-[2.5rem] border-4 border-slate-50 shadow-sm flex items-center gap-8 group hover:border-emerald-500 transition-all cursor-pointer">
                                    <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-xl shrink-0 group-hover:scale-105 transition-transform">
                                        <img src={venue.i} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-xl font-black uppercase italic text-slate-900">{venue.n}</h4>
                                            <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${venue.s === 'Operational' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{venue.s}</span>
                                        </div>
                                        <div className="flex items-center gap-6 mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> {venue.l}</span>
                                            <span className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-emerald-500" /> {venue.c}</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-emerald-500 transition-colors" />
                                </div>
                            ))}
                        </div>
                   </div>

                   <div className="bg-slate-950 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-3xl border-[15px] border-white h-[700px] flex flex-col justify-between">
                       <div className="absolute inset-0 opacity-20 pointer-events-none grayscale contrast-150">
                            <iframe width="100%" height="100%" frameBorder="0" style={{ border: 0 }} src={`https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY}&q=Abeokuta+Stadium`} allowFullScreen></iframe>
                       </div>
                       <div className="relative z-10">
                           <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] space-y-6">
                               <span className="text-emerald-400 font-black uppercase tracking-[0.5em] text-[10px]">Infrastructure Sync</span>
                               <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">State Arena Hub</h3>
                               <p className="text-slate-400 italic text-lg leading-relaxed">Neural GPS is currently tracking 14 active construction nodes across Ijebu and Ota sectors.</p>
                               <div className="grid grid-cols-2 gap-4">
                                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                       <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Status</p>
                                       <p className="text-xl font-black text-emerald-500">100% Ready</p>
                                   </div>
                                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                       <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Bookings</p>
                                       <p className="text-xl font-black text-blue-500">24 Pending</p>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <button 
                          onClick={() => startAuthorization('booking')}
                          className="relative z-10 w-full py-8 bg-emerald-600 text-white rounded-full font-black text-2xl hover:bg-emerald-500 shadow-3xl transition-all active:scale-95 uppercase tracking-widest italic"
                       >
                           Initialize Venue Protocol
                       </button>
                   </div>
               </div>
          </div>
      )}

      {activeTab === 'licensing' && (
          <div className="space-y-16 animate-in fade-in duration-700">
               <div className="max-w-5xl mx-auto text-center space-y-8">
                   <span className="text-emerald-600 font-black uppercase tracking-[0.6em] text-[10px]">ISEYAA IDENTITY CORE</span>
                   <h3 className="text-6xl md:text-8xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">Athlete Licensing.</h3>
                   <p className="text-2xl text-slate-400 font-light italic">Your digital passport to state-level competition. Verified by Biometric Ledger.</p>
               </div>

               <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* The Digital License Card */}
                    <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-3xl border-[15px] border-white group perspective">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-12 relative z-10">
                            <div className="flex items-center gap-4">
                                <Dna className="w-10 h-10 text-emerald-400" />
                                <div>
                                    <h4 className="text-xl font-black tracking-tighter uppercase italic">Ogun State</h4>
                                    <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-60">Athletic Identity</p>
                                </div>
                            </div>
                            <ShieldCheck className="w-10 h-10 text-emerald-500" />
                        </div>
                        <div className="flex items-center gap-10 mb-12 relative z-10">
                             <div className="w-40 h-40 rounded-[2.5rem] border-4 border-white/20 overflow-hidden shadow-2xl">
                                 <img src="https://i.pravatar.cc/200?u=athlete" className="w-full h-full object-cover" />
                             </div>
                             <div className="space-y-3">
                                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Official Delegate</p>
                                 <h3 className="text-4xl font-black uppercase italic tracking-tighter">Adewale Tunde</h3>
                                 <div className="flex gap-4">
                                     <span className="bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full font-black text-[9px] uppercase">Elite Tier 1</span>
                                     <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full font-black text-[9px] uppercase">Sprint / Track</span>
                                 </div>
                             </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex justify-between items-center relative z-10">
                             <div>
                                 <p className="text-[8px] font-black uppercase text-slate-500 mb-1">License ID</p>
                                 <p className="font-mono font-bold text-lg text-emerald-400">OG-ATH-8821-XP</p>
                             </div>
                             <div className="p-3 bg-white rounded-2xl">
                                <Play className="w-8 h-8 text-slate-900 fill-current" />
                             </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-10 rounded-[3rem] border-4 border-slate-50 shadow-xl space-y-10">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Registry Protocols</h4>
                            <div className="space-y-6">
                                {[
                                    { t: 'Biometric Sync', s: 'Verified', c: 'text-emerald-500' },
                                    { t: 'Medical Clearance', s: 'Active', c: 'text-emerald-500' },
                                    { t: 'Insurance Node', s: 'Linked', c: 'text-blue-500' },
                                    { t: 'Drug Protocol (WADA)', s: 'Compliant', c: 'text-emerald-500' }
                                ].map(p => (
                                    <div key={p.t} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0">
                                        <span className="font-bold text-slate-600 uppercase text-xs tracking-widest">{p.t}</span>
                                        <span className={`font-black uppercase text-[10px] tracking-[0.2em] ${p.c}`}>{p.s}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-emerald-600 shadow-2xl transition-all">Download Digital Wallet License</button>
                        </div>
                    </div>
               </div>
          </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
        .perspective { perspective: 1000px; }
      `}} />
    </div>
  );
};
