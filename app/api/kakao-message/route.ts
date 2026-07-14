import { NextRequest, NextResponse } from 'next/server';

const JANDI_WEBHOOK_URL = process.env.JANDI_WEBHOOK_URL;
const KAKAO_SKILL_SECRET = process.env.KAKAO_SKILL_SECRET;

interface KakaoSkillPayload {
  bot?: {
    id?: string;
    name?: string;
  };
  userRequest?: {
    utterance?: string;
    timezone?: string;
    user?: {
      id?: string;
      type?: string;
      properties?: Record<string, string>;
    };
  };
}

function kakaoResponse(text: string) {
  return NextResponse.json({
    version: '2.0',
    template: {
      outputs: [
        {
          simpleText: { text },
        },
      ],
    },
  });
}

export async function POST(request: NextRequest) {
  const requestSecret = request.nextUrl.searchParams.get('secret');

  if (!KAKAO_SKILL_SECRET || requestSecret !== KAKAO_SKILL_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!JANDI_WEBHOOK_URL) {
    console.error('JANDI_WEBHOOK_URL not configured');
    return kakaoResponse('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }

  try {
    const payload = (await request.json()) as KakaoSkillPayload;
    const message = payload.userRequest?.utterance?.trim();
    const userId = payload.userRequest?.user?.id;

    if (!message) {
      return kakaoResponse('문의 내용을 입력해주세요.');
    }

    const jandiResponse = await fetch(JANDI_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.tosslab.jandi-v2+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: '카카오톡 채널에 새 문의가 도착했습니다.',
        connectColor: '#FEE500',
        connectInfo: [
          {
            title: '문의 내용',
            description: message,
          },
          {
            title: '카카오 사용자 ID',
            description: userId || '확인 불가',
          },
        ],
      }),
      signal: AbortSignal.timeout(4_000),
    });

    if (!jandiResponse.ok) {
      throw new Error(`Jandi webhook failed (${jandiResponse.status})`);
    }

    return kakaoResponse('문의가 접수되었습니다. 상담원이 확인 후 답변드리겠습니다.');
  } catch (error) {
    console.error('Kakao message forwarding failed:', error);
    return kakaoResponse('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
}
