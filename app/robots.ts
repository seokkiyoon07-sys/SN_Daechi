import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://daechi.snacademy.co.kr'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/internal/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
