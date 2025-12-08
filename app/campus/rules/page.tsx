'use client';

import { useEffect } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RulesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rules = [
    {
      category: "출결 관리",
      items: [
        "등원 시간: 오전 7시 30분까지",
        "하원 시간: 밤 10시 이후 (자율)",
        "외출은 점심/저녁 식사 시간에만 가능",
        "무단 결석 시 학부모 즉시 연락"
      ]
    },
    {
      category: "학습 규칙",
      items: [
        "자습 시간 중 휴대폰 사용 금지",
        "지정 좌석에서 학습",
        "자습실 내 대화 및 취식 금지",
        "학습 기록 매일 작성 필수"
      ]
    },
    {
      category: "시설 이용",
      items: [
        "개인 사물함 지급 (분실물 책임 본인)",
        "공용 공간 청결 유지",
        "비품 파손 시 변상 책임",
        "휴게실은 지정된 시간에만 이용"
      ]
    },
    {
      category: "생활 수칙",
      items: [
        "단정한 복장 유지",
        "타 학생에게 피해 주는 행동 금지",
        "흡연, 음주 절대 금지",
        "선생님 지시 사항 준수"
      ]
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
              생활관리
            </h1>
            <p className="text-lg text-gray-600">
              학습에 집중할 수 있는 환경을 위한 체계적인 생활 관리
            </p>
          </div>

          {/* 규칙 목록 */}
          <div className="space-y-6">
            {rules.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-sn-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  {section.category}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-sn-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 안내 문구 */}
          <div className="mt-12 p-6 bg-sn-green/10 rounded-xl border border-sn-green/30">
            <p className="text-center text-gray-700">
              위 규칙을 준수하지 않을 경우, <span className="font-semibold text-sn-green">경고 → 학부모 상담 → 퇴원 조치</span>가 진행될 수 있습니다.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
