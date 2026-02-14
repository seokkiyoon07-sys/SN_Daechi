'use client';

import Image from 'next/image';
import { programsData } from '@/lib/data/programs';

export default function Recruitment() {
  const programs = programsData;

  return (
    <section id="recruitment" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Recruitment</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            모집요강
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            학생의 상황과 목표에 맞는 <span className="text-sn-green font-semibold">최적의 프로그램</span>을 선택하세요
          </p>
        </div>

        {/* 할인 배너 */}
        <div className="mb-12 mx-auto" style={{ maxWidth: '1100px' }}>
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🎉</span>
              <span className="text-xl font-bold">2월 등록 특별 할인</span>
              <span className="text-2xl">🎉</span>
            </div>
            <p className="text-lg font-medium mb-1">첫 달 수강료 <span className="text-yellow-300 font-bold text-2xl">50% OFF</span></p>
            <p className="text-sm text-white/80">* 2월 신규 등록자 한정, 첫 달만 적용</p>
          </div>
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
                className="relative rounded-xl p-6 cursor-pointer transition-all duration-300 bg-white border-2 border-sn-main/20 hover:border-sn-main hover:shadow-lg hover:shadow-sn-main/10 hover:-translate-y-1 flex flex-col"
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
                <div className="border-t-2 pt-4 mb-4 border-sn-main/20 mt-auto">
                  <div className="text-xs text-sn-green font-medium mb-1">수강료 안내</div>
                  {program.discountPrice ? (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-400 line-through">{program.originalPrice}</span>
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">{program.discountRate}</span>
                      </div>
                      <div className="text-xl font-bold text-red-500">
                        {program.discountPrice}
                        <span className="text-xs text-gray-500 font-normal ml-1">(첫 달)</span>
                      </div>
                      {'discountNote' in program && program.discountNote && (
                        <div className="text-sm text-gray-600 mt-1">{program.discountNote}</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xl font-bold text-sn-green">
                      {program.price}
                    </div>
                  )}
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
            <a href="tel:010-5862-3838" className="text-center p-6 rounded-xl bg-white hover:bg-sn-green/10 hover:shadow-md transition-all duration-300 cursor-pointer border border-sn-main/20 block">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/image/phone.png"
                  alt="전화 상담"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">전화 상담</h4>
              <span className="text-sn-green font-medium hover:underline">
                010-5862-3838
              </span>
            </a>

            {/* 카카오톡 상담 */}
            <a href="https://pf.kakao.com/_xelXhX/chat" target="_blank" rel="noopener noreferrer" className="text-center p-6 rounded-xl bg-white hover:bg-sn-green/10 hover:shadow-md transition-all duration-300 cursor-pointer border border-sn-main/20 block">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/image/KakaoTalk.png"
                  alt="카카오톡 상담"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">카카오톡 상담</h4>
              <span className="text-sn-green font-medium hover:underline">
                @SN대치
              </span>
            </a>

            {/* 방문 상담 */}
            <a href="/admission/visit" className="text-center p-6 rounded-xl bg-white hover:bg-sn-green/10 hover:shadow-md transition-all duration-300 cursor-pointer border border-sn-main/20 block">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/image/navermap.webp"
                  alt="방문 상담"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">방문 상담</h4>
              <p className="text-gray-600 text-sm">
                대치역 도보 3분
              </p>
            </a>
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
