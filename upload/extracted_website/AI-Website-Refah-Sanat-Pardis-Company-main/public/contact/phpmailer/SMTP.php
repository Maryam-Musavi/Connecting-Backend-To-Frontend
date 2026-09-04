<?php
namespace PHPMailer\PHPMailer;

class SMTP
{
    const VERSION = '6.9.1';
    const DEFAULT_PORT = 25;
    const MAX_LINE_LENGTH = 998;
    const MAX_REPLY_LENGTH = 512;
    const DEBUG_OFF = 0;

    public $Version = '6.9.1';
    public $SMTP_PORT = 25;
    public $CRLF = "\r\n";
    public $do_debug = self::DEBUG_OFF;

    protected $smtp_conn;
    protected $error = [];
    protected $helo_rply;

    public function connect($host, $port = null, $timeout = 30, $options = [])
    {
        $this->error = [];
        if ($this->connected()) {
            return true;
        }

        if (empty($port)) {
            $port = self::DEFAULT_PORT;
        }

        $errno = 0;
        $errstr = '';
        $socket_context = stream_context_create($options);

        set_error_handler([$this, 'errorHandler']);

        $this->smtp_conn = stream_socket_client(
            $host . ':' . $port,
            $errno,
            $errstr,
            $timeout,
            STREAM_CLIENT_CONNECT,
            $socket_context
        );

        restore_error_handler();

        if (!is_resource($this->smtp_conn)) {
            $this->error = [
                'error' => 'Failed to connect to server',
                'errno' => $errno,
                'errstr' => $errstr
            ];
            return false;
        }

        stream_set_timeout($this->smtp_conn, $timeout);
        $announce = $this->get_lines();

        return true;
    }

    public function connected()
    {
        if (is_resource($this->smtp_conn)) {
            $sock_status = socket_get_status($this->smtp_conn);
            if ($sock_status['eof']) {
                $this->close();
                return false;
            }
            return true;
        }
        return false;
    }

    public function close()
    {
        $this->error = [];
        $this->helo_rply = null;
        if (is_resource($this->smtp_conn)) {
            fclose($this->smtp_conn);
            $this->smtp_conn = null;
        }
    }

    public function hello($host = '')
    {
        return $this->sendHello('EHLO', $host) or $this->sendHello('HELO', $host);
    }

    protected function sendHello($hello, $host)
    {
        if (!$this->sendCommand($hello, $hello . ' ' . $host, 250)) {
            return false;
        }
        $this->helo_rply = $this->get_lines();
        return true;
    }

    public function authenticate($username, $password, $authtype = null)
    {
        if (!$this->sendCommand('AUTH LOGIN', 'AUTH LOGIN', 334)) {
            return false;
        }
        if (!$this->sendCommand('User', base64_encode($username), 334)) {
            return false;
        }
        if (!$this->sendCommand('Password', base64_encode($password), 235)) {
            return false;
        }
        return true;
    }

    public function sendCommand($commandlabel, $command, $expect)
    {
        if (!$this->connected()) {
            return false;
        }
        fputs($this->smtp_conn, $command . $this->CRLF);
        $rply = $this->get_lines();
        $code = substr($rply, 0, 3);
        if ($code != $expect) {
            return false;
        }
        return true;
    }

    public function mail($from)
    {
        return $this->sendCommand('MAIL FROM', 'MAIL FROM:<' . $from . '>', 250);
    }

    public function recipient($toaddress)
    {
        return $this->sendCommand('RCPT TO', 'RCPT TO:<' . $toaddress . '>', 250);
    }

    public function data($msg_data)
    {
        if (!$this->sendCommand('DATA', 'DATA', 354)) {
            return false;
        }
        $msg_data = str_replace("\r\n.", "\r\n..", $msg_data);
        fputs($this->smtp_conn, $msg_data . $this->CRLF . '.' . $this->CRLF);
        $rply = $this->get_lines();
        return substr($rply, 0, 3) == 250;
    }

    public function quit()
    {
        $this->sendCommand('QUIT', 'QUIT', 221);
        $this->close();
    }

    protected function get_lines()
    {
        if (!is_resource($this->smtp_conn)) {
            return '';
        }
        $data = '';
        while (!feof($this->smtp_conn)) {
            $str = @fgets($this->smtp_conn, 515);
            $data .= $str;
            if (isset($str[3]) && $str[3] == ' ') {
                break;
            }
        }
        return $data;
    }

    protected function errorHandler($errno, $errmsg)
    {
        $this->error = ['errno' => $errno, 'errmsg' => $errmsg];
    }
}
