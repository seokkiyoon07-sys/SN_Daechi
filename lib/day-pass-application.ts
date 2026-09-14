export type DayPassApplication = {
  program: string;
  floor: '3' | '4';
  seat: string;
  date: string;
  start: string;
  end: string;
  name: string;
  phone: string;
  consent: boolean;
};

export function validateDayPassApplication(value: unknown, now = Date.now()): string | null {
  if (!value || typeof value !== 'object') return '신청 정보를 확인해주세요.';
  const data = value as DayPassApplication;
  if (!['일일종일이용권', '일일오후이용권'].includes(data.program)) return '이용권을 확인해주세요.';
  if (!['3', '4'].includes(data.floor) || typeof data.seat !== 'string' || !/^[A-Z]\d{1,3}$/.test(data.seat)) return '희망 좌석을 선택해주세요.';
  if (typeof data.name !== 'string' || !data.name.trim() || data.name.length > 50) return '신청자 이름을 입력해주세요.';
  if (typeof data.phone !== 'string' || !/^0\d{8,10}$/.test(data.phone.replace(/[ -]/g, ''))) return '연락처를 확인해주세요.';
  if (data.consent !== true) return '개인정보 수집·이용에 동의해주세요.';
  if (typeof data.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)
    || typeof data.start !== 'string' || typeof data.end !== 'string'
    || !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.start) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.end)) return '이용 날짜와 시간을 선택해주세요.';
  const day = new Date(`${data.date}T00:00:00Z`);
  if (!Number.isFinite(day.getTime()) || day.toISOString().slice(0, 10) !== data.date) return '이용 날짜를 확인해주세요.';
  if (data.end <= data.start) return '종료 시간은 시작 시간 이후로 선택해주세요.';
  if (new Date(`${data.date}T${data.start}:00+09:00`).getTime() <= now) return '현재 시간 이후로 신청해주세요.';
  return null;
}
