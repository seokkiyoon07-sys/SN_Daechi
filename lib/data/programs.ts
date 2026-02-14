// 수강료 데이터 - PPT와 /programs 페이지에서 공유
export const programsData = [
  {
    badge: "인기",
    title: "정규 독학재수반",
    description: "완벽한 학습 환경과 체계적인 관리 시스템",
    features: [
      "개인별 맞춤 학습 플랜",
      "주간/월간 성적 분석",
      "전담 멘토 배정",
      "12시간 자습실 이용"
    ],
    price: "800,000 원",
    originalPrice: "800,000 원",
    discountPrice: "400,000 원",
    discountRate: "50%",
    priceLabel: "수강료 안내"
  },
  {
    badge: "NEW",
    title: "정규 재학생반",
    description: "완벽한 학습 환경과 체계적인 관리 시스템",
    features: [
      "개인별 맞춤 학습 플랜",
      "주간/월간 성적 분석",
      "전담 멘토 배정",
      "12시간 자습실 이용"
    ],
    price: "800,000 원",
    originalPrice: "800,000 원",
    discountPrice: "400,000 원",
    discountRate: "50%",
    discountNote: "2개월차부터 600,000원 (25% 할인)",
    priceLabel: "수강료 안내"
  },
  {
    badge: "추천",
    title: "프리미엄 수학 관리반",
    description: "대치 박진모 원장의 전담 관리로 확실한 성적 향상",
    features: [
      "중대부고, 단대부고, 휘문고, 숙명여고 재학생 맞춤 내신 대비 문제, 수능 킬러문제 무한제공",
      "1:1 개인 맞춤 케어",
      "매일 학습 진도 체크",
      "실시간 질의응답",
      "학부모 상담 서비스"
    ],
    price: "600,000 원",
    originalPrice: "600,000 원",
    discountPrice: "300,000 원",
    discountRate: "50%",
    priceLabel: "수강료 안내"
  }
];

export type Program = typeof programsData[number];
