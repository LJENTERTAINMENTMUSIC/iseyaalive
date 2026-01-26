
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Phone, Video, MoreVertical, Send, Paperclip, 
  Mic, Image as ImageIcon, Smile, Check, CheckCheck, 
  ArrowLeft, Camera, PhoneOff, MicOff, Volume2, 
  Maximize2, Minimize2, Play, Square, Loader2
} from 'lucide-react';

interface Message {
  id: string;
  text?: string;
  type: 'text' | 'voice' | 'image';
  sender: 'user' | 'vendor';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  duration?: string;
}

interface VendorChatProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
  vendorAvatar?: string;
}

export const VendorChat: React.FC<VendorChatProps> = ({ isOpen, onClose, vendorName, vendorAvatar }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: `Hello! Welcome to ${vendorName}. How can we help you today?`, 
      type: 'text', 
      sender: 'vendor', 
      timestamp: '10:45 AM', 
      status: 'read' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [callType, setCallType] = useState<'none' | 'voice' | 'video'>('none');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(t => t + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSend = (text?: string) => {
    const msg = text || inputText;
    if (!msg.trim() && !text) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: msg,
      type: 'text',
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate Vendor Response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your inquiry! Our team is currently reviewing your request and will get back to you shortly.",
          type: 'text',
          sender: 'vendor',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }, 1000);
  };

  const handleVoiceNote = () => {
    if (isRecording) {
      // Send the recording
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'voice',
        duration: formatTime(recordingTime),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages(prev => [...prev, newMessage]);
      setIsRecording(false);
    } else {
      setIsRecording(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex flex-col md:items-end md:justify-end md:p-6 pointer-events-none">
      {/* Call UI Overlay */}
      {callType !== 'none' && (
        <div className="fixed inset-0 z-[300] bg-slate-900 flex flex-col pointer-events-auto animate-in fade-in zoom-in duration-300">
          {callType === 'video' ? (
            <div className="relative flex-1 bg-black">
              {/* Main Video (Vendor) */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <img src={vendorAvatar || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop'} className="w-full h-full object-cover opacity-50 blur-sm" alt="" />
                 <div className="z-10 text-center">
                    <div className="w-32 h-32 rounded-full border-4 border-emerald-500 overflow-hidden mx-auto mb-4 animate-pulse">
                         <img src={vendorAvatar || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop'} alt="" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{vendorName}</h2>
                    <p className="text-emerald-400 font-bold flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> CONNECTING...
                    </p>
                 </div>
              </div>
              {/* User Video (Selfie) */}
              <div className="absolute top-8 right-8 w-32 h-48 bg-slate-800 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden overflow-hidden">
                   <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                        <Camera className="text-white/20 w-8 h-8" />
                   </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gradient-to-b from-slate-800 to-slate-950">
               <div className="w-32 h-32 rounded-full border-4 border-emerald-500 overflow-hidden mb-6 shadow-2xl">
                    <img src={vendorAvatar || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop'} alt="" className="w-full h-full object-cover" />
               </div>
               <h2 className="text-3xl font-bold text-white mb-2">{vendorName}</h2>
               <p className="text-slate-400 text-lg">ISEYAA Secure Voice Call</p>
               <div className="mt-8 flex gap-4">
                  <div className="px-4 py-2 bg-white/5 backdrop-blur rounded-full text-white text-sm font-bold border border-white/10">00:12</div>
               </div>
            </div>
          )}

          {/* Call Controls */}
          <div className="h-32 bg-slate-900/80 backdrop-blur-md flex items-center justify-center gap-8 px-8 border-t border-white/10">
              <button className="p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                  <MicOff className="w-6 h-6" />
              </button>
              <button className="p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                  <Volume2 className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setCallType('none')}
                className="p-6 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-xl shadow-red-900/40 transition-all transform active:scale-90"
              >
                  <PhoneOff className="w-8 h-8" />
              </button>
          </div>
        </div>
      )}

      {/* Chat Window */}
      <div className="w-full md:w-[450px] h-full md:h-[700px] bg-white md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden pointer-events-auto animate-in slide-in-from-bottom-10 duration-500 border-4 border-white">
        
        {/* Header */}
        <div className="bg-emerald-600 p-4 flex items-center justify-between text-white shadow-lg">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="md:hidden p-2 -ml-2">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="relative">
                <img src={vendorAvatar || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop'} className="w-10 h-10 rounded-full border border-white/20 object-cover" alt="" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">{vendorName}</h3>
              <p className="text-[10px] text-emerald-100 font-medium opacity-80 uppercase tracking-widest">Online • Verified Vendor</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCallType('voice')}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCallType('video')}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="hidden md:block p-2 hover:bg-white/10 rounded-full ml-1">
               <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 bg-[#efe7dd] bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8d949e91d20548b.jpg')] bg-opacity-20 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-3 py-2 rounded-2xl relative shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-emerald-100 text-slate-800 rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none'
              }`}>
                
                {msg.type === 'voice' ? (
                  <div className="flex items-center gap-3 py-1 pr-6 min-w-[160px]">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                    <div className="flex-1">
                       <div className="h-1 bg-emerald-300 rounded-full w-full relative">
                          <div className="absolute left-0 top-0 h-full bg-emerald-600 w-1/3 rounded-full"></div>
                       </div>
                       <p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase">{msg.duration}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed pr-8">{msg.text}</p>
                )}

                <div className="absolute bottom-1 right-2 flex items-center gap-1">
                   <span className="text-[9px] text-slate-400 font-medium">{msg.timestamp}</span>
                   {msg.sender === 'user' && (
                     msg.status === 'read' ? <CheckCheck className="w-3 h-3 text-blue-500" /> : <Check className="w-3 h-3 text-slate-400" />
                   )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
             <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-slate-50 p-3 border-t border-slate-200">
           {isRecording ? (
             <div className="flex items-center justify-between gap-4 px-2 py-1 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-3 text-red-500">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                   <span className="font-mono font-bold">{formatTime(recordingTime)}</span>
                </div>
                <div className="flex-1 flex justify-center">
                   <p className="text-xs text-slate-400 font-medium italic">Swipe to cancel or tap to send</p>
                </div>
                <button 
                  onClick={handleVoiceNote}
                  className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90"
                >
                  <Send className="w-5 h-5" />
                </button>
             </div>
           ) : (
             <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                    <button className="p-2 text-slate-400 hover:text-emerald-600"><Smile className="w-6 h-6" /></button>
                    <button className="p-2 text-slate-400 hover:text-emerald-600"><Paperclip className="w-6 h-6" /></button>
                </div>
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600">
                        <ImageIcon className="w-5 h-5" />
                    </button>
                </div>
                <button 
                    onClick={() => inputText.trim() ? handleSend() : handleVoiceNote()}
                    className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-all active:scale-90"
                >
                    {inputText.trim() ? <Send className="w-5 h-5" /> : <Mic className="w-6 h-6" />}
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
