import React from 'react';
import { Language, Section } from '../types';
import { translations, images } from '../data/translations';
import { ArrowRight, ArrowLeft, Shield, Compass, Scale } from 'lucide-react';

interface CompanyViewProps {
  lang: Language;
  setActiveSection: (section: Section) => void;
}

export const CompanyView: React.FC<CompanyViewProps> = ({ lang, setActiveSection }) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-24 md:space-y-32 pb-20">
      
      {/* HERO SECTION */}
      <section className="border-b border-white/10 pt-12 pb-20 bg-[#04121E]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-6">
          <div className="text-xs font-mono text-[#00C4CC] uppercase tracking-[0.25em]">
            {t.eyebrows.companyOverview}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extralight text-white max-w-4xl leading-snug">
            {t.company.heroTitle}
          </h1>
        </div>
      </section>

      {/* COMPANY STATEMENT */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono text-[#00C4CC] uppercase tracking-[0.25em]">
              {t.eyebrows.commercialPosition}
            </div>
            <h2 className="text-xl sm:text-3xl font-light text-white leading-snug">
              {t.company.companyStatementHeading}
            </h2>
            <div className="h-px w-16 bg-[#00C4CC]" />
            <div className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl space-y-4 text-justify">
              {t.company.companyStatementText.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[16/10] bg-[#0B2A4A] border border-white/10 relative overflow-hidden group">
              <img
                src={images.foodGrainsTrade}
                alt="Food Industry & Commodity Trade"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-110 brightness-90 saturate-95 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04121E] via-[#04121E]/20 to-transparent" />
              <div className="absolute inset-0 bg-[#00C4CC]/10 mix-blend-color opacity-80" />
              <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 bg-[#04121E]/90 border border-white/10 text-[11px] font-mono text-[#00C4CC]">
                {lang === 'fa' ? 'بازرگانی صنایع غذایی و غلات' : 'Food Industry & Commodity Trade'}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 border-t border-b border-white/10 py-20 bg-[#071927]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Mission */}
          <div className="space-y-4 p-8 bg-[#04121E] border border-white/10">
            <div className="flex items-center space-x-3 rtl:space-x-reverse text-[#00C4CC]">
              <Compass className="w-5 h-5" />
              <span className="text-xs font-mono uppercase tracking-[0.2em]">{t.eyebrows.purpose}</span>
            </div>
            <h3 className="text-2xl font-light text-white">
              {t.company.missionHeading}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {t.company.missionText}
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-4 p-8 bg-[#04121E] border border-white/10">
            <div className="flex items-center space-x-3 rtl:space-x-reverse text-[#00C4CC]">
              <Scale className="w-5 h-5" />
              <span className="text-xs font-mono uppercase tracking-[0.2em]">{t.eyebrows.outlook}</span>
            </div>
            <h3 className="text-2xl font-light text-white">
              {t.company.visionHeading}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {t.company.visionText}
            </p>
          </div>

        </div>
      </section>

      {/* ORGANIZATIONAL VALUES */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-10">
        <div className="space-y-2">
          <div className="text-xs font-mono text-[#00C4CC] uppercase tracking-[0.25em]">
            {t.eyebrows.orgValues}
          </div>
          <h2 className="text-xl sm:text-2xl font-light text-white">
            {t.company.orgValuesHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.company.organizationalValues.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-[#04121E] border border-white/10 space-y-3 relative group hover:border-[#00C4CC]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#00C4CC] font-semibold">
                    {item.id}
                  </span>
                  <div className="h-px w-8 bg-[#00C4CC]/30 group-hover:w-12 group-hover:bg-[#00C4CC] transition-all" />
                </div>
                <h3 className="text-base font-medium text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed text-justify">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono text-[#00C4CC] uppercase tracking-[0.25em]">
            {t.eyebrows.principles}
          </div>
          <h2 className="text-xl sm:text-2xl font-light text-white">
            {t.company.coreValuesHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.company.values.map((val, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#04121E] border border-white/10 space-y-4 relative group hover:border-[#00C4CC]/50 transition-colors"
            >
              <div className="text-xs font-mono text-[#00C4CC]">
                {t.company.principleLabel} {lang === 'fa' ? `۰${idx + 1}` : `0${idx + 1}`}
              </div>
              <h3 className="text-xl font-normal text-white">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="bg-[#0B2A4A] border border-[#00C4CC]/30 p-12 sm:p-16 text-center space-y-6">
          <h2 className="text-xl sm:text-2xl font-light text-white max-w-2xl mx-auto">
            {t.company.partnerTitle}
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto font-light">
            {t.company.partnerText}
          </p>
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setActiveSection('contact')}
              className="group px-8 py-4 bg-[#04121E] hover:bg-white text-white hover:text-[#04121E] border border-[#00C4CC] text-xs uppercase tracking-widest font-mono flex items-center space-x-3 rtl:space-x-reverse transition-all"
            >
              <span>{t.home.ctaButton}</span>
              <ArrowIcon className="w-4 h-4 text-[#00C4CC] group-hover:text-[#04121E] transition-colors" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
