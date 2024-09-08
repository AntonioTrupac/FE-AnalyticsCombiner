import { useState, useCallback } from 'react';
import { Layout } from 'react-grid-layout';
import { WidgetProps } from '@/components/widgets/Widget';
import { GroupData } from '@/pages/Home';

export function useDashboard(initialAvailableWidgets: WidgetProps[]) {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [widgets, setWidgets] = useState<WidgetProps[]>([]);
  const [layout, setLayout] = useState<Layout[]>([]);

  const onLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout(newLayout);
  }, []);

  const addWidgetToDashboard = useCallback(
    (widgetId: string) => {
      const widget = initialAvailableWidgets.find((w) => w.id === widgetId);
      if (!widget) return;

      const newWidget = { ...widget, id: `${widgetId}-${Date.now()}` };
      setWidgets((prev) => [...prev, newWidget]);
      setLayout((prev) => [
        ...prev,
        { i: newWidget.id, x: 0, y: Infinity, w: 1, h: 2 },
      ]);
    },
    [initialAvailableWidgets]
  );

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

  const addGroup = useCallback(() => {
    const newGroupId = `group-${Date.now()}`;
    setGroups((prev) => [
      ...prev,
      { id: newGroupId, title: 'New Group', widgets: [], layout: [] },
    ]);
    setLayout((prev) => [
      ...prev,
      { i: newGroupId, x: 0, y: Infinity, w: 2, h: 4 },
    ]);
  }, []);

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
    addGroup,
    removeGroup,
    updateGroupWidgets,
    addWidgetToGroup,
    removeWidgetFromGroup,
  };
}
