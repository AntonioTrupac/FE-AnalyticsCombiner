import { WeatherWidget } from './WeatherWidget';
import { ClockWidget } from './ClockWidget';
import { SalesWidget } from './SalesWidget';
import { ChartWidget } from './ChartWidget';

export const widgetComponents: { [key: string]: React.FC } = {
  weather: WeatherWidget,
  clock: ClockWidget,
  sales: SalesWidget,
  chart: ChartWidget,
};
