import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ---------------------------------------------------------------------
// POST /api/contact
// Handles the 5-field bilingual commercial inquiry form from the
// Contact page. Mirrors the behavior of the original FastAPI backend:
//  - honeypot anti-spam field (website_url_hp) must be empty
//  - strict length validation per field
//  - bilingual success messages (en/fa)
// Inquiries are persisted in the local database (ContactInquiry table).
// To deliver email notifications, plug an SMTP provider here in
// production (e.g. nodemailer with Gmail App Password).
// ---------------------------------------------------------------------

interface ContactPayload {
  name?: unknown;
  firm?: unknown;
  phone?: unknown;
  country?: unknown;
  message?: unknown;
  lang?: unknown;
  website_url_hp?: unknown;
}

const asString = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

// Convert Persian/Arabic-Indic digits to Latin digits (matches the
// client-side normalization so ۰۹۱۲... / ٠٩١٢... numbers are accepted)
const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const normalizeDigits = (v: string): string =>
  v.replace(/[۰-۹٠-٩]/g, (d) => {
    const p = PERSIAN_DIGITS.indexOf(d);
    if (p > -1) return String(p);
    return String(ARABIC_DIGITS.indexOf(d));
  });

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const lang = body.lang === 'fa' ? 'fa' : 'en';

  // Honeypot — silently accept but do nothing (anti-spam)
  if (asString(body.website_url_hp, 200).length > 0) {
    return NextResponse.json({
      success: true,
      message:
        lang === 'fa'
          ? 'درخواست شما با موفقیت ارسال شد.'
          : 'Inquiry transmitted successfully.',
    });
  }

  const name = asString(body.name, 200);
  const firm = asString(body.firm, 200);
  const phone = normalizeDigits(asString(body.phone, 30));
  const country = asString(body.country, 100);
  const message = asString(body.message, 5000);

  // Server-side validation (mirrors the client-side rules)
  const phoneValid = /^[0-9+()\-\s]{6,25}$/.test(phone);
  if (!name || !firm || !country || !message || !phone || !phoneValid) {
    return NextResponse.json(
      {
        success: false,
        message:
          lang === 'fa'
            ? 'لطفاً همه فیلدهای الزامی را به‌درستی تکمیل کنید.'
            : 'Please fill in all required fields correctly.',
      },
      { status: 400 }
    );
  }

  try {
    await db.contactInquiry.create({
      data: { name, firm, phone, country, message, lang },
    });
  } catch (err) {
    console.error('[api/contact] Failed to persist inquiry:', err);
    return NextResponse.json(
      {
        success: false,
        message:
          lang === 'fa'
            ? 'خطای داخلی سرور. لطفاً بعداً تلاش کنید یا مستقیم به info@refah-spc.ir ایمیل بزنید.'
            : 'Internal server error. Please try again later or email info@refah-spc.ir directly.',
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message:
      lang === 'fa'
        ? 'درخواست شما با موفقیت ارسال شد. میز تجارت ظرف ۲۴ ساعت پاسخگو خواهد بود.'
        : 'Inquiry transmitted successfully. Our trade desk will respond within 24 hours.',
  });
}
