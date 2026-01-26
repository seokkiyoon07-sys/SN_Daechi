'use client';

import { useState } from 'react';
import Image from 'next/image';

// 잔디 웹훅 URL
const WEBHOOK_URL = 'https://wh.jandi.com/connect-api/webhook/13116580/11853050951612bffd7a7748a2fab30e';

interface FormData {
  name: string;
  phone: string;
  email: string;
  studentGrade: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export default function VisitConsultation() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    studentGrade: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 잔디 웹훅 포맷
      const jandiPayload = {
        body: '📋 새로운 방문 상담 신청이 접수되었습니다.',
        connectColor: '#2E7D32',
        connectInfo: [
          {
            title: '신청자 정보',
            description: `이름: ${formData.name}\n연락처: ${formData.phone}${formData.email ? `\n이메일: ${formData.email}` : ''}`,
          },
          {
            title: '학생 정보',
            description: `학년/상태: ${formData.studentGrade}`,
          },
          {
            title: '희망 방문 일시',
            description: `${formData.preferredDate} ${formData.preferredTime}`,
          },
          ...(formData.message ? [{
            title: '문의 내용',
            description: formData.message,
          }] : []),
        ],
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.tosslab.jandi-v2+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jandiPayload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          studentGrade: '',
          preferredDate: '',
          preferredTime: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-sn-green text-white text-sm font-medium rounded-full mb-4">
            Visit Consultation
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            방문 상담 신청
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SN-고요의숲 대치를 직접 방문하여 상담받으실 수 있습니다.
            <br />
            아래 양식을 작성해주시면 담당자가 확인 후 연락드리겠습니다.
          </p>
        </div>

        {/* 위치 정보 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-sn-main/20 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src="/image/navermap.webp"
                alt="위치"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">SN-고요의숲 대치</h3>
              <p className="text-gray-600 text-sm">서울 강남구 대치동 447</p>
              <p className="text-sn-green text-sm font-medium">대치역 도보 3분</p>
            </div>
          </div>
          <a
            href="https://map.naver.com/p/search/서울%20강남구%20대치동%20447"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sn-green hover:underline text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            네이버 지도에서 보기
          </a>
        </div>

        {/* 상담 신청 폼 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-sn-main/20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-6 bg-sn-green rounded-full"></span>
            <h2 className="text-xl font-bold text-gray-900">상담 신청서</h2>
          </div>

          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sn-green/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-sn-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">신청이 완료되었습니다!</h3>
              <p className="text-gray-600 mb-6">
                담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="px-6 py-2 bg-sn-green text-white rounded-lg font-medium hover:bg-sn-green-dark transition-colors"
              >
                다시 신청하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 이름 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sn-green focus:border-sn-green transition-colors"
                    placeholder="홍길동"
                  />
                </div>

                {/* 연락처 */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sn-green focus:border-sn-green transition-colors"
                    placeholder="010-0000-0000"
                  />
                </div>

                {/* 이메일 */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sn-green focus:border-sn-green transition-colors"
                    placeholder="example@email.com"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    이메일을 적어주시면 방문예약 내역을 송부드립니다.
                  </p>
                </div>

                {/* 학생 학년 */}
                <div>
                  <label htmlFor="studentGrade" className="block text-sm font-medium text-gray-700 mb-2">
                    학생 학년/상태 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="studentGrade"
                    name="studentGrade"
                    required
                    value={formData.studentGrade}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sn-green focus:border-sn-green transition-colors"
                  >
                    <option value="">선택해주세요</option>
                    <option value="고1">고등학교 1학년</option>
                    <option value="고2">고등학교 2학년</option>
                    <option value="고3">고등학교 3학년</option>
                    <option value="N수">N수생</option>
                    <option value="검정고시">검정고시</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                {/* 희망 방문 날짜 */}
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                    희망 방문 날짜 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    required
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sn-green focus:border-sn-green transition-colors"
                  />
                </div>

                {/* 희망 방문 시간 */}
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                    희망 방문 시간 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sn-green focus:border-sn-green transition-colors"
                  >
                    <option value="">선택해주세요</option>
                    <option value="09:00-10:00">09:00 - 10:00</option>
                    <option value="10:00-11:00">10:00 - 11:00</option>
                    <option value="11:00-12:00">11:00 - 12:00</option>
                    <option value="13:00-14:00">13:00 - 14:00</option>
                    <option value="14:00-15:00">14:00 - 15:00</option>
                    <option value="15:00-16:00">15:00 - 16:00</option>
                    <option value="16:00-17:00">16:00 - 17:00</option>
                    <option value="17:00-18:00">17:00 - 18:00</option>
                    <option value="18:00-19:00">18:00 - 19:00</option>
                    <option value="19:00-20:00">19:00 - 20:00</option>
                    <option value="20:00-21:00">20:00 - 21:00</option>
                  </select>
                </div>
              </div>

              {/* 문의 내용 */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  문의 내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sn-green focus:border-sn-green transition-colors resize-none"
                  placeholder="상담 시 궁금하신 점이나 요청사항을 입력해주세요."
                />
              </div>

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                  신청 중 오류가 발생했습니다. 다시 시도해주시거나, 전화로 문의해주세요.
                </div>
              )}

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-sn-green text-white rounded-lg font-bold text-lg hover:bg-sn-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '신청 중...' : '방문 상담 신청하기'}
              </button>

              <p className="text-center text-sm text-gray-500">
                상담 가능 시간: 평일 09:00 - 21:00 / 토요일 09:00 - 18:00
              </p>
              <p className="text-center text-sm text-gray-500 mt-2">
                방문상담 취소시 꼭{' '}
                <a
                  href="https://pf.kakao.com/_xelXhX/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sn-green font-medium hover:underline"
                >
                  카카오톡 채널
                </a>
                로 알려주세요.
              </p>
            </form>
          )}
        </div>

        {/* 다른 상담 방법 */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">다른 방법으로 상담을 원하시나요?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:010-5862-3838"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg border border-gray-200 hover:border-sn-green hover:bg-sn-green/5 transition-colors"
            >
              <Image src="/image/phone.png" alt="전화" width={24} height={24} />
              <span className="font-medium text-gray-700">전화 상담</span>
            </a>
            <a
              href="https://pf.kakao.com/_xelXhX/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg border border-gray-200 hover:border-sn-green hover:bg-sn-green/5 transition-colors"
            >
              <Image src="/image/KakaoTalk.png" alt="카카오톡" width={24} height={24} />
              <span className="font-medium text-gray-700">카카오톡 상담</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
