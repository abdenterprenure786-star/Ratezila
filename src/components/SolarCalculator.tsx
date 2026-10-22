import React, { useState } from 'react';
import { Sun, ArrowLeft, Zap, ShieldCheck, DollarSign, Calculator, BatteryCharging } from 'lucide-react';

interface SolarCalculatorProps {
  onBackToHome: () => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onBackToHome }) => {
  const [monthlyUnits, setMonthlyUnits] = useState(650);
  const [panelRatePerWatt, setPanelRatePerWatt] = useState(41.50); // Tier-1 Bifacial TopCon
  const [systemType, setSystemType] = useState<'ongrid' | 'hybrid'>('ongrid');

  // Calculation logic
  // In Pakistan, 1 KW solar generates approx 120-135 units per month
  const rawKwNeeded = monthlyUnits / 125;
  const recommendedKw = Math.max(3, Math.ceil(rawKwNeeded));
  const panelWattage = 580; // 580W Bifacial panels standard
  const numberOfPanels = Math.ceil((recommendedKw * 1000) / panelWattage);
  const totalPanelCost = recommendedKw * 1000 * panelRatePerWatt;

  // Inverter, mounting structures, AC/DC distribution boxes, earthing & cabling
  const inverterCost = systemType === 'ongrid' ? recommendedKw * 28000 : recommendedKw * 48000;
  const structureAndWiring = recommendedKw * 22000;
  const netMeteringLicensing = 145000; // NEPRA green meter fee + NOC

  const totalEstimatedCost = totalPanelCost + inverterCost + structureAndWiring + (systemType === 'ongrid' ? netMeteringLicensing : 80000);

  // Financial ROI
  // Average unit rate in Pakistan (unprotected slab + taxes + FPA) is approx Rs. 58/unit
  const avgUnitRate = 58;
  const monthlySavings = Math.min(monthlyUnits, recommendedKw * 125) * avgUnitRate;
  const annualSavings = monthlySavings * 12;
  const paybackYears = (totalEstimatedCost / annualSavings).toFixed(1);

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
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase mb-2">
          <Sun className="w-3.5 h-3.5" />
          <span>Tier-1 TopCon & Bifacial Rates</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Solar System Sizing & Net-Metering ROI Calculator
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Calculate your exact solar KW capacity, 580W panel count, and payback timeline for Pakistan
        </p>
      </div>

      {/* Configuration Controls */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Monthly Consumption (Units / KWh)
            </label>
            <input
              type="number"
              min="100"
              step="50"
              value={monthlyUnits}
              onChange={(e) => setMonthlyUnits(Math.max(100, Number(e.target.value)))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-yellow-400 font-bold focus:outline-none focus:border-yellow-400"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">Check your peak summer WAPDA/KE bill</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Solar Panel Price (Rs / Watt)
            </label>
            <input
              type="number"
              step="0.5"
              value={panelRatePerWatt}
              onChange={(e) => setPanelRatePerWatt(Math.max(20, Number(e.target.value)))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-yellow-400 font-bold focus:outline-none focus:border-yellow-400"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">Current Pakistan Tier-1 market rate: ~Rs 40-43/W</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              System Architecture
            </label>
            <select
              value={systemType}
              onChange={(e) => setSystemType(e.target.value as any)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
            >
              <option value="ongrid">On-Grid with Net-Metering (Zero Loadshedding)</option>
              <option value="hybrid">Hybrid with Lithium Battery Storage Backup</option>
            </select>
            <span className="text-[11px] text-gray-400 mt-1 block">On-Grid exports daytime units to WAPDA</span>
          </div>
        </div>

        {/* Results Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800">
          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Recommended System</span>
            <span className="text-2xl font-extrabold text-yellow-400 font-mono">
              {recommendedKw} KW
            </span>
            <span className="text-[11px] text-gray-400 block mt-1">Generates ~{recommendedKw * 125} Units/mo</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">580W Bifacial Panels</span>
            <span className="text-2xl font-extrabold text-white font-mono">
              {numberOfPanels} Panels
            </span>
            <span className="text-[11px] text-gray-400 block mt-1">Tier-1 N-Type TopCon</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Total Turnkey Cost</span>
            <span className="text-2xl font-extrabold text-[#00FF87] font-mono">
              Rs. {Math.round(totalEstimatedCost).toLocaleString()}
            </span>
            <span className="text-[11px] text-gray-400 block mt-1">Panels, Inverter & Structure</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Payback Period</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              {paybackYears} Years
            </span>
            <span className="text-[11px] text-gray-400 block mt-1">Annual savings: Rs {Math.round(annualSavings).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
