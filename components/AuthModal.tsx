
import React, { useState, useEffect } from 'react';
import { 
    X, Loader2, ShieldCheck, ArrowRight, ShieldAlert, User, Store, Building2, ShieldHalf, LayoutGrid
} from 'lucide-react';
import { User as UserType, UserRole, KYCStatus } from '../types';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserType) => void;
}

// Simulated database for persistent approval states
const APPROVED_EMAILS = new Set<string>(['admin@iseyaa.gov.ng', 'superadmin@iseyaa.gov.ng']);

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [step, setStep] = useState<'role' | 'login' | 'verifying' | 'pending'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [targetEmail, setTargetEmail] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setStep('role');
      setSelectedRole(null);
      setIsLoading(false);
      setTargetEmail('');
    }
  }, [isOpen]);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('login');
  };

  const handleGoogleLogin = () => {
    if (!selectedRole) return;
    setIsLoading(true);
    
    // Simulate picking an account from a Google Popup
    setTimeout(() => {
        const mockGmail = selectedRole === 'admin' ? "admin@iseyaa.gov.ng" : 
                          selectedRole === 'super-admin' ? "superadmin@iseyaa.gov.ng" : 
                          "adetola.olusegun@gmail.com";
                          
        setTargetEmail(mockGmail);
        setIsLoading(false);
        setStep('verifying');
        
        // Automated Government Protocol Sync
        setTimeout(() => {
            const isAutoApproved = selectedRole === 'user' || APPROVED_EMAILS.has(mockGmail);
            
            if (!isAutoApproved) {
                setStep('pending');
                return;
            }

            const finalUser: UserType = {
                id: `OG-${Math.floor(Math.random() * 900000 + 100000)}`,
                name: selectedRole === 'super-admin' ? "CHIEF REGISTRAR" : "ADETOLA OLUSEGUN",
                email: mockGmail,
                activeRole: selectedRole,
                availableRoles: [selectedRole],
                avatar: `https://ui-avatars.com/api/?name=${selectedRole}&background=05A446&color=fff`,
                verified: true,
                isApproved: true,
                securityTier: selectedRole === 'super-admin' ? 3 : 1,
                kycStatus: 'verified' as KYCStatus,
                registrationDate: new Date().toISOString()
            };
            onLogin(finalUser);
        }, 3000);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-emerald-950/98 backdrop-blur-3xl transition-opacity" onClick={onClose} />

      <div className="bg-white rounded-[3.5rem] shadow-2xl w-full max-w-lg overflow-hidden relative z-10 animate-in zoom-in-95 duration-500 border-[12px] border-white/10">
        
        <div className="p-10 md:p-14">
            <div className="flex justify-between items-start mb-10">
                <Logo className="h-10" variant="color" />
                {step !== 'verifying' && (
                    <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full text-slate-300 hover:text-slate-600 transition-all">
                        <X className="w-8 h-8" />
                    </button>
                )}
            </div>

            {step === 'role' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <div className="space-y-3">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none uppercase italic">Choose Protocol</h2>
                        <p className="text-slate-500 text-lg font-light italic">Identify your role to access the Gateway.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { id: 'user', icon: User, label: 'Citizen/User', desc: 'Public Access' },
                            { id: 'vendor', icon: Store, label: 'Vendor', desc: 'Trade & Commerce' },
                            { id: 'government', icon: Building2, label: 'Government', desc: 'Ministry Tools' },
                            { id: 'super-admin', icon: ShieldHalf, label: 'Super Admin', desc: 'System Core' }
                        ].map((role) => (
                            <button 
                                key={role.id}
                                onClick={() => handleRoleSelect(role.id as UserRole)}
                                className="group p-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left space-y-3"
                            >
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm transition-colors">
                                    <role.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-black text-slate-900 uppercase tracking-tighter">{role.label}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{role.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'login' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-right-6 duration-500">
                    <div className="space-y-4">
                        <button onClick={() => setStep('role')} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 hover:underline">
                            <ArrowRight className="w-3 h-3 rotate-180" /> Change Role
                        </button>
                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase italic">Identity Auth</h2>
                        <p className="text-slate-500 text-xl font-light italic leading-relaxed">
                            Securing access as <span className="text-emerald-600 font-bold uppercase tracking-widest">{selectedRole}</span>.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <button 
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-5 p-7 rounded-[2.5rem] bg-white border-4 border-slate-100 text-slate-900 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group relative overflow-hidden shadow-xl active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                            ) : (
                                <>
                                    <div className="bg-white p-1 rounded-lg shadow-sm">
                                        <svg className="w-8 h-8" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                        </svg>
                                    </div>
                                    <span className="font-black text-2xl uppercase tracking-tighter">Sign In with Google</span>
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform text-emerald-600" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {step === 'pending' && (
                <div className="text-center space-y-10 animate-in zoom-in duration-500">
                    <div className="w-32 h-32 bg-amber-100 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner border-4 border-amber-50">
                        <Loader2 className="w-16 h-16 text-amber-600 animate-spin" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic leading-none">Access Pending</h2>
                        <p className="text-slate-500 text-xl font-light italic leading-relaxed">
                            Registration request for <span className="text-emerald-600 font-bold">{targetEmail}</span> has been sent. A Super Admin must approve your access on the backend.
                        </p>
                    </div>
                    <button 
                        onClick={() => setStep('role')}
                        className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-black transition-all uppercase tracking-widest shadow-2xl active:scale-95"
                    >
                        Back to Protocols
                    </button>
                </div>
            )}

            {step === 'verifying' && (
                <div className="py-20 text-center space-y-12 animate-in zoom-in duration-1000">
                    <div className="relative w-56 h-56 mx-auto">
                        <div className="absolute inset-0 border-[16px] border-emerald-50 rounded-full shadow-inner"></div>
                        <div className="absolute inset-0 border-[16px] border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ShieldCheck className="w-24 h-24 text-emerald-600 animate-pulse" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Syncing State</h2>
                        <p className="text-slate-500 text-xl font-light italic max-w-sm mx-auto leading-relaxed">
                            Authenticating <span className="text-emerald-600 font-bold">{targetEmail}</span> against the central state identity core.
                        </p>
                    </div>
                </div>
            )}
        </div>
        
        <div className="bg-slate-950 p-8 text-center text-[10px] text-emerald-500/60 font-black uppercase tracking-[0.5em] border-t border-white/5">
            ISEYAA CENTRAL IDENTITY • CRYPTO-ANCHORED BY VEO-3.1
        </div>
      </div>
    </div>
  );
};
