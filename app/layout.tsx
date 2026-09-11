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
  title: "대치동 관리형 스터디카페 | SN고요의숲 대치점",
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
  description: "대치동 관리형 스터디카페 SN고요의숲. 집중할 수 있는 자습 공간, 출결·생활관리, AI 학습 도구와 학습 리포트로 자기주도학습을 지원합니다. 대치역 인근 SN고요의숲 대치점.",
  keywords: [
    "관리형 스터디카페",
    "대치동 스터디카페",
    "AI 학습",
    "SNarGPT",
    "수능 AI",
    "성적 분석",
    "오답 관리",
    "독학관리",
    "SN고요의숲",
    "관리형 스터디카페",
    "대치 스터디카페"
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
    title: "대치동 관리형 스터디카페 | SN고요의숲 대치점",
    description: "대치동 관리형 스터디카페 SN고요의숲. 집중할 수 있는 자습 공간, 출결·생활관리, AI 학습 도구와 학습 리포트로 자기주도학습을 지원합니다. 대치역 인근 SN고요의숲 대치점.",
    images: [
      {
        url: "/image/thumbnail/daechi_goyuuiseup.png",
        width: 1200,
        height: 630,
        alt: "대치동 관리형 스터디카페 SN고요의숲 대치점",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "대치동 관리형 스터디카페 | SN고요의숲 대치점",
    description: "대치동 관리형 스터디카페 SN고요의숲. 집중할 수 있는 자습 공간, 출결·생활관리, AI 학습 도구와 학습 리포트로 자기주도학습을 지원합니다. 대치역 인근 SN고요의숲 대치점.",
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
