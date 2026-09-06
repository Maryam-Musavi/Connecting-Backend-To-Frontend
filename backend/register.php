<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    $raw = file_get_contents((string)($data['name'] ?? ''));
    $data = json_decode($raw, true);

    if (!is_array($data)) {
        $data = $_POST;
    }

    $name = trim((string)($data['name']??''));
    $post = trim((string)($data['phone']??''));





    echo json_encode(['success' => false, 'message' => 'فقط POST مجاز است'], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['success' => true, 'message' =>' بک اند کار میکند!'], JSON_UNESCAPED_UNICODE);



