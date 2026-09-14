import { NextRequest, NextResponse } from 'next/server';
import { validateDayPassApplication } from '@/lib/day-pass-application';
import { generate3FSeats, generate4FSeats } from '@/lib/daechi-floor-plan';

function validateDayPass(input: Record<string, unknown>) {
  const floor = generate3FSeats().some(seat => seat.id === input.seatId) ? '3'
    : generate4FSeats().some(seat => seat.id === input.seatId) ? '4' : '';
  const program = input.kind === 'FULL_DAY' ? '일일종일이용권' : '일일오후이용권';
  const validation = validateDayPassApplication({ ...input, program, floor, seat: input.seatId, start: input.startTime, end: input.endTime });
  if (validation) return validation;
  if (typeof input.requestId !== 'string' || !/^[a-zA-Z0-9-]{16,80}$/.test(input.requestId)
    || (input.message != null && (typeof input.message !== 'string' || input.message.length > 1000))) {
    return '신청 정보를 확인해주세요.';
  }
  return null;
}

async function sendDayPass(input: Record<string, unknown>, reservationId: string) {
  const floor = generate3FSeats().some(seat => seat.id === input.seatId) ? '3' : '4';
  const program = input.kind === 'FULL_DAY' ? '일일종일이용권' : '일일오후이용권';
  // Use the same destination as the existing online application form.
  const webhook = process.env.JANDI_WEBHOOK_URL;
  if (!webhook) return 'unconfigured';
  try {
    const response = await fetch(webhook, {
      method: 'POST', headers: { Accept: 'application/vnd.tosslab.jandi-v2+json', 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        body: '📋 새로운 일일이용권 신청이 접수되었습니다!',
        connectColor: '#176b4c',
        connectInfo: [
          { title: '이용권 / 이용료', description: `${program} / ${input.kind === 'FULL_DAY' ? '30,000원' : '23,500원'}` },
          { title: '희망 이용 일시', description: `${input.date} ${input.startTime} ~ ${input.endTime} (한국 시간)` },
          { title: '희망 좌석', description: `${floor}층 ${input.seatId}` },
          { title: '신청자 / 연락처', description: `${input.name} / ${input.phone}` },
          ...(input.message ? [{ title: '요청사항', description: input.message }] : []),
          { title: '예약 번호 / 접수 번호', description: `${reservationId} / ${input.requestId}\n관리 앱에 저장됨 · 담당자 확인 후 예약 확정 안내 필요` },
        ],
      }),
    });
    if (!response.ok) throw new Error('Jandi delivery failed');
    return 'sent';
  } catch {
    return 'failed';
  }
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin');
    if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 403 });
    const raw = await request.text();
    if (raw.length > 8192) return NextResponse.json({ error: '신청 내용이 너무 깁니다.' }, { status: 413 });
    let input;
    try { input = JSON.parse(raw); }
    catch { return NextResponse.json({ error: '신청 형식이 올바르지 않습니다.' }, { status: 400 }); }
    const isDayPass = input?.kind === 'FULL_DAY' || input?.kind === 'AFTERNOON';
    if (isDayPass) {
      const validation = validateDayPass(input);
      if (validation) return NextResponse.json({ error: validation }, { status: 400 });
    }
    const apiOrigin = process.env.SEAT_API_ORIGIN || (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://sn-student-web.vercel.app');
    const response = await fetch(`${apiOrigin.replace(/\/$/, '')}/app/api/public/study-cafe-reservations`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: raw, cache: 'no-store', signal: AbortSignal.timeout(15000),
    });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data.error || '접수하지 못했습니다.' }, { status: response.status });
    if (data.success !== true || typeof data.id !== 'string' || !data.id || typeof data.status !== 'string') {
      throw new Error('Invalid reservation storage response');
    }
    // A successful database save is the receipt boundary. Notification failure must never undo it.
    const notificationStatus = isDayPass ? await sendDayPass(input, data.id) : 'not_requested';
    return NextResponse.json({ success: true, id: data.id, status: data.status, notificationStatus }, {
      status: response.status, headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json({ error: '접수 결과를 확인하지 못했습니다. 다시 신청하면 동일한 신청 번호로 확인합니다.' }, { status: 503 });
  }
}
