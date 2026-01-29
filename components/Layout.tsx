import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Car, 
  Bed, 
  Calendar, 
  Activity, 
  Stethoscope, 
  Wallet, 
  ShieldCheck, 
  Zap, 
  Menu, 
  X,
  Bot,
  LogOut,
  Building,
  Brain,
  CheckCircle2,
  Compass,
  ChevronUp,
  Fingerprint,
  Loader2,
  ShoppingCart,
  Newspaper,
  Trophy,
  Settings,
  UserCheck
} from 'lucide-react';
import { AppView, NavItem, User, UserRole, CartItem } from '../types.ts';
import { Logo } from './Logo.tsx';

interface LayoutProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  children: React.ReactNode;
  user: User | null;
  cart: CartItem[];
  onLogout: () => void;
  onSwitchRole: (role: UserRole) => void;
  onOpenCart: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: AppView.DASHBOARD, label: 'Command Center', icon: LayoutDashboard, category: 'core' },
  { id: AppView.BLOG, label: 'Inside News', icon: Newspaper, category: 'core' },
  { id: AppView.WALLET, label: 'Wallet & Finance', icon: Wallet, category: 'core' },
  { id: AppView.AI_ASSISTANT, label: 'ISEYAA AI Agent', icon: Bot, category: 'core' },
  
  { id: AppView.TRANSPORT, label: 'Transport & Mobility', icon: Car, category: 'services', requiredRoles: ['user', 'government', 'admin', 'super-admin'] },
  { id: AppView.ACCOMMODATION, label: 'Accommodation', icon: Bed, category: 'services', requiredRoles: ['user', 'government', 'admin', 'super-admin'] },
  { id: AppView.TOURISM, label: 'Tourism & Culture', icon: Compass, category: 'services' },
  { id: AppView.EVENTS, label: 'Events & Shows', icon: Calendar, category: 'services' },
  { id: AppView.HEALTH, label: 'Health & HMO', icon: Stethoscope, category: 'services', requiredRoles: ['user', 'government', 'admin', 'super-admin'] },
  { id: AppView.SPORTS, label: 'Sports Management', icon: Trophy, category: 'services' },
  { id: AppView.UTILITIES, label: 'Pay Utility Bills', icon: Zap, category: 'services', requiredRoles: ['user', 'government', 'admin', 'super-admin'] },
  { id: AppView.MARKETPLACE, label: 'Marketplace', icon: ShoppingBag, category: 'services' },

  { id: AppView.APPROVALS, label: 'Admin Approvals', icon: UserCheck, category: 'admin', requiredRoles: ['admin', 'super-admin'] },
  { id: AppView.AI_AUTOMATION, label: 'Super AI Core', icon: Brain, category: 'admin', requiredRoles: ['admin', 'super-admin', 'government'] },
  { id: AppView.GOVERNMENT, label: 'Gov. Administration', icon: Building, category: 'admin', requiredRoles: ['admin', 'super-admin', 'government'] },
];

export const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, children, user, cart, onLogout, onSwitchRole, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isCartBouncing, setIsCartBouncing] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (cartItemsCount > 0) {
      setIsCartBouncing(true);
      const timer = setTimeout(() => setIsCartBouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartItemsCount]);

  const handleCartClick = () => {
    onOpenCart();
  };

  const NavButton: React.FC<{ item: NavItem }> = ({ item }) => {
    const isAllowed = !item.requiredRoles || (user && item.requiredRoles.includes(user.activeRole));
    
    if (!isAllowed) return null;

    return (
      <button
        onClick={() => {
          onNavigate(item.id as AppView);
          setIsMobileMenuOpen(false);
        }}
        className={`flex items-center w-full px-4 py-3 mb-1 text-sm font-medium transition-all rounded-xl ${
          currentView === item.id 
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
            : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
        }`}
      >
        <item.icon className={`w-5 h-5 mr-3 ${currentView === item.id ? 'animate-pulse' : ''}`} />
        {item.label}
      </button>
    );
  };

  const handleRoleSwitch = (role: UserRole) => {
    if (role === user?.activeRole) return;
    setIsSwitching(true);
    setIsRoleSwitcherOpen(false);
    
    setTimeout(() => {
        onSwitchRole(role);
        setIsSwitching(false);
        onNavigate(AppView.DASHBOARD);
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] overflow-hidden">
      {isSwitching && (
          <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-md flex items-center justify-center">
              <div className="bg-white p-8 rounded-3xl shadow-2xl text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                      <Fingerprint className="w-8 h-8 text-emerald-600 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Context Authorization</h3>
                  <p className="text-slate-500 text-sm">Switching to {user?.availableRoles.find(r => r !== user.activeRole)} protocol...</p>
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mx-auto" />
              </div>
          </div>
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <Logo className="h-8" variant="color" />
          <button 
            onClick={handleCartClick}
            className={`relative p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-emerald-600 transition-all shadow-sm ${isCartBouncing ? 'scale-110 shadow-emerald-100' : 'scale-100'}`}
          >
              <ShoppingCart className={`w-5 h-5 ${cartItemsCount > 0 ? 'text-emerald-600' : ''}`} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-yellow text-emerald-900 text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                  {cartItemsCount}
                </span>
              )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          <div>
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Central Hub</p>
            {NAV_ITEMS.filter(i => i.category === 'core').map(item => (
              <NavButton key={item.id} item={item} />
            ))}
          </div>

          <div>
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Public Services</p>
            {NAV_ITEMS.filter(i => i.category === 'services').map(item => (
              <NavButton key={item.id} item={item} />
            ))}
          </div>

          {(user?.activeRole === 'admin' || user?.activeRole === 'super-admin' || user?.activeRole === 'government') && (
            <div>
              <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 text-emerald-600">Command & Control</p>
              {NAV_ITEMS.filter(i => i.category === 'admin').map(item => (
                <NavButton key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50/50 relative">
           {isRoleSwitcherOpen && user && user.availableRoles.length > 1 && (
               <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in slide-in-from-bottom-2">
                   <p className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Protocol</p>
                   {user.availableRoles.map(role => (
                       <button 
                         key={role}
                         onClick={() => handleRoleSwitch(role)}
                         className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${user.activeRole === role ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                       >
                           <div className={`w-2 h-2 rounded-full ${user.activeRole === role ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-300'}`} />
                           <span className="capitalize">{role}</span>
                       </button>
                   ))}
               </div>
           )}

           {user ? (
               <div className="space-y-3">
                   <button 
                     onClick={() => setIsRoleSwitcherOpen(!isRoleSwitcherOpen)}
                     className="w-full flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all text-left shadow-sm group"
                   >
                       <div className="relative">
                           <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-slate-100 group-hover:border-emerald-200 transition-colors object-cover" alt="" />
                           <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                               <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                           </div>
                       </div>
                       <div className="flex-1 min-w-0">
                           <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                           <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest flex items-center justify-between">
                               {user.activeRole} <ChevronUp className={`w-3 h-3 transition-transform ${isRoleSwitcherOpen ? 'rotate-180' : ''}`} />
                           </p>
                       </div>
                   </button>
                   <button onClick={onLogout} className="flex items-center justify-center w-full px-4 py-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                      <LogOut className="w-3.5 h-3.5 mr-2" /> Terminate Session
                   </button>
               </div>
           ) : (
                <button onClick={onLogout} className="flex items-center w-full px-4 py-2 text-sm text-slate-500 hover:bg-slate-50 rounded-lg">
                    <LogOut className="w-4 h-4 mr-3" /> Back to Landing
                </button>
           )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:pt-0 pt-16 relative bg-[#FDFBF7]">
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 px-4 flex items-center justify-between">
            <Logo className="h-6" variant="color" />
            <div className="flex items-center gap-4">
                <button 
                  onClick={handleCartClick}
                  className={`relative p-2 text-slate-400 transition-all ${isCartBouncing ? 'scale-125' : 'scale-100'}`}
                >
                    <ShoppingCart className={`w-5 h-5 ${cartItemsCount > 0 ? 'text-emerald-600' : ''}`} />
                    {cartItemsCount > 0 && (
                        <span className="absolute top-0 right-0 bg-brand-yellow text-emerald-900 text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white animate-in zoom-in">
                            {cartItemsCount}
                        </span>
                    )}
                </button>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-white pt-16 animate-in slide-in-from-top duration-300 overflow-y-auto">
                 <div className="p-6 space-y-8">
                    <div>
                        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Central Hub</p>
                        {NAV_ITEMS.filter(i => i.category === 'core').map(item => (
                        <NavButton key={item.id} item={item} />
                        ))}
                    </div>
                    <div>
                        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Public Services</p>
                        {NAV_ITEMS.filter(i => i.category === 'services').map(item => (
                        <NavButton key={item.id} item={item} />
                        ))}
                    </div>
                    {(user?.activeRole === 'admin' || user?.activeRole === 'super-admin' || user?.activeRole === 'government') && (
                        <div>
                            <p className="px-4 text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">Admin Panel</p>
                            {NAV_ITEMS.filter(i => i.category === 'admin').map(item => (
                            <NavButton key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                 </div>
            </div>
        )}

        {children}
      </main>
    </div>
  );
};