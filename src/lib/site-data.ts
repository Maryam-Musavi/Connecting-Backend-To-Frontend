// ---------------------------------------------------------------------
// Refah Sanat Pardis — Contact-only site data
// Only the keys actually used by SiteHeader.tsx and ContactView.tsx.
// ---------------------------------------------------------------------

export type Language = 'en' | 'fa';

export interface ContactTranslations {
  formSectionEyebrow: string;
  formSectionTitle: string;
  formSectionIntro: string;
  formName: string;
  formFirm: string;
  formPhone: string;
  formCountry: string;
  formMessage: string;
  formSubmit: string;
  formReset: string;
  formSubheading: string;
  sending: string;
  sendingError: string;
  formSuccess: string;
  transmissionConfirmed: string;
  submitAnother: string;
  formSummaryTitle: string;
  summaryEyebrow: string;
  placeholderName: string;
  placeholderFirm: string;
  placeholderPhone: string;
  placeholderCountry: string;
  placeholderMessage: string;
  validationRequired: string;
  validationPhone: string;
}

export interface SiteTranslations {
  companyName: string;
  companySubName: string;
  contact: ContactTranslations;
}

export const translations: Record<Language, SiteTranslations> = {
  en: {
    companyName: 'REFAH SANAT PARDIS',
    companySubName: 'TRADING CO.',
    contact: {
      formSectionEyebrow: 'Trade Inquiry Registration',
      formSectionTitle: 'Submit a Commercial Inquiry',
      formSectionIntro:
        'Share your business inquiry through the form below. Our trade desk will review the submission and respond within 24 hours.',
      formName: 'Full Name',
      formFirm: 'Company Name',
      formPhone: 'Phone Number',
      formCountry: 'Country',
      formMessage: 'Commercial Scope & Inquiries',
      formSubmit: 'Transmit Inquiry',
      formReset: 'Reset Form',
      formSubheading: 'Direct transmission to Refah Sanat Pardis Trade Desk',
      sending: 'Transmitting via SMTP...',
      sendingError:
        'Failed to deliver via server email script. Please check your network or send directly to info@refah-spc.ir.',
      formSuccess:
        'Inquiry transmitted successfully to info@refah-spc.ir. Our trade desk will respond within 24 hours.',
      transmissionConfirmed: 'Transmission Confirmed',
      submitAnother: 'Submit Another Inquiry',
      formSummaryTitle: 'Inquiry Summary',
      summaryEyebrow: 'Submission Preview',
      placeholderName: 'e.g. Alexander Vance',
      placeholderFirm: 'e.g. Global Commodities Ltd.',
      placeholderPhone: 'e.g. +98 912 123 4567',
      placeholderCountry: 'e.g. Iran, UAE, Germany, China',
      placeholderMessage:
        'Specify commodity scope, volume requirements, or representation objectives...',
      validationRequired: 'This field is required.',
      validationPhone:
        'Please enter a valid phone number (digits, spaces, +, -, parentheses).',
    },
  },
  fa: {
    companyName: 'شرکت رفاه صنعت پردیس',
    companySubName: 'بازرگانی بین‌المللی',
    contact: {
      formSectionEyebrow: 'ثبت استعلام تجاری',
      formSectionTitle: 'ثبت استعلام تجاری',
      formSectionIntro:
        'درخواست تجاری خود را از طریق فرم زیر ارسال کنید. میز تجارت پس از بررسی، ظرف ۲۴ ساعت پاسخ خواهد داد.',
      formName: 'نام و نام خانوادگی',
      formFirm: 'نام شرکت',
      formPhone: 'شماره تلفن / همراه',
      formCountry: 'کشور',
      formMessage: 'شرح موضوع و استعلام تجاری',
      formSubmit: 'ارسال درخواست',
      formReset: 'پاک کردن فرم',
      formSubheading: 'ارتباط مستقیم با میز تجاری شرکت رفاه صنعت پردیس',
      sending: 'در حال ارسال ایمیل...',
      sendingError:
        'خطا در ارسال ایمیل از طریق سرور. لطفاً اتصال را بررسی نموده یا مستقیم به info@refah-spc.ir ایمیل بزنید.',
      formSuccess:
        'درخواست شما با موفقیت به info@refah-spc.ir ارسال شد. میز تجارت ظرف ۲۴ ساعت پاسخگو خواهد بود.',
      transmissionConfirmed: 'ارسال با موفقیت تایید شد',
      submitAnother: 'ارسال درخواست جدید',
      formSummaryTitle: 'خلاصه استعلام',
      summaryEyebrow: 'پیش‌نمایش ارسال',
      placeholderName: 'مثلا: علی محمدی',
      placeholderFirm: 'مثلا: شرکت بازرگانی بین‌المللی',
      placeholderPhone: 'مثلا: ۰۹۱۲۱۲۳۴۵۶۷',
      placeholderCountry: 'مثلا: ایران، امارات، آلمان، چین',
      placeholderMessage:
        'لطفاً حوزه کالا، میزان حجم درخواستی یا اهداف نمایندگی را مشخص کنید...',
      validationRequired: 'تکمیل این فیلد الزامی است.',
      validationPhone:
        'لطفاً یک شماره تلفن معتبر وارد کنید (ارقام، فاصله، +، -، پرانتز).',
    },
  },
};
