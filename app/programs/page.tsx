import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Recruitment from "@/components/sections/Recruitment";

export const metadata: Metadata = {
  title: "이용권 안내 | SN-고요의숲 대치",
  description: "SN고요의숲 관리형 스터디카페 이용권 안내. N수생·재학생 이용권, 박진모 수학교습소와 연계 관리하는 프리미엄 학습관리 이용권, 일반인 일일권을 확인하세요.",
  keywords: [
    "N수생 관리형 이용권",
    "박진모 수학교습소 연계 관리",
    "일반인 일일권",
    "대치동 관리형 스터디카페",
    "관리형 스터디카페 모집",
    "스터디카페 상담",
    "이용료 안내",
    "프리미엄 관리"
  ],
  openGraph: {
    title: "이용권 안내 | SN-고요의숲 대치",
    description: "N수생·재학생 이용권, 박진모 수학교습소 연계 관리, 일반인 일일권 안내",
    url: "https://sn-daechi.vercel.app/programs",
  },
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <Recruitment />
      </main>
      <Footer />
    </div>
  );
}
