import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "합격후기 | 대치 고요의 숲",
  description: "대치 고요의 숲 수강생들의 솔직한 후기를 확인하세요. AI 학습 시스템과 관리에 대한 실제 경험담입니다.",
  openGraph: {
    title: "합격후기 | 대치 고요의 숲",
    description: "수강생들의 솔직한 후기와 성적 향상 경험담.",
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
