<?php
// API ثبت‌نام — نقطه‌ی اتصال واقعی بک‌اند به دیتابیس.
// درخواست JSON را از فرانت‌اند می‌گیرد، اعتبارسنجی می‌کند و در SQLite ذخیره می‌کند.

require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'فقط POST مجاز است'], JSON_UNESCAPED_UNICODE);
    exit;
}

// داده‌ی JSON که فرانت‌اند با fetch ارسال کرده را می‌خوانیم
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

// اگر JSON نبود (مثلاً فرم معمولی HTML)، از $_POST استفاده می‌کنیم
if (!is_array($data)) {
    $data = $_POST;
}

// خواندن و پاک‌سازی همه‌ی فیلدها
$name    = trim((string)($data['name']    ?? ''));
$firm    = trim((string)($data['firm']    ?? ''));
$email   = trim((string)($data['email']   ?? ''));
$phone   = trim((string)($data['phone']   ?? ''));
$country = trim((string)($data['country'] ?? ''));
$sector  = trim((string)($data['sector']  ?? ''));
$message = trim((string)($data['message'] ?? ''));

// هانی‌پات ضد اسپم: این فیلد برای کاربر واقعی مخفی است.
// اگر پر شده باشد یعنی ربات آن را پر کرده؛ با موفقیت ساختگی پاسخ می‌دهیم و ذخیره نمی‌کنیم.
if (trim((string)($data['website'] ?? '')) !== '') {
    echo json_encode(['success' => true, 'message' => 'ثبت شد'], JSON_UNESCAPED_UNICODE);
    exit;
}

// اعتبارسنجی سمت سرور (سمت کاربر هم چک می‌شود؛ هر دو همیشه لازم است)
if ($name === '' || $phone === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'نام و شماره تماس الزامی است'], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'آدرس ایمیل معتبر نیست'], JSON_UNESCAPED_UNICODE);
    exit;
}

// ذخیره در SQLite با prepared statement (جلوگیری از SQL injection)
try {
    $pdo  = get_db_connection();
    $stmt = $pdo->prepare(
        'INSERT INTO inquiries
            (name, firm, email, phone, country, sector, message, created_at)
         VALUES
            (:name, :firm, :email, :phone, :country, :sector, :message, :created_at)'
    );
    $stmt->execute([
        ':name'       => $name,
        ':firm'       => $firm,
        ':email'      => $email,
        ':phone'      => $phone,
        ':country'    => $country,
        ':sector'     => $sector,
        ':message'    => $message,
        ':created_at' => date('c'), // تاریخ به فرمت ISO 8601
    ]);

    echo json_encode(
        ['success' => true, 'message' => 'درخواست با موفقیت ثبت شد', 'id' => (int)$pdo->lastInsertId()],
        JSON_UNESCAPED_UNICODE
    );
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(
        ['success' => false, 'message' => 'خطا در ذخیره‌سازی. لطفاً دوباره تلاش کنید.'],
        JSON_UNESCAPED_UNICODE
    );
}
