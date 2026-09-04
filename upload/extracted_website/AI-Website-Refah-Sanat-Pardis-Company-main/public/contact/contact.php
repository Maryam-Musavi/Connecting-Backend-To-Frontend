<?php
/**
 * Corporate Business Inquiry & Contact Handler
 * Refah Sanat Pardis Trading Co. (سهامی خاص)
 * Shared Hosting Target: MizbanFa cPanel PHP Environment
 */

// Headers for JSON response & CORS
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Allow POST requests only
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Only POST requests are supported.'
    ]);
    exit;
}

// Read raw JSON input or $_POST form data
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    $data = $_POST;
}

// 1. Anti-Spam Honeypot Check
$honeypot = isset($data['website_url_hp']) ? trim($data['website_url_hp']) : '';
if (!empty($honeypot)) {
    // Silently reject spam bot submissions
    echo json_encode([
        'success' => true,
        'message' => 'Inquiry transmitted successfully.'
    ]);
    exit;
}

// 2. Extract & Sanitize Fields
function sanitizeInput($str) {
    if (is_null($str)) return '';
    return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
}

$name    = sanitizeInput($data['name'] ?? '');
$firm    = sanitizeInput($data['firm'] ?? '');
$email   = sanitizeInput($data['email'] ?? '');
$phone   = sanitizeInput($data['phone'] ?? '');
$country = sanitizeInput($data['country'] ?? '');
$sector  = sanitizeInput($data['sector'] ?? '');
$message = sanitizeInput($data['message'] ?? '');
$lang    = sanitizeInput($data['lang'] ?? 'en');

// 3. Validation & Header Injection Prevention
// Required fields: name, firm, phone, country, message (email is now optional)
if (empty($name) || empty($firm) || empty($phone) || empty($country) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => ($lang === 'fa')
            ? 'لطفاً تمام فیلدهای ضروری (نام، نام شرکت، تلفن، کشور و متن پیام) را تکمیل نمایید.'
            : 'Please complete all required fields (Name, Company, Phone, Country, and Message).'
    ]);
    exit;
}

// Email is optional — only validate if provided
if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => ($lang === 'fa')
            ? 'آدرس ایمیل وارد شده معتبر نمی‌باشد.'
            : 'The provided email address is invalid.'
    ]);
    exit;
}

// Anti Header Injection check
if (preg_match("/[\r\n]/", $name) || preg_match("/[\r\n]/", $email) || preg_match("/[\r\n]/", $phone)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid header characters detected.'
    ]);
    exit;
}

// 4. Load SMTP Configuration
$configPath = __DIR__ . '/config.php';
$config = file_exists($configPath) ? include($configPath) : [];

$toEmail   = $config['to_email'] ?? 'info@refah-spc.ir';
$toName    = $config['to_name'] ?? 'Refah Sanat Pardis Trade Desk';
$smtpHost  = $config['smtp_host'] ?? 'mail.refah-spc.ir';
$smtpPort  = $config['smtp_port'] ?? 465;
$smtpUser  = $config['smtp_user'] ?? 'info@refah-spc.ir';
$smtpPass  = $config['smtp_pass'] ?? '';
$smtpSecure= $config['smtp_secure'] ?? 'ssl';

// 5. Construct Email Subject & Body
$isFa = ($lang === 'fa');

$subject = $isFa 
    ? "درخواست جدید استعلام تجاری - شرکت بازرگانی رفاه صنعت پردیس"
    : "New Business Inquiry - Refah Sanat Pardis Trading Co.";

if ($isFa) {
    $emailHtml = "
    <!DOCTYPE html>
    <html dir='rtl' lang='fa'>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Tahoma, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }
            .container { max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-top: 4px solid #00C4CC; padding: 30px; }
            .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 25px; }
            .header h2 { margin: 0; color: #073859; font-size: 20px; }
            .header p { margin: 5px 0 0; color: #64748b; font-size: 13px; }
            .section-title { font-size: 14px; font-weight: bold; color: #00C4CC; text-transform: uppercase; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px; }
            .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .info-table td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
            .label { font-weight: bold; color: #475569; width: 35%; }
            .value { color: #0f172a; }
            .message-box { background: #f8fafc; border-right: 4px solid #073859; padding: 15px; font-size: 14px; line-height: 1.7; color: #334155; white-space: pre-wrap; }
            .footer { margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>شرکت بازرگانی رفاه صنعت پردیس</h2>
                <p>درخواست استعلام جدید از طریق وب‌سایت رسمی</p>
            </div>

            <div class='section-title'>اطلاعات شرکت و متقاضی (Company Information)</div>
            <table class='info-table'>
                <tr><td class='label'>نام و نام خانوادگی:</td><td class='value'>" . htmlspecialchars($name) . "</td></tr>
                <tr><td class='label'>نام شرکت / سازمان:</td><td class='value'>" . htmlspecialchars($firm ?: 'ثبت نشده') . "</td></tr>
                <tr><td class='label'>کشور:</td><td class='value'>" . htmlspecialchars($country) . "</td></tr>
                <tr><td class='label'>پست الکترونیکی:</td><td class='value'>" . (!empty($email) ? "<a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a>" : 'ثبت نشده') . "</td></tr>
                <tr><td class='label'>شماره تلفن:</td><td class='value'>" . htmlspecialchars($phone) . "</td></tr>
            </table>

            <div class='section-title'>جزئیات استعلام (Inquiry Details)</div>
            <table class='info-table'>
                <tr><td class='label'>نوع استعلام / حوزه:</td><td class='value'>" . htmlspecialchars($sector ?: 'عمومی') . "</td></tr>
            </table>

            <div class='section-title'>متن پیام و شرح استعلام:</div>
            <div class='message-box'>" . nl2br(htmlspecialchars($message)) . "</div>

            <div class='footer'>
                این ایمیل به صورت خودکار از سیستم فرم تماس وب‌سایت رفاه صنعت پردیس ارسال شده است.<br>
                زمان ارسال: " . date('Y-m-d H:i:s T') . "
            </div>
        </div>
    </body>
    </html>
    ";
} else {
    $emailHtml = "
    <!DOCTYPE html>
    <html dir='ltr' lang='en'>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }
            .container { max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-top: 4px solid #00C4CC; padding: 30px; }
            .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 25px; }
            .header h2 { margin: 0; color: #073859; font-size: 20px; }
            .header p { margin: 5px 0 0; color: #64748b; font-size: 13px; }
            .section-title { font-size: 13px; font-weight: bold; color: #00C4CC; text-transform: uppercase; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px; }
            .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .info-table td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
            .label { font-weight: bold; color: #475569; width: 35%; }
            .value { color: #0f172a; }
            .message-box { background: #f8fafc; border-left: 4px solid #073859; padding: 15px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
            .footer { margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>REFAH SANAT PARDIS TRADING CO.</h2>
                <p>New Commercial Business Inquiry Notification</p>
            </div>

            <div class='section-title'>Company Information</div>
            <table class='info-table'>
                <tr><td class='label'>Full Name:</td><td class='value'>" . htmlspecialchars($name) . "</td></tr>
                <tr><td class='label'>Company Name:</td><td class='value'>" . htmlspecialchars($firm ?: 'Not Provided') . "</td></tr>
                <tr><td class='label'>Country:</td><td class='value'>" . htmlspecialchars($country) . "</td></tr>
                <tr><td class='label'>Email Address:</td><td class='value'>" . (!empty($email) ? "<a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a>" : 'Not Provided') . "</td></tr>
                <tr><td class='label'>Phone Number:</td><td class='value'>" . htmlspecialchars($phone) . "</td></tr>
            </table>

            <div class='section-title'>Inquiry Details</div>
            <table class='info-table'>
                <tr><td class='label'>Inquiry Type:</td><td class='value'>" . htmlspecialchars($sector ?: 'General') . "</td></tr>
            </table>

            <div class='section-title'>Message & Scope:</div>
            <div class='message-box'>" . nl2br(htmlspecialchars($message)) . "</div>

            <div class='footer'>
                Transmitted automatically from official website portal.<br>
                Timestamp: " . date('Y-m-d H:i:s T') . "
            </div>
        </div>
    </body>
    </html>
    ";
}

// 6. Include PHPMailer files and send email
require_once __DIR__ . '/phpmailer/Exception.php';
require_once __DIR__ . '/phpmailer/PHPMailer.php';
require_once __DIR__ . '/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = !empty($smtpUser) && !empty($smtpPass);
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = ($smtpSecure === 'ssl') ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $smtpPort;
    $mail->CharSet    = 'UTF-8';

    // Recipients
    $mail->setFrom($smtpUser, 'Refah Sanat Pardis Web Desk');
    $mail->addAddress($toEmail, $toName);
    // Reply-To only if the submitter provided a valid email
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($email, $name);
    }

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $emailHtml;

    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => $isFa 
            ? 'درخواست شما با موفقیت ثبت و ایمیل ارسال گردید.' 
            : 'Inquiry submitted and email delivered successfully.'
    ]);
} catch (Exception $e) {
    // Fallback: Attempt native mail() function if PHPMailer SMTP fails or password unset
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Refah Web Desk <{$smtpUser}>\r\n";
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: {$email}\r\n";
    }

    $mailSent = @mail($toEmail, "=?UTF-8?B?" . base64_encode($subject) . "?=", $emailHtml, $headers);

    if ($mailSent) {
        echo json_encode([
            'success' => true,
            'message' => $isFa 
                ? 'درخواست شما ثبت گردید.' 
                : 'Inquiry received successfully.'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => $isFa 
                ? 'خطا در ارسال ایمیل. لطفاً با info@refah-spc.ir تماس بگیرید.' 
                : 'Server email sending failed. Please write directly to info@refah-spc.ir.',
            'debug'   => $mail->ErrorInfo
        ]);
    }
}
