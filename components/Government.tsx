import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  PieChart, 
  ArrowUpRight, 
  Car, 
  ShoppingBag, 
  Bed, 
  Gavel,
  Lightbulb,
  Calendar,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const REVENUE_DATA = [
  { month: 'Jan', transport: 4000, commerce: 2400, tourism: 2400 },
  { month: 'Feb', transport: 3000, commerce: 1398, tourism: 2210 },
  { month: 'Mar', transport: 2000, commerce: 9800, tourism: 2290 },
  { month: 'Apr', transport: 2780, commerce: 3908, tourism: 2000 },
  { month: 'May', transport: 1890, commerce: 4800, tourism: 2181 },
  { month: 'Jun', transport: 2390, commerce: 3800, tourism: 2500 },
  { month: 'Jul', transport: 3490, commerce: 4300, tourism: 2100 },
];

const COMPLIANCE_DATA = [
  { name: 'Transport', verified: 85, unverified: 15 },
  { name: 'Hospitality', verified: 92, unverified: 8 },
  { name: 'Commerce', verified: 78, unverified: 22 },
  { name: 'Events', verified: 88, unverified: 12 },
];

export const Government: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <Building2 className="w-6 h-6 text-emerald-700" /> Government Command Centre
           </h2>
           <p className="text-slate-500">Real-time oversight of revenue, compliance, and economic policy.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">State Revenue (YTD)</span>
                <span className="font-mono font-bold text-xl">₦ 42.8B</span>
            </div>
            <div className="h-8 w-px bg-slate-700 mx-2"></div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +14.2%
                </span>
                <span className="text-xs text-slate-400">vs Last Year</span>
            </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full">Active</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">2.4M</h3>
              <p className="text-sm text-slate-500">Registered Taxpayers</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full">High</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">89.2%</h3>
              <p className="text-sm text-slate-500">Overall Compliance Rate</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                      <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-full">+124 Today</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">14.5k</h3>
              <p className="text-sm text-slate-500">Permits Issued (Nov)</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-amber-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full">Action Req.</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">42</h3>
              <p className="text-sm text-slate-500">Flagged Violations</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-emerald-600" /> Sector Revenue Analysis
                  </h3>
                  <select className="text-sm border-slate-200 border rounded-lg p-1 text-slate-600 bg-slate-50">
                      <option>Last 6 Months</option>
                      <option>Year to Date</option>
                  </select>
              </div>
              <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                              <linearGradient id="colorTransport" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorCommerce" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorTourism" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                              </linearGradient>
                          </defs>
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Area type="monotone" dataKey="transport" stackId="1" stroke="#3b82f6" fill="url(#colorTransport)" />
                          <Area type="monotone" dataKey="commerce" stackId="1" stroke="#10b981" fill="url(#colorCommerce)" />
                          <Area type="monotone" dataKey="tourism" stackId="1" stroke="#8b5cf6" fill="url(#colorTourism)" />
                          <Legend iconType="circle" />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
          </div>

          {/* AI Insights */}
          <div className="bg-slate-900 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 opacity-10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="font-bold text-lg">AI Policy Insights</h3>
              </div>

              <div className="space-y-4 relative z-10">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded uppercase">Transport Policy</span>
                          <span className="text-xs text-slate-400">2m ago</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">
                          Congestion detected in Sagamu Axis. Recommend allocating <strong className="text-emerald-400">15 additional buses</strong> during peak hours (4-7 PM) to optimize revenue.
                      </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded uppercase">Revenue Alert</span>
                          <span className="text-xs text-slate-400">1h ago</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">
                          Tourism levy collections are <strong className="text-red-400">down 8%</strong> in Ijebu-Ode. Suggest initiating automated compliance audit for hotels in the zone.
                      </p>
                  </div>
                  
                  <button className="w-full py-3 bg-emerald-600 rounded-lg text-sm font-bold hover:bg-emerald-500 transition-colors mt-2">
                      View All Recommendations
                  </button>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Compliance Breakdown */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-slate-700" /> Compliance Monitoring
               </h3>
               <div className="space-y-6">
                   {COMPLIANCE_DATA.map((item) => (
                       <div key={item.name}>
                           <div className="flex justify-between text-sm mb-2">
                               <span className="font-medium text-slate-700 flex items-center gap-2">
                                   {item.name === 'Transport' && <Car className="w-4 h-4 text-blue-500" />}
                                   {item.name === 'Commerce' && <ShoppingBag className="w-4 h-4 text-emerald-500" />}
                                   {item.name === 'Hospitality' && <Bed className="w-4 h-4 text-purple-500" />}
                                   {item.name === 'Events' && <Calendar className="w-4 h-4 text-amber-500" />}
                                   {item.name}
                               </span>
                               <span className="text-slate-500">{item.verified}% Verified</span>
                           </div>
                           <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                               <div className="h-full bg-emerald-500" style={{ width: `${item.verified}%` }}></div>
                               <div className="h-full bg-red-400" style={{ width: `${item.unverified}%` }}></div>
                           </div>
                       </div>
                   ))}
               </div>
               <div className="mt-6 pt-6 border-t border-slate-100 flex gap-4 text-xs text-slate-500 justify-center">
                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Compliant</span>
                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> Non-Compliant</span>
               </div>
          </div>

          {/* Live Remittance Log */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" /> Live Remittance Feed
                   </h3>
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                   </span>
               </div>
               <div className="space-y-4">
                   {[
                       { src: 'PAYE Tax - Dangote Cement', amt: '₦ 12,450,000', time: 'Just now', type: 'Corporate' },
                       { src: 'Vendor License - Mama Nkechi Store', amt: '₦ 5,000', time: '12s ago', type: 'SME' },
                       { src: 'Hotel Levy - Park Inn', amt: '₦ 124,000', time: '45s ago', type: 'Tourism' },
                       { src: 'Vehicle Reg - ABC-123-OG', amt: '₦ 15,000', time: '1m ago', type: 'Transport' },
                       { src: 'Land Use Charge - Plot 44', amt: '₦ 45,000', time: '2m ago', type: 'Land' },
                   ].map((tx, i) => (
                       <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0">
                           <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                   <ArrowUpRight className="w-4 h-4" />
                               </div>
                               <div>
                                   <p className="text-sm font-bold text-slate-800">{tx.src}</p>
                                   <p className="text-xs text-slate-500">{tx.type} • {tx.time}</p>
                               </div>
                           </div>
                           <span className="font-mono font-bold text-emerald-600">{tx.amt}</span>
                       </div>
                   ))}
               </div>
          </div>
      </div>
    </div>
  );
};