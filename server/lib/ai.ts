import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
// Lazy initialization to avoid errors when API key is not set
let openai: OpenAI | null = null;

function getOpenAI(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not set - AI features will use fallback data");
    return null;
  }
  if (!openai) {
    openai = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });
  }
  return openai;
}

export interface FinancialInsight {
  type: string;
  title: string;
  description: string;
  impact: string;
  priority: number;
}

export async function generateFinancialInsights(
  clientData: {
    name: string;
    age: number;
    netWorth: number;
    portfolioValue: number;
    riskProfile: string;
  }
): Promise<FinancialInsight[]> {
  const client = getOpenAI();
  
  if (!client) {
    // Return fallback insights when API key is not available
    return [
      {
        type: "opportunity",
        title: "Tax Optimization Review",
        description: `${clientData.name} may benefit from tax-loss harvesting opportunities in their portfolio.`,
        impact: "High",
        priority: 1,
      },
      {
        type: "action",
        title: "Portfolio Rebalancing",
        description: `Review asset allocation to ensure it aligns with ${clientData.riskProfile} risk profile.`,
        impact: "Medium",
        priority: 2,
      },
      {
        type: "opportunity",
        title: "Retirement Planning Check",
        description: `Consider increasing retirement contributions to maximize tax-advantaged growth.`,
        impact: "Medium",
        priority: 3,
      },
    ];
  }

  try {
    const prompt = `As a financial advisor AI, analyze the following client profile and provide 3 actionable financial insights:

Client Profile:
- Name: ${clientData.name}
- Age: ${clientData.age}
- Net Worth: $${clientData.netWorth.toLocaleString()}
- Portfolio Value: $${clientData.portfolioValue.toLocaleString()}
- Risk Profile: ${clientData.riskProfile}

Provide insights in the following categories:
1. Tax optimization opportunities
2. Portfolio allocation recommendations
3. Retirement planning suggestions

Respond with JSON in this exact format:
{
  "insights": [
    {
      "type": "opportunity|risk|action",
      "title": "Brief title",
      "description": "Detailed description with specific recommendations",
      "impact": "High|Medium|Low",
      "priority": 1-5
    }
  ]
}`;

    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert financial advisor providing actionable insights.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 2048,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.insights || [];
  } catch (error) {
    console.error("AI insights generation error:", error);
    // Return fallback insights if AI call fails
    return [
      {
        type: "opportunity",
        title: "Portfolio Review Recommended",
        description: `Based on ${clientData.name}'s ${clientData.riskProfile} risk profile, consider reviewing asset allocation.`,
        impact: "Medium",
        priority: 3,
      },
    ];
  }
}

export async function generateScenarioAnalysis(
  parameters: {
    currentAge: number;
    retirementAge: number;
    currentSavings: number;
    monthlySavings: number;
    expectedReturn: number;
  }
): Promise<{
  projectedBalance: number;
  recommendations: string[];
}> {
  // Calculate projection
  const years = parameters.retirementAge - parameters.currentAge;
  let balance = parameters.currentSavings;

  for (let i = 0; i < years; i++) {
    balance = balance * (1 + parameters.expectedReturn / 100) + 
              (parameters.monthlySavings * 12);
  }

  const client = getOpenAI();
  
  if (!client) {
    // Return fallback recommendations when API key is not available
    return {
      projectedBalance: Math.round(balance),
      recommendations: [
        "Consider increasing monthly contributions to reach your retirement goals faster",
        "Review your asset allocation periodically to match your risk tolerance",
        "Plan for healthcare and other expenses in retirement",
      ],
    };
  }

  try {
    const prompt = `Analyze this retirement scenario and provide 3 specific recommendations:

Current Age: ${parameters.currentAge}
Retirement Age: ${parameters.retirementAge}
Current Savings: $${parameters.currentSavings.toLocaleString()}
Monthly Savings: $${parameters.monthlySavings.toLocaleString()}
Expected Return: ${parameters.expectedReturn}%
Projected Balance: $${Math.round(balance).toLocaleString()}

Respond with JSON:
{
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}`;

    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are a retirement planning expert.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 1024,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      projectedBalance: Math.round(balance),
      recommendations: result.recommendations || [
        "Consider increasing monthly contributions",
        "Review asset allocation periodically",
        "Plan for healthcare costs in retirement",
      ],
    };
  } catch (error) {
    console.error("Scenario analysis error:", error);

    return {
      projectedBalance: Math.round(balance),
      recommendations: [
        "Consider increasing monthly contributions for better outcomes",
        "Review your asset allocation to match your risk tolerance",
        "Plan for healthcare and other retirement expenses",
      ],
    };
  }
}
