'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RulesPage() {
  const [showPenaltyTable, setShowPenaltyTable] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rules = [
    {
      category: "출결 관리",
      items: [
        "등원시간: 08:00 까지",
        "2중 체크인 시스템: RFID 카드 태그, SNarlink 접속 로그 → 학원DB, 학부모님께 카톡 알림",
        "20분 단위 학습 체크"
      ]
    },
    {
      category: "인터넷 네트워크 관리",
      items: [
        "SNarlink를 통한 학습량 측정",
        "국내 최신식 AI 방화벽 SNarlink를 통한 인터넷 관리",
        "학습 외 사이트 모두 차단 (VPN 우회 및 기타 이상 네트워크 발생 시 AI 탐지, 관리자 알림)",
        "입실 시 핸드폰 전면 수거"
      ]
    },
    {
      category: "면학 분위기",
      items: [
        "사감선생님이 매 20분마다 순찰"
      ]
    },
    {
      category: "벌점제도 시행",
      items: [
        "규칙 위반 시 벌점 부여",
        "누적 벌점에 따른 단계별 조치"
      ],
      showPenaltyButton: true
    }
  ];

  const penaltyData = [
    { category: "결석", unauthorized: 10, excused: 5 },
    { category: "조퇴", unauthorized: 5, excused: 3 },
    { category: "지각", unauthorized: 5, excused: 3 },
    { category: "외출", unauthorized: 3, excused: 1 },
    { category: "수면", unauthorized: 3, excused: "-" },
    { category: "졸음", unauthorized: 1, excused: "-" },
    { category: "핸드폰 미제출", unauthorized: 10, excused: "-" },
    { category: "교직원의 정당한 지시 불이행", unauthorized: 10, excused: "-" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* 규칙 목록 - 2열 레이아웃 (이미지 좌/우 번갈아) */}
          <div className="space-y-6">
            {rules.map((section, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* 이미지 영역 */}
                  <div className="md:w-1/3 bg-gray-100 min-h-[200px] flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-sn-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-sn-green">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-500">이미지 영역</p>
                    </div>
                  </div>

                  {/* 내용 영역 */}
                  <div className="md:w-2/3 p-6">
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
                    {section.showPenaltyButton && (
                      <button
                        onClick={() => setShowPenaltyTable(true)}
                        className="mt-4 px-4 py-2 bg-sn-green text-white text-sm font-medium rounded-lg hover:bg-sn-green-dark transition-colors"
                      >
                        벌점표 보기
                      </button>
                    )}
                  </div>
                </div>
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

      {/* 벌점표 모달 */}
      {showPenaltyTable && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPenaltyTable(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* 모달 헤더 */}
            <div className="bg-sn-green text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">벌점표</h3>
              <button onClick={() => setShowPenaltyTable(false)} className="text-white hover:text-green-200 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 벌점 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-sn-green-dark text-white">
                    <th className="px-6 py-4 text-center font-semibold">구분</th>
                    <th className="px-6 py-4 text-center font-semibold">무단</th>
                    <th className="px-6 py-4 text-center font-semibold">사유</th>
                  </tr>
                </thead>
                <tbody>
                  {penaltyData.map((row, index) => (
                    <tr key={index} className={`border-b border-gray-200 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="px-6 py-4 text-center text-gray-700 font-medium">{row.category}</td>
                      <td className="px-6 py-4 text-center text-gray-900 font-semibold">{row.unauthorized}</td>
                      <td className="px-6 py-4 text-center text-gray-900">{row.excused}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 모달 푸터 */}
            <div className="px-6 py-4 bg-sn-green/10 border-t border-sn-green/30">
              <p className="text-sm text-gray-700 text-center">
                벌점 누적 시 학부모 상담 및 퇴원 조치가 진행될 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
