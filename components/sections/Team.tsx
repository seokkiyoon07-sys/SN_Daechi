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
  imageScale?: number;
}

const executives: TeamMember[] = [
  {
    name: "윤석기",
    role: "SN 대표",
    title: "고요한 공간, 기억하는 AI",
    image: "/image/thumbnail/skyoon.png",
    highlight: "공부를 다시 설계합니다.",
    content: [
      "왜 어떤 학생은 같은 시간을 공부해도 결과가 다를까요? 왜 어떤 학생은 노력만으로 한계를 넘지 못할까요?\n답은 단순합니다. 공부는 의지의 영역이기도 하지만, ==본질적으로는 환경과 구조의 영역==이기 때문입니다. \"열심히 하겠다\"는 다짐은 금세 휘발됩니다. 하지만 체계적으로 설계된 환경 속에서 반복된 훈련은 절대 배신하지 않는 실력이 됩니다.",
      "**숲처럼 고요한 환경, 그 안에서 정밀하게 작동하는 시스템**\n대치 고요의 숲은 불필요한 자극은 차단하고, 집중과 성장만 남기는 공간입니다. 조용하지만 강력하게. 느리지만 확실하게. 학생의 시간을 실력으로 변환합니다.\n우리는 학생 개인의 집중 패턴, 행동 흐름, 학습 리듬까지 고려해 ==공부가 지속될 수밖에 없는 구조==를 설계합니다.",
      "**우리는 공부를 '측정'합니다**\n노력은 눈에 보이지 않습니다. 하지만 데이터는 거짓말하지 않습니다.\n대치 고요의 숲은 학습 시간을 감각이 아니라 객관적인 데이터로 기록하고 분석합니다. 집중이 유지되는 시간, 반복되는 실수의 패턴, 개념을 이해하는 속도, 문제를 해결하는 사고의 흐름. 이 모든 것을 기반으로 학생 한 명 한 명의 성장 경로를 설계합니다.",
      "**AI는 양날의 검입니다**\nAI는 사고를 확장시키기도 하고, 사고를 멈추게 하기도 합니다.\n정답을 바로 받아쓰는 학생에게 AI는 생각의 기회를 빼앗습니다. 하지만 막힌 지점을 짚어주는 도구로 쓰는 학생에게 AI는 성장의 가속기가 됩니다. 같은 기술, 완전히 다른 결과. ==AI 시대의 학력 격차는 여기서 벌어집니다.==",
      "대치 고요의 숲의 AI는 학생을 기억합니다. 어디서 막혔는지, 어떤 실수를 반복하는지, 어떤 방식으로 사고하는지. 한 번의 질문으로 끝나는 것이 아니라, 축적된 기록 위에서 학생이 스스로 답에 도달하도록 방향을 제시합니다.\n**잊지 않는 AI, 그래서 대신하지 않는 AI.**",
      "**공간과 기술, 그 결합이 교육을 바꿉니다**\n대치 고요의 숲이라는 공간. SN의 AI라는 기술. 이 둘이 만나 하나의 시스템이 됩니다.\n고요한 환경은 집중을 지키고, 기억하는 AI는 성장을 설계합니다. 따로 존재할 때는 도구에 불과하지만, 함께 작동할 때 학생의 한계를 넘어서는 힘이 됩니다.\n==우리는 학생을 성공시킵니다. 그리고 그 방식으로 교육을 바꿉니다.=="
    ],
    signature: "성장은 의지가 아니라 구조에서 시작됩니다."
  },
  {
    name: "박진모",
    role: "SN 대치 총 원장",
    title: "진심은 모든 것을 변하게 할 수 있다.",
    image: "/image/thumbnail/jinmopark1.png",
    highlight: "Sincerity can change everything",
    content: [
      "SN고요의숲 대치 원장 박진모입니다.\n15년 전 수학 강사로 시작해 지금까지, 오로지 대학 입시에만 전념해 왔습니다. 그 시간 동안 학생들과 함께 웃고 울며 하나의 철학이 생겼습니다.",
      "==진심을 다한 노력은 배반하지 않는다.==",
      "수능 직전, 제가 학생들에게 입버릇처럼 하는 말이 있습니다. **\"기죽지 마라. 당당해라.\"** **\"난 할 수 있다, 그 믿음 하나로 완주해라.\"**",
      "수많은 학생을 졸업시키면서도 매년 미련이 남았습니다. '더 좋은 결과를 만들 수 있었을 텐데.' 그래서 압니다. 어떤 결과든 미련은 남게 마련이라는 것을. ==다시 도전하는 일이 부끄러운 게 아니라는 것을.== **같은 실수를 반복하지 않는 것이 진짜 실력**이라는 것을.",
      "==그 실력, 저희가 만들어 드리겠습니다.== 수학 모의고사와 N제, 한 번 푼 문제를 며칠 뒤 다시 풀고, 또 풀립니다. 틀린 문제가 맞는 문제가 될 때까지. 부족한 유형이 보이면, 그 자리에서 변형 문제를 만들어 한 번 더 잡습니다. **풀었던 문제를 또 틀리는 것—그게 가장 아까운 실수니까요.**",
      "이제 그 도전의 나침반이 되겠습니다. **혼자 두지 않겠습니다.** 같이 고민하고, 같이 길을 찾겠습니다."
    ],
    signature: "말이 아닌 결과로 답하겠습니다."
  },
  {
    name: "윤문희",
    role: "SN대치 부원장",
    title: "15년 학원강사의 노하우로 학생의 하루, 마음의 온도까지 관리합니다.",
    image: "/image/thumbnail/yoonmunhee.jpg",
    highlight: "20년, 한결같이 학생 곁을 지켜온 시간",
    content: [
      "학원 강단에서 보낸 20년은 단순히 가르치는 시간이 아니었습니다. 수많은 학생들의 흔들림을 함께 겪으며, 어떤 말 한마디가 힘이 되는지, 어떤 순간에 손을 내밀어야 하는지 몸으로 배운 시간이었습니다.",
      "SN대치 고요의숲에서 저는 학생들의 하루를 설계하고, 생활의 리듬을 잡아드립니다. 아침에 컨디션이 좋지 않은 학생, 점심을 거르는 학생, 표정이 어두워진 학생—작은 변화도 놓치지 않으려 합니다.",
      "행정과 운영이라는 말이 딱딱하게 들릴 수 있지만, 결국 제가 하는 일은 ==학생들이 오직 공부에만 집중할 수 있도록 나머지 모든 것을 돌보는 것==입니다.",
      "멀리서 자녀를 보내신 부모님의 마음을 압니다. 그 마음을 대신해 곁에 있겠습니다."
    ],
    signature: "엄마같은 마음으로 곁에 있겠습니다."
  }
];

const mentors: TeamMember[] = [
  {
    name: "권도훈",
    role: "SN 대치 멘토 · 서울대 경제학부 정시",
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
    role: "SN 대치 멘토 · 재료공학부",
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
  },
  {
    name: "유민수",
    role: "SN 대치 멘토 · 연세대 전기전자공학과",
    title: "흔들리지 않는 방향을 함께 잡아주는 멘토",
    image: "/image/thumbnail/yoo_min_soo.png",
    imageScale: 1.1,
    highlight: "압박이 아닌 동기부여로, 흔들리지 않는 방향을",
    content: [
      "**멘토 철학**\n수험생활은 혼자 싸우는 시간이 길수록, 방향을 잡아줄 누군가가 필요합니다. 열심히 하는데도 성과가 보이지 않을 때 흔들리지 않도록, ==학생의 현재 위치를 객관적으로 짚어주는 멘토==가 되겠습니다.",
      "**이런 학생에게 추천합니다**\n• \"이해는 되는데 점수가 안 나와요\"라고 느끼는 학생\n• 계획을 세워도 자꾸 무너져서 자신감이 떨어진 학생\n• 열심히는 하는데 공부 방향이 맞는지 확인받고 싶은 학생",
      "**멘토링 방식**\n**① 사고 과정 복기** — 틀린 문제를 다시 푸는 데서 끝내지 않습니다. 왜 그 선택을 했는지, 어디서 사고가 흔들렸는지를 함께 점검하여 같은 실수가 반복되지 않도록 정리합니다.\n**② 현실적 계획 조정** — 계획이 무너졌을 때 무작정 다시 하라고 하지 않습니다. 계획이 과했는지, 집중이 안 된 이유가 있었는지를 먼저 짚고, ==지킬 수 있는 수준으로 함께 재설계==합니다.\n**③ 사고 습관 만들기** — 오답노트 정리에서 끝나는 공부가 아닌, 일상 속에서도 '왜 틀렸을까'를 계속 떠올리며 사고 습관 자체를 바꾸는 훈련을 합니다. 이것이 제가 입시에 성공할 수 있었던 비결이기도 합니다.",
      "**전문 과목**\n수학, 물리",
      "**멘토링 경험**\n학습 압박으로 자신감이 떨어진 중학생에게 작은 성취를 자주 짚어주며 '스스로 할 수 있다'는 감각을 되찾도록 도왔습니다. 또한 성실하지만 모의고사 등급이 오르지 않던 학생에게는 문제 난도를 높여 실전에 필요한 사고 부담을 경험하게 했고, 그 결과 수학 성적이 1등급으로 안정되는 성과를 함께 만들었습니다."
    ],
    signature: "압박이 아닌 동기부여로, 흔들리지 않는 방향을 함께 잡아드리겠습니다."
  },
  {
    name: "박찬윤",
    role: "SN 대치 멘토 · 건국대 수의예과",
    title: "막막할 때 기댈 수 있는 선배, 끈기 있게 함께 걸어가는 멘토",
    image: "/image/thumbnail/Park_chan_yoon.png",
    imageScale: 1.12,
    highlight: "막막할 때 기댈 수 있는 선배, 끈기 있게 함께",
    content: [
      "**멘토 철학**\n수험생활에서 가장 큰 적은 막막함입니다. 저 역시 끝이 보이지 않는 불안 속에서 눈앞의 공부에 집중하며 끈기로 버텨온 경험이 있습니다. 그때 같은 길을 먼저 걸은 선배가 있었다면 훨씬 수월했을 거라 느꼈기에, ==학생들이 기댈 수 있는 멘토==가 되겠습니다.",
      "**이런 학생에게 추천합니다**\n• 공부는 하고 있는데 방향이 맞는지 불안한 학생\n• 계획을 세워도 자꾸 무너져서 자신감이 떨어진 학생\n• 수시 학생부종합 전형을 준비하는 학생",
      "**멘토링 방식**\n**① 원인 맞춤 대응** — 계획이 무너졌을 때 심리적 요인인지, 자기객관화 부족인지, 노력 부족인지를 먼저 파악한 뒤 학생에게 맞는 방식으로 지도합니다.\n**② 이해 착각 점검** — \"이해는 되는데 점수가 안 나온다\"는 학생에게는 정말 이해한 것인지부터 확인하고, 과목별 시험 시간 운영 방식까지 함께 점검합니다.\n**③ 오답의 줄글 복기** — 틀린 문제의 사고 과정을 직접 글로 써보게 하여, ==올바른 풀이가 머리에 새겨지도록== 합니다. 같은 실수를 반복하지 않는 것이 핵심입니다.",
      "**전문 과목**\n영어, 수학",
      "**멘토링 경험**\n감당할 수 없는 계획을 세워 매번 좌절하던 학생에게 시기별·단계별 순차적 계획 세우기를 도왔습니다. 매일 성취감을 느끼며 학습량을 서서히 늘려갈 수 있도록 지도한 경험이 있습니다."
    ],
    signature: "막막할 때 기댈 수 있는 선배, 끈기 있게 함께 걸어가겠습니다."
  },
  {
    name: "유지담",
    role: "SN 대치 멘토 · 서울대 경제학부",
    title: "객관적인 조언으로 확신을 만들어주는 멘토",
    image: "/image/thumbnail/yoo_ji_dam.png",
    imageScale: 1.12,
    highlight: "막연한 응원이 아닌, 객관적인 조언을",
    content: [
      "**멘토 철학**\n막연한 응원이 아닌, 객관적인 조언을 건네는 멘토가 되겠습니다. 자신의 공부가 맞는 학생에게는 확신을, 개선이 필요한 학생에게는 ==구체적인 대안==을 드리겠습니다.",
      "**이런 학생에게 추천합니다**\n• \"지금 이렇게 공부해도 되는 걸까?\" 확신이 없는 학생\n• 사고 과정을 점검하고 문제 접근법을 잡고 싶은 학생\n• 수시와 정시를 병행하며 균형을 잡아야 하는 학생",
      "**멘토링 방식**\n**① 사고 과정 점검** — 점수가 안 나오는 원인은 대부분 사고 과정에 있습니다. 올바른 사고 과정이 자리 잡은 뒤에야 시간 관리 같은 기술이 의미를 갖기에, 문제 접근 방식부터 함께 점검합니다.\n**② 현실적 계획 조정** — 계획을 못 지켰다면 시간을 제대로 쓰지 못한 것인지, 계획이 과했던 것인지를 먼저 구분합니다. ==원인에 따라 학습 의욕을 이끌어내거나 계획을 현실적으로 조정==합니다.\n**③ 내신과 수능의 연결** — 내신 공부를 수능의 방해 요소가 아닌 디딤돌로 활용하는 전략을 안내합니다. 3년간 수능을 중심에 놓되, 내신도 게을리하지 않는 균형 잡힌 학습법을 지도합니다.",
      "**전문 과목**\n국어, 수학",
      "**멘토링 경험**\n고등학교 신입생 대상 일대일 멘토링 경험이 있습니다. 고요의 숲에서는 지속적인 상호작용을 통해 학생 개개인의 특성을 고려한 더 구체적인 조언을 드리겠습니다."
    ],
    signature: "스스로 공부하는 힘을 키워, 1년의 장기전을 끝까지 함께 뛰겠습니다."
  },
  {
    name: "한유찬",
    role: "SN 대치 멘토 · 서울대 자유전공학부",
    title: "현실적인 조언과 따뜻한 응원을 함께 드리는 멘토",
    image: "/image/thumbnail/han_you_chan.png",
    imageScale: 1.12,
    highlight: "현실적인 조언과 따뜻한 응원, 두 가지를 함께",
    content: [
      "**멘토 철학**\n단순한 격려에 그치지 않고, 학생이 어디서 어려움을 겪고 있는지 함께 고민하며 개선점을 구체적으로 찾아주는 멘토가 되겠습니다. 동시에 공부 과정에서 지치지 않도록 ==적절한 응원과 지지로 꾸준한 성장==을 돕겠습니다.",
      "**이런 학생에게 추천합니다**\n• 공부는 열심히 하는데 뭘 고쳐야 할지 모르겠는 학생\n• 시험만 보면 긴장해서 실력 발휘가 안 되는 학생\n• 작은 성취감을 쌓으며 자신감을 키우고 싶은 학생",
      "**멘토링 방식**\n**① 시험 태도 점검** — \"이해는 되는데 점수가 안 나온다\"는 경우, 시험 상황에서의 긴장과 심리적 부담이 원인인 경우가 많습니다. 문제를 처음 접했을 때의 접근 방식과 끝까지 시도하는 태도를 함께 점검합니다.\n**② 작은 계획부터 차근차근** — 계획을 못 지키는 학생에게 무리한 목표를 강요하지 않습니다. ==실천할 수 있는 작은 계획부터 달성하며 성취감을 쌓아가도록== 돕습니다.\n**③ 개념 중심 학습** — 모든 문제 풀이는 결국 개념에서 시작됩니다. 개념을 정확히 이해한 뒤, 기출문제 분석을 통해 출제 패턴을 반복적으로 익히는 방식으로 지도합니다.",
      "**전문 과목**\n수학, 화학1",
      "**멘토링 경험**\n기초가 부족했던 친구를 대상으로 수학 멘토링을 진행한 경험이 있습니다. 중학교 개념부터 다시 잡아야 했기에 쉽지 않았지만, 배우려는 의지가 강한 학생이었기에 최대한 이해하기 쉬운 설명 방법을 고민하며 함께 성장할 수 있었습니다."
    ],
    signature: "현실적인 조언과 따뜻한 응원, 두 가지를 함께 드리겠습니다."
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

      {/* 운영진 섹션 */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <p className="text-sm tracking-[0.15em] text-sn-green mb-3">Leadership</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">운영진</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl">
            {executives.map((member, index) => (
              <div
                key={index}
                onClick={() => !member.noModal && setSelectedMember(member)}
                className={`group text-left ${member.noModal ? '' : 'cursor-pointer'}`}
              >
                <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={`${member.name} ${member.role}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    style={{
                      ...(member.imagePosition ? { objectPosition: member.imagePosition } : {}),
                      ...(member.imageScale ? { scale: `${member.imageScale}` } : {})
                    }}
                  />
                  {!member.noModal && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium">자세히 보기</p>
                      </div>
                    </div>
                  )}
                </div>
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

      {/* 멘토 섹션 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <p className="text-sm tracking-[0.15em] text-sn-green mb-3">Mentors</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">대학생 멘토</h2>
            <p className="text-gray-500 mt-2">학생 곁에서 함께 뛰는 SKY·의대 출신 멘토진</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl">
            {mentors.map((member, index) => (
              <div
                key={index}
                onClick={() => setSelectedMember(member)}
                className="group cursor-pointer text-left"
              >
                <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={`${member.name} ${member.role}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    style={{
                      ...(member.imagePosition ? { objectPosition: member.imagePosition } : {}),
                      ...(member.imageScale ? { scale: `${member.imageScale}` } : {})
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium">자세히 보기</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-bold text-gray-900">{member.name}</p>
                  <p className="text-sm text-sn-green">{member.role}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{member.title}</p>
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
                      style={{
                        ...(selectedMember.imagePosition ? { objectPosition: selectedMember.imagePosition } : {}),
                        ...(selectedMember.imageScale ? { scale: `${selectedMember.imageScale}` } : {})
                      }}
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
