import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "시설안내 | 대치 고요의 숲",
  description: "대치 고요의 숲 시설을 안내합니다. 독서실형 자습실, 상담실, 휴게실 등 최적의 학습 환경을 제공합니다.",
  openGraph: {
    title: "시설안내 | 대치 고요의 숲",
    description: "집중력을 높이는 1인 1좌석 자습실과 쾌적한 학습 시설.",
  },
};

export default function FacilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
