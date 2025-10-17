import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare } from "lucide-react";
import { Client } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ClientCardProps {
  client: Client;
  onView?: () => void;
}

export function ClientCard({ client, onView }: ClientCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getHealthScoreColor = (score: number | null | undefined) => {
    if (score === null || score === undefined) return "bg-slate-400 text-white";
    if (score >= 80) return "bg-chart-2 text-white";
    if (score >= 60) return "bg-chart-4 text-white";
    return "bg-destructive text-white";
  };

  const getHealthScoreLabel = (score: number | null | undefined) => {
    if (score === null || score === undefined) return "Not Rated";
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Attention";
  };

  return (
    <Card className="hover-elevate transition-all duration-300" data-testid={`card-client-${client.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-12 w-12">
              <AvatarImage src={client.avatar || undefined} alt={client.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-chart-1 text-white font-semibold">
                {getInitials(client.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate" data-testid={`text-client-name-${client.id}`}>
                {client.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {client.occupation || "Client"}
              </p>
            </div>
          </div>
          <Badge 
            className={cn("shrink-0", getHealthScoreColor(client.healthScore))}
            data-testid={`badge-health-score-${client.id}`}
          >
            {getHealthScoreLabel(client.healthScore)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Net Worth</p>
            <p className="text-lg font-mono font-semibold text-foreground" data-testid={`text-net-worth-${client.id}`}>
              ${parseFloat(client.netWorth).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Portfolio</p>
            <p className="text-lg font-mono font-semibold text-foreground" data-testid={`text-portfolio-${client.id}`}>
              ${parseFloat(client.portfolioValue).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            className="flex-1 gap-2"
            onClick={onView}
            data-testid={`button-view-client-${client.id}`}
          >
            <Eye className="h-4 w-4" />
            View Profile
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="gap-2"
            data-testid={`button-message-client-${client.id}`}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
