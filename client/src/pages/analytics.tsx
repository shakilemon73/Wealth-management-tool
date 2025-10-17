import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, PieChart, BarChart3, Activity } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";

const portfolioAllocationData = [
  { name: "Stocks", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Bonds", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Real Estate", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Cash", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Alternative", value: 5, color: "hsl(var(--chart-5))" },
];

const performanceData = [
  { month: "Jan", portfolio: 95, benchmark: 93 },
  { month: "Feb", portfolio: 98, benchmark: 96 },
  { month: "Mar", portfolio: 102, benchmark: 99 },
  { month: "Apr", portfolio: 105, benchmark: 101 },
  { month: "May", portfolio: 108, benchmark: 103 },
  { month: "Jun", portfolio: 112, benchmark: 106 },
];

const riskMetricsData = [
  { category: "Volatility", value: 12 },
  { category: "Sharpe Ratio", value: 1.8 },
  { category: "Max Drawdown", value: -8 },
  { category: "Beta", value: 0.95 },
];

export default function Analytics() {
  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8" data-testid="page-analytics">
      <div>
        <h1 className="text-h1 font-semibold text-foreground">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Advanced portfolio analytics and performance insights
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="hover-elevate transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Performance vs Benchmark
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="portfolioArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="benchmarkArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="benchmark"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  fill="url(#benchmarkArea)"
                  name="Benchmark"
                />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={3}
                  fill="url(#portfolioArea)"
                  name="Portfolio"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Portfolio Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={portfolioAllocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                  labelLine={false}
                >
                  {portfolioAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="hover-elevate transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Risk Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskMetricsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="category" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-6 grid-cols-2">
          <Card className="hover-elevate transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Return</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-mono font-bold text-chart-2">+12.4%</p>
              <p className="text-sm text-muted-foreground mt-1">YTD Performance</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Alpha</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-mono font-bold text-chart-2">+2.8%</p>
              <p className="text-sm text-muted-foreground mt-1">vs Benchmark</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Sharpe Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-mono font-bold text-foreground">1.8</p>
              <p className="text-sm text-muted-foreground mt-1">Risk-Adjusted</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Volatility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-mono font-bold text-chart-4">12.0%</p>
              <p className="text-sm text-muted-foreground mt-1">Annualized</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
