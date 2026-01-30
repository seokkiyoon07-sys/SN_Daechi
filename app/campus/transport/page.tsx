'use client';

import { useEffect } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NaverMap, { MapMarker } from "@/components/NaverMap";

// 학원 위치: 대치동 447
const ACADEMY_LAT = 37.496898;
const ACADEMY_LNG = 127.061648;

interface TransportStation {
  id: number;
  name: string;
  type: 'subway' | 'bus';
  line?: string;
  walkTime: number;
  lat: number;
  lng: number;
  description: string;
}

const stations: TransportStation[] = [
  {
    id: 1,
    name: "대치역",
    type: "subway",
    line: "3호선",
    walkTime: 5,
    lat: 37.4947,
    lng: 127.0635,
    description: "3호선 대치역 1번 출구에서 도보 5분"
  },
  {
    id: 2,
    name: "한티역",
    type: "subway",
    line: "분당선",
    walkTime: 8,
    lat: 37.496301,
    lng: 127.052861,
    description: "분당선 한티역 3번 출구에서 도보 8분"
  },
  {
    id: 3,
    name: "선릉역",
    type: "subway",
    line: "2호선/분당선",
    walkTime: 15,
    lat: 37.5045,
    lng: 127.0490,
    description: "2호선/분당선 선릉역에서 도보 15분"
  },
  {
    id: 4,
    name: "농협대치지점",
    type: "bus",
    walkTime: 2,
    lat: 37.497922,
    lng: 127.061195,
    description: "간선: 143, 333, 420, 461 / 지선: 2413, 2415, 3011, 4312, 4425"
  },
  {
    id: 5,
    name: "대치SKview·서울교회",
    type: "bus",
    walkTime: 1,
    lat: 37.496406,
    lng: 127.062010,
    description: "간선: 143, 333, 420, 461 / 지선: 2413, 2415, 3011, 4312, 4425"
  },
  {
    id: 6,
    name: "은마아파트",
    type: "bus",
    walkTime: 2,
    lat: 37.495785,
    lng: 127.062847,
    description: "간선: 143, 333, 420, 461 / 지선: 2413, 3011, 4312, 4425"
  },
];

export default function TransportPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 버스 노선 정보를 파싱하여 색상 아이콘 HTML 생성
  const parseBusInfo = (description: string) => {
    const parts = description.split(' / ');
    let html = '';
    parts.forEach(part => {
      if (part.startsWith('간선:')) {
        const buses = part.replace('간선:', '').trim();
        html += `<div style="margin-bottom: 4px;"><span style="display: inline-block; background: #3B82F6; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-right: 4px;">🚌 간선</span><span style="color: #3B82F6; font-size: 11px;">${buses}</span></div>`;
      } else if (part.startsWith('지선:')) {
        const buses = part.replace('지선:', '').trim();
        html += `<div><span style="display: inline-block; background: #22C55E; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-right: 4px;">🚌 지선</span><span style="color: #22C55E; font-size: 11px;">${buses}</span></div>`;
      }
    });
    return html;
  };

  // 지도 마커 데이터 변환
  const mapMarkers: MapMarker[] = stations.map(s => ({
    id: s.id,
    name: s.name,
    lat: s.lat,
    lng: s.lng,
    category: s.type === 'subway' ? '지하철' : '버스',
    walkTime: s.walkTime,
    infoContent: s.type === 'bus' ? `
      <div style="padding: 12px; min-width: 200px;">
        <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">${s.name}</h4>
        ${parseBusInfo(s.description)}
        <p style="margin: 8px 0 0 0; color: #888; font-size: 11px;">🚶 도보 ${s.walkTime}분</p>
      </div>
    ` : `
      <div style="padding: 12px; min-width: 180px;">
        <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: bold;">${s.name}</h4>
        <p style="margin: 0; color: #3B82F6; font-size: 12px; font-weight: 500;">${s.line}</p>
        <p style="margin: 4px 0 0 0; color: #888; font-size: 11px;">🚶 도보 ${s.walkTime}분</p>
      </div>
    `,
  }));

  const subwayStations = stations.filter(s => s.type === 'subway');
  const busStations = stations.filter(s => s.type === 'bus');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">
              Campus Life
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              오시는 길
            </h1>
            <p className="text-lg text-gray-600">
              SN-고요의숲 대치까지 오는 대중교통 안내
            </p>
          </div>

          {/* 학원 정보 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
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
                  <a href="tel:010-5862-3838" className="text-sn-green hover:underline text-sm">010-5862-3838</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-sn-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">운영시간</p>
                  <p className="text-gray-600 text-sm">월~토: 08:00 ~ 22:00</p>
                  <p className="text-gray-600 text-sm">일: 09:00 ~ 18:00</p>
                  <p className="text-gray-500 text-xs mt-1">(설날, 추석 당일 휴무)</p>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 */}
          <div className="mb-8">
            <NaverMap
              markers={mapMarkers}
              centerLat={ACADEMY_LAT}
              centerLng={ACADEMY_LNG}
              zoom={15}
              height="500px"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              🟢 SN고요의숲 | 🔵 지하철역 | 🟠 버스정류장
            </p>
          </div>

          {/* 지하철 안내 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-4 4m4-4l4 4" />
                </svg>
              </span>
              지하철
            </h3>
            <div className="space-y-3">
              {subwayStations.map((station) => (
                <div
                  key={station.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{station.name}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          station.line?.includes('3호선') ? 'bg-orange-100 text-orange-700' :
                          station.line?.includes('2호선') ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {station.line}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{station.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-blue-600 font-bold">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {station.walkTime}분
                      </div>
                      <span className="text-xs text-gray-500">도보</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 버스 안내 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 4h8m-6 4h4" />
                </svg>
              </span>
              버스
            </h3>
            <div className="space-y-3">
              {busStations.map((station) => {
                const parts = station.description.split(' / ');
                const ganson = parts.find(p => p.startsWith('간선:'))?.replace('간선:', '').trim();
                const jison = parts.find(p => p.startsWith('지선:'))?.replace('지선:', '').trim();
                return (
                  <div
                    key={station.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-gray-900 mb-2 block">{station.name}</span>
                        <div className="space-y-1">
                          {ganson && (
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded font-medium">
                                🚌 간선
                              </span>
                              <span className="text-sm text-blue-600">{ganson}</span>
                            </div>
                          )}
                          {jison && (
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500 text-white text-xs rounded font-medium">
                                🚌 지선
                              </span>
                              <span className="text-sm text-green-600">{jison}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-orange-600 font-bold">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          {station.walkTime}분
                        </div>
                        <span className="text-xs text-gray-500">도보</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 추천 경로 */}
          <div className="bg-gradient-to-br from-sn-green/10 to-sn-green/5 rounded-xl border border-sn-green/20 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-sn-green">★</span> 추천 경로
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900">3호선 대치역 이용 (가장 빠름)</p>
                  <p className="text-sm text-gray-600">1번 출구 → 직진 300m → SN-고요의숲 도착</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  K
                </div>
                <div>
                  <p className="font-medium text-gray-900">분당선 한티역 이용</p>
                  <p className="text-sm text-gray-600">3번 출구 → 대치사거리 방면 → 도보 8분</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
