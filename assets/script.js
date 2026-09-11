// اسکریپت فرم ثبت‌نام
// کارش: جلوگیری از رفرش صفحه، ارسال داده به backend/register.php با fetch،
// و نمایش نتیجه (موفق/ناموفق) به کاربر.

const form = document.getElementById('registerForm');
const notice = document.getElementById('formNotice');
const submitBtn = form.querySelector('.submit-btn');
const sectorSelect = document.getElementById('sector');

// آدرس بک‌اند. اگر index.html و پوشه‌ی backend کنار هم روی همون سرور هستن،
// مسیر نسبی کافیه. اگر جدا هاست شدن، این رو به آدرس کامل تغییر بده، مثلا:
// const BACKEND_URL = 'https://example.com/backend/register.php';
const BACKEND_URL = 'backend/register.php';

// endpoint جدید از نوع GET: لیست حوزه‌های استعلام را برمی‌گرداند
const SECTORS_URL = 'backend/sectors.php';

function showNotice(kind, text) {
  notice.hidden = false;
  notice.textContent = text;
  notice.className = 'notice notice--' + kind; // kind: 'success' | 'error'
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.classList.toggle('is-loading', isLoading);
}

// ── گرفتن داده از بک‌اند (نیمه‌ی دوم اتصال: بک → فرانت) ──
async function loadSectors() {
  try {
    // نکته: متد پیش‌فرض fetch همان GET است؛ فقط آدرس را می‌دهیم.
    const response = await fetch(SECTORS_URL);

    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'خطای نامشخص');
    }

    // گزینه‌ی اول («انتخاب کنید») را نگه می‌داریم و بقیه را از داده‌ی سرور می‌سازیم
    sectorSelect.innerHTML = '<option value="">— انتخاب کنید —</option>';

    for (const name of data.sectors) {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      sectorSelect.appendChild(option);
    }
  } catch (err) {
    // اگر سرور در دسترس نبود، لااقل فرم از کار نمی‌افتد
    console.error('خطا در گرفتن حوزه‌ها:', err);
  }
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

// موقع باز شدن صفحه، حوزه‌ها را از بک‌اند می‌گیریم
loadSectors();
