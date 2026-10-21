import React, { useState } from 'react';
import { Share2, Check, MessageSquare, Copy } from 'lucide-react';

interface ShareRatesButtonProps {
  gold24kTola?: number;
  gold22kTola?: number;
  silverTola?: number;
  petrolPrice?: number;
  dieselPrice?: number;
  title?: string;
  customText?: string;
  className?: string;
}

export const ShareRatesButton: React.FC<ShareRatesButtonProps> = ({
  gold24kTola = 429500,
  gold22kTola = 393708,
  silverTola = 6282,
  petrolPrice = 382.02,
  dieselPrice = 389.80,
  title = "Today's Official Pakistan Market Rates",
  customText,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const formatShareText = () => {
    if (customText) return customText;
    const today = new Date().toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return `*RateZilla.pk — Pakistan Live Market Rates (${today})*
----------------------------------------
🥇 *Sarafa Gold & Bullion:*
• 24K Pure Gold: Rs. ${gold24kTola.toLocaleString()} / Tola
• 22K Jewellery: Rs. ${gold22kTola.toLocaleString()} / Tola
• Chandi (Silver): Rs. ${silverTola.toLocaleString()} / Tola

⛽ *OGRA Fuel Benchmarks:*
• Petrol (Euro 5): Rs. ${petrolPrice.toFixed(2)} / Litre
• High-Speed Diesel: Rs. ${dieselPrice.toFixed(2)} / Litre

☀️ *Solar Modules:* Rs. 40.00 – 45.00 / Watt (Tier-1 TopCon)
----------------------------------------
📲 Check live rates, gold simulator & utility calculators:
${window.location.origin}`;
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(formatShareText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = formatShareText();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `RateZilla - ${title}`,
          text: formatShareText(),
          url: window.location.origin,
        });
      } catch {
        // User cancelled or not supported
      }
    } else {
      handleWhatsAppShare();
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleWhatsAppShare}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/40 transition-all hover:scale-[1.02] active:scale-95"
        title="Share formatted rates to WhatsApp"
      >
        <MessageSquare className="w-3.5 h-3.5 fill-current" />
        <span>Share via WhatsApp</span>
      </button>

      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 dark:text-slate-300 border border-slate-600/50 transition-all active:scale-95"
        title="Copy complete rate breakdown to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-bold">Rates Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>Copy Rates</span>
          </>
        )}
      </button>

      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          type="button"
          onClick={handleNativeShare}
          className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/40 transition-colors"
          title="Share using device options"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
