'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { programsData } from '@/lib/data/programs';
import { typedScholarshipsData as scholarshipsData } from '@/lib/data/scholarships';
import { penaltiesData } from '@/lib/data/penalties';
import { scheduleData } from '@/lib/data/schedule';

export default function AdmissionPPT() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const totalSlides = 21;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      }
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const progressWidth = ((currentSlide + 1) / totalSlides) * 100;

  const Slide = ({ index, children, dark = false }: { index: number; children: React.ReactNode; dark?: boolean }) => (
    <div
      className={`slide ${currentSlide === index ? 'active' : ''}`}
      style={{
        display: currentSlide === index ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: dark ? 'var(--green-deep)' : 'var(--bg-cream)',
        animation: currentSlide === index ? 'fadeIn 0.6s ease-out' : 'none',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '6px',
          height: '100%',
          background: dark ? 'rgba(255,255,255,0.3)' : 'linear-gradient(180deg, var(--mint-dark) 0%, var(--green-deep) 100%)',
          zIndex: 10,
        }}
      />
      {children}
    </div>
  );

  const Tag = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
    <span
      className="inline-block px-4 py-2 rounded-full text-xs font-semibold mb-6"
      style={{
        backgroundColor: dark ? 'rgba(255,255,255,0.15)' : 'var(--mint-light)',
        color: dark ? 'white' : 'var(--green-deep)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  );

  const Divider = ({ dark = false }: { dark?: boolean }) => (
    <div
      className="w-16 h-1 rounded-full my-6"
      style={{
        background: dark
          ? 'rgba(255,255,255,0.4)'
          : 'linear-gradient(90deg, var(--mint-dark), var(--green-deep))',
      }}
    />
  );

  return (
    <div className="min-h-screen overflow-hidden" style={{ fontFamily: "'Pretendard', sans-serif", backgroundColor: '#f8faf9' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700;900&display=swap');

        :root {
          --mint-light: #e8f5f0;
          --mint: #a8d5c2;
          --mint-dark: #7bc4a8;
          --green-deep: #2d5a47;
          --green-darker: #1a3d2e;
          --gray-warm: #6b7c74;
          --gray-light: #d4ddd8;
          --bg-cream: #f8faf9;
          --text-dark: #1a2f23;
          --text-muted: #5a6b62;
          --accent-teal: #4a9d7c;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Slide 0: Title */}
      <div
        className={`slide ${currentSlide === 0 ? 'active' : ''}`}
        style={{
          display: currentSlide === 0 ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          height: '100vh',
          width: '100vw',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--green-deep)',
          animation: currentSlide === 0 ? 'fadeIn 0.6s ease-out' : 'none',
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '6px',
            height: '100%',
            background: 'rgba(255,255,255,0.3)',
            zIndex: 10,
          }}
        />

        {/* Left: Text Content */}
        <div className="flex-1 flex items-center justify-center px-12">
          <div className="text-left max-w-xl">
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-white" style={{ lineHeight: 1.2 }}>
              SN독학관리 <span style={{ color: 'var(--mint)' }}>고요의숲</span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--mint-dark)' }}>
              AI특화관
            </p>
            <Divider dark />
            <p className="text-lg md:text-xl mt-8 text-white/80">
              성공의 경험을 만들어 갑니다.
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="h-full flex items-center justify-end pr-8" style={{ width: '45%' }}>
          <div className="relative h-[85%] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/image/인테리어/SNAI_outerior.png"
              alt="SN 고요의숲 외관"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      </div>

      {/* Slide 1: The Core - Title */}
      <Slide index={1} dark>
        <div className="text-center px-8 max-w-4xl">
          <Tag dark>Section 1</Tag>
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-white" style={{ lineHeight: 1.3 }}>
            The Core
          </h1>
          <p className="text-2xl md:text-4xl font-bold mb-8 text-white" style={{ lineHeight: 1.4 }}>
            공부는 더 이상<br />
            <span style={{ color: 'var(--mint)' }}>감(感)</span>으로 하지 않습니다
          </p>
          <Divider dark />
          <p className="text-xl" style={{ color: 'var(--mint)' }}>
            우리가 최초로 &apos;AI 기반 지능형 독학&apos;의 시대를 엽니다.
          </p>
        </div>
      </Slide>

      {/* Slide 1-1: 기존 학습의 구조적 한계 */}
      <Slide index={2}>
        <div className="w-full max-w-4xl px-8">
          <Tag>1-1</Tag>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--text-dark)' }}>
            기존 학습의 구조적 한계
          </h2>
          <Divider />
          <div className="space-y-6 mt-8">
            {[
              '사람이 전부 관리할 수 없는 학습 데이터',
              '넘치는 콘텐츠로 오답은 쌓이지만 "왜 틀리는지"는 남지 않음',
              '코칭의 일관성 붕괴 (선생님/시간/상황 의존)',
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{ backgroundColor: idx === 1 ? 'var(--mint-light)' : 'white', border: '1px solid var(--gray-light)' }}
              >
                <span className="text-2xl" style={{ color: 'var(--accent-teal)' }}>✗</span>
                <p className="text-lg" style={{ color: 'var(--text-dark)' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* Slide 1-2: 결론 */}
      <Slide index={3}>
        <div className="w-full max-w-4xl px-8 text-center">
          <Tag>1-2 결론</Tag>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--text-dark)' }}>
            이제 경쟁력은<br />
            공부량 + <span style={{ color: 'var(--accent-teal)' }}>&apos;지능형 피드백 구조&apos;</span>
          </h2>
          <Divider />
          <div className="mt-8 p-8 rounded-2xl" style={{ backgroundColor: 'var(--green-deep)' }}>
            <p className="text-xl text-white mb-2">그래서 우리는</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--mint)' }}>
              👉 AI + 독학 관리 시스템을 구현하였습니다.
            </p>
          </div>
        </div>
      </Slide>

      {/* Slide 2: Intelligence - Title */}
      <Slide index={4} dark>
        <div className="text-center px-8 max-w-4xl">
          <Tag dark>Section 2</Tag>
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-white" style={{ lineHeight: 1.3 }}>
            Intelligence
          </h1>
          <p className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--mint)' }}>
            학생의 합격을 위해 14시간 함께하는<br />
            &apos;박사급 디지털 멘토단&apos;
          </p>
          <Divider dark />
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
            해결책의 핵심 엔진
          </p>
        </div>
      </Slide>

      {/* Slide 2-1: AI를 쓰는 게 아니라 설계한다 */}
      <Slide index={5}>
        <div className="w-full max-w-4xl px-8">
          <Tag>2-1</Tag>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--text-dark)' }}>
            AI를 쓰는 게 아니라, <span style={{ color: 'var(--accent-teal)' }}>&apos;설계&apos;</span>한다
          </h2>
          <Divider />
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: '#fff0f0', border: '1px solid #fecaca' }}>
              <p className="text-2xl mb-2">❌</p>
              <p className="font-medium" style={{ color: '#b91c1c' }}>검색 AI</p>
            </div>
            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: '#fff0f0', border: '1px solid #fecaca' }}>
              <p className="text-2xl mb-2">❌</p>
              <p className="font-medium" style={{ color: '#b91c1c' }}>문제풀이 AI</p>
            </div>
            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: 'var(--mint-light)', border: '2px solid var(--mint-dark)' }}>
              <p className="text-2xl mb-2">⭕</p>
              <p className="font-semibold" style={{ color: 'var(--green-deep)' }}>사고과정·학습행동을<br />분석하는 AI</p>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 2-2: 디지털 멘토단의 역할 */}
      <Slide index={6}>
        <div className="w-full max-w-5xl px-8">
          {/* Title */}
          <Tag>2-2</Tag>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
            디지털 멘토단의 역할
          </h2>
          <Divider />

          {/* MacBook Frame with Image */}
          <div className="flex justify-center mt-4 mb-4">
            <div className="rounded-xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#1e1e1e', width: '700px' }}>
              {/* Window Title Bar */}
              <div className="flex items-center gap-2 px-4 py-2" style={{ backgroundColor: '#2d2d2d' }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#febc2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28c840' }} />
                <span className="ml-3 text-xs text-gray-400">SNarGPT</span>
              </div>
              {/* Window Content */}
              <div className="relative" style={{ aspectRatio: '16/9' }}>
                <Image
                  src="/image/snargpt1.png"
                  alt="SNarGPT 화면"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: '🎯', title: '개념 이해 수준 판단', desc: 'AI가 생성한 퀴즈로 각 개념 이해 수준 판단' },
              { icon: '🔍', title: '오답 패턴 분석', desc: '학생의 오답데이터와 질문내역을 기반으로 오답 패턴 분석' },
              { icon: '🧠', title: '사고 단계 추적', desc: '학습데이터를 바탕으로 학생의 사고로직, 취약점 파악' },
              { icon: '📊', title: '온라인 학습량 자동 측정', desc: '고요의숲 공간에서 학습 시 온라인 학습량 자동 측정' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl text-center"
                style={{ backgroundColor: 'white', border: '1px solid var(--gray-light)' }}
              >
                <span className="text-2xl block mb-2">{item.icon}</span>
                <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-dark)' }}>{item.title}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* Slide 2-3: 사람과 AI의 역할 분리 */}
      <Slide index={7}>
        <div className="w-full max-w-5xl px-8">
          <Tag>2-3</Tag>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--text-dark)' }}>
            사람과 AI의 역할 분리
          </h2>
          <Divider />
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--mint-light)', border: '2px solid var(--mint-dark)' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--green-deep)' }}>🤖 AI</h3>
              <ul className="space-y-3">
                {['24시간 관찰', '퀴즈와 질문으로 학생의 사고로직 수집', '누적 데이터 분석 (장기기억 탑재)', '편향 없는 피드백'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2" style={{ color: 'var(--text-dark)' }}>
                    <span style={{ color: 'var(--mint-dark)' }}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl" style={{ backgroundColor: 'white', border: '1px solid var(--gray-light)' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--green-deep)' }}>👤 사람 (멘토/원장)</h3>
              <ul className="space-y-3">
                {['해석', '동기 설계', '방향 조정'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2" style={{ color: 'var(--text-dark)' }}>
                    <span style={{ color: 'var(--accent-teal)' }}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--green-deep)' }}>
            <p className="text-lg font-semibold text-white">
              👉 AI는 판단을 돕고, 사람은 결정을 한다
            </p>
          </div>
        </div>
      </Slide>

      {/* Slide 2-4: 학습 프로그램 */}
      <Slide index={8}>
        <div className="w-full max-w-5xl px-8">
          <Tag>2-4</Tag>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
            학습 프로그램
          </h2>
          <Divider />

          <div className="mt-4 grid grid-cols-3 gap-4">
            {/* 학습상담 */}
            <div className="p-5 rounded-2xl flex flex-col" style={{ backgroundColor: 'white', border: '2px solid var(--mint-dark)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--green-deep)' }}>
                  <span className="text-xl">📚</span>
                </div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--green-deep)' }}>학습상담</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--mint-light)' }}>
                  <p className="font-bold text-sm" style={{ color: 'var(--green-deep)' }}>박진모 원장의 수학 클리닉</p>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-cream)', border: '1px solid var(--gray-light)' }}>
                  <p className="font-medium text-sm" style={{ color: 'var(--text-dark)' }}>메디컬, SKY 조교와 주 1회 상담</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>(학습리포트 + 대면상담)</p>
                </div>
              </div>
              <div className="mt-auto pt-3">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-cream)', border: '1px solid var(--gray-light)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>조교와의 상담 내용은 모두 기록하며 해당 내용 모두 AI에게 학습시킵니다.</p>
                </div>
              </div>
            </div>

            {/* 모의고사 */}
            <div className="p-5 rounded-2xl flex flex-col" style={{ backgroundColor: 'white', border: '2px solid var(--mint-dark)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--green-deep)' }}>
                  <span className="text-xl">📝</span>
                </div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--green-deep)' }}>모의고사</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--mint-light)' }}>
                  <p className="font-bold text-sm" style={{ color: 'var(--green-deep)' }}>더프 모의고사</p>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-cream)', border: '1px solid var(--gray-light)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>이감, 한수 모의고사 신청 가능</p>
                </div>
              </div>
              <div className="mt-auto pt-3">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-cream)', border: '1px solid var(--gray-light)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>고요의숲에서 치룬 모든 모의고사의 오답은 학생 개인 AI에게 모두 학습시킵니다.</p>
                </div>
              </div>
            </div>

            {/* AI 프로그램 */}
            <div className="p-5 rounded-2xl" style={{ backgroundColor: 'white', border: '2px solid var(--mint-dark)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--green-deep)' }}>
                  <span className="text-xl">🤖</span>
                </div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--green-deep)' }}>AI 프로그램</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--mint-light)' }}>
                  <p className="font-bold text-sm" style={{ color: 'var(--green-deep)' }}>SNarGPT 수능 전용 AI</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>(매월 30,000 마나 충전)</p>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--mint-light)' }}>
                  <p className="font-bold text-sm" style={{ color: 'var(--green-deep)' }}>SNarGEN</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>나만을 위한 창작, 변형문제 출제 가능</p>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-cream)', border: '1px solid var(--gray-light)' }}>
                  <p className="font-medium text-xs mb-1" style={{ color: 'var(--green-deep)' }}>SNarGPT란?</p>
                  <ul className="text-xs space-y-1" style={{ color: 'var(--text-muted)' }}>
                    <li>• 수학 풀이 정답률 99.9%</li>
                    <li>• 평가원, 교육청 수학·국어 전문항 학습</li>
                    <li>• 장기기억 탑재로 학습 질문·오답 기억 후 피드백</li>
                    <li>• 멘탈, 건강, 입시 상담까지 가능</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 공통 안내 */}
          <div className="mt-4 p-3 rounded-xl text-center" style={{ backgroundColor: 'var(--mint-light)', border: '1px solid var(--mint-dark)' }}>
            <p className="text-sm" style={{ color: 'var(--green-deep)' }}>내 학습계획, 오답리포트, 강약점 AI 분석 상시 가능</p>
          </div>
        </div>
      </Slide>

      {/* Slide 3: Environment - Title */}
      <Slide index={9} dark>
        <div className="text-center px-8 max-w-4xl">
          <Tag dark>Section 3</Tag>
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-white" style={{ lineHeight: 1.3 }}>
            Environment
          </h1>
          <p className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--mint)' }}>
            오직 몰입만을 위해 설계된<br />
            &apos;고요의 숲&apos; 시스템
          </p>
          <Divider dark />
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
            성과가 유지되는 이유
          </p>
        </div>
      </Slide>

      {/* Slide 3-1: 고요의 숲 학습 환경 설계 */}
      <Slide index={10}>
        <div className="w-full max-w-6xl px-8">
          <Tag>3-1</Tag>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
            고요의 숲 학습 환경 설계
          </h2>
          <Divider />

          {/* 3 Images Grid */}
          <div className="grid grid-cols-3 gap-6 mt-4">
            {[
              {
                img: '/image/인테리어/KakaoTalk_20260116_130725297.jpg',
                title: '학습실',
                desc: '시선 분산을 최소화한 1인 집중 부스. 자연광과 조명 밸런스로 눈의 피로를 줄이고, 장시간 몰입이 가능한 환경을 제공합니다.'
              },
              {
                img: '/image/인테리어/KakaoTalk_20260116_130725297_03 (1).jpg',
                title: '스탠딩 책상',
                desc: '장시간 앉아있는 피로를 해소하는 스탠딩 학습 공간. 자세 변화를 통해 집중력을 유지하고 건강한 학습 습관을 형성합니다.'
              },
              {
                img: '/image/인테리어/KakaoTalk_20260116_130725297_05.jpg',
                title: '상담실',
                desc: '1:1 맞춤 상담을 위한 프라이빗 공간. 원장과의 전략 미팅, 학부모 상담이 이루어지는 핵심 공간입니다.'
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: 'white' }}>
                <div className="relative h-80">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--green-deep)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* Slide 3-2: 고요의 숲 학습 환경 설계 (2) */}
      <Slide index={11}>
        <div className="w-full max-w-6xl px-8">
          <Tag>3-2</Tag>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
            고요의 숲 학습 환경 설계
          </h2>
          <Divider />

          {/* 3 Images Grid */}
          <div className="grid grid-cols-3 gap-6 mt-4">
            {[
              {
                img: '/image/인테리어/KakaoTalk_20260116_130725297_01.jpg',
                title: '강의실',
                desc: '소규모 그룹 수업과 특강을 위한 최적화된 공간. 집중력을 높이는 조명과 음향 설계로 효과적인 학습을 지원합니다.'
              },
              {
                img: '/image/인테리어/KakaoTalk_20260116_130725297_02.jpg',
                title: '테라스',
                desc: '휴식과 재충전을 위한 야외 공간. 자연 속에서 잠시 쉬어가며 다음 학습을 위한 에너지를 충전합니다.'
              },
              {
                img: '/image/인테리어/KakaoTalk_20260116_130725297_04.jpg',
                title: '프린트 카페',
                desc: '학습 자료 출력과 간단한 음료를 즐길 수 있는 복합 공간. 편리한 학습 지원 서비스를 제공합니다.'
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: 'white' }}>
                <div className="relative h-80">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--green-deep)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* Slide 3-3: 시간표 */}
      <Slide index={12}>
        <div className="w-full max-w-5xl px-8">
          <Tag>3-3</Tag>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
            학습 시간표
          </h2>
          <Divider />

          {/* 시간표 테이블 */}
          <div className="mt-4 rounded-xl overflow-hidden shadow-lg" style={{ border: '1px solid var(--gray-light)' }}>
            <table className="w-full text-center text-sm" style={{ backgroundColor: 'white', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className="py-3 px-3 font-bold border-b" style={{ backgroundColor: 'var(--mint-light)', color: 'var(--green-deep)', width: '12%' }}>교시</th>
                  <th className="py-3 px-3 font-bold border-b" style={{ backgroundColor: 'var(--mint-light)', color: 'var(--green-deep)', width: '18%' }}>시간</th>
                  <th className="py-3 px-3 font-bold border-b" style={{ backgroundColor: 'var(--mint-light)', color: 'var(--green-deep)', width: '35%' }}>월 - 금</th>
                  <th className="py-3 px-3 font-bold border-b" style={{ backgroundColor: 'var(--mint-light)', color: 'var(--green-deep)', width: '17%' }}>토</th>
                  <th className="py-3 px-3 font-bold border-b" style={{ backgroundColor: '#fecaca', color: 'var(--text-dark)', width: '18%' }}>일</th>
                </tr>
              </thead>
              <tbody>
                {/* 1교시 */}
                <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                  <td className="py-3 px-3 font-medium" style={{ color: 'var(--text-dark)' }}>1교시</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>08:00 ~ 08:50</td>
                  <td className="py-3 px-3" rowSpan={3} style={{ color: 'var(--green-deep)', verticalAlign: 'middle' }}>
                    <div className="font-medium">자기주도학습</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>(지각 및 미입실시 출입통제)</div>
                  </td>
                  <td className="py-3 px-3" rowSpan={3} style={{ color: 'var(--green-deep)', verticalAlign: 'middle' }}>
                    <div className="font-medium">자기주도학습</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>(지각 및 미입실시 출입통제)</div>
                  </td>
                  <td className="py-3 px-3" rowSpan={3} style={{ color: 'var(--text-dark)', verticalAlign: 'middle' }}>
                    <div className="font-medium text-xs" style={{ color: 'var(--accent-teal)' }}>09:00 오픈</div>
                    <div className="font-medium">자율학습</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--accent-teal)' }}>(학습시 상점부여)</div>
                  </td>
                </tr>
                {/* 2교시 */}
                <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                  <td className="py-3 px-3 font-medium" style={{ color: 'var(--text-dark)' }}>2교시</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>09:00 ~ 10:15</td>
                </tr>
                {/* 3교시 */}
                <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                  <td className="py-3 px-3 font-medium" style={{ color: 'var(--text-dark)' }}>3교시</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>10:30 ~ 12:00</td>
                </tr>
                {/* 점심 시간 */}
                <tr style={{ borderBottom: '1px solid var(--gray-light)', backgroundColor: 'var(--mint-light)' }}>
                  <td className="py-3 px-3 font-bold" style={{ color: 'var(--green-deep)' }}>점심 시간</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>12:00 ~ 13:10</td>
                  <td className="py-3 px-3" colSpan={3} style={{ color: 'var(--text-dark)' }}>
                    외출 가능 / 휴게실 내 휴대폰 사용 가능
                  </td>
                </tr>
                {/* 4교시 */}
                <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                  <td className="py-3 px-3 font-medium" style={{ color: 'var(--text-dark)' }}>4교시</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>13:10 ~ 14:30</td>
                  <td className="py-3 px-3" rowSpan={3} style={{ color: 'var(--green-deep)', verticalAlign: 'middle' }}>
                    <div className="font-medium">자기주도학습</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>(지각 및 미입실시 출입통제)</div>
                  </td>
                  <td className="py-3 px-3" rowSpan={3} style={{ color: 'var(--green-deep)', verticalAlign: 'middle' }}>
                    <div className="font-medium">자기주도학습</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>(지각 및 미입실시 출입통제)</div>
                  </td>
                  <td className="py-3 px-3" rowSpan={3} style={{ color: 'var(--text-dark)', verticalAlign: 'middle' }}>
                    <div className="font-medium">자율학습</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--accent-teal)' }}>(학습시 상점부여)</div>
                  </td>
                </tr>
                {/* 5교시 */}
                <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                  <td className="py-3 px-3 font-medium" style={{ color: 'var(--text-dark)' }}>5교시</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>14:45 ~ 16:15</td>
                </tr>
                {/* 6교시 */}
                <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                  <td className="py-3 px-3 font-medium" style={{ color: 'var(--text-dark)' }}>6교시</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>16:30 ~ 18:00</td>
                </tr>
                {/* 저녁 시간 */}
                <tr style={{ borderBottom: '1px solid var(--gray-light)', backgroundColor: 'var(--mint-light)' }}>
                  <td className="py-3 px-3 font-bold" style={{ color: 'var(--green-deep)' }}>저녁 시간</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>18:10 ~ 19:10</td>
                  <td className="py-3 px-3" colSpan={3} style={{ color: 'var(--text-dark)' }}>
                    외출 가능 / 휴게실 내 휴대폰 사용 가능
                  </td>
                </tr>
                {/* 7교시 */}
                <tr style={{ borderBottom: '1px solid var(--gray-light)' }}>
                  <td className="py-3 px-3 font-medium" style={{ color: 'var(--text-dark)' }}>7교시</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>19:10 ~ 20:40</td>
                  <td className="py-3 px-3" rowSpan={2} style={{ color: 'var(--green-deep)', verticalAlign: 'middle' }}>
                    <div className="font-medium">자기주도학습</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>(지각 및 미입실시 출입통제)</div>
                  </td>
                  <td className="py-3 px-3" rowSpan={2} style={{ color: 'var(--text-muted)', verticalAlign: 'middle' }}>
                    <div className="font-medium">자율 학습</div>
                    <div className="text-xs mt-1">(희망자에 한함)</div>
                  </td>
                  <td className="py-3 px-3" rowSpan={2} style={{ color: 'var(--text-muted)', verticalAlign: 'middle' }}>
                    <div className="font-medium">-</div>
                    <div className="text-xs mt-1">(18시 운영 종료)</div>
                  </td>
                </tr>
                {/* 8교시 */}
                <tr>
                  <td className="py-3 px-3 font-medium" style={{ color: 'var(--text-dark)' }}>8교시</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>20:55 ~ 22:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Slide>

      {/* Slide 3-4: 벌점표 */}
      <Slide index={13}>
        <div className="w-full max-w-3xl px-8">
          <Tag>3-4</Tag>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
            벌점표
          </h2>
          <Divider />

          {/* 벌점표 테이블 */}
          <div className="mt-4 rounded-xl overflow-hidden shadow-lg" style={{ border: '1px solid var(--gray-light)' }}>
            <table className="w-full text-center" style={{ backgroundColor: 'white', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className="py-4 px-6 font-bold" style={{ backgroundColor: 'var(--green-deep)', color: 'white', width: '50%' }}>구분</th>
                  <th className="py-4 px-6 font-bold" style={{ backgroundColor: 'var(--green-deep)', color: 'white', width: '25%' }}>무단</th>
                  <th className="py-4 px-6 font-bold" style={{ backgroundColor: 'var(--green-deep)', color: 'white', width: '25%' }}>사유</th>
                </tr>
              </thead>
              <tbody>
                {penaltiesData.map((penalty, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < penaltiesData.length - 1 ? '1px solid var(--gray-light)' : 'none' }}>
                    <td className="py-4 px-6 font-medium" style={{ color: 'var(--text-dark)' }}>{penalty.category}</td>
                    <td className="py-4 px-6 font-bold text-lg" style={{ color: 'var(--green-deep)' }}>{penalty.unauthorized}</td>
                    <td className="py-4 px-6" style={{ color: 'var(--text-muted)' }}>{penalty.excused}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 하단 안내 */}
          <div className="mt-6 p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--mint-light)', border: '1px solid var(--mint-dark)' }}>
            <p className="text-sm mb-1" style={{ color: 'var(--green-deep)' }}>
              벌점 부여시 학부모님께 문자가 전송됩니다.
            </p>
            <p className="text-sm" style={{ color: 'var(--green-deep)' }}>
              벌점 누적 시 학부모 상담 및 퇴원 조치가 진행될 수 있습니다.
            </p>
          </div>
        </div>
      </Slide>

      {/* Slide 3-5: 생활 */}
      <Slide index={14}>
        <div className="w-full max-w-4xl px-8">
          <Tag>3-5</Tag>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
            생활
          </h2>
          <Divider />

          <div className="mt-6 space-y-5">
            {/* 1. 출결 */}
            <div className="p-5 rounded-xl" style={{ backgroundColor: 'white', border: '2px solid var(--mint-dark)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--green-deep)' }}>
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--green-deep)' }}>출결</h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--text-dark)' }}>
                    SNarlink 로그인 시 자동으로 출석체크, RFID 보조로 활용
                  </p>
                  <p className="text-xs px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--mint-light)', color: 'var(--text-muted)' }}>
                    매일 12:10, 17:30, 23:00에 모든 기기는 자동으로 로그아웃 후 로그인으로 출석체크
                  </p>
                </div>
              </div>
            </div>

            {/* 2. 사감 순찰 */}
            <div className="p-5 rounded-xl" style={{ backgroundColor: 'white', border: '1px solid var(--gray-light)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--green-deep)' }}>
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--green-deep)' }}>사감 순찰</h3>
                  <p className="text-sm" style={{ color: 'var(--text-dark)' }}>
                    매 30분 기준으로 사감 순찰 및 IT에 기록
                  </p>
                </div>
              </div>
            </div>

            {/* 3. 휴대폰 관리 */}
            <div className="p-5 rounded-xl" style={{ backgroundColor: 'white', border: '1px solid var(--gray-light)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--green-deep)' }}>
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--green-deep)' }}>휴대폰 관리</h3>
                  <p className="text-sm" style={{ color: 'var(--text-dark)' }}>
                    매 교시 휴대폰 제출 검사
                  </p>
                </div>
              </div>
            </div>

            {/* 4. SNarlink */}
            <div className="p-5 rounded-xl" style={{ backgroundColor: 'white', border: '2px solid var(--mint-dark)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--green-deep)' }}>
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--green-deep)' }}>SNarlink</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--mint-light)', color: 'var(--green-deep)' }}>
                      학습외 사이트 차단
                    </span>
                    <span className="text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--mint-light)', color: 'var(--green-deep)' }}>
                      우회시 AI 실시간 감지 알림
                    </span>
                    <span className="text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--mint-light)', color: 'var(--green-deep)' }}>
                      매일 학습량 자동 측정 후 리포트
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 3-6: 수강료 */}
      <Slide index={15}>
        <div className="w-full max-w-5xl px-8">
          <Tag>Fees</Tag>
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--text-dark)' }}>
            수강료 안내
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {programsData.map((program, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl"
                style={{
                  backgroundColor: 'white',
                  border: idx === 1 ? '2px solid var(--mint-dark)' : '1px solid var(--gray-light)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: idx === 1 ? 'var(--mint-dark)' : 'var(--mint-light)',
                      color: idx === 1 ? 'white' : 'var(--green-deep)',
                    }}
                  >
                    {program.badge}
                  </span>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--green-deep)' }}>
                    {program.title}
                  </h3>
                </div>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                  {program.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, i) => (
                    <li key={i} className="text-sm flex items-center gap-2" style={{ color: 'var(--text-dark)' }}>
                      <span style={{ color: 'var(--mint-dark)' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t" style={{ borderColor: 'var(--gray-light)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>월 수강료</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--green-deep)' }}>
                    {program.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
            * 자세한 수강료 문의는 상담 시 안내드립니다
          </p>
        </div>
      </Slide>

      {/* Slide 3-7: 장학금 */}
      <Slide index={16}>
        <div className="w-full max-w-5xl px-8">
          <Tag>Scholarship</Tag>
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--text-dark)' }}>
            장학금 제도
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {scholarshipsData.map((scholarship, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl"
                style={{
                  backgroundColor: 'white',
                  border: idx === 0 ? '2px solid var(--mint-dark)' : '1px solid var(--gray-light)',
                }}
              >
                <h3 className="font-bold text-lg mb-5" style={{ color: 'var(--green-deep)' }}>
                  {scholarship.title}
                </h3>
                <div className="space-y-4">
                  {scholarship.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start py-3 border-b" style={{ borderColor: 'var(--gray-light)' }}>
                      <div className="flex flex-col">
                        <span className="text-sm" style={{ color: 'var(--text-dark)' }}>{item.grade}</span>
                        {item.note && <span className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{item.note}</span>}
                      </div>
                      <span className="text-sm font-semibold whitespace-nowrap ml-4" style={{ color: 'var(--mint-dark)' }}>{item.benefit}</span>
                    </div>
                  ))}
                </div>
                {scholarship.note && (
                  <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                    {scholarship.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* Slide 4: Roadmap - Title */}
      <Slide index={17} dark>
        <div className="text-center px-8 max-w-4xl">
          <Tag dark>Section 4</Tag>
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-white" style={{ lineHeight: 1.3 }}>
            Roadmap
          </h1>
          <p className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--mint)' }}>
            입소부터 성적 폭발까지의<br />실전 프로세스
          </p>
          <Divider dark />
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
            가장 중요한 &apos;신뢰 파트&apos;
          </p>
        </div>
      </Slide>

      {/* Slide 4-1~4: 프로세스 타임라인 */}
      <Slide index={18}>
        <div className="w-full max-w-5xl px-8">
          <Tag>Roadmap</Tag>
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--text-dark)' }}>
            입소부터 성적 폭발까지
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                phase: '입소 전',
                items: ['정밀 진단 (실력 + 성향 + 학습 습관)', '목표 재정의 (현실적·전략적)'],
              },
              {
                phase: '입소 직후',
                items: ['개인별 학습 로드맵 설계', '주간 루틴 고정', 'AI 학습 추적 시작'],
              },
              {
                phase: '운영 중',
                items: ['오답·행동 데이터 누적', '주간 피드백 & 조정', '멘토 개입 포인트 최소화 + 정확화'],
              },
              {
                phase: '성적 상승',
                items: ['불안 감소', '자기주도 확립', '성적 변동성 ↓ / 상승 지속성 ↑'],
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl relative"
                style={{
                  backgroundColor: idx === 3 ? 'var(--mint-light)' : 'white',
                  border: idx === 3 ? '2px solid var(--mint-dark)' : '1px solid var(--gray-light)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3"
                  style={{ backgroundColor: 'var(--green-deep)', color: 'white' }}
                >
                  {idx + 1}
                </div>
                <h3 className="font-bold mb-3" style={{ color: 'var(--green-deep)' }}>{step.phase}</h3>
                <ul className="space-y-2">
                  {step.items.map((item, i) => (
                    <li key={i} className="text-xs flex items-start gap-1" style={{ color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--mint-dark)' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--green-deep)' }}>
            <p className="font-semibold text-white">
              👉 &apos;폭발&apos;은 우연이 아니라, <span style={{ color: 'var(--mint)' }}>설계된 결과</span>
            </p>
          </div>
        </div>
      </Slide>

      {/* Slide 6: FAQ */}
      <Slide index={20}>
        <div className="w-full max-w-4xl px-8 h-full flex flex-col">
          <Tag>FAQ</Tag>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
            자주 묻는 질문
          </h2>
          <div className="space-y-3 overflow-y-auto flex-1 pr-2" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {[
              {
                q: 'Q1. AI가 공부를 대신 가르쳐주는 건가요?',
                a: '아닙니다. AI는 정답을 대신 알려주는 존재가 아니라, 아이의 사고 과정과 학습 행동을 분석해 \'방향\'을 잡아주는 역할입니다.',
                highlight: '👉 "AI는 판단을 돕고, 사람은 결정을 합니다."',
              },
              {
                q: 'Q2. 그럼 선생님 수업은 없는 건가요?',
                a: '독학 베이스로 운영됩니다. 수학 수업은 있지만 목적이 다릅니다.',
                list: ['시간을 채우는 수업 ❌', '개념 정리 + 사고 구조를 잡아주는 수업 ⭕'],
              },
              {
                q: 'Q3. 독학이면 학생이 느슨해지지 않나요?',
                a: '그래서 \'지능형 관리\'가 필요합니다. 완전 방임형 독학이 아닙니다.',
                list: ['학습 기록 자동 수집', '행동 패턴 추적', '루틴 붕괴 시 즉각 개입'],
                highlight: '👉 공부는 혼자 하지만, 관리는 시스템이 합니다.',
              },
              {
                q: 'Q4. 이미 학원을 다니고 있는데, 병행이 가능한가요?',
                a: '학생 상황에 따라 단과 외출이 가능합니다.',
                list: ['시대인재 등 학원 수업 + 고요의 숲 독학', '과목별 병행 / 특정 기간 집중 관리'],
                note: '입학 전 진단에서 가장 효율적인 조합을 제안드립니다.',
              },
              {
                q: 'Q5. SNarGPT랑 ChatGPT, Gemini는 뭐가 다른가요?',
                a: 'ChatGPT와 Gemini는 \'범용 AI\'이고, SNarGPT는 \'수능·학습을 위해 설계된 전용 AI 시스템\'입니다.',
                sections: [
                  {
                    title: '1️⃣ 출발점이 다릅니다 (목적의 차이)',
                    compare: [
                      { label: 'ChatGPT / Gemini', items: ['전 세계 모든 사용자를 위한 범용 인공지능', '질문 → 답변 중심', '검색, 글쓰기, 요약, 번역 등 다목적'] },
                      { label: 'SNarGPT', items: ['수능·내신 학습만을 위해 설계된 전용 AI', '질문 → 사고 분석 → 학습 처방', '목표: 성적 상승 구조를 만드는 것'] },
                    ],
                    point: '👉 누구나 쓰는 AI vs \'공부 성과\'를 내기 위해 만든 AI',
                  },
                  {
                    title: '2️⃣ "정답"을 다루는 방식이 다릅니다',
                    compare: [
                      { label: 'ChatGPT / Gemini', items: ['질문에 대해 가장 그럴듯한 답을 제공', '사고 과정은 사용자에게 보이지 않음', '틀려도 "왜 틀렸는지"를 추적하지 않음'] },
                      { label: 'SNarGPT', items: ['정답보다 사고 과정을 분석', '왜 이 선택을 했는지, 어느 단계에서 개념이 흔들렸는지', '오답 패턴을 누적 관리'] },
                    ],
                    point: '👉 답을 주는 AI vs 생각을 들여다보는 AI',
                  },
                  {
                    title: '3️⃣ "기억"과 "관리"의 차이',
                    compare: [
                      { label: 'ChatGPT / Gemini', items: ['대화가 끝나면 학습 이력은 거의 남지 않음', '다음 질문은 사실상 \'새 출발\''] },
                      { label: 'SNarGPT', items: ['학생별 학습 이력 누적', '오답 유형, 실수 패턴, 취약 개념 축적', '장기적인 학습 추적과 비교 가능'] },
                    ],
                    point: '👉 일회성 대화 vs 지속적으로 아이를 아는 AI',
                  },
                  {
                    title: '4️⃣ 학생에게 미치는 실제 영향',
                    compare: [
                      { label: 'ChatGPT / Gemini', items: ['순간적인 이해는 도움', '의존 위험, 사고력 대신 \'복붙 학습\'', '성적 관리 시스템 부재'] },
                      { label: 'SNarGPT', items: ['AI가 대신 풀어주지 않음', '스스로 생각하도록 유도', '틀리는 이유를 알게 됨, 공부 루틴이 무너지기 어려움'] },
                    ],
                    point: '👉 똑똑해 보이게 만드는 AI vs 진짜 실력을 키우는 AI',
                  },
                ],
              },
              {
                q: 'Q6. 중도 환불이 가능한가요?',
                a: '네, 가능합니다. 「학원의 설립·운영 및 과외교습에 관한 법률 시행령」 별표 4에 따른 환불 규정이 적용됩니다.',
                refundTable: [
                  { period: '수업 시작 전', refund: '전액 환불' },
                  { period: '총 교습시간 1/3 경과 전', refund: '납부액의 2/3 환불' },
                  { period: '총 교습시간 1/2 경과 전', refund: '납부액의 1/2 환불' },
                  { period: '총 교습시간 1/2 경과 후', refund: '환불 불가' },
                ],
                list: [
                  '환불 사유 발생일로부터 5일 이내 환불 처리',
                  '환불 신청은 행정실로 문의해 주세요',
                ],
                note: '※ 법적 근거: 학원의 설립·운영 및 과외교습에 관한 법률 제18조, 동법 시행령 별표 4',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: 'white', border: openFaq === idx ? '2px solid var(--mint-dark)' : '1px solid var(--gray-light)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-sm" style={{ color: 'var(--green-deep)' }}>{faq.q}</span>
                  <span className="text-xl" style={{ color: 'var(--mint-dark)' }}>{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 overflow-y-auto" style={{ maxHeight: '50vh' }}>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-dark)' }}>{faq.a}</p>
                    {faq.refundTable && (
                      <div className="mb-3 rounded-lg overflow-hidden" style={{ border: '1px solid var(--gray-light)' }}>
                        <table className="w-full text-sm">
                          <thead>
                            <tr style={{ backgroundColor: 'var(--mint-dark)', color: 'white' }}>
                              <th className="px-3 py-2 text-left font-semibold">수업 진행 기준</th>
                              <th className="px-3 py-2 text-right font-semibold">환불 금액</th>
                            </tr>
                          </thead>
                          <tbody>
                            {faq.refundTable.map((row: { period: string; refund: string }, ri: number) => (
                              <tr key={ri} style={{ backgroundColor: ri % 2 === 0 ? 'white' : 'var(--bg-cream)', borderTop: '1px solid var(--gray-light)' }}>
                                <td className="px-3 py-2" style={{ color: 'var(--text-dark)' }}>{row.period}</td>
                                <td className="px-3 py-2 text-right font-semibold" style={{ color: ri === 3 ? 'var(--text-muted)' : 'var(--green-deep)' }}>{row.refund}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {faq.list && (
                      <div className="text-sm space-y-1 mb-2" style={{ color: 'var(--text-muted)' }}>
                        {faq.list.map((item: string, i: number) => <p key={i}>• {item}</p>)}
                      </div>
                    )}
                    {faq.sections && (
                      <div className="space-y-4 mt-3">
                        {faq.sections.map((section: { title: string; compare: { label: string; items: string[] }[]; point: string }, si: number) => (
                          <div key={si} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-cream)', border: '1px solid var(--gray-light)' }}>
                            <p className="font-bold text-xs mb-2" style={{ color: 'var(--green-deep)' }}>{section.title}</p>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              {section.compare.map((comp, ci: number) => (
                                <div key={ci} className="p-2 rounded" style={{ backgroundColor: ci === 1 ? 'var(--mint-light)' : 'white' }}>
                                  <p className="text-xs font-semibold mb-1" style={{ color: ci === 1 ? 'var(--green-deep)' : 'var(--text-muted)' }}>{comp.label}</p>
                                  {comp.items.map((item, ii: number) => (
                                    <p key={ii} className="text-xs" style={{ color: 'var(--text-dark)' }}>• {item}</p>
                                  ))}
                                </div>
                              ))}
                            </div>
                            <p className="text-xs px-2 py-1 rounded text-center" style={{ backgroundColor: 'var(--mint-dark)', color: 'white' }}>
                              {section.point}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {faq.highlight && (
                      <p className="text-sm px-3 py-2 rounded-lg mt-2" style={{ backgroundColor: 'var(--mint-light)', color: 'var(--green-deep)' }}>
                        {faq.highlight}
                      </p>
                    )}
                    {faq.note && (
                      <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{faq.note}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* Slide 5: Closing */}
      <Slide index={19} dark>
        <div className="text-center px-8 max-w-4xl">
          <Tag dark>Closing</Tag>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white" style={{ lineHeight: 1.4 }}>
            고요의 숲은
          </h1>
          <div className="p-8 rounded-2xl mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-2xl md:text-3xl font-bold text-white" style={{ lineHeight: '2' }}>
              &ldquo;공부를 대신해주지 않습니다.<br /><br />
              <span style={{ color: 'var(--mint)' }}>대신, 공부가 실패하지 않게 설계합니다.</span>&rdquo;
            </p>
          </div>
          <Divider dark />
          <p className="text-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            SN 고요의숲 대치
          </p>
        </div>
      </Slide>

      {/* Navigation */}
      <div className="fixed bottom-8 right-8 flex gap-3 z-50">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105"
          style={{ backgroundColor: 'white', border: '1px solid var(--gray-light)', boxShadow: '0 2px 8px rgba(45, 90, 71, 0.1)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: 'var(--green-deep)' }}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105"
          style={{ backgroundColor: 'white', border: '1px solid var(--gray-light)', boxShadow: '0 2px 8px rgba(45, 90, 71, 0.1)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: 'var(--green-deep)' }}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Page Indicator */}
      <div className="fixed bottom-8 left-8 z-50" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* Progress Bar */}
      <div
        className="fixed bottom-0 left-0 h-1 transition-all duration-300"
        style={{ width: `${progressWidth}%`, background: 'linear-gradient(90deg, var(--mint-dark) 0%, var(--green-deep) 100%)' }}
      />
    </div>
  );
}
