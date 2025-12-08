'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function FacilityPage() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const facilities = [
    {
      name: "자습실",
      description: "개인 독서실 형태의 1인 1좌석 자습실",
      features: [
        "개인 칸막이 책상으로 집중력 향상",
        "개인 조명 및 콘센트 완비",
        "냉난방 완비로 쾌적한 학습 환경",
        "CCTV를 통한 학습 관리"
      ],
      images: ["/image/facility/study-room-1.jpg", "/image/facility/study-room-2.jpg"]
    },
    {
      name: "상담실",
      description: "1:1 맞춤 상담을 위한 독립 공간",
      features: [
        "프라이버시가 보장되는 독립된 공간",
        "학습 상담 및 진로 상담 진행",
        "학부모 상담 가능",
        "편안한 분위기의 인테리어"
      ],
      images: ["/image/facility/counseling-room.jpg"]
    },
    {
      name: "휴게실",
      description: "학습 중간 휴식을 위한 편안한 공간",
      features: [
        "편안한 소파 및 테이블 구비",
        "정수기 및 간식 보관 가능",
        "휴대폰 사용 허용 (지정 시간)",
        "자연 채광으로 밝은 분위기"
      ],
      images: ["/image/facility/lounge.jpg"]
    },
    {
      name: "식당",
      description: "건강한 식사를 위한 쾌적한 식사 공간",
      features: [
        "위생적인 식사 환경",
        "도시락 배식 공간",
        "깨끗한 테이블 및 의자",
        "정기적인 청소 및 소독"
      ],
      images: ["/image/facility/cafeteria.jpg"]
    },
    {
      name: "행정실",
      description: "학원 운영 및 학생 관리를 위한 공간",
      features: [
        "출결 관리 시스템 운영",
        "학부모 연락 및 상담 접수",
        "학원 행정 업무 처리",
        "비상 상황 대응 센터"
      ],
      images: ["/image/facility/admin-office.jpg"]
    }
  ];

  const highlights = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "안전한 환경",
      description: "CCTV 및 출입 관리 시스템으로 안전한 학습 환경 제공"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "쾌적한 시설",
      description: "최신 냉난방 시설과 공기청정기로 쾌적한 환경 유지"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "편리한 위치",
      description: "대치동 학원가 중심부에 위치하여 접근성 우수"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "24시간 관리",
      description: "운영 시간 내 상주 관리자가 학생들을 케어"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 페이지 헤더 */}
          <div className="mb-12 text-center">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Facility</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              시설안내
            </h1>
            <p className="text-lg text-gray-600">
              최고의 학습 환경을 위해 준비된 시설을 소개합니다
            </p>
          </div>

          {/* 시설 하이라이트 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {highlights.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm text-center">
                <div className="w-14 h-14 mx-auto bg-sn-green/10 rounded-full flex items-center justify-center text-sn-green mb-3">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          {/* 시설 탭 */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {facilities.map((facility, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                    activeTab === index
                      ? 'bg-sn-green text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-sn-green hover:text-sn-green'
                  }`}
                >
                  {facility.name}
                </button>
              ))}
            </div>
          </div>

          {/* 선택된 시설 상세 */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* 이미지 영역 */}
              <div className="bg-gray-100 min-h-[300px] md:min-h-[400px] flex items-center justify-center">
                <div className="text-center text-gray-400 p-8">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">{facilities[activeTab].name} 이미지</p>
                  <p className="text-xs mt-1">실제 이미지로 교체 예정</p>
                </div>
              </div>

              {/* 정보 영역 */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {facilities[activeTab].name}
                </h2>
                <p className="text-gray-600 mb-6">
                  {facilities[activeTab].description}
                </p>

                <h3 className="text-sm font-semibold text-sn-green mb-3 uppercase tracking-wide">
                  주요 특징
                </h3>
                <ul className="space-y-3">
                  {facilities[activeTab].features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-sn-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 위치 안내 */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">오시는 길</h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* 네이버 지도 */}
              <iframe
                src="https://map.naver.com/p/entry/place/1100410920?c=15.00,0,0,0,dh&placePath=/home"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="SN고요의숲(대치) 위치"
              ></iframe>

              {/* 주소 정보 */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sn-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">주소</p>
                      <p className="text-gray-600 text-sm">서울특별시 강남구 대치동 447</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sn-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">전화번호</p>
                      <p className="text-gray-600 text-sm">02-XXX-XXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sn-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">운영시간</p>
                      <p className="text-gray-600 text-sm">월-토 08:00 ~ 22:00</p>
                      <p className="text-gray-600 text-sm">일 휴무</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sn-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">대중교통</p>
                      <p className="text-gray-600 text-sm">대치역 도보 5분</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 상담 안내 */}
          <div className="mt-12 p-6 bg-sn-green/10 rounded-xl border border-sn-green/30">
            <p className="text-center text-gray-700">
              <span className="font-semibold text-sn-green">직접 방문하여 시설을 확인해보세요!</span><br />
              <span className="text-sm">상담 예약 후 방문하시면 더 자세한 안내를 받으실 수 있습니다.</span>
            </p>
            <div className="mt-4 text-center">
              <a
                href="/programs#contact"
                className="inline-block px-6 py-2.5 bg-sn-green text-white font-medium rounded-lg hover:bg-sn-green-dark transition-colors"
              >
                방문 상담 예약
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
