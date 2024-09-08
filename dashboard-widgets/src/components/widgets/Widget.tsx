import React from 'react';
import { Card } from '../ui/card';
import { widgetComponents } from '@/components/widgets/widgetMap';
import { X } from 'lucide-react';

export interface WidgetProps {
  id: string;
  type: string;
  title: string;
  onRemove?: () => void;
  isDashboardWidget?: boolean;
}

export const Widget: React.FC<WidgetProps> = ({
  type,
  title,
  isDashboardWidget,
  onRemove,
}) => {
  const WidgetComponent = widgetComponents[type];

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  const dragHandleClass = isDashboardWidget
    ? 'dashboard-drag-handle'
    : 'widget-drag-handle';

  return (
    <Card
      className={`${dragHandleClass} bg-white rounded-lg shadow-md h-full flex flex-col overflow-hidden cursor-move`}
    >
      <div className={` bg-gray-200 p-2 flex items-center justify-between `}>
        <h3 className="text-lg font-semibold flex-grow">{title}</h3>
        {onRemove && (
          <button
            onClick={handleRemove}
            className="remove-button px-2 py-1 bg-red-500 text-white rounded text-xs z-10"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="flex-grow p-4 overflow-auto">
        <WidgetComponent />
      </div>
    </Card>
  );
};
