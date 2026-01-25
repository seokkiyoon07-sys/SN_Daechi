import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "커뮤니티 | 대치 고요의 숲",
  description: "대치 고요의 숲 공지사항, FAQ, 칼럼을 확인하세요. 학원 소식과 입시 정보를 제공합니다.",
  openGraph: {
    title: "커뮤니티 | 대치 고요의 숲",
    description: "공지사항, FAQ, 입시 칼럼 등 유용한 정보를 확인하세요.",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
