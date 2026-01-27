'use client';

import { useEffect, useRef } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from 'next/script';

declare global {
  interface Window {
    naver: any;
  }
}

export default function MenuPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initMap = () => {
    if (!mapRef.current || !window.naver) return;

    // 네이버 지도 생성 - 주소 기반
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.4946, 127.0586), // 대치동 대략적 좌표
      zoom: 16,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: window.naver.maps.MapTypeControlStyle.BUTTON,
        position: window.naver.maps.Position.TOP_RIGHT
      },
      zoomControl: true,
      zoomControlOptions: {
        style: window.naver.maps.ZoomControlStyle.SMALL,
        position: window.naver.maps.Position.TOP_RIGHT
      }
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);

    // 학원 위치 마커
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(37.4946, 127.0586),
      map: map,
      title: 'SN 고요의숲 대치'
    });

    // 주소로 좌표 검색 (Geocoding)
    window.naver.maps.Service.geocode(
      { query: '서울특별시 강남구 대치동 447' },
      function(status: any, response: any) {
        if (status !== window.naver.maps.Service.Status.OK) {
          console.log('Geocoding error');
          return;
        }

        const result = response.v2.addresses[0];
        if (result) {
          const point = new window.naver.maps.LatLng(result.y, result.x);
          map.setCenter(point);
          marker.setPosition(point);
        }
      }
    );

    // 인포윈도우
    const infoWindow = new window.naver.maps.InfoWindow({
      content: `
        <div style="padding: 15px; min-width: 200px;">
          <h3 style="margin: 0 0 8px; font-weight: bold; color: #1a1a1a;">SN 고요의숲 대치</h3>
          <p style="margin: 0; font-size: 13px; color: #666;">서울특별시 강남구 대치동 447</p>
        </div>
      `
    });

    window.naver.maps.Event.addListener(marker, 'click', function() {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=39m5xtkj2f&submodules=geocoder`}
        strategy="afterInteractive"
        onLoad={initMap}
      />
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Campus Life</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              대치동 맛집지도
            </h1>
            <p className="text-lg text-gray-600">
              학원 주변 추천 맛집을 확인하세요
            </p>
          </div>

          {/* 네이버 지도 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div
              ref={mapRef}
              className="w-full h-[400px] md:h-[500px]"
              style={{ minHeight: '400px' }}
            />
          </div>

          {/* 학원 위치 안내 */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-sn-green/10 rounded-xl flex items-center justify-center text-sn-green">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">SN 고요의숲 대치</h2>
                <p className="text-gray-600">서울특별시 강남구 대치동 447</p>
                <a
                  href="https://map.naver.com/p/search/서울특별시 강남구 대치동 447"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-sm text-sn-green hover:underline"
                >
                  네이버 지도에서 보기
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 맛집 정보 안내 */}
          <div className="bg-sn-green/10 rounded-xl border border-sn-green/30 p-6">
            <p className="text-center text-gray-700">
              <span className="font-semibold text-sn-green">맛집 정보 준비중</span><br />
              <span className="text-sm">학원 주변 추천 맛집 정보가 곧 업데이트될 예정입니다.</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
