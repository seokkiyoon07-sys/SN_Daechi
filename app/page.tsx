import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Philosophy from "@/components/sections/Philosophy";

export const metadata: Metadata = {
  title: "SN-고요의숲 대치",
  description: "관리의 본질은 '감시'가 아니라 '데이터를 통한 변화'에 있습니다. 대한민국 최초, 독보적인 AI 데이터 분석과 창의적 콘텐츠 엔진 SNarGen을 통해, 공부의 '감'을 '실전적 훈련'으로 바꾸는 SN의 관리 철학을 소개합니다.",
  keywords: [
    "독학관리",
    "AI 학습",
    "SNarGen",
    "SNarGPT",
    "데이터 기반 관리",
    "대치동 재수학원",
    "관리형 학원",
    "맞춤형 학습",
    "오답 분석",
    "학습 시스템"
  ],
  openGraph: {
    title: "SN-고요의숲 대치",
    description: "관리의 본질은 '감시'가 아니라 '데이터를 통한 변화'에 있습니다.",
    url: "https://sn-daechi.vercel.app/",
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
