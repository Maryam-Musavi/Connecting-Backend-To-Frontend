<?php
/**
 * Refah Sanat Pardis Trading Co.
 * Contact Form SMTP Configuration
 * Hosting: cPanel (MizbanFa)
 */

return [
    // Recipient email address
    'to_email'    => 'info@refah-spc.ir',
    'to_name'     => 'Refah Sanat Pardis Trade Desk',

    // SMTP Configuration
    'smtp_host'   => 'mail.refah-spc.ir',   // cPanel Mail Server Hostname
    'smtp_port'   => 465,                  // 465 for SSL or 587 for TLS
    'smtp_secure' => 'ssl',                // 'ssl' or 'tls'
    'smtp_auth'   => true,
    'smtp_user'   => 'info@refah-spc.ir',   // Your cPanel Email Address
    'smtp_pass'   => 'YOUR_SMTP_PASSWORD_HERE', // Replace with your actual email account password
];
