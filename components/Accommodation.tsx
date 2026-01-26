
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MapPin, Calendar, Users, Star, Filter, Heart, 
  CheckCircle2, Shield, Building, Home, Palmtree, ShieldCheck, 
  Info, TrendingUp, DollarSign, Eye, Plus, MoreHorizontal, 
  AlertCircle, Activity, X, Image as ImageIcon, Sparkles, 
  ChevronRight, ShieldAlert, ArrowRight, ChevronLeft, 
  Map as MapIcon, Tent, CreditCard, Lock, Mail, Download, Loader2,
  BedDouble, Wifi, Wind, Zap, Coffee, ShieldQuestion, Verified,
  LayoutGrid, Trash2, ListPlus, Banknote
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

const AMENITY_OPTIONS = [
  { id: 'wifi', name: 'High-speed WiFi', icon: Wifi },
  { id: 'ac', name: 'Air Conditioning', icon: Wind },
  { id: 'power', name: '24/7 Power', icon: Zap },
  { id: 'security', name: 'Secure Gated', icon: ShieldCheck },
  { id: 'breakfast', name: 'Breakfast Inc.', icon: Coffee }
];

const ROOM_TYPES = [
  { id: 'standard', name: 'Standard Room' },
  { id: 'deluxe', name: 'Deluxe Room' },
  { id: 'executive', name: 'Executive Suite' },
  { id: 'presidential', name: 'Presidential Suite' }
];

interface RoomInventory {
  type: string;
  count: number;
  price: number;
}

interface Property {
  id: string; 
  title: string; 
  type: 'Hotel' | 'Short-let' | 'Resort' | 'Homestay';
  location: string; 
  price: number; // Starting "From" price
  rating: number; 
  reviews: number; 
  image: string; 
  verified: boolean; 
  isVerifiedHost: boolean;
  complianceScore: number; 
  isNew?: boolean;
  bedrooms: number; // Total Units
  roomInventory: RoomInventory[];
  amenities: string[];
}

const INITIAL_PROPERTIES: Property[] = [
  { 
    id: '1', 
    title: 'The Rock Heritage Suites', 
    type: 'Hotel', 
    location: 'Abeokuta, Ogun State', 
    price: 25000, 
    rating: 4.8, 
    reviews: 124, 
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', 
    verified: true, 
    isVerifiedHost: true,
    complianceScore: 100,
    bedrooms: 24,
    roomInventory: [
        { type: 'Standard Room', count: 15, price: 25000 },
        { type: 'Deluxe Room', count: 5, price: 45000 },
        { type: 'Executive Suite', count: 4, price: 75000 }
    ],
    amenities: ['wifi', 'ac', 'power', 'security']
  },
  { 
    id: '2', 
    title: 'Modern Studio near Covenant Univ.', 
    type: 'Short-let', 
    location: 'Ota, Ogun State', 
    price: 18000, 
    rating: 4.6, 
    reviews: 45, 
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop', 
    verified: true, 
    isVerifiedHost: true,
    complianceScore: 98,
    bedrooms: 1,
    roomInventory: [
        { type: 'Standard Room', count: 1, price: 18000 }
    ],
    amenities: ['wifi', 'power', 'security']
  },
  { 
    id: '3', 
    title: 'Green Springs Golf Resort', 
    type: 'Resort', 
    location: 'Sagamu, Ogun State', 
    price: 65000, 
    rating: 4.9, 
    reviews: 89, 
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop', 
    verified: true, 
    isVerifiedHost: false,
    complianceScore: 100,
    bedrooms: 40,
    roomInventory: [
        { type: 'Deluxe Room', count: 20, price: 65000 },
        { type: 'Executive Suite', count: 15, price: 95000 },
        { type: 'Presidential Suite', count: 5, price: 250000 }
    ],
    amenities: ['wifi', 'ac', 'power', 'security', 'breakfast']
  }
];

export const Accommodation: React.FC<{ user: User | null }> = ({ user }) => {
  const [userMode, setUserMode] = useState<'guest' | 'host'>('guest');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);
  const [bookingStep, setBookingStep] = useState<'list' | 'confirm' | 'payment' | 'receipt'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);
  
  const [searchLocation, setSearchLocation] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const [newProp, setNewProp] = useState<Partial<Property>>({ 
    type: 'Short-let', 
    price: 0, 
    title: '', 
    location: '', 
    bedrooms: 0,
    amenities: [],
    roomInventory: []
  });

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

  const toggleAmenity = (id: string) => {
    setNewProp(prev => {
      const current = prev.amenities || [];
      const updated = current.includes(id) 
        ? current.filter(a => a !== id) 
        : [...current, id];
      return { ...prev, amenities: updated };
    });
  };

  const updateRoomCount = (type: string, delta: number) => {
    setNewProp(prev => {
        const inventory = [...(prev.roomInventory || [])];
        const existingIdx = inventory.findIndex(item => item.type === type);
        
        if (existingIdx > -1) {
            inventory[existingIdx].count = Math.max(0, inventory[existingIdx].count + delta);
            if (inventory[existingIdx].count === 0) {
                inventory.splice(existingIdx, 1);
            }
        } else if (delta > 0) {
            inventory.push({ type, count: 1, price: 10000 });
        }

        const totalBedrooms = inventory.reduce((acc, item) => acc + item.count, 0);
        return { ...prev, roomInventory: inventory, bedrooms: totalBedrooms };
    });
  };

  const updateRoomPrice = (type: string, price: number) => {
    setNewProp(prev => {
        const inventory = [...(prev.roomInventory || [])];
        const idx = inventory.findIndex(item => item.type === type);
        if (idx > -1) {
            inventory[idx].price = price;
        }
        return { ...prev, roomInventory: inventory };
    });
  };

  const handleAddPropertyFinal = () => {
    const inventory = newProp.roomInventory || [{ type: 'Standard Room', count: 1, price: 10000 }];
    const minPrice = inventory.length > 0 ? Math.min(...inventory.map(r => r.price)) : 10000;

    const propertyToAdd: Property = {
        id: Date.now().toString(), 
        title: newProp.title || 'Untitled Listing', 
        type: (newProp.type as any) || 'Short-let', 
        location: newProp.location || 'Ogun State',
        price: minPrice, 
        rating: 0, 
        reviews: 0, 
        verified: false, 
        isVerifiedHost: true,
        complianceScore: 75, 
        isNew: true,
        bedrooms: newProp.bedrooms || 1,
        roomInventory: inventory,
        amenities: newProp.amenities || [],
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop'
    };
    setProperties([propertyToAdd, ...properties]);
    setIsAddModalOpen(false);
    setModalStep(1);
    setNewProp({ type: 'Short-let', price: 0, title: '', location: '', bedrooms: 0, amenities: [], roomInventory: [] });
  };

  const categories = [
    { name: 'All', icon: null }, { name: 'Hotel', icon: Building },
    { name: 'Short-let', icon: Home }, { name: 'Resort', icon: Palmtree },
    { name: 'Homestay', icon: Tent }
  ];

  const filteredProperties = activeCategory === 'All' ? properties : properties.filter(p => p.type === activeCategory);

  if (bookingStep === 'receipt' && selectedProperty) {
      const selectedRoom = selectedProperty.roomInventory[selectedRoomIdx];
      const total = selectedRoom.price * 1.125;
      return (
          <div className="max-w-xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-8">
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                  <div className="bg-emerald-600 p-10 text-center text-white relative">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                          <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold">Booking Success!</h2>
                      <p className="mt-2">Your {selectedRoom.type} at {selectedProperty.title} is confirmed.</p>
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
    const selectedRoom = selectedProperty.roomInventory[selectedRoomIdx];
    const total = selectedRoom.price * 1.125;
    return (
      <div className="p-6 md:p-12 max-w-6xl mx-auto animate-in slide-in-from-right-10">
        <button onClick={() => setBookingStep('list')} className="text-slate-500 hover:text-slate-800 mb-8 flex items-center gap-2 text-sm font-bold transition-all group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" /> Back to exploration
        </button>
        <PaystackModal isOpen={isPaystackOpen} onClose={() => setIsPaystackOpen(false)} onSuccess={() => setBookingStep('receipt')} amount={total} email={user?.email || "citizen@ogun.gov.ng"} />
        <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3 space-y-12">
                 <div className="flex items-center justify-between">
                    <h2 className="text-4xl font-bold text-slate-900">{selectedProperty.title}</h2>
                    {selectedProperty.isVerifiedHost && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-100 font-black text-[10px] uppercase tracking-widest">
                        <Verified className="w-4 h-4 fill-current" /> Verified Host
                      </div>
                    )}
                 </div>
                 <img src={selectedProperty.image} className="aspect-[16/10] w-full rounded-3xl object-cover shadow-2xl" alt="" />
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                            <LayoutGrid className="w-4 h-4" /> Room Options
                        </h4>
                        <div className="grid gap-3">
                            {selectedProperty.roomInventory.map((room, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setSelectedRoomIdx(idx)}
                                    className={`flex justify-between items-center p-5 rounded-2xl border transition-all text-left group ${selectedRoomIdx === idx ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/10' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                                >
                                    <div>
                                        <p className={`font-bold ${selectedRoomIdx === idx ? 'text-emerald-900' : 'text-slate-700'}`}>{room.type}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{room.count} Available</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-lg font-black ${selectedRoomIdx === idx ? 'text-emerald-600' : 'text-slate-900'}`}>₦ {room.price.toLocaleString()}</p>
                                        {selectedRoomIdx === idx && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto mt-1" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> Property Amenities
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            {AMENITY_OPTIONS.filter(opt => selectedProperty.amenities.includes(opt.id)).map(amenity => (
                                <div key={amenity.id} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
                                    <amenity.icon className="w-5 h-5 text-emerald-500" />
                                    <span className="font-bold text-xs text-slate-700">{amenity.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>
            <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 sticky top-32">
                    <div className="mb-6 pb-6 border-b border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Selected Configuration</p>
                        <h4 className="text-xl font-bold text-slate-900 italic">{selectedRoom.type}</h4>
                    </div>
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-3xl font-bold text-slate-900">₦ {selectedRoom.price.toLocaleString()}</span>
                        <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Immediate Occupancy</span>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center mb-8">
                        <span className="font-bold text-slate-900">Total (Inc. Levies)</span>
                        <span className="font-bold text-emerald-600 text-2xl">₦ {total.toLocaleString()}</span>
                    </div>
                    <button onClick={() => setIsPaystackOpen(true)} className="w-full bg-[#3bb75e] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#2fa04f] transition-all shadow-xl active:scale-95">Verify & Authorize</button>
                    <p className="text-center text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-widest">ESCROW SECURED VIA OGUN-FIN CORE</p>
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
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh] border-4 border-white/20">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-20">
                    <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><X className="w-6 h-6" /></button>
                    <h3 className="text-2xl font-bold text-slate-900">
                        {modalStep === 1 ? "Property Identification" : modalStep === 2 ? "Location Node" : "Neural Room Config"}
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
                        <div className="space-y-8 animate-in slide-in-from-bottom-4">
                            <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Street Address & City</label>
                            <div className="relative group">
                                <MapPin className="absolute left-4 top-4 w-6 h-6 text-emerald-600" />
                                <input autoFocus type="text" value={newProp.location} onChange={e => setNewProp({...newProp, location: e.target.value})} placeholder="Enter area in Ogun State..." className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-bold transition-all" />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-slate-400 uppercase block mb-4">Select Amenities Available</label>
                              <div className="grid grid-cols-2 gap-4">
                                {AMENITY_OPTIONS.map(opt => (
                                  <button 
                                    key={opt.id}
                                    type="button"
                                    onClick={() => toggleAmenity(opt.id)}
                                    className={`p-4 rounded-xl border-2 flex items-center gap-3 font-bold transition-all ${newProp.amenities?.includes(opt.id) ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-400'}`}
                                  >
                                    <opt.icon className="w-5 h-5" />
                                    <span className="text-sm">{opt.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                        </div>
                    )}
                    {modalStep === 3 && (
                        <div className="space-y-10 animate-in slide-in-from-bottom-4">
                            <div>
                              <label className="text-xs font-bold text-slate-400 uppercase block mb-6">Room Configuration & Pricing</label>
                              <div className="grid gap-6">
                                {ROOM_TYPES.map(type => {
                                    const room = newProp.roomInventory?.find(i => i.type === type.name);
                                    const currentCount = room?.count || 0;
                                    const currentPrice = room?.price || 10000;
                                    
                                    return (
                                        <div key={type.id} className={`p-8 rounded-[2.5rem] border-2 transition-all ${currentCount > 0 ? 'bg-white border-emerald-500 shadow-xl' : 'bg-slate-50 border-slate-100 opacity-60 hover:opacity-100'}`}>
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${currentCount > 0 ? 'bg-emerald-600 text-white' : 'bg-white text-slate-300'} transition-colors`}>
                                                        <BedDouble className="w-6 h-6" />
                                                    </div>
                                                    <span className={`font-black uppercase tracking-tighter text-xl ${currentCount > 0 ? 'text-slate-900' : 'text-slate-400'}`}>{type.name}</span>
                                                </div>
                                                <div className="flex items-center gap-6 bg-white p-2 rounded-full border border-slate-100 shadow-sm">
                                                    <button type="button" onClick={() => updateRoomCount(type.name, -1)} className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 hover:text-red-500 active:scale-90 transition-all"><X className="w-4 h-4" /></button>
                                                    <span className="font-mono font-black text-xl w-6 text-center">{currentCount}</span>
                                                    <button type="button" onClick={() => updateRoomCount(type.name, 1)} className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-600 text-white shadow-lg active:scale-90 transition-all"><Plus className="w-4 h-4" /></button>
                                                </div>
                                            </div>

                                            {currentCount > 0 && (
                                                <div className="animate-in slide-in-from-top-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Price Per Night (₦)</label>
                                                    <div className="relative group">
                                                        <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-600" />
                                                        <input 
                                                            type="number" 
                                                            value={currentPrice} 
                                                            onChange={(e) => updateRoomPrice(type.name, Number(e.target.value))}
                                                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none font-black text-2xl tabular-nums transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                              </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-6 border-t border-slate-50 bg-white flex justify-between items-center">
                    {modalStep > 1 ? <button onClick={() => setModalStep(modalStep - 1)} className="px-8 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors">Back</button> : <div className="w-20"></div>}
                    <div className="flex-1 text-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Inventory: {newProp.bedrooms || 0} Units Configured</p>
                    </div>
                    {modalStep < 3 ? 
                        <button onClick={() => setModalStep(modalStep + 1)} className="bg-emerald-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 shadow-xl transition-all active:scale-95">Continue</button> :
                        <button 
                            disabled={(newProp.roomInventory?.length || 0) === 0}
                            onClick={handleAddPropertyFinal} 
                            className="bg-emerald-900 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-black shadow-xl transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:grayscale"
                        >
                            <CheckCircle2 className="w-5 h-5" /> Commit Listing
                        </button>
                    }
                </div>
            </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">{userMode === 'guest' ? 'Escape to Ogun State' : 'Host Control Center'}</h2>
           <p className="text-slate-500 mt-2 text-lg italic">Verified hospitality anchored to the state digital OS.</p>
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
                  <div key={p.id} className="group cursor-pointer" onClick={() => { setSelectedProperty(p); setSelectedRoomIdx(0); setBookingStep('confirm'); }}>
                      <div className="aspect-square relative overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-md">
                          <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-bold text-emerald-700 border border-emerald-50 shadow-sm"><ShieldCheck className="w-4 h-4 fill-current" /> State Verified</div>
                            {p.isVerifiedHost && (
                              <div className="flex items-center gap-1.5 bg-blue-600/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-white border border-blue-400/30 shadow-sm"><Verified className="w-4 h-4 fill-current" /> Verified Host</div>
                            )}
                          </div>
                          <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white backdrop-blur-md text-white hover:text-red-500 transition-all shadow-sm" onClick={(e) => { e.stopPropagation(); }}><Heart className="w-5 h-5" /></button>
                      </div>
                      <div className="mt-6 space-y-3">
                          <div className="flex justify-between items-start">
                              <h3 className="font-bold text-slate-900 text-xl group-hover:text-emerald-700 transition-colors leading-tight">{p.title}</h3>
                              <div className="flex items-center gap-1 text-sm font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg border border-amber-100">
                                  <Star className="w-3.5 h-3.5 fill-current" /> {p.rating}
                              </div>
                          </div>
                          <div className="flex items-center justify-between text-slate-500 text-sm font-medium">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> {p.location.split(',')[0]}</span>
                            <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-emerald-500" /> {p.bedrooms} Units</span>
                          </div>
                          <div className="flex gap-2 flex-wrap h-6 overflow-hidden">
                            {p.amenities.map(a => {
                              const AmenityIcon = AMENITY_OPTIONS.find(opt => opt.id === a)?.icon || ShieldQuestion;
                              return <AmenityIcon key={a} className="w-4 h-4 text-slate-300" />;
                            })}
                          </div>
                          <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
                              <div>
                                <span className="text-[10px] font-black text-slate-400 uppercase mr-1">from</span>
                                <span className="text-2xl font-bold text-slate-900">₦ {p.price.toLocaleString()}</span>
                              </div>
                              <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
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
                  <div><h4 className="font-bold text-emerald-900 text-3xl">Compliance: Active</h4><p className="text-emerald-700 text-xl mt-2 max-w-lg">Your hospitality license is currently active. Manage your <strong>Room Inventory & Specific Pricing</strong> nodes below.</p></div>
               </div>
               <div className="flex gap-4">
                  <button onClick={() => { setIsAddModalOpen(true); setModalStep(1); }} className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-xl shadow-emerald-900/10 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-3"><Plus className="w-6 h-6" /> List New Place</button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Your Verified Listings</h3>
                    <div className="grid gap-6">
                        {properties.map(p => (
                            <div key={p.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col md:flex-row items-center gap-8 group hover:border-emerald-500 transition-all">
                                <div className="w-40 h-40 rounded-[2rem] overflow-hidden shadow-2xl relative shrink-0">
                                    <img src={p.image} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{p.title}</h4>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase">{p.type}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {p.roomInventory.map((room, ri) => (
                                            <div key={ri} className="shrink-0 bg-white p-3 rounded-2xl border border-slate-100 flex flex-col gap-1 shadow-sm">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{room.type}</span>
                                                <span className="font-bold text-emerald-600 text-sm">₦ {room.price.toLocaleString()}</span>
                                                <span className="text-[8px] font-bold text-slate-500 uppercase">{room.count} units</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Primary Rate Start: <span className="text-emerald-600">₦ {p.price.toLocaleString()}</span></p>
                                        <div className="flex gap-2">
                                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-600 transition-colors"><ListPlus className="w-5 h-5" /></button>
                                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Market Dynamics</h3>
                    {[{t:'Net Earnings', v:'₦ 850,240', i:DollarSign, c:'text-blue-600', bg:'bg-blue-50'}, {t:'Avg Occupancy', v:'76%', i:TrendingUp, c:'text-amber-600', bg:'bg-amber-50'}, {t:'Listing Views', v:'3,412', i:Eye, c:'text-purple-600', bg:'bg-purple-50'}].map(s => (
                        <div key={s.t} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 hover:border-emerald-200 transition-all group">
                            <div className={`p-4 ${s.bg} rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform`}><s.i className={`w-8 h-8 ${s.c}`} /></div>
                            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">{s.v}</h3>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">{s.t} (November)</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
        .perspective { perspective: 1000px; }
      `}} />
    </div>
  );
};
