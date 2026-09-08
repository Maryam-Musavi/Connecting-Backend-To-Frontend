<?php
function get_db_connection(): PDO
{
    $dataDir = __DIR__ . '/data';
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }
    $pdo = new PDO('sqlite:' . $dataDir . 'registration.db');

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS inquiries (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT NOT NULL,
            firm       TEXT,
            email      TEXT,
            phone      TEXT NOT NULL,
            country    TEXT,
            sector     TEXT,
            message    TEXT,
            created_at TEXT NOT NULL
    ");
    return $pdo;
}