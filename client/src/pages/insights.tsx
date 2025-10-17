import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  Target,
  DollarSign,
  Shield,
  FileText
} from "lucide-react";

const insights = [
  {
    id: "1",
    type: "opportunity",
    icon: DollarSign,
    title: "Tax-Loss Harvesting Opportunity",
    description: "3 clients could benefit from tax-loss harvesting in their taxable accounts. Potential tax savings: $8,500.",
    impact: "High",
    priority: 1,
    color: "chart-2",
  },
  {
    id: "2",
    type: "risk",
    icon: Shield,
    title: "Portfolio Rebalancing Needed",
    description: "5 portfolios have drifted more than 5% from target allocation due to recent market movements.",
    impact: "Medium",
    priority: 2,
    color: "chart-4",
  },
  {
    id: "3",
    type: "action",
    icon: FileText,
    title: "Annual Review Required",
    description: "2 clients are due for their annual financial plan review this month.",
    impact: "Medium",
    priority: 3,
    color: "chart-1",
  },
  {
    id: "4",
    type: "opportunity",
    icon: Target,
    title: "Roth Conversion Opportunity",
    description: "Client portfolio positioned for beneficial Roth IRA conversion with current tax bracket.",
    impact: "High",
    priority: 1,
    color: "chart-2",
  },
  {
    id: "5",
    type: "alert",
    icon: AlertCircle,
    title: "Upcoming RMD Deadline",
    description: "Required Minimum Distributions due for 4 clients by December 31st.",
    impact: "High",
    priority: 1,
    color: "destructive",
  },
];

export default function Insights() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-destructive text-white";
      case "Medium":
        return "bg-chart-4 text-white";
      case "Low":
        return "bg-chart-1 text-white";
      default:
        return "bg-muted text-foreground";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8" data-testid="page-insights">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-h1 font-semibold text-foreground flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Insights
          </h1>
          <p className="text-muted-foreground mt-1">
            Intelligent recommendations powered by advanced analytics
          </p>
        </div>
        <Button variant="outline" className="gap-2" data-testid="button-refresh-insights">
          <Sparkles className="h-4 w-4" />
          Refresh Insights
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover-elevate transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-mono font-bold text-foreground">{insights.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Active recommendations</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-mono font-bold text-destructive">
              {insights.filter(i => i.priority === 1).length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Potential Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-mono font-bold text-chart-2">$8.5k</p>
            <p className="text-sm text-muted-foreground mt-1">Estimated tax savings</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-h3 font-semibold text-foreground">
          Recommended Actions
        </h2>
        
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <Card 
              key={insight.id}
              className="hover-elevate transition-all duration-300"
              data-testid={`card-insight-${insight.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${insight.color}/10 shrink-0`}>
                    <Icon className={`h-6 w-6 text-${insight.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-foreground text-lg">
                        {insight.title}
                      </h3>
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact} Impact
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {insight.description}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <Button size="sm" data-testid={`button-review-${insight.id}`}>
                        Review Details
                      </Button>
                      <Button size="sm" variant="outline" data-testid={`button-dismiss-${insight.id}`}>
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="hover-elevate transition-all duration-300">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-1 shrink-0">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                How AI Insights Work
              </h3>
              <p className="text-muted-foreground mb-4">
                Our AI analyzes client portfolios, market conditions, and tax opportunities in real-time 
                to surface actionable insights that can improve client outcomes and save time.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Continuous monitoring of portfolio allocations and performance
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Tax optimization opportunities identified automatically
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Predictive analytics for better planning decisions
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Compliance and deadline tracking
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
