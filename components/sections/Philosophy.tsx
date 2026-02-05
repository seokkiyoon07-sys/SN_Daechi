'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Philosophy() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [activeTableRow, setActiveTableRow] = useState(-1);
  const [imageError, setImageError] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const hasAnimatedTableRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const comparisonData = [
    { category: '학습 콘텐츠', general: '시중 교재 및 고정된 문제 은행', sn: '사고 구조 기반으로 창작된 맞춤형 문항' },
    { category: '오답 관리', general: '틀린 문제 다시 풀어보기', sn: '오답 로직 분석 후 유사 원리 무한 생성' },
    { category: '관리 시스템', general: '조교 중심의 단순 감독', sn: '원장 + SNARVIS(AI비서) + SNarLink(데이터)' },
    { category: '피드백', general: '출결 및 단순 진도 보고', sn: 'AI 데이터 리포트 기반 전략적 학습 교정' },
    { category: '목표', general: '"학원에 머문 시간" 확보', sn: '"사고 로직 교정 및 실질적 성적 향상"' }
  ];

  // 비교표 애니메이션 - 한 번만 실행되도록 가드 추가
  useEffect(() => {
    const tableObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedTableRef.current) {
            hasAnimatedTableRef.current = true;
            // comparisonData.length 기반으로 루프
            for (let i = 0; i < comparisonData.length; i++) {
              setTimeout(() => setActiveTableRow(i), i * 200);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (tableRef.current) {
      tableObserver.observe(tableRef.current);
    }

    return () => tableObserver.disconnect();
  }, [comparisonData.length]);

  const pillars = [
    {
      number: '01',
      title: '이곳은 몰입의 공간입니다',
      subtitle: "",
      content: "SN의 학생들은 하루에 오랜 시간 공부합니다. 하지만 그것은 의지로 버티기 때문이 아닙니다.",
      highlight: '의지는 소모되는 자원입니다. 그래서 SN은 의지에 기대지 않습니다.',
      detail: "하루의 흐름을 먼저 설계합니다. 수학적 동선 설계와 인지 심리학 기반의 환경을 통해, 학생의 에너지가 오직 학습에만 사용되도록 훈련합니다.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'AI 개인 튜터 비서팀',
      subtitle: '',
      content: "SNarGPT는 한 명의 학생을 위해 움직이는 'AI 전문가 팀'입니다. 문제를 만드는 SNarGen, 수학을 푸는 SNarGo, 24시간 챙겨주는 SNarVIS가 팀이 되어 우리 아이의 성적을 책임집니다.",
      highlight: "한 명의 학생을 위한 AI 전문가 팀",
      detail: "대치동 최고 수준의 과외를 언제 어디서나 받는 효과. AI가 학생의 사고 로직을 분석하고, 약점을 정확히 짚어냅니다.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      number: '03',
      title: '수능 문항 창작 콘텐츠 엔진: SNarGen',
      subtitle: '',
      content: "SNarGen은 학생의 오답을 '답'이 아닌 '사고의 실패 지점'으로 해석합니다. 그 사고 구조를 다시 훈련하기 위해, 저작권에서 완전히 자유로운 고난도 창작 문항을 무한 생성합니다.",
      highlight: '훈련이 끝날 때까지, 콘텐츠는 멈추지 않습니다.',
      detail: "필요한 경우, 내신·기출 문제의 사고 구조를 재해석해 학습 목적에 맞게 재구성할 수도 있습니다. SNarGen이 책임집니다.",
      notes: [
        "수능 수학 문항 창작은 고도의 AI 추론 연산을 요구합니다. SN은 양보다 훈련의 밀도를 우선하며, 생성 수에는 품질 기준에 따른 제한이 적용될 수 있습니다.",
        "SNarGen이 생성한 모든 문항은 SNarGO(검증 AI)를 통해 논리 구조와 해답 흐름을 검증하며, 오류 가능성이 있는 문항은 제공하지 않습니다.",
        "평가원 및 대치동 최상위 사설 모의고사의 사고 구조를 기준으로 한 고난도 문항 창작이 가능합니다. (재학생의 경우 내신 변형문제 제공 가능)"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      number: '04',
      title: '휴먼–AI 하이브리드 케어',
      content: '분당에서 연 250명의 성공을 만들어온 수학 강사 출신 원장님의 날카로운 직관과,\nAI 비서(SNARVIS), 학습 데이터 링크(SNarLink),\n그리고 현장을 밀착 지원하는 대학생 멘토 시스템이 결합되어\n학생을 입체적으로 케어합니다.',
      highlight: "'완벽한 하이브리드 관리'를 실현합니다.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  // 원장 이미지 placeholder 컴포넌트
  const DirectorImagePlaceholder = () => (
    <div className="text-white text-center flex flex-col items-center justify-center h-full">
      <svg className="w-20 h-20 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span className="text-sm opacity-50">원장 사진</span>
    </div>
  );

  return (
    <div className="bg-white">
      {/* Section 1: Hero - Minimal Institutional Style */}
      <section
        className="relative min-h-[85vh] flex items-center"
        aria-labelledby="philosophy-hero-title"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/24.12-03724.jpg"
            alt="대치 고요의 숲 몰입형 독학관리 학습 공간"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-[#1a1f2e]/85" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          {/* Badge */}
          <p
            id="hero-label"
            data-animate
            className={`text-sm tracking-[0.15em] text-gray-500 mb-8 transition-opacity duration-500 ${
              visibleSections.has('hero-label') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            관리 철학
          </p>

          {/* Main Headline */}
          <h1
            id="philosophy-hero-title"
            data-animate
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-relaxed md:leading-loose mb-10 transition-opacity duration-500 delay-100 ${
              visibleSections.has('philosophy-hero-title') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            대치 고요의 숲 –
            <br />
            <span className="block mt-2 md:mt-4"><span className="text-[#5a7d6a]">AI 기반 지능형 독학관리</span></span>
          </h1>

          {/* Subtitle */}
          <p
            id="hero-subtitle"
            data-animate
            className={`text-lg text-gray-400 transition-opacity duration-500 delay-200 ${
              visibleSections.has('hero-subtitle') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            SN은 의지에 기대지 않고, 시스템으로 공부를 훈련시킵니다.
          </p>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-12 left-6 sm:left-8 lg:left-12 z-10" aria-hidden="true">
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <span className="w-8 h-px bg-gray-600" />
            <span>Scroll</span>
          </div>
        </div>
      </section>

      {/* AI 특화관 차별점 섹션 */}
      <section className="bg-[#f8f9fa]" aria-labelledby="ai-difference-title">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          {/* Section Header */}
          <div
            id="ai-difference-header"
            data-animate
            className={`mb-12 transition-opacity duration-500 ${
              visibleSections.has('ai-difference-header') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-sm tracking-[0.15em] text-gray-500 mb-6">
              AI 특화관
            </p>
            <h2 id="ai-difference-title" className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed mb-4">
              AI특화관, 말뿐인 마케팅 아닌가요?<br />
              <span className="text-gray-600">무엇이 다른가요?</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              많은 곳에서 AI를 말하지만, <span className="bg-[linear-gradient(to_top,rgba(253,224,71,0.7)_50%,transparent_50%)]">학습의 전 과정을 AI 시스템으로 통합(Full-Stack)한 곳은 오직 SN뿐</span>입니다.
            </p>
            <div className="mt-4 inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium">
              고요의숲 AI특화관의 차별점은 <span className="text-[#7fa892]">&apos;초개인화된 관리&apos;</span>에 있습니다.
            </div>
          </div>

          {/* AI 차별점 리스트 */}
          <div
            id="ai-difference-list"
            data-animate
            className={`space-y-6 transition-opacity duration-500 ${
              visibleSections.has('ai-difference-list') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* 기록의 연속성 */}
            <div className="border-l-2 border-gray-400 pl-6 py-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">기록의 연속성</h3>
              <p className="text-gray-600 leading-relaxed">
                멘토 선생님이 수백 명의 학생과 상담내역을 모두 기억할 수 없지만, 고요의숲의 AI는 학생과의 첫 대화부터 마지막 오답까지 모든 맥락을 기억합니다. 1년의 학습 흐름을 꿰뚫고 있는 AI 비서가 곁에 있는 것과 같습니다. AI는 반복작업과 데이터를 측정, 분석하고 전문 선생님과 멘토가 이를 코칭합니다.
              </p>
            </div>

            {/* 보이지 않는 관리 */}
            <div className="border-l-2 border-gray-400 pl-6 py-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">보이지 않는 관리</h3>
              <p className="text-gray-600 leading-relaxed">
                SNarLink 방화벽과 AI 모니터링은 단순히 딴짓을 막는 것을 넘어, 학생의 학습 패턴이 무너지는 신호를 가장 먼저 감지하여 관리자에게 알립니다.
              </p>
            </div>

            {/* 전문가의 도구 */}
            <div className="border-l-2 border-gray-400 pl-6 py-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">전문가의 도구</h3>
              <p className="text-gray-600 leading-relaxed">
                AI가 모든 것을 대신하는 것이 아닙니다. 대치동 최고의 전략 담임들이 입시 컨설팅을 이끌고, 평가원, 교육청 20만 기출문항을 학습한 AI가 정밀한 데이터로 이를 지원합니다.
              </p>
            </div>

            {/* 결론 */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <p className="text-gray-800 font-medium leading-relaxed">
                <span className="relative inline"><span className="absolute inset-x-0 bottom-0 h-[40%] bg-yellow-300/70"></span><span className="relative">기술은 거들 뿐, 본질은 학생의 성적 향상입니다.</span></span>
                <br />
                <span className="text-gray-900">고요의숲은 AI라는 가장 강력한 도구를 제대로 쓸 줄 아는 유일한 학습 공간입니다.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Four Core Pillars - Minimal Institutional Style */}
      <section className="bg-white" aria-labelledby="pillars-title">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          {/* Section Header */}
          <div
            id="pillars-header"
            data-animate
            className={`mb-20 transition-opacity duration-500 ${
              visibleSections.has('pillars-header') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-sm tracking-[0.15em] text-sn-green mb-6">
              핵심 시스템
            </p>
            <h2 id="pillars-title" className="text-2xl md:text-3xl font-semibold text-gray-900 leading-relaxed">
              왜 지금 대치동에 고요의 숲인가
            </h2>
          </div>

          {/* Pillars List */}
          <div className="space-y-16" role="list" aria-label="핵심 시스템 목록">
            {pillars.map((pillar, index) => (
              <article
                key={index}
                id={`pillar-${index}`}
                data-animate
                role="listitem"
                className={`transition-opacity duration-500 ${
                  visibleSections.has(`pillar-${index}`) ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Number + Title */}
                <div className="flex items-baseline gap-6 mb-6">
                  <span className="text-sm text-sn-green font-medium">{pillar.number}</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                    {pillar.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="pl-12 md:pl-14 space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    {pillar.content}
                  </p>

                  {/* Highlight Quote */}
                  <div className="border-l-2 border-[#5a7d6a] pl-5 py-1">
                    <p className="text-[#4a6b5a] font-medium">{pillar.highlight}</p>
                  </div>

                  <p className="text-gray-500 leading-relaxed">
                    {pillar.detail}
                  </p>

                  {/* Notes (SNarGen only) - 토글 */}
                  {pillar.notes && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <button
                        onClick={() => setIsNotesOpen(!isNotesOpen)}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${isNotesOpen ? 'rotate-90' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span>{isNotesOpen ? '상세 안내 접기' : '상세 안내 보기'}</span>
                      </button>
                      {isNotesOpen && (
                        <ul className="space-y-3 mt-4">
                          {pillar.notes.map((note: string, noteIndex: number) => (
                            <li key={noteIndex} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                              <span className="text-gray-300 flex-shrink-0">·</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Divider */}
                {index < pillars.length - 1 && (
                  <div className="mt-16 border-b border-gray-100" />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Comparison Table - Minimal Institutional Style */}
      <section className="bg-white" aria-labelledby="comparison-title">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          {/* Section Header */}
          <div
            id="comparison-header"
            data-animate
            className={`mb-16 transition-opacity duration-500 ${
              visibleSections.has('comparison-header') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-sm tracking-[0.15em] text-sn-green mb-6">
              비교 분석
            </p>
            <h2 id="comparison-title" className="text-2xl md:text-3xl font-semibold text-gray-900 leading-relaxed">
              SNarGPT 기반 학습 시스템
            </h2>
          </div>

          {/* Comparison Table */}
          <div
            ref={tableRef}
            className="border-t border-gray-200"
            role="table"
            aria-label="SN과 일반 학원 비교표"
          >
            {/* Table Header */}
            <div className="grid grid-cols-3 border-b border-gray-200" role="row">
              <div className="py-4 text-sm text-gray-500" role="columnheader">구분</div>
              <div className="py-4 text-sm text-gray-500 text-center" role="columnheader">일반 관리형 학원</div>
              <div className="py-4 text-sm text-[#4a6b5a] text-center font-medium" role="columnheader">
                SN 데이터 트레이닝
                <span className="block text-xs font-normal text-gray-400">(SNarGPT 기반)</span>
              </div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, index) => (
              <div
                key={index}
                role="row"
                className={`grid grid-cols-3 border-b border-gray-100 transition-opacity duration-500 ${
                  activeTableRow >= index ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="py-5 text-gray-900 font-medium" role="rowheader">
                  {row.category}
                </div>
                <div className="py-5 text-gray-500 text-center" role="cell">
                  {row.general}
                </div>
                <div className="py-5 text-[#4a6b5a] text-center font-medium" role="cell">
                  {row.sn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Director's Message - Minimal Institutional Style */}
      <section className="relative" aria-labelledby="director-title">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/24.12-03681.jpg"
            alt="대치동 독학재수학원 자습실 내부"
            fill
            className="object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-[#1a1f2e]/85" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <div
            id="director-section"
            data-animate
            className={`transition-opacity duration-500 ${
              visibleSections.has('director-section') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Badge */}
            <p className="text-sm tracking-[0.15em] text-gray-500 mb-8">
              원장 인사말
            </p>

            {/* Layout: Image + Content */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
              {/* Director Image */}
              <figure className="flex-shrink-0">
                <div className="w-56 h-72 md:w-72 md:h-96 bg-gray-800 overflow-hidden">
                  {imageError ? (
                    <DirectorImagePlaceholder />
                  ) : (
                    <Image
                      src="/image/thumbnail/jinmopark1.png"
                      alt="대치 고요의 숲 박진모 원장 - 수학 전문 독학관리"
                      width={288}
                      height={384}
                      className="w-full h-full object-cover object-top grayscale"
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
                <figcaption className="mt-4">
                  <p className="text-white font-medium">박진모</p>
                  <p className="text-gray-500 text-sm">SN 대치 원장</p>
                </figcaption>
              </figure>

              {/* Message */}
              <div className="flex-1">
                <h2 id="director-title" className="text-2xl md:text-3xl font-semibold text-white leading-relaxed mb-8">
                  몰입을 설계한 공간,
                  <br />
                  <span className="block mt-2">대치 고요의 숲</span>
                </h2>

                <div className="space-y-6 text-gray-400 leading-relaxed">
                  <p>
                    분당에서 한 해 250명의 학생을 성공시키며 우리는 한 가지 결론에 도달했습니다.
                    학생들은 머리가 나빠서 실패하는 것이 아니라,
                    자신에게 맞는 처방과 그것을 끝까지 지속할 훈련이 없어서 무너집니다.
                  </p>
                  <p>
                    수학 강사로서 오답의 로직을 집요하게 파고들던 그 시선으로,
                    이제는 AI 엔진과 데이터 시스템을 통해
                    공부 시간, 학습 습관, 사고 방식 전체를 정밀하게 관리합니다.
                  </p>
                  <p className="text-white">
                    단순히 앉아만 있는 관리는 끝났습니다.
                  </p>
                  <p className="text-white font-medium">
                    시간을 관리하는 학원과, 사고를 훈련하는 학원은 결과가 다릅니다.
                  </p>
                </div>

                {/* Signature line */}
                <div className="mt-10 pt-6 border-t border-gray-800">
                  <p className="text-[#7fa892]">대치동의 새로운 기준, SN이 만들겠습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sn-green" aria-labelledby="cta-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-title" className="text-2xl md:text-3xl font-bold text-white mb-4">
            대치동 독학관리학원, 무료 상담 신청
          </h2>
          <p className="text-white/80 mb-8">
            무료 학습 상담을 통해 우리 아이에게 맞는 관리 시스템을 확인하세요
          </p>
          <a
            href="/programs#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sn-green font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            무료 상담 신청하기
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
