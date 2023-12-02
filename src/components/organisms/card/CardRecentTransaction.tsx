import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import CardRecentTransactionPerson from "./CardRecentTransactionPerson";

const CardRecentTransaction = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        <CardContent className="p-0">
          <p className="text-sm text-muted-foreground">You have 57 transactions this month</p>
          <CardRecentTransactionPerson />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CardRecentTransaction;
