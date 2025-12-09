'use client';

import { useEffect, useRef, useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function YearlyPage() {
  const todayRef = useRef<HTMLTableCellElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // 오늘 날짜
  const today = new Date();
  const currentYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  // 선택된 연도 (기본: 2026년)
  const [selectedYear, setSelectedYear] = useState(2026);

  // 보기 모드: 'yearly' (연간) 또는 'monthly' (월별)
  const [viewMode, setViewMode] = useState<'yearly' | 'monthly'>('yearly');

  // 월별 보기에서 선택된 월
  const [selectedMonth, setSelectedMonth] = useState(todayMonth);

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

  // 요일 이름
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 해당 월의 첫 번째 날의 요일 (0: 일요일)
  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month - 1, 1).getDay();
  };

  // 월별 캘린더 데이터 생성
  const getMonthCalendarData = (year: number, month: number) => {
    const firstDay = getFirstDayOfMonth(year, month);
    const totalDays = daysInMonth[month];
    const weeks: (number | null)[][] = [];
    let currentWeek: (number | null)[] = [];

    // 첫 주의 빈 칸
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null);
    }

    // 날짜 채우기
    for (let day = 1; day <= totalDays; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // 마지막 주의 빈 칸
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  // PDF 인쇄 기능
  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('팝업 차단을 해제해 주세요.');
      return;
    }

    const title = viewMode === 'yearly'
      ? `${selectedYear}년 연간 학사일정`
      : `${selectedYear}년 ${selectedMonth}월 학사일정`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title} - SN 대치</title>
        <style>
          @page { size: ${viewMode === 'yearly' ? 'landscape' : 'portrait'}; margin: 1cm; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Malgun Gothic', sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .header h1 { font-size: 24px; color: #1a5e3c; margin-bottom: 5px; }
          .header p { font-size: 14px; color: #666; }
          table { width: 100%; border-collapse: collapse; table-layout: fixed; }
          th, td { border: 1px solid #ddd; padding: 4px 2px; text-align: center; font-size: 10px; overflow: hidden; word-break: break-all; }
          th { background-color: #1a5e3c; color: white; font-weight: 600; }
          th.day-col { width: 4%; }
          th.month-col { width: 8%; }
          td.day-col { width: 4%; }
          td.month-col { width: 8%; }
          .sunday { color: #dc2626; }
          .holiday { color: #dc2626; background-color: #fef2f2; }
          .event { background-color: #f0fdf4; color: #1a5e3c; font-weight: 500; }
          .csat { background-color: #fef3c7; color: #dc2626; font-weight: bold; }
          .today { background-color: #dbeafe; }
          .gray { background-color: #f3f4f6; }
          .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
          .monthly-table { table-layout: fixed; }
          .monthly-table th, .monthly-table td { width: 14.28%; padding: 8px; vertical-align: top; min-height: 80px; }
          .monthly-day { font-weight: bold; margin-bottom: 4px; }
          .monthly-event { font-size: 9px; padding: 2px 4px; background: #f0fdf4; border-radius: 2px; margin-top: 2px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SN 대치 ${title}</h1>
          <p>인쇄일: ${new Date().toLocaleDateString('ko-KR')}</p>
        </div>
        ${printContent.innerHTML}
        <div class="footer">
          <p>※ 일정은 학원 사정에 따라 변경될 수 있습니다.</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
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

          {/* 보기 모드 선택 & PDF 인쇄 버튼 */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            {/* 연간/월별 보기 토글 */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'yearly'
                    ? 'bg-sn-green text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                연간 보기
              </button>
              <button
                onClick={() => setViewMode('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'monthly'
                    ? 'bg-sn-green text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                월별 보기
              </button>
            </div>

            {/* PDF 인쇄 버튼 */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              PDF 인쇄
            </button>
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

          {/* 월별 보기일 때 월 선택 */}
          {viewMode === 'monthly' && (
            <div className="flex justify-center items-center gap-2 mb-6 flex-wrap">
              {months.map((month, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMonth(index + 1)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedMonth === index + 1
                      ? 'bg-sn-green text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}

          {/* 인쇄용 컨테이너 (숨김) */}
          <div ref={printRef} className="hidden">
            {viewMode === 'yearly' ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '4%' }} />
                  {months.map((_, i) => (
                    <col key={i} style={{ width: '8%' }} />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '4px 2px', textAlign: 'center', fontSize: '10px', backgroundColor: '#1a5e3c', color: 'white' }}>일</th>
                    {months.map((month, index) => (
                      <th key={index} style={{ border: '1px solid #ddd', padding: '4px 2px', textAlign: 'center', fontSize: '10px', backgroundColor: '#1a5e3c', color: 'white' }}>
                        {month}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day}>
                      <td style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'center', fontSize: '9px', backgroundColor: '#f3f4f6' }}>{day}</td>
                      {months.map((_, monthIndex) => {
                        const monthNum = monthIndex + 1;
                        const isValidDay = day <= daysInMonth[monthNum];
                        const eventKey = `${monthNum}-${day}`;
                        const event = events[eventKey];
                        const sunday = isValidDay && isSunday(selectedYear, monthNum, day);
                        const holiday = isValidDay && isHoliday(monthNum, day);
                        const csat = isValidDay && isCSAT(monthNum, day);

                        return (
                          <td
                            key={monthIndex}
                            style={{
                              border: '1px solid #ddd',
                              padding: '2px',
                              textAlign: 'center',
                              fontSize: '8px',
                              overflow: 'hidden',
                              wordBreak: 'break-all',
                              backgroundColor: !isValidDay ? '#f3f4f6' : csat ? '#fef3c7' : (sunday || holiday) ? '#fef2f2' : event ? '#f0fdf4' : 'white',
                              color: csat ? '#dc2626' : (sunday || holiday) ? '#dc2626' : event ? '#1a5e3c' : 'inherit',
                              fontWeight: csat || event ? 'bold' : 'normal',
                            }}
                          >
                            {isValidDay && event ? event : ''}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>
                <h2 style={{ textAlign: 'center', marginBottom: '16px', fontSize: '18px', color: '#1a5e3c' }}>
                  {selectedYear}년 {selectedMonth}월
                </h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                  <colgroup>
                    {weekDays.map((_, i) => (
                      <col key={i} style={{ width: '14.28%' }} />
                    ))}
                  </colgroup>
                  <thead>
                    <tr>
                      {weekDays.map((day, index) => (
                        <th key={index} style={{
                          border: '1px solid #ddd',
                          padding: '8px',
                          textAlign: 'center',
                          backgroundColor: '#1a5e3c',
                          color: index === 0 ? '#fca5a5' : 'white',
                          fontWeight: '600'
                        }}>
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getMonthCalendarData(selectedYear, selectedMonth).map((week, weekIndex) => (
                      <tr key={weekIndex}>
                        {week.map((day, dayIndex) => {
                          const eventKey = day ? `${selectedMonth}-${day}` : '';
                          const event = day ? events[eventKey] : null;
                          const sunday = dayIndex === 0;
                          const holiday = day ? isHoliday(selectedMonth, day) : false;
                          const csat = day ? isCSAT(selectedMonth, day) : false;

                          return (
                            <td key={dayIndex} style={{
                              border: '1px solid #ddd',
                              padding: '8px',
                              verticalAlign: 'top',
                              height: '80px',
                              backgroundColor: csat ? '#fef3c7' : (sunday || holiday) ? '#fef2f2' : event ? '#f0fdf4' : 'white',
                            }}>
                              {day && (
                                <>
                                  <div style={{
                                    fontWeight: 'bold',
                                    marginBottom: '4px',
                                    color: (sunday || holiday) ? '#dc2626' : '#374151'
                                  }}>
                                    {day}
                                  </div>
                                  {event && (
                                    <div style={{
                                      fontSize: '10px',
                                      padding: '2px 4px',
                                      backgroundColor: csat ? '#fef3c7' : '#f0fdf4',
                                      borderRadius: '2px',
                                      color: csat ? '#dc2626' : '#1a5e3c',
                                      fontWeight: csat ? 'bold' : '500'
                                    }}>
                                      {event}
                                    </div>
                                  )}
                                </>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 연간 보기: 학사일정 표 */}
          {viewMode === 'yearly' && (
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
          )}

          {/* 월별 보기: 캘린더 형태 */}
          {viewMode === 'monthly' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* 캘린더 헤더 */}
              <div className="grid grid-cols-7 bg-sn-green text-white">
                {weekDays.map((day, index) => (
                  <div key={index} className={`py-3 text-center text-sm font-semibold ${index === 0 ? 'text-red-300' : ''}`}>
                    {day}
                  </div>
                ))}
              </div>

              {/* 캘린더 본문 */}
              <div className="grid grid-cols-7">
                {getMonthCalendarData(selectedYear, selectedMonth).flat().map((day, index) => {
                  const dayOfWeek = index % 7;
                  const sunday = dayOfWeek === 0;
                  const eventKey = day ? `${selectedMonth}-${day}` : '';
                  const event = day ? events[eventKey] : null;
                  const holiday = day ? isHoliday(selectedMonth, day) : false;
                  const csat = day ? isCSAT(selectedMonth, day) : false;
                  const todayCell = day ? isToday(selectedYear, selectedMonth, day) : false;

                  return (
                    <div
                      key={index}
                      className={`min-h-[80px] sm:min-h-[100px] p-2 border-b border-r border-gray-200 ${
                        !day ? 'bg-gray-50' :
                        todayCell ? 'bg-blue-50 ring-2 ring-blue-500 ring-inset' :
                        csat ? 'bg-yellow-50' :
                        (sunday || holiday) ? 'bg-red-50' :
                        event ? 'bg-sn-green/5' : 'bg-white'
                      }`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-bold mb-1 ${
                            todayCell ? 'text-blue-600' :
                            (sunday || holiday) ? 'text-red-500' : 'text-gray-700'
                          }`}>
                            {day}
                            {todayCell && <span className="ml-1 text-xs font-normal">(오늘)</span>}
                          </div>
                          {event && (
                            <div className={`text-xs px-1.5 py-0.5 rounded ${
                              csat ? 'bg-yellow-200 text-red-600 font-bold' :
                              (sunday || holiday) ? 'bg-red-100 text-red-600' :
                              'bg-sn-green/20 text-sn-green font-medium'
                            }`}>
                              {event}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
