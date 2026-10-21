import React from 'react';
import {
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
  ArrowRight,
  Sparkles,
  Bell,
  Headphones,
  Share2,
} from 'lucide-react';
import { ShareRatesButton } from './ShareRatesButton.js';
import { GoldRateItem, FuelRateItem, CurrencyItem, CityGoldRate } from '../types/market.js';

interface HomeHubProps {
  setActiveTab: (tab: string) => void;
  goldRates: GoldRateItem[];
  silverRate: { perTola: number; per10Gram: number; perGram: number };
  fuelRates: FuelRateItem[];
  currencies: CurrencyItem[];
  cityGoldRates: CityGoldRate[];
  onOpenRatesUpdater: () => void;
  onOpenSpeedTest: () => void;
  onOpenAudioGuides: () => void;
  onOpenAlerts: () => void;
}

export const HomeHub: React.FC<HomeHubProps> = ({
  setActiveTab,
  goldRates,
  silverRate,
  fuelRates,
  currencies,
  cityGoldRates,
  onOpenRatesUpdater,
  onOpenSpeedTest,
  onOpenAudioGuides,
  onOpenAlerts,
}) => {
  const gold24k = goldRates[0]?.perTola || 429500;
  const gold22k = goldRates[1]?.perTola || 393708;
  const silver = silverRate?.perTola || 6282;
  const petrol = fuelRates[0]?.currentPrice || 382.02;
  const diesel = fuelRates[1]?.currentPrice || 389.80;
  const usd = currencies[0]?.interbankSell || 278.35;

  const portals = [
    {
      id: 'gold',
      title: 'Sarafa Gold & Bullion Market',
      urdu: 'صرافہ سونا مارکیٹ اور منافع سمیلیٹر',
      desc: 'Live spot rates updated directly from Karachi, Lahore, and Islamabad bullion markets with 24K, 22K, and 18K purity levels and interactive profit simulator.',
      icon: Coins,
      iconColor: 'bg-amber-500/10 text-amber-500',
      badgeText: `Spot 24K: Rs. ${gold24k.toLocaleString()}`,
      badgeStyle: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
      actionText: 'Open Gold Tool',
      shareText: `✨ RateZilla Live Gold Rate:\n24K Gold: Rs. ${gold24k.toLocaleString()} / Tola\n22K Gold: Rs. ${gold22k.toLocaleString()} / Tola\nChandi: Rs. ${silver.toLocaleString()} / Tola\nCheck live at RateZilla.`,
    },
    {
      id: 'solar',
      title: 'Solar Panel System Sizing & Cost',
      urdu: 'شمسی پینل سائزنگ اور نیٹ میٹرنگ',
      desc: 'Calculate exact solar kW system size from monthly WAPDA units, required 580W-590W bifacial Tier-1 panel rates, battery requirements, and ROI.',
      icon: Sun,
      iconColor: 'bg-yellow-500/10 text-yellow-500',
      badgeText: 'Rs. 40 - 45 / Watt (Tier-1)',
      badgeStyle: 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      actionText: 'Calculate Solar',
      shareText: `☀️ RateZilla Solar Benchmark:\nTier-1 N-Type TopCon Panels: Rs. 40 - 45 / Watt\nCalculate your home system size and net-metering on RateZilla.`,
    },
    {
      id: 'fuel',
      title: 'OGRA Fuel Benchmark & Trip Estimator',
      urdu: 'اوگرا پٹرول، ڈیزل و سفر کا خرچ',
      desc: 'Official OGRA notification rates for Petrol, High-Speed Diesel, and LPG cylinders with city-to-city trip fuel budget planner.',
      icon: Fuel,
      iconColor: 'bg-blue-500/10 text-blue-500',
      badgeText: `Petrol: Rs. ${petrol.toFixed(2)}/L`,
      badgeStyle: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20',
      actionText: 'View Fuel Rates',
      shareText: `⛽ RateZilla Fuel Rates:\nPetrol: Rs. ${petrol.toFixed(2)} / Litre\nDiesel: Rs. ${diesel.toFixed(2)} / Litre\nCalculate road trip costs on RateZilla.`,
    },
    {
      id: 'tax',
      title: 'FBR Income Tax & Salary Slabs',
      urdu: 'ایف بی آر انکم ٹیکس و تنخواہ',
      desc: 'Latest progressive tax rates for salaried and business individuals for Tax Year 2025-2026 with monthly withholding and take-home pay calculations.',
      icon: Briefcase,
      iconColor: 'bg-purple-500/10 text-purple-500',
      badgeText: 'Tax Year 2025-2026',
      badgeStyle: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
      actionText: 'Calculate Tax',
      shareText: `💼 RateZilla FBR Salary Tax Calculator 2025-26:\nCheck your monthly income tax deduction and net salary on RateZilla.`,
    },
    {
      id: 'zakat',
      title: 'Live Nisab Zakat Calculator',
      urdu: 'زکوٰۃ کیلکولیٹر بمع لائیو نصاب',
      desc: 'Automated 2.5% Zakat computation based on today’s live Sarafa Gold Nisab (7.5 Tola) and Silver Nisab (52.5 Tola) threshold values.',
      icon: Moon,
      iconColor: 'bg-emerald-500/10 text-emerald-500',
      badgeText: `Silver Nisab: Rs. ${(silver * 52.5).toLocaleString()}`,
      badgeStyle: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      actionText: 'Compute Zakat',
      shareText: `🌙 RateZilla Zakat Nisab Rates:\nSilver Nisab (52.5 Tola): Rs. ${(silver * 52.5).toLocaleString()}\nGold Nisab (7.5 Tola): Rs. ${(gold24k * 7.5).toLocaleString()}\nCalculate exact 2.5% Zakat on RateZilla.`,
    },
    {
      id: 'currency',
      title: 'Forex Exchange & Crypto Rates',
      urdu: 'اوپن مارکیٹ کرنسی و کرپٹو ریٹس',
      desc: 'Open market and interbank currency exchange rates for USD, SAR, AED, GBP, EUR alongside Bitcoin, Ethereum, and USDT benchmarks in PKR.',
      icon: DollarSign,
      iconColor: 'bg-indigo-500/10 text-indigo-500',
      badgeText: `USD / PKR: Rs. ${usd.toFixed(2)}`,
      badgeStyle: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      actionText: 'Track Forex',
      shareText: `💵 RateZilla Currency Exchange:\nUSD / PKR: Rs. ${usd.toFixed(2)}\nSAR, AED, GBP, EUR & Crypto on RateZilla.`,
    },
    {
      id: 'electricity',
      title: 'WAPDA Bills & Duplicate Finder',
      urdu: 'بجلی کا بل تخمینہ و ڈپلیکیٹ بل',
      desc: 'Unit tariff slab calculations for LESCO, MEPCO, K-Electric, FESCO, IESCO with protected, non-protected slabs, and FPA fuel adjustments.',
      icon: Zap,
      iconColor: 'bg-rose-500/10 text-rose-500',
      badgeText: 'LESCO / K-Electric / DISCOs',
      badgeStyle: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
      actionText: 'Estimate Bill',
      shareText: `⚡ RateZilla WAPDA Bill Estimator:\nCalculate monthly LESCO, MEPCO, K-Electric electricity bills and taxes on RateZilla.`,
    },
    {
      id: 'mandi',
      title: 'Ghalla Mandi & Agri Weather',
      urdu: 'غلہ منڈی ریٹس اور زرعی موسم',
      desc: 'Daily wholesale market rates for Gandum (Wheat), Basmati Super Rice, Cotton, and Sugar with city Air Quality Index (AQI) notifications.',
      icon: Wheat,
      iconColor: 'bg-orange-500/10 text-orange-500',
      badgeText: 'Wheat (40kg): Rs. 3,850',
      badgeStyle: 'text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20',
      actionText: 'Explore Mandi',
      shareText: `🌾 RateZilla Ghalla Mandi:\nWheat (40kg): Rs. 3,850\nRice: Rs. 9,400\nCotton: Rs. 8,200\nDaily crop rates on RateZilla.`,
    },
    {
      id: 'vehicle-tax',
      title: 'Vehicle Excise & Token Tax',
      urdu: 'گاڑیوں کا ایکسائز و سالانہ ٹوکن ٹیکس',
      desc: 'Engine displacement (cc) tax estimator for cars and motorcycles in Punjab, Sindh, and Islamabad, including filer vs non-filer transfer fees.',
      icon: Car,
      iconColor: 'bg-cyan-500/10 text-cyan-500',
      badgeText: 'Car & Bike CC Tax Slabs',
      badgeStyle: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      actionText: 'Check Vehicle Tax',
      shareText: `🚗 RateZilla Vehicle Excise & Token Tax Estimator:\nCalculate Punjab & Sindh annual car and bike tax on RateZilla.`,
    },
    {
      id: 'construction',
      title: 'House Construction Cost BOQ',
      urdu: 'مکان کی تعمیراتی لاگت اور میٹریل',
      desc: 'Comprehensive bill of quantities (BOQ) for 1-100 storeys, itemizing cement bags, bricks, deformed steel rebars, sand, labor, and turnkey finishes.',
      icon: Building2,
      iconColor: 'bg-teal-500/10 text-teal-500',
      badgeText: 'Gray Structure: Rs. 2,800/sq.ft',
      badgeStyle: 'text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20',
      actionText: 'Calculate Cost',
      shareText: `🏗️ RateZilla Construction BOQ Estimator:\nCalculate building material cost for house construction on RateZilla.`,
    },
    {
      id: 'news',
      title: 'Market Bulletins & Rates News',
      urdu: 'روزانہ صرافہ اور پٹرولیم مارکیٹ نیوز',
      desc: 'Daily market notifications, OGRA fortnightly decisions, international bullion trends, and solar importer supply-chain updates.',
      icon: Newspaper,
      iconColor: 'bg-pink-500/10 text-pink-500',
      badgeText: 'Daily Feed Updates',
      badgeStyle: 'text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/20',
      actionText: 'Read Market News',
      shareText: `📰 RateZilla Daily Market News:\nLatest Sarafa gold notices, OGRA petrol decisions, and economy news on RateZilla.`,
    },
  ];

  return (
    <div className="w-full space-y-12">
      {/* HALF-PAGE HERO SECTION (Large Name, Logo & Spacious Layout) */}
      <section className="relative py-12 md:py-16 px-4 bg-gradient-to-b from-emerald-50/60 via-transparent to-transparent dark:from-emerald-950/20 dark:via-transparent dark:to-transparent border-b border-gray-200/60 dark:border-[#1f2937]/60 rounded-3xl">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Big Hero Logo */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 text-white text-5xl font-black shadow-2xl shadow-emerald-500/30 transform hover:rotate-6 transition-transform duration-300">
            R
          </div>

          {/* Large Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight text-gray-900 dark:text-white leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-400 bg-clip-text text-transparent">
              RateZilla
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Pakistan's premium all-in-one platform for real-time market rates, utility cost estimators, and financial calculators.
          </p>

          {/* Quick Live Rates Ticker Bar */}
          <div className="pt-2 flex flex-col items-center gap-4">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 py-3 px-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1f2937] shadow-xl">
              <div className="flex items-center space-x-2 text-sm font-bold text-gray-800 dark:text-gray-200">
                <span className="text-amber-500 flex items-center gap-1.5">
                  <Coins className="w-4 h-4" /> Gold (24K):
                </span>
                <span className="text-gray-900 dark:text-white font-mono">
                  Rs. {gold24k.toLocaleString()}
                </span>
              </div>

              <div className="text-gray-300 dark:text-gray-700 hidden sm:inline">|</div>

              <div className="flex items-center space-x-2 text-sm font-bold text-gray-800 dark:text-gray-200">
                <span className="text-blue-500 flex items-center gap-1.5">
                  <Fuel className="w-4 h-4" /> Petrol:
                </span>
                <span className="text-gray-900 dark:text-white font-mono">
                  Rs. {petrol.toFixed(2)}
                </span>
              </div>

              <div className="text-gray-300 dark:text-gray-700 hidden sm:inline">|</div>

              <div className="flex items-center space-x-2 text-sm font-bold text-gray-800 dark:text-gray-200">
                <span className="text-emerald-500 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" /> USD/PKR:
                </span>
                <span className="text-gray-900 dark:text-white font-mono">
                  Rs. {usd.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Quick Action Pills under Ticker */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <ShareRatesButton
                gold24kTola={gold24k}
                petrolPrice={petrol}
                usdPkr={usd}
                variant="button"
                className="text-xs"
              />

              <button
                type="button"
                onClick={onOpenRatesUpdater}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-[#111827] dark:hover:bg-[#1f2937] border border-gray-200 dark:border-[#1f2937] text-gray-700 dark:text-gray-300 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Update Rates Script</span>
              </button>

              <button
                type="button"
                onClick={onOpenAlerts}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-[#111827] dark:hover:bg-[#1f2937] border border-gray-200 dark:border-[#1f2937] text-gray-700 dark:text-gray-300 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <Bell className="w-3.5 h-3.5 text-amber-500" />
                <span>Price Drop Alerts</span>
              </button>

              <button
                type="button"
                onClick={onOpenAudioGuides}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-[#111827] dark:hover:bg-[#1f2937] border border-gray-200 dark:border-[#1f2937] text-gray-700 dark:text-gray-300 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <Headphones className="w-3.5 h-3.5 text-emerald-500" />
                <span>Urdu Audio Guide</span>
              </button>

              <button
                type="button"
                onClick={onOpenSpeedTest}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-[#111827] dark:hover:bg-[#1f2937] border border-gray-200 dark:border-[#1f2937] text-gray-700 dark:text-gray-300 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 text-blue-500" />
                <span>Speed Test</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN PORTALS SECTION: Spacious 2-Column Grid */}
      <section className="w-full space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 pb-2 border-b border-gray-200 dark:border-[#1f2937]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
              Explore All Tools &amp; Portals
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
              11 Portals available for live benchmarks and utility calculations. Click on any block to open the tool.
            </p>
          </div>
        </div>

        {/* 2 BLOCKS PER ROW GRID (2-Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.id}
                className="group relative bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1f2937] rounded-3xl p-6 md:p-8 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${portal.iconColor} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Urdu Subtitle */}
                  <div className="space-y-1 mb-2">
                    <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {portal.title}
                    </h3>
                    <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 font-urdu">
                      {portal.urdu}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 font-normal">
                    {portal.desc}
                  </p>
                </div>

                {/* Bottom Action Strip with Rate Badge & Open Button */}
                <div className="pt-4 border-t border-gray-100 dark:border-[#1f2937] flex flex-wrap items-center justify-between gap-3">
                  {/* Rate Badge */}
                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${portal.badgeStyle}`}
                  >
                    {portal.badgeText}
                  </span>

                  {/* Action Buttons: Share & Open Tool */}
                  <div className="flex items-center gap-2">
                    {/* Share Rate Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (navigator.share) {
                          navigator
                            .share({
                              title: `${portal.title} - RateZilla`,
                              text: portal.shareText,
                              url: window.location.href,
                            })
                            .catch(() => {});
                        } else {
                          navigator.clipboard.writeText(portal.shareText);
                          alert('Rate details copied to clipboard!');
                        }
                      }}
                      className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-[#1f2937] transition-colors"
                      title="Share this rate on WhatsApp or copy"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    {/* Open Tool Button */}
                    <button
                      type="button"
                      onClick={() => setActiveTab(portal.id)}
                      className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>{portal.actionText}</span>
                      <ArrowRight className="w-4 h-4 text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
