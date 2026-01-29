import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  CreditCard, 
  MapPin, 
  Phone, 
  Calendar, 
  ShieldPlus, 
  FileText,
  UserPlus,
  Stethoscope,
  Ambulance,
  ChevronRight,
  AlertCircle,
  Video,
  MessageCircle,
  Clock,
  CheckCircle2,
  Lock,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Download,
  Eye,
  ShieldCheck,
  Zap,
  Droplets,
  Thermometer,
  Brain,
  MoreHorizontal,
  Star
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { VendorChat } from './VendorChat.tsx';

interface HealthPlan {
  id: string;
  name: string;
  provider: string;
  status: 'Active' | 'Expired' | 'Pending';
  expiry: string;
  type: 'Citizen' | 'Athlete' | 'Tourist';
  coverage: string[];
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  avatar: string;
  status: 'Online' | 'Offline' | 'In Consultation';
  rating: number;
  experience: string;
}

interface MedicalRecord {
  id: string;
  type: 'Lab Result' | 'Prescription' | 'Doctor Note' | 'Imaging';
  title: string;
  date: string;
  doctor: string;
  fileSize: string;
}

const HEALTH_DATA = [
  { month: 'Jan', bp: 120, heart: 72 },
  { month: 'Feb', bp: 118, heart: 75 },
  { month: 'Mar', bp: 122, heart: 70 },
  { month: 'Apr', bp: 115, heart: 82 },
  { month: 'May', bp: 119, heart: 74 },
  { month: 'Jun', bp: 121, heart: 71 },
];

const AVAILABLE_DOCTORS: Doctor[] = [
  { id: 'd1', name: 'Dr. Olumide Koker', specialty: 'Cardiologist', hospital: 'FMC Abeokuta', avatar: 'https://i.pravatar.cc/150?u=d1', status: 'Online', rating: 4.9, experience: '12 yrs' },
  { id: 'd2', name: 'Dr. Sarah Alabi', specialty: 'Pediatrician', hospital: 'Babcock Teaching', avatar: 'https://i.pravatar.cc/150?u=d2', status: 'In Consultation', rating: 4.8, experience: '8 yrs' },
  { id: 'd3', name: 'Dr. James Okoro', specialty: 'General Practitioner', hospital: 'State Hospital, Ijebu-Ode', avatar: 'https://i.pravatar.cc/150?u=d3', status: 'Online', rating: 4.7, experience: '15 yrs' },
  { id: 'd4', name: 'Dr. Funke Adeyemi', specialty: 'Gynecologist', hospital: 'Mercy Group', avatar: 'https://i.pravatar.cc/150?u=d4', status: 'Offline', rating: 4.9, experience: '10 yrs' },
];

const MEDICAL_RECORDS: MedicalRecord[] = [
  { id: 'r1', type: 'Prescription', title: 'Antimalarial Protocol', date: 'Nov 12, 2024', doctor: 'Dr. Sarah Alabi', fileSize: '1.2 MB' },
  { id: 'r2', type: 'Lab Result', title: 'Full Blood Count (FBC)', date: 'Oct 28, 2024', doctor: 'Medics Lab Ota', fileSize: '4.5 MB' },
  { id: 'r3', type: 'Imaging', title: 'Chest X-Ray Digital Scan', date: 'Sep 15, 2024', doctor: 'Radiology Hub ABK', fileSize: '12.8 MB' },
];

export const Health: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'telemedicine' | 'vault' | 'hmo'>('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const activePlan: HealthPlan = {
    id: 'OG-HMO-9921',
    name: 'Ogun Standard Care',
    provider: 'State Health Agency',
    status: 'Active',
    expiry: 'Dec 31, 2024',
    type: 'Citizen',
    coverage: ['General Consultation', 'Emergency Care', 'Maternity', 'Basic Diagnostics']
  };

  const startConsultation = (doctor: Doctor) => {
    setIsAuthorizing(true);
    setTimeout(() => {
        setIsAuthorizing(false);
        setSelectedDoctor(doctor);
        setIsChatOpen(true);
    }, 1500);
  };

  return (
    <div className="p-6 md:p-12 max-w-[1600px] mx-auto space-y-12 animate-in fade-in duration-700">
      
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
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Secure Linkup</h2>
                    <p className="text-emerald-500 font-bold uppercase tracking-[0.4em] text-xs">Biometric Ledger Synchronization...</p>
                  </div>
              </div>
          </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-l-4 border-emerald-500 pl-8">
        <div>
           <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.6em] mb-4 block">Unified Health Ecosystem</span>
           <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.85]">Neural<br/>Health.</h2>
        </div>
        
        <div className="flex flex-wrap gap-4">
            <button className="bg-white border-4 border-slate-50 text-red-600 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:border-red-500 transition-all flex items-center gap-3 animate-pulse">
                <Ambulance className="w-5 h-5" /> EMERGENCY SOS
            </button>
            <button 
                onClick={() => setActiveTab('hmo')}
                className="bg-emerald-600 text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-emerald-700 shadow-2xl shadow-emerald-600/30 transition-all active:scale-95 flex items-center gap-3"
            >
                Authorize Policy <ShieldCheck className="w-4 h-4 fill-white" />
            </button>
        </div>
      </div>

      <div className="flex bg-slate-100 p-2 rounded-full border-4 border-slate-50 shadow-inner w-fit overflow-x-auto scrollbar-hide">
          {[
            { id: 'overview', icon: Activity, label: 'OVERVIEW' },
            { id: 'telemedicine', icon: Video, label: 'TELEMEDICINE' },
            { id: 'vault', icon: Lock, label: 'MEDICAL VAULT' },
            { id: 'hmo', icon: ShieldPlus, label: 'HMO & POLICY' }
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
                  <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl border-[10px] border-white group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-10 -translate-y-20 translate-x-20 group-hover:scale-125 transition-transform duration-1000"></div>
                      <div className="flex justify-between items-start mb-12 relative z-10">
                          <div className="p-4 bg-white/10 rounded-[1.5rem] backdrop-blur-xl border border-white/20">
                              <Heart className="w-8 h-8 text-emerald-400 fill-current" />
                          </div>
                          <span className="bg-emerald-50 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Active Signal</span>
                      </div>
                      <div className="space-y-2 mb-12 relative z-10">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">Primary Beneficiary</p>
                          <h3 className="text-4xl font-black uppercase italic tracking-tighter">Adewale Tunde</h3>
                          <p className="font-mono text-emerald-400/60 font-bold tracking-widest">{activePlan.id}</p>
                      </div>
                      <div className="flex justify-between items-end relative z-10 border-t border-white/5 pt-8">
                          <div>
                              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Standard Plan</p>
                              <p className="text-xl font-bold uppercase italic">{activePlan.name}</p>
                          </div>
                          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                              <ShieldCheck className="w-6 h-6 text-emerald-400" />
                          </div>
                      </div>
                  </div>

                  <div className="lg:col-span-2 bg-white rounded-[3.5rem] p-12 border-4 border-slate-50 shadow-sm relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                       <div className="flex justify-between items-center mb-12">
                           <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight flex items-center gap-4">
                               <Activity className="w-8 h-8 text-emerald-600" /> Neural Bio-Scan
                           </h3>
                           <div className="flex items-center gap-4">
                               <div className="px-6 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-black text-emerald-600 uppercase tracking-widest">Optimal Sync</div>
                               <button className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-all"><MoreHorizontal className="w-5 h-5 text-slate-400" /></button>
                           </div>
                       </div>
                       <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={HEALTH_DATA}>
                                    <defs>
                                        <linearGradient id="bioChart" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#05A446" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#05A446" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} dy={15} />
                                    <YAxis hide />
                                    <Tooltip contentStyle={{ borderRadius: '2rem', border: 'none', boxShadow: '0 40px 80px -12px rgb(0 0 0 / 0.2)', fontWeight: 'bold' }} />
                                    <Area type="monotone" dataKey="bp" stroke="#05A446" strokeWidth={6} fillOpacity={1} fill="url(#bioChart)" />
                                    <Area type="monotone" dataKey="heart" stroke="#3b82f6" strokeWidth={6} fillOpacity={0} />
                                </AreaChart>
                            </ResponsiveContainer>
                       </div>
                       <div className="grid grid-cols-4 gap-10 mt-12 border-t border-slate-50 pt-12">
                            <div className="space-y-1">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Blood Pressure</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">121/78</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Resting Heart</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">72 BPM</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Blood Oxygen</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">99%</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Neural Stress</p>
                                <p className="text-3xl font-black text-emerald-600 tracking-tighter uppercase italic">Low</p>
                            </div>
                       </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {[
                    { t: 'Instant Consult', d: 'Video link with doctor.', i: Video, c: 'text-blue-600', bg: 'bg-blue-50', act: () => setActiveTab('telemedicine') },
                    { t: 'Medical Vault', d: 'Secure record storage.', i: Lock, c: 'text-purple-600', bg: 'bg-purple-50', act: () => setActiveTab('vault') },
                    { t: 'Add Dependent', d: 'Register family node.', i: UserPlus, c: 'text-amber-600', bg: 'bg-amber-50', act: () => {} },
                    { t: 'HMO Benefits', d: 'Check your coverage.', i: ShieldPlus, c: 'text-emerald-600', bg: 'bg-emerald-50', act: () => setActiveTab('hmo') }
                  ].map(action => (
                    <div 
                        key={action.t} 
                        onClick={action.act}
                        className="bg-white p-10 rounded-[3rem] border-4 border-slate-50 shadow-sm hover:shadow-2xl transition-all cursor-pointer group hover:-translate-y-2"
                    >
                        <div className={`p-5 ${action.bg} rounded-[1.5rem] w-fit mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                            <action.i className={`w-10 h-10 ${action.c}`} />
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{action.t}</h4>
                        <p className="text-slate-400 mt-2 font-medium italic text-lg">{action.d}</p>
                        <div className="mt-8 flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            ENGAGE NODE <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                  ))}
              </div>
          </div>
      )}

      {activeTab === 'telemedicine' && (
          <div className="space-y-16 animate-in fade-in duration-700">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                  <div>
                      <h3 className="text-5xl font-black text-slate-950 uppercase italic tracking-tighter">Live Docs.</h3>
                      <p className="text-xl text-slate-400 mt-4 font-light max-w-xl italic">Instant encrypted video Link with state-verified medical specialists.</p>
                  </div>
                  <div className="bg-blue-50 px-8 py-4 rounded-full border border-blue-100 flex items-center gap-5">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
                      <span className="text-xs font-black text-blue-900 uppercase tracking-widest">12 Specialists Online</span>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                  {AVAILABLE_DOCTORS.map(doc => (
                      <div key={doc.id} className="bg-white rounded-[3.5rem] border-4 border-slate-50 p-8 shadow-sm hover:shadow-3xl transition-all group relative overflow-hidden">
                          <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[9px] font-black uppercase tracking-widest ${doc.status === 'Online' ? 'bg-emerald-500 text-white' : doc.status === 'In Consultation' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                              {doc.status}
                          </div>
                          <div className="flex flex-col items-center text-center space-y-6">
                               <div className="relative">
                                    <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-8 border-slate-50 group-hover:border-emerald-50 transition-colors shadow-2xl">
                                        <img src={doc.avatar} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-xl border border-slate-50">
                                        <div className="flex items-center gap-1 text-amber-500 font-black text-xs">
                                            <Star className="w-3.5 h-3.5 fill-current" /> {doc.rating}
                                        </div>
                                   </div>
                               </div>
                               <div>
                                   <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{doc.name}</h4>
                                   <p className="text-emerald-600 text-xs font-black uppercase tracking-widest mt-2">{doc.specialty}</p>
                                   <p className="text-slate-400 text-[10px] font-bold mt-2 uppercase flex items-center justify-center gap-2 tracking-widest"><MapPin className="w-3.5 h-3.5" /> {doc.hospital}</p>
                               </div>
                               <div className="w-full pt-6 border-t border-slate-50 flex gap-4">
                                   <button 
                                        onClick={() => startConsultation(doc)}
                                        className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group/btn"
                                   >
                                       <Video className="w-4 h-4 group-hover/btn:scale-110" /> VIDEO LINK
                                   </button>
                                   <button 
                                        onClick={() => { setSelectedDoctor(doc); setIsChatOpen(true); }}
                                        className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                                   >
                                       <MessageCircle className="w-5 h-5" />
                                   </button>
                               </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {selectedDoctor && <VendorChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} vendorName={selectedDoctor.name} vendorAvatar={selectedDoctor.avatar} />}
    </div>
  );
};