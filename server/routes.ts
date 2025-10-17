import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateFinancialInsights, generateScenarioAnalysis } from "./lib/ai";
import { insertClientSchema, insertGoalSchema, insertActionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard endpoints
  app.get("/api/dashboard/metrics", async (_req, res) => {
    try {
      const metrics = await storage.getDashboardMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard metrics" });
    }
  });

  app.get("/api/dashboard/portfolio-chart", async (_req, res) => {
    try {
      const data = await storage.getPortfolioChartData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio chart data" });
    }
  });

  // Client endpoints
  app.get("/api/clients", async (_req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch clients" });
    }
  });

  app.get("/api/clients/recent", async (_req, res) => {
    try {
      const clients = await storage.getRecentClients(5);
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent clients" });
    }
  });

  app.get("/api/clients/:id", async (req, res) => {
    try {
      const client = await storage.getClient(req.params.id);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch client" });
    }
  });

  app.post("/api/clients", async (req, res) => {
    try {
      const validatedData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validatedData);
      res.status(201).json(client);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid client data" });
    }
  });

  app.patch("/api/clients/:id", async (req, res) => {
    try {
      const client = await storage.updateClient(req.params.id, req.body);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json(client);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update client" });
    }
  });

  app.delete("/api/clients/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteClient(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete client" });
    }
  });

  // Goal endpoints
  app.get("/api/clients/:clientId/goals", async (req, res) => {
    try {
      const goals = await storage.getGoalsByClient(req.params.clientId);
      res.json(goals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch goals" });
    }
  });

  app.post("/api/goals", async (req, res) => {
    try {
      const validatedData = insertGoalSchema.parse(req.body);
      const goal = await storage.createGoal(validatedData);
      res.status(201).json(goal);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid goal data" });
    }
  });

  app.patch("/api/goals/:id", async (req, res) => {
    try {
      const goal = await storage.updateGoal(req.params.id, req.body);
      if (!goal) {
        return res.status(404).json({ error: "Goal not found" });
      }
      res.json(goal);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update goal" });
    }
  });

  app.delete("/api/goals/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteGoal(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Goal not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete goal" });
    }
  });

  // Portfolio endpoints
  app.get("/api/clients/:clientId/portfolio", async (req, res) => {
    try {
      const portfolio = await storage.getPortfolioByClient(req.params.clientId);
      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio" });
    }
  });

  // Action endpoints
  app.get("/api/actions", async (_req, res) => {
    try {
      const actions = await storage.getActions();
      res.json(actions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch actions" });
    }
  });

  app.post("/api/actions", async (req, res) => {
    try {
      const validatedData = insertActionSchema.parse(req.body);
      const action = await storage.createAction(validatedData);
      res.status(201).json(action);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid action data" });
    }
  });

  app.patch("/api/actions/:id/toggle", async (req, res) => {
    try {
      const action = await storage.toggleAction(req.params.id);
      if (!action) {
        return res.status(404).json({ error: "Action not found" });
      }
      res.json(action);
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle action" });
    }
  });

  app.patch("/api/actions/:id", async (req, res) => {
    try {
      const action = await storage.updateAction(req.params.id, req.body);
      if (!action) {
        return res.status(404).json({ error: "Action not found" });
      }
      res.json(action);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update action" });
    }
  });

  app.delete("/api/actions/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteAction(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Action not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete action" });
    }
  });

  // Insights endpoints
  app.get("/api/insights", async (_req, res) => {
    try {
      const insights = await storage.getInsights();
      res.json(insights);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch insights" });
    }
  });

  app.delete("/api/insights/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteInsight(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Insight not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete insight" });
    }
  });

  app.post("/api/insights/generate", async (req, res) => {
    try {
      const { clientId } = req.body;
      const client = await storage.getClient(clientId);
      
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      const aiInsights = await generateFinancialInsights({
        name: client.name,
        age: client.age,
        netWorth: parseFloat(client.netWorth),
        portfolioValue: parseFloat(client.portfolioValue),
        riskProfile: client.riskProfile,
      });

      const createdInsights = [];
      for (const insight of aiInsights) {
        const created = await storage.createInsight({
          clientId: client.id,
          type: insight.type,
          title: insight.title,
          description: insight.description,
          impact: insight.impact,
          priority: insight.priority,
          isRead: false,
        });
        createdInsights.push(created);
      }

      res.json(createdInsights);
    } catch (error: any) {
      console.error("Error generating insights:", error);
      res.status(500).json({ error: error.message || "Failed to generate insights" });
    }
  });

  // Scenario endpoints
  app.get("/api/clients/:clientId/scenarios", async (req, res) => {
    try {
      const scenarios = await storage.getScenariosByClient(req.params.clientId);
      res.json(scenarios);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scenarios" });
    }
  });

  app.patch("/api/scenarios/:id", async (req, res) => {
    try {
      const scenario = await storage.updateScenario(req.params.id, req.body);
      if (!scenario) {
        return res.status(404).json({ error: "Scenario not found" });
      }
      res.json(scenario);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update scenario" });
    }
  });

  app.delete("/api/scenarios/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteScenario(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Scenario not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete scenario" });
    }
  });

  app.post("/api/scenarios/analyze", async (req, res) => {
    try {
      const { currentAge, retirementAge, currentSavings, monthlySavings, expectedReturn } = req.body;

      if (!currentAge || !retirementAge || currentSavings === undefined || 
          monthlySavings === undefined || expectedReturn === undefined) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      const analysis = await generateScenarioAnalysis({
        currentAge: Number(currentAge),
        retirementAge: Number(retirementAge),
        currentSavings: Number(currentSavings),
        monthlySavings: Number(monthlySavings),
        expectedReturn: Number(expectedReturn),
      });

      res.json(analysis);
    } catch (error: any) {
      console.error("Error analyzing scenario:", error);
      res.status(500).json({ error: error.message || "Failed to analyze scenario" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
