import React, { useState } from 'react';
import { Zap, ArrowLeft, Share2, Check, Navigation, Car, Fuel } from 'lucide-react';
import { FuelRate } from '../types';

interface FuelRatesProps {
  fuelRates: FuelRate[];
  onBackToHome: () => void;
}

export const FuelRates: React.FC<FuelRatesProps> = ({ fuelRates, onBackToHome }) => {
  const [distanceKm, setDistanceKm] = useState(380); // e.g. Lahore to Islamabad
  const [mileageKmPerLitre, setMileageKmPerLitre] = useState(14);
  const [selectedProductIdx, setSelectedProductIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const selectedFuel = fuelRates[selectedProductIdx] || fuelRates[0];
  const litresNeeded = distanceKm / Math.max(1, mileageKmPerLitre);
  const tripFuelCost = litresNeeded * (selectedFuel?.currentPrice || 281.40);

  const handleShare = () => {
    const text = `Today OGRA Petrol Price: Rs. ${fuelRates[0]?.currentPrice?.toFixed(2)}/L | Diesel: Rs. ${fuelRates[1]?.currentPrice?.toFixed(2)}/L | HOBC: Rs. ${fuelRates[2]?.currentPrice?.toFixed(2)}/L. Calculated on RateZilla.`;
    if (navigator.share) {
      navigator.share({ title: 'Pakistan Petrol & Fuel Prices Today - RateZilla', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Pages Hub</span>
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>OGRA Petroleum Notification</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Pakistan Petrol & Diesel Prices Today
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Official Ministry of Energy notified retail rates for the current fortnight
          </p>
        </div>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 text-xs font-bold transition-all self-start sm:self-center cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Rates Copied!' : 'Share Fuel Rates'}</span>
        </button>
      </div>

      {/* Fuel Rate Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fuelRates.map((f, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-blue-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                  Per {f.unit}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    f.change < 0
                      ? 'text-emerald-400'
                      : f.change > 0
                      ? 'text-rose-400'
                      : 'text-gray-400'
                  }`}
                >
                  {f.change === 0 ? 'Unchanged' : `${f.change > 0 ? '+' : ''}${f.change.toFixed(2)}`}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{f.product}</h3>
              <p className="text-[11px] text-gray-400 font-serif mb-4">{f.productUrdu}</p>
            </div>

            <div className="border-t border-gray-800 pt-3">
              <span className="text-xl font-extrabold text-blue-400 font-mono">
                Rs. {f.currentPrice.toFixed(2)}
              </span>
              <span className="text-[11px] text-gray-400 block mt-0.5">{f.effectiveDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Road Trip Fuel Cost Calculator */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-5">
        <div className="flex items-center gap-2 text-blue-400">
          <Navigation className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Road Trip Fuel & Mileage Cost Planner</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Select Fuel Type
            </label>
            <select
              value={selectedProductIdx}
              onChange={(e) => setSelectedProductIdx(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
            >
              {fuelRates.map((f, i) => (
                <option key={i} value={i}>
                  {f.product} (Rs. {f.currentPrice.toFixed(2)}/{f.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Trip Distance (Km)
            </label>
            <input
              type="number"
              min="1"
              value={distanceKm}
              onChange={(e) => setDistanceKm(Math.max(1, Number(e.target.value)))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">e.g. Lahore-Islamabad is ~380km</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Vehicle Mileage (Km per Litre)
            </label>
            <input
              type="number"
              min="2"
              max="40"
              value={mileageKmPerLitre}
              onChange={(e) => setMileageKmPerLitre(Math.max(1, Number(e.target.value)))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">Sedan: 12-16 km/l | Bike: 40-50 km/l</span>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-xs text-gray-400 block mb-0.5">Required Fuel Volume</span>
            <span className="text-lg font-bold text-white font-mono">
              {litresNeeded.toFixed(2)} Litres
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-400 block mb-0.5">Cost Per Km</span>
            <span className="text-lg font-bold text-blue-400 font-mono">
              Rs. {(tripFuelCost / distanceKm).toFixed(2)} / km
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-400 block mb-0.5">Total Estimated Trip Cost</span>
            <span className="text-xl font-extrabold text-[#00FF87] font-mono">
              Rs. {Math.round(tripFuelCost).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
