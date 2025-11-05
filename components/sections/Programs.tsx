'use client';

import { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function Programs() {
  const [activeTab, setActiveTab] = useState<'ai' | 'data' | 'management'>('ai');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [snargptView, setSnargptView] = useState<'question' | 'search' | 'info' | 'school'>('question');
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [dataView, setDataView] = useState<'snarlink' | 'wrong' | 'admission'>('snarlink');
  const [isDataImageModalOpen, setIsDataImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);
  const [isDetailedAnalysisOpen, setIsDetailedAnalysisOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<'daechi' | 'yangpyeong'>('daechi');

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
      description: '평가원급 난이도의 수학 문제를 자동으로 생성하는 AI 기반 수학 문제 생성기로, 문제은행 수준의 품질을 제공합니다.',
      color: 'blue',
      upcoming: true
    }
  ];

  const dataSystems = [
    {
      name: 'SNarlink(방화벽 + 온라인 학습량 측정 AI)',
      description: '학생의 온라인 학습량과 인터넷 사용을 정밀하게 측정하는 AI 방화벽형 학습 모니터링 시스템입니다. 학생의 접속 시간, 학습 패턴, 집중 구간 등을 정량화하여 학습 효율을 데이터로 분석합니다.',
      color: 'blue'
    },
    {
      name: 'SN 문제 데이터',
      description: '수능 및 모의고사 문제 중 인터넷에 있는 모든 문제는 AI가 검색을 통해 찾아 줍니다. (저작권 있는 문제 제외)',
      color: 'blue'
    },
    {
      name: '성적/오답데이터',
      description: 'SNarOCR을 통해 모의고사 답안지를 스캔하고, 학생별 오답 패턴을 자동 분석하여 맞춤형 피드백을 제공합니다.',
      color: 'purple'
    },
    {
      name: '입시 데이터',
      description: '공공 입시 데이터를 기반으로 AI가 개인의 성적, 목표 대학, 학습 패턴을 분석하여 초개인화 입시 전략을 제시합니다.',
      color: 'blue'
    }
  ];

  const managementSystems = [
    {
      name: '12시간 집중 학습 관리',
      description: '하루 12시간 이상 학습이 가능한 체계적인 타임테이블과 생활 루틴을 운영합니다.',
      color: 'blue'
    },
    {
      name: '최신 시설의 신축 캠퍼스',
      description: '최신식 학습·생활 공간과 쾌적한 환경을 갖춘 신축 건물에서 운영됩니다.',
      color: 'purple'
    },
    {
      name: '대치역 도보 3분 거리',
      description: '접근성과 안전성을 모두 갖춘 최적의 입지로, 통학 및 학부모 방문이 편리합니다.',
      color: 'blue'
    }
  ];

  return (
    <section id="programs" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 시스템 탭 섹션 */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SN 대치</span>의 핵심 시스템
            </h2>
            <p className="text-lg text-gray-600">AI, 데이터, 생활관리가 하나로 연결된 통합 학습 시스템</p>
          </div>

          {/* 탭 버튼 */}
          <div className="flex justify-center mb-8 border-b border-gray-200">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === 'ai'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                AI 시스템
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === 'data'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                데이터 시스템
              </button>
              <button
                onClick={() => setActiveTab('management')}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === 'management'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                생활관리 시스템
              </button>
            </div>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'ai' && (
              <>
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 mb-12">
                  <div className="space-y-4">
                    {aiSystems.map((system, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            system.color === 'blue' ? 'bg-blue-600' : 'bg-purple-600'
                          }`}></span>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-2">
                              {system.name}
                              {system.upcoming && (
                                <span className="text-xs text-gray-500 ml-2">(출시 예정)</span>
                              )}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{system.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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
                      <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-gray-300 text-sm flex-1">snargpt.ai</span>
                      </div>
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
                                <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                                  <p className="mb-3">@snargo 님, 이 문제 좀 풀어주세요.</p>
                                  {/* 썸네일 이미지 */}
                                  <div
                                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 w-1/4 cursor-pointer hover:border-green-500 transition-colors"
                                    onClick={() => setIsImageModalOpen(true)}
                                  >
                                    <img
                                      src="/image/snargpt/6959-1.png"
                                      alt="문제 이미지"
                                      className="w-full h-auto rounded"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* AI 응답 */}
                              <div className="flex justify-start">
                                <div className="bg-purple-600/20 border border-purple-500/50 text-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
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
                                <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                                  <p>다른 풀이 방법도 보여줘 (그래프로 푸는 버전)</p>
                                </div>
                              </div>

                              {/* 두 번째 AI 응답 - 그래프 풀이 */}
                              <div className="flex justify-start">
                                <div className="bg-purple-600/20 border border-purple-500/50 text-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
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
                                        alt="그래프 해설"
                                        className="w-full rounded"
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
                                <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                                  <p>인터넷에서 2026학년도 9월 평가원 모의고사 수학 미적 과목 답안지 좀 찾아서 30번 문제 정답 좀 알려주세요.</p>
                                </div>
                              </div>

                              {/* 첫 번째 AI 응답 */}
                              <div className="flex justify-start">
                                <div className="bg-purple-600/20 border border-purple-500/50 text-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
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
                                <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                                  <p>이 문제랑 비슷한 기출 5개 찾아줘</p>
                                </div>
                              </div>

                              {/* 두 번째 AI 응답 */}
                              <div className="flex justify-start">
                                <div className="bg-purple-600/20 border border-purple-500/50 text-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
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
                                <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                                  <p>내 오답 중에서 미적분 관련 문제만 분석해줘</p>
                                </div>
                              </div>

                              {/* 두 번째 질문 */}
                              <div className="flex justify-end">
                                <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                                  <p>내가 자주 틀리는 유형이 뭐야?</p>
                                </div>
                              </div>

                              {/* 세 번째 질문 */}
                              <div className="flex justify-end">
                                <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                                  <p>최근 3년간 수학 29번에서 자주 나온 유형 알려줘</p>
                                </div>
                              </div>

                              {/* 네 번째 질문 */}
                              <div className="flex justify-end">
                                <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                                  <p>22~25 수능 기준으로 킬러문항의 주제 변화가 어떻게 돼?</p>
                                </div>
                              </div>

                              {/* 다섯 번째 질문 */}
                              <div className="flex justify-end">
                                <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                                  <p>26학년도 9월 모의고사 미적 중에 오답률 높은 문제 10개 추려봐</p>
                                </div>
                              </div>
                            </>
                          )}

                          {snargptView === 'school' && (
                            <>
                              {/* 사용자 메시지 */}
                              <div className="flex justify-end">
                                <div className="bg-green-600/20 border border-green-500/50 text-green-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                                  <p>오늘 SN독학기숙학원 점심 알려줘</p>
                                </div>
                              </div>

                              {/* AI 응답 */}
                              <div className="flex justify-start">
                                <div className="bg-purple-600/20 border border-purple-500/50 text-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
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

                  <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    {/* 질문 헤더 */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                      <h4 className="text-2xl font-bold text-white mb-2">SNarGPT는 ChatGPT와 어떻게 다른가요?</h4>
                    </div>

                    {/* 답변 내용 */}
                    <div className="px-8 py-8">
                      {/* 핵심 답변 */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border-l-4 border-blue-600">
                        <p className="text-xl font-bold text-gray-900 mb-3">
                          &quot;ChatGPT는 세상을 아는 AI, SNarGPT는 학생을 아는 AI입니다.&quot;
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          SNarGPT는 범용 GPT 엔진을 교육 데이터와 알고리즘으로 재설계하여,
                          <span className="font-bold text-blue-700"> 한국 수능에 최적화된 &apos;교육 수직 AI(Vertical AI)&apos;</span>입니다.
                        </p>
                      </div>

                      {/* 1. 비교표 */}
                      <div className="mb-10">
                        <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">1</span>
                          ChatGPT vs SNarGPT 비교
                        </h5>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-3 text-left font-bold w-32">구분</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-bold">ChatGPT</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-bold bg-blue-50">SNarGPT</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">목적</td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-700">전 세계 사용자를 위한 범용 인공지능</td>
                                <td className="border border-gray-300 px-4 py-3 bg-blue-50 font-semibold text-blue-900">수능·모의고사 중심 교육 전용 AI</td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">학습 데이터</td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-700">인터넷 전체(백과사전·뉴스·포럼 등)</td>
                                <td className="border border-gray-300 px-4 py-3 bg-blue-50 font-semibold text-blue-900">한국 CSAT 기출, 모의고사, 평가원 문항, 학생 학습 로그</td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">언어 이해 방식</td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-700">일반적인 대화/정보 중심</td>
                                <td className="border border-gray-300 px-4 py-3 bg-blue-50 font-semibold text-blue-900">국어·수학·영어 등 교과 구조와 문항 난이도 체계까지 이해</td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">응답 스타일</td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-700">포괄적 설명, 개념적</td>
                                <td className="border border-gray-300 px-4 py-3 bg-blue-50 font-semibold text-blue-900">정답률 기반, 문제풀이 로직 중심, 오답패턴 진단형</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* 2. 기술 구조 차이 */}
                      <div className="mb-10">
                        <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="bg-purple-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">2</span>
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
                          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-300">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">S</span>
                              </div>
                              <h6 className="font-bold text-blue-900">SNarGPT</h6>
                            </div>
                            <p className="text-gray-800 mb-3 font-semibold">
                              GPT 엔진 위에 수능 구조 전용 알고리즘을 얹은 Vertical Layer AI입니다.
                            </p>
                            <div className="bg-white rounded-lg p-4 border border-blue-200 space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">▸</span>
                                <p className="text-sm text-gray-700"><span className="font-bold">문항 유형 파싱</span> (예: 수학 21번은 함수적 사고형)</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">▸</span>
                                <p className="text-sm text-gray-700"><span className="font-bold">선지 논리 트리</span> (선지별 추론 단서 인식)</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">▸</span>
                                <p className="text-sm text-gray-700"><span className="font-bold">학생별 오답패턴 로그 연동</span> (SNarLink, SNarVIS 등과 통합)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. 데이터 파이프라인 차이 */}
                      <div>
                        <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">3</span>
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
                          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-300">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white font-bold">S</span>
                              </div>
                              <div className="flex-1">
                                <h6 className="font-bold text-green-900 mb-2">SNarGPT</h6>
                                <p className="text-gray-800 mb-3">
                                  SN고요의숲 내부의 실제 학습 데이터, 시험결과, 오답노트, 방화벽 로그를 실시간으로 반영합니다.
                                </p>
                                <div className="bg-white rounded-lg p-4 border border-green-200">
                                  <p className="text-sm text-gray-700">
                                    → 학생마다 다른 수준과 습관을 분석해 <span className="font-bold text-green-700">&quot;개인 맞춤형 난이도와 해설&quot;</span>을 제공합니다.
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
              <>
                {/* 철학 문구 */}
                <div className="mb-12 text-center">
                  <blockquote className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-blue-100">
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      &quot;What gets measured gets improved.&quot;
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
                      측정할 수 없다면, 개선할 수 없다.
                    </p>
                    <footer className="text-lg text-gray-600 mt-6">
                      - Peter Drucker
                    </footer>
                  </blockquote>
                </div>

                {/* 맥북 브라우저 UI - 학습 데이터 시연 */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">학습 데이터 분석</h3>

                  {/* 데이터 뷰 탭 */}
                  <div className="flex justify-center mb-8 border-b border-gray-200 max-w-4xl mx-auto">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setDataView('snarlink')}
                        className={`px-6 py-3 font-medium transition-all ${
                          dataView === 'snarlink'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        SNarlink
                      </button>
                      <button
                        onClick={() => setDataView('wrong')}
                        className={`px-6 py-3 font-medium transition-all ${
                          dataView === 'wrong'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        성적/오답데이터
                      </button>
                      <button
                        onClick={() => setDataView('admission')}
                        className={`px-6 py-3 font-medium transition-all ${
                          dataView === 'admission'
                            ? 'text-blue-600 border-b-2 border-blue-600'
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
                                  alt={`학습 데이터 샘플 ${currentSampleIndex + 1}`}
                                  className="max-w-full max-h-[400px] rounded-lg shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => {
                                    setModalImageSrc(`/image/snargpt/sample${currentSampleIndex + 1}.gif`);
                                    setIsDataImageModalOpen(true);
                                  }}
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
                                      ? 'bg-blue-500'
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
                                  src="/image/snargpt/OCR.png"
                                  alt="SNarOCR 오답 분석"
                                  className="max-w-full max-h-[350px] rounded-lg shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => setIsDetailedAnalysisOpen(true)}
                                />
                              </div>
                            </div>

                            {/* 분석 결과 보기 버튼 */}
                            <div className="flex justify-center gap-4 mt-6">
                              <button
                                onClick={() => setIsDetailedAnalysisOpen(true)}
                                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                상세 분석 보기
                              </button>
                              <button
                                onClick={() => setIsStatisticsModalOpen(true)}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                성적표 보기
                              </button>
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

                {/* 데이터 시스템 핵심 기능 카드 */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">핵심 기능</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {/* SNarlink 카드 */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900">SNarlink</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>실시간 학습 시간 추적</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>집중도 구간 분석</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>학습 패턴 데이터화</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>방화벽 기능</span>
                        </li>
                      </ul>
                    </div>

                    {/* SN 문제 데이터 카드 */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900">문제 검색</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>수능/모의고사 문제 검색</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>AI 기반 문제 탐색</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>유사 문제 추천</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>문제 데이터베이스</span>
                        </li>
                      </ul>
                    </div>

                    {/* 성적/오답데이터 카드 */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900">SNarOCR</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>답안지 자동 스캔</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>SNarVIS AI가 스스로 분석</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>맞춤형 피드백 제공</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>약점 유형 파악</span>
                        </li>
                      </ul>
                    </div>

                    {/* 입시 데이터 카드 */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-orange-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900">입시 분석</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>개인 성적 분석</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>목표 대학 매칭</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>초개인화 입시 전략</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>공공 입시 데이터 활용</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'management' && (
              <>
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 mb-12">
                  <div className="space-y-4">
                    {managementSystems.map((system, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            system.color === 'blue' ? 'bg-blue-600' : 'bg-purple-600'
                          }`}></span>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-2">{system.name}</h3>
                            <p className="text-gray-700 leading-relaxed">{system.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 맥북 브라우저 UI - 위치 안내 */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">캠퍼스 위치</h3>

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
                        <span className="text-gray-300 text-sm flex-1">map.naver.com</span>
                      </div>
                    </div>

                    {/* 브라우저 컨텐츠 영역 */}
                    <div className="bg-white border-x-4 border-b-4 border-gray-800 rounded-b-2xl overflow-hidden" style={{ minHeight: '500px' }}>
                      {/* 네이버 지도 iframe */}
                      <iframe
                        src={
                          selectedLocation === 'daechi'
                            ? "https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%8C%80%EC%B9%98%EB%8F%99%20447?c=15.00,0,0,0,dh"
                            : "https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%96%91%ED%8F%89%EA%B5%B0%20%EC%9A%A9%EB%AC%B8%EB%A1%9C%20147?c=15.00,0,0,0,dh"
                        }
                        width="100%"
                        height="500"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={selectedLocation === 'daechi' ? 'SN 대치 캠퍼스 위치' : 'SN 양평 캠퍼스 위치'}
                      ></iframe>
                    </div>

                    {/* 맥북 하단 그림자 */}
                    <div className="h-2 bg-gradient-to-b from-gray-300 to-transparent rounded-b-3xl"></div>
                  </div>

                  {/* 위치 선택 카드 */}
                  <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {/* 대치 캠퍼스 카드 */}
                      <button
                        onClick={() => setSelectedLocation('daechi')}
                        className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all cursor-pointer hover:shadow-xl ${
                          selectedLocation === 'daechi'
                            ? 'border-blue-600 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <svg className={`w-6 h-6 ${selectedLocation === 'daechi' ? 'text-blue-600' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <h4 className={`text-xl font-bold ${selectedLocation === 'daechi' ? 'text-blue-600' : 'text-gray-900'}`}>
                            SN 대치 캠퍼스
                          </h4>
                        </div>
                        <p className="text-gray-700 text-lg text-left">서울특별시 강남구 대치동 447</p>
                        <p className="text-gray-600 mt-2 text-left">대치역 도보 3분 거리</p>
                        {selectedLocation === 'daechi' && (
                          <div className="mt-4 pt-4 border-t border-blue-200">
                            <p className="text-sm text-blue-600 font-semibold">선택됨</p>
                          </div>
                        )}
                      </button>

                      {/* 양평 캠퍼스 카드 */}
                      <button
                        onClick={() => setSelectedLocation('yangpyeong')}
                        className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all cursor-pointer hover:shadow-xl ${
                          selectedLocation === 'yangpyeong'
                            ? 'border-purple-600 ring-2 ring-purple-200'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <svg className={`w-6 h-6 ${selectedLocation === 'yangpyeong' ? 'text-purple-600' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <h4 className={`text-xl font-bold ${selectedLocation === 'yangpyeong' ? 'text-purple-600' : 'text-gray-900'}`}>
                            SN 양평 캠퍼스
                          </h4>
                        </div>
                        <p className="text-gray-700 text-lg text-left">경기도 양평군 용문로 147</p>
                        <p className="text-gray-600 mt-2 text-left">SN독학기숙학원</p>
                        {selectedLocation === 'yangpyeong' && (
                          <div className="mt-4 pt-4 border-t border-purple-200">
                            <p className="text-sm text-purple-600 font-semibold">선택됨</p>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 이미지 확대 모달 - SNarGPT 문제 */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-gray-900/50 hover:bg-gray-900/70 rounded-full p-2 transition-colors"
              aria-label="닫기"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src="/image/snargpt/6959-1.png"
              alt="문제 이미지 확대"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* 이미지 확대 모달 - 데이터 시스템 */}
      {isDataImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsDataImageModalOpen(false)}
        >
          <div className="relative max-w-6xl max-h-[90vh] p-4">
            <button
              onClick={() => setIsDataImageModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-gray-900/50 hover:bg-gray-900/70 rounded-full p-2 transition-colors z-10"
              aria-label="닫기"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={modalImageSrc}
              alt="이미지 확대"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* 상세 분석 모달 - 과목별 통계 */}
      {isDetailedAnalysisOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsDetailedAnalysisOpen(false)}
        >
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsDetailedAnalysisOpen(false)}
              className="sticky top-2 right-2 float-right text-white bg-gray-900/70 hover:bg-gray-900/90 rounded-full p-2 transition-colors z-10 mb-4"
              aria-label="닫기"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 분석 결과 카드 */}
            <div
              className="bg-white rounded-xl shadow-2xl p-8 mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 전체 기본 통계 */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-800">전체 기본 통계</h2>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">총 인원</div>
                    <div className="text-3xl font-bold text-gray-800">250<span className="text-lg">명</span></div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">전체 평균</div>
                    <div className="text-3xl font-bold text-gray-800">88.5<span className="text-lg">점</span></div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">표준편차</div>
                    <div className="text-3xl font-bold text-gray-800">8.23</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="text-sm text-blue-600 mb-1">최고 점수</div>
                    <div className="text-3xl font-bold text-blue-700">100<span className="text-lg">점</span></div>
                    <div className="text-xs text-blue-600 mt-1">↑ 김철수 (STU_...)</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="text-sm text-green-600 mb-1">최저 점수</div>
                    <div className="text-3xl font-bold text-green-700">62<span className="text-lg">점</span></div>
                    <div className="text-xs text-green-600 mt-1">↓ 이영희 (STU_...)</div>
                  </div>
                </div>
              </div>

              {/* 번호별 오답률 분석 */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-800">번호별 오답률</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="grid grid-cols-10 gap-2 mb-4">
                    {[
                      { num: 1, rate: 3 }, { num: 2, rate: 2 }, { num: 3, rate: 5 }, { num: 4, rate: 1 }, { num: 5, rate: 6 },
                      { num: 6, rate: 8 }, { num: 7, rate: 4 }, { num: 8, rate: 12 }, { num: 9, rate: 7 }, { num: 10, rate: 10 },
                      { num: 11, rate: 9 }, { num: 12, rate: 15 }, { num: 13, rate: 11 }, { num: 14, rate: 18 }, { num: 15, rate: 13 },
                      { num: 16, rate: 22 }, { num: 17, rate: 16 }, { num: 18, rate: 25 }, { num: 19, rate: 20 }, { num: 20, rate: 28 },
                      { num: 21, rate: 24 }, { num: 22, rate: 32 }, { num: 23, rate: 26 }, { num: 24, rate: 35 }, { num: 25, rate: 30 },
                      { num: 26, rate: 38 }, { num: 27, rate: 33 }, { num: 28, rate: 42 }, { num: 29, rate: 45 }, { num: 30, rate: 48 }
                    ].map(({ num, rate }) => {
                      let bgColor = 'bg-green-100 border-green-300 text-green-800';
                      let intensity = 'text-green-600';

                      if (rate >= 70) {
                        bgColor = 'bg-red-100 border-red-300 text-red-800';
                        intensity = 'text-red-700';
                      } else if (rate >= 50) {
                        bgColor = 'bg-orange-100 border-orange-300 text-orange-800';
                        intensity = 'text-orange-600';
                      } else if (rate >= 30) {
                        bgColor = 'bg-yellow-100 border-yellow-300 text-yellow-800';
                        intensity = 'text-yellow-600';
                      }

                      return (
                        <div key={num} className={`${bgColor} rounded-lg p-3 border text-center`}>
                          <div className="text-xs font-semibold mb-1">#{num}</div>
                          <div className={`text-lg font-bold ${intensity}`}>{rate}%</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 범례 */}
                  <div className="flex justify-center gap-6 pt-4 border-t border-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                      <span className="text-xs text-gray-600">0-29% (쉬움)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                      <span className="text-xs text-gray-600">30-49% (보통)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
                      <span className="text-xs text-gray-600">50-69% (어려움)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                      <span className="text-xs text-gray-600">70%+ (매우 어려움)</span>
                    </div>
                  </div>
                </div>

                {/* 고난이도 문제 TOP 5 */}
                <div className="mt-6 bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    오답률 상위 5개 문제 (집중 학습 권장)
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-orange-700">30번 문제</span>
                        <span className="text-2xl font-bold text-orange-700">48%</span>
                      </div>
                      <div className="text-xs text-gray-600">250명 중 120명 오답 | 주제: 미적분 고난도 문제</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-orange-700">29번 문제</span>
                        <span className="text-2xl font-bold text-orange-700">45%</span>
                      </div>
                      <div className="text-xs text-gray-600">250명 중 112명 오답 | 주제: 함수의 극한과 연속</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-orange-700">28번 문제</span>
                        <span className="text-2xl font-bold text-orange-700">42%</span>
                      </div>
                      <div className="text-xs text-gray-600">250명 중 105명 오답 | 주제: 적분의 활용</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-yellow-700">26번 문제</span>
                        <span className="text-2xl font-bold text-yellow-700">38%</span>
                      </div>
                      <div className="text-xs text-gray-600">250명 중 95명 오답 | 주제: 도함수의 활용</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-yellow-700">24번 문제</span>
                        <span className="text-2xl font-bold text-yellow-700">35%</span>
                      </div>
                      <div className="text-xs text-gray-600">250명 중 88명 오답 | 주제: 정적분의 계산</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 과목별 통계 요약 */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-800">과목별 통계 요약</h2>
                </div>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold">과목명</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold">응시 인원</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold">평균</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold">표준편차</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold">최고점</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold">최저점</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">국어</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">250</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">87.2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">7.85</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-blue-600 font-bold">100</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-green-600 font-bold">68</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">수학</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">250</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">89.8</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">6.92</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-blue-600 font-bold">100</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-green-600 font-bold">72</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">영어</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">250</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">88.4</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">8.15</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-blue-600 font-bold">100</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-green-600 font-bold">65</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">생명과학1</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">180</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">86.5</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">9.42</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-blue-600 font-bold">50</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-green-600 font-bold">38</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">지구과학1</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">70</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">85.3</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">8.67</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-blue-600 font-bold">50</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-green-600 font-bold">40</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 과목별 상세 통계 - 수학 */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-800">수학 기본 통계</h2>
                </div>
                <div className="grid grid-cols-5 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">인원</div>
                    <div className="text-3xl font-bold text-gray-800">250<span className="text-lg">명</span></div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">평균 점수</div>
                    <div className="text-3xl font-bold text-gray-800">89.8<span className="text-lg">점</span></div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">표준편차</div>
                    <div className="text-3xl font-bold text-gray-800">6.92</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="text-sm text-blue-600 mb-1">최고 점수</div>
                    <div className="text-3xl font-bold text-blue-700">100<span className="text-lg">점</span></div>
                    <div className="text-xs text-blue-600 mt-1">↑ 김철수 (STU_...)</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="text-sm text-green-600 mb-1">최저 점수</div>
                    <div className="text-3xl font-bold text-green-700">72<span className="text-lg">점</span></div>
                    <div className="text-xs text-green-600 mt-1">↓ 박영수 (STU_...)</div>
                  </div>
                </div>

                {/* 점수 분포 차트 */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">점수 분포 (10점 단위)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-700">70-79점</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div className="bg-yellow-500 h-full flex items-center justify-end pr-2 text-white text-xs font-bold" style={{width: '8%'}}>
                            20명
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 w-16">8%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-700">80-89점</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div className="bg-blue-500 h-full flex items-center justify-end pr-2 text-white text-sm font-bold" style={{width: '28%'}}>
                            70명
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 w-16">28%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-700">90-99점</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div className="bg-blue-600 h-full flex items-center justify-end pr-2 text-white text-lg font-bold" style={{width: '52%'}}>
                            130명
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 w-16">52%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-700">100점</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div className="bg-green-600 h-full flex items-center justify-end pr-2 text-white text-xs font-bold" style={{width: '12%'}}>
                            30명
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 w-16">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 통계 분석 결과 모달 - 성적표 스타일 */}
      {isStatisticsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsStatisticsModalOpen(false)}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsStatisticsModalOpen(false)}
              className="sticky top-2 right-2 float-right text-white bg-gray-900/70 hover:bg-gray-900/90 rounded-full p-2 transition-colors z-10 mb-4"
              aria-label="닫기"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 성적표 카드 */}
            <div
              className="bg-white rounded-xl shadow-2xl p-8 mx-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '800px' }}
            >
              {/* 헤더 */}
              <div className="flex items-baseline justify-between gap-3 mb-4 pb-3 border-b-2 border-gray-800">
                <div className="text-xl font-bold text-gray-800">SN고요의숲</div>
                <div className="text-2xl font-bold text-gray-800">개인 성적표</div>
              </div>

              {/* 학생 정보 */}
              <div className="flex gap-4 mb-6 text-sm">
                <span className="bg-gray-100 px-3 py-2 rounded">
                  <strong className="font-bold">이름</strong> 김철수
                </span>
                <span className="bg-gray-100 px-3 py-2 rounded">
                  <strong className="font-bold">학번</strong> STU_김철수
                </span>
                <span className="bg-gray-100 px-3 py-2 rounded">
                  <strong className="font-bold">회차</strong> 2025학년도 9월 모의고사
                </span>
                <span className="bg-gray-100 px-3 py-2 rounded">
                  <strong className="font-bold">발행일</strong> 2025-11-05
                </span>
              </div>

              {/* 성적 테이블 */}
              <table className="w-full border-collapse mb-6 text-sm">
                <thead>
                  <tr>
                    <th className="border border-gray-800 bg-gray-800 text-white px-4 py-3 font-bold">과목</th>
                    <th className="border border-gray-800 bg-gray-800 text-white px-4 py-3 font-bold">원점수</th>
                    <th className="border border-gray-800 bg-gray-800 text-white px-4 py-3 font-bold">표준점수</th>
                    <th className="border border-gray-800 bg-gray-800 text-white px-4 py-3 font-bold">백분위</th>
                    <th className="border border-gray-800 bg-gray-800 text-white px-4 py-3 font-bold">등급</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2 text-center font-semibold">국어</td>
                    <td className="border border-gray-800 px-4 py-2 text-center font-bold text-blue-700">96</td>
                    <td className="border border-gray-800 px-4 py-2 text-center">142</td>
                    <td className="border border-gray-800 px-4 py-2 text-center">98</td>
                    <td className="border border-gray-800 px-4 py-2 text-center font-bold text-blue-700">1</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2 text-center font-semibold">수학</td>
                    <td className="border border-gray-800 px-4 py-2 text-center font-bold text-blue-700">96</td>
                    <td className="border border-gray-800 px-4 py-2 text-center">145</td>
                    <td className="border border-gray-800 px-4 py-2 text-center">99</td>
                    <td className="border border-gray-800 px-4 py-2 text-center font-bold text-blue-700">1</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2 text-center font-semibold">영어</td>
                    <td className="border border-gray-800 px-4 py-2 text-center font-bold text-blue-700">94</td>
                    <td className="border border-gray-800 px-4 py-2 text-center">—</td>
                    <td className="border border-gray-800 px-4 py-2 text-center">—</td>
                    <td className="border border-gray-800 px-4 py-2 text-center font-bold text-blue-700">1</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2 text-center font-semibold">생명과학1</td>
                    <td className="border border-gray-800 px-4 py-2 text-center font-bold text-blue-700">48</td>
                    <td className="border border-gray-800 px-4 py-2 text-center">71</td>
                    <td className="border border-gray-800 px-4 py-2 text-center">96</td>
                    <td className="border border-gray-800 px-4 py-2 text-center font-bold text-blue-700">1</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2 text-center font-semibold">지구과학1</td>
                    <td className="border border-gray-800 px-4 py-2 text-center font-bold text-blue-700">47</td>
                    <td className="border border-gray-800 px-4 py-2 text-center">69</td>
                    <td className="border border-gray-800 px-4 py-2 text-center">95</td>
                    <td className="border border-gray-800 px-4 py-2 text-center font-bold text-blue-700">1</td>
                  </tr>
                </tbody>
              </table>

              {/* 오답 번호 */}
              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3 pb-2 border-b border-gray-300">과목별 오답번호</h3>
                <dl className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-2 text-sm">
                  <dt className="font-bold text-gray-800">국어</dt>
                  <dd className="text-gray-700">13, 28</dd>

                  <dt className="font-bold text-gray-800">수학</dt>
                  <dd className="text-gray-700">29, 30</dd>

                  <dt className="font-bold text-gray-800">영어</dt>
                  <dd className="text-gray-700">28, 40</dd>

                  <dt className="font-bold text-gray-800">생명과학1</dt>
                  <dd className="text-gray-700">18, 19</dd>

                  <dt className="font-bold text-gray-800">지구과학1</dt>
                  <dd className="text-gray-700">16, 17, 20</dd>
                </dl>
              </div>

              {/* 푸터 */}
              <div className="mt-6 pt-4 border-t border-gray-300 text-xs text-gray-600">
                ※ 본 성적표는 내부 학습 리포트용이며, 표준점수/백분위는 업로드한 기준표를 기반으로 계산되었습니다.
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
