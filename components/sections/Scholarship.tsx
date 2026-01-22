'use client';

import { useState, useEffect } from 'react';
import { typedScholarshipsData as scholarshipsData } from '@/lib/data/scholarships';

export default function Scholarship() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const icons = [
    <svg key="0" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>,
    <svg key="1" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>,
  ];

  const scholarships = scholarshipsData.map((scholarship, idx) => ({
    ...scholarship,
    icon: icons[idx],
  }));

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div
          id="header"
          data-animate
          className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('header')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-sn-green/10 text-sn-green text-sm font-medium rounded-full mb-4">
            SCHOLARSHIP
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            장학금 제도
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SN-고요의숲 대치는 열정과 의지를 가진 학생들을 위해<br className="hidden sm:inline" />
            다양한 장학 혜택을 제공합니다.
          </p>
        </div>

        {/* 장학금 카드 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {scholarships.map((scholarship, index) => (
            <div
              key={index}
              id={`scholarship-${index}`}
              data-animate
              className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 delay-${index * 100} ${
                visibleSections.has(`scholarship-${index}`)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-sn-green/5 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-sn-green/10 rounded-xl flex items-center justify-center text-sn-green">
                    {scholarship.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{scholarship.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {scholarship.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-sm">{item.grade}</span>
                        {item.note && <span className="text-gray-400 text-xs mt-0.5">{item.note}</span>}
                      </div>
                      <span className="text-sn-green font-semibold text-sm whitespace-nowrap">
                        {item.benefit}
                      </span>
                    </div>
                  ))}
                </div>
                {scholarship.note && (
                  <p className="mt-4 text-xs text-gray-500">{scholarship.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 유의사항 */}
        <div
          id="notice"
          data-animate
          className={`bg-gray-900 rounded-2xl p-8 text-white transition-all duration-700 ${
            visibleSections.has('notice')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            장학금 신청 안내
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sn-green mt-2 flex-shrink-0"></span>
              장학금은 입학 상담 시 신청 가능합니다.
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sn-green mt-2 flex-shrink-0"></span>
              성적 장학금 신청 시 성적표 원본 또는 성적증명서를 지참해 주세요.
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sn-green mt-2 flex-shrink-0"></span>
              장학금은 예산 소진 시 조기 마감될 수 있습니다.
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sn-green mt-2 flex-shrink-0"></span>
              자세한 문의는 <a href="tel:02-501-1234" className="text-sn-green hover:underline">02-501-1234</a>로 연락 바랍니다.
            </li>
          </ul>
        </div>

        {/* CTA 버튼 */}
        <div
          id="cta"
          data-animate
          className={`text-center mt-12 transition-all duration-700 ${
            visibleSections.has('cta')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <a
            href="/admission/visit"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sn-green text-white font-semibold rounded-xl hover:bg-sn-green-dark transition-colors"
          >
            방문 상담 예약하기
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
