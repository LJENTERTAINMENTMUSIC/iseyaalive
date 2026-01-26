import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Timer, 
  Medal, 
  ClipboardList, 
  Activity, 
  Search,
  ChevronRight,
  UserPlus,
  Flag,
  BarChart3,
  Video,
  Map,
  CheckCircle2,
  Wrench
} from 'lucide-react';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  status: 'Live' | 'Finished' | 'Upcoming';
  time: string;
  league: string;
}

interface Athlete {
  id: string;
  name: string;
  sport: string;
  age: number;
  club: string;
  image: string;
  stats: { label: string; value: number }[];
  verified: boolean;
}

interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: string;
  status: 'Operational' | 'Maintenance' | 'Booked';
  image: string;
  type: string;
}

const MATCHES: Match[] = [
  { id: '1', homeTeam: 'Gateway Utd', awayTeam: 'Remo Stars', score: '2 - 1', status: 'Live', time: '78\'', league: 'Ogun Premier League' },
  { id: '2', homeTeam: 'Abeokuta Stormers', awayTeam: 'Ijebu United', score: '0 - 0', status: 'Upcoming', time: '16:00', league: 'Ogun Premier League' },
  { id: '3', homeTeam: 'Dino SC', awayTeam: 'Beyond Limits', score: '1 - 3', status: 'Finished', time: 'FT', league: 'Youth Cup' },
];

const ATHLETES: Athlete[] = [
  {
    id: '1',
    name: 'Chioma Ajunwa Jr.',
    sport: 'Athletics (100m)',
    age: 17,
    club: 'Alake Sports Academy',
    image: 'https://images.unsplash.com/photo-1552674605-469555f96752?q=80&w=1974&auto=format&fit=crop',
    stats: [{ label: 'Speed', value: 95 }, { label: 'Reaction', value: 88 }, { label: 'Form', value: 90 }],
    verified: true
  },
  {
    id: '2',
    name: 'Tunde Bakare',
    sport: 'Football (Striker)',
    age: 18,
    club: 'Gateway Academy',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1972&auto=format&fit=crop',
    stats: [{ label: 'Shooting', value: 92 }, { label: 'Pace', value: 85 }, { label: 'Dribbling', value: 88 }],
    verified: true
  },
  {
    id: '3',
    name: 'Sarah Olayinka',
    sport: 'Basketball',
    age: 19,
    club: 'Hoop Dreams',
    image: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=2067&auto=format&fit=crop',
    stats: [{ label: 'Shooting', value: 85 }, { label: 'Defense', value: 90 }, { label: 'Agility', value: 82 }],
    verified: true
  }
];

const VENUES: Venue[] = [
  {
    id: '1',
    name: 'MKO Abiola Stadium',
    location: 'Kuto, Abeokuta',
    capacity: '25,000',
    status: 'Operational',
    image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2070&auto=format&fit=crop',
    type: 'Stadium'
  },
  {
    id: '2',
    name: 'Gateway International Stadium',
    location: 'Sagamu',
    capacity: '20,000',
    status: 'Booked',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2038&auto=format&fit=crop',
    type: 'Stadium'
  },
  {
    id: '3',
    name: 'Alake Sports Centre',
    location: 'Ijeja, Abeokuta',
    capacity: '2,000',
    status: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    type: 'Indoor Arena'
  },
   {
    id: '4',
    name: 'Dipo Dina Stadium',
    location: 'Ijebu Ode',
    capacity: '15,000',
    status: 'Operational',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop',
    type: 'Stadium'
  }
];

export const Sports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leagues' | 'talent' | 'venues' | 'register'>('overview');

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Sports & Competition</h2>
           <p className="text-slate-500">Manage leagues, discover talent, and track results.</p>
        </div>
        
        <div className="flex gap-2">
            <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2">
                <Video className="w-4 h-4 text-red-500" /> Watch Live
            </button>
            <button 
                onClick={() => setActiveTab('register')}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
                <UserPlus className="w-4 h-4" /> Register Athlete
            </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-hide">
          {['overview', 'leagues', 'talent', 'venues', 'register'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 text-sm font-medium capitalize border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab 
                    ? 'border-emerald-600 text-emerald-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                  {tab === 'talent' ? 'Talent Hub' : tab === 'venues' ? 'Infrastructure' : tab}
              </button>
          ))}
      </div>

      {/* Content Areas */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
            {/* Live Match Ticker */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 opacity-10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">Live Now</span>
                    <span className="text-xs text-slate-400 border-l border-slate-700 pl-2 ml-2">Ogun Premier League</span>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="flex items-center gap-4 text-center md:text-left flex-1 justify-end">
                        <div>
                            <h3 className="text-2xl font-bold">Gateway Utd</h3>
                            <p className="text-slate-400 text-sm">Home</p>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <Flag className="w-6 h-6 text-emerald-600 fill-current" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center px-8">
                        <div className="text-4xl font-mono font-bold tracking-widest mb-1">2 - 1</div>
                        <div className="bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Timer className="w-3 h-3" /> 78:12
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-center md:text-right flex-1 justify-start">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <Flag className="w-6 h-6 text-blue-600 fill-current" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">Remo Stars</h3>
                            <p className="text-slate-400 text-sm">Away</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming & Recent */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-emerald-600" /> Match Schedule
                    </h3>
                    <div className="space-y-4">
                        {MATCHES.filter(m => m.status !== 'Live').map(match => (
                            <div key={match.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400 w-10">{match.time}</span>
                                    <div>
                                        <div className="text-sm font-semibold text-slate-800">{match.homeTeam} vs {match.awayTeam}</div>
                                        <div className="text-[10px] text-slate-500 uppercase">{match.league}</div>
                                    </div>
                                </div>
                                {match.status === 'Finished' ? (
                                    <span className="text-sm font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-200">{match.score}</span>
                                ) : (
                                    <button className="text-xs font-medium text-emerald-600 border border-emerald-200 px-2 py-1 rounded hover:bg-emerald-50">
                                        Buy Ticket
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-500" /> League Standings
                    </h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                                <th className="pb-2 pl-2">#</th>
                                <th className="pb-2">Team</th>
                                <th className="pb-2 text-center">P</th>
                                <th className="pb-2 text-center">Pts</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { rank: 1, name: 'Remo Stars', played: 12, pts: 28 },
                                { rank: 2, name: 'Gateway Utd', played: 12, pts: 26 },
                                { rank: 3, name: 'Ijebu United', played: 11, pts: 22 },
                                { rank: 4, name: 'Dino SC', played: 12, pts: 18 },
                            ].map((team) => (
                                <tr key={team.name} className="hover:bg-slate-50">
                                    <td className="py-3 pl-2 font-medium text-slate-500">{team.rank}</td>
                                    <td className="py-3 font-semibold text-slate-800">{team.name}</td>
                                    <td className="py-3 text-center text-slate-500">{team.played}</td>
                                    <td className="py-3 text-center font-bold text-emerald-600">{team.pts}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="w-full mt-4 text-xs font-medium text-slate-500 hover:text-emerald-600 flex items-center justify-center gap-1">
                        View Full Table <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'talent' && (
          <div className="space-y-6">
               <div className="flex flex-col md:flex-row justify-between gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Grassroots Talent Discovery</h3>
                        <p className="text-slate-500 text-sm">Connect with scouts and track athlete progression metrics.</p>
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="relative">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                             <input type="text" placeholder="Search athletes..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                         </div>
                         <button className="bg-white p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                             <Activity className="w-4 h-4" />
                         </button>
                    </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ATHLETES.map(athlete => (
                        <div key={athlete.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group">
                            <div className="h-48 relative overflow-hidden">
                                <img src={athlete.image} alt={athlete.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="font-bold text-lg flex items-center gap-1">
                                        {athlete.name} 
                                        {athlete.verified && <Medal className="w-4 h-4 text-emerald-400 fill-current" />}
                                    </h3>
                                    <p className="text-xs text-slate-300">{athlete.sport} • {athlete.age} yrs</p>
                                </div>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex justify-between items-center text-xs text-slate-500">
                                    <span>Club: <strong className="text-slate-700">{athlete.club}</strong></span>
                                    <span>ID: <strong className="text-slate-700">OG-{Math.floor(Math.random()*10000)}</strong></span>
                                </div>
                                <div className="space-y-2">
                                    {athlete.stats.map(stat => (
                                        <div key={stat.label}>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-500">{stat.label}</span>
                                                <span className="font-bold text-slate-800">{stat.value}/100</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                                                    style={{ width: `${stat.value}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-2 flex gap-2">
                                    <button className="flex-1 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800">
                                        View Profile
                                    </button>
                                    <button className="flex-1 py-2 text-xs font-bold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50">
                                        Contact Agent
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
               </div>
          </div>
      )}

      {activeTab === 'venues' && (
          <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                      <h3 className="text-lg font-bold text-emerald-900">Sports Infrastructure Directory</h3>
                      <p className="text-emerald-700 text-sm">Book state-owned facilities for training camps, matches, or private events.</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 shadow-sm">
                      Request Maintenance
                  </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {VENUES.map(venue => (
                      <div key={venue.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row h-full md:h-48 group hover:shadow-md transition-all">
                           <div className="md:w-48 w-full h-48 md:h-full relative shrink-0">
                               <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                               <div className="absolute top-2 left-2">
                                    {venue.status === 'Operational' && <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ready</span>}
                                    {venue.status === 'Maintenance' && <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1"><Wrench className="w-3 h-3" /> Repairs</span>}
                                    {venue.status === 'Booked' && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1"><Calendar className="w-3 h-3" /> Booked</span>}
                               </div>
                           </div>
                           <div className="p-5 flex flex-col justify-between flex-1">
                               <div>
                                   <div className="flex justify-between items-start">
                                       <h4 className="font-bold text-slate-900 text-lg">{venue.name}</h4>
                                       <span className="text-xs text-slate-500 border border-slate-200 px-2 py-1 rounded">{venue.type}</span>
                                   </div>
                                   <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><Map className="w-3 h-3" /> {venue.location}</p>
                                   <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><Users className="w-3 h-3" /> Capacity: {venue.capacity}</p>
                               </div>
                               <div className="mt-4 flex gap-3">
                                   <button className="flex-1 py-2 text-sm font-bold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50">View Details</button>
                                   <button 
                                      className="flex-1 py-2 text-sm font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                      disabled={venue.status !== 'Operational'}
                                   >
                                       Book Now
                                   </button>
                               </div>
                           </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {activeTab === 'register' && (
          <div className="max-w-4xl mx-auto">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center mb-8">
                  <h3 className="text-2xl font-bold text-emerald-900 mb-2">Join the Ogun State Sports Ecosystem</h3>
                  <p className="text-emerald-700 max-w-xl mx-auto">Get your digital athlete license, register your academy, or certify as an official to participate in state competitions.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-lg text-slate-900 mb-2">Athlete Registration</h4>
                      <p className="text-slate-500 text-sm mb-4">Create your digital profile, track stats, and get scouted. Includes medical clearance tracking.</p>
                      <span className="text-emerald-600 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Start Registration <ChevronRight className="w-4 h-4" />
                      </span>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Flag className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-bold text-lg text-slate-900 mb-2">Team / Academy</h4>
                      <p className="text-slate-500 text-sm mb-4">Register your club for leagues. Manage rosters, staff, and competition logistics.</p>
                      <span className="text-emerald-600 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Register Team <ChevronRight className="w-4 h-4" />
                      </span>
                  </div>

                   <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <ClipboardList className="w-6 h-6 text-amber-600" />
                      </div>
                      <h4 className="font-bold text-lg text-slate-900 mb-2">Coach / Official</h4>
                      <p className="text-slate-500 text-sm mb-4">Get certified, manage licenses, and find opportunities in state competitions.</p>
                      <span className="text-emerald-600 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Get Certified <ChevronRight className="w-4 h-4" />
                      </span>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Activity className="w-6 h-6 text-red-600" />
                      </div>
                      <h4 className="font-bold text-lg text-slate-900 mb-2">Sports Medic</h4>
                      <p className="text-slate-500 text-sm mb-4">Register as a physiotherapist or team doctor. Access athlete medical history (authorized).</p>
                      <span className="text-emerald-600 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Join Medical Corps <ChevronRight className="w-4 h-4" />
                      </span>
                  </div>
              </div>
          </div>
      )}
      
      {activeTab === 'leagues' && (
           <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
               <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
               <h3 className="text-lg font-bold text-slate-600">Additional Leagues Loading...</h3>
               <p className="text-slate-400">The full competition directory is being synchronized with the state database.</p>
           </div>
      )}
    </div>
  );
};