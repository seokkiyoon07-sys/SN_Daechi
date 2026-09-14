'use client';

import React from 'react';
import type { SeatLayerProps } from './types';

function getStatusColor(
  status?: string,
  attitude?: number,
  mode?: string,
  hasStudent?: boolean,
  customColor?: string
): string {
  // Use custom seat color first when present.
  if (customColor) {
    const hex = customColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  }

  // Attendance mode color mapping.
  if (mode === 'attendance') {
    switch (status) {
      case 'present':
        return 'rgba(34, 197, 94, 0.5)';
      case 'absent':
        return 'rgba(239, 68, 68, 0.5)';
      case 'late':
        return 'rgba(234, 179, 8, 0.5)';
      case 'away':
        return 'rgba(156, 163, 175, 0.5)';
      default:
        return 'transparent';
    }
  }

  // Attitude mode (1-5) color mapping.
  if (mode === 'attitude' && attitude) {
    const colors = [
      'rgba(239, 68, 68, 0.5)',
      'rgba(249, 115, 22, 0.5)',
      'rgba(234, 179, 8, 0.5)',
      'rgba(132, 204, 22, 0.5)',
      'rgba(34, 197, 94, 0.5)',
    ];
    return colors[attitude - 1] || 'transparent';
  }

  // Default view/edit mode: highlight occupied seat.
  if (hasStudent) {
    return 'rgba(59, 130, 246, 0.4)';
  }

  return 'transparent';
}

function isBirthdayToday(birthDate?: string | null): boolean {
  const digits = birthDate?.replace(/\D/g, '') ?? '';
  if (digits.length < 8) return false;

  const todayMMDD = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date()).replace(/\D/g, '');

  return digits.slice(4, 8) === todayMMDD;
}

export default function SeatLayer({
  seats,
  labels,
  seatStatus = {},
  seatOffsets,
  editMode,
  draggingSeat,
  onSeatMouseDown,
  onSeatClick,
  mode = 'view',
  showDepartureTime = false,
  showSeatIdBadge = true,
  seatIdBadgePlacement = 'inside',
  showScheduleLabels = true,
  scheduleLabelPlacement = 'inside',
  textRotation = 0,
}: SeatLayerProps) {
  const rotateText = (x = 0, y = 0) =>
    textRotation ? `rotate(${textRotation} ${x} ${y})` : undefined;

  return (
    <>
      {seats.map((seat) => {
        const offsetX = seatOffsets[seat.id]?.x || 0;
        const offsetY = seatOffsets[seat.id]?.y || 0;
        const finalX = seat.x + offsetX;
        const finalY = seat.y + offsetY;
        const isDragging = draggingSeat === seat.id;

        const status = seatStatus[seat.id];
        const hasStudent = !!status?.studentName;
        const statusColor = getStatusColor(
          status?.status,
          status?.attitude,
          mode,
          hasStudent,
          status?.color
        );

        const isVertical = seat.isVertical || ['W16', 'W17', 'W18', 'W19'].includes(seat.id);
        const defaultHeight = isVertical ? 900 : 600;
        const deskWidth = isVertical ? 600 : 900;
        const deskHeight = seat.height || defaultHeight;

        const hasScheduleLabel = showScheduleLabels && !!status?.scheduleLabel;
        const scheduleLabelText = status?.scheduleLabel ?? '';
        const isScheduleLabelOutside = scheduleLabelPlacement === 'outside';
        const isScheduleLabelWarning = status?.scheduleLabelTone === 'warning';
        const displayText = hasStudent ? `${status.studentName}` : seat.id;
        const fontSize = hasStudent && displayText.length > 3 ? 150 : 200;
        const scheduleLabelFontSize = isScheduleLabelOutside
          ? isScheduleLabelWarning ? 105 : 90
          : 120;
        const scheduleLabelWidth = Math.max(720, Math.min(1100, scheduleLabelText.length * 90 + 160));
        const scheduleLabelHeight = 160;
        const shouldShowSeatIdBadge = showSeatIdBadge && hasStudent && (mode === 'attendance' || mode === 'attitude');
        const shouldShowLiveBadge = hasStudent && (mode === 'attendance' || mode === 'attitude') && !!status?.liveStatus;
        const liveIsPresent = status?.liveStatus === 'present';
        const liveBadgeLabel = liveIsPresent ? '입실' : '외출';
        const liveBadgeColor = liveIsPresent ? '#16a34a' : '#f97316';
        const seatIdBadgeWidth = Math.max(280, seat.id.length * 95 + 120);
        const seatIdBadgeHeight = 150;
        const seatIdBadgeX = seatIdBadgePlacement === 'outside'
          ? -seatIdBadgeWidth / 2
          : -deskWidth / 2 + 45;
        const seatIdBadgeY = seatIdBadgePlacement === 'outside'
          ? -deskHeight / 2 - seatIdBadgeHeight - 55
          : -deskHeight / 2 + 45;
        const seatIdBadgeTextX = seatIdBadgeX + seatIdBadgeWidth / 2;
        const seatIdBadgeTextY = seatIdBadgeY + seatIdBadgeHeight / 2;
        const nameTextY = hasScheduleLabel && !isScheduleLabelOutside ? -80 : 0;
        const scheduleTextY = isScheduleLabelOutside ? deskHeight / 2 + 155 : 80;
        const departureTextY = hasScheduleLabel && !isScheduleLabelOutside ? 220 : 130;

        return (
          <g
            key={seat.id}
            transform={`translate(${finalX} ${finalY}) scale(1 -1)`}
            className="seat-label"
            onMouseDown={(e) => onSeatMouseDown(e, seat.id)}
            onClick={() => onSeatClick?.(seat.id)}
            style={{ cursor: editMode ? 'move' : 'pointer' }}
          >
            {status?.recordEligibilityLabel && <title>{status.recordEligibilityLabel}</title>}
            <rect
              x={-deskWidth / 2}
              y={-deskHeight / 2}
              width={deskWidth}
              height={deskHeight}
              fill={
                isDragging
                  ? 'rgba(59, 130, 246, 0.5)'
                  : statusColor !== 'transparent'
                    ? statusColor
                    : 'transparent'
              }
              stroke={editMode ? '#3b82f6' : status?.borderColor || 'none'}
              strokeWidth={editMode ? 30 : status?.borderColor ? 18 : 0}
              strokeDasharray={editMode ? '60 30' : 'none'}
              className="seat-desk"
            />
            {shouldShowSeatIdBadge && (
              <g>
                <rect
                  x={seatIdBadgeX}
                  y={seatIdBadgeY}
                  width={seatIdBadgeWidth}
                  height={seatIdBadgeHeight}
                  rx={45}
                  ry={45}
                  fill="rgba(255,255,255,0.9)"
                  stroke={status?.borderColor || 'rgba(30, 64, 175, 0.28)'}
                  strokeWidth={18}
                />
                <text
                  x={seatIdBadgeTextX}
                  y={seatIdBadgeTextY}
                  fontSize={105}
                  fill={status?.textColor || '#1e40af'}
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="central"
                  transform={rotateText(seatIdBadgeTextX, seatIdBadgeTextY)}
                >
                  {seat.id}
                </text>
              </g>
            )}
            {shouldShowLiveBadge && (
              mode === 'attitude' ? (
                <circle
                  cx={deskWidth / 2 - 120}
                  cy={-deskHeight / 2 + 120}
                  r={52}
                  fill={liveBadgeColor}
                  stroke="rgba(255,255,255,0.94)"
                  strokeWidth={22}
                />
              ) : (
                <g>
                  <rect
                    x={deskWidth / 2 - 315}
                    y={-deskHeight / 2 + 45}
                    width={270}
                    height={150}
                    rx={55}
                    ry={55}
                    fill="rgba(255,255,255,0.94)"
                    stroke={liveBadgeColor}
                    strokeWidth={20}
                  />
                  <circle
                    cx={deskWidth / 2 - 265}
                    cy={-deskHeight / 2 + 120}
                    r={25}
                    fill={liveBadgeColor}
                  />
                  <text
                    x={deskWidth / 2 - 155}
                    y={-deskHeight / 2 + 120}
                    fontSize={100}
                    fill={liveBadgeColor}
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={rotateText(deskWidth / 2 - 155, -deskHeight / 2 + 120)}
                  >
                    {liveBadgeLabel}
                  </text>
                </g>
              )
            )}
            <text
              fontSize={fontSize}
              fill={status?.textColor || (hasStudent ? '#1e3a8a' : isDragging ? '#1e3a8a' : '#1e40af')}
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              y={nameTextY}
              transform={rotateText(0, nameTextY)}
            >
              {displayText}
            </text>
            {hasScheduleLabel && (
              <g>
                {isScheduleLabelOutside ? (
                  <rect
                    x={-scheduleLabelWidth / 2}
                    y={scheduleTextY - scheduleLabelHeight / 2}
                    width={scheduleLabelWidth}
                    height={scheduleLabelHeight}
                    rx={55}
                    ry={55}
                    fill={isScheduleLabelWarning ? 'rgba(255,247,237,0.98)' : 'rgba(255,255,255,0.94)'}
                    stroke={isScheduleLabelWarning ? 'rgba(234,88,12,0.82)' : 'rgba(107,114,128,0.38)'}
                    strokeWidth={isScheduleLabelWarning ? 24 : 16}
                  />
                ) : null}
                <text
                  fontSize={scheduleLabelFontSize}
                  fill={isScheduleLabelWarning ? '#c2410c' : status?.scheduleReason === 'class' ? '#1d4ed8' : '#4b5563'}
                  fontWeight={isScheduleLabelWarning ? 900 : 'bold'}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  y={scheduleTextY}
                  textLength={isScheduleLabelOutside && scheduleLabelText.length > 10 ? scheduleLabelWidth - 120 : undefined}
                  lengthAdjust="spacingAndGlyphs"
                  transform={rotateText(0, scheduleTextY)}
                >
                  {isScheduleLabelOutside ? scheduleLabelText : `(${scheduleLabelText})`}
                </text>
              </g>
            )}
            {showDepartureTime && hasStudent && (status?.departureTime || status?.scheduledDepartureTime) && (
              <text
                fontSize={110}
                fill={status?.departureTime ? '#475569' : '#94a3b8'}
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
                y={departureTextY}
                transform={rotateText(0, departureTextY)}
              >
                {status?.departureTime
                  ? `하원 ${status.departureTime}`
                  : `하원예정 ${status.scheduledDepartureTime}`}
              </text>
            )}
            {(() => {
              type Badge = { label: string; count?: number; accent: string; useEmoji?: boolean };
              const badges: Badge[] = [];
              if (status?.wasLateToday) {
                badges.push({ label: '지각', accent: '#dc2626' });
              }
              if (isBirthdayToday(status?.birthDate)) {
                badges.push({ label: '🎂 생일', accent: '#db2777', useEmoji: true });
              }
              if (status?.drowsyCountToday) {
                badges.push({ label: '졸음', count: status.drowsyCountToday, accent: '#f59e0b' });
              }
              if (status?.sleepCountToday) {
                badges.push({ label: '수면', count: status.sleepCountToday, accent: '#6b7280' });
              }
              if (status?.awayCountToday) {
                badges.push({ label: '자리비움', count: status.awayCountToday, accent: '#3b82f6' });
              }
              if (status?.hadCounselToday) {
                badges.push({ label: '상담', accent: '#a855f7' });
              }
              if (status?.bathroomPass) {
                badges.push({
                  label: '🚻',
                  count: status.bathroomPassCount ?? 1,
                  accent: status.bathroomPass === 'overflow' ? '#dc2626' : '#2563eb',
                  useEmoji: true,
                });
              }
              if (badges.length === 0) return null;

              const pillH = 200;
              const gap = 30;
              const cy = -deskHeight / 2 - pillH / 2 - 30;
              const charW = 160; // approx per Korean char at fontSize 150
              const padX = 60;
              let cursor = deskWidth / 2 - 20;
              const pills = [];
              for (let i = badges.length - 1; i >= 0; i--) {
                const b = badges[i];
                const labelChars = Array.from(b.label).length;
                const countText = b.count !== undefined ? String(b.count) : '';
                const countChars = countText.length;
                const innerW = charW * (labelChars + countChars) + (countChars > 0 ? gap : 0);
                const w = innerW + padX * 2;
                const cx = cursor - w / 2;
                cursor -= w + gap;
                pills.unshift(
                  <g key={`badge-${i}`}>
                    <rect
                      x={cx - w / 2}
                      y={cy - pillH / 2}
                      width={w}
                      height={pillH}
                      rx={pillH / 2}
                      ry={pillH / 2}
                      fill="#ffffff"
                      stroke={b.accent}
                      strokeWidth={28}
                    />
                    {b.count !== undefined ? (
                      <>
                        <text
                          x={cx - innerW / 2 + (charW * labelChars) / 2}
                          y={cy}
                          fontSize={150}
                          fill={b.accent}
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={rotateText(cx - innerW / 2 + (charW * labelChars) / 2, cy)}
                        >
                          {b.label}
                        </text>
                        <text
                          x={cx + innerW / 2 - (charW * countChars) / 2}
                          y={cy}
                          fontSize={150}
                          fill={b.accent}
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={rotateText(cx + innerW / 2 - (charW * countChars) / 2, cy)}
                        >
                          {countText}
                        </text>
                      </>
                    ) : (
                      <text
                        x={cx}
                        y={cy}
                        fontSize={150}
                        fill={b.accent}
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={rotateText(cx, cy)}
                      >
                        {b.label}
                      </text>
                    )}
                  </g>
                );
              }
              return <>{pills}</>;
            })()}
            <style>{`
              .seat-label .seat-desk { transition: fill 0.15s ease; }
              .seat-label:hover .seat-desk { fill: rgba(59, 130, 246, 0.3) !important; }
            `}</style>
          </g>
        );
      })}

      {labels.map((leg) => {
        const offsetX = seatOffsets[leg.id]?.x || 0;
        const offsetY = seatOffsets[leg.id]?.y || 0;
        const finalX = leg.x + offsetX;
        const finalY = leg.y + offsetY;
        const isDragging = draggingSeat === leg.id;

        return (
          <g
            key={leg.id}
            transform={`translate(${finalX} ${finalY}) scale(1 -1)`}
            onMouseDown={(e) => onSeatMouseDown(e, leg.id)}
            style={{ cursor: editMode ? 'move' : 'default' }}
          >
            {editMode && (
              <rect
                x={-100}
                y={-200}
                width={1800}
                height={400}
                fill={isDragging ? 'rgba(59, 130, 246, 0.3)' : 'transparent'}
                stroke="#3b82f6"
                strokeWidth={20}
                strokeDasharray="40 20"
              />
            )}
            <text
              fontSize={280}
              fill="#333"
              fontWeight="bold"
              textAnchor="start"
              dominantBaseline="middle"
              transform={rotateText(0, 0)}
            >
              {leg.label}
            </text>
            {leg.sub && (
              <text
                x={1600}
                fontSize={220}
                fill="#1e40af"
                fontWeight="bold"
                textAnchor="start"
                dominantBaseline="middle"
                transform={rotateText(1600, 0)}
              >
                ({leg.sub})
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}
