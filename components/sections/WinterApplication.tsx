'use client';

import { useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { validateWinterApplication, type WinterApplicationData } from '@/lib/winter-application';

const inputClass = 'mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus:border-sn-green focus:outline-none focus:ring-2 focus:ring-sn-green/20';
const choiceClass = 'flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 cursor-pointer has-[:checked]:border-sn-green has-[:checked]:bg-sn-bg';
const programs = ['프리윈터', '윈터스쿨', '프리윈터 + 윈터스쿨'];
const grades = ['2027 고1', '2027 고2', '2027 고3', '2027 N수'];

export default function WinterApplication() {
  const [program, setProgram] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const submitting = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = new FormData(event.currentTarget);
    const text = (key: string) => String(form.get(key) ?? '').trim();
    const data: WinterApplicationData = {
      program, studentName: text('studentName'), gender: text('gender'), school: text('school'), grade: text('grade'),
      parentPhone: text('parentPhone'), studentPhone: text('studentPhone'), preferredDate: text('preferredDate'),
      message: text('message'),
      privacyAgreed: form.get('privacyAgreed') === 'on', marketingAgreed: form.get('marketingAgreed') === 'on',
    };
    const validation = validateWinterApplication(data);
    if (validation) { setError(validation); return; }
    submitting.current = true;
    setStatus('submitting');
    setError('');
    try {
      const response = await fetch('/api/winter-application', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: AbortSignal.timeout(30000) });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        setError(result.error || '접수하지 못했습니다. 02-557-0301로 문의해주세요.');
        setStatus('idle');
        return;
      }
      setStatus('success');
      requestAnimationFrame(() => { resultRef.current?.focus(); resultRef.current?.scrollIntoView({ block: 'center' }); });
    } catch {
      setError('접수 결과를 확인하지 못했습니다. 중복 신청 전 02-557-0301로 확인해주세요.');
      setStatus('idle');
    } finally { submitting.current = false; }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14 text-gray-900">
      <Link href="/admission/winter-school" className="text-sm text-sn-green hover:underline">← 모집안내로 돌아가기</Link>
      <header className="mt-6 rounded-2xl bg-sn-main p-6 sm:p-8 text-white">
        <p className="mb-3 text-xs tracking-widest text-green-200">2027 WINTER SCHOOL</p>
        <h1 className="text-2xl sm:text-3xl font-bold leading-snug">SN고요의숲 대치점<br />2027 프리윈터 / 윈터스쿨 예약 신청</h1>
        <p className="mt-4 text-sm leading-relaxed text-green-100">관리형 학습센터 SN고요의숲에서 겨울방학의 공부를 준비하세요.</p>
        <div className="mt-6 space-y-4 border-t border-white/20 pt-5 text-sm leading-7">
          <p><strong>프리윈터 개강: 2026년 12월 1일</strong><br />운영 기간: 12월 1일 ~ 12월 31일</p>
          <p><strong>윈터스쿨 개강: 2027년 1월 1일</strong><br />운영 기간: 1월 1일 ~ 2월 27일</p>
          <p>대상: 2027 고1 · 고2 · 고3 · N수<br />전화문의: <a href="tel:02-557-0301" className="underline underline-offset-4">02-557-0301</a></p>
        </div>
      </header>
      <p className="my-6 rounded-xl bg-sn-bg p-5 text-sm leading-7">입학예약 신청을 해주시면 <strong>학부모님 연락처로 개별 상담전화</strong> 드립니다. 신청 후 상담을 통해 등록을 안내해 드립니다.</p>
      {status === 'success' ? (
        <div ref={resultRef} tabIndex={-1} role="status" className="rounded-2xl border border-sn-green bg-white p-8 text-center">
          <h2 className="text-2xl font-bold text-sn-main">예약 신청이 접수되었습니다.</h2>
          <p className="mt-4 leading-7 text-gray-600">담당자가 확인 후 학부모님 연락처로 상담전화 드리겠습니다.</p>
          <Link href="/admission/winter-school" className="mt-6 inline-block rounded-lg bg-sn-green px-6 py-3 text-white">모집안내로 돌아가기</Link>
        </div>
      ) : <form onSubmit={submit} aria-busy={status === 'submitting'} className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <p className="mb-6 text-sm text-gray-500">* 표시는 필수 항목입니다.</p>
        <fieldset disabled={status === 'submitting'} className="space-y-7 disabled:opacity-70">
          <div><label htmlFor="winter-campus" className="font-semibold">예약 신청 *</label><input id="winter-campus" value="SN고요의숲 대치점" readOnly className={inputClass} /></div>
          <fieldset><legend className="mb-2 font-semibold">신청 과정 *</legend><div className="grid gap-2">{programs.map(option => <label key={option} className={choiceClass}><input type="radio" name="program" value={option} checked={program === option} onChange={() => setProgram(option)} required className="accent-sn-green" />{option}</label>)}</div></fieldset>
          <div><label htmlFor="winter-name" className="font-semibold">학생 이름 *</label><input id="winter-name" name="studentName" required maxLength={50} autoComplete="name" className={inputClass} /></div>
          <fieldset><legend className="mb-2 font-semibold">성별 *</legend><div className="grid grid-cols-2 gap-3">{['남', '여'].map(gender => <label key={gender} className={choiceClass}><input type="radio" name="gender" value={gender} required className="accent-sn-green" />{gender}</label>)}</div></fieldset>
          <div><label htmlFor="winter-school" className="font-semibold">출신학교 *</label><input id="winter-school" name="school" required maxLength={100} placeholder="현재 재학 중이거나 졸업한 학교" className={inputClass} /></div>
          <div><label htmlFor="winter-grade" className="font-semibold">학년 / 신분 *</label><select id="winter-grade" name="grade" required defaultValue="" className={inputClass}><option value="" disabled>선택해주세요</option>{grades.map(grade => <option key={grade}>{grade}</option>)}</select></div>
          <div><label htmlFor="winter-parent-phone" className="font-semibold">학부모 연락처 *</label><input id="winter-parent-phone" name="parentPhone" type="tel" inputMode="tel" required maxLength={20} placeholder="010-0000-0000" className={inputClass} /><p className="mt-2 text-xs text-gray-500">개별 상담전화를 받으실 번호를 입력해주세요.</p></div>
          <div><label htmlFor="winter-student-phone" className="font-semibold">학생 연락처 *</label><input id="winter-student-phone" name="studentPhone" type="tel" inputMode="tel" required maxLength={20} placeholder="010-0000-0000" className={inputClass} /></div>
          <div><label htmlFor="winter-date" className="font-semibold">등원 희망일 *</label><input key={program} id="winter-date" name="preferredDate" type="date" required min={program === '윈터스쿨' ? '2027-01-01' : '2026-12-01'} max={program === '윈터스쿨' ? '2027-02-27' : '2026-12-31'} className={inputClass} /><p className="mt-2 text-xs text-gray-500">선택한 과정의 운영 기간 내 첫 등원 희망일을 선택해주세요.</p></div>
          <div><label htmlFor="winter-message" className="font-semibold">하고 싶은 말 <span className="text-sm font-normal text-gray-500">(선택)</span></label><textarea id="winter-message" name="message" rows={4} maxLength={1000} placeholder="궁금한 점이나 요청사항을 자유롭게 적어주세요." aria-describedby="winter-message-help" className={inputClass + ' resize-y'} /><p id="winter-message-help" className="mt-2 text-xs text-gray-500">1,000자 이내로 입력해주세요.</p></div>
          <section aria-labelledby="winter-privacy" className="rounded-xl bg-gray-50 p-5 text-sm leading-7">
            <h2 id="winter-privacy" className="font-bold">개인정보 수집·활용 동의 안내</h2>
            <p className="mt-2">입력하신 학생 이름, 성별, 학교·학년, 학부모·학생 연락처, 신청 과정, 등원 희망일 및 선택 입력한 하고 싶은 말은 SN고요의숲 대치점의 예약 접수, 상담 연락 및 교육서비스 제공을 위해 활용됩니다.</p>
            <label className="mt-4 flex items-start gap-3"><input type="checkbox" name="privacyAgreed" required className="mt-2 accent-sn-green" /><span>[필수] 개인정보 수집·활용에 동의합니다.</span></label>
            <label className="mt-3 flex items-start gap-3"><input type="checkbox" name="marketingAgreed" className="mt-2 accent-sn-green" /><span>[선택] 입력한 연락처를 통한 SN고요의숲 교육 프로그램 및 모집 홍보 안내에 동의합니다. 동의하지 않아도 예약 신청이 가능합니다.</span></label>
          </section>
          {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={status === 'submitting'} className="w-full rounded-xl bg-sn-green px-5 py-4 font-bold text-white hover:bg-sn-green-dark disabled:cursor-wait">{status === 'submitting' ? '신청 접수 중…' : '프리윈터 / 윈터스쿨 예약 신청'}</button>
        </fieldset>
      </form>}
    </div>
  );
}
