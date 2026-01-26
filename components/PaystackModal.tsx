
import React, { useState, useEffect } from 'react';
import { X, Lock, CreditCard, Building2, Smartphone, Loader2, CheckCircle2, ChevronRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface PaystackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  email: string;
  metadata?: any;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PAYSTACK_PUBLIC_KEY = 'pk_live_cf0e424b32ccc61055b3f1dbefe8093284828c68';

export const PaystackModal: React.FC<PaystackModalProps> = ({ isOpen, onClose, onSuccess, amount, email, metadata }) => {
  const [step, setStep] = useState<'method' | 'processing' | 'success' | 'error'>('method');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setStep('method');
    }
  }, [isOpen]);

  const handlePay = () => {
    // 1. Ensure amount is valid for Paystack (minimum 1 NGN)
    if (amount <= 0) {
        setStep('error');
        setErrorMessage("Transaction amount must be greater than zero.");
        return;
    }
    
    setStep('processing');

    // 2. Check if Paystack script loaded
    if (!window.PaystackPop) {
        setStep('error');
        setErrorMessage("Paystack is still loading or could not be reached. Please check your internet connection.");
        return;
    }

    // 3. Robust Email Validation & Fallback
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const safeEmail = (email && emailRegex.test(email)) ? email : "payments@iseyaa.ogun.gov.ng";

    try {
        const handler = window.PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email: safeEmail,
            amount: Math.round(amount * 100), // Convert to kobo
            currency: 'NGN',
            metadata: {
                ...metadata,
                custom_fields: [
                    {
                        display_name: "Service",
                        variable_name: "service",
                        value: "ISEYAA Digital Services"
                    }
                ]
            },
            callback: (response: any) => {
                setStep('success');
                setTimeout(() => {
                    onSuccess();
                    onClose();
                }, 1500);
            },
            onClose: () => {
                setStep('method');
            }
        });
        handler.openIframe();
    } catch (error: any) {
        console.error("Paystack Initialization Error", error);
        setStep('error');
        setErrorMessage(error?.message || "Could not initialize secure payment node. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      
      <div className="bg-white w-full max-w-[400px] rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
        <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#011b33] rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Secured by</p>
              <p className="text-sm font-bold text-[#011b33]">Paystack</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {step === 'method' && (
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                <ShieldCheck className="w-3.5 h-3.5" /> Secure Transaction
              </div>
              <p className="text-slate-500 text-sm font-medium truncate px-4">{email || "citizen@ogun.gov.ng"}</p>
              <h2 className="text-4xl font-bold text-slate-900 mt-2">₦ {amount.toLocaleString()}</h2>
            </div>
            <button 
              onClick={handlePay}
              className="w-full bg-[#3bb75e] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#2fa04f] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              Checkout Now <ChevronRight className="w-5 h-5" />
            </button>
            <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> PCI-DSS</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Encrypted</span>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="relative mb-6">
                <Loader2 className="w-16 h-16 text-[#3bb75e] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center"><Lock className="w-5 h-5 text-[#3bb75e]" /></div>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Connecting...</h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">Initializing payment secure node via IṢẸ́YÁÁ gateway.</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-14 h-14 text-[#3bb75e]" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Payment Verified</h3>
            <p className="text-slate-500 mt-2">Transaction successful.</p>
          </div>
        )}

        {step === 'error' && (
          <div className="p-12 flex flex-col items-center justify-center text-center animate-in shake duration-300">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600"><AlertCircle className="w-12 h-12" /></div>
            <h3 className="text-xl font-bold text-slate-900">Payment Error</h3>
            <p className="text-slate-500 mt-2 mb-8 text-sm">{errorMessage}</p>
            <button onClick={() => setStep('method')} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold">Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
};
