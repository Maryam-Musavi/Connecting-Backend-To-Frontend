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

require_once __DIR__ . '/db.php';
$pdo = get_db_connection();

$rows = $pdo->query(
    'SELECT * FROM inquiries ORDER BY id DESC'
    )->fetchAll();

echo '<table border="1" cellpadding="6">';
echo '<tr>
    <th>نام</th>
    <th>شرکت</th>
    <th>ایمیل</th>
    <th>تلفن</th>
    <th>حوزه استعلام</th>
    <th>شرح درخواست</th>
    <th>تاریخ ثبت</th>
</tr>';

foreach ($rows as $row) {
    echo '<tr>';
    echo '<td>' . htmlspecialchars($row['name']) . '</td>';
    echo '<td>' . htmlspecialchars($row['firm']) . '</td>';
    echo '<td>' . htmlspecialchars($row['email']) . '</td>';
    echo '<td>' . htmlspecialchars($row['phone']) . '</td>';
    echo '<td>' . htmlspecialchars($row['country']) . '</td>';
    echo '<td>' . htmlspecialchars($row['sector']) . '</td>';
    echo '<td>' . htmlspecialchars($row['message']) . '</td>';
    echo '<td>' . htmlspecialchars($row['created_at']) . '</td>';
    echo '</tr>';
}

echo '</table>';