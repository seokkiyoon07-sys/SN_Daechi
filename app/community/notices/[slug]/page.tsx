'use client';

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { noticesData } from "@/lib/data/notices";

// 텍스트 포맷팅 처리 (볼드, 하이라이트)
function formatText(text: string) {
  const parts = text.split(/(==.*?==|\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('==') && part.endsWith('==')) {
      return <mark key={i} className="bg-yellow-100 px-1 rounded">{part.slice(2, -2)}</mark>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function NoticeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const notice = noticesData.find(n => n.slug === slug);

  if (!notice) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 뒤로가기 */}
          <Link
            href="/community/notices"
            className="inline-flex items-center text-sm text-gray-500 hover:text-sn-green mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로
          </Link>

          {/* 게시글 */}
          <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* 이미지 */}
            {notice.image && (
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={notice.image}
                  alt={`${notice.title} 대표 이미지`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  notice.isImportant
                    ? 'bg-sn-green text-white'
                    : 'bg-sn-green/10 text-sn-green'
                }`}>
                  {notice.category}
                </span>
                <span className="text-sm text-gray-500">{notice.date}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                {notice.title}
              </h1>

              {/* 본문 */}
              <div className="prose prose-lg max-w-none">
                {notice.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-4">
                        {formatText(paragraph.replace('## ', ''))}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <p key={index} className="font-semibold text-gray-900 my-4">
                        {formatText(paragraph.replace(/\*\*/g, ''))}
                      </p>
                    );
                  }
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed my-4 whitespace-pre-line">
                      {formatText(paragraph)}
                    </p>
                  );
                })}
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
