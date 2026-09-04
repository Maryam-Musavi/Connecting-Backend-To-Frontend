'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/lib/site-data';
import { translations } from '@/lib/site-data';
import { Globe } from 'lucide-react';
import { RefahLogo } from './RefahLogo';

interface SiteHeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ lang, setLang }) => {
  const [tehranTime, setTehranTime] = useState('');
  const t = translations[lang];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr =
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Tehran',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IRST (Tehran)';
      setTehranTime(timeStr);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#04121E]/95 backdrop-blur-md shadow-lg transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo / Wordmark */}
        <div className="text-left rtl:text-right group flex items-center gap-3 sm:gap-4 py-1">
          <div className="shrink-0 p-1 rounded-md bg-white shadow-md border border-[#00C4CC]/50 group-hover:border-[#00C4CC] group-hover:shadow-lg group-hover:shadow-[#00C4CC]/20 transition-all flex items-center justify-center">
            <RefahLogo className="h-8 sm:h-10 w-auto" />
          </div>
          <div className="flex flex-col justify-center space-y-0.5">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase leading-snug">
              {t.companyName}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.16em] text-[#38BDF8] font-mono uppercase leading-relaxed block">
              {t.companySubName}
            </span>
          </div>
        </div>

        {/* Right Utility Bar: Time + Language Switcher */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex text-[11px] font-mono text-slate-400 tracking-wider items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{tehranTime}</span>
          </div>

          <button
            onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
            className="flex items-center gap-2 text-xs font-mono tracking-wider px-3 py-1.5 border border-white/10 hover:border-[#00C4CC] hover:text-[#00C4CC] text-slate-300 transition-all rounded-none"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'FA | فارسی' : 'EN | English'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
