import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#030805] border-t border-[#00401a]/40 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ffd700] to-[#b39700] flex items-center justify-center">
                <span className="text-[#050d08] font-black text-sm">R</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Rate<span className="text-[#ffd700]">Zilla</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pakistan&apos;s Ultimate Live Market Rates, Gold Simulator &amp; Utility Portal. Designed for seamless execution across web and edge devices.
            </p>
          </div>

          {/* Col 2: Core Utility Tools */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Core Utility Tools
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('gold')}
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Sarafa Gold Live Rates &amp; Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('solar')}
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Solar Panel Net-Metering Sizing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('fuel')}
                  className="hover:text-[#ffd700] transition-colors"
                >
                  OGRA Fuel Prices &amp; Trip Cost
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('electricity')}
                  className="hover:text-[#ffd700] transition-colors"
                >
                  LESCO &amp; DISCO Duplicate Bills
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Financial & Tax */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Financial &amp; Taxes
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('tax')}
                  className="hover:text-[#ffd700] transition-colors"
                >
                  FBR Salary Income Tax Slabs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('zakat')}
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Live Nisab Zakat Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('vehicle-tax')}
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Vehicle Excise &amp; Token Tax
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('construction')}
                  className="hover:text-[#ffd700] transition-colors"
                >
                  House Construction Cost BOQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Market Data & SEO */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Resources &amp; Indexes
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('currency')}
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Forex SBP Rates &amp; Crypto
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('mandi')}
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Ghalla Mandi Wholesale Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('news')}
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Market Bulletins &amp; News
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  XML Sitemap (Google Indexing)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#00401a]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} RateZilla.pk. Independent market rates and financial utility engine. Rates for informational benchmarks.
          </div>
          <div className="flex items-center gap-4">
            <span>Karachi</span>
            <span>·</span>
            <span>Lahore</span>
            <span>·</span>
            <span>Islamabad</span>
            <span>·</span>
            <span>Peshawar</span>
            <span>·</span>
            <span>Quetta</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
