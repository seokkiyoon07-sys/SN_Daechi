'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AICenter() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

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

  const aiTeam = [
    {
      number: '01',
      name: '스나링크 & 스나키퍼',
      nameEn: 'The Iron Shield',
      role: '학습 수호자',
      tagline: "딴짓은 지능적으로 막고, 공부량은 데이터로 증명하는 철통 보안 시스템",
      description: "인터넷 강의를 듣는 줄 알았는데 혹시 딴짓을 하지는 않을까 걱정되시죠? SNarLink & SNarKeeper는 이중으로 학생의 학습 환경을 지켜주는 강력한 보안 시스템입니다.\n\n• 스나키퍼(Keeper): AI가 학생의 질문 의도를 파악하여, 학습과 무관한 부적절한 요청을 자동으로 차단합니다.\n\n• 스나링크(Link): 학생이 주고받는 데이터 트래픽을 분석하여, 공부 외 접속 시도를 0.02초 만에 감지하고 차단합니다.\n\n또한 실제로 어디서 얼마나 공부했는지 정밀하게 측정하여 투명한 학습 리포트를 제공합니다.",
      highlight: "\"열심히 했다\"는 막연한 말 대신, 스나링크가 내놓는 투명한 데이터 리포트로 학생의 진짜 몰입 시간을 확인하세요."
    },
    {
      number: '02',
      name: '스나비스',
      nameEn: 'SNARVIS',
      role: '24시간 밀착 비서',
      tagline: "공부 계획부터 질문까지, 옆에서 다 챙겨주는 똑똑한 학습 비서",
      description: '"선생님 바쁘신데 물어봐도 되나?" 고민할 필요 없습니다. 스나비스는 학생 곁에서 24시간 대기합니다. 공부하다 궁금한 게 생기면 바로 물어볼 수 있고, 오늘 해야 할 공부 양을 체크하며 학생이 지치지 않게 페이스를 조절해 줍니다.',
      highlight: "엄마보다 더 꼼꼼하게 학생의 학습 상황을 기록하고 보고합니다."
    },
    {
      number: '03',
      name: '스나고 & 스나겐',
      nameEn: 'SNarGo & SNarGen',
      role: '학습 전문가',
      tagline: "어려운 문제는 쉽게 풀어주고, 약점은 맞춤 문제로 훈련시키는 학습 파트너",
      description: "• 스나고(SNarGo): 수학 강사 출신 원장님의 노하우가 담긴 스나고는 고난도 킬러 문항도 막힘없이 풀어냅니다. 단순히 답만 알려주는 게 아니라, '왜 이렇게 풀어야 하는지' 논리적인 과정을 학생 눈높이에서 쉽게 설명해 줍니다.\n\n• 스나겐(SNarGen): 틀린 문제를 다시 풀라고 하면 학생들은 답을 외워서 맞힙니다. 스나겐은 틀린 문제의 핵심 원리만 쏙 뽑아내서, 숫자와 형태가 바뀐 '세상에 하나뿐인 맞춤형 문제'를 즉석에서 만들어줍니다.",
      highlight: "수학의 벽에 부딪혔을 때 스나고가 해결하고, 약점이 사라질 때까지 스나겐이 훈련시킵니다."
    }
  ];

  const dailyFlow = [
    {
      step: '진단',
      description: "AI가 오늘 푼 문제, 질문, 인강 중 학생이 헷갈려 하는 '진짜 약점'을 찾아냅니다."
    },
    {
      step: '훈련',
      description: "스나겐이 그 약점을 극복할 수 있는 맞춤형 훈련지를 생성합니다."
    },
    {
      step: '해결',
      description: "공부하다 막히면 스나고와 스나비스에게 즉시 도움을 받습니다."
    },
    {
      step: '검증',
      description: "훈련 결과를 데이터로 검증하고, 다음 학습 방향을 설계합니다."
    }
  ];

  return (
    <div className="bg-white">
      {/* Section 1: Hero - AI 특화관 */}
      <section
        className="relative min-h-[85vh] flex items-center"
        aria-labelledby="ai-center-hero-title"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/24.12-03653.jpg"
            alt=""
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
            AI 특화관
          </p>

          {/* Main Headline */}
          <h1
            id="ai-center-hero-title"
            data-animate
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-relaxed md:leading-loose mb-10 transition-opacity duration-500 delay-100 ${
              visibleSections.has('ai-center-hero-title') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            데이터로 진단하고
            <br />
            <span className="block mt-2 md:mt-4">AI로 훈련하는 <span className="text-[#7fa892]">&apos;지능형 학습 센터&apos;</span></span>
          </h1>

          {/* Subtitle */}
          <p
            id="hero-subtitle"
            data-animate
            className={`text-lg text-gray-400 transition-opacity duration-500 delay-200 ${
              visibleSections.has('hero-subtitle') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            AI는 도구일 뿐, 본질은 &apos;완벽한 소화&apos;입니다.
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

      {/* Section 2: AI 철학 */}
      <section className="bg-white" aria-labelledby="philosophy-title">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <div
            id="ai-philosophy"
            data-animate
            className={`transition-opacity duration-500 ${
              visibleSections.has('ai-philosophy') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-sm tracking-[0.15em] text-sn-green mb-6">
              AI 철학
            </p>
            <h2 id="philosophy-title" className="text-2xl md:text-3xl font-semibold text-gray-900 leading-relaxed mb-10">
              AI를 도입한 이유는 단 하나,
              <br />
              <span className="block mt-2">학생의 성공을 구조로 만들기 위해서입니다.</span>
            </h2>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                SN의 AI는 충분히 정교합니다. 그러나 목적은 기술 과시가 아닙니다.
              </p>
              <p>
                실패의 원인을 정확히 짚고, 그 사고가 완성될 때까지 훈련을 반복하는 것이 SN AI의 본질입니다.
              </p>
              <div className="border-l-2 border-[#5a7d6a] pl-5 py-1">
                <p className="text-[#4a6b5a] font-medium">
                  선생님의 직관과 AI의 정밀함으로, 성공을 우연이 아닌 결과로 만듭니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: AI 드림팀 */}
      <section className="bg-[#1a1f2e]" aria-labelledby="ai-team-title">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          {/* Section Header */}
          <div
            id="ai-team-header"
            data-animate
            className={`mb-16 transition-opacity duration-500 ${
              visibleSections.has('ai-team-header') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-sm tracking-[0.15em] text-[#7fa892] mb-6">
              SN의 AI 드림팀
            </p>
            <h2 id="ai-team-title" className="text-2xl md:text-3xl font-semibold text-white leading-relaxed mb-4">
              우리 학생을 위한 &apos;드림팀&apos;
            </h2>
            <p className="text-gray-400">
              학부모님, 어려운 기술은 저희가 맡겠습니다. 학생은 그저 이 네 친구와 함께 즐겁게 공부하면 됩니다.
            </p>
          </div>

          {/* AI Team List */}
          <div className="space-y-16" role="list" aria-label="AI 팀 목록">
            {aiTeam.map((member, index) => (
              <article
                key={index}
                id={`ai-member-${index}`}
                data-animate
                role="listitem"
                className={`transition-opacity duration-500 ${
                  visibleSections.has(`ai-member-${index}`) ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Number + Name */}
                <div className="flex items-baseline gap-6 mb-4">
                  <span className="text-sm text-[#7fa892] font-medium">{member.number}</span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                      {member.role}, <span className="text-[#7fa892]">{member.name}</span>
                      <span className="text-gray-500 text-base ml-2">({member.nameEn})</span>
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="pl-12 md:pl-14 space-y-4">
                  {/* Tagline */}
                  <p className="text-[#7fa892] font-medium text-lg">
                    &quot;{member.tagline}&quot;
                  </p>

                  <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                    {member.description}
                  </p>

                  {/* Highlight */}
                  <div className="border-l-2 border-[#5a7d6a] pl-5 py-1">
                    <p className="text-white font-medium">{member.highlight}</p>
                  </div>
                </div>

                {/* Divider */}
                {index < aiTeam.length - 1 && (
                  <div className="mt-16 border-b border-gray-800" />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: AI 특화관의 하루 */}
      <section className="bg-white" aria-labelledby="daily-flow-title">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          {/* Section Header */}
          <div
            id="daily-flow-header"
            data-animate
            className={`mb-16 transition-opacity duration-500 ${
              visibleSections.has('daily-flow-header') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-sm tracking-[0.15em] text-sn-green mb-6">
              TRAINING CYCLE
            </p>
            <h2 id="daily-flow-title" className="text-2xl md:text-3xl font-semibold text-gray-900 leading-relaxed mb-4">
              SN의 학습 사이클
            </h2>
            <p className="text-gray-600">
              SN의 학습은 진단 → 훈련 → 해결 → 검증, 이 사이클로 반복됩니다.
            </p>
          </div>

          {/* Daily Flow */}
          <div
            id="daily-flow-content"
            data-animate
            className={`transition-opacity duration-500 ${
              visibleSections.has('daily-flow-content') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dailyFlow.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-16"
                >
                  {/* Step Number */}
                  <div className="absolute left-0 top-0 w-10 h-10 flex items-center justify-center bg-sn-green text-white font-bold rounded-lg">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.step}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Closing */}
      <section className="bg-[#1a1f2e]" aria-labelledby="closing-title">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <div
            id="closing-section"
            data-animate
            className={`transition-opacity duration-500 ${
              visibleSections.has('closing-section') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-sm tracking-[0.15em] text-gray-500 mb-8">
              Closing
            </p>

            <h2 id="closing-title" className="text-2xl md:text-3xl font-semibold text-white leading-relaxed mb-10">
              기술은 차갑지만,
              <br />
              <span className="block mt-2">관리는 따뜻합니다.</span>
            </h2>

            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                AI가 학생을 가르친다고 해서 선생님이 멀어지는 것이 아닙니다. 오히려 AI가 단순 반복 업무와 데이터 분석을 맡아주기에, 원장님과 선생님들은 학생의 눈을 한 번 더 맞추고, 학생의 마음을 더 깊이 상담할 수 있습니다.
              </p>
              <div className="border-l-2 border-[#5a7d6a] pl-5 py-1">
                <p className="text-[#7fa892] font-medium">
                  가장 앞선 기술로, 가장 따뜻하게 관리하는 곳. 이곳이 SN의 AI 특화관입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sn-green" aria-labelledby="cta-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-title" className="text-2xl md:text-3xl font-bold text-white mb-4">
            AI와 함께하는 학습, 직접 경험해보세요
          </h2>
          <p className="text-white/80 mb-8">
            무료 학습 상담을 통해 우리 학생에게 맞는 AI 학습 시스템을 확인하세요
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
