
import React, { useState, useRef } from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, History, ShieldCheck, Download, RefreshCcw, Lock, Eye, EyeOff, X, Loader2, CheckCircle2, User, Zap } from 'lucide-react';
import { PaystackModal } from './PaystackModal';

export const Wallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'earnings'>('overview');
  const [showBalance, setShowBalance] = useState(true);
  const [balance, setBalance] = useState(245200.00);
  
  // Modal & Form States
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);
  const [actionStep, setActionStep] = useState<'input' | 'processing' | 'success'>('input');
  
  const [rawAmount, setRawAmount] = useState('');
  const [recipientId, setRecipientId] = useState('');

  const formatAmount = (val: string) => {
    const clean = val.replace(/[^0-9.]/g, '');
    if (!clean) return '';
    const parts = clean.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keeping track of cursor position is important for formatting inputs
    const { value } = e.target;
    setRawAmount(formatAmount(value));
  };

  const numericAmount = parseFloat(rawAmount.replace(/,/g, '')) || 0;

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericAmount <= 0) return;
    if (numericAmount > balance) {
        alert("Insufficient funds in your ISEYAA Wallet.");
        return;
    }
    setActionStep('processing');
    setTimeout(() => {
      setBalance(b => b - numericAmount);
      setActionStep('success');
    }, 2500);
  };

  const reset = () => {
    setIsTopUpOpen(false); 
    setIsTransferOpen(false); 
    setIsPaystackOpen(false);
    setActionStep('input'); 
    setRawAmount(''); 
    setRecipientId('');
  };

  const handleTopUpSuccess = () => {
      setBalance(b => b + numericAmount);
      reset();
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      
      {/* Refined Top Up Modal */}
      {isTopUpOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm">
            <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md p-10 border-4 border-white/20 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Add Funds</h3>
                        <p className="text-slate-500 text-sm mt-1">Instant wallet top-up</p>
                    </div>
                    <button onClick={reset} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400"><X /></button>
                </div>
                <div className="bg-slate-50 rounded-[2rem] p-10 mb-8 border border-slate-100 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-6">Enter Amount (₦)</label>
                    <div className="flex items-center text-5xl font-bold text-slate-900 overflow-hidden">
                        <span className="text-emerald-500 mr-3">₦</span>
                        <input 
                            autoFocus 
                            type="text" 
                            inputMode="decimal"
                            value={rawAmount} 
                            onChange={handleAmountChange} 
                            placeholder="0.00" 
                            className="w-full bg-transparent outline-none placeholder:text-slate-200 tracking-tighter" 
                        />
                    </div>
                    <div className="mt-8 flex flex-wrap gap-2">
                        {[1000, 5000, 10000].map(v => (
                            <button key={v} onClick={() => setRawAmount(formatAmount(v.toString()))} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-all">+ ₦{v.toLocaleString()}</button>
                        ))}
                    </div>
                </div>
                <button 
                    disabled={numericAmount <= 0} 
                    onClick={() => setIsPaystackOpen(true)} 
                    className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-emerald-900/10 hover:bg-emerald-700 transition-all active:scale-95 disabled:grayscale disabled:opacity-50"
                >
                    Proceed to Pay ₦{numericAmount.toLocaleString()}
                </button>
                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Lock className="w-3 h-3" /> PCI-DSS Compliant Gateway
                </div>
            </div>
        </div>
      )}

      {/* Refined Transfer Modal */}
      {isTransferOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md p-10 animate-in zoom-in-95 duration-200">
                {actionStep === 'input' && (
                    <form onSubmit={handleTransfer} className="space-y-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Send Money</h3>
                                <p className="text-slate-500 text-sm mt-1">ISEYAA P2P Transfer</p>
                            </div>
                            <button type="button" onClick={reset} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400"><X /></button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 ml-1">Recipient ISEYAA ID</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-4 w-6 h-6 text-slate-300 transition-colors group-focus-within:text-emerald-600" />
                                    <input autoFocus required type="text" value={recipientId} onChange={e => setRecipientId(e.target.value)} placeholder="e.g. OG-USER-882" className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-lg transition-all" />
                                </div>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Amount to Send</label>
                                <div className="flex items-center text-4xl font-bold">
                                    <span className="text-slate-400 mr-3">₦</span>
                                    <input required type="text" inputMode="decimal" value={rawAmount} onChange={handleAmountChange} placeholder="0.00" className="w-full bg-transparent outline-none tracking-tighter" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" disabled={numericAmount <= 0} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-black transition-all active:scale-95 disabled:opacity-50">Authorize Transfer</button>
                    </form>
                )}
                {actionStep === 'success' && (
                    <div className="text-center space-y-8 py-10 animate-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-inner"><CheckCircle2 className="w-12 h-12 text-emerald-600" /></div>
                        <div>
                            <h3 className="text-3xl font-bold text-slate-900">Success!</h3>
                            <p className="text-slate-500 mt-2 text-lg">Sent <strong>₦ {numericAmount.toLocaleString()}</strong> to {recipientId}</p>
                        </div>
                        <button onClick={reset} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/10">Done</button>
                    </div>
                )}
                {actionStep === 'processing' && <div className="text-center py-20 space-y-6"><Loader2 className="w-16 h-16 text-emerald-600 animate-spin mx-auto" /><p className="font-bold text-xl text-slate-800">Verifying on Ogun Ledger...</p></div>}
            </div>
        </div>
      )}

      <PaystackModal isOpen={isPaystackOpen} onClose={() => setIsPaystackOpen(false)} onSuccess={handleTopUpSuccess} amount={numericAmount} email="citizen@ogun.gov.ng" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Wallet & Finance</h2>
            <p className="text-slate-500 mt-1">Secure government-backed digital finance ecosystem.</p>
        </div>
        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl min-w-[320px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 rounded-full blur-[80px] opacity-20 -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="flex justify-between items-center mb-6 relative z-10">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Primary Balance</p>
                <button onClick={() => setShowBalance(!showBalance)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">{showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
            </div>
            <h2 className="text-4xl font-mono font-bold tracking-tight relative z-10">{showBalance ? `₦ ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '₦ ••••••••'}</h2>
            <div className="mt-10 flex gap-4 relative z-10">
                <button onClick={() => { setIsTopUpOpen(true); setRawAmount(''); }} className="flex-1 py-3.5 bg-white text-slate-900 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-2"><ArrowDownLeft className="w-4 h-4" /> Top Up</button>
                <button onClick={() => { setIsTransferOpen(true); setRawAmount(''); }} className="flex-1 py-3.5 bg-white/10 text-white border border-white/20 rounded-2xl text-xs font-bold hover:bg-white/20 transition-all active:scale-95 flex items-center justify-center gap-2"><ArrowUpRight className="w-4 h-4" /> Transfer</button>
            </div>
            <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest mt-6 flex items-center gap-1.5 opacity-80"><ShieldCheck className="w-3.5 h-3.5" /> Protected by IṢẸ́YÁÁ Security Core</p>
        </div>
      </div>

      {/* Recent History Grid */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-2xl text-slate-900 flex items-center gap-3"><History className="w-6 h-6 text-slate-400" /> Recent Transactions</h3>
              <button className="text-emerald-600 font-bold text-sm hover:underline">Download Statement</button>
          </div>
          <div className="divide-y divide-slate-50">
             {[
               { id: 1, t: 'Wallet Top-up', v: 25000, d: 'Today, 2:30 PM', s: 'Paystack', type: 'in' },
               { id: 2, t: 'Transport Payment', v: 1200, d: 'Today, 10:45 AM', s: 'Abeokuta City Bus', type: 'out' },
               { id: 3, t: 'Marketplace Purchase', v: 4500, d: 'Yesterday', s: 'Abeokuta Crafts', type: 'out' }
             ].map(tx => (
               <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                          {tx.type === 'in' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">{tx.t}</h4>
                          <p className="text-slate-400 text-xs font-medium">{tx.d} • {tx.s}</p>
                      </div>
                  </div>
                  <div className="text-right">
                      <p className={`font-bold text-xl ${tx.type === 'in' ? 'text-emerald-600' : 'text-slate-900'}`}>{tx.type === 'in' ? '+' : '-'} ₦ {tx.v.toLocaleString()}</p>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Success</span>
                  </div>
               </div>
             ))}
          </div>
      </div>
    </div>
  );
};
