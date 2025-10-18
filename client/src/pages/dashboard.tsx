import { useState, useEffect } from "react";
import { MetricCard } from "@/components/metric-card";
import { ActionItem } from "@/components/action-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  DollarSign, 
  Users, 
  AlertCircle, 
  TrendingUp,
  Plus,
  Sparkles,
  ArrowRight,
  Target,
  Zap,
  Award,
  TrendingDown,
  Activity,
  HelpCircle
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
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading } = useQuery<DashboardMetrics>({
    queryKey: ["/api/dashboard/metrics"],
  });

  const { data: actions, isLoading: actionsLoading } = useQuery<Action[]>({
    queryKey: ["/api/actions"],
  });

  const { data: recentClients, isLoading: clientsLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients/recent"],
  });

  const { data: portfolioData, isLoading: chartLoading } = useQuery<any[]>({
    queryKey: ["/api/dashboard/portfolio-chart"],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-background dark:bg-background" data-testid="page-dashboard">
      <div className="space-y-8 max-w-[1600px] mx-auto content-focus">
        {/* Enhanced Header Bar - Don Norman's Visibility Principle */}
        <div className="border-b bg-background/95 dark:bg-background/95 backdrop-blur sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between px-6 lg:px-8 py-5 gap-md">
            <div>
              <h1 className="visual-hierarchy-1 scan-heading">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1 scan-paragraph">Manage your clients and track portfolio performance</p>
            </div>
            <div className="flex items-center gap-sm">
              <TooltipUI>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="default"
                    className="gap-2 hover-lift touch-target"
                    data-testid="button-ai-insights"
                    aria-label="View AI-powered insights and recommendations"
                    asChild
                  >
                    <Link href="/insights">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      <span>AI Insights</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Get AI-powered recommendations for your clients</p>
                </TooltipContent>
              </TooltipUI>
              <Button 
                size="default"
                className="gap-2 hover-lift touch-target"
                data-testid="button-new-client"
                aria-label="Add a new client to your portfolio"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                New Client
              </Button>
            </div>
          </div>
        </div>

        {/* Premium Metrics Grid */}
        <div className="px-6 lg:px-8 spacing-md">
        <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-4" role="region" aria-label="Key portfolio metrics">
          <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-600 bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-900 dark:to-blue-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16" aria-hidden="true"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground icon-with-label">
                Total AUM
                <span className="sr-only">Assets Under Management</span>
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center" aria-hidden="true">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent aria-live="polite" aria-atomic="true">
              {metricsLoading ? (
                <div className="space-y-2">
                  <div className="h-9 w-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                  <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold font-mono text-foreground mb-1 typography-financial">
                    {metrics?.totalAUM ? (
                      <AnimatedNumber value={metrics.totalAUM} prefix="$" />
                    ) : (
                      "$0"
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 gap-1 border-0">
                      <TrendingUp className="h-3 w-3" />
                      12.5%
                    </Badge>
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-green-600 bg-gradient-to-br from-white to-green-50/50 dark:from-slate-900 dark:to-green-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/5 rounded-full -mr-16 -mt-16" aria-hidden="true"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Clients
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center" aria-hidden="true">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent aria-live="polite" aria-atomic="true">
              {metricsLoading ? (
                <div className="space-y-2">
                  <div className="h-9 w-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                  <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold font-mono text-foreground mb-1 typography-financial">
                    {metrics?.activeClients ? (
                      <AnimatedNumber value={metrics.activeClients} />
                    ) : (
                      "0"
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 gap-1 border-0">
                      <TrendingUp className="h-3 w-3" />
                      8%
                    </Badge>
                    <span className="text-sm text-muted-foreground">2 new this week</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-amber-600 bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-amber-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 rounded-full -mr-16 -mt-16" aria-hidden="true"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Actions
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center" aria-hidden="true">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent aria-live="polite" aria-atomic="true">
              {metricsLoading ? (
                <div className="space-y-2">
                  <div className="h-9 w-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                  <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold font-mono text-foreground mb-1 typography-financial">
                    {metrics?.pendingActions ? (
                      <AnimatedNumber value={metrics.pendingActions} />
                    ) : (
                      "0"
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 gap-1 border-0">
                      <Target className="h-3 w-3" />
                      High Priority
                    </Badge>
                    <span className="text-sm text-muted-foreground">Review today</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-purple-600 bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-900 dark:to-purple-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full -mr-16 -mt-16" aria-hidden="true"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Portfolio Performance
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center" aria-hidden="true">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent aria-live="polite" aria-atomic="true">
              {metricsLoading ? (
                <div className="space-y-2">
                  <div className="h-9 w-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                  <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold font-mono text-foreground mb-1 typography-financial">
                    {metrics?.portfolioPerformance ? (
                      <AnimatedNumber value={metrics.portfolioPerformance} suffix="%" />
                    ) : (
                      "0%"
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400 gap-1 border-0">
                      <Award className="h-3 w-3" />
                      Excellent
                    </Badge>
                    <span className="text-sm text-muted-foreground">YTD return</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-lg lg:grid-cols-3">
          {/* Portfolio Chart - Takes 2/3 width */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900">
                <div className="flex items-center justify-between gap-sm">
                  <div>
                    <CardTitle className="flex items-center gap-2 visual-hierarchy-2">
                      Portfolio Performance
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400">
                        <TrendingUp className="h-3 w-3 mr-1" aria-hidden="true" />
                        +18.3%
                      </Badge>
                      <TooltipUI>
                        <TooltipTrigger asChild>
                          <button className="touch-target" aria-label="Chart information">
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">Shows aggregate portfolio growth over 12 months</p>
                        </TooltipContent>
                      </TooltipUI>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 scan-paragraph">
                      12-month trailing performance
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2 touch-target" aria-label="View detailed performance analytics">
                    View Details
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {chartLoading ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-end h-64">
                      <div className="w-1/12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" style={{ height: '45%' }}></div>
                      <div className="w-1/12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" style={{ height: '60%' }}></div>
                      <div className="w-1/12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" style={{ height: '50%' }}></div>
                      <div className="w-1/12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" style={{ height: '70%' }}></div>
                      <div className="w-1/12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" style={{ height: '65%' }}></div>
                      <div className="w-1/12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" style={{ height: '80%' }}></div>
                      <div className="w-1/12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" style={{ height: '75%' }}></div>
                      <div className="w-1/12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" style={{ height: '90%' }}></div>
                      <div className="w-1/12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" style={{ height: '85%' }}></div>
                      <div className="w-1/12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" style={{ height: '95%' }}></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                      <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                      <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                      <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                    </div>
                  </div>
                ) : (
                  <div role="img" aria-label="Portfolio performance chart showing 12-month growth trend">
                    <ResponsiveContainer width="100%" height={320}>
                      <AreaChart data={portfolioData || []} accessibilityLayer>
                        <defs>
                          <linearGradient id="portfolioGradientPremium" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.2} />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `$${value}M`}
                          label={{ value: 'Portfolio Value', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                          cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "5 5" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          fill="url(#portfolioGradientPremium)"
                          animationDuration={1500}
                          name="Portfolio Value"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Panel */}
          <div>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 h-full">
              <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/30">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  AI-Powered Insights
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Smart recommendations for you
                </p>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-4 border border-blue-100 dark:border-blue-900 hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        Tax Optimization Opportunity
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        3 clients could benefit from tax-loss harvesting to reduce liability.
                      </p>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-blue-600 dark:text-blue-400 hover:bg-transparent">
                        Review Now →
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 p-4 border border-green-100 dark:border-green-900 hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-green-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-green-600 dark:bg-green-500 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        Portfolio Rebalancing
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        5 portfolios are outside target allocation ranges.
                      </p>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-green-600 dark:text-green-400 hover:bg-transparent">
                        View Details →
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 p-4 border border-amber-100 dark:border-amber-900 hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-amber-600 dark:bg-amber-500 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        Compliance Review
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        2 clients need their annual plan review scheduled.
                      </p>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-amber-600 dark:text-amber-400 hover:bg-transparent">
                        Schedule Reviews →
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Actions and Clients */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Priority Actions
                      {actions && actions.length > 0 && (
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400">
                          {actions.length}
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tasks requiring your attention
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/insights">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {actionsLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl border bg-slate-50 dark:bg-slate-900 animate-pulse">
                        <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                          <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                ) : actions && actions.length > 0 ? (
                  <div className="space-y-2">
                    {actions.slice(0, 5).map((action) => (
                      <ActionItem key={action.id} action={action} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-foreground font-medium mb-1">All caught up!</p>
                    <p className="text-muted-foreground text-sm">No pending actions at the moment</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Recent Clients
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your latest client activity
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/clients">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {clientsLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl animate-pulse">
                        <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                          <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded ml-auto"></div>
                          <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded ml-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentClients && recentClients.length > 0 ? (
                  <div className="space-y-2">
                    {recentClients.map((client) => (
                      <Link key={client.id} href={`/clients/${client.id}`}>
                        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200 group cursor-pointer">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                            {client.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground truncate group-hover:text-blue-600 transition-colors">{client.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{client.occupation}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-mono font-bold text-foreground typography-financial">
                              ${parseFloat(client.netWorth).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">Net Worth</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-foreground font-medium mb-1">No clients yet</p>
                    <p className="text-muted-foreground text-sm mb-4">Start by adding your first client</p>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Client
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
