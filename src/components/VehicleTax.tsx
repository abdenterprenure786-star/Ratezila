import React, { useState } from 'react';
import { Car, ArrowLeft, Shield, FileText } from 'lucide-react';

interface VehicleTaxProps {
  onBackToHome: () => void;
}

export const VehicleTax: React.FC<VehicleTaxProps> = ({ onBackToHome }) => {
  const [engineCc, setEngineCc] = useState(1300);
  const [province, setProvince] = useState('Punjab');
  const [isFiler, setIsFiler] = useState(true);

  const calculateVehicleTax = () => {
    let tokenTax = 0;
    let incomeTaxFiler = 0;
    let transferFee = 0;

    if (engineCc <= 1000) {
      tokenTax = 2500;
      incomeTaxFiler = isFiler ? 1000 : 3000;
      transferFee = 1500;
    } else if (engineCc <= 1300) {
      tokenTax = 5500;
      incomeTaxFiler = isFiler ? 2500 : 7500;
      transferFee = 3000;
    } else if (engineCc <= 1500) {
      tokenTax = 9000;
      incomeTaxFiler = isFiler ? 5000 : 15000;
      transferFee = 4500;
    } else if (engineCc <= 1800) {
      tokenTax = 14000;
      incomeTaxFiler = isFiler ? 8000 : 24000;
      transferFee = 6000;
    } else {
      tokenTax = 22000;
      incomeTaxFiler = isFiler ? 15000 : 45000;
      transferFee = 10000;
    }

    const totalAnnualPayable = tokenTax + incomeTaxFiler;

    return {
      tokenTax,
      incomeTaxFiler,
      transferFee,
      totalAnnualPayable
    };
  };

  const tax = calculateVehicleTax();

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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase mb-2">
          <Car className="w-3.5 h-3.5" />
          <span>Excise, Taxation & Narcotics Control</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Pakistan Vehicle Token Tax & Transfer Fee Estimator
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Engine capacity based annual excise tax, FBR filer withholding tax, and ownership transfer charges
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Engine Capacity (CC)
            </label>
            <input
              type="number"
              step="50"
              value={engineCc}
              onChange={(e) => setEngineCc(Math.max(660, Number(e.target.value)))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-cyan-400 font-bold focus:outline-none focus:border-cyan-400"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">e.g. Alto (660cc), Yaris (1300cc), Civic (1500cc)</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Registration Province
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Punjab">Punjab Excise Department</option>
              <option value="Sindh">Sindh Excise Department</option>
              <option value="Islamabad">Islamabad Capital Territory (ICT)</option>
              <option value="KPK">Khyber Pakhtunkhwa Excise</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <label className="inline-flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-gray-800/80 border border-gray-700">
              <input
                type="checkbox"
                checked={isFiler}
                onChange={(e) => setIsFiler(e.target.checked)}
                className="w-4 h-4 text-cyan-500 rounded focus:ring-0"
              />
              <span className="text-xs text-gray-200">
                Active Tax Filer (ATL Listed)
              </span>
            </label>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800">
          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Annual Token Tax</span>
            <span className="text-xl font-bold text-white font-mono">
              Rs. {tax.tokenTax.toLocaleString()}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">FBR Advance Income Tax</span>
            <span className="text-xl font-bold text-cyan-400 font-mono">
              Rs. {tax.incomeTaxFiler.toLocaleString()}
            </span>
            <span className="text-[11px] text-gray-400 block mt-0.5">{isFiler ? 'Filer Rate' : 'Non-Filer 3x Penalty'}</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Ownership Transfer Fee</span>
            <span className="text-xl font-bold text-gray-300 font-mono">
              Rs. {tax.transferFee.toLocaleString()}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block mb-1">Total Annual Payable</span>
            <span className="text-2xl font-extrabold text-[#00FF87] font-mono">
              Rs. {tax.totalAnnualPayable.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
