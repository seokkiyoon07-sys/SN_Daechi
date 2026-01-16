'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const philosophyItems = [
    {
      number: '01',
      title: 'Hyper-Personal Growth Architecture',
      content: '학생의 하루 전체를 데이터로 읽습니다.\n취약점뿐 아니라 사고 패턴, 몰입 리듬, 성장 속도까지 모델링하여\n학생마다 고유한 성장 알고리즘을 설계합니다.',
    },
    {
      number: '02',
      title: 'AI × Human Intelligence 듀얼 코칭 시스템',
      content: 'SNarGPT, SNarVIS는 24시간 학습 흐름과 사고 과정을 추적합니다.\n\n대치동 전문 강사진은 그 데이터를 바탕으로 정확한 개입과 피드백을 제공합니다.',
      highlight: 'AI의 정밀함 + 사람의 통찰이 결합된 구조입니다.',
    },
    {
      number: '03',
      title: 'Sustainable Learning System',
      content: "'열심히 하자'는 말 대신,\n12시간 이상 몰입이 가능한 구조를 설계합니다.\n\n시간 관리, 루틴, 생활 관리까지 연결된 시스템 속에서\n학생은 흔들림 없이 지속력 기반 학습을 완성합니다.",
    },
  ];

  const teamMembers = [
    { role: '서울대학교 물리학과 & 뇌인지공학 박사 (Dr. ryun)' },
    { role: 'KAIST 뇌인지공학 석사 (수석 졸업)' },
    { role: '연세대학교 경영학 기반 데이터·마케팅 전문가' },
  ];

  const coreValues = [
    {
      title: 'Transparency',
      description: '학습 진도와 성과를 투명하게 공유하고,\n정기적인 상담으로 방향을 조정합니다.',
    },
    {
      title: 'Innovation',
      description: '최신 AI 기술을 교육에 가장 먼저, 가장 깊이 적용합니다.',
    },
    {
      title: 'Excellence',
      description: '학생의 입시 성공을 위해\n연구와 투자를 멈추지 않습니다.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 1. Intro Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div
            id="intro"
            data-animate
            className={`transition-all duration-700 ${
              visibleSections.has('intro') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-sn-green/10 text-sn-green text-sm font-medium rounded-full mb-6">
              INTRO
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              SN은 &apos;학원&apos;이 아니라<br />
              <span className="text-sn-green">학습 시스템</span>입니다
            </h1>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                SN은 학생의 하루와 학습을 데이터를 통해 읽고,<br />
                과학적으로 성장 흐름을 설계하는 학습 시스템입니다.
              </p>
              <p>
                SN 대치는 여기에<br />
                대치동 전문 강사진과 밀착 지도,<br />
                그리고 AI 기반 학습 설계를 결합해<br />
                학생마다 다른 <span className="text-sn-green font-semibold">&apos;성장 알고리즘&apos;</span>을 완성합니다.
              </p>
              <p className="text-gray-800 font-medium">
                우리는<br />
                문제를 많이 푸는 곳이 아니라,<br />
                학생이 흔들리지 않고 성장하는 구조를 만드는 곳입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div
            id="mission"
            data-animate
            className={`transition-all duration-700 ${
              visibleSections.has('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-8 bg-sn-green rounded-full"></span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Mission</h2>
              <span className="text-gray-400 text-lg">하루를 설계하는 교육</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  SN 대치는 학생의 하루를 학습·생활 데이터로 분석하고,<br />
                  AI가 이를 정밀하게 해석합니다.
                </p>
                <p>
                  전문 강사진은 그 데이터를 기반으로 코칭하며,<br />
                  학생이 하루 12시간 이상 몰입할 수 있도록<br />
                  시간·루틴·생활 전반을 설계합니다.
                </p>
                <p className="text-gray-800 font-medium pt-4 border-t border-gray-200">
                  우리가 만드는 것은<br />
                  &apos;단기 성적 상승&apos;이 아니라,<br />
                  <span className="text-sn-green">꾸준함이 작동하는 시스템</span>입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Education Philosophy Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div
            id="philosophy"
            data-animate
            className={`transition-all duration-700 ${
              visibleSections.has('philosophy') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-12">
              <span className="w-1.5 h-8 bg-sn-green rounded-full"></span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Education Philosophy</h2>
              <span className="text-gray-400 text-lg">SN이 작동하는 방식</span>
            </div>
            <div className="space-y-8">
              {philosophyItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-sn-green/30 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-6">
                    <span className="flex-shrink-0 w-12 h-12 bg-sn-green text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {item.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.content}</p>
                      {item.highlight && (
                        <p className="mt-4 text-sn-green font-semibold">{item.highlight}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Behind the System Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div
            id="team"
            data-animate
            className={`transition-all duration-700 ${
              visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-8 bg-sn-green rounded-full"></span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Behind the System</h2>
              <span className="text-gray-400 text-lg">이 시스템은 누가 설계했는가</span>
            </div>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-8">
              <p>
                SN의 AI 학습 시스템은<br />
                기능 개발이 아니라 <span className="text-sn-green font-semibold">사람의 사고와 집중을 이해하는 연구</span>에서 출발했습니다.
              </p>
            </div>
            {/* 팀 구조 다이어그램 */}
            <div className="bg-gray-100 rounded-2xl p-8 mb-8 border border-gray-200">
              <div className="flex flex-col items-center">
                {/* 메인 노드 */}
                <div className="bg-sn-green text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                  SN AI 연구소
                </div>

                {/* 연결선 */}
                <div className="w-px h-8 bg-gray-400"></div>

                {/* 가로선 + 브랜치 */}
                <div className="relative w-full max-w-2xl">
                  {/* 가로선 - 세 브랜치를 연결 */}
                  <div className="absolute top-0 left-[16.67%] right-[16.67%] h-px bg-gray-400"></div>

                  {/* 세 개의 브랜치 */}
                  <div className="flex justify-between pt-0">
                    {/* Research & Architecture */}
                    <div className="flex flex-col items-center w-1/3">
                      <div className="w-px h-8 bg-gray-400"></div>
                      <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-xl text-center shadow-sm hover:shadow-md transition-all cursor-default">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-sn-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <span className="text-sn-green text-xs font-semibold">R&D</span>
                        </div>
                        <p className="text-sm font-medium">Research &<br />Architecture</p>
                      </div>
                    </div>

                    {/* Engineering & Operations */}
                    <div className="flex flex-col items-center w-1/3">
                      <div className="w-px h-8 bg-gray-400"></div>
                      <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-xl text-center shadow-sm hover:shadow-md transition-all cursor-default">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-sn-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sn-green text-xs font-semibold">ENG</span>
                        </div>
                        <p className="text-sm font-medium">Engineering &<br />Operations</p>
                      </div>
                    </div>

                    {/* Data & Quality Team */}
                    <div className="flex flex-col items-center w-1/3">
                      <div className="w-px h-8 bg-gray-400"></div>
                      <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-xl text-center shadow-sm hover:shadow-md transition-all cursor-default">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-sn-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                          </svg>
                          <span className="text-sn-green text-xs font-semibold">DATA</span>
                        </div>
                        <p className="text-sm font-medium">Data &<br />Quality Team</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Research & Architecture */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-6">
              <p className="text-sn-green font-semibold mb-4">Research & Architecture</p>
              <ul className="space-y-3 mb-6">
                {teamMembers.map((member, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-sn-green rounded-full"></span>
                    <span className="text-gray-700">{member.role}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 pt-6 space-y-4 text-gray-600">
                <p>
                  학습 데이터를<br />
                  &apos;점수&apos;가 아닌 <span className="text-gray-800 font-medium">사고의 흐름과 판단 구조</span>로 해석하고,<br />
                  학생마다 다른 몰입 리듬과 성장 곡선을 모델링합니다.
                </p>
                <p className="text-gray-800 font-medium">
                  AI는 대신 풀어주는 도구가 아니라,<br />
                  <span className="text-sn-green">사고가 완성될 때까지 함께 훈련하는 시스템</span>으로 설계됩니다.
                </p>
              </div>
            </div>

            {/* Engineering & Operations */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-6">
              <p className="text-sn-green font-semibold mb-4">Engineering & Operations</p>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  SN의 AI는 한 번 만들고 끝나는 시스템이 아닙니다.
                </p>
                <p>
                  전담 백엔드 개발자와<br />
                  마케팅·운영 전문 인력이 함께 참여하여<br />
                  <span className="text-gray-800 font-medium">학습 데이터 수집 → 분석 → 리포트 → 개선</span>까지<br />
                  하루 단위로 순환되는 운영 구조를 유지합니다.
                </p>
                <p className="text-gray-800 font-medium">
                  AI는 기술이 아니라 <span className="text-sn-green">운영되는 시스템</span>이기 때문입니다.
                </p>
              </div>
            </div>

            {/* Data & Quality Team */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <p className="text-sn-green font-semibold mb-4">Data & Quality Team</p>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  SN은 학습 AI의 정확도를<br />
                  모델이 아니라 <span className="text-gray-800 font-medium">데이터 품질</span>에서 관리합니다.
                </p>
                <p>
                  이를 위해<br />
                  필리핀·베트남 기반의 전문 라벨링 팀이<br />
                  문항, 풀이 과정, 오답 유형, 사고 단계 데이터를<br />
                  <span className="text-gray-800 font-medium">다중 검수·교차 검증 구조</span>로 관리합니다.
                </p>
              </div>
            </div>

            {/* 결론 문장 */}
            <div className="mt-8 text-center">
              <p className="text-xl text-gray-800 font-medium leading-relaxed">
                이 과정을 통해<br />
                AI는 단순히 정답을 맞히는 모델이 아니라,<br />
                <span className="text-sn-green font-bold">수능이 요구하는 사고 구조를 학습하고<br />
                학생의 사고 흐름을 교정해 실제 성적 향상으로 연결하는 모델</span>로 진화합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Key Numbers Section */}
      <section className="py-20 bg-sn-green">
        <div className="max-w-4xl mx-auto px-6">
          <div
            id="numbers"
            data-animate
            className={`transition-all duration-700 ${
              visibleSections.has('numbers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Key Numbers</h2>
              <p className="text-white/70">결과로 증명합니다</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                <div className="text-5xl font-bold text-white mb-2">11+</div>
                <div className="text-white/80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                <div className="text-5xl font-bold text-white mb-2">99.9%</div>
                <div className="text-white/80">수능 수학 AI 풀이 정확도</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                <div className="text-5xl font-bold text-white mb-2">1,000+</div>
                <div className="text-white/80">대학 합격자 배출</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div
            id="values"
            data-animate
            className={`transition-all duration-700 ${
              visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-12">
              <span className="w-1.5 h-8 bg-sn-green rounded-full"></span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Core Values</h2>
              <span className="text-gray-400 text-lg">SN이 지키는 기준</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border-l-4 border-sn-green hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-bold text-sn-green mb-4">{value.title}</h3>
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Closing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div
            id="closing"
            data-animate
            className={`transition-all duration-700 ${
              visibleSections.has('closing') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                우리가 추구하는 성장
              </h2>
              <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                <p>
                  우리는<br />
                  규모보다 <span className="text-white font-semibold">의미 있는 성장</span>을 선택합니다.
                </p>
                <p>
                  학생의 성공을 위해<br />
                  <span className="text-sn-green font-semibold">AI와 데이터에 가장 먼저,<br />
                  가장 깊이 투자하는 팀</span>입니다.
                </p>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/programs#contact"
                  className="px-8 py-4 bg-sn-green text-white font-semibold rounded-xl hover:bg-sn-green-dark transition-colors"
                >
                  상담 신청하기
                </a>
                <a
                  href="/about/philosophy"
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                >
                  관리 철학 자세히 보기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
