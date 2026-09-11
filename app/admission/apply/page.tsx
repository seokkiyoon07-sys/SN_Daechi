import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OnlineApplication from "@/components/sections/OnlineApplication";

export const metadata: Metadata = {
  title: "온라인 이용 신청 | SN-고요의숲 대치",
  description: "SN-고요의숲 대치 온라인 이용 신청 페이지입니다. 간편하게 이용 상담을 신청하세요.",
  keywords: [
    "온라인 이용 신청",
    "이용 신청",
    "대치동 스터디카페",
    "관리형 스터디카페 입학",
    "독학재수",
    "SN대치 이용 신청"
  ],
  openGraph: {
    title: "온라인 이용 신청 | SN-고요의숲 대치",
    description: "SN-고요의숲 대치 온라인 이용 신청",
    url: "https://daechi.snacademy.co.kr/admission/apply",
  },
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <OnlineApplication />
      </main>
      <Footer />
    </div>
  );
}
