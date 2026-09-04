import React from 'react';
import { Language, Section } from '../types';
import { translations, images } from '../data/translations';
import { InteractiveMap } from './InteractiveMap';
import { Globe, ArrowRight, ArrowLeft } from 'lucide-react';

interface RegionalPresenceViewProps {
  lang: Language;
  setActiveSection: (section: Section) => void;
}

export const RegionalPresenceView: React.FC<RegionalPresenceViewProps> = ({
  lang,
  setActiveSection,
}) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO HEADER */}
      <section className="border-b border-white/10 pt-12 pb-12 bg-[#04121E]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-4">
          <div className="text-xs font-mono text-[#00C4CC] uppercase tracking-[0.25em] flex items-center space-x-2 rtl:space-x-reverse">
            <Globe className="w-3.5 h-3.5" />
            <span>{t.eyebrows.presenceGlobal}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extralight text-white max-w-4xl leading-snug">
            {t.presence.heroTitle}
          </h1>
        </div>
      </section>

      {/* ONE SHORT STATEMENT & VISUAL BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 p-8 sm:p-12 bg-[#071927] border border-white/10 flex flex-col justify-center">
          <span className="text-[10px] font-mono text-[#00C4CC] uppercase tracking-widest block mb-3">
            {t.eyebrows.positionStatement}
          </span>
          <p className="text-xl sm:text-2xl font-light text-slate-100 leading-relaxed">
            "{t.presence.statement}"
          </p>
        </div>

        <div className="lg:col-span-5 bg-[#0B2A4A] border border-white/10 relative overflow-hidden group min-h-[220px]">
          <img
            src={images.containerTerminalNight}
            alt="Round the Clock Port Operations"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-110 brightness-90 saturate-95 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04121E] via-[#04121E]/20 to-transparent" />
          <div className="absolute inset-0 bg-[#00C4CC]/10 mix-blend-color opacity-80" />
          <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 bg-[#04121E]/90 border border-white/10 text-[11px] font-mono text-[#00C4CC]">
            {lang === 'fa' ? 'ترمینال‌های بندری ۲۴ ساعته' : '24/7 International Port Operations'}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP OPPORTUNITIES SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-4">
        <h2 className="text-xl sm:text-2xl font-light text-white tracking-wide">
          {t.presence.partnershipHeading}
        </h2>
        <div className="h-px w-16 bg-[#00C4CC]" />
        <div className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-4xl space-y-4 text-justify">
          {t.presence.partnershipText.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>
              {paragraph.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={i} className="font-semibold text-white">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return part;
              })}
            </p>
          ))}
        </div>
        <div className="pt-2">
          <button
            onClick={() => setActiveSection('contact')}
            className="inline-flex items-center space-x-2.5 rtl:space-x-reverse px-6 py-3 bg-[#00C4CC] text-[#04121E] font-medium text-sm hover:bg-[#00C4CC]/90 transition-all rounded-sm shadow-[0_0_15px_rgba(0,196,204,0.25)]"
          >
            <span>{lang === 'fa' ? 'تماس با ما' : 'Contact Us'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* LARGE INTERACTIVE MAP */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-6">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          {t.presence.corridorArchitecture}
        </div>
        <InteractiveMap lang={lang} />
      </section>

      {/* ITEMIZED TARGET COUNTRIES LIST (موردی) */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 pt-4 space-y-8">
        <div className="border-t border-white/10 pt-10 space-y-3">
          <div className="text-xs font-mono text-[#00C4CC] uppercase tracking-[0.25em]">
            {t.presence.targetCountriesHeading}
          </div>
          <p className="text-sm text-slate-300 font-light max-w-3xl">
            {t.presence.targetCountriesIntro}
          </p>
        </div>

        {/* Itemized Grid of Countries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {t.presence.countriesList.map((country) => (
            <div
              key={country.id}
              className="p-5 bg-[#071927] border border-white/10 hover:border-[#00C4CC]/50 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <span className="text-xs font-mono text-[#00C4CC] bg-[#04121E] px-2 py-1 border border-white/10">
                    {country.id}
                  </span>
                  <h3 className="text-lg font-medium text-white group-hover:text-[#00C4CC] transition-colors">
                    {country.name}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-1 border border-white/5">
                  {country.direction}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {country.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MINIMAL FOOTER CTA */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-white/10 text-xs font-mono text-slate-400 gap-4">
          <div>{t.presence.coordinationDesk}</div>
          <button
            onClick={() => setActiveSection('contact')}
            className="text-[#00C4CC] hover:text-white flex items-center space-x-2 rtl:space-x-reverse uppercase tracking-wider"
          >
            <span>{t.presence.inquireCorridors}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
