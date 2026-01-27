'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { columns } from "@/data/columns";

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

export default function ColumnDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const column = columns.find(c => c.slug === slug);
  const [showImageModal, setShowImageModal] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 뒤로가기 */}
          <Link
            href="/community/column"
            className="inline-flex items-center text-sm text-gray-500 hover:text-sn-green mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로
          </Link>

          {/* 칼럼 헤더 */}
          <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* 썸네일 이미지 */}
            {column.thumbnail && (
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={column.thumbnail}
                  alt={`${column.title} 대표 이미지`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-sn-green/10 text-sn-green">
                {column.category}
              </span>
              <span className="text-sm text-gray-500">{column.date}</span>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-gray-500">{column.author}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              {column.title}
            </h1>

            {/* 저자 프로필 이미지 */}
            {column.authorImage && (
              <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                <button
                  onClick={() => setShowImageModal(true)}
                  className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-sn-green transition-all"
                >
                  <Image
                    src={column.authorImage}
                    alt={`${column.author} 프로필`}
                    fill
                    className="object-cover"
                  />
                </button>
                <div>
                  <p className="font-semibold text-gray-900">{column.author}</p>
                  <p className="text-sm text-gray-500">고요의 숲 총 원장</p>
                </div>
              </div>
            )}

            {/* 이미지 모달 */}
            {showImageModal && column.authorImage && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                onClick={() => setShowImageModal(false)}
              >
                <div className="relative max-w-lg w-full mx-4">
                  <button
                    onClick={() => setShowImageModal(false)}
                    className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <Image
                    src={column.authorImage}
                    alt={`${column.author} 프로필`}
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-xl"
                  />
                  <p className="text-center text-white mt-4 text-lg font-medium">{column.author}</p>
                </div>
              </div>
            )}

            {/* 칼럼 본문 */}
            <div className="prose prose-lg max-w-none">
              {column.content.split('\n\n').map((paragraph, index) => {
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

            {/* 원문 보기 버튼 */}
            {column.externalUrl && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <a
                  href={column.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-sn-green text-white font-medium rounded-lg hover:bg-sn-green/90 transition-colors"
                >
                  원문 보기
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
