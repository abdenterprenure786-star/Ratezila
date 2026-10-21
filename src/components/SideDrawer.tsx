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
  ChevronRight,
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
          desc: 'All tools, 2-column portals & live rate ticker',
          icon: Home,
          color: 'text-emerald-500 bg-emerald-500/10',
        },
      ],
    },
    {
      name: 'Live Market Benchmarks',
      items: [
        {
          id: 'gold',
          label: 'Sarafa Gold & Bullion Market',
          urdu: 'صرافہ سونا مارکیٹ',
          desc: '24K, 22K, 21K, 18K & Silver + 7-Day Trend Chart',
          icon: Coins,
          color: 'text-amber-500 bg-amber-500/10',
        },
        {
          id: 'solar',
          label: 'Solar Panel Sizing & ROI',
          urdu: 'شمسی توانائی کیلکولیٹر',
          desc: 'Tier-1 TopCon / Bifacial Watt rates & Net-Metering',
          icon: Sun,
          color: 'text-yellow-500 bg-yellow-500/10',
        },
        {
          id: 'fuel',
          label: 'OGRA Fuel & Trip Planner',
          urdu: 'پٹرول، ڈیزل و سفر کا خرچ',
          desc: 'Petrol, HSD, HOBC, Kerosene & LPG cylinders',
          icon: Fuel,
          color: 'text-blue-500 bg-blue-500/10',
        },
        {
          id: 'tax',
          label: 'FBR Income Tax 2025-26',
          urdu: 'انکم ٹیکس سلیب 2025-26',
          desc: 'Latest progressive tax brackets & take-home pay',
          icon: Briefcase,
          color: 'text-purple-500 bg-purple-500/10',
        },
        {
          id: 'zakat',
          label: 'Live Nisab Zakat Calculator',
          urdu: 'زکوٰۃ کیلکولیٹر نصاب',
          desc: 'Automated calculation with live gold & silver Nisab',
          icon: Moon,
          color: 'text-emerald-500 bg-emerald-500/10',
        },
        {
          id: 'currency',
          label: 'Forex Exchange & Crypto Rates',
          urdu: 'کرنسی ایکسچینج و کرپٹو',
          desc: 'USD, SAR, AED, EUR, GBP + Bitcoin live prices',
          icon: DollarSign,
          color: 'text-indigo-500 bg-indigo-500/10',
        },
        {
          id: 'electricity',
          label: 'WAPDA Bills & Duplicate Finder',
          urdu: 'بجلی کا بل کیلکولیٹر',
          desc: 'LESCO, MEPCO, K-Electric, FESCO unit tariffs',
          icon: Zap,
          color: 'text-rose-500 bg-rose-500/10',
        },
        {
          id: 'mandi',
          label: 'Ghalla Mandi & Agri Weather',
          urdu: 'غلہ منڈی اور زرعی الرٹس',
          desc: 'Wheat, Rice, Cotton, Vegetables & City AQI',
          icon: Wheat,
          color: 'text-orange-500 bg-orange-500/10',
        },
        {
          id: 'vehicle-tax',
          label: 'Vehicle Excise & Token Tax',
          urdu: 'گاڑیوں کا ٹوکن ٹیکس',
          desc: 'Engine capacity (CC) based annual tax estimator',
          icon: Car,
          color: 'text-cyan-500 bg-cyan-500/10',
        },
        {
          id: 'construction',
          label: 'House Construction Cost BOQ',
          urdu: 'مکان کی تعمیراتی لاگت',
          desc: '1-100 storey gray structure and finishing estimates',
          icon: Building2,
          color: 'text-teal-500 bg-teal-500/10',
        },
        {
          id: 'news',
          label: 'Market Bulletins & Daily News',
          urdu: 'مارکیٹ نیوز و بلیٹن',
          desc: 'Official OGRA notifications and bullion updates',
          icon: Newspaper,
          color: 'text-pink-500 bg-pink-500/10',
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
    await navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel Sliding in from Right */}
      <div className="relative w-full max-w-sm sm:max-w-md h-full bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 border-l border-gray-200 dark:border-[#1f2937] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-[#1f2937] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-500/20">
              R
            </div>
            <div>
              <div className="text-base font-extrabold font-heading text-gray-900 dark:text-white">
                All Pages Navigation
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                RateZilla Multi-Tool Portal
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button inside Drawer */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-[#1f2937] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-gray-700" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3.5 bg-gray-50 dark:bg-[#0a0f1d] border-b border-gray-200 dark:border-[#1f2937]">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tools, rates, calculators..."
              className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1f2937] focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Quick Action Buttons Strip */}
        <div className="p-3 bg-gray-50/50 dark:bg-[#0a0f1d]/50 border-b border-gray-200 dark:border-[#1f2937] grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => {
              onClose();
              onOpenRatesUpdater();
            }}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Update Rates</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenAlerts();
            }}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-[#1f2937] dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-[#1f2937] font-bold transition-colors"
          >
            <Bell className="w-3.5 h-3.5 text-amber-500" />
            <span>Price Alerts</span>
          </button>
        </div>

        {/* Navigation Categories List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-1">
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
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shadow-sm'
                          : 'hover:bg-gray-100 dark:hover:bg-[#1f2937] text-gray-700 dark:text-gray-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate flex items-center gap-1.5 text-gray-900 dark:text-white">
                            <span>{item.label}</span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-urdu shrink-0">
                              {item.urdu}
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Extra Utilities */}
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-[#1f2937]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-1">
              Interactive Tools &amp; Audio
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  onClose();
                  onOpenSpeedTest();
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-[#0a0f1d] dark:hover:bg-[#1f2937] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#1f2937] text-left transition-colors font-semibold"
              >
                <Zap className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-xs">Speed Test</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenAudioGuides();
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-[#0a0f1d] dark:hover:bg-[#1f2937] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#1f2937] text-left transition-colors font-semibold"
              >
                <Headphones className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs">Urdu Audio</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-[#1f2937] bg-gray-50 dark:bg-[#0a0f1d] flex items-center justify-between text-xs">
          <button
            onClick={handleShareApp}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share RateZilla</span>
              </>
            )}
          </button>

          <span className="text-[11px] text-gray-400 font-mono">
            v2.6 · Cloud &amp; Edge
          </span>
        </div>
      </div>
    </div>
  );
};
