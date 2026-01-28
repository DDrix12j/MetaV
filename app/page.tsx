"use client";
import React, { useState } from 'react';
import { IDV_DATA } from './data'; // <--- THIS IS THE MAGIC LINE

export default function MetaV() {
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null); 
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  const [expandedDetail, setExpandedDetail] = useState<string | null>(null); // Track expanded counter/synergy
  const [expandedTalent, setExpandedTalent] = useState<number | null>(null); // Track expanded talent
  const [expandedTrait, setExpandedTrait] = useState<number | null>(null); // Track expanded trait
  const [showChangelog, setShowChangelog] = useState(false); // Modal for changelog
  const [showContributors, setShowContributors] = useState(false); // Modal for contributors

  // Helper to get name from ID
  const getName = (id: string) => {
    const s = IDV_DATA.survivors.find(c => c.id === id);
    const h = IDV_DATA.hunters.find(c => c.id === id);
    return s ? s.name : (h ? h.name : id);
  };

  const goHome = () => {
    setSelectedFaction(null);
    setSelectedChar(null);
    setExpandedDetail(null);
    setExpandedTalent(null);
    setExpandedTrait(null);
  };

  // Get Meta directly from the static file
  const meta = selectedChar ? (IDV_DATA.meta[selectedChar as keyof typeof IDV_DATA.meta] || null) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden selection:bg-yellow-500 selection:text-black">
      
      {/* FULL PAGE BACKGROUND */}
      <div className="fixed inset-0 z-0  pointer-events-none">
        <img 
          src={`/images/G8huEr0bMAAJ4sX.jfif`}
          alt="BG" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
      </div>

      {/* 3. HEADER */}
      <div className="relative z-10 p-4 md:p-6">
        <header className="flex items-center justify-between max-w-7xl mx-auto mb-8 border-b border-slate-800 pb-4">
          <div onClick={goHome} className="cursor-pointer group">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 tracking-tighter group-hover:opacity-80 transition">METAV</h1>
            <p className="text-slate-500 text-xs md:text-sm tracking-widest uppercase font-bold">Identity V Strategy Database</p>
          </div>
          {selectedFaction && (
             <button onClick={goHome} className="px-4 py-2 rounded-full border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition text-xs font-bold uppercase tracking-wider">
               ← Main Menu
             </button>
          )}
        </header>

        {/* 4. HOME SCREEN */}
        {!selectedFaction && (
          <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
            
            {/* BIG BUTTONS - 2x2 GRID ON MOBILE, 4 COLUMNS ON DESKTOP */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12 auto-rows-[180px] md:auto-rows-[32rem]">
              {/* Survivors */}
              <button 
                onClick={() => setSelectedFaction('survivors')}
                className="group relative bg-blue-950/30 border border-blue-900 hover:border-blue-500 rounded-xl md:rounded-3xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                   <img src="/images/Lanternist.png" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} className="w-full h-full object-contain object-center translate-x-2 opacity-100" alt="Survivor" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-2 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-sm md:text-3xl font-black italic uppercase text-blue-100 group-hover:text-white">Survivors</h2>
                </div>
              </button>

              {/* Hunters */}
              <button 
                onClick={() => setSelectedFaction('hunters')}
                className="group relative bg-red-950/30 border border-red-900 hover:border-red-500 rounded-xl md:rounded-3xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(239,68,68,0.2)]"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                   <img src="/images/QueenBee.png" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} className="w-full h-full object-contain object-center opacity-100" alt="Hunter" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-2 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-sm md:text-3xl font-black italic uppercase text-red-100 group-hover:text-white">Hunters</h2>
                </div>
              </button>

              {/* Adjustment Patch Notes */}
              <button 
                className="group relative bg-purple-950/30 border border-purple-900 hover:border-purple-500 rounded-xl md:rounded-3xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-5xl md:text-9xl opacity-100">📝</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-2 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-sm md:text-3xl font-black italic uppercase text-purple-100 group-hover:text-white">Patch Notes</h2>
                </div>
              </button>

              {/* Season Tier List */}
              <button 
                className="group relative bg-amber-950/30 border border-amber-900 hover:border-amber-500 rounded-xl md:rounded-3xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(217,119,6,0.2)]"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-5xl md:text-9xl opacity-100">⭐</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-2 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-sm md:text-3xl font-black italic uppercase text-amber-100 group-hover:text-white">Tier List</h2>
                </div>
              </button>
            </div>

            {/* INFO COLUMNS */}
            <div className="grid md:grid-cols-2 gap-8 border-t border-slate-800 pt-8">
              {/* Website Changelogs */}
              <div>
                <h3 className="text-yellow-500 font-bold uppercase mb-4 tracking-wider text-sm border-b border-yellow-500/30 pb-2">Website Updates</h3>
                <button
                  onClick={() => setShowChangelog(true)}
                  className="w-full p-4 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-bold uppercase text-sm transition"
                >
                  📝 View All Updates ({IDV_DATA.changelog.length})
                </button>
              </div>

              {/* Contributors */}
              <div>
                <h3 className="text-blue-500 font-bold uppercase mb-4 tracking-wider text-sm border-b border-blue-500/30 pb-2">Contributors</h3>
                <button
                  onClick={() => setShowContributors(true)}
                  className="w-full p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold uppercase text-sm transition"
                >
                  👥 View All Contributors ({IDV_DATA.credits.length})
                </button>
              </div>
            </div>

            {/* ADMIN LOGIN (Keep it if you use the generator) */}
            <div className="mt-20 border-t border-slate-800/50 pt-6 text-center">
              <a 
                href="/admin" 
                className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-500 transition-colors text-[10px] uppercase font-bold tracking-widest"
              >
                <span className="opacity-50">🔒</span> Staff Login
              </a>
            </div>

            {/* CHANGELOG MODAL */}
            {showChangelog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-black text-yellow-400">Website Updates</h2>
                    <button 
                      onClick={() => setShowChangelog(false)}
                      className="text-slate-400 hover:text-white text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                  {IDV_DATA.changelog.map((log, i) => (
                    <div key={i} className="border-l-4 border-yellow-500 bg-slate-950 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-yellow-400 font-bold">{log.ver}</span>
                        <span className="text-xs text-slate-500">{log.date}</span>
                      </div>
                      <p className="text-slate-300">{log.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTRIBUTORS MODAL */}
            {showContributors && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur">
                <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-slate-700 rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto space-y-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-4xl font-black text-blue-400 tracking-widest">CREDITS</h2>
                    <button 
                      onClick={() => setShowContributors(false)}
                      className="text-slate-400 hover:text-white text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                  {IDV_DATA.credits.map((cred: any, i) => (
                    <div key={i} className="text-center py-6 border-b border-blue-500/20 last:border-b-0">
                      <h3 className="text-white font-black text-2xl mb-1 tracking-wide">{cred.name}</h3>
                      <p className="text-blue-400 text-sm mb-1 uppercase tracking-widest">{cred.role}</p>
                      <p className="text-slate-500 text-xs mb-3">ID: {cred.id}</p>
                      <div className="flex justify-center gap-4 items-center">
                        <img 
                          src={`/images/${cred.highestRankTier || 'Titan'}.png`} 
                          alt={cred.highestRankTier || 'Titan'}
                          className="h-12 w-12 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <img 
                          src={`/images/Badge_${cred.faction || 'Survivor'}_${cred.highestBadge || 'S'}_Icon.png`}
                          alt={cred.highestBadge || 'S'}
                          className="h-12 w-12 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* 5. SELECTION & DATA SCREEN */}
        {selectedFaction && (
          <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 animate-in slide-in-from-right-8 duration-500">
            
            {/* LEFT: GRID */}
            <div className="flex-1">
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-800">
                <h2 className={`text-2xl font-black mb-6 uppercase tracking-wider ${selectedFaction === 'survivors' ? 'text-blue-400' : 'text-red-400'}`}>
                  Select {selectedFaction === 'survivors' ? 'Survivor' : 'Hunter'}
                </h2>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedFaction && (selectedFaction === 'survivors' ? IDV_DATA.survivors : IDV_DATA.hunters).map((char) => (
                    <button 
                      key={char.id}
                      onClick={() => { setSelectedChar(char.id); setExpandedDetail(null); }}
                      className={`relative rounded-lg overflow-hidden transition-all duration-200 flex items-center justify-center bg-slate-900 w-full aspect-square ${
                        selectedChar === char.id 
                          ? 'ring-2 ring-yellow-500 scale-110 z-10' 
                          : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ minHeight: '100px' }}
                    >
                      <img 
                        src={`/images/Nav${char.name.replace(/[\s'"]/g, '')}.png`}
                        onError={(e) => {
                           (e.target as HTMLImageElement).style.display = 'none'; 
                        }}
                        className="w-full h-full object-contain" 
                        alt={char.name}
                        title={char.name}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: DATA PANEL - HIDDEN ON MOBILE, SHOWN IN MODAL */}
            {/* Desktop View (hidden on mobile) */}
            <div className="hidden xl:block xl:w-[500px] shrink-0 h-[81vh] overflow-y-auto custom-scrollbar">
               {selectedChar ? (
                 <div 
                   className="rounded-3xl p-6 shadow-2xl relative overflow-hidden border border-slate-700/30"
                 >
                   {/* Content Wrapper */}
                   <div className="relative z-10">
                   
                   {/* Name Header - Positioned at top of promotional background */}
                   <div className="relative z-10 mb-6 border-b border-slate-700 pb-4 pt-4">
                     <h3 className="text-3xl font-black text-white uppercase italic leading-none">
                       {getName(selectedChar)}
                     </h3>
                   </div>

                   {meta ? (
                     <div className="space-y-6 relative z-10">
                       
                       {/* Strong Against Section */}
                       <div>
                         <h4 className="text-green-400 text-xs font-black uppercase mb-3 flex items-center gap-2">
                           <span className="w-2 h-2 bg-green-500 rounded-full"></span> 
                           Strong Against 
                         </h4>
                         <div className="flex flex-wrap gap-3">
                           {meta.strongAgainst?.map((s, idx) => (
                             <button
                               key={idx}
                               onClick={() => setExpandedDetail(expandedDetail === `strongagainst-${idx}` ? null : `strongagainst-${idx}`)}
                               className="w-20 h-20 bg-green-900/30 border border-green-900/50 rounded-lg flex items-center justify-center font-bold text-green-400 text-4xl hover:bg-green-900/50 hover:border-green-500/50 transition cursor-pointer overflow-hidden"
                               title={s.name}
                             >
                               <img
                                 src={`/images/Nav${s.name.replace(/[\s'"]/g, '')}.png`}
                                 onError={(e) => { 
                                   const target = e.target as HTMLImageElement;
                                   target.style.display = 'none'; 
                                   if (target.nextElementSibling) {
                                     (target.nextElementSibling as HTMLElement).style.display = 'block';
                                   }
                                 }}
                                 className="w-full h-full object-contain"
                                 alt={s.name}
                               />
                               <span className="hidden text-2xl">{s.name[0]}</span>
                             </button>
                           ))}
                           {(!meta.strongAgainst || meta.strongAgainst.length === 0) && <p className="text-xs text-slate-600 italic">No matchups recorded.</p>}
                         </div>
                         {expandedDetail?.startsWith('strongagainst-') && (
                           <div className="mt-4 p-4 bg-green-900/20 border border-green-900/50 rounded-lg">
                             {(() => {
                               const idx = parseInt(expandedDetail.split('-')[1]);
                               const matchup = meta.strongAgainst?.[idx];
                               return matchup ? (
                                 <div>
                                   <h5 className="text-green-300 font-bold text-sm uppercase mb-2">{matchup.name}</h5>
                                   <p className="text-slate-300 text-xs leading-relaxed">{matchup.detail || matchup.note}</p>
                                 </div>
                               ) : null;
                             })()}
                           </div>
                         )}
                       </div> 

                       {/* Counters Section */}
                       <div>
                         <h4 className="text-red-400 text-xs font-black uppercase mb-3 flex items-center gap-2">
                           <span className="w-2 h-2 bg-red-500 rounded-full"></span> 
                           Weak Against 
                         </h4>
                         <div className="flex flex-wrap gap-3">
                           {meta.counters?.map((c, idx) => (
                             <button
                               key={idx}
                               onClick={() => setExpandedDetail(expandedDetail === `counter-${idx}` ? null : `counter-${idx}`)}
                               className="w-20 h-20 bg-red-900/30 border border-red-900/50 rounded-lg flex items-center justify-center font-bold text-red-400 text-4xl hover:bg-red-900/50 hover:border-red-500/50 transition cursor-pointer overflow-hidden"
                               title={c.name}
                             >
                               <img
                                 src={`/images/Nav${c.name.replace(/[\s'"]/g, '')}.png`}
                                 onError={(e) => { 
                                   const target = e.target as HTMLImageElement;
                                   target.style.display = 'none'; 
                                   if (target.nextElementSibling) {
                                     (target.nextElementSibling as HTMLElement).style.display = 'block';
                                   }
                                 }}
                                 className="w-full h-full object-contain"
                                 alt={c.name}
                               />
                               <span className="hidden text-2xl">{c.name[0]}</span>
                             </button>
                           ))}
                           {(!meta.counters || meta.counters.length === 0) && <p className="text-xs text-slate-600 italic">No counters recorded.</p>}
                         </div>
                         {expandedDetail?.startsWith('counter-') && (
                           <div className="mt-4 p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
                             {(() => {
                               const idx = parseInt(expandedDetail.split('-')[1]);
                               const counter = meta.counters?.[idx];
                               return counter ? (
                                 <div>
                                   <h5 className="text-red-300 font-bold text-sm uppercase mb-2">{counter.name}</h5>
                                   <p className="text-slate-300 text-xs leading-relaxed">{counter.detail || counter.note}</p>
                                 </div>
                               ) : null;
                             })()}
                           </div>
                         )}
                       </div>

                       

                       {/* Synergies Section */}
                       <div>
                         <h4 className="text-blue-400 text-xs font-black uppercase mb-3 flex items-center gap-2">
                           <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 
                           Strong With (Synergies)
                         </h4>
                         <div className="flex flex-wrap gap-3">
                           {meta.synergies?.map((s, idx) => (
                             <button
                               key={idx}
                               onClick={() => setExpandedDetail(expandedDetail === `synergy-${idx}` ? null : `synergy-${idx}`)}
                               className="w-20 h-20 bg-blue-900/30 border border-blue-900/50 rounded-lg flex items-center justify-center font-bold text-blue-400 text-4xl hover:bg-blue-900/50 hover:border-blue-500/50 transition cursor-pointer overflow-hidden"
                               title={s.name}
                             >
                               <img
                                 src={`/images/Nav${s.name.replace(/[\s'"]/g, '')}.png`}
                                 onError={(e) => { 
                                   const target = e.target as HTMLImageElement;
                                   target.style.display = 'none'; 
                                   if (target.nextElementSibling) {
                                     (target.nextElementSibling as HTMLElement).style.display = 'block';
                                   }
                                 }}
                                 className="w-full h-full object-contain"
                                 alt={s.name}
                               />
                               <span className="hidden text-2xl">{s.name[0]}</span>
                             </button>
                           ))}
                           {(!meta.synergies || meta.synergies.length === 0) && <p className="text-xs text-slate-600 italic">No synergies recorded.</p>}
                         </div>
                         {expandedDetail?.startsWith('synergy-') && (
                           <div className="mt-4 p-4 bg-blue-900/20 border border-blue-900/50 rounded-lg">
                             {(() => {
                               const idx = parseInt(expandedDetail.split('-')[1]);
                               const synergy = meta.synergies?.[idx];
                               return synergy ? (
                                 <div>
                                   <h5 className="text-blue-300 font-bold text-sm uppercase mb-2">{synergy.name}</h5>
                                   <p className="text-slate-300 text-xs leading-relaxed">{synergy.detail || synergy.note}</p>
                                 </div>
                               ) : null;
                             })()}
                           </div>
                         )}
                       </div>

                       {/* Personas Section */}
                       {meta.seasonInfo && (
                         <div className="p-4 rounded-xl bg-cyan-900/20 border border-cyan-900/50">
                           <h4 className="text-cyan-400 text-xs font-black uppercase mb-2 flex items-center gap-2">
                             <span className="w-2 h-2 bg-cyan-500 rounded-full"></span> 
                             Season Info & Ranking
                           </h4>
                           <p className="text-slate-300 text-xs leading-relaxed">{meta.seasonInfo}</p>
                         </div>
                       )}

                       {/* Final Talents Section */}
                       {(meta as any)?.finalTalents && (meta as any).finalTalents.length > 0 && (
                         <div>
                           <h4 className="text-purple-400 text-xs font-black uppercase mb-3 flex items-center gap-2">
                             <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 
                             Final Talents
                           </h4>
                           <div className="space-y-3">
                             {/* Talents Grid */}
                             <div className="grid grid-cols-2 gap-3">
                               {(meta as any).finalTalents.map((talent: any, idx: number) => (
                                 <div
                                   key={idx}
                                   onClick={() => setExpandedTalent(expandedTalent === idx ? null : idx)}
                                   className="relative rounded-lg overflow-hidden border border-purple-900/50 bg-purple-900/20 hover:border-purple-500/50 transition group cursor-pointer"
                                   title={talent.name}
                                 >
                                   <div className="w-full aspect-square rounded-lg overflow-hidden bg-purple-900/30">
                                     <img
                                       src={`/images/${talent.image}`}
                                       alt={talent.name}
                                       className="w-full h-full object-cover group-hover:opacity-80 transition"
                                       onError={(e) => {
                                         const target = e.target as HTMLImageElement;
                                         target.style.display = 'none';
                                         if (target.parentElement) {
                                           target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-purple-400 text-3xl">✦</div>';
                                         }
                                       }}
                                     />
                                   </div>
                                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-end justify-end p-2">
                                     <p className="text-purple-300 font-bold text-[10px] uppercase text-right">{talent.name}</p>
                                     <p className="text-purple-500 text-[9px] text-right">{talent.web}</p>
                                   </div>
                                   {expandedTalent === idx && (
                                     <div className="absolute top-1 right-1 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">✓</div>
                                   )}
                                 </div>
                               ))}
                             </div>
                             
                             {/* Expanded Talent Description */}
                             {expandedTalent !== null && (meta as any).finalTalents[expandedTalent] && (
                               <div className="rounded-lg border border-purple-500/50 bg-purple-900/30 p-4 animate-in fade-in duration-200">
                                 <div className="flex items-start gap-3">
                                   <div className="flex-shrink-0">
                                     <img
                                       src={`/images/${(meta as any).finalTalents[expandedTalent].image}`}
                                       alt={(meta as any).finalTalents[expandedTalent].name}
                                       className="w-16 h-16 rounded object-cover border border-purple-500/50"
                                       onError={(e) => {
                                         const target = e.target as HTMLImageElement;
                                         target.style.display = 'none';
                                       }}
                                     />
                                   </div>
                                   <div className="flex-1 min-w-0">
                                     <p className="text-purple-300 font-bold text-sm mb-1">{(meta as any).finalTalents[expandedTalent].name}</p>
                                     <p className="text-purple-500 text-xs mb-2">{(meta as any).finalTalents[expandedTalent].web}</p>
                                     <p className="text-slate-300 text-xs leading-relaxed">{(meta as any).finalTalents[expandedTalent].description}</p>
                                   </div>
                                 </div>
                               </div>
                             )}
                           </div>
                         </div>
                       )}

                       {/* Active Traits Section - Only for Hunters */}
                       {(meta as any)?.activeTraits && (meta as any).activeTraits.length > 0 && (
                         <div>
                           <h4 className="text-red-400 text-xs font-black uppercase mb-3 flex items-center gap-2">
                             <span className="w-2 h-2 bg-red-500 rounded-full"></span> 
                             Active Traits
                           </h4>
                           <div className="space-y-3">
                             {/* Traits Grid */}
                             <div className="grid grid-cols-2 gap-3">
                               {(meta as any).activeTraits.map((trait: any, idx: number) => (
                                 <div
                                   key={idx}
                                   onClick={() => setExpandedTrait(expandedTrait === idx ? null : idx)}
                                   className="relative rounded-lg overflow-hidden border border-red-900/50 bg-red-900/20 hover:border-red-500/50 transition group cursor-pointer"
                                   title={trait.name}
                                 >
                                   <div className="w-full aspect-square rounded-lg overflow-hidden bg-red-900/30">
                                     <img
                                       src={`/images/${trait.image}`}
                                       alt={trait.name}
                                       className="w-full h-full object-cover group-hover:opacity-80 transition"
                                       onError={(e) => {
                                         const target = e.target as HTMLImageElement;
                                         target.style.display = 'none';
                                         if (target.parentElement) {
                                           target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-red-400 text-3xl">⚡</div>';
                                         }
                                       }}
                                     />
                                   </div>
                                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-end justify-end p-2">
                                     <p className="text-red-300 font-bold text-[10px] uppercase text-right">{trait.name}</p>
                                   </div>
                                   {expandedTrait === idx && (
                                     <div className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">✓</div>
                                   )}
                                 </div>
                               ))}
                             </div>
                             
                             {/* Expanded Trait Description */}
                             {expandedTrait !== null && (meta as any).activeTraits[expandedTrait] && (
                               <div className="rounded-lg border border-red-500/50 bg-red-900/30 p-4 animate-in fade-in duration-200">
                                 <div className="flex items-start gap-3">
                                   <div className="flex-shrink-0">
                                     <img
                                       src={`/images/${(meta as any).activeTraits[expandedTrait].image}`}
                                       alt={(meta as any).activeTraits[expandedTrait].name}
                                       className="w-16 h-16 rounded object-cover border border-red-500/50"
                                       onError={(e) => {
                                         const target = e.target as HTMLImageElement;
                                         target.style.display = 'none';
                                       }}
                                     />
                                   </div>
                                   <div className="flex-1 min-w-0">
                                     <p className="text-red-300 font-bold text-sm mb-1">{(meta as any).activeTraits[expandedTrait].name}</p>
                                     <p className="text-slate-300 text-xs leading-relaxed">{(meta as any).activeTraits[expandedTrait].description}</p>
                                   </div>
                                 </div>
                               </div>
                             )}
                           </div>
                         </div>
                       )}

                       {/* Top Maps Section */}
                       {(meta as any)?.maps && (meta as any).maps.length > 0 && (
                         <div>
                           <h4 className="text-orange-400 text-xs font-black uppercase mb-3 flex items-center gap-2">
                             <span className="w-2 h-2 bg-orange-500 rounded-full"></span> 
                             Top Maps
                           </h4>
                           <div className="space-y-3">
                             {(meta as any).maps.map((map: any, idx: number) => (
                               <div key={idx} className="bg-slate-950/50 p-4 rounded-lg border border-orange-900/30 group hover:border-orange-500/50 transition">
                                 <div className="flex gap-4">
                                   {/* Map Image */}
                                   <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-orange-900/50 bg-orange-900/20">
                                     <img
                                       src={`/images/${map.image}`}
                                       alt={map.name}
                                       className="w-full h-full object-cover"
                                       onError={(e) => {
                                         const target = e.target as HTMLImageElement;
                                         target.style.display = 'none';
                                         if (target.parentElement) {
                                           target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-orange-400 text-2xl">🗺️</div>';
                                         }
                                       }}
                                     />
                                   </div>
                                   
                                   {/* Map Info */}
                                   <div className="flex-1">
                                     <p className="text-orange-300 font-bold text-sm uppercase mb-1">{map.name}</p>
                                     {map.detail && (
                                       <p className="text-slate-300 text-xs leading-relaxed">{map.detail}</p>
                                     )}
                                     {!map.detail && (
                                       <p className="text-slate-500 text-xs italic">No details added yet.</p>
                                     )}
                                   </div>
                                 </div>
                               </div>
                             ))}
                           </div>
                         </div>
                       )}

                     </div>
                   ) : (
                     <div className="text-center py-12 opacity-50 border-2 border-dashed border-slate-700 rounded-2xl">
                       <p className="text-slate-400 font-bold">No Data Logged</p>
                       <p className="text-xs text-slate-600 mt-1">
                         To add data, edit <code>app/data.js</code>
                       </p>
                     </div>
                   )}
                   </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-3xl text-slate-600 text-sm p-10 text-center">
                   <span className="text-4xl mb-4 opacity-20">👈</span>
                   Select a character from the grid to view their strategy.
                 </div>
               )}
            </div>

            {/* MOBILE MODAL - CHARACTER DETAILS */}
            {selectedChar && (
              <div className="fixed inset-0 z-50 xl:hidden flex items-center justify-center p-4 bg-black/90 backdrop-blur animate-in fade-in duration-300">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-4 p-6 custom-scrollbar animate-in slide-in-from-bottom-4 duration-300">
                  {/* Header with Back Button */}
                  <div className="flex items-center justify-between sticky top-0 bg-slate-900 pb-3 border-b border-slate-700">
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic leading-none flex-1">
                      {getName(selectedChar)}
                    </h2>
                    <button 
                      onClick={() => { setSelectedChar(null); setExpandedDetail(null); }}
                      className="text-slate-400 hover:text-white text-2xl shrink-0 ml-4 transition"
                    >
                      ✕
                    </button>
                  </div>

                  {meta ? (
                    <div className="space-y-4 text-sm">
                      
                      {/* Strong Against Section */}
                      {meta.strongAgainst && meta.strongAgainst.length > 0 && (
                        <div>
                          <h4 className="text-green-400 text-xs font-black uppercase mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Strong Against
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {meta.strongAgainst.map((s: any, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setExpandedDetail(expandedDetail === `strongagainst-${idx}` ? null : `strongagainst-${idx}`)}
                                className="w-12 h-12 bg-green-900/30 border border-green-900/50 rounded-lg flex items-center justify-center text-xs hover:bg-green-900/50 hover:border-green-500/50 transition cursor-pointer overflow-hidden"
                                title={s.name}
                              >
                                <img src={`/images/Nav${s.name.replace(/[\s'"]/g, '')}.png`} className="w-full h-full object-contain" alt={s.name} onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                              </button>
                            ))}
                          </div>
                          {expandedDetail?.startsWith('strongagainst-') && (
                            <div className="mt-2 p-3 bg-green-900/20 border border-green-900/50 rounded-lg text-xs">
                              {(() => {
                                const idx = parseInt(expandedDetail.split('-')[1]);
                                const matchup = meta.strongAgainst?.[idx];
                                return matchup ? <div><h5 className="text-green-300 font-bold text-xs uppercase mb-1">{matchup.name}</h5><p className="text-slate-300 text-xs">{matchup.detail || matchup.note}</p></div> : null;
                              })()}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Weak Against Section */}
                      {meta.counters && meta.counters.length > 0 && (
                        <div>
                          <h4 className="text-red-400 text-xs font-black uppercase mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span> Weak Against
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {meta.counters.map((c: any, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setExpandedDetail(expandedDetail === `counter-${idx}` ? null : `counter-${idx}`)}
                                className="w-12 h-12 bg-red-900/30 border border-red-900/50 rounded-lg flex items-center justify-center text-xs hover:bg-red-900/50 hover:border-red-500/50 transition cursor-pointer overflow-hidden"
                                title={c.name}
                              >
                                <img src={`/images/Nav${c.name.replace(/[\s'"]/g, '')}.png`} className="w-full h-full object-contain" alt={c.name} onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                              </button>
                            ))}
                          </div>
                          {expandedDetail?.startsWith('counter-') && (
                            <div className="mt-2 p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-xs">
                              {(() => {
                                const idx = parseInt(expandedDetail.split('-')[1]);
                                const counter = meta.counters?.[idx];
                                return counter ? <div><h5 className="text-red-300 font-bold text-xs uppercase mb-1">{counter.name}</h5><p className="text-slate-300 text-xs">{counter.detail || counter.note}</p></div> : null;
                              })()}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Synergies Section */}
                      {meta.synergies && meta.synergies.length > 0 && (
                        <div>
                          <h4 className="text-blue-400 text-xs font-black uppercase mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Strong With
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {meta.synergies.map((s: any, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setExpandedDetail(expandedDetail === `synergy-${idx}` ? null : `synergy-${idx}`)}
                                className="w-12 h-12 bg-blue-900/30 border border-blue-900/50 rounded-lg flex items-center justify-center text-xs hover:bg-blue-900/50 hover:border-blue-500/50 transition cursor-pointer overflow-hidden"
                                title={s.name}
                              >
                                <img src={`/images/Nav${s.name.replace(/[\s'"]/g, '')}.png`} className="w-full h-full object-contain" alt={s.name} onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                              </button>
                            ))}
                          </div>
                          {expandedDetail?.startsWith('synergy-') && (
                            <div className="mt-2 p-3 bg-blue-900/20 border border-blue-900/50 rounded-lg text-xs">
                              {(() => {
                                const idx = parseInt(expandedDetail.split('-')[1]);
                                const synergy = meta.synergies?.[idx];
                                return synergy ? <div><h5 className="text-blue-300 font-bold text-xs uppercase mb-1">{synergy.name}</h5><p className="text-slate-300 text-xs">{synergy.detail || synergy.note}</p></div> : null;
                              })()}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Season Info */}
                      {meta.seasonInfo && (
                        <div className="p-3 rounded-lg bg-cyan-900/20 border border-cyan-900/50">
                          <h4 className="text-cyan-400 text-xs font-black uppercase mb-1">Season Info</h4>
                          <p className="text-slate-300 text-xs leading-relaxed">{meta.seasonInfo}</p>
                        </div>
                      )}

                      {/* Final Talents Section */}
                      {(meta as any)?.finalTalents && (meta as any).finalTalents.length > 0 && (
                        <div>
                          <h4 className="text-purple-400 text-xs font-black uppercase mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span> Final Talents
                          </h4>
                          <div className="grid grid-cols-3 gap-1">
                            {(meta as any).finalTalents.map((talent: any, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setExpandedTalent(expandedTalent === idx ? null : idx)}
                                className="relative rounded overflow-hidden border border-purple-900/50 bg-purple-900/20 hover:border-purple-500/50 transition cursor-pointer aspect-square group"
                              >
                                <img src={`/images/${talent.image}`} alt={talent.name} className="w-full h-full object-cover group-hover:opacity-80 transition" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-0.5">
                                  <p className="text-purple-300 font-bold text-[7px] uppercase truncate">{talent.name}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                          {expandedTalent !== null && (meta as any).finalTalents[expandedTalent] && (
                            <div className="mt-2 p-2 rounded border border-purple-500/50 bg-purple-900/30 text-xs">
                              <p className="text-purple-300 font-bold text-xs mb-1">{(meta as any).finalTalents[expandedTalent].name}</p>
                              <p className="text-slate-300 text-xs leading-relaxed">{(meta as any).finalTalents[expandedTalent].description}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Active Traits Section */}
                      {(meta as any)?.activeTraits && (meta as any).activeTraits.length > 0 && (
                        <div>
                          <h4 className="text-red-400 text-xs font-black uppercase mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span> Active Traits
                          </h4>
                          <div className="grid grid-cols-3 gap-1">
                            {(meta as any).activeTraits.map((trait: any, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setExpandedTrait(expandedTrait === idx ? null : idx)}
                                className="relative rounded overflow-hidden border border-red-900/50 bg-red-900/20 hover:border-red-500/50 transition cursor-pointer aspect-square group"
                              >
                                <img src={`/images/${trait.image}`} alt={trait.name} className="w-full h-full object-cover group-hover:opacity-80 transition" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-0.5">
                                  <p className="text-red-300 font-bold text-[7px] uppercase truncate">{trait.name}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                          {expandedTrait !== null && (meta as any).activeTraits[expandedTrait] && (
                            <div className="mt-2 p-2 rounded border border-red-500/50 bg-red-900/30 text-xs">
                              <p className="text-red-300 font-bold text-xs mb-1">{(meta as any).activeTraits[expandedTrait].name}</p>
                              <p className="text-slate-300 text-xs leading-relaxed">{(meta as any).activeTraits[expandedTrait].description}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Top Maps Section */}
                      {(meta as any)?.maps && (meta as any).maps.length > 0 && (
                        <div>
                          <h4 className="text-orange-400 text-xs font-black uppercase mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span> Top Maps
                          </h4>
                          <div className="space-y-2">
                            {(meta as any).maps.map((map: any, idx: number) => (
                              <div key={idx} className="bg-slate-950/50 p-2 rounded border border-orange-900/30">
                                <div className="flex gap-2 mb-1">
                                  <div className="w-14 h-14 shrink-0 rounded overflow-hidden bg-orange-900/20">
                                    <img src={`/images/${map.image}`} alt={map.name} className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-orange-300 font-bold text-xs uppercase">{map.name}</p>
                                  </div>
                                </div>
                                {map.detail && <p className="text-slate-300 text-[10px] leading-relaxed">{map.detail}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-slate-700 rounded">
                      <p className="text-slate-400">No Data</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slideIn 0.6s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
      `}</style>
    </div>
  );
}
