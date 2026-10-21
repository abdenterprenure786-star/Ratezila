import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  Coins,
  Sun,
  Fuel,
  Zap,
  Briefcase,
  Moon,
  DollarSign,
  Wheat,
  Car,
  Building2,
  Newspaper,
  ShieldCheck,
  Share2,
  ExternalLink,
} from 'lucide-react';

interface BottomDrawerMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  gold24kTola?: number;
  petrolPrice?: number;
}

export const BottomDrawerMenu: React.FC<BottomDrawerMenuProps> = ({
  activeTab,
  setActiveTab,
  gold24kTola = 429500,
  petrolPrice = 382.02,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const navLinks = [
    { id: 'home', label: 'Home Feature Hub', urdu: 'مرکزی صفحہ', icon: Menu },
    { id: 'gold', label: 'Sarafa Gold & Simulator', urdu: 'صرافہ سونا', icon: Coins },
    { id: 'solar', label: 'Solar Panel Sizing & Cost', urdu: 'شمسی توانائی', icon: Sun },
    { id: 'fuel', label: 'OGRA Fuel & Trip Planner', urdu: 'پٹرول ریٹس', icon: Fuel },
    { id: 'electricity', label: 'WAPDA Bills & Duplicate', urdu: 'بجلی کا بل', icon: Zap },
    { id: 'tax', label: 'FBR Tax Slabs 2025-26', urdu: 'انکم ٹیکس', icon: Briefcase },
    { id: 'zakat', label: 'Nisab Zakat Calculator', urdu: 'زکوٰۃ نصاب', icon: Moon },
    { id: 'currency', label: 'Forex & Crypto Tracker', urdu: 'کرنسی و کرپٹو', icon: DollarSign },
    { id: 'mandi', label: 'Ghalla Mandi Wholesale', urdu: 'غلہ منڈی', icon: Wheat },
    { id: 'vehicle-tax', label: 'Vehicle Token Tax', urdu: 'ٹوکن ٹیکس', icon: Car },
    { id: 'construction', label: 'Building Cost BOQ', urdu: 'تعمیراتی لاگت', icon: Building2 },
    { id: 'news', label: 'Market Bulletins', urdu: 'مارکیٹ نیوز', icon: Newspaper },
  ];

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setIsExpanded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sticky bottom-0 z-40 w-full">
      {/* Expanded Directory Drawer Sheet */}
      {isExpanded && (
        <div className="bg-[#030905]/95 backdrop-blur-xl border-t border-[#00401a] shadow-2xl p-6 sm:p-8 max-h-[75vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header in sheet */}
            <div className="flex items-center justify-between pb-4 border-b border-[#00401a]/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ffd700] to-[#b39700] flex items-center justify-center">
                  <span className="text-[#050d08] font-black text-sm">R</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Rate<span className="text-[#ffd700]">Zilla</span> All Pages &amp; Tools Directory
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Direct access to all live market engines, calculators, and legal resources
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00401a] hover:bg-[#005724] text-[#ffd700] text-xs font-semibold transition-colors"
              >
                <span>Close Menu</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-[#00401a] text-[#ffd700] border-[#ffd700]/40'
                        : 'bg-[#051109] text-slate-300 hover:text-white border-[#00401a]/50 hover:border-emerald-600/40'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#ffd700]' : 'text-slate-400'}`} />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate">{item.label}</div>
                      <div className="text-[10px] text-emerald-400/80 font-urdu">{item.urdu}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* App Info & Legal */}
            <div className="pt-4 border-t border-[#00401a]/40 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
              <div>
                <span className="font-bold text-white block mb-1">About RateZilla</span>
                <p className="text-[11px] leading-relaxed">
                  RateZilla is Pakistan&apos;s API-driven live market rates and utility portal, providing Sarafa gold updates, OGRA fuel prices, and financial simulators.
                </p>
              </div>

              <div>
                <span className="font-bold text-white block mb-1">Coverage &amp; Sourcing</span>
                <p className="text-[11px] leading-relaxed">
                  Data sourced from All Pakistan Sarafa Jewellers Association (APSJA), OGRA Fortnightly Pricing, State Bank of Pakistan (SBP), and provincial grain mandis.
                </p>
              </div>

              <div>
                <span className="font-bold text-white block mb-1">Quick Links</span>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#ffd700] underline"
                  >
                    Sitemap XML
                  </a>
                  <span>·</span>
                  <button
                    onClick={() => handleSelect('gold')}
                    className="hover:text-[#ffd700] underline"
                  >
                    Sarafa Rates
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => handleSelect('tax')}
                    className="hover:text-[#ffd700] underline"
                  >
                    FBR Tax
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sleek Floating Bottom Bar */}
      <div className="bg-[#040e08]/95 backdrop-blur-md border-t border-[#00401a] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Quick Benchmark Badges */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-slate-300 hidden sm:inline">
                RateZilla Live Hub:
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-[#00401a] text-[#ffd700] border border-[#ffd700]/30 font-semibold">
                Gold: Rs. {gold24kTola.toLocaleString()}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#0a1e12] text-emerald-300 border border-emerald-600/30 font-semibold hidden md:inline">
                Petrol: Rs. {petrolPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Center / Right: 3-Lines Expandable Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#00401a] to-[#005724] hover:from-[#005724] hover:to-[#006e2e] text-[#ffd700] border border-[#ffd700]/40 font-bold text-xs shadow-lg shadow-[#00401a]/50 transition-all hover:scale-[1.02] active:scale-95"
            title="Open 3-lines menu with all pages and directory"
          >
            <Menu className="w-4 h-4 text-[#ffd700]" />
            <span>{isExpanded ? 'Hide Menu' : 'All Pages Menu (3 Lines)'}</span>
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
