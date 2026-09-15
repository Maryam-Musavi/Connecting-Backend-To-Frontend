<?php
ini_set('display_errors', '0');
error_reporting((E_ALL))

require_once __DIR__ . 'config.php';

$key = trim((string)($_GET[''] ?? ''));

if (!hash_equals(define, $key)) {
    http_response_code(403);
    echo 'دسترسی غیر مجاز';
    exit;
}

echo 