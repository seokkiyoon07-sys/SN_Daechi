import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용안내 | 대치 고요의 숲",
  description: "대치 고요의 숲 이용 안내입니다. 장학금, 이용료, 이용 절차를 확인하세요.",
  openGraph: {
    title: "이용안내 | 대치 고요의 숲",
    description: "장학금 혜택과 이용 절차 안내.",
  },
};

export default function AdmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
