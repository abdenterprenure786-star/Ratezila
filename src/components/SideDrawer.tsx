import React, { useState } from 'react';
import {
  X,
  Search,
  Home,
  Flame,
  Sun,
  Zap,
  Calculator,
  Coins,
  DollarSign,
  Receipt,
  Car,
  Building,
  Newspaper,
  Moon,
  Sparkles,
  ExternalLink,
  Share2
} from 'lucide-react';
import { RateZillaLogo } from './RateZillaLogo';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenRatesUpdater: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  theme,
  onToggleTheme,
  onOpenRatesUpdater
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const categories = [
    {
      name: 'Main Hub',
      items: [
        {
          id: 'home',
          label: 'Home Feature Hub',
          urdu: 'مرکزی صفحہ و تمام ٹولز',
          desc: 'Spacious portal cards, market ticker, and instant overview',
          icon: Home,
          color: 'text-emerald-400 bg-emerald-500/10'
        }
      ]
    },
    {
      name: 'Live Market Rates',
      items: [
        {
          id: 'gold',
          label: 'Sarafa Gold & Bullion',
          urdu: 'صرافہ سونا مارکیٹ',
          desc: '24K, 22K, 21K, 18K & Silver + 7-Day Trend Chart',
          icon: Flame,
          color: 'text-amber-400 bg-amber-500/10'
        },
        {
          id: 'fuel',
          label: 'OGRA Fuel & Trip Planner',
          urdu: 'پٹرول، ڈیزل و سفر کا خرچ',
          desc: 'Petrol, HSD, HOBC, Kerosene, CNG & LPG Cylinder',
          icon: Zap,
          color: 'text-blue-400 bg-blue-500/10'
        },
        {
          id: 'currency',
          label: 'Forex Exchange & Crypto',
          urdu: 'کرنسی ریٹس و کرپٹو',
          desc: 'USD, SAR, AED, EUR, GBP + Bitcoin live prices',
          icon: DollarSign,
          color: 'text-indigo-400 bg-indigo-500/10'
        },
        {
          id: 'mandi',
          label: 'Ghalla Mandi & Agri Weather',
          urdu: 'غلہ منڈی اور زرعی الرٹس',
          desc: 'Wheat, Rice, Cotton, Sugar, Vegetables & City AQI',
          icon: Coins,
          color: 'text-orange-400 bg-orange-500/10'
        }
      ]
    },
    {
      name: 'Calculators & Utility Tools',
      items: [
        {
          id: 'solar',
          label: 'Solar Panel Sizing & ROI',
          urdu: 'سولر پینل کیلکولیٹر',
          desc: '580W Bifacial Watt rates, Inverter & Net-Metering',
          icon: Sun,
          color: 'text-yellow-400 bg-yellow-500/10'
        },
        {
          id: 'tax',
          label: 'FBR Income Tax 2025-26',
          urdu: 'انکم ٹیکس سلیب 2025-26',
          desc: 'Progressive tax brackets, monthly deductions & take-home',
          icon: Calculator,
          color: 'text-purple-400 bg-purple-500/10'
        },
        {
          id: 'zakat',
          label: 'Live Nisab Zakat Calculator',
          urdu: 'زکوٰۃ کیلکولیٹر نصاب',
          desc: 'Automated calculation with live gold & silver Nisab',
          icon: Sparkles,
          color: 'text-emerald-400 bg-emerald-500/10'
        },
        {
          id: 'electricity',
          label: 'WAPDA Bills & Duplicate Check',
          urdu: 'بجلی کا بل کیلکولیٹر',
          desc: 'LESCO, MEPCO, K-Electric, FESCO unit tariffs',
          icon: Receipt,
          color: 'text-rose-400 bg-rose-500/10'
        },
        {
          id: 'vehicle-tax',
          label: 'Vehicle Excise & Token Tax',
          urdu: 'گاڑیوں کا ٹوکن ٹیکس',
          desc: 'Engine capacity (CC) based annual tax estimator',
          icon: Car,
          color: 'text-cyan-400 bg-cyan-500/10'
        },
        {
          id: 'construction',
          label: 'House Construction Cost BOQ',
          urdu: 'مکان کی تعمیراتی لاگت',
          desc: '3, 5, 10 Marla & 1 Kanal gray structure and finishing',
          icon: Building,
          color: 'text-teal-400 bg-teal-500/10'
        },
        {
          id: 'news',
          label: 'Market Bulletins & Daily News',
          urdu: 'مارکیٹ نیوز و نوٹیفیکیشنز',
          desc: 'Official OGRA notifications and bullion updates',
          icon: Newspaper,
          color: 'text-pink-400 bg-pink-500/10'
        }
      ]
    }
  ];

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.urdu.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase())
    )
  })).filter((cat) => cat.items.length > 0);

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'RateZilla - Pakistan Market Rates & Utility Portal',
        text: 'Check today 24K Gold rates, Petrol prices, USD to PKR, Solar sizing & utility calculators at RateZilla.',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-sm sm:max-w-md h-full bg-[#111827] text-gray-100 border-l border-gray-800 shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-800 flex items-center justify-between bg-[#0b0f19]">
          <div className="flex items-center gap-2">
            <RateZillaLogo size="sm" />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-800/80 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tools Bar */}
        <div className="px-4 py-3 bg-gray-900/60 border-b border-gray-800/80 flex items-center justify-between gap-2">
          <button
            onClick={onToggleTheme}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gray-800/60 hover:bg-gray-800 text-xs font-semibold text-gray-300 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              onOpenRatesUpdater();
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Update Rates</span>
          </button>

          <button
            onClick={handleShareApp}
            title="Share RateZilla"
            className="p-2 rounded-xl bg-gray-800/60 hover:bg-gray-800 text-gray-300 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-teal-400" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-800/80 bg-gray-900/30">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools, rates, calculators..."
              className="w-full bg-gray-800/80 border border-gray-700/80 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {filteredCategories.map((cat, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2">
                {cat.name}
              </h4>

              <div className="space-y-1.5">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer group ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/50'
                          : 'hover:bg-gray-800/60 border border-transparent'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-semibold truncate ${
                              isActive ? 'text-emerald-400' : 'text-gray-200 group-hover:text-white'
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="text-[11px] text-gray-400 font-serif mr-1">
                            {item.urdu}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-gray-800 bg-[#0b0f19] text-center text-xs text-gray-400">
          <span>RateZilla Pakistan • Real-Time Financial Intelligence</span>
        </div>
      </div>
    </div>
  );
};
