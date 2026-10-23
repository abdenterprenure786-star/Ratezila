import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Laptop,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
  Share2,
  DollarSign,
  TrendingUp,
  CreditCard,
  FileText,
  Info
} from 'lucide-react';
import { CurrencyRate } from '../types';

interface FreelancerTaxCalculatorProps {
  currencies?: CurrencyRate[];
  onBackToHome: () => void;
}

export const FreelancerTaxCalculator: React.FC<FreelancerTaxCalculatorProps> = ({
  currencies = [],
  onBackToHome
}) => {
  const [foreignAmount, setForeignAmount] = useState<number>(2500);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'AED'>('USD');
  const [psebStatus, setPsebStatus] = useState<'registered' | 'non-registered'>('registered');
  const [remittanceMethod, setRemittanceMethod] = useState<'wire' | 'fintech'>('wire');
  const [copied, setCopied] = useState<boolean>(false);

  // Dynamic exchange rates
  const exchangeRates = useMemo(() => {
    const usd = currencies.find((c) => c.code === 'USD')?.interbankSell || 278.35;
    const eur = currencies.find((c) => c.code === 'EUR')?.interbankSell || 302.50;
    const gbp = currencies.find((c) => c.code === 'GBP')?.interbankSell || 354.20;
    const aed = currencies.find((c) => c.code === 'AED')?.interbankSell || 75.80;
    return { USD: usd, EUR: eur, GBP: gbp, AED: aed };
  }, [currencies]);

  const currentRate = exchangeRates[selectedCurrency];

  // Section 154A of Income Tax Ordinance
  const calculations = useMemo(() => {
    const grossPkr = foreignAmount * currentRate;
    // Section 154A: 0.25% for PSEB registered vs 1.00% for non-registered
    const taxRate = psebStatus === 'registered' ? 0.0025 : 0.01;
    const taxAmount = grossPkr * taxRate;

    // Gateway / Remittance fees: ~0.5% for Bank Wire PRC vs ~1.8% for Wise/Payoneer
    const feeRate = remittanceMethod === 'wire' ? 0.005 : 0.018;
    const gatewayFees = grossPkr * feeRate;

    const netTakeHome = grossPkr - taxAmount - gatewayFees;
    const effectiveDollarRate = foreignAmount > 0 ? netTakeHome / foreignAmount : currentRate;
    const psebSavings = grossPkr * (0.01 - 0.0025);

    return {
      grossPkr,
      taxRate: taxRate * 100,
      taxAmount,
      gatewayFees,
      feeRate: feeRate * 100,
      netTakeHome,
      effectiveDollarRate,
      psebSavings
    };
  }, [foreignAmount, currentRate, psebStatus, remittanceMethod]);

  const handleCopySummary = () => {
    const text = `RateZilla Freelancer IT Tax Breakdown:
Monthly Income: ${foreignAmount.toLocaleString()} ${selectedCurrency} (Gross: Rs. ${Math.round(calculations.grossPkr).toLocaleString()})
PSEB Status: ${psebStatus === 'registered' ? 'Active PSEB (0.25% Tax)' : 'Non-Registered (1.00% Tax)'}
Tax Deducted (Sec 154A): Rs. ${Math.round(calculations.taxAmount).toLocaleString()}
Estimated Channel Fees: Rs. ${Math.round(calculations.gatewayFees).toLocaleString()} (${calculations.feeRate}%)
Final Net Take-Home Salary: Rs. ${Math.round(calculations.netTakeHome).toLocaleString()}
Effective Rate: Rs. ${calculations.effectiveDollarRate.toFixed(2)} PKR per ${selectedCurrency}
Estimated PSEB Annual Savings: Rs. ${Math.round(calculations.psebSavings * 12).toLocaleString()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = () => {
    const text = `RateZilla Freelancer IT Export Tax Calculator: Net PKR Rs. ${Math.round(
      calculations.netTakeHome
    ).toLocaleString()} on $${foreignAmount.toLocaleString()} income under Section 154A.`;
    if (navigator.share) {
      navigator.share({ title: 'Freelancer IT Tax Calculator', text, url: window.location.href }).catch(() => {});
    } else {
      handleCopySummary();
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 py-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
      {/* Top Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-5">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-300 hover:text-white transition-colors cursor-pointer bg-gray-900/90 hover:bg-gray-800 px-4 py-2.5 rounded-xl border border-gray-700/80 hover:border-[#00FF87]/50 shadow-md group"
        >
          <ArrowLeft className="w-4 h-4 text-[#00FF87] group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Home</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#00FF87] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
            <span>FBR Section 154A Compliant</span>
          </div>
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Share Calculator"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Page Title Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-[#0d1624] to-gray-900 border border-gray-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#00FF87]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#60EFFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] text-xs font-bold uppercase tracking-wider">
            <Laptop className="w-3.5 h-3.5" />
            <span>Freelancer & IT Export Tax Estimator</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Freelancer &amp; IT Export <span className="bg-gradient-to-r from-[#00FF87] to-[#60EFFF] bg-clip-text text-transparent">Tax Estimator</span>
          </h1>

          <p className="text-base sm:text-lg font-serif text-[#00FF87]" dir="rtl">
            فری لانسر آئی ٹی ایکسپورٹ ٹیکس اور فارن کرنسی ریمیٹنس کیلکولیٹر
          </p>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
            Accurate estimation of foreign remittance conversion to Pakistani Rupee (PKR), final tax deduction under Section 154A of the Income Tax Ordinance 2001, and banking channel fee spreads.
          </p>
        </div>
      </div>

      {/* Main Interactive Calculator Card */}
      <div className="rounded-3xl bg-[#111827] border border-gray-800 hover:border-[#00FF87]/40 p-6 sm:p-8 shadow-2xl transition-all space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-800">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#00FF87]" />
              <span>Remittance &amp; Tax Calculation Engine</span>
            </h2>
            <p className="text-xs text-gray-400">
              Live interbank foreign currency conversion with automatic FBR slab computation
            </p>
          </div>

          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-[#00FF87] border border-[#00FF87]/30 text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Summary Copied!' : 'Copy Breakdown'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* User Inputs (Left Column) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Input 1: Monthly Income Amount */}
            <div className="space-y-2">
              <label className="text-xs text-gray-300 font-semibold block">
                Monthly Foreign Income Amount:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={foreignAmount}
                    onChange={(e) => setForeignAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-lg font-black font-mono text-white focus:outline-none focus:border-[#00FF87] focus:ring-1 focus:ring-[#00FF87]"
                  />
                </div>

                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value as any)}
                  className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-3 text-sm font-bold text-[#00FF87] focus:outline-none focus:border-[#00FF87] cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex gap-2 pt-1">
                {[1000, 2500, 5000, 10000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setForeignAmount(preset)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      foreignAmount === preset
                        ? 'bg-[#00FF87] text-gray-950 font-bold'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    ${preset.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="p-2.5 rounded-xl bg-gray-950/80 border border-gray-800 text-[11px] text-gray-400 flex items-center justify-between">
                <span>Interbank Rate:</span>
                <span className="text-[#60EFFF] font-mono font-bold">
                  1 {selectedCurrency} = Rs. {currentRate.toFixed(2)} PKR
                </span>
              </div>
            </div>

            {/* Input 2: PSEB Registration Status */}
            <div className="space-y-2">
              <label className="text-xs text-gray-300 font-semibold flex items-center justify-between">
                <span>PSEB Registration Status (Section 154A):</span>
                <span className="text-[10px] text-emerald-400 font-mono">Tax Ordinance</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPsebStatus('registered')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    psebStatus === 'registered'
                      ? 'bg-emerald-500/15 border-[#00FF87] text-white shadow-[0_0_12px_rgba(0,255,135,0.2)]'
                      : 'bg-gray-900/80 border-gray-800 text-gray-400 hover:bg-gray-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-[#00FF87]">Active PSEB</span>
                    <ShieldCheck className="w-4 h-4 text-[#00FF87]" />
                  </div>
                  <span className="text-base font-black font-mono text-white">0.25% Tax</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Final Tax Regime</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPsebStatus('non-registered')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    psebStatus === 'non-registered'
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'bg-gray-900/80 border-gray-800 text-gray-400 hover:bg-gray-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-amber-400">Non-Registered</span>
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-base font-black font-mono text-white">1.00% Tax</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Section 154A Regular</span>
                </button>
              </div>
            </div>

            {/* Input 3: Remittance Method */}
            <div className="space-y-2">
              <label className="text-xs text-gray-300 font-semibold block">
                Remittance / Withdrawal Channel:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRemittanceMethod('wire')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    remittanceMethod === 'wire'
                      ? 'bg-[#60EFFF]/15 border-[#60EFFF] text-white shadow-[0_0_12px_rgba(96,239,255,0.2)]'
                      : 'bg-gray-900/80 border-gray-800 text-gray-400 hover:bg-gray-850'
                  }`}
                >
                  <span className="text-xs font-bold text-[#60EFFF] block">Direct Bank Wire (PRC)</span>
                  <span className="text-[11px] text-gray-300 font-mono">~0.5% spread</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRemittanceMethod('fintech')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    remittanceMethod === 'fintech'
                      ? 'bg-[#60EFFF]/15 border-[#60EFFF] text-white shadow-[0_0_12px_rgba(96,239,255,0.2)]'
                      : 'bg-gray-900/80 border-gray-800 text-gray-400 hover:bg-gray-850'
                  }`}
                >
                  <span className="text-xs font-bold text-[#60EFFF] block">Payoneer / Wise Gateway</span>
                  <span className="text-[11px] text-gray-300 font-mono">~1.8% conversion</span>
                </button>
              </div>
            </div>
          </div>

          {/* Output Display & Breakdown (Right Column) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="rounded-2xl bg-gray-950/90 border border-gray-800 p-5 space-y-4">
              {/* Highlight Net Take-Home */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-[#00FF87]/10 to-transparent border border-[#00FF87]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-[#00FF87] font-bold uppercase tracking-wider block">
                    Final Net Take-Home Salary (PKR)
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight mt-1">
                    Rs. {Math.round(calculations.netTakeHome).toLocaleString()}
                  </div>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 border-gray-800 pt-2 sm:pt-0">
                  <span className="text-[11px] text-gray-400 block">Effective Realized Rate:</span>
                  <span className="text-base font-bold text-[#60EFFF] font-mono">
                    Rs. {calculations.effectiveDollarRate.toFixed(2)} / {selectedCurrency}
                  </span>
                </div>
              </div>

              {/* Itemized Calculation Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                  <span className="text-gray-400">Gross Foreign Earnings:</span>
                  <span className="font-mono font-bold text-white">
                    {foreignAmount.toLocaleString()} {selectedCurrency}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                  <span className="text-gray-400">Gross Equivalent (PKR):</span>
                  <span className="font-mono font-bold text-white">
                    Rs. {Math.round(calculations.grossPkr).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <span>Section 154A Tax Withholding ({calculations.taxRate}%):</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-300">
                      {psebStatus === 'registered' ? 'PSEB Rate' : 'Standard Rate'}
                    </span>
                  </span>
                  <span className="font-mono font-bold text-amber-400">
                    - Rs. {Math.round(calculations.taxAmount).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                  <span className="text-gray-400">
                    Estimated Banking Gateway / Conversion Fee ({calculations.feeRate}%):
                  </span>
                  <span className="font-mono font-bold text-rose-400">
                    - Rs. {Math.round(calculations.gatewayFees).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 font-bold text-sm text-white">
                  <span className="text-emerald-400">Total Deductions (Tax + Banking):</span>
                  <span className="font-mono text-emerald-400">
                    Rs. {Math.round(calculations.taxAmount + calculations.gatewayFees).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* PSEB Savings Alert */}
            {psebStatus === 'registered' ? (
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00FF87] shrink-0" />
                <span>
                  <strong>PSEB Advantage:</strong> By maintaining active PSEB registration (0.25% tax), you save{' '}
                  <strong className="text-white font-mono">
                    Rs. {Math.round(calculations.psebSavings).toLocaleString()}
                  </strong>{' '}
                  every month (Rs. {Math.round(calculations.psebSavings * 12).toLocaleString()}/year) compared to non-registered status.
                </span>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Tax Saving Tip:</strong> Registering your freelancing entity with PSEB costs under Rs. 10,000 and lowers your income tax from 1.00% to 0.25%, saving you{' '}
                  <strong className="text-white font-mono">
                    Rs. {Math.round(calculations.psebSavings).toLocaleString()}
                  </strong>{' '}
                  monthly on this income level.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Regulatory Context & FAQ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-gray-400">
        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#00FF87]" />
            <span>Section 154A Regulatory Summary</span>
          </h3>
          <p className="leading-relaxed">
            Under Section 154A of Pakistan's Income Tax Ordinance 2001, export proceeds of computer software or IT services received through formal banking channels are subject to a final tax withholding of 0.25% for PSEB registered persons, and 1.00% for non-registered persons, provided income tax returns and sales tax returns are timely filed.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-[#60EFFF]" />
            <span>Proceeds Realization Certificate (PRC)</span>
          </h3>
          <p className="leading-relaxed">
            Ensure your commercial bank issues an electronic Proceeds Realization Certificate (e-PRC) showing purpose code 9180 (Computer Services) or 9181 (Software Development). This certificate protects your proceeds from sales tax audits and entitles you to the preferential 0.25% final tax status.
          </p>
        </div>
      </div>
    </div>
  );
};
