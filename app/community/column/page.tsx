'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ColumnPage() {
  const columns = [
    {
      id: 1,
      title: "수능 D-100, 효율적인 시간 관리 전략",
      date: "2024.12.05",
      author: "박원장",
      excerpt: "수능까지 100일, 가장 중요한 것은 시간 관리입니다. 효율적인 학습 계획 수립 방법을 알아봅니다."
    },
    {
      id: 2,
      title: "AI 학습 도구의 올바른 활용법",
      date: "2024.11.28",
      author: "김학습코치",
      excerpt: "SNarGPT를 비롯한 AI 학습 도구를 어떻게 활용해야 효과적인지 살펴봅니다."
    },
    {
      id: 3,
      title: "재수생을 위한 멘탈 관리 가이드",
      date: "2024.11.20",
      author: "이상담사",
      excerpt: "재수 생활에서 가장 중요한 멘탈 관리. 흔들리지 않는 마음가짐을 만드는 방법을 공유합니다."
    },
    {
      id: 4,
      title: "데이터 기반 학습의 힘",
      date: "2024.11.15",
      author: "박원장",
      excerpt: "왜 데이터 기반 학습이 중요한지, SN만의 학습 분석 시스템을 소개합니다."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Community</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              SN대치 칼럼
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              학습과 입시에 관한 인사이트를 공유합니다
            </p>
          </div>

          {/* 칼럼 목록 */}
          <div className="space-y-6">
            {columns.map((column) => (
              <div
                key={column.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-sn-green/30 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-xs font-medium rounded bg-sn-green/10 text-sn-green">
                    칼럼
                  </span>
                  <span className="text-xs text-gray-500">{column.date}</span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-xs text-gray-500">{column.author}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {column.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {column.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
