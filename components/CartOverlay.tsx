
import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { CartItem } from '../types';
import { PaystackModal } from './PaystackModal';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string | number) => void;
  onUpdateQuantity: (id: string | number, delta: number) => void;
  onCheckout: () => void;
}

export const CartOverlay: React.FC<CartOverlayProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity, 
  onCheckout 
}) => {
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  const vat = subtotal * 0.075;
  const stateLevy = subtotal * 0.01;
  const total = subtotal + vat + stateLevy;

  const handleCheckoutClick = () => {
    setIsPaystackOpen(true);
  };

  const handlePaystackSuccess = () => {
    onCheckout();
  };

  return (
    <>
      <PaystackModal 
        isOpen={isPaystackOpen}
        onClose={() => setIsPaystackOpen(false)}
        onSuccess={handlePaystackSuccess}
        amount={total}
        email="citizen@ogun.gov.ng"
      />

      <div className="fixed inset-0 z-[150] flex justify-end">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={onClose}
        />

        {/* Drawer */}
        <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Your Shopping Cart</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Cart is empty</h3>
                <p className="text-slate-500 text-sm max-w-[200px]">Looks like you haven't added any authentic Ogun products yet.</p>
                <button 
                  onClick={onClose}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 text-sm truncate pr-2">{item.name}</h4>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.vendor}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-emerald-600">₦ {Number(item.price).toLocaleString()}</span>
                      <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-lg border border-slate-100">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-500 hover:text-emerald-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-700 min-w-[20px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-500 hover:text-emerald-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="text-slate-900 font-bold">₦ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium flex items-center gap-1">VAT (7.5%) <Info className="w-3 h-3" /></span>
                  <span className="text-slate-900 font-bold">₦ {vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Dev. Levy (1%)</span>
                  <span className="text-slate-900 font-bold">₦ {stateLevy.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-emerald-600">₦ {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-emerald-100/50 p-3 rounded-xl flex items-start gap-3 border border-emerald-100">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-[10px] text-emerald-800 leading-relaxed font-medium">
                    Your purchase is protected by <strong>ISEYAA Escrow</strong>. Funds are only released to vendors once you confirm receipt of goods.
                  </p>
              </div>

              <button 
                onClick={handleCheckoutClick}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20 active:scale-[0.98]"
              >
                Secure Checkout with Paystack <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                Secured by Paystack & OGUN-FIN CORE
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
