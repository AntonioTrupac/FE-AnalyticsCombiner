import { BarChart } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ChartWidget = () => {
  return (
    <div className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Revenue Overview</CardTitle>
        <BarChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Chart Placeholder</div>
        <p className="text-xs text-muted-foreground">
          This is where a chart would go
        </p>
      </CardContent>
    </div>
  );
};
