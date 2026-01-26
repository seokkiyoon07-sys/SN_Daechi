import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// 잔디 웹훅 URL
const JANDI_WEBHOOK_URL = 'https://wh.jandi.com/connect-api/webhook/13116580/11853050951612bffd7a7748a2fab30e';

interface ConsultationData {
  name: string;
  phone: string;
  email?: string;
  studentGrade: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

async function appendToGoogleSheets(data: ConsultationData) {
  let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  if (!privateKey || !clientEmail || !spreadsheetId) {
    console.error('Google Sheets credentials missing:', {
      hasPrivateKey: !!privateKey,
      hasClientEmail: !!clientEmail,
      hasSpreadsheetId: !!spreadsheetId,
    });
    throw new Error(`Google Sheets credentials not configured`);
  }

  // Private key 처리 - 여러 형식 지원
  // 1. JSON 이스케이프된 형식: \\n -> \n
  // 2. 리터럴 \n 문자열: \n -> 실제 줄바꿈
  privateKey = privateKey
    .replace(/\\\\n/g, '\n')  // \\n -> \n (JSON 이스케이프)
    .replace(/\\n/g, '\n');   // \n -> 실제 줄바꿈

  // 디버깅: 키 형식 확인
  console.log('Private key debug:', {
    startsWithBegin: privateKey.startsWith('-----BEGIN'),
    endsWithEnd: privateKey.includes('-----END'),
    hasNewlines: privateKey.includes('\n'),
    length: privateKey.length,
  });

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const now = new Date();
  const timestamp = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  const values = [
    [
      timestamp,
      data.name,
      data.phone,
      data.email || '',
      data.studentGrade,
      data.preferredDate,
      data.preferredTime,
      data.message || '',
    ],
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'reservation!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    console.log('Google Sheets append successful');
  } catch (error) {
    const e = error as Error & { code?: number; response?: { data?: unknown } };
    console.error('Google Sheets API error:', {
      message: e.message,
      code: e.code,
      responseData: e.response?.data,
    });
    throw error;
  }
}

async function sendToJandi(data: ConsultationData) {
  const jandiPayload = {
    body: '새로운 방문 상담 신청이 접수되었습니다.',
    connectColor: '#2E7D32',
    connectInfo: [
      {
        title: '신청자 정보',
        description: `이름: ${data.name}\n연락처: ${data.phone}${data.email ? `\n이메일: ${data.email}` : ''}`,
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

export async function POST(request: NextRequest) {
  try {
    const data: ConsultationData = await request.json();

    // 필수 필드 검증
    if (!data.name || !data.phone || !data.studentGrade || !data.preferredDate || !data.preferredTime) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 병렬로 잔디와 구글 시트에 전송
    const results = await Promise.allSettled([
      sendToJandi(data),
      appendToGoogleSheets(data),
    ]);

    // 결과 확인
    const jandiResult = results[0];
    const sheetsResult = results[1];

    if (jandiResult.status === 'rejected') {
      console.error('Jandi webhook failed:', jandiResult.reason);
    }

    if (sheetsResult.status === 'rejected') {
      const error = sheetsResult.reason as Error & { code?: number; status?: number };
      console.error('Google Sheets failed:', {
        message: error.message,
        code: error.code,
        status: error.status,
        stack: error.stack,
      });
    }

    // 둘 다 실패한 경우에만 에러 반환
    if (jandiResult.status === 'rejected' && sheetsResult.status === 'rejected') {
      return NextResponse.json(
        { error: '신청 처리 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Consultation submission error:', error);
    return NextResponse.json(
      { error: '신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
