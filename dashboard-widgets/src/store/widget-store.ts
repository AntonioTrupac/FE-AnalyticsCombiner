import { WidgetProps } from '@/components/widgets/Widget';
import { Layout } from 'react-grid-layout';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GroupData = {
  id: string;
  title: string;
  widgets: WidgetProps[];
  layout: Layout[];
};

const GRID_COLS = 12;
const WIDGET_HEIGHT = 2;
const WIDGET_WIDTH = 4;
const GROUP_WIDTH = 6;
const GROUP_HEIGHT = 4;

type DashboardStore = {
  groups: GroupData[];
  widgets: WidgetProps[];
  layout: Layout[];
  availableWidgets: WidgetProps[];
  addWidget: (widget: string) => void;
  addGroup: () => void;
  removeWidget: (id: string) => void;
  removeGroup: (id: string) => void;
  addWidgetToGroup: (groupId: string, widgetId: string) => void;
  removeWidgetFromGroup: (groupId: string, widgetId: string) => void;
  updateGroupWidgets: (
    groupId: string,
    newWidgets: WidgetProps[],
    newLayout: Layout[]
  ) => void;
  setAvailableWidgets: (widgets: WidgetProps[]) => void;
  updateLayout: (newLayout: Layout[]) => void;
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      groups: [],
      widgets: [],
      layout: [],
      availableWidgets: [],

      addWidget: (widgetId) =>
        set((state) => {
          const newWidget = state.availableWidgets.find(
            (w) => w.id === widgetId
          );
          if (!newWidget) return state;

          const uniqueId = `${widgetId}-${Date.now()}`;
          const { x, y } = findNextPosition(
            state.layout,
            WIDGET_WIDTH,
            WIDGET_HEIGHT
          );

          return {
            widgets: [...state.widgets, { ...newWidget, id: uniqueId }],
            layout: [
              ...state.layout,
              {
                i: uniqueId,
                x,
                y,
                w: WIDGET_WIDTH,
                h: WIDGET_HEIGHT,
              },
            ],
          };
        }),

      addGroup: () =>
        set((state) => {
          // TODO: remove, temporary for now
          const newGroupId = `-group-temporaryId-${Date.now()}`;
          const { x, y } = findNextPosition(
            state.layout,
            GROUP_WIDTH,
            GROUP_HEIGHT
          );

          return {
            groups: [
              ...state.groups,
              {
                id: newGroupId,
                title: 'Whatever',
                widgets: [],
                layout: [],
              },
            ],
            layout: [
              ...state.layout,
              {
                i: newGroupId,
                x,
                y,
                w: GROUP_WIDTH,
                h: GROUP_HEIGHT,
              },
            ],
          };
        }),

      removeWidget: (widgetId) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== widgetId),
          layout: state.layout.filter((l) => l.i !== widgetId),
        })),
      removeGroup: (groupId) =>
        set((state) => ({
          groups: state.groups.filter((g) => g.id !== groupId),
          layout: state.layout.filter((l) => l.i !== groupId),
        })),

      addWidgetToGroup: (groupId, widgetId) =>
        set((state) => {
          const widget = state.availableWidgets.find((w) => w.id === widgetId);
          if (!widget) return state;

          //  TODO: temporary uniqueId
          const uniqueId = `${widgetId}-${Date.now()}`;
          const group = state.groups.find((g) => g.id === groupId);
          if (!group) return state;

          const { x, y } = findNextPosition(
            group.layout,
            WIDGET_WIDTH,
            WIDGET_HEIGHT
          );

          const newWidget = { ...widget, id: uniqueId };
          const newLayoutItem = {
            i: uniqueId,
            x,
            y,
            w: WIDGET_WIDTH,
            h: WIDGET_HEIGHT,
          };

          return {
            groups: state.groups.map((group) =>
              group.id === groupId
                ? {
                    ...group,
                    widgets: [...group.widgets, newWidget],
                    layout: [...group.layout, newLayoutItem],
                  }
                : group
            ),
          };
        }),

      removeWidgetFromGroup: (groupId, widgetId) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  widgets: group.widgets.filter((w) => w.id !== widgetId),
                  layout: group.layout.filter((l) => l.i !== widgetId),
                }
              : group
          ),
        })),

      updateGroupWidgets: (groupId, newWidgets, newLayout) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  widgets: newWidgets,
                  layout: newLayout,
                }
              : group
          ),
        })),
      setAvailableWidgets: (widgets) => set({ availableWidgets: widgets }),
      updateLayout: (newLayout) => set({ layout: newLayout }),
    }),
    { name: 'dashboard-store' }
  )
);

function findNextPosition(
  layout: Layout[],
  width: number,
  height: number
): { x: number; y: number } {
  if (layout.length === 0) return { x: 0, y: 0 };
  const sortedLayout = [...layout].sort((a, b) => {
    // if y cordinates are the same sort by x
    if (a.y === b.y) return a.x - b.x;
    return a.y - b.y;
  });

  const lastItem = sortedLayout[sortedLayout.length - 1];
  let newX = (lastItem.x + lastItem.w) % GRID_COLS;
  let newY = lastItem.y;

  if (newX + width > GRID_COLS) {
    newX = 0;
    newY = lastItem.y + lastItem.h;
  }

  /*
      Check if the new widget overlaps with any existing widget
      First check: Left ledge
      Second check: Right ledge
      Third check: Top ledge
      Fourth check: Bottom ledge
    */
  const hasOverlap = (x: number, y: number) =>
    sortedLayout.some(
      (item) =>
        x < item.x + item.w &&
        x + width > item.x &&
        y < item.y + item.h &&
        y + height > item.y
    );

  while (hasOverlap(newX, newY)) {
    newX += 1;
    if (newX + width > GRID_COLS) {
      newX = 0;
      newY += 1;
    }
  }

  return { x: newX, y: newY };
}
