"use client";
import React, { useState } from 'react';
import { IDV_DATA } from '../data'; // Importing from your static file

// --- HELPER COMPONENT (RelationEditor) ---
const RelationEditor = ({ title, colorClass, relations, setRelations, allChars }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState('');
  
  const filtered = allChars.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) && 
    !relations.some(r => r.id === c.id)
  );

  const addRelation = (char) => {
    setRelations([...relations, { id: char.id, name: char.name, note: '', detail: '' }]);
    setIsAdding(false);
    setSearch('');
  };

  const removeRelation = (id) => {
    setRelations(relations.filter(r => r.id !== id));
  };

  const updateNote = (id, note) => {
    setRelations(relations.map(r => r.id === id ? { ...r, note } : r));
  };

  const updateDetail = (id, detail) => {
    setRelations(relations.map(r => r.id === id ? { ...r, detail } : r));
  };

  return (
    <div className={`p-4 rounded-xl border ${colorClass} bg-slate-900/50`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm uppercase tracking-wider">{title}</h3>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1 rounded border border-slate-700 transition">
          {isAdding ? 'Close' : '+ Add Character'}
        </button>
      </div>
      {isAdding && (
        <div className="mb-4 relative z-20">
          <input autoFocus type="text" placeholder="Search character..." className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white mb-2" value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="max-h-40 overflow-y-auto bg-slate-800 border border-slate-700 rounded absolute w-full shadow-xl">
            {filtered.map(c => (
              <button key={c.id} onClick={() => addRelation(c)} className="w-full text-left px-3 py-2 text-xs hover:bg-blue-600 hover:text-white border-b border-slate-700/50 last:border-0">{c.name}</button>
            ))}
            {filtered.length === 0 && <div className="p-2 text-xs text-slate-500 text-center">No matches found</div>}
          </div>
        </div>
      )}
      <div className="space-y-3">
        {relations.map(rel => (
          <div key={rel.id} className="bg-slate-950 p-3 rounded border border-slate-800 flex gap-3 animate-in fade-in slide-in-from-left-2">
            <div className="w-24 shrink-0 flex flex-col items-center justify-center border-r border-slate-800 pr-3">
               <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center font-bold text-slate-500 mb-1">{rel.name[0]}</div>
               <span className="text-[10px] font-bold text-center leading-tight uppercase">{rel.name}</span>
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Quick Note</p>
                <input type="text" value={rel.note} onChange={(e) => updateNote(rel.id, e.target.value)} placeholder={`Why is ${rel.name} a match?`} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-200 outline-none focus:border-blue-500" />
              </div>
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Detailed Explanation</p>
                <input type="text" value={rel.detail} onChange={(e) => updateDetail(rel.id, e.target.value)} placeholder="Detailed explanation..." className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-200 outline-none focus:border-blue-500" />
              </div>
            </div>
            <button onClick={() => removeRelation(rel.id)} className="text-slate-600 hover:text-red-500 px-1">✕</button>
          </div>
        ))}
        {relations.length === 0 && !isAdding && <p className="text-xs text-slate-600 italic text-center py-2">No characters selected yet.</p>}
      </div>
    </div>
  );
};

// --- HELPER COMPONENT (MapEditor) ---
const MapEditor = ({ maps, setMaps, allMaps }) => {
  const [isAdding, setIsAdding] = useState(false);
  
  const availableMaps = allMaps.filter(m => !maps.some(mp => mp.id === m.id));

  const addMap = (map) => {
    setMaps([...maps, { id: map.id, name: map.name, image: map.image, detail: '' }]);
    setIsAdding(false);
  };

  const removeMap = (id) => {
    setMaps(maps.filter(m => m.id !== id));
  };

  const updateDetail = (id, detail) => {
    setMaps(maps.map(m => m.id === id ? { ...m, detail } : m));
  };

  return (
    <div className="p-4 rounded-xl border border-orange-900/50 bg-slate-900/50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm uppercase tracking-wider">Top Maps</h3>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1 rounded border border-slate-700 transition">
          {isAdding ? 'Close' : '+ Add Map'}
        </button>
      </div>
      {isAdding && (
        <div className="mb-4 relative z-20">
          <div className="max-h-40 overflow-y-auto bg-slate-800 border border-slate-700 rounded w-full shadow-xl">
            {availableMaps.map(m => (
              <button key={m.id} onClick={() => addMap(m)} className="w-full text-left px-3 py-2 text-xs hover:bg-orange-600 hover:text-white border-b border-slate-700/50 last:border-0">{m.name}</button>
            ))}
            {availableMaps.length === 0 && <div className="p-2 text-xs text-slate-500 text-center">All maps added</div>}
          </div>
        </div>
      )}
      <div className="space-y-3">
        {maps.map(map => (
          <div key={map.id} className="bg-slate-950 p-3 rounded border border-slate-800 flex gap-3 animate-in fade-in slide-in-from-left-2">
            <div className="w-24 shrink-0 flex flex-col items-center justify-center border-r border-slate-800 pr-3">
               <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center font-bold text-slate-500 mb-1">{map.name[0]}</div>
               <span className="text-[10px] font-bold text-center leading-tight uppercase">{map.name}</span>
            </div>
            <div className="flex-1">
              <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Map Details</p>
              <input type="text" value={map.detail} onChange={(e) => updateDetail(map.id, e.target.value)} placeholder={`How does ${map.name} affect this character?`} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-200 outline-none focus:border-orange-500" />
            </div>
            <button onClick={() => removeMap(map.id)} className="text-slate-600 hover:text-red-500 px-1">✕</button>
          </div>
        ))}
        {maps.length === 0 && !isAdding && <p className="text-xs text-slate-600 italic text-center py-2">No maps selected yet.</p>}
      </div>
    </div>
  );
};

// --- MAIN ADMIN COMPONENT ---
export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedChar, setSelectedChar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data States
  const [tip, setTip] = useState('');
  const [seasonInfo, setSeasonInfo] = useState('');
  const [counters, setCounters] = useState([]);
  const [synergies, setSynergies] = useState([]);
  const [strongAgainst, setStrongAgainst] = useState([]);
  const [finalTalents, setFinalTalents] = useState([]);
  const [activeTraits, setActiveTraits] = useState([]);
  const [maps, setMaps] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [editMode, setEditMode] = useState(null); // 'character', 'contributors', or null
  const [generatedCode, setGeneratedCode] = useState('');

  const allChars = [...IDV_DATA.survivors, ...IDV_DATA.hunters];
  const filteredChars = allChars.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleLogin = (e) => { e.preventDefault(); if (password === 'admin123') setIsAuthenticated(true); };

  const handleSelect = (char) => {
    setSelectedChar(char);
    // Reset or Load existing data from the static file if it exists
    const existing = IDV_DATA.meta?.[char.id];
    setTip(existing?.tip || '');
    setSeasonInfo(existing?.seasonInfo || '');
    setCounters(existing?.counters || []);
    setSynergies(existing?.synergies || []);
    setStrongAgainst(existing?.strongAgainst || []);
    setFinalTalents(existing?.finalTalents || []);
    setActiveTraits(existing?.activeTraits || []);
    setMaps(existing?.maps || []);
    setGeneratedCode('');
  };

  const handleGenerate = () => {
    // This creates the formatted text for you!
    const formatRelations = (relations) => {
      return JSON.stringify(relations, null, 8)
        .replace(/"([^"]+)":/g, '$1:')
        .split('\n')
        .join('\n      ');
    };

    const isHunter = IDV_DATA.hunters.find(h => h.id === selectedChar.id);
    let code = `'${selectedChar.id}': {
      counters: ${formatRelations(counters)},
      synergies: ${formatRelations(synergies)},
      strongAgainst: ${formatRelations(strongAgainst)},
      finalTalents: ${formatRelations(finalTalents)},`;
    
    if (isHunter) {
      code += `
      activeTraits: ${formatRelations(activeTraits)},`;
    }
    
    code += `
      tip: '${tip.replace(/'/g, "\\'")}',
      seasonInfo: '${seasonInfo.replace(/'/g, "\\'")}',
      maps: ${formatRelations(maps)}
    },`;
    setGeneratedCode(code);
  };

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl w-80 text-center">
        <h1 className="text-xl font-black text-yellow-500 mb-6 uppercase tracking-widest">MetaV Staff</h1>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-center text-white mb-4 outline-none focus:border-yellow-500" placeholder="Passkey" />
        <button className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 rounded text-xs uppercase tracking-widest">Login</button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 font-sans flex flex-col h-screen overflow-hidden">
      <header className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800 shrink-0">
        <h1 className="text-2xl font-black text-white tracking-tighter">METAV <span className="text-yellow-500">GENERATOR</span></h1>
        <button onClick={() => setIsAuthenticated(false)} className="text-xs text-red-400 hover:text-white uppercase font-bold">Logout</button>
      </header>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
        
        {/* LEFT: LIST */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800">
            <input type="text" placeholder="Search Character..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white outline-none focus:border-blue-500" />
          </div>
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-4">
            {/* SURVIVORS SECTION */}
            <div>
              <h3 className="text-xs font-bold text-blue-400 uppercase px-2 mb-2 tracking-wider">⚔️ Survivors</h3>
              <div className="space-y-1">
                {filteredChars.filter(c => IDV_DATA.survivors.find(s => s.id === c.id)).map(char => (
                  <button key={char.id} onClick={() => handleSelect(char)} className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 border-l-2 ${selectedChar?.id === char.id ? 'bg-blue-600 text-white border-l-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-transparent hover:border-l-blue-400'}`}>
                    <span className="font-bold text-xs uppercase">{char.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* HUNTERS SECTION */}
            <div>
              <h3 className="text-xs font-bold text-red-400 uppercase px-2 mb-2 tracking-wider">🔪 Hunters</h3>
              <div className="space-y-1">
                {filteredChars.filter(c => IDV_DATA.hunters.find(h => h.id === c.id)).map(char => (
                  <button key={char.id} onClick={() => handleSelect(char)} className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 border-l-2 ${selectedChar?.id === char.id ? 'bg-red-600 text-white border-l-red-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-transparent hover:border-l-red-400'}`}>
                    <span className="font-bold text-xs uppercase">{char.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CONTRIBUTORS BUTTON */}
            <div className="pt-4 border-t border-slate-700">
              <button 
                onClick={() => { setEditMode('contributors'); setContributors(IDV_DATA.credits); }} 
                className="w-full p-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white font-bold text-xs uppercase tracking-wider transition"
              >
                📋 Edit Contributors
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: EDITOR */}
        <div className="lg:col-span-3 bg-slate-900 rounded-xl border border-slate-800 p-6 overflow-y-auto custom-scrollbar">
          {editMode === 'contributors' ? (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-white">Contributors</h2>
                <button onClick={() => setEditMode(null)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold uppercase">← Back</button>
              </div>

              {/* ADD CONTRIBUTOR BUTTON */}
              <button 
                onClick={() => setContributors([...contributors, { id: Math.max(...contributors.map(c => c.id), 0) + 1, name: '', role: '', highestRankTier: 'Master', highestBadge: 'S' }])}
                className="w-full p-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded font-bold text-xs uppercase tracking-wider transition"
              >
                + Add Contributor
              </button>

              {/* CONTRIBUTORS LIST */}
              <div className="space-y-4">
                {contributors.map((contrib, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="text-[10px] font-bold text-yellow-400 block mb-1">ID</label>
                        <input 
                          type="number" 
                          value={contrib.id} 
                          onChange={(e) => setContributors(contributors.map((c, i) => i === idx ? {...c, id: parseInt(e.target.value)} : c))}
                          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-200 outline-none focus:border-yellow-500"
                        />
                      </div>
                      <button 
                        onClick={() => setContributors(contributors.filter((_, i) => i !== idx))}
                        className="mt-6 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold"
                      >
                        Remove
                      </button>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-yellow-400 block mb-1">Name</label>
                      <input 
                        type="text" 
                        value={contrib.name} 
                        onChange={(e) => setContributors(contributors.map((c, i) => i === idx ? {...c, name: e.target.value} : c))}
                        placeholder="Contributor name..."
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-200 outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-yellow-400 block mb-1">Role</label>
                      <input 
                        type="text" 
                        value={contrib.role} 
                        onChange={(e) => setContributors(contributors.map((c, i) => i === idx ? {...c, role: e.target.value} : c))}
                        placeholder="Contributor role..."
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-200 outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-yellow-400 block mb-1">Highest Rank Tier</label>
                        <div className="flex gap-2">
                          {['Titan', 'Hydra', 'Champion', 'Unicorn'].map((tier) => (
                            <button
                              key={tier}
                              onClick={() => setContributors(contributors.map((c, i) => i === idx ? {...c, highestRankTier: tier} : c))}
                              className={`flex-1 p-2 rounded border-2 transition ${
                                contrib.highestRankTier === tier
                                  ? 'border-yellow-500 bg-yellow-900/30'
                                  : 'border-slate-700 hover:border-yellow-500'
                              }`}
                            >
                              <img src={`/images/${tier}.png`} alt={tier} className="w-full h-8 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                              <p className="text-[9px] text-center mt-1">{tier}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-yellow-400 block mb-1">Highest Badge</label>
                        <div className="flex gap-2">
                          {[
                            { badge: 'S', label: 'Gold' },
                            { badge: 'A', label: 'Silver' },
                            { badge: 'B', label: 'Bronze' },
                            { badge: 'C', label: 'Iron' }
                          ].map(({ badge, label }) => (
                            <button
                              key={badge}
                              onClick={() => setContributors(contributors.map((c, i) => i === idx ? {...c, highestBadge: badge} : c))}
                              className={`flex-1 p-2 rounded border-2 transition ${
                                contrib.highestBadge === badge
                                  ? 'border-yellow-500 bg-yellow-900/30'
                                  : 'border-slate-700 hover:border-yellow-500'
                              }`}
                            >
                              <img src={`/images/${badge}.png`} alt={badge} className="w-full h-8 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                              <p className="text-[9px] text-center mt-1">{badge}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SAVE CONTRIBUTORS */}
              <button 
                onClick={() => {
                  // Update IDV_DATA.credits with new contributors
                  IDV_DATA.credits = contributors;
                  setEditMode(null);
                }}
                className="w-full p-3 bg-green-600 hover:bg-green-500 text-white rounded font-bold text-xs uppercase tracking-wider transition"
              >
                ✓ Save Contributors
              </button>
            </div>
          ) : selectedChar ? (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4">
                 <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center text-2xl font-bold ${IDV_DATA.survivors.find(s => s.id === selectedChar.id) ? 'bg-blue-900/30 border-blue-500 text-blue-400' : 'bg-red-900/30 border-red-500 text-red-400'}`}>{selectedChar.name[0]}</div>
                 <div>
                   <h2 className="text-4xl font-black text-white uppercase">{selectedChar.name}</h2>
                   <p className="text-xs text-slate-500 font-mono">ID: <span className="text-yellow-500">{selectedChar.id}</span> • <span className={IDV_DATA.survivors.find(s => s.id === selectedChar.id) ? 'text-blue-400' : 'text-red-400'}>{IDV_DATA.survivors.find(s => s.id === selectedChar.id) ? '⚔️ Survivor' : '🔪 Hunter'}</span></p>
                 </div>
              </div>

              {/* EDITORS */}
              <div className="grid md:grid-cols-2 gap-6">
                <RelationEditor title="Weak Against (Counters)" colorClass="border-red-900/50" relations={counters} setRelations={setCounters} allChars={allChars} />
                <RelationEditor title="Strong With (Synergies)" colorClass="border-blue-900/50" relations={synergies} setRelations={setSynergies} allChars={allChars} />
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                <RelationEditor title="Strong Against (Hunters)" colorClass="border-green-900/50" relations={strongAgainst} setRelations={setStrongAgainst} allChars={allChars} />
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                <MapEditor maps={maps} setMaps={setMaps} allMaps={IDV_DATA.maps} />
              </div>

              {/* FINAL TALENTS EDITOR */}
              <div className="p-4 rounded-xl border border-purple-900/50 bg-slate-900/50">
                <h3 className="text-xs font-bold text-purple-400 uppercase mb-4">Final Talents (Select up to 2)</h3>
                <div className="space-y-2">
                  {selectedChar && (
                    (() => {
                      const faction = IDV_DATA.survivors.find(s => s.id === selectedChar.id) ? 'survivors' : 'hunters';
                      return IDV_DATA.finalTalents[faction].map((talent) => (
                        <div key={talent.id}>
                          <label className="flex items-center gap-3 p-3 bg-slate-950 rounded border border-slate-800 hover:border-purple-500/50 transition cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={finalTalents.some(ft => ft.id === talent.id)}
                              onChange={(e) => {
                                if (e.target.checked && finalTalents.length < 2) {
                                  setFinalTalents([...finalTalents, { ...talent, description: talent.description || '' }]);
                                } else if (!e.target.checked) {
                                  setFinalTalents(finalTalents.filter(ft => ft.id !== talent.id));
                                }
                              }}
                              disabled={!finalTalents.some(ft => ft.id === talent.id) && finalTalents.length >= 2}
                              className="w-4 h-4 cursor-pointer"
                            />
                            <div className="w-8 h-8 rounded border border-purple-500/30 bg-slate-900 overflow-hidden flex-shrink-0">
                              <img src={`/images/${talent.image}`} alt={talent.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold text-purple-300">{talent.name}</p>
                              <p className="text-[10px] text-slate-500">{talent.web}</p>
                            </div>
                          </label>
                          {finalTalents.some(ft => ft.id === talent.id) && (
                            <div className="mt-2 ml-8 p-3 bg-slate-950 rounded border border-purple-500/30">
                              <label className="text-[10px] font-bold text-purple-400 block mb-2">Description:</label>
                              <textarea 
                                value={finalTalents.find(ft => ft.id === talent.id)?.description || ''}
                                onChange={(e) => {
                                  setFinalTalents(finalTalents.map(ft => 
                                    ft.id === talent.id ? { ...ft, description: e.target.value } : ft
                                  ));
                                }}
                                placeholder="Enter talent description..."
                                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/50"
                                rows="3"
                              />
                            </div>
                          )}
                        </div>
                      ));
                    })()
                  )}
                </div>
              </div>

              {/* ACTIVE TRAITS EDITOR - Only for Hunters */}
              {selectedChar && IDV_DATA.hunters.find(h => h.id === selectedChar.id) && (
                <div className="p-4 rounded-xl border border-red-900/50 bg-slate-900/50">
                  <h3 className="text-xs font-bold text-red-400 uppercase mb-4">Active Traits (Select up to 2)</h3>
                  <div className="space-y-2">
                    {IDV_DATA.hunterTraits.map((trait) => (
                      <div key={trait.id}>
                        <label className="flex items-center gap-3 p-3 bg-slate-950 rounded border border-slate-800 hover:border-red-500/50 transition cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={activeTraits.some(at => at.id === trait.id)}
                            onChange={(e) => {
                              if (e.target.checked && activeTraits.length < 2) {
                                setActiveTraits([...activeTraits, { ...trait, detail: trait.description || '' }]);
                              } else if (!e.target.checked) {
                                setActiveTraits(activeTraits.filter(at => at.id !== trait.id));
                              }
                            }}
                            disabled={!activeTraits.some(at => at.id === trait.id) && activeTraits.length >= 2}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <div className="w-8 h-8 rounded border border-red-500/30 bg-slate-900 overflow-hidden flex-shrink-0">
                            <img src={`/images/${trait.image}`} alt={trait.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-red-300">{trait.name}</p>
                          </div>
                        </label>
                        {activeTraits.some(at => at.id === trait.id) && (
                          <div className="mt-2 ml-8 p-3 bg-slate-950 rounded border border-red-500/30">
                            <label className="text-[10px] font-bold text-red-400 block mb-2">Description:</label>
                            <textarea 
                              value={activeTraits.find(at => at.id === trait.id)?.description || ''}
                              onChange={(e) => {
                                setActiveTraits(activeTraits.map(at => 
                                  at.id === trait.id ? { ...at, description: e.target.value } : at
                                ));
                              }}
                              placeholder="Enter trait description..."
                              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500/50"
                              rows="3"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TIP FIELD */}
              <div className="p-4 rounded-xl border border-yellow-900/50 bg-slate-900/50">
                <h3 className="text-xs font-bold text-yellow-400 uppercase mb-4">Strategy Tip</h3>
                <textarea value={tip} onChange={(e) => setTip(e.target.value)} placeholder="Enter strategy tip..." className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-xs text-slate-200 outline-none focus:border-yellow-500 min-h-20 resize-none" />
              </div>

              {/* SEASON INFO FIELD */}
              <div className="p-4 rounded-xl border border-cyan-900/50 bg-slate-900/50">
                <h3 className="text-xs font-bold text-cyan-400 uppercase mb-4">Season Info & Ranking</h3>
                <textarea value={seasonInfo} onChange={(e) => setSeasonInfo(e.target.value)} placeholder="e.g., Tier: S | Current Meta: Top-tier pick this season..." className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-xs text-slate-200 outline-none focus:border-cyan-500 min-h-20 resize-none" />
              </div>

              {/* GENERATE BUTTON */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-10 rounded shadow-lg transition uppercase text-xs tracking-widest transform active:scale-95">
                  Generate Code
                </button>
              </div>

              {/* CODE OUTPUT */}
              {generatedCode && (
                <div className="bg-black/50 p-4 rounded-xl border border-green-500/50 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-green-400 text-xs font-bold uppercase">✅ Copy this and paste it into app/data.js inside "meta":</p>
                      <button onClick={() => navigator.clipboard.writeText(generatedCode)} className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded font-bold transition">Copy</button>
                    </div>
                    <pre className="text-[10px] md:text-xs bg-slate-950 p-4 rounded text-slate-300 font-mono overflow-x-auto select-all">
                        {generatedCode}
                    </pre>
                </div>
              )}

            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600"><p>Select a character or contributors to edit.</p></div>
          )}
        </div>
      </div>
    </div>
  );
}