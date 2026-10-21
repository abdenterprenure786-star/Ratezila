import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Code2,
  Copy,
  Check,
  Download,
  Upload,
  Coins,
  Fuel,
  Sun,
  DollarSign,
  Sparkles,
} from 'lucide-react';

export interface CustomRatesConfig {
  gold24kTola: number;
  gold22kTola: number;
  gold21kTola: number;
  gold18kTola: number;
  silverTola: number;
  petrolPrice: number;
  dieselPrice: number;
  hobcPrice: number;
  lpgCylinderPrice: number;
  lpgKgPrice: number;
  solarWattPrice: number;
  usdPkr: number;
  lastUpdated: string;
}

export const DEFAULT_RATES: CustomRatesConfig = {
  gold24kTola: 429500,
  gold22kTola: 393708,
  gold21kTola: 375813,
  gold18kTola: 322121,
  silverTola: 6282,
  petrolPrice: 382.02,
  dieselPrice: 389.80,
  hobcPrice: 415.00,
  lpgCylinderPrice: 3300.00,
  lpgKgPrice: 279.34,
  solarWattPrice: 41.50,
  usdPkr: 278.35,
  lastUpdated: new Date().toISOString(),
};

interface RatesUpdaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRates?: Partial<CustomRatesConfig>;
  onSaveRates: (rates: CustomRatesConfig) => void;
}

export const RatesUpdaterModal: React.FC<RatesUpdaterModalProps> = ({
  isOpen,
  onClose,
  currentRates,
  onSaveRates,
}) => {
  const [formData, setFormData] = useState<CustomRatesConfig>({
    ...DEFAULT_RATES,
    ...currentRates,
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'json' | 'script'>('editor');
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(formData, null, 2)
  );
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof CustomRatesConfig, val: number) => {
    const updated = {
      ...formData,
      [field]: isNaN(val) ? 0 : val,
      lastUpdated: new Date().toISOString(),
    };
    setFormData(updated);
    setJsonInput(JSON.stringify(updated, null, 2));
  };

  const handleSave = () => {
    const finalData = {
      ...formData,
      lastUpdated: new Date().toISOString(),
    };
    onSaveRates(finalData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm('Reset all rates back to official Sarafa & OGRA benchmarks?')) {
      setFormData(DEFAULT_RATES);
      setJsonInput(JSON.stringify(DEFAULT_RATES, null, 2));
      onSaveRates(DEFAULT_RATES);
    }
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormData({
        ...DEFAULT_RATES,
        ...parsed,
        lastUpdated: new Date().toISOString(),
      });
      alert('Rates JSON successfully parsed! Click "Save & Apply Live" to activate.');
    } catch {
      alert('Invalid JSON format. Please verify the JSON syntax.');
    }
  };

  const serverScriptCode = `// RateZilla CLI / Node.js Standalone Rates Update Script
// Run via: node updateRates.js OR paste into server/data/ratesData.ts

export const latestRates = ${JSON.stringify(formData, null, 2)};

console.log("✅ RateZilla rates updated successfully!");
console.log("24K Gold: Rs. " + latestRates.gold24kTola);
console.log("Petrol: Rs. " + latestRates.petrolPrice);
`;

  const copyServerScript = async () => {
    try {
      await navigator.clipboard.writeText(serverScriptCode);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } catch {}
  };

  const downloadJson = () => {
    const blob = new Blob([jsonInput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ratezilla_rates_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#07170d] dark:bg-[#07170d] text-slate-100 border border-[#ffd700]/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#00401a]/60 bg-[#040e08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ffd700] to-[#b89b00] flex items-center justify-center text-[#050d08] font-black">
              <Sparkles className="w-5 h-5 text-[#050d08]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                RateZilla Live Rates Manager &amp; Script Tool
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00401a] text-[#ffd700] border border-[#ffd700]/30">
                  Custom Rates Hub
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Update market prices on the fly, export JSON scripts, or sync offline engines.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-[#051109] border-b border-[#00401a]/40 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'editor'
                ? 'bg-[#00401a] text-[#ffd700] border border-[#ffd700]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Interactive Rate Form
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'json'
                ? 'bg-[#00401a] text-[#ffd700] border border-[#ffd700]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            JSON Script Import / Export
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'script'
                ? 'bg-[#00401a] text-[#ffd700] border border-[#ffd700]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Node.js / Server Snippet
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'editor' && (
            <div className="space-y-6">
              {/* Gold Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#ffd700] uppercase tracking-wider">
                  <Coins className="w-4 h-4" />
                  <span>Sarafa Gold &amp; Bullion Benchmarks (PKR)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      24K Pure Gold (Per Tola)
                    </label>
                    <input
                      type="number"
                      value={formData.gold24kTola}
                      onChange={(e) =>
                        handleChange('gold24kTola', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      22K Jewellery Gold (Per Tola)
                    </label>
                    <input
                      type="number"
                      value={formData.gold22kTola}
                      onChange={(e) =>
                        handleChange('gold22kTola', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Chandi / Silver (Per Tola)
                    </label>
                    <input
                      type="number"
                      value={formData.silverTola}
                      onChange={(e) =>
                        handleChange('silverTola', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      21K Traditional (Per Tola)
                    </label>
                    <input
                      type="number"
                      value={formData.gold21kTola}
                      onChange={(e) =>
                        handleChange('gold21kTola', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      18K Diamond Mount (Per Tola)
                    </label>
                    <input
                      type="number"
                      value={formData.gold18kTola}
                      onChange={(e) =>
                        handleChange('gold18kTola', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      USD to PKR (Interbank / SBP)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={formData.usdPkr}
                      onChange={(e) =>
                        handleChange('usdPkr', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Fuel & Gas Section */}
              <div className="space-y-3 pt-3 border-t border-[#00401a]/40">
                <div className="flex items-center gap-2 text-xs font-bold text-[#ffd700] uppercase tracking-wider">
                  <Fuel className="w-4 h-4" />
                  <span>OGRA Fuel &amp; LPG Benchmarks (PKR)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Petrol (Premier Euro 5 / Litre)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.petrolPrice}
                      onChange={(e) =>
                        handleChange('petrolPrice', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      High Speed Diesel (HSD / Litre)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.dieselPrice}
                      onChange={(e) =>
                        handleChange('dieselPrice', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      High Octane (HOBC / Litre)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.hobcPrice}
                      onChange={(e) =>
                        handleChange('hobcPrice', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      LPG Domestic Cylinder (11.8 Kg)
                    </label>
                    <input
                      type="number"
                      value={formData.lpgCylinderPrice}
                      onChange={(e) =>
                        handleChange('lpgCylinderPrice', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      LPG Per Kg Base Rate
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.lpgKgPrice}
                      onChange={(e) =>
                        handleChange('lpgKgPrice', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Solar Tier-1 (Per Watt PKR)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.solarWattPrice}
                      onChange={(e) =>
                        handleChange('solarWattPrice', parseFloat(e.target.value))
                      }
                      className="w-full bg-[#030905] border border-[#00401a] focus:border-[#ffd700] rounded-xl px-3 py-2 text-sm font-mono text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">
                  Custom Rates JSON Configuration
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadJson}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#00401a] text-[#ffd700] hover:bg-[#005724] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON</span>
                  </button>
                  <button
                    onClick={handleImportJson}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Parse &amp; Apply JSON</span>
                  </button>
                </div>
              </div>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={12}
                className="w-full bg-[#030905] font-mono text-xs text-emerald-300 p-4 rounded-xl border border-[#00401a] outline-none focus:border-[#ffd700]"
                placeholder="Paste rates JSON here..."
              />
            </div>
          )}

          {activeTab === 'script' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">
                  Node.js / Express Server Update Script
                </span>
                <button
                  onClick={copyServerScript}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#00401a] text-[#ffd700] hover:bg-[#005724] transition-colors"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-[#030905] rounded-xl border border-[#00401a] text-xs font-mono text-emerald-300 overflow-x-auto">
                {serverScriptCode}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-t border-[#00401a]/60 bg-[#040e08]">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-800/40 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Official Benchmarks</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-[#050d08] bg-gradient-to-r from-[#ffd700] to-[#e6c200] hover:from-[#ffe033] hover:to-[#ffd700] rounded-xl shadow-lg shadow-[#ffd700]/20 transition-all active:scale-95"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#050d08]" />
                  <span>Applied Live!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#050d08]" />
                  <span>Save &amp; Apply Live</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
