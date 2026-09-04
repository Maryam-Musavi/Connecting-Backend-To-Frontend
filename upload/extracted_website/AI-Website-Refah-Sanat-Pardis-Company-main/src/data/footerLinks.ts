export interface FooterLinkItem {
  id: string;
  titleFa: string;
  titleEn: string;
  url: string;
}

export interface FooterLinkGroup {
  id: string;
  titleFa: string;
  titleEn: string;
  type: 'related' | 'quick';
  items: FooterLinkItem[];
}

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    id: 'related-links',
    titleFa: 'لینک‌های مرتبط',
    titleEn: 'Related Links',
    type: 'related',
    items: [
      {
        id: 'r1',
        titleFa: 'بانک رفاه کارگران',
        titleEn: 'Bank Refah Kargaran',
        url: 'https://www.refah-bank.ir',
      },
      {
        id: 'r2',
        titleFa: 'شرکت صرافی رفاه',
        titleEn: 'Refah Exchange Co.',
        url: 'https://refahexchange.com/',
      },
      {
        id: 'r3',
        titleFa: 'شرکت کارگزاری بانک رفاه کارگران',
        titleEn: 'Refah Bank Brokerage Co.',
        url: 'http://refahbroker.ir/',
      },
      {
        id: 'r4',
        titleFa: 'شرکت داده‌پردازی ایران',
        titleEn: 'Data Processing Iran (DPI)',
        url: 'http://www.dpi.ir/',
      },
      {
        id: 'r5',
        titleFa: 'شرکت پتروشیمی امیرکبیر',
        titleEn: 'Amir Kabir Petrochemical Co.',
        url: 'https://www.akpc.ir/',
      },
      {
        id: 'r6',
        titleFa: 'شرکت توسعه سرمایه رفاه',
        titleEn: 'Refah Capital Development Co.',
        url: 'http://www.tsrefah.com/',
      },
      {
        id: 'r7',
        titleFa: 'شرکت مدیریت پروژه‌های ساختمانی ایران (مپسا)',
        titleEn: 'Construction Project Management of Iran (MAPSA)',
        url: 'https://mapsa.co.ir/',
      },
      {
        id: 'r8',
        titleFa: 'شرکت کارگزاری بیمه رفاه فرازان پارس',
        titleEn: 'Refah Farazan Pars Insurance Brokerage',
        url: 'https://ri24.ir/',
      },
      {
        id: 'r9',
        titleFa: 'شرکت آینده‌سازان رفاه پردیس',
        titleEn: 'Ayande Sazan Refah Pardis Co.',
        url: 'http://asrp.ir/',
      },
      {
        id: 'r10',
        titleFa: 'شرکت توسعه فناوری رفاه پردیس',
        titleEn: 'Refah Pardis Technology Development Co.',
        url: 'https://refah-td.com/',
      },
      {
        id: 'r11',
        titleFa: 'شرکت ساختمانی توسعه رفاه پردیس',
        titleEn: 'Refah Pardis Construction Development Co.',
        url: 'https://str-pardis.com/',
      },
      {
        id: 'r12',
        titleFa: 'شرکت خدمات گستر رفاه پردیس',
        titleEn: 'Refah Pardis Service Spread Co.',
        url: 'http://www.kh-gostar.ir/',
      },
    ],
  },
  {
    id: 'quick-access',
    titleFa: 'دسترسی سریع',
    titleEn: 'Quick Access',
    type: 'quick',
    items: [
      {
        id: 'q1',
        titleFa: 'مجتمع فولاد خراسان',
        titleEn: 'Khorasan Steel Complex',
        url: 'https://www.khorasansteel.com/',
      },
      {
        id: 'q2',
        titleFa: 'شرکت فولاد خوزستان',
        titleEn: 'Khouzestan Steel Co.',
        url: 'http://www.ksc.ir/',
      },
      {
        id: 'q3',
        titleFa: 'شرکت فولاد البرز ایرانیان (فایکو)',
        titleEn: 'Alborz Iranian Steel Co. (FAICO)',
        url: 'https://www.faicosteel.com/',
      },
      {
        id: 'q4',
        titleFa: 'صنایع فولاد هیربد زرندیه',
        titleEn: 'Hirbod Zarandieh Steel Industries',
        url: 'https://hirbodsteel.com/',
      },
      {
        id: 'q5',
        titleFa: 'شرکت سنگ آهن گهرزمین',
        titleEn: 'Gohar Zamin Iron Ore Co.',
        url: 'https://goharzamin.com/',
      },
      {
        id: 'q6',
        titleFa: 'شرکت فولاد سیرجان ایرانیان',
        titleEn: 'Sirjan Iranian Steel Co. (SISCO)',
        url: 'https://sisco.midhco.com/',
      },
      {
        id: 'q7',
        titleFa: 'شرکت صبا فولاد خلیج فارس',
        titleEn: 'Saba Steel Complex Persian Gulf',
        url: 'http://sabasteel.co/',
      },
      {
        id: 'q8',
        titleFa: 'شرکت معدنی و صنعتی گل‌گهر',
        titleEn: 'GolGohar Mining & Industrial Co.',
        url: 'http://www.geg.ir/',
      },
      {
        id: 'q9',
        titleFa: 'شرکت معدنی و صنعتی چادرملو',
        titleEn: 'Chadormalu Mining & Industrial Co.',
        url: 'http://www.chadormalu.com/',
      },
      {
        id: 'q10',
        titleFa: 'شرکت سهامی ذوب آهن اصفهان',
        titleEn: 'Isfahan Steel Company (ESCO)',
        url: 'http://esfahansteel.ir/',
      },
      {
        id: 'q11',
        titleFa: 'شرکت توسعه آهن و فولاد گل‌گهر',
        titleEn: 'GolGohar Iron & Steel Development Co.',
        url: 'https://www.gisdco.ir/',
      },
      {
        id: 'q12',
        titleFa: 'سازمان توسعه و نوسازی معادن و صنایع معدنی ایران',
        titleEn: 'Iranian Mines & Mining Dev. Org. (IMIDRO)',
        url: 'https://www.imico.org/detail/company/462',
      },
    ],
  },
];
