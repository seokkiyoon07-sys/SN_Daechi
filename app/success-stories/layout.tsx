import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "합격수기 | 대치 고요의 숲",
  description: "대치 고요의 숲 합격생들의 생생한 합격 수기를 확인하세요. 서울대, 연고대 합격생들의 이야기입니다.",
  openGraph: {
    title: "합격수기 | 대치 고요의 숲",
    description: "실제 합격생들의 생생한 경험담과 학습 노하우.",
  },
};

export default function SuccessStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
