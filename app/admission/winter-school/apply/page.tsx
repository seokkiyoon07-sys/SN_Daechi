import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WinterApplication from '@/components/sections/WinterApplication';

export const metadata: Metadata = {
  title: '2027 프리윈터 / 윈터스쿨 예약 신청 | SN고요의숲 대치점',
  description: 'SN고요의숲 대치점 프리윈터 및 윈터스쿨 예약 신청. 접수 후 학부모님 연락처로 상담전화 드립니다.',
};

export default function WinterApplicationPage() {
  return <><Header /><main className="min-h-screen bg-gray-50 pt-24"><WinterApplication /></main><Footer /></>;
}
