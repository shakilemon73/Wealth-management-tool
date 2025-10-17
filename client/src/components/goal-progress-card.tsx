import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Goal } from "@shared/schema";
import { Calendar, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoalProgressCardProps {
  goal: Goal;
}

export function GoalProgressCard({ goal }: GoalProgressCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-white";
      case "medium":
        return "bg-chart-4 text-white";
      case "low":
        return "bg-chart-1 text-white";
      default:
        return "bg-muted text-foreground";
    }
  };

  const formatCurrency = (value: string | number) => {
    return `$${parseFloat(value.toString()).toLocaleString()}`;
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <Card className="hover-elevate transition-all duration-300" data-testid={`card-goal-${goal.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Target className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base truncate" data-testid={`text-goal-name-${goal.id}`}>
              {goal.name}
            </CardTitle>
          </div>
          <Badge className={cn(getPriorityColor(goal.priority), "shrink-0")}>
            {goal.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-mono font-semibold text-foreground" data-testid={`text-progress-${goal.id}`}>
              {goal.progress}%
            </span>
          </div>
          <Progress value={goal.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Current</p>
            <p className="text-sm font-mono font-semibold text-foreground">
              {formatCurrency(goal.currentAmount)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Target</p>
            <p className="text-sm font-mono font-semibold text-foreground">
              {formatCurrency(goal.targetAmount)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Target: {formatDate(goal.targetDate)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
