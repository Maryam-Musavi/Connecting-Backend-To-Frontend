<?php

header('Content-Type: application/json; charset-UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'فقط GET مجاز است'],
    JSON_UNESCAPED_UNICODE);
        exit;
}

$sector = ['واردات', 'صادرات', 'نمایندگی', 'سایر'];

echo json_encode(['success' => true, 'sectors' => $sector], JSON_UNESCAPED_UNICODE);