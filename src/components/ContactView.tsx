'use client';

import React, { useMemo, useState } from 'react';
import { Language } from '@/lib/site-data';
import { translations } from '@/lib/site-data';
import { Send, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactViewProps {
  lang: Language;
}

interface InquiryForm {
  name: string;
  firm: string;
  phone: string;
  country: string;
  message: string;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_FORM: InquiryForm = {
  name: '',
  firm: '',
  phone: '',
  country: '',
  message: '',
};

// Convert Persian/Arabic-Indic digits to Latin digits so phone
// validation accepts e.g. ۰۹۱۲۱۲۳۴۵۶۷ (improvement over the original
// site, which rejected Persian digits even though its placeholder
// suggested them).
const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
export const normalizeDigits = (v: string): string =>
  v.replace(/[۰-۹٠-٩]/g, (d) => {
    const p = PERSIAN_DIGITS.indexOf(d);
    if (p > -1) return String(p);
    return String(ARABIC_DIGITS.indexOf(d));
  });

export const ContactView: React.FC<ContactViewProps> = ({ lang }) => {
  const t = translations[lang].contact;
  const [form, setForm] = useState<InquiryForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryForm, string>>>({});
  const [status, setStatus] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const isRtl = lang === 'fa';

  const updateField = <K extends keyof InquiryForm>(key: K, value: InquiryForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof InquiryForm, string>> = {};
    if (!form.name.trim()) next.name = t.validationRequired;
    if (!form.firm.trim()) next.firm = t.validationRequired;
    const phoneNorm = normalizeDigits(form.phone).trim();
    if (!phoneNorm) {
      next.phone = t.validationRequired;
    } else if (!/^[0-9+()\-\s]{6,25}$/.test(phoneNorm)) {
      next.phone = t.validationPhone;
    }
    if (!form.country.trim()) next.country = t.validationRequired;
    if (!form.message.trim()) next.message = t.validationRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    if (!validate()) {
      setStatus('error');
      setStatusMessage(
        lang === 'fa' ? 'برخی فیلدها نیازمند بازبینی هستند.' : 'Some fields need your attention.'
      );
      return;
    }
    setStatus('submitting');
    setStatusMessage('');
    try {
      const payload = {
        ...form,
        phone: normalizeDigits(form.phone),
        lang,
        website_url_hp: '',
      };
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success === true) {
        setStatus('success');
        setStatusMessage(data.message || t.formSuccess);
      } else {
        setStatus('error');
        setStatusMessage(data.message || t.sendingError);
      }
    } catch (err) {
      setStatus('error');
      setStatusMessage(t.sendingError);
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setStatus('idle');
    setStatusMessage('');
  };

  const summaryRows = useMemo(() => {
    if (status !== 'success') return [];
    return [
      { label: t.formName, value: form.name },
      { label: t.formFirm, value: form.firm },
      { label: t.formPhone, value: form.phone },
      { label: t.formCountry, value: form.country },
      { label: t.formMessage, value: form.message },
    ].filter((r) => r.value);
  }, [status, form, t]);

  const inputBase =
    'w-full bg-[#04121E] border border-white/10 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 ' +
    'focus:outline-none focus:border-[#00C4CC] focus:ring-1 focus:ring-[#00C4CC]/40 transition-colors ' +
    'font-sans';
  const inputError = 'border-red-400/70 focus:border-red-400 focus:ring-red-400/30';
  const labelBase = 'block text-[11px] font-mono text-slate-400 uppercase tracking-[0.18em] mb-2';
  const errorBase = 'mt-1.5 text-[11px] text-red-300 font-mono';

  return (
    <div className="py-16 sm:py-20 pb-24">
      {/* ============================================= */}
      {/* COMMERCIAL INQUIRY FORM (5 fields)            */}
      {/* ============================================= */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10">
        <div className="bg-[#071927] border border-white/10 p-8 sm:p-12">
          {/* Section header */}
          <div className="border-b border-white/10 pb-6 mb-8 space-y-3">
            <div className="text-[10px] font-mono text-[#00C4CC] uppercase tracking-[0.25em]">
              {t.formSectionEyebrow}
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-white tracking-wide">
              {t.formSectionTitle}
            </h2>
            <div className="h-px w-12 bg-[#00C4CC]" />
            <p className="text-sm text-slate-300 font-light leading-relaxed max-w-3xl text-justify">
              {t.formSectionIntro}
            </p>
          </div>

          {/* Success view */}
          {status === 'success' ? (
            <div className="space-y-8">
              <div className="flex items-start gap-4 rtl:gap-6 p-6 border border-[#00C4CC]/30 bg-[#00C4CC]/5">
                <CheckCircle2 className="w-6 h-6 text-[#00C4CC] shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-[#00C4CC] uppercase tracking-widest">
                    {t.transmissionConfirmed}
                  </div>
                  <p className="text-sm text-slate-200 font-light leading-relaxed">{statusMessage}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em]">
                  {t.summaryEyebrow}
                </div>
                <h3 className="text-lg font-light text-white">{t.formSummaryTitle}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                  {summaryRows.map((row, idx) => (
                    <div key={idx} className="flex flex-col border-b border-white/5 pb-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {row.label}
                      </span>
                      <span
                        className="text-sm text-slate-200 break-words whitespace-pre-wrap"
                        dir="auto"
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2.5 rtl:gap-3 px-6 py-3 bg-[#00C4CC] text-[#04121E] font-medium text-sm hover:bg-[#00C4CC]/90 transition-all rounded-sm shadow-[0_0_15px_rgba(0,196,204,0.25)]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.submitAnother}</span>
                </button>
              </div>
            </div>
          ) : (
            /* The form itself */
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Status / error banner */}
              {status === 'error' && statusMessage && (
                <div className="flex items-start gap-4 rtl:gap-6 p-5 border border-red-400/30 bg-red-400/5">
                  <AlertCircle className="w-5 h-5 text-red-300 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-100 font-light leading-relaxed">{statusMessage}</p>
                </div>
              )}

              {/* Form fields — 2-column grid on md+, single column on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full name */}
                <div>
                  <label htmlFor="cf-name" className={labelBase}>
                    {t.formName} <span className="text-[#00C4CC]">*</span>
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder={t.placeholderName}
                    className={`${inputBase} ${errors.name ? inputError : ''}`}
                    autoComplete="name"
                    dir="auto"
                  />
                  {errors.name && <p className={errorBase}>{errors.name}</p>}
                </div>

                {/* Company name */}
                <div>
                  <label htmlFor="cf-firm" className={labelBase}>
                    {t.formFirm} <span className="text-[#00C4CC]">*</span>
                  </label>
                  <input
                    id="cf-firm"
                    type="text"
                    value={form.firm}
                    onChange={(e) => updateField('firm', e.target.value)}
                    placeholder={t.placeholderFirm}
                    className={`${inputBase} ${errors.firm ? inputError : ''}`}
                    autoComplete="organization"
                    dir="auto"
                  />
                  {errors.firm && <p className={errorBase}>{errors.firm}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="cf-phone" className={labelBase}>
                    {t.formPhone} <span className="text-[#00C4CC]">*</span>
                  </label>
                  <input
                    id="cf-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder={t.placeholderPhone}
                    className={`${inputBase} ${errors.phone ? inputError : ''}`}
                    autoComplete="tel"
                    dir="ltr"
                  />
                  {errors.phone && <p className={errorBase}>{errors.phone}</p>}
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="cf-country" className={labelBase}>
                    {t.formCountry} <span className="text-[#00C4CC]">*</span>
                  </label>
                  <input
                    id="cf-country"
                    type="text"
                    value={form.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    placeholder={t.placeholderCountry}
                    className={`${inputBase} ${errors.country ? inputError : ''}`}
                    autoComplete="country-name"
                    dir="auto"
                  />
                  {errors.country && <p className={errorBase}>{errors.country}</p>}
                </div>

                {/* Message (full width) */}
                <div className="md:col-span-2">
                  <label htmlFor="cf-message" className={labelBase}>
                    {t.formMessage} <span className="text-[#00C4CC]">*</span>
                  </label>
                  <textarea
                    id="cf-message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder={t.placeholderMessage}
                    className={`${inputBase} resize-y ${errors.message ? inputError : ''}`}
                    dir="auto"
                  />
                  {errors.message && <p className={errorBase}>{errors.message}</p>}
                </div>
              </div>

              {/* ===== Actions ===== */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 border-t border-white/10">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-2.5 rtl:gap-3 px-8 py-3.5 bg-[#00C4CC] text-[#04121E] font-medium text-sm hover:bg-[#00C4CC]/90 transition-all rounded-sm shadow-[0_0_15px_rgba(0,196,204,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className={`w-4 h-4 ${status === 'submitting' ? 'animate-pulse' : ''}`} />
                  <span>{status === 'submitting' ? t.sending : t.formSubmit}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-2.5 rtl:gap-3 px-6 py-3.5 bg-transparent text-slate-300 font-medium text-sm border border-white/10 hover:border-white/20 hover:text-white transition-all rounded-sm disabled:opacity-50"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.formReset}</span>
                </button>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest sm:ms-auto rtl:sm:me-auto rtl:sm:ms-0 sm:self-center">
                  {t.formSubheading}
                </span>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
