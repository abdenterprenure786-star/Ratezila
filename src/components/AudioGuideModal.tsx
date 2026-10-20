import React, { useState, useRef } from 'react';
import { X, Play, Pause, Headphones, Volume2, Bookmark, CheckCircle2 } from 'lucide-react';
import { UrduAudioGuide } from '../types/market.js';

interface AudioGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guides: UrduAudioGuide[];
}

export const AudioGuideModal: React.FC<AudioGuideModalProps> = ({
  isOpen,
  onClose,
  guides,
}) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(
    guides[0]?.id || 'sarafa-gold-guide'
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeLang, setActiveLang] = useState<'urdu' | 'english'>('urdu');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeGuide = guides.find((g) => g.id === selectedGuideId) || guides[0];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  if (!isOpen || !activeGuide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#08170e] border border-[#ffd700]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00401a] border border-[#ffd700]/40 flex items-center justify-center text-[#ffd700]">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">RateZilla Urdu Audio & Video Knowledge Guide</h3>
            <span className="text-xs text-emerald-400">صوتی رہنمائی اور مستند قوانین</span>
          </div>
        </div>

        {/* Guides Carousel / Selector Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2">
          {guides.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setSelectedGuideId(g.id);
                setIsPlaying(false);
              }}
              className={`px-3 py-2 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedGuideId === g.id
                  ? 'bg-[#00401a] border-[#ffd700] text-white shadow-md'
                  : 'bg-[#050d08] border-[#00401a] text-slate-400 hover:text-white'
              }`}
            >
              {g.title}
            </button>
          ))}
        </div>

        {/* Active Guide Card */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-[#041309] to-[#071f11] border border-[#00401a] space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#ffd700] tracking-wider block">
                {activeGuide.category} · Duration: {activeGuide.duration}
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">{activeGuide.title}</h4>
              <p className="text-xs text-emerald-400 font-urdu mt-1" dir="rtl">
                {activeGuide.titleUrdu}
              </p>
              <div className="text-[11px] text-slate-400 mt-1">
                Speaker: <strong className="text-slate-200">{activeGuide.speaker}</strong> ({activeGuide.speakerRole})
              </div>
            </div>

            {/* Play Button & Audio Element */}
            <div className="flex items-center gap-3 shrink-0">
              <audio
                ref={audioRef}
                src={activeGuide.audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
              <button
                onClick={togglePlay}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6c200] hover:from-[#ffdf33] hover:to-[#ffd700] text-[#050d08] font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Audio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Listen Urdu Audio</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Chapters */}
          <div className="pt-3 border-t border-[#00401a] flex flex-wrap gap-2 text-[11px] font-mono">
            {activeGuide.chapters.map((ch, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-[#050d08] border border-[#00401a] text-slate-300 flex items-center gap-1.5"
              >
                <span className="text-[#ffd700] font-bold">{ch.time}</span>
                <span>{ch.title}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Transcript Area with Urdu Nastaliq & English Switcher */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#00401a] pb-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Synchronized Transcript (اردو اور انگریزی متن)
            </span>
            <div className="flex rounded overflow-hidden border border-[#00401a] text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveLang('urdu')}
                className={`px-3 py-1 ${
                  activeLang === 'urdu' ? 'bg-[#ffd700] text-[#050d08] font-bold' : 'bg-[#050d08] text-slate-400'
                }`}
              >
                اردو متن
              </button>
              <button
                type="button"
                onClick={() => setActiveLang('english')}
                className={`px-3 py-1 ${
                  activeLang === 'english' ? 'bg-[#ffd700] text-[#050d08] font-bold' : 'bg-[#050d08] text-slate-400'
                }`}
              >
                English Text
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#050d08] border border-[#00401a] text-sm leading-relaxed max-h-56 overflow-y-auto">
            {activeLang === 'urdu' ? (
              <div
                dir="rtl"
                className="font-urdu text-slate-200 text-sm sm:text-base leading-loose whitespace-pre-line"
              >
                {activeGuide.urduTranscript}
              </div>
            ) : (
              <div className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-line">
                {activeGuide.englishTranscript}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
