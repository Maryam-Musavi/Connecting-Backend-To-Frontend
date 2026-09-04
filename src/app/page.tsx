'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/site-data';
import { SiteHeader } from '@/components/SiteHeader';
import { ContactView } from '@/components/ContactView';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [lang, setLang] = useState<Language>('en');

  // Set page direction according to language
  const isRtl = lang === 'fa';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#04121E] text-slate-100 font-sans border-t-4 border-[#00C4CC] selection:bg-[#00C4CC]/20 selection:text-[#00C4CC]"
    >
      {/* Header */}
      <SiteHeader lang={lang} setLang={setLang} />

      {/* Main Content Area with Motion Transition */}
      <main className="flex-1 w-full">
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <ContactView lang={lang} />
        </motion.div>
      </main>
    </div>
  );
}
