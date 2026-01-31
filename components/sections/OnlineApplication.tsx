'use client';

import { useState, useEffect } from 'react';

// 랜덤 숫자 생성 함수
const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, answer: num1 + num2 };
};

interface SubjectScore {
  standard: string;  // 표준점수
  percentile: string; // 백분위
  grade: string;     // 등급
}

interface FormData {
  // 입학정보
  program: string;  // 프로그램 선택
  studentName: string;
  studentBirthDate: string;
  school: string;
  parentPhone: string;
  parentName: string;
  studentPhone: string;
  cashReceiptSameAsParent: boolean;
  cashReceiptPhone: string;
  email: string;

  // 성적정보
  examType: string;  // 시험 종류 (6월 모평, 9월 모평, 수능 등)
  koreanType: string;  // 국어 선택과목
  mathType: string;    // 수학 선택과목
  tamgu1Type: string;  // 탐구1 선택
  tamgu2Type: string;  // 탐구2 선택

  korean: SubjectScore;
  math: SubjectScore;
  english: SubjectScore;
  history: SubjectScore;  // 한국사
  tamgu1: SubjectScore;
  tamgu2: SubjectScore;

  gradeFile: File | null;

  // 내신정보
  naesinGrade: string;

  // 기타
  concerns: string[];  // 현재 가장 큰 고민 (복수선택)
  memo: string;

  // 동의
  privacyAgreed: boolean;
}

export default function OnlineApplication() {
  const [formData, setFormData] = useState<FormData>({
    program: '',
    studentName: '',
    studentBirthDate: '',
    school: '',
    parentPhone: '',
    parentName: '',
    studentPhone: '',
    cashReceiptSameAsParent: true,
    cashReceiptPhone: '',
    email: '',

    examType: '',
    koreanType: '',
    mathType: '',
    tamgu1Type: '',
    tamgu2Type: '',

    korean: { standard: '', percentile: '', grade: '' },
    math: { standard: '', percentile: '', grade: '' },
    english: { standard: '', percentile: '', grade: '' },
    history: { standard: '', percentile: '', grade: '' },
    tamgu1: { standard: '', percentile: '', grade: '' },
    tamgu2: { standard: '', percentile: '', grade: '' },

    gradeFile: null,

    naesinGrade: '',

    concerns: [],
    memo: '',

    privacyAgreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));

      // 현금영수증 동일 체크시 부모님 번호로 설정
      if (name === 'cashReceiptSameAsParent' && checked) {
        setFormData(prev => ({ ...prev, cashReceiptPhone: prev.parentPhone }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleScoreChange = (subject: keyof Pick<FormData, 'korean' | 'math' | 'english' | 'history' | 'tamgu1' | 'tamgu2'>, field: keyof SubjectScore, value: string) => {
    setFormData(prev => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [field]: value
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, gradeFile: file }));
      setFileName(file.name);
    }
  };

  const handleConcernChange = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyAgreed) {
      alert('개인정보 처리방침에 동의해주세요.');
      return;
    }

    // 캡차 검증
    if (parseInt(captchaInput) !== captcha.answer) {
      setCaptchaError(true);
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    setCaptchaError(false);
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 탐구 과목 조합
      const subjects: string[] = [];
      if (formData.koreanType) subjects.push(`국어(${formData.koreanType})`);
      if (formData.mathType) subjects.push(`수학(${formData.mathType})`);
      subjects.push('영어');
      if (formData.tamgu1Type) subjects.push(formData.tamgu1Type);
      if (formData.tamgu2Type) subjects.push(formData.tamgu2Type);

      // FormData로 파일과 데이터 전송
      const submitFormData = new FormData();
      submitFormData.append('program', formData.program);
      submitFormData.append('studentName', formData.studentName);
      submitFormData.append('studentBirthDate', formData.studentBirthDate);
      submitFormData.append('school', formData.school);
      submitFormData.append('parentPhone', formData.parentPhone);
      submitFormData.append('parentName', formData.parentName);
      submitFormData.append('studentPhone', formData.studentPhone);
      submitFormData.append('cashReceiptPhone', formData.cashReceiptSameAsParent ? formData.parentPhone : formData.cashReceiptPhone);
      submitFormData.append('email', formData.email);
      submitFormData.append('examType', formData.examType);
      submitFormData.append('subjects', subjects.join(', '));
      submitFormData.append('grades', `국어 ${formData.korean.grade}등급, 수학 ${formData.math.grade}등급, 영어 ${formData.english.grade}등급, 한국사 ${formData.history.grade}등급, 탐구1 ${formData.tamgu1.grade}등급, 탐구2 ${formData.tamgu2.grade}등급`);
      submitFormData.append('scores', `국어(표${formData.korean.standard}/백${formData.korean.percentile}), 수학(표${formData.math.standard}/백${formData.math.percentile}), 영어(표${formData.english.standard}/백${formData.english.percentile})`);
      submitFormData.append('naesinGrade', formData.naesinGrade);
      submitFormData.append('concerns', formData.concerns.join(', '));
      submitFormData.append('memo', formData.memo);

      // 파일이 있으면 추가
      if (formData.gradeFile) {
        submitFormData.append('file', formData.gradeFile);
      }

      const response = await fetch('/api/application', {
        method: 'POST',
        body: submitFormData,
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const programOptions = ['정규 독학재수반', '정규 재학생반', '프리미엄 수학 관리반'];
  const examTypeOptions = ['2025 수능', '2025 9월 모평', '2025 6월 모평', '2024 수능', '기타'];
  const koreanTypeOptions = ['언어와 매체', '화법과 작문'];
  const mathTypeOptions = ['확률과 통계', '미적분', '기하'];

  const tamguOptions = [
    '생활과윤리', '윤리와사상', '한국지리', '세계지리',
    '동아시아사', '세계사', '경제', '정치와법', '사회문화',
    '물리학Ⅰ', '물리학Ⅱ', '화학Ⅰ', '화학Ⅱ',
    '생명과학Ⅰ', '생명과학Ⅱ', '지구과학Ⅰ', '지구과학Ⅱ'
  ];

  const concernOptions = [
    '공부 습관/집중',
    '성적 정체',
    '시간 관리',
    '혼자 공부가 안 됨',
    '수업이 안 맞음',
    '대치동 단과 + 독학관리'
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-br from-[#1a1f2e] to-[#2d3548] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 bg-sn-green/20 text-sn-green text-sm font-medium rounded-full mb-4">
              Online Application
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              온라인 원서접수
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              학생 정보와 성적을 입력해 주시면
              <br className="hidden sm:block" />
              맞춤 상담을 준비하여 연락드리겠습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 폼 섹션 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {submitStatus === 'success' ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">접수가 완료되었습니다!</h2>
            <p className="text-gray-600 mb-6">
              빠른 시간 내에 연락드리겠습니다.
              <br />
              감사합니다.
            </p>
            <button
              onClick={() => {
                setSubmitStatus('idle');
                window.location.reload();
              }}
              className="px-6 py-3 bg-sn-green text-white font-medium rounded-lg hover:bg-sn-green-dark transition-colors"
            >
              새로운 접수하기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 입학정보 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                입학정보
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 프로그램 선택 */}
                <div className="sm:col-span-2">
                  <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                    프로그램 선택 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all"
                  >
                    <option value="">프로그램을 선택해주세요</option>
                    {programOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* 학생 성명 */}
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                    학생 성명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all"
                  />
                </div>

                {/* 학생 생년월일 */}
                <div>
                  <label htmlFor="studentBirthDate" className="block text-sm font-medium text-gray-700 mb-2">
                    학생 생년월일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="studentBirthDate"
                    name="studentBirthDate"
                    value={formData.studentBirthDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all"
                  />
                </div>

                {/* 출신(소속학교) */}
                <div className="sm:col-span-2">
                  <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
                    출신(소속) 학교 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                    placeholder="예: OO고등학교"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all"
                  />
                </div>

                {/* 보호자 성명 */}
                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
                    보호자 성명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all"
                  />
                </div>

                {/* 보호자 휴대폰 */}
                <div>
                  <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    보호자 휴대폰 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="parentPhone"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    required
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all"
                  />
                </div>

                {/* 학생 휴대폰 */}
                <div>
                  <label htmlFor="studentPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    학생 휴대폰
                  </label>
                  <input
                    type="tel"
                    id="studentPhone"
                    name="studentPhone"
                    value={formData.studentPhone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all"
                  />
                </div>

                {/* 현금영수증 발행 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    현금영수증 발행 번호
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        name="cashReceiptSameAsParent"
                        checked={formData.cashReceiptSameAsParent}
                        onChange={handleChange}
                        className="w-4 h-4 text-sn-green border-gray-300 rounded focus:ring-sn-green"
                      />
                      보호자 휴대폰 번호와 동일
                    </label>
                    {!formData.cashReceiptSameAsParent && (
                      <input
                        type="tel"
                        name="cashReceiptPhone"
                        value={formData.cashReceiptPhone}
                        onChange={handleChange}
                        placeholder="010-0000-0000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all"
                      />
                    )}
                  </div>
                </div>

                {/* 이메일주소 */}
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일주소
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 성적정보 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">성적정보</h2>
                <div className="flex items-center gap-4">
                  <select
                    name="examType"
                    value={formData.examType}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent text-sm"
                  >
                    <option value="">-선택-</option>
                    {examTypeOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="text-sm text-red-500">* 필수입력</span>
                </div>
              </div>

              {/* 성적 테이블 */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-2 py-3 text-sm font-medium text-gray-700 w-16">구분</th>
                      <th className="border border-gray-200 px-2 py-3 text-sm font-medium text-gray-700 w-[100px]">
                        국어
                        <select
                          name="koreanType"
                          value={formData.koreanType}
                          onChange={handleChange}
                          className="block mx-auto mt-1 px-1 py-1 border border-gray-300 rounded text-xs w-full"
                        >
                          <option value="">선택</option>
                          {koreanTypeOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </th>
                      <th className="border border-gray-200 px-2 py-3 text-sm font-medium text-gray-700 w-[100px]">
                        수학
                        <select
                          name="mathType"
                          value={formData.mathType}
                          onChange={handleChange}
                          className="block mx-auto mt-1 px-1 py-1 border border-gray-300 rounded text-xs w-full"
                        >
                          <option value="">선택</option>
                          {mathTypeOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </th>
                      <th className="border border-gray-200 px-2 py-3 text-sm font-medium text-gray-700 w-[90px]">영어</th>
                      <th className="border border-gray-200 px-2 py-3 text-sm font-medium text-gray-700 w-[90px]">한국사</th>
                      <th className="border border-gray-200 px-2 py-3 text-sm font-medium text-gray-700 w-[100px]">
                        탐구1
                        <select
                          name="tamgu1Type"
                          value={formData.tamgu1Type}
                          onChange={handleChange}
                          className="block mx-auto mt-1 px-1 py-1 border border-gray-300 rounded text-xs w-full"
                        >
                          <option value="">선택</option>
                          {tamguOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </th>
                      <th className="border border-gray-200 px-2 py-3 text-sm font-medium text-gray-700 w-[100px]">
                        탐구2
                        <select
                          name="tamgu2Type"
                          value={formData.tamgu2Type}
                          onChange={handleChange}
                          className="block mx-auto mt-1 px-1 py-1 border border-gray-300 rounded text-xs w-full"
                        >
                          <option value="">선택</option>
                          {tamguOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 표준점수 */}
                    <tr>
                      <td className="border border-gray-200 px-2 py-2 text-sm font-medium text-gray-700 bg-gray-50 text-center">표준점수</td>
                      {(['korean', 'math', 'english', 'history', 'tamgu1', 'tamgu2'] as const).map((subject) => (
                        <td key={subject} className="border border-gray-200 px-1 py-2">
                          <input
                            type="number"
                            value={formData[subject].standard}
                            onChange={(e) => handleScoreChange(subject, 'standard', e.target.value)}
                            className="w-full px-1 py-2 border border-gray-300 rounded text-center text-sm"
                            placeholder="-"
                          />
                        </td>
                      ))}
                    </tr>
                    {/* 백분위 */}
                    <tr>
                      <td className="border border-gray-200 px-2 py-2 text-sm font-medium text-gray-700 bg-gray-50 text-center">백분위</td>
                      {(['korean', 'math', 'english', 'history', 'tamgu1', 'tamgu2'] as const).map((subject) => (
                        <td key={subject} className="border border-gray-200 px-1 py-2">
                          <input
                            type="number"
                            value={formData[subject].percentile}
                            onChange={(e) => handleScoreChange(subject, 'percentile', e.target.value)}
                            className="w-full px-1 py-2 border border-gray-300 rounded text-center text-sm"
                            placeholder="-"
                          />
                        </td>
                      ))}
                    </tr>
                    {/* 등급 */}
                    <tr>
                      <td className="border border-gray-200 px-2 py-2 text-sm font-medium text-gray-700 bg-gray-50 text-center">
                        등급 <span className="text-red-500">*</span>
                      </td>
                      {(['korean', 'math', 'english', 'history', 'tamgu1', 'tamgu2'] as const).map((subject) => (
                        <td key={subject} className="border border-gray-200 px-1 py-2">
                          <input
                            type="number"
                            min="1"
                            max="9"
                            value={formData[subject].grade}
                            onChange={(e) => handleScoreChange(subject, 'grade', e.target.value)}
                            className="w-full px-1 py-2 border border-gray-300 rounded text-center text-sm"
                            placeholder="-"
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 성적표 첨부 */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-3">성적표 첨부</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={fileName}
                    readOnly
                    placeholder="파일첨부"
                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-500"
                  />
                  <label className="px-6 py-3 bg-sn-green text-white font-medium rounded-lg cursor-pointer hover:bg-sn-green-dark transition-colors text-sm">
                    파일선택
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <ul className="mt-3 space-y-1 text-xs text-gray-500">
                  <li>• 입소 조건에 해당되는 성적표를 업로드 해주세요.</li>
                  <li>• 입력한 성적과 등록한 성적표가 다른 경우, 입학 취소가 될 수 있습니다. (선행반은 성적표 첨부 제외)</li>
                  <li>• 파일 이름은 &quot;전형 / 학교 / 이름&quot;을 기재해주세요. (ex&gt; 재도전반 / 에스엔고등학교 / 홍길동 )</li>
                </ul>
              </div>

              <p className="mt-4 text-sm text-red-500">
                *성적표 미비 등으로 모두 적기 어려우신 경우 등급만이라도 기재 바랍니다.
              </p>
            </div>

            {/* 내신정보 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                내신정보
              </h2>
              <div>
                <label htmlFor="naesinGrade" className="block text-sm font-medium text-gray-700 mb-2">
                  내신 등급 (평균)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="naesinGrade"
                    name="naesinGrade"
                    value={formData.naesinGrade}
                    onChange={handleChange}
                    placeholder="예: 2.5"
                    className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all text-center"
                  />
                  <span className="text-gray-500">등급</span>
                </div>
              </div>
            </div>

            {/* 기타 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                기타
              </h2>

              {/* 현재 가장 큰 고민 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  현재 가장 큰 고민 (복수 선택 가능)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {concernOptions.map((concern) => (
                    <label
                      key={concern}
                      className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                        formData.concerns.includes(concern)
                          ? 'border-sn-green bg-sn-green/10 text-sn-green'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.concerns.includes(concern)}
                        onChange={() => handleConcernChange(concern)}
                        className="sr-only"
                      />
                      <span className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        formData.concerns.includes(concern)
                          ? 'border-sn-green bg-sn-green'
                          : 'border-gray-300'
                      }`}>
                        {formData.concerns.includes(concern) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="text-sm">{concern}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 메모 */}
              <div>
                <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-2">
                  전달하고 싶은 사항, 장학금 신청 등 기재
                </label>
                <textarea
                  id="memo"
                  name="memo"
                  value={formData.memo}
                  onChange={handleChange}
                  rows={4}
                  placeholder="예: 장학금 신청합니다 / 특이사항 등"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            {/* 개인정보 처리방침 동의 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                개인정보 처리방침
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-40 overflow-y-auto text-sm text-gray-600">
                <p className="mb-2 font-medium">개인정보 수집 및 이용 동의</p>
                <p className="mb-2">
                  SN-고요의숲 대치(이하 &apos;학원&apos;)은 원서접수를 위해 아래와 같이 개인정보를 수집·이용합니다.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>수집항목: 학생 성명, 생년월일, 학교, 연락처, 보호자 정보, 이메일, 성적정보</li>
                  <li>수집목적: 입학 상담 및 원서접수 처리, 학원 운영</li>
                  <li>보유기간: 수집일로부터 1년 (목적 달성 시 즉시 파기)</li>
                </ul>
                <p className="mt-2">
                  위 개인정보 수집·이용에 동의하지 않으실 수 있으나, 미동의 시 원서접수가 제한됩니다.
                </p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyAgreed"
                  checked={formData.privacyAgreed}
                  onChange={handleChange}
                  className="w-5 h-5 text-sn-green border-gray-300 rounded focus:ring-sn-green"
                />
                <span className="text-gray-700 font-medium">
                  개인정보 처리방침에 동의합니다. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* 캡차 및 제출 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="space-y-5">
                {/* 캡차 */}
                <div>
                  <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-2">
                    자동입력 방지 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-3 bg-gray-100 rounded-lg font-mono text-lg font-bold text-gray-700">
                      {captcha.num1} + {captcha.num2} = ?
                    </div>
                    <input
                      type="number"
                      id="captcha"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      required
                      placeholder="정답"
                      className={`w-24 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sn-green focus:border-transparent transition-all ${
                        captchaError ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {captchaError && (
                    <p className="mt-2 text-sm text-red-500">정답이 틀렸습니다. 다시 시도해주세요.</p>
                  )}
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-sn-green hover:bg-sn-green-dark text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      접수 중...
                    </span>
                  ) : (
                    '접수하기'
                  )}
                </button>

                {submitStatus === 'error' && (
                  <p className="text-center text-red-500 text-sm">
                    접수 중 오류가 발생했습니다. 다시 시도해주세요.
                  </p>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
