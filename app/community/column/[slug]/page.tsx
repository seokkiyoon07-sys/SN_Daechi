import { Metadata } from 'next';
import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { columns } from "@/data/columns";
import ColumnDetailClient from './ColumnDetailClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const column = columns.find(c => c.slug === slug);

  if (!column) {
    return {
      title: '칼럼을 찾을 수 없습니다',
    };
  }

  const ogImage = column.ogImage || column.thumbnail || '/image/OGimage.png';

  return {
    title: `${column.title} | 대치 고요의 숲`,
    description: column.excerpt,
    openGraph: {
      title: column.title,
      description: column.excerpt,
      type: 'article',
      publishedTime: column.date,
      authors: [column.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: column.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: column.title,
      description: column.excerpt,
      images: [ogImage],
    },
  };
}

export default async function ColumnDetailPage({ params }: Props) {
  const { slug } = await params;
  const column = columns.find(c => c.slug === slug);

  if (!column) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">칼럼을 찾을 수 없습니다</h1>
            <Link href="/community/column" className="text-sn-green hover:underline">
              목록으로 돌아가기
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return <ColumnDetailClient column={column} />;
}
