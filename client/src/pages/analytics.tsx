import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, PieChart, BarChart3 } from "lucide-react";
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
    <div className="flex-1 p-6 lg:p-8 content-focus" data-testid="page-analytics">
      <div className="space-y-2 mb-8">
        <h1 className="visual-hierarchy-1">Analytics</h1>
        <p className="scan-paragraph text-muted-foreground">
          Portfolio performance metrics and risk analysis
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="border-b spacing-sm">
            <CardTitle className="visual-hierarchy-3">Performance vs Benchmark</CardTitle>
          </CardHeader>
          <CardContent className="spacing-md">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
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
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1}
                  fill="hsl(var(--muted))"
                  fillOpacity={0.3}
                  name="Benchmark"
                />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="hsl(var(--primary))"
                  fillOpacity={0.1}
                  name="Portfolio"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="border-b spacing-sm">
              <CardTitle className="visual-hierarchy-3">Portfolio Allocation</CardTitle>
            </CardHeader>
            <CardContent className="spacing-md">
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

          <Card>
            <CardHeader className="border-b spacing-sm">
              <CardTitle className="visual-hierarchy-3">Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent className="spacing-md">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskMetricsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
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
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Return
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold typography-financial">+12.4%</p>
              <p className="text-sm text-muted-foreground mt-2">YTD Performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Alpha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold typography-financial">+2.8%</p>
              <p className="text-sm text-muted-foreground mt-2">vs Benchmark</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Sharpe Ratio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold typography-financial">1.8</p>
              <p className="text-sm text-muted-foreground mt-2">Risk-Adjusted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Volatility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold typography-financial">12.0%</p>
              <p className="text-sm text-muted-foreground mt-2">Annualized</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
