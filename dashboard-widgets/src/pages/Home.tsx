import React, { useEffect } from 'react';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { Group } from '@/components/widgets/WidgetGroup';
import { Widget, WidgetProps } from '@/components/widgets/Widget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardControls } from '@/components/widgets/DashboardControls';
import { useDashboardStore } from '@/store/widget-store';

const ResponsiveGridLayout = WidthProvider(Responsive);

const initialAvailableWidgets: WidgetProps[] = [
  { id: 'weather1', type: 'weather', title: 'Weather' },
  { id: 'clock1', type: 'clock', title: 'Clock' },
  { id: 'sales1', type: 'sales', title: 'Sales' },
  { id: 'chart1', type: 'chart', title: 'Chart' },
];

export const Home: React.FC = () => {
  const {
    groups,
    widgets,
    layout,
    availableWidgets,
    addGroup,
    addWidget,
    removeGroup,
    removeWidget,
    addWidgetToGroup,
    removeWidgetFromGroup,
    updateGroupWidgets,
    updateLayout,
    setAvailableWidgets,
  } = useDashboardStore();

  const onLayoutChange = (newLayout: Layout[]) => {
    updateLayout(newLayout);
  };

  useEffect(() => {
    setAvailableWidgets(initialAvailableWidgets);
  }, [setAvailableWidgets]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <DashboardControls
        onAddGroup={addGroup}
        onAddWidget={addWidget}
        availableWidgets={availableWidgets}
      />

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={150}
        onLayoutChange={onLayoutChange}
        isDraggable
        isResizable
        draggableHandle=".dashboard-drag-handle"
        draggableCancel=".remove-button, .non-draggable, .widget-drag-handle"
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <Widget
              {...widget}
              onRemove={() => removeWidget(widget.id)}
              isDashboardWidget
            />
          </div>
        ))}
        {groups.map((group) => (
          <div key={group.id}>
            <Group
              {...group}
              availableWidgets={availableWidgets}
              onRemove={() => removeGroup(group.id)}
              onLayoutChange={(newLayout) =>
                updateGroupWidgets(group.id, group.widgets, newLayout)
              }
              onAddWidget={(widgetId) => addWidgetToGroup(group.id, widgetId)}
              onRemoveWidget={(widgetId) =>
                removeWidgetFromGroup(group.id, widgetId)
              }
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};
