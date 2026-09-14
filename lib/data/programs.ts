// 이용권 데이터 - 이용권 안내, 신청 폼, PPT에서 공유
export const programsData = [
  {
    "badge": "월간 · 종일",
    "title": "월간정기종일권",
    "description": "한 달 동안 종일 이용하는 정기 이용권",
    "features": [
      "스스로 세우는 학습 계획",
      "AI 학습시간 분석 리포트",
      "AI 자기주도학습 도구",
      "종일 자습 공간 이용"
    ],
    "price": "800,000 원",
    "priceLabel": "월 이용료",
    "ctaLabel": "온라인 이용 신청",
    "ctaHref": "/admission/apply"
  },
  {
    "badge": "월간 · 오후",
    "title": "월간정기오후권",
    "description": "한 달 동안 오후에 이용하는 정기 이용권",
    "features": [
      "스스로 세우는 학습 계획",
      "AI 학습시간 분석 리포트",
      "AI 자기주도학습 도구",
      "오후 자습 공간 이용"
    ],
    "price": "600,000 원",
    "priceLabel": "월 이용료",
    "ctaLabel": "온라인 이용 신청",
    "ctaHref": "/admission/apply"
  },
  {
    "badge": "일일 · 종일",
    "title": "일일종일이용권",
    "description": "하루 동안 종일 이용하는 이용권",
    "features": [
      "1일 자습 공간 이용",
      "종일 이용",
      "방문 전 잔여 좌석 및 이용 시간 확인"
    ],
    "price": "30,000 원",
    "priceLabel": "일일 이용료",
    "ctaLabel": "빈 좌석 보기",
    "ctaHref": "/programs#day-pass-full-day"
  },
  {
    "badge": "일일 · 오후",
    "title": "일일오후이용권",
    "description": "하루 동안 오후에 이용하는 이용권",
    "features": [
      "1일 자습 공간 이용",
      "오후 이용",
      "방문 전 잔여 좌석 및 이용 시간 확인"
    ],
    "price": "23,500 원",
    "priceLabel": "일일 이용료",
    "ctaLabel": "빈 좌석 보기",
    "ctaHref": "/programs#day-pass-afternoon"
  }
];

export type Program = typeof programsData[number];
