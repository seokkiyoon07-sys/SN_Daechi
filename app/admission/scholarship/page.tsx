import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Scholarship from "@/components/sections/Scholarship";

export const metadata: Metadata = {
  title: "장학금 | SN-고요의숲 대치",
  description: "SN-고요의숲 대치의 장학금 제도 안내입니다. 성적 우수 장학금, 재원생 장학금 등 다양한 장학 혜택을 확인하세요.",
  keywords: [
    "장학금",
    "성적 장학금",
    "재수 장학금",
    "학원 장학금",
    "입학 혜택",
    "수능 장학금",
    "SN대치 장학금"
  ],
  openGraph: {
    title: "장학금 | SN-고요의숲 대치",
    description: "SN-고요의숲 대치의 장학금 제도 안내",
    url: "https://sn-daechi.vercel.app/admission/scholarship",
  },
};

export default function ScholarshipPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <Scholarship />
      </main>
      <Footer />
    </div>
  );
}
