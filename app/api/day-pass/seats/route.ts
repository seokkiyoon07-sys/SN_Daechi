import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const origin = process.env.SEAT_API_ORIGIN || (process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001' : 'https://sn-student-web.vercel.app');
    const response = await fetch(`${origin.replace(/\/$/, '')}/app/api/public/available-seats?date=${encodeURIComponent(request.nextUrl.searchParams.get("date") || "")}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Seat API returned ${response.status}`);
    const data = await response.json();
    if (!data || !data.seats || typeof data.checkedAt !== 'string' || !Number.isFinite(Date.parse(data.checkedAt))) {
      throw new Error('Invalid seat API response');
    }
    for (const floor of ['3', '4']) {
      if (!Array.isArray(data.seats[floor]) || !data.seats[floor].every((id: unknown) => typeof id === 'string')) {
        throw new Error('Invalid available seat response');
      }
    }
    // The imported local module owns the floor plan; only public availability is forwarded.
    return NextResponse.json({ seats: { '3': data.seats['3'], '4': data.seats['4'] }, checkedAt: data.checkedAt }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Day pass seat lookup failed:', error);
    return NextResponse.json({ error: '빈 좌석을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.' }, {
      status: 503, headers: { 'Cache-Control': 'no-store' },
    });
  }
}
