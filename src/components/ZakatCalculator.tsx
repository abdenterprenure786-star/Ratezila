import React, { useState } from 'react';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';
import { GoldRate, SilverRate } from '../types';

interface ZakatCalculatorProps {
  goldRates: GoldRate[];
  silverRate: SilverRate;
  onBackToHome: () => void;
}

export const ZakatCalculator: React.FC<ZakatCalculatorProps> = ({
  goldRates,
  silverRate,
  onBackToHome
}) => {
  const [cashInHand, setCashInHand] = useState(250000);
  const [bankBalance, setBankBalance] = useState(450000);
  const [goldGrams, setGoldGrams] = useState(24);
  const [silverGrams, setSilverGrams] = useState(0);
  const [businessStock, setBusinessStock] = useState(150000);
  const [debtsOwed, setDebtsOwed] = useState(50000);

  // Nisab benchmarks
  // Gold Nisab: 7.5 Tolas = 87.48 grams
  // Silver Nisab: 52.5 Tolas = 612.36 grams
  const gold24kPerGram = goldRates[0]?.perGram || 24391;
  const silverPerGram = silverRate?.perGram || 287;

  const goldNisabValue = 7.5 * (goldRates[0]?.perTola || 284500);
  const silverNisabValue = 52.5 * (silverRate?.perTola || 3350);

  // Value of owned assets
  const goldValue = goldGrams * gold24kPerGram;
  const silverValue = silverGrams * silverPerGram;
  const totalAssets = cashInHand + bankBalance + goldValue + silverValue + businessStock;
  const netZakatableWealth = Math.max(0, totalAssets - debtsOwed);

  // According to majority Islamic scholars, silver Nisab is applied for cash/mixed wealth as precaution
  const isEligible = netZakatableWealth >= silverNisabValue;
  const zakatPayable = isEligible ? netZakatableWealth * 0.025 : 0;

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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Live Nisab Threshold</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Live Nisab Zakat Calculator Pakistan
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Shariah compliant 2.5% calculation automatically synced with today&apos;s bullion prices
        </p>
      </div>

      {/* Nisab Threshold Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-400 block">Silver Nisab (52.5 Tola)</span>
            <span className="text-lg font-bold text-slate-200 font-mono">
              Rs. {Math.round(silverNisabValue).toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] px-2 py-1 rounded bg-gray-800 text-emerald-400 font-semibold">
            Common Benchmark
          </span>
        </div>

        <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-400 block">Gold Nisab (7.5 Tola)</span>
            <span className="text-lg font-bold text-amber-400 font-mono">
              Rs. {Math.round(goldNisabValue).toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] px-2 py-1 rounded bg-gray-800 text-amber-400 font-semibold">
            Pure Gold Threshold
          </span>
        </div>
      </div>

      {/* Assets Form */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Cash in Hand (PKR)</label>
            <input
              type="number"
              value={cashInHand}
              onChange={(e) => setCashInHand(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Bank Balances & Savings (PKR)</label>
            <input
              type="number"
              value={bankBalance}
              onChange={(e) => setBankBalance(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Gold Owned (Grams)</label>
            <input
              type="number"
              value={goldGrams}
              onChange={(e) => setGoldGrams(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-amber-400 focus:outline-none focus:border-emerald-400"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">Value: Rs. {Math.round(goldValue).toLocaleString()}</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Business Trade Inventory (PKR)</label>
            <input
              type="number"
              value={businessStock}
              onChange={(e) => setBusinessStock(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Silver Owned (Grams)</label>
            <input
              type="number"
              value={silverGrams}
              onChange={(e) => setSilverGrams(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Immediate Liabilities & Debts (PKR)</label>
            <input
              type="number"
              value={debtsOwed}
              onChange={(e) => setDebtsOwed(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-rose-400 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Net Zakatable Wealth</span>
            <span className="text-xl font-bold text-white font-mono">
              Rs. {Math.round(netZakatableWealth).toLocaleString()}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Nisab Status</span>
            <span
              className={`text-lg font-bold ${
                isEligible ? 'text-emerald-400' : 'text-gray-400'
              }`}
            >
              {isEligible ? '✅ Nisab Met (Zakat Due)' : '❌ Below Nisab'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">2.5% Zakat Due</span>
            <span className="text-2xl font-extrabold text-[#00FF87] font-mono">
              Rs. {Math.round(zakatPayable).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
