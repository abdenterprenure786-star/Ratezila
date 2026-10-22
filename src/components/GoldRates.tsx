import React, { useState } from 'react';
import { Flame, ArrowLeft, Share2, Calculator, Check, TrendingUp, Sparkles } from 'lucide-react';
import { GoldRate, SilverRate, CityGoldRate, HistoricalRate } from '../types';

interface GoldRatesProps {
  rates: GoldRate[];
  silverRate: SilverRate;
  cityRates: CityGoldRate[];
  history: HistoricalRate[];
  onBackToHome: () => void;
}

export const GoldRates: React.FC<GoldRatesProps> = ({
  rates,
  silverRate,
  cityRates,
  onBackToHome
}) => {
  const [weight, setWeight] = useState(1);
  const [unit, setUnit] = useState<'tola' | '10gram' | 'gram'>('tola');
  const [carat, setCarat] = useState<'24K' | '22K' | '21K' | '18K'>('24K');
  const [makingChargesPercent, setMakingChargesPercent] = useState(10);
  const [copied, setCopied] = useState(false);

  const selectedRate = rates.find((r) => r.carat.startsWith(carat)) || rates[0];

  const getBasePrice = () => {
    if (!selectedRate) return 0;
    if (unit === 'tola') return selectedRate.perTola * weight;
    if (unit === '10gram') return selectedRate.per10Gram * weight;
    return selectedRate.perGram * weight;
  };

  const basePrice = getBasePrice();
  const makingCharges = (basePrice * makingChargesPercent) / 100;
  const totalPrice = basePrice + makingCharges;

  const handleShare = () => {
    const text = `Today 24K Gold Rate Pakistan: Rs. ${rates[0]?.perTola?.toLocaleString()} / Tola | 22K: Rs. ${rates[1]?.perTola?.toLocaleString()} | Fine Silver: Rs. ${silverRate?.perTola?.toLocaleString()}. Check live at RateZilla.`;
    if (navigator.share) {
      navigator.share({ title: 'Gold Rates Pakistan Today - RateZilla', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Pages Hub</span>
      </button>

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Sarafa Bullion Association</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Pakistan Gold & Silver Rates Today
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Real-time Sarafa bullion rates for 24K, 22K, 21K, 18K per Tola, 10 Grams and Gram
          </p>
        </div>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all self-start sm:self-center cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Rates Copied!' : 'Share Rates'}</span>
        </button>
      </div>

      {/* Main Carat Rates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rates.map((r, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                  {r.purity}
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +Rs. {r.change24h}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-3">{r.carat}</h3>

              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Per Tola:</span>
                  <span className="font-bold text-amber-400 font-mono text-sm">
                    Rs. {r.perTola?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Per 10 Gram:</span>
                  <span className="font-semibold text-gray-200 font-mono">
                    Rs. {r.per10Gram?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Per Gram:</span>
                  <span className="font-semibold text-gray-300 font-mono">
                    Rs. {r.perGram?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Jewelry Making Cost Simulator */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-5">
        <div className="flex items-center gap-2 text-amber-400">
          <Calculator className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Jewelry Cost & Making Charges Calculator</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Select Carat</label>
            <select
              value={carat}
              onChange={(e) => setCarat(e.target.value as any)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="24K">24K Pure Gold</option>
              <option value="22K">22K Jewelry Standard</option>
              <option value="21K">21K Arab Standard</option>
              <option value="18K">18K White/Diamond</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Weight Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as any)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="tola">Tola (11.66g)</option>
              <option value="10gram">10 Grams</option>
              <option value="gram">1 Gram</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Weight Value</label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(Math.max(0.1, Number(e.target.value)))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Making Charges (%)</label>
            <input
              type="number"
              min="0"
              max="40"
              value={makingChargesPercent}
              onChange={(e) => setMakingChargesPercent(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Breakdown Result */}
        <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-xs text-gray-400 block mb-0.5">Net Gold Cost</span>
            <span className="text-lg font-bold text-white font-mono">
              Rs. {Math.round(basePrice).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block mb-0.5">Making & Polish ({makingChargesPercent}%)</span>
            <span className="text-lg font-bold text-amber-400 font-mono">
              +Rs. {Math.round(makingCharges).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block mb-0.5">Total Estimated Price</span>
            <span className="text-xl font-extrabold text-[#00FF87] font-mono">
              Rs. {Math.round(totalPrice).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Major Cities Gold Rates Table */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
        <h2 className="text-lg font-bold text-white">Major Cities Sarafa Market Rates</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-800/80 text-gray-300 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Sarafa Market</th>
                <th className="py-3 px-4">24K Gold / Tola</th>
                <th className="py-3 px-4">22K Gold / Tola</th>
                <th className="py-3 px-4">Diff vs Karachi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-200">
              {cityRates.map((c, i) => (
                <tr key={i} className="hover:bg-gray-800/40">
                  <td className="py-3 px-4 font-bold text-white">{c.city}</td>
                  <td className="py-3 px-4 text-gray-400 font-serif">{c.cityUrdu}</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">
                    Rs. {c.rate24kTola?.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-200">
                    Rs. {c.rate22kTola?.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">
                    {c.differenceKarachi === 0 ? 'Benchmark' : `+Rs. ${c.differenceKarachi}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
