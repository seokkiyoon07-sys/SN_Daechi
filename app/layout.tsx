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
  title: "대치 고요의 숲 | AI 기반 독학관리학원",
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
  description: "대치동 최초 AI 기반 독학관리 시스템. 몰입 환경, 개인 맞춤 학습 리포트, SNarGPT로 성적을 설계합니다.",
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
    title: "대치 고요의 숲 | AI 독학관리의 새로운 기준",
    description: "몰입 환경 + AI 학습 리포트. 대치동 독학관리의 진화.",
    images: [
      {
        url: "/image/OGimage.png",
        width: 1200,
        height: 630,
        alt: "대치 고요의 숲 AI 독학관리학원",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "대치 고요의 숲 | AI 독학관리의 새로운 기준",
    description: "몰입 환경 + AI 학습 리포트. 대치동 독학관리의 진화.",
    images: ["/image/OGimage.png"],
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "naver-site-verification": "your-naver-verification-code",
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
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
