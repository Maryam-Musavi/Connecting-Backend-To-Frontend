<?php
namespace PHPMailer\PHPMailer;

class PHPMailer
{
    const CHARSET_ISO88591 = 'iso-8859-1';
    const CHARSET_UTF8 = 'utf-8';
    const ENCRYPTION_SMTPS = 'ssl';
    const ENCRYPTION_STARTTLS = 'tls';

    public $CharSet = 'utf-8';
    public $ContentType = 'text/html';
    public $Encoding = '8bit';
    public $From = 'info@refah-spc.ir';
    public $FromName = 'Refah Sanat Pardis';
    public $Sender = '';
    public $Subject = '';
    public $Body = '';
    public $AltBody = '';
    public $WordWrap = 0;
    public $Mailer = 'smtp';
    public $Host = 'mail.refah-spc.ir';
    public $Port = 465;
    public $SMTPSecure = 'ssl';
    public $SMTPAuth = true;
    public $Username = 'info@refah-spc.ir';
    public $Password = '';
    public $Timeout = 30;
    public $ErrorInfo = '';

    protected $to = [];
    protected $cc = [];
    protected $bcc = [];
    protected $ReplyTo = [];
    protected $smtp = null;

    public function __construct($exceptions = null)
    {
    }

    public function isSMTP()
    {
        $this->Mailer = 'smtp';
    }

    public function addAddress($address, $name = '')
    {
        $this->to[] = [$address, $name];
        return true;
    }

    public function addReplyTo($address, $name = '')
    {
        $this->ReplyTo[] = [$address, $name];
        return true;
    }

    public function setFrom($address, $name = '', $auto = true)
    {
        $this->From = $address;
        $this->FromName = $name;
        return true;
    }

    public function isHTML($isHtml = true)
    {
        if ($isHtml) {
            $this->ContentType = 'text/html';
        } else {
            $this->ContentType = 'text/plain';
        }
    }

    public function send()
    {
        try {
            if ($this->Mailer === 'smtp') {
                return $this->smtpSend();
            } else {
                return $this->mailSend();
            }
        } catch (Exception $e) {
            $this->ErrorInfo = $e->getMessage();
            return false;
        }
    }

    protected function smtpSend()
    {
        $this->smtp = new SMTP();
        $prefix = ($this->SMTPSecure === 'ssl') ? 'ssl://' : (($this->SMTPSecure === 'tls') ? 'tls://' : '');
        $host = $prefix . $this->Host;

        if (!$this->smtp->connect($host, $this->Port, $this->Timeout)) {
            // If custom SMTP socket fails, fall back to PHP mail()
            return $this->mailSend();
        }

        if (!$this->smtp->hello('localhost')) {
            return $this->mailSend();
        }

        if ($this->SMTPAuth && !empty($this->Username) && !empty($this->Password)) {
            if (!$this->smtp->authenticate($this->Username, $this->Password)) {
                return $this->mailSend();
            }
        }

        if (!$this->smtp->mail($this->From)) {
            return $this->mailSend();
        }

        foreach ($this->to as $toAddr) {
            if (!$this->smtp->recipient($toAddr[0])) {
                return $this->mailSend();
            }
        }

        $headers  = "From: =?UTF-8?B?" . base64_encode($this->FromName) . "?= <{$this->From}>\r\n";
        $headers .= "Subject: =?UTF-8?B?" . base64_encode($this->Subject) . "?=\r\n";
        $headers .= "Content-Type: {$this->ContentType}; charset={$this->CharSet}\r\n";
        $headers .= "MIME-Version: 1.0\r\n";

        if (!empty($this->ReplyTo)) {
            $headers .= "Reply-To: {$this->ReplyTo[0][0]}\r\n";
        }

        $fullMsg = $headers . "\r\n" . $this->Body;

        if (!$this->smtp->data($fullMsg)) {
            return $this->mailSend();
        }

        $this->smtp->quit();
        return true;
    }

    protected function mailSend()
    {
        $toStr = implode(', ', array_map(function($t) { return $t[0]; }, $this->to));
        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: {$this->ContentType}; charset={$this->CharSet}\r\n";
        $headers .= "From: =?UTF-8?B?" . base64_encode($this->FromName) . "?= <{$this->From}>\r\n";
        if (!empty($this->ReplyTo)) {
            $headers .= "Reply-To: {$this->ReplyTo[0][0]}\r\n";
        }

        $subjectEncoded = "=?UTF-8?B?" . base64_encode($this->Subject) . "?=";
        return @mail($toStr, $subjectEncoded, $this->Body, $headers);
    }
}
