import React from 'react';
import { Language, Section } from '../types';
import { footerLinkGroups } from '../data/footerLinks';
import { RefahLogo } from './RefahLogo';
import { Link2, Check, ExternalLink, MapPin, Phone, Mail, Building2 } from 'lucide-react';

interface FooterProps {
  lang: Language;
  setActiveSection: (section: Section) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, setActiveSection }) => {
  const isFa = lang === 'fa';

  const relatedGroup = footerLinkGroups.find((g) => g.type === 'related');
  const quickGroup = footerLinkGroups.find((g) => g.type === 'quick');

  return (
    <footer className="bg-[#020813] border-t border-white/10 text-slate-300 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-16">
        
        {/* BRAND TOP ROW */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Company Identity */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="shrink-0 p-1 rounded-md bg-white shadow-md border border-[#00C4CC]/50 flex items-center justify-center">
                <RefahLogo className="h-8 sm:h-10 w-auto" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium text-base tracking-wide">
                  {isFa ? 'شرکت بازرگانی رفاه صنعت پردیس' : 'REFAH SANAT PARDIS TRADING CO.'}
                </span>
                <span className="text-[11px] font-mono text-[#00C4CC] tracking-wider uppercase">
                  {isFa ? 'سهامی خاص - شماره ثبت: ۴۰۵۸۷۳' : 'Reg No: 405873 | Private Joint Stock'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-light leading-relaxed">
              {isFa
                ? 'شرکت بازرگانی رفاه صنعت پردیس، کارگزار تخصصی بازرگانی بین‌المللی، تامین کالا، تهاتر فلزات و غلات و ارائه خدمات تسهیلات تجاری در کریدورهای اقتصادی اوراسیا، خلیج فارس و اروپا.'
                : 'Refah Sanat Pardis Trading Company acts as a specialized international trading broker, facilitating commodity supply, metals/grain barter, and trade financing across major Eurasian trade corridors.'}
            </p>
          </div>

          {/* Quick Contact Micro-Badges */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 text-xs font-mono text-slate-300 border-t md:border-t-0 md:border-s border-white/10 pt-4 md:pt-0 md:ps-8">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#00C4CC] shrink-0" />
              <span>{isFa ? 'تهران، خیابان فاطمی غربی، پلاک ۳۱۳' : 'No. 313, West Fatemi St., Tehran'}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-slate-300">
              <Phone className="w-3.5 h-3.5 text-[#00C4CC] shrink-0" />
              <span dir="ltr">+98 (21) 6690 0000</span>
            </div>
          </div>
        </div>

        {/* LINK GROUPS FROM IMAGE (لینک‌های مرتبط & دسترسی سریع) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          
          {/* GROUP 1: لینک‌های مرتبط (Related Links) */}
          {relatedGroup && (
            <div className="space-y-6 bg-[#04121E]/80 border border-white/10 p-6 sm:p-8 rounded-sm">
              <div className="flex items-center space-x-3 rtl:space-x-reverse border-b border-white/10 pb-4">
                <div className="p-2 bg-[#00C4CC]/10 border border-[#00C4CC]/40 rounded-sm">
                  <Link2 className="w-5 h-5 text-[#00C4CC]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight">
                    {isFa ? relatedGroup.titleFa : relatedGroup.titleEn}
                  </h3>
                  <span className="text-[10px] font-mono text-[#00C4CC] uppercase tracking-widest block">
                    {isFa ? 'مجموعه‌ها و شرکای مرتبط با گروه رفاه' : 'Associated Banking & Financial Institutions'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {relatedGroup.items.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target={item.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between p-2.5 bg-[#071927]/60 hover:bg-[#071927] border border-white/5 hover:border-[#00C4CC]/40 transition-all text-[11px] sm:text-xs font-sans font-normal text-slate-200 hover:text-white leading-snug gap-2"
                  >
                    <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                      {isFa ? item.titleFa : item.titleEn}
                    </span>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-[#00C4CC] shrink-0 opacity-80 group-hover:opacity-100 mt-0.5">
                      <Link2 className="w-3.5 h-3.5" />
                      {item.url.startsWith('http') && <ExternalLink className="w-2.5 h-2.5 opacity-60" />}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* GROUP 2: دسترسی سریع (Quick Access / Mining & Steel Partners) */}
          {quickGroup && (
            <div className="space-y-6 bg-[#04121E]/80 border border-white/10 p-6 sm:p-8 rounded-sm">
              <div className="flex items-center space-x-3 rtl:space-x-reverse border-b border-white/10 pb-4">
                <div className="p-2 bg-[#00C4CC]/10 border border-[#00C4CC]/40 rounded-sm">
                  <Check className="w-5 h-5 text-[#00C4CC]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight">
                    {isFa ? quickGroup.titleFa : quickGroup.titleEn}
                  </h3>
                  <span className="text-[10px] font-mono text-[#00C4CC] uppercase tracking-widest block">
                    {isFa ? 'صنایع فولاد، معادن و سازمان‌های همکار' : 'Major Mining, Steel & Commodity Partners'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {quickGroup.items.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target={item.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between p-2.5 bg-[#071927]/60 hover:bg-[#071927] border border-white/5 hover:border-[#00C4CC]/40 transition-all text-[11px] sm:text-xs font-sans font-normal text-slate-200 hover:text-white leading-snug gap-2"
                  >
                    <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                      {isFa ? item.titleFa : item.titleEn}
                    </span>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-[#00C4CC] shrink-0 opacity-80 group-hover:opacity-100 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                      {item.url.startsWith('http') && <ExternalLink className="w-2.5 h-2.5 opacity-60" />}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM RIGHTS & COMPLIANCE BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} {isFa ? 'شرکت بازرگانی رفاه صنعت پردیس (سهامی خاص). تمامی حقوق محفوظ است.' : 'Refah Sanat Pardis Trading Co. All rights reserved.'}
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse text-slate-400">
            <span>CONFIDENTIAL COMMERCIAL NETWORK</span>
            <span>Eurasia Trade Corridor</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
