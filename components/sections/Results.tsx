export default function Results() {
  const stats = [
    {
      number: "98%",
      label: "목표 대학 합격률",
      description: "2024년 기준"
    },
    {
      number: "156명",
      label: "SKY 합격생",
      description: "최근 3년 누적"
    },
    {
      number: "1등급",
      label: "평균 성적 향상",
      description: "6개월 기준"
    },
    {
      number: "24시간",
      label: "학습 관리",
      description: "365일 운영"
    }
  ];

  const universities = [
    "서울대학교", "연세대학교", "고려대학교",
    "성균관대학교", "한양대학교", "서강대학교",
    "이화여자대학교", "중앙대학교", "경희대학교"
  ];

  return (
    <section id="results" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            검증된 합격 실적
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            숫자로 증명하는 SN독학재수학원의 경쟁력
          </p>
        </div>

        {/* 통계 그리드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* 합격 대학 로고 섹션 */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            주요 합격 대학
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {universities.map((university, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center font-medium text-gray-700 hover:shadow-md hover:scale-105 transition-all duration-300 border border-gray-200"
              >
                {university}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              * 이 외에도 다수의 상위권 대학 합격생을 배출하고 있습니다
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
          >
            합격 상담 신청하기
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
