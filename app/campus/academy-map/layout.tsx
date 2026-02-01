import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "대치동 독학재수학원 가격 비교 | 독학관리학원 지도 - SN고요의숲",
  description: "대치동 독학재수학원, 대치 독학관리학원 가격 한눈에 비교! 대치동 독학재수 14곳, 시대인재 28관, 강남대성 3곳 위치와 월 비용 정보. 개발자가 시장조사하다 답답해서 직접 만들었습니다.",
  keywords: [
    // 최우선 키워드 (검색 타겟)
    "대치동 독학재수학원",
    "대치동 독학관리학원",
    "대치 독학재수학원",
    "대치 독학관리학원",
    // 핵심 키워드
    "대치동 재수학원",
    "대치동 재수학원 가격",
    "대치 재수학원 비교",
    "독학재수학원",
    "독학관리학원",
    "대치동 독학재수",
    "대치동 독학관리",
    "강남 독학재수학원",
    "강남 독학관리학원",
    // 지역 키워드
    "대치동 학원",
    "강남 재수학원",
    "대치역 학원",
    "선릉역 학원",
    // 브랜드 키워드
    "시대인재 가격",
    "시대인재 비용",
    "시대인재 월 비용",
    "강남대성 가격",
    "두각 학원",
    "SN고요의숲",
    // 롱테일 키워드
    "대치동 독학재수 가격",
    "대치동 독학관리 비용",
    "재수학원 가격 비교",
    "대치동 학원 지도",
    "시대인재 관 위치",
    "부엉이 라이브러리 가격",
    // 의도 기반 키워드
    "재수학원 어디가 좋을까",
    "대치동 재수학원 추천",
    "독학재수 vs 재종반",
    "2026 대치 재수학원",
  ],
  authors: [{ name: "SN고요의숲 대치" }],
  creator: "SN고요의숲",
  publisher: "SN고요의숲",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "article",
    locale: "ko_KR",
    url: "https://daechi.snacademy.co.kr/campus/academy-map",
    siteName: "SN고요의숲 대치",
    title: "대치 재수학원 가격 지도 | 45개 학원 위치/가격 비교",
    description: "대치동 재수학원 완전 정복! 독학관리부터 시대인재, 강남대성까지. 가격, 위치, 특징 한눈에 비교하세요.",
    images: [
      {
        url: "/image/thumbnail/academy-map-og.png",
        width: 1200,
        height: 630,
        alt: "대치 재수학원 가격 지도 - SN고요의숲",
      },
    ],
    publishedTime: "2026-02-01T00:00:00.000Z",
    modifiedTime: new Date().toISOString(),
    authors: ["SN고요의숲"],
    tags: ["대치동", "재수학원", "독학재수", "시대인재", "강남대성", "학원비교"],
  },
  twitter: {
    card: "summary_large_image",
    title: "대치 재수학원 가격 지도 | 45개 학원 비교",
    description: "대치동 재수학원 가격/위치 완전 정복! 독학관리, 시대인재, 강남대성 한눈에.",
    images: ["/image/thumbnail/academy-map-og.png"],
    creator: "@snacademy",
  },
  alternates: {
    canonical: "https://daechi.snacademy.co.kr/campus/academy-map",
  },
  other: {
    // GEO 메타태그
    "geo.region": "KR-11",
    "geo.placename": "서울특별시 강남구 대치동",
    "geo.position": "37.496898;127.061648",
    "ICBM": "37.496898, 127.061648",
    // 추가 메타
    "article:section": "교육",
    "article:tag": "대치동 재수학원, 독학재수, 시대인재, 강남대성",
  },
};

// JSON-LD 구조화 데이터
function AcademyMapJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 메인 페이지 (Article)
      {
        "@type": "Article",
        "@id": "https://daechi.snacademy.co.kr/campus/academy-map#article",
        "headline": "대치 재수학원 가격 지도 - 45개 학원 위치/가격 비교",
        "description": "대치동 재수학원 가격 한눈에 비교! 독학관리, 독학재수, 시대인재, 강남대성 등 45개 학원 정보",
        "datePublished": "2026-02-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "author": {
          "@type": "Organization",
          "name": "SN고요의숲",
          "url": "https://daechi.snacademy.co.kr"
        },
        "publisher": {
          "@type": "Organization",
          "name": "SN고요의숲",
          "logo": {
            "@type": "ImageObject",
            "url": "https://daechi.snacademy.co.kr/image/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://daechi.snacademy.co.kr/campus/academy-map"
        },
        "image": "https://daechi.snacademy.co.kr/image/thumbnail/academy-map-og.png",
        "articleSection": "교육",
        "keywords": "대치동 재수학원, 독학재수, 독학관리, 시대인재, 강남대성, 학원비교, 가격"
      },
      // 지도 (Map)
      {
        "@type": "Map",
        "@id": "https://daechi.snacademy.co.kr/campus/academy-map#map",
        "name": "대치동 재수학원 가격 지도",
        "description": "대치동 주변 45개 재수학원의 위치와 가격을 표시한 인터랙티브 지도",
        "mapType": "https://schema.org/VenueMap",
        "about": {
          "@type": "Place",
          "name": "대치동",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 37.496898,
            "longitude": 127.061648
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "서울특별시",
            "addressRegion": "강남구",
            "addressCountry": "KR",
            "streetAddress": "대치동"
          }
        }
      },
      // 비교 표 (Table/ItemList)
      {
        "@type": "ItemList",
        "@id": "https://daechi.snacademy.co.kr/campus/academy-map#academy-list",
        "name": "대치동 재수학원 목록",
        "description": "대치동 소재 독학관리, 독학재수, 시대인재, 강남대성 학원 목록",
        "numberOfItems": 45,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "EducationalOrganization",
              "name": "SN고요의숲",
              "description": "AI 기반 독학관리 프리미엄 학원",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "대치동 447",
                "addressLocality": "서울특별시 강남구",
                "addressCountry": "KR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 37.496898,
                "longitude": 127.061648
              },
              "priceRange": "80만원/월"
            }
          }
        ]
      },
      // FAQ
      {
        "@type": "FAQPage",
        "@id": "https://daechi.snacademy.co.kr/campus/academy-map#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "대치동 재수학원 월 비용은 얼마인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "독학관리/독학재수 학원은 월 60~130만원, 시대인재 재수종합반은 월 280~350만원(급식, 라이브러리 포함), 시대인재 단과는 과목당 월 25~35만원입니다."
            }
          },
          {
            "@type": "Question",
            "name": "시대인재 관은 몇 개인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "대치동에 시대인재 관은 약 28개가 있으며, 본관(동선빌딩), 수학스쿨, 신관(카이로스), W관, N관, H관 등 용도별로 나뉘어 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "대치동 독학재수 학원 추천해주세요",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "대치동 독학재수/독학관리 학원으로는 SN고요의숲(AI특화, 80만원), 수능선배(79만원), 이투스247(70~85만원), 메이드존(65만원) 등이 있습니다. 각 학원별 특징과 가격을 비교해보시기 바랍니다."
            }
          }
        ]
      },
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "홈",
            "item": "https://daechi.snacademy.co.kr"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "학원생활",
            "item": "https://daechi.snacademy.co.kr/campus"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "대치 재수학원 가격 지도",
            "item": "https://daechi.snacademy.co.kr/campus/academy-map"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function AcademyMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AcademyMapJsonLd />
      {children}
    </>
  );
}
