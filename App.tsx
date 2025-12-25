
import React, { useState, useEffect, useRef } from 'react';
import { PLASTICS } from './constants';
import { PlasticMaterial, ViewState } from './types';
import PropertyChart from './components/PropertyChart';
import AIChat from './components/AIChat';
import IdentifyPlastic from './components/IdentifyPlastic';
import { getLiveMarketPrice } from './services/geminiService';
import { 
  BookOpen, 
  MessageCircle, 
  Scan, 
  ArrowLeft, 
  ChevronRight, 
  Droplets, 
  Thermometer, 
  ShieldCheck, 
  Layers,
  Search,
  ExternalLink,
  Cpu,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Coins,
  SearchCode,
  Loader2,
  Globe,
  Dumbbell,
  GanttChart,
  HardDrive,
  Zap,
  Box,
  Waves,
  Hammer,
  Wind,
  Trash2,
  AlertTriangle,
  X,
  ListFilter,
  ArrowUpRight
} from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('catalog');
  const [selectedMaterial, setSelectedMaterial] = useState<PlasticMaterial | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Live Price State
  const [livePriceData, setLivePriceData] = useState<{ text: string, sources: any[] } | null>(null);
  const [isFetchingLive, setIsFetchingLive] = useState(false);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPlastics = PLASTICS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.commonUses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const navigateToDetail = (material: PlasticMaterial) => {
    setSelectedMaterial(material);
    setLivePriceData(null);
    setView('detail');
    setIsSearchFocused(false);
    setSearchTerm('');
  };

  const handleFetchLivePrice = async () => {
    if (!selectedMaterial) return;
    setIsFetchingLive(true);
    const result = await getLiveMarketPrice(selectedMaterial.name);
    setLivePriceData(result);
    setIsFetchingLive(false);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Categorization Logic for Index View
  const commodityPlastics = PLASTICS.filter(p => p.recyclingCode >= 1 && p.recyclingCode <= 6);
  const engineeringPlastics = PLASTICS.filter(p => ['abs', 'pc', 'nylon', 'pom', 'ptfe', 'peek'].includes(p.id));
  const thermosetPlastics = PLASTICS.filter(p => ['epoxy', 'pu', 'phenolic', 'silicone'].includes(p.id));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-morphism px-4 md:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => setView('catalog')}>
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Cpu size={20} strokeWidth={2.5} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold tracking-tight">PlastiDex</h1>
            <p className="text-[9px] text-slate-500 font-medium uppercase tracking-widest leading-none">Engineering Hub</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md mx-4 relative" ref={searchRef}>
          <div className="relative group">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-indigo-500' : 'text-slate-400'}`} size={18} />
            <input 
              type="text" 
              placeholder="Search materials, uses (e.g. 'bottles')..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchFocused && searchTerm.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[400px] overflow-y-auto">
              <div className="p-2 border-b border-slate-50 bg-slate-50/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Results</p>
              </div>
              {filteredPlastics.length > 0 ? (
                filteredPlastics.map(plastic => (
                  <div 
                    key={plastic.id}
                    onClick={() => navigateToDetail(plastic)}
                    className="flex items-center gap-3 p-3 hover:bg-indigo-50 cursor-pointer transition-colors group"
                  >
                    <div className={`w-8 h-8 ${plastic.color} rounded flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                      {plastic.recyclingCode}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600">{plastic.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{plastic.fullName}</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400" />
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Activity size={24} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500 font-medium">No materials match your search.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold shrink-0">
          <button 
            onClick={() => setView('catalog')}
            className={`transition-colors ${view === 'catalog' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            Encyclopedia
          </button>
          <button 
            onClick={() => setView('index')}
            className={`transition-colors ${view === 'index' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            Master Index
          </button>
          <button 
            onClick={() => setView('identify')}
            className={`transition-colors ${view === 'identify' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            Identify
          </button>
          <button 
            onClick={() => setView('chat')}
            className={`transition-colors ${view === 'chat' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            AI Expert
          </button>
        </nav>

        <div className="lg:hidden shrink-0">
          <button 
            onClick={() => setView(view === 'catalog' ? 'chat' : 'catalog')}
            className="p-2 bg-slate-100 rounded-lg text-slate-600"
          >
            {view === 'catalog' ? <MessageCircle size={20} /> : <BookOpen size={20} />}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {view === 'catalog' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                   <h2 className="text-3xl font-bold text-slate-800">Plastic Encyclopedia</h2>
                   <span className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-full animate-pulse border border-red-100">
                     <Activity size={10} /> LIVE MARKET DATA
                   </span>
                </div>
                <p className="text-slate-500">Technical polymer guide with mechanical specs, molding data, and IndiaMart pricing.</p>
              </div>
              <button 
                onClick={() => setView('index')}
                className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all text-sm font-semibold shadow-sm"
              >
                <ListFilter size={18} />
                Browse Directory
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlastics.map(plastic => (
                <div 
                  key={plastic.id}
                  onClick={() => navigateToDetail(plastic)}
                  className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-50 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10 rounded-full ${plastic.color}`}></div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${plastic.color} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                      {plastic.recyclingCode}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-slate-400 tracking-tighter bg-slate-100 px-2 py-1 rounded">CODE {plastic.recyclingCode}</span>
                      <span className="text-[10px] mt-1 font-bold text-indigo-600 flex items-center gap-1">
                        <Globe size={10} /> IndiaMart Est: ₹{plastic.costing.priceRange[0]}/kg
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{plastic.name}</h3>
                  <p className="text-xs font-medium text-slate-400 mb-4">{plastic.fullName}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <Dumbbell size={10} className="text-indigo-400" /> {plastic.mechanical.tensileStrength} MPa
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <Zap size={10} className="text-amber-400" /> Shrink: {plastic.injectionMolding.shrinkage}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2 mb-6">{plastic.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex gap-2">
                      <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-semibold">
                        {plastic.properties.transparency} Clarity
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full font-semibold">
                        {plastic.costing.marketTrend} Trend
                      </span>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'index' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12 pb-20">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h2 className="text-4xl font-extrabold text-slate-800">Master Material Index</h2>
              <p className="text-slate-500 text-lg">Comprehensive directory of all available polymers and resins in PlastiDex.</p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Commodity Category */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Commodity</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">High Volume / Everyday</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {commodityPlastics.map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => navigateToDetail(p)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-md hover:border-slate-200 border border-transparent transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${p.color}`}></div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600">{p.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium italic">Recycling Code {p.recyclingCode}</p>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Engineering Category */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Engineering</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Industrial / Performance</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {engineeringPlastics.map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => navigateToDetail(p)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-md hover:border-slate-200 border border-transparent transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${p.color}`}></div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600">{p.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium italic">{p.fullName}</p>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Thermosets Category */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
                    <Thermometer size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Thermosets</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Heat Cured / Permanent</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {thermosetPlastics.map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => navigateToDetail(p)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-md hover:border-slate-200 border border-transparent transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${p.color}`}></div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600">{p.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium italic">Chemically Cured</p>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'detail' && selectedMaterial && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 pb-20">
            <button 
              onClick={() => setView('catalog')}
              className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Catalog
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Main Identity */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 opacity-5 rounded-full ${selectedMaterial.color}`}></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <div className={`w-14 h-14 ${selectedMaterial.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl`}>
                          {selectedMaterial.recyclingCode}
                        </div>
                        <h2 className="text-4xl font-extrabold text-slate-800">{selectedMaterial.name}</h2>
                      </div>
                      <p className="text-lg text-slate-400 font-medium">{selectedMaterial.fullName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-4 py-2 rounded-xl text-white font-bold text-sm ${selectedMaterial.color}`}>
                        Recycling Code {selectedMaterial.recyclingCode}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed">{selectedMaterial.description}</p>
                </div>

                {/* Injection Molding Properties */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm border-l-4 border-l-indigo-600">
                   <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                    <Box className="text-indigo-600" size={24} />
                    Injection Molding Parameters
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2">
                          <Waves className="text-indigo-400" size={16} />
                          <span className="text-xs font-bold text-slate-500 uppercase">Shrinkage</span>
                        </div>
                        <span className="font-bold text-slate-800">{selectedMaterial.injectionMolding.shrinkage}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2">
                          <Wind className="text-indigo-400" size={16} />
                          <span className="text-xs font-bold text-slate-500 uppercase">Draft Angle</span>
                        </div>
                        <span className="font-bold text-slate-800">{selectedMaterial.injectionMolding.draftAngle}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                        <div className="flex items-center gap-2">
                          <Thermometer className="text-red-400" size={16} />
                          <span className="text-xs font-bold text-indigo-600 uppercase">Melt Temp</span>
                        </div>
                        <span className="font-bold text-indigo-900">{selectedMaterial.injectionMolding.meltTemp}°C</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                        <div className="flex items-center gap-2">
                          <Droplets className="text-blue-400" size={16} />
                          <span className="text-xs font-bold text-indigo-600 uppercase">Mold Temp</span>
                        </div>
                        <span className="font-bold text-indigo-900">{selectedMaterial.injectionMolding.moldTemp}°C</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2">
                          <Hammer className="text-slate-400" size={16} />
                          <span className="text-xs font-bold text-slate-500 uppercase">Abrasive</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          selectedMaterial.injectionMolding.abrasive === 'No' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>{selectedMaterial.injectionMolding.abrasive}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="text-orange-400" size={16} />
                          <span className="text-xs font-bold text-slate-500 uppercase">Moisture Sens.</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          selectedMaterial.injectionMolding.moistureSensitive === 'No' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>{selectedMaterial.injectionMolding.moistureSensitive}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mechanical Specifications */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                   <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                    <Zap className="text-amber-500" size={24} />
                    Mechanical & Structural
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                       <Dumbbell className="text-indigo-500 mb-2" size={20} />
                       <p className="text-[10px] text-slate-400 font-bold uppercase">Tensile Strength</p>
                       <p className="text-lg font-bold text-slate-800">{selectedMaterial.mechanical.tensileStrength} <span className="text-[10px] font-normal">MPa</span></p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                       <GanttChart className="text-emerald-500 mb-2" size={20} />
                       <p className="text-[10px] text-slate-400 font-bold uppercase">Flex Modulus</p>
                       <p className="text-lg font-bold text-slate-800">{selectedMaterial.mechanical.flexuralModulus} <span className="text-[10px] font-normal">GPa</span></p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                       <HardDrive className="text-orange-500 mb-2" size={20} />
                       <p className="text-[10px] text-slate-400 font-bold uppercase">Hardness</p>
                       <p className="text-lg font-bold text-slate-800">{selectedMaterial.mechanical.hardness}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                       <Activity className="text-red-500 mb-2" size={20} />
                       <p className="text-[10px] text-slate-400 font-bold uppercase">Impact Strength</p>
                       <p className="text-lg font-bold text-slate-800">{selectedMaterial.mechanical.impactStrength} <span className="text-[10px] font-normal">J/m</span></p>
                    </div>
                  </div>
                </div>

                {/* LIVE MARKET PULSE */}
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-indigo-500/30">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <SearchCode size={120} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-2xl font-bold flex items-center gap-3">
                        <Activity className="text-red-400 animate-pulse" size={24} />
                        Live Market Pulse (IndiaMart)
                      </h3>
                      {!livePriceData && !isFetchingLive && (
                         <button 
                          onClick={handleFetchLivePrice}
                          className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                        >
                          <Globe size={18} />
                          Fetch Live Rates
                        </button>
                      )}
                    </div>

                    {isFetchingLive ? (
                      <div className="flex flex-col items-center justify-center py-10 space-y-4">
                        <Loader2 size={40} className="animate-spin text-indigo-400" />
                        <p className="text-indigo-200 font-medium italic">Scouring IndiaMart for current wholesale rates...</p>
                      </div>
                    ) : livePriceData ? (
                      <div className="space-y-6 animate-in fade-in duration-700">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                           <p className="text-indigo-100 leading-relaxed whitespace-pre-wrap">{livePriceData.text}</p>
                        </div>
                        
                        {livePriceData.sources.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Data Sources</h4>
                            <div className="flex flex-wrap gap-2">
                              {livePriceData.sources.map((src: any, i: number) => (
                                <a 
                                  key={i} 
                                  href={src.web?.uri || "#"} 
                                  target="_blank" 
                                  className="text-[10px] bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full flex items-center gap-1 transition-colors border border-white/5"
                                >
                                  <ExternalLink size={10} />
                                  {src.web?.title || 'Market Source'}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        <button onClick={handleFetchLivePrice} className="text-xs text-indigo-400 hover:text-white underline transition-colors">Refresh</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                          <Coins size={24} />
                        </div>
                        <div>
                          <p className="text-indigo-100 font-medium">Verify current wholesale rates before ordering.</p>
                          <p className="text-xs text-indigo-400">Queries IndiaMart for live listings of {selectedMaterial.name}.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Base Market & Costing Analysis */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                    <BarChart3 className="text-indigo-600" size={24} />
                    Economic Baseline
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                            <Coins size={20} className="text-amber-500" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-bold uppercase">Baseline Rate (India)</p>
                            <p className="text-xl font-black text-slate-800">
                              {formatCurrency(selectedMaterial.costing.priceRange[0])} - {formatCurrency(selectedMaterial.costing.priceRange[1])}
                              <span className="text-xs text-slate-400 font-normal ml-1">/ kg</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center ${
                            selectedMaterial.costing.marketTrend === 'Rising' ? 'text-red-500' : 
                            selectedMaterial.costing.marketTrend === 'Falling' ? 'text-green-500' : 'text-blue-500'
                          }`}>
                            {selectedMaterial.costing.marketTrend === 'Rising' ? <TrendingUp size={20} /> : 
                             selectedMaterial.costing.marketTrend === 'Falling' ? <TrendingDown size={20} /> : <Activity size={20} />}
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-bold uppercase">Trend Indicator</p>
                            <p className="text-xl font-black text-slate-800">{selectedMaterial.costing.marketTrend}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Primary Cost Drivers</h4>
                      <div className="space-y-2">
                        {selectedMaterial.costing.primaryCostDrivers.map((driver, i) => (
                          <div key={i} className="flex items-center gap-3 text-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                            <span className="text-sm font-medium">{driver}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold mb-4 w-full text-left">Property Map</h3>
                    <PropertyChart material={selectedMaterial} />
                    <p className="text-[10px] text-slate-400 mt-2">Comparison of physical & mechanical traits</p>
                </div>

                <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
                  <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                      <ExternalLink size={16} />
                    </div>
                    Environmental Profile
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${selectedMaterial.recyclingCode <= 2 ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                      <span className="font-bold text-emerald-800">{selectedMaterial.recyclability}</span>
                    </div>
                    <p className="text-emerald-700 text-sm leading-relaxed">{selectedMaterial.environmentalImpact}</p>
                  </div>
                </div>

                <AIChat />
              </div>
            </div>
          </div>
        )}

        {view === 'identify' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setView('catalog')} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors">
              <ArrowLeft size={18} /> Back to Catalog
            </button>
            <IdentifyPlastic />
          </div>
        )}

        {view === 'chat' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
             <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Advanced Polymer Consulting</h2>
                <p className="text-slate-500">Technical molding parameters & market grounded insights</p>
             </div>
             <AIChat />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <Cpu size={18} />
            <span className="font-semibold text-slate-500">PlastiDex Hub v3.4</span>
          </div>
          <p>© 2024 Polymer Engineering Insights. Data covers ASTM standards and Indian industrial pricing.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
