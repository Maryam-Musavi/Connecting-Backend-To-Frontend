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



require_once __DIR__ . '/db.php';

$firm    = trim((string)($data['firm'] ?? ''));
$country = trim((string)($data['country'] ?? ''));
$sector  = trim((string)($data['sector'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

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

    echo json_encode(['success' => true, 'message' => 'درخواست با موفقت ثبت شد']);
} catch (Throwable $e) {
    http_response_code(500);
    //echo json_encode(['success' => false, 'message' => 'خطا در ذخیره سازی'],
                    //JSON_UNESCAPED_UNICODE);
    echo json_encode(['success' => false, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
