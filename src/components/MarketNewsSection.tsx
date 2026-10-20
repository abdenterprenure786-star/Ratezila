import React from 'react';
import { Newspaper, Clock, ArrowRight, BookmarkCheck, ExternalLink } from 'lucide-react';
import { MarketNewsItem } from '../types/market.js';

interface MarketNewsSectionProps {
  news: MarketNewsItem[];
}

export const MarketNewsSection: React.FC<MarketNewsSectionProps> = ({ news }) => {
  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003816] via-[#05210f] to-[#07130a] border border-[#00401a]">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <Newspaper className="w-4 h-4 text-[#ffd700]" />
            <span>Pakistan Economic Bulletins & Live Market Notifications</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Market News, OGRA Circulars & <span className="text-[#ffd700]">Sarafa Bulletins</span>
          </h2>
          <p className="text-sm text-slate-300">
            Read daily updates, regulatory policy notifications, and market analysis across gold bullion, petroleum pricing, solar imports, and agricultural trade.
          </p>
        </div>
      </div>

      {/* News Feed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <article
            key={item.id}
            className="p-6 rounded-2xl bg-[#08170e] border border-[#00401a] hover:border-[#ffd700]/40 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-emerald-400 uppercase font-semibold">
                  {item.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {item.date} · {item.readTime}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white hover:text-[#ffd700] transition-colors leading-snug">
                {item.title}
              </h3>

              <div className="text-xs text-emerald-400 font-urdu leading-relaxed" dir="rtl">
                {item.titleUrdu}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {item.snippet}
              </p>
            </div>

            <div className="pt-3 border-t border-[#00401a] text-xs text-slate-400 leading-relaxed bg-[#050d08] p-3 rounded-xl border">
              {item.fullContent}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
