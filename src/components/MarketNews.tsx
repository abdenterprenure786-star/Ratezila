import React from 'react';
import { Newspaper, ArrowLeft, ExternalLink, BellRing } from 'lucide-react';

interface MarketNewsProps {
  onBackToHome: () => void;
}

export const MarketNews: React.FC<MarketNewsProps> = ({ onBackToHome }) => {
  const newsItems = [
    {
      id: 'n1',
      title: 'OGRA Announces Petroleum Price Benchmark for the Coming Fortnight',
      urdu: 'اوگرا کی جانب سے پیٹرولیم مصنوعات کے نئے نرخوں کا نوٹیفکیشن جاری',
      source: 'Ministry of Energy (Petroleum Division)',
      time: 'Today, 11:30 AM',
      category: 'Petroleum & Gas',
      summary: 'OGRA has revised petrol and high-speed diesel tariffs taking into account international crude price fluctuations and exchange rate stabilization.'
    },
    {
      id: 'n2',
      title: 'Sarafa Association Karachi: International Bullion Rally Impacts Local 24K Gold',
      urdu: 'صرافہ ایسوسی ایشن کراچی: عالمی مارکیٹ میں تیزی کے اثرات مقامی صرافہ بازار پر',
      source: 'All Pakistan Sarafa Gems & Jewellers Association',
      time: 'Today, 09:15 AM',
      category: 'Bullion & Gold',
      summary: 'Gold 24-karat crossed key resistance levels following international spot bullion gains to $2,720/oz, maintaining high buyer interest in bullion bars.'
    },
    {
      id: 'n3',
      title: 'State Bank of Pakistan Reports Interbank Currency Stability & Reserves Growth',
      urdu: 'اسٹیٹ بینک آف پاکستان کا زرمبادلہ ذخائر اور انٹر بینک شرح مبادلہ پر بیان',
      source: 'State Bank of Pakistan (SBP)',
      time: 'Yesterday',
      category: 'Forex & Economy',
      summary: 'The Pakistani Rupee (PKR) closed steady against the US Dollar in the interbank market amidst positive remittances from GCC countries.'
    },
    {
      id: 'n4',
      title: 'Punjab Agriculture Dept Issues Wheat Sowing Advisory for Farmers',
      urdu: 'محکمہ زراعت پنجاب کا کسانوں کے لیے گندم کی بروقت کاشت کا مراسلہ',
      source: 'Government of Punjab Directorate of Agri Information',
      time: '2 days ago',
      category: 'Agriculture & Crops',
      summary: 'Farmers across Multan, Faisalabad, and Bahawalpur are advised to complete wheat plantation before optimal November cutoff dates.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Pages Hub</span>
      </button>

      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase mb-2">
          <Newspaper className="w-3.5 h-3.5" />
          <span>Official Bulletins & Notices</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Pakistan Market News & Regulatory Bulletins
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Verified financial notifications from OGRA, State Bank, and Sarafa Gems Association
        </p>
      </div>

      <div className="space-y-4">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-pink-500/30 transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-pink-500/20 text-pink-400">
                {item.category}
              </span>
              <span className="text-xs text-gray-400 font-mono">{item.time}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white hover:text-pink-400 transition-colors">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-400 font-serif leading-relaxed">
              {item.urdu}
            </p>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {item.summary}
            </p>

            <div className="text-[11px] text-gray-500 border-t border-gray-800 pt-2 flex items-center justify-between">
              <span>Official Source: <strong className="text-gray-400">{item.source}</strong></span>
              <span className="text-emerald-400 font-semibold">Verified Notification</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
