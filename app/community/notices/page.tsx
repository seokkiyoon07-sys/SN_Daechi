'use client';

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { noticesData } from "@/lib/data/notices";

export default function NoticesPage() {
  const notices = noticesData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Community</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              공지사항
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SN 고요의숲 대치의 새로운 소식을 확인하세요
            </p>
          </div>

          {/* 공지사항 목록 */}
          <div className="space-y-4">
            {notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/community/notices/${notice.slug}`}
                className="block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-sn-green/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* 썸네일 */}
                  {notice.thumbnail && (
                    <div className="relative w-full sm:w-48 h-40 sm:h-32 flex-shrink-0">
                      <Image
                        src={notice.thumbnail}
                        alt={notice.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* 내용 */}
                  <div className="flex-1 p-5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        notice.isImportant
                          ? 'bg-sn-green text-white'
                          : notice.category === '일정'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                        {notice.category}
                      </span>
                      <span className="text-sm text-gray-500">{notice.date}</span>
                    </div>
                    <h2 className={`text-lg ${notice.isImportant ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {notice.title}
                    </h2>
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
