// 장학금 데이터 - PPT와 /admission/scholarship 페이지에서 공유
export const scholarshipsData = [
  {
    title: '성적 우수 장학금',
    items: [
      { grade: '직전 수능 국/수/영 합 3등급', benefit: '수강료 50% 감면' },
      { grade: '직전 수능 국/수/영 합 4등급', benefit: '수강료 30% 감면', note: '(작년 6,9 평가원 합 3등급)' },
      { grade: '직전 수능 국/수/영 합 5등급', benefit: '수강료 20% 감면', note: '(작년 6,9 평가원 합 4등급)' },
    ],
  },
  {
    title: '특별 장학금',
    items: [
      { grade: '의대 출신 재도전', benefit: '수강료 전액 면제' },
      { grade: 'SN독학기숙학원 출신', benefit: '수강료 10% 감면' },
      { grade: '분당 베스티안 출신', benefit: '수강료 10% 감면' },
    ],
    note: '* 증빙 서류 필요',
  },
];

export interface ScholarshipItem {
  grade: string;
  benefit: string;
  note?: string;
}

export interface Scholarship {
  title: string;
  items: ScholarshipItem[];
  note?: string;
}

export const typedScholarshipsData: Scholarship[] = scholarshipsData;
