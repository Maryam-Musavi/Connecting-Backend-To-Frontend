<?php
// یک endpoint از نوع GET — قرینه‌ی register.php که POST بود.
// کارش: برگرداندن لیست حوزه‌های استعلام به فرانت‌اند.
// داده فعلاً داخل کد است (بدون دیتابیس)؛ بعداً می‌تواند از SQLite بیاید.

header('Content-Type: application/json; charset=UTF-8');

// این‌بار به‌جای POST، فقط GET مجاز است
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'فقط GET مجاز است'], JSON_UNESCAPED_UNICODE);
    exit;
}

// داده‌ی ساده داخل کد (فعلاً بدون دیتابیس؛ بعداً می‌تواند از SQLite بیاید)
$sectors = ['واردات', 'صادرات', 'نمایندگی', 'سایر'];

echo json_encode(['success' => true, 'sectors' => $sectors], JSON_UNESCAPED_UNICODE);
