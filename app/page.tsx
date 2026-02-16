import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Philosophy from "@/components/sections/Philosophy";

export const metadata: Metadata = {
  title: "대치동 독학재수학원 | SN고요의숲 대치점",
  description: "AI 학습관리 특화 독학재수관. 공부량·오답·취약단원 분석, 디지털 차단 환경, 수학 원장 클리닉, 국어·수학 상위권 킬러문항 무제한 제공. 대치역 3분거리 재수학원 SN고요의숲",
  keywords: [
    "대치동 독학재수학원",
    "SN고요의숲",
    "대치동 재수학원",
    "독학재수",
    "AI 학습관리",
    "오답 분석",
    "취약단원 분석",
    "수학 원장 클리닉",
    "킬러문항",
    "디지털 차단",
    "대치역 재수학원",
    "관리형 학원",
    "SN대치"
  ],
  openGraph: {
    title: "대치동 독학재수학원 | SN고요의숲 대치점",
    description: "AI 학습관리 특화 독학재수관. 공부량·오답·취약단원 분석, 디지털 차단 환경, 수학 원장 클리닉, 국어·수학 상위권 킬러문항 무제한 제공. 대치역 3분거리 재수학원 SN고요의숲",
    url: "https://daechi.snacademy.co.kr",
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
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <Philosophy />
      </main>
      <Footer />
    </div>
  );
}
