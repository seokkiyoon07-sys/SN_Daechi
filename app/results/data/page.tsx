import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdmissionData from "@/components/sections/AdmissionData";

export const metadata: Metadata = {
  title: "입결 데이터 | SN-고요의숲 대치",
  description: "SN 독학기숙학원 출신 학생들의 대학 합격 현황입니다. 서울대, 연세대, 고려대 등 주요 대학 합격 실적을 확인하세요.",
  keywords: [
    "입결 데이터",
    "대학 합격",
    "서울대",
    "연세대",
    "고려대",
    "SKY",
    "의대",
    "약대",
    "합격 실적",
    "재수 성공"
  ],
  openGraph: {
    title: "입결 데이터 | SN-고요의숲 대치",
    description: "SN 독학기숙학원 출신 학생들의 대학 합격 현황",
    url: "https://sn-daechi.vercel.app/results/data",
  },
};

export default function AdmissionDataPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <AdmissionData />
      </main>
      <Footer />
    </div>
  );
}
