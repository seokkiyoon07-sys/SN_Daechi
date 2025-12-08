# SEO 최적화 가이드

## 📊 현재 SEO 상태

### ✅ 적용 완료
- **메타 태그**: title, description, keywords
- **Open Graph**: Facebook/카카오톡 공유 최적화
- **Twitter Card**: 트위터 공유 최적화
- **Viewport 설정**: 반응형 디자인 지원
- **robots.txt 설정**: 검색 엔진 크롤링 허용
- **언어 설정**: `lang="ko"` 명시
- **시맨틱 HTML**: header, main, footer, section 사용

### ⏳ 추가 작업 필요
- [ ] OG 이미지 생성 (`/public/og-image.png`)
- [ ] Sitemap 생성
- [ ] robots.txt 파일 추가
- [ ] 구조화된 데이터 (JSON-LD)
- [ ] Google Search Console 연동
- [ ] Naver Webmaster Tools 연동
- [ ] 성능 최적화 (Core Web Vitals)

---

## 🎯 주요 키워드 전략

### 1차 키워드 (Primary)
- 독학재수학원
- 대치동 학원
- AI 학습
- 수능 AI

### 2차 키워드 (Secondary)
- SNarGPT
- SNarVIS
- SNarGEN
- 성적 분석
- 오답 관리
- 독학관리

### 3차 키워드 (Long-tail)
- 대치동 독학재수학원
- AI 기반 학습 관리
- 수능 문제 AI
- 실시간 성적 분석 시스템

---

## 📝 페이지별 메타 데이터

### 메인 페이지 (`/`)
```typescript
title: "SN-고요의숲 대치 | AI 기반 독학관리 학원"
description: "SNarGPT, SNarVIS, SNarGEN 등 최첨단 AI 시스템으로 수능 학습을 완벽하게 관리하는 대치동 독학재수학원. 데이터 기반 성적 분석, 오답 관리, 12시간 집중 학습 시스템을 제공합니다."
```

### 프로그램 페이지 (`/programs`)
```typescript
title: "프로그램 소개 | SN-고요의숲 대치"
description: "SNarGPT 수능 전문 AI, SNarVIS 학습 비서, SNarGEN 문제 생성 AI, SNarlink 학습량 측정, 성적/오답 분석 시스템 등 AI 기반 독학관리 프로그램을 소개합니다."
```

### 학원 소개 (`/about`)
```typescript
title: "학원 소개 | SN-고요의숲 대치"
description: "대치동 신축 캠퍼스에서 AI 기반 독학관리 시스템으로 최상의 수능 학습 환경을 제공하는 SN-고요의숲 대치를 소개합니다."
```

### 입시 결과 (`/results`)
```typescript
title: "입시 결과 | SN-고요의숲 대치"
description: "SN-고요의숲 대치의 우수한 대학 입시 결과를 확인하세요. 데이터 기반 학습 관리로 검증된 성과를 보여드립니다."
```

---

## 🖼️ Open Graph 이미지 생성

### 요구사항
- **크기**: 1200 x 630px
- **포맷**: PNG 또는 JPG
- **파일명**: `og-image.png`
- **위치**: `/public/og-image.png`

### 디자인 가이드
```
┌─────────────────────────────────────────┐
│                                         │
│    SN-고요의숲 대치                      │
│    AI 기반 독학관리 학원                 │
│                                         │
│    🤖 SNarGPT | 📊 SNarVIS | 🎯 SNarGEN │
│                                         │
│    수능 학습, AI가 완벽하게 관리합니다   │
│                                         │
└─────────────────────────────────────────┘
```

### 제작 도구
- Canva (https://canva.com)
- Figma (https://figma.com)
- Photoshop

---

## 🗺️ Sitemap 생성

Next.js 15 App Router에서 sitemap 자동 생성:

### 파일 생성: `app/sitemap.ts`
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sn-daechi.vercel.app'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/results`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
  ]
}
```

---

## 🤖 robots.txt 생성

### 파일 생성: `app/robots.ts`
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://sn-daechi.vercel.app/sitemap.xml',
  }
}
```

---

## 📊 구조화된 데이터 (JSON-LD)

### Organization Schema
`app/layout.tsx`의 body 태그 안에 추가:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "SN-고요의숲 대치",
      "description": "AI 기반 독학관리 학원",
      "url": "https://sn-daechi.vercel.app",
      "logo": "https://sn-daechi.vercel.app/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "서울",
        "addressRegion": "강남구",
        "streetAddress": "대치동",
        "addressCountry": "KR"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+82-XX-XXXX-XXXX",
        "contactType": "고객 문의"
      },
      "sameAs": [
        // 소셜 미디어 URL들
      ]
    })
  }}
/>
```

### Course Schema (Programs 페이지)
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "SNarGPT AI 학습 프로그램",
  "description": "수능 전문 생성형 AI로 수학 문제 정답률 99.9%",
  "provider": {
    "@type": "Organization",
    "name": "SN-고요의숲 대치"
  }
}
```

---

## 🔍 검색 엔진 등록

### Google Search Console
1. https://search.google.com/search-console 접속
2. 속성 추가: `https://sn-daechi.vercel.app`
3. 소유권 확인:
   - HTML 태그 방식 권장
   - `layout.tsx`의 `metadata.verification.google`에 코드 입력
4. Sitemap 제출: `https://sn-daechi.vercel.app/sitemap.xml`

### Naver Webmaster Tools
1. https://searchadvisor.naver.com 접속
2. 사이트 등록
3. 소유 확인:
   - HTML 태그 방식
   - `layout.tsx`의 `metadata.verification.other["naver-site-verification"]`에 코드 입력
4. Sitemap 제출

---

## ⚡ Core Web Vitals 최적화

### LCP (Largest Contentful Paint) < 2.5s
- [ ] `<img>` → `<Image>` 변환
- [ ] 폰트 최적화 (next/font)
- [ ] 이미지 lazy loading

### FID (First Input Delay) < 100ms
- [ ] JavaScript 번들 크기 감소
- [ ] 동적 import 활용
- [ ] 불필요한 third-party 스크립트 제거

### CLS (Cumulative Layout Shift) < 0.1
- [ ] 이미지/비디오에 width, height 명시
- [ ] 폰트 로딩 최적화
- [ ] 광고/임베드 컨텐츠 공간 예약

---

## 📱 모바일 최적화

### 현재 상태
- ✅ 반응형 디자인 (Tailwind CSS)
- ✅ Viewport 메타 태그
- ✅ 터치 친화적 버튼 크기

### 개선 사항
- [ ] 모바일 네비게이션 최적화
- [ ] 터치 제스처 지원 확장
- [ ] 모바일 성능 측정 (Lighthouse Mobile)

---

## 🔗 내부 링크 전략

### 주요 페이지 간 링크
```
Home (/)
  ├── Programs (/programs)
  ├── About (/about)
  ├── Results (/results)
  ├── Testimonials (/testimonials)
  └── News (/news)
```

### 앵커 텍스트 가이드
- ❌ "여기를 클릭하세요"
- ✅ "SNarGPT AI 프로그램 자세히 보기"
- ✅ "성적 분석 시스템 소개"

---

## 📈 성능 모니터링 도구

### 필수 도구
1. **Google Analytics 4**
   - 방문자 통계
   - 사용자 행동 분석
   - 전환율 추적

2. **Google Search Console**
   - 검색 노출 수
   - 클릭률 (CTR)
   - 검색 쿼리 분석

3. **Lighthouse**
   - 성능 점수
   - SEO 점수
   - 접근성 점수
   ```bash
   npm install -g lighthouse
   lighthouse https://sn-daechi.vercel.app
   ```

4. **PageSpeed Insights**
   - https://pagespeed.web.dev
   - 모바일/데스크톱 성능 분석

---

## ✅ SEO 체크리스트

### 기본 SEO
- [x] 페이지별 고유한 title 태그
- [x] 명확한 description 메타 태그
- [x] 적절한 keywords 설정
- [x] Open Graph 태그
- [x] Twitter Card 태그
- [x] Canonical URL 설정
- [ ] Sitemap 생성
- [ ] robots.txt 생성

### 기술적 SEO
- [x] 시맨틱 HTML 사용
- [x] 모바일 반응형
- [x] HTTPS 사용 (Vercel 기본)
- [ ] 페이지 로딩 속도 최적화
- [ ] 이미지 최적화
- [ ] 구조화된 데이터

### 콘텐츠 SEO
- [x] 명확한 H1-H6 계층 구조
- [x] 키워드 자연스럽게 배치
- [x] 읽기 쉬운 문장 구조
- [ ] 정기적인 콘텐츠 업데이트
- [ ] 내부 링크 최적화

### 검색 엔진 등록
- [ ] Google Search Console
- [ ] Naver Webmaster Tools
- [ ] Bing Webmaster Tools
- [ ] Daum 검색 등록

---

## 🎯 우선순위 작업

### 1순위 (즉시)
1. OG 이미지 생성 및 업로드
2. Sitemap 생성 (`app/sitemap.ts`)
3. robots.txt 생성 (`app/robots.ts`)

### 2순위 (1주일 내)
1. Google Search Console 등록
2. Naver Webmaster Tools 등록
3. 구조화된 데이터 추가

### 3순위 (1개월 내)
1. 이미지 최적화 (`<Image>` 변환)
2. Core Web Vitals 개선
3. Google Analytics 설정

---

## 📚 참고 자료

- [Next.js SEO 공식 문서](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Naver 검색 등록 가이드](https://searchadvisor.naver.com/guide)
- [Schema.org](https://schema.org/)
- [Web.dev Core Web Vitals](https://web.dev/vitals/)

---

## 📊 예상 효과

### 단기 (1-3개월)
- 검색 엔진 인덱싱 완료
- 브랜드 키워드 (SN고요의숲, SNarGPT) 검색 시 상위 노출
- 소셜 미디어 공유 시 프리뷰 정상 표시

### 중기 (3-6개월)
- 주요 키워드 (독학재수학원, 대치동 학원) 검색 순위 향상
- 자연 유입 트래픽 증가
- 방문자 체류 시간 증가

### 장기 (6-12개월)
- 롱테일 키워드 다양화
- 도메인 권위도 향상
- 지속적인 자연 유입 확보
