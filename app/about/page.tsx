import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Section */}
          <section id="overview" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-3 py-1 bg-sn-green text-white text-sm font-semibold rounded-full">About</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              SN 고요의숲 대치
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              SN은 학생의 하루와 학습을 데이터를 통해 읽고, 과학적으로 성장 흐름을 설계하는 학습 시스템입니다.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              SN 대치는 여기에 대치동 전문 강사진과 선생님들의 밀착 지도를 더해, 학생마다 다른 <span className="text-sn-green font-semibold">&apos;성장 알고리즘&apos;</span>을 완성합니다.
            </p>
          </section>

          <hr className="border-t-2 border-dashed border-sn-green my-12" />

          {/* Mission Section */}
          <section id="mission" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-sn-green rounded-full"></span>
              Our Mission
            </h2>
            <div className="bg-white rounded-xl p-6 border-2 border-dashed border-sn-green shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-4">
                SN 대치는 학생의 하루를 학습·생활 데이터로 분석하고, 이를 AI가 정밀하게 해석합니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                전문 강사진은 그 데이터를 기반으로 코칭하며, 학생이 하루 12시간 이상 학습에 몰입할 수 있도록 <span className="text-sn-green font-semibold">&apos;꾸준함의 시스템&apos;</span>을 완성합니다.
              </p>
            </div>
          </section>

          <hr className="border-t-2 border-dashed border-sn-green my-12" />

          {/* Philosophy Section */}
          <section id="philosophy" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-sn-green rounded-full"></span>
              Education Philosophy
            </h2>
            <div className="space-y-4">
              <div className="group bg-white rounded-xl p-6 border-2 border-dashed border-sn-green/70 hover:border-sn-main hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-sn-green text-white rounded-full flex items-center justify-center font-bold text-lg">1</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Hyper-Personal Growth Architecture
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      학생의 하루 전체를 데이터로 읽어, 취약점뿐 아니라 성장 패턴과 잠재력까지 모델링합니다.
                      학생마다 <span className="text-sn-green font-medium">고유한 &apos;성장 알고리즘&apos;</span>을 설계합니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group bg-white rounded-xl p-6 border-2 border-dashed border-sn-green/70 hover:border-sn-main hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-sn-green text-white rounded-full flex items-center justify-center font-bold text-lg">2</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      AI × Human Intelligence의 듀얼 코칭 시스템
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      SNarGPT, SNarVIS가 24시간 학습 흐름을 추적하고, 대치동 전문 강사진이 그 데이터를 기반으로 정확한 피드백과 개입을 제공합니다.
                      <span className="text-sn-green font-medium"> AI의 정밀함 + 사람의 통찰</span>이 결합된 형태입니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group bg-white rounded-xl p-6 border-2 border-dashed border-sn-green/70 hover:border-sn-main hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-sn-green text-white rounded-full flex items-center justify-center font-bold text-lg">3</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Sustainable Learning System
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      단순히 &apos;열심히&apos;가 아니라, <span className="text-sn-green font-medium">12시간 이상 몰입</span>이 가능하도록 설계된 시간·루틴·생활 관리 시스템을 제공합니다.
                      학생은 흔들림 없이 지속력 기반 학습을 완성합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-t-2 border-dashed border-sn-green my-12" />

          {/* Features Section */}
          <section id="features" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-6 bg-sn-green rounded-full"></span>
              <h2 className="text-2xl font-bold text-gray-900">
                Key Features
              </h2>
              <span className="inline-block px-3 py-1 bg-sn-green text-white text-sm font-semibold rounded-full">AI</span>
            </div>
            <div className="rounded-xl overflow-hidden border-2 border-dashed border-sn-green shadow-sm">
              <img
                src="/image/ai-learning-system.png"
                alt="AI 학습 관리 프로그램 - 학습 엔진 & 문제풀이 AI"
                className="w-full h-auto"
              />
            </div>
          </section>

          <hr className="border-t-2 border-dashed border-sn-green my-12" />

          {/* Stats Section */}
          <section id="stats" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-sn-green rounded-full"></span>
              Statistics
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-white rounded-xl p-6 border-2 border-dashed border-sn-green/70 hover:border-sn-main hover:shadow-md transition-all">
                <div className="text-3xl font-bold text-sn-green mb-1">11+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center bg-white rounded-xl p-6 border-2 border-dashed border-sn-green/70 hover:border-sn-main hover:shadow-md transition-all">
                <div className="text-3xl font-bold text-sn-green mb-1">99.9%</div>
                <div className="text-sm text-gray-500">수능 수학 AI 풀이 정확도</div>
              </div>
              <div className="text-center bg-white rounded-xl p-6 border-2 border-dashed border-sn-green/70 hover:border-sn-main hover:shadow-md transition-all">
                <div className="text-3xl font-bold text-sn-green mb-1">1,000+</div>
                <div className="text-sm text-gray-500">대학합격자 명단</div>
              </div>
            </div>
          </section>

          <hr className="border-t-2 border-dashed border-sn-green my-12" />

          {/* Values Section */}
          <section id="values" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-sn-green rounded-full"></span>
              Core Values
            </h2>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-5 border-l-4 border-sn-main hover:shadow-md transition-all">
                <h3 className="font-semibold text-sn-green mb-1">
                  Transparency
                </h3>
                <p className="text-gray-600 text-sm">
                  학습 진도와 성과를 투명하게 공유하며 정기적인 상담을 진행합니다.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border-l-4 border-sn-main hover:shadow-md transition-all">
                <h3 className="font-semibold text-sn-green mb-1">
                  Innovation
                </h3>
                <p className="text-gray-600 text-sm">
                  최신 AI 기술을 교육에 접목하여 효율적인 학습을 지원합니다.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border-l-4 border-sn-main hover:shadow-md transition-all">
                <h3 className="font-semibold text-sn-green mb-1">
                  Excellence
                </h3>
                <p className="text-gray-600 text-sm">
                  학생의 입시성공을 위해 끊임 없이 연구하고 투자합니다.
                </p>
              </div>
            </div>
          </section>

          {/* Closing Statement */}
          <div className="py-10 my-12 bg-sn-green/10 rounded-2xl border-2 border-dashed border-sn-green">
            <p className="text-lg font-medium text-gray-700 leading-relaxed text-center px-6">
              우리는 규모보다 의미 있는 성장을 추구하는 팀이며,
              <br />
              학생의 성공을 위해 <span className="text-sn-green font-semibold">AI와 데이터</span>에 가장 먼저, 가장 깊이 투자합니다.
            </p>
          </div>

          <hr className="border-t-2 border-dashed border-sn-green my-12" />

          {/* Contact Section */}
          <section id="contact" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-sn-green rounded-full"></span>
              Get Started
            </h2>
            <p className="text-gray-600 mb-8">
              지금 바로 상담을 신청하고 맞춤형 교육 계획을 받아보세요.
            </p>
            <div className="flex gap-4">
              <a
                href="/programs#contact"
                className="px-6 py-3 bg-sn-green text-white font-medium rounded-lg hover:bg-sn-green-dark transition-colors"
              >
                상담 신청하기
              </a>
              <a
                href="/programs"
                className="px-6 py-3 border-2 border-dashed border-sn-green text-sn-green font-medium rounded-lg hover:bg-sn-green/10 transition-colors"
              >
                프로그램 보기
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
