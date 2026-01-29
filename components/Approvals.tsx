import React, { useState } from 'react';
import { 
    UserCheck, X, Check, Search, Filter, ShieldAlert, 
    MoreHorizontal, Mail, Phone, Calendar, Clock, 
    ShieldCheck, Building2, Store, User, ShieldHalf
} from 'lucide-react';

interface PendingUser {
    id: string;
    name: string;
    email: string;
    role: string;
    date: string;
    avatar: string;
    status: 'pending' | 'approved' | 'rejected';
}

const INITIAL_PENDING: PendingUser[] = [
    { id: '1', name: 'Olumide Bakare', email: 'o.bakare@gmail.com', role: 'vendor', date: 'Just now', avatar: 'https://i.pravatar.cc/100?img=1', status: 'pending' },
    { id: '2', name: 'Funke Olayemi', email: 'funke_gov@ogun.gov.ng', role: 'government', date: '2h ago', avatar: 'https://i.pravatar.cc/100?img=2', status: 'pending' },
    { id: '3', name: 'Chinedu Eze', email: 'eze.vendor@gmail.com', role: 'vendor', date: 'Yesterday', avatar: 'https://i.pravatar.cc/100?img=3', status: 'pending' },
    { id: '4', name: 'Tunde Phillips', email: 'tunde.p@iseyaa.gov.ng', role: 'admin', date: 'Nov 12', avatar: 'https://i.pravatar.cc/100?img=4', status: 'pending' },
];

export const Approvals: React.FC = () => {
    const [pendingList, setPendingList] = useState<PendingUser[]>(INITIAL_PENDING);

    const handleAction = (id: string, status: 'approved' | 'rejected') => {
        setPendingList(prev => prev.map(u => u.id === id ? { ...u, status } : u));
        setTimeout(() => {
            setPendingList(prev => prev.filter(u => u.id !== id));
        }, 1000);
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
                        <UserCheck className="w-8 h-8 text-emerald-600" /> Protocol Approvals
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium">System core backend for registration verification.</p>
                </div>
                <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-4">
                    <ShieldAlert className="w-5 h-5 text-emerald-600 animate-pulse" />
                    <span className="text-xs font-black text-emerald-800 uppercase tracking-widest">{pendingList.length} Requests Awaiting</span>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-6 items-center">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input type="text" placeholder="Search by name, email or ID..." className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none font-bold transition-all" />
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-black text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all flex items-center gap-2">
                            <Filter className="w-4 h-4" /> FILTERS
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                                <th className="px-8 py-5">Identity Node</th>
                                <th className="px-8 py-5">Protocol Type</th>
                                <th className="px-8 py-5">Request Date</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {pendingList.map(user => (
                                <tr key={user.id} className={`group hover:bg-slate-50/50 transition-all ${user.status !== 'pending' ? 'opacity-50 grayscale' : ''}`}>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl overflow-hidden border-4 border-slate-100 shadow-sm relative group-hover:border-emerald-100 transition-colors">
                                                <img src={user.avatar} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 uppercase tracking-tighter text-lg leading-none">{user.name}</p>
                                                <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5"><Mail className="w-3 h-3" /> {user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${
                                            user.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                            user.role === 'government' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                            {user.role === 'admin' ? <ShieldHalf className="w-3 h-3" /> : 
                                             user.role === 'government' ? <Building2 className="w-3 h-3" /> : 
                                             <Store className="w-3 h-3" />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-slate-500">
                                            <p className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3" /> {user.date}</p>
                                            <p className="text-[10px] font-medium flex items-center gap-2 mt-1"><Clock className="w-3 h-3" /> System ID: #{user.id}822</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        {user.status === 'pending' ? (
                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleAction(user.id, 'approved')}
                                                    className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-700 shadow-lg shadow-emerald-900/20 active:scale-90 transition-all"
                                                >
                                                    <Check className="w-6 h-6" />
                                                </button>
                                                <button 
                                                    onClick={() => handleAction(user.id, 'rejected')}
                                                    className="w-12 h-12 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:text-red-500 hover:border-red-100 shadow-sm active:scale-90 transition-all"
                                                >
                                                    <X className="w-6 h-6" />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${user.status === 'approved' ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {user.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {pendingList.length === 0 && (
                    <div className="py-24 text-center space-y-4">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-slate-200">
                            <ShieldCheck className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Protocol Clear</h3>
                        <p className="text-slate-400 text-sm italic">All registration signals processed.</p>
                    </div>
                )}
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border-[8px] border-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-10"></div>
                <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <span className="text-emerald-400 font-black uppercase tracking-[0.5em] text-[10px]">Registry Metrics</span>
                        <h3 className="text-5xl font-black tracking-tighter uppercase italic leading-none">Global Ledger Security.</h3>
                        <p className="text-slate-400 text-lg leading-relaxed font-light italic">Every node added to the ISEYAA network undergoes a 12-point biometric and governmental verification protocol.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 group hover:bg-white/10 transition-colors">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Total Verified</p>
                            <p className="text-4xl font-black font-mono tracking-tighter">14,282</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 group hover:bg-white/10 transition-colors">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Suspended</p>
                            <p className="text-4xl font-black font-mono tracking-tighter text-red-400">12</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};