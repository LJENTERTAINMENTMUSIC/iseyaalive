
import React, { useState, useRef, useEffect } from 'react';
import { 
  Zap, 
  Droplets, 
  Trash2, 
  FileText, 
  Wallet, 
  History, 
  ChevronRight, 
  CheckCircle2, 
  Receipt, 
  AlertCircle, 
  Building2,
  QrCode,
  Loader2,
  Copy
} from 'lucide-react';

interface Transaction {
  id: string;
  service: string;
  provider: string;
  amount: number;
  date: string;
  status: 'Success' | 'Failed' | 'Pending';
  ref: string;
}

const HISTORY: Transaction[] = [
  { id: '1', service: 'Electricity Token', provider: 'IBEDC', amount: 5000, date: 'Today, 10:23 AM', status: 'Success', ref: 'OG-PWR-2991' },
  { id: '2', service: 'Waste Management Levy', provider: 'OGWAMA', amount: 2500, date: 'Nov 12, 2024', status: 'Success', ref: 'OG-WST-1102' },
  { id: '3', service: 'Water Bill', provider: 'Ogun Water Corp', amount: 3000, date: 'Oct 30, 2024', status: 'Success', ref: 'OG-WTR-8821' },
];

export const Utilities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pay' | 'history'>('pay');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<'input' | 'processing' | 'success'>('input');
  const [amount, setAmount] = useState('');
  const [meterNo, setMeterNo] = useState('');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
    }, 2000);
  };

  const resetPayment = () => {
    setSelectedCategory(null);
    setPaymentStep('input');
    setAmount('');
    setMeterNo('');
  };

  const categories = [
    { id: 'power', name: 'Electricity', provider: 'IBEDC', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-100' },
    { id: 'water', name: 'Water Corp', provider: 'Ogun Water', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'waste', name: 'Waste (OGWAMA)', provider: 'RecyclePay', icon: Trash2, color: 'text-green-500', bg: 'bg-green-100' },
    { id: 'levy', name: 'Gov Levies', provider: 'OGIRS', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-100' },
  ];

  const activeCategoryData = selectedCategory ? categories.find(c => c.id === selectedCategory) : null;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Inline Payment Modal Logic */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
                {paymentStep === 'input' && (
                    <form onSubmit={handlePay} className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${activeCategoryData?.bg}`}>
                                {activeCategoryData && <activeCategoryData.icon className={`w-5 h-5 ${activeCategoryData.color}`} />}
                            </div>
                            Pay {activeCategoryData?.name}
                            </h3>
                            <button type="button" onClick={resetPayment} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>

                        <div className="space-y-6">
                            <div>
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Provider</label>
                            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                <Building2 className="w-4 h-4 text-slate-400" />
                                <span className="font-semibold text-slate-700">{activeCategoryData?.provider}</span>
                                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Verified</span>
                            </div>
                            </div>

                            <div>
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                                {activeCategoryData?.id === 'power' ? 'Meter Number' : 'Account Ref No'}
                            </label>
                            <input 
                                autoFocus
                                type="text" 
                                required
                                value={meterNo}
                                onChange={(e) => setMeterNo(e.target.value)}
                                placeholder="e.g. 4502-1192-2291"
                                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-mono font-bold text-lg"
                            />
                            </div>

                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-emerald-500/20">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Type Amount</label>
                            <div className="relative flex items-center">
                                    <span className="text-3xl font-bold text-emerald-600 mr-2">₦</span>
                                    <input 
                                        type="text" 
                                        inputMode="decimal"
                                        required
                                        value={amount}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9.]/g, '');
                                            setAmount(val.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                                        }}
                                        placeholder="0.00"
                                        className="w-full bg-transparent outline-none font-bold text-4xl text-slate-900 placeholder:text-slate-200"
                                    />
                            </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg">
                            Authorize Payment
                            </button>
                        </div>
                    </form>
                )}

                {paymentStep === 'processing' && (
                    <div className="p-12 flex flex-col items-center justify-center text-center">
                        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
                        <h3 className="text-lg font-bold text-slate-900">Processing Payment...</h3>
                        <p className="text-slate-500 text-sm mt-2">Connecting to {activeCategoryData?.provider} node.</p>
                    </div>
                )}

                {paymentStep === 'success' && (
                    <div className="bg-slate-50">
                        <div className="bg-emerald-600 text-white p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold">Payment Successful!</h3>
                        <p className="text-emerald-100">Transaction ID: OG-{Math.floor(Math.random()*1000000)}</p>
                        </div>
                        
                        <div className="p-8">
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6">
                            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                                <span className="text-slate-500 text-sm">Amount Paid</span>
                                <span className="text-xl font-bold text-slate-900">₦ {amount}</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Service</span>
                                    <span className="font-medium text-slate-800">{activeCategoryData?.name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Recipient</span>
                                    <span className="font-medium text-slate-800">{meterNo}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Date</span>
                                    <span className="font-medium text-slate-800">Just Now</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={resetPayment} className="flex-1 py-3 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100">
                                Close
                            </button>
                            <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 flex items-center justify-center gap-2">
                                <Receipt className="w-4 h-4" /> Receipt
                            </button>
                        </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Utilities & Bills</h2>
           <p className="text-slate-500">Pay levies, purchase power, and manage subscriptions.</p>
        </div>
        
        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-4">
            <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Wallet Balance</p>
                <p className="text-xl font-bold font-mono">₦ 245,200.00</p>
            </div>
            <div className="bg-emerald-600 p-2 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors">
                <Wallet className="w-5 h-5 text-white" />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                    <h4 className="font-bold text-emerald-800 text-sm">Good Standing</h4>
                    <p className="text-emerald-700 text-xs mt-1">
                        You are up to date with all recurring state levies and taxes. Next assessment due: Jan 2025.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                    <button 
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className="bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-md transition-all group text-left"
                    >
                        <div className={`w-12 h-12 rounded-full ${cat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <cat.icon className={`w-6 h-6 ${cat.color}`} />
                        </div>
                        <h3 className="font-bold text-slate-800">{cat.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">Pay {cat.provider}</p>
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <History className="w-5 h-5 text-slate-400" /> Recent Transactions
                    </h3>
                    <button className="text-sm text-emerald-600 font-medium hover:underline">View All</button>
                </div>
                <div className="divide-y divide-slate-50">
                    {HISTORY.map((tx) => (
                        <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    tx.service.includes('Electricity') ? 'bg-amber-100 text-amber-600' :
                                    tx.service.includes('Water') ? 'bg-blue-100 text-blue-600' :
                                    'bg-green-100 text-green-600'
                                }`}>
                                    {tx.service.includes('Electricity') ? <Zap className="w-5 h-5" /> :
                                     tx.service.includes('Water') ? <Droplets className="w-5 h-5" /> :
                                     <Trash2 className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{tx.service}</h4>
                                    <p className="text-xs text-slate-500">{tx.date} • {tx.provider}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-900 text-sm">- ₦ {tx.amount.toLocaleString()}</p>
                                <p className="text-xs text-emerald-600 font-medium">{tx.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 -translate-y-10 translate-x-10"></div>
                <h3 className="font-bold text-lg mb-2 relative z-10">Autopay is Live!</h3>
                <p className="text-slate-300 text-sm mb-6 relative z-10">
                    Never miss a bill. Enable autopay for your monthly electricity and waste bills to avoid service disruption.
                </p>
                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-emerald-500 transition-colors relative z-10">
                    Set Up Autopay
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Tariff Updates</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                        <div>
                            <h4 className="font-bold text-slate-800 text-xs">IBEDC Band A Review</h4>
                            <p className="text-xs text-slate-500 mt-1">
                                Effective Nov 1st, Band A customers will experience a 5% adjustment in tariff rates.
                            </p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                        <div>
                            <h4 className="font-bold text-slate-800 text-xs">Water Corp Maintenance</h4>
                            <p className="text-xs text-slate-500 mt-1">
                                Scheduled maintenance in Abeokuta South axis on Saturday, 10am - 4pm.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
