import React, { useState } from 'react';
import { Coins, ArrowLeft, CloudSun, Search } from 'lucide-react';
import { MandiItem, WeatherCity } from '../types';

interface MandiRatesProps {
  mandiItems: MandiItem[];
  weatherCities: WeatherCity[];
  onBackToHome: () => void;
}

export const MandiRates: React.FC<MandiRatesProps> = ({
  mandiItems,
  weatherCities,
  onBackToHome
}) => {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredItems = mandiItems.filter((item) => {
    const matchesCat = category === 'All' || item.category === category;
    const matchesSearch =
      item.item.toLowerCase().includes(search.toLowerCase()) ||
      item.itemUrdu.includes(search) ||
      item.city.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Pages Hub</span>
      </button>

      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase mb-2">
          <Coins className="w-3.5 h-3.5" />
          <span>Agricultural Commodities & Wholesale</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Pakistan Ghalla Mandi & Agri Weather Portal
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Daily auction benchmarks for wheat, rice, cotton, pulses and city agricultural advisories
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {['All', 'Grains & Cereals', 'Cash Crops', 'Vegetables'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                category === cat
                  ? 'bg-orange-500 text-gray-950 font-bold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop or mandi..."
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-orange-400"
          />
        </div>
      </div>

      {/* Mandi Items Table */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-800/80 text-gray-300 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Commodity / Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Unit</th>
                <th className="py-3 px-4">Mandi / Market</th>
                <th className="py-3 px-4">Average Price</th>
                <th className="py-3 px-4">Min - Max</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-800/40">
                  <td className="py-3 px-4">
                    <span className="font-bold text-white block">{item.item}</span>
                    <span className="text-[11px] text-gray-400 font-serif">{item.itemUrdu}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{item.category}</td>
                  <td className="py-3 px-4 font-mono">{item.unit}</td>
                  <td className="py-3 px-4 text-orange-400 font-medium">{item.city}</td>
                  <td className="py-3 px-4 font-mono font-bold text-white text-sm">
                    Rs. {item.avgPrice.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-400 font-mono text-xs">
                    Rs. {item.minPrice.toLocaleString()} - {item.maxPrice.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agri Weather & AQI Cards */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
        <div className="flex items-center gap-2 text-orange-400">
          <CloudSun className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">City Agricultural Weather & Air Quality (AQI)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {weatherCities.map((w, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-gray-950 border border-gray-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-white">{w.city} ({w.cityUrdu})</span>
                <span className="text-lg font-extrabold text-orange-400 font-mono">{w.temp}°C</span>
              </div>
              <p className="text-xs text-gray-300">{w.condition}</p>
              <div className="text-[11px] text-gray-400 flex justify-between">
                <span>AQI: <strong className={w.aqi > 150 ? 'text-rose-400' : 'text-emerald-400'}>{w.aqi}</strong></span>
                <span>Humidity: {w.humidity}%</span>
              </div>
              <p className="text-[11px] text-emerald-400/90 border-t border-gray-800 pt-1.5 italic">
                {w.advisory}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
