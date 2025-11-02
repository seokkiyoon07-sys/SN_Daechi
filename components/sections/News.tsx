export default function News() {
  const news = [
    {
      category: "공지사항",
      date: "2024.01.15",
      title: "2025학년도 정규반 모집 안내",
      description: "새로운 학기를 위한 정규반 모집이 시작되었습니다. 선착순 마감되니 서둘러 신청하세요.",
      tag: "모집중"
    },
    {
      category: "입시정보",
      date: "2024.01.10",
      title: "2025 대입 전형 변경사항 총정리",
      description: "주요 대학의 입시 전형 변경사항과 대비 전략을 상세히 안내해드립니다.",
      tag: "필독"
    },
    {
      category: "합격소식",
      date: "2024.01.05",
      title: "2024학년도 합격자 발표",
      description: "올해도 우수한 합격 실적을 달성했습니다. 합격생 여러분 축하드립니다!",
      tag: "New"
    },
    {
      category: "이벤트",
      date: "2023.12.28",
      title: "겨울방학 특강 프로그램 안내",
      description: "취약 과목 집중 보완을 위한 특별 프로그램이 진행됩니다.",
      tag: "진행중"
    }
  ];

  return (
    <section id="news" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            공지사항 & 소식
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            최신 입시 정보와 학원 소식을 확인하세요
          </p>
        </div>

        {/* 뉴스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {news.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer"
            >
              {/* 상단 메타 정보 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-blue-600">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.date}
                  </span>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {item.tag}
                </span>
              </div>

              {/* 제목 */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>

              {/* 설명 */}
              <p className="text-gray-600 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* 더보기 링크 */}
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                자세히 보기
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="text-center">
          <a
            href="#more-news"
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            더 많은 소식 보기
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
