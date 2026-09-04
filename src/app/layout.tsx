import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "تماس با ما | Refah Sanat Pardis Trading Co.",
  description:
    "شرکت بازرگانی رفاه صنعت پردیس — ارتباط و مکاتبات تجاری. Contact the commercial trade desk of Refah Sanat Pardis Trading Co. for international business inquiries.",
  keywords: [
    "رفاه صنعت پردیس",
    "تماس با ما",
    "بازرگانی بین‌المللی",
    "Refah Sanat Pardis",
    "Contact",
    "International Trading",
  ],
  authors: [{ name: "Refah Sanat Pardis Trading Co." }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "تماس با ما | Refah Sanat Pardis Trading Co.",
    description: "ارتباط با میز مکاتبات تجاری شرکت بازرگانی رفاه صنعت پردیس",
    siteName: "Refah Sanat Pardis Trading Co.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} antialiased bg-[#04121E] text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
