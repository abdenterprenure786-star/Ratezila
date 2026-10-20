import React, { useState } from 'react';
import { Briefcase, DollarSign, ShieldAlert, CheckCircle, Percent, HelpCircle } from 'lucide-react';
import { calculateFBRTax } from '../services/clientCalculators.js';

export const TaxSection: React.FC = () => {
  const [employmentType, setEmploymentType] = useState<'salaried' | 'business'>('salaried');
  const [incomePeriod, setIncomePeriod] = useState<'monthly' | 'annual'>('monthly');
  const [incomeAmount, setIncomeAmount] = useState<number>(250000);

  const taxResult = calculateFBRTax({
    employmentType,
    incomePeriod,
    taxableIncome: incomeAmount,
  });

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003816] via-[#05210f] to-[#07130a] border border-[#00401a]">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <Briefcase className="w-4 h-4 text-[#ffd700]" />
            <span>Federal Board of Revenue (FBR) · Finance Act 2024-2025 & 2025-2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            FBR Income Tax & <span className="text-[#ffd700]">Monthly Salary Calculator</span>
          </h2>
          <p className="text-sm text-slate-300">
            Calculate your exact monthly salary tax deductions, progressive annual tax brackets, super tax surcharges, and net take-home pay.
          </p>
        </div>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: 6 Cols */}
        <div className="lg:col-span-6 bg-[#08170e] border border-[#00401a] rounded-2xl p-6 space-y-5">
          {/* Employment Type Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Taxpayer Classification</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEmploymentType('salaried')}
                className={`p-3 rounded-lg border text-xs font-medium transition-colors text-center ${
                  employmentType === 'salaried'
                    ? 'bg-[#0e2a18] border-[#ffd700] text-white'
                    : 'bg-[#050d08] border-[#00401a] text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Salaried Individual</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Salary &gt; 75% of total income</div>
              </button>

              <button
                type="button"
                onClick={() => setEmploymentType('business')}
                className={`p-3 rounded-lg border text-xs font-medium transition-colors text-center ${
                  employmentType === 'business'
                    ? 'bg-[#0e2a18] border-[#ffd700] text-white'
                    : 'bg-[#050d08] border-[#00401a] text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Non-Salaried / Business / AOP</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Commercial & Sole Proprietorship</div>
              </button>
            </div>
          </div>

          {/* Income Frequency & Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">
                {incomePeriod === 'monthly' ? 'Monthly Taxable Gross Income (PKR)' : 'Annual Taxable Gross Income (PKR)'}
              </label>
              <div className="flex rounded overflow-hidden border border-[#00401a] text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    if (incomePeriod === 'annual') {
                      setIncomeAmount(Math.round(incomeAmount / 12));
                    }
                    setIncomePeriod('monthly');
                  }}
                  className={`px-2.5 py-0.5 font-medium ${
                    incomePeriod === 'monthly' ? 'bg-[#ffd700] text-[#050d08]' : 'bg-[#050d08] text-slate-400'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (incomePeriod === 'monthly') {
                      setIncomeAmount(incomeAmount * 12);
                    }
                    setIncomePeriod('annual');
                  }}
                  className={`px-2.5 py-0.5 font-medium ${
                    incomePeriod === 'annual' ? 'bg-[#ffd700] text-[#050d08]' : 'bg-[#050d08] text-slate-400'
                  }`}
                >
                  Annual
                </button>
              </div>
            </div>

            <div className="flex items-center rounded-lg border border-[#00401a] bg-[#050d08] px-3 py-2.5 focus-within:border-[#ffd700]">
              <span className="text-slate-400 text-sm font-mono mr-2">Rs.</span>
              <input
                type="number"
                step="5000"
                min="0"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-transparent text-base text-white font-mono font-bold outline-none"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 block">Quick Monthly Salary Presets:</span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[80000, 150000, 250000, 400000, 600000, 1000000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setIncomePeriod('monthly');
                    setIncomeAmount(preset);
                  }}
                  className="px-2.5 py-1 rounded bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] text-slate-300 hover:text-white transition-colors"
                >
                  Rs. {(preset / 1000).toFixed(0)}k/mo
                </button>
              ))}
            </div>
          </div>

          {/* Active Slab Indicator */}
          <div className="p-3.5 rounded-lg bg-[#050d08] border border-emerald-900/50 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Active FBR Slab</span>
            <div className="text-xs text-white font-medium">{taxResult.taxBracket}</div>
          </div>
        </div>

        {/* Right Output: 6 Cols */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#06180d] to-[#040e07] border border-[#ffd700]/30 rounded-2xl p-6 space-y-5">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Net Take-Home Salary (Monthly)</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#ffd700] font-mono tabular-nums mt-1">
              Rs. {taxResult.monthlyNetTakeHome.toLocaleString()}
            </div>
            <div className="text-xs text-rose-400 mt-1 font-mono">
              Monthly Tax Withheld: -Rs. {taxResult.monthlyTaxDeduction.toLocaleString()}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-900/40 text-xs">
            <div className="p-3 bg-[#081a0e] rounded-xl border border-[#00401a]">
              <span className="text-slate-400 block text-[10px]">Total Annual Tax</span>
              <span className="font-mono text-base font-bold text-white tabular-nums">
                Rs. {taxResult.totalAnnualTax.toLocaleString()}
              </span>
            </div>

            <div className="p-3 bg-[#081a0e] rounded-xl border border-[#00401a]">
              <span className="text-slate-400 block text-[10px]">Effective Tax Rate</span>
              <span className="font-mono text-base font-bold text-emerald-400 tabular-nums">
                {taxResult.effectiveTaxRatePercent}%
              </span>
            </div>

            <div className="p-3 bg-[#081a0e] rounded-xl border border-[#00401a]">
              <span className="text-slate-400 block text-[10px]">Annual Gross Income</span>
              <span className="font-mono text-sm font-semibold text-slate-200 tabular-nums">
                Rs. {taxResult.annualGrossIncome.toLocaleString()}
              </span>
            </div>

            <div className="p-3 bg-[#081a0e] rounded-xl border border-[#00401a]">
              <span className="text-slate-400 block text-[10px]">High Income Surcharge</span>
              <span className="font-mono text-sm font-semibold text-slate-200 tabular-nums">
                Rs. {taxResult.highIncomeSurcharge.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Official Salaried Tax Slabs Table Reference */}
          <div className="pt-2 border-t border-emerald-900/40">
            <span className="text-[11px] font-bold text-slate-300 block mb-2">
              Official FBR Salaried Slabs Schedule (Finance Act):
            </span>
            <div className="text-[10px] font-mono text-slate-400 space-y-1">
              <div className="flex justify-between py-1 border-b border-[#00401a]/30">
                <span>0 – 600,000 / yr</span>
                <span className="text-emerald-400">0% (Tax Free)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#00401a]/30">
                <span>600,001 – 1,200,000</span>
                <span>5% of amount over 600k</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#00401a]/30">
                <span>1,200,001 – 2,200,000</span>
                <span>Rs. 30,000 + 15% over 1.2M</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#00401a]/30">
                <span>2,200,001 – 3,200,000</span>
                <span>Rs. 180,000 + 25% over 2.2M</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#00401a]/30">
                <span>3,200,001 – 4,100,000</span>
                <span>Rs. 430,000 + 30% over 3.2M</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Above 4,100,000 / yr</span>
                <span className="text-rose-400">Rs. 700,000 + 35% over 4.1M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
