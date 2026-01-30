import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VisitConsultation from "@/components/sections/VisitConsultation";

export const metadata: Metadata = {
  title: "방문 상담 신청 | SN-고요의숲 대치",
  description: "SN-고요의숲 대치 방문 상담 신청 페이지입니다. 직접 방문하여 학원 시설과 프로그램을 확인하고 맞춤 상담을 받아보세요.",
  keywords: [
    "방문 상담",
    "학원 상담",
    "대치동 학원",
    "재수학원 상담",
    "입학 상담",
    "학원 견학",
    "SN대치 상담"
  ],
  openGraph: {
    title: "방문 상담 신청 | SN-고요의숲 대치",
    description: "SN-고요의숲 대치 방문 상담 신청",
    url: "https://daechi.snacademy.co.kr/admission/visit",
  },
};

export default function VisitPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <VisitConsultation />
      </main>
      <Footer />
    </div>
  );
}
