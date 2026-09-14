Imported from `C:/code/02_progress/daechi_app/src/components/floor-plan`.

`FloorPlanViewer.tsx`, `SeatLayer.tsx`, `types.ts`, `lib/daechi-floor-plan.ts`,
and `data/*plan.json` retain the source viewer's geometry, seat offsets,
layer filtering, labels, and pan/zoom behavior.

Local adaptations:
- Native button/checkbox adapters in `controls.tsx`.
- Default geometry and fitted viewport initialized on the first render.
- Browser storage for layout edits is only used in edit mode.

The public dialog uses view mode with layer editing disabled. It receives
only available seat IDs and `checkedAt` from `/api/day-pass/seats`;
no student or attendance data is passed to the viewer.
