'use client';

import { programsData } from '@/lib/data/programs';

export default function Recruitment() {
  const programs = programsData;

  return (
    <section id="recruitment" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Recruitment</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            모집요강
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            학생의 상황과 목표에 맞는 <span className="text-sn-green font-semibold">최적의 프로그램</span>을 선택하세요
          </p>
        </div>

        {/* 프로그램 카드 */}
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-1.5 h-6 bg-sn-green rounded-full"></span>
            <h3 className="text-2xl font-bold text-gray-900">프로그램 선택</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div
                key={index}
                className="relative rounded-xl p-6 cursor-pointer transition-all duration-300 bg-white border-2 border-sn-main/20 hover:border-sn-main hover:shadow-lg hover:shadow-sn-main/10 hover:-translate-y-1"
              >
                {/* 배지 */}
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-sn-green text-white">
                  {program.badge}
                </div>

                {/* 제목 */}
                <h4 className="text-lg font-bold mb-2 text-gray-900">
                  {program.title}
                </h4>

                {/* 설명 */}
                <p className="mb-4 text-gray-600 text-sm">
                  {program.description}
                </p>

                {/* 기능 리스트 */}
                <ul className="space-y-2 mb-4">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-sn-green"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* 가격 */}
                <div className="border-t-2 pt-4 mb-4 border-sn-main/20">
                  <div className="text-xs text-sn-green font-medium mb-1">수강료 안내</div>
                  <div className="text-xl font-bold text-sn-green">
                    {program.price}
                  </div>
                </div>

                {/* CTA 버튼 */}
                <a
                  href="#contact"
                  className="block w-full py-2 px-4 rounded-lg text-center font-medium text-sm transition-all bg-sn-green text-white hover:bg-sn-green-dark"
                >
                  상담 신청하기
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 상담 신청 섹션 */}
        <div id="contact" className="mt-12 mx-auto bg-white rounded-2xl p-8 shadow-lg border-2 border-sn-main/20" style={{ maxWidth: '900px' }}>
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Contact</span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              상담 신청하기
            </h3>
            <p className="text-gray-600">
              프로그램에 대한 자세한 상담이 필요하신가요? 아래 연락처로 문의해주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* 전화 상담 */}
            <div className="text-center p-6 rounded-xl bg-white hover:bg-sn-green/10 hover:shadow-md transition-all duration-300 cursor-pointer border border-sn-main/20">
              <div className="w-14 h-14 mx-auto mb-4 bg-sn-green rounded-full flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">전화 상담</h4>
              <a href="tel:02-XXX-XXXX" className="text-sn-green font-medium hover:underline">
                02-XXX-XXXX
              </a>
            </div>

            {/* 카카오톡 상담 */}
            <div className="text-center p-6 rounded-xl bg-white hover:bg-sn-green/10 hover:shadow-md transition-all duration-300 cursor-pointer border border-sn-main/20">
              <div className="w-14 h-14 mx-auto mb-4 bg-sn-green rounded-full flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3c-5.5 0-10 3.58-10 8 0 2.82 1.83 5.29 4.59 6.69-.17.64-.63 2.36-.72 2.73-.12.49.18.48.38.35.15-.1 2.45-1.64 3.44-2.31.74.11 1.51.17 2.31.17 5.5 0 10-3.58 10-8s-4.5-8-10-8z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">카카오톡 상담</h4>
              <a href="#" className="text-sn-green font-medium hover:underline">
                @SN대치
              </a>
            </div>

            {/* 방문 상담 */}
            <div className="text-center p-6 rounded-xl bg-white hover:bg-sn-green/10 hover:shadow-md transition-all duration-300 cursor-pointer border border-sn-main/20">
              <div className="w-14 h-14 mx-auto mb-4 bg-sn-green rounded-full flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">방문 상담</h4>
              <p className="text-gray-600 text-sm">
                대치역 도보 3분
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              상담 가능 시간: 평일 09:00 - 21:00 / 토요일 09:00 - 18:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
