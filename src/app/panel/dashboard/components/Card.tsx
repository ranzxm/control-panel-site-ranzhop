import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardBasicProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    cardTitle: string;
    cardContent: string;
    cardContent2: string;
    icon: any;
  }[];
}

const CardBasic = ({ className, items, ...props }: CardBasicProps) => {
  return (
    <div className={cn(className)} {...props}>
      {items.map((item, index) => (
        <Card className="dark:bg-zinc-900 bg-muted" key={index + 1}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.cardTitle}</CardTitle>
            <div className="icon">{item.icon}</div>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl mb-1">{item.cardContent}</p>
            <p className="text-xs text-muted-foreground">{item.cardContent2}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardBasic;
