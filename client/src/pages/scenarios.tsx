import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Home, 
  GraduationCap, 
  Heart,
  TrendingUp,
  Plus
} from "lucide-react";
import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Scenarios() {
  const [purchaseAmount, setPurchaseAmount] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculateMortgage = () => {
    const principal = purchaseAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const months = loanTerm * 12;
    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    
    return monthlyPayment;
  };

  const monthlyPayment = calculateMortgage();

  const generateComparison = () => {
    const data = [];
    for (let year = 0; year <= 30; year += 5) {
      data.push({
        year,
        conservative: 100000 * Math.pow(1.05, year),
        moderate: 100000 * Math.pow(1.07, year),
        aggressive: 100000 * Math.pow(1.09, year),
      });
    }
    return data;
  };

  const comparisonData = generateComparison();

  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8" data-testid="page-scenarios">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-h1 font-semibold text-foreground">
            Scenario Explorer
          </h1>
          <p className="text-muted-foreground mt-1">
            Model what-if scenarios and compare financial outcomes
          </p>
        </div>
        <Button className="gap-2" data-testid="button-save-scenario">
          <Plus className="h-4 w-4" />
          Save Scenario
        </Button>
      </div>

      <Tabs defaultValue="retirement" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="retirement" className="gap-2">
            <Calculator className="h-4 w-4" />
            Retirement
          </TabsTrigger>
          <TabsTrigger value="purchase" className="gap-2">
            <Home className="h-4 w-4" />
            Major Purchase
          </TabsTrigger>
          <TabsTrigger value="education" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
          </TabsTrigger>
          <TabsTrigger value="legacy" className="gap-2">
            <Heart className="h-4 w-4" />
            Legacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="retirement" className="space-y-6">
          <Card className="hover-elevate transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Investment Strategy Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="year" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="conservative"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={2}
                    name="Conservative (5%)"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="moderate"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    name="Moderate (7%)"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="aggressive"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Aggressive (9%)"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-lg bg-gradient-to-br from-chart-4/10 to-chart-4/5 border border-chart-4/20">
                  <p className="text-sm text-muted-foreground mb-1">Conservative</p>
                  <p className="text-2xl font-mono font-bold text-foreground">
                    ${comparisonData[6].conservative.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">After 30 years at 5%</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-chart-1/10 to-chart-1/5 border border-chart-1/20">
                  <p className="text-sm text-muted-foreground mb-1">Moderate</p>
                  <p className="text-2xl font-mono font-bold text-foreground">
                    ${comparisonData[6].moderate.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">After 30 years at 7%</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-chart-2/10 to-chart-2/5 border border-chart-2/20">
                  <p className="text-sm text-muted-foreground mb-1">Aggressive</p>
                  <p className="text-2xl font-mono font-bold text-foreground">
                    ${comparisonData[6].aggressive.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">After 30 years at 9%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 hover-elevate transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Home Purchase Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="purchase-amount">Purchase Price</Label>
                    <Input
                      id="purchase-amount"
                      type="number"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                      data-testid="input-purchase-amount"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="down-payment">Down Payment</Label>
                    <Input
                      id="down-payment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      data-testid="input-down-payment"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                      <Input
                        id="interest-rate"
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        data-testid="input-interest-rate"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loan-term">Loan Term (years)</Label>
                      <Input
                        id="loan-term"
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        data-testid="input-loan-term"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-chart-1/10 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Payment</p>
                      <p className="text-4xl font-mono font-bold text-foreground" data-testid="text-monthly-payment">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Principal & Interest only
                      </p>
                    </div>
                    <Home className="h-16 w-16 text-primary opacity-20" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="hover-elevate transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Loan Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-mono font-bold text-foreground">
                    ${(purchaseAmount - downPayment).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {((downPayment / purchaseAmount) * 100).toFixed(1)}% down
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Total Interest</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-mono font-bold text-chart-4">
                    ${((monthlyPayment * loanTerm * 12) - (purchaseAmount - downPayment)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Over {loanTerm} years
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Total Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-mono font-bold text-foreground">
                    ${(downPayment + (monthlyPayment * loanTerm * 12)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Down payment + all payments
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="flex flex-col items-center justify-center py-16 px-4">
              <GraduationCap className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Education Planning
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                Model college savings scenarios and estimate future education costs
              </p>
              <Button className="mt-6">Coming Soon</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legacy" className="space-y-6">
          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="flex flex-col items-center justify-center py-16 px-4">
              <Heart className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Legacy Planning
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                Explore estate planning scenarios and wealth transfer strategies
              </p>
              <Button className="mt-6">Coming Soon</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
