import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { clients, goals, portfolios, actions } from "@shared/schema";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log("Seeding database...");

  const seedClients = [
    {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: null,
      age: 42,
      occupation: "Tech Executive",
      netWorth: "2400000",
      portfolioValue: "1850000",
      healthScore: 92,
      riskProfile: "moderate",
    },
    {
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: null,
      age: 55,
      occupation: "Business Owner",
      netWorth: "8500000",
      portfolioValue: "6200000",
      healthScore: 88,
      riskProfile: "conservative",
    },
    {
      name: "Jennifer Martinez",
      email: "jennifer.m@email.com",
      avatar: null,
      age: 38,
      occupation: "Doctor",
      netWorth: "1800000",
      portfolioValue: "1200000",
      healthScore: 85,
      riskProfile: "moderate",
    },
    {
      name: "Robert Williams",
      email: "robert.w@email.com",
      avatar: null,
      age: 67,
      occupation: "Retired Executive",
      netWorth: "5200000",
      portfolioValue: "4500000",
      healthScore: 78,
      riskProfile: "conservative",
    },
    {
      name: "Emily Davis",
      email: "emily.davis@email.com",
      avatar: null,
      age: 33,
      occupation: "Software Engineer",
      netWorth: "850000",
      portfolioValue: "650000",
      healthScore: 95,
      riskProfile: "aggressive",
    },
  ];

  const insertedClients = await db.insert(clients).values(seedClients).returning();
  console.log(`Created ${insertedClients.length} clients`);

  const seedGoals = insertedClients.map((client) => ({
    clientId: client.id,
    type: "retirement",
    name: "Retirement Planning",
    targetAmount: "3000000",
    currentAmount: client.portfolioValue,
    targetDate: new Date("2045-01-01"),
    progress: Math.floor((parseFloat(client.portfolioValue) / 3000000) * 100),
    priority: "high",
  }));

  const insertedGoals = await db.insert(goals).values(seedGoals).returning();
  console.log(`Created ${insertedGoals.length} goals`);

  const seedPortfolios = insertedClients.map((client) => ({
    clientId: client.id,
    totalValue: client.portfolioValue,
    cashFlow: "12000",
    ytdReturn: "8.5",
    allocation: {
      stocks: 45,
      bonds: 25,
      realEstate: 15,
      cash: 10,
      alternative: 5,
    },
  }));

  const insertedPortfolios = await db.insert(portfolios).values(seedPortfolios).returning();
  console.log(`Created ${insertedPortfolios.length} portfolios`);

  const seedActions = [
    {
      title: "Review Sarah Johnson's retirement plan",
      description: "Annual review scheduled for next week",
      priority: "high",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isCompleted: false,
      clientId: insertedClients[0]?.id,
    },
    {
      title: "Tax-loss harvesting opportunity",
      description: "Review Michael Chen's taxable account",
      priority: "high",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      isCompleted: false,
      clientId: insertedClients[1]?.id,
    },
    {
      title: "Portfolio rebalancing needed",
      description: "5 clients need rebalancing",
      priority: "medium",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      isCompleted: false,
      clientId: null,
    },
  ];

  const insertedActions = await db.insert(actions).values(seedActions).returning();
  console.log(`Created ${insertedActions.length} actions`);

  console.log("Database seeded successfully!");
  await pool.end();
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
