'use client';

import { DEFAULT_ENABLED_LAYERS_DAECHI, generate3FSeats, generate4FSeats } from '@/lib/daechi-floor-plan';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Button, Checkbox } from './controls';
import { RotateCcw, Layers, Trash2, Undo2, Download, Crosshair, X, Copy } from 'lucide-react';
// 대치점 도면
import daechiPlan3F from '@/data/daechi_3f_plan.json';
import daechiPlan4F from '@/data/daechi_4f_plan.json';
// 양평점 도면
import yangpyeongPlan1F from '@/data/sn_dorm_1f_plan.json';
import yangpyeongPlan2F from '@/data/sn_dorm_2f_plan.json';
import SeatLayer from './SeatLayer';
import type { FloorPlanViewerProps, PlanJSON, SeatData, LabelData } from './types';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// 기본 ON 레이어 목록 (대치점)


// 기본 ON 레이어 목록 (양평점 1층)
const DEFAULT_ENABLED_LAYERS_YANGPYEONG_1F = new Set([
  '0',
  'COL',
  'ETC',
  'PB DIM+텍스트',
  '내벽+마감선',
  '천정히든+해치',
]);

// 기본 ON 레이어 목록 (양평점 2층)
const DEFAULT_ENABLED_LAYERS_YANGPYEONG_2F = new Set([
  '0',
  'COL',
  'ETC',
  'PB DIM+텍스트',
  'DIM+텍스트',
  'dim+텍스트',
  '내벽+마감선',
  '천정히든+해치',
  'ston',
  'arc',
]);

// 지점/층별 기본 레이어 반환
function getDefaultEnabledLayers(branch: string, floor: string): Set<string> {
  if (branch === 'yangpyeong') {
    if (floor === '1') return DEFAULT_ENABLED_LAYERS_YANGPYEONG_1F;
    if (floor === '2') return DEFAULT_ENABLED_LAYERS_YANGPYEONG_2F;
    return DEFAULT_ENABLED_LAYERS_YANGPYEONG_1F;
  }
  return DEFAULT_ENABLED_LAYERS_DAECHI;
}

// ============================================================================
// 양평점 독서실 영역 정의
// ============================================================================
interface StudyRoomArea {
  id: string;
  name: string;
  floor: '1' | '2';
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  clipBounds?: { minX: number; maxX: number; minY: number; maxY: number }; // 하드코딩된 클리핑 영역
}

// 양평점 1층 독서실 (6,7,8,9독)
const YANGPYEONG_1F_STUDY_ROOMS: StudyRoomArea[] = [
  {
    id: 'room6',
    name: '6독서실',
    floor: '1',
    bounds: { minX: 135401, maxX: 146060, minY: 238565, maxY: 245741 },
    clipBounds: { minX: 135412, maxX: 145943, minY: 238644, maxY: 245734 }, // 하드코딩
  },
  {
    id: 'room7',
    name: '7독서실',
    floor: '1',
    bounds: { minX: 125010, maxX: 135488, minY: 238579, maxY: 245895 },
    clipBounds: { minX: 125010, maxX: 135400, minY: 238640, maxY: 245772 }, // 하드코딩
  },
  {
    id: 'room8',
    name: '8독서실',
    floor: '1',
    bounds: { minX: 124957, maxX: 135274, minY: 247760, maxY: 255344 },
    clipBounds: { minX: 125011, maxX: 135262, minY: 247785, maxY: 255317 },
  },
  {
    id: 'room9',
    name: '9독서실',
    floor: '1',
    bounds: { minX: 135254, maxX: 140435, minY: 247704, maxY: 255354 },
    clipBounds: { minX: 135270, maxX: 140326, minY: 247704, maxY: 255324 },
  },
];

// 양평점 2층 독서실 (1,2,3,4,5독)
const YANGPYEONG_2F_STUDY_ROOMS: StudyRoomArea[] = [
  {
    id: 'room1',
    name: '1독서실',
    floor: '2',
    bounds: { minX: 143001, maxX: 151403, minY: 206481, maxY: 213682 },
    clipBounds: { minX: 143019, maxX: 151395, minY: 206481, maxY: 213616 },
  },
  {
    id: 'room2',
    name: '2독서실',
    floor: '2',
    bounds: { minX: 125241, maxX: 135543, minY: 206476, maxY: 213706 },
    clipBounds: { minX: 125095, maxX: 135534, minY: 206492, maxY: 213658 },
  },
  {
    id: 'room3',
    name: '3독서실',
    floor: '2',
    bounds: { minX: 124649, maxX: 135487, minY: 215340, maxY: 223380 },
    clipBounds: { minX: 124649, maxX: 135458, minY: 215528, maxY: 223343 },
  },
  {
    id: 'room4',
    name: '4독서실',
    floor: '2',
    bounds: { minX: 135365, maxX: 140332, minY: 215523, maxY: 223417 },
    clipBounds: { minX: 135391, maxX: 140332, minY: 215523, maxY: 223385 },
  },
  {
    id: 'room5',
    name: '5독서실',
    floor: '2',
    bounds: { minX: 140329, maxX: 150802, minY: 215494, maxY: 223405 },
    clipBounds: { minX: 140330, maxX: 150771, minY: 215555, maxY: 223263 },
  },
];

// 지점/층별 독서실 목록 반환
function getStudyRooms(branch: string, floor: string): StudyRoomArea[] {
  if (branch === 'yangpyeong') {
    if (floor === '1') return YANGPYEONG_1F_STUDY_ROOMS;
    if (floor === '2') return YANGPYEONG_2F_STUDY_ROOMS;
  }
  return [];
}

// 3층 좌석 데이터 생성


// 3층 범례/라벨 데이터
function generate3FLabels(): LabelData[] {
  const legendX = 133000;
  const legendY = 259800;
  const legendGap = 800;

  return [
    { id: 'legend-open', label: '오픈형 좌석', sub: 'P1 ~ P42', x: legendX, y: legendY },
    { id: 'legend-window', label: '윈도우 좌석', sub: 'W1 ~ W15', x: legendX, y: legendY - legendGap },
    { id: 'legend-standing', label: '스텐딩 책상', sub: '', x: legendX, y: legendY - legendGap * 2 },
    { id: 'label-coaching1', label: '비즈니스룸 1', sub: '', x: legendX, y: legendY - legendGap * 3 },
    { id: 'label-coaching2', label: '비즈니스룸 2', sub: '', x: legendX, y: legendY - legendGap * 4 },
    { id: 'label-infodesk', label: '인포데스크', sub: '', x: legendX, y: legendY - legendGap * 5 },
    { id: 'label-restroom1', label: '화장실1', sub: '', x: legendX, y: legendY - legendGap * 6 },
    { id: 'label-restroom2', label: '화장실2', sub: '', x: legendX, y: legendY - legendGap * 7 },
    { id: 'label-elevator', label: '엘리베이터', sub: '', x: legendX, y: legendY - legendGap * 8 },
    { id: 'label-phone-locker', label: '핸드폰 보관함', sub: '', x: legendX, y: legendY - legendGap * 9 },
  ];
}

// 4층 좌석 데이터 생성


// 4층 범례/라벨 데이터
function generate4FLabels(): LabelData[] {
  const legendX = 130000;
  const legendY = 228000;
  const legendGap = 800;

  return [
    { id: 'legend-4f-open', label: '오픈형 좌석', sub: 'P43 ~ P68', x: legendX, y: legendY },
    { id: 'legend-4f-window', label: '윈도우 좌석', sub: 'W16 ~ W28', x: legendX, y: legendY - legendGap },
    { id: 'legend-4f-vip', label: 'VIP석', sub: 'V1 ~ V5', x: legendX, y: legendY - legendGap * 2 },
    { id: 'label-4f-printcafe', label: '프린트카페', sub: '', x: legendX, y: legendY - legendGap * 3 },
    { id: 'label-4f-classroom', label: '수학교습소', sub: '', x: legendX, y: legendY - legendGap * 4 },
    { id: 'label-4f-printer', label: '프린터', sub: '', x: legendX, y: legendY - legendGap * 5 },
    { id: 'label-4f-restroom1', label: '화장실1', sub: '', x: legendX, y: legendY - legendGap * 6 },
    { id: 'label-4f-restroom2', label: '화장실2', sub: '', x: legendX, y: legendY - legendGap * 7 },
    { id: 'label-4f-standing', label: '스텐딩 책상', sub: '', x: legendX, y: legendY - legendGap * 8 },
  ];
}

// ============================================================================
// 양평점 (SN독학기숙학원) 좌석/라벨 데이터
// ============================================================================

// 양평점 1층 좌석 데이터
function generateYangpyeong1FSeats(): SeatData[] {
  // 6독서실 기준점 (bounds 중심 기준으로 offset 변환)
  // room6 bounds: { minX: 135401, maxX: 146060, minY: 238565, maxY: 245741 }
  const baseX = 135401;
  const baseY = 242153; // 중심 Y 좌표 (238565 + 245741) / 2

  // 6독서실 좌석 (offset을 절대 좌표로 변환)
  const room6Seats: SeatData[] = [
    { id: '6-1', x: baseX + 9744, y: baseY + 560, isVertical: true },
    { id: '6-2', x: baseX + 9748, y: baseY + 1567, isVertical: true },
    { id: '6-3', x: baseX + 9748, y: baseY + 2561, isVertical: true },
    { id: '6-4', x: baseX + 9748, y: baseY + 3587, isVertical: true },
    { id: '6-5', x: baseX + 9724, y: baseY + 4566, isVertical: true },
    { id: '6-6', x: baseX + 7500, y: baseY - 934, isVertical: true },
    { id: '6-7', x: baseX + 7516, y: baseY + 60, isVertical: true },
    { id: '6-8', x: baseX + 7523, y: baseY + 1070, isVertical: true },
    { id: '6-9', x: baseX + 7523, y: baseY + 2049, isVertical: true },
    { id: '6-10', x: baseX + 7524, y: baseY + 3059, isVertical: true },
    { id: '6-11', x: baseX + 6880, y: baseY - 1929, isVertical: true },
    { id: '6-12', x: baseX + 6880, y: baseY - 949, isVertical: true },
    { id: '6-13', x: baseX + 6880, y: baseY + 60, isVertical: true },
    { id: '6-14', x: baseX + 6880, y: baseY + 1055, isVertical: true },
    { id: '6-15', x: baseX + 6880, y: baseY + 2064, isVertical: true },
    { id: '6-16', x: baseX + 4934, y: baseY - 2426, isVertical: true },
    { id: '6-17', x: baseX + 4934, y: baseY - 1431, isVertical: true },
    { id: '6-18', x: baseX + 4926, y: baseY - 437, isVertical: true },
    { id: '6-19', x: baseX + 4934, y: baseY + 558, isVertical: true },
    { id: '6-20', x: baseX + 2709, y: baseY - 3722, isVertical: true },
    { id: '6-21', x: baseX + 2717, y: baseY - 2727, isVertical: true },
    { id: '6-22', x: baseX + 2749, y: baseY - 1748, isVertical: true },
    { id: '6-23', x: baseX + 2717, y: baseY - 738, isVertical: true },
    { id: '6-24', x: baseX + 2717, y: baseY + 256, isVertical: true },
    { id: '6-25', x: baseX + 2066, y: baseY - 4731, isVertical: true },
    { id: '6-26', x: baseX + 2089, y: baseY - 3737, isVertical: true },
    { id: '6-27', x: baseX + 2074, y: baseY - 2742, isVertical: true },
    { id: '6-28', x: baseX + 2089, y: baseY - 1748, isVertical: true },
    { id: '6-29', x: baseX + 2081, y: baseY - 723, isVertical: true },
    { id: '6-30', x: baseX - 111, y: baseY - 5153, isVertical: true },
    { id: '6-31', x: baseX - 119, y: baseY - 4174, isVertical: true },
    { id: '6-32', x: baseX - 111, y: baseY - 3149, isVertical: true },
    { id: '6-33', x: baseX - 119, y: baseY - 2170, isVertical: true },
    { id: '6-34', x: baseX - 135, y: baseY - 1175, isVertical: true },
  ];

  // 7독서실 기준점
  // room7 bounds: { minX: 125010, maxX: 135488, minY: 238579, maxY: 245895 }
  const base7X = 125010;
  const base7Y = 242237; // 중심 Y 좌표 (238579 + 245895) / 2

  // 7독서실 좌석 (7-1 ~ 7-34, 세로 방향)
  // 6독서실과 유사한 배치로 초기 생성 (사용자가 드래그로 위치 조정 가능)
  const room7Seats: SeatData[] = [
    { id: '7-1', x: base7X + 9744, y: base7Y + 560, isVertical: true },
    { id: '7-2', x: base7X + 9748, y: base7Y + 1567, isVertical: true },
    { id: '7-3', x: base7X + 9748, y: base7Y + 2561, isVertical: true },
    { id: '7-4', x: base7X + 9748, y: base7Y + 3587, isVertical: true },
    { id: '7-5', x: base7X + 9724, y: base7Y + 4566, isVertical: true },
    { id: '7-6', x: base7X + 7500, y: base7Y - 934, isVertical: true },
    { id: '7-7', x: base7X + 7516, y: base7Y + 60, isVertical: true },
    { id: '7-8', x: base7X + 7523, y: base7Y + 1070, isVertical: true },
    { id: '7-9', x: base7X + 7523, y: base7Y + 2049, isVertical: true },
    { id: '7-10', x: base7X + 7524, y: base7Y + 3059, isVertical: true },
    { id: '7-11', x: base7X + 6880, y: base7Y - 1929, isVertical: true },
    { id: '7-12', x: base7X + 6880, y: base7Y - 949, isVertical: true },
    { id: '7-13', x: base7X + 6880, y: base7Y + 60, isVertical: true },
    { id: '7-14', x: base7X + 6880, y: base7Y + 1055, isVertical: true },
    { id: '7-15', x: base7X + 6880, y: base7Y + 2064, isVertical: true },
    { id: '7-16', x: base7X + 4934, y: base7Y - 2426, isVertical: true },
    { id: '7-17', x: base7X + 4934, y: base7Y - 1431, isVertical: true },
    { id: '7-18', x: base7X + 4926, y: base7Y - 437, isVertical: true },
    { id: '7-19', x: base7X + 4934, y: base7Y + 558, isVertical: true },
    { id: '7-20', x: base7X + 2709, y: base7Y - 3722, isVertical: true },
    { id: '7-21', x: base7X + 2717, y: base7Y - 2727, isVertical: true },
    { id: '7-22', x: base7X + 2749, y: base7Y - 1748, isVertical: true },
    { id: '7-23', x: base7X + 2717, y: base7Y - 738, isVertical: true },
    { id: '7-24', x: base7X + 2717, y: base7Y + 256, isVertical: true },
    { id: '7-25', x: base7X + 2066, y: base7Y - 4731, isVertical: true },
    { id: '7-26', x: base7X + 2089, y: base7Y - 3737, isVertical: true },
    { id: '7-27', x: base7X + 2074, y: base7Y - 2742, isVertical: true },
    { id: '7-28', x: base7X + 2089, y: base7Y - 1748, isVertical: true },
    { id: '7-29', x: base7X + 2081, y: base7Y - 723, isVertical: true },
    { id: '7-30', x: base7X - 111, y: base7Y - 5153, isVertical: true },
    { id: '7-31', x: base7X - 119, y: base7Y - 4174, isVertical: true },
    { id: '7-32', x: base7X - 111, y: base7Y - 3149, isVertical: true },
    { id: '7-33', x: base7X - 119, y: base7Y - 2170, isVertical: true },
    { id: '7-34', x: base7X - 135, y: base7Y - 1175, isVertical: true },
  ];

  // 8독서실 기준점
  // room8 bounds: { minX: 124957, maxX: 135274, minY: 247760, maxY: 255344 }
  const base8X = 130116; // 중심 X 좌표 (124957 + 135274) / 2
  const base8Y = 251552; // 중심 Y 좌표 (247760 + 255344) / 2

  // 8독서실 좌석 (8-1 ~ 8-30, 세로 방향, 높이 1100)
  const room8Seats: SeatData[] = [
    { id: '8-1', x: base8X + 4500, y: base8Y - 3500, isVertical: true, height: 1100 },
    { id: '8-2', x: base8X + 4500, y: base8Y - 2100, isVertical: true, height: 1100 },
    { id: '8-3', x: base8X + 4500, y: base8Y - 700, isVertical: true, height: 1100 },
    { id: '8-4', x: base8X + 4500, y: base8Y + 700, isVertical: true, height: 1100 },
    { id: '8-5', x: base8X + 4500, y: base8Y + 2100, isVertical: true, height: 1100 },
    { id: '8-6', x: base8X + 4500, y: base8Y + 3500, isVertical: true, height: 1100 },
    { id: '8-7', x: base8X + 3000, y: base8Y - 3500, isVertical: true, height: 1100 },
    { id: '8-8', x: base8X + 3000, y: base8Y - 2100, isVertical: true, height: 1100 },
    { id: '8-9', x: base8X + 3000, y: base8Y - 700, isVertical: true, height: 1100 },
    { id: '8-10', x: base8X + 3000, y: base8Y + 700, isVertical: true, height: 1100 },
    { id: '8-11', x: base8X + 3000, y: base8Y + 2100, isVertical: true, height: 1100 },
    { id: '8-12', x: base8X + 3000, y: base8Y + 3500, isVertical: true, height: 1100 },
    { id: '8-13', x: base8X + 1500, y: base8Y - 3500, isVertical: true, height: 1100 },
    { id: '8-14', x: base8X + 1500, y: base8Y - 2100, isVertical: true, height: 1100 },
    { id: '8-15', x: base8X + 1500, y: base8Y - 700, isVertical: true, height: 1100 },
    { id: '8-16', x: base8X + 1500, y: base8Y + 700, isVertical: true, height: 1100 },
    { id: '8-17', x: base8X + 1500, y: base8Y + 2100, isVertical: true, height: 1100 },
    { id: '8-18', x: base8X + 1500, y: base8Y + 3500, isVertical: true, height: 1100 },
    { id: '8-19', x: base8X + 0, y: base8Y - 3500, isVertical: true, height: 1100 },
    { id: '8-20', x: base8X + 0, y: base8Y - 2100, isVertical: true, height: 1100 },
    { id: '8-21', x: base8X + 0, y: base8Y - 700, isVertical: true, height: 1100 },
    { id: '8-22', x: base8X + 0, y: base8Y + 700, isVertical: true, height: 1100 },
    { id: '8-23', x: base8X - 1500, y: base8Y - 3500, isVertical: true, height: 1100 },
    { id: '8-24', x: base8X - 1500, y: base8Y - 2100, isVertical: true, height: 1100 },
    { id: '8-25', x: base8X - 1500, y: base8Y - 700, isVertical: true, height: 1100 },
    { id: '8-26', x: base8X - 1500, y: base8Y + 700, isVertical: true, height: 1100 },
    { id: '8-27', x: base8X - 3000, y: base8Y - 3500, isVertical: true, height: 1100 },
    { id: '8-28', x: base8X - 3000, y: base8Y - 2100, isVertical: true, height: 1100 },
    { id: '8-29', x: base8X - 3000, y: base8Y - 700, isVertical: true, height: 1100 },
    { id: '8-30', x: base8X - 3000, y: base8Y + 700, isVertical: true, height: 1100 },
  ];

  // 9독서실 기준점
  // room9 bounds: { minX: 135254, maxX: 140435, minY: 247704, maxY: 255354 }
  const base9X = 137845; // 중심 X 좌표 (135254 + 140435) / 2
  const base9Y = 251529; // 중심 Y 좌표 (247704 + 255354) / 2

  // 9독서실 좌석 (9-1 ~ 9-14, 세로 방향, 높이 1100)
  const room9Seats: SeatData[] = [
    { id: '9-1', x: base9X + 1500, y: base9Y - 3500, isVertical: true, height: 1100 },
    { id: '9-2', x: base9X + 1500, y: base9Y - 2100, isVertical: true, height: 1100 },
    { id: '9-3', x: base9X + 1500, y: base9Y - 700, isVertical: true, height: 1100 },
    { id: '9-4', x: base9X + 1500, y: base9Y + 700, isVertical: true, height: 1100 },
    { id: '9-5', x: base9X + 1500, y: base9Y + 2100, isVertical: true, height: 1100 },
    { id: '9-6', x: base9X + 1500, y: base9Y + 3500, isVertical: true, height: 1100 },
    { id: '9-7', x: base9X + 0, y: base9Y - 3500, isVertical: true, height: 1100 },
    { id: '9-8', x: base9X + 0, y: base9Y - 2100, isVertical: true, height: 1100 },
    { id: '9-9', x: base9X + 0, y: base9Y - 700, isVertical: true, height: 1100 },
    { id: '9-10', x: base9X + 0, y: base9Y + 700, isVertical: true, height: 1100 },
    { id: '9-11', x: base9X - 1500, y: base9Y - 3500, isVertical: true, height: 1100 },
    { id: '9-12', x: base9X - 1500, y: base9Y - 2100, isVertical: true, height: 1100 },
    { id: '9-13', x: base9X - 1500, y: base9Y - 700, isVertical: true, height: 1100 },
    { id: '9-14', x: base9X - 1500, y: base9Y + 700, isVertical: true, height: 1100 },
  ];

  return [...room6Seats, ...room7Seats, ...room8Seats, ...room9Seats];
}

// 양평점 1층 라벨 데이터 - 빈 배열 (라벨 없음)
function generateYangpyeong1FLabels(): LabelData[] {
  // 독서실 라벨
  const roomLabels: LabelData[] = [
    { id: 'label-room6', label: '6독', x: 135000, y: 242000 },
    { id: 'label-room7', label: '7독', x: 125000, y: 242000 },
    { id: 'label-room8', label: '8독', x: 130000, y: 251500 },
    { id: 'label-room9', label: '9독', x: 138000, y: 251500 },
  ];

  // 선생님 라벨
  const teacherLabels: LabelData[] = [
    { id: 'label-teacher1', label: '이상환', x: 130000, y: 245000 },
    { id: 'label-teacher2', label: '김기환', x: 132000, y: 245000 },
    { id: 'label-teacher3', label: '이동현', x: 134000, y: 245000 },
    { id: 'label-teacher4', label: '허태훈', x: 136000, y: 245000 },
    { id: 'label-teacher5', label: '윤영탁', x: 138000, y: 245000 },
    { id: 'label-teacher6', label: '강아름', x: 140000, y: 245000 },
    { id: 'label-teacher7', label: '채종길', x: 142000, y: 245000 },
  ];

  return [...roomLabels, ...teacherLabels];
}

// 양평점 2층 좌석 데이터
function generateYangpyeong2FSeats(): SeatData[] {
  // 1독서실 기준점 (25석)
  // room1 bounds: { minX: 143001, maxX: 151403, minY: 206481, maxY: 213682 }
  const base1X = 147202; // 중심 X
  const base1Y = 210082; // 중심 Y
  const room1Seats: SeatData[] = [
    { id: '1-1', x: base1X - 3000, y: base1Y + 3000, isVertical: true, height: 1100 },
    { id: '1-2', x: base1X - 3000, y: base1Y + 1500, isVertical: true, height: 1100 },
    { id: '1-3', x: base1X - 3000, y: base1Y + 0, isVertical: true, height: 1100 },
    { id: '1-4', x: base1X - 3000, y: base1Y - 1500, isVertical: true, height: 1100 },
    { id: '1-5', x: base1X - 3000, y: base1Y - 3000, isVertical: true, height: 1100 },
    { id: '1-6', x: base1X - 1500, y: base1Y + 3000, isVertical: true, height: 1100 },
    { id: '1-7', x: base1X - 1500, y: base1Y + 1500, isVertical: true, height: 1100 },
    { id: '1-8', x: base1X - 1500, y: base1Y + 0, isVertical: true, height: 1100 },
    { id: '1-9', x: base1X - 1500, y: base1Y - 1500, isVertical: true, height: 1100 },
    { id: '1-10', x: base1X - 1500, y: base1Y - 3000, isVertical: true, height: 1100 },
    { id: '1-11', x: base1X + 0, y: base1Y + 3000, isVertical: true, height: 1100 },
    { id: '1-12', x: base1X + 0, y: base1Y + 1500, isVertical: true, height: 1100 },
    { id: '1-13', x: base1X + 0, y: base1Y + 0, isVertical: true, height: 1100 },
    { id: '1-14', x: base1X + 0, y: base1Y - 1500, isVertical: true, height: 1100 },
    { id: '1-15', x: base1X + 0, y: base1Y - 3000, isVertical: true, height: 1100 },
    { id: '1-16', x: base1X + 1500, y: base1Y + 3000, isVertical: true, height: 1100 },
    { id: '1-17', x: base1X + 1500, y: base1Y + 1500, isVertical: true, height: 1100 },
    { id: '1-18', x: base1X + 1500, y: base1Y + 0, isVertical: true, height: 1100 },
    { id: '1-19', x: base1X + 1500, y: base1Y - 1500, isVertical: true, height: 1100 },
    { id: '1-20', x: base1X + 1500, y: base1Y - 3000, isVertical: true, height: 1100 },
    { id: '1-21', x: base1X + 3000, y: base1Y + 3000, isVertical: true, height: 1100 },
    { id: '1-22', x: base1X + 3000, y: base1Y + 1500, isVertical: true, height: 1100 },
    { id: '1-23', x: base1X + 3000, y: base1Y + 0, isVertical: true, height: 1100 },
    { id: '1-24', x: base1X + 3000, y: base1Y - 1500, isVertical: true, height: 1100 },
    { id: '1-25', x: base1X + 3000, y: base1Y - 3000, isVertical: true, height: 1100 },
  ];

  // 2독서실 기준점 (34석)
  // room2 bounds: { minX: 125241, maxX: 135543, minY: 206476, maxY: 213706 }
  const base2X = 130392; // 중심 X
  const base2Y = 210091; // 중심 Y
  const room2Seats: SeatData[] = [
    { id: '2-1', x: base2X - 4500, y: base2Y + 3000, isVertical: true, height: 1100 },
    { id: '2-2', x: base2X - 4500, y: base2Y + 1500, isVertical: true, height: 1100 },
    { id: '2-3', x: base2X - 4500, y: base2Y + 0, isVertical: true, height: 1100 },
    { id: '2-4', x: base2X - 4500, y: base2Y - 1500, isVertical: true, height: 1100 },
    { id: '2-5', x: base2X - 4500, y: base2Y - 3000, isVertical: true, height: 1100 },
    { id: '2-6', x: base2X - 3000, y: base2Y + 3000, isVertical: true, height: 1100 },
    { id: '2-7', x: base2X - 3000, y: base2Y + 1500, isVertical: true, height: 1100 },
    { id: '2-8', x: base2X - 3000, y: base2Y + 0, isVertical: true, height: 1100 },
    { id: '2-9', x: base2X - 3000, y: base2Y - 1500, isVertical: true, height: 1100 },
    { id: '2-10', x: base2X - 3000, y: base2Y - 3000, isVertical: true, height: 1100 },
    { id: '2-11', x: base2X - 1500, y: base2Y + 3000, isVertical: true, height: 1100 },
    { id: '2-12', x: base2X - 1500, y: base2Y + 1500, isVertical: true, height: 1100 },
    { id: '2-13', x: base2X - 1500, y: base2Y + 0, isVertical: true, height: 1100 },
    { id: '2-14', x: base2X - 1500, y: base2Y - 1500, isVertical: true, height: 1100 },
    { id: '2-15', x: base2X - 1500, y: base2Y - 3000, isVertical: true, height: 1100 },
    { id: '2-16', x: base2X + 0, y: base2Y + 3000, isVertical: true, height: 1100 },
    { id: '2-17', x: base2X + 0, y: base2Y + 1500, isVertical: true, height: 1100 },
    { id: '2-18', x: base2X + 0, y: base2Y + 0, isVertical: true, height: 1100 },
    { id: '2-19', x: base2X + 0, y: base2Y - 1500, isVertical: true, height: 1100 },
    { id: '2-20', x: base2X + 1500, y: base2Y + 3000, isVertical: true, height: 1100 },
    { id: '2-21', x: base2X + 1500, y: base2Y + 1500, isVertical: true, height: 1100 },
    { id: '2-22', x: base2X + 1500, y: base2Y + 0, isVertical: true, height: 1100 },
    { id: '2-23', x: base2X + 1500, y: base2Y - 1500, isVertical: true, height: 1100 },
    { id: '2-24', x: base2X + 1500, y: base2Y - 3000, isVertical: true, height: 1100 },
    { id: '2-25', x: base2X + 3000, y: base2Y + 3000, isVertical: true, height: 1100 },
    { id: '2-26', x: base2X + 3000, y: base2Y + 1500, isVertical: true, height: 1100 },
    { id: '2-27', x: base2X + 3000, y: base2Y + 0, isVertical: true, height: 1100 },
    { id: '2-28', x: base2X + 3000, y: base2Y - 1500, isVertical: true, height: 1100 },
    { id: '2-29', x: base2X + 3000, y: base2Y - 3000, isVertical: true, height: 1100 },
    { id: '2-30', x: base2X + 4500, y: base2Y + 3000, isVertical: true, height: 1100 },
    { id: '2-31', x: base2X + 4500, y: base2Y + 1500, isVertical: true, height: 1100 },
    { id: '2-32', x: base2X + 4500, y: base2Y + 0, isVertical: true, height: 1100 },
    { id: '2-33', x: base2X + 4500, y: base2Y - 1500, isVertical: true, height: 1100 },
    { id: '2-34', x: base2X + 4500, y: base2Y - 3000, isVertical: true, height: 1100 },
  ];

  // 3독서실 기준점 (36석)
  // room3 bounds: { minX: 124649, maxX: 135487, minY: 215340, maxY: 223380 }
  const base3X = 130068; // 중심 X
  const base3Y = 219360; // 중심 Y
  const room3Seats: SeatData[] = [
    { id: '3-1', x: base3X - 4500, y: base3Y + 3000, isVertical: true, height: 1100 },
    { id: '3-2', x: base3X - 4500, y: base3Y + 1500, isVertical: true, height: 1100 },
    { id: '3-3', x: base3X - 4500, y: base3Y + 0, isVertical: true, height: 1100 },
    { id: '3-4', x: base3X - 4500, y: base3Y - 1500, isVertical: true, height: 1100 },
    { id: '3-5', x: base3X - 4500, y: base3Y - 3000, isVertical: true, height: 1100 },
    { id: '3-6', x: base3X - 4500, y: base3Y - 4500, isVertical: true, height: 1100 },
    { id: '3-7', x: base3X - 3000, y: base3Y + 3000, isVertical: true, height: 1100 },
    { id: '3-8', x: base3X - 3000, y: base3Y + 1500, isVertical: true, height: 1100 },
    { id: '3-9', x: base3X - 3000, y: base3Y + 0, isVertical: true, height: 1100 },
    { id: '3-10', x: base3X - 3000, y: base3Y - 1500, isVertical: true, height: 1100 },
    { id: '3-11', x: base3X - 3000, y: base3Y - 3000, isVertical: true, height: 1100 },
    { id: '3-12', x: base3X - 3000, y: base3Y - 4500, isVertical: true, height: 1100 },
    { id: '3-13', x: base3X - 1500, y: base3Y + 3000, isVertical: true, height: 1100 },
    { id: '3-14', x: base3X - 1500, y: base3Y + 1500, isVertical: true, height: 1100 },
    { id: '3-15', x: base3X - 1500, y: base3Y + 0, isVertical: true, height: 1100 },
    { id: '3-16', x: base3X - 1500, y: base3Y - 1500, isVertical: true, height: 1100 },
    { id: '3-17', x: base3X - 1500, y: base3Y - 3000, isVertical: true, height: 1100 },
    { id: '3-18', x: base3X - 1500, y: base3Y - 4500, isVertical: true, height: 1100 },
    { id: '3-19', x: base3X + 0, y: base3Y + 3000, isVertical: true, height: 1100 },
    { id: '3-20', x: base3X + 0, y: base3Y + 1500, isVertical: true, height: 1100 },
    { id: '3-21', x: base3X + 0, y: base3Y + 0, isVertical: true, height: 1100 },
    { id: '3-22', x: base3X + 0, y: base3Y - 1500, isVertical: true, height: 1100 },
    { id: '3-23', x: base3X + 0, y: base3Y - 3000, isVertical: true, height: 1100 },
    { id: '3-24', x: base3X + 0, y: base3Y - 4500, isVertical: true, height: 1100 },
    { id: '3-25', x: base3X + 1500, y: base3Y + 3000, isVertical: true, height: 1100 },
    { id: '3-26', x: base3X + 1500, y: base3Y + 1500, isVertical: true, height: 1100 },
    { id: '3-27', x: base3X + 1500, y: base3Y + 0, isVertical: true, height: 1100 },
    { id: '3-28', x: base3X + 1500, y: base3Y - 1500, isVertical: true, height: 1100 },
    { id: '3-29', x: base3X + 1500, y: base3Y - 3000, isVertical: true, height: 1100 },
    { id: '3-30', x: base3X + 1500, y: base3Y - 4500, isVertical: true, height: 1100 },
    { id: '3-31', x: base3X + 3000, y: base3Y + 3000, isVertical: true, height: 1100 },
    { id: '3-32', x: base3X + 3000, y: base3Y + 1500, isVertical: true, height: 1100 },
    { id: '3-33', x: base3X + 3000, y: base3Y + 0, isVertical: true, height: 1100 },
    { id: '3-34', x: base3X + 3000, y: base3Y - 1500, isVertical: true, height: 1100 },
    { id: '3-35', x: base3X + 3000, y: base3Y - 3000, isVertical: true, height: 1100 },
    { id: '3-36', x: base3X + 3000, y: base3Y - 4500, isVertical: true, height: 1100 },
  ];

  // 4독서실 기준점 (14석)
  // room4 bounds: { minX: 135365, maxX: 140332, minY: 215523, maxY: 223417 }
  const base4X = 137849; // 중심 X
  const base4Y = 219470; // 중심 Y
  const room4Seats: SeatData[] = [
    { id: '4-1', x: base4X - 1500, y: base4Y + 3000, isVertical: true, height: 1100 },
    { id: '4-2', x: base4X - 1500, y: base4Y + 1500, isVertical: true, height: 1100 },
    { id: '4-3', x: base4X - 1500, y: base4Y + 0, isVertical: true, height: 1100 },
    { id: '4-4', x: base4X - 1500, y: base4Y - 1500, isVertical: true, height: 1100 },
    { id: '4-5', x: base4X - 1500, y: base4Y - 3000, isVertical: true, height: 1100 },
    { id: '4-6', x: base4X - 1500, y: base4Y - 4500, isVertical: true, height: 1100 },
    { id: '4-7', x: base4X + 0, y: base4Y + 3000, isVertical: true, height: 1100 },
    { id: '4-8', x: base4X + 0, y: base4Y + 1500, isVertical: true, height: 1100 },
    { id: '4-9', x: base4X + 0, y: base4Y + 0, isVertical: true, height: 1100 },
    { id: '4-10', x: base4X + 0, y: base4Y - 1500, isVertical: true, height: 1100 },
    { id: '4-11', x: base4X + 0, y: base4Y - 3000, isVertical: true, height: 1100 },
    { id: '4-12', x: base4X + 1500, y: base4Y + 1500, isVertical: true, height: 1100 },
    { id: '4-13', x: base4X + 1500, y: base4Y + 0, isVertical: true, height: 1100 },
    { id: '4-14', x: base4X + 1500, y: base4Y - 1500, isVertical: true, height: 1100 },
  ];

  // 5독서실 기준점 (36석)
  // room5 bounds: { minX: 140329, maxX: 150802, minY: 215494, maxY: 223405 }
  const base5X = 145566; // 중심 X
  const base5Y = 219450; // 중심 Y
  const room5Seats: SeatData[] = [
    { id: '5-1', x: base5X - 4500, y: base5Y + 3000, isVertical: true, height: 1100 },
    { id: '5-2', x: base5X - 4500, y: base5Y + 1500, isVertical: true, height: 1100 },
    { id: '5-3', x: base5X - 4500, y: base5Y + 0, isVertical: true, height: 1100 },
    { id: '5-4', x: base5X - 4500, y: base5Y - 1500, isVertical: true, height: 1100 },
    { id: '5-5', x: base5X - 4500, y: base5Y - 3000, isVertical: true, height: 1100 },
    { id: '5-6', x: base5X - 4500, y: base5Y - 4500, isVertical: true, height: 1100 },
    { id: '5-7', x: base5X - 3000, y: base5Y + 3000, isVertical: true, height: 1100 },
    { id: '5-8', x: base5X - 3000, y: base5Y + 1500, isVertical: true, height: 1100 },
    { id: '5-9', x: base5X - 3000, y: base5Y + 0, isVertical: true, height: 1100 },
    { id: '5-10', x: base5X - 3000, y: base5Y - 1500, isVertical: true, height: 1100 },
    { id: '5-11', x: base5X - 3000, y: base5Y - 3000, isVertical: true, height: 1100 },
    { id: '5-12', x: base5X - 3000, y: base5Y - 4500, isVertical: true, height: 1100 },
    { id: '5-13', x: base5X - 1500, y: base5Y + 3000, isVertical: true, height: 1100 },
    { id: '5-14', x: base5X - 1500, y: base5Y + 1500, isVertical: true, height: 1100 },
    { id: '5-15', x: base5X - 1500, y: base5Y + 0, isVertical: true, height: 1100 },
    { id: '5-16', x: base5X - 1500, y: base5Y - 1500, isVertical: true, height: 1100 },
    { id: '5-17', x: base5X - 1500, y: base5Y - 3000, isVertical: true, height: 1100 },
    { id: '5-18', x: base5X - 1500, y: base5Y - 4500, isVertical: true, height: 1100 },
    { id: '5-19', x: base5X + 0, y: base5Y + 3000, isVertical: true, height: 1100 },
    { id: '5-20', x: base5X + 0, y: base5Y + 1500, isVertical: true, height: 1100 },
    { id: '5-21', x: base5X + 0, y: base5Y + 0, isVertical: true, height: 1100 },
    { id: '5-22', x: base5X + 0, y: base5Y - 1500, isVertical: true, height: 1100 },
    { id: '5-23', x: base5X + 0, y: base5Y - 3000, isVertical: true, height: 1100 },
    { id: '5-24', x: base5X + 0, y: base5Y - 4500, isVertical: true, height: 1100 },
    { id: '5-25', x: base5X + 1500, y: base5Y + 3000, isVertical: true, height: 1100 },
    { id: '5-26', x: base5X + 1500, y: base5Y + 1500, isVertical: true, height: 1100 },
    { id: '5-27', x: base5X + 1500, y: base5Y + 0, isVertical: true, height: 1100 },
    { id: '5-28', x: base5X + 1500, y: base5Y - 1500, isVertical: true, height: 1100 },
    { id: '5-29', x: base5X + 1500, y: base5Y - 3000, isVertical: true, height: 1100 },
    { id: '5-30', x: base5X + 1500, y: base5Y - 4500, isVertical: true, height: 1100 },
    { id: '5-31', x: base5X + 3000, y: base5Y + 3000, isVertical: true, height: 1100 },
    { id: '5-32', x: base5X + 3000, y: base5Y + 1500, isVertical: true, height: 1100 },
    { id: '5-33', x: base5X + 3000, y: base5Y + 0, isVertical: true, height: 1100 },
    { id: '5-34', x: base5X + 3000, y: base5Y - 1500, isVertical: true, height: 1100 },
    { id: '5-35', x: base5X + 3000, y: base5Y - 3000, isVertical: true, height: 1100 },
    { id: '5-36', x: base5X + 3000, y: base5Y - 4500, isVertical: true, height: 1100 },
  ];

  return [...room1Seats, ...room2Seats, ...room3Seats, ...room4Seats, ...room5Seats];
}

// 양평점 2층 라벨 데이터 - 빈 배열 (라벨 없음)
function generateYangpyeong2FLabels(): LabelData[] {
  return [];
}

export default function FloorPlanViewer({
  visibleSeatIds,
  branch = 'daechi',
  floor,
  mode = 'view',
  seatStatus = {},
  onSeatClick,
  editable = false,
  seatOffsets: externalOffsets,
  onSeatMove,
  showLayerControl = true,
  showControls = true,
  height = 'calc(100vh-320px)',
  initialViewMode = 'default',
  initialScaleMultiplier = 1,
  invertPan = false,
  showDepartureTime = false,
  showSeatIdBadge = true,
  seatIdBadgePlacement = 'inside',
  showScheduleLabels = true,
  scheduleLabelPlacement = 'inside',
  textRotation = 0,
}: FloorPlanViewerProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // 도면 데이터 (지점+층별)
  const planData = useMemo(() => {
    if (branch === 'yangpyeong') {
      // 양평점
      if (floor === '1') return yangpyeongPlan1F as PlanJSON;
      if (floor === '2') return yangpyeongPlan2F as PlanJSON;
      return yangpyeongPlan1F as PlanJSON;
    }
    // 대치점
    return (floor === '4' ? daechiPlan4F : daechiPlan3F) as PlanJSON;
  }, [branch, floor]);
  const { minX, maxX, minY, maxY } = planData.bounds;
  const width = maxX - minX;
  const viewHeight = maxY - minY;

  // 좌석/라벨 데이터 (지점+층별)
  const seats = useMemo(() => {
    if (branch === 'yangpyeong') {
      // 양평점 좌석
      if (floor === '1') return generateYangpyeong1FSeats();
      if (floor === '2') return generateYangpyeong2FSeats();
      return generateYangpyeong1FSeats();
    }
    // 대치점
    return floor === '3' ? generate3FSeats() : generate4FSeats();
  }, [branch, floor]);

  const labels = useMemo(() => {
    if (branch === 'yangpyeong') {
      // 양평점 라벨
      if (floor === '1') return generateYangpyeong1FLabels();
      if (floor === '2') return generateYangpyeong2FLabels();
      return generateYangpyeong1FLabels();
    }
    // 대치점
    return floor === '3' ? generate3FLabels() : generate4FLabels();
  }, [branch, floor]);

  // 좌석 영역 bounds 계산 (좌석만 기준)
  const seatBounds = useMemo(() => {
    if (seats.length === 0) return { minX, maxX, minY, maxY };

    let sMinX = Infinity, sMaxX = -Infinity, sMinY = Infinity, sMaxY = -Infinity;
    for (const seat of seats) {
      if (seat.x < sMinX) sMinX = seat.x;
      if (seat.x > sMaxX) sMaxX = seat.x;
      if (seat.y < sMinY) sMinY = seat.y;
      if (seat.y > sMaxY) sMaxY = seat.y;
    }

    // 여백 추가 (좌석 크기 + 약간의 패딩)
    const padding = 2000;
    return {
      minX: sMinX - padding,
      maxX: sMaxX + padding,
      minY: sMinY - padding,
      maxY: sMaxY + padding,
    };
  }, [seats, minX, maxX, minY, maxY]);

  // 레이어 관리
  const layerNames = useMemo(() => Object.keys(planData.layers).sort(), [planData]);
  const [enabledLayers, setEnabledLayers] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(layerNames.map(name => [name, getDefaultEnabledLayers(branch, floor).has(name)]))
  );
  const [showLayerPanel, setShowLayerPanel] = useState(false);

  useEffect(() => {
    const defaultLayers = getDefaultEnabledLayers(branch, floor);
    setEnabledLayers(
      Object.fromEntries(layerNames.map((n) => [n, defaultLayers.has(n)]))
    );
  }, [layerNames, branch, floor]);

  const enabledLayerList = useMemo(
    () => layerNames.filter((l) => enabledLayers[l]),
    [layerNames, enabledLayers]
  );

  // 독서실 필터 (양평점 전용)
  const studyRooms = useMemo(() => getStudyRooms(branch, floor), [branch, floor]);
  const [selectedStudyRoom, setSelectedStudyRoom] = useState<string | null>(null);

  // 층 변경 시 독서실 필터 초기화
  useEffect(() => {
    setSelectedStudyRoom(null);
  }, [branch, floor]);

  // 하드코딩된 좌석 오프셋 기본값
  // ============================================================================
  // 대치점 (Daechi) 좌석 오프셋
  // ============================================================================
  const DEFAULT_SEAT_OFFSETS: Record<string, { x: number; y: number }> = {
    // --- 대치점 3층 P좌석 ---
    "P1": { "x": -77, "y": 0 },
    "P2": { "x": -84, "y": 0 },
    "P3": { "x": -77, "y": 46 },
    "P4": { "x": -84, "y": 77 },
    "P5": { "x": 42, "y": -15 },
    "P6": { "x": 49, "y": 0 },
    "P7": { "x": 56, "y": 46 },
    "P8": { "x": 35, "y": 77 },
    "P10": { "x": -7, "y": 15 },
    "P11": { "x": -14, "y": 31 },
    "P12": { "x": -7, "y": 92 },
    "P15": { "x": -21, "y": 46 },
    "P16": { "x": -21, "y": 61 },
    "P17": { "x": -42, "y": -31 },
    "P18": { "x": -70, "y": 15 },
    "P19": { "x": -63, "y": 61 },
    "P20": { "x": -77, "y": 61 },
    "P21": { "x": -91, "y": -46 },
    "P22": { "x": -98, "y": 15 },
    "P23": { "x": -112, "y": 31 },
    "P24": { "x": -119, "y": 77 },
    "P25": { "x": -155, "y": -31 },
    "P26": { "x": -162, "y": 15 },
    "P27": { "x": -169, "y": 46 },
    "P28": { "x": -162, "y": 61 },
    "P29": { "x": -169, "y": -15 },
    "P30": { "x": -190, "y": 0 },
    "P31": { "x": -176, "y": 61 },
    "P32": { "x": -183, "y": 92 },
    "P33": { "x": -402, "y": 1222 },
    "P34": { "x": -393, "y": 1286 },
    "P35": { "x": -412, "y": 1308 },
    "P36": { "x": -411, "y": 1329 },
    "P37": { "x": -1579, "y": -3773 },
    "P38": { "x": -265, "y": 2508 },
    "P39": { "x": -275, "y": 2572 },
    "P40": { "x": -265, "y": 2615 },
    "P41": { "x": -2285, "y": -2529 },
    "P42": { "x": -2304, "y": -2487 },
    // --- 대치점 3층 W좌석 ---
    "W1": { "x": 63, "y": 62 },
    "W2": { "x": 56, "y": 61 },
    "W3": { "x": 35, "y": 61 },
    "W4": { "x": 14, "y": 31 },
    "W5": { "x": 21, "y": 31 },
    "W6": { "x": 42, "y": 61 },
    "W7": { "x": 49, "y": 46 },
    "W8": { "x": 28, "y": 46 },
    "W9": { "x": 7, "y": 31 },
    "W10": { "x": -7, "y": 61 },
    "W11": { "x": 56, "y": 61 },
    "W12": { "x": -7, "y": 46 },
    "W13": { "x": -15539, "y": 7755 },
    "W14": { "x": -15640, "y": 7739 },
    "W15": { "x": -15739, "y": 7759 },
    // --- 대치점 4층 P좌석 ---
    "P43": { "x": -783, "y": 820 },
    "P44": { "x": -2280, "y": -436 },
    "P45": { "x": -3771, "y": -1676 },
    "P46": { "x": -5276, "y": -2968 },
    "P47": { "x": -5291, "y": 803 },
    "P48": { "x": -6782, "y": -436 },
    "P49": { "x": -8280, "y": -1676 },
    "P50": { "x": 723, "y": -1449 },
    "P51": { "x": 969, "y": 2304 },
    "P52": { "x": -514, "y": 1065 },
    "P53": { "x": -2027, "y": -210 },
    "P54": { "x": -3518, "y": -1449 },
    "P55": { "x": -3525, "y": 2305 },
    "P56": { "x": -5030, "y": 1065 },
    "P57": { "x": 3965, "y": 1309 },
    "P58": { "x": 2445, "y": 70 },
    "P59": { "x": 2720, "y": 5056 },
    "P60": { "x": 1230, "y": 3801 },
    "P61": { "x": -277, "y": 2539 },
    "P62": { "x": -1774, "y": 1302 },
    "P63": { "x": -3267, "y": 38 },
    "P64": { "x": 7206, "y": 6550 },
    "P65": { "x": 5708, "y": 5307 },
    "P66": { "x": 4218, "y": 4037 },
    "P67": { "x": 2708, "y": 2806 },
    "P68": { "x": 1206, "y": 1576 },
    // --- 대치점 4층 W좌석 ---
    "W16": { "x": -2429, "y": -2268 },
    "W17": { "x": -3930, "y": -3460 },
    "W18": { "x": -5424, "y": -4671 },
    "W19": { "x": -6933, "y": -5863 },
    "W20": { "x": -7582, "y": -7459 },
    "W21": { "x": -7959, "y": -7458 },
    "W22": { "x": -7336, "y": -7439 },
    "W23": { "x": 2806, "y": -5959 },
    "W24": { "x": 2470, "y": -5959 },
    "W25": { "x": 2133, "y": -5959 },
    "W26": { "x": 1789, "y": -5959 },
    "W27": { "x": 1428, "y": -5978 },
    "W28": { "x": 1116, "y": -5959 },
    // --- 대치점 4층 V좌석 ---
    "V1": { "x": 9001, "y": 8420 },
    "V2": { "x": 7524, "y": 7536 },
    "V3": { "x": 6031, "y": 6478 },
    "V4": { "x": 4546, "y": 5421 },
    "V5": { "x": 3028, "y": 4402 },
    // --- 대치점 4층 라벨 ---
    "label-4f-restroom1": { "x": -2023, "y": 1901 },
    "label-4f-restroom2": { "x": -1970, "y": 913 },
    "label-4f-standing": { "x": -2076, "y": 123 },
    "label-4f-classroom": { "x": 6912, "y": -2047 },
    "label-4f-printer": { "x": 2150, "y": 1185 },
    "label-4f-printcafe": { "x": 2076, "y": -2271 },
    "legend-4f-window": { "x": -5595, "y": -2000 },
    "legend-4f-open": { "x": -5469, "y": -667 },
    "legend-4f-vip": { "x": -5564, "y": -2864 },
    // --- 대치점 3층 라벨 ---
    "legend-open": { "x": -8592, "y": -440 },
    "legend-window": { "x": -8602, "y": -968 },
    "legend-standing": { "x": -8612, "y": -1671 },
    "label-coaching1": { "x": -1167, "y": -2067 },
    "label-coaching2": { "x": -1217, "y": 352 },
    "label-infodesk": { "x": 3451, "y": -132 },
    "label-restroom1": { "x": -4940, "y": 2221 },
    "label-restroom2": { "x": -4950, "y": 1342 },
    "label-elevator": { "x": 3642, "y": 5630 },
    "label-phone-locker": { "x": 1761, "y": 2089 },
    // ============================================================================
    // 양평점 (Yangpyeong) 1층 좌석 오프셋
    // ============================================================================
    // --- 양평점 6독서실 (34석) ---
    "6-1": { "x": 490, "y": -3090 },
    "6-2": { "x": 494, "y": -2892 },
    "6-3": { "x": 476, "y": -2681 },
    "6-4": { "x": 476, "y": -2508 },
    "6-5": { "x": 506, "y": -2277 },
    "6-6": { "x": 529, "y": -2082 },
    "6-7": { "x": 512, "y": -1908 },
    "6-8": { "x": 498, "y": -1698 },
    "6-9": { "x": 519, "y": -1457 },
    "6-10": { "x": 499, "y": -1287 },
    "6-11": { "x": 503, "y": -1109 },
    "6-12": { "x": 557, "y": -887 },
    "6-13": { "x": 557, "y": -678 },
    "6-14": { "x": 514, "y": -483 },
    "6-15": { "x": 503, "y": -294 },
    "6-16": { "x": 502, "y": -96 },
    "6-17": { "x": 504, "y": 111 },
    "6-18": { "x": 512, "y": 311 },
    "6-19": { "x": 500, "y": 534 },
    "6-20": { "x": 538, "y": 674 },
    "6-21": { "x": 506, "y": 870 },
    "6-22": { "x": 487, "y": 1133 },
    "6-23": { "x": 535, "y": 1303 },
    "6-24": { "x": 513, "y": 1523 },
    "6-25": { "x": 517, "y": 1702 },
    "6-26": { "x": 518, "y": 1902 },
    "6-27": { "x": 507, "y": 2116 },
    "6-28": { "x": 494, "y": 2310 },
    "6-29": { "x": 483, "y": 2501 },
    "6-30": { "x": 477, "y": 2716 },
    "6-31": { "x": 480, "y": 2924 },
    "6-32": { "x": 477, "y": 3112 },
    "6-33": { "x": 503, "y": 3298 },
    "6-34": { "x": 521, "y": 3521 },
    // --- 양평점 7독서실 (34석) ---
    "7-1": { "x": 254, "y": -3679 },
    "7-2": { "x": 229, "y": -3470 },
    "7-3": { "x": 229, "y": -3245 },
    "7-4": { "x": 229, "y": -3117 },
    "7-5": { "x": 254, "y": -2892 },
    "7-6": { "x": 347, "y": -2185 },
    "7-7": { "x": 339, "y": -1976 },
    "7-8": { "x": 322, "y": -1783 },
    "7-9": { "x": 339, "y": -1558 },
    "7-10": { "x": 305, "y": -1366 },
    "7-11": { "x": 305, "y": -1173 },
    "7-12": { "x": 305, "y": -964 },
    "7-13": { "x": 322, "y": -771 },
    "7-14": { "x": 305, "y": -578 },
    "7-15": { "x": 330, "y": -386 },
    "7-16": { "x": 390, "y": -112 },
    "7-17": { "x": 390, "y": 112 },
    "7-18": { "x": 381, "y": 289 },
    "7-19": { "x": 381, "y": 498 },
    "7-20": { "x": 457, "y": 611 },
    "7-21": { "x": 466, "y": 819 },
    "7-22": { "x": 432, "y": 1044 },
    "7-23": { "x": 466, "y": 1237 },
    "7-24": { "x": 466, "y": 1430 },
    "7-25": { "x": 474, "y": 1623 },
    "7-26": { "x": 466, "y": 1815 },
    "7-27": { "x": 491, "y": 2024 },
    "7-28": { "x": 457, "y": 2249 },
    "7-29": { "x": 483, "y": 2426 },
    "7-30": { "x": 508, "y": 2603 },
    "7-31": { "x": 534, "y": 2844 },
    "7-32": { "x": 525, "y": 3020 },
    "7-33": { "x": 542, "y": 3229 },
    "7-34": { "x": 542, "y": 3422 },
    // --- 양평점 8독서실 (30석) ---
    "8-1": { "x": -9173, "y": 6033 },
    "8-2": { "x": -9161, "y": 3279 },
    "8-3": { "x": -9173, "y": 546 },
    "8-4": { "x": -9196, "y": -2208 },
    "8-5": { "x": -9208, "y": -4983 },
    "8-6": { "x": -7076, "y": -961 },
    "8-7": { "x": -5601, "y": 4634 },
    "8-8": { "x": -5601, "y": 1902 },
    "8-9": { "x": -5601, "y": -852 },
    "8-10": { "x": -4932, "y": 1836 },
    "8-11": { "x": -4932, "y": -940 },
    "8-12": { "x": -4921, "y": -3694 },
    "8-13": { "x": -3434, "y": 1923 },
    "8-14": { "x": -1371, "y": 4634 },
    "8-15": { "x": -1337, "y": 1880 },
    "8-16": { "x": -1348, "y": -874 },
    "8-17": { "x": -1348, "y": -3607 },
    "8-18": { "x": -714, "y": -962 },
    "8-19": { "x": 795, "y": 4677 },
    "8-20": { "x": 784, "y": 1945 },
    "8-21": { "x": 796, "y": -831 },
    "8-22": { "x": 2869, "y": 1815 },
    "8-23": { "x": 4413, "y": 4677 },
    "8-24": { "x": 4391, "y": 1968 },
    "8-25": { "x": 4376, "y": -831 },
    "8-26": { "x": 6219, "y": 2422 },
    "8-27": { "x": 7712, "y": 5257 },
    "8-28": { "x": 7734, "y": 2530 },
    "8-29": { "x": 7734, "y": -240 },
    "8-30": { "x": 7712, "y": -3024 },
    // --- 양평점 9독서실 (14석) ---
    "9-1": { "x": -3734, "y": 6022 },
    "9-2": { "x": -3717, "y": 3303 },
    "9-3": { "x": -3717, "y": 538 },
    "9-4": { "x": -3726, "y": -2212 },
    "9-5": { "x": -3726, "y": -4962 },
    "9-6": { "x": -1458, "y": -1137 },
    "9-7": { "x": 57, "y": 4519 },
    "9-8": { "x": 75, "y": 1745 },
    "9-9": { "x": 48, "y": -998 },
    "9-10": { "x": 2076, "y": 2450 },
    "9-11": { "x": 3580, "y": 5254 },
    "9-12": { "x": 3572, "y": 2519 },
    "9-13": { "x": 3580, "y": -261 },
    "9-14": { "x": 3555, "y": -2965 },
  };

  // 좌석 오프셋 (편집 모드용)
  const [internalOffsets, setInternalOffsets] = useState<Record<string, { x: number; y: number }>>(() => {
    if (mode === 'edit' && typeof window !== 'undefined') {
      const saved = localStorage.getItem('seatOffsets');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // localStorage에 저장된 값과 기본값 병합
          return { ...DEFAULT_SEAT_OFFSETS, ...parsed };
        } catch {
          return DEFAULT_SEAT_OFFSETS;
        }
      }
    }
    return DEFAULT_SEAT_OFFSETS;
  });

  const seatOffsets = externalOffsets || internalOffsets;
  const setSeatOffsets = useMemo(() =>
    onSeatMove
      ? (id: string, offset: { x: number; y: number }) => onSeatMove(id, offset)
      : (id: string, offset: { x: number; y: number }) => {
          setInternalOffsets((prev) => ({ ...prev, [id]: offset }));
        },
    [onSeatMove]
  );

  useEffect(() => {
    if (mode === 'edit' && !externalOffsets && Object.keys(internalOffsets).length > 0) {
      localStorage.setItem('seatOffsets', JSON.stringify(internalOffsets));
    }
  }, [internalOffsets, externalOffsets, mode]);

  // 편집 모드
  const [editMode, setEditMode] = useState(false);
  const [draggingSeat, setDraggingSeat] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; seatX: number; seatY: number } | null>(null);

  // 요소 삭제 모드
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  // 삭제 미리보기 (향후 사용 예정)

  // 좌표 확인 모드 (개발자 도구)
  const [coordMode, setCoordMode] = useState(false);
  const [clickedCoords, setClickedCoords] = useState<{ x: number; y: number }[]>([]);
  const [draggingCoordIndex, setDraggingCoordIndex] = useState<number | null>(null);
  const [coordDragStart, setCoordDragStart] = useState<{ x: number; y: number; coordX: number; coordY: number } | null>(null);

  // 삭제된 path 인덱스 기본값 (하드코딩)
  const DEFAULT_DELETED_PATHS: Record<string, number[]> = {
    'yangpyeong_2_DIM+텍스트': [1204],
    'yangpyeong_2_ETC': [14],
  };

  // 삭제된 path 인덱스 저장 (지점_층_레이어: Set<인덱스>)
  const [deletedPaths, setDeletedPaths] = useState<Record<string, Set<number>>>(() => {
    // 기본값으로 시작
    const result: Record<string, Set<number>> = {};
    for (const key of Object.keys(DEFAULT_DELETED_PATHS)) {
      result[key] = new Set(DEFAULT_DELETED_PATHS[key]);
    }

    if (mode === 'edit' && typeof window !== 'undefined') {
      const saved = localStorage.getItem('deletedPaths');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // JSON에서 Set으로 변환 (localStorage 값과 기본값 병합)
          for (const key of Object.keys(parsed)) {
            if (result[key]) {
              // 기본값에 localStorage 값 추가
              for (const idx of parsed[key]) {
                result[key].add(idx);
              }
            } else {
              result[key] = new Set(parsed[key]);
            }
          }
        } catch {
          // 파싱 실패 시 기본값 유지
        }
      }
    }
    return result;
  });

  // deletedPaths를 localStorage에 저장
  useEffect(() => {
    if (mode === 'edit' && Object.keys(deletedPaths).length > 0) {
      // Set을 배열로 변환하여 JSON 저장
      const toSave: Record<string, number[]> = {};
      for (const key of Object.keys(deletedPaths)) {
        toSave[key] = Array.from(deletedPaths[key]);
      }
      localStorage.setItem('deletedPaths', JSON.stringify(toSave));
    }
  }, [deletedPaths, mode]);

  // path가 삭제되었는지 확인
  function isPathDeleted(layer: string, index: number): boolean {
    const key = `${branch}_${floor}_${layer}`;
    return deletedPaths[key]?.has(index) || false;
  }

  // SVG path에서 좌표 추출 (간단한 파서)
  function getPathBounds(d: string): { minX: number; maxX: number; minY: number; maxY: number; centerX: number; centerY: number } | null {
    const numbers = d.match(/-?\d+\.?\d*/g);
    if (!numbers || numbers.length < 2) return null;

    const coords: number[] = numbers.map(Number);
    let pathMinX = Infinity, pathMaxX = -Infinity, pathMinY = Infinity, pathMaxY = -Infinity;

    for (let i = 0; i < coords.length - 1; i += 2) {
      const x = coords[i];
      const y = coords[i + 1];
      if (x < pathMinX) pathMinX = x;
      if (x > pathMaxX) pathMaxX = x;
      if (y < pathMinY) pathMinY = y;
      if (y > pathMaxY) pathMaxY = y;
    }

    return {
      minX: pathMinX,
      maxX: pathMaxX,
      minY: pathMinY,
      maxY: pathMaxY,
      centerX: (pathMinX + pathMaxX) / 2,
      centerY: (pathMinY + pathMaxY) / 2,
    };
  }

  // 선택 영역과 path가 겹치는지 확인 (중심점 기준 또는 완전 포함)
  function isPathInSelection(
    pathBounds: { minX: number; maxX: number; minY: number; maxY: number; centerX: number; centerY: number },
    selection: { minX: number; maxX: number; minY: number; maxY: number },
    strict: boolean = false
  ): boolean {
    if (strict) {
      // 엄격 모드: path의 중심점이 선택 영역 안에 있어야 함
      return pathBounds.centerX >= selection.minX && pathBounds.centerX <= selection.maxX &&
             pathBounds.centerY >= selection.minY && pathBounds.centerY <= selection.maxY;
    }
    // 일반 모드: path와 선택 영역이 겹치면 됨
    return !(pathBounds.maxX < selection.minX || pathBounds.minX > selection.maxX ||
             pathBounds.maxY < selection.minY || pathBounds.minY > selection.maxY);
  }

  // 영역 내 path 삭제
  function deletePathsInSelection() {
    if (!selectionBox) return;

    // 선택 영역을 DXF 좌표로 변환
    const selMinX = Math.min(selectionBox.startX, selectionBox.endX);
    const selMaxX = Math.max(selectionBox.startX, selectionBox.endX);
    const selMinY = Math.min(selectionBox.startY, selectionBox.endY);
    const selMaxY = Math.max(selectionBox.startY, selectionBox.endY);

    const selection = { minX: selMinX, maxX: selMaxX, minY: selMinY, maxY: selMaxY };

    const newDeletedPaths = { ...deletedPaths };
    let deletedCount = 0;

    for (const layer of layerNames) {
      if (!enabledLayers[layer]) continue;
      const data = planData.layers[layer];
      const key = `${branch}_${floor}_${layer}`;

      if (!newDeletedPaths[key]) {
        newDeletedPaths[key] = new Set();
      }

      data.paths.forEach((d, i) => {
        if (newDeletedPaths[key].has(i)) return; // 이미 삭제됨

        const pathBounds = getPathBounds(d);
        if (pathBounds && isPathInSelection(pathBounds, selection)) {
          newDeletedPaths[key].add(i);
          deletedCount++;
        }
      });
    }

    if (deletedCount > 0) {
      setDeletedPaths(newDeletedPaths);
      console.log(`${deletedCount}개 요소 삭제됨`);
    }

    setSelectionBox(null);
    setIsSelecting(false);
  }

  // 현재 층의 삭제 복원
  function restoreDeletedPaths() {
    const newDeletedPaths = { ...deletedPaths };
    let restoredCount = 0;

    for (const layer of layerNames) {
      const key = `${branch}_${floor}_${layer}`;
      if (newDeletedPaths[key]) {
        restoredCount += newDeletedPaths[key].size;
        delete newDeletedPaths[key];
      }
    }

    if (restoredCount > 0) {
      setDeletedPaths(newDeletedPaths);
      console.log(`${restoredCount}개 요소 복원됨`);
    }
  }

  // 삭제된 path를 제외한 JSON 파일 다운로드
  function downloadFilteredJson() {
    // 현재 층의 planData 복사
    const filteredPlan: PlanJSON = {
      bounds: { ...planData.bounds },
      layers: {},
    };

    // 각 레이어에서 삭제된 path 제외
    for (const layer of Object.keys(planData.layers)) {
      const key = `${branch}_${floor}_${layer}`;
      const deletedSet = deletedPaths[key] || new Set<number>();
      const originalPaths = planData.layers[layer].paths;
      const originalTexts = planData.layers[layer].texts;

      // 삭제되지 않은 path만 포함
      const filteredPaths = originalPaths.filter((_, i) => !deletedSet.has(i));

      filteredPlan.layers[layer] = {
        paths: filteredPaths,
        ...(originalTexts && { texts: originalTexts }),
      };
    }

    // JSON 문자열 생성
    const jsonString = JSON.stringify(filteredPlan, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // 다운로드 링크 생성 및 클릭
    const a = document.createElement('a');
    a.href = url;
    a.download = `${branch}_${floor}f_plan_filtered.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`${branch} ${floor}층 필터링된 JSON 다운로드 완료`);
  }

  // 좌석 영역에 맞춘 초기 뷰 계산
  const initialView = useMemo(() => {
    // 좌석 영역 중심 (DXF 좌표)
    const centerX = (seatBounds.minX + seatBounds.maxX) / 2;
    const centerY = (seatBounds.minY + seatBounds.maxY) / 2;

    // normalize 좌표로 변환 (translate(-minX, maxY) scale(1,-1) 적용 후)
    const normCenterX = centerX - minX;
    const normCenterY = maxY - centerY;

    const seatWidth = Math.max(1, seatBounds.maxX - seatBounds.minX);
    const seatHeight = Math.max(1, seatBounds.maxY - seatBounds.minY);
    const fitSeatScale = Math.min(width / (seatWidth * 1.08), viewHeight / (seatHeight * 1.08));
    const fitScale = (initialViewMode === 'fit-seats' ? fitSeatScale : 1.1) * initialScaleMultiplier;

    // 좌석 영역 중심이 화면 중앙에 오도록 tx, ty 계산
    const initTx = width / 2 - normCenterX * fitScale;
    // 3층은 10% 하단으로 이동
    const tyOffset = floor === '3' ? viewHeight * 0.10 : 0;
    const initTy = viewHeight / 2 - normCenterY * fitScale + tyOffset;

    return { scale: fitScale, tx: initTx, ty: initTy };
  }, [seatBounds, minX, maxY, width, viewHeight, floor, initialViewMode, initialScaleMultiplier]);

  // Pan/Zoom
  const [scale, setScale] = useState(initialView.scale);
  const [tx, setTx] = useState(initialView.tx);
  const [ty, setTy] = useState(initialView.ty);
  const [dragging, setDragging] = useState(false);
  const [last, setLast] = useState<{ x: number; y: number } | null>(null);
  const [initialized, setInitialized] = useState(false);

  // 양평점은 선을 더 얇게 (상세 도면이라 선이 많음)
  const strokeWidth = branch === 'yangpyeong'
    ? Math.max(width, viewHeight) / 30000
    : Math.max(width, viewHeight) / 15000;

  // 초기 뷰 설정 (마운트 시)
  useEffect(() => {
    if (!initialized) {
      setScale(initialView.scale);
      setTx(initialView.tx);
      setTy(initialView.ty);
      setInitialized(true);
    }
  }, [initialView, initialized]);

  // 층 변경 시 뷰 리셋
  useEffect(() => {
    setScale(initialView.scale);
    setTx(initialView.tx);
    setTy(initialView.ty);
  }, [floor, initialView.scale, initialView.tx, initialView.ty]);

  // 좌석 드래그 핸들러
  function onSeatMouseDown(e: React.MouseEvent, seatId: string) {
    if (!editMode && !editable) return;
    e.stopPropagation();
    e.preventDefault();
    setDraggingSeat(seatId);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      seatX: seatOffsets[seatId]?.x || 0,
      seatY: seatOffsets[seatId]?.y || 0,
    });
  }

  // window 레벨 드래그 추적
  useEffect(() => {
    if (!draggingSeat || !dragStart) return;

    const currentDraggingSeat = draggingSeat;
    const currentDragStart = dragStart;

    function handleMouseMove(e: MouseEvent) {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;

      const dx = ((e.clientX - currentDragStart.x) / rect.width) * width / scale;
      const dy = ((e.clientY - currentDragStart.y) / rect.height) * viewHeight / scale;

      setSeatOffsets(currentDraggingSeat, {
        x: Math.round(currentDragStart.seatX + dx),
        y: Math.round(currentDragStart.seatY - dy),
      });
    }

    function handleMouseUp() {
      console.log(`${currentDraggingSeat} 오프셋:`, seatOffsets[currentDraggingSeat]);
      setDraggingSeat(null);
      setDragStart(null);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingSeat, dragStart, scale, width, viewHeight, seatOffsets, setSeatOffsets]);

  // 좌표 마커 드래그 핸들러
  function onCoordMarkerMouseDown(e: React.MouseEvent, index: number) {
    e.stopPropagation();
    e.preventDefault();
    const coord = clickedCoords[index];
    setDraggingCoordIndex(index);
    setCoordDragStart({
      x: e.clientX,
      y: e.clientY,
      coordX: coord.x,
      coordY: coord.y,
    });
  }

  // 좌표 마커 드래그 추적 (window 레벨)
  useEffect(() => {
    if (draggingCoordIndex === null || !coordDragStart) return;

    const currentIndex = draggingCoordIndex;
    const currentStart = coordDragStart;

    function handleMouseMove(e: MouseEvent) {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;

      const dx = ((e.clientX - currentStart.x) / rect.width) * width / scale;
      const dy = ((e.clientY - currentStart.y) / rect.height) * viewHeight / scale;

      setClickedCoords((prev) =>
        prev.map((coord, i) =>
          i === currentIndex
            ? { x: Math.round(currentStart.coordX + dx), y: Math.round(currentStart.coordY - dy) }
            : coord
        )
      );
    }

    function handleMouseUp() {
      console.log(`좌표 ${currentIndex + 1} 이동 완료:`, clickedCoords[currentIndex]);
      setDraggingCoordIndex(null);
      setCoordDragStart(null);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingCoordIndex, coordDragStart, scale, width, viewHeight, clickedCoords]);

  // 휠 줌 (native event listener로 처리하여 preventDefault 동작하도록)
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      if (!rect) return;

      const delta = -e.deltaY;
      const zoomFactor = delta > 0 ? 1.08 : 0.92;
      const nextScale = clamp(scale * zoomFactor, 0.2, 20);

      const px = ((e.clientX - rect.left) / rect.width) * width;
      const py = ((e.clientY - rect.top) / rect.height) * viewHeight;

      const k = nextScale / scale;
      setTx(px - k * (px - tx));
      setTy(py - k * (py - ty));
      setScale(nextScale);
    }

    svg.addEventListener('wheel', handleWheel, { passive: false });
    return () => svg.removeEventListener('wheel', handleWheel);
  }, [scale, tx, ty, width, viewHeight]);

  // 터치 이벤트 (태블릿용 핀치 줌 및 드래그)
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDistRef = useRef<number | null>(null);
  const lastPinchCenterRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    function getTouchCenter(touches: TouchList): { x: number; y: number } {
      const t1 = touches[0];
      const t2 = touches[1];
      return {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      };
    }

    function getTouchDistance(touches: TouchList): number {
      const t1 = touches[0];
      const t2 = touches[1];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        // 싱글 터치: 드래그 시작
        lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        lastPinchDistRef.current = null;
        lastPinchCenterRef.current = null;
      } else if (e.touches.length === 2) {
        // 투 핑거: 핀치 줌 시작
        e.preventDefault();
        lastPinchDistRef.current = getTouchDistance(e.touches);
        lastPinchCenterRef.current = getTouchCenter(e.touches);
        lastTouchRef.current = null;
      }
    }

    function handleTouchMove(e: TouchEvent) {
      const rect = svg?.getBoundingClientRect();
      if (!rect) return;

      if (e.touches.length === 1 && lastTouchRef.current) {
        // 싱글 터치: 드래그
        e.preventDefault();
        const touch = e.touches[0];
        const dx = ((touch.clientX - lastTouchRef.current.x) / rect.width) * width;
        const dy = ((touch.clientY - lastTouchRef.current.y) / rect.height) * viewHeight;

        const panSign = invertPan ? -1 : 1;
        setTx((v) => v + (dx * panSign) / scale);
        setTy((v) => v + (dy * panSign) / scale);
        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
      } else if (e.touches.length === 2 && lastPinchDistRef.current !== null && lastPinchCenterRef.current !== null) {
        // 투 핑거: 핀치 줌
        e.preventDefault();
        const newDist = getTouchDistance(e.touches);
        const newCenter = getTouchCenter(e.touches);

        // 줌 계산
        const zoomFactor = newDist / lastPinchDistRef.current;
        const nextScale = clamp(scale * zoomFactor, 0.2, 20);

        // 핀치 중심점 기준 줌
        const px = ((newCenter.x - rect.left) / rect.width) * width;
        const py = ((newCenter.y - rect.top) / rect.height) * viewHeight;

        const k = nextScale / scale;
        setTx(px - k * (px - tx));
        setTy(py - k * (py - ty));
        setScale(nextScale);

        // 드래그도 같이 처리
        const cdx = ((newCenter.x - lastPinchCenterRef.current.x) / rect.width) * width;
        const cdy = ((newCenter.y - lastPinchCenterRef.current.y) / rect.height) * viewHeight;
        const panSign = invertPan ? -1 : 1;
        setTx((v) => v + (cdx * panSign) / nextScale);
        setTy((v) => v + (cdy * panSign) / nextScale);

        lastPinchDistRef.current = newDist;
        lastPinchCenterRef.current = newCenter;
      }
    }

    function handleTouchEnd(e: TouchEvent) {
      if (e.touches.length === 0) {
        lastTouchRef.current = null;
        lastPinchDistRef.current = null;
        lastPinchCenterRef.current = null;
      } else if (e.touches.length === 1) {
        // 한 손가락만 남으면 드래그 모드로 전환
        lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        lastPinchDistRef.current = null;
        lastPinchCenterRef.current = null;
      }
    }

    svg.addEventListener('touchstart', handleTouchStart, { passive: false });
    svg.addEventListener('touchmove', handleTouchMove, { passive: false });
    svg.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      svg.removeEventListener('touchstart', handleTouchStart);
      svg.removeEventListener('touchmove', handleTouchMove);
      svg.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scale, tx, ty, width, viewHeight, invertPan]);

  // 화면 좌표를 DXF 좌표로 변환
  function screenToDxf(clientX: number, clientY: number): { x: number; y: number } {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    // 화면 좌표 → SVG viewBox 좌표
    const svgX = ((clientX - rect.left) / rect.width) * width;
    const svgY = ((clientY - rect.top) / rect.height) * viewHeight;

    // transform 역변환: translate(tx, ty) scale(scale) → translate(-minX, maxY) scale(1, -1)
    const afterScale = { x: (svgX - tx) / scale, y: (svgY - ty) / scale };
    // DXF 좌표로 변환
    const dxfX = afterScale.x + minX;
    const dxfY = maxY - afterScale.y;

    return { x: dxfX, y: dxfY };
  }

  // 드래그 이동
  function onMouseDown(e: React.MouseEvent) {
    if (coordMode) {
      // 좌표 확인 모드: 클릭 좌표 저장
      const dxf = screenToDxf(e.clientX, e.clientY);
      const newCoord = { x: Math.round(dxf.x), y: Math.round(dxf.y) };
      setClickedCoords((prev) => [...prev, newCoord]);
      console.log(`클릭 좌표 ${clickedCoords.length + 1}: x=${newCoord.x}, y=${newCoord.y}`);
      return;
    }
    if (deleteMode) {
      // 삭제 모드: 영역 선택 시작
      const dxf = screenToDxf(e.clientX, e.clientY);
      setSelectionBox({ startX: dxf.x, startY: dxf.y, endX: dxf.x, endY: dxf.y });
      setIsSelecting(true);
      return;
    }
    setDragging(true);
    setLast({ x: e.clientX, y: e.clientY });
  }

  function onMouseMove(e: React.MouseEvent) {
    if (deleteMode && isSelecting && selectionBox) {
      // 삭제 모드: 영역 선택 중
      const dxf = screenToDxf(e.clientX, e.clientY);
      setSelectionBox({ ...selectionBox, endX: dxf.x, endY: dxf.y });
      return;
    }

    if (!dragging || !last) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = ((e.clientX - last.x) / rect.width) * width;
    const dy = ((e.clientY - last.y) / rect.height) * viewHeight;

    const panSign = invertPan ? -1 : 1;
    setTx((v) => v + (dx * panSign) / scale);
    setTy((v) => v + (dy * panSign) / scale);
    setLast({ x: e.clientX, y: e.clientY });
  }

  function onMouseUp() {
    if (deleteMode && isSelecting && selectionBox) {
      // 삭제 모드: 영역 선택 완료 → 삭제 실행
      deletePathsInSelection();
      return;
    }
    setDragging(false);
    setLast(null);
  }

  // 뷰 리셋 (좌석 영역에 맞춤)
  function resetView() {
    setScale(initialView.scale);
    setTx(initialView.tx);
    setTy(initialView.ty);
    setSelectedStudyRoom(null);
  }

  // 독서실 선택 시 해당 영역으로 이동
  function selectStudyRoom(roomId: string | null) {
    setSelectedStudyRoom(roomId);

    if (roomId === null) {
      // 전체 보기
      setScale(initialView.scale);
      setTx(initialView.tx);
      setTy(initialView.ty);
      return;
    }

    const room = studyRooms.find((r) => r.id === roomId);
    if (!room) return;

    const { bounds } = room;
    const roomCenterX = (bounds.minX + bounds.maxX) / 2;
    const roomCenterY = (bounds.minY + bounds.maxY) / 2;
    const roomWidth = bounds.maxX - bounds.minX;
    const roomHeight = bounds.maxY - bounds.minY;

    // normalize 좌표로 변환
    const normCenterX = roomCenterX - minX;
    const normCenterY = maxY - roomCenterY;

    // 독서실 영역이 화면에 꽉 차도록 스케일 계산 (여백 포함)
    const padding = 1.2; // 20% 여백
    const scaleX = width / (roomWidth * padding);
    const scaleY = viewHeight / (roomHeight * padding);
    const fitScale = Math.min(scaleX, scaleY, 8); // 최대 800%

    // 독서실 중심이 화면 중앙에 오도록
    const newTx = width / 2 - normCenterX * fitScale;
    const newTy = viewHeight / 2 - normCenterY * fitScale;

    setScale(fitScale);
    setTx(newTx);
    setTy(newTy);
  }

  const enabledCount = enabledLayerList.length;
  const isEditable = editMode || editable;

  return (
    <div className="w-full h-full relative" style={{ height }}>
      {/* 컨트롤 패널 */}
      {showControls && (
      <div className="absolute z-10 top-3 left-3 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
          className="bg-white/90 backdrop-blur"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          초기화
        </Button>
        {showLayerControl && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            className="bg-white/90 backdrop-blur"
          >
            <Layers className="h-4 w-4 mr-1" />
            레이어 ({enabledCount}/{layerNames.length})
          </Button>
        )}
        {mode === 'edit' && (
          <>
            <Button
              variant={editMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setEditMode(!editMode);
                setDeleteMode(false);
                if (editMode) {
                  console.log('좌석 오프셋:', JSON.stringify(seatOffsets, null, 2));
                }
              }}
              className={editMode ? '' : 'bg-white/90 backdrop-blur'}
            >
              {editMode ? '편집 완료' : '좌석 편집'}
            </Button>
            <Button
              variant={deleteMode ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => {
                setDeleteMode(!deleteMode);
                setEditMode(false);
                setSelectionBox(null);
                setIsSelecting(false);
              }}
              className={deleteMode ? '' : 'bg-white/90 backdrop-blur'}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {deleteMode ? '삭제모드 종료' : '요소 삭제'}
            </Button>
            {deleteMode && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={restoreDeletedPaths}
                  className="bg-white/90 backdrop-blur"
                >
                  <Undo2 className="h-4 w-4 mr-1" />
                  복원
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadFilteredJson}
                  className="bg-white/90 backdrop-blur"
                >
                  <Download className="h-4 w-4 mr-1" />
                  JSON 저장
                </Button>
              </>
            )}
            <Button
              variant={coordMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setCoordMode(!coordMode);
                setEditMode(false);
                setDeleteMode(false);
                if (!coordMode) {
                  setClickedCoords([]);
                }
              }}
              className={coordMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/90 backdrop-blur'}
            >
              <Crosshair className="h-4 w-4 mr-1" />
              좌표 확인
            </Button>
          </>
        )}
      </div>
      )}

      {/* 레이어 패널 */}
      {showLayerPanel && (
        <div className="absolute z-10 top-14 left-3 bg-white/95 backdrop-blur border rounded-lg shadow-lg p-3 max-w-[300px] max-h-[300px] overflow-auto">
          <div className="text-sm font-medium mb-2">레이어 표시</div>
          <div className="space-y-1">
            {layerNames.map((name) => (
              <label key={name} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-50 p-1 rounded">
                <Checkbox
                  checked={!!enabledLayers[name]}
                  onCheckedChange={(checked) =>
                    setEnabledLayers((v) => ({ ...v, [name]: !!checked }))
                  }
                />
                <span className="truncate" title={name}>{name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 좌표 확인 패널 */}
      {coordMode && (
        <div className="absolute z-10 top-14 right-3 bg-white/95 backdrop-blur border rounded-lg shadow-lg p-3 min-w-[280px] max-h-[400px] overflow-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">클릭한 좌표</div>
            <div className="flex gap-1">
              {clickedCoords.length > 0 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => {
                      const text = clickedCoords
                        .map((c, i) => `${i + 1}: x=${c.x}, y=${c.y}`)
                        .join('\n');
                      navigator.clipboard.writeText(text);
                    }}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    복사
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-red-500 hover:text-red-600"
                    onClick={() => setClickedCoords([])}
                  >
                    <X className="h-3 w-3 mr-1" />
                    초기화
                  </Button>
                </>
              )}
            </div>
          </div>
          {clickedCoords.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              도면을 클릭하면 좌표가 표시됩니다.
              <br />
              독서실 영역의 좌상단/우하단을 클릭하세요.
            </p>
          ) : (
            <div className="space-y-1">
              {clickedCoords.map((coord, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-xs bg-muted/50 rounded px-2 py-1"
                >
                  <span className="font-medium text-blue-600">#{i + 1}</span>
                  <span className="font-mono">
                    x: {coord.x}, y: {coord.y}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0"
                    onClick={() => {
                      setClickedCoords((prev) => prev.filter((_, idx) => idx !== i));
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {clickedCoords.length >= 2 && (
            <div className="mt-3 pt-3 border-t">
              <div className="text-xs font-medium mb-1">영역 계산 (마지막 2개 좌표)</div>
              <div className="text-xs font-mono bg-blue-50 rounded p-2">
                minX: {Math.min(clickedCoords[clickedCoords.length - 2].x, clickedCoords[clickedCoords.length - 1].x)}
                <br />
                maxX: {Math.max(clickedCoords[clickedCoords.length - 2].x, clickedCoords[clickedCoords.length - 1].x)}
                <br />
                minY: {Math.min(clickedCoords[clickedCoords.length - 2].y, clickedCoords[clickedCoords.length - 1].y)}
                <br />
                maxY: {Math.max(clickedCoords[clickedCoords.length - 2].y, clickedCoords[clickedCoords.length - 1].y)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 독서실 필터 (양평점 전용) */}
      {studyRooms.length > 0 && (
        <div className="absolute z-10 top-3 right-3 bg-white/95 backdrop-blur border rounded-lg shadow-sm p-1 flex gap-1">
          <button
            onClick={() => selectStudyRoom(null)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedStudyRoom === null
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            {floor}층 전체
          </button>
          {studyRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => selectStudyRoom(room.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedStudyRoom === room.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {room.name.replace('독서실', '독')}
            </button>
          ))}
        </div>
      )}

      {/* 줌 레벨 표시 */}
      {showControls && (
      <div className="absolute z-10 bottom-3 right-3 bg-white/90 backdrop-blur border rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
        {Math.round(scale * 100)}%
      </div>
      )}

      {/* 안내 */}
      {showControls && (
      <div className="absolute z-10 bottom-3 left-3 bg-white/90 backdrop-blur border rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
        {coordMode
          ? '클릭: 좌표 추가 | 마커 드래그: 위치 조정 | 휠: 줌'
          : deleteMode
            ? '삭제할 영역을 드래그하여 선택하세요'
            : isEditable
              ? '좌석을 드래그하여 위치 조정'
              : '마우스 휠: 줌 | 드래그: 이동'}
      </div>
      )}

      {/* SVG 도면 */}
      <svg
        ref={svgRef}
        className="w-full h-full bg-white"
        viewBox={`0 0 ${width} ${viewHeight}`}
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          cursor: coordMode
            ? 'crosshair'
            : deleteMode
              ? 'crosshair'
              : isEditable
                ? draggingSeat
                  ? 'grabbing'
                  : 'default'
                : dragging
                  ? 'grabbing'
                  : 'grab',
          touchAction: 'none',
        }}
      >
        {/* 독서실 클리핑 마스크 정의 */}
        <defs>
          {studyRooms.map((room) => {
            // clipBounds가 있으면 하드코딩 좌표 사용, 없으면 자동 계산
            if (room.clipBounds) {
              const cb = room.clipBounds;
              return (
                <clipPath key={room.id} id={`clip-${room.id}`}>
                  <rect
                    x={cb.minX}
                    y={cb.minY}
                    width={cb.maxX - cb.minX}
                    height={cb.maxY - cb.minY}
                  />
                </clipPath>
              );
            }
            // 자동 계산 (clipBounds 없는 경우)
            const { bounds } = room;
            const roomWidth = bounds.maxX - bounds.minX;
            const roomHeight = bounds.maxY - bounds.minY;
            const clipInsetLeft = roomWidth * 0.001;
            const clipInsetRight = roomWidth * 0.011;
            const clipInsetTop = roomHeight * 0.001;
            const clipInsetBottom = roomHeight * 0.011;
            return (
              <clipPath key={room.id} id={`clip-${room.id}`}>
                <rect
                  x={bounds.minX + clipInsetLeft}
                  y={bounds.minY + clipInsetBottom}
                  width={roomWidth - clipInsetLeft - clipInsetRight}
                  height={roomHeight - clipInsetTop - clipInsetBottom}
                />
              </clipPath>
            );
          })}
        </defs>

        <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
          <g
            transform={`translate(${-minX} ${maxY}) scale(1 -1)`}
            clipPath={selectedStudyRoom ? `url(#clip-${selectedStudyRoom})` : undefined}
          >
            {/* 도면 레이어 */}
            {layerNames.map((layer) => {
              if (!enabledLayers[layer]) return null;
              const data = planData.layers[layer];
              return (
                <g key={layer} data-layer={layer}>
                  {data.paths.map((d, i) => {
                    // 삭제된 path는 렌더링하지 않음
                    if (isPathDeleted(layer, i)) return null;
                    return (
                      <path
                        key={i}
                        d={d}
                        fill="none"
                        stroke="#333"
                        strokeWidth={strokeWidth}
                        vectorEffect="non-scaling-stroke"
                        shapeRendering="geometricPrecision"
                      />
                    );
                  })}
                </g>
              );
            })}

            {/* 선택 영역 표시 (삭제 모드) */}
            {deleteMode && selectionBox && (
              <rect
                x={Math.min(selectionBox.startX, selectionBox.endX)}
                y={Math.min(selectionBox.startY, selectionBox.endY)}
                width={Math.abs(selectionBox.endX - selectionBox.startX)}
                height={Math.abs(selectionBox.endY - selectionBox.startY)}
                fill="rgba(239, 68, 68, 0.2)"
                stroke="#ef4444"
                strokeWidth={strokeWidth * 2}
                strokeDasharray={`${strokeWidth * 10} ${strokeWidth * 5}`}
              />
            )}

            {/* 클릭한 좌표 마커 표시 (좌표 확인 모드) */}
            {coordMode && clickedCoords.map((coord, i) => {
              const markerSize = 300;
              const isDragging = draggingCoordIndex === i;
              return (
                <g
                  key={i}
                  onMouseDown={(e) => onCoordMarkerMouseDown(e, i)}
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                  {/* 드래그 가능 영역 (투명한 큰 원) */}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={markerSize * 1.5}
                    fill="transparent"
                  />
                  {/* 십자 마커 */}
                  <line
                    x1={coord.x - markerSize}
                    y1={coord.y}
                    x2={coord.x + markerSize}
                    y2={coord.y}
                    stroke={isDragging ? '#1d4ed8' : '#2563eb'}
                    strokeWidth={strokeWidth * 3}
                  />
                  <line
                    x1={coord.x}
                    y1={coord.y - markerSize}
                    x2={coord.x}
                    y2={coord.y + markerSize}
                    stroke={isDragging ? '#1d4ed8' : '#2563eb'}
                    strokeWidth={strokeWidth * 3}
                  />
                  {/* 번호 표시 */}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={markerSize * 0.6}
                    fill={isDragging ? '#1d4ed8' : '#2563eb'}
                    stroke={isDragging ? '#fff' : 'none'}
                    strokeWidth={isDragging ? strokeWidth * 2 : 0}
                  />
                  <text
                    x={coord.x}
                    y={coord.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize={markerSize * 0.8}
                    fontWeight="bold"
                    transform={`scale(1, -1) translate(0, ${-coord.y * 2})`}
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}

            {/* 좌석 레이어 */}
            <SeatLayer
              floor={floor}
              seats={visibleSeatIds ? seats.filter((seat) => visibleSeatIds.includes(seat.id)) : seats}
              labels={labels}
              seatStatus={seatStatus}
              seatOffsets={seatOffsets}
              editMode={isEditable}
              draggingSeat={draggingSeat}
              onSeatMouseDown={onSeatMouseDown}
              onSeatClick={onSeatClick}
              mode={mode}
              showDepartureTime={showDepartureTime}
              showSeatIdBadge={showSeatIdBadge}
              seatIdBadgePlacement={seatIdBadgePlacement}
              showScheduleLabels={showScheduleLabels}
              scheduleLabelPlacement={scheduleLabelPlacement}
              textRotation={textRotation}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
