import React, { useState } from 'react';
import { Moon, Heart, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { calculateZakat } from '../services/clientCalculators.js';

export const ZakatSection: React.FC = () => {
  const [nisabStandard, setNisabStandard] = useState<'silver' | 'gold'>('silver');
  const [cash, setCash] = useState<number>(350000);
  const [goldVal, setGoldVal] = useState<number>(500000);
  const [silverVal, setSilverVal] = useState<number>(0);
  const [stock, setStock] = useState<number>(200000);
  const [investments, setInvestments] = useState<number>(100000);
  const [receivables, setReceivables] = useState<number>(50000);
  const [liabilities, setLiabilities] = useState<number>(80000);

  const zakatResult = calculateZakat({
    nisabStandard,
    cashInHandAndBank: cash,
    goldValuePKR: goldVal,
    silverValuePKR: silverVal,
    tradeStockValue: stock,
    sharesMutualFunds: investments,
    receivableDebts: receivables,
    liabilitiesDueNow: liabilities,
  });

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003816] via-[#05210f] to-[#07130a] border border-[#ffd700]/30">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <Moon className="w-4 h-4 text-[#ffd700]" />
            <span>زکوٰۃ کیلکولیٹر · Live Sarafa Nisab Benchmark</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Automated Zakat Calculator <span className="text-[#ffd700]">(2.5% Rate)</span>
          </h2>
          <p className="text-sm text-slate-300">
            Calculate your obligatory Zakat on cash, gold jewellery, business inventory, and shares with live Gold (7.5 Tola) and Silver (52.5 Tola) Nisab thresholds.
          </p>
        </div>
      </div>

      {/* Nisab Threshold Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => setNisabStandard('silver')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            nisabStandard === 'silver'
              ? 'bg-[#0c2415] border-[#ffd700] shadow-md shadow-[#ffd700]/10'
              : 'bg-[#08170e] border-[#00401a] hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">Silver Nisab Standard (Recommended for Mixed Wealth)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">
              52.5 Tola (612.36g)
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-[#ffd700] mt-2 tabular-nums">
            Rs. {zakatResult.silverNisabPKR.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Preferred by modern scholars (Hanafi, Shafi, Maliki) when wealth consists of mixed cash, gold, and trade inventory.
          </p>
        </div>

        <div
          onClick={() => setNisabStandard('gold')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            nisabStandard === 'gold'
              ? 'bg-[#0c2415] border-[#ffd700] shadow-md shadow-[#ffd700]/10'
              : 'bg-[#08170e] border-[#00401a] hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">Gold Nisab Standard (Only Pure Gold Holding)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300">
              7.5 Tola (87.48g)
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-[#ffd700] mt-2 tabular-nums">
            Rs. {zakatResult.goldNisabPKR.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Applied strictly when a person possesses only gold and no other tradeable cash, silver, or business stock.
          </p>
        </div>
      </div>

      {/* Inputs Form & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs: 7 Cols */}
        <div className="lg:col-span-7 bg-[#08170e] border border-[#00401a] rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#00401a] pb-2">
            1. Zakatable Assets (اموالِ زکوٰۃ)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Cash in Hand & Bank Accounts</label>
              <input
                type="number"
                min="0"
                value={cash}
                onChange={(e) => setCash(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Gold Jewellery & Bullion Value (PKR)</label>
              <input
                type="number"
                min="0"
                value={goldVal}
                onChange={(e) => setGoldVal(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Silver Value (PKR)</label>
              <input
                type="number"
                min="0"
                value={silverVal}
                onChange={(e) => setSilverVal(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Business / Trade Merchandise Stock</label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Shares, Mutual Funds & Sukuk</label>
              <input
                type="number"
                min="0"
                value={investments}
                onChange={(e) => setInvestments(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Recoverable Debts (Loans Given)</label>
              <input
                type="number"
                min="0"
                value={receivables}
                onChange={(e) => setReceivables(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
              />
            </div>
          </div>

          <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider border-b border-[#00401a] pb-2 pt-3">
            2. Deductible Immediate Liabilities (واجب الادا قرضہ جات)
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Immediate Debts, Pending Bills & Salaries Due Now
            </label>
            <input
              type="number"
              min="0"
              value={liabilities}
              onChange={(e) => setLiabilities(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
            />
          </div>
        </div>

        {/* Right Output: 5 Cols */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#06180d] to-[#040e07] border border-[#ffd700]/30 rounded-2xl p-6 space-y-5">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Total Obligatory Zakat Due</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#ffd700] font-mono tabular-nums mt-1">
              Rs. {zakatResult.zakatPayablePKR.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-400 mt-1">
              Status: <strong className="text-white">{zakatResult.isEligibleToPay ? 'Zakat is Obligatory (صاحبِ نصاب)' : 'Below Nisab (معاف)'}</strong>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-emerald-900/40 text-xs font-mono text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Gross Assets:</span>
              <span>Rs. {zakatResult.totalZakatableAssets.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-rose-400">
              <span>Less Liabilities:</span>
              <span>-Rs. {zakatResult.deductibleLiabilities.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-white border-t border-[#00401a] pt-1">
              <span>Net Zakatable Wealth:</span>
              <span className="text-[#ffd700]">Rs. {zakatResult.netZakatableWealth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Nisab Threshold ({zakatResult.nisabStandard.toUpperCase()}):</span>
              <span>Rs. {zakatResult.activeNisabThresholdPKR.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#071a0f] border border-emerald-800/40 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{zakatResult.guidance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
