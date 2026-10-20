import React, { useState } from 'react';
import { Zap, ExternalLink, ShieldCheck, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { calculateElectricityBill } from '../services/clientCalculators.js';

const discoPortals = [
  { id: 'LESCO', name: 'LESCO (Lahore Electric Supply Company)', duplicateUrl: 'http://www.lesco.gov.pk/' },
  { id: 'MEPCO', name: 'MEPCO (Multan Electric Power Company)', duplicateUrl: 'https://bill.pitc.com.pk/mepcobill' },
  { id: 'KELECTRIC', name: 'K-Electric (Karachi Electric)', duplicateUrl: 'https://www.ke.com.pk/customer-services/bill-and-payment-options/' },
  { id: 'IESCO', name: 'IESCO (Islamabad Electric Supply Company)', duplicateUrl: 'https://bill.pitc.com.pk/iescobill' },
  { id: 'FESCO', name: 'FESCO (Faisalabad Electric Supply Company)', duplicateUrl: 'https://bill.pitc.com.pk/fescobill' },
  { id: 'GEPCO', name: 'GEPCO (Gujranwala Electric Power Company)', duplicateUrl: 'https://bill.pitc.com.pk/gepcobill' },
  { id: 'PESCO', name: 'PESCO (Peshawar Electric Supply Company)', duplicateUrl: 'https://bill.pitc.com.pk/pescobill' },
  { id: 'HESCO', name: 'HESCO (Hyderabad Electric Supply Company)', duplicateUrl: 'https://bill.pitc.com.pk/hescobill' },
  { id: 'QESCO', name: 'QESCO (Quetta Electric Supply Company)', duplicateUrl: 'https://bill.pitc.com.pk/qescobill' },
  { id: 'SEPCO', name: 'SEPCO (Sukkur Electric Power Company)', duplicateUrl: 'https://bill.pitc.com.pk/sepcobill' },
];

export const ElectricitySection: React.FC = () => {
  const [selectedDisco, setSelectedDisco] = useState<string>('LESCO');
  const [units, setUnits] = useState<number>(240);
  const [isProtected, setIsProtected] = useState<boolean>(true);
  const [meterPhase, setMeterPhase] = useState<'single' | 'three_phase'>('single');
  const [peakUnits, setPeakUnits] = useState<number>(0);
  const [offPeakUnits, setOffPeakUnits] = useState<number>(0);
  const [isFiler, setIsFiler] = useState<boolean>(true);

  // Duplicate bill quick search state
  const [referenceNumber, setReferenceNumber] = useState<string>('');

  const billResult = calculateElectricityBill({
    disco: selectedDisco,
    unitsConsumed: meterPhase === 'three_phase' ? peakUnits + offPeakUnits : units,
    isProtected,
    meterPhase,
    peakUnits: meterPhase === 'three_phase' ? peakUnits : undefined,
    offPeakUnits: meterPhase === 'three_phase' ? offPeakUnits : undefined,
    isFiler,
  });

  const activePortal = discoPortals.find((d) => d.id === selectedDisco) || discoPortals[0];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003816] via-[#051f0f] to-[#08130a] border border-[#00401a]">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <Zap className="w-4 h-4 text-[#ffd700]" />
            <span>NEPRA Domestic Tariff & DISCO Verification Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Electricity Bill Estimator & <span className="text-[#ffd700]">Duplicate Bill Portal</span>
          </h2>
          <p className="text-sm text-slate-300">
            Estimate your exact monthly power bill with active NEPRA tariff slabs, Fuel Charges Adjustment (FCA), GST (18%), and Section 235 advance income tax.
          </p>
        </div>
      </div>

      {/* 2-Column Grid: Form & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs: 7 Cols */}
        <div className="lg:col-span-7 bg-[#08170e] border border-[#00401a] rounded-2xl p-6 space-y-5">
          {/* DISCO Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Distribution Company (DISCO)</label>
            <select
              value={selectedDisco}
              onChange={(e) => setSelectedDisco(e.target.value)}
              className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#ffd700]"
            >
              {discoPortals.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Meter Phase & Protected Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Meter Type</label>
              <select
                value={meterPhase}
                onChange={(e: any) => setMeterPhase(e.target.value)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ffd700]"
              >
                <option value="single">Single Phase (Standard Domestic)</option>
                <option value="three_phase">3-Phase Time of Use (Peak & Off-Peak)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Consumer Protected Category</label>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="protectedCheck"
                  checked={isProtected}
                  onChange={(e) => setIsProtected(e.target.checked)}
                  className="accent-[#ffd700] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="protectedCheck" className="text-xs text-slate-300 cursor-pointer">
                  Protected (Under 200 units for 6 months)
                </label>
              </div>
            </div>
          </div>

          {/* Units Input */}
          {meterPhase === 'single' ? (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Total Units Consumed (kWh)</label>
              <input
                type="number"
                min="0"
                value={units}
                onChange={(e) => setUnits(parseInt(e.target.value) || 0)}
                className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-sm text-white font-mono outline-none focus:border-[#ffd700]"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-amber-300">Peak Units (Rs. 41.89/unit)</label>
                <input
                  type="number"
                  min="0"
                  value={peakUnits}
                  onChange={(e) => setPeakUnits(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-sm text-white font-mono outline-none focus:border-[#ffd700]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-emerald-300">Off-Peak Units (Rs. 35.57/unit)</label>
                <input
                  type="number"
                  min="0"
                  value={offPeakUnits}
                  onChange={(e) => setOffPeakUnits(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2 text-sm text-white font-mono outline-none focus:border-[#ffd700]"
                />
              </div>
            </div>
          )}

          {/* Filer / Non-Filer Status for Section 235 Tax */}
          <div className="p-3 bg-[#050d08] rounded-xl border border-emerald-900/40 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-white">FBR Active Taxpayer List (ATL) Status</div>
              <div className="text-[11px] text-slate-400">
                Non-filers with residential bills exceeding Rs. 25,000 pay 7.5% Advance Income Tax.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFiler(true)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  isFiler ? 'bg-emerald-600 text-white' : 'bg-[#091a0e] text-slate-400'
                }`}
              >
                Filer (0% Tax)
              </button>
              <button
                type="button"
                onClick={() => setIsFiler(false)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  !isFiler ? 'bg-rose-600 text-white' : 'bg-[#091a0e] text-slate-400'
                }`}
              >
                Non-Filer (+7.5%)
              </button>
            </div>
          </div>

          {/* Duplicate Bill Finder Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#041309] to-[#071d0e] border border-emerald-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#ffd700]" />
                Official {selectedDisco} Duplicate Bill Online
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">14-Digit Ref No</span>
            </div>

            <p className="text-xs text-slate-300">
              Access the official online duplicate bill portal for {selectedDisco} to view, download PDF, or check current billing due dates:
            </p>

            <a
              href={activePortal.duplicateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#00401a] hover:bg-[#005724] text-white text-xs font-semibold rounded-lg border border-emerald-500/30 transition-all shadow-md"
            >
              <span>Open {selectedDisco} Duplicate Bill Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Output: 5 Cols */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#06180d] to-[#040e07] border border-[#ffd700]/30 rounded-2xl p-6 space-y-5">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Total Estimated Electricity Bill</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#ffd700] font-mono tabular-nums mt-1">
              Rs. {billResult.grandTotalBill.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
              <span>Effective Cost per Unit:</span>
              <span className="font-mono text-white font-bold">Rs. {billResult.effectiveUnitCost}/kWh</span>
            </div>
          </div>

          {/* Itemized NEPRA Surcharges & Taxes */}
          <div className="space-y-2 pt-3 border-t border-emerald-900/40 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">Base Energy Charges:</span>
              <span className="text-white font-bold">Rs. {billResult.baseEnergyCharges.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">Fuel Adjustment (FCA @ 3.41):</span>
              <span className="text-slate-200">Rs. {billResult.fcaCharges.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">Quarterly Adjustment (QTA):</span>
              <span className="text-slate-200">Rs. {billResult.qtaCharges.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">Electricity Duty (1.5%):</span>
              <span className="text-slate-200">Rs. {billResult.electricityDuty.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">PTV Fee:</span>
              <span className="text-slate-200">Rs. {billResult.tvFee.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-amber-300">
              <span className="text-slate-400 font-sans">General Sales Tax (GST 18%):</span>
              <span>Rs. {billResult.gst18Percent.toLocaleString()}</span>
            </div>
            {billResult.fbrSection235Tax > 0 && (
              <div className="flex justify-between text-rose-400">
                <span className="font-sans">Non-Filer Tax (Sec 235 @ 7.5%):</span>
                <span>+Rs. {billResult.fbrSection235Tax.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Saving Advisory */}
          <div className="p-3 rounded-lg bg-[#071a0f] border border-emerald-800/50 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{billResult.savingTip}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
