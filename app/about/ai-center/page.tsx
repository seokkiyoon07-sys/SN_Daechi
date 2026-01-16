import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AICenter from "@/components/sections/AICenter";

export const metadata: Metadata = {
  title: "AI특화관 | SN-고요의숲 대치",
  description: "SNarGPT 수능 전문 AI, SNarVIS 학습 비서, SNarGEN 문제 생성 AI, SNarlink 학습량 측정, 성적/오답 분석 시스템 등 AI 기반 독학관리 프로그램을 소개합니다.",
  keywords: [
    "SNarGPT",
    "SNarVIS",
    "SNarGEN",
    "AI 학습 프로그램",
    "수능 AI",
    "성적 분석",
    "오답 관리",
    "학습량 측정",
    "독학관리 시스템",
    "AI특화관"
  ],
  openGraph: {
    title: "AI특화관 | SN-고요의숲 대치",
    description: "AI 기반 독학관리 프로그램 - SNarGPT, SNarVIS, SNarGEN",
    url: "https://sn-daechi.vercel.app/about/ai-center",
  },
};

export default function AICenterPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <AICenter />
      </main>
      <Footer />
    </div>
  );
}
