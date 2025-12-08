'use client';

import React from 'react';

interface MacbookMockupProps {
  title?: string;
  url?: string;
  children: React.ReactNode;
}

export default function MacbookMockup({ title, url, children }: MacbookMockupProps) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* 맥북 프레임 */}
      <div className="relative">
        {/* 화면 부분 */}
        <div className="bg-gray-800 rounded-t-2xl p-2 pt-6 shadow-2xl">
          {/* 상단 바 (카메라, 버튼들) */}
          <div className="absolute top-2 left-0 right-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>

          {/* 브라우저 창 */}
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            {/* 브라우저 상단 바 */}
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-3">
              {/* 트래픽 라이트 버튼 */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              {/* URL 바 */}
              <div className="flex-1 flex justify-center">
                <div className="bg-slate-700 rounded-md px-4 py-1 flex items-center gap-2 max-w-md w-full">
                  <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-slate-300 text-xs truncate">{url || 'https://example.com'}</span>
                </div>
              </div>

              {/* 제목 (옵션) */}
              {title && (
                <div className="text-slate-400 text-xs font-medium hidden sm:block">
                  {title}
                </div>
              )}
            </div>

            {/* 콘텐츠 영역 */}
            <div className="h-[400px] sm:h-[450px] md:h-[500px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
              {children}
            </div>
          </div>
        </div>

        {/* 맥북 하단 (힌지/베이스) */}
        <div className="bg-gradient-to-b from-gray-700 to-gray-800 h-4 rounded-b-lg mx-8"></div>
        <div className="bg-gradient-to-b from-gray-600 to-gray-700 h-2 rounded-b-xl mx-16 shadow-lg"></div>
      </div>
    </div>
  );
}
