'use client';

import { useState, useEffect } from 'react';

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

  const scholarships = [
    {
      title: '성적 우수 장학금',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      items: [
        { grade: '수능 국/수/영 합 270 이상', benefit: '수강료 전액 면제' },
        { grade: '수능 국/수/영 합 260 이상', benefit: '수강료 50% 감면' },
        { grade: '수능 국/수/영 합 250 이상', benefit: '수강료 30% 감면' },
      ],
      note: '* 2026학년도 수능 성적 기준 (탐구 미포함)',
    },
    {
      title: '재원생 장학금',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      items: [
        { grade: 'SN 양평 기숙학원 출신', benefit: '수강료 20% 감면' },
        { grade: '형제/자매 동시 등록', benefit: '각 수강료 10% 감면' },
      ],
      note: '* 타 장학금과 중복 적용 불가',
    },
    {
      title: '조기 등록 장학금',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        { grade: '1차 모집 기간 등록', benefit: '수강료 10% 감면' },
        { grade: '2차 모집 기간 등록', benefit: '수강료 5% 감면' },
      ],
      note: '* 모집 기간은 공지사항 참조',
    },
  ];

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
                      <span className="text-gray-600 text-sm">{item.grade}</span>
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
