'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSiteDropdownOpen, setIsSiteDropdownOpen] = useState(false);
  const [isSitesOpen, setIsSitesOpen] = useState(false);
  const sitesRef = useRef<HTMLDivElement>(null);

  const sites = [
    { name: 'SN고요의숲(대치)', url: 'https://daechi.snacademy.co.kr' },
    { name: 'SN독학기숙학원', url: 'https://www.snacademy.co.kr' },
    { name: 'SNarGPT', url: 'https://snargpt.ai' },
    { name: 'SN블로그', url: 'https://blog.snacademy.co.kr' }
  ];

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sitesRef.current && !sitesRef.current.contains(event.target as Node)) {
        setIsSitesOpen(false);
      }
    }

    if (isSitesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSitesOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
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
                <span className="text-xs text-gray-600">독학관리</span>
              </div>
            </Link>
          </div>

          {/* 데스크톱 메뉴 + CTA - 오른쪽 정렬 */}
          <div className="hidden md:flex md:items-center md:space-x-6 ml-auto">
            <a href="/about" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors group">
              학원소개
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sn-green to-sn-green-light group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/programs" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors group">
              프로그램
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sn-green to-sn-green-light group-hover:w-full transition-all duration-300"></span>
            </a>
            {/* 학원생활 드롭다운 */}
            <div className="relative group">
              <a href="/campus" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors">
                학원생활
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
                <a href="/campus/menu" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  도시락 메뉴
                </a>
              </div>
            </div>
            <a href="/success-stories" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors group">
              성공스토리
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sn-green to-sn-green-light group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/facility" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors group">
              시설안내
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sn-green to-sn-green-light group-hover:w-full transition-all duration-300"></span>
            </a>
            {/* 커뮤니티 드롭다운 */}
            <div className="relative group">
              <a href="/community/notices" className="relative text-gray-700 hover:text-sn-green hover:font-semibold transition-colors">
                커뮤니티
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sn-green to-sn-green-light group-hover:w-full transition-all duration-300"></span>
              </a>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="/community/notices" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  공지사항
                </a>
                <a href="/community/column" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  SN대치 칼럼
                </a>
                <a href="/community/faq" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sn-green/10 hover:text-sn-green transition-all text-center">
                  자주 묻는 질문
                </a>
              </div>
            </div>

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

<<<<<<< HEAD
            <a
              href="/programs#contact"
=======
          {/* CTA 버튼 및 SN 사이트 토글 */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* SN 사이트 토글 */}
            <div className="relative" ref={sitesRef}>
              <button
                onClick={() => setIsSitesOpen(!isSitesOpen)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                SN 사이트
                <svg
                  className={`w-4 h-4 transition-transform ${isSitesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* 드롭다운 메뉴 */}
              {isSitesOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a
                    href="https://www.snacademy.co.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsSitesOpen(false)}
                  >
                    SN독학기숙학원(남학생캠퍼스)
                  </a>
                  <a
                    href="https://snargpt.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsSitesOpen(false)}
                  >
                    SNargpt.ai
                  </a>
                  <a
                    href="https://blog.snacademy.co.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsSitesOpen(false)}
                  >
                    SN 블로그
                  </a>
                </div>
              )}
            </div>
            
            <a
              href="#contact"
>>>>>>> 4d560a548572d3eb1adee2a42860ec2eb4a9a89d
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

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a
                href="/about"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                학원소개
              </a>
              <a
                href="/programs"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                프로그램
              </a>
              <a
                href="/campus"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                학원생활
              </a>
              <a
                href="/success-stories"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                성공스토리
              </a>
              <a
                href="/facility"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                시설안내
              </a>
<<<<<<< HEAD
              <a
                href="/community/notices"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                커뮤니티
              </a>
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
=======
              
              {/* SN 사이트 토글 */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <button
                  onClick={() => setIsSitesOpen(!isSitesOpen)}
                  className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span className="text-sm font-medium">SN 사이트</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isSitesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isSitesOpen && (
                  <div className="mt-2 space-y-2 pl-4">
                    <a
                      href="https://www.snacademy.co.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsSitesOpen(false);
                      }}
                    >
                      SN독학기숙학원(남학생캠퍼스)
                    </a>
                    <a
                      href="https://snargpt.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsSitesOpen(false);
                      }}
                    >
                      SNargpt.ai
                    </a>
                    <a
                      href="https://blog.snacademy.co.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsSitesOpen(false);
                      }}
                    >
                      SN 블로그
                    </a>
                  </div>
                )}
              </div>
              
>>>>>>> 4d560a548572d3eb1adee2a42860ec2eb4a9a89d
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
