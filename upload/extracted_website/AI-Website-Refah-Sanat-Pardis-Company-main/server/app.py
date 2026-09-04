"""
Refah Sanat Pardis — Contact Form Backend (FastAPI + Gmail SMTP)
================================================================

Endpoints
---------
POST /api/contact
    Accepts the 5-field bilingual inquiry form (JSON body).
    Sends an HTML email to RECIPIENT_EMAIL via Gmail SMTP.
    Returns: {"success": bool, "message": str}

GET  /api/health
    Returns server status and whether SMTP credentials are configured.

Production
----------
If a Vite build exists at ../dist, this server also serves the static
frontend, so a single Python process can serve both API + UI on one port.
"""

from __future__ import annotations

import os
import smtplib
import ssl
import sys
import traceback
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr, formatdate
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

# ----------------------------------------------------------------------
# Config
# ----------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
load_dotenv(BASE_DIR / ".env")

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "").strip()
SMTP_PASS = os.getenv("SMTP_PASS", "").strip()
SMTP_FROM_NAME = os.getenv("SMTP_FROM_NAME", "Refah Sanat Pardis Web Desk")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", "").strip() or SMTP_USER
BIND_HOST = os.getenv("HOST", "0.0.0.0")
BIND_PORT = int(os.getenv("PORT", "8000"))

# ----------------------------------------------------------------------
# App
# ----------------------------------------------------------------------
app = FastAPI(
    title="Refah Sanat Pardis Contact API",
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

# CORS — wide open for dev; tighten to your domain in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["POST", "OPTIONS", "GET"],
    allow_headers=["Content-Type"],
)


# ----------------------------------------------------------------------
# Pydantic model — strict input validation
# ----------------------------------------------------------------------
class ContactPayload(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    firm: str = Field(..., min_length=1, max_length=200)
    phone: str = Field(..., min_length=6, max_length=30)
    country: str = Field(..., min_length=1, max_length=100)
    message: str = Field(..., min_length=1, max_length=5000)
    # Optional fields (kept for backward compatibility with the older PHP form)
    email: Optional[str] = Field("", max_length=200)
    lang: str = Field("en", pattern=r"^(en|fa)$")
    # Honeypot anti-spam — must be empty for legitimate submissions
    website_url_hp: Optional[str] = Field("", max_length=200)


# ----------------------------------------------------------------------
# Email body builders
# ----------------------------------------------------------------------
def _build_html_email(p: ContactPayload) -> str:
    """Bilingual HTML email body. Mirrors the look of the old PHP version."""
    is_fa = p.lang == "fa"
    email_cell_fa = (
        f'<a href="mailto:{_escape(p.email)}">{_escape(p.email)}</a>'
        if p.email
        else 'ثبت نشده'
    )
    email_cell_en = (
        f'<a href="mailto:{_escape(p.email)}">{_escape(p.email)}</a>'
        if p.email
        else 'Not Provided'
    )

    if is_fa:
        return f"""<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head><meta charset="UTF-8">
<style>
  body {{ font-family: Tahoma, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }}
  .container {{ max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-top: 4px solid #00C4CC; padding: 30px; }}
  .header {{ border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 25px; }}
  .header h2 {{ margin: 0; color: #073859; font-size: 20px; }}
  .header p {{ margin: 5px 0 0; color: #64748b; font-size: 13px; }}
  .section-title {{ font-size: 14px; font-weight: bold; color: #00C4CC; text-transform: uppercase; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px; }}
  .info-table {{ width: 100%; border-collapse: collapse; margin-bottom: 20px; }}
  .info-table td {{ padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }}
  .label {{ font-weight: bold; color: #475569; width: 35%; }}
  .value {{ color: #0f172a; }}
  .message-box {{ background: #f8fafc; border-right: 4px solid #073859; padding: 15px; font-size: 14px; line-height: 1.7; color: #334155; white-space: pre-wrap; }}
  .footer {{ margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px; }}
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>شرکت بازرگانی رفاه صنعت پردیس</h2>
      <p>درخواست استعلام جدید از طریق وب‌سایت رسمی</p>
    </div>
    <div class="section-title">اطلاعات متقاضی (Inquirer Information)</div>
    <table class="info-table">
      <tr><td class="label">نام و نام خانوادگی:</td><td class="value">{_escape(p.name)}</td></tr>
      <tr><td class="label">نام شرکت:</td><td class="value">{_escape(p.firm)}</td></tr>
      <tr><td class="label">کشور:</td><td class="value">{_escape(p.country)}</td></tr>
      <tr><td class="label">پست الکترونیکی:</td><td class="value">{email_cell_fa}</td></tr>
      <tr><td class="label">شماره تلفن:</td><td class="value">{_escape(p.phone)}</td></tr>
    </table>
    <div class="section-title">متن پیام و شرح استعلام:</div>
    <div class="message-box">{_nl2br(_escape(p.message))}</div>
    <div class="footer">
      این ایمیل به صورت خودکار از سیستم فرم تماس وب‌سایت رفاه صنعت پردیس ارسال شده است.<br>
      زمان ارسال: {_now()}
    </div>
  </div>
</body>
</html>"""

    return f"""<!DOCTYPE html>
<html dir="ltr" lang="en">
<head><meta charset="UTF-8">
<style>
  body {{ font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }}
  .container {{ max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-top: 4px solid #00C4CC; padding: 30px; }}
  .header {{ border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 25px; }}
  .header h2 {{ margin: 0; color: #073859; font-size: 20px; }}
  .header p {{ margin: 5px 0 0; color: #64748b; font-size: 13px; }}
  .section-title {{ font-size: 13px; font-weight: bold; color: #00C4CC; text-transform: uppercase; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px; }}
  .info-table {{ width: 100%; border-collapse: collapse; margin-bottom: 20px; }}
  .info-table td {{ padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }}
  .label {{ font-weight: bold; color: #475569; width: 35%; }}
  .value {{ color: #0f172a; }}
  .message-box {{ background: #f8fafc; border-left: 4px solid #073859; padding: 15px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }}
  .footer {{ margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px; }}
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>REFAH SANAT PARDIS TRADING CO.</h2>
      <p>New Commercial Business Inquiry Notification</p>
    </div>
    <div class="section-title">Inquirer Information</div>
    <table class="info-table">
      <tr><td class="label">Full Name:</td><td class="value">{_escape(p.name)}</td></tr>
      <tr><td class="label">Company Name:</td><td class="value">{_escape(p.firm)}</td></tr>
      <tr><td class="label">Country:</td><td class="value">{_escape(p.country)}</td></tr>
      <tr><td class="label">Email Address:</td><td class="value">{email_cell_en}</td></tr>
      <tr><td class="label">Phone Number:</td><td class="value">{_escape(p.phone)}</td></tr>
    </table>
    <div class="section-title">Message &amp; Scope</div>
    <div class="message-box">{_nl2br(_escape(p.message))}</div>
    <div class="footer">
      Transmitted automatically from official website portal.<br>
      Timestamp: {_now()}
    </div>
  </div>
</body>
</html>"""


def _escape(s: str) -> str:
    """HTML-escape user input to prevent XSS in email body."""
    if s is None:
        return ""
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&#39;")
    )


def _nl2br(s: str) -> str:
    """Convert newlines to <br> tags."""
    return s.replace("\r\n", "\n").replace("\n", "<br>\n")


def _now() -> str:
    from datetime import datetime
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


# ----------------------------------------------------------------------
# SMTP send
# ----------------------------------------------------------------------
def _send_email(p: ContactPayload) -> None:
    """Send the inquiry email via SMTP. Raises on failure."""
    msg = MIMEMultipart("alternative")
    msg["From"] = formataddr((SMTP_FROM_NAME, SMTP_USER))
    msg["To"] = RECIPIENT_EMAIL
    msg["Subject"] = (
        "درخواست جدید استعلام تجاری - شرکت بازرگانی رفاه صنعت پردیس"
        if p.lang == "fa"
        else "New Business Inquiry - Refah Sanat Pardis Trading Co."
    )
    msg["Date"] = formatdate(localtime=True)
    if p.email:
        msg["Reply-To"] = p.email

    html = _build_html_email(p)
    msg.attach(MIMEText(html, "html", "utf-8"))

    # Use SMTP_SSL on 465, STARTTLS on 587
    if SMTP_PORT == 465:
        ctx = ssl.create_default_context()
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=30, context=ctx) as s:
            s.login(SMTP_USER, SMTP_PASS)
            s.sendmail(SMTP_USER, [RECIPIENT_EMAIL], msg.as_string())
    else:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=30) as s:
            s.starttls(context=ssl.create_default_context())
            s.login(SMTP_USER, SMTP_PASS)
            s.sendmail(SMTP_USER, [RECIPIENT_EMAIL], msg.as_string())


# ----------------------------------------------------------------------
# Routes
# ----------------------------------------------------------------------
@app.get("/api/health")
async def health():
    """Health check + config audit (no secrets leaked)."""
    return {
        "status": "ok",
        "smtp_host": SMTP_HOST,
        "smtp_port": SMTP_PORT,
        "smtp_user_configured": bool(SMTP_USER),
        "smtp_pass_configured": bool(SMTP_PASS),
        "recipient_configured": bool(RECIPIENT_EMAIL),
        "ready": bool(SMTP_USER and SMTP_PASS and RECIPIENT_EMAIL),
    }


@app.post("/api/contact")
async def contact(payload: ContactPayload):
    # Honeypot — silently accept but do nothing
    if payload.website_url_hp:
        return {"success": True, "message": "Inquiry transmitted successfully."}

    # Credential check
    if not (SMTP_USER and SMTP_PASS and RECIPIENT_EMAIL):
        msg = (
            "سرویس ایمیل پیکربندی نشده است. لطفاً فایل server/.env را پر کنید."
            if payload.lang == "fa"
            else "SMTP service is not configured. Please fill in server/.env with Gmail App Password."
        )
        return JSONResponse(
            status_code=500,
            content={"success": False, "message": msg},
        )

    try:
        _send_email(payload)
    except smtplib.SMTPAuthenticationError as e:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": (
                    "احراز هویت SMTP ناموفق بود. آیا از Gmail App Password استفاده می‌کنید؟"
                    if payload.lang == "fa"
                    else "SMTP authentication failed. Are you using a Gmail App Password (not your regular password)?"
                ),
                "detail": str(e),
            },
        )
    except smtplib.SMTPException as e:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": (
                    "خطا در ارتباط با سرور SMTP."
                    if payload.lang == "fa"
                    else "SMTP server communication error."
                ),
                "detail": str(e),
            },
        )
    except Exception as e:
        traceback.print_exc(file=sys.stderr)
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": (
                    "خطای داخلی سرور. لطفاً بعداً تلاش کنید یا مستقیم به info@refah-spc.ir ایمیل بزنید."
                    if payload.lang == "fa"
                    else "Internal server error. Please try again later or email info@refah-spc.ir directly."
                ),
                "detail": str(e),
            },
        )

    return {
        "success": True,
        "message": (
            "درخواست شما با موفقیت ارسال شد. میز تجارت ظرف ۲۴ ساعت پاسخگو خواهد بود."
            if payload.lang == "fa"
            else "Inquiry transmitted successfully. Our trade desk will respond within 24 hours."
        ),
    }


# ----------------------------------------------------------------------
# Production: serve Vite build if present
# ----------------------------------------------------------------------
dist_dir = PROJECT_ROOT / "dist"
if dist_dir.exists() and dist_dir.is_dir():
    # Mount static files at / so the React SPA works
    app.mount("/", StaticFiles(directory=str(dist_dir), html=True), name="spa")


# ----------------------------------------------------------------------
# Main entrypoint
# ----------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    print(f"[*] SMTP host : {SMTP_HOST}:{SMTP_PORT}")
    print(f"[*] SMTP user : {SMTP_USER or '(not configured)'}")
    print(f"[*] Recipient : {RECIPIENT_EMAIL or '(not configured)'}")
    print(f"[*] Listening on http://{BIND_HOST}:{BIND_PORT}")
    print(f"[*] Docs at   http://{BIND_HOST}:{BIND_PORT}/api/docs")
    if dist_dir.exists():
        print(f"[*] Serving static build from {dist_dir}")
    else:
        print(f"[*] No dist/ folder found — API-only mode (use Vite dev server on :3000)")
    uvicorn.run(app, host=BIND_HOST, port=BIND_PORT, log_level="info")
