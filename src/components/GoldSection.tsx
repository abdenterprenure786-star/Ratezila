import React, { useState } from 'react';
import {
  TrendingUp,
  Coins,
  Scale,
  Sparkles,
  Calculator,
  ArrowUpRight,
  Info,
  CheckCircle2,
  DollarSign,
  Percent,
  Bell,
} from 'lucide-react';
import { GoldRateItem, CityGoldRate, HistoricalPricePoint } from '../types/market.js';
import { calculateGoldSimulator } from '../services/clientCalculators.js';
import { ShareRatesButton } from './ShareRatesButton.js';

interface GoldSectionProps {
  rates: GoldRateItem[];
  silverRate: { perTola: number; per10Gram: number; perGram: number; change24h: number };
  cityRates: CityGoldRate[];
  history: HistoricalPricePoint[];
  onOpenAlerts?: () => void;
  onBackToHome?: () => void;
}

export const GoldSection: React.FC<GoldSectionProps> = ({
  rates,
  silverRate,
  cityRates,
  history,
  onOpenAlerts,
}) => {
  // Chart state with crosshair lock
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(history.length - 1);
  const activePoint = history[selectedPointIndex] || history[history.length - 1];

  // Gold Simulator State
  const [weight, setWeight] = useState<number>(1);
  const [unit, setUnit] = useState<'tola' | 'gram' | 'masha' | 'ratti'>('tola');
  const [carat, setCarat] = useState<'24K' | '22K' | '21K' | '18K'>('22K');
  const [stoneWeight, setStoneWeight] = useState<number>(0);
  const [makingChargesType, setMakingChargesType] = useState<'perGram' | 'percentage' | 'fixed'>('perGram');
  const [makingChargesValue, setMakingChargesValue] = useState<number>(1500);
  const [katotiPercentage, setKatotiPercentage] = useState<number>(3.5);
  const [tradeAction, setTradeAction] = useState<'buy' | 'sell'>('buy');
  const [purchasePricePerTola, setPurchasePricePerTola] = useState<number>(245000);

  // Calculate live results via client engine
  const simResult = calculateGoldSimulator({
    weight,
    unit,
    carat,
    stoneWeightGrams: stoneWeight,
    makingChargesType,
    makingChargesValue,
    katotiPercentage,
    action: tradeAction,
    purchasePricePerTola,
  });

  // Calculate 7-day delta
  const initialPoint = history[0];
  const finalPoint = history[history.length - 1];
  const sevenDayDelta = finalPoint ? finalPoint.gold24kTola - initialPoint.gold24kTola : 4300;
  const sevenDayPercent = ((sevenDayDelta / initialPoint.gold24kTola) * 100).toFixed(2);

  // SVG Chart path calculation
  const minPrice = Math.min(...history.map((h) => h.gold24kTola)) - 1000;
  const maxPrice = Math.max(...history.map((h) => h.gold24kTola)) + 1000;
  const chartHeight = 160;
  const chartWidth = 540;

  const points = history.map((h, i) => {
    const x = (i / (history.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - 20 - ((h.gold24kTola - minPrice) / (maxPrice - minPrice)) * (chartHeight - 40);
    return { x, y, ...h };
  });

  const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - 10} L ${points[0].x} ${chartHeight - 10} Z`;

  return (
    <div className="space-y-8">
      {/* Hero Strip with Vault Photography & Key Rates */}
      <div className="relative rounded-2xl overflow-hidden border border-[#ffd700]/20 bg-gradient-to-r from-[#00240e] via-[#051a0c] to-[#0a120c]">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img
            src="/src/assets/images/gold_market_vault_1792513322078.jpg"
            alt="Sarafa Gold Bullion Vault"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
              <Coins className="w-4 h-4" />
              <span>All Pakistan Sarafa Jewellers Association (APSJA)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sarafa Gold Market <span className="text-[#ffd700]">Benchmark Rates</span>
            </h1>
            <p className="text-sm text-slate-300">
              Live spot rates updated directly from Karachi, Lahore, and Islamabad bullion markets with 24K, 22K, 21K, and 18K purities.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#050d08]/80 backdrop-blur-md p-4 rounded-xl border border-[#ffd700]/30 shadow-xl">
            <div>
              <div className="text-xs text-slate-400 font-medium">Spot 24K (Pure Gold / Tola)</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#ffd700] font-mono tabular-nums">
                Rs. {rates[0]?.perTola.toLocaleString() || '284,500'}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+Rs. {rates[0]?.change24h || 1200} today</span>
                <span className="text-slate-500 font-normal">· 11.664g</span>
              </div>
              {onOpenAlerts && (
                <button
                  type="button"
                  onClick={onOpenAlerts}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#00401a] hover:bg-[#005724] border border-[#ffd700]/30 rounded-lg text-xs font-semibold text-[#ffd700] transition-colors"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Set Price Drop Alert</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Rates Grid: 24K, 22K, 21K, 18K & Silver */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rates.map((item) => (
          <div
            key={item.carat}
            className={`p-5 rounded-xl border transition-all ${
              item.carat.startsWith('24K')
                ? 'bg-gradient-to-b from-[#0b2414] to-[#06140b] border-[#ffd700]/40 shadow-lg shadow-[#ffd700]/5'
                : 'bg-[#08170e] border-[#00401a]/50 hover:border-[#ffd700]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ffd700]">
                {item.carat}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#00401a]/80 text-emerald-300 border border-emerald-500/20">
                {(item.purity * 100).toFixed(1)}% Purity
              </span>
            </div>

            <div className="mt-3">
              <div className="text-[11px] text-slate-400 font-medium">Per 1 Tola (11.664g)</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                Rs. {item.perTola.toLocaleString()}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-emerald-900/30 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Per 10 Grams</span>
                <span className="font-mono text-slate-200 font-semibold tabular-nums">
                  Rs. {item.per10Gram.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Per 1 Gram</span>
                <span className="font-mono text-slate-200 font-semibold tabular-nums">
                  Rs. {item.perGram.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Silver Chandi Banner */}
      <div className="bg-[#0a1710] border border-slate-700/50 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-200 font-bold">
            Ag
          </div>
          <div>
            <div className="text-sm font-bold text-white">Chandi (Fine Silver / چاندی) Live Rate</div>
            <div className="text-xs text-slate-400">99.9% Pure Silver Bullion Benchmark</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <span className="text-xs text-slate-400 block">Per Tola</span>
            <span className="text-lg font-bold text-slate-200 font-mono tabular-nums">
              Rs. {silverRate.perTola.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Per 10 Grams</span>
            <span className="text-lg font-bold text-slate-200 font-mono tabular-nums">
              Rs. {silverRate.per10Gram.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">24h Change</span>
            <span className="text-emerald-400 text-sm font-mono font-semibold">
              +Rs. {silverRate.change24h}
            </span>
          </div>
        </div>
      </div>

      {/* Share Gold & Silver Rates Toolbar */}
      <div className="bg-[#051108] border border-[#00401a] p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-[#ffd700]" />
          <span className="font-semibold text-white">Share Today&apos;s Sarafa Gold &amp; Silver Rates:</span>
          <span className="hidden sm:inline text-slate-400">
            Instant formatted broadcast for WhatsApp, SMS, or jewelers
          </span>
        </div>
        <ShareRatesButton
          gold24kTola={rates[0]?.perTola}
          gold22kTola={rates[1]?.perTola}
          silverTola={silverRate.perTola}
        />
      </div>

      {/* 2-Column Split: 7-Day Price Trend Chart with Crosshair Lock + City-wise Sarafa Association Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 7-Day Interactive SVG Chart */}
        <div className="lg:col-span-7 bg-[#08170e] border border-[#00401a]/60 rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#ffd700]" />
                <h3 className="text-base font-bold text-white">7-Day Gold 24K Trend Chart</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Hover or click along points to inspect daily closing prices and market movements.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                +Rs. {sevenDayDelta.toLocaleString()} (+{sevenDayPercent}%)
              </span>
            </div>
          </div>

          {/* Crosshair readout box */}
          <div className="bg-[#050d08] p-3 rounded-lg border border-[#00401a] flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Selected Date: <strong className="text-white">{activePoint.date}</strong>
            </span>
            <span className="text-slate-400">
              24K Gold Rate: <strong className="text-[#ffd700] font-mono text-sm">Rs. {activePoint.gold24kTola.toLocaleString()}</strong>
            </span>
            <span className="text-slate-400">
              USD/PKR: <strong className="text-slate-200 font-mono">Rs. {activePoint.usdPkr}</strong>
            </span>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="relative w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-44 select-none"
            >
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffd700" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ffd700" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="20" x2={chartWidth - 20} y2="20" stroke="#0f2918" strokeDasharray="3 3" />
              <line x1="20" y1={chartHeight / 2} x2={chartWidth - 20} y2={chartHeight / 2} stroke="#0f2918" strokeDasharray="3 3" />
              <line x1="20" y1={chartHeight - 20} x2={chartWidth - 20} y2={chartHeight - 20} stroke="#0f2918" strokeDasharray="3 3" />

              {/* Area Fill */}
              <path d={areaD} fill="url(#goldGradient)" />

              {/* Main Line */}
              <path d={pathD} fill="none" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Vertical Crosshair Line */}
              {points[selectedPointIndex] && (
                <line
                  x1={points[selectedPointIndex].x}
                  y1="10"
                  x2={points[selectedPointIndex].x}
                  y2={chartHeight - 20}
                  stroke="#ffd700"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}

              {/* Interactive Dots */}
              {points.map((p, i) => (
                <g
                  key={i}
                  className="cursor-pointer"
                  onClick={() => setSelectedPointIndex(i)}
                  onMouseEnter={() => setSelectedPointIndex(i)}
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={i === selectedPointIndex ? 6 : 4}
                    fill={i === selectedPointIndex ? '#ffd700' : '#0a1f12'}
                    stroke="#ffd700"
                    strokeWidth="2"
                    className="transition-all"
                  />
                  <text
                    x={p.x}
                    y={chartHeight - 4}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                    fontFamily="JetBrains Mono"
                  >
                    {p.date}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* City-wise Sarafa Association Table */}
        <div className="lg:col-span-5 bg-[#08170e] border border-[#00401a]/60 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">City Sarafa Association Rates</h3>
            <span className="text-[11px] text-slate-400 font-mono">Benchmark: Karachi</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#00401a] text-slate-400">
                  <th className="py-2.5 font-medium">City / Association</th>
                  <th className="py-2.5 font-medium text-right">24K Tola</th>
                  <th className="py-2.5 font-medium text-right">22K Tola</th>
                  <th className="py-2.5 font-medium text-right">Diff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#00401a]/40 font-mono">
                {cityRates.map((c) => (
                  <tr key={c.city} className="hover:bg-[#0c2316]/60 transition-colors">
                    <td className="py-2 text-slate-200 font-sans font-medium">
                      {c.city}
                      <span className="block text-[10px] text-slate-500 font-sans truncate max-w-[140px]">
                        {c.association}
                      </span>
                    </td>
                    <td className="py-2 text-right text-white font-bold tabular-nums">
                      Rs. {c.tola24k.toLocaleString()}
                    </td>
                    <td className="py-2 text-right text-slate-300 tabular-nums">
                      Rs. {c.tola22k.toLocaleString()}
                    </td>
                    <td className="py-2 text-right text-emerald-400 tabular-nums">
                      {c.diffFromKarachi === 0 ? 'Base' : `+Rs. ${c.diffFromKarachi}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Gold Trade & Jeweller Profit Simulator */}
      <div className="bg-[#08170e] border border-[#00401a] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#00401a] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>Sarafa Precision Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Gold Trade, Jewellery Making & Profit Simulator
            </h2>
            <p className="text-xs text-slate-400">
              Calculate exact net gold purity, deduce gemstones weight, factor in Katoti (wastage), Jeweller making charges, and calculate Nisab Zakat.
            </p>
          </div>

          {/* Action Switcher: Buy Jewellery vs Sell Jewellery */}
          <div className="flex items-center p-1 bg-[#050d08] rounded-lg border border-[#00401a]">
            <button
              onClick={() => setTradeAction('buy')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                tradeAction === 'buy'
                  ? 'bg-gradient-to-r from-[#ffd700] to-[#e6c200] text-[#050d08] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Buying from Jeweller
            </button>
            <button
              onClick={() => setTradeAction('sell')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                tradeAction === 'sell'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Selling to Jeweller (Katoti)
            </button>
          </div>
        </div>

        {/* Inputs Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Weight & Unit */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Total Gross Weight</label>
            <div className="flex rounded-lg overflow-hidden border border-[#00401a] focus-within:border-[#ffd700]">
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050d08] px-3 py-2 text-sm text-white font-mono outline-none"
              />
              <select
                value={unit}
                onChange={(e: any) => setUnit(e.target.value)}
                className="bg-[#0b1f13] text-xs text-emerald-300 px-2.5 py-2 font-medium outline-none border-l border-[#00401a]"
              >
                <option value="tola">Tola (11.664g)</option>
                <option value="gram">Grams</option>
                <option value="masha">Masha (0.972g)</option>
                <option value="ratti">Ratti (0.1215g)</option>
              </select>
            </div>
          </div>

          {/* Carat Purity */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Carat Standard (Purity)</label>
            <select
              value={carat}
              onChange={(e: any) => setCarat(e.target.value)}
              className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#ffd700]"
            >
              <option value="24K">24 Karat (99.9% Pure Gold)</option>
              <option value="22K">22 Karat (91.6% Hallmark 916)</option>
              <option value="21K">21 Karat (87.5% Traditional)</option>
              <option value="18K">18 Karat (75.0% Diamond Setting)</option>
            </select>
          </div>

          {/* Stone / Gem Deduction */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Gemstone / Beads Weight (Grams)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={stoneWeight}
              onChange={(e) => setStoneWeight(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-sm text-white font-mono outline-none focus:border-[#ffd700]"
              placeholder="0.00"
            />
          </div>

          {/* If Buying: Making Charges; If Selling: Katoti % */}
          {tradeAction === 'buy' ? (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Making Charges (بنائی / واسطہ)
              </label>
              <div className="flex rounded-lg overflow-hidden border border-[#00401a] focus-within:border-[#ffd700]">
                <input
                  type="number"
                  min="0"
                  value={makingChargesValue}
                  onChange={(e) => setMakingChargesValue(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#050d08] px-3 py-2 text-sm text-white font-mono outline-none"
                />
                <select
                  value={makingChargesType}
                  onChange={(e: any) => setMakingChargesType(e.target.value)}
                  className="bg-[#0b1f13] text-xs text-emerald-300 px-2 py-2 outline-none border-l border-[#00401a]"
                >
                  <option value="perGram">PKR / Gram</option>
                  <option value="percentage">% of Gold</option>
                  <option value="fixed">Fixed PKR</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Katoti / Wastage Deduction (کاست فیصد)
              </label>
              <div className="flex items-center rounded-lg border border-[#00401a] bg-[#050d08] px-3 py-2 focus-within:border-[#ffd700]">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="20"
                  value={katotiPercentage}
                  onChange={(e) => setKatotiPercentage(parseFloat(e.target.value) || 0)}
                  className="w-full bg-transparent text-sm text-white font-mono outline-none"
                />
                <span className="text-slate-400 text-xs">%</span>
              </div>
            </div>
          )}
        </div>

        {/* Purchase Price Input for Trade Profit / ROI Simulator */}
        <div className="p-4 bg-[#050d08] rounded-xl border border-[#00401a] flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#ffd700]" />
              Historical Purchase Price (For Trade Profit & ROI Calculation)
            </span>
            <p className="text-[11px] text-slate-400">
              Enter your historical purchase rate per tola to compare capital appreciation against current market value.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Bought @ Rs/Tola:</span>
            <input
              type="number"
              step="1000"
              value={purchasePricePerTola}
              onChange={(e) => setPurchasePricePerTola(parseFloat(e.target.value) || 0)}
              className="w-36 bg-[#0b1f13] border border-[#00401a] rounded px-2.5 py-1 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
            />
          </div>
        </div>

        {/* Calculation Output Box */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-[#05140b] to-[#040e07] border border-[#ffd700]/30 shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-900/40 pb-4">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">
                {tradeAction === 'buy' ? 'Estimated Total Purchase Price' : 'Estimated Net Cash Payout'}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#ffd700] font-mono tabular-nums mt-1">
                Rs. {simResult.finalEstimatedPrice.toLocaleString()}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <div className="p-2.5 bg-[#081a0e] rounded-lg border border-[#00401a]">
                <span className="text-slate-400 block text-[10px]">Net Pure Gold Weight</span>
                <span className="text-white font-bold">{simResult.netGoldWeightGrams} g ({simResult.netWeightTola} Tola)</span>
              </div>
              <div className="p-2.5 bg-[#081a0e] rounded-lg border border-[#00401a]">
                <span className="text-slate-400 block text-[10px]">Pure 24K Equivalent</span>
                <span className="text-white font-bold">{simResult.pureGoldEquivalentGrams} g</span>
              </div>
              {tradeAction === 'buy' ? (
                <div className="p-2.5 bg-[#081a0e] rounded-lg border border-[#00401a]">
                  <span className="text-slate-400 block text-[10px]">Making Charges (Wasta)</span>
                  <span className="text-amber-300 font-bold">Rs. {simResult.makingCharges.toLocaleString()}</span>
                </div>
              ) : (
                <div className="p-2.5 bg-[#081a0e] rounded-lg border border-[#00401a]">
                  <span className="text-slate-400 block text-[10px]">Katoti Deducted ({katotiPercentage}%)</span>
                  <span className="text-rose-400 font-bold">-Rs. {simResult.katotiDeduction.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Trade Profit & ROI Analysis */}
          {simResult.tradeProfit && (
            <div className="p-4 rounded-lg bg-[#07170c] border border-emerald-900/50 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Investment Profit / Capital Gain</span>
                <span className={`text-base font-bold font-mono ${simResult.tradeProfit.isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {simResult.tradeProfit.isProfitable ? '+' : ''}Rs. {simResult.tradeProfit.profitLoss.toLocaleString()}
                  <span className="text-xs ml-2 font-normal">
                    ({simResult.tradeProfit.roiPercent > 0 ? '+' : ''}{simResult.tradeProfit.roiPercent}% ROI)
                  </span>
                </span>
              </div>
              <div className="text-slate-400 text-right">
                <div>Historical Cost: <span className="text-slate-200 font-mono">Rs. {simResult.tradeProfit.historicalTotalCost.toLocaleString()}</span></div>
                <div>Current Market Value: <span className="text-slate-200 font-mono">Rs. {simResult.tradeProfit.currentMarketWorth.toLocaleString()}</span></div>
              </div>
            </div>
          )}

          {/* Zakat Assessment for this Gold */}
          <div className="p-3.5 rounded-lg bg-[#06120a] border border-[#00401a] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">
                {simResult.zakatAssessment.explanation}
              </span>
            </div>
            {simResult.zakatAssessment.meetsNisabThreshold && (
              <span className="font-mono text-[#ffd700] font-bold shrink-0">
                Annual Zakat: Rs. {simResult.zakatAssessment.zakatPayablePKR.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
