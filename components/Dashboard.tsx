
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Users, 
  CreditCard, 
  Ticket, 
  TrendingUp, 
  AlertCircle,
  // Added missing Zap icon import
  Zap
} from 'lucide-react';
import { StatCardProps, AppView } from '../types';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

const data = [
  { name: 'Mon', revenue: 4000, users: 2400, amt: 2400 },
  { name: 'Tue', revenue: 3000, users: 1398, amt: 2210 },
  { name: 'Wed', revenue: 2000, users: 9800, amt: 2290 },
  { name: 'Thu', revenue: 2780, users: 3908, amt: 2000 },
  { name: 'Fri', revenue: 1890, users: 4800, amt: 2181 },
  { name: 'Sat', revenue: 2390, users: 3800, amt: 2500 },
  { name: 'Sun', revenue: 3490, users: 4300, amt: 2100 },
];

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendUp, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between group hover:border-emerald-500 transition-all">
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      {trend && (
        <div className={`flex items-center mt-2 text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
          {trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1 rotate-180" />}
          {trend}
        </div>
      )}
    </div>
    <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-white group-hover:scale-110 transition-transform`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Command Center</h2>
          <p className="text-slate-500">Real-time pulse of your Ogun State digital presence.</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                Export Activity
            </button>
            <button 
                onClick={() => onNavigate(AppView.WALLET)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
            >
                Add Wallet Funds
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Personal Wallet" 
          value="₦ 245,200" 
          trend="+₦12.5k today" 
          trendUp={true} 
          icon={CreditCard} 
          color="bg-emerald-600" 
        />
        <StatCard 
          title="State Compliance" 
          value="Tier 3" 
          trend="Fully Verified" 
          trendUp={true} 
          icon={Users} 
          color="bg-blue-600" 
        />
        <StatCard 
          title="Active Bookings" 
          value="3" 
          trend="1 trip, 2 events" 
          trendUp={true} 
          icon={Ticket} 
          color="bg-purple-600" 
        />
        <StatCard 
          title="Platform Alerts" 
          value="0" 
          trend="Secure Status" 
          trendUp={true} 
          icon={AlertCircle} 
          color="bg-amber-500" 
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Economic Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Your Economic Activity</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#05A446" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#05A446" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} 
                />
                <Area type="monotone" dataKey="revenue" stroke="#05A446" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Messages */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-20"></div>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" /> Platform Insights
          </h3>
          <div className="space-y-6">
             <div className="border-l-2 border-emerald-500 pl-4 py-1">
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Transport</p>
                <p className="text-sm text-slate-300 mt-1">Bus routes optimized. Save 15 mins on your morning commute.</p>
             </div>
             <div className="border-l-2 border-amber-500 pl-4 py-1">
                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Billing</p>
                <p className="text-sm text-slate-300 mt-1">Utility levy for Nov has been generated. Pay now to avoid penalty.</p>
             </div>
             <div className="border-l-2 border-blue-500 pl-4 py-1">
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Culture</p>
                <p className="text-sm text-slate-300 mt-1">New Adire artisans joined the marketplace today. 12% discount active.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-[2rem] p-8 text-white shadow-xl hover:scale-[1.02] transition-transform cursor-pointer">
              <h3 className="font-bold text-xl mb-2">Pay Utility Bills</h3>
              <p className="text-emerald-100/70 text-sm mb-6">Power, water, and waste levies indexed to your digital ID.</p>
              <button 
                onClick={() => onNavigate(AppView.UTILITIES)}
                className="bg-white text-emerald-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors w-full flex items-center justify-center gap-2"
              >
                  Authorize Payment <Zap className="w-4 h-4" />
              </button>
          </div>
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:border-emerald-200 transition-all">
              <h3 className="font-bold text-xl mb-2 text-slate-800">Health & HMO</h3>
              <p className="text-slate-500 text-sm mb-6">Ogun Standard Care Policy #9921 expires in 45 days.</p>
              <button 
                onClick={() => onNavigate(AppView.HEALTH)}
                className="border-2 border-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors w-full"
              >
                  Review My Plan
              </button>
          </div>
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:border-emerald-200 transition-all">
              <h3 className="font-bold text-xl mb-2 text-slate-800">Discovery</h3>
              <p className="text-slate-500 text-sm mb-6">New heritage artifacts added to Tourism Digital Archive.</p>
              <button 
                onClick={() => onNavigate(AppView.TOURISM)}
                className="border-2 border-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors w-full"
              >
                  Start Exploring
              </button>
          </div>
      </div>
    </div>
  );
};
