<?php

use PHPMailer\PHPMailer\PHPMailer;
require_once __DIR__ . '/lib/phpmailer/Exception.php';
require_once __DIR__ . '/lib/phpmailer/PHPMailer.php';
require_once __DIR__ . '/lib/phpmailer/SMTP.php';
require_once __DIR__ . '/config.php';


ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false, 
        'message' => 'فقط POST مجاز است'], 
        JSON_UNESCAPED_UNICODE
        );
    exit;
}

// ۲. دریافت داده‌های JSON ارسال‌شده از جاوااسکریپت
 $raw = file_get_contents('php://input');
 $data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'داده‌های ارسالی نامعتبر هستند (فرمت JSON صحیح نیست).'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

 $name  = trim((string)($data['name'] ?? ''));
 $phone = trim((string)($data['phone'] ?? ''));
 $email = trim((string)($data['email'] ?? ''));
 $country = trim((string)($data['country'] ?? ''));
 $message = trim((string)($data['message'] ?? ''));


 $website = trim((string)($data['website'] ?? ''));
 if ($website !== '') {
    echo json_encode([
        'success' => true, 
        'message' => 'درخواست با موفقیت ثبت شد'], );
    exit;
 }

if ($name === '' || $phone === '' || $country === '' || $message === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'نام، شماره تماس، کشور و شرح درخواست الزامی هستند'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'آدرس ایمیل معتبر نیست'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}


require_once __DIR__ . '/db.php';

$firm    = trim((string)($data['firm'] ?? ''));
$sector  = trim((string)($data['sector'] ?? ''));


try {
    $pdo  = get_db_connection();
    $stmt = $pdo ->prepare(
        'INSERT INTO inquiries
            (name, firm, email, phone, country, sector, message, created_at)
        VALUES
            (:name, :firm, :email, :phone, :country, :sector, :message, :created_at)'   
    );
    $stmt ->execute([
        ':name'       => $name,
        ':firm'       => $firm,
        ':email'      => $email,
        ':phone'      => $phone,
        ':country'    => $country,
        ':sector'     => $sector,
        ':message'    => $message,
        ':created_at' => date('c'), 
    ]);


$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = SMTP_HOST;
$mail->SMTPAuth = true;
$mail->Username = SMTP_USERNAME;
$mail->Password = SMTP_APP_PASSWORD;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = SMTP_PORT;
$mail->CharSet = 'UTF-8';


$mail->setFrom(SMTP_USERNAME, 'فرم درخواست سایت');
$mail->addAddress(NOTIFY_EMAIL);

if ($email !== '') {
    $mail->addReplyTo($email, $name);
}

$mail->isHTML(false);
$mail->Subject = 'درخواست جدید از فرم سایت';

$mail->Body = "نام: $name\n"
    . "شرکت: $firm\n"
    . "ایمیل: $email\n"
    . "تلفن: $phone\n"
    . "کشور: $country\n"
    . "حوزه: $sector\n"
    . "شرح درخواست: $message\n";


$mail->send();



    echo json_encode([
        'success' => true, 
        'message' => 'درخواست با موفقت ثبت شد'
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    //echo json_encode(['success' => false, 'message' => 'خطا در ذخیره سازی'],
                    //JSON_UNESCAPED_UNICODE);
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
