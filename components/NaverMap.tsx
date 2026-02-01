'use client';

import { useEffect, useRef, useState } from 'react';

// Naver Maps 타입 선언
declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (element: HTMLElement, options: NaverMapOptions) => NaverMapInstance;
        LatLng: new (lat: number, lng: number) => NaverLatLng;
        Marker: new (options: NaverMarkerOptions) => NaverMarker;
        InfoWindow: new (options: NaverInfoWindowOptions) => NaverInfoWindow;
        Event: {
          addListener: (target: NaverMarker, event: string, callback: () => void) => void;
        };
      };
    };
  }
}

interface NaverLatLng {
  lat(): number;
  lng(): number;
}

interface NaverMapOptions {
  center: NaverLatLng;
  zoom: number;
  zoomControl?: boolean;
  zoomControlOptions?: {
    position: number;
  };
}

interface NaverMapInstance {
  setCenter(latlng: NaverLatLng): void;
  setZoom(zoom: number): void;
}

interface NaverMarkerOptions {
  position: NaverLatLng;
  map: NaverMapInstance;
  title?: string;
  zIndex?: number;
  icon?: {
    content: string;
    anchor: { x: number; y: number };
  };
}

interface NaverMarker {
  setMap(map: NaverMapInstance | null): void;
  getPosition(): NaverLatLng;
}

interface NaverInfoWindowOptions {
  content: string;
  maxWidth?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  anchorSize?: { width: number; height: number };
  anchorSkew?: boolean;
  anchorColor?: string;
  pixelOffset?: { x: number; y: number };
}

interface NaverInfoWindow {
  open(map: NaverMapInstance, marker: NaverMarker): void;
  close(): void;
}

export interface MapMarker {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: string;
  walkTime: number;
  infoContent?: string;
  priceRange?: string;
}

interface NaverMapProps {
  markers?: MapMarker[];
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  height?: string;
  onMarkerClick?: (marker: MapMarker) => void;
}

export default function NaverMap({
  markers = [],
  centerLat = 37.496898, // 대치동 447 기준 좌표
  centerLng = 127.061648,
  zoom = 16,
  height = '400px',
  onMarkerClick,
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<NaverMapInstance | null>(null);
  const markersRef = useRef<NaverMarker[]>([]);
  const currentInfoWindowRef = useRef<NaverInfoWindow | null>(null);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

    if (!clientId) {
      setError('네이버 지도 Client ID가 설정되지 않았습니다.');
      return;
    }

    // 이미 스크립트가 로드되어 있는지 확인
    if (window.naver && window.naver.maps) {
      setIsLoaded(true);
      return;
    }

    // 스크립트 로드
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
    script.async = true;

    script.onload = () => {
      // 스크립트 로드 후 약간의 딜레이를 주어 naver 객체가 초기화되도록 함
      setTimeout(() => {
        if (window.naver && window.naver.maps) {
          setIsLoaded(true);
        } else {
          setError('네이버 지도 API 초기화에 실패했습니다.');
        }
      }, 100);
    };

    script.onerror = () => {
      setError('네이버 지도 API 스크립트 로드에 실패했습니다. Client ID와 등록된 URL을 확인해주세요.');
    };

    document.head.appendChild(script);

    return () => {
      // 클린업 시 마커 제거
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.naver) return;

    try {
      // 지도 생성
      const mapOptions: NaverMapOptions = {
        center: new window.naver.maps.LatLng(centerLat, centerLng),
        zoom: zoom,
        zoomControl: true,
        zoomControlOptions: {
          position: 3, // TOP_RIGHT
        },
      };

      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;

      // 마커들 먼저 추가 (음식점/교통)
      markers.forEach((markerData) => {
        // 카테고리별 색상 및 아이콘 설정
        const getMarkerStyle = (category: string) => {
          switch (category) {
            // 교통
            case '지하철':
              return { bg: '#3B82F6', icon: '🚇' };
            case '버스':
              return { bg: '#F97316', icon: '🚌' };
            // 음식
            case '한식':
              return { bg: '#DC2626', icon: '🍚' };
            case '중식':
              return { bg: '#EA580C', icon: '🥢' };
            case '일식':
              return { bg: '#0891B2', icon: '🍣' };
            case '양식':
              return { bg: '#7C3AED', icon: '🍝' };
            case '분식':
              return { bg: '#DB2777', icon: '🍜' };
            case '카페':
              return { bg: '#92400E', icon: '☕' };
            // 학원 유형
            case '독학관리/독학재수':
              return { bg: '#10B981', icon: '📚' };
            case '시대인재':
              return { bg: '#F59E0B', icon: '🏢' };
            case '강남대성/두각':
              return { bg: '#3B82F6', icon: '🏛️' };
            default:
              return { bg: '#6B7280', icon: '🍽️' };
          }
        };

        const style = getMarkerStyle(markerData.category);

        // 가격 라벨이 있는 경우 마커 위에 표시
        const priceLabel = markerData.priceRange ? `
          <div style="
            position: absolute;
            top: -18px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 10px;
            font-weight: 700;
            white-space: nowrap;
            text-shadow: 0 0 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5);
          ">${markerData.priceRange}</div>
        ` : '';

        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(markerData.lat, markerData.lng),
          map: map,
          title: markerData.name,
          zIndex: 10,
          icon: {
            content: `<div style="position: relative;">
              ${priceLabel}
              <div style="
                background: ${style.bg};
                color: white;
                padding: 6px 10px;
                border-radius: 15px;
                font-size: 11px;
                font-weight: 600;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                white-space: nowrap;
              ">${style.icon} ${markerData.name}</div>
            </div>`,
            anchor: { x: 40, y: 30 },
          },
        });

        markersRef.current.push(marker);

        const infoContent = markerData.infoContent || `
          <div style="padding: 12px; min-width: 180px;">
            <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: bold;">${markerData.name}</h4>
            <p style="margin: 0; color: #888; font-size: 12px;">${markerData.category}</p>
            <p style="margin: 4px 0 0 0; color: #3B82F6; font-size: 12px; font-weight: 500;">
              🚶 도보 ${markerData.walkTime}분
            </p>
          </div>
        `;

        const infoWindow = new window.naver.maps.InfoWindow({
          content: infoContent,
          maxWidth: 250,
          backgroundColor: '#fff',
          borderColor: style.bg,
          borderWidth: 1,
          anchorSize: { width: 10, height: 10 },
          anchorSkew: true,
          anchorColor: '#fff',
        });

        window.naver.maps.Event.addListener(marker, 'click', () => {
          // 같은 인포윈도우를 다시 클릭하면 닫기
          if (currentInfoWindowRef.current === infoWindow) {
            infoWindow.close();
            currentInfoWindowRef.current = null;
          } else {
            // 다른 인포윈도우가 열려있으면 닫기
            if (currentInfoWindowRef.current) {
              currentInfoWindowRef.current.close();
            }
            infoWindow.open(map, marker);
            currentInfoWindowRef.current = infoWindow;
          }
          if (onMarkerClick) {
            onMarkerClick(markerData);
          }
        });
      });

      // 학원 위치 마커 (메인 마커) - 가장 나중에 추가하여 항상 위에 표시
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(centerLat, centerLng),
        map: map,
        title: 'SN고요의숲',
        zIndex: 100,
        icon: {
          content: `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
            ">
              <div style="
                position: absolute;
                top: -18px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 10px;
                font-weight: 700;
                white-space: nowrap;
                text-shadow: 0 0 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5);
              ">80만원</div>
              <div style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid #16A34A;
                overflow: hidden;
                background: url('/image/인테리어/SNAI_outerior.png') top center / cover no-repeat;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                margin-bottom: 3px;
              "></div>
              <div style="
                background: #16A34A;
                color: white;
                padding: 4px 10px;
                border-radius: 6px 6px 0 0;
                font-size: 11px;
                font-weight: 600;
                white-space: nowrap;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
              ">SN고요의숲</div>
              <div style="
                background: #0F766E;
                color: white;
                padding: 2px 8px;
                border-radius: 0 0 6px 6px;
                font-size: 9px;
                font-weight: 500;
                white-space: nowrap;
              ">AI특화관</div>
              <div style="
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid #0F766E;
              "></div>
            </div>
          `,
          anchor: { x: 40, y: 80 },
        },
      });

    } catch (err) {
      console.error('Map initialization error:', err);
      setError('지도 초기화 중 오류가 발생했습니다.');
    }
  }, [isLoaded, markers, centerLat, centerLng, zoom, onMarkerClick]);

  if (error) {
    return (
      <div
        className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
        style={{ height }}
      >
        <div className="text-red-500 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-red-700 font-medium mb-2">지도를 불러올 수 없습니다</p>
        <p className="text-red-600 text-sm">{error}</p>
        <div className="mt-4 text-left bg-white rounded-lg p-4 text-sm text-gray-600">
          <p className="font-medium mb-2">확인 사항:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>네이버 클라우드 플랫폼에서 Maps API가 활성화되어 있는지 확인</li>
            <li>Web Service URL에 도메인이 등록되어 있는지 확인</li>
            <li>개발: <code className="bg-gray-100 px-1 rounded">localhost:3000</code></li>
            <li>운영: <code className="bg-gray-100 px-1 rounded">daechi.snacademy.co.kr</code></li>
          </ul>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className="bg-gray-100 rounded-xl flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-sn-green border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-500">지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="rounded-xl overflow-hidden shadow-lg"
      style={{ height, width: '100%' }}
    />
  );
}
