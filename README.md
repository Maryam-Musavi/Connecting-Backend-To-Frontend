# فرم ثبت‌نام → PHP → SQLite + ایمیل

یک پروژه‌ی یادگیریِ ساده و کامل: یک فرم HTML، یک بک‌اند PHP که داده رو در
**SQLite** ذخیره می‌کنه و همزمان بهت **ایمیل** می‌زنه.

## ساختار پروژه

```
├── index.html                 فرم ثبت‌نام (فرانت‌اند)
├── assets/
│   ├── style.css
│   └── script.js              ارسال فرم به بک‌اند با fetch
└── backend/
    ├── register.php           ← تنها API؛ اعتبارسنجی + ذخیره در SQLite + ارسال ایمیل
    ├── db.php                 اتصال به SQLite + ساخت جدول
    ├── config.php              تنظیمات ایمیل و کلید ادمین (این فایل رو ویرایش کن)
    ├── config.example.php      نمونه‌ی config (برای وقتی خواستی پروژه رو گیت کنی)
    ├── view_submissions.php   دیدن ثبت‌نام‌های ذخیره‌شده (برای یادگیری SQLite)
    ├── lib/phpmailer/          کتابخانه‌ی رسمی PHPMailer (برای SMTP)
    └── data/
        └── registrations.db   فایل دیتابیس SQLite (خودکار ساخته می‌شه)
```

## پیش‌نیاز

- PHP نسخه‌ی ۸ به بالا، با اکستنشن `pdo_sqlite` (معمولاً به‌صورت پیش‌فرض فعاله).
- بررسی سریع: `php -m | grep sqlite` باید `pdo_sqlite` رو نشون بده.

## اجرا روی سیستم خودت (لوکال)

```bash
php -S localhost:8000
```

بعد مرورگر رو باز کن روی `http://localhost:8000` — فرم رو می‌بینی. چون
`index.html` و پوشه‌ی `backend/` کنار هم هستن، فرم بدون هیچ تنظیم اضافه‌ای
کار می‌کنه (فقط ذخیره در SQLite کار می‌کنه؛ برای ایمیل واقعی باید مرحله‌ی
زیر رو انجام بدی).

## تنظیم ایمیل (اجباری اگر می‌خوای واقعاً ایمیل بگیری)

فایل `backend/config.php` رو باز کن:

- **ساده‌ترین حالت (`SMTP_ENABLED = false`)**: از تابع native `mail()` خود
  PHP استفاده می‌شه. روی هاست‌های اشتراکی (cPanel و مشابه) که `sendmail`
  تنظیم‌شده معمولاً کار می‌کنه؛ روی سیستم شخصی/لوکال معمولاً کار نمی‌کنه
  چون سرور ایمیل واقعی نداری.
- **حالت قابل‌اعتماد (`SMTP_ENABLED = true`)**: از PHPMailer با یک سرور
  SMTP واقعی (مثلاً Gmail) استفاده می‌شه. برای Gmail:
  1. یک [App Password](https://myaccount.google.com/apppasswords) بساز
     (نیاز به فعال بودن «تایید دومرحله‌ای» داره).
  2. در `config.php`:
     ```php
     define('SMTP_ENABLED', true);
     define('SMTP_HOST', 'smtp.gmail.com');
     define('SMTP_PORT', 587);
     define('SMTP_SECURE', 'tls');
     define('SMTP_USER', 'your-email@gmail.com');
     define('SMTP_PASS', 'the-16-char-app-password');
     define('NOTIFY_EMAIL', 'your-email@gmail.com'); // ایمیلی که می‌خوای اعلان‌ها رو بگیری
     ```

نکته: حتی اگه ارسال ایمیل با خطا مواجه بشه، رکورد **همیشه در SQLite ذخیره
می‌شه** — این دو مرحله (ذخیره در دیتابیس / ارسال ایمیل) از هم مستقل هستن،
دقیقاً برای همین‌که اگه ایمیل کار نکرد، داده‌ی کاربر گم نشه.

## دیدن ثبت‌نام‌ها در SQLite

برای اینکه دقیقاً ببینی داده‌ها چطور توی SQLite ذخیره شدن (بدون نیاز به
نصب هیچ ابزار جانبی)، این آدرس رو باز کن:

```
http://localhost:8000/backend/view_submissions.php?key=مقدار_ADMIN_KEY
```

مقدار `ADMIN_KEY` رو از همون `config.php` بردار. (این صفحه فقط برای
یادگیری/توسعه‌ی محلیه؛ قبل از انتشار عمومی باید با یک لاگین واقعی
جایگزین بشه — پایین‌تر توضیح دادم چرا.)

اگه ابزار `sqlite3` رو نصب داری، مستقیم هم می‌تونی کوئری بزنی:

```bash
sqlite3 backend/data/registrations.db "SELECT * FROM inquiries;"
```

## این پروژه چطور کار می‌کنه (خلاصه‌ی یادگیری)

1. کاربر فرم رو در `index.html` پر می‌کنه.
2. `assets/script.js` جلوی رفرش صفحه رو می‌گیره و داده رو به‌صورت JSON با
   `fetch()` به `backend/register.php` می‌فرسته.
3. `register.php`:
   - فیلدها رو اعتبارسنجی و پاک‌سازی (`sanitize`) می‌کنه.
   - با `PDO` یک `INSERT` توی جدول `inquiries` در فایل SQLite می‌زنه.
   - با `PHPMailer` یک ایمیل HTML به `NOTIFY_EMAIL` می‌فرسته.
   - یک پاسخ JSON برمی‌گردونه (`{success, message, ...}`).
4. `script.js` پاسخ رو می‌گیره و پیام موفقیت/خطا رو زیر فرم نشون می‌ده.

نکته‌ی کلیدی درباره‌ی SQLite: برخلاف MySQL، سرور جدا نداره — کل دیتابیس
فقط یک فایل (`registrations.db`) کنار کدهای PHP هست. برای پروژه‌های کوچیک
و یادگیری، همین سادگی بزرگ‌ترین مزیتشه.

## نکات امنیتی قبل از انتشار روی اینترنت واقعی

- `backend/config.php` رو هرگز در یک ریپازیتوری عمومی commit نکن (رمز
  ایمیلت توشه). به‌جاش از `config.example.php` به‌عنوان الگو استفاده کن.
- `view_submissions.php` با یک کلید ساده در URL محافظت شده، نه یک سیستم
  لاگین واقعی. برای production، این رو با یک صفحه‌ی لاگین معتبر (session +
  password_hash) جایگزین کن.
- فایل `.htaccess` داخل `backend/data/` جلوی دانلود مستقیم فایل `.db` رو
  (روی هاست‌های Apache) می‌گیره — اگه هاستت Nginx هست، باید معادلش رو در
  تنظیمات Nginx اضافه کنی.

## گام بعدی برای یادگیری بیشتر SQLite

وقتی با این پروژه راحت شدی، پیشنهادها برای ادامه‌ی مسیر یادگیری:
- یک صفحه‌ی جستجو اضافه کن (`WHERE name LIKE :q`).
- صفحه‌بندی (pagination) به `view_submissions.php` اضافه کن (`LIMIT`/`OFFSET`).
- یک جدول دوم بساز (مثلاً `admins`) و با `FOREIGN KEY` بهش وصلش کن.
