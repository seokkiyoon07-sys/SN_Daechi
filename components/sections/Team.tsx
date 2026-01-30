'use client';

import { useState } from 'react';
import Image from 'next/image';

// 텍스트 포맷팅 처리 (볼드, 하이라이트)
function formatText(text: string) {
  const parts = text.split(/(==.*?==|\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('==') && part.endsWith('==')) {
      return <mark key={i} className="bg-yellow-100 px-1 rounded font-semibold">{part.slice(2, -2)}</mark>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

interface TeamMember {
  name: string;
  role: string;
  title: string;
  image: string;
  content: string[];
  signature?: string;
  highlight?: string;
  noModal?: boolean;
  imagePosition?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "박진모",
    role: "SN 대치 총 원장",
    title: "진심은 모든 것을 변하게 할 수 있다.",
    image: "/image/thumbnail/jinmopark1.png",
    highlight: "Sincerity can change everything",
    content: [
      "안녕하세요. **SN고요의숲 대치 원장 박진모**입니다.\n**15년 전** 수학 강사로 시작해 지금까지, 오로지 대학 입시에만 전념해 왔습니다. 그 시간 동안 학생들과 함께 웃고 울며 하나의 철학이 생겼습니다.",
      "==진심을 다한 노력은 배반하지 않는다.==",
      "수능 직전, 제가 학생들에게 입버릇처럼 하는 말이 있습니다.\n**\"기죽지 마라. 당당해라.\"**\n**\"난 할 수 있다, 그 믿음 하나로 완주해라.\"**",
      "수많은 학생을 졸업시키면서도 매년 미련이 남았습니다.\n'더 좋은 결과를 만들 수 있었을 텐데.'",
      "그래서 압니다.\n어떤 결과든 미련은 남게 마련이라는 것을.\n==다시 도전하는 일이 부끄러운 게 아니라는 것을.==\n**같은 실수를 반복하지 않는 것이 진짜 실력**이라는 것을.",
      "이제 그 도전의 나침반이 되겠습니다.\n**혼자 두지 않겠습니다.**\n같이 고민하고, 같이 길을 찾겠습니다."
    ],
    signature: "말이 아닌 결과로 답하겠습니다."
  },
  {
    name: "윤문희",
    role: "SN대치 부원장",
    title: "20년간 학원강사의 노하우로 학생의 하루, 마음의 온도까지 관리합니다. 엄마같은 마음으로 곁에 있겠습니다.",
    image: "/image/thumbnail/yoonmunhee.jpg",
    highlight: "20년, 한결같이 학생 곁을 지켜온 시간",
    content: [
      "학원 강단에서 보낸 20년은 단순히 가르치는 시간이 아니었습니다. 수많은 학생들의 흔들림을 함께 겪으며, 어떤 말 한마디가 힘이 되는지, 어떤 순간에 손을 내밀어야 하는지 몸으로 배운 시간이었습니다.",
      "SN대치 고요의숲에서 저는 학생들의 하루를 설계하고, 생활의 리듬을 잡아드립니다. 아침에 컨디션이 좋지 않은 학생, 점심을 거르는 학생, 표정이 어두워진 학생—작은 변화도 놓치지 않으려 합니다.",
      "행정과 운영이라는 말이 딱딱하게 들릴 수 있지만, 결국 제가 하는 일은 ==학생들이 오직 공부에만 집중할 수 있도록 나머지 모든 것을 돌보는 것==입니다.",
      "멀리서 자녀를 보내신 부모님의 마음을 압니다. 그 마음을 대신해 곁에 있겠습니다."
    ],
    signature: "엄마같은 마음으로 곁에 있겠습니다."
  },
  {
    name: "권도훈",
    role: "SN 대치 멘토 · 서울대 경제학과 정시",
    title: "스스로 공부하는 힘을 길러주는 멘토",
    image: "/image/thumbnail/kwandohun.jpg",
    highlight: "Keep going, never give up",
    content: [
      "**멘토 철학**\n수능은 단거리 경주가 아닌 마라톤입니다. 저는 학생들이 10개월이라는 긴 레이스를 지치지 않고 완주할 수 있도록, ==스스로 문제를 진단하고 해결하는 능력==을 길러주는 데 집중합니다.",
      "직접 인강으로 대부분의 과목을 독학하며 정시로 입시를 성공한 경험을 바탕으로, 학생 스스로 자신의 약점을 파악하고 처방을 내릴 수 있도록 돕겠습니다.",
      "**이런 학생에게 추천합니다**\n• \"이해는 되는데 점수가 안 나와요\"라고 느끼는 학생\n• 장기적인 페이스 조절이 어려운 학생\n• 공부 방법 자체를 잡고 싶은 학생",
      "**멘토링 방식**\n**① 사고 과정 점검** — 정답을 맞혔더라도 그 과정이 올바른지 함께 검토합니다. 기억에 의존해 건너뛴 부분이 없는지 꼼꼼히 짚어드립니다.\n**② 목표 세분화** — 막연한 장기 목표를 분기별·월별 단위로 나누어, 작은 성취감을 쌓아가며 꾸준히 나아갈 수 있도록 설계합니다.\n**③ 지속 가능한 공부** — 100%의 강도로 태워버리는 공부가 아닌, ==70~80%의 강도로 꾸준히 이어갈 수 있는 공부 습관==을 만들어 드립니다.",
      "**전문 과목**\n국어, 사문, 정법"
    ],
    signature: "충분한 휴식을 취하면서도 꾸준히, 포기하지 않고 끝까지."
  },
  {
    name: "이*윤",
    role: "SN 대치 멘토 · 서울대 재료공학과",
    title: "불확실성을 확신으로 바꿔주는 멘토",
    image: "/image/thumbnail/leeyoon.jpg",
    imagePosition: "42% top",
    highlight: "From uncertainty to confidence",
    content: [
      "**멘토 철학**\n수험생에게 가장 큰 적은 난이도 높은 문제가 아닙니다. 바로 ==불확실성==입니다. 자신의 학습 과정과 풀이 방식에 대한 확신이 없으면 아무리 노력해도 불안감은 사라지지 않고 헤매게 됩니다. 저는 가고 싶은 대학의 선배를 넘어, 상담과 개인별 학습 플랜을 통한 해결사가 되어 드리겠습니다. 학생들이 겪었던 혼란을 누구보다 잘 알고, 시행착오를 겪어본 사람이기에, 가장 효율적이고 올바른 방향으로 나아갈 수 있도록 돕겠습니다.",
      "**이런 학생에게 추천합니다**\n• \"이해는 되는데 점수가 안 나와요\"라고 느끼는 학생\n• 장기적인 페이스 조절이 어려운 학생\n• 공부 방법 자체를 잡고 싶은 학생\n• AI를 활용한 효율적인 학습을 원하는 학생",
      "**멘토링 방식**\n**① 사고 과정 점검** — 단순히 정답을 맞히는 것이 아니라, \"왜\"와 \"어떻게\"를 집요하게 묻습니다. 풀이 과정의 인과관계를 남에게 설명할 수 있을 정도로 논리가 서 있는지 확인합니다.\n**② 유연한 관리 통제** — 학생의 현재 상태에 따라 공부량을 정확하게 조절합니다. 너무 많아서 지치거나, 너무 적어서 성장이 없는 것이 아닌 ==최적점==을 찾아드립니다.\n**③ AI 활용 학습** — SNarGPT를 활용해 자습 시간에도 막히지 않게 돕습니다. 단순히 정답을 묻는 것이 아니라, 자신의 풀이 과정이 논리적으로 맞는지 검증하는 방법을 알려드립니다.\n**④ 효자 과목 완성** — 공부량 대비 성과가 좋은 과목을 먼저 공략하여 자신감을 심어드립니다. 잘하는 과목에서 얻은 성취감은 약점 과목을 극복하는 강력한 동력이 됩니다.",
      "**전문 과목**\n수학, 화학"
    ],
    signature: "불확실성을 확신으로, 함께 갑니다."
  }
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center bg-[#1a1f2e]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <p className="text-sm tracking-[0.15em] text-gray-500 mb-6">
            운영진 소개
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-relaxed">
            대치 고요의 숲을 이끄는
            <br />
            <span className="text-[#7fa892]">사람들</span>
          </h1>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                onClick={() => !member.noModal && setSelectedMember(member)}
                className={`group text-left ${member.noModal ? '' : 'cursor-pointer'}`}
              >
                {/* Profile Card */}
                <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={`${member.name} ${member.role}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
                  />
                  {/* Hover Overlay */}
                  {!member.noModal && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium">자세히 보기</p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Name & Role */}
                <div className="mt-4">
                  <p className="text-lg font-bold text-gray-900">{member.name}</p>
                  <p className="text-sm text-sn-green">{member.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-6 md:p-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-10">
                {/* Image */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-48 h-64 md:w-56 md:h-72 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={selectedMember.image}
                      alt={`${selectedMember.name} ${selectedMember.role}`}
                      width={224}
                      height={288}
                      className="w-full h-full object-cover object-top"
                      style={selectedMember.imagePosition ? { objectPosition: selectedMember.imagePosition } : undefined}
                    />
                  </div>
                  <div className="mt-4 text-center md:text-left">
                    <p className="text-2xl font-bold text-gray-900">{selectedMember.name}</p>
                    <p className="text-sn-green font-medium">{selectedMember.role}</p>
                  </div>
                </div>

                {/* Title & Highlight */}
                <div className="flex-1">
                  <div className="border-l-4 border-sn-green pl-5 py-2">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed">
                      {selectedMember.title}
                    </h2>
                  </div>

                  {selectedMember.highlight && (
                    <div className="mt-8 p-5 bg-sn-green/5 rounded-xl">
                      <p className="text-lg font-semibold text-sn-green">
                        {selectedMember.highlight}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {selectedMember.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-gray-700 leading-loose whitespace-pre-line"
                  >
                    {formatText(paragraph)}
                  </p>
                ))}
              </div>

              {/* Signature */}
              {selectedMember.signature && (
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <p className="text-xl font-bold text-sn-green">
                    {selectedMember.signature}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-sn-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
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
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
