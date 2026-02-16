import type { Metadata, Viewport } from "next";
import "./globals.css";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://daechi.snacademy.co.kr"),
  title: "대치동 독학재수학원 | SN고요의숲 대치점",
  icons: {
    icon: [
      { url: "/image/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/image/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/image/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/image/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/image/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
  description: "AI 학습관리 특화 독학재수관. 공부량·오답·취약단원 분석, 디지털 차단 환경, 수학 원장 클리닉, 국어·수학 상위권 킬러문항 무제한 제공. 대치역 3분거리 재수학원 SN고요의숲",
  keywords: [
    "독학재수학원",
    "대치동 학원",
    "AI 학습",
    "SNarGPT",
    "수능 AI",
    "성적 분석",
    "오답 관리",
    "독학관리",
    "SN고요의숲",
    "재수학원",
    "대치학원"
  ],
  authors: [{ name: "대치 고요의 숲" }],
  creator: "대치 고요의 숲",
  publisher: "대치 고요의 숲",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://daechi.snacademy.co.kr",
    siteName: "대치 고요의 숲",
    title: "대치동 독학재수학원 | SN고요의숲 대치점",
    description: "AI 학습관리 특화 독학재수관. 공부량·오답·취약단원 분석, 디지털 차단 환경, 수학 원장 클리닉, 국어·수학 상위권 킬러문항 무제한 제공. 대치역 3분거리 재수학원 SN고요의숲",
    images: [
      {
        url: "/image/thumbnail/daechi_goyuuiseup.png",
        width: 1200,
        height: 630,
        alt: "대치동 독학재수학원 SN고요의숲 대치점",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "대치동 독학재수학원 | SN고요의숲 대치점",
    description: "AI 학습관리 특화 독학재수관. 공부량·오답·취약단원 분석, 디지털 차단 환경, 수학 원장 클리닉, 국어·수학 상위권 킬러문항 무제한 제공. 대치역 3분거리 재수학원 SN고요의숲",
    images: ["/image/thumbnail/daechi_goyuuiseup.png"],
  },
  verification: {
    google: "y8r6AnO1o2fT-oJBgtO-RYGK6qn5UFva36Xj_ijM5-M",
    other: {
      "naver-site-verification": "674fc4da21ffde6c047b784ebaadb9cddccc5f92",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        <script
          defer
          data-domain="daechi.snacademy.co.kr"
          src="https://analytics.snargpt.ai/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
