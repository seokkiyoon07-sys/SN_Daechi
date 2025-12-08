'use client';

import { useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SuccessStoriesPage() {
  const [activeTab, setActiveTab] = useState('results');

  const stats = [
    {
      number: "98%",
      label: "목표 대학 합격률",
      description: "2024년 기준"
    },
    {
      number: "156명",
      label: "SKY 합격생",
      description: "최근 3년 누적"
    },
    {
      number: "1등급",
      label: "평균 성적 향상",
      description: "6개월 기준"
    },
    {
      number: "24시간",
      label: "학습 관리",
      description: "365일 운영"
    }
  ];

  const universities = [
    "서울대학교", "연세대학교", "고려대학교",
    "성균관대학교", "한양대학교", "서강대학교",
    "이화여자대학교", "중앙대학교", "경희대학교"
  ];

  const testimonials = [
    {
      name: "김○○",
      university: "서울대학교 경영학과 합격",
      year: "2024",
      content: "체계적인 학습 관리 시스템 덕분에 목표했던 서울대에 합격할 수 있었습니다. 특히 1:1 맞춤 관리가 큰 도움이 되었습니다.",
      rating: 5
    },
    {
      name: "이○○",
      university: "연세대학교 경제학부 합격",
      year: "2024",
      content: "재수를 결심하고 SN독학재수학원을 선택한 것이 최고의 결정이었습니다. 멘토 선생님의 세심한 관리로 성적이 크게 올랐습니다.",
      rating: 5
    },
    {
      name: "박○○",
      university: "고려대학교 심리학부 합격",
      year: "2024",
      content: "쾌적한 학습 환경과 24시간 자습실이 정말 좋았습니다. 집중해서 공부할 수 있는 최적의 환경이었습니다.",
      rating: 5
    },
    {
      name: "정○○",
      university: "성균관대학교 글로벌경영학과 합격",
      year: "2023",
      content: "입시 전략 컨설팅이 정말 유용했습니다. 단순히 공부만 하는 것이 아니라 효율적으로 목표를 달성할 수 있었습니다.",
      rating: 5
    },
    {
      name: "최○○",
      university: "한양대학교 건축학부 합격",
      year: "2023",
      content: "실시간 성적 관리 시스템으로 약점을 파악하고 보완할 수 있었습니다. 데이터 기반 학습이 정말 효과적이었습니다.",
      rating: 5
    },
    {
      name: "강○○",
      university: "서강대학교 경제학부 합격",
      year: "2023",
      content: "소수정예 운영 덕분에 선생님들의 관심을 많이 받을 수 있었고, 모르는 부분을 바로바로 해결할 수 있었습니다.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Success Stories</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              성공스토리
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SN독학재수학원과 함께 꿈을 이룬 학생들의 이야기
            </p>
          </div>

          {/* 탭 네비게이션 */}
          <div className="mb-12">
            <div className="flex justify-center border-b-2 border-sn-main/20">
              <button
                onClick={() => setActiveTab('results')}
                className={`px-8 py-4 font-semibold text-base transition-all relative ${
                  activeTab === 'results'
                    ? 'text-sn-green'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                합격실적
                {activeTab === 'results' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sn-green"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`px-8 py-4 font-semibold text-base transition-all relative ${
                  activeTab === 'testimonials'
                    ? 'text-sn-green'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                후기
                {activeTab === 'testimonials' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sn-green"></span>
                )}
              </button>
            </div>
          </div>

          {/* 탭 콘텐츠 */}
          {activeTab === 'results' && (
            <div>
              {/* 통계 그리드 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-sn-green to-sn-green-light bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* 합격 대학 로고 섹션 */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  주요 합격 대학
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {universities.map((university, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-6 text-center font-medium text-gray-700 hover:shadow-md hover:scale-105 transition-all duration-300 border border-sn-main/20 hover:border-sn-main"
                    >
                      {university}
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-gray-600 text-sm">
                    * 이 외에도 다수의 상위권 대학 합격생을 배출하고 있습니다
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 text-center">
                <a
                  href="/programs#contact"
                  className="inline-flex items-center px-8 py-4 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
                >
                  합격 상담 신청하기
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              {/* 후기 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-sn-main/20"
                  >
                    {/* 별점 */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* 후기 내용 */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    {/* 학생 정보 */}
                    <div className="border-t pt-6 border-sn-main/30">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sn-green to-sn-green-light flex items-center justify-center text-white font-bold text-lg mr-4">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonial.university}
                          </div>
                          <div className="text-xs text-gray-500">
                            {testimonial.year}년 합격
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 하단 CTA */}
              <div className="mt-16 text-center bg-gradient-to-br from-sn-green to-sn-green-light rounded-2xl p-12 text-white">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  다음 합격 주인공은 바로 당신입니다
                </h3>
                <p className="text-lg mb-8 text-green-100">
                  지금 바로 상담 신청하고 합격의 첫 걸음을 시작하세요
                </p>
                <a
                  href="/programs#contact"
                  className="inline-flex items-center px-8 py-4 text-base font-medium text-sn-green bg-white rounded-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                >
                  무료 상담 신청하기
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
