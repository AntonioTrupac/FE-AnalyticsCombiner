import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CloudSun } from 'lucide-react';

export const WeatherWidget = () => {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Weather</CardTitle>
        <CloudSun className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">72°F</div>
        <p className="text-xs text-muted-foreground">Sunny</p>
      </CardContent>
    </>
  );
};
