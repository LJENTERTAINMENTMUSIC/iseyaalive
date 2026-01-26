
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { Marketplace } from './components/Marketplace';
import { AIChat } from './components/AIChat';
import { Transport } from './components/Transport';
import { Accommodation } from './components/Accommodation';
import { Events } from './components/Events';
import { Security } from './components/Security';
import { Sports } from './components/Sports';
import { Health } from './components/Health';
import { Utilities } from './components/Utilities';
import { Wallet } from './components/Wallet';
import { Automation } from './components/Automation';
import { Tourism } from './components/Tourism';
import { Government } from './components/Government';
import { Blog } from './components/Blog';
import { Approvals } from './components/Approvals';
import { AuthModal } from './components/AuthModal';
import { CartOverlay } from './components/CartOverlay';
import { AppView, User, UserRole, CartItem } from './types';
import { Wrench, CheckCircle2 } from 'lucide-react';

const PlaceholderView = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-50">
    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-slate-500" />
    </div>
    <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
    <p className="text-slate-500 max-w-md">
      This module is part of the ISEYAA super-platform architecture. 
      It connects to the central AI automation layer for real-time operations.
    </p>
    <button className="mt-8 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
        Launch Demo
    </button>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleLoginTrigger = () => setIsAuthModalOpen(true);

  const handleLoginSuccess = (loggedInUser: User) => {
      setUser(loggedInUser);
      setIsAuthModalOpen(false);
      setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
      setUser(null);
      setCurrentView(AppView.LANDING);
  };

  const handleSwitchRole = (newRole: UserRole) => {
    if (user) {
        setUser({ ...user, activeRole: newRole });
    }
  };

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
        const existing = prev.find(i => i.id === item.id);
        if (existing) {
            return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...prev, item];
    });
    setNotification(`${item.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromCart = (id: string | number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string | number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView(AppView.WALLET);
  };

  const wrapInLayout = (content: React.ReactNode) => (
    <Layout 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        user={user} 
        cart={cart}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
        onOpenCart={() => setIsCartOpen(true)}
    >
        {content}
        {notification && (
            <div className="fixed bottom-6 right-6 z-[200] bg-emerald-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-10 border border-emerald-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold">{notification}</span>
            </div>
        )}
    </Layout>
  );

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingPage onEnterApp={handleLoginTrigger} />;
      case AppView.DASHBOARD:
        return wrapInLayout(<Dashboard onNavigate={setCurrentView} />);
      case AppView.AI_ASSISTANT:
        return wrapInLayout(<AIChat />);
      case AppView.MARKETPLACE:
        return wrapInLayout(<Marketplace onAddToCart={handleAddToCart} user={user} />);
      case AppView.TRANSPORT:
        return wrapInLayout(<Transport />);
      case AppView.ACCOMMODATION:
        return wrapInLayout(<Accommodation user={user} />);
      case AppView.TOURISM:
        return wrapInLayout(<Tourism />);
      case AppView.EVENTS:
        return wrapInLayout(<Events user={user} />);
      case AppView.HEALTH:
        return wrapInLayout(<Health />);
      case AppView.SECURITY:
        return wrapInLayout(<Security />);
      case AppView.SPORTS:
        return wrapInLayout(<Sports />);
      case AppView.UTILITIES:
        return wrapInLayout(<Utilities />);
      case AppView.WALLET:
        return wrapInLayout(<Wallet />);
      case AppView.AI_AUTOMATION:
        return wrapInLayout(<Automation />);
      case AppView.GOVERNMENT:
        return wrapInLayout(<Government />);
      case AppView.BLOG:
        return wrapInLayout(<Blog user={user} />);
      case AppView.APPROVALS:
        return wrapInLayout(<Approvals />);
      default:
        return wrapInLayout(<PlaceholderView title="Module Under Construction" icon={Wrench} />);
    }
  };

  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLoginSuccess} 
      />
      <CartOverlay 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={handleCheckout}
      />
      {renderView()}
    </>
  );
};

export default App;
