import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon,
  trend = "neutral",
  subtitle,
  className 
}: MetricCardProps) {
  const isPositive = trend === "up" || (change && change > 0);
  const isNegative = trend === "down" || (change && change < 0);

  return (
    <Card className={cn("hover-elevate transition-all duration-300", className)} data-testid={`card-metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-5 w-5 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-mono font-bold text-foreground">
            {value}
          </div>
          {(change !== undefined || subtitle) && (
            <div className="flex items-center gap-2">
              {change !== undefined && (
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  isPositive && "text-chart-2",
                  isNegative && "text-destructive"
                )}>
                  {isPositive && <ArrowUp className="h-4 w-4" />}
                  {isNegative && <ArrowDown className="h-4 w-4" />}
                  <span>{Math.abs(change)}%</span>
                </div>
              )}
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
