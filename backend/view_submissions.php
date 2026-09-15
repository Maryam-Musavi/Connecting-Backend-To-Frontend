<?php
ini_set('display_errors', '0');
error_reporting(E_ALL);

require_once __DIR__ . '/config.php';

$key = trim((string)($_GET['key'] ?? ''));

if (!hash_equals(ADMIN_KEY, $key)) {
    http_response_code(403);
    echo 'دسترسی غیر مجاز';
    exit;
}

echo 'رمز درست بود! ادامه صفحه بعدا اینجا میاد';