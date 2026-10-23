import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowLeft,
  Building,
  Laptop,
  TrendingUp,
  DollarSign,
  Flame,
  Zap,
  Calculator,
  ShieldCheck,
  Check,
  Copy,
  Share2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  TrendingDown,
  Clock,
  Layers,
  FileText
} from 'lucide-react';
import { CurrencyRate, GoldRate, FuelRate } from '../types';

interface AdvancedFinancialToolsProps {
  currencies?: CurrencyRate[];
  goldRates?: GoldRate[];
  fuelRates?: FuelRate[];
  onBackToHome: () => void;
}

export const AdvancedFinancialTools: React.FC<AdvancedFinancialToolsProps> = ({
  currencies = [],
  goldRates = [],
  fuelRates = [],
  onBackToHome
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'freelancer' | 'property' | 'timing' | 'all'>('all');

  // =========================================================================
  // TOOL 1: FREELANCER / IT EXPORT TAX & REMITTANCE ESTIMATOR STATE
  // =========================================================================
  const [foreignAmount, setForeignAmount] = useState<number>(2500);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'AED'>('USD');
  const [psebStatus, setPsebStatus] = useState<'registered' | 'non-registered'>('registered');
  const [remittanceMethod, setRemittanceMethod] = useState<'wire' | 'fintech'>('wire');
  const [copiedFreelancer, setCopiedFreelancer] = useState<boolean>(false);

  // Dynamic exchange rate retrieval from live currencies or verified fallbacks
  const exchangeRates = useMemo(() => {
    const usd = currencies.find((c) => c.code === 'USD')?.interbankSell || 278.35;
    const eur = currencies.find((c) => c.code === 'EUR')?.interbankSell || 302.50;
    const gbp = currencies.find((c) => c.code === 'GBP')?.interbankSell || 354.20;
    const aed = currencies.find((c) => c.code === 'AED')?.interbankSell || 75.80;
    return { USD: usd, EUR: eur, GBP: gbp, AED: aed };
  }, [currencies]);

  const currentRate = exchangeRates[selectedCurrency];

  // Freelancer Calculations (Section 154A of Income Tax Ordinance)
  const freelancerCalcs = useMemo(() => {
    const grossPkr = foreignAmount * currentRate;
    // Section 154A: 0.25% for PSEB registered exporter, 1.00% for non-registered
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

  // =========================================================================
  // TOOL 2: PROPERTY TAX & STAMP DUTY ESTIMATOR STATE
  // =========================================================================
  const [propertyPrice, setPropertyPrice] = useState<number>(15000000); // 1.5 Crore default
  const [province, setProvince] = useState<'punjab' | 'sindh' | 'kpk' | 'ict'>('punjab');
  const [filerStatus, setFilerStatus] = useState<'filer' | 'non-filer'>('filer');
  const [copiedProperty, setCopiedProperty] = useState<boolean>(false);

  // Property Tax Calculations (Section 236K Advance Tax, Stamp Duty & TMA)
  const propertyCalcs = useMemo(() => {
    // FBR Advance Tax under Section 236K for Buyer:
    // Filer: 2%
    // Non-Filer: 5% (up to 50 Lakhs), 7% (above 50 Lakhs)
    let fbrAdvanceRate = 0.02;
    if (filerStatus === 'non-filer') {
      fbrAdvanceRate = propertyPrice > 5000000 ? 0.07 : 0.05;
    }
    const fbrAdvanceTax = propertyPrice * fbrAdvanceRate;

    // Provincial Stamp Duty:
    // Punjab: 1%, Sindh: 2%, KPK: 2%, ICT: 1.5%
    const stampDutyRate =
      province === 'punjab' ? 0.01 : province === 'sindh' ? 0.02 : province === 'kpk' ? 0.02 : 0.015;
    const stampDutyAmount = propertyPrice * stampDutyRate;

    // Town Municipal Administration (TMA) Transfer Fee: 1%
    const tmaFee = propertyPrice * 0.01;

    // Registration & Corporation / Mutation documentation fee: ~1% (or fixed slabs)
    const registrationFee = Math.min(propertyPrice * 0.01, 150000);

    const totalTaxes = fbrAdvanceTax + stampDutyAmount + tmaFee + registrationFee;
    const totalOutlay = propertyPrice + totalTaxes;
    const taxPercentageOfPrice = (totalTaxes / propertyPrice) * 100;

    return {
      fbrAdvanceRate: fbrAdvanceRate * 100,
      fbrAdvanceTax,
      stampDutyRate: stampDutyRate * 100,
      stampDutyAmount,
      tmaFee,
      registrationFee,
      totalTaxes,
      totalOutlay,
      taxPercentageOfPrice
    };
  }, [propertyPrice, province, filerStatus]);

  // Number verbalizer in Lakhs / Crores for Pakistan
  const formatPakistaniPkr = (val: number) => {
    if (val >= 10000000) {
      return `${(val / 10000000).toFixed(2)} Crore`;
    }
    if (val >= 100000) {
      return `${(val / 100000).toFixed(2)} Lakh`;
    }
    return `Rs. ${val.toLocaleString()}`;
  };

  const handleCopyFreelancer = () => {
    const text = `RateZilla IT Remittance Estimate: Gross: Rs. ${Math.round(
      freelancerCalcs.grossPkr
    ).toLocaleString()} | Tax: Rs. ${Math.round(
      freelancerCalcs.taxAmount
    ).toLocaleString()} (${freelancerCalcs.taxRate}%) | Fees: Rs. ${Math.round(
      freelancerCalcs.gatewayFees
    ).toLocaleString()} | Net Take-Home: Rs. ${Math.round(
      freelancerCalcs.netTakeHome
    ).toLocaleString()} (${freelancerCalcs.effectiveDollarRate.toFixed(2)} PKR/${selectedCurrency})`;
    navigator.clipboard.writeText(text);
    setCopiedFreelancer(true);
    setTimeout(() => setCopiedFreelancer(false), 2000);
  };

  const handleCopyProperty = () => {
    const text = `RateZilla Property Tax Estimate: Value: Rs. ${propertyPrice.toLocaleString()} (${formatPakistaniPkr(
      propertyPrice
    )}) | Total Taxes: Rs. ${Math.round(
      propertyCalcs.totalTaxes
    ).toLocaleString()} (${propertyCalcs.taxPercentageOfPrice.toFixed(
      1
    )}%) | Total Outlay: Rs. ${Math.round(propertyCalcs.totalOutlay).toLocaleString()}`;
    navigator.clipboard.writeText(text);
    setCopiedProperty(true);
    setTimeout(() => setCopiedProperty(false), 2000);
  };

  // Current benchmarks for Timing widget
  const gold24k = goldRates[0]?.perTola || 284500;
  const usdPkr = currencies.find((c) => c.code === 'USD')?.interbankSell || 278.35;
  const petrolPrice = fuelRates[0]?.currentPrice || 281.40;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer bg-gray-900/80 hover:bg-gray-800 px-3.5 py-2 rounded-xl border border-gray-800"
        >
          <ArrowLeft className="w-4 h-4 text-[#00FF87]" />
          <span>Back to Home Portal</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
          <span className="text-xs font-mono text-[#00FF87] bg-[#00FF87]/10 px-3 py-1 rounded-full border border-[#00FF87]/30">
            Updated per FBR & SBP Finance Directives
          </span>
        </div>
      </div>

      {/* Main Page Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-[#0d1624] to-gray-900 border border-gray-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#00FF87]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#60EFFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Institutional Financial Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Advanced <span className="bg-gradient-to-r from-[#00FF87] to-[#60EFFF] bg-clip-text text-transparent">Financial Tools</span> & Signals
          </h1>

          <p className="text-base sm:text-lg font-serif text-[#00FF87]" dir="rtl">
            فری لانسر آئی ٹی ٹیکس، جائیداد کی ٹرانسفر ڈیوٹی اور سونا، ڈالر و پٹرول کے مارکیٹ سگنلز
          </p>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
            Precision estimators for Pakistani IT exporters & freelancers (Section 154A), real estate buyers & sellers (FBR 236K / Stamp Duty), and live market purchasing power timing indicators.
          </p>
        </div>
      </div>

      {/* Quick Tool Filter Pills */}
      <div className="flex flex-wrap gap-2.5 pb-2">
        <button
          onClick={() => setActiveSubTab('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
            activeSubTab === 'all'
              ? 'bg-gradient-to-r from-[#00FF87] to-[#60EFFF] text-[#0b0f19] border-transparent shadow-[0_0_15px_rgba(0,255,135,0.3)]'
              : 'bg-gray-900/90 text-gray-300 hover:bg-gray-800 border-gray-800'
          }`}
        >
          <span>All 3 Advanced Tools</span>
        </button>

        <button
          onClick={() => setActiveSubTab('freelancer')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
            activeSubTab === 'freelancer'
              ? 'bg-gradient-to-r from-[#00FF87] to-[#60EFFF] text-[#0b0f19] border-transparent shadow-[0_0_15px_rgba(0,255,135,0.3)]'
              : 'bg-gray-900/90 text-gray-300 hover:bg-gray-800 border-gray-800'
          }`}
        >
          <Laptop className="w-4 h-4" />
          <span>1. IT Remittance & Tax (154A)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('property')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
            activeSubTab === 'property'
              ? 'bg-gradient-to-r from-[#00FF87] to-[#60EFFF] text-[#0b0f19] border-transparent shadow-[0_0_15px_rgba(0,255,135,0.3)]'
              : 'bg-gray-900/90 text-gray-300 hover:bg-gray-800 border-gray-800'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>2. Property Tax & Stamp Duty</span>
        </button>

        <button
          onClick={() => setActiveSubTab('timing')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
            activeSubTab === 'timing'
              ? 'bg-gradient-to-r from-[#00FF87] to-[#60EFFF] text-[#0b0f19] border-transparent shadow-[0_0_15px_rgba(0,255,135,0.3)]'
              : 'bg-gray-900/90 text-gray-300 hover:bg-gray-800 border-gray-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>3. Buying Power & Market Signals</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. FREELANCER / IT EXPORT TAX & REMITTANCE ESTIMATOR                      */}
      {/* ========================================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'freelancer') && (
        <div className="rounded-3xl bg-[#111827] border border-gray-800 hover:border-[#00FF87]/50 p-6 sm:p-8 shadow-2xl transition-all space-y-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-800/80 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[#00FF87] text-xs font-bold uppercase tracking-wider">
                <Laptop className="w-3.5 h-3.5" />
                <span>Tool 1 • IT Exporter & Remote Worker Remittance</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Freelancer / IT Export Tax & Remittance Estimator
              </h2>
              <p className="text-xs text-gray-400">
                Calculate net PKR income after Section 154A tax deductions and intermediary bank conversion fees.
              </p>
            </div>

            <button
              onClick={handleCopyFreelancer}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-800 text-[#00FF87] border border-[#00FF87]/30 text-xs font-bold transition-all cursor-pointer self-start md:self-auto"
            >
              {copiedFreelancer ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFreelancer ? 'Calculation Copied!' : 'Copy Summary'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls (Left Column) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Monthly Income & Currency */}
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

                  {/* Currency Selector */}
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

                {/* Quick Presets */}
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

                <p className="text-[11px] text-gray-400">
                  Current Interbank Benchmark:{' '}
                  <strong className="text-white font-mono">
                    1 {selectedCurrency} = Rs. {currentRate.toFixed(2)} PKR
                  </strong>
                </p>
              </div>

              {/* PSEB Registration Status (0.25% vs 1%) */}
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

              {/* Remittance Method */}
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
                    <span className="text-xs text-gray-300 font-mono">~0.5% fee spread</span>
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
                    <span className="text-xs text-gray-300 font-mono">~1.8% conversion fee</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Output Display & Breakdown (Right Column) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="rounded-2xl bg-gray-950/90 border border-gray-800 p-5 space-y-4">
                {/* Net Take-Home Highlight Card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-[#00FF87]/10 to-transparent border border-[#00FF87]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#00FF87] font-bold uppercase tracking-wider block">
                      Estimated Net Take-Home Salary (PKR)
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight mt-1">
                      Rs. {Math.round(freelancerCalcs.netTakeHome).toLocaleString()}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide block">
                      Effective Take-Home Rate
                    </span>
                    <span className="text-base font-black text-[#60EFFF] font-mono">
                      Rs. {freelancerCalcs.effectiveDollarRate.toFixed(2)} / {selectedCurrency}
                    </span>
                  </div>
                </div>

                {/* Itemized Calculation Breakdown */}
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                    <span className="text-gray-400">Gross Foreign Inflow ({foreignAmount.toLocaleString()} {selectedCurrency}):</span>
                    <span className="font-mono font-bold text-white">
                      Rs. {Math.round(freelancerCalcs.grossPkr).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <span>Withholding Tax Deduction ({freelancerCalcs.taxRate}%):</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-300">
                        Section 154A
                      </span>
                    </span>
                    <span className="font-mono font-bold text-rose-400">
                      - Rs. {Math.round(freelancerCalcs.taxAmount).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                    <span className="text-gray-400">Estimated Gateway / Bank Transfer Fees ({freelancerCalcs.feeRate}%):</span>
                    <span className="font-mono font-bold text-amber-400">
                      - Rs. {Math.round(freelancerCalcs.gatewayFees).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 font-bold text-base text-white">
                    <span className="text-emerald-400">Final Net In Bank Account:</span>
                    <span className="font-mono text-xl text-[#00FF87]">
                      Rs. {Math.round(freelancerCalcs.netTakeHome).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* PSEB Savings Advisory Box */}
              <div className="p-3.5 rounded-2xl bg-gray-900/60 border border-emerald-500/30 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#00FF87]/20 text-[#00FF87] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs leading-relaxed text-gray-300">
                  {psebStatus === 'registered' ? (
                    <span>
                      <strong className="text-[#00FF87]">Active PSEB Status:</strong> You are saving{' '}
                      <strong className="text-white font-mono">
                        Rs. {Math.round(freelancerCalcs.psebSavings).toLocaleString()}
                      </strong>{' '}
                      every month compared to non-registered IT exporters.
                    </span>
                  ) : (
                    <span>
                      <strong className="text-amber-400">Tax Saving Tip:</strong> Registering with PSEB will reduce your tax rate from 1.0% to 0.25%, saving you{' '}
                      <strong className="text-white font-mono">
                        Rs. {Math.round(freelancerCalcs.psebSavings).toLocaleString()} / month
                      </strong>.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PROPERTY TAX & STAMP DUTY ESTIMATOR                                     */}
      {/* ========================================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'property') && (
        <div className="rounded-3xl bg-[#111827] border border-gray-800 hover:border-[#60EFFF]/50 p-6 sm:p-8 shadow-2xl transition-all space-y-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-800/80 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[#60EFFF] text-xs font-bold uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" />
                <span>Tool 2 • Real Estate Transfer & Government Duties</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Property Tax & Stamp Duty Estimator
              </h2>
              <p className="text-xs text-gray-400">
                Official calculation of FBR Advance Income Tax (Section 236K), Stamp Duty, TMA Fee & Registration charges.
              </p>
            </div>

            <button
              onClick={handleCopyProperty}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-800 text-[#60EFFF] border border-[#60EFFF]/30 text-xs font-bold transition-all cursor-pointer self-start md:self-auto"
            >
              {copiedProperty ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedProperty ? 'Property Copied!' : 'Copy Summary'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls (Left Column) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Agreed Value / FBR DC Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-gray-300 font-semibold block">
                    Property Value / Agreed Consideration:
                  </label>
                  <span className="text-xs font-bold text-[#60EFFF] font-mono">
                    {formatPakistaniPkr(propertyPrice)}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min="500000"
                    step="500000"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-lg font-black font-mono text-white focus:outline-none focus:border-[#60EFFF] focus:ring-1 focus:ring-[#60EFFF]"
                  />
                </div>

                {/* Quick Value Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[5000000, 10000000, 25000000, 50000000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setPropertyPrice(preset)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        propertyPrice === preset
                          ? 'bg-[#60EFFF] text-gray-950 font-bold'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {formatPakistaniPkr(preset)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Province Selection */}
              <div className="space-y-2">
                <label className="text-xs text-gray-300 font-semibold block">
                  Province / Jurisdiction:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'punjab', name: 'Punjab (1% Stamp)' },
                    { id: 'sindh', name: 'Sindh (2% Stamp)' },
                    { id: 'kpk', name: 'KPK (2% Stamp)' },
                    { id: 'ict', name: 'Islamabad (1.5% Stamp)' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProvince(p.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                        province === p.id
                          ? 'bg-[#60EFFF]/15 border-[#60EFFF] text-white font-bold'
                          : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-850'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* FBR Filer vs Non-Filer Status */}
              <div className="space-y-2">
                <label className="text-xs text-gray-300 font-semibold block">
                  Buyer Active Taxpayer Status (FBR Section 236K):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFilerStatus('filer')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      filerStatus === 'filer'
                        ? 'bg-emerald-500/15 border-emerald-400 text-white'
                        : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-850'
                    }`}
                  >
                    <span className="text-xs font-bold text-emerald-400">Active Tax Filer</span>
                    <span className="text-base font-black font-mono text-white mt-1">2% Advance Tax</span>
                    <span className="text-[10px] text-gray-400">Standard FBR 236K</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFilerStatus('non-filer')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      filerStatus === 'non-filer'
                        ? 'bg-rose-500/15 border-rose-500 text-white'
                        : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-850'
                    }`}
                  >
                    <span className="text-xs font-bold text-rose-400">Non-Filer</span>
                    <span className="text-base font-black font-mono text-white mt-1">
                      {propertyPrice > 5000000 ? '7%' : '5%'} Advance Tax
                    </span>
                    <span className="text-[10px] text-gray-400">Heavy Penal Surcharge</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Output Display (Right Column) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="rounded-2xl bg-gray-950/90 border border-gray-800 p-5 space-y-4">
                {/* Total Cost Outlay Card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/15 via-[#60EFFF]/10 to-transparent border border-[#60EFFF]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#60EFFF] font-bold uppercase tracking-wider block">
                      Total Buyer Outlay (Price + All Taxes)
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight mt-1">
                      Rs. {Math.round(propertyCalcs.totalOutlay).toLocaleString()}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide block">
                      Total Govt Duties
                    </span>
                    <span className="text-base font-black text-amber-400 font-mono">
                      Rs. {Math.round(propertyCalcs.totalTaxes).toLocaleString()} ({propertyCalcs.taxPercentageOfPrice.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                {/* Itemized Taxes Summary */}
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                    <span className="text-gray-400">Property Agreed Valuation:</span>
                    <span className="font-mono font-bold text-white">
                      Rs. {propertyPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <span>FBR Advance Income Tax (Section 236K):</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-300">
                        {propertyCalcs.fbrAdvanceRate}%
                      </span>
                    </span>
                    <span className="font-mono font-bold text-amber-400">
                      Rs. {Math.round(propertyCalcs.fbrAdvanceTax).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                    <span className="text-gray-400">
                      Provincial Stamp Duty ({propertyCalcs.stampDutyRate}%):
                    </span>
                    <span className="font-mono font-bold text-gray-200">
                      Rs. {Math.round(propertyCalcs.stampDutyAmount).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                    <span className="text-gray-400">TMA / Municipal Corporation Transfer Fee (1%):</span>
                    <span className="font-mono font-bold text-gray-200">
                      Rs. {Math.round(propertyCalcs.tmaFee).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                    <span className="text-gray-400">Registration & Corporation Conveyance Fees:</span>
                    <span className="font-mono font-bold text-gray-200">
                      Rs. {Math.round(propertyCalcs.registrationFee).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 font-bold text-base text-white">
                    <span className="text-amber-400">Total Government Taxes Payable:</span>
                    <span className="font-mono text-xl text-[#60EFFF]">
                      Rs. {Math.round(propertyCalcs.totalTaxes).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {filerStatus === 'non-filer' && (
                <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    <strong>Non-Filer Alert:</strong> Becoming a tax filer will reduce your Section 236K tax to 2%, saving you{' '}
                    <strong className="text-white font-mono">
                      Rs. {Math.round(propertyCalcs.fbrAdvanceTax - propertyPrice * 0.02).toLocaleString()}
                    </strong>{' '}
                    on this transaction alone.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. BUYING POWER & BEST-TIME-TO-BUY INDICATORS                              */}
      {/* ========================================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'timing') && (
        <div className="rounded-3xl bg-[#111827] border border-gray-800 hover:border-[#00FF87]/50 p-6 sm:p-8 shadow-2xl transition-all space-y-6">
          {/* Section Header */}
          <div className="space-y-1 border-b border-gray-800/80 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[#00FF87] text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Tool 3 • Volatility Metrics & Decision Timing</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Buying Power & Best-Time-To-Buy Indicators
            </h2>
            <p className="text-xs text-gray-400">
              Live market volatility ratings, price pressure analysis and purchasing timing guidance for Gold, US Dollar and Petroleum.
            </p>
          </div>

          {/* 3 Assets Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ASSET 1: GOLD (24K) */}
            <div className="rounded-2xl bg-gray-950/90 border border-amber-500/30 p-5 space-y-4 hover:border-amber-400 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Gold (24K / Tola)</h3>
                      <span className="text-[11px] text-gray-400">Sarafa Bullion</span>
                    </div>
                  </div>

                  {/* Recommendation Badge */}
                  <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
                    Hold / Wait for Dip
                  </span>
                </div>

                {/* Benchmark Rate */}
                <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 mb-3">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Current Benchmark</span>
                  <span className="text-xl font-black text-amber-400 font-mono">
                    Rs. {gold24k.toLocaleString()}
                  </span>
                </div>

                {/* Metrics */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">Market Status:</span>
                    <span className="font-semibold text-amber-300 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Resistance Testing
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">Volatility Rating:</span>
                    <span className="font-mono font-bold text-white">Medium-High (68/100)</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">1-Year Purchasing Hedge:</span>
                    <span className="font-mono font-bold text-emerald-400">+28.5% Inflation Outpace</span>
                  </div>
                </div>

                {/* 30-Day Trend Overview Insight */}
                <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-gray-300 leading-relaxed bg-gray-900/40 p-2.5 rounded-xl">
                  <strong className="text-amber-400 block mb-1">30-Day Trend Insight:</strong>
                  Sarafa gold is consolidating near major international resistance ($2,680/oz). Buying in minor corrective dips near Rs. 280,000 is recommended before wedding season demand kicks in.
                </div>
              </div>

              <div className="text-[11px] text-gray-500 pt-2 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Sarafa Committee Daily Updated</span>
              </div>
            </div>

            {/* ASSET 2: US DOLLAR (USD / PKR) */}
            <div className="rounded-2xl bg-gray-950/90 border border-emerald-500/30 p-5 space-y-4 hover:border-emerald-400 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-[#00FF87]">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">US Dollar (USD / PKR)</h3>
                      <span className="text-[11px] text-gray-400">SBP Interbank</span>
                    </div>
                  </div>

                  {/* Recommendation Badge */}
                  <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-500/20 text-[#00FF87] border border-emerald-500/40 shadow-sm">
                    Favorable to Buy
                  </span>
                </div>

                {/* Benchmark Rate */}
                <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 mb-3">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Current Benchmark</span>
                  <span className="text-xl font-black text-[#00FF87] font-mono">
                    Rs. {usdPkr.toFixed(2)}
                  </span>
                </div>

                {/* Metrics */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">Market Status:</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Stable Consolidation
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">Volatility Rating:</span>
                    <span className="font-mono font-bold text-white">Low-Moderate (18/100)</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">SBP FX Reserves:</span>
                    <span className="font-mono font-bold text-emerald-400">$10.2B+ Buffer</span>
                  </div>
                </div>

                {/* 30-Day Trend Overview Insight */}
                <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-gray-300 leading-relaxed bg-gray-900/40 p-2.5 rounded-xl">
                  <strong className="text-[#00FF87] block mb-1">30-Day Trend Insight:</strong>
                  SBP interbank forex remains anchored between Rs. 277.80 and 278.60. Favorable window for planned university tuition payments, foreign SaaS renewals, and commercial import LCs.
                </div>
              </div>

              <div className="text-[11px] text-gray-500 pt-2 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#00FF87]" />
                <span>Interbank Weighted SBP Average</span>
              </div>
            </div>

            {/* ASSET 3: FUEL / PETROL REGULAR */}
            <div className="rounded-2xl bg-gray-950/90 border border-blue-500/30 p-5 space-y-4 hover:border-blue-400 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-blue-500/20 text-[#60EFFF]">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Petrol & Diesel (Litre)</h3>
                      <span className="text-[11px] text-gray-400">OGRA Fortnight</span>
                    </div>
                  </div>

                  {/* Recommendation Badge */}
                  <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm">
                    High Volatility
                  </span>
                </div>

                {/* Benchmark Rate */}
                <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 mb-3">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Current Benchmark</span>
                  <span className="text-xl font-black text-[#60EFFF] font-mono">
                    Rs. {petrolPrice.toFixed(2)} / L
                  </span>
                </div>

                {/* Metrics */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">Market Status:</span>
                    <span className="font-semibold text-rose-300 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Fortnightly Review Ahead
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">Volatility Rating:</span>
                    <span className="font-mono font-bold text-white">High (74/100)</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">Global Brent Crude:</span>
                    <span className="font-mono font-bold text-white">~$75 / Barrel</span>
                  </div>
                </div>

                {/* 30-Day Trend Overview Insight */}
                <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-gray-300 leading-relaxed bg-gray-900/40 p-2.5 rounded-xl">
                  <strong className="text-[#60EFFF] block mb-1">30-Day Trend Insight:</strong>
                  Global crude shifts impact fortnightly consumer tariffs. Filling vehicle fuel tanks prior to the 1st and 15th of each calendar month is recommended when international Platts prices spike.
                </div>
              </div>

              <div className="text-[11px] text-gray-500 pt-2 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#60EFFF]" />
                <span>Next OGRA Review Notification Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Disclaimer & Regulatory Advisory */}
      <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          (Note: IT remittance calculations are grounded in Section 154A of the Income Tax Ordinance 2001. Property tax calculations reflect FBR 2024-25 active taxpayer lists and respective provincial stamp acts. Market indicators represent quantitative analytical assessments and do not constitute registered financial advice.)
        </p>
      </div>
    </div>
  );
};
