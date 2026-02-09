import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

// 잔디 웹훅 URL (온라인 원서접수용)
const JANDI_WEBHOOK_URL = 'https://wh.jandi.com/connect-api/webhook/33175090/15ebb052652650d7bb2807253ef3c304';

// 외부 DB 포워딩 URL
const STUDENT_WEB_API_URL = process.env.STUDENT_WEB_API_URL;

interface ApplicationData {
  // 입학정보
  program: string;
  studentName: string;
  studentBirthDate: string;
  school: string;
  parentPhone: string;
  parentName: string;
  studentPhone: string;
  cashReceiptPhone: string;
  email: string;
  // 성적정보
  examType: string;
  subjects: string;
  grades: string;
  scores: string;
  // 내신정보
  naesinGrade: string;
  // 기타
  concerns: string;
  memo: string;
  // 파일 링크
  fileUrl?: string;
}

// Google Auth 생성 함수
function getGoogleAuth(scopes: string[]) {
  let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error('Google credentials not configured');
  }

  privateKey = privateKey
    .replace(/\\\\n/g, '\n')
    .replace(/\\n/g, '\n');

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes,
  });
}

// Google Drive에 파일 업로드
async function uploadToGoogleDrive(
  file: File,
  studentName: string,
  school: string,
  examType: string
): Promise<string | null> {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!folderId) {
    console.error('Google Drive folder ID not configured');
    return null;
  }

  try {
    const auth = getGoogleAuth([
      'https://www.googleapis.com/auth/drive.file',
    ]);

    const drive = google.drive({ version: 'v3', auth });

    // 파일 이름 생성: 학생이름_학교_시험종류_날짜.확장자
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const extension = file.name.split('.').pop() || 'pdf';
    const sanitizedName = studentName.replace(/[/\\?%*:|"<>]/g, '_');
    const sanitizedSchool = school.replace(/[/\\?%*:|"<>]/g, '_');
    const sanitizedExam = (examType || '성적표').replace(/[/\\?%*:|"<>]/g, '_');
    const fileName = `${sanitizedName}_${sanitizedSchool}_${sanitizedExam}_${dateStr}.${extension}`;

    // File을 Buffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Buffer를 Stream으로 변환
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType: file.type || 'application/octet-stream',
        body: stream,
      },
      fields: 'id, webViewLink',
      supportsAllDrives: true,  // 공유 드라이브 지원
    });

    console.log('Google Drive upload successful:', response.data.id);

    // 파일 링크 반환
    return response.data.webViewLink || `https://drive.google.com/file/d/${response.data.id}/view`;
  } catch (error) {
    console.error('Google Drive upload error:', error);
    return null;
  }
}

async function appendToGoogleSheets(data: ApplicationData) {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error('Google Spreadsheet ID not configured');
  }

  const auth = getGoogleAuth(['https://www.googleapis.com/auth/spreadsheets']);
  const sheets = google.sheets({ version: 'v4', auth });

  const now = new Date();
  const timestamp = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  const values = [
    [
      timestamp,
      data.program || '-',  // 프로그램 선택
      data.studentName,
      data.studentBirthDate,
      data.school,
      data.parentName,
      data.parentPhone,
      data.studentPhone || '-',
      data.cashReceiptPhone || '-',
      data.email || '-',
      data.examType || '-',
      data.subjects || '-',
      data.grades || '-',
      data.scores || '-',
      data.naesinGrade || '-',
      data.concerns || '-',
      data.memo || '-',
      data.fileUrl || '-',  // 성적표 파일 링크
    ],
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'application!A:R',  // R열까지 (프로그램 추가)
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    console.log('Google Sheets append successful (application)');
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

async function sendToJandi(data: ApplicationData) {
  const jandiPayload = {
    body: '📋 새로운 온라인 원서접수가 접수되었습니다!',
    connectColor: '#4CAF50',
    connectInfo: [
      {
        title: '📌 프로그램',
        description: data.program || '미선택',
      },
      {
        title: '👤 학생 정보',
        description: `이름: ${data.studentName}\n생년월일: ${data.studentBirthDate}\n학교: ${data.school}`,
      },
      {
        title: '👨‍👩‍👧 보호자 정보',
        description: `성명: ${data.parentName}\n연락처: ${data.parentPhone}`,
      },
      {
        title: '📊 성적정보',
        description: `시험: ${data.examType || '미입력'}\n과목: ${data.subjects || '미입력'}\n등급: ${data.grades || '미입력'}`,
      },
      ...(data.naesinGrade ? [{
        title: '📚 내신',
        description: `${data.naesinGrade}등급`,
      }] : []),
      ...(data.concerns ? [{
        title: '💭 현재 고민',
        description: data.concerns,
      }] : []),
      ...(data.memo ? [{
        title: '📝 기타/메모',
        description: data.memo,
      }] : []),
      ...(data.fileUrl ? [{
        title: '📎 성적표',
        description: data.fileUrl,
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

async function forwardToStudentWeb(data: ApplicationData) {
  if (!STUDENT_WEB_API_URL) {
    console.log('STUDENT_WEB_API_URL not configured, skipping forward');
    return;
  }

  const response = await fetch(`${STUDENT_WEB_API_URL}/api/application`, {
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
  console.log('=== Application API called ===');

  try {
    const contentType = request.headers.get('content-type') || '';

    let data: ApplicationData;
    let file: File | null = null;

    // FormData 또는 JSON 처리
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();

      // 파일 추출
      const fileField = formData.get('file');
      if (fileField && fileField instanceof File && fileField.size > 0) {
        file = fileField;
      }

      // 데이터 추출
      data = {
        program: formData.get('program') as string || '',
        studentName: formData.get('studentName') as string || '',
        studentBirthDate: formData.get('studentBirthDate') as string || '',
        school: formData.get('school') as string || '',
        parentPhone: formData.get('parentPhone') as string || '',
        parentName: formData.get('parentName') as string || '',
        studentPhone: formData.get('studentPhone') as string || '',
        cashReceiptPhone: formData.get('cashReceiptPhone') as string || '',
        email: formData.get('email') as string || '',
        examType: formData.get('examType') as string || '',
        subjects: formData.get('subjects') as string || '',
        grades: formData.get('grades') as string || '',
        scores: formData.get('scores') as string || '',
        naesinGrade: formData.get('naesinGrade') as string || '',
        concerns: formData.get('concerns') as string || '',
        memo: formData.get('memo') as string || '',
      };
    } else {
      // 기존 JSON 처리 (하위 호환)
      data = await request.json();
    }

    console.log('Application data received:', {
      name: data.studentName,
      phone: data.parentPhone,
      school: data.school,
      hasFile: !!file,
    });

    // 필수 필드 검증
    if (!data.studentName || !data.parentPhone || !data.parentName || !data.school || !data.studentBirthDate) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 파일이 있으면 Google Drive에 업로드
    if (file) {
      const fileUrl = await uploadToGoogleDrive(
        file,
        data.studentName,
        data.school,
        data.examType
      );
      if (fileUrl) {
        data.fileUrl = fileUrl;
      }
    }

    // 병렬로 잔디, 구글 시트, 외부 DB에 전송
    const results = await Promise.allSettled([
      sendToJandi(data),
      appendToGoogleSheets(data),
      forwardToStudentWeb(data),
    ]);

    // 결과 확인
    const jandiResult = results[0];
    const sheetsResult = results[1];
    const forwardResult = results[2];

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

    if (forwardResult.status === 'rejected') {
      console.error('Student Web forward failed:', forwardResult.reason);
    }

    // 잔디와 시트 둘 다 실패한 경우에만 에러 반환
    if (jandiResult.status === 'rejected' && sheetsResult.status === 'rejected') {
      return NextResponse.json(
        { error: '신청 처리 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      fileUrl: data.fileUrl,
      debug: {
        jandiStatus: jandiResult.status,
        sheetsStatus: sheetsResult.status,
        sheetsError: sheetsResult.status === 'rejected' ? (sheetsResult.reason as Error).message : null,
        forwardStatus: forwardResult.status,
        forwardError: forwardResult.status === 'rejected' ? (forwardResult.reason as Error).message : null,
      }
    });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      {
        error: '신청 처리 중 오류가 발생했습니다.',
        debug: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
