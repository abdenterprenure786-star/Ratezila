import React, { useState } from 'react';
import { Fuel, Navigation, Car, Gauge, Users, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { FuelRateItem } from '../types/market.js';
import { calculateFuelTrip, vehicleMileageProfiles, popularRoutes } from '../services/clientCalculators.js';

interface FuelSectionProps {
  fuelRates: FuelRateItem[];
}

export const FuelSection: React.FC<FuelSectionProps> = ({ fuelRates }) => {
  // Fuel trip planner state
  const [selectedRouteId, setSelectedRouteId] = useState<string>('lahore_islamabad_m2');
  const [distanceKm, setDistanceKm] = useState<number>(375);
  const [vehicleCategory, setVehicleCategory] = useState<string>('car_1000cc');
  const [acEnabled, setAcEnabled] = useState<boolean>(true);
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel' | 'cng' | 'lpg'>('petrol');
  const [tollCost, setTollCost] = useState<number>(1100);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [passengersCount, setPassengersCount] = useState<number>(4);

  // Handle route change
  const handleRouteChange = (routeId: string) => {
    setSelectedRouteId(routeId);
    if (routeId !== 'custom') {
      const found = popularRoutes.find((r) => r.id === routeId);
      if (found) {
        setDistanceKm(found.distanceKm);
        const isVan = vehicleCategory === 'hiace_diesel';
        setTollCost(isVan ? found.tollVan : found.tollCar);
      }
    }
  };

  const tripResult = calculateFuelTrip({
    distanceKm,
    vehicleCategory,
    acEnabled,
    fuelType,
    tollPlazaCost: tollCost,
    isRoundTrip,
    passengersCount,
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003816] via-[#05210f] to-[#07130a] border border-[#00401a]">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <Fuel className="w-4 h-4 text-[#ffd700]" />
            <span>Oil and Gas Regulatory Authority (OGRA) · Pakistan Petroleum Notification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            OGRA Fuel Benchmark Prices & <span className="text-[#ffd700]">Trip Cost Calculator</span>
          </h2>
          <p className="text-sm text-slate-300">
            Official fortnightly petroleum benchmarks, ex-refinery breakdown, petroleum development levy (PDL), and highway trip cost estimator with M-Tag motorway tolls.
          </p>
        </div>
      </div>

      {/* Fuel Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fuelRates.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-[#08170e] border border-[#00401a] hover:border-[#ffd700]/30 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-white block">{item.name}</span>
                <span className="text-[11px] text-emerald-400 font-urdu block">{item.nameUrdu}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00401a] text-slate-300 whitespace-nowrap">
                Per {item.unit}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div className="text-2xl font-extrabold text-[#ffd700] font-mono tabular-nums">
                Rs. {item.currentPrice.toFixed(2)}
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Prev: Rs. {item.previousPrice.toFixed(2)}
              </span>
            </div>

            {/* Price Composition Breakdown */}
            <div className="pt-2 border-t border-emerald-900/30 space-y-1 text-[11px] font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Ex-Refinery Base:</span>
                <span className="text-slate-200">Rs. {item.breakdown.exRefinery.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Petroleum Levy (PDL):</span>
                <span className="text-amber-300 font-semibold">Rs. {item.breakdown.pdl.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>OMC & Dealer Margins:</span>
                <span className="text-slate-200">
                  Rs. {(item.breakdown.omcMargin + item.breakdown.dealerMargin).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                <span>Cycle: {item.effectiveDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fuel Trip Cost & Motorway Toll Calculator */}
      <div className="bg-[#08170e] border border-[#00401a] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#00401a] pb-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <Navigation className="w-4 h-4" />
            <span>Smart Highway Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Fuel Trip Cost & Motorway M-Tag Toll Calculator
          </h3>
          <p className="text-xs text-slate-400">
            Calculate exact fuel litres, toll tax plazas, AC consumption penalty, and passenger split for any Pakistani journey.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 space-y-4">
            {/* Route Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Highway Route Preset</label>
              <select
                value={selectedRouteId}
                onChange={(e) => handleRouteChange(e.target.value)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ffd700]"
              >
                {popularRoutes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.distanceKm} km · Toll: Rs. {r.tollCar})
                  </option>
                ))}
                <option value="custom">Custom Highway / City Route</option>
              </select>
            </div>

            {/* Distance & Vehicle Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">One-Way Distance (Km)</label>
                <input
                  type="number"
                  min="1"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 1)}
                  className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Vehicle Profile</label>
                <select
                  value={vehicleCategory}
                  onChange={(e) => setVehicleCategory(e.target.value)}
                  className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ffd700]"
                >
                  {Object.entries(vehicleMileageProfiles).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label} ({val.kmPerLitre} km/L)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fuel Type, Motorway Toll, Round Trip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Fuel Grade</label>
                <select
                  value={fuelType}
                  onChange={(e: any) => setFuelType(e.target.value)}
                  className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ffd700]"
                >
                  <option value="petrol">Petrol (Rs. 281.40/L)</option>
                  <option value="diesel">Diesel (Rs. 289.15/L)</option>
                  <option value="cng">CNG (Rs. 220.00/Kg)</option>
                  <option value="lpg">LPG (Rs. 258.00/Kg)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Toll Plaza Cost (PKR)</label>
                <input
                  type="number"
                  min="0"
                  value={tollCost}
                  onChange={(e) => setTollCost(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Passengers</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={passengersCount}
                  onChange={(e) => setPassengersCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
                />
              </div>
            </div>

            {/* AC & Round Trip Toggles */}
            <div className="flex flex-wrap gap-4 pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acEnabled}
                  onChange={(e) => setAcEnabled(e.target.checked)}
                  className="accent-[#ffd700] w-4 h-4 cursor-pointer"
                />
                <span>Air Conditioner ON (+12% fuel usage)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRoundTrip}
                  onChange={(e) => setIsRoundTrip(e.target.checked)}
                  className="accent-[#ffd700] w-4 h-4 cursor-pointer"
                />
                <span>Round Trip (Both Ways)</span>
              </label>
            </div>
          </div>

          {/* Right Summary Dashboard */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#06180d] to-[#040e07] border border-[#ffd700]/30 rounded-2xl p-6 space-y-4">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Total Trip Cost</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#ffd700] font-mono tabular-nums mt-1">
                Rs. {tripResult.grandTotalCost.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-400 mt-1">
                Cost Per Passenger: <strong className="font-mono text-white">Rs. {tripResult.costPerPassenger.toLocaleString()}</strong> ({passengersCount} Persons)
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-emerald-900/40 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Distance:</span>
                <span className="text-white font-bold">{tripResult.totalDistanceKm} Km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Effective Mileage:</span>
                <span>{tripResult.effectiveKmPerLitre} Km / Litre</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fuel Required:</span>
                <span className="text-amber-300 font-bold">{tripResult.fuelRequiredLitres} Litres</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Fuel Cost:</span>
                <span className="text-white">Rs. {tripResult.totalFuelCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Toll Plaza Tax:</span>
                <span className="text-white">Rs. {tripResult.totalTollTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#00401a]">
                <span className="text-slate-400">Cost Per Kilometer:</span>
                <span className="text-[#ffd700] font-bold">Rs. {tripResult.costPerKm} / Km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
