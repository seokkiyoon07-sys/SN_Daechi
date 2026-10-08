import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./winter-school.module.css";

export const metadata: Metadata = {
  title: "프리윈터 & 2027 윈터스쿨 모집안내 | SN고요의숲 대치",
  description: "예비고1~고3 프리윈터 및 2027 윈터스쿨 사전모집. 12월 프리윈터 이용료 20% 할인, 윈터스쿨 로열석 우선권과 SN 학습 관리 프로그램을 안내합니다.",
  alternates: { canonical: "/admission/winter-school" },
  openGraph: {
    title: "프리윈터 & 2027 윈터스쿨 모집안내 | SN고요의숲 대치",
    description: "겨울의 차이는 12월에 시작됩니다. 예비고1~고3 프리윈터 & 윈터스쿨 사전모집",
    url: "https://daechi.snacademy.co.kr/admission/winter-school",
  },
};

export default function WinterSchoolPage() {
  return (
    <>
      <Header />
      <div className={styles.page}>
        <main className={styles.sheet}>


    <section className={styles["hero"]} aria-labelledby="title">
      <p className={styles["eyebrow"]}>2026 PRE-WINTER · 2027 WINTER SCHOOL</p>
      <span className={styles["badge"]}>예비고1 ~ 고3 사전모집</span>
      <h1 id="title">겨울의 차이는,<br /><span>12월에 시작됩니다.</span></h1>
      <p className={styles["hero-lead"]}>프리윈터 & 윈터스쿨<br />기말고사 이후, 1월 윈터스쿨 전까지.<br /><strong>이 한 달이 겨울방학의 공부를 바꿉니다.</strong></p>
      <p className={styles["hero-copy"]}>대치동 단과 수업과 자습의 균형.<br />양평 SN독학기숙학원의 10년 독학 관리 시스템을<br />대치 SN고요의숲에서 만나세요.</p>
      <div className={styles["hero-footer"]}><span>매일의 학습 성과</span><span>단과 맞춤 스케줄</span><span>자정까지 집중</span></div>
    </section>

    <figure className={styles.campusPhoto}>
      <Image src="/image/facility/독서실/4F/2602-09933.jpg" alt="밝은 창가와 개인 칸막이 좌석이 배치된 SN고요의숲 4층 독서실" width={1500} height={1000} sizes="(max-width: 760px) 100vw, 760px" />
      <figcaption>매일의 몰입이 쌓이는 곳 - 포커스존</figcaption>
    </figure>

    <section className={styles["section"]} aria-labelledby="prewinter">
      <p className={styles["label"]}>PRE-WINTER</p>
      <h2 id="prewinter">한 달 먼저, 단단하게.</h2>
      <div className={styles["period"]}><div><small>2026년 프리윈터 운영 기간</small><strong>12.01 (화) — 12.31 (목)</strong></div><span className={styles["pill"]}>한 달 완성</span></div>
      <div className={styles["benefits"]}>
        <div className={styles["benefit"]}><span className={styles["number"]}>BENEFIT 01</span><strong>이용료 <em>20% 할인</em></strong><p>프리윈터 기간에만 적용</p></div>
        <div className={styles["benefit"]}><span className={styles["number"]}>BENEFIT 02</span><strong>로열석 우선권</strong><p>2027 윈터스쿨 로열석<br />우선 선점권 부여</p></div>
      </div>
    </section>

    <section className={styles["section"]} aria-labelledby="winter-period">
      <p className={styles["label"]}>2027 WINTER SCHOOL</p>
      <h2 id="winter-period">윈터스쿨 운영 기간</h2>
      <div className={styles["period"]}>
        <div><small>2027년 윈터스쿨</small><strong>1월 1일 — 2월 27일</strong></div>
      </div>
    </section>

    <section className={styles["section"]} aria-labelledby="tuition">
      <p className={styles["label"]}>TUITION</p>
      <h2 id="tuition">재학생 이용료 안내</h2>
      <div className={styles["benefits"]}>
        <div className={styles["benefit"]}><span className={styles["number"]}>재학생</span><strong>78만 원</strong><p>기본 이용료</p><p className={styles["note"]}>프리 윈터스쿨 · 20% 할인</p><strong><em>62만 4천 원</em></strong></div>
        <div className={styles["benefit"]}><span className={styles["number"]}>학기 중</span><strong>66만 원</strong><p>학기 중 이용료</p></div>
      </div>
      <p className={styles["note"]}>20% 할인은 프리윈터 기간(2026.12.01~12.31)에만 적용되며, 이후 윈터스쿨 및 학기 중 이용료에는 적용되지 않습니다.</p>
    </section>

    <section className={styles["section"]} aria-labelledby="hours">
      <p className={styles["label"]}>STUDY HOURS</p>
      <h2 id="hours">하루의 끝까지, 흔들림 없이.</h2>
      <table className={styles["hours"]} aria-label="운영 시간"><tbody>
        <tr><th scope="row">방학 기간 평일</th><td>오전 8시 — 자정 (24:00)</td></tr>
        <tr><th scope="row">주말 · 공휴일</th><td>오전 8시 — 자정 (24:00)</td></tr>
        <tr><th scope="row">학기 중 평일</th><td>오후 2시 — 자정 (24:00)</td></tr>
      </tbody></table>
      <p className={styles["note"]}>단과 수업 이후에도 충분한 자습 시간을 확보할 수 있도록 자정까지 운영합니다.</p>
    </section>

    <section className={styles["section"]} aria-labelledby="features">
      <p className={styles["label"]}>THE SN DIFFERENCE</p>
      <h2 id="features">앉아 있는 시간을 넘어,<br />공부의 성과를 관리합니다.</h2>
      <p className={styles["intro"]}>SN고요의숲 대치점의 일곱 가지 학습 관리.</p>
      <article className={styles["feature"]}><span className={styles["index"]}>01</span><div><h3>매일 눈에 보이는 성과<br />‘일일 수학 4제’ & 더블 클리닉</h3><p>매일 등원 즉시 엄선된 수학 4문항을 풀고 당일 채점합니다. 플래너 확인을 넘어, 매일의 성취도를 쌓아갑니다.</p><div className={styles["clinic"]}><div><strong>1차 · SN AI 튜터</strong>SN AI 튜터로 스스로 오답의 원리를 분석합니다.</div><div><strong>2차 · 원장 1:1 클리닉</strong>해결되지 않은 고난도 문항은 원장 비대면 심층 클리닉으로 마무리합니다.</div></div></div></article>
      <article className={styles["feature"]}><span className={styles["index"]}>02</span><div><h3>대치 단과 맞춤형 스케줄 관리</h3><p>SN 포털로 시대인재, 두각 등 외부 단과 수업 일정을 연동합니다.</p><ul><li>단과 과제에 필요한 시간까지 학습 계획에 반영</li><li>이동 동선과 자습 시간을 고려한 1:1 학습 플랜</li></ul></div></article>
      <article className={styles["feature"]}><span className={styles["index"]}>03</span><div><h3>실제 공부하는 집중</h3><p>단순 착석 여부를 넘어, 과목별 인강과 자습의 균형을 살핍니다.</p><ul><li>당사 개발 SNarlink 네트워크 방화벽 — 학습 목적 외 접속을 AI가 실시간 탐지 / 차단</li><li>20분 단위 학습 상태 기록·관리</li><li>과목별 학습 시간 및 인강·자습 밸런스 점검</li><li>양평 본원의 10년 노하우로 주간 학습 이행도 체크</li></ul></div></article>
      <article className={styles["feature"]}><span className={styles["index"]}>04</span><div><h3>철저한 생활 관리와 집중 환경</h3><ul><li>등원 즉시 휴대폰·전자기기 의무 수거 및 순찰 관리</li><li>RFID 카드 태그 기반 실시간 입·퇴실 학부모 알림 문자</li><li>남녀 분리 전용 열람실과 정숙한 면학 분위기</li></ul></div></article>
      <article className={styles["feature"]}><span className={styles["index"]}>05</span><div><h3>오래 공부할수록 느껴지는 공간의 차이</h3><ul><li>장시간 학습에 맞춘 초대형 와이드 데스크</li><li>시디즈 정품 체어</li><li>초미세먼지 차단 환기 시스템과 집중을 위한 공조 환경</li></ul></div></article>
      <article className={styles["feature"]}><span className={styles["index"]}>06</span><div><h3>역대 수능·평가원 10만 문항 DB 탑재:<br />생각하는 수능 AI ‘SNarGPT’</h3><ul><li>10만 개 기출 빅데이터 기반, 질의응답 대기 시간 0분의 24시간 실시간 케어</li><li>답만 베끼는 단순 AI가 아닌, 학생 스스로 답을 찾게 유도하는 <strong>‘단계별 힌팅 시스템’</strong></li><li>오답 즉시 동일 출제 원리를 가진 <strong>‘유사 기출 문항 자동 클리닉’</strong> 연계</li><li>범용 챗GPT의 수식 계산 오류(환각)를 원천 차단한 수능 특화 AI 솔루션</li></ul></div></article>
      <article className={styles["feature"]}><span className={styles["index"]}>07</span><div><h3>통합수학·통합사회·통합과학,<br />충분한 문제로 탄탄하게</h3><ul><li>통합수학·통합사회·통합과학 학습 문제 <strong>무제한 제공</strong></li><li>학교 내신 <strong>변형문제 제공</strong> (시험기간 중)</li></ul></div></article>
    </section>

    <section className={styles.section} aria-labelledby="campus-photos">
      <p className={styles.label}>OUR SPACE</p>
      <h2 id="campus-photos">공부하는 자리부터,<br />잠깐 쉬어가는 공간까지.</h2>
      <p className={styles.intro}>학생이 하루를 보내는 SN고요의숲의 실제 공간을 만나보세요.</p>
      <div className={styles.photoGrid}>
        <figure className={styles.photoWide}>
          <Image src="/image/facility/프린트 카페/2602-09990.jpg" alt="복합기와 정수기가 마련된 SN고요의숲 프린트카페" width={1500} height={1000} sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 760px) calc(100vw - 80px), 680px" />
          <figcaption><strong>프린트카페</strong><span>학습 자료 출력과 잠깐의 휴식을 위한 공간</span></figcaption>
        </figure>
        <figure>
          <Image src="/image/facility/독서실/3F/2602-09886.jpg" alt="개인 수납장과 콘센트, 시디즈 의자를 갖춘 3층 독서실 책상" width={1500} height={1000} sizes="(max-width: 600px) calc(100vw - 48px), 332px" />
          <figcaption><strong>나만의 학습 자리</strong><span>넓은 책상과 개인 수납공간을 갖춘 3F 독서실</span></figcaption>
        </figure>
        <figure>
          <Image src="/image/facility/상담실/2602-00175.jpg" alt="상담 테이블과 의자, 모니터를 갖춘 SN고요의숲 1:1 상담실 내부" width={1500} height={1000} sizes="(max-width: 600px) calc(100vw - 48px), 332px" />
          <figcaption><strong>1:1 상담실</strong><span>학습 계획과 고민을 함께 나누는 독립된 공간</span></figcaption>
        </figure>
      </div>
      <Link href="/facility" className={styles.facilityLink}>시설 사진 더 둘러보기 <span aria-hidden="true">→</span></Link>
    </section>

    <section className={[styles["section"], styles["contact"]].join(" ")} id="contact" aria-labelledby="contact-title">
      <p className={styles["label"]}>RESERVATION</p>
      <h2 id="contact-title">이번 겨울의 시작,<br />함께 준비하겠습니다.</h2>
      <p>우리 아이에게 맞는 학습 계획과 이용 방법을 상담해 보세요.</p>
      <div className={styles["buttons"]}>

        <Link className={styles.button} href="/admission/winter-school/apply">프리윈터 / 윈터스쿨 신청하기</Link>
        <Link className={[styles.button, styles.secondary].join(' ')} href="/admission/visit">프리윈터 / 윈터스쿨 상담예약</Link>
        <a className={[styles["button"], styles["secondary"]].join(" ")} href="https://daechi.snacademy.co.kr" target="_blank" rel="noopener noreferrer">SN고요의숲 대치점 둘러보기 ↗</a>
      </div>
      <p className={styles["note"]}>좌석 마감 시 모집이 조기 종료될 수 있습니다.</p>
      <dl className={styles["details"]}>
        <div><dt>전화 문의</dt><dd><a href="tel:02-557-0301">02-557-0301</a></dd></div>
        <div><dt>위치</dt><dd>서울특별시 강남구 대치동 447, 3·4층</dd></div>
      </dl>
    </section>


        </main>
      </div>
      <Footer />
    </>
  );
}
