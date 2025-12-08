'use client';

import { useState } from 'react';
import Image from 'next/image';
import MacbookMockup from '@/components/ui/MacbookMockup';

export default function Programs() {
  const [activeTab, setActiveTab] = useState('ai');
  const [demoMessages, setDemoMessages] = useState([
    {
      type: 'user',
      content: '@snargo님 이 2문제 풀어주세요.',
      images: ['/image/chat/6958-1.png', '/image/chat/6959-1.png']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 데모 응답 예시
  const demoResponses: { [key: string]: string } = {
    '오늘 점심 메뉴': 'SNARVIS입니다. 안녕하세요! 오늘(11/03, 월) SN독학기숙학원 점심 메뉴는 다음과 같습니다.\n\n- 돈육김치찌개\n- 우불당면볶음\n- 군만두\n- 견파래튀각\n- 배추김치\n- 쌀밥\n- 샐러드, 요구르트\n\n참고: 현장 사정에 따라 일부 품목이 변동될 수 있어요.\n\n수능이 이제 10일 남았어요. 점심 맛있게 먹고 오후 공부도 탄탄하게 가요!',
    '강의 요약': 'SNarGPT 강의 요약 기능입니다! 📚\n\n[수학 미적분 - 삼각함수의 극한]\n\n📌 핵심 개념 요약:\n\n1. **중요 공식**\n   • lim(x→0) sinx/x = 1\n   • lim(x→0) (1-cosx)/x = 0\n   • lim(x→0) tanx/x = 1\n\n2. **문제 풀이 전략**\n   ① 분자/분모를 x로 나누어 정리\n   ② 삼각함수 극한 공식 적용\n   ③ 로피탈 정리 활용 가능\n\n3. **주의사항**\n   • x→0일 때만 사용 가능\n   • 각도는 라디안(rad) 단위\n   • 합성함수일 경우 치환 활용\n\n💡 **실전 TIP**: 이 단원은 수능에서 매년 1-2문제 출제되며, 특히 29번~30번 고난도 문제에 자주 활용됩니다. 공식을 암기하기보다 유도 과정을 이해하는 것이 중요합니다!\n\n궁금한 부분이 있으면 언제든 질문해주세요! 🎯',
    '수학 공부법': 'SNarGPT가 도와드리겠습니다!\n\n수능 수학 효율적인 공부법:\n\n1. 개념 완벽 이해\n- 공식 암기보다 원리 이해가 중요\n- 개념서를 반복해서 읽기\n\n2. 문제 풀이 연습\n- 기출문제 3회독 이상\n- 틀린 문제는 SNarVIS에 기록하여 반복 학습\n\n3. 시간 관리\n- 실전처럼 시간 재고 풀기\n- 어려운 문제는 과감히 넘기기\n\n궁금한 문제가 있으면 사진 찍어서 물어보세요!',
    '오답노트': 'SNarVIS 오답 관리 시스템을 소개합니다!\n\n✓ SNarOCR로 답안지 자동 스캔\n✓ 틀린 문제 자동 분류\n✓ 약점 유형 분석\n✓ 복습 일정 자동 생성\n\n오답노트는 단순 기록이 아닌, AI가 분석하여 맞춤형 학습 계획을 제공합니다.',
    '안녕': 'SNARVIS입니다. 안녕하세요! 😊\n\n무엇을 도와드릴까요?\n\n- 오늘 일정 확인\n- 학습 진도 체크\n- 수학 문제 질문\n- 입시 상담\n\n편하게 물어보세요!',
    '입시 상담': 'SNarVIS 입시 상담 시스템입니다.\n\n현재 성적과 목표 대학을 알려주시면:\n\n✓ AI 기반 합격 가능성 분석\n✓ 맞춤형 학습 전략 제시\n✓ 필요한 등급 상승 목표 설정\n✓ 전략적 과목 선택 조언\n\n공공 입시 데이터를 기반으로 초개인화된 입시 전략을 제공합니다!'
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // 사용자 메시지 추가
    const userMessage = { type: 'user', content: inputMessage, images: [] };
    setDemoMessages(prev => [...prev, userMessage]);

    // 타이핑 인디케이터 표시
    setIsTyping(true);
    setInputMessage('');

    // 응답 찾기 (키워드 매칭)
    setTimeout(() => {
      let response = 'SNarGPT가 답변드립니다.\n\n입력하신 내용에 대한 답변을 준비 중입니다. 실제 서비스에서는 더욱 정확하고 상세한 답변을 제공합니다!\n\n💡 시도해보세요:\n- "오늘 점심 메뉴"\n- "수학 공부법"\n- "오답노트"';

      for (const [keyword, reply] of Object.entries(demoResponses)) {
        if (inputMessage.includes(keyword)) {
          response = reply;
          break;
        }
      }

      setDemoMessages(prev => [...prev, { type: 'assistant', content: response, images: [] }]);
      setIsTyping(false);
    }, 1000);
  };

  const programs = [
    {
      badge: "인기",
      title: "정규 독학재수반",
      description: "완벽한 학습 환경과 체계적인 관리 시스템",
      features: [
        "개인별 맞춤 학습 플랜",
        "주간/월간 성적 분석",
        "전담 멘토 배정",
        "24시간 자습실 이용"
      ],
      price: "800,000 원",
      priceLabel: "수강료 안내"
    },
    {
      badge: "추천",
      title: "프리미엄 수학 관리반",
      description: "소수정예 집중 관리로 확실한 성적 향상",
      features: [
        "1:1 개인 맞춤 케어",
        "매일 학습 진도 체크",
        "실시간 질의응답",
        "학부모 상담 서비스"
      ],
      price: "750,000 원 + 300,000 원",
      priceLabel: "수강료 안내"
    }
  ];

  return (
    <section id="programs" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Programs</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            프로그램 안내
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            학생의 상황과 목표에 맞는 <span className="text-sn-green font-semibold">최적의 프로그램</span>을 선택하세요
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mb-12">
          <div className="flex justify-center flex-wrap border-b-2 border-sn-main/20">
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-4 font-semibold text-base transition-all relative ${
                activeTab === 'ai'
                  ? 'text-sn-green'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              SN AI 시스템
              {activeTab === 'ai' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sn-green"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-6 py-4 font-semibold text-base transition-all relative ${
                activeTab === 'data'
                  ? 'text-sn-green'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              SN Data 시스템
              {activeTab === 'data' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sn-green"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('life')}
              className={`px-6 py-4 font-semibold text-base transition-all relative ${
                activeTab === 'life'
                  ? 'text-sn-green'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              SN 생활관리 시스템
              {activeTab === 'life' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sn-green"></span>
              )}
            </button>
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="mb-20">
          {activeTab === 'ai' && (
            <div className="space-y-8">
              {/* 맥북 목업 - SNarGPT 데모 */}
              <MacbookMockup
                title="입시 AI 에이전트"
                url="https://snargpt.ai"
              >
                <div className="w-full h-full flex flex-col">
                  {/* 채팅 헤더 */}
                  <div className="bg-slate-950/50 px-6 py-3 border-b border-green-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">SNarGPT(v.0.4)</h3>
                      </div>
                    </div>

                    {/* 예시 프롬프트 */}
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => {
                          setDemoMessages([
                            {
                              type: 'user',
                              content: '@snargo님 이 2문제 풀어주세요.',
                              images: ['/image/chat/6958-1.png', '/image/chat/6959-1.png']
                            }
                          ]);
                        }}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded-lg transition-colors border border-slate-600"
                      >
                        수학문제풀이
                      </button>
                      <button
                        onClick={() => {
                          setInputMessage('이 강의 요약해줘.');
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded-lg transition-colors border border-slate-600"
                      >
                        동영상 강의 요약
                      </button>
                      <button
                        onClick={() => {
                          setInputMessage('오답노트');
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded-lg transition-colors border border-slate-600"
                      >
                        문제검색
                      </button>
                      <button
                        onClick={() => {
                          setInputMessage('안녕');
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded-lg transition-colors border border-slate-600"
                      >
                        학원내 채팅
                      </button>
                      <button
                        onClick={() => {
                          setInputMessage('입시 상담');
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded-lg transition-colors border border-slate-600"
                      >
                        평가원급 문제 생성(예정)
                      </button>
                    </div>
                  </div>

                  {/* 채팅 메시지 영역 */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {demoMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {message.type === 'assistant' && (
                          <div className="flex gap-2 max-w-[85%]">
                            <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                            <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-2xl rounded-tl-sm p-3">
                              <p className="text-gray-100 text-xs leading-relaxed whitespace-pre-line">{message.content}</p>
                            </div>
                          </div>
                        )}
                        {message.type === 'user' && (
                          <div className="bg-purple-600 rounded-2xl rounded-tr-sm p-3 max-w-[70%]">
                            {message.images && message.images.length > 0 && (
                              <div className="flex gap-2 mb-2">
                                {message.images.map((img, idx) => (
                                  <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-purple-400">
                                    <Image
                                      src={img}
                                      alt={`문제 ${idx + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            <p className="text-white text-xs">{message.content}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-2xl p-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 입력 영역 */}
                  <div className="bg-slate-950/50 border-t border-slate-700 p-3">
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 bg-slate-800 text-white text-xs px-4 py-2.5 rounded-lg border border-slate-600 focus:border-green-500 focus:outline-none placeholder-slate-400"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                      >
                        <span>전송</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                      <button className="p-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <button className="p-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </MacbookMockup>

              {/* AI 시스템 설명 - 맥북과 같은 너비 */}
              <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">SN AI 시스템</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sn-green hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">SNarGPT</h4>
                    <p className="text-gray-700 text-sm">교육에 최적화된 생성형 AI로, 수능 및 내신 대비 학습 콘텐츠를 학생 수준에 맞게 질문할 수 있습니다. (수능 수학 정답률 99.9%)</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sn-green-light hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">SNarVIS</h4>
                    <p className="text-gray-700 text-sm">아이언맨의 '자비스(JARVIS)'처럼 학생의 학습 일정, 오답 관리, 성적 분석까지 전담하는 수능 전문 AI 비서입니다.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sn-green hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">SNarlink</h4>
                    <p className="text-gray-700 text-sm">학생의 온라인 학습량과 인터넷 사용을 정밀하게 측정하는 AI 방화벽형 학습 모니터링 시스템입니다.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sn-green-light hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">SNarGEN (출시 예정)</h4>
                    <p className="text-gray-700 text-sm">평가원급 난이도의 수학 문제를 자동으로 생성하는 AI 기반 수학 문제 생성기로, 문제은행 수준의 품질을 제공합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">SN DATA 시스템</h3>
              <p className="text-gray-600 text-center mb-6">우리는 학생의 학습데이터를 정확히 측정, 평가 하고, 이를 피드백 합니다.</p>

              {/* 온라인 학습량 데이터 - 전체 너비 */}
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sn-green hover:shadow-lg transition-shadow mb-4">
                <h4 className="font-bold text-lg text-gray-900 mb-3">온라인 학습량 데이터</h4>
                <p className="text-gray-700 text-sm mb-4">학생의 접속 시간, 학습 패턴, 집중 구간 등을 정량화하여 학습 효율을 데이터로 분석합니다.</p>
                <img
                  src="/image/programs/SN_gant.png"
                  alt="SN 학습량 데이터 간트 차트"
                  className="w-full rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sn-green-light hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">SN 문제 데이터</h4>
                  <p className="text-gray-700 text-sm">수능 및 모의고사 문제 중 인터넷에 있는 모든 문제는 AI가 검색을 통해 찾아 줍니다. (저작권 있는 문제 제외)</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sn-green hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">오답 데이터</h4>
                  <p className="text-gray-700 text-sm">SNarOCR을 통해 모의고사 답안지를 스캔하고, 학생별 오답 패턴을 자동 분석하여 맞춤형 피드백을 제공합니다.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sn-green-light hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">입시 데이터</h4>
                  <p className="text-gray-700 text-sm">공공 입시 데이터를 기반으로 AI가 개인의 성적, 목표 대학, 학습 패턴을 분석하여 초개인화 입시 전략을 제시합니다.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'life' && (
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">SN 생활관리 시스템</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sn-green hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">12시간 집중 학습 관리</h4>
                  <p className="text-gray-700 text-sm">하루 12시간 이상 학습이 가능한 체계적인 타임테이블과 생활 루틴을 운영합니다.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sn-green-light hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">최신 시설의 신축 캠퍼스</h4>
                  <p className="text-gray-700 text-sm">최신식 학습·생활 공간과 쾌적한 환경을 갖춘 신축 건물에서 운영됩니다.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sn-green hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">대치역 도보 3분 거리</h4>
                  <p className="text-gray-700 text-sm">접근성과 안전성을 모두 갖춘 최적의 입지로, 통학 및 학부모 방문이 편리합니다.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 프로그램 카드 */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-1.5 h-6 bg-sn-green rounded-full"></span>
            <h3 className="text-2xl font-bold text-gray-900">프로그램 선택</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <div
                key={index}
                className="relative rounded-xl p-6 cursor-pointer transition-all duration-300 bg-white border-2 border-sn-main/20 hover:border-sn-main hover:shadow-lg hover:shadow-sn-main/10 hover:-translate-y-1"
              >
                {/* 배지 */}
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-sn-green text-white">
                  {program.badge}
                </div>

                {/* 제목 */}
                <h4 className="text-lg font-bold mb-2 text-gray-900">
                  {program.title}
                </h4>

                {/* 설명 */}
                <p className="mb-4 text-gray-600 text-sm">
                  {program.description}
                </p>

                {/* 기능 리스트 */}
                <ul className="space-y-2 mb-4">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-sn-green"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* 가격 */}
                <div className="border-t-2 pt-4 mb-4 border-sn-main/20">
                  <div className="text-xs text-sn-green font-medium mb-1">수강료 안내</div>
                  <div className="text-xl font-bold text-sn-green">
                    {program.price}
                  </div>
                </div>

                {/* CTA 버튼 */}
                <a
                  href="#contact"
                  className="block w-full py-2 px-4 rounded-lg text-center font-medium text-sm transition-all bg-sn-green text-white hover:bg-sn-green-dark"
                >
                  상담 신청하기
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 상담 신청 섹션 */}
        <div id="contact" className="mt-12 max-w-5xl mx-auto bg-white rounded-2xl p-8 shadow-lg border-2 border-sn-main/20">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Contact</span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              상담 신청하기
            </h3>
            <p className="text-gray-600">
              프로그램에 대한 자세한 상담이 필요하신가요? 아래 연락처로 문의해주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* 전화 상담 */}
            <div className="text-center p-6 rounded-xl bg-white hover:bg-sn-green/10 hover:shadow-md transition-all duration-300 cursor-pointer border border-sn-main/20">
              <div className="w-14 h-14 mx-auto mb-4 bg-sn-green rounded-full flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">전화 상담</h4>
              <a href="tel:02-XXX-XXXX" className="text-sn-green font-medium hover:underline">
                02-XXX-XXXX
              </a>
            </div>

            {/* 카카오톡 상담 */}
            <div className="text-center p-6 rounded-xl bg-white hover:bg-sn-green/10 hover:shadow-md transition-all duration-300 cursor-pointer border border-sn-main/20">
              <div className="w-14 h-14 mx-auto mb-4 bg-sn-green rounded-full flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3c-5.5 0-10 3.58-10 8 0 2.82 1.83 5.29 4.59 6.69-.17.64-.63 2.36-.72 2.73-.12.49.18.48.38.35.15-.1 2.45-1.64 3.44-2.31.74.11 1.51.17 2.31.17 5.5 0 10-3.58 10-8s-4.5-8-10-8z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">카카오톡 상담</h4>
              <a href="#" className="text-sn-green font-medium hover:underline">
                @SN대치
              </a>
            </div>

            {/* 방문 상담 */}
            <div className="text-center p-6 rounded-xl bg-white hover:bg-sn-green/10 hover:shadow-md transition-all duration-300 cursor-pointer border border-sn-main/20">
              <div className="w-14 h-14 mx-auto mb-4 bg-sn-green rounded-full flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">방문 상담</h4>
              <p className="text-gray-600 text-sm">
                대치역 도보 3분
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              상담 가능 시간: 평일 09:00 - 21:00 / 토요일 09:00 - 18:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
