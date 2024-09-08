import { WidgetProps } from '@/components/widgets/Widget';

interface DashboardControlsProps {
  onAddGroup: () => void;
  onAddWidget: (widgetId: string) => void;
  availableWidgets: WidgetProps[];
}

export const DashboardControls: React.FC<DashboardControlsProps> = ({
  onAddGroup,
  onAddWidget,
  availableWidgets,
}) => {
  return (
    <div className="mb-4">
      <button
        onClick={onAddGroup}
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
      >
        Add Group
      </button>
      <select
        onChange={(e) => onAddWidget(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Add widget</option>
        {availableWidgets.map((widget) => (
          <option key={widget.id} value={widget.id}>
            {widget.title}
          </option>
        ))}
      </select>
    </div>
  );
};
