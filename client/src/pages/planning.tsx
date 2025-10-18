import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator, 
  TrendingUp, 
  DollarSign,
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
    <div className="flex-1 p-6 lg:p-8 content-focus" data-testid="page-planning">
      <div className="space-y-2 mb-8">
        <h1 className="visual-hierarchy-1">Planning Studio</h1>
        <p className="scan-paragraph text-muted-foreground">
          Model retirement scenarios and calculate projected outcomes
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="border-b spacing-sm">
              <CardTitle className="visual-hierarchy-3">Retirement Projection</CardTitle>
            </CardHeader>
            <CardContent className="spacing-md">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="age" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
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
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1}
                    fill="hsl(var(--muted))"
                    fillOpacity={0.3}
                    name="Total Contributions"
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="hsl(var(--primary))"
                    fillOpacity={0.1}
                    name="Projected Balance"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-1">Projected Balance at Age {retirementAge}</p>
                <p className="text-3xl font-bold typography-financial">
                  ${finalBalance.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b spacing-sm">
              <CardTitle className="visual-hierarchy-3">Parameters</CardTitle>
            </CardHeader>
            <CardContent className="spacing-md space-y-6">
              <div className="space-y-3">
                <Label htmlFor="current-age" className="text-sm font-medium">
                  Current Age: {currentAge}
                </Label>
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

              <div className="space-y-3">
                <Label htmlFor="retirement-age" className="text-sm font-medium">
                  Retirement Age: {retirementAge}
                </Label>
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

              <div className="space-y-3">
                <Label htmlFor="current-savings" className="text-sm font-medium">
                  Current Savings
                </Label>
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

              <div className="space-y-3">
                <Label htmlFor="monthly-savings" className="text-sm font-medium">
                  Monthly Savings
                </Label>
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

              <div className="space-y-3">
                <Label htmlFor="expected-return" className="text-sm font-medium">
                  Expected Return: {expectedReturn}%
                </Label>
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

              <div className="pt-6 border-t">
                <Button className="w-full gap-2" data-testid="button-save-plan">
                  <Calculator className="h-4 w-4" />
                  Save Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold typography-financial">
                ${(currentSavings + (monthlySavings * 12 * (retirementAge - currentAge))).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Over {retirementAge - currentAge} years
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Investment Gains
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold typography-financial">
                ${(finalBalance - currentSavings - (monthlySavings * 12 * (retirementAge - currentAge))).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                At {expectedReturn}% annual return
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Planning Horizon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold typography-financial">
                {retirementAge - currentAge} years
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Until retirement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
