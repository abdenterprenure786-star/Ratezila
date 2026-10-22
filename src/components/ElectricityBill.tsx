import React, { useState } from 'react';
import { Receipt, ArrowLeft, ExternalLink, Zap, Calculator } from 'lucide-react';

interface ElectricityBillProps {
  onBackToHome: () => void;
}

export const ElectricityBill: React.FC<ElectricityBillProps> = ({ onBackToHome }) => {
  const [units, setUnits] = useState(280);
  const [disco, setDisco] = useState('LESCO (Lahore)');
  const [isProtected, setIsProtected] = useState(false);

  // NEPRA Domestic Tariffs 2025-26
  const calculateBill = () => {
    let energyCharges = 0;
    const u = units;

    if (u <= 100) {
      energyCharges = u * (isProtected ? 7.74 : 16.48);
    } else if (u <= 200) {
      energyCharges = 100 * (isProtected ? 7.74 : 16.48) + (u - 100) * (isProtected ? 10.06 : 22.95);
    } else if (u <= 300) {
      energyCharges = u * 27.14;
    } else if (u <= 400) {
      energyCharges = u * 32.03;
    } else if (u <= 700) {
      energyCharges = u * 35.24;
    } else {
      energyCharges = u * 42.72;
    }

    const electricityDuty = energyCharges * 0.015;
    const tvFee = 35;
    const fpa = u * 3.40; // Approx Fuel Price Adjustment
    const gst = (energyCharges + fpa) * 0.18;
    const totalBill = energyCharges + electricityDuty + tvFee + fpa + gst;

    return {
      energyCharges: Math.round(energyCharges),
      electricityDuty: Math.round(electricityDuty),
      tvFee,
      fpa: Math.round(fpa),
      gst: Math.round(gst),
      totalBill: Math.round(totalBill)
    };
  };

  const bill = calculateBill();

  const discosList = [
    { name: 'LESCO', region: 'Lahore & Kasur', url: 'https://bill.pitc.com.pk/lescobill' },
    { name: 'IESCO', region: 'Islamabad & Rawalpindi', url: 'https://bill.pitc.com.pk/iescobill' },
    { name: 'MEPCO', region: 'Multan & South Punjab', url: 'https://bill.pitc.com.pk/mepcobill' },
    { name: 'FESCO', region: 'Faisalabad', url: 'https://bill.pitc.com.pk/fescobill' },
    { name: 'GEPCO', region: 'Gujranwala & Sialkot', url: 'https://bill.pitc.com.pk/gepcobill' },
    { name: 'K-Electric', region: 'Karachi & Hub', url: 'https://www.ke.com.pk/' }
  ];

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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase mb-2">
          <Receipt className="w-3.5 h-3.5" />
          <span>NEPRA Tariff Slabs 2025-26</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          WAPDA Electricity Bill Calculator & Duplicate Portal
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Accurate tariff calculator including FPA, 18% GST, and duplicate bill lookup links
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Monthly Consumed Units (KWh)
            </label>
            <input
              type="number"
              min="1"
              value={units}
              onChange={(e) => setUnits(Math.max(1, Number(e.target.value)))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-rose-400 font-bold focus:outline-none focus:border-rose-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Select Distribution Company (DISCO)
            </label>
            <select
              value={disco}
              onChange={(e) => setDisco(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-rose-400"
            >
              {discosList.map((d, i) => (
                <option key={i} value={d.name}>
                  {d.name} ({d.region})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <label className="inline-flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-gray-800/80 border border-gray-700">
              <input
                type="checkbox"
                checked={isProtected}
                onChange={(e) => setIsProtected(e.target.checked)}
                className="w-4 h-4 text-emerald-500 rounded focus:ring-0"
              />
              <span className="text-xs text-gray-200">
                Protected Consumer (Below 200 units for 6 months)
              </span>
            </label>
          </div>
        </div>

        {/* Bill Breakdown Result */}
        <div className="p-5 rounded-xl bg-gray-950 border border-gray-800 space-y-3">
          <div className="flex justify-between text-xs sm:text-sm text-gray-300">
            <span>Base Energy Charges ({units} units):</span>
            <span className="font-mono text-white font-bold">Rs. {bill.energyCharges.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-gray-300">
            <span>Fuel Price Adjustment (FPA ~Rs 3.40/unit):</span>
            <span className="font-mono text-amber-400 font-semibold">Rs. {bill.fpa.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-gray-300">
            <span>18% General Sales Tax (GST):</span>
            <span className="font-mono text-rose-400 font-semibold">Rs. {bill.gst.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-gray-300">
            <span>Electricity Duty & PTV Fee:</span>
            <span className="font-mono text-gray-400">Rs. {(bill.electricityDuty + bill.tvFee).toLocaleString()}</span>
          </div>

          <div className="border-t border-gray-800 pt-3 flex justify-between items-center">
            <span className="text-sm font-bold text-white">Estimated Payable Amount:</span>
            <span className="text-2xl font-extrabold text-[#00FF87] font-mono">
              Rs. {bill.totalBill.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Duplicate Bill Lookup Direct Links */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
        <h2 className="text-lg font-bold text-white">Official Duplicate Bill Check Portals</h2>
        <p className="text-xs text-gray-400">Enter your 14-digit reference number on the respective official DISCO portal:</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {discosList.map((d, i) => (
            <a
              key={i}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-gray-800/80 hover:bg-gray-800 border border-gray-700 text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors block">
                  {d.name} Bill Check
                </span>
                <span className="text-[11px] text-gray-400">{d.region}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-rose-400 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
