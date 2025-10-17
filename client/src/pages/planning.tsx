import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Target, 
  Calculator, 
  TrendingUp, 
  Sparkles,
  DollarSign,
  Calendar
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Planning() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(250000);
  const [monthlySavings, setMonthlySavings] = useState(2000);
  const [expectedReturn, setExpectedReturn] = useState(7);

  const generateProjection = () => {
    const years = retirementAge - currentAge;
    const data = [];
    let balance = currentSavings;

    for (let i = 0; i <= years; i++) {
      data.push({
        age: currentAge + i,
        balance: Math.round(balance),
        contributions: currentSavings + (monthlySavings * 12 * i),
      });
      balance = balance * (1 + expectedReturn / 100) + (monthlySavings * 12);
    }

    return data;
  };

  const projectionData = generateProjection();
  const finalBalance = projectionData[projectionData.length - 1]?.balance || 0;

  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8" data-testid="page-planning">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-h1 font-semibold text-foreground">
            Planning Studio
          </h1>
          <p className="text-muted-foreground mt-1">
            Create comprehensive financial plans with AI-powered insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calculator className="h-4 w-4" />
            Templates
          </Button>
          <Button className="gap-2" data-testid="button-save-plan">
            Save Plan
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 hover-elevate transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Retirement Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="contributionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="age" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  label={{ value: 'Age', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Area
                  type="monotone"
                  dataKey="contributions"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  fill="url(#contributionsGradient)"
                  name="Total Contributions"
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={3}
                  fill="url(#balanceGradient)"
                  name="Projected Balance"
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-chart-2/10 to-primary/10 border border-chart-2/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Projected Balance at Retirement</p>
                  <p className="text-3xl font-mono font-bold text-foreground">
                    ${finalBalance.toLocaleString()}
                  </p>
                </div>
                <Target className="h-12 w-12 text-chart-2 opacity-50" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Plan Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-age">Current Age: {currentAge}</Label>
              <Slider
                id="current-age"
                min={18}
                max={80}
                step={1}
                value={[currentAge]}
                onValueChange={(value) => setCurrentAge(value[0])}
                data-testid="slider-current-age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirement-age">Retirement Age: {retirementAge}</Label>
              <Slider
                id="retirement-age"
                min={currentAge + 1}
                max={80}
                step={1}
                value={[retirementAge]}
                onValueChange={(value) => setRetirementAge(value[0])}
                data-testid="slider-retirement-age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-savings">Current Savings</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="current-savings"
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="pl-9"
                  data-testid="input-current-savings"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly-savings">Monthly Savings</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="monthly-savings"
                  type="number"
                  value={monthlySavings}
                  onChange={(e) => setMonthlySavings(Number(e.target.value))}
                  className="pl-9"
                  data-testid="input-monthly-savings"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected-return">Expected Return: {expectedReturn}%</Label>
              <Slider
                id="expected-return"
                min={0}
                max={15}
                step={0.5}
                value={[expectedReturn]}
                onValueChange={(value) => setExpectedReturn(value[0])}
                data-testid="slider-expected-return"
              />
            </div>

            <div className="pt-4 border-t">
              <div className="rounded-lg bg-gradient-to-br from-primary/10 to-chart-1/10 p-4 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      AI Recommendation
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Consider increasing monthly savings by $500 to reach $3M retirement goal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover-elevate transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base">Total Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono font-bold text-foreground">
              ${(currentSavings + (monthlySavings * 12 * (retirementAge - currentAge))).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Over {retirementAge - currentAge} years
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base">Investment Gains</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono font-bold text-chart-2">
              ${(finalBalance - currentSavings - (monthlySavings * 12 * (retirementAge - currentAge))).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Compound growth at {expectedReturn}%
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base">Years to Retirement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono font-bold text-primary">
              {retirementAge - currentAge}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Planning horizon
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
