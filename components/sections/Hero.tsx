'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ModalContent {
  title: string;
  description: string;
}

export default function Hero() {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const secondHeadlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.system-card');
      cards.forEach((card, index) => {
        (card as HTMLElement).style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
      });
    }

    if (secondHeadlineRef.current) {
      observer.observe(secondHeadlineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openModal = (title: string, description: string) => {
    setModalContent({ title, description });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-green-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10">
        {/* 첫 번째 헤드라인 - 화면 중앙에 배치 */}
        <div className="min-h-screen flex items-center justify-center text-center py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight px-4 animate-fade-in-up">
            우리는 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI</span>와 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">데이터</span>로
            <br />
            입시 성공을 만들어 갑니다.
          </h1>
        </div>
      </div>

      {/* 세 개의 시스템 섹션 - 독립적인 배경 */}
      <div className="relative bg-white">
        {/* 배경 장식 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* 제목 */}
            <div ref={titleRef} className="text-center mb-12 opacity-0 scroll-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SN 대치</span>의 핵심 시스템
              </h2>
              <p className="text-base text-gray-600">AI, 데이터, 생활관리가 하나로 연결된 통합 학습 시스템</p>
            </div>

            {/* 삼각형 편대 배치 */}
            <div ref={cardsRef} className="relative max-w-5xl mx-auto">
              {/* 연결선들 - SVG로 표현 */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {/* AI 시스템 <-> 데이터 플랫폼 */}
                <line x1="50%" y1="18%" x2="27%" y2="68%" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                {/* AI 시스템 <-> 생활관리 시스템 */}
                <line x1="50%" y1="18%" x2="73%" y2="68%" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                {/* 데이터 플랫폼 <-> 생활관리 시스템 (밑변) */}
                <line x1="27%" y1="68%" x2="73%" y2="68%" stroke="url(#gradient3)" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />

                {/* 그라데이션 정의 */}
                <defs>
                  <linearGradient id="gradient1" x1="50%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity="0.7" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="50%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity="0.7" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9333ea" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* 상단 중앙 카드 - AI 시스템 */}
              <div className="flex justify-center mb-16 relative z-10">
                <div className="system-card w-full md:w-[45%] bg-white rounded-2xl p-5 shadow-xl border border-sn-main/20 relative overflow-hidden hover:shadow-2xl transition-shadow opacity-0 scroll-fade-in">
                  {/* AI 글로우 효과 */}
                  <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 relative text-center">SN AI 시스템</h3>
                <div className="space-y-1 relative">
                  {/* SNarGPT */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-sn-green/10 hover:shadow-sm p-2 rounded transition-all border-b border-sn-main/20"
                    onClick={() => openModal('SNarGPT', '교육에 최적화된 생성형 AI로, 수능 및 내신 대비 학습 콘텐츠를 학생 수준에 맞게 질문할 수 있습니다.\n(수능 수학 정답률 99.9%, 사설모의고사도 가능)')}
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="font-bold text-gray-900">SNarGPT</span>
                  </div>

                  {/* SNarVIS */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-sn-green/10 hover:shadow-sm p-2 rounded transition-all border-b border-sn-main/20"
                    onClick={() => openModal('SNarVIS', "아이언맨의 '자비스(JARVIS)'처럼 학생의 학습 일정, 오답 관리, 성적 분석까지 전담하는 수능 전문 AI 비서입니다.")}
                  >
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <span className="font-bold text-gray-900">SNarVIS</span>
                  </div>

                  {/* SNarlink */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-sn-green/10 hover:shadow-sm p-2 rounded transition-all border-b border-sn-main/20"
                    onClick={() => openModal('SNarlink', '학생의 온라인 학습량과 인터넷 사용을 정밀하게 측정하는 AI 방화벽형 학습 모니터링 시스템입니다.')}
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="font-bold text-gray-900">SNarlink</span>
                  </div>

                  {/* SNarGEN */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-sn-green/10 hover:shadow-sm p-2 rounded transition-all"
                    onClick={() => openModal('SNarGEN (출시 예정)', '평가원급 난이도의 수학 문제를 자동으로 생성하는 AI 기반 수학 문제 생성기로, 문제은행 수준의 품질을 제공합니다.')}
                  >
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <span className="font-bold text-gray-900">SNarGEN <span className="text-xs text-gray-500">(출시 예정)</span></span>
                  </div>
                </div>
                </div>
              </div>

              {/* 하단 두 개 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 max-w-[90%] mx-auto">
                {/* SN 데이터 플랫폼 */}
                <div className="system-card w-full bg-white rounded-2xl p-5 shadow-xl border border-sn-main/20 relative overflow-hidden hover:shadow-2xl transition-shadow opacity-0 scroll-fade-in">
                  {/* 데이터 글로우 효과 */}
                  <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-sn-green/10 to-sn-green-light/10 rounded-full blur-3xl"></div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 relative text-center">SN 데이터 플랫폼</h3>
                <div className="space-y-1 relative">
                  {/* 온라인 학습량 데이터 */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-sn-green/10 hover:shadow-sm p-2 rounded transition-all border-b border-sn-main/20"
                    onClick={() => openModal('온라인 학습량 데이터', '학생의 접속 시간, 학습 패턴, 집중 구간 등을 정량화하여 학습 효율을 데이터로 분석합니다.')}
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="font-bold text-gray-900">온라인 학습량 데이터</span>
                  </div>

                  {/* SN 문제 데이터 */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-sn-green/10 hover:shadow-sm p-2 rounded transition-all border-b border-sn-main/20"
                    onClick={() => openModal('SN 문제 데이터', '수능 및 모의고사 문제 중 인터넷에 있는 모든 문제는 AI가 검색을 통해 찾아 줍니다.\n(저작권 있는 문제 제외)')}
                  >
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <span className="font-bold text-gray-900">SN 문제 데이터</span>
                  </div>

                  {/* 오답 데이터 */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-sn-green/10 hover:shadow-sm p-2 rounded transition-all border-b border-sn-main/20"
                    onClick={() => openModal('오답 데이터', 'SNarOCR을 통해 모의고사 답안지를 스캔하고, 학생별 오답 패턴을 자동 분석하여 맞춤형 피드백을 제공합니다.')}
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="font-bold text-gray-900">오답 데이터</span>
                  </div>

                  {/* 입시 데이터 */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-sn-green/10 hover:shadow-sm p-2 rounded transition-all"
                    onClick={() => openModal('입시 데이터', '공공 입시 데이터를 기반으로 AI가 개인의 성적, 목표 대학, 학습 패턴을 분석하여 초개인화 입시 전략을 제시합니다.')}
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="font-bold text-gray-900">입시 데이터</span>
                  </div>
                </div>
                </div>

                {/* SN 생활관리 시스템 */}
                <div className="system-card w-full bg-white rounded-2xl p-5 shadow-xl border border-sn-main/20 relative overflow-hidden hover:shadow-2xl transition-shadow opacity-0 scroll-fade-in">
                  {/* 생활관리 글로우 효과 */}
                  <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-sn-green/10 to-sn-green-light/10 rounded-full blur-3xl"></div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 relative text-center">SN 생활관리 시스템</h3>
                <div className="space-y-1 relative">
                  {/* 12시간 집중 학습 관리 */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-sn-green/10 hover:shadow-sm p-2 rounded transition-all border-b border-sn-main/20"
                    onClick={() => openModal('12시간 집중 학습 관리', '하루 12시간 이상 학습이 가능한 체계적인 타임테이블과 생활 루틴을 운영합니다.')}
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="font-bold text-gray-900">12시간 집중 학습 관리</span>
                  </div>

                  {/* 최신 시설의 신축 캠퍼스 */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-sn-green/10 hover:shadow-sm p-2 rounded transition-all border-b border-sn-main/20"
                    onClick={() => openModal('최신 시설의 신축 캠퍼스', '최신식 학습·생활 공간과 쾌적한 환경을 갖춘 신축 건물에서 운영됩니다.')}
                  >
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <span className="font-bold text-gray-900">최신 시설의 신축 캠퍼스</span>
                  </div>

                  {/* 대치역 도보 3분 거리 */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-sn-green/10 hover:shadow-sm p-2 rounded transition-all"
                    onClick={() => openModal('대치역 도보 3분 거리', '접근성과 안전성을 모두 갖춘 최적의 입지로, 통학 및 학부모 방문이 편리합니다.')}
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="font-bold text-gray-900">대치역 도보 3분 거리</span>
                  </div>
                </div>
                </div>
              </div>

              {/* 안내 문구 - 우측 하단 */}
              <div className="mt-8 text-right">
                <p className="text-sm text-gray-500 italic">
                  제목을 클릭하면 자세한 설명을 보실 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 두 번째 헤드라인 - 삼각형 구조 다음 (그라데이션 배경) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* 배경 장식 요소 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-green-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 pt-20 pb-12 md:pt-24 md:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 ref={secondHeadlineRef} className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-12 text-center opacity-0 scroll-fade-in">
              그리고 이 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">데이터</span>와 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI</span>를
              <br />
              활용하여 사람이 학습을 완성시킵니다.
            </h2>

            {/* 원장 소개 */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-sn-main/20">
                {/* 인물 사진 */}
                <div className="relative h-[280px] md:h-[350px]">
                  <Image
                    src="/image/director-park.png"
                    alt="대치 고요의 숲 박진모 원장 - 수학 전문 독학관리"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* 하단 그라데이션 오버레이 */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

                  {/* 텍스트 오버레이 - 하단 */}
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-center text-white z-10">
                    <p className="text-base md:text-lg font-medium mb-1">
                      분당 지역 수학의 신화를 쓴
                    </p>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                      박진모 원장
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 특징 섹션 */}
            <div className="max-w-7xl mx-auto mt-16">
              {/* 3열 그리드 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* 수학특화관 */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-sn-main/20 hover:shadow-2xl transition-shadow">
                  <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">수학특화관</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">박진모 원장의 수학 컨설팅 및 특강 (일부 유료)</p>
                  </div>
                </div>

                {/* 의치약 + SKY 멘토 */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-sn-main/20 hover:shadow-2xl transition-shadow">
                  <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">의치약 + SKY 멘토</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">1:1 학습상담 (무료)</p>
                  </div>
                </div>

                {/* SNarVIS + SNargo */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-sn-main/20 hover:shadow-2xl transition-shadow">
                  <div className="h-32 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">SNarVIS + SNargo</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">SNarVIS (수능/입시 전문 AI 비서) 개인별 지급<br />+ SNargo (수능 수학 문제풀이 99.9% 정답률의 AI)</p>
                  </div>
                </div>
              </div>

              {/* 하단 메시지 */}
              <div className="text-center space-y-3 mt-20 mb-20">
                <p className="text-xl md:text-2xl font-semibold text-gray-700">
                  감으로 지도하는 시대는 끝났습니다.
                </p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI</span>와 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">데이터</span>로 초개인화된 학습관리로 입시를 혁신하겠습니다.
                </p>
              </div>
            </div>

            </div>
        </div>
      </div>

      {/* 모달 */}
      {modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{modalContent.title}</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{modalContent.description}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
