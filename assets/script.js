// اسکریپت فرم ثبت‌نام
// کارش: جلوگیری از رفرش صفحه، ارسال داده به backend/register.php با fetch،
// و نمایش نتیجه (موفق/ناموفق) به کاربر.

const form = document.getElementById('registerForm');
const notice = document.getElementById('formNotice');
const submitBtn = form.querySelector('.submit-btn');

// آدرس بک‌اند. اگر index.html و پوشه‌ی backend کنار هم روی همون سرور هستن،
// مسیر نسبی کافیه. اگر جدا هاست شدن، این رو به آدرس کامل تغییر بده، مثلا:
// const BACKEND_URL = 'https://example.com/backend/register.php';
const BACKEND_URL = 'backend/register.php';

function showNotice(kind, text) {
  notice.hidden = false;
  notice.textContent = text;
  notice.className = 'notice notice--' + kind; // kind: 'success' | 'error'
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.classList.toggle('is-loading', isLoading);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  notice.hidden = true;

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  // اعتبارسنجی خیلی ساده‌ی سمت کاربر (سمت سرور هم دوباره چک می‌کنه، همیشه باید هر دو باشه)
  if (!payload.name || !payload.phone || !payload.country || !payload.message) {
    showNotice('error', 'لطفاً فیلدهای ستاره‌دار (نام، تلفن، کشور، شرح درخواست) را کامل کنید.');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      showNotice('success', result.message);
      form.reset();
      document.getElementById('country').value = 'ایران';
    } else {
      showNotice('error', result.message || 'خطایی رخ داد. لطفاً دوباره تلاش کنید.');
    }
  } catch (err) {
    // این خطا معمولاً یعنی سرور PHP اصلاً در حال اجرا نیست یا آدرس BACKEND_URL اشتباهه
    showNotice('error', 'اتصال به سرور برقرار نشد. مطمئن شو سرور PHP در حال اجراست.');
  } finally {
    setLoading(false);
  }
});
