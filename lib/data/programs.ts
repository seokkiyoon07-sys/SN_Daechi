// 이용료 데이터 - PPT와 /programs 페이지에서 공유
export const programsData = [
  {
    badge: "인기",
    title: "N수생 관리형 이용권",
    description: "완벽한 학습 환경과 체계적인 관리 시스템",
    features: [
      "스스로 세우는 학습 계획",
      "AI 학습 분석 리포트",
      "AI 자기주도학습 도구",
      "12시간 자습실 이용"
    ],
    price: "800,000 원",
    priceLabel: "월 이용료",
    ctaLabel: "이용 상담하기",
    ctaHref: "#program-inquiry"
  },
  {
    badge: "NEW",
    title: "재학생 관리형 이용권",
    description: "완벽한 학습 환경과 체계적인 관리 시스템",
    features: [
      "스스로 세우는 학습 계획",
      "AI 학습 분석 리포트",
      "AI 자기주도학습 도구",
      "12시간 자습실 이용"
    ],
    price: "600,000 원",
    originalPrice: "800,000 원",
    discountRate: "25%",
    priceLabel: "월 이용료",
    ctaLabel: "이용 상담하기",
    ctaHref: "#program-inquiry"
  },
  {
    badge: "추천",
    title: "프리미엄 학습관리 이용권",
    description: "박진모 수학교습소와 연계 관리",
    features: [
      "스터디카페 자습 공간 이용",
      "AI 학습 도구를 활용한 자기주도학습",
      "수학 학습관리는 박진모 수학교습소와 연계",
      "연계 관리 내용은 상담 시 안내"
    ],
    price: "600,000 원",
    priceLabel: "월 이용료",
    ctaLabel: "연계 관리 상담하기",
    ctaHref: "#program-inquiry"
  },
  {
    badge: "일일권",
    title: "일반인 일일권",
    description: "하루 동안 집중할 공간이 필요한 일반인을 위한 이용권",
    features: [
      "일반인 대상 1일 이용",
      "자습·독서·개인 작업을 위한 공간",
      "방문 전 잔여 좌석 및 이용 시간 확인"
    ],
    price: "전화 또는 현장 문의",
    priceLabel: "일일 이용료",
    ctaLabel: "전화 문의하기",
    ctaHref: "tel:02-557-0301"
  }
];

export type Program = typeof programsData[number];
