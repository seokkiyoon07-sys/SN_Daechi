'use client';

import ReservationForm from './ReservationForm';
import { useCallback, useEffect, useRef, useState } from 'react';
import FloorPlanViewer from '@/components/floor-plan/FloorPlanViewer';

type Floor = '3' | '4';
type Availability = {
  seats: Record<Floor, string[]>;
  checkedAt: string;
};

export default function DayPassSeats({ title, onClose }: { title: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [date, setDate] = useState(() => new Date(Date.now() + 9 * 3600000).toISOString().slice(0, 10));
  const [floor, setFloor] = useState<Floor>('3');
  const [data, setData] = useState<Availability | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const request = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const response = await fetch(`/api/day-pass/seats?date=${encodeURIComponent(date)}`, { cache: 'no-store', signal: controller.signal });
      if (!response.ok) throw new Error('빈 좌석을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      const result: Availability = await response.json();
      if (!controller.signal.aborted) setData(result);
    } catch (cause) {
      if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : '빈 좌석을 불러오지 못했습니다.');
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      request.current?.abort();
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => { void refresh(); return () => request.current?.abort(); }, [refresh]);

  const availableSeatIds = data?.seats[floor] ?? [];
  const seatStatus = Object.fromEntries(availableSeatIds.map(id => [id, {
    color: '#8BD9C5', textColor: '#145C4C', borderColor: '#53A992',
  }]));

  return (
    <dialog ref={dialog} onCancel={(event) => { event.preventDefault(); onClose(); }}
      aria-labelledby="day-pass-title" aria-describedby="day-pass-description"
      className="m-auto max-h-[92dvh] w-[calc(100%_-_2rem)] max-w-5xl overflow-y-auto rounded-2xl bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/50">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-white px-5 py-4 sm:px-7">
        <div><p className="text-sm font-semibold text-sn-green">{title}</p><h2 id="day-pass-title" className="mt-1 text-xl font-bold">스터디카페 좌석배치도</h2></div>
        <button type="button" autoFocus onClick={onClose} className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">닫기</button>
      </div>
      <div className="space-y-4 p-5 sm:p-7">
        <label className="block text-sm font-medium">이용 날짜<input type="date" required value={date} onChange={(e) => { if (e.target.value) setDate(e.target.value); }} className="ml-3 rounded-lg border p-2" /></label>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2" aria-label="층 선택">
            {(['3', '4'] as const).map((value) => <button key={value} type="button" aria-pressed={floor === value}
              onClick={() => setFloor(value)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${floor === value ? 'bg-sn-green text-white' : 'bg-gray-100 text-gray-700'}`}>
              {value}층{data ? ` · ${data.seats[value].length}석` : ''}
            </button>)}
          </div>
          <button type="button" disabled={loading} onClick={() => void refresh()} className="rounded-lg border px-4 py-2 text-sm disabled:opacity-50">새로고침</button>
        </div>
        <div aria-live="polite" aria-busy={loading}>
          <>
            <div className="overflow-hidden rounded-xl border bg-white" role="region" aria-label={floor + '층 스터디카페 좌석배치도'}>
              <FloorPlanViewer key={floor} floor={floor} branch="daechi" mode="view"
                visibleSeatIds={availableSeatIds} seatStatus={seatStatus}
                showLayerControl={false} showControls={true} showScheduleLabels={false}
                initialViewMode="fit-seats" height="min(62dvh, 640px)" />
            </div>
            {data && <p className="mt-3 text-sm font-medium text-sn-green">{floor}층 빈 좌석 {data.seats[floor].length}석{data.seats[floor].length ? ` · ${data.seats[floor].join(', ')}` : ''} · {new Date(data.checkedAt).toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit' })} 기준</p>}
          </>
          {loading && <p className="mt-3 text-sm text-gray-600">빈 좌석을 확인하는 중입니다…</p>}
          {error && <div role="alert" className="mt-3 rounded-xl bg-red-50 p-4 text-sm text-red-700"><p>{error}</p><button type="button" onClick={() => void refresh()} className="mt-3 rounded-lg border border-red-200 px-4 py-2">다시 시도</button></div>}
        </div>
        <p id="day-pass-description" className="text-sm text-gray-600">빈 좌석을 확인한 뒤 희망 좌석과 이용 시간을 선택해 신청해주세요. 담당자가 확인 후 예약 확정 여부를 안내드립니다.</p>
        {data && <ReservationForm key={`${date}-${floor}`} kind={title.includes("\uC624\uD6C4") ? "AFTERNOON" : "FULL_DAY"} date={date} seats={data.seats[floor]} />}
      </div>
    </dialog>
  );
}
