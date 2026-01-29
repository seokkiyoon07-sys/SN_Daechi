'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NaverMap, { MapMarker } from "@/components/NaverMap";

interface Restaurant {
  id: number;
  name: string;
  category: string;
  walkTime: number; // 분
  rating: number; // 5점 만점
  priceRange: string;
  description: string;
  recommendation: string;
  address: string;
  naverMapUrl: string;
  lat: number;
  lng: number;
}

// 학원 위치: 대치동 447
const ACADEMY_LAT = 37.496898;
const ACADEMY_LNG = 127.061648;

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "하이보",
    category: "중식",
    walkTime: 0.5,
    rating: 4.0,
    priceRange: "10,000~20,000원",
    description: "",
    recommendation: "",
    address: "대치동",
    naverMapUrl: "",
    lat: 37.497030,
    lng: 127.061380,
  },
  {
    id: 2,
    name: "영가츠",
    category: "일식",
    walkTime: 3,
    rating: 3.5,
    priceRange: "10,000~20,000원",
    description: "",
    recommendation: "",
    address: "대치동",
    naverMapUrl: "",
    lat: 37.496322,
    lng: 127.060372,
  },
  {
    id: 3,
    name: "정성담은 라밥",
    category: "한식",
    walkTime: 3,
    rating: 5.0,
    priceRange: "~10,000원",
    description: "",
    recommendation: "",
    address: "대치동",
    naverMapUrl: "",
    lat: 37.498384,
    lng: 127.060854,
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["전체", "한식", "중식", "일식", "양식", "분식", "카페"];

  const filteredRestaurants = selectedCategory === "전체"
    ? restaurants
    : restaurants.filter(r => r.category === selectedCategory);

  // 별점 문자열 생성 함수
  const getStarString = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  };

  // 지도에 표시할 마커 데이터
  const mapMarkers: MapMarker[] = filteredRestaurants.map(r => ({
    id: r.id,
    name: r.name,
    lat: r.lat,
    lng: r.lng,
    category: r.category,
    walkTime: r.walkTime,
    infoContent: `
      <div style="padding: 12px; min-width: 150px;">
        <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: bold;">${r.name}</h4>
        <p style="margin: 0 0 4px 0; color: #666; font-size: 12px;">${r.category}</p>
        <p style="margin: 0 0 4px 0; color: #16A34A; font-size: 12px; font-weight: 500;">${r.priceRange}</p>
        <div style="margin-top: 4px; color: #F59E0B;">${getStarString(r.rating)}</div>
      </div>
    `,
  }));

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="halfGrad">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#halfGrad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              학원에서 도보로 갈 수 있는 맛집을 소개합니다
            </p>
          </div>

          {/* 지도 섹션 */}
          <div className="mb-8">
            <NaverMap
              markers={mapMarkers}
              centerLat={ACADEMY_LAT}
              centerLng={ACADEMY_LNG}
              zoom={16}
              height="500px"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              📍 SN고요의숲 | 🍚 한식 | 🥢 중식 | 🍣 일식 | 🍝 양식 | 🍜 분식 | ☕ 카페
            </p>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-sn-green text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-sn-green hover:text-sn-green"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 맛집 리스트 */}
          {filteredRestaurants.length > 0 ? (
            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* 왼쪽: 기본 정보 */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {restaurant.category}
                          </span>
                        </div>

                        {/* 별점 */}
                        <div className="mb-3">
                          {renderStars(restaurant.rating)}
                        </div>

                        <p className="text-gray-600 text-sm mb-2">{restaurant.description}</p>
                        <p className="text-sn-green text-sm font-medium">{restaurant.recommendation}</p>
                      </div>

                      {/* 오른쪽: 도보 시간 & 가격 */}
                      <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                        {/* 도보 시간 */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          <span className="text-blue-700 font-bold">{restaurant.walkTime}분</span>
                        </div>

                        {/* 가격대 */}
                        <div className="text-sm text-gray-500">
                          {restaurant.priceRange}
                        </div>
                      </div>
                    </div>

                    {/* 하단: 주소 & 지도 링크 */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-sm text-gray-500">{restaurant.address}</span>
                      <a
                        href={restaurant.naverMapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-sn-green hover:underline"
                      >
                        네이버 지도에서 보기
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500">해당 카테고리의 맛집이 없습니다.</p>
            </div>
          )}

          {/* 안내 */}
          <div className="mt-12 p-6 bg-sn-green/10 rounded-xl border border-sn-green/30">
            <p className="text-center text-gray-700">
              <span className="font-semibold text-sn-green">맛집 정보 업데이트 예정</span><br />
              <span className="text-sm">학생들의 추천을 받아 지속적으로 업데이트됩니다. 추천하고 싶은 맛집이 있다면 행정실에 알려주세요!</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
