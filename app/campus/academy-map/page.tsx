'use client';

import { useEffect, useState, useCallback, useRef, Fragment } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NaverMap, { MapMarker } from "@/components/NaverMap";

interface StudyAcademy {
  id: number;
  name: string;
  type: '독학관리/독학재수' | '시대인재' | '강남대성/두각';
  priceRange?: string;
  walkTime?: number; // SN고요의숲에서 도보 시간 (분)
  capacity?: number;
  features: string[];
  description: string;
  address: string;
  phone?: string;
  naverMapUrl: string;
  lat: number;
  lng: number;
}

// 학원 위치: 대치동 447 (SN고요의숲)
const ACADEMY_LAT = 37.496898;
const ACADEMY_LNG = 127.061648;

// 은마아파트 사거리 (전체화면 지도 중심)
const EUNMA_CENTER_LAT = 37.4988;
const EUNMA_CENTER_LNG = 127.0585;

// 대치동 독학관리 학원 데이터
const academies: StudyAcademy[] = [
  {
    id: 1,
    name: "수능선배",
    type: "독학관리/독학재수",
    priceRange: "79만원",
    features: [],
    description: "",
    address: "서울 강남구 대치동 909-3",
    naverMapUrl: "https://suneungsunbae.com/",
    lat: 37.501094,
    lng: 127.053444,
  },
  {
    id: 2,
    name: "이투스247",
    type: "독학관리/독학재수",
    priceRange: "70~85만원",
    features: [],
    description: "",
    address: "서울 강남구 대치동 910-2",
    naverMapUrl: "https://m.daechi247.etoos.com/mpost/notice/list.do",
    lat: 37.501513,
    lng: 127.054331,
  },
  {
    id: 3,
    name: "상상독학",
    type: "독학관리/독학재수",
    priceRange: "130만원",
    features: [],
    description: "",
    address: "서울 강남구 대치동 898-4",
    naverMapUrl: "https://blog.naver.com/ss_dokhak",
    lat: 37.502089,
    lng: 127.050397,
  },
  {
    id: 4,
    name: "강남하이퍼리뷰",
    type: "독학관리/독학재수",
    priceRange: "80만원",
    features: [],
    description: "",
    address: "서울 강남구 대치동 923-3 3층,4층",
    naverMapUrl: "https://blog.naver.com/xo911",
    lat: 37.499187,
    lng: 127.053202,
  },
  {
    id: 5,
    name: "잇올스파르타",
    type: "독학관리/독학재수",
    priceRange: "79만원",
    features: [],
    description: "",
    address: "서울 강남구 대치동 910-2",
    naverMapUrl: "https://itopstudy.co.kr/",
    lat: 37.501348,
    lng: 127.053910,
  },
  {
    id: 6,
    name: "메이드존",
    type: "독학관리/독학재수",
    priceRange: "65만원",
    features: [],
    description: "",
    address: "서울 강남구 대치동 1023-11",
    naverMapUrl: "https://blog.naver.com/madezone-",
    lat: 37.497478,
    lng: 127.058023,
  },
  {
    id: 7,
    name: "탑스터디",
    type: "독학관리/독학재수",
    priceRange: "70~80만원",
    features: [],
    description: "",
    address: "서울 강남구 대치동 936-28",
    naverMapUrl: "https://itopstudy.co.kr/",
    lat: 37.497423,
    lng: 127.053202,
  },
  {
    id: 8,
    name: "코칭아카데미",
    type: "독학관리/독학재수",
    priceRange: "",
    features: [],
    description: "",
    address: "서울 강남구 선릉로 318 201-1호",
    naverMapUrl: "https://coachinga-mo3.imweb.me/",
    lat: 37.498137,
    lng: 127.052411,
  },
  {
    id: 9,
    name: "에듀셀파",
    type: "독학관리/독학재수",
    priceRange: "80만원",
    capacity: 100,
    features: [],
    description: "",
    address: "서울 강남구 대치동 907-8",
    naverMapUrl: "https://core.edusherpa.kr",
    lat: 37.501227,
    lng: 127.052192,
  },
  {
    id: 10,
    name: "스마트정일",
    type: "독학관리/독학재수",
    priceRange: "86만원",
    features: [],
    description: "",
    address: "서울 강남구 대치동 903-3",
    naverMapUrl: "",
    lat: 37.502721,
    lng: 127.056762,
  },
  {
    id: 11,
    name: "대치올스터디",
    type: "독학관리/독학재수",
    priceRange: "75~85만원",
    features: [],
    description: "",
    address: "서울 강남구 대치동 912-10",
    naverMapUrl: "https://blog.naver.com/daechiallstudy",
    lat: 37.502542,
    lng: 127.057423,
  },
  {
    id: 12,
    name: "스코관리형",
    type: "독학관리/독학재수",
    priceRange: "60~80만원",
    features: [],
    description: "",
    address: "서울 강남구 역삼로69길 10 3층 301호",
    naverMapUrl: "https://s-co.kr",
    lat: 37.502278,
    lng: 127.054032,
  },
  {
    id: 13,
    name: "댓츠원스터디랩",
    type: "독학관리/독학재수",
    priceRange: "79~85만원",
    features: [],
    description: "",
    address: "서울 강남구 대치동 905-19",
    naverMapUrl: "https://blog.naver.com/daechiallstudy",
    lat: 37.502165,
    lng: 127.055137,
  },
  {
    id: 14,
    name: "아카데미아",
    type: "독학관리/독학재수",
    priceRange: "",
    features: [],
    description: "",
    address: "서울 강남구 도곡로 331 6층",
    naverMapUrl: "",
    lat: 37.496521,
    lng: 127.052193,
  },
  // 시대인재
  {
    id: 15,
    name: "시대인재 S1 사탐관",
    type: "시대인재",
    priceRange: "",
    walkTime: 6,
    features: ["사탐 특화"],
    description: "사회탐구 과목 전용 강의관",
    address: "서울 강남구 대치동 939-28",
    naverMapUrl: "https://map.naver.com/p?c=127.056770,37.497873,17,0,0,0,dh",
    lat: 37.497873,
    lng: 127.056770,
  },
  {
    id: 16,
    name: "시대인재 본관 (동선빌딩)",
    type: "시대인재",
    priceRange: "",
    walkTime: 5,
    features: ["메인 거점", "상담 센터"],
    description: "시대인재의 심장부. 고등부 단과 수업 및 상담 센터 위주",
    address: "서울 강남구 대치동 1023-4",
    naverMapUrl: "https://map.naver.com/p?c=127.057349,37.497469,17,0,0,0,dh",
    lat: 37.497469,
    lng: 127.057349,
  },
  {
    id: 17,
    name: "시대인재 고등수학스쿨별관",
    type: "시대인재",
    priceRange: "",
    walkTime: 5,
    features: ["수학 특화"],
    description: "고등부 수학 단과 전용관",
    address: "서울 강남구 대치동 1023-7",
    naverMapUrl: "https://map.naver.com/p?c=127.057944,37.497677,17,0,0,0,dh",
    lat: 37.497677,
    lng: 127.057944,
  },
  {
    id: 18,
    name: "시대인재 대덕관",
    type: "시대인재",
    priceRange: "",
    walkTime: 4,
    features: ["스타 강사"],
    description: "특정 스타 강사 전용관 또는 테마별 단과 강의실",
    address: "서울 강남구 대치동 1023-9",
    naverMapUrl: "https://map.naver.com/p?c=127.058372,37.497602,17,0,0,0,dh",
    lat: 37.497602,
    lng: 127.058372,
  },
  {
    id: 19,
    name: "시대인재 입시 R&D 센터",
    type: "시대인재",
    priceRange: "",
    walkTime: 4,
    features: ["입시 연구"],
    description: "입시 전략 연구 및 컨설팅 센터",
    address: "서울 강남구 대치동 1022-4",
    naverMapUrl: "https://map.naver.com/p?c=127.058739,37.497714,17,0,0,0,dh",
    lat: 37.497714,
    lng: 127.058739,
  },
  {
    id: 20,
    name: "시대인재 덕산빌딩 (수학스쿨)",
    type: "시대인재",
    priceRange: "",
    walkTime: 3,
    features: ["수학 1타", "단과 특화"],
    description: "수학 단과 특화관. '수학 1타' 강사들의 전용 강의실 배치",
    address: "서울 강남구 대치동 1021-14",
    naverMapUrl: "https://map.naver.com/p?c=127.059270,37.497870,17,0,0,0,dh",
    lat: 37.497870,
    lng: 127.059270,
  },
  {
    id: 21,
    name: "시대인재 더스톤 (두각)",
    type: "시대인재",
    priceRange: "",
    walkTime: 5,
    features: ["두각 브랜드", "최상위권"],
    description: "시대인재와 강남대성이 합작한 '두각' 브랜드 및 최상위권 단과",
    address: "서울 강남구 대치동 940-8",
    naverMapUrl: "https://map.naver.com/p?c=127.058464,37.498485,17,0,0,0,dh",
    lat: 37.498485,
    lng: 127.058464,
  },
  {
    id: 22,
    name: "시대인재 수학스쿨",
    type: "시대인재",
    priceRange: "",
    walkTime: 3,
    features: ["수학 단과"],
    description: "수학 단과 전용 강의관",
    address: "서울 강남구 대치동 1021-3",
    naverMapUrl: "https://map.naver.com/p?c=127.059751,37.498153,17,0,0,0,dh",
    lat: 37.498153,
    lng: 127.059751,
  },
  {
    id: 23,
    name: "시대인재 엣지관",
    type: "시대인재",
    priceRange: "",
    walkTime: 3,
    features: ["스타 강사"],
    description: "특정 스타 강사 전용관 또는 테마별 단과 강의실",
    address: "서울 강남구 대치동 1021-5",
    naverMapUrl: "https://map.naver.com/p?c=127.060056,37.498334,17,0,0,0,dh",
    lat: 37.498334,
    lng: 127.060056,
  },
  {
    id: 24,
    name: "시대인재 H관",
    type: "시대인재",
    priceRange: "",
    walkTime: 4,
    features: ["인문계", "반수반"],
    description: "인문계 재수종합반 및 반수반 특화 공간",
    address: "서울 강남구 대치동 941-21",
    naverMapUrl: "https://map.naver.com/p?c=127.059918,37.498995,17,0,0,0,dh",
    lat: 37.498995,
    lng: 127.059918,
  },
  {
    id: 25,
    name: "시대인재 대덕관3",
    type: "시대인재",
    priceRange: "",
    walkTime: 4,
    features: ["단과"],
    description: "단과 강의 전용관",
    address: "서울 강남구 대치동 941-22",
    naverMapUrl: "https://map.naver.com/p?c=127.059731,37.498920,17,0,0,0,dh",
    lat: 37.498920,
    lng: 127.059731,
  },
  {
    id: 26,
    name: "시대인재 W관",
    type: "시대인재",
    priceRange: "",
    walkTime: 3,
    features: ["재수종합반", "부엉이 라이브러리"],
    description: "재수종합반 전용관. 층별로 거대한 부엉이 라이브러리 구축",
    address: "서울 강남구 대치동 1021-8",
    naverMapUrl: "https://map.naver.com/p?c=127.060615,37.498439,17,0,0,0,dh",
    lat: 37.498439,
    lng: 127.060615,
  },
  {
    id: 27,
    name: "시대인재 S관",
    type: "시대인재",
    priceRange: "",
    walkTime: 2,
    features: ["인문계", "재수종합반"],
    description: "인문계 재수종합반 및 반수반 특화 공간",
    address: "서울 강남구 대치동 1019",
    naverMapUrl: "https://map.naver.com/p?c=127.060476,37.498002,17,0,0,0,dh",
    lat: 37.498002,
    lng: 127.060476,
  },
  {
    id: 28,
    name: "시대인재 농협관",
    type: "시대인재",
    priceRange: "",
    walkTime: 2,
    features: ["단과"],
    description: "단과 강의 전용관",
    address: "서울 강남구 대치동 1019-1",
    naverMapUrl: "https://map.naver.com/p?c=127.060848,37.497940,17,0,0,0,dh",
    lat: 37.497940,
    lng: 127.060848,
  },
  {
    id: 29,
    name: "시대인재 해석관",
    type: "시대인재",
    priceRange: "",
    walkTime: 2,
    features: ["단과"],
    description: "단과 강의 전용관",
    address: "서울 강남구 대치동 1019-13",
    naverMapUrl: "https://map.naver.com/p?c=127.061011,37.497864,17,0,0,0,dh",
    lat: 37.497864,
    lng: 127.061011,
  },
  {
    id: 30,
    name: "시대인재 신관 (카이로스)",
    type: "시대인재",
    priceRange: "",
    walkTime: 2,
    features: ["자연계", "부엉이 라이브러리"],
    description: "재수종합반(자연계) 메인 거점 및 대형 부엉이 라이브러리",
    address: "서울 강남구 대치동 611",
    naverMapUrl: "https://map.naver.com/p?c=127.060547,37.496367,17,0,0,0,dh",
    lat: 37.496367,
    lng: 127.060547,
  },
  {
    id: 31,
    name: "시대인재 트러스관",
    type: "시대인재",
    priceRange: "",
    walkTime: 5,
    features: ["스타 강사"],
    description: "특정 스타 강사(예: 김은양 등) 전용관 또는 테마별 단과 강의실",
    address: "서울 강남구 대치동 988-1",
    naverMapUrl: "https://map.naver.com/p?c=127.060727,37.500015,17,0,0,0,dh",
    lat: 37.500015,
    lng: 127.060727,
  },
  {
    id: 32,
    name: "시대인재 브릿지관",
    type: "시대인재",
    priceRange: "",
    walkTime: 4,
    features: ["단과"],
    description: "단과 강의 전용관",
    address: "서울 강남구 대치동 988-18",
    naverMapUrl: "https://map.naver.com/p?c=127.061403,37.499481,17,0,0,0,dh",
    lat: 37.499481,
    lng: 127.061403,
  },
  {
    id: 33,
    name: "시대인재 N관",
    type: "시대인재",
    priceRange: "",
    walkTime: 4,
    features: ["재수종합반", "부엉이 라이브러리"],
    description: "재수종합반 전용관. 층별로 거대한 부엉이 라이브러리 구축",
    address: "서울 강남구 대치동 988-15",
    naverMapUrl: "https://map.naver.com/p?c=127.061670,37.499588,17,0,0,0,dh",
    lat: 37.499588,
    lng: 127.061670,
  },
  {
    id: 34,
    name: "시대인재 중등 수학스쿨",
    type: "시대인재",
    priceRange: "",
    walkTime: 3,
    features: ["중등부", "수학"],
    description: "중등부 수학 단과 전용관",
    address: "서울 강남구 대치동 989-5",
    naverMapUrl: "https://map.naver.com/p?c=127.062034,37.498748,17,0,0,0,dh",
    lat: 37.498748,
    lng: 127.062034,
  },
  {
    id: 35,
    name: "시대인재 7관",
    type: "시대인재",
    priceRange: "",
    walkTime: 4,
    features: ["단과"],
    description: "단과 강의 전용관",
    address: "서울 강남구 대치동 990",
    naverMapUrl: "https://map.naver.com/p?c=127.063067,37.499240,17,0,0,0,dh",
    lat: 37.499240,
    lng: 127.063067,
  },
  {
    id: 36,
    name: "시대인재 M3관",
    type: "시대인재",
    priceRange: "",
    walkTime: 6,
    features: ["스타 강사"],
    description: "특정 스타 강사 전용관 또는 테마별 단과 강의실",
    address: "서울 강남구 대치동 986-8",
    naverMapUrl: "https://map.naver.com/p?c=127.063980,37.500336,17,0,0,0,dh",
    lat: 37.500336,
    lng: 127.063980,
  },
  {
    id: 37,
    name: "시대인재 A관",
    type: "시대인재",
    priceRange: "",
    walkTime: 6,
    features: ["단과"],
    description: "단과 강의 전용관",
    address: "서울 강남구 대치동 974-1",
    naverMapUrl: "https://map.naver.com/p?c=127.060137,37.500889,17,0,0,0,dh",
    lat: 37.500889,
    lng: 127.060137,
  },
  {
    id: 38,
    name: "시대인재 5관",
    type: "시대인재",
    priceRange: "",
    walkTime: 8,
    features: ["단과"],
    description: "단과 강의 전용관",
    address: "서울 강남구 대치동 962-23",
    naverMapUrl: "https://map.naver.com/p?c=127.059714,37.501870,17,0,0,0,dh",
    lat: 37.501870,
    lng: 127.059714,
  },
  {
    id: 39,
    name: "시대인재 특목관",
    type: "시대인재",
    priceRange: "",
    walkTime: 7,
    features: ["특목/자사고"],
    description: "특목고/자사고 대비반 전용관",
    address: "서울 강남구 대치동 931-20",
    naverMapUrl: "https://map.naver.com/p?c=127.059403,37.501053,17,0,0,0,dh",
    lat: 37.501053,
    lng: 127.059403,
  },
  {
    id: 40,
    name: "시대인재 W관 (북)",
    type: "시대인재",
    priceRange: "",
    walkTime: 8,
    features: ["재수종합반"],
    description: "재수종합반 전용관",
    address: "서울 강남구 대치동 913-16",
    naverMapUrl: "https://map.naver.com/p?c=127.058959,37.501706,17,0,0,0,dh",
    lat: 37.501706,
    lng: 127.058959,
  },
  {
    id: 41,
    name: "시대인재 서바이벌관",
    type: "시대인재",
    priceRange: "",
    walkTime: 3,
    features: ["서바이벌", "콘텐츠"],
    description: "시대인재N 서바이벌 시즌 전용 콘텐츠관",
    address: "서울 강남구 대치동 989-2",
    naverMapUrl: "https://map.naver.com/p?c=127.061951,37.498927,17,0,0,0,dh",
    lat: 37.498927,
    lng: 127.061951,
  },
  {
    id: 42,
    name: "시대인재 2관",
    type: "시대인재",
    priceRange: "",
    walkTime: 3,
    features: ["단과"],
    description: "단과 강의 전용관",
    address: "서울 강남구 대치동 989-2",
    naverMapUrl: "https://map.naver.com/p?c=127.061951,37.498927,17,0,0,0,dh",
    lat: 37.498927,
    lng: 127.061951,
  },
  // 강남대성/두각
  {
    id: 43,
    name: "강남대성SII대치",
    type: "강남대성/두각",
    priceRange: "",
    walkTime: 5,
    features: ["재수종합반", "강남대성"],
    description: "강남대성학원 대치 캠퍼스",
    address: "서울 강남구 대치동 940-8",
    naverMapUrl: "https://map.naver.com/p?c=127.058472,37.498528,17,0,0,0,dh",
    lat: 37.498528,
    lng: 127.058472,
  },
  {
    id: 44,
    name: "두각K관",
    type: "강남대성/두각",
    priceRange: "",
    walkTime: 6,
    features: ["두각", "최상위권"],
    description: "시대인재와 강남대성 합작 '두각' 브랜드",
    address: "서울 강남구 대치동 1023-1",
    naverMapUrl: "https://map.naver.com/p?c=127.056724,37.497299,17,0,0,0,dh",
    lat: 37.497299,
    lng: 127.056724,
  },
  {
    id: 45,
    name: "두각 우전관",
    type: "강남대성/두각",
    priceRange: "",
    walkTime: 3,
    features: ["두각", "최상위권"],
    description: "시대인재와 강남대성 합작 '두각' 브랜드",
    address: "서울 강남구 대치동 1021-14",
    naverMapUrl: "https://map.naver.com/p?c=127.059245,37.497867,17,0,0,0,dh",
    lat: 37.497867,
    lng: 127.059245,
  },
];

export default function AcademyMapPage() {
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set(["독학관리/독학재수"]));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedAcademy, setSelectedAcademy] = useState<StudyAcademy | null>(null);
  const [highlightedAcademyId, setHighlightedAcademyId] = useState<number | null>(null);
  const [clickedAcademyId, setClickedAcademyId] = useState<number | null>(null); // 클릭된 학원만 표시
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // XOR 토글 함수
  const toggleType = (type: string) => {
    // 필터 변경 시 클릭된 학원 초기화
    setClickedAcademyId(null);

    if (type === "전체") {
      // 전체 선택/해제
      const allTypes = ["독학관리/독학재수", "시대인재", "강남대성/두각"];
      const isAllSelected = allTypes.every(t => selectedTypes.has(t));
      if (isAllSelected) {
        setSelectedTypes(new Set()); // 모두 해제
      } else {
        setSelectedTypes(new Set(allTypes)); // 모두 선택
      }
    } else {
      setSelectedTypes(prev => {
        const newSet = new Set(prev);
        if (newSet.has(type)) {
          newSet.delete(type);
        } else {
          newSet.add(type);
        }
        return newSet;
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ESC 키로 전체화면 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // 전체화면 모드일 때 스크롤 방지
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // 마커 클릭 시 해당 학원만 표시
  const handleMarkerClick = useCallback((marker: MapMarker) => {
    const academy = academies.find(a => a.id === marker.id);
    if (academy) {
      setSelectedAcademy(academy);

      // 전체화면이 아닌 경우, 해당 학원만 표시
      if (!isFullscreen) {
        // 해당 학원 타입이 선택되어 있지 않으면 선택
        if (!selectedTypes.has(academy.type)) {
          setSelectedTypes(prev => {
            const newSet = new Set(prev);
            newSet.add(academy.type);
            return newSet;
          });
        }

        // 클릭된 학원만 표시
        setClickedAcademyId(academy.id);
        setHighlightedAcademyId(academy.id);

        // 3초 후 하이라이트 제거 (카드는 계속 표시)
        setTimeout(() => {
          setHighlightedAcademyId(null);
        }, 3000);
      }
    }
  }, [isFullscreen, selectedTypes]);

  // 전체 보기로 돌아가기
  const clearClickedAcademy = useCallback(() => {
    setClickedAcademyId(null);
    setHighlightedAcademyId(null);
  }, []);

  const types = ["전체", "독학관리/독학재수", "시대인재", "강남대성/두각"];

  // 전체 선택 여부 확인
  const allTypes = ["독학관리/독학재수", "시대인재", "강남대성/두각"];
  const isAllSelected = allTypes.every(t => selectedTypes.has(t));

  // 클릭된 학원이 있으면 해당 학원만, 없으면 필터된 전체 학원 표시
  const filteredAcademies = clickedAcademyId
    ? academies.filter(a => a.id === clickedAcademyId)
    : selectedTypes.size === 0
      ? []
      : academies.filter(a => selectedTypes.has(a.type));

  // 유형별 배지 색상
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case '독학관리/독학재수':
        return 'bg-emerald-100 text-emerald-700';
      case '시대인재':
        return 'bg-amber-100 text-amber-700';
      case '강남대성/두각':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // 지도에 표시할 마커 데이터
  const mapMarkers: MapMarker[] = filteredAcademies.map(a => ({
    id: a.id,
    name: a.name,
    lat: a.lat,
    lng: a.lng,
    category: a.type,
    walkTime: 0,
    priceRange: a.priceRange,
    infoContent: `
      <div style="padding: 12px; min-width: 180px;">
        <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: bold;">${a.name}</h4>
        <p style="margin: 0 0 4px 0; color: #666; font-size: 12px;">${a.type}</p>
        ${a.priceRange ? `<p style="margin: 0; color: #16A34A; font-size: 12px; font-weight: 500;">${a.priceRange}</p>` : ''}
      </div>
    `,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Campus Life</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              대치 재수학원 가격 지도
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              Feat. 독학재수/독학관리 학원
            </p>
            <p className="text-lg text-gray-600">
              개발자가 시장상황 조사하다가 답답해서 직접 만들었어요.<br />
              시장분석용으로 만들었는데, 학부모님들이나 학생들이 정보 확보에 좋을 것 같아서 공개합니다!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              2026년 2월 기준 | 가격 및 정보는 변동될 수 있습니다
            </p>
          </div>

          {/* 지도 섹션 */}
          <div className="mb-8 relative">
            {/* 전체화면 버튼 */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md hover:bg-white transition-all flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              전체화면
            </button>
            <NaverMap
              markers={mapMarkers}
              centerLat={ACADEMY_LAT}
              centerLng={ACADEMY_LNG}
              zoom={16}
              height="500px"
              onMarkerClick={handleMarkerClick}
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              📍 SN고요의숲 | 📚 독학관리/독학재수 | 🏢 시대인재 | 🏛️ 강남대성/두각
            </p>
          </div>

          {/* 유형 필터 (XOR 토글) */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {types.map((type) => {
              const isActive = type === "전체" ? isAllSelected : selectedTypes.has(type);
              return (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-sn-green text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-sn-green hover:text-sn-green"
                  }`}
                >
                  {type}
                </button>
              );
            })}
            {/* 클릭된 학원이 있을 때 전체 보기 버튼 */}
            {clickedAcademyId && (
              <button
                onClick={clearClickedAcademy}
                className="px-4 py-2 rounded-full text-sm font-medium bg-rose-500 text-white hover:bg-rose-600 transition-all flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                전체 보기
              </button>
            )}
          </div>

          {/* 시대인재 정보 */}
          {selectedTypes.has("시대인재") && (
            <>
              <div className="mb-4 bg-slate-100 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💡</span>
                  <p className="text-slate-700 text-sm">이 지도는 본원에서 시대인재 단과를 듣는 학생들의 정보 제공을 위해서 제작되었습니다.</p>
                </div>
              </div>
              <div className="mb-8 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-700 px-6 py-3">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    🏢 시대인재 가격 구조 (2025~2026 기준)
                  </h3>
                </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-6">
                  시대인재의 가격은 <strong>&apos;재수종합(N-Academy)&apos;</strong>과 <strong>&apos;고등부 단과&apos;</strong>로 나뉩니다.
                  특히 재수종합반은 단순 수강료 외에 콘텐츠비와 라이브러리 이용료가 핵심입니다.
                </p>

                {/* 재수종합반 */}
                <div className="mb-6">
                  <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-slate-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                    시대인재N (재수종합반) 월평균 비용
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">기본 수강료</span>
                        <span className="font-bold text-slate-700">월 150~200만원</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">수업료 + 관리비</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">부엉이 라이브러리</span>
                        <span className="font-bold text-slate-700">월 50~60만원</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">지정 좌석제 자습실</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">콘텐츠비 (서바이벌 등)</span>
                        <span className="font-bold text-slate-700">월 20~40만원</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">시즌별 상이</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">급식비</span>
                        <span className="font-bold text-slate-700">월 35~45만원</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">1끼당 약 8,500~9,000원</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-slate-100 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">월 합계</span>
                      <span className="font-bold text-xl text-slate-700">280~350만원</span>
                    </div>
                  </div>
                </div>

                {/* 고등부 단과 */}
                <div>
                  <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-slate-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                    고등부 단과 비용
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">수강료</span>
                        <span className="font-bold text-slate-700">과목당 월 25~35만원</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">4주 기준</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">교재 및 자료비</span>
                        <span className="font-bold text-slate-700">월 5~15만원</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">강사별로 상이</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </>
          )}

          {/* SN고요의숲 카드 - 독학관리/독학재수 선택 시 & 클릭된 학원 없을 때 */}
          {selectedTypes.has("독학관리/독학재수") && !clickedAcademyId && (
            <div className="mb-8 bg-gradient-to-br from-sn-green/5 to-emerald-50 rounded-xl border-2 border-sn-green shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* 이미지 */}
                  <div className="w-full md:w-48 h-32 md:h-auto rounded-lg overflow-hidden flex-shrink-0">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: "url('/image/인테리어/SNAI_outerior.png')" }}
                    />
                  </div>
                  {/* 정보 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-sn-green">SN고요의숲</h3>
                      <span className="px-3 py-1 bg-sn-green text-white text-xs rounded-full font-medium">AI특화관</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-sn-green/10 text-sn-green text-xs rounded font-medium">독학관리</span>
                      <span className="px-2 py-1 bg-sn-green/10 text-sn-green text-xs rounded font-medium">AI 학습 도구</span>
                      <span className="px-2 py-1 bg-sn-green/10 text-sn-green text-xs rounded font-medium">1:1 맞춤 관리</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      AI 기반 학습 분석과 체계적인 독학관리를 제공하는 프리미엄 독학재수 학원입니다.
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-sn-green">80만원</p>
                        <p className="text-xs text-gray-500">월 수강료</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">서울 강남구 대치동 447</p>
                        <p className="text-xs text-gray-500">대치역 도보 5분</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 클릭된 학원 카드 */}
          {clickedAcademyId && filteredAcademies.length > 0 && (
            <div className="space-y-4">
              {filteredAcademies.map((academy) => (
                    <div
                      key={academy.id}
                      ref={(el) => { cardRefs.current[academy.id] = el; }}
                  className={`bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all ${
                    highlightedAcademyId === academy.id
                      ? "border-sn-green border-2 ring-4 ring-sn-green/20"
                      : "border-gray-200"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* 왼쪽: 기본 정보 */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{academy.name}</h3>
                          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getTypeBadgeColor(academy.type)}`}>
                            {academy.type}
                          </span>
                        </div>

                        {/* 특징 태그 */}
                        {academy.features.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {academy.features.map((feature, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-gray-600 text-sm mb-2">{academy.description}</p>

                        {academy.phone && (
                          <p className="text-gray-500 text-sm">
                            <span className="font-medium">연락처:</span> {academy.phone}
                          </p>
                        )}
                      </div>

                      {/* 오른쪽: 가격 & 도보시간 & 정원 */}
                      <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                        {/* 가격대 */}
                        {academy.priceRange && (
                          <div className="text-sm font-medium text-sn-green">
                            {academy.priceRange}
                          </div>
                        )}

                        {/* 도보 시간 (시대인재, 강남대성/두각만) */}
                        {academy.walkTime && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded text-xs text-blue-700">
                            <span>🚶</span>
                            <span className="font-medium">{academy.walkTime}분</span>
                          </div>
                        )}

                        {/* 정원 */}
                        {academy.capacity && (
                          <div className="text-sm text-gray-500">
                            정원 {academy.capacity}명
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 하단: 주소 & 지도 링크 */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-sm text-gray-500">{academy.address}</span>
                      {academy.naverMapUrl && (
                        <a
                          href={academy.naverMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-sn-green hover:underline"
                        >
                          {academy.type === "독학관리/독학재수" ? "홈페이지 바로가기" : "네이버 지도에서 보기"}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 안내 */}
          <div className="mt-12 p-6 bg-sn-green/10 rounded-xl border border-sn-green/30">
            <p className="text-center text-gray-700">
              <span className="font-semibold text-sn-green">학원 정보 안내</span><br />
              <span className="text-sm">
                이 페이지는 대치동 주변 독학관리 및 독학재수 학원 정보를 제공합니다.<br />
                정확한 비용과 프로그램은 각 학원에 직접 문의해주세요.
              </span>
            </p>
          </div>

          {/* 면책 조항 */}
          <div className="mt-6 text-center text-gray-500 text-xs">
            <p>
              본 정보는 네이버맵의 정보를 가지고 AI가 공개된 자료를 바탕으로 만들었습니다.<br />
              잘못된 정보는 본원 메일로 문의해 주시면 바로 수정하겠습니다.<br />
              <a href="mailto:snacademy@naver.com" className="text-sn-green hover:underline">snacademy@naver.com</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {/* 전체화면 모달 */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black">
          {/* 상단 컨트롤 바 */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <h2 className="text-white font-bold text-lg">대치 독학관리 학원 지도</h2>
              <button
                onClick={() => setIsFullscreen(false)}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                닫기 (ESC)
              </button>
            </div>
          </div>

          {/* 필터 버튼 (상단 왼쪽) - XOR 토글 */}
          <div className="absolute top-16 left-4 z-10 flex flex-wrap gap-2 max-w-[calc(100%-200px)]">
            {types.map((type) => {
              const isActive = type === "전체" ? isAllSelected : selectedTypes.has(type);
              return (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-lg ${
                    isActive
                      ? "bg-sn-green text-white"
                      : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* 전체화면 지도 */}
          <NaverMap
            markers={mapMarkers}
            centerLat={EUNMA_CENTER_LAT}
            centerLng={EUNMA_CENTER_LNG}
            zoom={17}
            height="100vh"
            onMarkerClick={handleMarkerClick}
          />

          {/* 선택된 학원 정보 카드 (하단) */}
          {selectedAcademy && (
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-2xl shadow-2xl max-h-[40vh] overflow-y-auto animate-slide-up">
              {/* 드래그 핸들 */}
              <div className="flex justify-center py-2 sticky top-0 bg-white">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              <div className="px-4 pb-6">
                {/* 닫기 버튼 */}
                <button
                  onClick={() => setSelectedAcademy(null)}
                  className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* 학원 정보 */}
                <div className="flex items-start gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{selectedAcademy.name}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getTypeBadgeColor(selectedAcademy.type)}`}>
                    {selectedAcademy.type}
                  </span>
                </div>

                {/* 특징 태그 */}
                {selectedAcademy.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedAcademy.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-600 text-sm mb-3">{selectedAcademy.description}</p>

                {/* 정보 그리드 */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {selectedAcademy.priceRange && (
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-green-600 mb-1">가격대</p>
                      <p className="text-green-700 font-bold text-sm">{selectedAcademy.priceRange}</p>
                    </div>
                  )}
                  {selectedAcademy.walkTime && (
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-600 mb-1">SN고요의숲에서</p>
                      <p className="text-blue-700 font-bold">🚶 {selectedAcademy.walkTime}분</p>
                    </div>
                  )}
                  {selectedAcademy.capacity && (
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-purple-600 mb-1">정원</p>
                      <p className="text-purple-700 font-bold">{selectedAcademy.capacity}명</p>
                    </div>
                  )}
                </div>

                {/* 주소 & 연락처 */}
                <div className="space-y-2 text-sm">
                  <p className="text-gray-500">
                    <span className="font-medium text-gray-700">주소:</span> {selectedAcademy.address}
                  </p>
                  {selectedAcademy.phone && (
                    <p className="text-gray-500">
                      <span className="font-medium text-gray-700">연락처:</span>{' '}
                      <a href={`tel:${selectedAcademy.phone}`} className="text-sn-green hover:underline">
                        {selectedAcademy.phone}
                      </a>
                    </p>
                  )}
                </div>

                {/* 버튼 */}
                <div className="mt-4 flex gap-2">
                  {selectedAcademy.phone && (
                    <a
                      href={`tel:${selectedAcademy.phone}`}
                      className="flex-1 py-2.5 bg-sn-green text-white text-center rounded-lg font-medium hover:bg-sn-green-dark transition-colors"
                    >
                      전화 문의
                    </a>
                  )}
                  {selectedAcademy.naverMapUrl && (
                    <a
                      href={selectedAcademy.naverMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-center rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      {selectedAcademy.type === "독학관리/독학재수" ? "홈페이지" : "네이버 지도"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 범례 (우측 하단) */}
          <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg text-xs hidden md:block">
            <p className="font-medium text-gray-700 mb-2">범례</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[10px]">📚</span>
                <span className="text-gray-600">독학관리/독학재수</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[10px]">🏢</span>
                <span className="text-gray-600">시대인재</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[10px]">🏛️</span>
                <span className="text-gray-600">강남대성/두각</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
