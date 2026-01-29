import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Star, Filter, Search, Store, 
  Check, MessageCircle, MapPin, ShieldCheck, 
  ArrowRight, X, PlayCircle, Image as ImageIcon, ChevronRight, 
  LayoutGrid, BarChart3, Plus, Trash2, Edit3, 
  Package, TrendingUp, DollarSign, Eye, Camera, Save, ArrowUpRight,
  Truck, Award, Clock,
  Globe, Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CartItem, Product, User } from '../types.ts';
import { VendorChat } from './VendorChat.tsx';

const SALES_DATA = [
  { day: 'Mon', sales: 4200 }, { day: 'Tue', sales: 3800 }, { day: 'Wed', sales: 6500 },
  { day: 'Thu', sales: 5100 }, { day: 'Fri', sales: 8200 }, { day: 'Sat', sales: 9400 },
  { day: 'Sun', sales: 7200 },
];

const INITIAL_MARKET_PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: 'Premium Hand-Dyed Indigo Adire', 
    price: '35000', 
    discountPrice: '24500',
    vendor: 'Abeokuta Heritage Hub', 
    vendorId: 'v1',
    images: [
        'https://images.unsplash.com/photo-1550974720-33234d7d130f?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621419110127-12183e1628fc?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1584281722572-918903c72b22?q=80&w=2070&auto=format&fit=crop'
    ],
    description: 'Authentic 100% cotton fabric produced in Itoku Market. Each piece features ancestral Egba motifs that tell stories of strength and fertility.',
    features: ['100% Organic Indigo', 'Hand-Stitched Borders', 'Limited Heritage Series'],
    category: 'Textiles',
    rating: 4.9,
    reviews: 142,
    stock: 12,
    tags: ['Egba Heritage', 'Handmade', 'Eco-friendly']
  },
  { 
    id: 2, 
    name: 'Olumo Majesty Stone Carving', 
    price: '18500', 
    vendor: 'Gateways Arts Collective', 
    vendorId: 'v2',
    images: ['https://images.unsplash.com/photo-1459908676235-d5f02a50184b?q=80&w=2070&auto=format&fit=crop'],
    description: 'A hand-carved miniature representing the historic Olumo Rock.',
    category: 'Arts & Crafts',
    rating: 4.7,
    reviews: 56,
    stock: 5,
    tags: ['Souvenir', 'Sculpture']
  }
];

interface MarketplaceProps {
  onAddToCart: (item: CartItem) => void;
  user: User | null;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onAddToCart, user }) => {
  const [activeView, setActiveView] = useState<'buyer' | 'vendor'>('buyer');
  const [products, setProducts] = useState<Product[]>(INITIAL_MARKET_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatVendor, setActiveChatVendor] = useState<{ name: string; avatar?: string } | null>(null);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', price: '', category: 'Textiles', images: [], description: '', tags: []
  });

  const handleUploadProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
        ...newProduct,
        id: Date.now(),
        vendor: user?.name || 'Anonymous Vendor',
        vendorId: user?.id || 'anon',
        images: newProduct.images?.length ? newProduct.images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop'],
        rating: 0,
        reviews: 0,
        stock: 15,
        features: ['Certified Authentic', 'Verified by ISEYAA']
    } as Product;
    
    setProducts([product, ...products]);
    setIsAddingProduct(false);
    setNewProduct({ name: '', price: '', images: [], description: '' });
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {selectedProduct && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-12 bg-slate-900/80 backdrop-blur-3xl animate-in fade-in duration-500">
            <div className="bg-white w-full max-w-7xl h-full md:h-auto md:max-h-[92vh] rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border-[8px] border-white/20">
                <div className="md:w-[55%] bg-slate-100 relative group overflow-hidden">
                    <img src={selectedProduct.images[activeImgIdx]} className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-125" alt="" />
                    <button onClick={() => setSelectedProduct(null)} className="absolute top-8 left-8 p-5 bg-white/90 backdrop-blur-md rounded-[1.5rem] shadow-2xl text-slate-900 transition-all hover:scale-110 active:scale-90"><X className="w-7 h-7" /></button>
                </div>
                <div className="md:w-[45%] p-10 md:p-20 flex flex-col bg-white overflow-y-auto custom-scrollbar">
                    <div className="flex-1 space-y-10">
                        <div className="space-y-4">
                            <span className="px-5 py-2 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-200">{selectedProduct.category}</span>
                            <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter">{selectedProduct.name}</h2>
                            <button onClick={() => { setActiveChatVendor({ name: selectedProduct.vendor }); setIsChatOpen(true); }} className="flex items-center gap-3 text-emerald-600 font-black hover:text-emerald-700 transition-colors uppercase text-xs tracking-widest bg-emerald-50/50 px-4 py-2 rounded-xl border border-emerald-100/50">
                                <Store className="w-4 h-4" /> <span>Partner: {selectedProduct.vendor}</span>
                            </button>
                        </div>
                        <div className="flex items-baseline gap-6 border-y border-slate-50 py-8">
                            <span className="text-6xl font-black text-slate-900 tracking-tighter">₦ {Number(selectedProduct.discountPrice || selectedProduct.price).toLocaleString()}</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed text-xl font-medium">{selectedProduct.description}</p>
                    </div>
                    <div className="mt-16 flex gap-6">
                        <button onClick={() => { onAddToCart({...selectedProduct, price: selectedProduct.discountPrice || selectedProduct.price, image: selectedProduct.images[0], quantity: 1}); setSelectedProduct(null); }} className="flex-1 py-7 bg-emerald-600 text-white rounded-[2.5rem] font-black text-2xl hover:bg-emerald-700 shadow-2xl shadow-emerald-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-4">
                            <ShoppingBag className="w-8 h-8" /> Purchase Signal
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-[60] px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-5">
                <div className="bg-emerald-600 p-4 rounded-[1.5rem] shadow-2xl shadow-emerald-600/20"><ShoppingBag className="text-white w-8 h-8" /></div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">IṢẸ́YÁÁ Multi-Market</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-2 italic flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Ogun Digital Trade Protocol
                    </p>
                </div>
            </div>
            <div className="flex bg-slate-100 p-2 rounded-[2rem] border-2 border-slate-50 shadow-inner">
                <button onClick={() => setActiveView('buyer')} className={`flex items-center gap-3 px-10 py-4 rounded-[1.5rem] text-sm font-black transition-all ${activeView === 'buyer' ? 'bg-white shadow-2xl text-emerald-600 scale-105' : 'text-slate-500 hover:text-slate-900'}`}><LayoutGrid className="w-5 h-5" /> DISCOVER</button>
                <button onClick={() => setActiveView('vendor')} className={`flex items-center gap-3 px-10 py-4 rounded-[1.5rem] text-sm font-black transition-all ${activeView === 'vendor' ? 'bg-white shadow-2xl text-emerald-600 scale-105' : 'text-slate-500 hover:text-slate-900'}`}><Store className="w-5 h-5" /> MERCHANT CORE</button>
            </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-8 py-16">
        {activeView === 'buyer' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 animate-in fade-in duration-700">
                {products.map(p => (
                    <div key={p.id} onClick={() => { setSelectedProduct(p); setActiveImgIdx(0); }} className="group cursor-pointer bg-white rounded-[4rem] border-4 border-slate-50 shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all p-8 flex flex-col">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-100 relative mb-10">
                            <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]" alt="" />
                        </div>
                        <div className="flex-1 space-y-4 px-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-black text-slate-900 text-2xl leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">{p.name}</h3>
                                <span className="text-emerald-600 font-mono font-black text-2xl">₦{Number(p.discountPrice || p.price).toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2 border-t border-slate-50 pt-4"><Store className="w-3.5 h-3.5" /> {p.vendor}</p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 animate-in fade-in">
                <Store className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Merchant Core Online</h3>
                <p className="text-slate-500 mt-2">Manage your listings and trade signals here.</p>
            </div>
        )}
      </main>
      {activeChatVendor && <VendorChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} vendorName={activeChatVendor.name} />}
    </div>
  );
};