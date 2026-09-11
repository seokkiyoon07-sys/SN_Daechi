import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SN소개 | 대치 고요의 숲",
  description: "SN 대치 고요의 숲을 소개합니다. 집중할 수 있는 자습 공간과 AI 학습 도구로 자기주도학습을 지원하는 관리형 스터디카페입니다.",
  openGraph: {
    title: "SN소개 | 대치 고요의 숲",
    description: "AI 학습 리포트로 스스로 계획하고 실천하는 자기주도학습. 대치동 관리형 스터디카페 SN고요의숲.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
