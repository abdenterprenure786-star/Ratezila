import React, { useState } from 'react';
import { ArrowLeftRight, TrendingUp, DollarSign, Bitcoin, RefreshCw } from 'lucide-react';
import { CurrencyItem, CryptoRate } from '../types/market.js';

interface CurrencyCryptoSectionProps {
  currencies: CurrencyItem[];
  cryptos: CryptoRate[];
}

export const CurrencyCryptoSection: React.FC<CurrencyCryptoSectionProps> = ({
  currencies,
  cryptos,
}) => {
  // Converter State
  const [amount, setAmount] = useState<number>(100);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('USD');
  const [direction, setDirection] = useState<'foreign_to_pkr' | 'pkr_to_foreign'>('foreign_to_pkr');

  // Find rate
  const selectedCurr = currencies.find((c) => c.code === selectedCurrencyCode) || currencies[0];
  const selectedCrypto = cryptos.find((c) => c.symbol === selectedCurrencyCode);

  let unitRateInPkr = selectedCurr ? selectedCurr.openMarketSell : 280.5;
  if (selectedCrypto) {
    unitRateInPkr = selectedCrypto.pricePkr;
  }

  const convertedValue =
    direction === 'foreign_to_pkr' ? amount * unitRateInPkr : amount / unitRateInPkr;

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003816] via-[#05210f] to-[#07130a] border border-[#00401a]">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <DollarSign className="w-4 h-4 text-[#ffd700]" />
            <span>State Bank of Pakistan (SBP) & Forex Association Benchmarks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Forex Currency Exchange & <span className="text-[#ffd700]">Crypto Tracker</span>
          </h2>
          <p className="text-sm text-slate-300">
            Compare official SBP interbank and open market money changer buying/selling spreads, along with top cryptocurrency benchmarks in Pakistani Rupees.
          </p>
        </div>
      </div>

      {/* Live Converter Card */}
      <div className="bg-[#08170e] border border-[#ffd700]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#00401a] pb-4">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-[#ffd700]" />
            <h3 className="text-lg font-bold text-white">Live PKR Multi-Asset Converter</h3>
          </div>
          <button
            type="button"
            onClick={() =>
              setDirection(direction === 'foreign_to_pkr' ? 'pkr_to_foreign' : 'foreign_to_pkr')
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] text-xs font-semibold text-[#ffd700] transition-colors"
          >
            <span>Reverse Direction</span>
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Input Amount */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              {direction === 'foreign_to_pkr'
                ? `Amount in ${selectedCurrencyCode}`
                : 'Amount in Pakistani Rupee (PKR)'}
            </label>
            <div className="flex items-center rounded-lg border border-[#00401a] bg-[#050d08] px-3 py-2.5 focus-within:border-[#ffd700]">
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-transparent text-lg text-white font-mono font-bold outline-none"
              />
            </div>
          </div>

          {/* Asset Selector */}
          <div className="md:col-span-2 space-y-1.5 text-center">
            <label className="text-xs font-medium text-slate-400 block">Currency / Asset</label>
            <select
              value={selectedCurrencyCode}
              onChange={(e) => setSelectedCurrencyCode(e.target.value)}
              className="w-full bg-[#050d08] border border-[#00401a] rounded-lg px-3 py-2.5 text-sm font-bold text-[#ffd700] outline-none focus:border-[#ffd700]"
            >
              <optgroup label="Fiat Currencies">
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} – {c.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Cryptocurrencies">
                {cryptos.map((cr) => (
                  <option key={cr.symbol} value={cr.symbol}>
                    {cr.icon} {cr.symbol} – {cr.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Converted Output */}
          <div className="md:col-span-5 p-4 rounded-xl bg-gradient-to-r from-[#04140a] to-[#071f10] border border-[#00401a] space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              {direction === 'foreign_to_pkr'
                ? 'Equivalent in Pakistani Rupee (PKR)'
                : `Equivalent in ${selectedCurrencyCode}`}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#ffd700] font-mono tabular-nums">
              {direction === 'foreign_to_pkr' ? 'Rs. ' : ''}
              {convertedValue.toLocaleString(undefined, {
                maximumFractionDigits: direction === 'foreign_to_pkr' ? 2 : 6,
              })}
              {direction === 'pkr_to_foreign' ? ` ${selectedCurrencyCode}` : ''}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              1 {selectedCurrencyCode} = Rs. {unitRateInPkr.toLocaleString()} PKR
            </div>
          </div>
        </div>
      </div>

      {/* Tables: Forex Table + Crypto Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Currencies Table */}
        <div className="lg:col-span-7 bg-[#08170e] border border-[#00401a] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Forex Interbank vs Open Market</h3>
            <span className="text-[11px] font-mono text-emerald-400">Live SBP Quotes</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#00401a] text-slate-400">
                  <th className="py-2.5 font-medium">Currency</th>
                  <th className="py-2.5 font-medium text-right">Interbank Sell</th>
                  <th className="py-2.5 font-medium text-right">Open Market Buy</th>
                  <th className="py-2.5 font-medium text-right">Open Market Sell</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#00401a]/30 font-mono">
                {currencies.map((c) => (
                  <tr key={c.code} className="hover:bg-[#0c2415]/60 transition-colors">
                    <td className="py-2.5 font-sans font-medium text-slate-200">
                      <span className="mr-2">{c.flag}</span>
                      <strong className="text-white">{c.code}</strong>
                      <span className="text-[11px] text-slate-400 ml-1.5 hidden sm:inline">
                        ({c.name})
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-slate-300 tabular-nums">
                      Rs. {c.interbankSell.toFixed(2)}
                    </td>
                    <td className="py-2.5 text-right text-slate-300 tabular-nums">
                      Rs. {c.openMarketBuy.toFixed(2)}
                    </td>
                    <td className="py-2.5 text-right text-[#ffd700] font-bold tabular-nums">
                      Rs. {c.openMarketSell.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cryptocurrencies Table */}
        <div className="lg:col-span-5 bg-[#08170e] border border-[#00401a] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bitcoin className="w-4 h-4 text-amber-400" />
              <span>Crypto Benchmarks</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">PKR Benchmark</span>
          </div>

          <div className="space-y-3 font-mono">
            {cryptos.map((cr) => (
              <div
                key={cr.symbol}
                className="p-3 rounded-xl bg-[#050d08] border border-[#00401a] flex items-center justify-between hover:border-amber-400/40 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-600/30 flex items-center justify-center text-amber-300 font-bold text-sm">
                    {cr.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block font-sans">{cr.name}</span>
                    <span className="text-[11px] text-slate-400 block">${cr.priceUsd.toLocaleString()} USD</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-[#ffd700] tabular-nums">
                    Rs. {cr.pricePkr.toLocaleString()}
                  </div>
                  <span
                    className={`text-[10px] font-semibold ${
                      cr.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {cr.change24h >= 0 ? '+' : ''}{cr.change24h}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
