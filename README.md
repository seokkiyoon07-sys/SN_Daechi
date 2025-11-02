# SN독학재수학원 대치점 홈페이지

Next.js와 React로 제작된 SN독학재수학원 대치점 공식 홈페이지입니다.

## 기술 스택

- **Next.js 15** - React 프레임워크
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링

## 시작하기

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
SN-daechi/
├── app/              # Next.js App Router 파일들
│   ├── layout.tsx    # 루트 레이아웃
│   ├── page.tsx      # 메인 페이지
│   └── globals.css   # 전역 스타일
├── components/       # 재사용 가능한 컴포넌트
├── public/          # 정적 파일 (이미지, 폰트 등)
└── package.json     # 프로젝트 의존성
```

## 개발 가이드

페이지를 수정하려면 `app/page.tsx`를 편집하세요. 파일을 저장하면 자동으로 페이지가 업데이트됩니다.
