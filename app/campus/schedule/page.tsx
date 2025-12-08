'use client';

import { useEffect } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SchedulePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schedule = [
    {
      period: "1교시",
      time: "08:00 ~ 08:50",
      activity: "자기주도학습\n(지각 및 미입실시 출입통제)",
      sunday: "자율학습\n(학습시 상점부여)",
      rowSpan: 3,
      colSpan: 2,
      sunRowSpan: 3
    },
    {
      period: "2교시",
      time: "09:00 ~ 10:15",
      activity: null,
      sunday: null
    },
    {
      period: "3교시",
      time: "10:30 ~ 12:00",
      activity: null,
      sunday: null
    },
    {
      period: "점심 시간",
      time: "12:00 ~ 13:10",
      activity: "외출 가능 / 휴게실 내 휴대폰 사용 가능",
      isBreak: true,
      colSpan: 3
    },
    {
      period: "4교시",
      time: "13:10 ~ 14:30",
      activity: "자기주도학습\n(지각 및 미입실시 출입통제)",
      sunday: "자율학습\n(학습시 상점부여)",
      rowSpan: 3,
      colSpan: 2,
      sunRowSpan: 3
    },
    {
      period: "5교시",
      time: "14:45 ~ 16:15",
      activity: null,
      sunday: null
    },
    {
      period: "6교시",
      time: "16:30 ~ 18:00",
      activity: null,
      sunday: null
    },
    {
      period: "저녁 시간",
      time: "18:10 ~ 19:10",
      activity: "외출 가능 / 휴게실 내 휴대폰 사용 가능",
      isBreak: true,
      colSpan: 3
    },
    {
      period: "7교시",
      time: "19:10 ~ 20:40",
      weekday: "자기주도학습\n(지각 및 미입실시 출입통제)",
      saturday: "자율 학습\n(희망자에 한함)",
      sunday: "자율학습\n(학습시 상점부여)",
      rowSpan: 2,
      sunRowSpan: 2,
      hasSeparate: true
    },
    {
      period: "8교시",
      time: "20:55 ~ 22:00",
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
          <div className="mb-12 text-center">
            <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">Campus Life</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              학습시간표
            </h1>
            <p className="text-lg text-gray-600">
              하루 12시간 이상 집중 학습이 가능한 체계적인 시간표
            </p>
          </div>

          {/* 시간표 */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
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
          <div className="mt-12 p-6 bg-sn-green/10 rounded-xl border border-sn-green/30">
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
