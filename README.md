# SN-고요의숲 대치 홈페이지

> AI 기반 독학관리 학원의 공식 웹사이트

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)](https://tailwindcss.com/)

## 📋 프로젝트 소개

SN-고요의숲 대치는 AI 기술을 활용한 혁신적인 독학관리 학원입니다. 이 웹사이트는 학원의 AI 시스템, 데이터 기반 학습 관리, 시설 정보를 소개하는 공식 홈페이지입니다.

### 주요 특징

- 🤖 **AI 시스템 통합**: SNarGPT, SNarVIS, SNarGEN 소개 및 시연
- 📊 **데이터 기반 학습 관리**: 실시간 성적 분석 및 오답 관리
- 🏫 **스마트 캠퍼스**: 대치·양평 두 캠퍼스 정보 및 지도 연동
- 🎨 **모던한 UI/UX**: 반응형 디자인 및 인터랙티브 요소
- ⚡ **고성능**: Next.js 15 기반 최적화

---

## 🚀 기술 스택

### 프레임워크 & 라이브러리
- **Next.js 15** - React 프레임워크 (App Router)
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 스타일링

### 수학 수식 렌더링
- **KaTeX** (^0.16.25) - 수학 수식 렌더링
- **react-katex** (^3.1.0) - React KaTeX 컴포넌트

### 개발 도구
- **ESLint** - 코드 품질 관리
- **PostCSS** - CSS 처리
- **Autoprefixer** - CSS 벤더 프리픽스 자동 추가

---

## 📁 프로젝트 구조

```
SN-daechi/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃 (메타데이터)
│   ├── page.tsx             # 메인 페이지
│   ├── programs/            # 프로그램 소개
│   ├── about/               # 학원 소개
│   ├── results/             # 입시 결과
│   ├── testimonials/        # 학생 후기
│   ├── news/                # 공지사항
│   └── globals.css          # 전역 스타일
│
├── components/              # 재사용 가능한 컴포넌트
│   ├── layout/
│   │   ├── Header.tsx       # 네비게이션 헤더
│   │   └── Footer.tsx       # 푸터
│   └── sections/
│       ├── Hero.tsx         # 히어로 섹션
│       ├── Programs.tsx     # 프로그램 섹션 (메인)
│       └── ...
│
├── public/                  # 정적 파일
│   └── image/
│       ├── snargpt/        # SNarGPT 관련 이미지
│       └── ...
│
├── docs/                    # 문서
│   └── CHANGELOG-*.md      # 작업 일지
│
├── package.json            # 프로젝트 의존성
├── tsconfig.json           # TypeScript 설정
├── tailwind.config.ts      # Tailwind CSS 설정
└── next.config.ts          # Next.js 설정
```

---

## 🎯 주요 페이지 및 기능

### 1. 메인 페이지 (`/`)
- 히어로 섹션
- 핵심 가치 소개
- CTA (Call-to-Action)

### 2. 프로그램 페이지 (`/programs`)
가장 핵심적인 페이지로, 3개의 주요 탭으로 구성:

#### AI 시스템 탭
- **SNarGPT 시연**
  - 맥북 브라우저 스타일 UI
  - 4가지 시연 모드: 문제 질문, 문제 검색, 정보 검색, 학원생활
  - 실제 수능 문제 풀이 예시 (KaTeX 수식 렌더링)
  - 대수적/그래프 기반 두 가지 풀이법 제공

- **AI 시스템 소개**
  - SNarGPT: 수능 전문 생성형 AI (정답률 99.9%)
  - SNarVIS: 학습 AI 비서 (일정, 오답, 성적 분석)
  - SNarGEN: 평가원급 문제 생성 AI (출시 예정)

- **FAQ 섹션**
  - SNarGPT vs ChatGPT 비교
  - 기술 아키텍처 차이
  - 데이터 파이프라인 설명

#### 데이터 시스템 탭
- **SNarlink**: 방화벽 + 온라인 학습량 측정 AI
  - 이미지 슬라이더 (좌우 네비게이션)

- **성적/오답데이터**
  - SNarOCR 이미지 확대 기능
  - 상세 분석 모달:
    - 전체 통계 (250명, 평균 88.5점)
    - 문항별 오답률 (1-30번, 색상 코딩)
    - 상위 난이도 문제
    - 과목별 통계 및 점수 분포
  - 개인 성적표 모달:
    - 학생 정보 및 성적 상세
    - 과목별 오답 번호

- **문제 데이터 & 입시 데이터**

#### 관리 시스템 탭
- **캠퍼스 선택**: 대치/양평 선택형 카드
- **네이버 지도 연동**: 선택 시 지도 동적 변경
- **시스템 소개**:
  - 12시간 집중 학습 관리
  - 신축 캠퍼스 시설
  - 대치역 도보 3분 접근성

### 3. 기타 페이지
- `/about` - 학원 소개
- `/results` - 입시 결과
- `/testimonials` - 학생 후기
- `/news` - 공지사항

---

## 🛠️ 개발 가이드

### 설치

```bash
# 저장소 클론
git clone https://github.com/seokkiyoon07-sys/SN_Daechi.git
cd SN-daechi

# 의존성 설치
npm install

# 환경 변수 설정 (네이버 CAPTCHA)
cp .env.local.example .env.local
# .env.local 파일을 열어 네이버 CAPTCHA API 키를 입력하세요
```

**네이버 CAPTCHA 설정**: 원서접수 및 상담 신청 폼에 부정클릭 방지를 위한 네이버 CAPTCHA가 적용되어 있습니다. 설정 방법은 [NAVER_CAPTCHA_SETUP.md](./docs/NAVER_CAPTCHA_SETUP.md)를 참고하세요.

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 빌드 결과 실행
npm start
```

### 린팅

```bash
npm run lint
```

---

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Blue (AI 시스템)
- **Secondary**: Purple (데이터 시스템)
- **Accent**: Green (성과/긍정)
- **Neutral**: Gray scale

### 타이포그래피
- **헤딩**: Bold, 큰 크기
- **본문**: Regular, 적절한 line-height
- **강조**: Semibold, 색상 변경

### 컴포넌트
- **모달**: 다층 구조 지원 (z-index 관리)
- **카드**: 호버 효과, 그림자
- **버튼**: 그라디언트, 트랜지션
- **탭**: 언더라인 인디케이터

---

## 📊 상태 관리

현재 프로젝트는 복잡한 상태 관리 라이브러리 없이 React의 `useState` 훅을 사용합니다.

### Programs 컴포넌트 주요 상태
```typescript
const [activeTab, setActiveTab] = useState<'ai' | 'data' | 'management'>('ai')
const [snargptView, setSnargptView] = useState<'question' | 'search' | 'info' | 'school'>('question')
const [currentSampleIndex, setCurrentSampleIndex] = useState(0)
const [dataView, setDataView] = useState<'snarlink' | 'wrong' | 'admission'>('snarlink')
const [isImageModalOpen, setIsImageModalOpen] = useState(false)
const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false)
const [isDetailedAnalysisOpen, setIsDetailedAnalysisOpen] = useState(false)
const [selectedLocation, setSelectedLocation] = useState<'daechi' | 'yangpyeong'>('daechi')
```

---

## 🚀 배포

### Vercel (권장)

```bash
# Vercel CLI 설치 (한 번만)
npm i -g vercel

# 프로덕션 배포
vercel --prod

# 강제 재배포 (캐시 클리어)
vercel --prod --force
```

### GitHub 연동
- GitHub에 푸시하면 Vercel이 자동으로 배포
- PR 생성 시 프리뷰 배포 자동 생성

---

## 📈 성능 최적화

### 현재 적용된 최적화
- ✅ Next.js App Router (서버 컴포넌트)
- ✅ 코드 스플리팅 (자동)
- ✅ 최적화된 폰트 로딩
- ✅ 반응형 이미지

### 향후 개선 사항
- [ ] `<img>` → `<Image>` 변환 (Next.js Image 최적화)
- [ ] 이미지 lazy loading
- [ ] 동적 import로 번들 크기 감소
- [ ] ISR (Incremental Static Regeneration) 적용

---

## ♿ 접근성

### 현재 적용
- Semantic HTML 사용
- 한국어 lang 속성
- 키보드 네비게이션 지원

### 개선 예정
- ARIA 레이블 확장
- 스크린 리더 최적화
- 색상 대비 향상

---

## 🧪 테스팅

향후 추가 예정:
- Unit Tests (Jest)
- Integration Tests (React Testing Library)
- E2E Tests (Playwright)

---

## 📝 개발 워크플로우

### 브랜치 전략
- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치 (향후 추가 예정)
- `feature/*`: 기능 개발 브랜치

### 커밋 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드, 설정 파일 수정
```

---

## 📚 문서

- [작업 일지](./docs/CHANGELOG-2025-11-05.md) - 2025년 11월 5일 작업 내용
- [Next.js 문서](https://nextjs.org/docs)
- [React 문서](https://react.dev/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

---

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

This project is private and proprietary.

---

## 👥 팀

- **Product Owner**: SN-고요의숲 대치
- **Development**: Claude Code (AI Assistant)
- **QA**: Product Owner

---

## 📞 문의

- 웹사이트: [배포 URL]
- 이메일: [문의 이메일]
- GitHub: [seokkiyoon07-sys/SN_Daechi](https://github.com/seokkiyoon07-sys/SN_Daechi)

---

## 🎉 최근 업데이트

### 2025-11-05
- ✨ Programs 페이지 대규모 리뉴얼
- 🤖 SNarGPT 시연 인터페이스 추가
- 📊 상세 분석 모달 및 개인 성적표 구현
- 🗺️ 대치/양평 캠퍼스 선택 및 지도 연동
- ❓ FAQ 섹션 추가 (SNarGPT vs ChatGPT)
- 🐛 ESLint 오류 수정 및 배포 최적화

자세한 내용은 [CHANGELOG](./docs/CHANGELOG-2025-11-05.md)를 참조하세요.
