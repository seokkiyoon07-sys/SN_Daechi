export default function Programs() {
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
      price: "상담 시 안내"
    },
    {
      badge: "추천",
      title: "프리미엄 관리반",
      description: "소수정예 집중 관리로 확실한 성적 향상",
      features: [
        "1:1 개인 맞춤 케어",
        "매일 학습 진도 체크",
        "실시간 질의응답",
        "학부모 상담 서비스"
      ],
      price: "상담 시 안내",
      highlighted: true
    },
    {
      badge: "NEW",
      title: "N수생 특별반",
      description: "재도전하는 학생을 위한 특별 프로그램",
      features: [
        "멘탈 관리 프로그램",
        "심화 학습 커리큘럼",
        "입시 전략 컨설팅",
        "소수정예 운영"
      ],
      price: "상담 시 안내"
    }
  ];

  return (
    <section id="programs" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            프로그램 안내
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            학생의 상황과 목표에 맞는 최적의 프로그램을 선택하세요
          </p>
        </div>

        {/* 프로그램 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                program.highlighted
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105'
                  : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg'
              } transition-all duration-300`}
            >
              {/* 배지 */}
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  program.highlighted
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {program.badge}
              </div>

              {/* 제목 */}
              <h3
                className={`text-2xl font-bold mb-3 ${
                  program.highlighted ? 'text-white' : 'text-gray-900'
                }`}
              >
                {program.title}
              </h3>

              {/* 설명 */}
              <p
                className={`mb-6 ${
                  program.highlighted ? 'text-blue-100' : 'text-gray-600'
                }`}
              >
                {program.description}
              </p>

              {/* 기능 리스트 */}
              <ul className="space-y-3 mb-8">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                        program.highlighted ? 'text-white' : 'text-blue-600'
                      }`}
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
                    <span
                      className={
                        program.highlighted ? 'text-white' : 'text-gray-700'
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* 가격 */}
              <div className="border-t pt-6 mb-6 border-white/20">
                <div
                  className={`text-2xl font-bold ${
                    program.highlighted ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {program.price}
                </div>
              </div>

              {/* CTA 버튼 */}
              <a
                href="#contact"
                className={`block w-full py-3 px-6 rounded-lg text-center font-medium transition-all ${
                  program.highlighted
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                상담 신청하기
              </a>
            </div>
          ))}
        </div>

        {/* 하단 안내 */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            프로그램에 대한 자세한 상담이 필요하신가요?{' '}
            <a href="#contact" className="text-blue-600 font-medium hover:underline">
              지금 바로 문의하기
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
