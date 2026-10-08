export type WinterApplicationData = {
  program: string; studentName: string; gender: string; school: string; grade: string;
  parentPhone: string; studentPhone: string; preferredDate: string;
  privacyAgreed: boolean; marketingAgreed: boolean;
  message?: string;
};

export function validateWinterApplication(value: unknown): string | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return '신청 정보를 확인해주세요.';
  const data = value as WinterApplicationData;
  if (data.message !== undefined && (typeof data.message !== 'string' || data.message.length > 1000)) return '하고 싶은 말은 1,000자 이내로 입력해주세요.';
  if (!['프리윈터', '윈터스쿨', '프리윈터 + 윈터스쿨'].includes(data.program)) return '신청 과정을 선택해주세요.';
  if (typeof data.studentName !== 'string' || !data.studentName.trim() || data.studentName.length > 50) return '학생 이름을 입력해주세요.';
  if (!['남', '여'].includes(data.gender)) return '성별을 선택해주세요.';
  if (typeof data.school !== 'string' || !data.school.trim() || data.school.length > 100) return '출신학교를 입력해주세요.';
  if (!['2027 고1', '2027 고2', '2027 고3', '2027 N수'].includes(data.grade)) return '학년 / 신분을 선택해주세요.';
  for (const phone of [data.parentPhone, data.studentPhone]) {
    if (typeof phone !== 'string' || phone.length > 20 || !/^0\d{8,10}$/.test(phone.replace(/[ -]/g, ''))) return '학부모 및 학생 연락처를 확인해주세요.';
  }
  if (typeof data.preferredDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.preferredDate)) return '등원 희망일을 선택해주세요.';
  const date = new Date(`${data.preferredDate}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== data.preferredDate) return '올바른 등원 희망일을 선택해주세요.';
  const start = data.program === '윈터스쿨' ? '2027-01-01' : '2026-12-01';
  const end = data.program === '윈터스쿨' ? '2027-02-27' : '2026-12-31';
  if (data.preferredDate < start || data.preferredDate > end) return `등원 희망일은 ${start}부터 ${end}까지 선택해주세요.`;
  if (data.privacyAgreed !== true) return '개인정보 수집·활용에 동의해주세요.';
  if (typeof data.marketingAgreed !== 'boolean') return '홍보 안내 동의 여부를 확인해주세요.';
  return null;
}
