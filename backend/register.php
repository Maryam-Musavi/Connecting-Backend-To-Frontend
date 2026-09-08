<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'فقط POST مجاز است'], JSON_UNESCAPED_UNICODE);
    exit;
}

 $raw = file_get_contents('php://input');
 $data = json_decode($raw, true);

if (!is_array($data)) {
    $data = $_POST;
}

 $name  = trim((string)($data['name'] ?? ''));
 $phone = trim((string)($data['phone'] ?? ''));
 $email = trim((string)($data['email'] ?? ''));

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

echo json_encode([
    'success'   => true,
    'got_name'  => $name,
    'got_phone' => $phone,
    'got_email' => $email,
], JSON_UNESCAPED_UNICODE);