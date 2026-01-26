import React, { useState } from 'react';
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
  AlertCircle
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

interface HealthPlan {
  id: string;
  name: string;
  provider: string;
  status: 'Active' | 'Expired' | 'Pending';
  expiry: string;
  type: 'Citizen' | 'Athlete' | 'Tourist';
}

const HEALTH_DATA = [
  { month: 'Jan', visits: 2 },
  { month: 'Feb', visits: 1 },
  { month: 'Mar', visits: 0 },
  { month: 'Apr', visits: 3 },
  { month: 'May', visits: 1 },
  { month: 'Jun', visits: 0 },
];

export const Health: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hmo' | 'services' | 'emergency'>('hmo');
  const [showEventPass, setShowEventPass] = useState(false);

  const activePlan: HealthPlan = {
    id: 'OG-HMO-9921',
    name: 'Ogun Standard Care',
    provider: 'State Health Agency',
    status: 'Active',
    expiry: 'Dec 31, 2024',
    type: 'Citizen'
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Health & Welfare</h2>
           <p className="text-slate-500">HMO management, emergency response, and medical records.</p>
        </div>
        
        <div className="flex gap-2">
            <button 
                onClick={() => setShowEventPass(!showEventPass)}
                className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
                <ShieldPlus className="w-4 h-4 text-purple-600" /> Event Health Cover
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm animate-pulse">
                <Ambulance className="w-4 h-4" /> Emergency
            </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: HMO Card & Vitals */}
        <div className="space-y-6">
            {/* Digital HMO Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden min-h-[220px]">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-20 -translate-y-10 translate-x-10"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Heart className="w-6 h-6 text-emerald-400 fill-current" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-none">OGUN HEALTH</h3>
                            <p className="text-[10px] uppercase tracking-wider opacity-70">State Insurance Scheme</p>
                        </div>
                    </div>
                    <div className="bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 flex items-center gap-1">
                        <Activity className="w-3 h-3" /> {activePlan.status}
                    </div>
                </div>

                <div className="space-y-1 relative z-10">
                    <p className="text-xs uppercase opacity-60">Beneficiary</p>
                    <h2 className="text-xl font-bold tracking-wide">ADEWALE TUNDE</h2>
                </div>

                <div className="mt-6 flex justify-between items-end relative z-10">
                    <div>
                        <p className="text-xs uppercase opacity-60">Policy Number</p>
                        <p className="font-mono font-medium">{activePlan.id}</p>
                    </div>
                    <div className="text-right">
                         <p className="text-xs uppercase opacity-60">Expires</p>
                         <p className="font-medium">{activePlan.expiry}</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 flex flex-col items-center gap-2 text-center transition-colors">
                        <UserPlus className="w-5 h-5 text-blue-600" />
                        <span className="text-xs font-medium text-slate-600">Add Dependent</span>
                    </button>
                    <button className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 flex flex-col items-center gap-2 text-center transition-colors">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-medium text-slate-600">Appointments</span>
                    </button>
                    <button className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 flex flex-col items-center gap-2 text-center transition-colors">
                        <FileText className="w-5 h-5 text-amber-600" />
                        <span className="text-xs font-medium text-slate-600">History</span>
                    </button>
                    <button className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 flex flex-col items-center gap-2 text-center transition-colors">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                        <span className="text-xs font-medium text-slate-600">Renew Plan</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Center/Right: Services & Content */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Event Health Cover Banner (Conditional) */}
            {showEventPass && (
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                                <ShieldPlus className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-purple-900">Event & Travel Health Cover</h3>
                                <p className="text-sm text-purple-700">Short-term protection for tourists and athletes.</p>
                            </div>
                        </div>
                        <button onClick={() => setShowEventPass(false)} className="text-purple-400 hover:text-purple-700">✕</button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-purple-100 hover:border-purple-300 cursor-pointer transition-colors">
                            <h4 className="font-bold text-slate-800 mb-1">Single Event</h4>
                            <p className="text-xs text-slate-500 mb-3">24-hour coverage for festivals or matches.</p>
                            <span className="text-emerald-600 font-bold">₦ 500</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-100 hover:border-purple-300 cursor-pointer transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-bl">Popular</div>
                            <h4 className="font-bold text-slate-800 mb-1">Tourist Weekly</h4>
                            <p className="text-xs text-slate-500 mb-3">7-day comprehensive emergency cover.</p>
                            <span className="text-emerald-600 font-bold">₦ 2,500</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-100 hover:border-purple-300 cursor-pointer transition-colors">
                            <h4 className="font-bold text-slate-800 mb-1">Athlete Season</h4>
                            <p className="text-xs text-slate-500 mb-3">Coverage for entire league duration.</p>
                            <span className="text-emerald-600 font-bold">₦ 15,000</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Find Care */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Stethoscope className="w-5 h-5 text-emerald-600" /> Find Nearby Care
                    </h3>
                    <button className="text-sm text-emerald-600 font-medium hover:underline">View Map</button>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                        <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop')" }}></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-slate-900">Federal Medical Centre, Abeokuta</h4>
                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">Open 24h</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Idi-Aba, Abeokuta</p>
                            <div className="flex items-center gap-3 mt-3">
                                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">General Medicine</span>
                                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">Pediatrics</span>
                                <span className="text-xs text-slate-400">+4 more</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                        <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')" }}></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-slate-900">Babcock University Teaching Hospital</h4>
                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">Open 24h</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Ilishan-Remo</p>
                            <div className="flex items-center gap-3 mt-3">
                                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">Specialist</span>
                                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">Surgery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Health Analytics */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-bold text-slate-900">Health Visits Analytics</h3>
                        <p className="text-xs text-slate-500">Frequency of medical consultations (2024)</p>
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold">
                        Compliance: 100%
                    </div>
                </div>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={HEALTH_DATA}>
                            <defs>
                                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Area type="monotone" dataKey="visits" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};