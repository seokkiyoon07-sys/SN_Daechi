import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "합격실적 | 대치 고요의 숲",
  description: "대치 고요의 숲 합격 실적을 확인하세요. 서울대, 연세대, 고려대 등 주요 대학 합격자를 배출하고 있습니다.",
  openGraph: {
    title: "합격실적 | 대치 고요의 숲",
    description: "1,000명 이상의 대학 합격자 배출. 결과로 증명하는 독학관리.",
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
