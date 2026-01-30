import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "학원생활 | 대치 고요의 숲",
  description: "대치 고요의 숲에서의 하루를 안내합니다. 생활관리, 학습시간표, 학사일정, 식단 정보를 확인하세요.",
  openGraph: {
    title: "학원생활 | 대치 고요의 숲",
    description: "체계적인 생활관리와 12시간 집중 학습 시스템.",
  },
};

export default function CampusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
