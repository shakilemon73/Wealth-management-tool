import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Clients Table
export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  avatar: text("avatar"),
  age: integer("age").notNull(),
  occupation: text("occupation"),
  netWorth: decimal("net_worth", { precision: 15, scale: 2 }).notNull(),
  portfolioValue: decimal("portfolio_value", { precision: 15, scale: 2 }).notNull(),
  healthScore: integer("health_score").notNull().default(85),
  riskProfile: text("risk_profile").notNull().default('moderate'),
  lastContact: timestamp("last_contact").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Goals Table
export const goals = pgTable("goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull(),
  type: text("type").notNull(),
  name: text("name").notNull(),
  targetAmount: decimal("target_amount", { precision: 15, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 15, scale: 2 }).notNull(),
  targetDate: timestamp("target_date").notNull(),
  progress: integer("progress").notNull().default(0),
  priority: text("priority").notNull().default('medium'),
  createdAt: timestamp("created_at").defaultNow(),
});

// Portfolios Table
export const portfolios = pgTable("portfolios", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull(),
  totalValue: decimal("total_value", { precision: 15, scale: 2 }).notNull(),
  cashFlow: decimal("cash_flow", { precision: 15, scale: 2 }).notNull(),
  ytdReturn: decimal("ytd_return", { precision: 5, scale: 2 }).notNull(),
  allocation: jsonb("allocation").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// AI Insights Table
export const insights = pgTable("insights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  impact: text("impact").notNull(),
  priority: integer("priority").notNull().default(5),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Scenarios Table
export const scenarios = pgTable("scenarios", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  parameters: jsonb("parameters").notNull(),
  results: jsonb("results"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Actions Table
export const actions = pgTable("actions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id"),
  title: text("title").notNull(),
  description: text("description"),
  priority: text("priority").notNull().default('medium'),
  dueDate: timestamp("due_date"),
  isCompleted: boolean("is_completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert Schemas
export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
});

export const insertGoalSchema = createInsertSchema(goals).omit({
  id: true,
  createdAt: true,
});

export const insertPortfolioSchema = createInsertSchema(portfolios).omit({
  id: true,
  lastUpdated: true,
});

export const insertInsightSchema = createInsertSchema(insights).omit({
  id: true,
  createdAt: true,
});

export const insertScenarioSchema = createInsertSchema(scenarios).omit({
  id: true,
  createdAt: true,
});

export const insertActionSchema = createInsertSchema(actions).omit({
  id: true,
  createdAt: true,
});

// Types
export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Goal = typeof goals.$inferSelect;
export type InsertGoal = z.infer<typeof insertGoalSchema>;

export type Portfolio = typeof portfolios.$inferSelect;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;

export type Insight = typeof insights.$inferSelect;
export type InsertInsight = z.infer<typeof insertInsightSchema>;

export type Scenario = typeof scenarios.$inferSelect;
export type InsertScenario = z.infer<typeof insertScenarioSchema>;

export type Action = typeof actions.$inferSelect;
export type InsertAction = z.infer<typeof insertActionSchema>;

// Additional TypeScript interfaces for frontend use
export interface DashboardMetrics {
  totalAUM: number;
  activeClients: number;
  pendingActions: number;
  portfolioPerformance: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface AllocationItem {
  category: string;
  percentage: number;
  value: number;
  color: string;
}

export interface ScenarioParameters {
  retirementAge?: number;
  savingsRate?: number;
  expectedReturn?: number;
  inflationRate?: number;
  majorPurchaseAmount?: number;
  majorPurchaseYear?: number;
  [key: string]: any;
}

export interface ScenarioResults {
  projectedNetWorth: ChartDataPoint[];
  cashFlow: ChartDataPoint[];
  successProbability: number;
  recommendations: string[];
}
