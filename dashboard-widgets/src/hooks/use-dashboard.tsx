import { useState, useCallback } from 'react';
import { Layout } from 'react-grid-layout';
import { WidgetProps } from '@/components/widgets/Widget';

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

export function useDashboard(initialAvailableWidgets: WidgetProps[]) {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [widgets, setWidgets] = useState<WidgetProps[]>([]);
  const [layout, setLayout] = useState<Layout[]>([]);

  const onLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout(newLayout);
  }, []);

  const findNextPosition = useCallback(
    (width: number, height: number): { x: number; y: number } => {
      if (layout.length === 0) return { x: 0, y: 0 };

      const sortedLayout = [...layout].sort((a, b) => {
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
    },
    [layout]
  );

  const addWidgetToDashboard = useCallback(
    (widgetId: string) => {
      const widget = initialAvailableWidgets.find((w) => w.id === widgetId);
      if (!widget) return;

      const newWidget = { ...widget, id: `${widgetId}-${Date.now()}` };
      setWidgets((prev) => [...prev, newWidget]);
      setLayout((prev) => {
        const { x: newX, y: newY } = findNextPosition(
          WIDGET_WIDTH,
          WIDGET_HEIGHT
        );
        return [
          ...prev,
          {
            i: newWidget.id,
            x: newX,
            y: newY,
            w: WIDGET_WIDTH,
            h: WIDGET_HEIGHT,
          },
        ];
      });
    },
    [findNextPosition, initialAvailableWidgets]
  );

  const addGroupToDashboard = useCallback(() => {
    const newGroupId = `group-${Date.now()}`;
    setGroups((prev) => [
      ...prev,
      { id: newGroupId, title: 'New Group', widgets: [], layout: [] },
    ]);
    setLayout((prev) => {
      const { x: newX, y: newY } = findNextPosition(GROUP_WIDTH, GROUP_HEIGHT);
      return [
        ...prev,
        { i: newGroupId, x: newX, y: newY, w: GROUP_WIDTH, h: GROUP_HEIGHT },
      ];
    });
  }, [findNextPosition]);

  const removeWidgetFromDashboard = useCallback((widgetId: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== widgetId));
    setLayout((prev) => prev.filter((l) => l.i !== widgetId));
  }, []);

  const addWidgetToGroup = useCallback(
    (groupId: string, widgetId: string) => {
      const widget = initialAvailableWidgets.find((w) => w.id === widgetId);
      if (!widget) return;

      const newWidget = { ...widget, id: `${widgetId}-${Date.now()}` };
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId
            ? {
                ...group,
                widgets: [...group.widgets, newWidget],
                layout: [
                  ...group.layout,
                  { i: newWidget.id, x: 0, y: Infinity, w: 1, h: 2 },
                ],
              }
            : group
        )
      );
    },
    [initialAvailableWidgets]
  );

  const removeWidgetFromGroup = useCallback(
    (groupId: string, widgetId: string) => {
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId
            ? {
                ...group,
                widgets: group.widgets.filter((w) => w.id !== widgetId),
                layout: group.layout.filter((l) => l.i !== widgetId),
              }
            : group
        )
      );
    },
    []
  );

  const removeGroup = useCallback((groupId: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    setLayout((prev) => prev.filter((l) => l.i !== groupId));
  }, []);

  const updateGroupWidgets = useCallback(
    (groupId: string, newWidgets: WidgetProps[], newLayout: Layout[]) => {
      setGroups((prev) =>
        prev.map((group) =>
          group.id === groupId
            ? { ...group, widgets: newWidgets, layout: newLayout }
            : group
        )
      );
    },
    []
  );

  return {
    initialAvailableWidgets,
    groups,
    widgets,
    layout,
    onLayoutChange,
    addWidgetToDashboard,
    removeWidgetFromDashboard,
    addGroupToDashboard,
    removeGroup,
    updateGroupWidgets,
    addWidgetToGroup,
    removeWidgetFromGroup,
  };
}
