import { NextRequest, NextResponse } from 'next/server';

// 잔디 웹훅 URL
const JANDI_WEBHOOK_URL = process.env.JANDI_WEBHOOK_URL;

// 외부 DB 포워딩 URL
const STUDENT_WEB_API_URL = process.env.STUDENT_WEB_API_URL;

interface ConsultationData {
  name: string;
  gender: string;
  phone: string;
  email?: string;
  studentGrade: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

async function sendToJandi(data: ConsultationData) {
  if (!JANDI_WEBHOOK_URL) {
    throw new Error('JANDI_WEBHOOK_URL not configured');
  }

  const jandiPayload = {
    body: '새로운 방문 상담 신청이 접수되었습니다.',
    connectColor: '#2E7D32',
    connectInfo: [
      {
        title: '신청자 정보',
        description: `이름: ${data.name}\n성별: ${data.gender}\n연락처: ${data.phone}${data.email ? `\n이메일: ${data.email}` : ''}`,
      },
      {
        title: '학생 정보',
        description: `학년/상태: ${data.studentGrade}`,
      },
      {
        title: '희망 방문 일시',
        description: `${data.preferredDate} ${data.preferredTime}`,
      },
      ...(data.message ? [{
        title: '문의 내용',
        description: data.message,
      }] : []),
    ],
  };

  const response = await fetch(JANDI_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.tosslab.jandi-v2+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jandiPayload),
  });

  if (!response.ok) {
    throw new Error('Failed to send to Jandi');
  }
}

async function forwardToStudentWeb(data: ConsultationData) {
  if (!STUDENT_WEB_API_URL) {
    console.log('STUDENT_WEB_API_URL not configured, skipping forward');
    return;
  }

  const response = await fetch(`${STUDENT_WEB_API_URL}/app/api/consultation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Student Web API failed (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  console.log('Student Web API forward successful:', result);
  return result;
}

export async function POST(request: NextRequest) {
  console.log('=== Consultation API called ===');

  try {
    const data: ConsultationData = await request.json();
    console.log('Request data received:', { name: data.name, phone: data.phone });

    // 필수 필드 검증
    if (!data.name || !['남', '여'].includes(data.gender) || !data.phone || !data.studentGrade || !data.preferredDate || !data.preferredTime) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 병렬로 잔디와 외부 DB에 전송
    const results = await Promise.allSettled([
      sendToJandi(data),
      forwardToStudentWeb(data),
    ]);

    // 결과 확인
    const jandiResult = results[0];
    const forwardResult = results[1];

    if (jandiResult.status === 'rejected') {
      console.error('Jandi webhook failed:', jandiResult.reason);
    }

    if (forwardResult.status === 'rejected') {
      console.error('Student Web forward failed:', forwardResult.reason);
    }

    if (jandiResult.status === 'rejected' && forwardResult.status === 'rejected') {
      return NextResponse.json(
        { error: '신청 처리 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      debug: {
        jandiStatus: jandiResult.status,
        forwardStatus: forwardResult.status,
        forwardError: forwardResult.status === 'rejected' ? (forwardResult.reason as Error).message : null,
      }
    });
  } catch (error) {
    console.error('Consultation submission error:', error);
    return NextResponse.json(
      {
        error: '신청 처리 중 오류가 발생했습니다.',
        debug: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
