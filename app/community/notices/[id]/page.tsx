'use client';

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { noticesData } from "@/lib/data/notices";

export default function NoticeDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const notice = noticesData.find(n => n.id === id);

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
            className="inline-flex items-center gap-2 text-gray-600 hover:text-sn-green transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  alt={notice.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* 헤더 */}
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  notice.isImportant
                    ? 'bg-sn-green text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {notice.category}
                </span>
                <span className="text-sm text-gray-500">{notice.date}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {notice.title}
              </h1>
            </div>

            {/* 본문 */}
            <div className="p-6 md:p-8">
              <div className="prose prose-gray max-w-none">
                {notice.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed mb-6 last:mb-0 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>

          {/* 목록으로 버튼 */}
          <div className="mt-8 text-center">
            <Link
              href="/community/notices"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
