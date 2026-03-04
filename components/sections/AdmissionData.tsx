'use client';

import { useState } from 'react';

interface AdmissionRecord {
  university: string;
  department: string;
  name: string;
  highSchool: string;
  tier: 'sky' | 'medical' | 'top' | 'excellent';
  year: '2026' | '2025';
  academy?: string;
}

// 고등학교 이름 마스킹 (중간 1~2글자를 **로)
function maskHighSchool(name: string): string {
  if (name.length <= 2) return name;
  if (name.length === 3) return name[0] + '*' + name[2];
  if (name.length === 4) return name[0] + '**' + name[3];
  // 5글자 이상
  const mid = Math.floor(name.length / 2);
  return name.slice(0, mid - 1) + '**' + name.slice(mid + 1);
}

// 학생 이름 마스킹 (가운데 글자를 *로)
function maskName(name: string): string {
  if (name.length <= 1) return name;
  if (name.length === 2) return name[0] + '*';
  if (name.length === 3) return name[0] + '*' + name[2];
  // 4글자 이상
  return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
}

export default function AdmissionData() {
  const [filter, setFilter] = useState<'all' | 'sky' | 'medical' | 'top'>('all');
  const [yearFilter, setYearFilter] = useState<'all' | '2026' | '2025'>('2026');

  // 입결 데이터 (의약학 > SKY > 주요대 > 우수대 순서)
  const admissionData: AdmissionRecord[] = [
    // === 2026학년도 ===
    // 의약학계열 (최상단)
    { university: '가천대학교', department: '의예과', name: '이채원', highSchool: '영덕여고', tier: 'medical', year: '2026' },
    { university: '서울대학교', department: '약학과', name: '이채원', highSchool: '영덕여고', tier: 'medical', year: '2026' },
    { university: '성균관대학교', department: '약학과', name: '윤지언', highSchool: '수지고', tier: 'medical', year: '2026' },
    { university: '건국대학교', department: '수의학과', name: '박찬윤', highSchool: '영덕여고', tier: 'medical', year: '2026' },

    // 서울대
    { university: '서울대학교', department: '자유전공학부', name: '한유찬', highSchool: '이매고', tier: 'sky', year: '2026' },
    { university: '서울대학교', department: '경제학과', name: '유지담', highSchool: '이매고', tier: 'sky', year: '2026' },
    { university: '서울대학교', department: '언론정보학과', name: '배연우', highSchool: '영덕여고', tier: 'sky', year: '2026' },
    { university: '서울대학교', department: '간호학과', name: '함서현', highSchool: '대진고', tier: 'sky', year: '2026' },

    // 연세대
    { university: '연세대학교', department: '인문사회계열', name: '박초하', highSchool: '성남외고', tier: 'sky', year: '2026' },
    { university: '연세대학교', department: '인문사회계열', name: '문지후', highSchool: '성남외고', tier: 'sky', year: '2026' },
    { university: '연세대학교', department: '철학과', name: '김건호', highSchool: '이매고', tier: 'sky', year: '2026' },
    { university: '연세대학교', department: '디스플레이융합공학과', name: '이동훈', highSchool: '대진고', tier: 'sky', year: '2026' },
    { university: '연세대학교', department: '아동가족학과', name: '최서연', highSchool: '영덕여고', tier: 'sky', year: '2026' },

    // 고려대
    { university: '고려대학교', department: '경영학과', name: '배연우', highSchool: '영덕여고', tier: 'sky', year: '2026' },
    { university: '고려대학교', department: '경영학과', name: '최서연', highSchool: '영덕여고', tier: 'sky', year: '2026' },
    { university: '고려대학교', department: '철학과', name: '김건호', highSchool: '이매고', tier: 'sky', year: '2026' },
    { university: '고려대학교', department: '식품자원경제학과', name: '김세웅', highSchool: '이매고', tier: 'sky', year: '2026' },
    { university: '고려대학교', department: '식품자원경제학과', name: '최수영', highSchool: '돌마고', tier: 'sky', year: '2026' },

    // 주요대학
    { university: '성균관대학교', department: '건설환경공학과', name: '김준혁', highSchool: '태원고', tier: 'top', year: '2026' },
    { university: '성균관대학교', department: '배터리학과', name: '장윤서', highSchool: '돌마고', tier: 'top', year: '2026' },
    { university: '성균관대학교', department: '건축학과', name: '고재윤', highSchool: '수지고', tier: 'top', year: '2026' },
    { university: '홍익대학교', department: '전기전자공학과', name: '유효정', highSchool: '수지고', tier: 'top', year: '2026' },
    { university: '건국대학교', department: '자유전공학부', name: '유효정', highSchool: '수지고', tier: 'top', year: '2026' },
    { university: '경희대학교', department: '자유전공학부', name: '장서윤', highSchool: '불곡고', tier: 'top', year: '2026' },

    // 우수대학
    { university: '아주대학교', department: '소프트웨어학과', name: '이동윤', highSchool: '서원고', tier: 'excellent', year: '2026' },
    { university: '단국대학교', department: '공학계열', name: '이상연', highSchool: '송림고', tier: 'excellent', year: '2026' },
    { university: '단국대학교', department: '고분자시스템공학과', name: '박윤하', highSchool: '수내고', tier: 'excellent', year: '2026' },
    { university: '인하대학교', department: '환경공학과', name: '이상연', highSchool: '송림고', tier: 'excellent', year: '2026' },
    { university: '숭실대학교', department: '수학과', name: '이상연', highSchool: '송림고', tier: 'excellent', year: '2026' },
    { university: '서울과기대', department: '자유전공학부', name: '김예린', highSchool: '서현고', tier: 'excellent', year: '2026' },

    // === 2025학년도 ===
    // 서울대학교
    { university: '서울대학교', department: '응용생물화학부', name: '강*서', highSchool: '동일여고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울대학교', department: '산업공학과', name: '유*원', highSchool: '청운고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울대학교', department: '조경·지역시스템공학부', name: '김**', highSchool: '신성고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울대학교', department: '인문계열', name: '한*경', highSchool: '함양고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울대학교', department: '소비자아동학부', name: '이*연', highSchool: '양일고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울대학교', department: '식품영양학과', name: '유*유', highSchool: '고양외고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울대학교', department: '경영학과', name: '***', highSchool: '**고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },

    // 의/치/한/수/약
    { university: '경희대학교', department: '의예과', name: '***', highSchool: '서산고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '원광대학교', department: '의예과', name: '박*열', highSchool: '군산중앙고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '인하대학교', department: '의예과', name: '박*민', highSchool: '마산무학여고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '인하대학교', department: '의예과', name: '***', highSchool: '서산고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경상국립대학교', department: '의예과', name: '임*수', highSchool: '현일고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경상국립대학교', department: '의예과', name: '유*원', highSchool: '청운고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경상국립대학교', department: '의예과', name: '박*민', highSchool: '마산무학여고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '동아대학교', department: '의예과', name: '조*서', highSchool: '상암고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '순천향대학교', department: '의예과', name: '***', highSchool: '서산고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '충북대학교', department: '의예과', name: '***', highSchool: '서산고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고신대학교', department: '의예과', name: '유*원', highSchool: '청운고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '원광대학교', department: '치의예과', name: '이*나', highSchool: '전북대사대부고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '가천대학교', department: '한의예과', name: '이*혁', highSchool: '검정고시', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '동국대학교', department: '한의예과', name: '김*규', highSchool: '포항동성고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '세명대학교', department: '한의예과', name: '이*영', highSchool: '공주고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '세명대학교', department: '한의예과', name: '정*호', highSchool: '장훈고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '우석대학교', department: '한의예과', name: '송*빈', highSchool: '영주제일고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '우석대학교', department: '한의예과', name: '이*혁', highSchool: '검정고시', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '우석대학교', department: '한의예과', name: '김*진', highSchool: '원주고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '약학과', name: '안*훈', highSchool: '안양신성고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '영남대학교', department: '약학과', name: '김*희', highSchool: '대구중앙고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '조선대학교', department: '약학과', name: '양*명', highSchool: '영해고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '충남대학교', department: '약학과', name: '안*훈', highSchool: '안양신성고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '제주대학교', department: '약학과', name: '주*재', highSchool: '마송고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '우석대학교', department: '약학과', name: '권*현', highSchool: '연수고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '건국대학교', department: '수의예과', name: '김*진', highSchool: '원주고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: '수의예과', name: '안*영', highSchool: '대구구암고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '제주대학교', department: '수의예과', name: '정*호', highSchool: '장훈고', tier: 'medical', year: '2025', academy: 'SN독학기숙학원 양평점' },

    // 연세대 / 고려대 / KAIST
    { university: '연세대학교', department: '경영학과', name: '한*희', highSchool: '상원고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '경영학과', name: '이*연', highSchool: '양일고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '상경계열', name: '윤*원', highSchool: '성남외고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '상경계열', name: '신*헌', highSchool: '고양국제고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '정치외교학과', name: '최*진', highSchool: '운중고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '정치외교학과', name: '노*원', highSchool: '양일고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '정치외교학과', name: '한*경', highSchool: '함양고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '아동가족학과', name: '이*빈', highSchool: '정화여고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '신학과', name: '김*서', highSchool: '진선여고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '첨단컴퓨팅학부', name: '황*민', highSchool: '덕소고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '스포츠응용산업학과', name: '신*하', highSchool: '양일고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '스포츠응용산업학과', name: '강*원', highSchool: '상문고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '전자전기공학부', name: '김*민', highSchool: '안동고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '전자전기공학부', name: '오*성', highSchool: '낙생고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '수학과', name: '김*후', highSchool: '오현고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '화공생명공학과', name: '강*서', highSchool: '동일여고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '정치외교학과', name: '서*원', highSchool: '대원외고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '생명공학부', name: '김*혜', highSchool: '포항동성고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '수학교육과', name: '유*균', highSchool: '서울계성고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '통계학과', name: '문*우', highSchool: '홍천고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '데이터과학과', name: '김*현', highSchool: '분당중앙고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '자유전공학부', name: '김**', highSchool: '신성고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '자유전공학부', name: '이*희', highSchool: '마석고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '행정학과', name: '서*원', highSchool: '대원외고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '환경생태공학부', name: '임*수', highSchool: '현일고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '식품자원경제학과', name: '***', highSchool: '**고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '보건정책관리학부', name: '차*민', highSchool: '양산제일고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '경영학과', name: '박*하', highSchool: '양일고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '경영학과', name: '***', highSchool: '**고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '전기전자공학부', name: '오*성', highSchool: '낙생고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: 'KAIST', department: '', name: '강*은', highSchool: '천안신당고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: 'KENTECH', department: '', name: '권*현', highSchool: '연수고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: 'DGIST', department: '기초학부', name: '유*균', highSchool: '서울계성고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: 'DGIST', department: '반도체공학과', name: '권*현', highSchool: '연수고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: 'GIST', department: '반도체공학과', name: '권*현', highSchool: '연수고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: 'UNIST', department: '반도체공학과', name: '권*현', highSchool: '연수고', tier: 'sky', year: '2025', academy: 'SN독학기숙학원 양평점' },

    // 서성한
    { university: '서강대학교', department: '생명과학과', name: '이*지', highSchool: '거창고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '물리학과', name: '임*수', highSchool: '안산고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '경영학부', name: '조*기', highSchool: '고양외고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '경영학부', name: '최*광', highSchool: '덕소고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '중국문화학과', name: '김*승', highSchool: '홍천고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '화공생명공학과', name: '이*희', highSchool: '마석고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '화공생명공학과', name: '김*혜', highSchool: '포항동성고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '전자공학과', name: '김*민', highSchool: '안동고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '화학과', name: '성*민', highSchool: '구암고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: 'AI기반자유전공학부', name: '유*균', highSchool: '서울계성고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: 'AI기반자유전공학부', name: '이*들', highSchool: '파주한빛고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '반도체시스템공학과', name: '권*현', highSchool: '연수고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '자유전공계열', name: '안*휴', highSchool: '중동고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '자유전공계열', name: '서*원', highSchool: '대원외고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '자유전공계열', name: '최**', highSchool: '세종고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '사회과학계열', name: '박*영', highSchool: '명문고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '사회과학계열', name: '임*수', highSchool: '충남삼성고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '전자전기공학부', name: '오*성', highSchool: '낙생고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '전자전기공학부', name: '이*들', highSchool: '파주한빛고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '공학계열', name: '이*우', highSchool: '검정고시', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '공학계열', name: '김*후', highSchool: '오현고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '공학계열', name: '김*욱', highSchool: '용인홍천고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '공학계열', name: '김*연', highSchool: '부산양운고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '공학계열', name: '이*민', highSchool: '서울고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '자연과학계열', name: '박*희', highSchool: '광남고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '자연과학계열', name: '성*민', highSchool: '구암고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '자연과학계열', name: '박*우', highSchool: '검정고시', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '수학교육과', name: '박*우', highSchool: '검정고시', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '경영학과', name: '최*진', highSchool: '운중고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '신소재공학부', name: '전*현', highSchool: '안산성안고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '영어영문학과', name: '김*현', highSchool: '대일외고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '융합전자공학부', name: '김*욱', highSchool: '용인홍천고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '융합전자공학부', name: '이*들', highSchool: '파주한빛고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '한양인터칼리지학부', name: '김*윤', highSchool: '영주제일고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '한양인터칼리지학부', name: '문*우', highSchool: '홍천고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '미래자동차공학과', name: '김*현', highSchool: '분당중앙고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '파이낸스경영학과', name: '윤*원', highSchool: '성남외고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '간호학과', name: '오*재', highSchool: '한국디지털미디어고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '바이오메디컬공학전공', name: '최*광', highSchool: '덕소고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '물리학과', name: '윤*현', highSchool: '인천신송고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '정보시스템학과', name: '차*민', highSchool: '양산제일고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '경영학과', name: '김*희', highSchool: '부산양운고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },

    // 교육대학교
    { university: '서울교육대학교', department: '초등교육과', name: '이*현', highSchool: '남성고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울교육대학교', department: '초등교육과', name: '김*호', highSchool: '서울고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울교육대학교', department: '초등교육과', name: '이*범', highSchool: '신목고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '춘천교육대학교', department: '초등교육과', name: '박*담', highSchool: '장기고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '진주교육대학교', department: '초등교육과', name: '***', highSchool: '**고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '공주교육대학교', department: '초등교육과', name: '박*연', highSchool: '이매고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국교원대학교', department: '초등교육과', name: '김*건', highSchool: '물금고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국교원대학교', department: '지리교육과', name: '이*현', highSchool: '남성고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },

    // 경찰대 / 사관학교
    { university: '경찰대학교', department: '', name: '정*호', highSchool: '동두천외고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '육군사관학교', department: '', name: '유*준', highSchool: '공주사대부고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '육군사관학교', department: '', name: '임*준', highSchool: '구미고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '육군사관학교', department: '', name: '윤*호', highSchool: '세종고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '해군사관학교', department: '', name: '박*승', highSchool: '운정고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '해군사관학교', department: '', name: '송*훈', highSchool: '포항제철고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '공군사관학교', department: '', name: '신*헌', highSchool: '고양국제고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '공군사관학교', department: '', name: '이*준', highSchool: '김해외고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '공군사관학교', department: '', name: '문*준', highSchool: '돌마고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },

    // 중경외시 + 이
    { university: '중앙대학교', department: '경영학과', name: '이*희', highSchool: '마석고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '경영학과', name: '최*진', highSchool: '운중고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '경영학과', name: '안*영', highSchool: '일산대진고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '경영학과', name: '김*혁', highSchool: '현대청운고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '경영학과', name: '이*연', highSchool: '혜화여고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '공공인재학부', name: '김*영', highSchool: '남악고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '공공인재학부', name: '***', highSchool: '**고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '공공인재학부', name: '김*혁', highSchool: '현대청운고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '글로벌금융', name: '서*석', highSchool: '영동일고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '글로벌금융', name: '김*진', highSchool: '검정고시', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '자연과학대학', name: '김*연', highSchool: '영천여고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '자연과학대학', name: '이*나', highSchool: '전북사대부고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '사회복지학과', name: '김*영', highSchool: '남악고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '건축학부', name: '최*빈', highSchool: '서령고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '전자전기공학부', name: '김*민', highSchool: '안동고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '전자전기공학부', name: '김*혜', highSchool: '포항동성고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '소프트웨어학부', name: '이*우', highSchool: '검정고시', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '창의ICT공과대학', name: '박*희', highSchool: '광남고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '창의ICT공과대학', name: '박*우', highSchool: '검정고시', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '약과학과', name: '김*림', highSchool: '거창중앙고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '약과학과', name: '***', highSchool: '**고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '글로벌커뮤니케이션학부', name: '김*주', highSchool: '신현고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '자유전공학부', name: '하*언', highSchool: '순천매산고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '글로벌관광학과', name: '임*준', highSchool: '구미고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '기계공학과', name: '김*건', highSchool: '물금고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '기계공학과', name: '이*현', highSchool: '유성여고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '정치외교학과', name: '정**', highSchool: '인천국제고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '환경학및환경공학과', name: '권*형', highSchool: '대금고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '자유전공학부', name: '양*진', highSchool: '구미고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '지리학과', name: '권*수', highSchool: '해운대고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '경영학과', name: '안*우', highSchool: '신목고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '미디어학과', name: '정*운', highSchool: '강원고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '스페인어학과', name: '김*진', highSchool: '검정고시', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '자율전공학부', name: '김*성', highSchool: '구암고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '소프트웨어융합학과', name: '이*현', highSchool: '유성여고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '무역학과', name: '이*범', highSchool: '신목고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '응용수학과', name: '김*준', highSchool: '춘천고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '산업경영공학과', name: '박*태', highSchool: '풍덕고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국외국어대학교', department: '미디어커뮤니케이션학부', name: '이*민', highSchool: '미추홀외고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국외국어대학교', department: '프랑스어학부', name: '김*현', highSchool: '세화여고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국외국어대학교', department: '태국학과', name: '김*현', highSchool: '세화여고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국외국어대학교', department: 'Language&Diplomacy학부', name: '김*혁', highSchool: '검정고시', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울시립대학교', department: '자유전공학부', name: '문*희', highSchool: '명덕여고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울시립대학교', department: '건축학부', name: '신*하', highSchool: '양일고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울시립대학교', department: '세무학과', name: '***', highSchool: '현대고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울시립대학교', department: '전자전기컴퓨터공학부', name: '김*윤', highSchool: '부산센텀고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '이화여자대학교', department: '수학과', name: '정*현', highSchool: '군산여고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '이화여자대학교', department: '화공신소재공학과', name: '전*현', highSchool: '안산성안고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '이화여자대학교', department: '정치외교학과', name: '전*진', highSchool: '와부고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '이화여자대학교', department: '통합선발(인문계열)', name: '***', highSchool: '**고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '이화여자대학교', department: '통합선발(인문계열)', name: '문*희', highSchool: '명덕여고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '이화여자대학교', department: '경제학과', name: '임*서', highSchool: '창평고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '이화여자대학교', department: '융합전자반도체공학부', name: '조*서', highSchool: '덕문여고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '이화여자대학교', department: '인공지능데이터사이언스학부', name: '이*민', highSchool: '이대부고', tier: 'top', year: '2025', academy: 'SN독학기숙학원 양평점' },

    // 서울 주요 대학교
    { university: '건국대학교', department: '자유전공학부', name: '이*민', highSchool: '포항제철고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '건국대학교', department: '자유전공학부', name: '김*진', highSchool: '위례한빛고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '건국대학교', department: '경영학과', name: '***', highSchool: '**고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '건국대학교', department: '항공우주·모빌리티공학과', name: '추*우', highSchool: '현일고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '건국대학교', department: '생명과학특성학과', name: '장*희', highSchool: '광주동성고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '건국대학교', department: '경제학과', name: '이*서', highSchool: '시온고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '건국대학교', department: '컴퓨터공학부', name: '안*준', highSchool: '대인고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '동국대학교', department: '국제통상학과', name: '김*혁', highSchool: '광문고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '동국대학교', department: '수학교육과', name: '이*강', highSchool: '검정고시', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '홍익대학교', department: '컴퓨터공학과', name: '김*준', highSchool: '춘천고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '홍익대학교', department: '컴퓨터공학과', name: '김*윤', highSchool: '부산센텀고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '홍익대학교', department: '컴퓨터공학과', name: '권*수', highSchool: '해운대고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '홍익대학교', department: '전자·전기공학부', name: '이*현', highSchool: '유성여고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '홍익대학교', department: '건설환경공학과', name: '고*찬', highSchool: '공주고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '홍익대학교', department: '경영학부', name: '배*후', highSchool: '배화여고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '숙명여자대학교', department: '화학과', name: '이*영', highSchool: '여수중앙여고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '숙명여자대학교', department: '경영학과', name: '이*영', highSchool: '여수중앙여고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '국민대학교', department: '경영학부', name: '원*민', highSchool: '군산중앙고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '국민대학교', department: '자유전공학부', name: '김*호', highSchool: '서울고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '국민대학교', department: '자유전공학부', name: '신*원', highSchool: '숙명여고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '숭실대학교', department: '경영학부', name: '원*민', highSchool: '군산중앙고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '숭실대학교', department: '경영학부', name: '김*겸', highSchool: '안법고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '숭실대학교', department: '경영학부', name: '김*준', highSchool: '학성고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '숭실대학교', department: '국어국문학과', name: '이*선', highSchool: '상지여고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '숭실대학교', department: '독어독문학과', name: '정*운', highSchool: '강원고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '숭실대학교', department: '글로벌미디어학부', name: '문*진', highSchool: '능동고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '숭실대학교', department: '철학과', name: '박*선', highSchool: '홍성고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '세종대학교', department: '나노신소재공학과', name: '윤*우', highSchool: '서라벌고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '세종대학교', department: '공과계열', name: '주*범', highSchool: '홍천고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '세종대학교', department: 'IT계열', name: '정*현', highSchool: '태장고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '세종대학교', department: '자연생명계열', name: '원**', highSchool: '검정고시', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '세종대학교', department: '지능정보융합학과', name: '고*현', highSchool: '서라벌고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '단국대학교', department: '퇴계혁신칼리지', name: '박*담', highSchool: '장기고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '단국대학교', department: '퇴계혁신칼리지', name: '박*원', highSchool: '동탄중앙고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '단국대학교', department: '융합반도체공학과', name: '박*우', highSchool: '효양고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '성신여자대학교', department: '미디어커뮤니케이션학과', name: '원*령', highSchool: '풍산고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '광운대학교', department: '자율전공학부', name: '최*호', highSchool: '대륜고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '광운대학교', department: '국제학부', name: '조*빈', highSchool: '동화고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '명지대학교', department: '자율전공학부', name: '이*준', highSchool: '오현고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '상명대학교', department: '자유전공(IT계열)', name: '김*재', highSchool: '명덕고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '서울여자대학교', department: '식품공학과', name: '이*강', highSchool: '검정고시', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국체육대학교', department: '사회체육학과', name: '김*찬', highSchool: '성복고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },

    // 지방 주요 대학교
    { university: '한국외국어대학교(글로벌)', department: '기후변화융합학부', name: '원*령', highSchool: '풍산고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국외국어대학교(글로벌)', department: '통계학과', name: '이*찬', highSchool: '목천고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국외국어대학교(글로벌)', department: '폴란드학과', name: '김*우', highSchool: '대원고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국외국어대학교(글로벌)', department: '자유전공학부', name: '장*희', highSchool: '광주동성고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국외국어대학교(글로벌)', department: '자유전공학부', name: '박*석', highSchool: '하남고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '아주대학교', department: '영어영문학과', name: '한*건', highSchool: '서귀포고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '아주대학교', department: '소프트웨어학과', name: '김*태', highSchool: '양지고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '인하대학교', department: '건축학부', name: '최*빈', highSchool: '서령고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '가천대학교', department: '스마트팩토리전공', name: '박*석', highSchool: '하남고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '가천대학교', department: '식품영양학과', name: '문*원', highSchool: '대광고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교(에리카)', department: '경영학부', name: '백*민', highSchool: '제주오현고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '부산대학교', department: '물리학과', name: '심*현', highSchool: '대성고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '부산대학교', department: '일반사회교육과', name: '***', highSchool: '**고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '부산대학교', department: '지질환경과학과', name: '김*우', highSchool: '구미고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '부산대학교', department: '미생물학과', name: '김*우', highSchool: '구미고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '부산대학교', department: '화학과', name: '손*혁', highSchool: '마산제일고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: '영어영문학과', name: '한*건', highSchool: '서귀포고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: '생명공학부', name: '이*준', highSchool: '대동고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: '수학교육과', name: '이*준', highSchool: '대동고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '전남대학교', department: '간호학과', name: '***', highSchool: '**고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '전남대학교', department: '전기공학과', name: '장*희', highSchool: '광주동성고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '인천대학교', department: '건설환경공학전공', name: '김*우', highSchool: '구미고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '인천대학교', department: '동북아국제통상전공', name: '백*민', highSchool: '제주오현고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },
    { university: '한국항공대학교', department: '스마트드론학과', name: '박*원', highSchool: '동탄중앙고', tier: 'excellent', year: '2025', academy: 'SN독학기숙학원 양평점' },

    // === SN독학기숙학원 실적 ===
    // 서울대
    { university: '서울대학교', department: '항공우주공학과', name: '윤도현', highSchool: '신송고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '서울대학교', department: '정치외교학부', name: '강서현', highSchool: '부산사대부고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '서울대학교', department: '원자핵공학과', name: '김준희', highSchool: '김해수남고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 의예과
    { university: '조선대학교', department: '의예과', name: '김민조', highSchool: '전남고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '조선대학교', department: '의예과', name: '최지웅', highSchool: '호남고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '조선대학교', department: '의예과', name: '장성수', highSchool: '대창고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '원광대학교', department: '의예과', name: '최휘찬', highSchool: '군산제일고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '원광대학교', department: '의예과', name: '장성수', highSchool: '대창고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '전남대학교', department: '의예과', name: '김민조', highSchool: '전남고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '을지대학교', department: '의예과', name: '최준', highSchool: '세종고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '인제대학교', department: '의예과', name: '김민조', highSchool: '전남고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '대구가톨릭대학교', department: '의예과', name: '오유빈', highSchool: '검정고시', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고신대학교', department: '의예과', name: '김지호', highSchool: '', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고신대학교', department: '의예과', name: '오희준', highSchool: '울산대동고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '강원대학교', department: '의예과', name: '정동욱', highSchool: '경포고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 치의예과
    { university: '전남대학교', department: '치의예과', name: '문종인', highSchool: '순천금당고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '원광대학교', department: '치의예과', name: '김상훈', highSchool: '호남고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '단국대학교', department: '치의예과', name: '유정철', highSchool: '공주고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '단국대학교', department: '치의예과', name: '최준', highSchool: '세종고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '조선대학교', department: '치의예과', name: '박건휘', highSchool: '여천고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '조선대학교', department: '치의예과', name: '김상훈', highSchool: '호남고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '조선대학교', department: '치의예과', name: '노금정', highSchool: '나주고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 한의예과
    { university: '동국대학교', department: '한의예과', name: '공서준', highSchool: '효양고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '동국대학교', department: '한의예과', name: '안재우', highSchool: '양천고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '세명대학교', department: '한의예과', name: '유정철', highSchool: '공주고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '세명대학교', department: '한의예과', name: '최준', highSchool: '세종고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '세명대학교', department: '한의예과', name: '조인우', highSchool: '광명북고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '세명대학교', department: '한의예과', name: '안재우', highSchool: '양천고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '원광대학교', department: '한의예과', name: '박건휘', highSchool: '여천고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 약학과
    { university: '성균관대학교', department: '약학과', name: '오유빈', highSchool: '검정고시', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '조선대학교', department: '약학과', name: '문종인', highSchool: '순천금당고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '순천대학교', department: '약학과', name: '문종인', highSchool: '순천금당고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '대구가톨릭대학교', department: '약학과', name: '강진표', highSchool: '상해한국학교', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '우석대학교', department: '약학과', name: '김상훈', highSchool: '호남고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: '약학과', name: '김혜림', highSchool: '거창고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '가천대학교', department: '약학과', name: '안재우', highSchool: '양천고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 수의예과
    { university: '전북대학교', department: '수의예과', name: '문종인', highSchool: '순천금당고', tier: 'medical', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 연세대
    { university: '연세대학교', department: '사회환경시스템공학부', name: '전하늘', highSchool: '남해해성고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '경영학과', name: '이라윤', highSchool: '양일고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '산업공학과', name: '서인호', highSchool: '선덕고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '연세대학교', department: '응용통계학과', name: '한호겸', highSchool: '중앙고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 고려대
    { university: '고려대학교', department: '스마트보안학부', name: '박재민', highSchool: '보인고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '경영대학', name: '이라윤', highSchool: '양일고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '경영대학', name: '강서현', highSchool: '부산사대부고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '경영대학', name: '최원석', highSchool: '검정고시', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '경영대학', name: '박준희', highSchool: '해룡고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '국어교육과', name: '오도윤', highSchool: '새롬고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '노어노문학과', name: '김경윤', highSchool: '부산양정고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '경제학과', name: '윤서진', highSchool: 'Cestar HS', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '경제학과', name: '박준하', highSchool: '중동고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '미디어학부', name: '김태호', highSchool: '상문고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '미디어학부', name: '이승혁', highSchool: '검정고시', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '융합에너지공학과', name: '김준희', highSchool: '김해수남고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '신소재공학부', name: '심채원', highSchool: '시흥고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '고려대학교', department: '전기전자공학부', name: '장성수', highSchool: '대창고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // DGIST / GIST / UNIST
    { university: 'DGIST', department: '반도체공학과', name: '신가림', highSchool: '대전한빛고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: 'DGIST', department: '', name: '노대건', highSchool: '정현고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: 'GIST', department: '', name: '정송윤', highSchool: '광양제철고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: 'UNIST', department: '', name: '노대건', highSchool: '정현고', tier: 'sky', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 서강대
    { university: '서강대학교', department: '경영학부', name: '이라윤', highSchool: '양일고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '경제학과', name: '김준수', highSchool: '부흥고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '화공생명공학과', name: '심채원', highSchool: '시흥고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: 'AI기반자유전공학부', name: '이승혁', highSchool: '검정고시', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '사이언스기반자유전공학부', name: '김성민', highSchool: '전북제일고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '인문학기반자유전공학부', name: '심재윤', highSchool: '경기광주중앙고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '서강대학교', department: '인공지능학과', name: '심재윤', highSchool: '경기광주중앙고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 성균관대
    { university: '성균관대학교', department: '공학계열', name: '김찬영', highSchool: '병점고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '공학계열', name: '이경원', highSchool: '광주서석고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '공학계열', name: '심채원', highSchool: '시흥고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '공학계열', name: '고기영', highSchool: '서현고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '공학계열', name: '채윤재', highSchool: '부산용인고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '물리학과', name: '신가림', highSchool: '대전한빛고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '글로벌바이오메디컬공학과', name: '정송윤', highSchool: '광양제철고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '양자정보공학과', name: '채윤재', highSchool: '부산용인고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '소프트웨어학과', name: '김민석', highSchool: '고려고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '경영학과', name: '이승혁', highSchool: '검정고시', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '인문과학계열', name: '김도하', highSchool: '주엽고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '글로벌경영학과', name: '윤서진', highSchool: 'Cestar HS', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '자연과학계열', name: '이금찬', highSchool: '경안고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '반도체융합공학과', name: '김준희', highSchool: '김해수남고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '자유전공계열', name: '박재민', highSchool: '보인고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '반도체시스템공학과', name: '김성민', highSchool: '전북제일고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '성균관대학교', department: '반도체시스템공학과', name: '채윤재', highSchool: '부산용인고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 한양대
    { university: '한양대학교', department: '건축학부', name: '유정철', highSchool: '공주고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '간호학과', name: '이지오', highSchool: '남해해성고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '바이오메디컬공학전공', name: '정송윤', highSchool: '광양제철고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '융합전자공학부', name: '조상연', highSchool: '검정고시', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '융합전자공학부', name: '김성민', highSchool: '전북제일고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '정치외교학과', name: '조현호', highSchool: '건대부고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '산업공학과', name: '배한결', highSchool: '검정고시', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '화학공학과', name: '심채원', highSchool: '시흥고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '관광학부', name: '민지환', highSchool: '거창대성고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '영문학과', name: '김민', highSchool: '진주동명고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '한양인터칼리지학부', name: '정송윤', highSchool: '광양제철고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한양대학교', department: '의류학과', name: '조현준', highSchool: '포항동지고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 교대
    { university: '공주교육대학교', department: '초등교육과', name: '장진혁', highSchool: '정관고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '공주교육대학교', department: '초등교육과', name: '고병찬', highSchool: '공주고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 사관학교
    { university: '육군사관학교', department: '', name: '김지호', highSchool: '대진고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '공군사관학교', department: '', name: '이제윤', highSchool: '배재고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 중앙대
    { university: '중앙대학교', department: '공과대학', name: '박건휘', highSchool: '여천고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '창의ICT공과대학', name: '조상연', highSchool: '검정고시', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '창의ICT공과대학', name: '김지호', highSchool: '대진고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '글로벌금융전공', name: '김도하', highSchool: '주엽고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '소프트웨어학과', name: '윤영진', highSchool: '와부고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '화학공학과', name: '심채원', highSchool: '시흥고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '경영학부', name: '김도하', highSchool: '주엽고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '경영학부', name: '손의준', highSchool: '동탄중앙고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '경영학부', name: '김민석', highSchool: '고려고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '경영학부', name: '김민', highSchool: '진주동명고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '에너지시스템공학부', name: '서범서', highSchool: '군산동고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '중앙대학교', department: '인문대학', name: '조현준', highSchool: '포항동지고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 경희대
    { university: '경희대학교', department: '경영회계계열', name: '정준석', highSchool: '공주사대부고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '경영회계계열', name: '오유준', highSchool: '경기고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '경영회계계열', name: '이가온', highSchool: '인천광성고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '행정학과', name: '김민준', highSchool: '향일고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '자율전공학부', name: '김상훈', highSchool: '호남고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '자유전공학부', name: '김민석', highSchool: '고려고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '자유전공학부', name: '박채원', highSchool: '오류고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '자유전공학부', name: '조현준', highSchool: '포항동지고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '기계공학부', name: '안호성', highSchool: '검정고시', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '기계공학부', name: '정휘찬', highSchool: '김해임호고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '정치외교학과', name: '김지윤', highSchool: '대송고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '영어영문학과', name: '한재영', highSchool: '광주광덕고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '우주과학과', name: '김현우', highSchool: '정현고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '우주과학과', name: '윤영진', highSchool: '와부고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '전자공학과', name: '추민근', highSchool: '거창대성고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '화학공학과', name: '김단현', highSchool: '한국디지털미디어고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경희대학교', department: '관광·엔터테인먼트학부', name: '문은기', highSchool: '태원고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 한국외대
    { university: '한국외국어대학교', department: '경제학부', name: '이지석', highSchool: '전곡고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한국외국어대학교', department: '특수외국어(유럽지역)계열', name: '정민영', highSchool: '불당고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 서울시립대
    { university: '서울시립대학교', department: '화학공학과', name: '윤현준', highSchool: '양명고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '서울시립대학교', department: '전자전기컴퓨터공학부', name: '신가림', highSchool: '대전한빛고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '서울시립대학교', department: '행정학과', name: '한재영', highSchool: '광주광덕고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '서울시립대학교', department: '국사학과', name: '배형민', highSchool: '오상고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 이화여대
    { university: '이화여자대학교', department: '과학교육과', name: '박채원', highSchool: '오류고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 건국대
    { university: '건국대학교', department: 'KU 자유전공학부', name: '명은성', highSchool: '영주영광고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '건국대학교', department: '이과대학자유전공학부', name: '박채원', highSchool: '오류고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '건국대학교', department: '사회환경공학부', name: '김상진', highSchool: '전곡고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '건국대학교', department: '전기전자공학부', name: '최수성', highSchool: '칠원고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '건국대학교', department: '경영학과', name: '이동욱', highSchool: '광주대동고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 동국대
    { university: '동국대학교', department: '열린전공학부', name: '배형민', highSchool: '오상고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '동국대학교', department: '열린전공학부', name: '한재영', highSchool: '광주광덕고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '동국대학교', department: '의료인공지능학과', name: '김현우', highSchool: '정현고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '동국대학교', department: '경영학부', name: '이지환', highSchool: '태원고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '동국대학교', department: '건축공학부', name: '김단현', highSchool: '한국디지털미디어고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 홍익대
    { university: '홍익대학교', department: '국어교육과', name: '이윤성', highSchool: '계양고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '홍익대학교', department: '법학과', name: '정민영', highSchool: '불당고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '홍익대학교', department: '자율전공(자연)', name: '조현준', highSchool: '포항동지고', tier: 'top', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 숙명여대
    { university: '숙명여자대학교', department: '신소재물리학부', name: '박채원', highSchool: '오류고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 국민대
    { university: '국민대학교', department: '기계공학부', name: '최태훈', highSchool: '영덕고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '국민대학교', department: '인문기술융합학부 자유전공', name: '김정완', highSchool: '가락고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 숭실대
    { university: '숭실대학교', department: '기계공학부', name: '김정완', highSchool: '가락고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 세종대
    { university: '세종대학교', department: '공학계열', name: '김남현', highSchool: '배재고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '세종대학교', department: '첨단융합계열', name: '김남', highSchool: '배재고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 단국대
    { university: '단국대학교', department: '퇴계혁신칼리지', name: '최지호', highSchool: '서울고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '단국대학교', department: '퇴계혁신칼리지', name: 'OOO', highSchool: '안법고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '단국대학교', department: '법학과', name: '길승현', highSchool: '운정고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 광운대
    { university: '광운대학교', department: '자율전공학부(자연)', name: '김도훈', highSchool: '광양제철고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 가톨릭대
    { university: '가톨릭대학교', department: '생명공학과', name: '박세은', highSchool: '진성고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '가톨릭대학교', department: '자연공학계열', name: '박수민', highSchool: '송도고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '가톨릭대학교', department: '자유전공학부', name: '최한서', highSchool: '풍산고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 서울과기대
    { university: '서울과학기술대', department: 'MSDE', name: '정현우', highSchool: '정현고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 가천대
    { university: '가천대학교', department: '법과대학', name: '이준규', highSchool: '오송고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '가천대학교', department: '반도체대학', name: '정세교', highSchool: '서라벌고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '가천대학교', department: '심리학과', name: '정우진', highSchool: '검정고시', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '가천대학교', department: '경영학과', name: '한지수', highSchool: '검정고시', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '가천대학교', department: 'AI 인문학부', name: '임해일', highSchool: '백석고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 아주대
    { university: '아주대학교', department: '심리학과', name: '문성환', highSchool: '검정고시', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '아주대학교', department: '디지털미디어학과', name: '황성환', highSchool: '삼괴고등학교', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '아주대학교', department: '첨단바이오융합대학', name: '김단현', highSchool: '한국디지털미디어고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 인하대
    { university: '인하대학교', department: '사회인프라공학과', name: '김선중', highSchool: '검정고시', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '인하대학교', department: '데이터사이언스학과', name: '이정훈', highSchool: '대일고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '인하대학교', department: '자연과학융합학부', name: '김태윤', highSchool: '가락고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '인하대학교', department: '체육교육과', name: '이성우', highSchool: '평촌고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 한국항공대
    { university: '한국항공대학교', department: 'AI자율주행시스템공학과', name: '최한서', highSchool: '풍산고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 부산대
    { university: '부산대학교', department: '미디어학과', name: '서구원', highSchool: '동천고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '부산대학교', department: '사회복지학과', name: '김태현', highSchool: '신정고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '부산대학교', department: '분자생물학과', name: '곽민성', highSchool: '강원고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '부산대학교', department: '자유전공학부', name: '곽창욱', highSchool: '학성고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '부산대학교', department: '통계학과', name: '최대원', highSchool: '부산대동고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 충북대
    { university: '충북대학교', department: '건축공학과', name: '전승주', highSchool: '대영고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '충북대학교', department: '지구환경과학과', name: '전승주', highSchool: '대영고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 경북대
    { university: '경북대학교', department: '행정학부', name: '이우성', highSchool: '김해율하고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: '공과대학 자율학부', name: '서건훈', highSchool: '성주고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: '섬유시스템공학과', name: '김태현', highSchool: '신정고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: '지구시스템과학부', name: '김유성', highSchool: '오산운암고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: '식물의학과', name: '김대원', highSchool: '마산중앙고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: '화학과', name: '손강민', highSchool: '검정고시', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: '정보컴퓨터교육과', name: '김도훈', highSchool: '광양제철고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '경북대학교', department: 'IT자율학부', name: '최대원', highSchool: '부산대동고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 한국외대(글로벌)
    { university: '한국외국어대학교(글로벌)', department: '생명공학과', name: '박세은', highSchool: '진성고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '한국외국어대학교(글로벌)', department: '자유전공학부(글로벌)', name: '김도현', highSchool: '면목고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 인천대
    { university: '인천대학교', department: '전자공학과', name: '홍성훈', highSchool: '시흥고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '인천대학교', department: '신소재공학과', name: '양재모', highSchool: '통영고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 공주대
    { university: '공주대학교', department: '수학교육과', name: '고병찬', highSchool: '공주고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 동아대
    { university: '동아대학교', department: '신소재공학과', name: '김민준', highSchool: '성의고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 대구가톨릭대
    { university: '대구가톨릭대학교', department: '자율전공', name: '김서원', highSchool: '동탄반송고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },

    // 농협대
    { university: '농협대학교', department: '', name: '김도훈', highSchool: '광양제철고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
    { university: '농협대학교', department: '', name: '배형민', highSchool: '오상고', tier: 'excellent', year: '2026', academy: 'SN독학기숙학원 양평점' },
  ];

  // 연도 필터 적용
  const yearFilteredData = yearFilter === 'all'
    ? admissionData
    : admissionData.filter(record => record.year === yearFilter);

  // 구분 필터 적용
  const filteredData = filter === 'all'
    ? yearFilteredData
    : yearFilteredData.filter(record => {
        if (filter === 'sky') return record.tier === 'sky';
        if (filter === 'medical') return record.tier === 'medical';
        if (filter === 'top') return record.tier === 'sky' || record.tier === 'medical' || record.tier === 'top';
        return true;
      });

  // 합격대학 기준 정렬
  const uniOrder: Record<string, number> = {
    '서울대학교': 1, '연세대학교': 2, '고려대학교': 3,
    'KAIST': 4, 'KENTECH': 5, 'DGIST': 6, 'GIST': 7, 'UNIST': 8,
    '서강대학교': 10, '성균관대학교': 11, '한양대학교': 12,
    '서울교육대학교': 15, '춘천교육대학교': 15, '공주교육대학교': 15, '진주교육대학교': 15, '한국교원대학교': 15,
    '경찰대학교': 16, '육군사관학교': 16, '해군사관학교': 16, '공군사관학교': 16,
    '중앙대학교': 20, '경희대학교': 21, '한국외국어대학교': 22, '서울시립대학교': 23, '이화여자대학교': 24,
    '홍익대학교': 25, '건국대학교': 30, '동국대학교': 31, '숙명여자대학교': 32, '국민대학교': 33,
    '숭실대학교': 34, '세종대학교': 35, '단국대학교': 36, '가톨릭대학교': 37, '성신여자대학교': 38,
    '광운대학교': 39, '명지대학교': 40, '상명대학교': 41, '서울여자대학교': 42, '한국체육대학교': 43,
    '한국외국어대학교(글로벌)': 44, '아주대학교': 45, '인하대학교': 46, '가천대학교': 47,
    '한양대학교(에리카)': 48, '서울과학기술대': 49, '서울과기대': 49, '한국항공대학교': 50,
    '부산대학교': 55, '경북대학교': 56, '전남대학교': 57, '충북대학교': 58, '충남대학교': 59,
    '인천대학교': 60, '공주대학교': 61, '동아대학교': 62, '대구가톨릭대학교': 63, '농협대학교': 64,
    '조선대학교': 65, '원광대학교': 66, '을지대학교': 67, '인제대학교': 68,
    '고신대학교': 69, '강원대학교': 70, '세명대학교': 71, '우석대학교': 72,
    '순천대학교': 73, '전북대학교': 74, '경상국립대학교': 75, '순천향대학교': 76,
    '영남대학교': 77, '제주대학교': 78,
  };
  const tierOrder: Record<string, number> = { medical: 0, sky: 1, top: 2, excellent: 3 };
  const medDeptOrder = (d: string) => {
    if (d.includes('의예과') && !d.includes('치의') && !d.includes('한의') && !d.includes('수의')) return 0;
    if (d.includes('치의예과')) return 1;
    if (d.includes('한의예과')) return 2;
    if (d.includes('약학') || d.includes('약과학')) return 3;
    if (d.includes('수의')) return 4;
    return 5;
  };
  const sortedData = [...filteredData].sort((a, b) => {
    const t = (tierOrder[a.tier] ?? 9) - (tierOrder[b.tier] ?? 9);
    if (t !== 0) return t;
    if (a.tier === 'medical') {
      const d = medDeptOrder(a.department) - medDeptOrder(b.department);
      if (d !== 0) return d;
    }
    return (uniOrder[a.university] ?? 99) - (uniOrder[b.university] ?? 99);
  });

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'sky':
        return <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">SKY</span>;
      case 'medical':
        return <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">의약학</span>;
      case 'top':
        return <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">주요대</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">우수</span>;
    }
  };

  // 통계 (연도 필터 적용)
  const stats = {
    total: yearFilteredData.length,
    sky: yearFilteredData.filter(r => r.tier === 'sky').length,
    medical: yearFilteredData.filter(r => r.tier === 'medical').length,
    seoul: yearFilteredData.filter(r => r.university === '서울대학교').length,
    yonsei: yearFilteredData.filter(r => r.university === '연세대학교').length,
    korea: yearFilteredData.filter(r => r.university === '고려대학교').length,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1f2e] to-[#2d3748] text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 bg-sn-green/20 text-sn-green-light text-sm font-medium rounded-full mb-6">
              Admission Results
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              입결 데이터
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              SN 독학기숙학원 출신 학생들의 합격 현황입니다.
            </p>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-white">{stats.seoul}</p>
              <p className="text-gray-300 text-sm mt-1">서울대</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-white">{stats.yonsei}</p>
              <p className="text-gray-300 text-sm mt-1">연세대</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-white">{stats.korea}</p>
              <p className="text-gray-300 text-sm mt-1">고려대</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-white">{stats.medical}</p>
              <p className="text-gray-300 text-sm mt-1">의약학계열</p>
            </div>
          </div>
        </div>
      </section>

      {/* 필터 및 테이블 섹션 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* 연도 필터 */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setYearFilter('2026')}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition-all ${
                yearFilter === '2026'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              2026학년도
            </button>
            <button
              onClick={() => setYearFilter('2025')}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition-all ${
                yearFilter === '2025'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              2025학년도
            </button>
            <button
              onClick={() => setYearFilter('all')}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition-all ${
                yearFilter === 'all'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              전체
            </button>
          </div>

          {/* 구분 필터 버튼 */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                filter === 'all'
                  ? 'bg-sn-green text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              전체 ({stats.total})
            </button>
            <button
              onClick={() => setFilter('sky')}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                filter === 'sky'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              SKY ({stats.sky})
            </button>
            <button
              onClick={() => setFilter('medical')}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                filter === 'medical'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              의약학 ({stats.medical})
            </button>
            <button
              onClick={() => setFilter('top')}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                filter === 'top'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              주요대학
            </button>
          </div>

          {/* 테이블 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-6 py-4 text-left font-semibold">대학교</th>
                    <th className="px-6 py-4 text-left font-semibold">학과</th>
                    <th className="px-6 py-4 text-left font-semibold">이름</th>
                    <th className="px-6 py-4 text-left font-semibold">출신고</th>
                    <th className="px-6 py-4 text-left font-semibold">출신학원</th>
                    <th className="px-6 py-4 text-center font-semibold">구분</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((record, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 hover:bg-sn-green/5 transition-colors ${
                        record.tier === 'sky' ? 'bg-blue-50/30' :
                        record.tier === 'medical' ? 'bg-red-50/30' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          record.university.includes('서울대') ? 'text-blue-700' :
                          record.university.includes('연세대') ? 'text-blue-600' :
                          record.university.includes('고려대') ? 'text-red-700' :
                          'text-gray-800'
                        }`}>
                          {record.university}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{record.department}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{maskName(record.name)}</td>
                      <td className="px-6 py-4 text-gray-500">{maskHighSchool(record.highSchool)}</td>
                      <td className="px-6 py-4 text-sn-green font-medium">{record.academy || '베스티안 분당점'}</td>
                      <td className="px-6 py-4 text-center">{getTierBadge(record.tier)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              * 본 데이터는 SN 독학기숙학원 수강생 중 합격 사실을 공개 동의한 학생들의 정보입니다.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              * 개인정보 보호를 위해 출신 고등학교명 일부를 마스킹 처리하였습니다.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-sn-green/10 to-sn-green-light/10 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                다음 합격의 주인공이 되세요
              </h3>
              <p className="text-gray-600 mb-6">
                체계적인 AI 기반 학습 관리 시스템으로 목표 대학 합격을 향해 함께 나아갑니다.
              </p>
              <a
                href="/programs#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sn-green text-white font-medium rounded-lg hover:bg-sn-green/90 transition-colors"
              >
                상담 신청하기
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
