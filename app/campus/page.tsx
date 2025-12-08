'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function CampusPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const campusMenus = [
    {
      title: "생활관리",
      description: "학습에 집중할 수 있는 환경을 위한 체계적인 생활 관리",
      href: "/campus/rules",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "학습시간표",
      description: "하루 12시간 이상 집중 학습이 가능한 체계적인 시간표",
      href: "/campus/schedule",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "학사일정",
      description: "연간 주요 일정 및 학사 계획",
      href: "/campus/yearly",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "도시락 메뉴",
      description: "매주 업데이트되는 점심·저녁 식단표",
      href: "/campus/menu",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 페이지 헤더 */}
          <div className="mb-12 text-center">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Campus Life</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              학원생활
            </h1>
            <p className="text-lg text-gray-600">
              SN 고요의숲 대치에서의 하루를 안내합니다
            </p>
          </div>

          {/* 메뉴 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campusMenus.map((menu, index) => (
              <Link
                key={index}
                href={menu.href}
                className="group bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-sn-green/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-sn-green/10 rounded-xl flex items-center justify-center text-sn-green group-hover:bg-sn-green group-hover:text-white transition-all duration-300">
                    {menu.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sn-green transition-colors">
                      {menu.title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {menu.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-gray-400 group-hover:text-sn-green group-hover:translate-x-1 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 안내 */}
          <div className="mt-12 p-6 bg-sn-green/10 rounded-xl border border-sn-green/30">
            <p className="text-center text-gray-700">
              <span className="font-semibold text-sn-green">궁금한 점이 있으신가요?</span><br />
              <span className="text-sm">상담 신청을 통해 자세한 안내를 받으실 수 있습니다.</span>
            </p>
            <div className="mt-4 text-center">
              <Link
                href="/programs#contact"
                className="inline-block px-6 py-2.5 bg-sn-green text-white font-medium rounded-lg hover:bg-sn-green-dark transition-colors"
              >
                상담 신청하기
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
