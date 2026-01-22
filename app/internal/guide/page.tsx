'use client';

import { useState } from 'react';

export default function ConsultationGuide() {
  const [activeSection, setActiveSection] = useState<'faq' | 'tips'>('faq');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqCategories = [
    {
      category: '프로그램 관련',
      items: [
        {
          q: '정규 독학재수반과 프리미엄 수학 관리반의 차이점은 무엇인가요?',
          a: `정규 독학재수반은 완벽한 학습 환경과 체계적인 관리 시스템을 제공합니다. 개인별 맞춤 학습 플랜, 주간/월간 성적 분석, 전담 멘토 배정, 24시간 자습실 이용이 포함됩니다.

프리미엄 수학 관리반은 박진모 원장이 직접 전담 관리하며, 1:1 개인 맞춤 케어, 매일 학습 진도 체크, 실시간 질의응답, 학부모 상담 서비스가 추가로 제공됩니다.

✅ 추천 멘트: "학생의 현재 수학 성적과 목표에 따라 적합한 프로그램이 다릅니다. 자세한 상담을 통해 최적의 프로그램을 안내해 드리겠습니다."`
        },
        {
          q: '수업 시간표는 어떻게 되나요?',
          a: `운영 시간: 월~토 08:00 ~ 22:00 (일 휴무)

자습실은 운영 시간 내 자유롭게 이용 가능하며, 개인 학습 플랜에 따라 시간표가 구성됩니다. 프리미엄 수학 관리반의 경우 매일 정해진 시간에 진도 체크가 진행됩니다.

✅ 추천 멘트: "학생의 생활 패턴과 목표에 맞춰 시간표를 조정해 드립니다. 상담 시 함께 논의해 보시죠."`
        },
        {
          q: '중간에 프로그램 변경이 가능한가요?',
          a: `네, 가능합니다. 월 단위로 프로그램 변경이 가능하며, 변경 시 차액은 정산됩니다.

⚠️ 주의사항: 프로그램 변경은 최소 2주 전에 신청해야 하며, 진행 중인 학습 플랜에 따라 조정이 필요할 수 있습니다.

✅ 추천 멘트: "학생의 성장 속도에 따라 유연하게 조정해 드리고 있습니다."`
        }
      ]
    },
    {
      category: '수강료 관련',
      items: [
        {
          q: '수강료는 얼마인가요?',
          a: `💰 정규 독학재수반: 800,000원/월
💰 프리미엄 수학 관리반: 750,000원 + 300,000원(관리비)/월

※ 상기 금액은 기본 수강료이며, 추가 서비스나 할인 혜택에 따라 달라질 수 있습니다.

✅ 추천 멘트: "자세한 수강료 안내와 할인 혜택은 방문 상담 시 안내해 드리겠습니다."`
        },
        {
          q: '할인 혜택이 있나요?',
          a: `다양한 할인 혜택이 있습니다:

• 조기 등록 할인: 개강 2주 전 등록 시 할인
• 형제/자매 할인: 형제/자매 동시 등록 시 할인
• 장기 등록 할인: 3개월 이상 등록 시 할인

✅ 추천 멘트: "학생 상황에 맞는 최적의 할인 혜택을 안내해 드리겠습니다. 자세한 내용은 상담 시 말씀드릴게요."`
        },
        {
          q: '환불 규정은 어떻게 되나요?',
          a: `환불은 학원법 및 소비자보호법에 따라 진행됩니다.

• 수업 시작 전: 전액 환불
• 수업 시작 후: 경과 일수에 따른 일할 계산 후 환불

⚠️ 주의사항: 정확한 환불 금액은 등록 시점과 수강 기간에 따라 달라지므로, 환불 문의 시 행정실로 안내해 주세요.`
        }
      ]
    },
    {
      category: '시설 및 환경',
      items: [
        {
          q: '자습실 환경은 어떤가요?',
          a: `자습실은 개인 독서실 형태의 1인 1좌석으로 운영됩니다.

• 개인 칸막이 책상으로 집중력 향상
• 개인 조명 및 콘센트 완비
• 냉난방 완비로 쾌적한 학습 환경
• CCTV를 통한 학습 관리

✅ 추천 멘트: "직접 방문하셔서 시설을 확인해 보시는 것을 추천드립니다."`
        },
        {
          q: '식사는 어떻게 해결하나요?',
          a: `학원 내 식당이 있으며, 건강한 식사를 위한 도시락 배식 서비스가 제공됩니다.

• 위생적인 식사 환경
• 영양 균형 잡힌 식단
• 정기적인 청소 및 소독

✅ 추천 멘트: "건강한 식사가 학습의 기본입니다. 균형 잡힌 식단을 제공하고 있습니다."`
        },
        {
          q: '위치와 교통편은 어떻게 되나요?',
          a: `📍 주소: 서울특별시 강남구 대치동 447
🚇 교통: 대치역 도보 3~5분

대치동 학원가 중심부에 위치하여 접근성이 우수합니다.

✅ 추천 멘트: "대치역에서 도보 5분 거리로 접근이 매우 편리합니다. 네이버 지도에서 'SN 고요의숲 대치'로 검색하시면 됩니다."`
        }
      ]
    },
    {
      category: 'AI 학습 시스템',
      items: [
        {
          q: 'AI 학습 시스템은 어떻게 활용되나요?',
          a: `SN의 AI 학습 시스템(SNarGPT)은 학생의 학습 과정을 과학적으로 분석합니다.

• 학습 데이터를 통한 취약점 분석
• 개인별 맞춤 학습 플랜 설계
• 사고 패턴과 몰입 리듬 모델링
• 24시간 학습 질의응답

✅ 추천 멘트: "AI는 대신 풀어주는 도구가 아니라, 학생의 사고 과정을 분석하고 성장을 도와주는 코치입니다."`
        },
        {
          q: '다른 학원과 AI 시스템이 어떻게 다른가요?',
          a: `SN의 AI는 단순한 문제 풀이 도구가 아닙니다.

차별점:
• 서울대, KAIST 출신 연구진이 설계
• 수능 수학 AI 풀이 정확도 99.9%
• 학생의 '사고 과정'을 분석하고 교정
• AI + 대치동 전문 강사진의 듀얼 코칭

✅ 추천 멘트: "정답을 알려주는 AI가 아니라, 왜 틀렸는지를 함께 분석하고 훈련하는 시스템입니다."`
        }
      ]
    }
  ];

  const consultationTips = [
    {
      title: '첫 인사 및 분위기 형성',
      icon: '👋',
      tips: [
        '밝고 따뜻한 표정으로 인사하기',
        '학생과 학부모의 이름을 먼저 확인하고 호칭 사용하기',
        '"오늘 오시느라 고생하셨습니다" 등 편안한 분위기 조성',
        '상담 진행 순서 간략히 안내하기'
      ]
    },
    {
      title: '학생 현황 파악',
      icon: '📊',
      tips: [
        '현재 학년, 목표 대학/학과 확인',
        '현재 성적 (내신, 모의고사) 파악',
        '취약 과목 및 학습 습관 파악',
        '이전 학원 경험 및 불만족 사항 청취',
        '※ 경청이 중요! 끼어들지 않고 끝까지 듣기'
      ]
    },
    {
      title: '프로그램 설명',
      icon: '📚',
      tips: [
        '학생 상황에 맞는 프로그램 1~2개 추천',
        'PPT 자료를 활용하여 시각적으로 설명',
        'AI 시스템의 차별점 강조',
        '실제 성공 사례 언급 (구체적 수치 활용)',
        '※ 모든 프로그램이 아닌, 맞춤형 추천!'
      ]
    },
    {
      title: '수강료 안내',
      icon: '💰',
      tips: [
        '가격을 먼저 말하지 않기 - 가치를 먼저 설명',
        '기본 수강료 안내 후 포함 서비스 상세 설명',
        '해당되는 할인 혜택 적극적으로 안내',
        '타 학원 대비 차별화된 가치 강조',
        '※ "비싸다"는 반응에는 가성비 설명'
      ]
    },
    {
      title: '시설 안내 (방문 상담 시)',
      icon: '🏢',
      tips: [
        '자습실, 상담실, 휴게실 순서로 안내',
        '각 공간의 특징과 장점 설명',
        '안전 관리 시스템 (CCTV, 출입관리) 강조',
        '쾌적한 환경 유지 노력 언급',
        '※ 학부모에게 안전 강조, 학생에게 편의시설 강조'
      ]
    },
    {
      title: '마무리 및 등록 유도',
      icon: '✅',
      tips: [
        '상담 내용 요약하기',
        '추가 질문 여부 확인',
        '등록 의사 확인 (부담 주지 않게)',
        '등록 절차 간략히 안내',
        '연락처 교환 및 추후 연락 약속',
        '※ 바로 결정이 어려우면 팔로업 일정 잡기'
      ]
    }
  ];

  const responseExamples = [
    {
      situation: '"다른 학원도 보고 있어요"',
      badResponse: '❌ "저희가 제일 좋아요" / "다른 곳은 별로예요"',
      goodResponse: '✅ "충분히 비교해 보시는 것이 좋습니다. 저희만의 차별점은 AI 학습 시스템과 대치동 전문 강사진의 결합입니다. 다른 곳과 비교해 보시고 궁금한 점 있으시면 언제든 연락 주세요."'
    },
    {
      situation: '"비용이 좀 부담돼요"',
      badResponse: '❌ "원래 이 정도예요" / "싼 곳 가시면 돼요"',
      goodResponse: '✅ "충분히 이해합니다. 저희 수강료에는 AI 시스템, 전담 멘토, 24시간 자습실 등 모든 서비스가 포함되어 있습니다. 또한 조기등록/장기등록 할인도 있으니 상황에 맞게 안내해 드릴게요."'
    },
    {
      situation: '"성적이 오를까요?"',
      badResponse: '❌ "당연히 오르죠" / "보장합니다"',
      goodResponse: '✅ "성적 향상은 학생의 노력과 저희 시스템이 함께할 때 가능합니다. 저희는 AI 데이터 분석으로 취약점을 정확히 파악하고, 전문 강사진이 밀착 관리합니다. 지금까지 1,000명 이상의 합격자를 배출한 시스템입니다."'
    },
    {
      situation: '"아이가 독학을 못 할 것 같아요"',
      badResponse: '❌ "그런 아이들 많아요" / "다 적응해요"',
      goodResponse: '✅ "처음에는 걱정되실 수 있습니다. 저희는 전담 멘토가 매일 학습 상황을 체크하고, 학부모님께 주간 리포트를 드립니다. 혼자 공부하는 것이 아니라 촘촘한 관리 속에서 학습하는 구조입니다."'
    }
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Pretendard', sans-serif", backgroundColor: '#f8faf9' }}>
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
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'white', borderColor: 'var(--gray-light)' }}>
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, var(--mint-dark) 0%, var(--green-deep) 100%)' }}></div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-dark)' }}>
                입학상담 업무가이드
              </h1>
              <span
                className="px-2 py-0.5 rounded text-xs font-medium"
                style={{ backgroundColor: 'var(--mint-light)', color: 'var(--green-deep)' }}
              >
                내부용
              </span>
            </div>
            <a
              href="/internal/ppt"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ backgroundColor: 'var(--mint-light)', color: 'var(--green-deep)' }}
            >
              PPT 자료 보기 →
            </a>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-[73px] z-40 border-b" style={{ backgroundColor: 'var(--bg-cream)', borderColor: 'var(--gray-light)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveSection('faq')}
              className="px-6 py-4 font-medium transition-all border-b-2"
              style={{
                color: activeSection === 'faq' ? 'var(--green-deep)' : 'var(--text-muted)',
                borderColor: activeSection === 'faq' ? 'var(--green-deep)' : 'transparent'
              }}
            >
              📋 FAQ (자주 묻는 질문)
            </button>
            <button
              onClick={() => setActiveSection('tips')}
              className="px-6 py-4 font-medium transition-all border-b-2"
              style={{
                color: activeSection === 'tips' ? 'var(--green-deep)' : 'var(--text-muted)',
                borderColor: activeSection === 'tips' ? 'var(--green-deep)' : 'transparent'
              }}
            >
              💡 상담 응대 요령
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {activeSection === 'faq' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-dark)' }}>
                자주 묻는 질문 (FAQ)
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                상담 시 자주 받는 질문과 권장 답변입니다
              </p>
            </div>

            {faqCategories.map((category, categoryIdx) => (
              <div key={categoryIdx} className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'white', border: '1px solid var(--gray-light)' }}>
                <div className="px-6 py-4 border-b" style={{ backgroundColor: 'var(--mint-light)', borderColor: 'var(--gray-light)' }}>
                  <h3 className="font-bold" style={{ color: 'var(--green-deep)' }}>{category.category}</h3>
                </div>
                <div className="divide-y" style={{ borderColor: 'var(--gray-light)' }}>
                  {category.items.map((item, itemIdx) => {
                    const faqKey = categoryIdx * 100 + itemIdx;
                    return (
                      <div key={itemIdx}>
                        <button
                          onClick={() => setOpenFaq(openFaq === faqKey ? null : faqKey)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium pr-4" style={{ color: 'var(--text-dark)' }}>
                            Q. {item.q}
                          </span>
                          <svg
                            className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === faqKey ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openFaq === faqKey && (
                          <div className="px-6 py-4 border-t" style={{ backgroundColor: '#fafbfa', borderColor: 'var(--gray-light)' }}>
                            <div className="whitespace-pre-line text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                              {item.a}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'tips' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-dark)' }}>
                상담 응대 요령
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                효과적인 입학 상담을 위한 가이드라인
              </p>
            </div>

            {/* 상담 프로세스 */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'white', border: '1px solid var(--gray-light)' }}>
              <div className="px-6 py-4 border-b" style={{ backgroundColor: 'var(--mint-light)', borderColor: 'var(--gray-light)' }}>
                <h3 className="font-bold" style={{ color: 'var(--green-deep)' }}>📝 상담 프로세스</h3>
              </div>
              <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {consultationTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-cream)', border: '1px solid var(--gray-light)' }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <h4 className="font-bold text-sm" style={{ color: 'var(--text-dark)' }}>
                        {idx + 1}. {tip.title}
                      </h4>
                    </div>
                    <ul className="space-y-1.5">
                      {tip.tips.map((t, tIdx) => (
                        <li key={tIdx} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-muted)' }}>
                          <span style={{ color: 'var(--mint-dark)' }}>•</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 상황별 응대 예시 */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'white', border: '1px solid var(--gray-light)' }}>
              <div className="px-6 py-4 border-b" style={{ backgroundColor: 'var(--mint-light)', borderColor: 'var(--gray-light)' }}>
                <h3 className="font-bold" style={{ color: 'var(--green-deep)' }}>💬 상황별 응대 예시</h3>
              </div>
              <div className="p-6 space-y-6">
                {responseExamples.map((example, idx) => (
                  <div key={idx} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-cream)', border: '1px solid var(--gray-light)' }}>
                    <div className="mb-4 pb-3 border-b" style={{ borderColor: 'var(--gray-light)' }}>
                      <span className="font-bold" style={{ color: 'var(--text-dark)' }}>
                        상황: {example.situation}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: '#fff0f0' }}>
                        <p className="text-sm" style={{ color: '#b91c1c' }}>{example.badResponse}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--mint-light)' }}>
                        <p className="text-sm" style={{ color: 'var(--green-deep)' }}>{example.goodResponse}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 핵심 포인트 */}
            <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, var(--green-deep) 0%, var(--green-darker) 100%)' }}>
              <h3 className="text-lg font-bold text-white mb-4">⭐ 상담 핵심 포인트</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: '경청하기', desc: '학부모/학생의 이야기를 끝까지 듣고, 공감 표현하기' },
                  { title: '맞춤 추천', desc: '모든 프로그램이 아닌, 상황에 맞는 1~2개만 추천' },
                  { title: '가치 먼저', desc: '가격 전에 제공하는 가치와 차별점을 먼저 설명' },
                  { title: '후속 관리', desc: '즉시 등록이 어려우면 팔로업 일정 잡기' }
                ].map((point, idx) => (
                  <div key={idx} className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <h4 className="font-bold text-white mb-1">{point.title}</h4>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{point.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-6" style={{ backgroundColor: 'white', borderColor: 'var(--gray-light)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            SN 고요의숲 대치 · 내부 업무용 자료 · 외부 유출 금지
          </p>
        </div>
      </footer>
    </div>
  );
}
