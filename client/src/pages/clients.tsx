import { useState } from "react";
import { ClientCard } from "@/components/client-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Grid, List, Users as UsersIcon, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@shared/schema";
import { useLocation } from "wouter";

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterBy, setFilterBy] = useState<string>("all");
  const [, setLocation] = useLocation();

  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const filteredClients = clients?.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.occupation?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterBy === "all" || 
      (filterBy === "high" && client.healthScore !== null && client.healthScore !== undefined && client.healthScore >= 80) ||
      (filterBy === "medium" && client.healthScore !== null && client.healthScore !== undefined && client.healthScore >= 60 && client.healthScore < 80) ||
      (filterBy === "low" && client.healthScore !== null && client.healthScore !== undefined && client.healthScore < 60);
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: clients?.length || 0,
    highHealth: clients?.filter(c => c.healthScore !== null && c.healthScore !== undefined && c.healthScore >= 80).length || 0,
    totalAUM: clients?.reduce((sum, c) => sum + parseFloat(c.portfolioValue), 0) || 0,
  };

  return (
    <div className="flex-1 p-6 lg:p-8 content-focus" data-testid="page-clients">
      <div className="space-y-2 mb-8">
        <h1 className="visual-hierarchy-1">Clients</h1>
        <p className="scan-paragraph text-muted-foreground">
          Manage client relationships and portfolios
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold typography-financial">{stats.total}</p>
              <p className="text-sm text-muted-foreground mt-2">Active relationships</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Excellent Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold typography-financial">{stats.highHealth}</p>
              <p className="text-sm text-muted-foreground mt-2">80+ health score</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="spacing-sm">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Combined AUM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold typography-financial">
                ${(stats.totalAUM / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-muted-foreground mt-2">Total under management</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="spacing-md">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-clients"
                />
              </div>
              
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[180px]" data-testid="select-filter">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="high">High Health (80+)</SelectItem>
                  <SelectItem value="medium">Medium (60-79)</SelectItem>
                  <SelectItem value="low">Needs Attention</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  data-testid="button-grid-view"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  data-testid="button-list-view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button className="gap-2 ml-auto" data-testid="button-add-client">
                <Plus className="h-4 w-4" />
                Add Client
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : filteredClients && filteredClients.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {filteredClients.map((client) => (
              <div key={client.id}>
                {viewMode === "grid" ? (
                  <ClientCard
                    client={client}
                    onView={() => setLocation(`/clients/${client.id}`)}
                  />
                ) : (
                  <Card
                    onClick={() => setLocation(`/clients/${client.id}`)}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <CardContent className="spacing-md">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold shrink-0">
                          {client.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">
                            {client.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{client.occupation}</p>
                          <p className="text-xs text-muted-foreground">{client.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold typography-financial">
                            ${parseFloat(client.netWorth).toLocaleString()}
                          </p>
                          <Badge className={
                            client.healthScore === null || client.healthScore === undefined
                              ? "bg-muted"
                              : client.healthScore >= 80 
                              ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" 
                              : client.healthScore >= 60 
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                              : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                          }>
                            {client.healthScore === null || client.healthScore === undefined 
                              ? "Not Rated" 
                              : client.healthScore >= 80 
                              ? "Excellent" 
                              : client.healthScore >= 60 
                              ? "Good" 
                              : "Needs Attention"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center spacing-xl py-16">
              <Search className="h-12 w-12 text-muted-foreground opacity-40 mb-4" />
              <h3 className="visual-hierarchy-3 mb-2">
                {searchQuery || filterBy !== "all" ? "No clients found" : "No clients yet"}
              </h3>
              <p className="scan-paragraph text-muted-foreground text-center mb-6">
                {searchQuery || filterBy !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Start by adding your first client"}
              </p>
              {!searchQuery && filterBy === "all" && (
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Client
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
