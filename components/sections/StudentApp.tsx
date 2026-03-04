'use client';

import { useState, useEffect } from 'react';

export default function StudentApp() {
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

    const sections = document.querySelectorAll('[data-animate-app]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: '재원생앱',
      description: '출결 관리, AI 학습 분석, 일일 리포트까지. 학생의 하루를 데이터로 기록합니다.',
      href: 'https://daechi.snacademy.co.kr/app',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: '시험응시',
      description: 'SNarGPT가 생성한 맞춤형 시험을 온라인으로 응시하고, 즉시 분석 결과를 확인합니다.',
      href: 'https://daechi.snacademy.co.kr/test',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: 'SNarGPT',
      description: 'SN이 자체 개발한 Vertical AI. 오답 분석, 맞춤 문항 생성, 사고 로직 교정을 수행합니다.',
      href: 'https://snargpt.ai',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.591.659H9.061a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V19a2 2 0 01-2 2H7a2 2 0 01-2-2v-4.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#f8f9fa] py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* 헤더 */}
        <div
          id="student-app-header"
          data-animate-app
          className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('student-app-header')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 text-sm tracking-[0.15em] text-sn-green font-medium bg-sn-green/10 rounded-full mb-6">
            STUDENT PLATFORM
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            학생 전용 디지털 플랫폼
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
            SN 고요의숲은 자체 개발한 학습 플랫폼으로<br className="hidden sm:block" />
            학생의 공부 습관과 성적 변화를 데이터로 관리합니다.
          </p>
        </div>

        {/* 서비스 카드 */}
        <div
          id="student-app-cards"
          data-animate-app
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-200 ${
            visibleSections.has('student-app-cards')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {services.map((service) => (
            <a
              key={service.title}
              href={service.href}
              className="group block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-sn-green/30 transition-all"
            >
              <div className="text-sn-green mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              <div className="mt-4 flex items-center text-sm text-sn-green font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                바로가기
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
