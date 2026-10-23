import React, { useState, useMemo } from 'react';
import {
  Coins,
  ArrowLeft,
  CloudSun,
  Search,
  Share2,
  Check,
  Wheat,
  Apple,
  Nut,
  Sparkles,
  Info,
  LayoutGrid,
  ListFilter
} from 'lucide-react';
import { WeatherCity, MandiItem } from '../types';

interface DetailedMandiItem {
  id: string;
  name: string;
  nameUrdu: string;
  category: 'Grains & Pulses' | 'Fresh Fruits' | 'Dry Fruits';
  unit: string;
  priceDisplay: string;
  priceMin?: number;
  priceMax?: number;
  retailNote?: string;
  marketType: string;
}

interface MandiRatesProps {
  mandiItems?: MandiItem[];
  weatherCities?: WeatherCity[];
  onBackToHome: () => void;
}

export const MandiRates: React.FC<MandiRatesProps> = ({
  weatherCities = [],
  onBackToHome
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Complete verified mandi dataset per user specification
  const allMandiData: DetailedMandiItem[] = useMemo(
    () => [
      // --- GRAINS & PULSES (WHOLESALE / PER 100 KG) ---
      {
        id: 'rice-super-new',
        name: 'Rice Basmati Super (New)',
        nameUrdu: 'باسمتی سپر چاول (نیا)',
        category: 'Grains & Pulses',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 30,500',
        retailNote: 'approx. PKR 305 / kg',
        marketType: 'Wholesale Mandi'
      },
      {
        id: 'rice-super-old',
        name: 'Rice Basmati Super (Old)',
        nameUrdu: 'باسمتی سپر چاول (پرانا)',
        category: 'Grains & Pulses',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 34,000 – 40,000',
        retailNote: 'approx. PKR 340 – 400 / kg',
        marketType: 'Wholesale Mandi'
      },
      {
        id: 'black-gram',
        name: 'Black Gram / Bareek Pulse',
        nameUrdu: 'کالا چنا / باریک دال',
        category: 'Grains & Pulses',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 20,000',
        retailNote: 'approx. PKR 200 / kg',
        marketType: 'Wholesale Mandi'
      },
      {
        id: 'white-gram',
        name: 'White Gram (Mota)',
        nameUrdu: 'سفید چنا (کابلی موٹا)',
        category: 'Grains & Pulses',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 23,000',
        retailNote: 'approx. PKR 230 / kg',
        marketType: 'Wholesale Mandi'
      },
      {
        id: 'mash-washed',
        name: 'Mash Pulse (Imported Washed)',
        nameUrdu: 'دال ماش (امپورٹڈ دھلی ہوئی)',
        category: 'Grains & Pulses',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 40,000',
        retailNote: 'approx. PKR 400 / kg',
        marketType: 'Wholesale Mandi'
      },
      {
        id: 'mash-unwashed',
        name: 'Mash Pulse (Imported Unwashed)',
        nameUrdu: 'دال ماش (امپورٹڈ چھلکے والی)',
        category: 'Grains & Pulses',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 35,000',
        retailNote: 'approx. PKR 350 / kg',
        marketType: 'Wholesale Mandi'
      },
      {
        id: 'moong-pulse',
        name: 'Moong Pulse (Kori)',
        nameUrdu: 'دال مونگ (کوری)',
        category: 'Grains & Pulses',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 27,000',
        retailNote: 'approx. PKR 270 / kg',
        marketType: 'Wholesale Mandi'
      },
      {
        id: 'masoor-pulse',
        name: 'Masoor Pulse (Imported Moti)',
        nameUrdu: 'دال مسور (امپورٹڈ موٹی)',
        category: 'Grains & Pulses',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 20,000',
        retailNote: 'approx. PKR 200 / kg',
        marketType: 'Wholesale Mandi'
      },
      {
        id: 'gram-flour',
        name: 'Gram Flour (Besan)',
        nameUrdu: 'بیسن خالص چنا',
        category: 'Grains & Pulses',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 20,000',
        retailNote: 'approx. PKR 200 / kg',
        marketType: 'Wholesale Mandi'
      },
      {
        id: 'jaggery-gurr',
        name: 'Jaggery (Gurr)',
        nameUrdu: 'دیسی گڑ (خالص)',
        category: 'Grains & Pulses',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 20,000 – 23,000',
        retailNote: 'approx. PKR 200 – 230 / kg',
        marketType: 'Wholesale Mandi'
      },

      // --- FRESH FRUITS (WHOLESALE MARKET RATES) ---
      {
        id: 'apple-kala-kullu',
        name: 'Apple (Kala Kullu)',
        nameUrdu: 'سیب کالا کلو (پریمیم)',
        category: 'Fresh Fruits',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 24,000 – 26,000',
        retailNote: 'Wholesale Crate / 100 kg',
        marketType: 'Fruit Mandi'
      },
      {
        id: 'apple-madani',
        name: 'Apple (Madani)',
        nameUrdu: 'سیب مدنی (سوات / زیارت)',
        category: 'Fresh Fruits',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 18,000 – 19,500',
        retailNote: 'Wholesale Crate / 100 kg',
        marketType: 'Fruit Mandi'
      },
      {
        id: 'banana',
        name: 'Banana',
        nameUrdu: 'کیلا (سندھ اسپیشل)',
        category: 'Fresh Fruits',
        unit: 'Per Dozen',
        priceDisplay: 'PKR 132 – 148',
        retailNote: 'Daily Auction Price',
        marketType: 'Fruit Mandi'
      },
      {
        id: 'guava',
        name: 'Guava',
        nameUrdu: 'امرود (لاڑکانہ / شیخوپورہ)',
        category: 'Fresh Fruits',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 22,000',
        retailNote: 'approx. PKR 220 / kg',
        marketType: 'Fruit Mandi'
      },
      {
        id: 'pomegranate',
        name: 'Pomegranate (Kandhari)',
        nameUrdu: 'انار قندھاری اسپیشل',
        category: 'Fresh Fruits',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 44,500 – 47,700',
        retailNote: 'approx. PKR 445 – 477 / kg',
        marketType: 'Fruit Mandi'
      },
      {
        id: 'grapes-sundekhani',
        name: 'Grapes (Sundekhani)',
        nameUrdu: 'انگور سندر خانی',
        category: 'Fresh Fruits',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 57,100 – 60,000',
        retailNote: 'approx. PKR 571 – 600 / kg',
        marketType: 'Fruit Mandi'
      },
      {
        id: 'grapes-gola',
        name: 'Grapes (Gola)',
        nameUrdu: 'انگور گولا',
        category: 'Fresh Fruits',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 25,500 – 26,700',
        retailNote: 'approx. PKR 255 – 267 / kg',
        marketType: 'Fruit Mandi'
      },
      {
        id: 'melon',
        name: 'Melon',
        nameUrdu: 'خربوزہ / گرما',
        category: 'Fresh Fruits',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 15,500 – 16,200',
        retailNote: 'approx. PKR 155 – 162 / kg',
        marketType: 'Fruit Mandi'
      },
      {
        id: 'dates-aseel',
        name: 'Dates (Aseel)',
        nameUrdu: 'کھجور اصیل (خیرپور سندھ)',
        category: 'Fresh Fruits',
        unit: 'Per 100 kg',
        priceDisplay: 'PKR 28,000 – 29,500',
        retailNote: 'Retail pack: PKR 350 – 1,800+ / kg',
        marketType: 'Fruit Mandi'
      },

      // --- DRY FRUITS (RETAIL / ONLINE MARKET PER KG) ---
      {
        id: 'mixed-dry-fruits',
        name: 'Mixed Dry Fruits (Nuts & Berries mix)',
        nameUrdu: 'مکس ڈرائی فروٹ (گری و بیریز)',
        category: 'Dry Fruits',
        unit: 'Per kg',
        priceDisplay: 'PKR 1,000 – 3,500',
        retailNote: 'Retail / Online Market',
        marketType: 'Dry Fruits Market'
      },
      {
        id: 'almonds-badam',
        name: 'Almonds (Badam Giri / USA)',
        nameUrdu: 'بادام گری (امریکن امپورٹڈ)',
        category: 'Dry Fruits',
        unit: 'Per kg',
        priceDisplay: 'PKR 3,000 – 6,500+',
        retailNote: 'Retail / Online Market',
        marketType: 'Dry Fruits Market'
      },
      {
        id: 'pistachios-pista',
        name: 'Pistachios (Pista / Salted / Akbari)',
        nameUrdu: 'پستہ اکبری (نمکین / بھنا ہوا)',
        category: 'Dry Fruits',
        unit: 'Per kg',
        priceDisplay: 'PKR 3,500 – 7,800+',
        retailNote: 'Retail / Online Market',
        marketType: 'Dry Fruits Market'
      },
      {
        id: 'walnuts-akhrot',
        name: 'Walnuts (Akhrot Giri / Desi)',
        nameUrdu: 'اخروٹ گری (دیسی گلگت / سوات)',
        category: 'Dry Fruits',
        unit: 'Per kg',
        priceDisplay: 'PKR 3,000 – 6,000',
        retailNote: 'Retail / Online Market',
        marketType: 'Dry Fruits Market'
      },
      {
        id: 'pine-nuts-chalghoza',
        name: 'Pine Nuts (Chalghoza)',
        nameUrdu: 'چلغوزہ (وزیرستان / پریمیم)',
        category: 'Dry Fruits',
        unit: 'Per kg',
        priceDisplay: 'PKR 6,400 – 8,800+',
        retailNote: 'Retail / Online Market',
        marketType: 'Dry Fruits Market'
      },
      {
        id: 'peanuts-moongphali',
        name: 'Peanuts (Moongphali)',
        nameUrdu: 'مونگ پھلی (چکوال روسٹڈ)',
        category: 'Dry Fruits',
        unit: 'Per kg',
        priceDisplay: 'PKR 1,200 – 1,500',
        retailNote: 'Retail / Online Market',
        marketType: 'Dry Fruits Market'
      },
      {
        id: 'dried-figs-anjeer',
        name: 'Dried Figs (Anjeer)',
        nameUrdu: 'خشک انجیر (پریمیم گریڈ)',
        category: 'Dry Fruits',
        unit: 'Per kg',
        priceDisplay: 'PKR 3,200 – 6,000',
        retailNote: 'Retail / Online Market',
        marketType: 'Dry Fruits Market'
      }
    ],
    []
  );

  // Real-time Search & Category Filtering
  const filteredItems = useMemo(() => {
    return allMandiData.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.nameUrdu.includes(q) ||
        item.unit.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allMandiData, activeCategory, searchQuery]);

  const handleShareItem = (item: DetailedMandiItem) => {
    const text = `Today Mandi Rate: ${item.name} (${item.nameUrdu}) - ${item.priceDisplay} ${item.unit}. Check live commodity auctions on RateZilla.`;
    if (navigator.share) {
      navigator.share({ title: `RateZilla - ${item.name}`, text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const categories = [
    { label: 'All', icon: Sparkles, count: allMandiData.length },
    {
      label: 'Grains & Pulses',
      icon: Wheat,
      count: allMandiData.filter((i) => i.category === 'Grains & Pulses').length
    },
    {
      label: 'Fresh Fruits',
      icon: Apple,
      count: allMandiData.filter((i) => i.category === 'Fresh Fruits').length
    },
    {
      label: 'Dry Fruits',
      icon: Nut,
      count: allMandiData.filter((i) => i.category === 'Dry Fruits').length
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Top Navigation / Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer bg-gray-900/60 hover:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-800"
        >
          <ArrowLeft className="w-4 h-4 text-[#00FF87]" />
          <span>Back to Home Portal</span>
        </button>

        <span className="text-xs font-mono text-[#00FF87] bg-[#00FF87]/10 px-3 py-1 rounded-full border border-[#00FF87]/30">
          Official Daily Mandi Auction Rates
        </span>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-[#0d1624] to-gray-900 border border-gray-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-[#00FF87]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-[#60EFFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] text-xs font-bold uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5" />
            <span>Ghalla Mandi & Fruits Wholesale Benchmark</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Pakistan <span className="bg-gradient-to-r from-[#00FF87] to-[#60EFFF] bg-clip-text text-transparent">Mandi Rates</span> Today
          </h1>

          <p className="text-sm sm:text-base text-gray-300 font-serif" dir="rtl">
            غلہ منڈی اناج، دالیں، تازہ پھل اور خشک میوہ جات کے مصدقہ تھوک و پرچون ریٹس
          </p>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Real-time auction rates from Badami Bagh, Multan, Faisalabad, Sargodha and Sukkur Ghalla Mandis including Super Basmati Rice, Pulses, Fresh Orchard Fruits, and Dry Fruit retail packs.
          </p>
        </div>
      </div>

      {/* Real-Time Search & Category Filters Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00FF87] to-[#60EFFF] text-[#0b0f19] border-transparent shadow-[0_0_15px_rgba(0,255,135,0.35)] scale-102'
                      : 'bg-gray-900/90 hover:bg-gray-800 text-gray-300 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0b0f19]' : 'text-[#00FF87]'}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-[#0b0f19]/20 text-[#0b0f19]' : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & View Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crop, pulse, fruit (e.g. Rice, Badam, Apple)..."
                className="w-full bg-gray-900/90 border border-gray-800 rounded-2xl pl-10 pr-8 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF87] focus:ring-1 focus:ring-[#00FF87] transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-900 border border-gray-800 rounded-2xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#00FF87]/20 text-[#00FF87]' : 'text-gray-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-[#00FF87]/20 text-[#00FF87]' : 'text-gray-400 hover:text-white'
                }`}
                title="List Table View"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-gray-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredItems.length}</strong> mandi market items
          </span>
          {searchQuery && (
            <span>
              Search results for &quot;<strong className="text-[#00FF87]">{searchQuery}</strong>&quot;
            </span>
          )}
        </div>
      </div>

      {/* ITEMS DISPLAY (GRID VIEW) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-gray-900/90 border border-gray-800 hover:border-[#00FF87]/50 transition-all duration-200 p-5 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,135,0.12)] flex flex-col justify-between"
            >
              <div>
                {/* Header: Category Badge & Market Type */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-lg border ${
                      item.category === 'Grains & Pulses'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : item.category === 'Fresh Fruits'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {item.category}
                  </span>

                  <span className="text-[11px] text-gray-400 font-mono">
                    {item.marketType}
                  </span>
                </div>

                {/* Item Name & Urdu Script */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00FF87] transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <span className="text-xs text-gray-400 font-serif block mt-0.5" dir="rtl">
                    {item.nameUrdu}
                  </span>
                </div>

                {/* Price Display */}
                <div className="p-3.5 rounded-xl bg-gray-950/80 border border-gray-800/80 mb-3 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-gray-400">Current Rate:</span>
                    <span className="text-xl font-black text-[#00FF87] font-mono tracking-tight">
                      {item.priceDisplay}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-800/60">
                    <span className="text-gray-400">Unit:</span>
                    <span className="font-semibold text-gray-200 font-mono">
                      {item.unit}
                    </span>
                  </div>

                  {item.retailNote && (
                    <div className="text-[11px] text-gray-400 pt-1 flex items-center justify-between italic">
                      <span>Note / Breakdown:</span>
                      <span className="text-gray-300 font-medium">{item.retailNote}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions: Share Button */}
              <div className="border-t border-gray-800/80 pt-3 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Mandi Verified</span>

                <button
                  onClick={() => handleShareItem(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800/80 hover:bg-gray-800 text-[#00FF87] text-xs font-semibold transition-all cursor-pointer border border-[#00FF87]/20"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Rate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ITEMS DISPLAY (TABLE VIEW) */}
      {viewMode === 'table' && (
        <div className="overflow-hidden rounded-2xl bg-gray-900/90 border border-gray-800 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-800/80 text-gray-300 uppercase text-[11px] tracking-wider border-b border-gray-800">
                <tr>
                  <th className="py-3.5 px-5">Commodity / Item</th>
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-5">Measurement Unit</th>
                  <th className="py-3.5 px-5">Current Price (PKR)</th>
                  <th className="py-3.5 px-5">Retail / Extra Details</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80 text-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="font-bold text-white block">{item.name}</span>
                      <span className="text-[11px] text-gray-400 font-serif">{item.nameUrdu}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300 font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-gray-300">{item.unit}</td>
                    <td className="py-3.5 px-5 font-mono font-black text-[#00FF87] text-sm">
                      {item.priceDisplay}
                    </td>
                    <td className="py-3.5 px-5 text-xs text-gray-400">
                      {item.retailNote || '—'}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => handleShareItem(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-[#00FF87] text-xs font-medium cursor-pointer"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                        <span>{copiedId === item.id ? 'Copied' : 'Share'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-gray-900/60 rounded-3xl border border-gray-800 space-y-3">
          <Info className="w-8 h-8 text-gray-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Mandi Items Found</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            We could not find any items matching &quot;{searchQuery}&quot;. Try searching for &quot;Rice&quot;, &quot;Apple&quot;, &quot;Badam&quot;, or select &quot;All&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-[#00FF87] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Agricultural Weather & AQI Section */}
      {weatherCities.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gray-900/90 border border-gray-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[#00FF87]">
              <CloudSun className="w-5 h-5" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Mandi Hub Agricultural Weather & AQI Advisories
              </h2>
            </div>
            <span className="text-xs text-gray-400">Live Crop Harvesting Forecast</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {weatherCities.map((w, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-white">{w.city} ({w.cityUrdu})</span>
                  <span className="text-lg font-black text-[#00FF87] font-mono">{w.temp}°C</span>
                </div>
                <p className="text-xs text-gray-300">{w.condition}</p>
                <div className="text-[11px] text-gray-400 flex justify-between">
                  <span>AQI: <strong className={w.aqi > 150 ? 'text-rose-400' : 'text-[#00FF87]'}>{w.aqi}</strong></span>
                  <span>Humidity: {w.humidity}%</span>
                </div>
                <p className="text-[11px] text-emerald-400/90 border-t border-gray-800 pt-2 italic">
                  {w.advisory}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Required Disclaimer Note */}
      <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 text-center">
        <p className="text-xs sm:text-sm text-gray-400 italic">
          (Note: Prices fluctuate daily based on local mandi auctions, transport costs, and market availability.)
        </p>
      </div>
    </div>
  );
};
