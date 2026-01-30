import { MetadataRoute } from 'next'
import { noticesData } from '@/lib/data/notices'
import { columns as columnsData } from '@/data/columns'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://daechi.snacademy.co.kr'

  // 정적 페이지 목록
  const staticPages = [
    '',
    '/about',
    '/about/philosophy',
    '/about/ai-center',
    '/about/team',
    '/programs',
    '/admission/scholarship',
    '/admission/visit',
    '/results',
    '/results/data',
    '/facility',
    '/campus',
    '/campus/schedule',
    '/campus/rules',
    '/campus/menu',
    '/campus/yearly',
    '/campus/transport',
    '/success-stories',
    '/testimonials',
    '/news',
    '/community',
    '/community/faq',
    '/community/notices',
    '/community/column',
  ]

  const currentDate = new Date().toISOString()

  // 정적 페이지 sitemap
  const staticSitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : route.includes('programs') ? 0.9 : 0.8,
  }))

  // 공지사항 동적 페이지
  const noticesSitemap = noticesData.map((notice) => ({
    url: `${baseUrl}/community/notices/${notice.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 칼럼 동적 페이지
  const columnsSitemap = columnsData.map((column) => ({
    url: `${baseUrl}/community/column/${column.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticSitemap, ...noticesSitemap, ...columnsSitemap]
}
