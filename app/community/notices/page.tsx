'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NoticesPage() {
  const notices = [
    {
      id: 1,
      title: "2025학년도 신입생 모집 안내",
      date: "2024.12.01",
      category: "공지",
      isImportant: true
    },
    {
      id: 2,
      title: "겨울방학 특강 프로그램 안내",
      date: "2024.11.28",
      category: "공지",
      isImportant: true
    },
    {
      id: 3,
      title: "12월 모의고사 일정 안내",
      date: "2024.11.25",
      category: "일정",
      isImportant: false
    },
    {
      id: 4,
      title: "학원 운영시간 변경 안내 (12월)",
      date: "2024.11.20",
      category: "공지",
      isImportant: false
    },
    {
      id: 5,
      title: "SNarGPT 업데이트 안내 (v0.4)",
      date: "2024.11.15",
      category: "소식",
      isImportant: false
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
              공지사항
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SN 고요의숲 대치의 새로운 소식을 확인하세요
            </p>
          </div>

          {/* 공지사항 목록 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="space-y-4">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-sn-green/30"
                >
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                    notice.isImportant
                      ? 'bg-red-100 text-red-600'
                      : notice.category === '일정'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {notice.category}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${notice.isImportant ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {notice.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notice.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
