import React, { useEffect, useRef, useState } from 'react';
import {
  Flame,
  Zap,
  Sun,
  Calculator,
  Sparkles,
  Receipt,
  DollarSign,
  Coins,
  Car,
  Building,
  Newspaper,
  ArrowRight,
  TrendingUp,
  Share2,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  Image as ImageIcon,
  Layers,
  Briefcase,
  Laptop,
  ShieldCheck
} from 'lucide-react';
import { RateZillaLogo } from './RateZillaLogo';
import { GoldRate, SilverRate, FuelRate, CurrencyRate, CityGoldRate } from '../types';

interface HomeHubProps {
  setActiveTab: (tab: string) => void;
  goldRates: GoldRate[];
  silverRate: SilverRate;
  fuelRates: FuelRate[];
  currencies: CurrencyRate[];
  cityGoldRates: CityGoldRate[];
  onOpenRatesUpdater: () => void;
  lastUpdated: string;
}

export const HomeHub: React.FC<HomeHubProps> = ({
  setActiveTab,
  goldRates,
  silverRate,
  fuelRates,
  currencies,
  onOpenRatesUpdater,
  lastUpdated
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Parallax Image State (User custom link support: "Apni image ka link lagayein")
  const defaultParallaxImages = [
    {
      name: 'Financial Bullion & Charts',
      url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=80'
    },
    {
      name: 'Gold Bullion Reserve',
      url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1920&q=80'
    },
    {
      name: 'Global Currency & Trading',
      url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1920&q=80'
    },
    {
      name: 'Classic Picsum Photos',
      url: 'https://picsum.photos/1920/1080'
    }
  ];

  const [parallaxImage, setParallaxImage] = useState<string>(() => {
    return localStorage.getItem('ratezilla_parallax_img') || defaultParallaxImages[0].url;
  });
  const [showImagePicker, setShowImagePicker] = useState<boolean>(false);
  const [customInputUrl, setCustomInputUrl] = useState<string>('');

  const handleSelectParallax = (url: string) => {
    setParallaxImage(url);
    localStorage.setItem('ratezilla_parallax_img', url);
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInputUrl.trim()) {
      handleSelectParallax(customInputUrl.trim());
      setCustomInputUrl('');
      setShowImagePicker(false);
    }
  };

  const scrollToContent = () => {
    const el = document.getElementById('market-normal-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Aesthetic Scroll Reveal IntersectionObserver (Requested by user)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active'); // Jab element screen par aayega to 'active' class mil jayegi
          }
        });
      },
      {
        threshold: 0.15 // Jab element 15% screen par visible hoga tab animation start hogi
      }
    );

    // Har us element ko select karna jis par scroll effect lagana hai
    const elements = document.querySelectorAll('.reveal-element');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleShare = (title: string, text: string, key: string) => {
    if (navigator.share) {
      navigator.share({ title, text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${title}\n${text}\nCheck live at: ${window.location.href}`);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  // Portal blocks for all pages
  const portalPages = [
    {
      id: 'gold',
      title: 'Sarafa Gold & Bullion Market',
      titleUrdu: 'صرافہ سونا مارکیٹ',
      desc: 'Live 24K, 22K, 21K, 18K per Tola & 10 Grams. City rates for Karachi, Lahore, Islamabad with jewelry making simulator.',
      stat: `Rs. ${goldRates[0]?.perTola?.toLocaleString() || '284,500'} / Tola (24K)`,
      icon: Flame,
      badge: 'Daily Sarafa',
      accent: 'amber',
      gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      borderColor: 'border-amber-500/30 hover:border-amber-400'
    },
    {
      id: 'fuel',
      title: 'OGRA Fuel & Trip Cost Planner',
      titleUrdu: 'پٹرول، ڈیزل و سفر کا خرچ',
      desc: 'Official OGRA fortnight petroleum prices for Petrol Regular, High Speed Diesel, HOBC 97 & CNG. Calculate intercity fuel expenditure.',
      stat: `Rs. ${fuelRates[0]?.currentPrice?.toFixed(2) || '281.40'} / Litre`,
      icon: Zap,
      badge: 'OGRA Fortnight',
      accent: 'blue',
      gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      borderColor: 'border-blue-500/30 hover:border-blue-400'
    },
    {
      id: 'solar',
      title: 'Solar Panel Sizing & ROI Calculator',
      titleUrdu: 'سولر سسٹم سائزنگ کیلکولیٹر',
      desc: 'Calculate KW requirement based on peak summer bill units. Tier-1 580W Bifacial Watt rates, Inverter rating & Net-metering payback years.',
      stat: 'Rs. 41.50 / Watt (Tier-1 TopCon)',
      icon: Sun,
      badge: 'High Demand',
      accent: 'yellow',
      gradient: 'from-yellow-500/20 via-amber-500/10 to-transparent',
      borderColor: 'border-yellow-500/30 hover:border-yellow-400'
    },
    {
      id: 'tax',
      title: 'FBR Income Tax 2025-26 Slabs',
      titleUrdu: 'انکم ٹیکس سلیب 2025-26',
      desc: 'Latest salaried and business progressive tax brackets passed by Federal Board of Revenue. Instant monthly tax deduction & take-home pay.',
      stat: '0% Tax up to Rs. 600,000/yr',
      icon: Calculator,
      badge: 'Updated Finance Act',
      accent: 'purple',
      gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
      borderColor: 'border-purple-500/30 hover:border-purple-400'
    },
    {
      id: 'zakat',
      title: 'Live Nisab Zakat Calculator',
      titleUrdu: 'زکوٰۃ کیلکولیٹر نصاب',
      desc: 'Real-time Nisab valuation based on 7.5 Tola Gold & 52.5 Tola Silver live rates. Comprehensive wealth breakdown for cash, gold & business stock.',
      stat: `Gold Nisab: Rs. ${((goldRates[0]?.perTola || 284500) * 7.5).toLocaleString()}`,
      icon: Sparkles,
      badge: 'Shariah Compliant',
      accent: 'emerald',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400'
    },
    {
      id: 'currency',
      title: 'Forex Exchange & Crypto Rates',
      titleUrdu: 'کرنسی ایکسچینج و کرپٹو مارکیٹ',
      desc: 'State Bank of Pakistan interbank and open market forex conversion for USD, SAR, AED, EUR, GBP + Bitcoin & Ethereum live prices.',
      stat: `USD: Rs. ${currencies[0]?.interbankSell || '278.35'} | SAR: Rs. ${currencies[3]?.interbankSell || '74.20'}`,
      icon: DollarSign,
      badge: 'SBP Interbank',
      accent: 'indigo',
      gradient: 'from-indigo-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-indigo-500/30 hover:border-indigo-400'
    },
    {
      id: 'electricity',
      title: 'WAPDA Electricity Bill Estimator',
      titleUrdu: 'بجلی کا بل کیلکولیٹر',
      desc: 'NEPRA approved tariff slabs with Fuel Price Adjustment (FPA), TV fee, GST, and Electricity Duty for LESCO, MEPCO, KE, FESCO & IESCO.',
      stat: 'Protected vs Unprotected Slabs',
      icon: Receipt,
      badge: 'NEPRA Tariffs',
      accent: 'rose',
      gradient: 'from-rose-500/20 via-red-500/10 to-transparent',
      borderColor: 'border-rose-500/30 hover:border-rose-400'
    },
    {
      id: 'mandi',
      title: 'Ghalla Mandi & Agri Weather',
      titleUrdu: 'غلہ منڈی اور زرعی الرٹس',
      desc: 'Daily wholesale market auction rates for Wheat (Gandum), Rice (Basmati), Raw Cotton (Phutti), Sugar, Potatoes, Onions & City AQI air advisories.',
      stat: 'Gandum: Rs. 3,850 / 40 Kg',
      icon: Coins,
      badge: 'Punjab & Sindh Mandis',
      accent: 'orange',
      gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
      borderColor: 'border-orange-500/30 hover:border-orange-400'
    },
    {
      id: 'vehicle-tax',
      title: 'Vehicle Excise & Token Tax CC',
      titleUrdu: 'گاڑیوں کا سالانہ ٹوکن ٹیکس',
      desc: 'Engine capacity (Under 1000cc, 1300cc, 1500cc, 1800cc+) Punjab, Sindh and ICT annual token tax and filers withholding tax estimator.',
      stat: '1000cc to 3000cc+ Calculator',
      icon: Car,
      badge: 'Excise Dept',
      accent: 'cyan',
      gradient: 'from-cyan-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-cyan-500/30 hover:border-cyan-400'
    },
    {
      id: 'construction',
      title: 'House Construction Cost BOQ',
      titleUrdu: 'مکان کی تعمیراتی لاگت',
      desc: 'Estimate complete gray structure and premium turnkey finishing cost for 3 Marla, 5 Marla, 10 Marla and 1 Kanal residential houses.',
      stat: 'Rs. 2,650 - 4,800 / Sq Ft',
      icon: Building,
      badge: 'BOQ Estimator',
      accent: 'teal',
      gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
      borderColor: 'border-teal-500/30 hover:border-teal-400'
    },
    {
      id: 'news',
      title: 'Market Bulletins & Daily News',
      titleUrdu: 'مارکیٹ نیوز و نوٹیفیکیشنز',
      desc: 'Official notifications from Ministry of Energy, SBP monetary policy statements, Sarafa committee notices, and agricultural commodity advisories.',
      stat: 'Daily Verified Feed',
      icon: Newspaper,
      badge: 'Official Notices',
      accent: 'pink',
      gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
      borderColor: 'border-pink-500/30 hover:border-pink-400'
    },
    {
      id: 'freelancer-tax',
      title: 'Freelancer IT Export Tax (154A)',
      titleUrdu: 'فری لانسر آئی ٹی ٹیکس',
      desc: 'Calculate foreign USD/EUR/GBP earnings conversion to PKR, 0.25% PSEB tax vs 1% non-registered & bank wire/fintech gateway fees.',
      stat: '0.25% PSEB vs 1% Non-Reg',
      icon: Briefcase,
      badge: 'Section 154A',
      accent: 'emerald',
      gradient: 'from-emerald-500/20 via-cyan-500/10 to-transparent',
      borderColor: 'border-[#00FF87]/40 hover:border-[#00FF87]'
    },
    {
      id: 'property-tax',
      title: 'Property Tax & Stamp Duty (236K)',
      titleUrdu: 'جائیداد اور پلاٹ ٹیکس ڈیوٹی',
      desc: 'FBR Section 236K advance tax, Punjab/Sindh/KPK/ICT provincial stamp duty, TMA 1% transfer fees & registration cost.',
      stat: 'Filer 2% vs Non-Filer 7%',
      icon: Building,
      badge: 'FBR 236K',
      accent: 'cyan',
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-[#60EFFF]/40 hover:border-[#60EFFF]'
    },
    {
      id: 'market-indicators',
      title: 'Buying Power & Market Signals',
      titleUrdu: 'مارکیٹ سگنلز و خریداری ٹائمنگ',
      desc: 'Live quantitative buying signals, volatility ratings (0-100) and 30-day directional trends for Gold (24K), USD/PKR and Petroleum.',
      stat: 'Gold Hold • USD Favorable',
      icon: TrendingUp,
      badge: 'Live Signals',
      accent: 'amber',
      gradient: 'from-amber-500/20 via-emerald-500/10 to-transparent',
      borderColor: 'border-amber-500/30 hover:border-amber-400'
    }
  ];

  return (
    <div ref={containerRef} className="w-full">
      {/* ==================== PARALLAX IMAGE CONTAINER ==================== */}
      <div
        className="parallax-container px-4 text-center select-none"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.72), rgba(11, 15, 25, 0.88)), url('${parallaxImage}')`
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6 py-12">
          {/* Brand Icon Mark (User requested new geometric abstract logo) */}
          <div className="p-1 rounded-3xl bg-[#f3eae1]/10 backdrop-blur-md border border-[#f3eae1]/20 shadow-xl">
            <RateZillaLogo size="lg" showText={false} />
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[#00FF87] text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-[#00FF87]" />
            <span>Pakistan’s Live Market Portal & Utility Calculators</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-2xl">
            Rate<span className="bg-gradient-to-r from-[#00FF87] via-[#60EFFF] to-[#00FF87] bg-clip-text text-transparent">Zilla</span> Pakistan
          </h1>

          {/* Urdu Subtitle */}
          <p className="text-lg sm:text-2xl font-serif text-[#00FF87] drop-shadow font-medium" dir="rtl">
            پاکستان کے تمام لائیو ریٹس، صرافہ سونا، پٹرول اور 11 فنانشل کیلکولیٹرز
          </p>

          <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
            Real-time Sarafa bullion benchmarks, OGRA petroleum prices, SBP currency forex, Ghalla Mandi commodities, and 11 financial calculators for Pakistan.
          </p>

          {/* Live Benchmark Pill Tickers on Parallax Header */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-900/85 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-mono shadow-lg">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Gold 24K: <strong>Rs. {goldRates[0]?.perTola?.toLocaleString() || '284,500'}</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-900/85 backdrop-blur-md border border-blue-500/40 text-blue-300 text-xs sm:text-sm font-mono shadow-lg">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Petrol: <strong>Rs. {fuelRates[0]?.currentPrice?.toFixed(2) || '281.40'}</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-900/85 backdrop-blur-md border border-indigo-500/40 text-indigo-300 text-xs sm:text-sm font-mono shadow-lg">
              <DollarSign className="w-4 h-4 text-indigo-400" />
              <span>USD/PKR: <strong>Rs. {currencies[0]?.interbankSell?.toFixed(2) || '278.35'}</strong></span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
            <button
              onClick={scrollToContent}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#60EFFF] hover:opacity-95 text-gray-950 font-black text-xs sm:text-sm transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Explore Portal & Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowImagePicker(!showImagePicker)}
              className="px-4 py-3 rounded-xl bg-gray-900/85 hover:bg-gray-800 text-gray-200 border border-gray-700/80 backdrop-blur-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
              title="Apni image ka link lagayein"
            >
              <ImageIcon className="w-4 h-4 text-[#60EFFF]" />
              <span>Change Parallax Image</span>
            </button>

            <button
              onClick={onOpenRatesUpdater}
              className="px-4 py-3 rounded-xl bg-gray-900/60 hover:bg-gray-800/80 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Update Rates</span>
            </button>
          </div>

          {/* Interactive Parallax Background Changer Modal (Apni image ka link lagayein) */}
          {showImagePicker && (
            <div className="w-full max-w-xl mx-auto mt-4 p-5 rounded-2xl bg-gray-900/95 border border-emerald-500/40 backdrop-blur-xl shadow-2xl text-left text-gray-200 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#00FF87]" />
                  <h4 className="text-sm font-bold text-white">Parallax Background Image Selector</h4>
                </div>
                <button
                  onClick={() => setShowImagePicker(false)}
                  className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded bg-gray-800 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Preset Gallery */}
              <div className="grid grid-cols-2 gap-2.5 my-3">
                {defaultParallaxImages.map((img) => (
                  <button
                    key={img.name}
                    onClick={() => handleSelectParallax(img.url)}
                    className={`p-2 rounded-xl text-left text-xs border transition-all cursor-pointer flex flex-col gap-1 ${
                      parallaxImage === img.url
                        ? 'border-[#00FF87] bg-emerald-500/15 text-white font-bold'
                        : 'border-gray-800 bg-gray-800/60 hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    <span className="truncate">{img.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono truncate">{img.url}</span>
                  </button>
                ))}
              </div>

              {/* Custom Image URL Form (Apni image ka link lagayein) */}
              <form onSubmit={handleApplyCustom} className="space-y-2 pt-1 border-t border-gray-800">
                <label className="text-xs text-gray-300 font-semibold flex items-center justify-between">
                  <span>Apni image ka link lagayein (Custom Image URL):</span>
                  <span className="text-[11px] text-[#00FF87]">Direct JPG / PNG / WebP</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or https://picsum.photos/..."
                    value={customInputUrl}
                    onChange={(e) => setCustomInputUrl(e.target.value)}
                    className="flex-1 bg-gray-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF87]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#00FF87] hover:bg-[#60EFFF] text-gray-950 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Scroll Down Floating Indicator */}
        <div
          onClick={scrollToContent}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer transition-all"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400/90">Scroll To Content</span>
          <ChevronDown className="w-5 h-5 text-[#00FF87]" />
        </div>
      </div>

      {/* ==================== NEECHE WALA NORMAL SECTION ==================== */}
      <div id="market-normal-section" className="normal-section">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* QUICK LIVE MARKET SUMMARY CARDS WITH SHARING */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00FF87]" />
                  <span>Live Market Benchmarks</span>
                </h2>
                <p className="text-xs text-gray-400">
                  Instant snapshot of Sarafa Bullion, OGRA fuel, and SBP Interbank
                </p>
              </div>
              <span className="text-xs text-emerald-400/90 font-mono bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {lastUpdated}
              </span>
            </div>

            {/* 3-Column Staggered Aesthetic Scroll Reveal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 1. SARAFA GOLD BOX (reveal-element delay-1) */}
              <div className="scroll-box reveal-element delay-1">
                <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 text-[11px] font-bold">
                        Sarafa Pakistan
                      </span>
                      <span className="text-xs text-gray-400 font-serif">صرافہ سونا</span>
                    </div>
                    <h3 className="text-lg font-bold text-amber-400">Gold & Silver Benchmark</h3>
                    <p className="text-xs text-gray-400 mb-3">Karachi, Lahore & Islamabad</p>

                    <div className="space-y-2 border-t border-gray-800/80 pt-2.5">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">24K Pure Gold (Tola):</span>
                        <span className="font-bold text-white item-price price-amount">
                          Rs. {goldRates[0]?.perTola?.toLocaleString() || '284,500'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">22K Jewelry (Tola):</span>
                        <span className="font-semibold text-gray-200 item-price price-amount">
                          Rs. {goldRates[1]?.perTola?.toLocaleString() || '260,790'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Fine Silver (Tola):</span>
                        <span className="font-semibold text-gray-300 item-price price-amount">
                          Rs. {silverRate?.perTola?.toLocaleString() || '3,350'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Share button below rates */}
                  <div className="border-t border-gray-800/80 pt-3 flex items-center justify-between">
                    <button
                      onClick={() =>
                        handleShare(
                          'RateZilla Gold Rates Pakistan',
                          `Today Gold 24K: Rs. ${goldRates[0]?.perTola?.toLocaleString()} / Tola | 22K: Rs. ${goldRates[1]?.perTola?.toLocaleString()} | Silver: Rs. ${silverRate?.perTola?.toLocaleString()}`,
                          'gold'
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/80 hover:bg-gray-800 text-amber-400 hover:text-amber-300 text-xs font-semibold transition-colors cursor-pointer border border-amber-500/20"
                    >
                      {copiedKey === 'gold' ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'gold' ? 'Copied Link!' : 'Share Gold Rates'}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('gold')}
                      className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. OGRA FUEL BOX (reveal-element delay-2) */}
              <div className="scroll-box reveal-element delay-2">
                <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 text-[11px] font-bold">
                        OGRA Fortnight
                      </span>
                      <span className="text-xs text-gray-400 font-serif">پٹرول و ڈیزل</span>
                    </div>
                    <h3 className="text-lg font-bold text-blue-400">Petroleum Products</h3>
                    <p className="text-xs text-gray-400 mb-3">Current Fortnight Consumer Tariff</p>

                    <div className="space-y-2 border-t border-gray-800/80 pt-2.5">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Petrol Regular:</span>
                        <span className="font-bold text-white item-price price-amount">
                          Rs. {fuelRates[0]?.currentPrice?.toFixed(2) || '281.40'} / L
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">High Speed Diesel:</span>
                        <span className="font-semibold text-gray-200 item-price price-amount">
                          Rs. {fuelRates[1]?.currentPrice?.toFixed(2) || '285.50'} / L
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">HOBC High Octane:</span>
                        <span className="font-semibold text-gray-300 item-price price-amount">
                          Rs. {fuelRates[2]?.currentPrice?.toFixed(2) || '295.00'} / L
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Share button below rates */}
                  <div className="border-t border-gray-800/80 pt-3 flex items-center justify-between">
                    <button
                      onClick={() =>
                        handleShare(
                          'RateZilla OGRA Fuel Rates Pakistan',
                          `Today Petrol Price: Rs. ${fuelRates[0]?.currentPrice?.toFixed(2)}/L | Diesel: Rs. ${fuelRates[1]?.currentPrice?.toFixed(2)}/L`,
                          'fuel'
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/80 hover:bg-gray-800 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors cursor-pointer border border-blue-500/20"
                    >
                      {copiedKey === 'fuel' ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'fuel' ? 'Copied Link!' : 'Share Fuel Rates'}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('fuel')}
                      className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <span>Trip Planner</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. FOREX & CURRENCY BOX (reveal-element delay-3) */}
              <div className="scroll-box reveal-element delay-3">
                <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 text-[11px] font-bold">
                        Forex SBP
                      </span>
                      <span className="text-xs text-gray-400 font-serif">کرنسی ایکسچینج</span>
                    </div>
                    <h3 className="text-lg font-bold text-indigo-400">Foreign Exchange PKR</h3>
                    <p className="text-xs text-gray-400 mb-3">Interbank & Remittance Rates</p>

                    <div className="space-y-2 border-t border-gray-800/80 pt-2.5">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <span>🇺🇸 USD:</span>
                        </span>
                        <span className="font-bold text-white item-price price-amount">
                          Rs. {currencies[0]?.interbankSell?.toFixed(2) || '278.35'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <span>🇸🇦 SAR Riyal:</span>
                        </span>
                        <span className="font-semibold text-gray-200 item-price price-amount">
                          Rs. {currencies[3]?.interbankSell?.toFixed(2) || '74.20'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <span>🇦🇪 AED Dirham:</span>
                        </span>
                        <span className="font-semibold text-gray-300 item-price price-amount">
                          Rs. {currencies[4]?.interbankSell?.toFixed(2) || '75.80'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Share button below rates */}
                  <div className="border-t border-gray-800/80 pt-3 flex items-center justify-between">
                    <button
                      onClick={() =>
                        handleShare(
                          'RateZilla Forex Rates Pakistan',
                          `USD to PKR: Rs. ${currencies[0]?.interbankSell} | SAR to PKR: Rs. ${currencies[3]?.interbankSell} | AED: Rs. ${currencies[4]?.interbankSell}`,
                          'forex'
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/80 hover:bg-gray-800 text-indigo-400 hover:text-indigo-300 text-xs font-semibold transition-colors cursor-pointer border border-indigo-500/20"
                    >
                      {copiedKey === 'forex' ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'forex' ? 'Copied Link!' : 'Share Forex Rates'}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('currency')}
                      className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <span>Converter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DEDICATED SECTION: ADVANCED UTILITY CALCULATORS (3 DISTINCT CLICKABLE BLOCKS) */}
          {/* ========================================================================= */}
          <div className="space-y-5 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800/80 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Institutional Finance &amp; Decision Intelligence</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                  <span>Advanced Utility Calculators</span>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#00FF87] border border-[#00FF87]/30">
                    3 Dedicated Pages
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  Precision tax estimators for Pakistani IT freelancers and real estate transactions, plus live market purchasing power timing indicators
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
                <span>Updated for 2025-26 Tax Laws</span>
              </div>
            </div>

            {/* 3 DISTINCT CLICKABLE CARD BLOCKS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* BLOCK 1: 💼 FREELANCER IT TAX ESTIMATOR */}
              <div
                onClick={() => {
                  setActiveTab('freelancer-tax');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative p-6 rounded-3xl bg-[#111827] hover:bg-[#131d31] border border-emerald-500/30 hover:border-[#00FF87] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer flex flex-col justify-between reveal-element delay-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#00FF87]/20 to-[#60EFFF]/10 border border-[#00FF87]/30 text-[#00FF87] group-hover:scale-110 transition-transform">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/40 shadow-sm">
                      Section 154A
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-[#00FF87] transition-colors flex items-center gap-1.5">
                      <span>Freelancer IT Tax Estimator</span>
                    </h3>
                    <span className="text-xs text-[#00FF87] font-serif block mt-0.5">
                      فری لانسر آئی ٹی ایکسپورٹ ٹیکس کیلکولیٹر
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed mt-2.5">
                      Calculate net take-home PKR income from USD/EUR/GBP remittances after Section 154A final tax (0.25% PSEB vs 1% Non-Registered) and bank wire/fintech fee deductions.
                    </p>
                  </div>

                  {/* Highlight Stats / Feature Pills */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">PSEB Tax Rate:</span>
                      <span className="font-bold text-[#00FF87] font-mono">0.25% Final Tax</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Non-Registered:</span>
                      <span className="font-semibold text-amber-400 font-mono">1.00% Standard</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Supported Currencies:</span>
                      <span className="text-gray-300 font-mono">USD, EUR, GBP, AED</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-800/80 flex items-center justify-between text-xs font-bold text-[#00FF87]">
                  <span>Launch IT Calculator</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

              {/* BLOCK 2: 🏠 PROPERTY TAX & STAMP DUTY */}
              <div
                onClick={() => {
                  setActiveTab('property-tax');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative p-6 rounded-3xl bg-[#111827] hover:bg-[#131d31] border border-cyan-500/30 hover:border-[#60EFFF] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between reveal-element delay-2"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#60EFFF]/20 to-blue-500/10 border border-[#60EFFF]/30 text-[#60EFFF] group-hover:scale-110 transition-transform">
                      <Building className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-[#60EFFF]/15 text-[#60EFFF] border border-[#60EFFF]/40 shadow-sm">
                      FBR 236K / 236C
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-[#60EFFF] transition-colors flex items-center gap-1.5">
                      <span>Property Tax &amp; Stamp Duty</span>
                    </h3>
                    <span className="text-xs text-[#60EFFF] font-serif block mt-0.5">
                      جائیداد پر ٹیکس اور اسٹامپ ڈیوٹی
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed mt-2.5">
                      Estimate total acquisition outlay and government duties: Section 236K Advance Tax, provincial Stamp Duty for Punjab/Sindh/KPK/ICT, TMA transfer fee &amp; registration.
                    </p>
                  </div>

                  {/* Highlight Stats / Feature Pills */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Filer Advance Tax:</span>
                      <span className="font-bold text-[#60EFFF] font-mono">2.00% under 236K</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Non-Filer Surcharge:</span>
                      <span className="font-semibold text-rose-400 font-mono">5.00% to 7.00%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Provincial Stamp:</span>
                      <span className="text-gray-300 font-mono">1% (Punjab) - 2% (Sindh)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-800/80 flex items-center justify-between text-xs font-bold text-[#60EFFF]">
                  <span>Launch Property Calculator</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

              {/* BLOCK 3: 📈 BUYING POWER & MARKET INDICATORS */}
              <div
                onClick={() => {
                  setActiveTab('market-indicators');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative p-6 rounded-3xl bg-[#111827] hover:bg-[#131d31] border border-[#00FF87]/30 hover:border-[#00FF87] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer flex flex-col justify-between reveal-element delay-3"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#00FF87]/20 to-amber-500/10 border border-[#00FF87]/30 text-[#00FF87] group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-500/15 text-[#00FF87] border border-[#00FF87]/40 shadow-sm">
                      Live Market Signals
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-[#00FF87] transition-colors flex items-center gap-1.5">
                      <span>Buying Power &amp; Market Indicators</span>
                    </h3>
                    <span className="text-xs text-[#00FF87] font-serif block mt-0.5">
                      مارکیٹ سگنلز اور خریداری کے انڈیکیٹرز
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed mt-2.5">
                      Live market volatility ratings, price pressure analysis, smart timing recommendation badges ("Favorable to Buy", "Hold"), and 30-day directional overviews for Gold, USD and Petrol.
                    </p>
                  </div>

                  {/* Highlight Stats / Feature Pills */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Gold 24K Signal:</span>
                      <span className="font-bold text-amber-400 font-mono">Hold / Wait for Dip</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">USD / PKR Signal:</span>
                      <span className="font-bold text-[#00FF87] font-mono">Favorable to Buy</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Petrol Fortnight:</span>
                      <span className="font-semibold text-rose-400 font-mono">High Volatility (74/100)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-800/80 flex items-center justify-between text-xs font-bold text-[#00FF87]">
                  <span>Explore Market Indicators</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* ALL PAGES INTERACTIVE PORTAL BLOCKS */}
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  All Portal Pages &amp; Calculators
                </h2>
                <p className="text-xs text-gray-400">
                  Click on any portal block below to access that specific page and interactive tool
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-800 text-[#00FF87] border border-[#00FF87]/30">
                14 Modules Available
              </span>
            </div>

            {/* 2-Column Grid with Staggered Scroll Reveal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {portalPages.map((page, index) => {
                const Icon = page.icon;
                const delayClass = index % 2 === 0 ? 'delay-1' : 'delay-2';
                return (
                  <div
                    key={page.id}
                    onClick={() => {
                      setActiveTab(page.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative group p-6 rounded-2xl bg-gray-900/90 hover:bg-gray-850 border ${page.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between reveal-element ${delayClass}`}
                  >
                    <div>
                      {/* Top Bar with Icon & Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-gray-800 group-hover:bg-gray-700 transition-colors">
                            <Icon className="w-6 h-6 text-[#6ba4df]" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#6ba4df] transition-colors">
                              {page.title}
                            </h3>
                            <span className="text-xs text-gray-400 font-serif">
                              {page.titleUrdu}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-gray-800 text-gray-300 border border-gray-700/80">
                          {page.badge}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed mb-4">
                        {page.desc}
                      </p>
                    </div>

                    {/* Bottom Bar with Current Benchmark & Navigate Trigger */}
                    <div className="border-t border-gray-800/80 pt-3.5 flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-gray-400 mr-1.5">Live Benchmark:</span>
                        <span className="font-semibold text-emerald-400 font-mono">
                          {page.stat}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-[#6ba4df] group-hover:translate-x-1 transition-transform">
                        <span>Open Module</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
