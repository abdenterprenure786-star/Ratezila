import React from 'react';
import {
  Menu,
  Headphones,
  Sparkles,
  Zap,
  Sun,
  Moon,
  Home,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSideMenu: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenRatesUpdater: () => void;
  onOpenAudioGuides: () => void;
  onOpenSpeedTest: () => void;
  onOpenAlerts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSideMenu,
  theme,
  onToggleTheme,
  onOpenRatesUpdater,
  onOpenAudioGuides,
  onOpenSpeedTest,
  onOpenAlerts,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#050d08]/95 dark:bg-[#050d08]/95 backdrop-blur-md border-b border-[#00401a]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Left: 3-Lines Side Menu Button + Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            {/* 3-Lines Hamburger Drawer Trigger */}
            <button
              type="button"
              onClick={onOpenSideMenu}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#00401a] hover:bg-[#005724] text-[#ffd700] border border-[#ffd700]/30 transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#00401a]/40"
              title="Open 3-Lines Side Menu with All Tools"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-[#ffd700]" />
              <span className="text-xs font-bold hidden sm:inline">Menu</span>
            </button>

            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('home');
              }}
              className="group flex items-center gap-2 text-xl font-extrabold tracking-tight text-white whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ffd700] to-[#b39700] flex items-center justify-center shadow-lg shadow-[#ffd700]/10">
                <span className="text-[#050d08] font-black text-lg">R</span>
              </div>
              <span className="text-white group-hover:text-[#ffd700] transition-colors">
                Rate<span className="text-[#ffd700]">Zilla</span>
              </span>
            </a>

            <span className="hidden md:inline-block text-[11px] font-medium text-emerald-400/90 px-2 py-0.5 rounded bg-[#00401a]/60 border border-emerald-500/20 whitespace-nowrap">
              Pakistan Live Hub
            </span>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('home')}
              className={`hover:text-[#ffd700] transition-colors whitespace-nowrap flex items-center gap-1 shrink-0 ${
                activeTab === 'home' ? 'text-[#ffd700] font-semibold' : ''
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>All Portals</span>
            </button>

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
          </nav>

          {/* Right: Actions, Theme Switch & Modals */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Update Rates Script Trigger */}
            <button
              onClick={onOpenRatesUpdater}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#ffd700] bg-[#00401a] border border-[#ffd700]/30 hover:border-[#ffd700] rounded-xl transition-all whitespace-nowrap hover:scale-105 active:scale-95"
              title="Update live rates or customize rates script"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Update Rates</span>
            </button>

            {/* Light / Dark Mode Switch */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-[#0a1e12] hover:bg-[#00401a] text-[#ffd700] border border-[#00401a] hover:border-[#ffd700]/40 transition-all hover:scale-105 active:scale-95"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#ffd700]" />
              ) : (
                <Moon className="w-4 h-4 text-[#ffd700]" />
              )}
            </button>

            {/* Alerts */}
            <button
              onClick={onOpenAlerts}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#ffd700] bg-[#0c2314] border border-[#ffd700]/30 hover:border-[#ffd700] rounded-xl transition-all whitespace-nowrap relative group"
              title="Subscribe to daily market alerts & price drop notifications"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd700] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffd700]"></span>
              </span>
              <span className="hidden sm:inline">Price Alerts</span>
            </button>

            {/* Speed Test */}
            <button
              onClick={onOpenSpeedTest}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-[#0a1f13] border border-emerald-500/30 rounded-xl hover:border-emerald-400 hover:text-white transition-all whitespace-nowrap"
              title="Test real-time internet latency and speed"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Speed Test</span>
            </button>

            {/* Urdu Audio Guide */}
            <button
              onClick={onOpenAudioGuides}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#050d08] bg-gradient-to-r from-[#ffd700] to-[#f0c400] hover:from-[#ffdf33] hover:to-[#ffd700] rounded-xl shadow-md shadow-[#ffd700]/15 hover:shadow-[#ffd700]/25 transition-all whitespace-nowrap active:scale-95"
            >
              <Headphones className="w-3.5 h-3.5 text-[#050d08]" />
              <span className="hidden md:inline">Urdu Audio</span>
              <span className="md:hidden">Audio</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
