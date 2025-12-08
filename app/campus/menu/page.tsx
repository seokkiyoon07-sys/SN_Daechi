'use client';

import { useEffect } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MenuPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const weeklyMenu = [
    {
      day: "월요일",
      lunch: ["소불고기", "된장찌개", "계란말이", "김치", "쌀밥"],
      dinner: ["제육볶음", "미역국", "감자조림", "김치", "쌀밥"]
    },
    {
      day: "화요일",
      lunch: ["치킨까스", "우동국물", "콘샐러드", "김치", "쌀밥"],
      dinner: ["김치찌개", "고등어구이", "시금치나물", "김치", "쌀밥"]
    },
    {
      day: "수요일",
      lunch: ["돈육김치찌개", "멸치볶음", "무생채", "김치", "쌀밥"],
      dinner: ["닭볶음탕", "어묵국", "깻잎절임", "김치", "쌀밥"]
    },
    {
      day: "목요일",
      lunch: ["비빔밥", "계란국", "모둠전", "김치", "쌀밥"],
      dinner: ["순두부찌개", "불고기", "오이무침", "김치", "쌀밥"]
    },
    {
      day: "금요일",
      lunch: ["카레라이스", "단무지", "유부초밥", "김치", "쌀밥"],
      dinner: ["부대찌개", "동그랑땡", "콩나물무침", "김치", "쌀밥"]
    },
    {
      day: "토요일",
      lunch: ["짜장밥", "군만두", "단무지", "김치"],
      dinner: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 페이지 헤더 */}
          <div className="mb-12">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Campus Life</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              도시락 메뉴
            </h1>
            <p className="text-lg text-gray-600">
              매주 업데이트되는 점심·저녁 식단표
            </p>
          </div>

          {/* 이번 주 메뉴 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-sn-green rounded-full"></span>
              이번 주 식단 (12월 2주차)
            </h2>
          </div>

          {/* 메뉴 테이블 */}
          <div className="space-y-4">
            {weeklyMenu.map((day, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-sn-green/10 px-6 py-3 border-b border-gray-200">
                  <h3 className="font-bold text-sn-green">{day.day}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  {/* 점심 */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-medium rounded">점심</span>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {day.lunch.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  {/* 저녁 */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded">저녁</span>
                    </div>
                    {day.dinner ? (
                      <ul className="text-sm text-gray-700 space-y-1">
                        {day.dinner.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400">토요일 저녁은 제공되지 않습니다</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 안내 */}
          <div className="mt-12 p-6 bg-sn-green/10 rounded-xl border border-sn-green/30">
            <p className="text-center text-gray-700">
              <span className="font-semibold text-sn-green">※ 메뉴는 식재료 수급 상황에 따라 변경될 수 있습니다.</span><br />
              <span className="text-sm">알레르기 정보는 행정실로 문의해 주세요.</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
