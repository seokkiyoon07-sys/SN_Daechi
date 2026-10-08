import { NextRequest, NextResponse } from 'next/server';
import { validateWinterApplication, type WinterApplicationData } from '@/lib/winter-application';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 403 });
  let input: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 8192) return NextResponse.json({ error: '신청 내용이 너무 깁니다.' }, { status: 413 });
    input = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: '신청 형식이 올바르지 않습니다.' }, { status: 400 });
  }
  const error = validateWinterApplication(input);
  if (error) return NextResponse.json({ error }, { status: 400 });
  const data = input as WinterApplicationData;
  const apiOrigin = process.env.STUDENT_WEB_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '');
  if (!apiOrigin) return NextResponse.json({ error: '온라인 접수 준비 중입니다. 02-557-0301로 문의해주세요.' }, { status: 503 });
  let applicationId: string;
  try {
    const saved = await fetch(`${apiOrigin.replace(/\/$/, '')}/app/api/application/winter`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(15000),
      body: JSON.stringify(data),
    });
    if (!saved.ok) return NextResponse.json({ error: saved.status === 429 ? '신청 요청이 많습니다. 잠시 후 다시 시도하거나 02-557-0301로 문의해주세요.' : '관리자 앱에 접수하지 못했습니다. 02-557-0301로 문의해주세요.' }, { status: saved.status === 429 ? 429 : 502 });
    const result = await saved.json();
    if (result.success !== true || typeof result.id !== 'string' || !result.id) throw new Error('Invalid storage response');
    applicationId = result.id;
  } catch {
    return NextResponse.json({ error: '접수 결과를 확인하지 못했습니다. 중복 신청 전 02-557-0301로 확인해주세요.' }, { status: 502 });
  }
  const webhook = process.env.JANDI_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ success: true, id: applicationId, notificationStatus: 'unconfigured' }, { headers: { 'Cache-Control': 'no-store' } });
  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/vnd.tosslab.jandi-v2+json' },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        body: `SN고요의숲 대치점 2027 프리윈터 / 윈터스쿨 예약 신청 (접수번호: ${applicationId})`,
        connectColor: '#2b422e',
        connectInfo: [
          ...(data.message?.trim() ? [{ title: '하고 싶은 말', description: data.message.trim() }] : []),
          { title: '예약 신청', description: `SN고요의숲 대치점\n신청 과정: ${data.program}\n등원 희망일: ${data.preferredDate}` },
          { title: '학생 정보', description: `${data.studentName.trim()} / ${data.gender}\n출신학교: ${data.school.trim()}\n학년 / 신분: ${data.grade}` },
          { title: '연락처', description: `학부모: ${data.parentPhone}\n학생: ${data.studentPhone}\n학부모 연락처로 개별 상담전화 요청` },
          { title: '개인정보 동의', description: `예약 접수·상담·교육서비스: 동의\n홍보 안내: ${data.marketingAgreed ? '동의' : '미동의'}\n동의문 버전: winter-2027-v1\n접수 시각: ${new Date().toISOString()}` },
        ],
      }),
    });
    if (!response.ok) throw new Error('Delivery failed');
    return NextResponse.json({ success: true, id: applicationId, notificationStatus: 'sent' }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ success: true, id: applicationId, notificationStatus: 'failed' }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
