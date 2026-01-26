import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Activity, 
  ShieldAlert, 
  Zap, 
  Globe, 
  Server, 
  Wifi, 
  Lock, 
  Car, 
  ShoppingBag, 
  Heart, 
  AlertTriangle,
  CheckCircle,
  Terminal,
  Brain,
  Radio,
  Share2,
  Map,
  Eye,
  AlertOctagon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  YAxis, 
  XAxis
} from 'recharts';

interface LogEntry {
  id: number;
  time: string;
  module: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'critical';
}

const MOCK_TRAFFIC_DATA = [
  { time: '1', val: 400 }, { time: '2', val: 300 }, { time: '3', val: 550 },
  { time: '4', val: 450 }, { time: '5', val: 600 }, { time: '6', val: 700 },
  { time: '7', val: 650 }, { time: '8', val: 800 }, { time: '9', val: 750 },
];

const MOCK_TX_DATA = [
  { time: '1', val: 2000 }, { time: '2', val: 4000 }, { time: '3', val: 3000 },
  { time: '4', val: 6000 }, { time: '5', val: 5000 }, { time: '6', val: 8000 },
  { time: '7', val: 7500 }, { time: '8', val: 9000 }, { time: '9', val: 8500 },
];

export const Automation: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, time: '14:20:05', module: 'TRANS', message: 'Traffic congestion detected at Panseke Bridge. Rerouting 12 buses.', type: 'warning' },
    { id: 2, time: '14:20:01', module: 'FIN', message: 'Verified large transaction: ₦5.2M (Ogun Construction Ltd).', type: 'success' },
    { id: 3, time: '14:19:55', module: 'SEC', message: 'Identity Verification complete for User #88291.', type: 'info' },
    { id: 4, time: '14:19:42', module: 'HEALTH', message: 'Ambulance dispatched to Iyana Mortuary Axis. ETA 4 mins.', type: 'critical' },
  ]);

  const [activeNodes, setActiveNodes] = useState(1420);
  const [latency, setLatency] = useState(12);

  // Simulate Live System
  useEffect(() => {
    const timer = setInterval(() => {
      // Update stats
      setActiveNodes(prev => prev + Math.floor(Math.random() * 5) - 2);
      setLatency(prev => Math.max(8, Math.min(25, prev + Math.floor(Math.random() * 3) - 1)));

      // Add Random Log
      const modules = ['TRANS', 'FIN', 'SEC', 'HEALTH', 'EVENT', 'TOURISM'];
      const actions = [
        { msg: 'Optimizing server load for Cultural Festival ticketing.', type: 'info' },
        { msg: 'Blocked 3 fraudulent login attempts from IP 192.168.x.x', type: 'warning' },
        { msg: 'Processed 450 tax remittances successfully.', type: 'success' },
        { msg: 'Hotel occupancy alert: Abeokuta South at 92%.', type: 'info' },
        { msg: 'Weather warning: Heavy rain predicted in Ijebu. Notifying farmers.', type: 'warning' },
        { msg: 'Coordinating security patrol for stadium exit routes.', type: 'info' }
      ];
      
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomModule = modules[Math.floor(Math.random() * modules.length)];

      const newLog: LogEntry = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
        module: randomModule,
        message: randomAction.msg,
        type: randomAction.type as any
      };

      setLogs(prev => [newLog, ...prev].slice(0, 8));
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-950 min-h-full text-slate-200 p-6 font-mono">
      {/* Top Bar: System Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/50">
               <Brain className="w-8 h-8 text-emerald-500 animate-pulse" />
           </div>
           <div>
               <h1 className="text-2xl font-bold text-white tracking-widest">SUPER AI CORE</h1>
               <p className="text-xs text-emerald-500 font-bold tracking-[0.2em] flex items-center gap-2">
                   SYSTEM ONLINE <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
               </p>
           </div>
        </div>

        <div className="flex gap-4 md:gap-8 text-xs">
            <div className="flex flex-col items-end">
                <span className="text-slate-500 uppercase">Active Neural Nodes</span>
                <span className="text-xl font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-500" /> {activeNodes.toLocaleString()}
                </span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-slate-500 uppercase">System Latency</span>
                <span className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" /> {latency}ms
                </span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-slate-500 uppercase">Threat Level</span>
                <span className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> LOW
                </span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column: Input Streams (Sector Monitors) */}
          <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Active Input Streams
              </h3>

              {/* Mobility Stream */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 text-blue-400">
                          <Car className="w-4 h-4" />
                          <span className="text-sm font-bold">Mobility Grid</span>
                      </div>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">Live</span>
                  </div>
                  <div className="h-16 mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_TRAFFIC_DATA}>
                            <Area type="monotone" dataKey="val" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                        </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                      <span>Active Rides: 1,240</span>
                      <span>Congestion: <span className="text-yellow-500">Med</span></span>
                  </div>
              </div>

              {/* Commerce Stream */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 text-emerald-400">
                          <ShoppingBag className="w-4 h-4" />
                          <span className="text-sm font-bold">Commerce Flow</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Live</span>
                  </div>
                  <div className="h-16 mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_TX_DATA}>
                            <Area type="monotone" dataKey="val" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                        </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                      <span>Vol: ₦42M/hr</span>
                      <span>Fraud Checks: <span className="text-emerald-500">100%</span></span>
                  </div>
              </div>

              {/* Health Stream */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl relative overflow-hidden group hover:border-red-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 text-red-400">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm font-bold">Bio-Signals</span>
                      </div>
                      <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">Live</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="bg-slate-800/50 p-2 rounded text-center">
                          <div className="text-xs text-slate-500">ER Cases</div>
                          <div className="text-lg font-bold text-white">12</div>
                      </div>
                      <div className="bg-slate-800/50 p-2 rounded text-center">
                          <div className="text-xs text-slate-500">Bed Avail</div>
                          <div className="text-lg font-bold text-emerald-400">85%</div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Center Column: The Brain Visualization & Logs */}
          <div className="lg:col-span-2 space-y-6">
              
              {/* Central Neural Map */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 h-[400px] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 opacity-20" 
                      style={{ 
                          backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', 
                          backgroundSize: '40px 40px' 
                      }}>
                  </div>

                  {/* Central Node */}
                  <div className="relative z-10">
                      <div className="w-32 h-32 bg-emerald-500/10 rounded-full border border-emerald-500/30 flex items-center justify-center relative animate-pulse">
                          <div className="w-20 h-20 bg-emerald-500/20 rounded-full border border-emerald-500/50 flex items-center justify-center">
                              <Brain className="w-10 h-10 text-emerald-400" />
                          </div>
                          {/* Orbiting Satellites */}
                          <div className="absolute w-full h-full animate-[spin_10s_linear_infinite] border border-dashed border-slate-600 rounded-full"></div>
                          <div className="absolute w-[140%] h-[140%] animate-[spin_15s_linear_infinite_reverse] border border-dashed border-slate-700 rounded-full opacity-50"></div>
                      </div>
                  </div>

                  {/* Connecting Nodes (Simulated) */}
                  <div className="absolute top-1/4 left-1/4 animate-bounce duration-[2000ms]">
                      <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-[10px] text-blue-400 bg-slate-900/80 px-1 rounded">Transport Node</span>
                      </div>
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 animate-bounce duration-[3000ms]">
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] text-emerald-400 bg-slate-900/80 px-1 rounded">FinTech Node</span>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      </div>
                  </div>
                  <div className="absolute top-1/3 right-1/3 animate-bounce duration-[2500ms]">
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] text-red-400 bg-slate-900/80 px-1 rounded">Emergency Node</span>
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur border border-slate-700 p-2 rounded text-xs text-slate-400 font-mono">
                      <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3" /> Area: Ogun State Global
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                          <Eye className="w-3 h-3" /> Monitoring: All Sectors
                      </div>
                  </div>
              </div>

              {/* Live Terminal Log */}
              <div className="bg-black rounded-xl border border-slate-800 p-4 font-mono text-xs h-64 overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                      <div className="flex items-center gap-2 text-slate-400">
                          <Terminal className="w-4 h-4" />
                          <span>System_Decision_Log.stream</span>
                      </div>
                      <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                      {logs.map((log) => (
                          <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
                              <span className="text-slate-600 shrink-0">[{log.time}]</span>
                              <span className={`font-bold shrink-0 w-16 text-right ${
                                  log.module === 'TRANS' ? 'text-blue-400' :
                                  log.module === 'FIN' ? 'text-emerald-400' :
                                  log.module === 'SEC' ? 'text-purple-400' :
                                  log.module === 'HEALTH' ? 'text-red-400' : 'text-amber-400'
                              }`}>{log.module}:</span>
                              <span className={`flex-1 ${
                                  log.type === 'warning' ? 'text-yellow-200' :
                                  log.type === 'critical' ? 'text-red-400 font-bold' :
                                  log.type === 'success' ? 'text-emerald-200' : 'text-slate-300'
                              }`}>
                                  {log.type === 'critical' && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                                  {log.message}
                              </span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Right Column: Active Interventions/Actions */}
          <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Autonomous Actions
              </h3>

              <div className="bg-slate-900 border border-l-4 border-l-emerald-500 border-y-slate-800 border-r-slate-800 p-4 rounded-r-xl">
                  <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-emerald-400">OPTIMIZATION</span>
                      <span className="text-[10px] text-slate-500">1m ago</span>
                  </div>
                  <p className="text-sm text-slate-300">
                      Rerouted 15% of heavy duty trucks via Sagamu Interchange to reduce localized congestion.
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
                      <CheckCircle className="w-3 h-3 text-emerald-500" /> Action Completed
                  </div>
              </div>

              <div className="bg-slate-900 border border-l-4 border-l-yellow-500 border-y-slate-800 border-r-slate-800 p-4 rounded-r-xl">
                  <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-yellow-400">PREVENTION</span>
                      <span className="text-[10px] text-slate-500">5m ago</span>
                  </div>
                  <p className="text-sm text-slate-300">
                      Flagged bulk ticket purchase pattern as potential scalping. Account 9921 temporarily suspended.
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
                      <Lock className="w-3 h-3 text-yellow-500" /> Security Protocol Active
                  </div>
              </div>

              <div className="bg-slate-900 border border-l-4 border-l-blue-500 border-y-slate-800 border-r-slate-800 p-4 rounded-r-xl">
                  <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-blue-400">RESOURCE ALLOCATION</span>
                      <span className="text-[10px] text-slate-500">12m ago</span>
                  </div>
                  <p className="text-sm text-slate-300">
                      Increased server capacity for "Ogun Job Portal" due to 300% traffic spike.
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
                      <Server className="w-3 h-3 text-blue-500" /> Auto-Scaling Active
                  </div>
              </div>

              {/* Status Footer */}
              <div className="mt-8 pt-8 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>Neural Net Version</span>
                      <span>v4.2.0-alpha</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Uptime</span>
                      <span>99.999%</span>
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
};