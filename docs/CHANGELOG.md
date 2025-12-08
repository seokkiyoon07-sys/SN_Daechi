# SN 대치 웹사이트 변경 사항

## 2024-12-08 업데이트

### 1. 색상 테마 시스템 구축

`tailwind.config.ts`에 SN 브랜드 색상 추가:

```typescript
colors: {
  'sn-bg': '#F3F7F3',        // 배경 (연한 녹색)
  'sn-bg-light': '#f8faf8',  // 밝은 배경
  'sn-bg-dark': '#e8ede8',   // 어두운 배경
  'sn-green': '#4a7c59',     // 메인 녹색
  'sn-green-light': '#5d9a6e', // 밝은 녹색
  'sn-green-dark': '#3d6649',  // 어두운 녹색
  'sn-main': '#2b422e',      // 메인 다크 녹색
}
```

### 2. About 페이지 - Cursor 스타일 디자인 적용

**파일**: `app/about/page.tsx`

#### 적용된 디자인 특징:

1. **밝은 테마 기반**
   - 배경: `bg-gray-50`
   - 카드: `bg-white`
   - 텍스트: `text-gray-900` (제목), `text-gray-600` (본문)

2. **Cursor 스타일 점선 테두리**
   - 카드: `border-2 border-dashed border-sn-green/30`
   - 구분선: `<hr className="border-t-2 border-dashed border-sn-green/30">`
   - hover 시: `hover:border-sn-green/60`

3. **SN 녹색 강조 색상**
   - 배지: `bg-sn-green text-white rounded-full`
   - 숫자 원형: `bg-sn-green text-white rounded-full`
   - Core Values: `border-l-4 border-sn-green`
   - 통계 숫자: `text-sn-green`

4. **섹션 구분**
   - 섹션 제목 앞 바: `w-1.5 h-6 bg-sn-green rounded-full`
   - 점선 구분선으로 각 섹션 분리

5. **호버 효과**
   - `hover:border-sn-green/60 hover:shadow-md transition-all`

### 3. Header 컴포넌트 업데이트

**파일**: `components/layout/Header.tsx`

- 호버 애니메이션: 파란색-보라색 그라데이션 언더라인
  ```tsx
  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
  ```

### 4. Hero 섹션 업데이트

**파일**: `components/sections/Hero.tsx`

- 시스템 카드 3개 (AI 시스템, 데이터 플랫폼, 생활관리 시스템)
- 클릭 가능한 항목들 (모달 팝업)
- 스크롤 페이드인 애니메이션
- 원장 소개 섹션
- 3열 특징 카드 (수학특화관, 의치약+SKY 멘토, SNarVIS+SNargo)

### 5. Programs 섹션 업데이트

**파일**: `components/sections/Programs.tsx`

- 탭 네비게이션 (AI 시스템, 데이터 플랫폼, 생활관리 시스템)
- 프로그램 카드 디자인
- 상담 신청 섹션 (전화, 카카오톡, 방문 상담)
- SN 녹색 테마 적용

### 6. 기타 컴포넌트 업데이트

모든 컴포넌트에 SN 녹색 테마 적용:

- **Results.tsx**: 통계 그리드, 대학 목록
- **News.tsx**: 뉴스 카드, 배지
- **Testimonials.tsx**: 후기 카드, CTA 섹션
- **Features.tsx**: 기능 카드, 아이콘
- **Footer.tsx**: 구분선

---

## 파일 구조

```
SN_Daechi/
├── app/
│   ├── about/
│   │   └── page.tsx          # About 페이지 (Cursor 스타일)
│   └── ...
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # 헤더 (그라데이션 호버)
│   │   └── Footer.tsx        # 푸터
│   └── sections/
│       ├── Hero.tsx          # 히어로 섹션
│       ├── Programs.tsx      # 프로그램 섹션
│       ├── Features.tsx      # 기능 섹션
│       ├── Results.tsx       # 합격 실적
│       ├── News.tsx          # 뉴스
│       └── Testimonials.tsx  # 후기
├── tailwind.config.ts        # 색상 테마 설정
└── docs/
    └── CHANGELOG.md          # 이 파일
```

---

## 디자인 가이드라인

### Cursor 스타일 요소

1. **점선 테두리**: `border-2 border-dashed border-sn-green/30`
2. **밝은 배경**: `bg-gray-50` 또는 `bg-white`
3. **녹색 강조**: `text-sn-green`, `bg-sn-green`
4. **호버 효과**: `hover:shadow-md`, `hover:border-sn-green/60`
5. **섹션 바**: `w-1.5 h-6 bg-sn-green rounded-full`

### 색상 사용 규칙

| 요소 | 색상 |
|------|------|
| 배경 | `bg-gray-50`, `bg-white` |
| 제목 | `text-gray-900` |
| 본문 | `text-gray-600`, `text-gray-700` |
| 강조 | `text-sn-green`, `bg-sn-green` |
| 테두리 | `border-sn-green/30`, `border-sn-main/20` |
