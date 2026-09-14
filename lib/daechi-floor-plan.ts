import type { SeatData } from '@/components/floor-plan/types';

export const DEFAULT_ENABLED_LAYERS_DAECHI = new Set([
  'A2310-XR.PLAN(변경)$0$A-CON',
  'A2310-XR.PLAN(변경)$0$A-CORE-Elev',
  'A2310-XR.PLAN(변경)$0$A-CORE-STRS',
  'A2310-XR.PLAN(변경)$0$A-FIN',
  'A2310-XR.PLAN(변경)$0$A-FIN-8',
  'A2310-XR.PLAN(변경)$0$A-FUR-MECH',
  'A2310-XR.PLAN(변경)$0$A-INS',
  'A2310-XR.PLAN(변경)$0$A-SYM-LEAD',
  'A2310-XR.PLAN(변경)$0$A-WALL',
  'A2310-XR.PLAN(변경)$0$A-WIN',
  'ETC',
  'PB DIM+텍스트',
  'ston',
  '외벽+천정보',
]);

export function generate3FSeats(): SeatData[] {
  const p1X = 128010 - 3072;
  const p1Y = 252015;
  const rowGap = (252015 - 248154) / 3;
  const colGap = 1800;
  const blockGap = 3200;

  const seats: SeatData[] = [];

  // 블록 시작 X 좌표
  const blockStartX = [
    p1X,
    p1X + blockGap,
    p1X + blockGap * 2,
    p1X + blockGap * 3,
    p1X + blockGap * 4,
    p1X + blockGap * 5,
  ];

  // P1~P42 배치
  for (let block = 0; block < 6; block++) {
    const startNum = block * 8 + 1;
    // 왼쪽 열
    for (let row = 0; row < 4; row++) {
      if (startNum + row <= 42) {
        const seatNum = startNum + row;
        let pOffset = 0;
        if (seatNum >= 9 && seatNum <= 12) pOffset = -150;
        else if (seatNum >= 17 && seatNum <= 20) pOffset = -180;
        else if (seatNum >= 21 && seatNum <= 24) pOffset = -250;
        else if (seatNum >= 25 && seatNum <= 28) pOffset = -150;
        seats.push({
          id: `P${seatNum}`,
          x: blockStartX[block] + pOffset,
          y: p1Y - row * rowGap,
        });
      }
    }
    // 오른쪽 열
    const colOffset = -640;
    for (let row = 0; row < 4; row++) {
      if (startNum + 4 + row <= 42) {
        seats.push({
          id: `P${startNum + 4 + row}`,
          x: blockStartX[block] + colGap + colOffset,
          y: p1Y - row * rowGap,
        });
      }
    }
  }

  // W1~W15
  const wBaseY = 248188 - rowGap * 2;
  const wStartX = p1X;
  const w1X = wStartX + -896;
  const w5X = wStartX + 4 * (1400 * 0.45) + 1408;
  const w1to5Gap = (w5X - w1X) / 4;
  const wOffsetY = 1072;

  for (let i = 0; i < 15; i++) {
    let xPos;
    if (i < 5) {
      xPos = w1X + i * w1to5Gap;
    } else if (i === 5) {
      xPos = w5X + 1200 + 1595;
    } else {
      const w6StartX = w5X + 1200 + 1360;
      const wOffsets: Record<number, number> = { 6: 175, 7: 150, 8: 130, 9: 110 };
      const offset = wOffsets[i] || 0;
      xPos = w6StartX + (i - 5) * 1200 + offset;
    }
    seats.push({
      id: `W${i + 1}`,
      x: xPos,
      y: wBaseY + wOffsetY,
    });
  }

  return seats;
}

export function generate4FSeats(): SeatData[] {
  const baseX = 130000;
  const baseY = 222000;
  const gap = 1500;

  const seats: SeatData[] = [];

  // W16~W28 (13개)
  for (let i = 0; i < 13; i++) {
    seats.push({
      id: `W${16 + i}`,
      x: baseX + (i % 7) * gap,
      y: baseY - Math.floor(i / 7) * gap,
      isVertical: i < 4, // W16~W19는 세로
    });
  }

  // P43~P68 (26개)
  for (let i = 0; i < 26; i++) {
    seats.push({
      id: `P${43 + i}`,
      x: baseX + (i % 7) * gap,
      y: baseY - 3000 - Math.floor(i / 7) * gap,
    });
  }

  // V1~V5 (5개)
  for (let i = 0; i < 5; i++) {
    seats.push({
      id: `V${1 + i}`,
      x: baseX + i * gap,
      y: baseY - 9000,
    });
  }

  return seats;
}
