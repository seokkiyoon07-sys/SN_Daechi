'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface FacilityItem {
  name: string;
  description: string;
  features: string[];
  images: string[];
  reverseLayout?: boolean;
}

interface FacilityCardProps {
  item: FacilityItem;
}

function FacilityCard({ item }: FacilityCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const imageCount = item.images?.length || 0;

  // 인덱스 변경 시 위치 업데이트
  useEffect(() => {
    if (!isDragging) {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      setPrevTranslate(-currentIndex * containerWidth);
      setCurrentTranslate(-currentIndex * containerWidth);
    }
  }, [currentIndex, isDragging]);

  const getPositionX = (e: React.MouseEvent | React.TouchEvent) => {
    return 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (imageCount <= 1) return;
    setIsDragging(true);
    setStartX(getPositionX(e));
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startX;

    // 저항감 적용 (끝에서 당길 때)
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const maxTranslate = 0;
    const minTranslate = -(imageCount - 1) * containerWidth;
    let newTranslate = prevTranslate + diff;

    // 양쪽 끝에서 러버밴드 효과
    if (newTranslate > maxTranslate) {
      newTranslate = maxTranslate + (newTranslate - maxTranslate) * 0.3;
    } else if (newTranslate < minTranslate) {
      newTranslate = minTranslate + (newTranslate - minTranslate) * 0.3;
    }

    setCurrentTranslate(newTranslate);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const movedBy = currentTranslate - prevTranslate;

    // 스와이프 감도 조절 (20% 이상 이동하면 전환)
    const threshold = containerWidth * 0.2;

    if (movedBy < -threshold && currentIndex < imageCount - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // 원래 위치로 스냅백
      setCurrentTranslate(-currentIndex * containerWidth);
      setPrevTranslate(-currentIndex * containerWidth);
    }
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // 첫 번째에서 마지막으로 (무한 루프)
      setCurrentIndex(imageCount - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < imageCount - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 마지막에서 첫 번째로 (무한 루프)
      setCurrentIndex(0);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        {/* 이미지 영역 - 캐러셀 */}
        <div className={`bg-gray-100 min-h-[300px] md:min-h-[400px] relative ${item.reverseLayout ? 'md:order-2' : 'md:order-1'}`}>
          {item.images && item.images.length > 0 ? (
            <>
              <div
                ref={containerRef}
                className={`relative h-full min-h-[300px] md:min-h-[400px] overflow-hidden ${imageCount > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                <div
                  className="flex h-full select-none"
                  style={{
                    transform: `translateX(${currentTranslate}px)`,
                    transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    width: `${imageCount * 100}%`
                  }}
                >
                  {item.images.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative h-full min-h-[300px] md:min-h-[400px] flex-shrink-0"
                      style={{ width: `${100 / imageCount}%` }}
                    >
                      <Image
                        src={src}
                        alt={`${item.name} ${idx + 1}`}
                        fill
                        className="object-cover pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 네비게이션 버튼 (이미지 2개 이상일 때만) */}
              {imageCount > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10 hover:scale-105 active:scale-95"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10 hover:scale-105 active:scale-95"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* 인디케이터 */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {item.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] md:min-h-[400px]">
              <div className="text-center text-gray-400 p-8">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">{item.name} 이미지</p>
                <p className="text-xs mt-1">실제 이미지로 교체 예정</p>
              </div>
            </div>
          )}
        </div>

        {/* 정보 영역 */}
        <div className={`p-8 ${item.reverseLayout ? 'md:order-1' : 'md:order-2'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {item.name}
          </h2>
          <p className="text-gray-600 mb-6">
            {item.description}
          </p>

          <h3 className="text-sm font-semibold text-sn-green mb-3 uppercase tracking-wide">
            주요 특징
          </h3>
          <ul className="space-y-3">
            {item.features.map((feature, index) => (
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
  );
}

export default function FacilityPage() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const facilities = [
    {
      name: "몰입존",
      tabName: "몰입존",
      isMultiple: true,
      subItems: [
        {
          name: "3F 자습실",
          description: "개인 독서실 형태의 1인 1좌석 자습실",
          features: [
            "개인 칸막이 책상으로 집중력 향상",
            "개인 조명 및 콘센트 완비",
            "냉난방 완비로 쾌적한 학습 환경",
            "CCTV를 통한 학습 관리"
          ],
          images: ["/image/facility/3Fstudy_room.jpg", "/image/facility/3Fstudy_room1.jpg"],
          reverseLayout: false
        },
        {
          name: "4F 자습실",
          description: "프리미엄 환경의 집중 학습 공간",
          features: [
            "넓은 개인 공간 제공",
            "프리미엄 의자 및 책상",
            "최적의 조명 환경",
            "조용한 학습 분위기"
          ],
          images: ["/image/facility/4Fstudy_room.jpg", "/image/facility/4FpremiumZone.jpg"],
          reverseLayout: true
        },
        {
          name: "스탠딩 책상",
          description: "서서 학습할 수 있는 스탠딩 책상",
          features: [
            "자세 변화로 집중력 향상",
            "오래 앉아있을 때 휴식 대안",
            "건강한 학습 습관 형성",
            "자유로운 이용 가능"
          ],
          images: ["/image/facility/standing_table.jpg", "/image/facility/standing_table1.jpg"],
          reverseLayout: false
        }
      ]
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
      images: ["/image/facility/counseling_room.jpg"]
    },
    {
      name: "프린트 카페",
      description: "학습 중간 휴식을 위한 편안한 공간",
      features: [
        "편안한 소파 및 테이블 구비",
        "정수기 및 간식 보관 가능",
        "휴대폰 사용 허용 (지정 시간)",
        "자연 채광으로 밝은 분위기"
      ],
      images: ["/image/facility/print_cafe.jpg"]
    },
    {
      name: "강의실",
      description: "실전모의고사 실",
      features: [
        "실제 수능과 동일한 환경",
        "정숙한 시험 분위기",
        "시간표에 따른 모의고사 진행",
        "성적 분석 및 피드백 제공"
      ],
      images: ["/image/facility/lectureroom.jpg", "/image/facility/lectureroom2.jpg"]
    },
    {
      name: "인포메이션",
      description: "학원 운영 및 학생 관리를 위한 공간",
      features: [
        "출결 관리 시스템 운영",
        "학부모 연락 및 상담 접수",
        "학원 행정 업무 처리",
        "비상 상황 대응 센터"
      ],
      images: ["/image/facility/information_room.jpg"]
    },
    {
      name: "테라스",
      description: "야외에서 휴식을 취할 수 있는 공간",
      features: [
        "탁 트인 야외 공간",
        "자연 환기와 햇빛",
        "휴식 및 간단한 대화 가능",
        "쾌적한 휴식 환경"
      ],
      images: ["/image/facility/terrace.jpg"]
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
                  {facility.tabName || facility.name}
                </button>
              ))}
            </div>
          </div>

          {/* 선택된 시설 상세 */}
          {facilities[activeTab].isMultiple && facilities[activeTab].subItems ? (
            // 몰입존처럼 여러 시설을 포함하는 경우
            <div className="space-y-8">
              {facilities[activeTab].subItems.map((subItem, subIndex) => (
                <FacilityCard
                  key={subIndex}
                  item={subItem}
                />
              ))}
            </div>
          ) : (
            // 단일 시설인 경우
            <FacilityCard
              item={{
                name: facilities[activeTab].name,
                description: facilities[activeTab].description || '',
                features: facilities[activeTab].features || [],
                images: facilities[activeTab].images || [],
                reverseLayout: false
              }}
            />
          )}

          {/* 상담 안내 */}
          <div className="mt-12 p-6 bg-sn-green/10 rounded-xl border border-sn-green/30">
            <p className="text-center text-gray-700">
              <span className="font-semibold text-sn-green">직접 방문하여 시설을 확인해보세요!</span><br />
              <span className="text-sm">상담 예약 후 방문하시면 더 자세한 안내를 받으실 수 있습니다.</span>
            </p>
            <div className="mt-4 text-center">
              <a
                href="/admission/visit"
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
