'use client';

import Image from 'next/image';
import ReservationForm from './ReservationForm';


export default function BusinessRoom() {
  return (
    <div id="business-room" className="scroll-mt-28 mx-auto mt-12 max-w-[1100px] overflow-hidden rounded-2xl border-2 border-sn-main/20 bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-64 lg:min-h-full">
          <Image src="/image/business-room.jpeg" alt="테이블과 의자, 벽걸이 모니터가 있는 일반용 비즈니스룸" fill sizes="(min-width: 1024px) 550px, 100vw" className="object-cover" />
        </div>
        <div className="p-6 sm:p-8">
          <span className="text-sm font-semibold text-sn-green">시간제 이용권</span>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">일반용 비즈니스룸</h3>
          <p className="mt-3 text-gray-600">회의와 개인 업무를 위한 공간입니다. 원하는 날짜와 이용 시간을 선택하세요.</p>
          <p className="mt-4 text-2xl font-bold text-sn-green">10,000원 <span className="text-sm font-medium">/ 시간</span></p>
          <div className="mt-6"><ReservationForm kind="BUSINESS_ROOM" /></div>
        </div>
      </div>
    </div>
  );
}
