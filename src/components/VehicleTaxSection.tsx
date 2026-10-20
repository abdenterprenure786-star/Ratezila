import React, { useState } from 'react';
import { Car, Bike, ShieldCheck, AlertCircle, Percent } from 'lucide-react';
import { calculateVehicleTax } from '../services/clientCalculators.js';

export const VehicleTaxSection: React.FC = () => {
  const [province, setProvince] = useState<'punjab' | 'sindh' | 'islamabad' | 'kpk'>('punjab');
  const [vehicleType, setVehicleType] = useState<'bike' | 'car'>('car');
  const [engineCc, setEngineCc] = useState<number>(1300);
  const [isFiler, setIsFiler] = useState<boolean>(true);
  const [registrationStatus, setRegistrationStatus] = useState<
    'annual_token' | 'new_registration' | 'ownership_transfer'
  >('annual_token');

  const taxResult = calculateVehicleTax({
    province,
    vehicleType,
    engineCc,
    isFiler,
    registrationStatus,
  });

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003816] via-[#05210f] to-[#07130a] border border-[#00401a]">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <Car className="w-4 h-4 text-[#ffd700]" />
            <span>Excise, Taxation & Narcotics Control Department · Pakistan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Vehicle Excise & <span className="text-[#ffd700]">Token Tax Estimator</span>
          </h2>
          <p className="text-sm text-slate-300">
            Calculate your annual motor vehicle token tax, withholding tax (WHT), and transfer fee based on engine CC for active Filers vs Non-Filers in Punjab, Sindh, and Islamabad.
          </p>
        </div>
      </div>

      {/* Inputs & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs: 7 cols */}
        <div className="lg:col-span-7 bg-[#08170e] border border-[#00401a] rounded-2xl p-6 space-y-5">
          {/* Province & Vehicle Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Registration Province</label>
              <select
                value={province}
                onChange={(e: any) => setProvince(e.target.value)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ffd700]"
              >
                <option value="punjab">Punjab (Lahore, Rawalpindi, Faisalabad)</option>
                <option value="sindh">Sindh (Karachi, Hyderabad, Sukkur)</option>
                <option value="islamabad">Islamabad Capital Territory (ICT)</option>
                <option value="kpk">Khyber Pakhtunkhwa (Peshawar)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Vehicle Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setVehicleType('car');
                    if (engineCc < 660) setEngineCc(1000);
                  }}
                  className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    vehicleType === 'car'
                      ? 'bg-[#00401a] border-[#ffd700] text-white'
                      : 'bg-[#050d08] border-[#00401a] text-slate-400'
                  }`}
                >
                  <Car className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>Motor Car</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVehicleType('bike');
                    setEngineCc(70);
                  }}
                  className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    vehicleType === 'bike'
                      ? 'bg-[#00401a] border-[#ffd700] text-white'
                      : 'bg-[#050d08] border-[#00401a] text-slate-400'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>Motorcycle</span>
                </button>
              </div>
            </div>
          </div>

          {/* Engine CC & Presets */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">Engine Displacement (CC)</label>
              <span className="font-mono text-xs text-[#ffd700] font-bold">{engineCc} CC</span>
            </div>
            <input
              type="number"
              min="50"
              max="6000"
              value={engineCc}
              onChange={(e) => setEngineCc(parseInt(e.target.value) || 50)}
              className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#ffd700]"
            />

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono">
              {vehicleType === 'car' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setEngineCc(660)}
                    className="px-2 py-0.5 rounded bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] text-slate-300"
                  >
                    660cc (Alto/Mira)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngineCc(1000)}
                    className="px-2 py-0.5 rounded bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] text-slate-300"
                  >
                    1000cc (Cultus/WagonR)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngineCc(1300)}
                    className="px-2 py-0.5 rounded bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] text-slate-300"
                  >
                    1300cc (Yaris/City)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngineCc(1800)}
                    className="px-2 py-0.5 rounded bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] text-slate-300"
                  >
                    1800cc (Civic/Corolla)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngineCc(2000)}
                    className="px-2 py-0.5 rounded bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] text-slate-300"
                  >
                    2000cc (Sportage/Tucson)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngineCc(2800)}
                    className="px-2 py-0.5 rounded bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] text-slate-300"
                  >
                    2800cc (Fortuner)
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setEngineCc(70)}
                    className="px-2 py-0.5 rounded bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] text-slate-300"
                  >
                    70cc (CD70)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngineCc(125)}
                    className="px-2 py-0.5 rounded bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] text-slate-300"
                  >
                    125cc (CG125)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngineCc(150)}
                    className="px-2 py-0.5 rounded bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] text-slate-300"
                  >
                    150cc (GS150/CB)
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Registration Mode & Filer Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Purpose</label>
              <select
                value={registrationStatus}
                onChange={(e: any) => setRegistrationStatus(e.target.value)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ffd700]"
              >
                <option value="annual_token">Annual Token Tax Renewal</option>
                <option value="ownership_transfer">Ownership Transfer Fee</option>
                <option value="new_registration">Brand New Vehicle Registration WHT</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">FBR ATL Filer Status</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsFiler(true)}
                  className={`w-1/2 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isFiler ? 'bg-emerald-600 text-white' : 'bg-[#050d08] text-slate-400 border border-[#00401a]'
                  }`}
                >
                  Active Filer
                </button>
                <button
                  type="button"
                  onClick={() => setIsFiler(false)}
                  className={`w-1/2 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    !isFiler ? 'bg-rose-600 text-white' : 'bg-[#050d08] text-slate-400 border border-[#00401a]'
                  }`}
                >
                  Non-Filer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output: 5 cols */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#06180d] to-[#040e07] border border-[#ffd700]/30 rounded-2xl p-6 space-y-5">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Total Estimated Excise Fee</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#ffd700] font-mono tabular-nums mt-1">
              Rs. {taxResult.totalPayablePKR.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-400 mt-1 font-mono">
              Vehicle: <span className="text-white">{taxResult.vehicleType}</span> ({province.toUpperCase()})
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-emerald-900/40 text-xs font-mono text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">Annual Token Tax:</span>
              <span className="text-white font-bold">Rs. {taxResult.annualTokenTax.toLocaleString()}</span>
            </div>
            {taxResult.advanceIncomeTaxWHT !== undefined && (
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Advance Income Tax (WHT):</span>
                <span className={isFiler ? 'text-slate-200' : 'text-rose-400'}>
                  Rs. {taxResult.advanceIncomeTaxWHT.toLocaleString()}
                </span>
              </div>
            )}
            {taxResult.registrationOrTransferWHT && taxResult.registrationOrTransferWHT > 0 && (
              <div className="flex justify-between text-amber-300">
                <span className="font-sans">Registration / Transfer WHT:</span>
                <span>Rs. {taxResult.registrationOrTransferWHT.toLocaleString()}</span>
              </div>
            )}
            {taxResult.cleanGreenCess !== undefined && (
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Clean Green Punjab / Cess:</span>
                <span className="text-slate-200">Rs. {taxResult.cleanGreenCess}</span>
              </div>
            )}
            {taxResult.professionalTax !== undefined && (
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Professional Tax:</span>
                <span className="text-slate-200">Rs. {taxResult.professionalTax}</span>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-lg bg-[#071a0f] border border-emerald-800/40 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{taxResult.note}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
