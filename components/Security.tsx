import React, { useState } from 'react';
import { 
  Shield, 
  Fingerprint, 
  FileCheck, 
  Siren, 
  Phone, 
  MapPin, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  QrCode, 
  FileText, 
  Scale, 
  History, 
  Eye, 
  Umbrella, 
  Car, 
  Heart, 
  Briefcase, 
  ChevronRight,
  ShieldCheck,
  Activity,
  Key
} from 'lucide-react';

export const Security: React.FC = () => {
  const [sosActive, setSosActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'identity' | 'insurance' | 'trust'>('identity');

  const handleSOS = () => {
    setSosActive(true);
    setTimeout(() => {
        alert("Emergency Distress Signal Sent! Police Dispatch has been notified of your location.");
        setSosActive(false);
    }, 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Security, Identity & Trust</h2>
           <p className="text-slate-500">Manage your digital ID, insurance policies, and data privacy.</p>
        </div>
        
        <button 
            onClick={handleSOS}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white shadow-lg transition-all animate-pulse ${sosActive ? 'bg-red-700 scale-95' : 'bg-red-600 hover:bg-red-700 hover:scale-105'}`}
        >
            <Siren className="w-5 h-5" />
            {sosActive ? 'SENDING SIGNAL...' : 'EMERGENCY SOS'}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('identity')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'identity' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Fingerprint className="w-4 h-4" /> Identity & Docs
          </button>
          <button 
            onClick={() => setActiveTab('insurance')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'insurance' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Umbrella className="w-4 h-4" /> Insurance & Claims
          </button>
          <button 
            onClick={() => setActiveTab('trust')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'trust' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <ShieldCheck className="w-4 h-4" /> Trust & Audit
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Digital ID (Always Visible or Contextual) */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-[420px] flex flex-col justify-between group cursor-pointer perspective">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-10 -translate-x-10"></div>
                
                {/* Holographic Effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                {/* Card Header */}
                <div className="flex justify-between items-start z-10">
                    <div className="flex items-center gap-3">
                         <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                            <Shield className="w-6 h-6 text-emerald-300" />
                         </div>
                         <div>
                             <h3 className="font-bold text-lg leading-none tracking-wide">OGUN STATE</h3>
                             <p className="text-[10px] tracking-[0.2em] font-medium opacity-80 mt-1">DIGITAL RESIDENCY</p>
                         </div>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Coat_of_arms_of_Nigeria.svg/1200px-Coat_of_arms_of_Nigeria.svg.png" alt="Coat of Arms" className="w-12 h-12 opacity-90 drop-shadow-lg grayscale brightness-200" />
                </div>

                {/* Card Body */}
                <div className="flex flex-col items-center z-10 my-4">
                    <div className="w-36 h-36 rounded-2xl bg-slate-200 border-4 border-white/20 shadow-inner mb-4 overflow-hidden relative">
                         <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                         <div className="absolute bottom-0 w-full bg-emerald-900/80 backdrop-blur text-[10px] text-center text-white py-1">
                             Biometric Verified
                         </div>
                    </div>
                    <h2 className="text-2xl font-bold tracking-wide">ADEWALE, TUNDE</h2>
                    <p className="text-sm opacity-70 font-mono">DOB: 12 OCT 1985</p>
                </div>

                {/* Card Footer */}
                <div className="z-10 bg-black/20 backdrop-blur-md rounded-xl p-4 flex justify-between items-center border border-white/10">
                    <div>
                        <p className="text-[10px] uppercase opacity-60">National Identity No.</p>
                        <p className="font-mono font-bold tracking-widest text-lg text-emerald-200">2291 0092 1182</p>
                    </div>
                    <div className="bg-white p-1.5 rounded-lg">
                         <QrCode className="w-8 h-8 text-slate-900" />
                    </div>
                </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold text-slate-900 flex items-center gap-2">
                       <UserCheck className="w-5 h-5 text-emerald-600" /> Verification Levels
                   </h3>
                   <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">Tier 3</span>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">NIN Linked</span>
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Facial Biometrics</span>
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Address Verification</span>
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Bank Verification (BVN)</span>
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Dynamic Content based on Tab */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* IDENTITY TAB */}
            {activeTab === 'identity' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer group">
                             <FileText className="w-8 h-8 text-slate-400 group-hover:text-emerald-600 mb-3" />
                             <h4 className="font-bold text-slate-900">Tax Clearance</h4>
                             <p className="text-xs text-slate-500 mt-1">Valid until Dec 31, 2024</p>
                             <div className="mt-3 text-xs font-bold text-emerald-600 flex items-center gap-1">View Certificate <ChevronRight className="w-3 h-3" /></div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer group">
                             <Car className="w-8 h-8 text-slate-400 group-hover:text-emerald-600 mb-3" />
                             <h4 className="font-bold text-slate-900">Driver's License</h4>
                             <p className="text-xs text-slate-500 mt-1">Class B • Exp: 2026</p>
                             <div className="mt-3 text-xs font-bold text-emerald-600 flex items-center gap-1">View License <ChevronRight className="w-3 h-3" /></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="font-bold text-slate-900 mb-4">Request Official Documents</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <h4 className="font-semibold text-slate-800 text-sm">Police Character Certificate</h4>
                                    <p className="text-xs text-slate-500">For visa or employment purposes.</p>
                                </div>
                                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200">
                                    Apply - ₦5,000
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <h4 className="font-semibold text-slate-800 text-sm">State Residency Card</h4>
                                    <p className="text-xs text-slate-500">Proof of residence in Ogun State.</p>
                                </div>
                                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200">
                                    Renew - ₦2,500
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* INSURANCE TAB */}
            {activeTab === 'insurance' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-3">
                            <Umbrella className="w-8 h-8 text-emerald-600" />
                            <div>
                                <h3 className="font-bold text-emerald-900">Active Protections</h3>
                                <p className="text-xs text-emerald-700">You are covered by 3 active policies.</p>
                            </div>
                        </div>
                        <button className="text-xs bg-white text-emerald-700 font-bold px-3 py-2 rounded-lg border border-emerald-200 hover:bg-emerald-100">
                            + Add Cover
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Health Policy */}
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Ogun Standard Health</h4>
                                    <p className="text-xs text-slate-500">Family HMO • Renewed Nov 2024</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Active</span>
                        </div>

                        {/* Vehicle Policy */}
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Car className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Vehicle 3rd Party</h4>
                                    <p className="text-xs text-slate-500">Toyota Corolla (ABC-123-OG)</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Active</span>
                        </div>

                        {/* Event Protection */}
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Event Ticket Protection</h4>
                                    <p className="text-xs text-slate-500">Ogun Cultural Festival Refund Cover</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">Expiring Soon</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">File a Claim or Dispute</h3>
                        <div className="grid grid-cols-2 gap-4">
                             <button className="flex flex-col items-center justify-center gap-2 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all">
                                 <AlertTriangle className="w-6 h-6 text-amber-500" />
                                 <span className="text-sm font-semibold text-slate-700">Report Accident</span>
                             </button>
                             <button className="flex flex-col items-center justify-center gap-2 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all">
                                 <Scale className="w-6 h-6 text-blue-500" />
                                 <span className="text-sm font-semibold text-slate-700">Transaction Dispute</span>
                             </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TRUST & AUDIT TAB */}
            {activeTab === 'trust' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                             <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                 <History className="w-5 h-5 text-slate-500" /> Data Audit Trail
                             </h3>
                             <button className="text-xs text-emerald-600 font-bold hover:underline">Download Report</button>
                        </div>
                        <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
                             {[
                                 { action: 'Medical Record Access', actor: 'Ogun Health Ministry', time: 'Today, 10:42 AM', type: 'Access' },
                                 { action: 'Identity Verification', actor: 'Police Checkpoint (Auto)', time: 'Yesterday, 4:15 PM', type: 'Verify' },
                                 { action: 'Payment Authorization', actor: 'Wallet System', time: 'Nov 12, 09:30 AM', type: 'Auth' },
                             ].map((log, i) => (
                                 <div key={i} className="pl-10 relative">
                                     <div className={`absolute left-[11px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${log.type === 'Access' ? 'bg-blue-500' : log.type === 'Verify' ? 'bg-emerald-500' : 'bg-purple-500'}`}></div>
                                     <h4 className="font-bold text-sm text-slate-800">{log.action}</h4>
                                     <p className="text-xs text-slate-500 mt-1">Accessed by <span className="font-semibold text-slate-700">{log.actor}</span></p>
                                     <span className="text-[10px] text-slate-400 mt-1 block font-mono">{log.time}</span>
                                 </div>
                             ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                             <Key className="w-5 h-5 text-slate-500" /> Role-Based Access Control
                        </h3>
                        <p className="text-xs text-slate-500 mb-4">Manage which government agencies have access to your data.</p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Health Records</h4>
                                    <p className="text-xs text-slate-500">Allow hospitals to view history</p>
                                </div>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Location Data</h4>
                                    <p className="text-xs text-slate-500">Allow emergency services tracking</p>
                                </div>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"/>
                                </div>
                            </div>
                             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Financial History</h4>
                                    <p className="text-xs text-slate-500">Allow tax authority audit</p>
                                </div>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};