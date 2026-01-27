'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { columns } from "@/data/columns";

export default function ColumnPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Community</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              SN대치 칼럼
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              학습과 입시에 관한 인사이트를 공유합니다
            </p>
          </div>

          {/* 칼럼 목록 */}
          <div className="space-y-4">
            {[...columns].reverse().map((column) => (
              <Link
                key={column.id}
                href={`/community/column/${column.slug}`}
                className="block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:border-sn-green/30 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* 썸네일 */}
                  {column.thumbnail && (
                    <div className="relative w-full sm:w-48 h-40 sm:h-32 flex-shrink-0">
                      <Image
                        src={column.thumbnail}
                        alt={`${column.title} 썸네일`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* 내용 */}
                  <div className="flex-1 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-sn-green/10 text-sn-green">
                        {column.category}
                      </span>
                      <span className="text-xs text-gray-500">{column.date}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-xs text-gray-500">{column.author}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {column.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {column.excerpt}
                    </p>
                  </div>

                  {/* 화살표 */}
                  <div className="hidden sm:flex items-center pr-5">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
