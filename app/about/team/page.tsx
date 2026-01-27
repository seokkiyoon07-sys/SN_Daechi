import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Team from "@/components/sections/Team";

export const metadata: Metadata = {
  title: "운영진 소개 | SN-고요의숲 대치",
  description: "대치 고요의 숲을 이끄는 운영진을 소개합니다. 진심을 다한 노력은 배반하지 않습니다.",
  keywords: [
    "박진모 원장",
    "고요의숲",
    "대치동 재수학원",
    "독학관리",
    "수학 전문",
    "SN독학기숙학원"
  ],
  openGraph: {
    title: "운영진 소개 | SN-고요의숲 대치",
    description: "대치 고요의 숲을 이끄는 운영진을 소개합니다.",
    url: "https://daechi.snacademy.co.kr/about/team",
  },
};

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <Team />
      </main>
      <Footer />
    </div>
  );
}
