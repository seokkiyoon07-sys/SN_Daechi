'use client';

import Link from 'next/link';
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
          <div className="space-y-6">
            {columns.map((column) => (
              <Link
                key={column.id}
                href={`/community/column/${column.slug}`}
                className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-sn-green/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
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
                <p className="text-sm text-gray-600 leading-relaxed">
                  {column.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
