import React from 'react';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';

interface OfflineBannerProps {
  isOffline: boolean;
  wasOffline: boolean;
  lastUpdated: string;
  onRefresh: () => void;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  isOffline,
  wasOffline,
  lastUpdated,
  onRefresh
}) => {
  if (wasOffline && !isOffline) {
    return (
      <div className="bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-300 py-2 px-4 transition-all animate-in fade-in slide-in-from-top duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Internet Restored!</strong> RateZilla has automatically synced with live Sarafa, OGRA, and SBP forex rates.
            </span>
          </div>
          <span className="hidden sm:inline text-xs opacity-75">All live services operational</span>
        </div>
      </div>
    );
  }

  if (!isOffline) return null;

  return (
    <div className="bg-gradient-to-r from-amber-950/70 via-gray-900 to-amber-950/70 border-b border-amber-500/40 text-amber-200 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
            <WifiOff className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-amber-300">Offline Mode Active:</span> Showing cached market rates ({lastUpdated}). All 11 calculators (Solar, FBR Tax, Zakat, LESCO Bills, Gold) are <strong>100% operational offline</strong>.
          </div>
        </div>

        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Reconnecting</span>
        </button>
      </div>
    </div>
  );
};
