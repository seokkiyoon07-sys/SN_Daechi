import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Philosophy from "@/components/sections/Philosophy";

export const metadata: Metadata = {
  title: "대치 고요의숲 | AI 기반 독학관리학원 - 대치동 재수학원",
  description: "대치동 최초 AI 기반 독학관리 시스템. SNarGPT와 SNarGen으로 학습의 전 과정을 통합(Full-Stack) 관리합니다. 몰입 환경, 개인 맞춤 학습 리포트, 초개인화된 관리로 성적을 설계합니다. 2~3월 신규등록 50% 할인.",
  keywords: [
    "대치동 독학재수학원",
    "AI 독학관리",
    "SNarGPT",
    "SNarGen",
    "대치동 재수학원",
    "관리형 학원",
    "독학재수",
    "수능 AI",
    "오답 분석 AI",
    "대치 고요의숲",
    "SN대치",
    "프리미엄 수학관리반",
    "Full-Stack AI 학습"
  ],
  openGraph: {
    title: "대치 고요의숲 | AI 기반 독학관리학원",
    description: "학습의 전 과정을 AI 시스템으로 통합(Full-Stack)한 곳은 오직 SN뿐. 초개인화된 관리로 성적을 설계합니다.",
    url: "https://daechi.snacademy.co.kr",
    images: [
      {
        url: "/image/thumbnail/daechi_goyuuiseup.png",
        width: 1200,
        height: 630,
        alt: "대치 고요의숲 AI 독학관리학원",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "대치 고요의숲 | AI 기반 독학관리학원",
    description: "학습의 전 과정을 AI 시스템으로 통합(Full-Stack)한 곳은 오직 SN뿐.",
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
