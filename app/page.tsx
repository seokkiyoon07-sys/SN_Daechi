import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Philosophy from "@/components/sections/Philosophy";
import StudentApp from "@/components/sections/StudentApp";

export const metadata: Metadata = {
  title: "대치동 관리형 스터디카페 | SN고요의숲 대치점",
  description: "대치동 관리형 스터디카페 SN고요의숲. 집중할 수 있는 자습 공간, 출결·생활관리, AI 학습 도구와 학습 리포트로 자기주도학습을 지원합니다. 대치역 인근 SN고요의숲 대치점.",
  keywords: [
    "대치동 관리형 스터디카페",
    "SN고요의숲",
    "대치동 관리형 스터디카페",
    "독학재수",
    "AI 학습관리",
    "오답 분석",
    "취약단원 분석",
    "AI 자기주도학습 지원",
    "킬러문항",
    "디지털 차단",
    "대치역 관리형 스터디카페",
    "관리형 스터디카페",
    "SN대치"
  ],
  openGraph: {
    title: "대치동 관리형 스터디카페 | SN고요의숲 대치점",
    description: "대치동 관리형 스터디카페 SN고요의숲. 집중할 수 있는 자습 공간, 출결·생활관리, AI 학습 도구와 학습 리포트로 자기주도학습을 지원합니다. 대치역 인근 SN고요의숲 대치점.",
    url: "https://daechi.snacademy.co.kr",
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
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <Philosophy />
        <StudentApp />
      </main>
      <Footer />
    </div>
  );
}
