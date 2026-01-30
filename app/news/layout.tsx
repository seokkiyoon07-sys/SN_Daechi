import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "뉴스 | 대치 고요의 숲",
  description: "대치 고요의 숲 관련 뉴스와 언론 보도를 확인하세요. AI 독학관리 시스템에 대한 최신 소식입니다.",
  openGraph: {
    title: "뉴스 | 대치 고요의 숲",
    description: "언론에 보도된 대치 고요의 숲 소식.",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
