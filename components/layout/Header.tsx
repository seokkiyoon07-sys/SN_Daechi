'use client';

/*
 * ============================================
 * 새로운 메뉴 구조 (5개 메뉴)
 * ============================================
 *
 * 1. THE SYSTEM (또는 AI & 관리)
 *    - 왜 이 학원인가? (AI 특화관, 관리 철학)
 *    - 서브: AI특화관, 관리 철학/시스템 소개
 *
 * 2. 성적 변화의 증거
 *    - 성공스토리, 입결 데이터 (학부모가 가장 먼저 클릭하는 곳)
 *    - 서브: 성공스토리, 입결 데이터
 *
 * 3. 캠퍼스 라이프
 *    - 학원생활 + 시설안내 + 도시락 (학생이 가장 궁금해하는 곳)
 *    - 서브: 생활관리, 학습시간표, 학사일정, 시설안내, 도시락 메뉴
 *
 * 4. 입학 안내
 *    - 모집요강 + 방문상담 예약 (Action Item)
 *    - 서브: 모집요강, 방문상담 예약
 *
 * 5. 인사이트
 *    - 컬럼 + 공지사항 (전문성을 보여주는 곳)
 *    - 서브: SN대치 칼럼, 공지사항, 자주 묻는 질문
 *
 * ============================================
 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSiteDropdownOpen, setIsSiteDropdownOpen] = useState(false);

  const sites = [
    { name: 'SN고요의숲(대치)', url: 'https://daechi.snacademy.co.kr' },
    { name: 'SN독학기숙학원', url: 'https://www.snacademy.co.kr' },
    { name: 'SNarGPT', url: 'https://snargpt.ai' },
    { name: 'SN블로그', url: 'https://blog.snacademy.co.kr' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link href="/about/philosophy" className="flex items-center gap-2">
              <Image
                src="/image/sn-logo.png"
                alt="SN Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-900">고요의숲 대치</span>
                <span className="text-xs text-gray-600">독학관리 AI 특화관</span>
              </div>
            </Link>
          </div>

          {/* ============================================
           * 새로운 메뉴 구조 (5개 메뉴) - 데스크톱
           * ============================================ */}
          <div className="hidden md:flex md:items-center md:space-x-6 ml-auto">
            {/* 1. THE SYSTEM (AI & 관리) 드롭다운 */}
            <div className="relative group">
              <a href="/about" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors">
                THE SYSTEM
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sn-green to-sn-green-light group-hover:w-full transition-all duration-300"></span>
              </a>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="/about/philosophy" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  관리 철학/시스템
                </a>
                <a href="/about/ai-center" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  AI특화관
                </a>
                <a href="/about/team" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  강사/멘토진
                </a>
                <a href="/about" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  About SN
                </a>
              </div>
            </div>

            {/* 2. 성적 변화의 증거 드롭다운 */}
            <div className="relative group">
              <a href="/results" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors">
                성적 변화의 증거
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sn-green to-sn-green-light group-hover:w-full transition-all duration-300"></span>
              </a>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="/success-stories" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  성공스토리
                </a>
                <a href="/results/data" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  입결 데이터
                </a>
              </div>
            </div>

            {/* 3. 캠퍼스 라이프 드롭다운 */}
            <div className="relative group">
              <a href="/campus" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors">
                캠퍼스 라이프
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sn-green to-sn-green-light group-hover:w-full transition-all duration-300"></span>
              </a>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="/campus/rules" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  생활관리
                </a>
                <a href="/campus/schedule" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  학습시간표
                </a>
                <a href="/campus/yearly" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  학사일정
                </a>
                <a href="/facility" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  시설안내
                </a>
                <a href="/campus/menu" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  도시락 메뉴
                </a>
              </div>
            </div>

            {/* 4. 입학 안내 드롭다운 */}
            <div className="relative group">
              <a href="/programs" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors">
                입학 안내
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sn-green to-sn-green-light group-hover:w-full transition-all duration-300"></span>
              </a>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="/programs" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  모집요강
                </a>
                <a href="/admission/scholarship" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  장학금
                </a>
                <a href="/admission/visit" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  방문상담 예약
                </a>
              </div>
            </div>

            {/* 5. 인사이트 드롭다운 */}
            <div className="relative group">
              <a href="/community/notices" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors">
                인사이트
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sn-green to-sn-green-light group-hover:w-full transition-all duration-300"></span>
              </a>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="/community/column" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  SN대치 칼럼
                </a>
                <a href="/community/notices" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  공지사항
                </a>
                <a href="/community/faq" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  자주 묻는 질문
                </a>
              </div>
            </div>

            {/* ============================================
             * 기존 메뉴 (삭제/이동 예정) - 아래 주석 해제하면 복구 가능
             * ============================================
            <div className="relative group">
              <a href="/about" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors">
                학원소개
              </a>
            </div>
            <a href="/programs">모집요강</a>
            <div className="relative group">
              <a href="/campus">학원생활</a>
            </div>
            <a href="/success-stories">성공스토리</a>
            <a href="/facility">시설안내</a>
            <div className="relative group">
              <a href="/community/notices">커뮤니티</a>
            </div>
            ============================================ */}

            {/* 구분선 */}
            <div className="w-px h-5 bg-gray-300"></div>

            {/* 사이트 선택 드롭다운 - 아이콘만 */}
            <div className="relative">
              <button
                onClick={() => setIsSiteDropdownOpen(!isSiteDropdownOpen)}
                className="p-2 text-gray-600 hover:text-sn-green transition-colors rounded-lg hover:bg-gray-100"
                title="다른 사이트"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </button>

              {isSiteDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <p className="text-xs font-semibold text-gray-500">다른 사이트</p>
                  </div>
                  {sites.map((site, index) => (
                    <a
                      key={index}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all"
                      onClick={() => setIsSiteDropdownOpen(false)}
                    >
                      {site.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/programs#contact"
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            >
              상담신청
            </a>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              aria-label="메뉴"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ============================================
         * 새로운 메뉴 구조 (5개 메뉴) - 모바일
         * ============================================ */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* 1. THE SYSTEM */}
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">THE SYSTEM</p>
                <a
                  href="/about/philosophy"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  관리 철학/시스템
                </a>
                <a
                  href="/about/ai-center"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AI특화관
                </a>
                <a
                  href="/about/team"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  강사/멘토진
                </a>
                <a
                  href="/about"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About SN
                </a>
              </div>

              {/* 2. 성적 변화의 증거 */}
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">성적 변화의 증거</p>
                <a
                  href="/success-stories"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  성공스토리
                </a>
                <a
                  href="/results/data"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  입결 데이터
                </a>
              </div>

              {/* 3. 캠퍼스 라이프 */}
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">캠퍼스 라이프</p>
                <a
                  href="/campus/rules"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  생활관리
                </a>
                <a
                  href="/campus/schedule"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  학습시간표
                </a>
                <a
                  href="/campus/yearly"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  학사일정
                </a>
                <a
                  href="/facility"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  시설안내
                </a>
                <a
                  href="/campus/menu"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  도시락 메뉴
                </a>
              </div>

              {/* 4. 입학 안내 */}
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">입학 안내</p>
                <a
                  href="/programs"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  모집요강
                </a>
                <a
                  href="/admission/scholarship"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  장학금
                </a>
                <a
                  href="/admission/visit"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  방문상담 예약
                </a>
              </div>

              {/* 5. 인사이트 */}
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">인사이트</p>
                <a
                  href="/community/column"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SN대치 칼럼
                </a>
                <a
                  href="/community/notices"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  공지사항
                </a>
                <a
                  href="/community/faq"
                  className="block pl-4 text-gray-600 hover:text-sn-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  자주 묻는 질문
                </a>
              </div>

              {/* 사이트 링크 */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2 font-semibold">다른 사이트로 이동</p>
                {sites.map((site, index) => (
                  <a
                    key={index}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-gray-700 hover:text-sn-green transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {site.name}
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                상담신청
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
