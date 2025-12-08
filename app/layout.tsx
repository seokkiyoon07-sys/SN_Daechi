import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SN-고요의숲 대치 | AI 기반 독학관리 학원",
  description: "SNarGPT, SNarVIS, SNarGEN 등 최첨단 AI 시스템으로 수능 학습을 완벽하게 관리하는 대치동 독학재수학원. 데이터 기반 성적 분석, 오답 관리, 12시간 집중 학습 시스템을 제공합니다.",
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
  authors: [{ name: "SN-고요의숲 대치" }],
  creator: "SN-고요의숲 대치",
  publisher: "SN-고요의숲 대치",
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
    url: "https://sn-daechi.vercel.app",
    siteName: "SN-고요의숲 대치",
    title: "SN-고요의숲 대치 | AI 기반 독학관리 학원",
    description: "SNarGPT, SNarVIS, SNarGEN 등 최첨단 AI 시스템으로 수능 학습을 완벽하게 관리하는 대치동 독학재수학원",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SN-고요의숲 대치",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SN-고요의숲 대치 | AI 기반 독학관리 학원",
    description: "최첨단 AI 시스템으로 수능 학습을 완벽하게 관리하는 대치동 독학재수학원",
    images: ["/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
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
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
