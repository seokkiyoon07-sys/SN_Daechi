import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Recruitment from "@/components/sections/Recruitment";

export const metadata: Metadata = {
  title: "이용권 안내 | SN-고요의숲 대치",
  description: "SN고요의숲 관리형 스터디카페 이용권 안내. 월간·일일 이용권과 시간당 1만원의 일반용 비즈니스룸을 확인하고 희망 날짜와 시간을 선택하세요.",
  keywords: [
    "월간정기종일권",
    "월간정기오후권",
    "일일종일이용권",
    "일일오후이용권",
    "일반용 비즈니스룸",
    "대치동 관리형 스터디카페",
    "관리형 스터디카페 모집",
    "스터디카페 상담",
    "이용료 안내"
  ],
  openGraph: {
    title: "이용권 안내 | SN-고요의숲 대치",
    description: "월간정기종일권 80만원, 월간정기오후권 60만원, 일일종일이용권 3만원, 일일오후이용권 23,500원 안내",
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
