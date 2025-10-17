import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Action } from "@shared/schema";
import { Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionItemProps {
  action: Action;
  onToggle?: () => void;
}

export function ActionItem({ action, onToggle }: ActionItemProps) {
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

  const formatDate = (date: Date | string | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = action.dueDate && new Date(action.dueDate) < new Date() && !action.isCompleted;

  return (
    <Card 
      className={cn(
        "hover-elevate transition-all duration-300",
        action.isCompleted && "opacity-60"
      )}
      data-testid={`card-action-${action.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={action.isCompleted}
            onCheckedChange={onToggle}
            className="mt-1"
            data-testid={`checkbox-action-${action.id}`}
          />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <h4 
                className={cn(
                  "font-medium text-foreground",
                  action.isCompleted && "line-through text-muted-foreground"
                )}
                data-testid={`text-action-title-${action.id}`}
              >
                {action.title}
              </h4>
              <Badge className={cn(getPriorityColor(action.priority), "shrink-0")}>
                {action.priority}
              </Badge>
            </div>

            {action.description && (
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            )}

            {action.dueDate && (
              <div className={cn(
                "flex items-center gap-2 text-sm",
                isOverdue ? "text-destructive" : "text-muted-foreground"
              )}>
                {isOverdue ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <Calendar className="h-4 w-4" />
                )}
                <span>Due: {formatDate(action.dueDate)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
