import React, { useState, useEffect } from 'react';
import { Language, Section } from '../types';
import { translations } from '../data/translations';
import { Globe, Menu, X, ArrowUpRight } from 'lucide-react';
import { RefahLogo } from './RefahLogo';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tehranTime, setTehranTime] = useState('');
  const t = translations[lang];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', {
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

  const navItems: Array<{ id: Section; label: string }> = [
    { id: 'home', label: t.nav.home },
    { id: 'company', label: t.nav.company },
    { id: 'capabilities', label: t.nav.capabilities },
    { id: 'presence', label: t.nav.presence },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#04121E]/95 backdrop-blur-md shadow-lg transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Brand Logo / Wordmark */}
        <button
          onClick={() => {
            setActiveSection('home');
            setMobileMenuOpen(false);
          }}
          className="text-left rtl:text-right focus:outline-none group flex items-center gap-3 sm:gap-4 py-1"
        >
          <div className="shrink-0 p-1 rounded-md bg-white shadow-md border border-[#00C4CC]/50 group-hover:border-[#00C4CC] group-hover:shadow-lg group-hover:shadow-[#00C4CC]/20 transition-all flex items-center justify-center">
            <RefahLogo className="h-8 sm:h-10 w-auto" />
          </div>
          <div className="flex flex-col justify-center space-y-0.5">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase group-hover:text-[#38BDF8] transition-colors leading-snug">
              {t.companyName}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.16em] text-[#38BDF8] font-mono uppercase leading-relaxed block">
              {t.companySubName}
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`text-xs uppercase tracking-widest transition-all duration-200 py-1 ${
                  isActive
                    ? 'text-[#00C4CC] font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Bar: Time + Language Switcher */}
        <div className="hidden md:flex items-center gap-5 sm:gap-6 border-s border-white/10 ps-6 ms-6">
          <div className="text-[11px] font-mono text-slate-400 tracking-wider flex items-center gap-2">
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

        {/* Mobile Menu Toggle & Lang */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
            className="text-xs font-mono px-2.5 py-1 border border-white/10 text-[#00C4CC]"
          >
            {lang === 'en' ? 'FA' : 'EN'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[#04121E] border-b border-white/10 p-6 shadow-2xl flex flex-col space-y-4 animate-in fade-in duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-start text-sm uppercase tracking-wider py-2 border-b border-white/5 flex items-center justify-between ${
                activeSection === item.id ? 'text-[#00C4CC] font-semibold' : 'text-slate-300'
              }`}
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </button>
          ))}
          <div className="pt-4 text-xs font-mono text-slate-500 flex justify-between items-center">
            <span>LIVE TRADING DESK</span>
            <span>{tehranTime}</span>
          </div>
        </div>
      )}
    </header>
  );
};
