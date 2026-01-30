'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import 'katex/dist/katex.min.css';
import katex from 'katex';

// KaTeX 렌더링을 위한 간단한 컴포넌트
function InlineMath({ math }: { math: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    try {
      setHtml(katex.renderToString(math, { throwOnError: false }));
    } catch {
      setHtml(math);
    }
  }, [math]);

  return <span className="inline-block max-w-full overflow-x-auto align-middle" style={{ fontSize: '0.9em' }} dangerouslySetInnerHTML={{ __html: html }} />;
}

function BlockMath({ math }: { math: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    try {
      setHtml(katex.renderToString(math, { throwOnError: false, displayMode: true }));
    } catch {
      setHtml(math);
    }
  }, [math]);

  return <div className="overflow-x-auto max-w-full" style={{ fontSize: '0.85em' }} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function Programs() {
  const [activeTab, setActiveTab] = useState('ai');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [snargptView, setSnargptView] = useState<'question' | 'search' | 'info' | 'school'>('question');
  const [dataView, setDataView] = useState<'snarlink' | 'wrong' | 'admission'>('snarlink');
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  const aiSystems = [
    {
      name: 'SNarGPT',
      description: '교육에 최적화된 생성형 AI로, 수능 및 내신 대비 학습 콘텐츠를 학생 수준에 맞게 질문할 수 있습니다. (수능 수학 정답률 99.9%, 사설모의고사도 가능)',
      color: 'blue'
    },
    {
      name: 'SNarVIS',
      description: "아이언맨의 '자비스(JARVIS)'처럼 학생의 학습 일정, 오답 관리, 성적 분석까지 전담하는 수능 전문 AI 비서입니다.",
      color: 'purple'
    },
    {
      name: 'SNarGEN',
      description: 'AI가 평가원급 수학 문제를 생성·검산·해설까지 완전 자동화합니다. 단순히 숫자만 바꾸는 문제은행을 뛰어넘는 완전한 새 문제를 만들어냅니다.',
      color: 'blue',
      upcoming: true
    }
  ];

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
      description: "대치 박진모 원장의 전담 관리로 확실한 성적 향상",
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
            대치동 독학재수학원 모집요강
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
                      </div>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="mb-20">
          {activeTab === 'ai' && (
            <>
              {/* 맥북 브라우저 UI - SNarGPT 시연 */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">SNarGPT 시연</h3>

                {/* AI 시스템 설명 */}
                <div className="mb-6 max-w-3xl mx-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-semibold text-gray-900">SNargo:</span> 수학문제 풀이 전용 AI (물리까지 탁월한 성능, 다른 과목도 chatgpt5 급으로 풀이 가능)</p>
                    <p><span className="font-semibold text-gray-900">SNarVIS:</span> 학생이 공부에만 집중 할 수 있도록, 수능 비서 역할을 하는 AI 에이전트</p>
                    <p><span className="font-semibold text-gray-900">SNarGPT:</span> SNargo와 SNarVIS를 호출하고, 대화형으로 학생이 사용할 수 있는 AI 툴</p>
                  </div>
                </div>

                {/* 맥북 프레임 */}
                <div className="relative mx-auto" style={{ maxWidth: '900px' }}>
                  {/* 맥북 상단 베젤 */}
                  <div className="bg-gray-800 rounded-t-2xl pt-3 pb-2 px-4">
                    {/* 브라우저 컨트롤 버튼 */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    {/* 주소창 */}
                    <a
                      href="https://snargpt.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 rounded-lg px-4 py-2 flex items-center gap-3 hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-gray-300 text-sm flex-1 hover:text-white">snargpt.ai</span>
                    </a>
                  </div>

                  {/* 브라우저 컨텐츠 영역 */}
                  <div className="bg-[#0a0e1a] border-x-4 border-b-4 border-gray-800 rounded-b-2xl p-8" style={{ minHeight: '500px' }}>
                    {/* SNarGPT 인터페이스 */}
                    <div className="flex flex-col h-full">
                      {/* 헤더 */}
                      <div className="border-b border-gray-700 pb-4 mb-6">
                        <h2 className="text-2xl font-bold text-white">
                          SNarGPT
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">수능 전문 AI 학습 도우미</p>
                      </div>

                      {/* 예시 버튼 그리드 */}
                      <div className="grid grid-cols-4 gap-2 mb-6">
                        <button
                          onClick={() => setSnargptView('question')}
                          className={`text-center p-3 rounded-lg border transition-all group ${
                            snargptView === 'question'
                              ? 'border-blue-500 bg-blue-500/20'
                              : 'border-gray-700 hover:border-blue-500 hover:bg-blue-500/10'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-xl">📝</span>
                            <span className={`text-xs font-semibold ${
                              snargptView === 'question' ? 'text-blue-400' : 'text-gray-300 group-hover:text-blue-400'
                            }`}>문제 질문 예시</span>
                          </div>
                        </button>

                        <button
                          onClick={() => setSnargptView('search')}
                          className={`text-center p-3 rounded-lg border transition-all group ${
                            snargptView === 'search'
                              ? 'border-purple-500 bg-purple-500/20'
                              : 'border-gray-700 hover:border-purple-500 hover:bg-purple-500/10'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-xl">🔍</span>
                            <span className={`text-xs font-semibold ${
                              snargptView === 'search' ? 'text-purple-400' : 'text-gray-300 group-hover:text-purple-400'
                            }`}>문제 검색 예시</span>
                          </div>
                        </button>

                        <button
                          onClick={() => setSnargptView('info')}
                          className={`text-center p-3 rounded-lg border transition-all group ${
                            snargptView === 'info'
                              ? 'border-green-500 bg-green-500/20'
                              : 'border-gray-700 hover:border-green-500 hover:bg-green-500/10'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-xl">💡</span>
                            <span className={`text-xs font-semibold ${
                              snargptView === 'info' ? 'text-green-400' : 'text-gray-300 group-hover:text-green-400'
                            }`}>정보 검색 예시</span>
                          </div>
                        </button>

                        <button
                          onClick={() => setSnargptView('school')}
                          className={`text-center p-3 rounded-lg border transition-all group ${
                            snargptView === 'school'
                              ? 'border-orange-500 bg-orange-500/20'
                              : 'border-gray-700 hover:border-orange-500 hover:bg-orange-500/10'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-xl">🏫</span>
                            <span className={`text-xs font-semibold ${
                              snargptView === 'school' ? 'text-orange-400' : 'text-gray-300 group-hover:text-orange-400'
                            }`}>학원생활 예시</span>
                          </div>
                        </button>
                      </div>

                      {/* 채팅 메시지 영역 */}
                      <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
                        {snargptView === 'question' && (
                          <>
                            {/* 사용자 메시지 */}
                            <div className="flex justify-end">
                              <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%] overflow-hidden break-words">
                                <p className="mb-3">@snargo 님, 이 문제 좀 풀어주세요.</p>
                                {/* 썸네일 이미지 */}
                                <div
                                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 w-1/4 cursor-pointer hover:border-green-500 transition-colors"
                                  onClick={() => openImageModal('/image/snargpt/6959-1.png')}
                                >
                                  <img
                                    src="/image/snargpt/6959-1.png"
                                    alt="SNarGPT 수능 수학 킬러문항 풀이 예시"
                                    className="w-full h-auto rounded"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* AI 응답 */}
                            <div className="flex justify-start">
                              <div className="bg-purple-600/20 border border-purple-500/50 text-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] overflow-hidden break-words">
                                <p className="font-semibold mb-3 text-purple-200">(From SNarGo) SNarGo 입니다. 안녕하세요. 문제와 풀이를 정리해 드리겠습니다.</p>

                                <div className="space-y-3 text-sm">
                                  <div>
                                    <p className="font-semibold text-purple-200 mb-2">문제(전사)</p>
                                    <div className="text-purple-100 space-y-2 pl-3">
                                      <p>• 실수 전체에서 미분가능한 함수 <InlineMath math="f(x)" />와 실수 전체에서 연속인 함수 <InlineMath math="g(x)" />는 모든 실수 <InlineMath math="x" />에 대하여</p>
                                      <div className="pl-3"><BlockMath math="f(x) = \ln\left(\frac{g(x)}{1+xf'(x)}\right)" /></div>
                                      <p>를 만족한다.</p>
                                      <p>• 주어진 값:</p>
                                      <div className="pl-3">
                                        <InlineMath math="f(1) = 4\ln 2" />, <InlineMath math="\int_1^2 g(x)\,dx = 34" />, <InlineMath math="\int_1^2 xg(x)\,dx = 53" />
                                      </div>
                                      <p>• 구할 것: <InlineMath math="\int_1^2 xe^{f(x)}\,dx" /></p>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="font-semibold text-purple-200 mb-2">풀이</p>
                                    <div className="text-purple-100 space-y-2">
                                      <p><strong>1)</strong> 식을 지수화하면</p>
                                      <div className="pl-3"><BlockMath math="e^{f(x)} = \frac{g(x)}{1+xf'(x)}" /></div>

                                      <p><strong>2)</strong> 양변을 이용하여 도함수를 계산하면</p>
                                      <div className="pl-3">
                                        <BlockMath math="(xe^{f(x)})' = e^{f(x)} + xe^{f(x)}f'(x) = e^{f(x)}(1+xf'(x)) = g(x)" />
                                      </div>
                                      <p className="pl-3">따라서 <InlineMath math="\int_1^2 g(x)\,dx = [xe^{f(x)}]_1^2 = 34" />.</p>
                                      <p className="pl-3">주어짐과 <InlineMath math="f(1) = 4\ln 2" />이므로 <InlineMath math="e^{f(1)} = 2^4 = 16" />이고,</p>
                                      <p className="pl-3"><InlineMath math="2e^{f(2)} - 1 \cdot e^{f(1)} = 34" />이므로 <InlineMath math="2e^{f(2)} - 16 = 34" />,</p>
                                      <p className="pl-3">따라서 <InlineMath math="e^{f(2)} = 25" />.</p>

                                      <p><strong>3)</strong> 다음으로 <InlineMath math="xg(x) = xe^{f(x)}(1+xf'(x))" />이고,</p>
                                      <div className="pl-3">
                                        <BlockMath math="(x^2e^{f(x)})' = 2xe^{f(x)} + x^2e^{f(x)}f'(x)" />
                                      </div>
                                      <p className="pl-3">간단히 정리하면 <InlineMath math="xg(x) = (x^2e^{f(x)})' - xe^{f(x)}" />.</p>
                                      <p className="pl-3">양변 적분하여</p>
                                      <div className="pl-3">
                                        <BlockMath math="\int_1^2 xg(x)\,dx = [x^2e^{f(x)}]_1^2 - \int_1^2 xe^{f(x)}\,dx" />
                                      </div>
                                      <p className="pl-3">좌변은 53이고, <InlineMath math="[x^2e^{f(x)}]_1^2 = 4e^{f(2)} - 1 \cdot e^{f(1)} = 4 \cdot 25 - 16 = 84" />.</p>
                                      <p className="pl-3">따라서 <InlineMath math="53 = 84 - \int_1^2 xe^{f(x)}\,dx" />이고,</p>
                                      <p className="pl-3"><InlineMath math="\int_1^2 xe^{f(x)}\,dx = 84 - 53 = 31" />.</p>
                                    </div>
                                  </div>

                                  <div className="mt-4 pt-3 border-t border-purple-500/30">
                                    <p className="text-purple-200 font-bold">정답: <InlineMath math="31" /></p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 두 번째 사용자 메시지 (후속 질문) */}
                            <div className="flex justify-end">
                              <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%] overflow-hidden break-words">
                                <p>다른 풀이 방법도 보여줘 (그래프로 푸는 버전)</p>
                              </div>
                            </div>

                            {/* 두 번째 AI 응답 - 그래프 풀이 */}
                            <div className="flex justify-start">
                              <div className="bg-purple-600/20 border border-purple-500/50 text-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] overflow-hidden break-words">
                                <p className="font-semibold mb-3 text-purple-200">(SNarGo) 네, 그래프로 푸는 방법을 보여드릴게요!</p>

                                <div className="space-y-3 text-sm">
                                  <div>
                                    <p className="font-semibold text-purple-200 mb-2">그래프 풀이 개요</p>
                                    <div className="text-purple-100 space-y-2">
                                      <p>• 핵심 치환: <InlineMath math="H(x)=xe^{f(x)}" />. 그러면 주어진 관계식에서</p>
                                      <div className="pl-3">
                                        <BlockMath math="e^{f(x)}=\frac{g(x)}{1+xf'(x)}" />
                                      </div>
                                      <p className="pl-3">양변에 <InlineMath math="x" />를 곱해 정리하면</p>
                                      <div className="pl-3">
                                        <BlockMath math="H'(x)=g(x)" />
                                      </div>
                                      <p className="pl-3">즉, <InlineMath math="H(x)" />의 <strong>도함수</strong>가 <InlineMath math="g(x)" />입니다.</p>

                                      <p className="mt-3">• 넓이−높이 대응: <InlineMath math="H" />를 <InlineMath math="y=H(x)" /> 그래프로 보면,</p>
                                      <div className="pl-3">
                                        <BlockMath math="\int_1^2 H'(x)\,dx = \int_1^2 g(x)\,dx = 34 = H(2)-H(1)" />
                                      </div>
                                      <p className="pl-3">따라서 그래프 상에서 <InlineMath math="x=1 \to 2" /> 구간 아래 넓이가 <InlineMath math="34" />이면서, 동시에 <strong>높이 차이</strong> <InlineMath math="H(2)-H(1)=34" />가 나와야 합니다.</p>
                                      <p className="pl-3">→ 이는 곡선과 그 아래 영역이 &apos;높이 = 넓이&apos;로 딱 맞아떨어지는 <em>특수한 모양</em>을 갖는다는 뜻입니다.</p>

                                      <p className="mt-3">• 모멘트 관계와 부분적분:</p>
                                      <div className="pl-3">
                                        <BlockMath math="\int_1^2 xH'(x)\,dx = [xH(x)]_1^2 - \int_1^2 H(x)\,dx" />
                                      </div>
                                      <p className="pl-3">좌변은 <InlineMath math="\int xg(x)\,dx=53" />. 우변 첫 항은 <InlineMath math="2H(2)-1\cdot H(1)" />인데, <InlineMath math="H(2)=H(1)+34" />이므로</p>
                                      <div className="pl-3">
                                        <BlockMath math="2H(2) - H(1) = 2(H(1)+34) - H(1) = H(1)+68" />
                                      </div>
                                      <p className="pl-3">한편 <InlineMath math="H(1)=1\cdot e^{f(1)}=1\cdot 16=16" />이므로</p>
                                      <div className="pl-3">
                                        <BlockMath math="[xH(x)]_1^2 = 16+68=84" />
                                      </div>
                                      <p className="pl-3">따라서</p>
                                      <div className="pl-3">
                                        <BlockMath math="53 = 84 - \int_1^2 H(x)\,dx \quad\Rightarrow\quad \int_1^2 H(x)\,dx = 31" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-4 bg-gray-900/50 border border-gray-700 rounded-lg p-2">
                                    <p className="text-xs text-purple-300 mb-2 px-2">그래프 해석</p>
                                    <img
                                      src="/image/snargpt/20251105_200318_24562090.png"
                                      alt="SNarGPT AI 수학 그래프 해석 및 풀이"
                                      className="w-full rounded cursor-pointer hover:opacity-80 transition-opacity"
                                      onClick={() => openImageModal('/image/snargpt/20251105_200318_24562090.png')}
                                    />
                                    <p className="text-xs text-purple-200 mt-2 px-2">위 그래프에서 <InlineMath math="y=H(x)=xe^{f(x)}" /> 곡선 아래 넓이(초록 영역)와 높이 증가(빨강 화살표)가 일치하는 구조를 확인할 수 있습니다.</p>
                                  </div>

                                  <div className="mt-4 pt-3 border-t border-purple-500/30">
                                    <p className="font-semibold text-purple-200 mb-2">결론</p>
                                    <p className="text-purple-100">넓이−모멘트 관계(부분적분)를 이용하면 직접 적분 없이도</p>
                                    <div className="pl-3 mt-2">
                                      <BlockMath math="\int_1^2 xe^{f(x)}\,dx = \int_1^2 H(x)\,dx = 31" />
                                    </div>
                                    <p className="text-purple-200 font-bold mt-2">정답: <InlineMath math="31" /></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {snargptView === 'search' && (
                          <>
                            {/* 첫 번째 사용자 메시지 */}
                            <div className="flex justify-end">
                              <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%] overflow-hidden break-words">
                                <p>인터넷에서 2026학년도 9월 평가원 모의고사 수학 미적 과목 답안지 좀 찾아서 30번 문제 정답 좀 알려주세요.</p>
                              </div>
                            </div>

                            {/* 첫 번째 AI 응답 */}
                            <div className="flex justify-start">
                              <div className="bg-purple-600/20 border border-purple-500/50 text-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] overflow-hidden break-words">
                                <p className="font-semibold mb-3 text-purple-200">(SNARVIS) 반가워요! 요청하신 내용 찾아 확인했어요.</p>

                                <div className="space-y-2 text-sm">
                                  <p className="text-purple-100">• 2026학년도 9월 평가원 모의고사 수학(미적분) 30번 정답: <span className="font-bold text-purple-300">31</span></p>
                                  <p className="text-purple-100">• 출처(정답표 PDF): <a href="https://horaeng.com/storage/2025년-9월-고3-모의고사-수학-정답.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">https://horaeng.com/storage/2025년-9월-고3-모의고사-수학-정답.pdf</a></p>

                                  <p className="text-purple-200 mt-3">필요하시면 해당 답안지 PDF를 바로 첨부해 드릴게요.</p>
                                </div>
                              </div>
                            </div>

                            {/* 두 번째 사용자 메시지 (후속 질문) */}
                            <div className="flex justify-end">
                              <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%] overflow-hidden break-words">
                                <p>이 문제랑 비슷한 기출 5개 찾아줘</p>
                              </div>
                            </div>

                            {/* 두 번째 AI 응답 */}
                            <div className="flex justify-start">
                              <div className="bg-purple-600/20 border border-purple-500/50 text-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] overflow-hidden break-words">
                                <p className="font-semibold mb-3 text-purple-200">(SNARVIS) 좋아요, B안(지수-로그식에서 지수화 후 곱의 미분으로 적분을 설계하는 유형)으로 최근 3년, 난이도 상, 평가원+교육청에서 유사도가 높은 문항 5개를 골랐어요.</p>

                                <div className="space-y-4 text-sm">
                                  {/* 1번 문항 */}
                                  <div className="border-l-2 border-purple-500/50 pl-3">
                                    <p className="font-bold text-purple-200 mb-2">1) 2023학년도 9월 모의평가 미적분 22번(평가원)</p>
                                    <p className="text-purple-100">• 핵심 아이디어: 주어진 항등식에서 <InlineMath math="fG+Fg=(FG)'" /> 구조를 잡아 적분을 일거에 계산</p>
                                    <p className="text-purple-100">• 한 줄 요약: (가)로 <InlineMath math="f" />형태 고정 → (나)를 <InlineMath math="(FG)'" />로 보고 적분 → <InlineMath math="G" />결정 후 <InlineMath math="\int g" /></p>
                                    <p className="text-purple-100">• 정답: <span className="font-bold text-purple-300">10</span></p>
                                  </div>

                                  {/* 2번 문항 */}
                                  <div className="border-l-2 border-purple-500/50 pl-3">
                                    <p className="font-bold text-purple-200 mb-2">2) 2023학년도 6월 모의평가 미적분 20번(평가원)</p>
                                    <p className="text-purple-100">• 핵심 아이디어: <InlineMath math="g(x)=\int_0^x f(t)\,dt" />에서 극값 조건을 미분으로 해석, 필요한 값은 적분 설계로 회수</p>
                                    <p className="text-purple-100">• 한 줄 요약: 내부 최소점 조건으로 <InlineMath math="f" />의 영점 배치 결정 → <InlineMath math="g(3)=0" />선택 → 계수 확정 → <InlineMath math="f(9)" /></p>
                                    <p className="text-purple-100">• 정답: <span className="font-bold text-purple-300">39</span></p>
                                  </div>

                                  {/* 3번 문항 */}
                                  <div className="border-l-2 border-purple-500/50 pl-3">
                                    <p className="font-bold text-purple-200 mb-2">3) 2024학년도 수능 미적분 28번(평가원)</p>
                                    <p className="text-purple-100">• 핵심 아이디어: 넓이 함수 <InlineMath math="g(t)" />를 접선−곡선 적분으로 두고, <InlineMath math="\int xf'(x)\,dx=xf(x)-\int f(x)\,dx" />(부분적분형)로 정리</p>
                                    <p className="text-purple-100">• 한 줄 요약: 볼록성으로 영역 표현 → <InlineMath math="xf'(x)" />적분 트릭 → <InlineMath math="g(1)" />과 <InlineMath math="g'(1)" />계산</p>
                                    <p className="text-purple-100">• 정답: <span className="font-bold text-purple-300"><InlineMath math="\frac{1}{2}e+\frac{2}{3}" /></span></p>
                                  </div>

                                  {/* 4번 문항 */}
                                  <div className="border-l-2 border-purple-500/50 pl-3">
                                    <p className="font-bold text-purple-200 mb-2">4) 2024년 10월 학력평가 미적분 29번(교육청)</p>
                                    <p className="text-purple-100">• 핵심 아이디어: <InlineMath math="e^{x/a}" />-형 지수식을 암시적 미분하여 <InlineMath math="f'(\theta)" />를 직접 구하는 설계</p>
                                    <p className="text-purple-100">• 한 줄 요약: 교점식 <InlineMath math="e^{f/a}=(\tan\theta)f+2" /> → <InlineMath math="\theta" />로 미분 → <InlineMath math="f'(\pi/4)" />산출</p>
                                    <p className="text-purple-100">• 정답: <span className="font-bold text-purple-300">5</span></p>
                                  </div>

                                  {/* 5번 문항 */}
                                  <div className="border-l-2 border-purple-500/50 pl-3">
                                    <p className="font-bold text-purple-200 mb-2">5) 2025년 3월 학력평가 미적분 28번(교육청)</p>
                                    <p className="text-purple-100">• 핵심 아이디어: 극한 정의 함수의 구간별 분해와 &quot;한 점 접함&quot; 조건으로 파라미터를 결정</p>
                                    <p className="text-purple-100">• 한 줄 요약: <InlineMath math="|x|" />범위별 <InlineMath math="g(x)" />를 정리 → <InlineMath math="y=2" />와 정확히 1점 조건으로 극대값 맞추기 → 값 계산</p>
                                    <p className="text-purple-100">• 정답: <span className="font-bold text-purple-300"><InlineMath math="9\sqrt{3}" /></span></p>
                                  </div>

                                  {/* 핵심 포인트 */}
                                  <div className="mt-4 pt-3 border-t border-purple-500/30">
                                    <p className="text-purple-200 mb-2">원하시면 각 문항별로 원문 링크·정답 근거 수식 전개까지 상세 해설을 붙여 드릴게요. 특히 B안의 핵심 스킬 복습용으로는 다음 확인 포인트를 추천해요.</p>
                                    <div className="text-purple-100 space-y-1 pl-3">
                                      <p>• 지수화 후 곱의 미분: <InlineMath math="f(x)=\ln(\frac{g(x)}{1+xf'(x)})\Rightarrow e^f=\frac{g}{1+xf'}\Rightarrow(xe^f)'=g" /></p>
                                      <p>• 적분 설계 트릭: <InlineMath math="\int xf'(x)\,dx=xf(x)-\int f(x)\,dx" /></p>
                                      <p>• 항등식 구조 포착: <InlineMath math="fG+Fg=(FG)'" />, 적분 구간 대체로 정답 직결</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {snargptView === 'info' && (
                          <>
                            {/* 첫 번째 질문 */}
                            <div className="flex justify-end">
                              <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%] overflow-hidden break-words">
                                <p>내 오답 중에서 미적분 관련 문제만 분석해줘</p>
                              </div>
                            </div>

                            {/* 두 번째 질문 */}
                            <div className="flex justify-end">
                              <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%] overflow-hidden break-words">
                                <p>내가 자주 틀리는 유형이 뭐야?</p>
                              </div>
                            </div>

                            {/* 세 번째 질문 */}
                            <div className="flex justify-end">
                              <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%] overflow-hidden break-words">
                                <p>최근 3년간 수학 29번에서 자주 나온 유형 알려줘</p>
                              </div>
                            </div>

                            {/* 네 번째 질문 */}
                            <div className="flex justify-end">
                              <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%] overflow-hidden break-words">
                                <p>22~25 수능 기준으로 킬러문항의 주제 변화가 어떻게 돼?</p>
                              </div>
                            </div>

                            {/* 다섯 번째 질문 */}
                            <div className="flex justify-end">
                              <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%] overflow-hidden break-words">
                                <p>26학년도 9월 모의고사 미적 중에 오답률 높은 문제 10개 추려봐</p>
                              </div>
                            </div>
                          </>
                        )}

                        {snargptView === 'school' && (
                          <>
                            {/* 사용자 메시지 */}
                            <div className="flex justify-end">
                              <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%] overflow-hidden break-words">
                                <p>오늘 SN독학기숙학원 점심 알려줘</p>
                              </div>
                            </div>

                            {/* AI 응답 */}
                            <div className="flex justify-start">
                              <div className="bg-purple-600/20 border border-purple-500/50 text-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] overflow-hidden break-words">
                                <p className="font-semibold mb-3 text-purple-200">SNARVIS입니다. 안녕하세요! 오늘(11/03, 월) SN독학기숙학원 점심 메뉴는 다음과 같습니다.</p>

                                <div className="space-y-2 text-sm">
                                  <div className="text-purple-100 pl-3">
                                    <p>• 돈육김치찌개</p>
                                    <p>• 우불당면볶음</p>
                                    <p>• 군만두(메뉴 표기상 &apos;무침만두&apos;로 보임)</p>
                                    <p>• 건파래튀각</p>
                                    <p>• 배추김치</p>
                                    <p>• 쌀밥</p>
                                    <p>• 샐러드, 요구르트</p>
                                  </div>

                                  <p className="text-purple-200 mt-3">참고: 현장 사정에 따라 일부 품목이 변동될 수 있어요.</p>
                                  <p className="text-purple-100">출처: <a href="https://www.snacademy.co.kr/community/community_meal.asp?thisdate=2025-11-03" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">https://www.snacademy.co.kr/community/community_meal.asp?thisdate=2025-11-03</a></p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* 입력창 */}
                      <div className="border-t border-gray-700 pt-4">
                        <div className="flex gap-3 items-end">
                          <div className="flex-1 relative">
                            <textarea
                              placeholder="메시지를 입력하세요..."
                              className="w-full bg-gray-900/80 border border-gray-700 rounded-2xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                              rows={1}
                              disabled
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <button className="bg-gradient-to-r from-green-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                              전송
                            </button>
                            <div className="flex gap-2 justify-center">
                              <button
                                className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
                                aria-label="첨부"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                              </button>
                              <button
                                className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
                                aria-label="음성"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 맥북 하단 그림자 */}
                  <div className="h-2 bg-gradient-to-b from-gray-300 to-transparent rounded-b-3xl"></div>
                </div>
              </div>

              {/* 자주하는 질문 섹션 */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">자주하는 질문</h3>

                <div className="mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden" style={{ maxWidth: '900px' }}>
                  {/* 질문 헤더 */}
                  <div className="bg-sn-green px-8 py-6">
                    <h4 className="text-2xl font-bold text-white mb-2">SNarGPT는 ChatGPT와 어떻게 다른가요?</h4>
                  </div>

                  {/* 답변 내용 */}
                  <div className="px-8 py-8">
                    {/* 핵심 답변 */}
                    <div className="bg-sn-bg rounded-xl p-6 mb-8 border-l-4 border-sn-green">
                      <p className="text-xl font-bold text-gray-900 mb-3">
                        &quot;ChatGPT는 세상을 아는 AI, SNarGPT는 학생을 아는 AI입니다.&quot;
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        SNarGPT는 범용 GPT 엔진을 교육 데이터와 알고리즘으로 재설계하여,
                        <span className="font-bold text-sn-green"> 한국 수능에 최적화된 &apos;교육 수직 AI(Vertical AI)&apos;</span>입니다.
                      </p>
                    </div>

                    {/* 1. 비교표 */}
                    <div className="mb-10">
                      <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-sn-green text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">1</span>
                        ChatGPT vs SNarGPT 비교
                      </h5>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-4 py-3 text-left font-bold w-32">구분</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-bold">ChatGPT</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-bold bg-sn-bg">SNarGPT</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">목적</td>
                              <td className="border border-gray-300 px-4 py-3 text-gray-700">전 세계 사용자를 위한 범용 인공지능</td>
                              <td className="border border-gray-300 px-4 py-3 bg-sn-bg font-semibold text-sn-main">수능·모의고사 중심 교육 전용 AI</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">학습 데이터</td>
                              <td className="border border-gray-300 px-4 py-3 text-gray-700">인터넷 전체(백과사전·뉴스·포럼 등)</td>
                              <td className="border border-gray-300 px-4 py-3 bg-sn-bg font-semibold text-sn-main">한국 수능 기출, 모의고사, 평가원 등 5만 문항, 학생 학습 로그, 질문</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">언어 이해 방식</td>
                              <td className="border border-gray-300 px-4 py-3 text-gray-700">일반적인 대화/정보 중심</td>
                              <td className="border border-gray-300 px-4 py-3 bg-sn-bg font-semibold text-sn-main">국어·수학·영어 등 교과 구조와 문항 난이도 체계까지 이해</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">응답 스타일</td>
                              <td className="border border-gray-300 px-4 py-3 text-gray-700">포괄적 설명, 개념적</td>
                              <td className="border border-gray-300 px-4 py-3 bg-sn-bg font-semibold text-sn-main">정답률 기반, 문제풀이 로직 중심, 오답패턴 진단형</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 2. 기술 구조 차이 */}
                    <div className="mb-10">
                      <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-sn-green text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">2</span>
                        기술 구조 차이: General LLM vs. Vertical AI
                      </h5>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* ChatGPT */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-lg">C</span>
                            </div>
                            <h6 className="font-bold text-gray-900">ChatGPT</h6>
                          </div>
                          <p className="text-gray-700 mb-3">
                            GPT-5 같은 대형 언어모델 하나로 다양한 분야를 커버합니다.
                          </p>
                          <div className="bg-white rounded-lg p-3 border border-gray-300">
                            <p className="text-sm text-gray-600">→ <span className="font-semibold">&quot;넓게 얕은&quot;</span> 형태의 지능</p>
                          </div>
                        </div>

                        {/* SNarGPT */}
                        <div className="bg-sn-bg rounded-xl p-6 border-2 border-sn-green/30">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-sn-green rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <h6 className="font-bold text-sn-main">SNarGPT</h6>
                          </div>
                          <p className="text-gray-800 mb-3 font-semibold">
                            GPT 엔진 위에 수능 구조 전용 알고리즘을 얹은 Vertical Layer AI입니다.
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-sn-green/20 space-y-2">
                            <div className="flex items-start gap-2">
                              <span className="text-sn-green mt-1">▸</span>
                              <p className="text-sm text-gray-700"><span className="font-bold">문항 유형 파싱</span> (예: 수학 21번은 함수적 사고형)</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-sn-green mt-1">▸</span>
                              <p className="text-sm text-gray-700"><span className="font-bold">선지 논리 트리</span> (선지별 추론 단서 인식)</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-sn-green mt-1">▸</span>
                              <p className="text-sm text-gray-700"><span className="font-bold">학생별 오답패턴 로그 연동</span> (SNarLink, SNarVIS 등과 통합)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. 데이터 파이프라인 차이 */}
                    <div>
                      <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-sn-green text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">3</span>
                        데이터 파이프라인 차이
                      </h5>
                      <div className="space-y-4">
                        {/* ChatGPT */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-white font-bold">C</span>
                            </div>
                            <div>
                              <h6 className="font-bold text-gray-900 mb-2">ChatGPT</h6>
                              <p className="text-gray-700">고정된 사전학습 데이터에 의존합니다.</p>
                            </div>
                          </div>
                        </div>

                        {/* SNarGPT */}
                        <div className="bg-sn-bg rounded-xl p-6 border-2 border-sn-green/30">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-sn-green rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-white font-bold">S</span>
                            </div>
                            <div className="flex-1">
                              <h6 className="font-bold text-sn-main mb-2">SNarGPT</h6>
                              <p className="text-gray-800 mb-3">
                                SN독학기숙학원, SN고요의숲, SNarGPT 내부의 실제 학습 데이터, 시험결과, 오답노트, 방화벽 로그를 실시간으로 반영합니다.
                              </p>
                              <div className="bg-white rounded-lg p-4 border border-sn-green/20">
                                <p className="text-sm text-gray-700">
                                  → 학생마다 다른 수준과 습관을 분석해 <span className="font-bold text-sn-green">&quot;개인 맞춤형 난이도와 해설&quot;</span>을 제공합니다.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'data' && (
            <div className="max-w-5xl mx-auto">
              {/* Peter Drucker 명언 */}
              <div className="mb-8 bg-sn-bg rounded-xl p-6 border-l-4 border-sn-green text-center">
                <p className="text-xl font-semibold text-sn-main italic mb-2">&quot;What gets measured gets improved.&quot;</p>
                <p className="text-gray-700 mb-2">측정할 수 없다면, 개선할 수 없다.</p>
                <p className="text-sm text-sn-green font-medium">- Peter Drucker</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">SN DATA 시스템</h3>
              <p className="text-gray-600 text-center mb-8">우리는 학생의 학습데이터를 정확히 측정, 평가 하고, 이를 피드백 합니다.</p>

              {/* 맥북 브라우저 UI - 학습 데이터 시연 */}
              <div className="mb-12">

                {/* 데이터 뷰 탭 */}
                <div className="flex justify-center mb-8 border-b border-gray-200 max-w-4xl mx-auto">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setDataView('snarlink')}
                      className={`px-6 py-3 font-medium transition-all ${
                        dataView === 'snarlink'
                          ? 'text-sn-green border-b-2 border-sn-green'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      SNarlink
                    </button>
                    <button
                      onClick={() => setDataView('wrong')}
                      className={`px-6 py-3 font-medium transition-all ${
                        dataView === 'wrong'
                          ? 'text-sn-green border-b-2 border-sn-green'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      성적/오답데이터
                    </button>
                    <button
                      onClick={() => setDataView('admission')}
                      className={`px-6 py-3 font-medium transition-all ${
                        dataView === 'admission'
                          ? 'text-sn-green border-b-2 border-sn-green'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      입시 데이터 <span className="text-xs text-gray-500">(오픈 예정)</span>
                    </button>
                  </div>
                </div>

                {/* 맥북 프레임 */}
                <div className="relative mx-auto" style={{ maxWidth: '900px' }}>
                  {/* 맥북 상단 베젤 */}
                  <div className="bg-gray-800 rounded-t-2xl pt-3 pb-2 px-4">
                    {/* 브라우저 컨트롤 버튼 */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    {/* 주소창 */}
                    <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center gap-3">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-gray-300 text-sm flex-1">
                        {dataView === 'snarlink' && 'snarlink.ai'}
                        {dataView === 'wrong' && 'snarocr.ai'}
                        {dataView === 'admission' && 'snaradmission.ai'}
                      </span>
                    </div>
                  </div>

                  {/* 브라우저 컨텐츠 영역 */}
                  <div className="bg-[#0a0e1a] border-x-4 border-b-4 border-gray-800 rounded-b-2xl p-8" style={{ minHeight: '500px' }}>
                    {/* 학습 데이터 인터페이스 */}
                    <div className="flex flex-col h-full">
                      {/* 헤더 */}
                      <div className="border-b border-gray-700 pb-4 mb-6">
                        <h2 className="text-2xl font-bold text-white">
                          {dataView === 'snarlink' && 'SNarlink'}
                          {dataView === 'wrong' && 'SNarOCR'}
                          {dataView === 'admission' && 'SN 입시 분석'}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                          {dataView === 'snarlink' && '학습 시간 모니터링 시스템'}
                          {dataView === 'wrong' && '오답 패턴 자동 분석 시스템'}
                          {dataView === 'admission' && '초개인화 입시 전략 시스템'}
                        </p>
                      </div>

                      {/* 콘텐츠 영역 */}
                      {dataView === 'snarlink' && (
                        <div className="flex-1 flex flex-col">
                          {/* 이미지 표시 영역 */}
                          <div className="flex-1 flex items-center justify-center relative">
                            {/* 이전 버튼 */}
                            <button
                              onClick={() => setCurrentSampleIndex((prev) => (prev === 0 ? 2 : prev - 1))}
                              className="absolute left-4 z-10 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
                              aria-label="이전"
                            >
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>

                            {/* 이미지 */}
                            <div className="max-w-full max-h-[400px] flex items-center justify-center">
                              <img
                                src={`/image/snargpt/sample${currentSampleIndex + 1}.gif`}
                                alt={`SNarlink AI 학습량 분석 리포트 샘플 ${currentSampleIndex + 1}`}
                                className="max-w-full max-h-[400px] rounded-lg shadow-xl cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => openImageModal(`/image/snargpt/sample${currentSampleIndex + 1}.gif`)}
                              />
                            </div>

                            {/* 다음 버튼 */}
                            <button
                              onClick={() => setCurrentSampleIndex((prev) => (prev === 2 ? 0 : prev + 1))}
                              className="absolute right-4 z-10 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
                              aria-label="다음"
                            >
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>

                          {/* 인디케이터 */}
                          <div className="flex justify-center gap-2 mt-6">
                            {[0, 1, 2].map((index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentSampleIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                  currentSampleIndex === index
                                    ? 'bg-sn-green'
                                    : 'bg-gray-600 hover:bg-gray-500'
                                }`}
                                aria-label={`샘플 ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {dataView === 'wrong' && (
                        <div className="flex-1 flex flex-col">
                          <div className="flex-1 flex items-center justify-center">
                            <div className="max-w-full max-h-[350px] flex items-center justify-center">
                              <img
                                src="/image/snargpt/ocr.png"
                                alt="SNarOCR AI 오답 분석 및 성적 데이터 시스템"
                                className="max-w-full max-h-[350px] rounded-lg shadow-xl cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => openImageModal('/image/snargpt/ocr.png')}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {dataView === 'admission' && (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <p className="text-lg">입시 데이터 분석 화면</p>
                            <p className="text-sm mt-2">(오픈 예정)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 맥북 하단 그림자 */}
                  <div className="h-2 bg-gradient-to-b from-gray-300 to-transparent rounded-b-3xl"></div>
                </div>
              </div>

              {/* 온라인 학습량 데이터 - 전체 너비 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow mb-4">
                <h4 className="font-bold text-lg text-gray-900 mb-3">1. 온라인 학습량 데이터</h4>
                <p className="text-gray-700 text-sm mb-4">학생의 접속 시간, 학습 패턴, 집중 구간 등을 정량화하여 학습 효율을 데이터로 분석합니다.</p>
                <Image
                  src="/image/programs/SN_gant.png"
                  alt="대치 고요의 숲 SNarlink 개인 맞춤 학습 리포트"
                  width={1200}
                  height={400}
                  className="w-full rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => openImageModal('/image/programs/SN_gant.png')}
                />
                <p className="text-gray-600 text-sm mt-4 text-center">
                  SNarlink AI 방화벽 시스템을 통해 학생들의 온라인 로그를 측정 분석하여, 개인별 학습량을 산출해 냅니다.
                </p>
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

          
        </div>

        {/* 프로그램 카드 */}
        <div className="mx-auto" style={{ maxWidth: '900px' }}>
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
        <div id="contact" className="mt-12 mx-auto bg-white rounded-2xl p-8 shadow-lg border-2 border-sn-main/20" style={{ maxWidth: '900px' }}>
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Contact</span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              대치동 독학관리학원 무료 상담
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

      {/* 이미지 확대 모달 */}
      {isImageModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* 닫기 버튼 */}
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="닫기"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 이미지 */}
            <img
              src={selectedImage}
              alt="확대 이미지"
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
