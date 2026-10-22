import React from 'react';

interface RateZillaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const RateZillaLogo: React.FC<RateZillaLogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const iconDimensions = {
    sm: { width: 34, height: 34, textSize: 'text-lg', subSize: 'text-[8px]', gap: 'gap-2.5' },
    md: { width: 44, height: 44, textSize: 'text-2xl', subSize: 'text-[9px]', gap: 'gap-3' },
    lg: { width: 58, height: 58, textSize: 'text-3xl', subSize: 'text-[11px]', gap: 'gap-3.5' },
    xl: { width: 84, height: 84, textSize: 'text-4xl', subSize: 'text-xs', gap: 'gap-4' }
  }[size];

  return (
    <div className={`inline-flex items-center ${iconDimensions.gap} select-none group cursor-pointer ${className}`}>
      {/* Modern High-End Geometric Emblem (RateZilla R+Z Bullion & Tech Mark) */}
      <svg
        width={iconDimensions.width}
        height={iconDimensions.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-1 drop-shadow-md"
      >
        <defs>
          {/* Neon Emerald & Cyan Gradient */}
          <linearGradient id="ratezillaTealGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FF87" />
            <stop offset="60%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#60EFFF" />
          </linearGradient>

          {/* Sarafa Bullion Gold Gradient */}
          <linearGradient id="ratezillaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Outer Squircle Container Gradient */}
          <linearGradient id="ratezillaBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#131D31" />
            <stop offset="100%" stopColor="#080C15" />
          </linearGradient>

          {/* Chamfer Rim Gradient */}
          <linearGradient id="ratezillaRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF87" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#60EFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
          </linearGradient>

          {/* Central Ambient Glow */}
          <radialGradient id="ratezillaCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00FF87" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#60EFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#080C15" stopOpacity="0" />
          </radialGradient>

          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00FF87" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. Base Squircle with Metallic Rim */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="26"
          fill="url(#ratezillaBgGrad)"
          stroke="url(#ratezillaRimGrad)"
          strokeWidth="2.5"
        />

        {/* 2. Soft Ambient Core Glow */}
        <circle cx="50" cy="50" r="32" fill="url(#ratezillaCoreGlow)" />

        {/* 3. Subtle Hexagonal Tech Grid Accent (Watermark) */}
        <path
          d="M 50 16 L 78 32 L 78 68 L 50 84 L 22 68 L 22 32 Z"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
        />

        {/* 4. The Monogram Core: Interlocking Stylized 'R' + 'Z' Momentum Wave */}
        {/* Left 'R' Stem & Loop with Bullion Gradient */}
        <path
          d="M 28 72 V 32 C 28 26.5 32.5 22 38 22 H 48 C 55.5 22 61 27.5 61 35 C 61 42.5 55.5 48 48 48 H 36"
          stroke="url(#ratezillaTealGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic 'Z' Slash & Upward Momentum Growth Arrow */}
        <path
          d="M 40 48 L 62 72 H 72"
          stroke="url(#ratezillaTealGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ascending Sarafa Gold Trend Line intersecting through Z */}
        <path
          d="M 26 56 L 44 42 L 56 50 L 76 26"
          stroke="url(#ratezillaGoldGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#logoShadow)"
        />

        {/* Upward Apex Arrowhead (Precision Growth Indicator) */}
        <polygon
          points="66,24 78,24 78,36"
          fill="url(#ratezillaGoldGrad)"
          stroke="url(#ratezillaGoldGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Sparkling Apex Node */}
        <circle cx="76" cy="26" r="3.5" fill="#FFFFFF" />
        <circle cx="76" cy="26" r="1.8" fill="#F59E0B" />
      </svg>

      {/* Brand Typography Lockup */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className={`flex items-baseline font-black tracking-tight leading-none ${iconDimensions.textSize}`}>
            <span className="text-white drop-shadow-sm font-sans tracking-tight">Rate</span>
            <span className="bg-gradient-to-r from-[#00FF87] via-[#22D3EE] to-[#60EFFF] bg-clip-text text-transparent ml-0.5 font-sans drop-shadow">
              Zilla
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
            <span className={`${iconDimensions.subSize} tracking-[2px] font-extrabold text-gray-400 dark:text-gray-400 uppercase font-mono`}>
              Pakistan Rates & Tools
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
