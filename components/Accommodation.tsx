
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MapPin, Calendar, Users, Star, Filter, Heart, 
  CheckCircle2, Shield, Building, Home, Palmtree, ShieldCheck, 
  Info, TrendingUp, DollarSign, Eye, Plus, MoreHorizontal, 
  AlertCircle, Activity, X, Image as ImageIcon, Sparkles, 
  ChevronRight, ShieldAlert, ArrowRight, ChevronLeft, 
  Map as MapIcon, Tent, CreditCard, Lock, Mail, Download, Loader2 
} from 'lucide-react';
import { User } from '../types';
import { PaystackModal } from './PaystackModal';

const OGUN_LOCATIONS = [
  "Olumo Rock, Abeokuta", 
  "MKO Abiola Stadium, Kuto", 
  "Covenant University, Ota", 
  "Babcock University, Ilishan-Remo", 
  "Redeemed Camp, Mowe", 
  "OPIC Plaza, Sagamu", 
  "Ijebu Ode City Center", 
  "Agbeloba House, Abeokuta", 
  "Ilaro Central", 
  "Abeokuta Train Station",
  "Governor's Office, Oke-Mosan",
  "June 12 Cultural Centre"
];

interface Property {
  id: string; title: string; type: 'Hotel' | 'Short-let' | 'Resort' | 'Homestay';
  location: string; price: number; rating: number; reviews: number; 
  image: string; verified: boolean; complianceScore: number; isNew?: boolean;
}

const INITIAL_PROPERTIES: Property[] = [
  { id: '1', title: 'The Rock Heritage Suites', type: 'Hotel', location: 'Abeokuta, Ogun State', price: 35000, rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', verified: true, complianceScore: 100 },
  { id: '2', title: 'Modern Studio near Covenant Univ.', type: 'Short-let', location: 'Ota, Ogun State', price: 18000, rating: 4.6, reviews: 45, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop', verified: true, complianceScore: 98 },
  { id: '3', title: 'Green Springs Golf Resort', type: 'Resort', location: 'Sagamu, Ogun State', price: 65000, rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop', verified: true, complianceScore: 100 }
];

export const Accommodation: React.FC<{ user: User | null }> = ({ user }) => {
  const [userMode, setUserMode] = useState<'guest' | 'host'>('guest');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingStep, setBookingStep] = useState<'list' | 'confirm' | 'payment' | 'receipt'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);
  
  const [searchLocation, setSearchLocation] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const [newProp, setNewProp] = useState<Partial<Property>>({ type: 'Short-let', price: 0, title: '', location: '' });

  const handleLocationChange = (val: string) => {
    setSearchLocation(val);
    if (val.length > 1) {
        setSuggestions(OGUN_LOCATIONS.filter(l => l.toLowerCase().includes(val.toLowerCase())));
    } else {
        setSuggestions([]);
    }
  };

  const handleDatePickerTrigger = () => {
    if (dateInputRef.current) {
        if (typeof dateInputRef.current.showPicker === 'function') {
            try {
                dateInputRef.current.showPicker();
            } catch (e) {
                dateInputRef.current.focus();
            }
        } else {
            dateInputRef.current.focus();
        }
    }
  };

  const handleAddPropertyFinal = () => {
    const propertyToAdd: Property = {
        id: Date.now().toString(), title: newProp.title || 'Untitled Listing', 
        type: (newProp.type as any) || 'Short-let', location: newProp.location || 'Ogun State',
        price: Number(newProp.price) || 10000, rating: 0, reviews: 0, verified: false, complianceScore: 75, isNew: true,
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop'
    };
    setProperties([propertyToAdd, ...properties]);
    setIsAddModalOpen(false);
    setModalStep(1);
    setNewProp({ type: 'Short-let', price: 0, title: '', location: '' });
  };

  const categories = [
    { name: 'All', icon: null }, { name: 'Hotel', icon: Building },
    { name: 'Short-let', icon: Home }, { name: 'Resort', icon: Palmtree }
  ];

  const filteredProperties = activeCategory === 'All' ? properties : properties.filter(p => p.type === activeCategory);

  if (bookingStep === 'receipt' && selectedProperty) {
      const total = selectedProperty.price * 1.125;
      return (
          <div className="max-w-xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-8">
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                  <div className="bg-emerald-600 p-10 text-center text-white relative">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                          <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold">Booking Success!</h2>
                      <p className="mt-2">Your stay at {selectedProperty.title} is confirmed.</p>
                  </div>
                  <div className="p-10 space-y-8">
                      <div className="flex justify-between border-b border-slate-50 pb-6">
                          <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction ID</p><p className="font-mono font-bold">OG-ACC-8829</p></div>
                          <div className="text-right"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Paid</p><p className="font-bold text-emerald-600">₦ {total.toLocaleString()}</p></div>
                      </div>
                      <button onClick={() => setBookingStep('list')} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold">Back to Dashboard</button>
                  </div>
              </div>
          </div>
      );
  }

  if (bookingStep === 'confirm' && selectedProperty) {
    const total = selectedProperty.price * 1.125;
    return (
      <div className="p-6 md:p-12 max-w-6xl mx-auto animate-in slide-in-from-right-10">
        <button onClick={() => setBookingStep('list')} className="text-slate-500 hover:text-slate-800 mb-8 flex items-center gap-2 text-sm font-bold transition-all group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" /> Back to exploration
        </button>
        <PaystackModal isOpen={isPaystackOpen} onClose={() => setIsPaystackOpen(false)} onSuccess={() => setBookingStep('receipt')} amount={total} email={user?.email || "citizen@ogun.gov.ng"} />
        <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3 space-y-12">
                 <h2 className="text-4xl font-bold text-slate-900">{selectedProperty.title}</h2>
                 <img src={selectedProperty.image} className="aspect-[16/10] w-full rounded-3xl object-cover shadow-2xl" alt="" />
            </div>
            <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 sticky top-32">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-3xl font-bold text-slate-900">₦ {selectedProperty.price.toLocaleString()}</span>
                        <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Available</span>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center mb-8">
                        <span className="font-bold text-slate-900">Total + Taxes</span>
                        <span className="font-bold text-emerald-600 text-2xl">₦ {total.toLocaleString()}</span>
                    </div>
                    <button onClick={() => setIsPaystackOpen(true)} className="w-full bg-[#3bb75e] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#2fa04f] transition-all shadow-xl active:scale-95">Confirm & Pay</button>
                    <p className="text-center text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-widest">SECURE PAYMENT VIA ISEYAA ESCROW</p>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-12 max-w-7xl mx-auto animate-in fade-in duration-700">
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] border-4 border-white/20">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-20">
                    <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><X className="w-6 h-6" /></button>
                    <h3 className="text-2xl font-bold text-slate-900">
                        {modalStep === 1 ? "Listing Category" : modalStep === 2 ? "Property Location" : "Base Pricing"}
                    </h3>
                    <div className="w-10"></div>
                </div>
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {modalStep === 1 && (
                        <div className="space-y-8 animate-in slide-in-from-bottom-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Listing Title</label>
                                <input autoFocus type="text" value={newProp.title} onChange={e => setNewProp({...newProp, title: e.target.value})} placeholder="e.g. Luxury Apartment near Olumo" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-bold text-lg transition-all" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {['Short-let', 'Hotel', 'Resort', 'Homestay'].map(t => (
                                    <button key={t} onClick={() => setNewProp({...newProp, type: t as any})} className={`p-6 rounded-2xl border-2 font-bold text-left transition-all ${newProp.type === t ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}>
                                        <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${newProp.type === t ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            {t === 'Hotel' ? <Building className="w-5 h-5" /> : t === 'Short-let' ? <Home className="w-5 h-5" /> : t === 'Resort' ? <Palmtree className="w-5 h-5" /> : <Tent className="w-5 h-5" />}
                                        </div>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {modalStep === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4">
                            <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Street Address & City</label>
                            <div className="relative group">
                                <MapPin className="absolute left-4 top-4 w-6 h-6 text-emerald-600" />
                                <input autoFocus type="text" value={newProp.location} onChange={e => setNewProp({...newProp, location: e.target.value})} placeholder="Enter area in Ogun State..." className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-bold transition-all" />
                            </div>
                        </div>
                    )}
                    {modalStep === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4">
                            <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Set Base Price (₦ / Night)</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">₦</span>
                                <input autoFocus type="number" value={newProp.price || ''} onChange={e => setNewProp({...newProp, price: Number(e.target.value)})} className="w-full pl-12 pr-5 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-bold text-3xl transition-all" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-6 border-t border-slate-50 bg-white flex justify-between items-center">
                    {modalStep > 1 ? <button onClick={() => setModalStep(modalStep - 1)} className="px-8 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors">Back</button> : <div className="w-20"></div>}
                    <div className="flex-1"></div>
                    {modalStep < 3 ? 
                        <button onClick={() => setModalStep(modalStep + 1)} className="bg-emerald-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 shadow-xl transition-all active:scale-95">Continue</button> :
                        <button onClick={handleAddPropertyFinal} className="bg-emerald-900 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-black shadow-xl transition-all active:scale-95 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Publish Listing</button>
                    }
                </div>
            </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">{userMode === 'guest' ? 'Escape to Ogun State' : 'Host Control Center'}</h2>
           <p className="text-slate-500 mt-2 text-lg">Verified hospitality in the heart of the Gateway State.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button onClick={() => { setUserMode('guest'); setBookingStep('list'); }} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${userMode === 'guest' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-800'}`}>Guest</button>
            <button onClick={() => { setUserMode('host'); setBookingStep('list'); }} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${userMode === 'host' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-800'}`}>Host</button>
        </div>
      </div>

      {userMode === 'guest' ? (
        <>
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-6 items-center relative z-40">
              <div className="flex-1 w-full relative group">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5 block ml-1">Destination</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:ring-emerald-500/20 transition-all border border-transparent group-focus-within:border-emerald-500">
                      <MapPin className="w-6 h-6 text-emerald-600 cursor-pointer" onClick={() => document.getElementById('accLocSearch')?.focus()} />
                      <input id="accLocSearch" type="text" autoComplete="off" value={searchLocation} onChange={e => handleLocationChange(e.target.value)} placeholder="Explore Abeokuta, Ota, Ijebu..." className="w-full bg-transparent outline-none text-slate-800 font-bold placeholder:font-normal" />
                  </div>
                  {suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 rounded-[2rem] shadow-2xl z-[100] overflow-hidden animate-in slide-in-from-top-2">
                          <div className="p-3 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-6">Landmarks in Ogun State</div>
                          {suggestions.map(s => (
                              <button key={s} onClick={() => { setSearchLocation(s); setSuggestions([]); }} className="w-full px-6 py-4 text-left hover:bg-emerald-50 text-sm font-bold text-slate-700 flex items-center gap-4 transition-colors group/item border-b border-slate-50 last:border-0">
                                  <div className="p-2 bg-white rounded-xl shadow-sm group-hover/item:bg-emerald-100 transition-colors"><MapPin className="w-4 h-4 text-slate-300 group-hover/item:text-emerald-600" /></div>
                                  {s}
                              </button>
                          ))}
                      </div>
                  )}
              </div>
              <div className="flex-1 w-full relative">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5 block ml-1">Arrival Date</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all border border-transparent" onClick={handleDatePickerTrigger}>
                      <Calendar className="w-6 h-6 text-emerald-600" />
                      <input ref={dateInputRef} type="date" className="w-full bg-transparent outline-none text-slate-800 font-bold cursor-pointer" />
                  </div>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 group">
                  <Search className="w-7 h-7 group-hover:rotate-12 transition-transform" />
              </button>
          </div>

          <div className="flex overflow-x-auto gap-4 scrollbar-hide py-2">
              {categories.map((cat) => (
                  <button key={cat.name} onClick={() => setActiveCategory(cat.name)} className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl whitespace-nowrap transition-all border-2 ${activeCategory === cat.name ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105' : 'bg-white text-slate-600 border-slate-100 hover:border-emerald-200'}`}>
                      {cat.icon && <cat.icon className="w-5 h-5" />} <span className="text-sm font-bold tracking-wide">{cat.name}</span>
                  </button>
              ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-4">
              {filteredProperties.map((p) => (
                  <div key={p.id} className="group cursor-pointer" onClick={() => { setSelectedProperty(p); setBookingStep('confirm'); }}>
                      <div className="aspect-square relative overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-md">
                          <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-bold text-emerald-700 border border-emerald-50 shadow-sm"><ShieldCheck className="w-4 h-4 fill-current" /> State Verified</div>
                          <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white backdrop-blur-md text-white hover:text-red-500 transition-all shadow-sm" onClick={(e) => { e.stopPropagation(); }}><Heart className="w-5 h-5" /></button>
                      </div>
                      <div className="mt-6 space-y-2">
                          <div className="flex justify-between items-start">
                              <h3 className="font-bold text-slate-900 text-xl group-hover:text-emerald-700 transition-colors">{p.title}</h3>
                              <div className="flex items-center gap-1 text-sm font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg border border-amber-100">
                                  <Star className="w-3.5 h-3.5 fill-current" /> {p.rating}
                              </div>
                          </div>
                          <p className="text-slate-500 text-sm font-medium flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {p.location}</p>
                          <div className="pt-2">
                              <span className="text-2xl font-bold text-slate-900">₦ {p.price.toLocaleString()}</span>
                              <span className="text-slate-400 font-medium text-sm ml-1">/ night</span>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        </>
      ) : (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="bg-emerald-50 border border-emerald-100 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
               <div className="flex items-start gap-8">
                  <div className="p-5 bg-emerald-100 rounded-[1.5rem] text-emerald-600 shadow-inner"><ShieldCheck className="w-12 h-12" /></div>
                  <div><h4 className="font-bold text-emerald-900 text-3xl">Compliance: Active</h4><p className="text-emerald-700 text-xl mt-2 max-w-lg">Your hospitality license is currently active. New listings will be auto-verified within 1 hour.</p></div>
               </div>
               <button onClick={() => { setIsAddModalOpen(true); setModalStep(1); }} className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-xl shadow-emerald-900/10 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-3"><Plus className="w-6 h-6" /> List New Place</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[{t:'Net Earnings', v:'₦ 850,240', i:DollarSign, c:'text-blue-600', bg:'bg-blue-50'}, {t:'Avg Occupancy', v:'76%', i:TrendingUp, c:'text-amber-600', bg:'bg-amber-50'}, {t:'Listing Views', v:'3,412', i:Eye, c:'text-purple-600', bg:'bg-purple-50'}].map(s => (
                    <div key={s.t} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 hover:border-emerald-200 transition-all group">
                        <div className={`p-4 ${s.bg} rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform`}><s.i className={`w-8 h-8 ${s.c}`} /></div>
                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">{s.v}</h3><p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">{s.t} (November)</p>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};
