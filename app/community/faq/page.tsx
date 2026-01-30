'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function FaqPage() {
  const faqs = [
    {
      question: "입학 상담은 어떻게 신청하나요?",
      answer: "홈페이지 상단의 '상담신청' 버튼을 클릭하시거나, 전화(010-5862-3838)로 문의해 주시면 됩니다. 방문 상담도 가능하며, 사전 예약을 권장드립니다."
    },
    {
      question: "수업료 납부 방법은 어떻게 되나요?",
      answer: "수업료는 매월 25일 자동이체 또는 카드결제로 납부하실 수 있습니다. 자세한 내용은 상담 시 안내드립니다."
    },
    {
      question: "자습실(몰입존) 이용 시간은 어떻게 되나요?",
      answer: "몰입존은 월~토 08:00 ~ 24:00 까지 운영하며, 일요일은 09:00 ~ 18:00 까지 운영합니다. 시험 기간에는 연장 운영됩니다."
    },
    {
      question: "AI 학습 시스템은 어떻게 이용하나요?",
      answer: "입학 후 개인 계정이 발급되며, SNarGPT와 SNarVIS 등 모든 AI 학습 도구를 무료로 이용하실 수 있습니다. 사용법은 오리엔테이션에서 안내드립니다."
    },
    {
      question: "AI특화관, 말뿐인 마케팅 아닌가요? 무엇이 다른가요?",
      answer: "많은 곳에서 AI를 말하지만, 학습의 전 과정을 AI 시스템으로 통합(Full-Stack)한 곳은 오직 SN뿐입니다. 고요의숲 AI특화관의 차별점은 '초개인화된 관리'에 있습니다.",
      hasAIDetails: true
    },
    {
      question: "중도 환불이 가능한가요?",
      answer: "네, 가능합니다. 「학원의 설립·운영 및 과외교습에 관한 법률 시행령」 별표 4에 따른 환불 규정이 적용됩니다.",
      hasRefundTable: true
    }
  ];

  const refundData = [
    { period: '수업 시작 전', refund: '전액 환불' },
    { period: '총 교습시간 1/3 경과 전', refund: '납부액의 2/3 환불' },
    { period: '총 교습시간 1/2 경과 전', refund: '납부액의 1/2 환불' },
    { period: '총 교습시간 1/2 경과 후', refund: '환불 불가' },
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
              자주 묻는 질문
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              궁금한 점을 빠르게 확인하세요
            </p>
          </div>

          {/* FAQ 목록 */}
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
                    <p>{faq.answer}</p>
                    {faq.hasAIDetails && (
                      <div className="mt-4 space-y-3">
                        <div className="border-l-2 border-gray-300 pl-4 py-1">
                          <h4 className="font-medium text-gray-800 mb-1">기록의 연속성</h4>
                          <p className="text-gray-600 text-sm">멘토 선생님이 수백 명의 학생과 상담내역을 모두 기억할 수 없지만, 고요의숲의 AI는 학생과의 첫 대화부터 마지막 오답까지 모든 맥락을 기억합니다. 1년의 학습 흐름을 꿰뚫고 있는 AI 비서가 곁에 있는 것과 같습니다. AI는 반복작업과 데이터를 측정, 분석하고 전문 선생님과 멘토가 이를 코칭합니다.</p>
                        </div>
                        <div className="border-l-2 border-gray-300 pl-4 py-1">
                          <h4 className="font-medium text-gray-800 mb-1">보이지 않는 관리</h4>
                          <p className="text-gray-600 text-sm">SNarLink 방화벽과 AI 모니터링은 단순히 딴짓을 막는 것을 넘어, 학생의 학습 패턴이 무너지는 신호를 가장 먼저 감지하여 관리자에게 알립니다.</p>
                        </div>
                        <div className="border-l-2 border-gray-300 pl-4 py-1">
                          <h4 className="font-medium text-gray-800 mb-1">전문가의 도구</h4>
                          <p className="text-gray-600 text-sm">AI가 모든 것을 대신하는 것이 아닙니다. AI가 정리한 정밀한 데이터를 바탕으로, 대치동 최고의 전략 담임들이 훨씬 더 깊이 있고 날카로운 입시 컨설팅을 제공합니다.</p>
                        </div>
                        <p className="text-gray-700 text-sm mt-3 pt-3 border-t border-gray-200">기술은 거들 뿐, 본질은 학생의 성적 향상입니다. 고요의숲은 AI라는 가장 강력한 도구를 제대로 쓸 줄 아는 유일한 학습 공간입니다.</p>
                      </div>
                    )}
                    {faq.hasRefundTable && (
                      <div className="mt-4">
                        <table className="w-full border-collapse rounded-lg overflow-hidden">
                          <thead>
                            <tr className="bg-sn-green text-white">
                              <th className="px-4 py-2 text-left text-sm font-semibold">수업 진행 기준</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold">환불 금액</th>
                            </tr>
                          </thead>
                          <tbody>
                            {refundData.map((row, ri) => (
                              <tr key={ri} className={ri % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-4 py-2 text-sm text-gray-700 border-t border-gray-200">{row.period}</td>
                                <td className={`px-4 py-2 text-sm text-right font-semibold border-t border-gray-200 ${ri === 3 ? 'text-gray-400' : 'text-sn-green'}`}>{row.refund}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-3 space-y-1 text-xs text-gray-500">
                          <p>• 환불 사유 발생일로부터 5일 이내 환불 처리</p>
                          <p>• 환불 신청은 행정실로 문의해 주세요</p>
                        </div>
                        <p className="mt-2 text-xs text-gray-400">※ 법적 근거: 학원의 설립·운영 및 과외교습에 관한 법률 제18조, 동법 시행령 별표 4</p>
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>

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
                  href="tel:010-5862-3838"
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
