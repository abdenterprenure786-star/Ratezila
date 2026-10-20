import React, { useState } from 'react';
import { Wheat, CloudSun, AlertTriangle, Wind, Droplets, MapPin, Search } from 'lucide-react';
import { MandiItem, WeatherAgriCity } from '../types/market.js';

interface MandiWeatherSectionProps {
  mandiItems: MandiItem[];
  weatherCities: WeatherAgriCity[];
}

export const MandiWeatherSection: React.FC<MandiWeatherSectionProps> = ({
  mandiItems,
  weatherCities,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCityWeather, setSelectedCityWeather] = useState<string>('Lahore');

  const categories = ['All', 'Grains', 'Cash Crops', 'Vegetables', 'Oils & Pulses'];

  const filteredItems = mandiItems.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemUrdu.includes(searchQuery) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeWeather =
    weatherCities.find((w) => w.city === selectedCityWeather) || weatherCities[0];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003816] via-[#05210f] to-[#07130a] border border-[#00401a]">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <Wheat className="w-4 h-4 text-[#ffd700]" />
            <span>غلہ منڈی ریٹس · Pakistan Wholesale Commodity & Agri Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Daily Ghalla Mandi Rates & <span className="text-[#ffd700]">Agri-Weather Alerts</span>
          </h2>
          <p className="text-sm text-slate-300">
            Wholesale mandi rates for Wheat (Gandum), Cotton (Phutti), Basmati Rice, seasonal vegetables, and city-wise smog and crop weather advisories.
          </p>
        </div>
      </div>

      {/* Weather & Smog / AQI Advisory Card */}
      <div className="bg-[#08170e] border border-emerald-900/60 rounded-2xl p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#00401a] pb-4">
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Agricultural Weather & Smog (AQI) Forecast</h3>
          </div>

          {/* City Selector */}
          <div className="flex flex-wrap gap-2 text-xs">
            {weatherCities.map((w) => (
              <button
                key={w.city}
                type="button"
                onClick={() => setSelectedCityWeather(w.city)}
                className={`px-3 py-1 rounded-lg border font-medium transition-colors ${
                  selectedCityWeather === w.city
                    ? 'bg-[#00401a] border-[#ffd700] text-white'
                    : 'bg-[#050d08] border-[#00401a] text-slate-400 hover:text-white'
                }`}
              >
                {w.city}
              </button>
            ))}
          </div>
        </div>

        {activeWeather && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Weather Metrics */}
            <div className="md:col-span-5 flex items-center gap-6">
              <div>
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tabular-nums">
                  {activeWeather.tempC}°C
                </span>
                <span className="text-xs text-slate-400 block mt-1">{activeWeather.condition} · {activeWeather.city}</span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-sky-400" />
                  <span>Humidity: {activeWeather.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-3.5 h-3.5 text-teal-400" />
                  <span>Wind: {activeWeather.windKmH} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    AQI: <strong className="text-amber-300">{activeWeather.aqi}</strong> ({activeWeather.aqiStatus})
                  </span>
                </div>
              </div>
            </div>

            {/* Advisory in English and Urdu */}
            <div className="md:col-span-7 p-4 rounded-xl bg-[#050d08] border border-[#00401a] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700]">
                <span>Crop & Farm Advisory:</span>
              </div>
              <p className="text-xs text-slate-200">{activeWeather.cropAdvisory}</p>
              <p className="text-xs text-emerald-400 font-urdu leading-relaxed" dir="rtl">
                {activeWeather.urduAdvisory}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mandi Commodities Section */}
      <div className="bg-[#08170e] border border-[#00401a] rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#00401a] text-[#ffd700] border border-[#ffd700]/30 font-semibold'
                    : 'bg-[#050d08] text-slate-400 border border-[#00401a] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Gandum, Rice, City..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050d08] border border-[#00401a] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:border-[#ffd700]"
            />
          </div>
        </div>

        {/* Commodity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#050d08] border border-[#00401a] hover:border-[#ffd700]/30 transition-all space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm font-bold text-white block">{item.item}</span>
                  <span className="text-xs text-emerald-400 font-urdu block">{item.itemUrdu}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0b1f13] text-slate-300">
                  {item.unit}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-xl font-bold font-mono text-[#ffd700] tabular-nums">
                    Rs. {item.avgPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">avg</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Range: {item.minPrice} – {item.maxPrice}
                </span>
              </div>

              <div className="pt-2 border-t border-[#00401a]/50 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {item.city}
                </span>
                <span className={item.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {item.change24h >= 0 ? '+' : ''}{item.change24h} PKR
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
