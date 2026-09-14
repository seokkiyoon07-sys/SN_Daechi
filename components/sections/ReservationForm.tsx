'use client';

import { useRef, useState } from 'react';

export default function ReservationForm({ kind, date: fixedDate, seats = [] }: {
  kind: 'BUSINESS_ROOM' | 'FULL_DAY' | 'AFTERNOON'; date?: string; seats?: string[];
}) {
  const [date, setDate] = useState(''); const [startTime, setStartTime] = useState(''); const [endTime, setEndTime] = useState('');
  const [busy, setBusy] = useState(false); const [result, setResult] = useState(''); const [error, setError] = useState('');
  const requestId = useRef(''); const payloadKey = useRef(''); const submitting = useRef(false);
  const submittedPayload = useRef('');
  const [notificationPending, setNotificationPending] = useState(false);

  async function retryNotification() {
    if (submitting.current || !submittedPayload.current) return;
    submitting.current = true; setBusy(true); setError('');
    try {
      const response = await fetch('/api/study-cafe-reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: submittedPayload.current });
      const data = await response.json();
      if (!response.ok || !data.success || data.notificationStatus !== 'sent') throw new Error('신청은 저장되어 있습니다. 알림 전송은 아직 완료되지 않았습니다.');
      setNotificationPending(false);
    } catch (cause) { setError((cause as Error).message); }
    finally { submitting.current = false; setBusy(false); }
  }
  const times = Array.from({ length: 15 }, (_, index) => `${String(index + 8).padStart(2, '0')}:00`);
  const amount = kind === 'BUSINESS_ROOM' ? Math.max(0, Number(endTime.slice(0, 2)) - Number(startTime.slice(0, 2))) * 10000 : kind === 'FULL_DAY' ? 30000 : 23500;
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = new FormData(event.currentTarget);
    const input = { kind, date: fixedDate || date, startTime, endTime, seatId: String(form.get('seatId') || ''), name: String(form.get('name') || ''), phone: String(form.get('phone') || ''), message: String(form.get('message') || ''), consent: form.get('consent') === 'on' };
    if (!startTime || !endTime || endTime <= startTime) { setError('종료 시간을 시작 시간 이후로 선택해주세요.'); return; }
    const key = JSON.stringify(input);
    if (!requestId.current || key !== payloadKey.current) { requestId.current = crypto.randomUUID(); payloadKey.current = key; }
    submitting.current = true; setBusy(true); setError('');
    submittedPayload.current = JSON.stringify({ ...input, requestId: requestId.current });
    try {
      const response = await fetch('/api/study-cafe-reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: submittedPayload.current });
      const data = await response.json();
      if (!response.ok || data.success !== true) throw new Error(data.error || '접수하지 못했습니다. 다시 시도해주세요.');
      setResult('신청이 접수되었습니다. 담당자가 확인 후 입력하신 연락처로 예약 확정 여부를 안내드립니다.');
      setNotificationPending(data.notificationStatus === 'failed' || data.notificationStatus === 'unconfigured');
    } catch (cause) { setError((cause as Error).message); }
    finally { submitting.current = false; setBusy(false); }
  }
  const field = 'mt-1 block w-full min-w-0 rounded-lg border border-gray-300 bg-white p-3 text-gray-900';
  if (result) return <div className="space-y-3 rounded-xl bg-green-50 p-5 text-sm font-medium text-green-800">
    <p role="status">{result}</p>
    {notificationPending && <><p>신청은 정상 저장되었으나 담당자 알림이 지연되고 있습니다. 다시 신청하실 필요는 없습니다.</p><button type="button" disabled={busy} onClick={retryNotification} className="rounded-lg border border-green-700 px-4 py-2 disabled:opacity-50">{busy ? '알림 재전송 중…' : '담당자 알림 재전송'}</button></>}
    {error && <p role="alert" className="text-red-700">{error}</p>}
  </div>;
  return <form onSubmit={submit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
    <h3 className="text-lg font-bold text-gray-900">{kind === 'BUSINESS_ROOM' ? '비즈니스룸 예약 신청' : '선택한 날짜로 일일권 신청'}</h3>
    {fixedDate ? <p className="text-sm text-gray-600">이용일: {fixedDate}</p> : <label className="block text-sm">이용 날짜<input className={field} type="date" required value={date} onChange={(e) => setDate(e.target.value)} /></label>}
    {kind === 'BUSINESS_ROOM' ? <div className="grid grid-cols-2 gap-3">
      <label className="text-sm">시작 시간<select className={field} required value={startTime} onChange={(e) => { setStartTime(e.target.value); if (endTime <= e.target.value) setEndTime(''); }}><option value="">선택</option>{times.slice(0, -1).map((time) => <option key={time}>{time}</option>)}</select></label>
      <label className="text-sm">종료 시간<select className={field} required value={endTime} onChange={(e) => setEndTime(e.target.value)} disabled={!startTime}><option value="">선택</option>{times.filter((time) => time > startTime).map((time) => <option key={time}>{time}</option>)}</select></label>
    </div> : <>
      <label className="block text-sm">희망 좌석<select name="seatId" required className={field}><option value="">좌석 선택</option>{seats.map((seat) => <option key={seat}>{seat}</option>)}</select></label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">희망 시작 시간<input type="time" required value={startTime} onChange={event => setStartTime(event.target.value)} className={field} /></label>
        <label className="text-sm">희망 종료 시간<input type="time" required value={endTime} onChange={event => setEndTime(event.target.value)} className={field} /></label>
      </div>
    </>}
    <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm">신청자 이름<input name="name" autoComplete="name" required maxLength={80} className={field} /></label><label className="text-sm">연락처<input name="phone" type="tel" autoComplete="tel" required maxLength={30} placeholder="010-0000-0000" className={field} /></label></div>
    <label className="block text-sm">요청사항 (선택)<textarea name="message" maxLength={1000} rows={2} className={field} /></label>
    <p className="text-sm font-semibold text-sn-green">예상 이용료: {kind === 'BUSINESS_ROOM' && (!startTime || !endTime) ? '이용 시간을 선택해주세요' : `${amount.toLocaleString('ko-KR')}원`}</p>
    <label className="flex items-start gap-2 text-xs leading-5 text-gray-600"><input name="consent" type="checkbox" required className="mt-1" /><span>예약 접수와 결과 안내를 위해 이름·연락처·이용 일정·요청사항을 수집·이용하는 데 동의합니다. 동의하지 않으면 온라인 신청이 어렵습니다. <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">개인정보 처리방침</a></span></label>
    <p className="text-xs text-gray-500">신청만으로 예약이 확정되지는 않습니다. 담당자 확인 후 안내드립니다.</p>
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    <button disabled={busy || (kind !== 'BUSINESS_ROOM' && !seats.length)} className="w-full rounded-lg bg-sn-green p-3 font-semibold text-white disabled:opacity-40">{busy ? '접수 중…' : '예약 신청하기'}</button>
  </form>;
}
