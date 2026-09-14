export type PlanJSON = {
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  layers: Record<
    string,
    {
      paths: string[];
      texts?: { x: number; y: number; text: string }[];
    }
  >;
};

export interface SeatData {
  id: string;
  x: number;
  y: number;
  isVertical?: boolean;
  height?: number;
}

export interface LabelData {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
}

export type ScheduleReason = 'class' | 'leave' | 'outing' | null;

export interface SeatStatus {
  status?: 'present' | 'absent' | 'late' | 'empty' | 'away';
  liveStatus?: 'present' | 'absent' | 'late' | 'empty' | 'away';
  liveLabel?: string;
  liveEventTime?: string;
  liveEventType?: string;
  recordTime?: string;
  recordEligibilityLabel?: string;
  attitude?: number;
  color?: string;
  textColor?: string;
  borderColor?: string;
  studentName?: string;
  studentNumber?: string;
  studentId?: string;
  checkInTime?: string;
  departureTime?: string;
  scheduledDepartureTime?: string;
  birthDate?: string;
  firstAttendanceDate?: string;
  scheduleReason?: ScheduleReason;
  scheduleLabel?: string;
  scheduleLabelTone?: 'default' | 'warning';
  scheduleDetail?: string;
  canRecordAttitude?: boolean;
  blockReason?: string;
  bathroomPass?: 'used' | 'overflow';
  bathroomPassCount?: number;
  wasLateToday?: boolean;
  sleepCountToday?: number;
  drowsyCountToday?: number;
  awayCountToday?: number;
  hadCounselToday?: boolean;
}

export type BranchId = 'daechi' | 'yangpyeong';

export interface FloorPlanViewerProps {
  visibleSeatIds?: string[];
  branch?: BranchId;
  floor: string;
  mode?: 'view' | 'edit' | 'attendance' | 'attitude';
  seatStatus?: Record<string, SeatStatus>;
  onSeatClick?: (seatId: string) => void;
  editable?: boolean;
  seatOffsets?: Record<string, { x: number; y: number }>;
  onSeatMove?: (seatId: string, offset: { x: number; y: number }) => void;
  showLayerControl?: boolean;
  showControls?: boolean;
  height?: string;
  initialViewMode?: 'default' | 'fit-seats';
  initialScaleMultiplier?: number;
  invertPan?: boolean;
  showDepartureTime?: boolean;
  showSeatIdBadge?: boolean;
  seatIdBadgePlacement?: 'inside' | 'outside';
  showScheduleLabels?: boolean;
  scheduleLabelPlacement?: 'inside' | 'outside';
  textRotation?: 0 | 180;
}

export interface SeatLayerProps {
  branch?: BranchId;
  floor: string;
  seats: SeatData[];
  labels: LabelData[];
  seatStatus?: Record<string, SeatStatus>;
  seatOffsets: Record<string, { x: number; y: number }>;
  editMode: boolean;
  draggingSeat: string | null;
  onSeatMouseDown: (e: React.MouseEvent, seatId: string) => void;
  onSeatClick?: (seatId: string) => void;
  mode?: 'view' | 'edit' | 'attendance' | 'attitude';
  showDepartureTime?: boolean;
  showSeatIdBadge?: boolean;
  seatIdBadgePlacement?: 'inside' | 'outside';
  showScheduleLabels?: boolean;
  scheduleLabelPlacement?: 'inside' | 'outside';
  textRotation?: 0 | 180;
}
