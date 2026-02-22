'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function CommunityContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('notices');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['notices', 'column', 'faq'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

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

  const faqs = [
    {
      question: "입학 상담은 어떻게 신청하나요?",
      answer: "홈페이지 상단의 '상담신청' 버튼을 클릭하시거나, 전화(02-557-0301)로 문의해 주시면 됩니다. 방문 상담도 가능하며, 사전 예약을 권장드립니다."
    },
    {
      question: "수업료 납부 방법은 어떻게 되나요?",
      answer: "수업료는 매월 25일 자동이체 또는 카드결제로 납부하실 수 있습니다. 자세한 내용은 상담 시 안내드립니다."
    },
    {
      question: "자습실 이용 시간은 어떻게 되나요?",
      answer: "자습실은 평일 오전 7시부터 밤 12시까지 운영됩니다. 주말에도 동일하게 이용 가능하며, 시험 기간에는 연장 운영됩니다."
    },
    {
      question: "AI 학습 시스템은 어떻게 이용하나요?",
      answer: "입학 후 개인 계정이 발급되며, SNarGPT와 SNarVIS 등 모든 AI 학습 도구를 무료로 이용하실 수 있습니다. 사용법은 오리엔테이션에서 안내드립니다."
    },
    {
      question: "중도 환불이 가능한가요?",
      answer: "네, 가능합니다. 학원 환불 규정에 따라 수업 진행 일수를 기준으로 환불 금액이 산정됩니다. 자세한 내용은 행정실로 문의해 주세요."
    }
  ];

  return (
    <>
      {/* 섹션 헤더 */}
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Community</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          커뮤니티
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          SN 고요의숲 대치의 소식과 정보를 확인하세요
        </p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="mb-12">
        <div className="flex justify-center border-b-2 border-sn-main/20">
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-8 py-4 font-semibold text-base transition-all relative ${
              activeTab === 'notices'
                ? 'text-sn-green'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            공지사항
            {activeTab === 'notices' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sn-green"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('column')}
            className={`px-8 py-4 font-semibold text-base transition-all relative ${
              activeTab === 'column'
                ? 'text-sn-green'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            SN대치 칼럼
            {activeTab === 'column' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sn-green"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-8 py-4 font-semibold text-base transition-all relative ${
              activeTab === 'faq'
                ? 'text-sn-green'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            자주 묻는 질문
            {activeTab === 'faq' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sn-green"></span>
            )}
          </button>
        </div>
      </div>

      {/* 탭 콘텐츠 */}
      {activeTab === 'notices' && (
        <div className="max-w-4xl mx-auto">
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
      )}

      {activeTab === 'column' && (
        <div className="max-w-4xl mx-auto">
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
      )}

      {activeTab === 'faq' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group border border-gray-200 rounded-lg overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900 text-sm pr-4">{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 문의하기 섹션 */}
      <div className="mt-12 bg-gradient-to-br from-sn-green to-sn-green-light rounded-2xl p-8 md:p-12 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            더 궁금한 점이 있으신가요?
          </h2>
          <p className="text-lg text-green-100 mb-8">
            언제든지 문의해 주세요. 친절하게 답변드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:02-557-0301"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-sn-green font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              전화 문의
            </a>
            <a
              href="/programs#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              상담 신청
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-12">로딩 중...</div>}>
            <CommunityContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
