import React, { useState } from 'react';
import { X, Check, Copy, Zap, Ban, BarChart3, Sparkles, ShieldCheck } from 'lucide-react';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const jazzCashNumber = '03064678975';

  if (!isOpen) return null;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(jazzCashNumber);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Centered Modal Overlay with Dark Background & Glowing Neon Green Border */}
      <div className="relative w-full max-w-md bg-[#111827] rounded-3xl border border-[#00FF87]/60 shadow-[0_0_40px_rgba(0,255,135,0.22)] p-6 sm:p-8 text-white z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button (X) at Top Right */}
        <button
          onClick={onClose}
          aria-label="Close PRO Modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer border border-gray-700/60"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#00FF87]/20 to-[#60EFFF]/20 border border-[#00FF87]/40 text-[#00FF87] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Membership</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span>RateZilla</span>
            <span className="bg-gradient-to-r from-[#00FF87] to-[#60EFFF] bg-clip-text text-transparent">
              PRO
            </span>
          </h2>

          {/* Price Display */}
          <div className="pt-2">
            <div className="inline-block px-4 py-2 rounded-2xl bg-gray-900/90 border border-emerald-500/30">
              <span className="text-3xl font-black text-[#00FF87] font-mono">Rs. 300</span>
              <span className="text-sm font-semibold text-gray-400 ml-1.5">/ month</span>
            </div>
          </div>
        </div>

        {/* Bullet Features List (in English) */}
        <div className="space-y-3 mb-6 bg-gray-900/70 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-start gap-3 text-sm">
            <div className="p-1.5 rounded-lg bg-[#00FF87]/15 text-[#00FF87] shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">Instant Push Notifications</span>
              <span className="text-xs text-gray-400">Immediate alerts whenever gold, fuel or currency rates update.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm">
            <div className="p-1.5 rounded-lg bg-[#60EFFF]/15 text-[#60EFFF] shrink-0 mt-0.5">
              <Ban className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">100% Ad-Free Experience</span>
              <span className="text-xs text-gray-400">Clean, ultra-fast & distraction-free market financial portal.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm">
            <div className="p-1.5 rounded-lg bg-emerald-400/15 text-emerald-400 shrink-0 mt-0.5">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">Priority Live Market Analytics</span>
              <span className="text-xs text-gray-400">Deep interbank spread sheets, historical trends & forecasting.</span>
            </div>
          </div>
        </div>

        {/* Payment Details Box */}
        <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-[#0e1626] border border-[#00FF87]/30 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-gray-800 pb-2">
            <span className="text-gray-400 font-medium">Payment Method:</span>
            <span className="font-bold text-amber-400 flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              JazzCash
            </span>
          </div>

          {/* Number Display & Copy Button */}
          <div className="flex items-center justify-between bg-black/40 rounded-xl p-3 border border-gray-800">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">
                JazzCash Number
              </span>
              <span className="text-lg font-black text-white font-mono tracking-wider">
                {jazzCashNumber}
              </span>
            </div>

            <button
              onClick={handleCopyNumber}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                copied
                  ? 'bg-emerald-500 text-gray-950 font-black'
                  : 'bg-gradient-to-r from-[#00FF87] to-[#60EFFF] hover:opacity-90 text-gray-950 font-black'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Small Note at the Bottom */}
          <div className="flex items-start gap-2 pt-1">
            <ShieldCheck className="w-4 h-4 text-[#00FF87] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              Send <strong className="text-white">Rs. 300</strong> to the JazzCash number above and share the payment screenshot to activate PRO.
            </p>
          </div>
        </div>

        {/* Confirmation Toast */}
        {showToast && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Number {jazzCashNumber} copied to clipboard!</span>
          </div>
        )}
      </div>
    </div>
  );
};
