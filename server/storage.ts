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
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Clients
  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<boolean>;
  getRecentClients(limit: number): Promise<Client[]>;

  // Goals
  getGoalsByClient(clientId: string): Promise<Goal[]>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoal(id: string, goal: Partial<InsertGoal>): Promise<Goal | undefined>;
  deleteGoal(id: string): Promise<boolean>;

  // Portfolios
  getPortfolioByClient(clientId: string): Promise<Portfolio | undefined>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(id: string, portfolio: Partial<InsertPortfolio>): Promise<Portfolio | undefined>;
  deletePortfolio(id: string): Promise<boolean>;

  // Insights
  getInsights(): Promise<Insight[]>;
  getInsightsByClient(clientId: string): Promise<Insight[]>;
  createInsight(insight: InsertInsight): Promise<Insight>;
  deleteInsight(id: string): Promise<boolean>;

  // Scenarios
  getScenariosByClient(clientId: string): Promise<Scenario[]>;
  createScenario(scenario: InsertScenario): Promise<Scenario>;
  updateScenario(id: string, scenario: Partial<InsertScenario>): Promise<Scenario | undefined>;
  deleteScenario(id: string): Promise<boolean>;

  // Actions
  getActions(): Promise<Action[]>;
  createAction(action: InsertAction): Promise<Action>;
  updateAction(id: string, action: Partial<InsertAction>): Promise<Action | undefined>;
  deleteAction(id: string): Promise<boolean>;
  toggleAction(id: string): Promise<Action | undefined>;

  // Dashboard
  getDashboardMetrics(): Promise<DashboardMetrics>;
  getPortfolioChartData(): Promise<ChartDataPoint[]>;
}

export class MemStorage implements IStorage {
  private clients: Map<string, Client>;
  private goals: Map<string, Goal>;
  private portfolios: Map<string, Portfolio>;
  private insights: Map<string, Insight>;
  private scenarios: Map<string, Scenario>;
  private actions: Map<string, Action>;

  constructor() {
    this.clients = new Map();
    this.goals = new Map();
    this.portfolios = new Map();
    this.insights = new Map();
    this.scenarios = new Map();
    this.actions = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed clients
    const clients: InsertClient[] = [
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

    clients.forEach((client) => {
      const created = this.createClientSync(client);
      
      // Add goals for each client
      this.createGoalSync({
        clientId: created.id,
        type: "retirement",
        name: "Retirement Planning",
        targetAmount: "3000000",
        currentAmount: created.portfolioValue,
        targetDate: new Date("2045-01-01"),
        progress: Math.floor((parseFloat(created.portfolioValue) / 3000000) * 100),
        priority: "high",
      });

      // Add portfolio
      this.createPortfolioSync({
        clientId: created.id,
        totalValue: created.portfolioValue,
        cashFlow: "12000",
        ytdReturn: "8.5",
        allocation: {
          stocks: 45,
          bonds: 25,
          realEstate: 15,
          cash: 10,
          alternative: 5,
        },
      });
    });

    // Seed actions
    const actions: InsertAction[] = [
      {
        title: "Review Sarah Johnson's retirement plan",
        description: "Annual review scheduled for next week",
        priority: "high",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        isCompleted: false,
        clientId: Array.from(this.clients.values())[0]?.id,
      },
      {
        title: "Tax-loss harvesting opportunity",
        description: "Review Michael Chen's taxable account",
        priority: "high",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        isCompleted: false,
        clientId: Array.from(this.clients.values())[1]?.id,
      },
      {
        title: "Portfolio rebalancing needed",
        description: "5 clients need rebalancing",
        priority: "medium",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        isCompleted: false,
      },
    ];

    actions.forEach((action) => this.createActionSync(action));
  }

  private createClientSync(insertClient: InsertClient): Client {
    const id = randomUUID();
    const client: Client = {
      ...insertClient,
      avatar: insertClient.avatar ?? null,
      occupation: insertClient.occupation ?? null,
      healthScore: insertClient.healthScore ?? 85,
      riskProfile: insertClient.riskProfile ?? 'moderate',
      id,
      lastContact: new Date(),
      createdAt: new Date(),
    };
    this.clients.set(id, client);
    return client;
  }

  private createGoalSync(insertGoal: InsertGoal): Goal {
    const id = randomUUID();
    const goal: Goal = {
      ...insertGoal,
      progress: insertGoal.progress ?? 0,
      priority: insertGoal.priority ?? 'medium',
      id,
      createdAt: new Date(),
    };
    this.goals.set(id, goal);
    return goal;
  }

  private createPortfolioSync(insertPortfolio: InsertPortfolio): Portfolio {
    const id = randomUUID();
    const portfolio: Portfolio = {
      ...insertPortfolio,
      id,
      lastUpdated: new Date(),
    };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }

  private createActionSync(insertAction: InsertAction): Action {
    const id = randomUUID();
    const action: Action = {
      ...insertAction,
      clientId: insertAction.clientId ?? null,
      description: insertAction.description ?? null,
      priority: insertAction.priority ?? 'medium',
      dueDate: insertAction.dueDate ?? null,
      isCompleted: insertAction.isCompleted ?? false,
      id,
      createdAt: new Date(),
    };
    this.actions.set(id, action);
    return action;
  }

  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async getClient(id: string): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    return this.createClientSync(insertClient);
  }

  async getRecentClients(limit: number): Promise<Client[]> {
    const clients = Array.from(this.clients.values());
    return clients.slice(0, limit);
  }

  async updateClient(id: string, updates: Partial<InsertClient>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;
    
    const updated = { ...client, ...updates };
    this.clients.set(id, updated);
    return updated;
  }

  async deleteClient(id: string): Promise<boolean> {
    return this.clients.delete(id);
  }

  async getGoalsByClient(clientId: string): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter(
      (goal) => goal.clientId === clientId
    );
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    return this.createGoalSync(insertGoal);
  }

  async updateGoal(id: string, updates: Partial<InsertGoal>): Promise<Goal | undefined> {
    const goal = this.goals.get(id);
    if (!goal) return undefined;
    
    const updated = { ...goal, ...updates };
    this.goals.set(id, updated);
    return updated;
  }

  async deleteGoal(id: string): Promise<boolean> {
    return this.goals.delete(id);
  }

  async getPortfolioByClient(clientId: string): Promise<Portfolio | undefined> {
    return Array.from(this.portfolios.values()).find(
      (portfolio) => portfolio.clientId === clientId
    );
  }

  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    return this.createPortfolioSync(insertPortfolio);
  }

  async updatePortfolio(id: string, updates: Partial<InsertPortfolio>): Promise<Portfolio | undefined> {
    const portfolio = this.portfolios.get(id);
    if (!portfolio) return undefined;
    
    const updated = { ...portfolio, ...updates, lastUpdated: new Date() };
    this.portfolios.set(id, updated);
    return updated;
  }

  async deletePortfolio(id: string): Promise<boolean> {
    return this.portfolios.delete(id);
  }

  async getInsights(): Promise<Insight[]> {
    return Array.from(this.insights.values());
  }

  async getInsightsByClient(clientId: string): Promise<Insight[]> {
    return Array.from(this.insights.values()).filter(
      (insight) => insight.clientId === clientId
    );
  }

  async createInsight(insertInsight: InsertInsight): Promise<Insight> {
    const id = randomUUID();
    const insight: Insight = {
      ...insertInsight,
      priority: insertInsight.priority ?? 5,
      isRead: insertInsight.isRead ?? false,
      id,
      createdAt: new Date(),
    };
    this.insights.set(id, insight);
    return insight;
  }

  async deleteInsight(id: string): Promise<boolean> {
    return this.insights.delete(id);
  }

  async getScenariosByClient(clientId: string): Promise<Scenario[]> {
    return Array.from(this.scenarios.values()).filter(
      (scenario) => scenario.clientId === clientId
    );
  }

  async createScenario(insertScenario: InsertScenario): Promise<Scenario> {
    const id = randomUUID();
    const scenario: Scenario = {
      ...insertScenario,
      results: insertScenario.results ?? null,
      id,
      createdAt: new Date(),
    };
    this.scenarios.set(id, scenario);
    return scenario;
  }

  async updateScenario(id: string, updates: Partial<InsertScenario>): Promise<Scenario | undefined> {
    const scenario = this.scenarios.get(id);
    if (!scenario) return undefined;
    
    const updated = { ...scenario, ...updates };
    this.scenarios.set(id, updated);
    return updated;
  }

  async deleteScenario(id: string): Promise<boolean> {
    return this.scenarios.delete(id);
  }

  async getActions(): Promise<Action[]> {
    return Array.from(this.actions.values()).filter(
      (action) => !action.isCompleted
    );
  }

  async createAction(insertAction: InsertAction): Promise<Action> {
    return this.createActionSync(insertAction);
  }

  async updateAction(id: string, updates: Partial<InsertAction>): Promise<Action | undefined> {
    const action = this.actions.get(id);
    if (!action) return undefined;
    
    const updated = { ...action, ...updates };
    this.actions.set(id, updated);
    return updated;
  }

  async deleteAction(id: string): Promise<boolean> {
    return this.actions.delete(id);
  }

  async toggleAction(id: string): Promise<Action | undefined> {
    const action = this.actions.get(id);
    if (action) {
      action.isCompleted = !action.isCompleted;
      this.actions.set(id, action);
    }
    return action;
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const clients = Array.from(this.clients.values());
    const actions = Array.from(this.actions.values()).filter(
      (action) => !action.isCompleted
    );

    const totalAUM = clients.reduce(
      (sum, client) => sum + parseFloat(client.portfolioValue),
      0
    );

    return {
      totalAUM: Math.round(totalAUM),
      activeClients: clients.length,
      pendingActions: actions.length,
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

import { DbStorage } from "./db-storage";

export const storage = process.env.DATABASE_URL ? new DbStorage() : new MemStorage();
