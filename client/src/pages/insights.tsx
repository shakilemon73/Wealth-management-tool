import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  DollarSign,
  Shield,
  FileText,
  Target,
  AlertCircle,
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
  },
  {
    id: "2",
    type: "risk",
    icon: Shield,
    title: "Portfolio Rebalancing Needed",
    description: "5 portfolios have drifted more than 5% from target allocation due to recent market movements.",
    impact: "Medium",
    priority: 2,
  },
  {
    id: "3",
    type: "action",
    icon: FileText,
    title: "Annual Review Required",
    description: "2 clients are due for their annual financial plan review this month.",
    impact: "Medium",
    priority: 3,
  },
  {
    id: "4",
    type: "opportunity",
    icon: Target,
    title: "Roth Conversion Opportunity",
    description: "Client portfolio positioned for beneficial Roth IRA conversion with current tax bracket.",
    impact: "High",
    priority: 1,
  },
  {
    id: "5",
    type: "alert",
    icon: AlertCircle,
    title: "Upcoming RMD Deadline",
    description: "Required Minimum Distributions due for 4 clients by December 31st.",
    impact: "High",
    priority: 1,
  },
];

export default function Insights() {
  return (
    <div className="flex-1 p-6 lg:p-8 content-focus" data-testid="page-insights">
      <div className="space-y-2 mb-8">
        <h1 className="visual-hierarchy-1">AI Insights</h1>
        <p className="scan-paragraph text-muted-foreground">
          Intelligent recommendations powered by analytics
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold typography-financial">{insights.length}</p>
              <p className="text-sm text-muted-foreground mt-2">Active recommendations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold typography-financial">
                {insights.filter(i => i.priority === 1).length}
              </p>
              <p className="text-sm text-muted-foreground mt-2">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Potential Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold typography-financial">$8.5k</p>
              <p className="text-sm text-muted-foreground mt-2">Estimated savings</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="visual-hierarchy-3">Recommended Actions</h2>
          
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <Card key={insight.id} data-testid={`card-insight-${insight.id}`}>
                <CardContent className="spacing-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                        <h3 className="scan-heading text-base">
                          {insight.title}
                        </h3>
                        <Badge variant={insight.impact === "High" ? "destructive" : "secondary"}>
                          {insight.impact}
                        </Badge>
                      </div>
                      
                      <p className="scan-paragraph text-sm text-muted-foreground mb-4">
                        {insight.description}
                      </p>
                      
                      <div className="flex items-center gap-3">
                        <Button size="sm" data-testid={`button-review-${insight.id}`}>
                          Review
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
      </div>
    </div>
  );
}
