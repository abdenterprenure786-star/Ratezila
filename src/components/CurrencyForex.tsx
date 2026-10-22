import React, { useState } from 'react';
import { DollarSign, ArrowLeft, ArrowRightLeft, Share2, Check } from 'lucide-react';
import { CurrencyRate, CryptoRate } from '../types';

interface CurrencyForexProps {
  currencies: CurrencyRate[];
  cryptos: CryptoRate[];
  onBackToHome: () => void;
}

export const CurrencyForex: React.FC<CurrencyForexProps> = ({
  currencies,
  cryptos,
  onBackToHome
}) => {
  const [amount, setAmount] = useState(100);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [direction, setDirection] = useState<'foreignToPkr' | 'pkrToForeign'>('foreignToPkr');
  const [copied, setCopied] = useState(false);

  const curr = currencies.find((c) => c.code === selectedCurrency) || currencies[0];
  const rate = curr?.interbankSell || 278.35;

  const convertedAmount =
    direction === 'foreignToPkr' ? amount * rate : amount / rate;

  const handleShare = () => {
    const text = `Today Currency Rates Pakistan: USD to PKR: Rs. ${currencies[0]?.interbankSell} | SAR to PKR: Rs. ${currencies[3]?.interbankSell} | AED: Rs. ${currencies[4]?.interbankSell}. Live on RateZilla.`;
    if (navigator.share) {
      navigator.share({ title: 'Currency Exchange Rates Pakistan - RateZilla', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Pages Hub</span>
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase mb-2">
            <DollarSign className="w-3.5 h-3.5" />
            <span>State Bank of Pakistan (SBP)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Forex Currency Exchange & Crypto Rates
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Real-time interbank sell/buy rates and Open Market foreign exchange in Pakistan
          </p>
        </div>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-400 border border-indigo-500/30 text-xs font-bold transition-all self-start sm:self-center cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Rates Copied!' : 'Share Forex Rates'}</span>
        </button>
      </div>

      {/* Converter Box */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-5">
        <h2 className="text-lg font-bold text-white">Live Currency Converter (PKR)</h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Amount to Convert
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Currency</label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-400"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              onClick={() =>
                setDirection(direction === 'foreignToPkr' ? 'pkrToForeign' : 'foreignToPkr')
              }
              className="w-full py-2.5 px-3 rounded-xl bg-gray-800 hover:bg-gray-750 text-indigo-400 border border-gray-700 flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-colors"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>
                {direction === 'foreignToPkr' ? `${selectedCurrency} ➔ PKR` : `PKR ➔ ${selectedCurrency}`}
              </span>
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-xs text-gray-400 block">Converted Total</span>
            <span className="text-lg font-extrabold text-[#00FF87] font-mono">
              {direction === 'foreignToPkr' ? `Rs. ${convertedAmount.toFixed(2)}` : `${curr.symbol} ${convertedAmount.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Currencies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currencies.map((c) => (
          <div
            key={c.code}
            className="p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{c.flag}</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                  {c.code}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{c.name}</h3>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Interbank Sell:</span>
                  <span className="font-bold text-indigo-400 font-mono">
                    Rs. {c.interbankSell.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Interbank Buy:</span>
                  <span className="font-semibold text-gray-300 font-mono">
                    Rs. {c.interbankBuy.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Open Market Sell:</span>
                  <span className="font-semibold text-emerald-400 font-mono">
                    Rs. {c.openMarketSell.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Crypto Benchmarks */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
        <h2 className="text-lg font-bold text-white">Top Cryptocurrency PKR Estimates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cryptos.map((cr) => (
            <div key={cr.symbol} className="p-4 rounded-xl bg-gray-950 border border-gray-800">
              <span className="text-xs font-bold text-indigo-400">{cr.symbol}</span>
              <h4 className="text-sm font-semibold text-white mb-1">{cr.name}</h4>
              <span className="text-lg font-mono font-bold text-[#00FF87] block">
                Rs. {cr.pricePkr.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 font-mono">${cr.priceUsd.toLocaleString()} USD</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
