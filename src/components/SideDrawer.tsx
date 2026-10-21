import React, { useState } from 'react';
import {
  X,
  Search,
  Sun,
  Moon,
  Coins,
  Fuel,
  Zap,
  Briefcase,
  DollarSign,
  Wheat,
  Car,
  Building2,
  Newspaper,
  Headphones,
  Bell,
  Sparkles,
  Share2,
  Home,
  Check,
} from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenRatesUpdater: () => void;
  onOpenSpeedTest: () => void;
  onOpenAudioGuides: () => void;
  onOpenAlerts: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  theme,
  onToggleTheme,
  onOpenRatesUpdater,
  onOpenSpeedTest,
  onOpenAudioGuides,
  onOpenAlerts,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const categories = [
    {
      name: 'Main Hub',
      items: [
        {
          id: 'home',
          label: 'Home Feature Hub',
          urdu: 'مرکزی صفحہ',
          desc: 'All tools, live rates overview & quick navigators',
          icon: Home,
        },
      ],
    },
    {
      name: 'Live Market Rates',
      items: [
        {
          id: 'gold',
          label: 'Sarafa Gold & Bullion Market',
          urdu: 'صرافہ سونا مارکیٹ',
          desc: '24K, 22K, 21K, 18K & Silver + 7-Day Trend Chart',
          icon: Coins,
        },
        {
          id: 'fuel',
          label: 'OGRA Fuel & LPG/CNG Benchmarks',
          urdu: 'پٹرول، ڈیزل و گیس ریٹس',
          desc: 'Petrol, HSD, HOBC, Kerosene & LPG cylinders',
          icon: Fuel,
        },
        {
          id: 'solar',
          label: 'Solar Panel System Sizing & Cost',
          urdu: 'شمسی توانائی کیلکولیٹر',
          desc: 'Tier-1 TopCon / Bifacial Watt rates & Net-Metering',
          icon: Sun,
        },
        {
          id: 'currency',
          label: 'Forex Exchange & Crypto Tracker',
          urdu: 'کرنسی ایکسچینج و کرپٹو',
          desc: 'USD, SAR, AED, EUR, GBP + Bitcoin live prices',
          icon: DollarSign,
        },
        {
          id: 'mandi',
          label: 'Ghalla Mandi & Agri Weather Alerts',
          urdu: 'غلہ منڈی اور زرعی الرٹس',
          desc: 'Wheat, Rice, Cotton, Vegetables & City AQI',
          icon: Wheat,
        },
      ],
    },
    {
      name: 'Financial & Calculation Utilities',
      items: [
        {
          id: 'tax',
          label: 'FBR Income Tax & Salary Slabs',
          urdu: 'انکم ٹیکس سلیب 2025-26',
          desc: 'Latest progressive tax brackets & take-home pay',
          icon: Briefcase,
        },
        {
          id: 'zakat',
          label: 'Nisab Zakat Calculator',
          urdu: 'زکوٰۃ کیلکولیٹر نصاب',
          desc: 'Automated calculation with live gold & silver Nisab',
          icon: Moon,
        },
        {
          id: 'electricity',
          label: 'WAPDA & DISCOs Electricity Bills',
          urdu: 'بجلی کا بل کیلکولیٹر',
          desc: 'LESCO, MEPCO, K-Electric, FESCO unit tariffs',
          icon: Zap,
        },
        {
          id: 'vehicle-tax',
          label: 'Vehicle Excise & Token Tax',
          urdu: 'گاڑیوں کا ٹوکن ٹیکس',
          desc: 'Engine capacity (CC) based annual tax estimator',
          icon: Car,
        },
        {
          id: 'construction',
          label: 'House Construction Cost BOQ',
          urdu: 'مکان کی تعمیراتی لاگت',
          desc: '1-100 storey gray structure and finishing estimates',
          icon: Building2,
        },
        {
          id: 'news',
          label: 'Market Bulletins & Daily News',
          urdu: 'مارکیٹ نیوز و بلیٹن',
          desc: 'Official OGRA notifications and bullion updates',
          icon: Newspaper,
        },
      ],
    },
  ];

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.urdu.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    onClose();
  };

  const handleShareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RateZilla - Pakistan Ultimate Live Market Rates',
          text: 'Check live gold, fuel, solar rates, and financial calculators on RateZilla!',
          url: window.location.origin,
        });
        return;
      } catch {}
    }
    // Fallback copy link
    await navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-sm sm:max-w-md h-full bg-[#050e08] dark:bg-[#050e08] text-slate-100 border-r border-[#00401a] shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#00401a]/60 bg-[#030905] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ffd700] to-[#b39700] flex items-center justify-center shadow-lg shadow-[#ffd700]/10">
              <span className="text-[#050d08] font-black text-lg">R</span>
            </div>
            <div>
              <div className="text-base font-extrabold text-white">
                Rate<span className="text-[#ffd700]">Zilla</span> Directory
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">
                All Tools &amp; Pages Navigation
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-[#00401a]/60 hover:bg-[#00401a] text-[#ffd700] border border-[#ffd700]/30 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#ffd700]" />
              ) : (
                <Moon className="w-4 h-4 text-[#ffd700]" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-[#06140b] border-b border-[#00401a]/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tools, rates, calculators..."
              className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Quick Action Buttons Strip */}
        <div className="p-3 bg-[#040e08] border-b border-[#00401a]/40 grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => {
              onClose();
              onOpenRatesUpdater();
            }}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-[#00401a] hover:bg-[#005724] text-[#ffd700] border border-[#ffd700]/30 font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Update Rates</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenAlerts();
            }}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-[#0a1e12] hover:bg-[#0d2717] text-emerald-300 border border-emerald-500/30 font-semibold transition-colors"
          >
            <Bell className="w-3.5 h-3.5 text-emerald-400" />
            <span>Price Alerts</span>
          </button>
        </div>

        {/* Navigation Categories List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                {category.name}
              </div>
              <div className="space-y-1">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                        isActive
                          ? 'bg-[#00401a] text-[#ffd700] border border-[#ffd700]/40 shadow-md shadow-[#00401a]/40'
                          : 'hover:bg-[#091b10] text-slate-300 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-[#ffd700]/20 text-[#ffd700]'
                              : 'bg-slate-800/80 text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold truncate flex items-center gap-1.5">
                            <span>{item.label}</span>
                            <span className="text-[10px] text-emerald-400 font-urdu shrink-0">
                              {item.urdu}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Extra Utilities */}
          <div className="space-y-2 pt-2 border-t border-[#00401a]/40">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Interactive Tools &amp; Audio
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  onClose();
                  onOpenSpeedTest();
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#030905] hover:bg-[#07160d] text-slate-300 hover:text-white border border-[#00401a]/60 text-left transition-colors"
              >
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-xs">Speed Test</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenAudioGuides();
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#030905] hover:bg-[#07160d] text-slate-300 hover:text-white border border-[#00401a]/60 text-left transition-colors"
              >
                <Headphones className="w-4 h-4 text-[#ffd700] shrink-0" />
                <span className="font-semibold text-xs">Urdu Audio</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#00401a]/60 bg-[#030905] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={handleShareApp}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#ffd700] transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share RateZilla</span>
                </>
              )}
            </button>

            <span className="text-[11px] text-slate-500 font-mono">
              v2.5 · Cloud &amp; Edge
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
