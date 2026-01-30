import { Metadata } from 'next';
import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { noticesData } from "@/lib/data/notices";
import NoticeDetailClient from './NoticeDetailClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const notice = noticesData.find(n => n.slug === slug);

  if (!notice) {
    return {
      title: '공지사항을 찾을 수 없습니다',
    };
  }

  const canonicalUrl = `https://daechi.snacademy.co.kr/community/notices/${slug}`;
  const ogImage = notice.thumbnail || notice.image || '/image/thumbnail/daechi_goyuuiseup.png';

  return {
    title: `${notice.title} | 대치 고요의 숲`,
    description: notice.content.substring(0, 160).replace(/[#*=\n]/g, '').trim(),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: notice.title,
      description: notice.content.substring(0, 160).replace(/[#*=\n]/g, '').trim(),
      type: 'article',
      url: canonicalUrl,
      publishedTime: notice.date,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: notice.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: notice.title,
      description: notice.content.substring(0, 160).replace(/[#*=\n]/g, '').trim(),
      images: [ogImage],
    },
  };
}

export default async function NoticeDetailPage({ params }: Props) {
  const { slug } = await params;
  const notice = noticesData.find(n => n.slug === slug);

  if (!notice) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">공지사항을 찾을 수 없습니다</h1>
            <Link href="/community/notices" className="text-sn-green hover:underline">
              목록으로 돌아가기
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return <NoticeDetailClient notice={notice} />;
}
