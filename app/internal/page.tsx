'use client';

import Link from 'next/link';

export default function InternalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ fontFamily: "'Pretendard', sans-serif", backgroundColor: '#f8faf9' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700;900&display=swap');

        :root {
          --mint-light: #e8f5f0;
          --mint: #a8d5c2;
          --mint-dark: #7bc4a8;
          --green-deep: #2d5a47;
          --green-darker: #1a3d2e;
          --gray-light: #d4ddd8;
          --bg-cream: #f8faf9;
          --text-dark: #1a2f23;
          --text-muted: #5a6b62;
          --accent-teal: #4a9d7c;
        }
      `}</style>

      <div className="text-center px-6">
        <span
          className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
          style={{ backgroundColor: 'var(--mint-light)', color: 'var(--green-deep)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          Internal
        </span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
          내부 자료실
        </h1>
        <p className="mb-12" style={{ color: 'var(--text-muted)' }}>
          SN 고요의숲 대치 입학상담 자료
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/internal/ppt"
            className="px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--green-deep)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(45, 90, 71, 0.3)'
            }}
          >
            📊 입학상담 PPT
          </Link>
          <Link
            href="/internal/guide"
            className="px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: 'white',
              color: 'var(--green-deep)',
              border: '2px solid var(--mint-dark)'
            }}
          >
            📋 업무가이드
          </Link>
        </div>

        <p className="mt-12 text-sm" style={{ color: 'var(--gray-warm)' }}>
          ※ 본 자료는 내부 업무용이며 외부 유출을 금합니다
        </p>
      </div>
    </div>
  );
}
