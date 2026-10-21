import React, { useState } from 'react';
import { Sun, Zap, BatteryCharging, ArrowRight, ShieldCheck, CheckCircle, TrendingUp, Sparkles } from 'lucide-react';
import { calculateSolarSystem } from '../services/clientCalculators.js';
import { ShareRatesButton } from './ShareRatesButton.js';

export const SolarSection: React.FC = () => {
  const [units, setUnits] = useState<number>(650);
  const [systemType, setSystemType] = useState<'on_grid' | 'hybrid' | 'off_grid'>('hybrid');
  const [batteryPreference, setBatteryPreference] = useState<'tubular' | 'lithium' | 'none'>('tubular');
  const [phase, setPhase] = useState<'single_phase' | 'three_phase'>('three_phase');

  const result = calculateSolarSystem({
    monthlyUnits: units,
    systemType,
    batteryPreference,
    phase,
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003014] via-[#05210e] to-[#0a140d] border border-emerald-500/30">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <Sun className="w-4 h-4 text-[#ffd700]" />
            <span>شمسی پینل کیلکولیٹر · Pakistan Solar Energy & Net-Metering Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Solar System Sizing, Cost & <span className="text-[#ffd700]">Payback Estimator</span>
          </h2>
          <p className="text-sm text-slate-300">
            Calculate your exact system kW capacity based on your monthly WAPDA electricity units, required 580W bifacial panels, battery backup, and net-metering ROI.
          </p>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#08170e] border border-[#00401a] rounded-2xl p-6">
        {/* Left Form: 7 cols */}
        <div className="md:col-span-7 space-y-5">
          {/* Monthly Units Slider + Number */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <label className="text-slate-300">Monthly Electricity Consumption (Units / kWh)</label>
              <span className="text-[#ffd700] font-mono text-sm font-bold">{units} Units</span>
            </div>
            <input
              type="range"
              min="100"
              max="2500"
              step="50"
              value={units}
              onChange={(e) => setUnits(parseInt(e.target.value) || 100)}
              className="w-full accent-[#ffd700] h-2 bg-[#050d08] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>100 Units (1-Phase)</span>
              <span>500 Units (Average)</span>
              <span>1000 Units (AC Season)</span>
              <span>2500 Units (Commercial)</span>
            </div>
          </div>

          {/* System Architecture Switcher */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Solar Architecture</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSystemType('on_grid')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors text-center ${
                  systemType === 'on_grid'
                    ? 'bg-[#0e2a18] border-[#ffd700] text-white'
                    : 'bg-[#050d08] border-[#00401a] text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">On-Grid</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Net-Metering (No Battery)</div>
              </button>

              <button
                type="button"
                onClick={() => setSystemType('hybrid')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors text-center ${
                  systemType === 'hybrid'
                    ? 'bg-[#0e2a18] border-[#ffd700] text-white'
                    : 'bg-[#050d08] border-[#00401a] text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Hybrid (Most Popular)</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Net-Metering + Battery</div>
              </button>

              <button
                type="button"
                onClick={() => setSystemType('off_grid')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors text-center ${
                  systemType === 'off_grid'
                    ? 'bg-[#0e2a18] border-[#ffd700] text-white'
                    : 'bg-[#050d08] border-[#00401a] text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Off-Grid</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Remote / 100% Battery</div>
              </button>
            </div>
          </div>

          {/* Phase & Net Metering */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Grid Connection Phase</label>
              <select
                value={phase}
                onChange={(e: any) => setPhase(e.target.value)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ffd700]"
              >
                <option value="three_phase">3-Phase (Eligible for Green Meter NOC)</option>
                <option value="single_phase">Single Phase (Up to 3kW to 5kW standard)</option>
              </select>
            </div>

            {systemType !== 'on_grid' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Battery Technology</label>
                <select
                  value={batteryPreference}
                  onChange={(e: any) => setBatteryPreference(e.target.value)}
                  className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ffd700]"
                >
                  <option value="tubular">Tall Tubular (Phoenix/Osaka 230Ah - Low Cost)</option>
                  <option value="lithium">LiFePO4 Lithium (10-Year Life / Fast Charge)</option>
                </select>
              </div>
            )}
          </div>

          {/* Specs Quick Strip */}
          <div className="p-3 bg-[#050d08] rounded-xl border border-emerald-900/40 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Recommended</span>
              <span className="font-mono text-base font-bold text-[#ffd700]">{result.recommendedKw} kW</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">580W Panels</span>
              <span className="font-mono text-base font-bold text-white">{result.panelsCount} Modules</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Roof Area</span>
              <span className="font-mono text-base font-bold text-white">{result.roofAreaRequiredSqFt} sq ft</span>
            </div>
          </div>
        </div>

        {/* Right Financial Dashboard: 5 cols */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#06180d] to-[#040e07] border border-[#ffd700]/30 rounded-xl p-5 space-y-4">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Total Turnkey Investment</div>
            <div className="text-3xl font-extrabold text-[#ffd700] font-mono tabular-nums mt-0.5">
              Rs. {result.costBreakdown.grandTotalPKR.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Includes Panels, Inverter, Structure & Turnkey Fitting</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-emerald-900/40 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Monthly Bill Savings:</span>
              <span className="font-mono font-bold text-emerald-400">
                Rs. {result.financialMetrics.monthlySavingsPKR.toLocaleString()}/mo
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Annual Savings:</span>
              <span className="font-mono font-bold text-white">
                Rs. {result.financialMetrics.annualSavingsPKR.toLocaleString()}/yr
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Capital Payback Period:</span>
              <span className="font-mono font-bold text-[#ffd700]">
                {result.financialMetrics.paybackYears} Years
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">25-Year Lifetime Net Profit:</span>
              <span className="font-mono font-bold text-emerald-300">
                Rs. {(result.financialMetrics.lifetime25YearSavingsPKR / 1000000).toFixed(2)} Million
              </span>
            </div>
          </div>

          {/* Itemized BOQ Collapsible / List */}
          <div className="pt-3 border-t border-emerald-900/40 space-y-1.5 text-[11px] font-mono text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">580W Tier-1 Panels:</span>
              <span>Rs. {result.costBreakdown.solarPanelsPKR.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Inverter ({result.recommendedKw}kW):</span>
              <span>Rs. {result.costBreakdown.inverterPKR.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Galvanized GI Structure:</span>
              <span>Rs. {result.costBreakdown.mountingStructurePKR.toLocaleString()}</span>
            </div>
            {result.costBreakdown.batteryPKR > 0 && (
              <div className="flex justify-between text-amber-300">
                <span className="text-slate-400">Battery Storage:</span>
                <span>Rs. {result.costBreakdown.batteryPKR.toLocaleString()}</span>
              </div>
            )}
            {result.costBreakdown.netMeteringLicensePKR > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-400">3-Phase Green Meter Fee:</span>
                <span>Rs. {result.costBreakdown.netMeteringLicensePKR.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-400">Installation & Cabling:</span>
              <span>Rs. {result.costBreakdown.turnkeyInstallationPKR.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Share Solar Rates Toolbar */}
      <div className="bg-[#051108] border border-[#00401a] p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-[#ffd700]" />
          <span className="font-semibold text-white">Share Solar Panel Rates &amp; Net-Metering Estimate:</span>
          <span className="hidden sm:inline text-slate-400">
            Share Tier-1 TopCon watt prices and installation breakdown
          </span>
        </div>
        <ShareRatesButton
          customText={`*RateZilla.pk — Pakistan Solar Panel Market Benchmarks:*
☀️ Tier-1 580W-590W N-Type Bifacial: Rs. 40.00 – 45.00 / Watt
⚡ Jinko 590W Bifacial: Rs. 23,600 – 29,338 / plate
⚡ Longi Hi-Mo X7 585W: Rs. 24,800 – 28,062 / plate
⚡ Canadian Solar TopCon 585W: Rs. 24,400 – 29,088 / plate
⚡ JA Solar 585W: Rs. 22,750 – 25,740 / plate
⚡ Trina Solar 585W: Rs. 22,750 – 24,570 / plate
Check live system sizing & ROI on RateZilla: ${window.location.origin}`}
        />
      </div>

      {/* Brand-Wise Panel Benchmark Table */}
      <div className="bg-[#08170e] border border-[#00401a] rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#ffd700]" />
              <span>Official Tier-1 Solar Panel Brand Benchmarks</span>
            </h3>
            <p className="text-xs text-slate-400">
              Wholesale distributor rates verified from Hall Road Lahore &amp; Regal Chowk Karachi
            </p>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#00401a] text-emerald-300 border border-emerald-500/20">
            A-Grade Tier-1 Warranty
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#050d08] text-slate-400 border-b border-[#00401a]">
              <tr>
                <th className="py-2.5 px-3 font-sans">Brand &amp; Technology</th>
                <th className="py-2.5 px-3">Wattage</th>
                <th className="py-2.5 px-3">Price / Watt (PKR)</th>
                <th className="py-2.5 px-3">Per Plate / Module Cost</th>
                <th className="py-2.5 px-3">Efficiency</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60 text-slate-200">
              <tr className="hover:bg-[#0c2314] transition-colors">
                <td className="py-3 px-3 font-sans font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Jinko Solar Tiger Neo (N-Type Bifacial)
                </td>
                <td className="py-3 px-3 text-[#ffd700]">590W</td>
                <td className="py-3 px-3">Rs. 40.00 – 45.00</td>
                <td className="py-3 px-3 font-bold text-white">Rs. 23,600 – 29,338</td>
                <td className="py-3 px-3 text-emerald-400">22.8%</td>
                <td className="py-3 px-3 text-emerald-400">High Demand</td>
              </tr>
              <tr className="hover:bg-[#0c2314] transition-colors">
                <td className="py-3 px-3 font-sans font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Longi Solar Hi-Mo X7 / 10X (HPBC)
                </td>
                <td className="py-3 px-3 text-[#ffd700]">585W</td>
                <td className="py-3 px-3">Rs. 42.50 – 45.00</td>
                <td className="py-3 px-3 font-bold text-white">Rs. 24,800 – 28,062</td>
                <td className="py-3 px-3 text-emerald-400">23.2%</td>
                <td className="py-3 px-3 text-emerald-400">Available</td>
              </tr>
              <tr className="hover:bg-[#0c2314] transition-colors">
                <td className="py-3 px-3 font-sans font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Canadian Solar TopBiHiKu6 (TopCon)
                </td>
                <td className="py-3 px-3 text-[#ffd700]">585W</td>
                <td className="py-3 px-3">Rs. 41.70 – 45.00</td>
                <td className="py-3 px-3 font-bold text-white">Rs. 24,400 – 29,088</td>
                <td className="py-3 px-3 text-emerald-400">22.6%</td>
                <td className="py-3 px-3 text-emerald-400">Available</td>
              </tr>
              <tr className="hover:bg-[#0c2314] transition-colors">
                <td className="py-3 px-3 font-sans font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  JA Solar DeepBlue 4.0 Pro
                </td>
                <td className="py-3 px-3 text-[#ffd700]">585W</td>
                <td className="py-3 px-3">Rs. 38.90 – 44.00</td>
                <td className="py-3 px-3 font-bold text-white">Rs. 22,750 – 25,740</td>
                <td className="py-3 px-3 text-emerald-400">22.5%</td>
                <td className="py-3 px-3 text-emerald-400">Popular Budget</td>
              </tr>
              <tr className="hover:bg-[#0c2314] transition-colors">
                <td className="py-3 px-3 font-sans font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Trina Solar Vertex N (Dual Glass)
                </td>
                <td className="py-3 px-3 text-[#ffd700]">585W</td>
                <td className="py-3 px-3">Rs. 38.90 – 42.00</td>
                <td className="py-3 px-3 font-bold text-white">Rs. 22,750 – 24,570</td>
                <td className="py-3 px-3 text-emerald-400">22.7%</td>
                <td className="py-3 px-3 text-emerald-400">Stable Stock</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
