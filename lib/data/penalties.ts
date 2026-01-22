// 벌점 데이터 - PPT와 /campus/rules 페이지에서 공유
export const penaltiesData = [
  { category: '결석', unauthorized: 10, excused: 5 },
  { category: '조퇴', unauthorized: 5, excused: 3 },
  { category: '지각', unauthorized: 5, excused: 3 },
  { category: '외출', unauthorized: 3, excused: 1 },
  { category: '수면', unauthorized: 3, excused: '-' },
  { category: '졸음', unauthorized: 1, excused: '-' },
  { category: '핸드폰 미제출', unauthorized: 10, excused: '-' },
  { category: '교직원의 정당한 지시 불이행', unauthorized: 10, excused: '-' },
];

export type Penalty = (typeof penaltiesData)[number];
