<?php
header('Content-Type: application/json; charset=UTF-8');
echo json_encode(['success' => true, 'message' =>' بک اند کار میکند!'], JSON_UNESCAPED_UNICODE);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'فقط POST مجاز است'], JSON_UNESCAPED_UNICODE);
    exit;
}

$raw = file_get_contents((string)($data['name'] ?? ''));
$data = json_decode($raw, true);

if (!is_array($data)) {
    $data = $_POST;
}

$name = trim((string))
$post = trim((string)())