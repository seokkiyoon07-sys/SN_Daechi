'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSitesOpen, setIsSitesOpen] = useState(false);
  const sitesRef = useRef<HTMLDivElement>(null);

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
        <div className="flex justify-between items-center h-16">
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

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
              학원소개
            </a>
            <a href="/programs" className="text-gray-700 hover:text-gray-900 transition-colors">
              프로그램
            </a>
            <a href="/results" className="text-gray-700 hover:text-gray-900 transition-colors">
              합격실적
            </a>
            <a href="/testimonials" className="text-gray-700 hover:text-gray-900 transition-colors">
              수강후기
            </a>
            <a href="/news" className="text-gray-700 hover:text-gray-900 transition-colors">
              공지사항
            </a>
          </div>

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
                href="/results"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                합격실적
              </a>
              <a
                href="/testimonials"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                수강후기
              </a>
              <a
                href="/news"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                공지사항
              </a>
              
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
