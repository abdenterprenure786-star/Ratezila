import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Building,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
  Share2,
  FileText,
  DollarSign,
  TrendingDown,
  Info,
  MapPin
} from 'lucide-react';

interface PropertyTaxCalculatorProps {
  onBackToHome: () => void;
}

export const PropertyTaxCalculator: React.FC<PropertyTaxCalculatorProps> = ({
  onBackToHome
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(15000000); // 1.5 Crore default
  const [province, setProvince] = useState<'punjab' | 'sindh' | 'kpk' | 'ict'>('punjab');
  const [filerStatus, setFilerStatus] = useState<'filer' | 'non-filer'>('filer');
  const [copied, setCopied] = useState<boolean>(false);

  // Property Tax Calculations (Section 236K Advance Tax, Stamp Duty, TMA & Registration)
  const calculations = useMemo(() => {
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

    // Registration & Corporation / Mutation documentation fee: ~1% (capped at 150k or standard)
    const registrationFee = Math.min(propertyPrice * 0.01, 150000);

    const totalTaxes = fbrAdvanceTax + stampDutyAmount + tmaFee + registrationFee;
    const totalOutlay = propertyPrice + totalTaxes;
    const taxPercentageOfPrice = propertyPrice > 0 ? (totalTaxes / propertyPrice) * 100 : 0;
    const nonFilerFilerSavings = filerStatus === 'non-filer' ? fbrAdvanceTax - (propertyPrice * 0.02) : 0;

    return {
      fbrAdvanceRate: fbrAdvanceRate * 100,
      fbrAdvanceTax,
      stampDutyRate: stampDutyRate * 100,
      stampDutyAmount,
      tmaFee,
      registrationFee,
      totalTaxes,
      totalOutlay,
      taxPercentageOfPrice,
      nonFilerFilerSavings
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

  const handleCopySummary = () => {
    const text = `RateZilla Property Tax & Stamp Duty Summary:
Property Price: Rs. ${propertyPrice.toLocaleString()} (${formatPakistaniPkr(propertyPrice)})
Province: ${province.toUpperCase()} | FBR Status: ${filerStatus === 'filer' ? 'Active Filer' : 'Non-Filer'}
FBR Advance Tax (Sec 236K): Rs. ${Math.round(calculations.fbrAdvanceTax).toLocaleString()} (${calculations.fbrAdvanceRate}%)
Provincial Stamp Duty: Rs. ${Math.round(calculations.stampDutyAmount).toLocaleString()} (${calculations.stampDutyRate}%)
TMA Transfer Fee (1%): Rs. ${Math.round(calculations.tmaFee).toLocaleString()}
Registration & Mutation: Rs. ${Math.round(calculations.registrationFee).toLocaleString()}
Total Government Taxes Payable: Rs. ${Math.round(calculations.totalTaxes).toLocaleString()} (${calculations.taxPercentageOfPrice.toFixed(1)}%)
Total Acquisition Outlay: Rs. ${Math.round(calculations.totalOutlay).toLocaleString()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = () => {
    const text = `RateZilla Property Tax Estimator: Government taxes for Rs. ${formatPakistaniPkr(
      propertyPrice
    )} property in ${province.toUpperCase()} are Rs. ${Math.round(
      calculations.totalTaxes
    ).toLocaleString()}. Total Outlay: Rs. ${Math.round(calculations.totalOutlay).toLocaleString()}`;
    if (navigator.share) {
      navigator.share({ title: 'Property Tax & Stamp Duty Estimator', text, url: window.location.href }).catch(() => {});
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
            <span>Finance Act 2024-25 Sections 236K / 236C</span>
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
            <Building className="w-3.5 h-3.5" />
            <span>Property Tax &amp; Stamp Duty Estimator</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Property Tax &amp; <span className="bg-gradient-to-r from-[#00FF87] to-[#60EFFF] bg-clip-text text-transparent">Stamp Duty Estimator</span>
          </h1>

          <p className="text-base sm:text-lg font-serif text-[#00FF87]" dir="rtl">
            جائیداد اور پلاٹ کی خریداری پر ایف بی آر ایڈوانس ٹیکس، اسٹامپ ڈیوٹی و ٹی ایم اے فیس
          </p>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
            Complete cost assessment for purchasing real estate in Pakistan. Calculates Section 236K Advance Income Tax, provincial Stamp Duty acts (Punjab, Sindh, KPK, Islamabad), Town Municipal Administration (TMA) fee, and registration charges.
          </p>
        </div>
      </div>

      {/* Main Interactive Calculator Card */}
      <div className="rounded-3xl bg-[#111827] border border-gray-800 hover:border-[#00FF87]/40 p-6 sm:p-8 shadow-2xl transition-all space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-800">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-[#60EFFF]" />
              <span>Real Estate Acquisition Duty Engine</span>
            </h2>
            <p className="text-xs text-gray-400">
              Select transaction parameters below to compute all provincial and federal duties
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
            {/* Input 1: Property Value (PKR) */}
            <div className="space-y-2">
              <label className="text-xs text-gray-300 font-semibold flex items-center justify-between">
                <span>Property Value / Agreed Price (PKR):</span>
                <span className="text-[#00FF87] font-bold font-mono">
                  {formatPakistaniPkr(propertyPrice)}
                </span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="500000"
                  step="500000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-lg font-black font-mono text-white focus:outline-none focus:border-[#00FF87] focus:ring-1 focus:ring-[#00FF87]"
                />
              </div>

              {/* Quick Pakistani Property Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[5000000, 10000000, 15000000, 25000000, 50000000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setPropertyPrice(preset)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      propertyPrice === preset
                        ? 'bg-[#00FF87] text-gray-950 font-bold'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {formatPakistaniPkr(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Province */}
            <div className="space-y-2">
              <label className="text-xs text-gray-300 font-semibold flex items-center justify-between">
                <span>Province / Jurisdiction:</span>
                <span className="text-[10px] text-gray-400">Stamp Duty Variations</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'punjab', label: 'Punjab', duty: '1% Stamp' },
                  { id: 'sindh', label: 'Sindh', duty: '2% Stamp' },
                  { id: 'kpk', label: 'KPK', duty: '2% Stamp' },
                  { id: 'ict', label: 'Islamabad (ICT)', duty: '1.5% Stamp' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProvince(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      province === item.id
                        ? 'bg-[#60EFFF]/15 border-[#60EFFF] text-white shadow-[0_0_12px_rgba(96,239,255,0.2)]'
                        : 'bg-gray-900/80 border-gray-800 text-gray-400 hover:bg-gray-850'
                    }`}
                  >
                    <span className="text-xs font-bold text-white">{item.label}</span>
                    <span className="text-[10px] text-gray-400 mt-1 font-mono">{item.duty}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: FBR Status (Filer vs Non-Filer) */}
            <div className="space-y-2">
              <label className="text-xs text-gray-300 font-semibold flex items-center justify-between">
                <span>FBR Tax Filer Status (Section 236K):</span>
                <span className="text-[10px] text-[#00FF87] font-mono">ATL Status</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFilerStatus('filer')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    filerStatus === 'filer'
                      ? 'bg-emerald-500/15 border-[#00FF87] text-white shadow-[0_0_12px_rgba(0,255,135,0.2)]'
                      : 'bg-gray-900/80 border-gray-800 text-gray-400 hover:bg-gray-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-[#00FF87]">Active Filer</span>
                    <ShieldCheck className="w-4 h-4 text-[#00FF87]" />
                  </div>
                  <span className="text-base font-black font-mono text-white">2.00% Tax</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Section 236K Standard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFilerStatus('non-filer')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    filerStatus === 'non-filer'
                      ? 'bg-rose-500/15 border-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.2)]'
                      : 'bg-gray-900/80 border-gray-800 text-gray-400 hover:bg-gray-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-rose-400">Non-Filer</span>
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                  </div>
                  <span className="text-base font-black font-mono text-white">
                    {propertyPrice > 5000000 ? '7.00% Tax' : '5.00% Tax'}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Penalty Surcharge Rate</span>
                </button>
              </div>
            </div>
          </div>

          {/* Output Display & Breakdown (Right Column) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="rounded-2xl bg-gray-950/90 border border-gray-800 p-5 space-y-4">
              {/* Highlight Total Outlay & Total Taxes */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#60EFFF]/15 via-blue-500/10 to-transparent border border-[#60EFFF]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-[#60EFFF] font-bold uppercase tracking-wider block">
                    Total Estimated Acquisition Cost
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight mt-1">
                    Rs. {Math.round(calculations.totalOutlay).toLocaleString()}
                  </div>
                  <span className="text-xs text-gray-400">
                    Property Price + All Transfer Taxes
                  </span>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 border-gray-800 pt-2 sm:pt-0">
                  <span className="text-[11px] text-gray-400 block">Total Govt Duties:</span>
                  <span className="text-base font-bold text-amber-400 font-mono">
                    Rs. {Math.round(calculations.totalTaxes).toLocaleString()} ({calculations.taxPercentageOfPrice.toFixed(1)}%)
                  </span>
                </div>
              </div>

              {/* Itemized Calculation Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                  <span className="text-gray-400">Agreed Property Price:</span>
                  <span className="font-mono font-bold text-white">
                    Rs. {propertyPrice.toLocaleString()} ({formatPakistaniPkr(propertyPrice)})
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <span>FBR Advance Income Tax (Section 236K):</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-300">
                      {calculations.fbrAdvanceRate}%
                    </span>
                  </span>
                  <span className="font-mono font-bold text-amber-400">
                    Rs. {Math.round(calculations.fbrAdvanceTax).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                  <span className="text-gray-400">
                    Provincial Stamp Duty ({calculations.stampDutyRate}% - {province.toUpperCase()}):
                  </span>
                  <span className="font-mono font-bold text-gray-200">
                    Rs. {Math.round(calculations.stampDutyAmount).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                  <span className="text-gray-400">TMA / Municipal Corporation Transfer Fee (1%):</span>
                  <span className="font-mono font-bold text-gray-200">
                    Rs. {Math.round(calculations.tmaFee).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-800/80">
                  <span className="text-gray-400">Registration &amp; Corporation Conveyance Fee:</span>
                  <span className="font-mono font-bold text-gray-200">
                    Rs. {Math.round(calculations.registrationFee).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 font-bold text-sm sm:text-base text-white">
                  <span className="text-amber-400">Total Government Taxes Payable:</span>
                  <span className="font-mono text-lg sm:text-xl text-[#00FF87]">
                    Rs. {Math.round(calculations.totalTaxes).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Non-Filer Alert / Filer Savings */}
            {filerStatus === 'non-filer' ? (
              <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  <strong>Non-Filer Alert:</strong> Becoming a tax filer will reduce your Section 236K advance tax to 2%, saving you{' '}
                  <strong className="text-white font-mono">
                    Rs. {Math.round(calculations.nonFilerFilerSavings).toLocaleString()}
                  </strong>{' '}
                  on this single property purchase.
                </span>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00FF87] shrink-0" />
                <span>
                  <strong>Active Filer Benefit:</strong> As an active taxpayer on the FBR Active Taxpayer List (ATL), you enjoy the reduced 2% rate under Section 236K, saving thousands in advance withholding taxes.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Real Estate Law Context & Advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-gray-400">
        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#60EFFF]" />
            <span>Buyer Tax (236K) vs Seller Tax (236C)</span>
          </h3>
          <p className="leading-relaxed">
            In Pakistan property deals, Section 236K applies to the purchaser/buyer (2% for Filers, 5% to 7% for Non-Filers), while Section 236C applies to the seller (3% for Filers, 6% to 10% for Non-Filers depending on holding duration). Both advance taxes are adjustable in annual FBR income tax returns.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#00FF87]" />
            <span>FBR Valuation Tables vs DC Rate</span>
          </h3>
          <p className="leading-relaxed">
            Taxes are computed on the highest of either the actual agreed transaction price, the FBR notified valuation tables, or the District Collector (DC) rate for the respective mauza/sector. Ensure you verify the notified FBR rate prior to registry execution.
          </p>
        </div>
      </div>
    </div>
  );
};
