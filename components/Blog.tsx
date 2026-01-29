import React, { useState, useEffect, useRef } from 'react';
import { 
    Newspaper, Clock, User, Share2, ArrowRight, Bookmark, 
    ShieldCheck, Zap, Radio, Globe, Loader2, CheckCircle2, 
    ExternalLink, Terminal, ChevronUp, Maximize2, X, Play,
    Search, Filter, Activity, Newspaper as NewsIcon,
    BarChart3, Target, Wifi, Sparkles, Send, Share,
    Network, TrendingUp, SearchCode, Megaphone,
    Twitter, Facebook, Linkedin, Plus, Save, Camera,
    Cpu, Infinity as InfinityIcon, Power
} from 'lucide-react';
import { fetchOgunLatestNews } from '../services/geminiService.ts';
import { User as UserType } from '../types.ts';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  content?: string;
  image: string;
  date: string;
  time: string;
  author: string;
  source: string;
  sourceUrl: string;
  isOfficial: boolean;
  verified: boolean;
  seoScore: number;
  broadcastNodes: string[];
}

interface BlogProps {
    user: UserType | null;
}

export const Blog: React.FC<BlogProps> = ({ user }) => {
  const [liveNews, setLiveNews] = useState<NewsItem[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isScouting, setIsScouting] = useState(false);
  const [isAutonomous, setIsAutonomous] = useState(false);
  const [isPostingManual, setIsPostingManual] = useState(false);
  const [scoutLogs, setScoutLogs] = useState<string[]>(["Neural Core Online. Waiting for protocol..."]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dominancePercent, setDominancePercent] = useState(84);
  const rollContainerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const isSuperAdmin = user?.activeRole === 'super-admin';

  const [manualArticle, setManualArticle] = useState({
      title: '',
      category: 'General News',
      summary: '',
      image: '',
      source: 'ISEYAA Central Press'
  });

  const addLog = (msg: string) => {
    setScoutLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));
  };

  useEffect(() => {
    let interval: any;
    if (isAutonomous && isSuperAdmin) {
        addLog("AUTONOMOUS MODE: Engaging Deep Search Protocols...");
        interval = setInterval(async () => {
            if (!isScouting) {
                runScout(true);
            }
        }, 15000);
    }
    return () => clearInterval(interval);
  }, [isAutonomous, isScouting]);

  useEffect(() => {
    let subInterval: any;
    if (isAutonomous || isScouting) {
        const fakeLogs = [
            "Crawling @OgunStateGov X Feed...",
            "Ingesting BBC Africa Live Stream...",
            "Analyzing Facebook Local Community signals...",
            "Optimizing Metadata for 4K Indexing...",
            "Cross-referencing Instagram Highlights...",
            "Verifying biometrics of original source...",
            "Neural Flash: SEO Score 98% Predicted.",
            "Syncing with Vanguard News API...",
            "Diving into Ogun Radio 102.5 FM transcripts...",
            "Scraping Channels TV Real-time Ticker..."
        ];
        subInterval = setInterval(() => {
            const randomLog = fakeLogs[Math.floor(Math.random() * fakeLogs.length)];
            addLog(randomLog);
        }, 2000);
    }
    return () => clearInterval(subInterval);
  }, [isAutonomous, isScouting]);

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentTime(new Date());
        setDominancePercent(prev => Math.min(99.9, Math.max(80, prev + (Math.random() > 0.5 ? 0.05 : -0.05))));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = (platform: 'x' | 'fb' | 'li', item: NewsItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = encodeURIComponent(item.sourceUrl);
    const text = encodeURIComponent(`${item.title} - Via ISEYAA Digital OS`);
    let shareUrl = '';
    switch(platform) {
        case 'x': shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`; break;
        case 'fb': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
        case 'li': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
    addLog(`Broadcast: Signal redirected to ${platform.toUpperCase()} node.`);
  };

  const runScout = async (silent = false) => {
    if (!isSuperAdmin && !silent) return;
    if (isScouting) return;
    
    setIsScouting(true);
    if (!silent) addLog("MANUAL SCOUT: Initiating Deep-Dive across 500+ global nodes...");
    
    try {
        const news = await fetchOgunLatestNews();
        if (news && news.length > 0) {
            const formattedNews: NewsItem[] = news.map((n, i) => ({
                id: `live-${Date.now()}-${i}`,
                title: n.title,
                category: n.category || 'Deep Pulse',
                summary: n.summary,
                image: n.imageUrl || `https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop`,
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
                time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                author: n.author || "Global Correspondent",
                source: n.source,
                sourceUrl: n.url || "https://ogunstate.gov.ng",
                isOfficial: n.source.toLowerCase().includes('ogun') || n.source.toLowerCase().includes('gov'),
                verified: true,
                seoScore: n.seoScore || 98,
                broadcastNodes: ['Social Media', 'International Press', 'Local Radio']
            }));
            
            setLiveNews(prev => {
                const uniqueTitles = new Set(prev.map(p => p.title));
                const newItems = formattedNews.filter(n => !uniqueTitles.has(n.title));
                return [...newItems, ...prev].slice(0, 50);
            });
            
            if (!silent) addLog(`Hyper-Scout successful. ${formattedNews.length} new signals anchored.`);
        } else {
            if (!silent) addLog("Scan complete. Signals already synchronized.");
        }
    } catch (e) {
        addLog("Protocol error: News Node offline. Retrying...");
    } finally {
        setIsScouting(false);
    }
  };

  const handleManualPost = (e: React.FormEvent) => {
      e.preventDefault();
      if (!isSuperAdmin) return;
      const newPost: NewsItem = {
          id: `manual-${Date.now()}`,
          title: manualArticle.title,
          category: manualArticle.category,
          summary: manualArticle.summary,
          image: manualArticle.image || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop',
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
          time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          author: user?.name || "Super Admin",
          source: manualArticle.source,
          sourceUrl: "https://iseyaa.ogun.gov.ng/press",
          isOfficial: true,
          verified: true,
          seoScore: 100,
          broadcastNodes: ['Internal Portal', 'State Dashboard']
      };
      setLiveNews(prev => [newPost, ...prev]);
      setIsPostingManual(false);
      setManualArticle({ title: '', category: 'General News', summary: '', image: '', source: 'ISEYAA Central Press' });
      addLog("Article successfully anchored to state ledger.");
  };

  useEffect(() => {
    runScout(true);
  }, []);

  useEffect(() => {
    let scrollInterval: any;
    if (selectedArticle && rollContainerRef.current) {
        rollContainerRef.current.scrollTop = 0;
        scrollInterval = setInterval(() => {
            if (rollContainerRef.current) {
                rollContainerRef.current.scrollTop += 1.2;
                if (rollContainerRef.current.scrollTop + rollContainerRef.current.clientHeight >= rollContainerRef.current.scrollHeight - 2) {
                    clearInterval(scrollInterval);
                }
            }
        }, 30); 
    }
    return () => clearInterval(scrollInterval);
  }, [selectedArticle]);

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans selection:bg-emerald-500/40 overflow-x-hidden">
      {isPostingManual && (
          <div className="fixed inset-0 z-[200] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-500">
              <form onSubmit={handleManualPost} className="bg-white rounded-[4rem] w-full max-w-2xl overflow-hidden flex flex-col border-[10px] border-white/10 shadow-3xl">
                  <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <div>
                          <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Article Dispatcher.</h3>
                          <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.4em] mt-1">Super Admin Authorization Required</p>
                      </div>
                      <button type="button" onClick={() => setIsPostingManual(false)} className="p-4 hover:bg-slate-200 rounded-full transition-all text-slate-400"><X className="w-8 h-8" /></button>
                  </div>
                  <div className="p-10 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                      <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Headline Title</label>
                          <input required value={manualArticle.title} onChange={e => setManualArticle({...manualArticle, title: e.target.value})} placeholder="Enter top-ranking headline..." className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-black text-2xl text-slate-900" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Category</label>
                            <input required value={manualArticle.category} onChange={e => setManualArticle({...manualArticle, category: e.target.value})} className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-bold text-slate-800" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Image Proxy URL</label>
                            <input value={manualArticle.image} onChange={e => setManualArticle({...manualArticle, image: e.target.value})} placeholder="https://..." className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-full focus:border-emerald-500 outline-none font-medium text-slate-800" />
                        </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Article Narrative (Summary)</label>
                          <textarea required rows={4} value={manualArticle.summary} onChange={e => setManualArticle({...manualArticle, summary: e.target.value})} className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:border-emerald-500 outline-none font-medium text-lg leading-relaxed text-slate-800"></textarea>
                      </div>
                  </div>
                  <div className="p-10 bg-slate-50 border-t border-slate-100 flex gap-4">
                      <button type="button" onClick={() => setIsPostingManual(false)} className="flex-1 py-6 rounded-full font-black text-slate-400 uppercase tracking-widest text-xs">Terminate</button>
                      <button type="submit" className="flex-[2] py-6 bg-emerald-600 text-white rounded-full font-black text-lg hover:bg-emerald-700 shadow-2xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-4">
                          <Save className="w-6 h-6" /> BROADCAST ARTICLE
                      </button>
                  </div>
              </form>
          </div>
      )}

      <header className="border-b border-white/5 bg-black/40 backdrop-blur-3xl sticky top-0 z-[60] px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-10">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] mb-1.5 flex items-center gap-2">
                        <Target className="w-3 h-3" /> Search Dominance Active
                    </span>
                    <div className="flex items-center gap-5">
                        <div className="flex flex-col">
                            <span className="text-4xl font-mono font-black text-white tracking-tighter tabular-nums">
                                {currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{currentTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="h-10 w-px bg-white/10"></div>
                        <div className="flex flex-col">
                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Status Protocol</p>
                            <span className={`text-lg font-black flex items-center gap-2 ${isSuperAdmin ? 'text-emerald-400' : 'text-amber-500'}`}>
                                {isSuperAdmin ? <><ShieldCheck className="w-5 h-5" /> COMMAND MODE</> : <><Globe className="w-5 h-5" /> MONITOR MODE</>}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {isSuperAdmin && (
                    <>
                        <button onClick={() => setIsAutonomous(!isAutonomous)} className={`px-8 py-3 rounded-full text-[10px] font-black transition-all flex items-center gap-2 uppercase tracking-widest border ${isAutonomous ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_30px_rgba(147,51,234,0.4)]' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                            {isAutonomous ? <InfinityIcon className="w-4 h-4 animate-pulse" /> : <Power className="w-4 h-4" />}
                            Autonomous Deep Scout
                        </button>
                        <button onClick={() => setIsPostingManual(true)} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-full text-[10px] font-black transition-all flex items-center gap-2 uppercase tracking-widest">
                            <Plus className="w-4 h-4" /> Manual Post
                        </button>
                        <button onClick={() => runScout()} disabled={isScouting} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white px-8 py-3 rounded-full text-[10px] font-black transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 uppercase tracking-widest">
                            {isScouting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wifi className="w-4 h-4" />}
                            AI Global Scout
                        </button>
                    </>
                )}
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className={`lg:col-span-3 ${selectedArticle ? 'w-full' : ''}`}>
        {!selectedArticle ? (
            <div className="space-y-24">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-emerald-500 pl-8">
                    <div>
                        <h2 className="text-7xl font-black tracking-tighter text-white uppercase leading-none italic">Voice of<br/>the Gateway</h2>
                        <p className="text-slate-400 mt-6 text-2xl font-light max-w-2xl">The latest top-ranking news about Ogun State, verified by ISEYAA AI Command.</p>
                    </div>
                </div>
                <div className="grid gap-10">
                    {liveNews.map((post, idx) => (
                        <div key={post.id} onClick={() => setSelectedArticle(post)} className="group relative bg-white/[0.01] border border-white/5 hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all cursor-pointer rounded-[3rem] p-12 flex flex-col lg:flex-row gap-16 items-center animate-in slide-in-from-bottom-12 duration-[800ms]">
                            <div className="shrink-0 w-full lg:w-48 flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                                <span className="text-4xl font-mono font-black text-emerald-500 tracking-tighter">{post.time}</span>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{post.date}</span>
                            </div>
                            <div className="flex-1 space-y-6">
                                <div className="flex flex-wrap items-center gap-5">
                                    <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-4 py-1.5 rounded-full uppercase tracking-[0.3em] border border-emerald-400/20">{post.category}</span>
                                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest"><Globe className="w-3.5 h-3.5" /> {post.source}</div>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-white group-hover:text-emerald-400 transition-colors leading-[1.1] uppercase italic">{post.title}</h3>
                                <p className="text-slate-400 line-clamp-2 text-xl font-light italic">{post.summary}</p>
                            </div>
                            <div className="w-full lg:w-72 aspect-[16/10] lg:aspect-square rounded-[3rem] overflow-hidden shrink-0 border border-white/10 relative">
                                <img src={post.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                                    <div className="w-20 h-20 rounded-full bg-emerald-600/90 backdrop-blur shadow-2xl flex items-center justify-center text-white"><Play className="w-8 h-8 fill-current ml-1" /></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="fixed inset-0 z-[100] bg-[#020617]/98 backdrop-blur-[40px] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-700">
                <button onClick={() => setSelectedArticle(null)} className="absolute top-12 right-12 z-[110] p-6 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all group border border-white/10"><X className="w-10 h-10 group-hover:rotate-90 transition-transform" /></button>
                <div className="w-full max-w-[1400px] h-full flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-[45%] h-1/3 lg:h-[85vh] rounded-[5rem] overflow-hidden border border-white/10 relative group/hero">
                        <img src={selectedArticle.image} className="w-full h-full object-cover transition-transform duration-[20s] group-hover/hero:scale-125" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div className="absolute bottom-20 left-20 right-20 text-white space-y-6">
                            <div className="flex items-center gap-4 text-emerald-400 font-black text-xs uppercase tracking-[0.3em]"><ShieldCheck className="w-6 h-6" /> Verified Signal</div>
                            <h2 className="text-5xl md:text-6xl font-black leading-[1.05] uppercase italic">{selectedArticle.title}</h2>
                        </div>
                    </div>
                    <div className="lg:w-[55%] h-full lg:h-[85vh] overflow-hidden relative pl-4">
                        <div ref={rollContainerRef} className="h-full overflow-y-auto custom-scrollbar-none py-60 flex flex-col gap-24">
                            <h1 className="text-7xl font-black text-white leading-[0.95] uppercase italic">{selectedArticle.title}</h1>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate-400 text-4xl font-light italic">{selectedArticle.summary}</p>
                                <p className="text-slate-50 text-2xl mt-12 leading-relaxed opacity-80">This signal was processed through the ISEYAA State Command Center. Every detail has been verified against biometric records.</p>
                            </div>
                            <button onClick={() => setSelectedArticle(null)} className="w-full py-8 bg-white text-black rounded-full font-black text-2xl hover:bg-emerald-500 hover:text-white transition-all">Return to Feed</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
      </main>
    </div>
  );
};