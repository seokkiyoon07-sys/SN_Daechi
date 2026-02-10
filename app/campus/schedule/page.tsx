'use client';

import { useEffect, useRef, useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SchedulePage() {
  const printRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'weekday' | 'saturday' | 'sunday'>('weekday');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // PDF 인쇄 기능
  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('팝업 차단을 해제해 주세요.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>학습시간표 - SN 대치</title>
        <style>
          @page { size: portrait; margin: 1cm; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Malgun Gothic', sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .header h1 { font-size: 24px; color: #1a5e3c; margin-bottom: 5px; }
          .header p { font-size: 14px; color: #666; }
          table { width: 100%; border-collapse: collapse; table-layout: fixed; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 11px; }
          th { background-color: #1a5e3c; color: white; font-weight: 600; }
          th.sunday { background-color: #fca5a5; }
          td { vertical-align: middle; }
          .break-row { background-color: #f3f4f6; }
          .activity { color: #1a5e3c; }
          .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SN 대치 학습시간표</h1>
          <p>인쇄일: ${new Date().toLocaleDateString('ko-KR')}</p>
        </div>
        ${printContent.innerHTML}
        <div class="footer">
          <p>※ 시간표는 학원 사정에 따라 변경될 수 있습니다.</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  // 모바일용 간단한 시간표 데이터
  const mobileSchedule = {
    weekday: [
      { period: "0교시", time: "08:00 ~ 08:50", activity: "자기주도학습" },
      { period: "1교시", time: "09:00 ~ 10:15", activity: "자기주도학습" },
      { period: "2교시", time: "10:30 ~ 11:45", activity: "자기주도학습" },
      { period: "점심", time: "11:45 ~ 13:00", activity: "외출 가능", isBreak: true },
      { period: "3교시", time: "13:00 ~ 14:30", activity: "자기주도학습" },
      { period: "4교시", time: "14:45 ~ 16:15", activity: "자기주도학습" },
      { period: "5교시", time: "16:30 ~ 17:45", activity: "자기주도학습" },
      { period: "저녁", time: "17:45 ~ 19:00", activity: "외출 가능", isBreak: true },
      { period: "6교시", time: "19:00 ~ 20:30", activity: "자기주도학습" },
      { period: "7교시", time: "20:45 ~ 21:50", activity: "자기주도학습" },
    ],
    saturday: [
      { period: "0교시", time: "08:00 ~ 08:50", activity: "자기주도학습" },
      { period: "1교시", time: "09:00 ~ 10:15", activity: "자기주도학습" },
      { period: "2교시", time: "10:30 ~ 11:45", activity: "자기주도학습" },
      { period: "점심", time: "11:45 ~ 13:00", activity: "외출 가능", isBreak: true },
      { period: "3교시", time: "13:00 ~ 14:30", activity: "자기주도학습" },
      { period: "4교시", time: "14:45 ~ 16:15", activity: "자기주도학습" },
      { period: "5교시", time: "16:30 ~ 17:45", activity: "자기주도학습" },
      { period: "저녁", time: "17:45 ~ 19:00", activity: "외출 가능", isBreak: true },
      { period: "6교시", time: "19:00 ~ 20:30", activity: "자율학습 (희망자)" },
      { period: "7교시", time: "20:45 ~ 21:50", activity: "자율학습 (희망자)" },
    ],
    sunday: [
      { period: "오전", time: "09:00 ~", activity: "09:00 오픈" },
      { period: "1-2교시", time: "09:00 ~ 11:45", activity: "자율학습" },
      { period: "점심", time: "11:45 ~ 13:00", activity: "외출 가능", isBreak: true },
      { period: "3-5교시", time: "13:00 ~ 17:45", activity: "자율학습" },
      { period: "종료", time: "17:45", activity: "18시 운영 종료", isBreak: true },
    ],
  };

  const schedule = [
    {
      period: "0교시",
      time: "08:00 ~ 08:50",
      activity: "자기주도학습\n(지각 및 미입실시 출입통제)",
      sunday: "09:00 오픈\n자율학습\n(학습시 상점부여)",
      rowSpan: 3,
      colSpan: 2,
      sunRowSpan: 3
    },
    {
      period: "1교시",
      time: "09:00 ~ 10:15",
      activity: null,
      sunday: null
    },
    {
      period: "2교시",
      time: "10:30 ~ 11:45",
      activity: null,
      sunday: null
    },
    {
      period: "점심시간",
      time: "11:45 ~ 13:00",
      activity: "식사 / 휴게실 내 휴대폰 사용 가능",
      isBreak: true,
      colSpan: 3
    },
    {
      period: "3교시",
      time: "13:00 ~ 14:30",
      activity: "자기주도학습\n(지각 및 미입실시 출입통제)",
      sunday: "자율학습\n(학습시 상점부여)",
      rowSpan: 3,
      colSpan: 2,
      sunRowSpan: 3
    },
    {
      period: "4교시",
      time: "14:45 ~ 16:15",
      activity: null,
      sunday: null
    },
    {
      period: "5교시",
      time: "16:30 ~ 17:45",
      activity: null,
      sunday: null
    },
    {
      period: "저녁시간",
      time: "17:45 ~ 19:00",
      activity: "외출 가능 / 휴게실 내 휴대폰 사용 가능",
      isBreak: true,
      colSpan: 3
    },
    {
      period: "6교시",
      time: "19:00 ~ 20:30",
      weekday: "자기주도학습\n(지각 및 미입실시 출입통제)",
      saturday: "자율 학습\n(희망자에 한함)",
      sunday: "-\n(18시 운영 종료)",
      rowSpan: 2,
      sunRowSpan: 2,
      hasSeparate: true
    },
    {
      period: "7교시",
      time: "20:45 ~ 21:50",
      weekday: null,
      saturday: null,
      sunday: null,
      hasSeparate: true
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 페이지 헤더 */}
          <div className="mb-8 md:mb-12 text-center">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Campus Life</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              학습시간표
            </h1>
            <p className="text-lg text-gray-600">
              하루 12시간 이상 집중 학습이 가능한 체계적인 시간표
            </p>
            {/* PDF 인쇄 버튼 */}
            <button
              onClick={handlePrint}
              className="mt-4 p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              title="PDF 인쇄"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
          </div>

          {/* 인쇄용 컨테이너 (숨김) */}
          <div ref={printRef} className="hidden">
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '12%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '30%' }} />
                <col style={{ width: '19%' }} />
                <col style={{ width: '19%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#1a5e3c', color: 'white' }}>교시</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#1a5e3c', color: 'white' }}>시간</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#1a5e3c', color: 'white' }}>월 - 금</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#1a5e3c', color: 'white' }}>토</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#fca5a5', color: 'white' }}>일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: '600' }}>0교시</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>08:00 ~ 08:50</td>
                  <td rowSpan={3} colSpan={2} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: '#1a5e3c', whiteSpace: 'pre-line' }}>자기주도학습{'\n'}(지각 및 미입실시 출입통제)</td>
                  <td rowSpan={3} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: '#1a5e3c', whiteSpace: 'pre-line' }}>09:00 오픈{'\n'}자율학습{'\n'}(학습시 상점부여)</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: '600' }}>1교시</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>09:00 ~ 10:15</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: '600' }}>2교시</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>10:30 ~ 11:45</td>
                </tr>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: '600' }}>점심시간</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>11:45 ~ 13:00</td>
                  <td colSpan={3} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: '#666' }}>식사 / 휴게실 내 휴대폰 사용 가능</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: '600' }}>3교시</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>13:00 ~ 14:30</td>
                  <td rowSpan={3} colSpan={2} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: '#1a5e3c', whiteSpace: 'pre-line' }}>자기주도학습{'\n'}(지각 및 미입실시 출입통제)</td>
                  <td rowSpan={3} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: '#1a5e3c', whiteSpace: 'pre-line' }}>자율학습{'\n'}(학습시 상점부여)</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: '600' }}>4교시</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>14:45 ~ 16:15</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: '600' }}>5교시</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>16:30 ~ 17:45</td>
                </tr>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: '600' }}>저녁시간</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>17:45 ~ 19:00</td>
                  <td colSpan={3} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: '#666' }}>외출 가능 / 휴게실 내 휴대폰 사용 가능</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: '600' }}>6교시</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>19:00 ~ 20:30</td>
                  <td rowSpan={2} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: '#1a5e3c', whiteSpace: 'pre-line' }}>자기주도학습{'\n'}(지각 및 미입실시 출입통제)</td>
                  <td rowSpan={2} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: '#1a5e3c', whiteSpace: 'pre-line' }}>자율 학습{'\n'}(희망자에 한함)</td>
                  <td rowSpan={2} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: '#666', whiteSpace: 'pre-line' }}>-{'\n'}(18시 운영 종료)</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: '600' }}>7교시</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>20:45 ~ 21:50</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 모바일 탭 시간표 */}
          <div className="md:hidden">
            {/* 탭 버튼 */}
            <div className="flex rounded-xl bg-gray-100 p-1 mb-4">
              <button
                onClick={() => setActiveTab('weekday')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === 'weekday'
                    ? 'bg-sn-green text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                월-금
              </button>
              <button
                onClick={() => setActiveTab('saturday')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === 'saturday'
                    ? 'bg-sn-green text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                토요일
              </button>
              <button
                onClick={() => setActiveTab('sunday')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === 'sunday'
                    ? 'bg-red-400 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                일요일
              </button>
            </div>

            {/* 탭 내용 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className={activeTab === 'sunday' ? 'bg-red-400 text-white' : 'bg-sn-green text-white'}>
                    <th className="px-3 py-3 text-center font-semibold text-sm">교시</th>
                    <th className="px-3 py-3 text-center font-semibold text-sm">시간</th>
                    <th className="px-3 py-3 text-center font-semibold text-sm">내용</th>
                  </tr>
                </thead>
                <tbody>
                  {mobileSchedule[activeTab].map((item, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${item.isBreak ? 'bg-gray-50' : ''}`}>
                      <td className="px-3 py-3 text-center font-medium text-sm">{item.period}</td>
                      <td className="px-3 py-3 text-center text-gray-600 text-sm">{item.time}</td>
                      <td className={`px-3 py-3 text-center text-sm ${item.isBreak ? 'text-gray-500' : 'text-sn-green font-medium'}`}>
                        {item.activity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 데스크탑 시간표 */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-sn-green text-white">
                  <th className="px-4 py-4 text-center font-semibold border-r border-sn-green-light w-[12%]">교시</th>
                  <th className="px-4 py-4 text-center font-semibold border-r border-sn-green-light w-[20%]">시간</th>
                  <th className="px-4 py-4 text-center font-semibold border-r border-sn-green-light w-[30%]">월 - 금</th>
                  <th className="px-4 py-4 text-center font-semibold border-r border-sn-green-light w-[19%]">토</th>
                  <th className="px-4 py-4 text-center font-semibold w-[19%] bg-red-300">일</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 last:border-b-0">
                    <td className={`px-4 py-5 text-center font-semibold border-r border-gray-200 ${item.isBreak ? 'bg-gray-50' : ''}`}>
                      {item.period}
                    </td>
                    <td className={`px-4 py-5 text-center text-gray-700 border-r border-gray-200 ${item.isBreak ? 'bg-gray-50' : ''}`}>
                      {item.time}
                    </td>
                    {/* 저녁 시간까지는 월-금/토 합쳐서 표시 */}
                    {item.activity !== undefined && item.activity !== null && (
                      <td
                        className={`px-4 py-5 text-center border-r border-gray-200 ${item.isBreak ? 'bg-gray-50 text-gray-600' : 'text-sn-green'}`}
                        rowSpan={item.rowSpan || 1}
                        colSpan={item.colSpan || 1}
                      >
                        <div className="whitespace-pre-line">
                          {item.activity}
                        </div>
                      </td>
                    )}
                    {/* 7교시, 8교시는 월-금/토 분리 */}
                    {item.hasSeparate && item.weekday !== null && (
                      <td
                        className="px-4 py-5 text-center border-r border-gray-200 text-sn-green"
                        rowSpan={item.rowSpan || 1}
                      >
                        <div className="whitespace-pre-line">
                          {item.weekday}
                        </div>
                      </td>
                    )}
                    {item.hasSeparate && item.saturday !== null && (
                      <td
                        className="px-4 py-5 text-center border-r border-gray-200 text-sn-green"
                        rowSpan={item.rowSpan || 1}
                      >
                        <div className="whitespace-pre-line">
                          {item.saturday}
                        </div>
                      </td>
                    )}
                    {/* 일요일 칸 */}
                    {item.sunday !== undefined && item.sunday !== null && (
                      <td
                        className={`px-4 py-5 text-center ${item.isBreak ? 'bg-gray-50 text-gray-600' : 'text-sn-green'}`}
                        rowSpan={item.sunRowSpan || 1}
                      >
                        <div className="whitespace-pre-line">
                          {item.sunday}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 안내 */}
          <div className="mt-8 md:mt-12 p-4 md:p-6 bg-sn-green/10 rounded-xl border border-sn-green/30">
            <p className="text-center text-gray-700">
              <span className="font-semibold text-sn-green">※ 시간표는 학원 사정에 따라 변경될 수 있습니다.</span><br />
              <span className="text-sm">자세한 내용은 공지사항을 확인해 주세요.</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
