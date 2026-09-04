import React from 'react';
import { Language, Section } from '../types';
import { translations, images } from '../data/translations';
import { CommercialNetworkAnimation } from './CommercialNetworkAnimation';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface HomeViewProps {
  lang: Language;
  setActiveSection: (section: Section) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ lang, setActiveSection }) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-24 md:space-y-36 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-between border-b border-white/10 pt-8">
        {/* Background Editorial Photo with Subtle Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={images.heroPort}
            alt="Cargo Terminal Infrastructure"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 filter grayscale brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04121E] via-[#04121E]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04121E] via-transparent to-[#04121E]" />
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 my-auto py-16 w-full">
          <div className="max-w-4xl space-y-8">
            
            {/* Top Eyebrow Line */}
            <div className="inline-flex items-center space-x-3 rtl:space-x-reverse text-xs font-mono text-[#00C4CC] tracking-[0.2em] uppercase border-l-2 rtl:border-r-2 rtl:border-l-0 border-[#00C4CC] pl-3 rtl:pr-3">
              <span>{t.eyebrows.hero}</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extralight text-white leading-[1.18] tracking-tight">
              {t.home.heroTitle}
            </h1>

            {/* Concise Subtitle (max 3 lines) */}
            <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl leading-relaxed text-justify">
              {t.home.heroSubtitle}
            </p>

            {/* Hero CTA Button */}
            <div className="pt-4 flex items-center space-x-6 rtl:space-x-reverse">
              <button
                onClick={() => setActiveSection('capabilities')}
                className="group px-8 py-4 bg-[#0B2A4A] hover:bg-[#0d3A66] border border-[#00C4CC]/30 text-white text-xs uppercase tracking-widest font-mono flex items-center space-x-3 rtl:space-x-reverse transition-all"
              >
                <span>{t.nav.capabilities}</span>
                <ArrowIcon className="w-4 h-4 text-[#00C4CC] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveSection('contact')}
                className="px-6 py-4 text-xs uppercase tracking-widest font-mono text-slate-300 hover:text-[#00C4CC] border-b border-transparent hover:border-[#00C4CC] transition-all"
              >
                {t.home.ctaButton}
              </button>
            </div>

          </div>
        </div>

        {/* Hero Bottom Editorial Ticker */}
        <div className="relative z-10 border-t border-white/10 bg-[#04121E]/80 backdrop-blur-sm">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px] font-mono text-slate-400">
            <div>
              <span className="text-slate-600 block mb-0.5">{t.ticker.coreScope}</span>
              <span className="text-slate-200">{t.ticker.coreScopeVal}</span>
            </div>
            <div>
              <span className="text-slate-600 block mb-0.5">{t.ticker.financing}</span>
              <span className="text-slate-200">{t.ticker.financingVal}</span>
            </div>
            <div>
              <span className="text-slate-600 block mb-0.5">{t.ticker.exchange}</span>
              <span className="text-slate-200">{t.ticker.exchangeVal}</span>
            </div>
            <div>
              <span className="text-slate-600 block mb-0.5">{t.ticker.logistics}</span>
              <span className="text-slate-200">{t.ticker.logisticsVal}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="max-w-4xl space-y-6">
          <div className="text-xs font-mono text-[#00C4CC] uppercase tracking-[0.25em]">
            {t.eyebrows.profile}
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-light text-white leading-tight">
            {t.home.whoWeAreHeading}
          </h2>

          <div className="h-px w-20 bg-[#00C4CC]/50" />

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed text-justify">
            {t.home.whoWeAreText}
          </p>

          <div className="pt-4">
            <button
              onClick={() => setActiveSection('company')}
              className="group inline-flex items-center space-x-2 rtl:space-x-reverse text-xs uppercase tracking-widest font-mono text-[#00C4CC] hover:text-white transition-colors"
            >
              <span>{t.buttons.readProfile}</span>
              <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. VISUAL TRADE SECTORS SHOWCASE */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="text-xs font-mono text-[#00C4CC] uppercase tracking-[0.25em]">
                {lang === 'fa' ? 'حوزه‌های کلیدی فعالیت و بازرگانی' : 'Core Trade Sectors & Infrastructure'}
              </div>
              <h2 className="text-xl sm:text-3xl font-light text-white">
                {lang === 'fa' ? 'زنجیره تامین و مبادلات کالایی' : 'Supply Chain & Commodity Logistics'}
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {lang === 'fa' ? 'تمرکز بر صنایع غذایی، فلزات و بنادر تجاری' : 'Focusing on Food Industries, Metals & Commercial Ports'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sector 1: Food Industry & Grains */}
            <div className="group relative bg-[#071927] border border-white/10 overflow-hidden hover:border-[#00C4CC]/60 transition-all duration-300 flex flex-col justify-between">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={images.foodGrainsTrade}
                  alt={lang === 'fa' ? 'بازرگانی در حوزه صنایع غذایی' : 'Food Industry Trading'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110 saturate-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04121E] via-[#04121E]/30 to-transparent" />
                <div className="absolute inset-0 bg-[#00C4CC]/10 mix-blend-color opacity-80" />
                <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2 py-1 bg-[#04121E]/80 border border-white/10 text-[10px] font-mono text-[#00C4CC]">
                  01
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-base font-medium text-white group-hover:text-[#00C4CC] transition-colors">
                  {lang === 'fa' ? 'صنایع غذایی و غلات' : 'Food Industry & Agricultural Grains'}
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed text-justify">
                  {lang === 'fa' ? 'تامین و تهاتر کالاهای اساسی و بازرگانی در حوزه صنایع غذایی و غلات' : 'Procurement and commodity trade in agricultural food industries and grains.'}
                </p>
              </div>
            </div>

            {/* Sector 2: Maritime Shipping & Port Terminals */}
            <div className="group relative bg-[#071927] border border-white/10 overflow-hidden hover:border-[#00C4CC]/60 transition-all duration-300 flex flex-col justify-between">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={images.heroPort}
                  alt={lang === 'fa' ? 'ترمینال‌های کانتینری و کشتیرانی' : 'Container Terminals & Maritime Shipping'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110 saturate-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04121E] via-[#04121E]/30 to-transparent" />
                <div className="absolute inset-0 bg-[#00C4CC]/10 mix-blend-color opacity-80" />
                <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2 py-1 bg-[#04121E]/80 border border-white/10 text-[10px] font-mono text-[#00C4CC]">
                  02
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-base font-medium text-white group-hover:text-[#00C4CC] transition-colors">
                  {lang === 'fa' ? 'حمل و نقل دریایی و بنادر' : 'Maritime Shipping & Commercial Ports'}
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed text-justify">
                  {lang === 'fa' ? 'مدیریت ترمینال‌های بندری و کشتیرانی کالاهای فلزی و فله' : 'Management of maritime shipping and commercial port container operations.'}
                </p>
              </div>
            </div>

            {/* Sector 3: Multimodal Logistics (Air, Land, Sea) */}
            <div className="group relative bg-[#071927] border border-white/10 overflow-hidden hover:border-[#00C4CC]/60 transition-all duration-300 flex flex-col justify-between">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={images.multimodalTransport}
                  alt={lang === 'fa' ? 'لجستیک چندوجهی و ترانزیت' : 'Multimodal Freight Logistics'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110 saturate-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04121E] via-[#04121E]/30 to-transparent" />
                <div className="absolute inset-0 bg-[#00C4CC]/10 mix-blend-color opacity-80" />
                <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2 py-1 bg-[#04121E]/80 border border-white/10 text-[10px] font-mono text-[#00C4CC]">
                  03
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-base font-medium text-white group-hover:text-[#00C4CC] transition-colors">
                  {lang === 'fa' ? 'لجستیک چندوجهی و ترانزیت' : 'Multimodal Freight & Transit'}
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed text-justify">
                  {lang === 'fa' ? 'ارتباط خطوط هوایی، ریلی و جاده‌ای در کریدورهای ترانزیتی' : 'Coordinating air, rail, and road transit across Eurasian trade hubs.'}
                </p>
              </div>
            </div>

            {/* Sector 4: 24/7 International Port Corridors */}
            <div className="group relative bg-[#071927] border border-white/10 overflow-hidden hover:border-[#00C4CC]/60 transition-all duration-300 flex flex-col justify-between">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={images.containerTerminalNight}
                  alt={lang === 'fa' ? 'کریدورهای شبانه‌روزی بین‌المللی' : 'Round-the-Clock International Corridors'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110 saturate-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04121E] via-[#04121E]/30 to-transparent" />
                <div className="absolute inset-0 bg-[#00C4CC]/10 mix-blend-color opacity-80" />
                <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2 py-1 bg-[#04121E]/80 border border-white/10 text-[10px] font-mono text-[#00C4CC]">
                  04
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-base font-medium text-white group-hover:text-[#00C4CC] transition-colors">
                  {lang === 'fa' ? 'عملیات و کریدورهای شبانه‌روزی' : '24/7 Global Port Operations'}
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed text-justify">
                  {lang === 'fa' ? 'پشتیبانی شبانه‌روزی از محموله‌های تجاری و تخلیه و بارگیری' : 'Continuous round-the-clock clearance, loading, and commodity discharge.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMMERCIAL NETWORK ANIMATION */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono text-[#00C4CC] uppercase tracking-[0.25em]">
              {lang === 'fa' ? 'اکوسیستم شبکه تجاری' : 'Commercial Network Architecture'}
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-light text-white">
              {lang === 'fa' ? 'شبکه یکپارچه خدمات تجاری و بازرگانی' : 'Integrated Commercial Network Ecosystem'}
            </h2>
            <p className="text-sm text-slate-300 font-light max-w-xl text-justify">
              {lang === 'fa' 
                ? 'پیوند ساختارهای مالی، مدیریت ریسک، مدیریت تجاری، واردات و صادرات با شبکه شرکای معتبر تجاری.'
                : 'Connecting financial insight, risk controls, commercial management, import, export, and trusted partnerships into an integrated approach to trade.'}
            </p>
          </div>
          <button
            onClick={() => setActiveSection('presence')}
            className="text-xs font-mono uppercase tracking-widest text-[#00C4CC] hover:text-white transition-colors flex items-center space-x-2 rtl:space-x-reverse"
          >
            <span>{t.buttons.expandNetwork}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Commercial Network Animation Component */}
        <CommercialNetworkAnimation lang={lang} />
      </section>



    </div>
  );
};
