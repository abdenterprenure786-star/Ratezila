import React, { useState } from 'react';
import { X, Save, Copy, Check, Terminal, FileCode, Sparkles, Download } from 'lucide-react';
import { GoldRate, SilverRate, FuelRate, CurrencyRate } from '../types';

interface RatesUpdaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  goldRates: GoldRate[];
  silverRate: SilverRate;
  fuelRates: FuelRate[];
  currencies: CurrencyRate[];
  onSaveManualRates: (updated: {
    gold24k: number;
    gold22k: number;
    silver: number;
    petrol: number;
    diesel: number;
    usdpkr: number;
  }) => void;
}

export const RatesUpdaterModal: React.FC<RatesUpdaterModalProps> = ({
  isOpen,
  onClose,
  goldRates,
  silverRate,
  fuelRates,
  currencies,
  onSaveManualRates
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'script'>('editor');
  const [copied, setCopied] = useState(false);

  const [gold24k, setGold24k] = useState(goldRates[0]?.perTola || 284500);
  const [gold22k, setGold22k] = useState(goldRates[1]?.perTola || 260790);
  const [silver, setSilver] = useState(silverRate?.perTola || 3350);
  const [petrol, setPetrol] = useState(fuelRates[0]?.currentPrice || 281.40);
  const [diesel, setDiesel] = useState(fuelRates[1]?.currentPrice || 285.50);
  const [usdpkr, setUsdpkr] = useState(currencies[0]?.interbankSell || 278.35);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveManualRates({
      gold24k: Number(gold24k),
      gold22k: Number(gold22k),
      silver: Number(silver),
      petrol: Number(petrol),
      diesel: Number(diesel),
      usdpkr: Number(usdpkr)
    });
    onClose();
  };

  const automationScript = `/**
 * RateZilla Pakistan - Market Rates Updater Script
 * Run with: node update_rates.mjs
 */

import fs from 'fs';

const updatedRates = {
  timestamp: new Date().toISOString(),
  gold24kTola: ${gold24k},
  gold22kTola: ${gold22k},
  silverTola: ${silver},
  petrolPrice: ${petrol},
  dieselPrice: ${diesel},
  usdPkr: ${usdpkr},
  authority: "Sarafa Association Karachi & OGRA Pakistan"
};

console.log("⚡ RateZilla Rates Updated Successfully:");
console.table(updatedRates);

// Saves to local cache or syncs with RateZilla API
fs.writeFileSync('./latest_rates.json', JSON.stringify(updatedRates, null, 2));
console.log("Saved to latest_rates.json");
`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(automationScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const data = {
      timestamp: new Date().toISOString(),
      gold24kTola: gold24k,
      gold22kTola: gold22k,
      silverTola: silver,
      petrolPrice: petrol,
      dieselPrice: diesel,
      usdPkr: usdpkr
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ratezilla_rates_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#111827] text-gray-100 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-gray-800 bg-[#0b0f19] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">RateZilla Rates Manager & Updater Script</h3>
              <p className="text-xs text-gray-400">Update live rates manually or get automation script</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-800 bg-gray-900/50">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-3 px-4 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'editor'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Manual Rates Editor</span>
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`flex-1 py-3 px-4 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'script'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Updater Script & JSON</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 max-h-[65vh] overflow-y-auto space-y-4">
          {activeTab === 'editor' ? (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                💡 <strong>Tip:</strong> Entering rates here updates the cached benchmarks instantly across all calculators (Solar, Tax, Zakat, Trip Planner, Gold Simulator).
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    24K Gold (Rs / Tola)
                  </label>
                  <input
                    type="number"
                    value={gold24k}
                    onChange={(e) => setGold24k(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-amber-400 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    22K Gold (Rs / Tola)
                  </label>
                  <input
                    type="number"
                    value={gold22k}
                    onChange={(e) => setGold22k(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Fine Silver (Rs / Tola)
                  </label>
                  <input
                    type="number"
                    value={silver}
                    onChange={(e) => setSilver(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-slate-300 font-bold focus:outline-none focus:border-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Petrol Regular (Rs / Litre)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={petrol}
                    onChange={(e) => setPetrol(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-blue-400 font-bold focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    High Speed Diesel (Rs / Litre)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={diesel}
                    onChange={(e) => setDiesel(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-blue-300 font-bold focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    USD / PKR Interbank Sell
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={usdpkr}
                    onChange={(e) => setUsdpkr(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-emerald-400 font-bold focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span>Automation Script (update_rates.mjs)</span>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadJson}
                    className="px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON</span>
                  </button>
                  <button
                    onClick={handleCopyScript}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Script'}</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {automationScript}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-[#0b0f19] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Apply Rates to App</span>
          </button>
        </div>
      </div>
    </div>
  );
};
