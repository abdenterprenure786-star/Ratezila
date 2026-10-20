import React, { useState } from 'react';
import { Home, Hammer, Building2, Layers, CheckCircle2, DollarSign } from 'lucide-react';
import { calculateConstructionCost } from '../services/clientCalculators.js';

export const ConstructionSection: React.FC = () => {
  const [plotSize, setPlotSize] = useState<'3marla' | '5marla' | '10marla' | '1kanal' | 'custom'>('5marla');
  const [storeys, setStoreys] = useState<number>(2);
  const [coveredAreaSqFt, setCoveredAreaSqFt] = useState<number>(1950);
  const [finishQuality, setFinishQuality] = useState<'grey' | 'standard_a' | 'premium_plus' | 'luxury'>('standard_a');
  const [city, setCity] = useState<'Lahore' | 'Karachi' | 'Islamabad' | 'Rawalpindi' | 'Faisalabad' | 'Peshawar'>('Lahore');

  const handlePlotChange = (pSize: any) => {
    setPlotSize(pSize);
    if (pSize === '3marla') {
      setCoveredAreaSqFt(675 * storeys);
    } else if (pSize === '5marla') {
      setCoveredAreaSqFt(975 * storeys);
    } else if (pSize === '10marla') {
      setCoveredAreaSqFt(1650 * storeys);
    } else if (pSize === '1kanal') {
      setCoveredAreaSqFt(2600 * storeys);
    }
  };

  const handleStoreysChange = (num: number) => {
    setStoreys(num);
    const basePerFloor =
      plotSize === '3marla' ? 675 : plotSize === '5marla' ? 975 : plotSize === '10marla' ? 1650 : plotSize === '1kanal' ? 2600 : Math.round(coveredAreaSqFt / storeys);
    setCoveredAreaSqFt(basePerFloor * num);
  };

  const costResult = calculateConstructionCost({
    plotSize,
    coveredAreaSqFt,
    finishQuality,
    city,
  });

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003816] via-[#05210f] to-[#07130a] border border-[#00401a]">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#ffd700]" />
            <span>Pakistan Real Estate & Civil Engineering BOQ Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            House Construction Cost & <span className="text-[#ffd700]">Material Estimator</span>
          </h2>
          <p className="text-sm text-slate-300">
            Calculate your house construction budget, Grey Structure vs Turnkey finishing costs, bricks quantity, cement bags, Grade-60 steel sarya tons, and labour charges in Pakistan.
          </p>
        </div>
      </div>

      {/* Main Form & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs: 7 Cols */}
        <div className="lg:col-span-7 bg-[#08170e] border border-[#00401a] rounded-2xl p-6 space-y-5">
          {/* Plot Size Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Plot Dimension</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: '3marla', label: '3 Marla' },
                { id: '5marla', label: '5 Marla' },
                { id: '10marla', label: '10 Marla' },
                { id: '1kanal', label: '1 Kanal' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePlotChange(p.id)}
                  className={`p-2.5 rounded-lg border text-xs font-bold transition-colors ${
                    plotSize === p.id
                      ? 'bg-[#00401a] border-[#ffd700] text-white shadow-md'
                      : 'bg-[#050d08] border-[#00401a] text-slate-400 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Storeys & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Number of Storeys</label>
              <select
                value={storeys}
                onChange={(e) => handleStoreysChange(parseInt(e.target.value) || 1)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ffd700]"
              >
                <option value={1}>Single Storey (Ground Floor only)</option>
                <option value={2}>Double Storey (Ground + 1st Floor)</option>
                <option value={3}>Triple Storey (Ground + 1st + 2nd)</option>
                <option value={4}>4 Storeys (Basement + 3 Floors)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Construction City</label>
              <select
                value={city}
                onChange={(e: any) => setCity(e.target.value)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ffd700]"
              >
                <option value="Lahore">Lahore (Central Punjab)</option>
                <option value="Islamabad">Islamabad / Rawalpindi (Capital)</option>
                <option value="Karachi">Karachi (Sindh)</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Peshawar">Peshawar</option>
              </select>
            </div>
          </div>

          {/* Covered Area Sq Ft */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <label className="text-slate-300">Total Covered Area (Square Feet)</label>
              <span className="font-mono text-[#ffd700] font-bold">{coveredAreaSqFt} sq ft</span>
            </div>
            <input
              type="number"
              min="200"
              max="20000"
              value={coveredAreaSqFt}
              onChange={(e) => setCoveredAreaSqFt(parseInt(e.target.value) || 500)}
              className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
            />
          </div>

          {/* Finish Quality */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Finishing Standard</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFinishQuality('grey')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  finishQuality === 'grey'
                    ? 'bg-[#0e2a18] border-[#ffd700] text-white'
                    : 'bg-[#050d08] border-[#00401a] text-slate-400'
                }`}
              >
                <div className="font-bold">Grey Structure Only</div>
                <div className="text-[10px] text-slate-400">Foundation, Slabs, Bricks & Plaster</div>
              </button>

              <button
                type="button"
                onClick={() => setFinishQuality('standard_a')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  finishQuality === 'standard_a'
                    ? 'bg-[#0e2a18] border-[#ffd700] text-white'
                    : 'bg-[#050d08] border-[#00401a] text-slate-400'
                }`}
              >
                <div className="font-bold">Standard A-Quality</div>
                <div className="text-[10px] text-slate-400">Complete with Tiles, Wood & Sanitary</div>
              </button>

              <button
                type="button"
                onClick={() => setFinishQuality('premium_plus')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  finishQuality === 'premium_plus'
                    ? 'bg-[#0e2a18] border-[#ffd700] text-white'
                    : 'bg-[#050d08] border-[#00401a] text-slate-400'
                }`}
              >
                <div className="font-bold">Premium A+ Executive</div>
                <div className="text-[10px] text-slate-400">Spanish Tiles, Ash Wood & Concealed DB</div>
              </button>

              <button
                type="button"
                onClick={() => setFinishQuality('luxury')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  finishQuality === 'luxury'
                    ? 'bg-[#0e2a18] border-[#ffd700] text-white'
                    : 'bg-[#050d08] border-[#00401a] text-slate-400'
                }`}
              >
                <div className="font-bold">Luxury Designer</div>
                <div className="text-[10px] text-slate-400">Italian Marble, Smart Automation & Glass</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Output: 5 Cols */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#06180d] to-[#040e07] border border-[#ffd700]/30 rounded-2xl p-6 space-y-5">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Total Estimated Construction Cost</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#ffd700] font-mono tabular-nums mt-1">
              Rs. {costResult.totalEstimatedCostPKR.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-400 mt-1 font-mono">
              Estimated Rate: <strong className="text-white">Rs. {costResult.ratePerSqFt.toLocaleString()}</strong> / Sq Ft ({city})
            </div>
          </div>

          {/* Bill of Quantities (BOQ) */}
          <div className="space-y-2 pt-3 border-t border-emerald-900/40 text-xs font-mono text-slate-300">
            <div className="text-[11px] font-bold text-white font-sans uppercase tracking-wider mb-2">
              Itemized Bill of Quantities (BOQ):
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">
                Bricks ({costResult.itemizedBOQ.bricks.count.toLocaleString()} pcs @ Rs. 14):
              </span>
              <span>Rs. {costResult.itemizedBOQ.bricks.totalPKR.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">
                Cement ({costResult.itemizedBOQ.cement.bags.toLocaleString()} Bags @ Rs. 1,420):
              </span>
              <span>Rs. {costResult.itemizedBOQ.cement.totalPKR.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">
                Steel Grade-60 ({costResult.itemizedBOQ.steel.tons} Tons):
              </span>
              <span>Rs. {costResult.itemizedBOQ.steel.totalPKR.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">Sand & Bajri (Chenab / Margalla):</span>
              <span>Rs. {costResult.itemizedBOQ.sandAndCrush.totalPKR.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">Labour Contractor Charges:</span>
              <span>Rs. {costResult.itemizedBOQ.labour.totalPKR.toLocaleString()}</span>
            </div>
            {costResult.itemizedBOQ.finishingAndFittings.totalPKR > 0 && (
              <div className="flex justify-between text-amber-300 pt-1 border-t border-[#00401a]">
                <span className="font-sans">Finishing (Tiles, Wood, Paint, Sanitary):</span>
                <span>Rs. {costResult.itemizedBOQ.finishingAndFittings.totalPKR.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
