export default function Testimonials() {
  const testimonials = [
    {
      name: "김○○",
      university: "서울대학교 경영학과 합격",
      year: "2024",
      content: "체계적인 학습 관리 시스템 덕분에 목표했던 서울대에 합격할 수 있었습니다. 특히 1:1 맞춤 관리가 큰 도움이 되었습니다.",
      rating: 5
    },
    {
      name: "이○○",
      university: "연세대학교 경제학부 합격",
      year: "2024",
      content: "재수를 결심하고 SN독학재수학원을 선택한 것이 최고의 결정이었습니다. 멘토 선생님의 세심한 관리로 성적이 크게 올랐습니다.",
      rating: 5
    },
    {
      name: "박○○",
      university: "고려대학교 심리학부 합격",
      year: "2024",
      content: "쾌적한 학습 환경과 24시간 자습실이 정말 좋았습니다. 집중해서 공부할 수 있는 최적의 환경이었습니다.",
      rating: 5
    },
    {
      name: "정○○",
      university: "성균관대학교 글로벌경영학과 합격",
      year: "2023",
      content: "입시 전략 컨설팅이 정말 유용했습니다. 단순히 공부만 하는 것이 아니라 효율적으로 목표를 달성할 수 있었습니다.",
      rating: 5
    },
    {
      name: "최○○",
      university: "한양대학교 건축학부 합격",
      year: "2023",
      content: "실시간 성적 관리 시스템으로 약점을 파악하고 보완할 수 있었습니다. 데이터 기반 학습이 정말 효과적이었습니다.",
      rating: 5
    },
    {
      name: "강○○",
      university: "서강대학교 경제학부 합격",
      year: "2023",
      content: "소수정예 운영 덕분에 선생님들의 관심을 많이 받을 수 있었고, 모르는 부분을 바로바로 해결할 수 있었습니다.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            합격생 후기
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SN독학재수학원과 함께 꿈을 이룬 학생들의 생생한 이야기
          </p>
        </div>

        {/* 후기 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            >
              {/* 별점 */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* 후기 내용 */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* 학생 정보 */}
              <div className="border-t pt-6 border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.university}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.year}년 합격
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            다음 합격 주인공은 바로 당신입니다
          </h3>
          <p className="text-lg mb-8 text-blue-100">
            지금 바로 상담 신청하고 합격의 첫 걸음을 시작하세요
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 text-base font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
          >
            무료 상담 신청하기
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
