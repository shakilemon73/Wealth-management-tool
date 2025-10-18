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
    <div className="flex-1 p-6 lg:p-8 content-focus" data-testid="page-scenarios">
      <div className="space-y-2 mb-8">
        <h1 className="visual-hierarchy-1">Scenarios</h1>
        <p className="scan-paragraph text-muted-foreground">
          Model what-if scenarios and compare outcomes
        </p>
      </div>

      <Tabs defaultValue="retirement" className="space-y-6">
        <TabsList>
          <TabsTrigger value="retirement">Retirement</TabsTrigger>
          <TabsTrigger value="purchase">Major Purchase</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="legacy">Legacy</TabsTrigger>
        </TabsList>

        <TabsContent value="retirement" className="space-y-6">
          <Card>
            <CardHeader className="border-b spacing-sm">
              <CardTitle className="visual-hierarchy-3">Investment Strategy Comparison</CardTitle>
            </CardHeader>
            <CardContent className="spacing-md">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="year" 
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
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
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

              <div className="mt-6 pt-6 border-t grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Conservative</p>
                  <p className="text-2xl font-bold typography-financial">
                    ${comparisonData[6].conservative.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">30 years at 5%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Moderate</p>
                  <p className="text-2xl font-bold typography-financial">
                    ${comparisonData[6].moderate.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">30 years at 7%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Aggressive</p>
                  <p className="text-2xl font-bold typography-financial">
                    ${comparisonData[6].aggressive.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">30 years at 9%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="border-b spacing-sm">
                <CardTitle className="visual-hierarchy-3">Home Purchase Calculator</CardTitle>
              </CardHeader>
              <CardContent className="spacing-md space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="purchase-amount" className="text-sm font-medium">
                      Purchase Price
                    </Label>
                    <Input
                      id="purchase-amount"
                      type="number"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                      data-testid="input-purchase-amount"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="down-payment" className="text-sm font-medium">
                      Down Payment
                    </Label>
                    <Input
                      id="down-payment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      data-testid="input-down-payment"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="interest-rate" className="text-sm font-medium">
                      Interest Rate (%)
                    </Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      data-testid="input-interest-rate"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="loan-term" className="text-sm font-medium">
                      Loan Term (years)
                    </Label>
                    <Input
                      id="loan-term"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      data-testid="input-loan-term"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                  <p className="text-4xl font-bold typography-financial" data-testid="text-monthly-payment">
                    ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Principal & Interest only
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader className="spacing-sm">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Loan Amount
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold typography-financial">
                    ${(purchaseAmount - downPayment).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {((downPayment / purchaseAmount) * 100).toFixed(1)}% down
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="spacing-sm">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Interest
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold typography-financial">
                    ${((monthlyPayment * loanTerm * 12) - (purchaseAmount - downPayment)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Over {loanTerm} years
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="spacing-sm">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold typography-financial">
                    ${(downPayment + (monthlyPayment * loanTerm * 12)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Down + all payments
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center spacing-xl">
              <GraduationCap className="h-12 w-12 text-muted-foreground opacity-40 mb-4" />
              <h3 className="visual-hierarchy-3 mb-2">Education Planning</h3>
              <p className="scan-paragraph text-muted-foreground text-center">
                Model college savings and estimate future costs
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legacy" className="space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center spacing-xl">
              <Heart className="h-12 w-12 text-muted-foreground opacity-40 mb-4" />
              <h3 className="visual-hierarchy-3 mb-2">Legacy Planning</h3>
              <p className="scan-paragraph text-muted-foreground text-center">
                Explore estate planning and wealth transfer
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button data-testid="button-save-scenario">
          Save Scenario
        </Button>
      </div>
    </div>
  );
}
