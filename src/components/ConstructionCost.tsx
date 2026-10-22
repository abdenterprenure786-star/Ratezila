import React, { useState } from 'react';
import { Building, ArrowLeft, Layers, Hammer } from 'lucide-react';

interface ConstructionCostProps {
  onBackToHome: () => void;
}

export const ConstructionCost: React.FC<ConstructionCostProps> = ({ onBackToHome }) => {
  const [plotSize, setPlotSize] = useState<'3marla' | '5marla' | '10marla' | '1kanal'>('5marla');
  const [coveredAreaSqFt, setCoveredAreaSqFt] = useState(1950);
  const [constructionType, setConstructionType] = useState<'gray' | 'premiumTurnkey'>('premiumTurnkey');

  const plotDefaults: Record<string, number> = {
    '3marla': 1100,
    '5marla': 1950,
    '10marla': 3300,
    '1kanal': 5600
  };

  const handlePlotSelect = (val: string) => {
    setPlotSize(val as any);
    setCoveredAreaSqFt(plotDefaults[val] || 1950);
  };

  // Rates in Pakistan 2025-26
  // Gray structure: approx Rs. 2,650 / sq ft (Cement, Steel rebar 60-grade, Bricks, Sand, Plumbing, Electrical conduit)
  // Complete Turnkey Finishing: approx Rs. 4,800 / sq ft (Porcelain tiles, Solid wood doors, Granite counter, Sanitary fittings, Paints)
  const ratePerSqFt = constructionType === 'gray' ? 2650 : 4850;
  const totalCost = coveredAreaSqFt * ratePerSqFt;

  // Material estimations
  const cementBags = Math.round(coveredAreaSqFt * 0.42);
  const steelTons = (coveredAreaSqFt * 0.0038).toFixed(1);
  const bricksCount = Math.round(coveredAreaSqFt * 32);

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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase mb-2">
          <Building className="w-3.5 h-3.5" />
          <span>Pakistan BOQ Estimator</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          House Construction Cost & Material Calculator
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Accurate estimation for Cement, Steel, Bricks, and Turnkey finishing for residential plots
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Select Plot Size
            </label>
            <select
              value={plotSize}
              onChange={(e) => handlePlotSelect(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400"
            >
              <option value="3marla">3 Marla (Approx 1,100 sq ft covered)</option>
              <option value="5marla">5 Marla (Double Storey ~1,950 sq ft)</option>
              <option value="10marla">10 Marla (Double Storey ~3,300 sq ft)</option>
              <option value="1kanal">1 Kanal (Double Storey ~5,600 sq ft)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Total Covered Area (Sq Ft)
            </label>
            <input
              type="number"
              min="500"
              step="50"
              value={coveredAreaSqFt}
              onChange={(e) => setCoveredAreaSqFt(Math.max(100, Number(e.target.value)))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-teal-400 font-bold focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Construction Scope
            </label>
            <select
              value={constructionType}
              onChange={(e) => setConstructionType(e.target.value as any)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400"
            >
              <option value="gray">Gray Structure Only (~Rs 2,650/sq ft)</option>
              <option value="premiumTurnkey">Complete Turnkey with Finishing (~Rs 4,850/sq ft)</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800">
          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Estimated Total Cost</span>
            <span className="text-2xl font-extrabold text-[#00FF87] font-mono">
              Rs. {Math.round(totalCost).toLocaleString()}
            </span>
            <span className="text-[11px] text-gray-400 block mt-0.5">Rs. {ratePerSqFt.toLocaleString()} / Sq Ft</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Cement Required</span>
            <span className="text-xl font-bold text-white font-mono">
              {cementBags.toLocaleString()} Bags
            </span>
            <span className="text-[11px] text-gray-400 block mt-0.5">OPC Standard 50kg</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Deformed Steel Rebar</span>
            <span className="text-xl font-bold text-amber-400 font-mono">
              {steelTons} Tons
            </span>
            <span className="text-[11px] text-gray-400 block mt-0.5">Grade-60 Deformed</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Red Bricks (Awwal)</span>
            <span className="text-xl font-bold text-rose-400 font-mono">
              {bricksCount.toLocaleString()} Bricks
            </span>
            <span className="text-[11px] text-gray-400 block mt-0.5">Bhatta Grade A1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
