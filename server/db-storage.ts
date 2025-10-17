import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { eq, desc, sql } from "drizzle-orm";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
import {
  type Client,
  type InsertClient,
  type Goal,
  type InsertGoal,
  type Portfolio,
  type InsertPortfolio,
  type Insight,
  type InsertInsight,
  type Scenario,
  type InsertScenario,
  type Action,
  type InsertAction,
  type DashboardMetrics,
  type ChartDataPoint,
  clients,
  goals,
  portfolios,
  insights,
  scenarios,
  actions,
} from "@shared/schema";
import { type IStorage } from "./storage";

export class DbStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool);
  }

  async getClients(): Promise<Client[]> {
    return await this.db.select().from(clients);
  }

  async getClient(id: string): Promise<Client | undefined> {
    const result = await this.db.select().from(clients).where(eq(clients.id, id));
    return result[0];
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const result = await this.db.insert(clients).values(insertClient).returning();
    return result[0];
  }

  async getRecentClients(limit: number): Promise<Client[]> {
    return await this.db
      .select()
      .from(clients)
      .orderBy(desc(clients.lastContact))
      .limit(limit);
  }

  async updateClient(
    id: string,
    updates: Partial<InsertClient>
  ): Promise<Client | undefined> {
    const result = await this.db
      .update(clients)
      .set(updates)
      .where(eq(clients.id, id))
      .returning();
    return result[0];
  }

  async deleteClient(id: string): Promise<boolean> {
    const result = await this.db.delete(clients).where(eq(clients.id, id)).returning();
    return result.length > 0;
  }

  async getGoalsByClient(clientId: string): Promise<Goal[]> {
    return await this.db.select().from(goals).where(eq(goals.clientId, clientId));
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const result = await this.db.insert(goals).values(insertGoal).returning();
    return result[0];
  }

  async updateGoal(id: string, updates: Partial<InsertGoal>): Promise<Goal | undefined> {
    const result = await this.db
      .update(goals)
      .set(updates)
      .where(eq(goals.id, id))
      .returning();
    return result[0];
  }

  async deleteGoal(id: string): Promise<boolean> {
    const result = await this.db.delete(goals).where(eq(goals.id, id)).returning();
    return result.length > 0;
  }

  async getPortfolioByClient(clientId: string): Promise<Portfolio | undefined> {
    const result = await this.db
      .select()
      .from(portfolios)
      .where(eq(portfolios.clientId, clientId));
    return result[0];
  }

  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const result = await this.db.insert(portfolios).values(insertPortfolio).returning();
    return result[0];
  }

  async updatePortfolio(
    id: string,
    updates: Partial<InsertPortfolio>
  ): Promise<Portfolio | undefined> {
    const result = await this.db
      .update(portfolios)
      .set(updates)
      .where(eq(portfolios.id, id))
      .returning();
    return result[0];
  }

  async deletePortfolio(id: string): Promise<boolean> {
    const result = await this.db.delete(portfolios).where(eq(portfolios.id, id)).returning();
    return result.length > 0;
  }

  async getInsights(): Promise<Insight[]> {
    return await this.db.select().from(insights).orderBy(desc(insights.createdAt));
  }

  async getInsightsByClient(clientId: string): Promise<Insight[]> {
    return await this.db
      .select()
      .from(insights)
      .where(eq(insights.clientId, clientId))
      .orderBy(desc(insights.createdAt));
  }

  async createInsight(insertInsight: InsertInsight): Promise<Insight> {
    const result = await this.db.insert(insights).values(insertInsight).returning();
    return result[0];
  }

  async deleteInsight(id: string): Promise<boolean> {
    const result = await this.db.delete(insights).where(eq(insights.id, id)).returning();
    return result.length > 0;
  }

  async getScenariosByClient(clientId: string): Promise<Scenario[]> {
    return await this.db
      .select()
      .from(scenarios)
      .where(eq(scenarios.clientId, clientId))
      .orderBy(desc(scenarios.createdAt));
  }

  async createScenario(insertScenario: InsertScenario): Promise<Scenario> {
    const result = await this.db.insert(scenarios).values(insertScenario).returning();
    return result[0];
  }

  async updateScenario(
    id: string,
    updates: Partial<InsertScenario>
  ): Promise<Scenario | undefined> {
    const result = await this.db
      .update(scenarios)
      .set(updates)
      .where(eq(scenarios.id, id))
      .returning();
    return result[0];
  }

  async deleteScenario(id: string): Promise<boolean> {
    const result = await this.db.delete(scenarios).where(eq(scenarios.id, id)).returning();
    return result.length > 0;
  }

  async getActions(): Promise<Action[]> {
    return await this.db
      .select()
      .from(actions)
      .where(eq(actions.isCompleted, false))
      .orderBy(desc(actions.createdAt));
  }

  async createAction(insertAction: InsertAction): Promise<Action> {
    const result = await this.db.insert(actions).values(insertAction).returning();
    return result[0];
  }

  async updateAction(
    id: string,
    updates: Partial<InsertAction>
  ): Promise<Action | undefined> {
    const result = await this.db
      .update(actions)
      .set(updates)
      .where(eq(actions.id, id))
      .returning();
    return result[0];
  }

  async deleteAction(id: string): Promise<boolean> {
    const result = await this.db.delete(actions).where(eq(actions.id, id)).returning();
    return result.length > 0;
  }

  async toggleAction(id: string): Promise<Action | undefined> {
    const action = await this.db.select().from(actions).where(eq(actions.id, id));
    if (action.length === 0) return undefined;

    const result = await this.db
      .update(actions)
      .set({ isCompleted: !action[0].isCompleted })
      .where(eq(actions.id, id))
      .returning();
    return result[0];
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const clientsList = await this.db.select().from(clients);
    const actionsList = await this.db
      .select()
      .from(actions)
      .where(eq(actions.isCompleted, false));

    const totalAUM = clientsList.reduce(
      (sum, client) => sum + parseFloat(client.portfolioValue),
      0
    );

    return {
      totalAUM: Math.round(totalAUM),
      activeClients: clientsList.length,
      pendingActions: actionsList.length,
      portfolioPerformance: 8.5,
    };
  }

  async getPortfolioChartData(): Promise<ChartDataPoint[]> {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const baseValue = 18;

    return months.map((month, index) => ({
      date: month,
      value: baseValue + index * 0.8 + Math.random() * 0.5,
    }));
  }
}
