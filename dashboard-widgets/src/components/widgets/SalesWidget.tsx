import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

export const SalesWidget: React.FC = () => {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sales</CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </>
  );
};
