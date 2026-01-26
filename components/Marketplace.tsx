
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
import { CartItem, Product, User } from '../types';
import { VendorChat } from './VendorChat';

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
    description: 'Authentic 100% cotton fabric produced in Itoku Market. Each piece features ancestral Egba motifs that tell stories of strength and fertility. Our dye is sourced from native indigo pits, ensuring zero chemical additives.',
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
    description: 'A hand-carved miniature representing the historic Olumo Rock. Sculpted from local granite by master artisans in Abeokuta.',
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

  // Form State for new product
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
      {/* Product Detail Overlay */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-12 bg-slate-900/80 backdrop-blur-3xl animate-in fade-in duration-500">
            <div className="bg-white w-full max-w-7xl h-full md:h-auto md:max-h-[92vh] rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border-[8px] border-white/20">
                <div className="md:w-[55%] bg-slate-100 relative group overflow-hidden">
                    <img src={selectedProduct.images[activeImgIdx]} className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-125" alt="" />
                    <button onClick={() => setSelectedProduct(null)} className="absolute top-8 left-8 p-5 bg-white/90 backdrop-blur-md rounded-[1.5rem] shadow-2xl text-slate-900 transition-all hover:scale-110 active:scale-90"><X className="w-7 h-7" /></button>
                    
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 px-6 py-4 bg-black/30 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl">
                        {selectedProduct.images.map((img, i) => (
                            <button key={i} onClick={() => setActiveImgIdx(i)} className={`w-20 h-20 rounded-2xl overflow-hidden border-4 transition-all ${activeImgIdx === i ? 'border-emerald-500 scale-110 shadow-emerald-500/50' : 'border-white/20 opacity-50 hover:opacity-100'}`}>
                                <img src={img} className="w-full h-full object-cover" alt="" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="md:w-[45%] p-10 md:p-20 flex flex-col bg-white overflow-y-auto custom-scrollbar">
                    <div className="flex-1 space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-5 py-2 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-200">{selectedProduct.category}</span>
                                <span className="px-5 py-2 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-slate-200 flex items-center gap-2"><Award className="w-3 h-3" /> State Certified</span>
                            </div>
                            <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter">{selectedProduct.name}</h2>
                            <button onClick={() => { setActiveChatVendor({ name: selectedProduct.vendor }); setIsChatOpen(true); }} className="flex items-center gap-3 text-emerald-600 font-black hover:text-emerald-700 transition-colors uppercase text-xs tracking-widest bg-emerald-50/50 px-4 py-2 rounded-xl border border-emerald-100/50">
                                <Store className="w-4 h-4" /> <span>Partner: {selectedProduct.vendor}</span>
                            </button>
                        </div>

                        <div className="flex items-baseline gap-6 border-y border-slate-50 py-8">
                            <div className="flex flex-col">
                                {selectedProduct.discountPrice && <span className="text-xl text-slate-400 line-through font-bold">₦ {Number(selectedProduct.price).toLocaleString()}</span>}
                                <span className="text-6xl font-black text-slate-900 tracking-tighter">₦ {Number(selectedProduct.discountPrice || selectedProduct.price).toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5 text-amber-500 font-black text-xl">
                                    <Star className="w-5 h-5 fill-current" /> {selectedProduct.rating}
                                </div>
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{selectedProduct.reviews} Verified Reviews</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-black text-slate-900 uppercase tracking-[0.3em] text-[10px]">Merchant Narrative</h3>
                            <p className="text-slate-500 leading-relaxed text-xl font-medium">{selectedProduct.description}</p>
                            
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                {selectedProduct.features?.map((f, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                        <Check className="w-5 h-5 text-emerald-500" /> {f}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 flex gap-6">
                        <button onClick={() => { onAddToCart({...selectedProduct, price: selectedProduct.discountPrice || selectedProduct.price, image: selectedProduct.images[0], quantity: 1}); setSelectedProduct(null); }} className="flex-1 py-7 bg-emerald-600 text-white rounded-[2.5rem] font-black text-2xl hover:bg-emerald-700 shadow-2xl shadow-emerald-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-4">
                            <ShoppingBag className="w-8 h-8" /> Purchase Signal
                        </button>
                        <button onClick={() => { setActiveChatVendor({ name: selectedProduct.vendor }); setIsChatOpen(true); }} className="p-7 border-4 border-slate-100 rounded-[2.5rem] text-slate-400 hover:text-emerald-600 hover:border-emerald-500 transition-all active:scale-95"><MessageCircle className="w-10 h-10" /></button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Main Marketplace Header */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-[60] px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-5">
                <div className="bg-emerald-600 p-4 rounded-[1.5rem] shadow-2xl shadow-emerald-600/20"><ShoppingBag className="text-white w-8 h-8" /></div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">IṢẸ́YÁÁ Multi-Market</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
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
            <div className="space-y-20 animate-in fade-in duration-700">
                {/* Search & Intelligence */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input type="text" placeholder="Search for heritage textiles, organic produce, or master artisans..." className="w-full pl-20 pr-10 py-7 bg-white border-4 border-slate-50 rounded-[3rem] focus:border-emerald-500 outline-none text-xl font-bold shadow-xl shadow-slate-200/20 transition-all" />
                    </div>
                    <button className="px-10 py-7 bg-white border-4 border-slate-50 rounded-[3rem] flex items-center gap-4 font-black text-slate-600 hover:border-emerald-500 transition-all shadow-xl shadow-slate-200/20"><Filter className="w-7 h-7" /> FILTERS</button>
                </div>

                {/* Discovery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                    {products.map(p => (
                        <div key={p.id} onClick={() => { setSelectedProduct(p); setActiveImgIdx(0); }} className="group cursor-pointer bg-white rounded-[4rem] border-4 border-slate-50 shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all p-8 flex flex-col">
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-100 relative mb-10">
                                <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]" alt="" />
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-emerald-800 border border-white shadow-2xl uppercase tracking-widest flex items-center gap-2 w-fit"><ShieldCheck className="w-4 h-4" /> VERIFIED ORIGIN</span>
                                    {p.discountPrice && <span className="bg-brand-yellow px-4 py-2 rounded-2xl text-[10px] font-black text-emerald-950 shadow-2xl uppercase tracking-widest w-fit animate-pulse">Flash Sale</span>}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-12">
                                    <div className="px-8 py-4 bg-white rounded-full font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3">Quick Look <ArrowRight className="w-4 h-4" /></div>
                                </div>
                            </div>
                            <div className="flex-1 space-y-4 px-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-black text-slate-900 text-2xl leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">{p.name}</h3>
                                    <div className="flex flex-col items-end">
                                        {p.discountPrice && <span className="text-sm text-slate-300 line-through font-bold">₦{Number(p.price).toLocaleString()}</span>}
                                        <span className="text-emerald-600 font-mono font-black text-2xl">₦{Number(p.discountPrice || p.price).toLocaleString()}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2 border-t border-slate-50 pt-4"><Store className="w-3.5 h-3.5" /> {p.vendor}</p>
                                <div className="flex items-center gap-1 text-amber-500 font-black text-xs">
                                    <Star className="w-3.5 h-3.5 fill-current" /> {p.rating} <span className="text-slate-300 ml-1">({p.reviews})</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="space-y-16 animate-in fade-in duration-700">
                {/* MERCHANT COMMAND CENTER */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <div className="lg:col-span-3 space-y-10">
                        {/* Analytics Suite */}
                        <div className="bg-white p-12 rounded-[4rem] border-4 border-slate-50 shadow-2xl shadow-slate-200/40">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                                <div>
                                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Venture Performance</h2>
                                    <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">Real-time Trade Synchronization</p>
                                </div>
                                <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-[1.5rem] text-xs font-black flex items-center gap-3 border border-emerald-100">
                                    <TrendingUp className="w-5 h-5" /> +18.4% GROWTH DETECTED
                                </div>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={SALES_DATA}>
                                        <defs>
                                            <linearGradient id="vendorSales" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#05A446" stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor="#05A446" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="day" hide />
                                        <YAxis hide />
                                        <Tooltip contentStyle={{ borderRadius: '2rem', border: 'none', boxShadow: '0 40px 80px -12px rgb(0 0 0 / 0.2)', fontWeight: 'bold' }} />
                                        <Area type="monotone" dataKey="sales" stroke="#05A446" strokeWidth={6} fillOpacity={1} fill="url(#vendorSales)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-4 gap-10 mt-16 border-t border-slate-50 pt-16">
                                <div className="text-center group cursor-pointer">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-3">Gross Signals</p>
                                    <p className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-emerald-600 transition-colors">₦ 1.2M</p>
                                </div>
                                <div className="text-center border-x border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-3">Offerings</p>
                                    <p className="text-3xl font-black text-slate-900 tracking-tighter">{products.length}</p>
                                </div>
                                <div className="text-center border-r border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-3">Integrity</p>
                                    <p className="text-3xl font-black text-slate-900 tracking-tighter flex items-center justify-center gap-2">4.9 <Star className="w-5 h-5 fill-current text-amber-500" /></p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-3">Sync Status</p>
                                    <p className="text-sm font-black text-emerald-500 bg-emerald-50 py-1 rounded-full uppercase tracking-widest border border-emerald-100">Active</p>
                                </div>
                            </div>
                        </div>

                        {/* PRODUCT MATRIX (Inventory) */}
                        <div className="bg-white rounded-[4rem] border-4 border-slate-50 shadow-2xl shadow-slate-200/40 overflow-hidden">
                            <div className="p-12 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Market Offerings</h3>
                                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Multi-Category Product Sync</p>
                                </div>
                                <button onClick={() => setIsAddingProduct(true)} className="bg-emerald-600 text-white px-10 py-5 rounded-[2rem] font-black text-sm hover:bg-emerald-700 shadow-2xl shadow-emerald-600/20 transition-all flex items-center gap-3 active:scale-95"><Plus className="w-6 h-6" /> NEW OFFERING</button>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {products.map(p => (
                                    <div key={p.id} className="p-10 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                                        <div className="flex items-center gap-8">
                                            <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-slate-100 shadow-2xl relative">
                                                <img src={p.images[0]} className="w-full h-full object-cover" alt="" />
                                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 text-xl tracking-tight leading-tight">{p.name}</h4>
                                                <div className="flex items-center gap-6 mt-3">
                                                    <span className="text-lg font-black text-emerald-600">₦{Number(p.price).toLocaleString()}</span>
                                                    <span className="text-[9px] bg-slate-100 px-3 py-1.5 rounded-full text-slate-500 font-black uppercase tracking-[0.2em]">{p.category}</span>
                                                    <div className="flex items-center gap-2">
                                                        <Package className="w-4 h-4 text-slate-300" />
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.stock} Units</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                            <button className="p-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-emerald-600 hover:border-emerald-500 transition-all shadow-xl"><Edit3 className="w-6 h-6" /></button>
                                            <button className="p-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-red-500 hover:border-red-200 transition-all shadow-xl"><Trash2 className="w-6 h-6" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* VENDOR SIDEBAR PROFILE */}
                    <div className="space-y-10">
                         <div className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl border-[6px] border-white">
                             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -translate-y-20 translate-x-20"></div>
                             <h3 className="text-xl font-black mb-10 relative z-10 tracking-[0.2em] uppercase opacity-60">Merchant Identity</h3>
                             <div className="flex flex-col items-center text-center gap-6 relative z-10">
                                 <div className="w-32 h-32 rounded-[3rem] border-8 border-white/10 overflow-hidden shadow-2xl"><img src={user?.avatar} className="w-full h-full object-cover" alt="" /></div>
                                 <div>
                                     <h4 className="text-3xl font-black tracking-tight">{user?.name}</h4>
                                     <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.4em] mt-2">Verified Master Merchant</p>
                                 </div>
                             </div>
                             <div className="mt-12 space-y-8 relative z-10 border-t border-white/5 pt-10">
                                 <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest opacity-80"><span>Compliance Node</span><span className="text-emerald-400">OPTIMAL</span></div>
                                 <div className="h-3 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 shadow-[0_0_20px_#10b981]" style={{ width: '98%' }}></div></div>
                                 
                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                         <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Response Time</p>
                                         <p className="text-xl font-black">2m</p>
                                     </div>
                                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                         <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Orders</p>
                                         <p className="text-xl font-black">142</p>
                                     </div>
                                 </div>
                                 
                                 <button className="w-full py-5 border-2 border-white/10 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-white/5 transition-all flex items-center justify-center gap-3">Store Protocols <ArrowUpRight className="w-4 h-4" /></button>
                             </div>
                         </div>

                         <div className="bg-white rounded-[3rem] p-10 border-4 border-slate-50 shadow-2xl shadow-slate-200/40">
                             <h3 className="font-black text-slate-900 uppercase tracking-[0.2em] text-[10px] mb-10 flex items-center gap-3"><Activity className="w-5 h-5 text-emerald-500" /> Operational Insights</h3>
                             <div className="space-y-10">
                                 <div className="flex gap-6 group">
                                     <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform"><Truck className="w-7 h-7" /></div>
                                     <div>
                                         <p className="text-sm font-black text-slate-900 tracking-tight">Fulfillment Signal</p>
                                         <p className="text-xs text-slate-500 font-bold mt-1">3 pending pickups in Abeokuta.</p>
                                     </div>
                                 </div>
                                 <div className="flex gap-6 group">
                                     <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform"><Clock className="w-7 h-7" /></div>
                                     <div>
                                         <p className="text-sm font-black text-slate-900 tracking-tight">Stock Warning</p>
                                         <p className="text-xs text-slate-500 font-bold mt-1">"Indigo Adire" critical level.</p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>

                {/* ADD NEW OFFERING MODAL */}
                {isAddingProduct && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-emerald-950/90 backdrop-blur-3xl animate-in fade-in duration-500">
                        <form onSubmit={handleUploadProduct} className="bg-white w-full max-w-3xl rounded-[4rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-[10px] border-white/20">
                            <div className="p-12 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
                                <div>
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tight">Configure Signal</h3>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">New Multi-Market Offering</p>
                                </div>
                                <button type="button" onClick={() => setIsAddingProduct(false)} className="p-5 hover:bg-slate-100 rounded-[1.5rem] transition-all"><X className="w-8 h-8 text-slate-400" /></button>
                            </div>
                            
                            <div className="p-12 space-y-10 overflow-y-auto custom-scrollbar flex-1">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-4">Offering Official Title</label>
                                    <input required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. Master-Craft Gbedu Drum Set" className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:border-emerald-500 outline-none font-black text-2xl" />
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-4">Listing Price (₦)</label>
                                        <input required type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} placeholder="25000" className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:border-emerald-500 outline-none font-black text-2xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-4">Market Node</label>
                                        <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:border-emerald-500 outline-none font-black text-xl appearance-none bg-white cursor-pointer">
                                            <option>Textiles</option>
                                            <option>Arts & Crafts</option>
                                            <option>Native Souvenirs</option>
                                            <option>High-End Fashion</option>
                                            <option>Organic Agro</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-4">Offering Visuals (Multi-Node Gallery)</label>
                                    <div className="grid grid-cols-4 gap-6">
                                        {[0,1,2,3].map(idx => (
                                            <div key={idx} className="aspect-square bg-slate-50 rounded-[1.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300 hover:border-emerald-500 hover:text-emerald-500 transition-all cursor-pointer group">
                                                <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Node {idx+1}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <input type="text" placeholder="Or paste primary visual URL protocol here..." className="w-full px-6 py-4 text-xs bg-slate-50 border-2 border-slate-100 rounded-[1rem] outline-none italic font-bold" onChange={e => setNewProduct({...newProduct, images: [e.target.value]})}/>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-4">Product Narrative & Heritage Details</label>
                                    <textarea required rows={5} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} placeholder="Describe the ancestral techniques, authentic materials, and unique value proposition..." className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:border-emerald-500 outline-none font-bold text-lg leading-relaxed"></textarea>
                                </div>
                            </div>

                            <div className="p-12 border-t border-slate-50 bg-slate-50 flex gap-6">
                                <button type="button" onClick={() => setIsAddingProduct(false)} className="flex-1 py-6 rounded-[2rem] font-black text-slate-400 hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">Terminate Config</button>
                                <button type="submit" className="flex-[2] py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl hover:bg-emerald-700 shadow-2xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-4"><Save className="w-6 h-6" /> BROADCAST LISTING</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        )}
      </main>
      
      {activeChatVendor && <VendorChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} vendorName={activeChatVendor.name} />}
    </div>
  );
};
