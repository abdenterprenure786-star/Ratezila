import React from 'react';
import { Headphones, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAudioGuides: () => void;
  onOpenSpeedTest: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAudioGuides,
  onOpenSpeedTest,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#050d08]/95 backdrop-blur-md border-b border-[#00401a]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single element Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('gold');
              }}
              className="group flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-white whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ffd700] to-[#b39700] flex items-center justify-center shadow-lg shadow-[#ffd700]/10">
                <span className="text-[#050d08] font-black text-lg">R</span>
              </div>
              <span className="text-white group-hover:text-[#ffd700] transition-colors">
                Rate<span className="text-[#ffd700]">Zilla</span>
              </span>
            </a>
            <span className="hidden sm:inline-block text-[11px] font-medium text-emerald-400/80 px-2 py-0.5 rounded bg-[#00401a]/60 border border-emerald-500/20 whitespace-nowrap">
              Pakistan Live Hub
            </span>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('gold')}
              className={`hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'gold' ? 'text-[#ffd700] font-semibold' : ''
              }`}
            >
              Sarafa Gold
            </button>
            <button
              onClick={() => setActiveTab('solar')}
              className={`hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'solar' ? 'text-[#ffd700] font-semibold' : ''
              }`}
            >
              Solar Estimator
            </button>
            <button
              onClick={() => setActiveTab('fuel')}
              className={`hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'fuel' ? 'text-[#ffd700] font-semibold' : ''
              }`}
            >
              OGRA Fuel
            </button>
            <button
              onClick={() => setActiveTab('electricity')}
              className={`hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'electricity' ? 'text-[#ffd700] font-semibold' : ''
              }`}
            >
              WAPDA Bills
            </button>
            <button
              onClick={() => setActiveTab('tax')}
              className={`hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'tax' ? 'text-[#ffd700] font-semibold' : ''
              }`}
            >
              FBR Tax
            </button>
            <button
              onClick={() => setActiveTab('mandi')}
              className={`hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'mandi' ? 'text-[#ffd700] font-semibold' : ''
              }`}
            >
              Ghalla Mandi
            </button>
          </nav>

          {/* Zone 3: Primary Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenSpeedTest}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-[#0a1f13] border border-emerald-500/30 rounded-lg hover:border-emerald-400 hover:text-white transition-all whitespace-nowrap shrink-0"
              title="Test real-time internet latency and speed"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Speed Test</span>
            </button>

            <button
              onClick={onOpenAudioGuides}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-[#050d08] bg-gradient-to-r from-[#ffd700] to-[#f0c400] hover:from-[#ffdf33] hover:to-[#ffd700] rounded-lg shadow-md shadow-[#ffd700]/15 hover:shadow-[#ffd700]/25 transition-all whitespace-nowrap shrink-0 active:scale-95"
            >
              <Headphones className="w-3.5 h-3.5 text-[#050d08]" />
              <span>Urdu Audio Guide</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
