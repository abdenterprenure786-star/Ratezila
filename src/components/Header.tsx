import React from 'react';
import { Menu, Sun, Moon, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { RateZillaLogo } from './RateZillaLogo';

interface HeaderProps {
  onOpenSideMenu: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenRatesUpdater: () => void;
  onOpenProModal: () => void;
  isOffline: boolean;
  onRefreshRates: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSideMenu,
  theme,
  onToggleTheme,
  onOpenRatesUpdater,
  onOpenProModal,
  isOffline,
  onRefreshRates,
  onGoHome
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0b0f19]/85 dark:bg-[#0b0f19]/95 border-b border-gray-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 min-h-[72px] flex items-center justify-between">
        {/* Brand Logo & PRO Button Directly Under Logo */}
        <div className="flex flex-col items-start gap-1">
          <div onClick={onGoHome} className="cursor-pointer flex items-center gap-3">
            <RateZillaLogo size="md" />
          </div>

          {/* User Request: Button labeled '✨ PRO' directly under logo with neon green/cyan gradient */}
          <button
            onClick={onOpenProModal}
            className="pro-badge ml-14 sm:ml-16 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#00FF87] to-[#60EFFF] text-[#0b0f19] text-[11px] font-black tracking-wider uppercase shadow-[0_0_12px_rgba(0,255,135,0.35)] hover:shadow-[0_0_18px_rgba(96,239,255,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#00FF87]/40"
            title="Upgrade to RateZilla PRO (Rs. 300 / month)"
          >
            <span>✨ PRO</span>
          </button>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Offline / Live Status Pill */}
          <div
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isOffline
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>Offline (Cached Rates)</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Wifi className="w-3.5 h-3.5" />
                <span>Live Markets</span>
              </>
            )}
          </div>

          {/* Quick Refresh */}
          <button
            onClick={onRefreshRates}
            title="Refresh Market Rates"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-gray-800/60 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700/60 transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden md:inline">Sync Rates</span>
          </button>

          {/* Rates Updater Script Modal Trigger */}
          <button
            onClick={onOpenRatesUpdater}
            title="Update Rates Manual / Script"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all cursor-pointer"
          >
            <span>Update Rates</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-xl bg-gray-800/60 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700/60 transition-all cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* 3-Lines Side Drawer Menu Button */}
          <button
            onClick={onOpenSideMenu}
            aria-label="Open 3-Lines Menu"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#00FF87]/15 hover:bg-[#00FF87]/25 text-[#00FF87] border border-[#00FF87]/40 font-bold text-xs transition-all cursor-pointer group"
          >
            {/* 3 Clean Horizontal Lines */}
            <div className="flex flex-col gap-1 w-4">
              <span className="w-full h-0.5 bg-[#00FF87] rounded-full transition-transform group-hover:scale-x-110" />
              <span className="w-full h-0.5 bg-[#00FF87] rounded-full transition-transform group-hover:scale-x-110" />
              <span className="w-full h-0.5 bg-[#00FF87] rounded-full transition-transform group-hover:scale-x-110" />
            </div>
            <span className="hidden xs:inline">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
