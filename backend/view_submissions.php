<?php
// صفحه‌ی نمایش ثبت‌نام‌های ذخیره‌شده — نیمه‌ی «خواندن» (SELECT) از دیتابیس.
// این صفحه فقط برای یادگیری/توسعه‌ی محلی است. قبل از انتشار عمومی باید
// با یک سیستم لاگین واقعی (session + password_hash) محافظت شود.

require_once __DIR__ . '/db.php';

// خواندن همه‌ی رکوردها، جدیدترین اول
$pdo   = get_db_connection();
$rows  = $pdo->query('SELECT * FROM inquiries ORDER BY id DESC')->fetchAll();
$count = count($rows);
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ثبت‌نام‌های ذخیره‌شده</title>
<style>
  :root { --navy:#073859; --teal:#00b3ba; --line:#dde4ea; --bg:#eef2f5; }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--bg); color: #1e293b;
    font-family: 'Vazirmatn', Tahoma, Arial, sans-serif; line-height: 1.7;
  }
  .wrap { max-width: 1000px; margin: 0 auto; padding: 32px 20px; }
  h1 { color: var(--navy); margin: 0 0 4px; font-size: 22px; }
  .sub { color: #64748b; margin: 0 0 24px; font-size: 14px; }
  table {
    width: 100%; border-collapse: collapse; background: #fff;
    border: 1px solid var(--line); border-radius: 10px; overflow: hidden;
    font-size: 14px;
  }
  th, td { padding: 10px 12px; text-align: right; border-bottom: 1px solid var(--line); vertical-align: top; }
  th { background: var(--navy); color: #fff; font-weight: 600; }
  tr:last-child td { border-bottom: none; }
  tr:nth-child(even) td { background: #f8fafc; }
  .empty {
    background: #fff; border: 1px solid var(--line); border-radius: 10px;
    padding: 32px; text-align: center; color: #64748b;
  }
  a { color: var(--teal); }
</style>
</head>
<body>
<div class="wrap">
  <h1>ثبت‌نام‌های ذخیره‌شده</h1>
  <p class="sub"><?= $count ?> رکورد در دیتابیس SQLite ذخیره شده است.</p>

  <?php if ($count === 0): ?>
    <div class="empty">
      هنوز رکوردی ثبت نشده. <a href="../index.html">بازگشت به فرم</a> و اولین ثبت‌نام را انجام بده.
    </div>
  <?php else: ?>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>نام</th>
          <th>شرکت</th>
          <th>تلفن</th>
          <th>ایمیل</th>
          <th>کشور</th>
          <th>حوزه</th>
          <th>شرح درخواست</th>
          <th>زمان</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($rows as $row): ?>
          <tr>
            <td><?= htmlspecialchars((string)$row['id']) ?></td>
            <td><?= htmlspecialchars((string)$row['name']) ?></td>
            <td><?= htmlspecialchars((string)$row['firm']) ?></td>
            <td><?= htmlspecialchars((string)$row['phone']) ?></td>
            <td><?= htmlspecialchars((string)$row['email']) ?></td>
            <td><?= htmlspecialchars((string)$row['country']) ?></td>
            <td><?= htmlspecialchars((string)$row['sector']) ?></td>
            <td><?= htmlspecialchars((string)$row['message']) ?></td>
            <td><?= htmlspecialchars((string)$row['created_at']) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>

  <p class="sub" style="margin-top: 24px;"><a href="../index.html">→ بازگشت به فرم ثبت‌نام</a></p>
</div>
</body>
</html>
