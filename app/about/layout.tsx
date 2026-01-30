import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SN소개 | 대치 고요의 숲",
  description: "SN 대치 고요의 숲을 소개합니다. AI 기반 학습 시스템과 전문 강사진이 함께하는 독학관리학원입니다.",
  openGraph: {
    title: "SN소개 | 대치 고요의 숲",
    description: "AI와 데이터로 설계하는 학습 시스템. 대치동 독학관리의 새로운 기준.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
