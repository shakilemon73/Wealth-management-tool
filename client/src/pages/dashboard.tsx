import { MetricCard } from "@/components/metric-card";
import { ActionItem } from "@/components/action-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Users, 
  AlertCircle, 
  TrendingUp,
  Plus,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DashboardMetrics, Action, Client } from "@shared/schema";
import { Link } from "wouter";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const { data: metrics } = useQuery<DashboardMetrics>({
    queryKey: ["/api/dashboard/metrics"],
  });

  const { data: actions } = useQuery<Action[]>({
    queryKey: ["/api/actions"],
  });

  const { data: recentClients } = useQuery<Client[]>({
    queryKey: ["/api/clients/recent"],
  });

  const { data: portfolioData } = useQuery<any[]>({
    queryKey: ["/api/dashboard/portfolio-chart"],
  });

  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8" data-testid="page-dashboard">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-h1 font-semibold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your wealth management overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" data-testid="button-ai-insights">
            <Sparkles className="h-4 w-4" />
            AI Insights
          </Button>
          <Button className="gap-2" data-testid="button-new-client">
            <Plus className="h-4 w-4" />
            New Client
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total AUM"
          value={`$${metrics?.totalAUM?.toLocaleString() || "0"}`}
          change={12.5}
          icon={DollarSign}
          trend="up"
          subtitle="vs last month"
        />
        <MetricCard
          title="Active Clients"
          value={metrics?.activeClients || 0}
          change={8}
          icon={Users}
          trend="up"
          subtitle="2 new this week"
        />
        <MetricCard
          title="Pending Actions"
          value={metrics?.pendingActions || 0}
          icon={AlertCircle}
          subtitle="Review today"
        />
        <MetricCard
          title="Portfolio Performance"
          value={`${metrics?.portfolioPerformance || 0}%`}
          change={metrics?.portfolioPerformance}
          icon={TrendingUp}
          trend="up"
          subtitle="YTD return"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 hover-elevate transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Portfolio Performance</span>
              <Button variant="ghost" size="sm" className="gap-2">
                View Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioData || []}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  fill="url(#portfolioGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all duration-300">
          <CardHeader>
            <CardTitle>AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-gradient-to-br from-primary/10 to-chart-1/10 p-4 border border-primary/20">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground text-sm">
                    Tax Optimization Opportunity
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    3 clients could benefit from tax-loss harvesting
                  </p>
                  <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                    Review Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-chart-2/10 to-chart-1/10 p-4 border border-chart-2/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-chart-2 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground text-sm">
                    Portfolio Rebalancing
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    5 portfolios are outside target allocation
                  </p>
                  <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-chart-4/10 to-destructive/10 p-4 border border-chart-4/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-chart-4 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground text-sm">
                    Compliance Review
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    2 clients need annual plan review
                  </p>
                  <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                    Schedule Reviews
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="hover-elevate transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Priority Actions</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/insights">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {actions && actions.length > 0 ? (
              actions.slice(0, 5).map((action) => (
                <ActionItem key={action.id} action={action} />
              ))
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No pending actions</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Clients</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/clients">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentClients && recentClients.length > 0 ? (
              recentClients.map((client) => (
                <div 
                  key={client.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover-elevate transition-all duration-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-1 text-white font-semibold text-sm">
                    {client.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{client.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{client.occupation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono font-semibold text-foreground">
                      ${parseFloat(client.netWorth).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No clients yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
