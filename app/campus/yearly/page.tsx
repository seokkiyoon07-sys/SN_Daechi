'use client';

import { useEffect, useRef, useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function YearlyPage() {
  const todayRef = useRef<HTMLTableCellElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // 오늘 날짜
  const today = new Date();
  const currentYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  // 선택된 연도 (기본: 2026년)
  const [selectedYear, setSelectedYear] = useState(2026);

  // 오늘 날짜인지 확인
  const isToday = (year: number, month: number, day: number): boolean => {
    return year === currentYear && month === todayMonth && day === todayDay;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 오늘 날짜 셀로 스크롤 (현재 연도일 때만)
    if (selectedYear === currentYear && todayRef.current && tableContainerRef.current) {
      const container = tableContainerRef.current;
      const cell = todayRef.current;
      const row = cell.parentElement;
      if (row) {
        const rowTop = row.offsetTop;
        const containerHeight = container.clientHeight;
        const scrollTo = rowTop - containerHeight / 2 + row.clientHeight / 2;
        container.scrollTop = Math.max(0, scrollTo);
      }
    } else if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  }, [selectedYear, currentYear]);

  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 윤년 확인
  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // 각 월별 일수
  const getDaysInMonth = (year: number): { [key: number]: number } => {
    return {
      1: 31, 2: isLeapYear(year) ? 29 : 28, 3: 31, 4: 30, 5: 31, 6: 30,
      7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
    };
  };

  const daysInMonth = getDaysInMonth(selectedYear);

  // 일요일인지 확인하는 함수
  const isSunday = (year: number, month: number, day: number): boolean => {
    const date = new Date(year, month - 1, day);
    return date.getDay() === 0;
  };

  // 연도별 공휴일 데이터
  const holidaysByYear: { [key: number]: string[] } = {
    2025: [
      '1-1',                   // 신정
      '1-28', '1-29', '1-30',  // 설날 연휴 (2025년)
      '3-1',                   // 삼일절
      '5-5',                   // 어린이날
      '5-5',                   // 부처님오신날 (2025년 - 어린이날과 겹침)
      '6-6',                   // 현충일
      '8-15',                  // 광복절
      '10-5', '10-6', '10-7',  // 추석 연휴 (2025년)
      '10-3',                  // 개천절
      '10-9',                  // 한글날
      '12-25',                 // 크리스마스
    ],
    2026: [
      '1-1',                   // 신정
      '2-16', '2-17', '2-18',  // 설날 연휴 (2026년)
      '3-1',                   // 삼일절
      '5-5',                   // 어린이날
      '5-24',                  // 부처님오신날 (2026년)
      '6-6',                   // 현충일
      '8-15',                  // 광복절
      '9-24', '9-25', '9-26',  // 추석 연휴 (2026년)
      '10-3',                  // 개천절
      '10-9',                  // 한글날
      '12-25',                 // 크리스마스
    ],
    2027: [
      '1-1',                   // 신정
      '2-6', '2-7', '2-8',     // 설날 연휴 (2027년)
      '3-1',                   // 삼일절
      '5-5',                   // 어린이날
      '5-13',                  // 부처님오신날 (2027년)
      '6-6',                   // 현충일
      '8-15',                  // 광복절
      '9-14', '9-15', '9-16',  // 추석 연휴 (2027년)
      '10-3',                  // 개천절
      '10-9',                  // 한글날
      '12-25',                 // 크리스마스
    ],
  };

  const holidays = holidaysByYear[selectedYear] || [];

  const isHoliday = (month: number, day: number): boolean => {
    return holidays.includes(`${month}-${day}`);
  };

  // 연도별 일정 데이터
  const eventsByYear: { [key: number]: { [key: string]: string } } = {
    2025: {
      '1-1': '신정',
      '1-29': '설날',
      '3-1': '삼일절',
      '3-27': '교육청 모의고사',
      '5-5': '어린이날',
      '5-8': '교육청 모의고사',
      '6-4': '평가원 모의고사',
      '6-6': '현충일',
      '7-10': '교육청 모의고사',
      '8-15': '광복절',
      '9-3': '평가원 모의고사',
      '10-6': '추석',
      '10-3': '개천절',
      '10-9': '한글날',
      '10-16': '교육청 모의고사',
      '11-13': '수능',
      '12-25': '크리스마스',
    },
    2026: {
      '1-1': '신정',
      '2-17': '설날',
      '3-1': '삼일절',
      '3-24': '교육청 모의고사',
      '5-5': '어린이날',
      '5-7': '교육청 모의고사',
      '5-24': '부처님오신날',
      '6-4': '평가원 모의고사',
      '6-6': '현충일',
      '7-8': '교육청 모의고사',
      '8-15': '광복절',
      '9-2': '평가원 모의고사',
      '9-25': '추석',
      '10-3': '개천절',
      '10-9': '한글날',
      '10-20': '교육청 모의고사',
      '11-19': '수능',
      '12-25': '크리스마스',
    },
    2027: {
      '1-1': '신정',
      '2-7': '설날',
      '3-1': '삼일절',
      '5-5': '어린이날',
      '5-13': '부처님오신날',
      '6-6': '현충일',
      '8-15': '광복절',
      '9-15': '추석',
      '10-3': '개천절',
      '10-9': '한글날',
      '11-18': '수능',
      '12-25': '크리스마스',
    },
  };

  const events = eventsByYear[selectedYear] || {};

  // 수능 날짜 (진하게 표시)
  const csatDates: { [key: number]: string } = {
    2025: '11-13',
    2026: '11-19',
    2027: '11-18',
  };

  const isCSAT = (month: number, day: number): boolean => {
    return csatDates[selectedYear] === `${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 페이지 헤더 */}
          <div className="mb-12 text-center">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Campus Life</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              학사일정
            </h1>
            <p className="text-lg text-gray-600">
              {selectedYear}년도 주요 일정 및 학사 계획
            </p>
          </div>

          {/* 연도 선택 */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <button
              onClick={() => setSelectedYear(selectedYear - 1)}
              disabled={selectedYear <= 2025}
              className={`p-2 rounded-lg border transition-colors ${
                selectedYear <= 2025
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="px-6 py-2 text-xl font-bold text-gray-900">
              {selectedYear}년
            </span>

            <button
              onClick={() => setSelectedYear(selectedYear + 1)}
              disabled={selectedYear >= 2027}
              className={`p-2 rounded-lg border transition-colors ${
                selectedYear >= 2027
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* 학사일정 표 */}
          <div ref={tableContainerRef} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full min-w-[900px] table-fixed">
              <thead className="sticky top-0 z-10">
                <tr className="bg-sn-green text-white">
                  <th className="px-2 py-3 text-center text-sm font-semibold border-r border-sn-green-light w-[4%]">일</th>
                  {months.map((month, index) => (
                    <th key={index} className="px-2 py-3 text-center text-sm font-semibold border-r border-sn-green-light last:border-r-0 w-[8%]">
                      {month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day} className={day % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-2 py-2 text-center text-sm font-medium text-gray-700 border-r border-gray-200 bg-gray-100">
                      {day}
                    </td>
                    {months.map((_, monthIndex) => {
                      const monthNum = monthIndex + 1;
                      const isValidDay = day <= daysInMonth[monthNum];
                      const eventKey = `${monthNum}-${day}`;
                      const event = events[eventKey];
                      const sunday = isValidDay && isSunday(selectedYear, monthNum, day);
                      const holiday = isValidDay && isHoliday(monthNum, day);
                      const csat = isValidDay && isCSAT(monthNum, day);
                      const todayCell = isValidDay && isToday(selectedYear, monthNum, day);

                      return (
                        <td
                          key={monthIndex}
                          ref={todayCell ? todayRef : null}
                          className={`px-1 py-2 text-center text-xs border-r border-gray-200 last:border-r-0 ${
                            !isValidDay ? 'bg-gray-100' : todayCell ? 'bg-blue-100 ring-2 ring-blue-500 ring-inset' : csat ? 'bg-yellow-100' : (sunday || holiday) ? 'bg-red-50' : event ? 'bg-sn-green/10' : ''
                          }`}
                        >
                          {isValidDay && todayCell && !event && (
                            <span className="font-bold text-blue-600">오늘</span>
                          )}
                          {isValidDay && event && (
                            <span className={`${csat ? 'font-bold text-red-600' : todayCell ? 'font-bold text-blue-600' : 'font-medium'} ${(sunday || holiday) && !todayCell ? 'text-red-500' : csat && !todayCell ? '' : todayCell ? 'text-blue-600' : 'text-sn-green'}`}>{event}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 안내 */}
          <div className="mt-12 p-6 bg-sn-green/10 rounded-xl border border-sn-green/30">
            <p className="text-center text-gray-700">
              <span className="font-semibold text-sn-green">※ 일정은 학원 사정에 따라 변경될 수 있습니다.</span><br />
              <span className="text-sm">자세한 일정은 공지사항을 확인해 주세요.</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
