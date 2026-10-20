import React from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { GoldRateItem, FuelRateItem, CurrencyItem, CryptoRate } from '../types/market.js';

interface TickerBarProps {
  goldItem?: GoldRateItem;
  petrolItem?: FuelRateItem;
  dieselItem?: FuelRateItem;
  usdItem?: CurrencyItem;
  sarItem?: CurrencyItem;
  cryptoItem?: CryptoRate;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const TickerBar: React.FC<TickerBarProps> = ({
  goldItem,
  petrolItem,
  dieselItem,
  usdItem,
  sarItem,
  cryptoItem,
  onRefresh,
  isRefreshing,
}) => {
  return (
    <div className="bg-[#030805] border-b border-[#00401a]/30 overflow-x-auto text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 min-w-max">
        <div className="flex items-center gap-6 divide-x divide-emerald-900/40">
          {/* Market Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
              Live Markets
            </span>
            <span className="text-slate-500 text-[11px]">Pakistan Standard Time</span>
          </div>

          {/* 24K Gold */}
          <div className="pl-6 flex items-center gap-2">
            <span className="text-slate-400 font-medium">Gold 24K/Tola:</span>
            <span className="text-[#ffd700] font-mono font-bold">
              Rs. {goldItem?.perTola.toLocaleString() || '284,500'}
            </span>
            <span className="flex items-center text-emerald-400 text-[11px]">
              <ArrowUpRight className="w-3 h-3" />
              +Rs. {goldItem?.change24h || 1200}
            </span>
          </div>

          {/* Petrol */}
          <div className="pl-6 flex items-center gap-2">
            <span className="text-slate-400 font-medium">Petrol:</span>
            <span className="text-white font-mono font-semibold">
              Rs. {petrolItem?.currentPrice.toFixed(2) || '281.40'}/L
            </span>
          </div>

          {/* Diesel */}
          <div className="pl-6 flex items-center gap-2">
            <span className="text-slate-400 font-medium">Diesel:</span>
            <span className="text-white font-mono font-semibold">
              Rs. {dieselItem?.currentPrice.toFixed(2) || '289.15'}/L
            </span>
          </div>

          {/* USD to PKR */}
          <div className="pl-6 flex items-center gap-2">
            <span className="text-slate-400 font-medium">USD/PKR:</span>
            <span className="text-white font-mono font-semibold">
              {usdItem?.interbankSell.toFixed(2) || '278.35'}
            </span>
            <span className="text-slate-500 text-[10px]">Interbank</span>
          </div>

          {/* Saudi Riyal */}
          <div className="pl-6 flex items-center gap-2">
            <span className="text-slate-400 font-medium">SAR/PKR:</span>
            <span className="text-white font-mono font-semibold">
              {sarItem?.interbankSell.toFixed(2) || '74.15'}
            </span>
          </div>

          {/* BTC / PKR */}
          <div className="pl-6 flex items-center gap-2">
            <span className="text-slate-400 font-medium">BTC/PKR:</span>
            <span className="text-amber-400 font-mono font-semibold">
              Rs. {((cryptoItem?.pricePkr || 19049645) / 1000000).toFixed(2)}M
            </span>
            <span className="text-emerald-400 text-[11px] flex items-center">
              <ArrowUpRight className="w-3 h-3" />
              +{cryptoItem?.change24h || 2.45}%
            </span>
          </div>

          {/* Solar Tier-1 */}
          <div className="pl-6 flex items-center gap-2">
            <span className="text-slate-400 font-medium">Solar 580W N-Type:</span>
            <span className="text-emerald-300 font-mono font-semibold">Rs. 32.50/W</span>
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:text-white bg-[#08170e] hover:bg-[#0c2316] rounded border border-emerald-900/30 transition-colors"
          title="Force refresh live rates"
        >
          <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[#ffd700]' : ''}`} />
          <span>Sync</span>
        </button>
      </div>
    </div>
  );
};
