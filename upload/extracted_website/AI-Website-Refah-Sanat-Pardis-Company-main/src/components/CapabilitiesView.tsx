import React from 'react';
import { Language, Section } from '../types';
import { translations, images } from '../data/translations';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface CapabilitiesViewProps {
  lang: Language;
  setActiveSection: (section: Section) => void;
}

export const CapabilitiesView: React.FC<CapabilitiesViewProps> = ({ lang, setActiveSection }) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="border-b border-white/10 pt-12 pb-16 bg-[#04121E]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-4">
          <div className="text-xs font-mono text-[#00C4CC] uppercase tracking-[0.25em]">
            {t.eyebrows.capabilitiesFramework}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extralight text-white max-w-4xl leading-snug">
            {t.capabilities.heroTitle}
          </h1>
          <p className="text-sm text-slate-400 font-light max-w-xl">
            {t.capabilities.intro}
          </p>
        </div>
      </section>

      {/* EDITORIAL IMAGE HEADER */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-light text-white tracking-wide">
            {t.capabilities.importExportHeading}
          </h2>
          <div className="h-px w-16 bg-[#00C4CC]" />
          <div className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-4xl space-y-4 text-justify">
            {t.capabilities.importExportText.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="aspect-[21/9] bg-[#0B2A4A] border border-white/10 relative overflow-hidden group">
          <img
            src={images.multimodalTransport}
            alt="Multimodal Freight & Air-Land-Sea Logistics"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-110 brightness-90 saturate-95 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04121E] via-[#04121E]/30 to-transparent" />
          <div className="absolute inset-0 bg-[#00C4CC]/10 mix-blend-color opacity-80" />
          <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 px-3 py-1 bg-[#04121E]/90 border border-white/10 text-[11px] font-mono text-[#00C4CC]">
            {lang === 'fa' ? 'لجستیک چندوجهی دریایی، هوایی و زمینی' : 'Multimodal Sea, Air & Land Freight Coordination'}
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE APPROACH TO TRADE SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-10">
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-light text-white tracking-wide">
            {t.capabilities.comprehensiveHeading}
          </h2>
          <div className="h-px w-16 bg-[#00C4CC]" />
          <div className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-4xl space-y-4 text-justify">
            {t.capabilities.comprehensiveText.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.capabilities.perspectives.map((perspective, idx) => (
            <div key={idx} className="p-6 bg-[#071927] border border-white/10 space-y-3">
              <div className="text-xs font-mono text-[#00C4CC] uppercase tracking-wider">
                0{idx + 1} //
              </div>
              <h3 className="text-lg font-normal text-white">
                {perspective.title}
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed text-justify">
                {perspective.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* REFINED EDITORIAL LIST (STRICTLY NO CARDS, NO FEATURE BOXES) */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {t.capabilities.items.map((item) => (
            <div
              key={item.id}
              className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-white/[0.015] transition-colors px-4 group"
            >
              {/* Index Number */}
              <div className="md:col-span-1 text-sm font-mono text-[#00C4CC] pt-1">
                {item.id}
              </div>

              {/* Title */}
              <div className="md:col-span-4 text-xl font-normal text-white group-hover:text-[#00C4CC] transition-colors">
                {item.title}
              </div>

              {/* Single Sentence Statement (Max 15 Words) */}
              <div className="md:col-span-7 text-base text-slate-300 font-light leading-relaxed text-justify">
                {item.statement}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 pt-10">
        <div className="p-8 border border-white/10 bg-[#071927] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#00C4CC] uppercase tracking-wider block">
              {t.capabilities.inquireTitle}
            </span>
            <h3 className="text-lg font-light text-white">
              {t.capabilities.inquireSub}
            </h3>
          </div>
          <button
            onClick={() => setActiveSection('contact')}
            className="group px-6 py-3 bg-[#0B2A4A] hover:bg-[#0d4573] border border-[#00C4CC]/40 text-white text-xs uppercase font-mono tracking-widest flex items-center space-x-2 rtl:space-x-reverse transition-all whitespace-nowrap"
          >
            <span>{t.home.ctaButton}</span>
            <ArrowIcon className="w-4 h-4 text-[#00C4CC]" />
          </button>
        </div>
      </section>

    </div>
  );
};
