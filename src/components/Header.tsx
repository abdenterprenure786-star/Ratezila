import React from 'react';
import {
  Menu,
  Sun,
  Moon,
  Sparkles,
  Headphones,
  Bell,
  Home,
  Zap,
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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-[#0a0f1d]/90 border-b border-gray-200 dark:border-[#1f2937] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Left: Brand Logo & Web Name */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          title="RateZilla Home Hub"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            R
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black font-heading tracking-tight bg-gradient-to-r from-gray-900 via-emerald-600 to-green-500 dark:from-white dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
              RateZilla
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 -mt-1 tracking-wide">
              Pakistan Live Market &amp; Utility Portal
            </span>
          </div>
        </div>

        {/* Center: Quick navigation links for wide screens */}
        <nav className="hidden lg:flex items-center space-x-1 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>All Portals</span>
          </button>
          <button
            onClick={() => setActiveTab('gold')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeTab === 'gold'
                ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                : 'text-gray-600 dark:text-gray-300 hover:text-amber-500'
            }`}
          >
            Gold 24K
          </button>
          <button
            onClick={() => setActiveTab('solar')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeTab === 'solar'
                ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/40'
                : 'text-gray-600 dark:text-gray-300 hover:text-yellow-500'
            }`}
          >
            Solar
          </button>
          <button
            onClick={() => setActiveTab('fuel')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeTab === 'fuel'
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
            }`}
          >
            OGRA Fuel
          </button>
          <button
            onClick={() => setActiveTab('tax')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeTab === 'tax'
                ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40'
                : 'text-gray-600 dark:text-gray-300 hover:text-purple-500'
            }`}
          >
            FBR Tax
          </button>
          <button
            onClick={() => setActiveTab('electricity')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeTab === 'electricity'
                ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                : 'text-gray-600 dark:text-gray-300 hover:text-rose-500'
            }`}
          >
            WAPDA Bills
          </button>
        </nav>

        {/* Right Controls: Update Rates, Theme Switcher & 3-Line Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Update Rates Script Button */}
          <button
            type="button"
            onClick={onOpenRatesUpdater}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-xs font-bold transition-all hover:scale-105 active:scale-95"
            title="Update Rates or customize rate script"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Update Rates</span>
          </button>

          {/* Price Alerts */}
          <button
            type="button"
            onClick={onOpenAlerts}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 dark:bg-[#111827] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#1f2937] hover:border-emerald-500 text-xs font-bold transition-all hover:scale-105 active:scale-95"
            title="Daily market notifications & price drop alerts"
          >
            <Bell className="w-3.5 h-3.5 text-amber-500" />
            <span>Alerts</span>
          </button>

          {/* Light / Dark Mode Button */}
          <button
            id="themeToggle"
            type="button"
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-[#1f2937] text-gray-700 dark:text-gray-300 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none hover:scale-105 active:scale-95"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* 3-Lines Menu Drawer Button */}
          <button
            id="menuBtn"
            type="button"
            onClick={onOpenSideMenu}
            className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20 transition-all duration-200 focus:outline-none hover:scale-105 active:scale-95"
            title="Open 3-Lines Navigation Menu"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
