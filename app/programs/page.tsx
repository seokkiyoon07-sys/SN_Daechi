import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Recruitment from "@/components/sections/Recruitment";

export const metadata: Metadata = {
  title: "모집요강 | SN-고요의숲 대치",
  description: "SN-고요의숲 대치 독학재수반 및 프리미엄 수학 관리반 모집요강 안내. 개인별 맞춤 학습 플랜, 전담 멘토 배정, 24시간 자습실 이용 가능.",
  keywords: [
    "독학재수반",
    "수학관리반",
    "대치동 재수학원",
    "재수학원 모집",
    "학원 상담",
    "수강료 안내",
    "프리미엄 관리"
  ],
  openGraph: {
    title: "모집요강 | SN-고요의숲 대치",
    description: "독학재수반 및 프리미엄 수학 관리반 모집요강",
    url: "https://sn-daechi.vercel.app/programs",
  },
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Recruitment />
      </main>
      <Footer />
    </div>
  );
}
