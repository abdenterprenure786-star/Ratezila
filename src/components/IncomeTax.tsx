import React, { useState } from 'react';
import { Calculator, ArrowLeft, Shield, DollarSign } from 'lucide-react';

interface IncomeTaxProps {
  onBackToHome: () => void;
}

export const IncomeTax: React.FC<IncomeTaxProps> = ({ onBackToHome }) => {
  const [monthlySalary, setMonthlySalary] = useState(180000);
  const [taxYear, setTaxYear] = useState('2025-26');

  // Progressive FBR Salaried Slabs 2025-26
  const annualIncome = monthlySalary * 12;

  const calculateTax = () => {
    let annualTax = 0;

    if (annualIncome <= 600000) {
      annualTax = 0;
    } else if (annualIncome <= 1200000) {
      annualTax = (annualIncome - 600000) * 0.05;
    } else if (annualIncome <= 2200000) {
      annualTax = 30000 + (annualIncome - 1200000) * 0.15;
    } else if (annualIncome <= 3200000) {
      annualTax = 180000 + (annualIncome - 2200000) * 0.25;
    } else if (annualIncome <= 4100000) {
      annualTax = 430000 + (annualIncome - 3200000) * 0.30;
    } else {
      annualTax = 700000 + (annualIncome - 4100000) * 0.35;
    }

    const monthlyTax = annualTax / 12;
    const netMonthlySalary = monthlySalary - monthlyTax;
    const effectiveTaxRate = annualIncome > 0 ? (annualTax / annualIncome) * 100 : 0;

    return {
      annualTax: Math.round(annualTax),
      monthlyTax: Math.round(monthlyTax),
      netMonthlySalary: Math.round(netMonthlySalary),
      effectiveTaxRate: effectiveTaxRate.toFixed(1)
    };
  };

  const tax = calculateTax();

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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>FBR Finance Act 2025-26</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Pakistan Salary & Income Tax Calculator
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Calculate your monthly deduction, annual tax liability, and exact take-home salary
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Monthly Gross Salary (PKR)
            </label>
            <input
              type="number"
              min="20000"
              step="5000"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Math.max(0, Number(e.target.value)))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-base text-purple-400 font-bold focus:outline-none focus:border-purple-400"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">
              Annual equivalent: Rs. {annualIncome.toLocaleString()} / year
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Tax Year Slabs
            </label>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
            >
              <option value="2025-26">Tax Year 2025 - 2026 (Latest Active Act)</option>
              <option value="2024-25">Tax Year 2024 - 2025</option>
            </select>
          </div>
        </div>

        {/* Results Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800">
          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Monthly Tax Deduction</span>
            <span className="text-2xl font-extrabold text-rose-400 font-mono">
              Rs. {tax.monthlyTax.toLocaleString()}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Annual Tax Liability</span>
            <span className="text-2xl font-extrabold text-amber-400 font-mono">
              Rs. {tax.annualTax.toLocaleString()}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Net Monthly Take-Home</span>
            <span className="text-2xl font-extrabold text-[#00FF87] font-mono">
              Rs. {tax.netMonthlySalary.toLocaleString()}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Effective Tax Rate</span>
            <span className="text-2xl font-extrabold text-purple-400 font-mono">
              {tax.effectiveTaxRate}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
