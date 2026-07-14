export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: '대치 고요의 숲',
    alternateName: ['SN대치', 'SN-고요의숲 대치', '고요의숲 AI특화관'],
    url: 'https://daechi.snacademy.co.kr',
    logo: 'https://daechi.snacademy.co.kr/image/SN_logo_green.svg',
    description: '대치동 최초 AI 기반 독학관리 시스템. 학습의 전 과정을 AI 시스템으로 통합(Full-Stack)한 곳은 오직 SN뿐입니다. SNarGPT, SNarGen, SNarVIS로 초개인화된 관리를 제공합니다.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '대치동 447',
      addressLocality: '강남구',
      addressRegion: '서울특별시',
      postalCode: '06288',
      addressCountry: 'KR',
    },
    telephone: '+82-2-557-0301',
    areaServed: {
      '@type': 'City',
      name: '서울',
    },
    sameAs: [
      'https://pf.kakao.com/_xelXhX',
    ],
    knowsAbout: ['AI 학습 관리', '독학재수', '수능 준비', '오답 분석', '개인 맞춤 학습'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '독학관리 프로그램',
      itemListElement: [
        {
          '@type': 'Course',
          name: '독학재수반',
          description: 'AI 기반 개인 맞춤 독학관리 프로그램',
          provider: {
            '@type': 'EducationalOrganization',
            name: '대치 고요의 숲',
          },
        },
        {
          '@type': 'Course',
          name: '현역반',
          description: '현역 학생을 위한 AI 독학관리 프로그램',
          provider: {
            '@type': 'EducationalOrganization',
            name: '대치 고요의 숲',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://daechi.snacademy.co.kr/#localbusiness',
    name: '대치 고요의 숲',
    alternateName: 'SN-고요의숲 대치 AI특화관',
    image: 'https://daechi.snacademy.co.kr/image/thumbnail/daechi_goyuuiseup.png',
    url: 'https://daechi.snacademy.co.kr',
    telephone: '+82-2-557-0301',
    priceRange: '₩₩₩',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '대치동 447',
      addressLocality: '강남구',
      addressRegion: '서울특별시',
      postalCode: '06288',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.497030,
      longitude: 127.061380,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '24:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '대치 고요의 숲',
    url: 'https://daechi.snacademy.co.kr',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://daechi.snacademy.co.kr/community?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
