import React, { useState, useEffect } from 'react';
import { Language, Section } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CompanyView } from './components/CompanyView';
import { CapabilitiesView } from './components/CapabilitiesView';
import { RegionalPresenceView } from './components/RegionalPresenceView';
import { ContactView } from './components/ContactView';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<Section>('home');

  // Scroll to top whenever section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  // Set page direction according to language
  const isRtl = lang === 'fa';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#04121E] text-slate-100 font-['Vazirmatn',sans-serif] flex flex-col justify-between border-t-4 border-[#00C4CC] selection:bg-[#00C4CC]/20 selection:text-[#00C4CC]"
    >
      {/* Header */}
      <Header
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area with Motion Transitions */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeSection}-${lang}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activeSection === 'home' && (
              <HomeView lang={lang} setActiveSection={setActiveSection} />
            )}
            {activeSection === 'company' && (
              <CompanyView lang={lang} setActiveSection={setActiveSection} />
            )}
            {activeSection === 'capabilities' && (
              <CapabilitiesView lang={lang} setActiveSection={setActiveSection} />
            )}
            {activeSection === 'presence' && (
              <RegionalPresenceView lang={lang} setActiveSection={setActiveSection} />
            )}
            {activeSection === 'contact' && (
              <ContactView lang={lang} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiet Footer */}
      <Footer lang={lang} setActiveSection={setActiveSection} />
    </div>
  );
}
