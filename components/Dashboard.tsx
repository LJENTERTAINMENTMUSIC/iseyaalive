import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Users, CreditCard, Ticket, TrendingUp, AlertCircle, Zap, ShieldCheck, ArrowUpRight, Globe, Activity 
} from 'lucide-react';
import { StatCardProps, AppView } from '../types.ts';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

const data = [
  { name: 'MON', value: 4200 }, { name: 'TUE', value: 3100 }, { name: 'WED', value: 5800 },
  { name: 'THU', value: 4900 }, { name: 'FRI', value: 7200 }, { name: 'SAT', value: 8400 },
  { name: 'SUN', value: 6500 },
];

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendUp, icon: Icon, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-2 border-slate-50 flex items-start justify-between group hover:border-emerald-500 hover:shadow-2xl transition-all duration-500">
    <div className="space-y-4">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{title}</p>
      <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">{value}</h3>
      {trend && (
        <div className={`flex items-center text-[10px] font-black uppercase tracking-widest ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
          <div className={`p-1 rounded-full mr-2 ${trendUp ? 'bg-emerald-50' : 'bg-red-50'}`}>
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
          </div>
          {trend}
        </div>
      )}
    </div>
    <div className={`p-5 rounded-[1.5rem] ${color} bg-opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
      <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="p-6 md:p-12 space-y-12 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* Header OS Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-l-4 border-emerald-500 pl-8">
        <div>
            <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.6em] mb-4 block">Command & Control Hub</span>
            <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.85]">Neural<br/>Center.</h2>
        </div>
        <div className="flex flex-wrap gap-4">
            <button className="bg-white border-4 border-slate-50 text-slate-600 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:border-emerald-500 transition-all flex items-center gap-3">
                <Globe className="w-4 h-4" /> Global Sync Log
            </button>
            <button 
                onClick={() => onNavigate(AppView.WALLET)}
                className="bg-emerald-600 text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-emerald-700 shadow-2xl shadow-emerald-600/30 transition-all active:scale-95 flex items-center gap-3"
            >
                Authorize Ledger <Zap className="w-4 h-4 fill-white" />
            </button>
        </div>
      </div>

      {/* KPI Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Wallet Balance" value="₦ 245,200" trend="+12.5% vs NOV" trendUp={true} icon={CreditCard} color="bg-emerald-600" />
        <StatCard title="Security Tier" value="TIER 3" trend="Verified Status" trendUp={true} icon={ShieldCheck} color="bg-blue-600" />
        <StatCard title="Active Signals" value="3 NODES" trend="All Systems Optimal" trendUp={true} icon={Activity} color="bg-purple-600" />
        <StatCard title="Global Rank" value="#402" trend="Top 2% Active" trendUp={true} icon={Globe} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Economic Chart Hub */}
        <div className="xl:col-span-2 bg-white p-10 md:p-16 rounded-[4rem] shadow-sm border-4 border-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex justify-between items-center mb-16 relative z-10">
              <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Economic Activity</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2">Real-time Pulse Visualization</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-full border border-emerald-100">
                  <ArrowUpRight className="w-6 h-6 text-emerald-600" />
              </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="dashRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#05A446" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#05A446" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} dy={20} />
                <YAxis hide />
                <Tooltip 
                    contentStyle={{ borderRadius: '2rem', border: 'none', boxShadow: '0 50px 100px -20px rgb(0 0 0 / 0.2)', fontWeight: 'black', textTransform: 'uppercase', fontSize: '10px' }} 
                />
                <Area type="monotone" dataKey="value" stroke="#05A446" strokeWidth={6} fillOpacity={1} fill="url(#dashRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Intelligence Stream */}
        <div className="bg-slate-950 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-3xl border-[15px] border-white">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 rounded-full blur-[80px] opacity-10 animate-pulse"></div>
          <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-8 relative z-10">
            <Zap className="w-8 h-8 text-emerald-400 fill-current" />
            <div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Neural Stream</h3>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.4em] mt-1">Status: Operational</p>
            </div>
          </div>
          <div className="space-y-10 relative z-10">
             {[
               { module: 'TRANSPORT', color: 'text-blue-400', msg: 'Neural Grid optimized 12 routes in Panseke Axis. Efficiency +18%.' },
               { module: 'REVENUE', color: 'text-emerald-400', msg: 'Land use charge signal detected. Authorization pending in Wallet.' },
               { module: 'SECURITY', color: 'text-amber-400', msg: 'No threat signals detected within 5km radius of your Home Node.' }
             ].map((log, i) => (
                <div key={i} className="flex gap-6 group cursor-pointer">
                    <div className={`shrink-0 w-1.5 h-12 rounded-full ${log.color.replace('text-', 'bg-')} opacity-30 group-hover:opacity-100 transition-all`} />
                    <div>
                        <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${log.color}`}>{log.module}</p>
                        <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed italic">{log.msg}</p>
                    </div>
                </div>
             ))}
          </div>
          <button className="w-full mt-16 py-6 border-2 border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Expand Logs</button>
        </div>
      </div>

      {/* OS Quick Access Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { id: AppView.UTILITIES, title: 'Pay Utilities', desc: 'Secure power & waste levies.', icon: Zap, theme: 'dark' },
            { id: AppView.HEALTH, title: 'Health Portal', desc: 'Manage state HMO policies.', icon: Users, theme: 'light' },
            { id: AppView.TOURISM, title: 'Explore Ogun', desc: 'Heritage archive discovery.', icon: Globe, theme: 'light' }
          ].map(mod => (
            <div 
              key={mod.id}
              onClick={() => onNavigate(mod.id)}
              className={`p-10 rounded-[3rem] cursor-pointer transition-all hover:-translate-y-4 group ${mod.theme === 'dark' ? 'bg-slate-900 text-white shadow-3xl' : 'bg-white border-4 border-slate-50 text-slate-900 shadow-xl shadow-slate-200/20'}`}
            >
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${mod.theme === 'dark' ? 'bg-white/10' : 'bg-emerald-50 text-emerald-600'}`}>
                    <mod.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{mod.title}</h3>
                <p className="text-slate-400 mt-4 text-lg font-light italic">{mod.desc}</p>
                <div className="mt-10 flex items-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Initialize Protocol <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>
          ))}
      </div>
    </div>
  );
};