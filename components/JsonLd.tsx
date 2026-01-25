export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: '대치 고요의 숲',
    alternateName: 'SN대치',
    url: 'https://daechi.snacademy.co.kr',
    logo: 'https://daechi.snacademy.co.kr/image/SN_logo_green.svg',
    description: '대치동 최초 AI 기반 독학관리 시스템. 몰입 환경, 개인 맞춤 학습 리포트, SNarGPT로 성적을 설계합니다.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '대치동',
      addressLocality: '강남구',
      addressRegion: '서울특별시',
      addressCountry: 'KR',
    },
    areaServed: {
      '@type': 'City',
      name: '서울',
    },
    sameAs: [],
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
    image: 'https://daechi.snacademy.co.kr/image/OGimage.png',
    url: 'https://daechi.snacademy.co.kr',
    priceRange: '₩₩₩',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '대치동',
      addressLocality: '강남구',
      addressRegion: '서울특별시',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.4946,
      longitude: 127.0596,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '23:00',
      },
    ],
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
