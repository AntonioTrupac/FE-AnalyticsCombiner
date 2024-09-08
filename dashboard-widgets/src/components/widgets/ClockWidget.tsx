import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export const ClockWidget = () => {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Time</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {new Date().toLocaleTimeString()}
        </div>
        <p className="text-xs text-muted-foreground">
          {new Date().toLocaleDateString()}
        </p>
      </CardContent>
    </>
  );
};
