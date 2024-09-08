import React from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { Widget, WidgetProps } from '@/components/widgets/Widget';
import { X } from 'lucide-react';

const ResponsiveGridLayout = WidthProvider(Responsive);

export type GroupProps = {
  title: string;
  widgets: WidgetProps[];
  layout: Layout[];
  availableWidgets: WidgetProps[];
  onRemove: () => void;
  onLayoutChange: (newLayout: Layout[]) => void;
  onAddWidget: (widgetId: string) => void;
  onRemoveWidget: (widgetId: string) => void;
};

export const Group: React.FC<GroupProps> = ({
  title,
  widgets,
  layout,
  availableWidgets,
  onRemove,
  onLayoutChange,
  onAddWidget,
  onRemoveWidget,
}) => {
  return (
    <div className="dashboard-drag-handle w-full h-full flex flex-col cursor-move">
      <div className=" p-4 bg-gray-200 rounded-t-lg flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={onRemove}
          className="remove-button p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          aria-label="Remove Group"
        >
          <X size={16} />
        </button>
      </div>
      <div className="bg-gray-100 rounded-b-lg shadow flex-grow flex flex-col min-h-0">
        <div className="flex-grow p-4 overflow-auto">
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }}
            rowHeight={150}
            onLayoutChange={onLayoutChange}
            isDraggable={true}
            isResizable={true}
            draggableHandle=".widget-drag-handle"
            draggableCancel=".remove-button, .dashboard-drag-handle"
          >
            {widgets.map((widget) => (
              <div key={widget.id}>
                <Widget
                  {...widget}
                  onRemove={() => onRemoveWidget(widget.id)}
                />
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
        <div className="p-4 bg-gray-200 rounded-b-lg non-draggable">
          <select
            onChange={(e) => onAddWidget(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Add widget</option>
            {availableWidgets.map((widget) => (
              <option key={widget.id} value={widget.id}>
                {widget.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
