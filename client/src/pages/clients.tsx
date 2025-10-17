import { useState } from "react";
import { ClientCard } from "@/components/client-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Grid, List, SlidersHorizontal, TrendingUp, Users as UsersIcon, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@shared/schema";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const stats = {
    total: clients?.length || 0,
    highHealth: clients?.filter(c => c.healthScore !== null && c.healthScore !== undefined && c.healthScore >= 80).length || 0,
    totalAUM: clients?.reduce((sum, c) => sum + parseFloat(c.portfolioValue), 0) || 0,
  };

  return (
    <div className="flex-1 p-6 lg:p-8 overflow-auto bg-gradient-to-br from-background via-background to-slate-50/30 dark:to-slate-950/30" data-testid="page-clients">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-[1600px] mx-auto"
      >
        {/* Header Section */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Clients
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your client relationships and portfolios
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" data-testid="button-export">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all" data-testid="button-add-client">
              <Plus className="h-4 w-4" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl p-6 border border-blue-100 dark:border-blue-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Total Clients</span>
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <UsersIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold font-mono text-foreground">{stats.total}</div>
            <p className="text-sm text-muted-foreground mt-1">Active relationships</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl p-6 border border-green-100 dark:border-green-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Excellent Health</span>
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold font-mono text-foreground">{stats.highHealth}</div>
            <p className="text-sm text-muted-foreground mt-1">80+ health score</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-xl p-6 border border-purple-100 dark:border-purple-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Combined AUM</span>
              <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold font-mono text-foreground">
              ${(stats.totalAUM / 1000000).toFixed(1)}M
            </div>
            <p className="text-sm text-muted-foreground mt-1">Total under management</p>
          </motion.div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or occupation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-slate-300 dark:border-slate-700"
                data-testid="input-search-clients"
              />
            </div>
            
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[180px]" data-testid="select-filter">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                <SelectItem value="high">High Health (80+)</SelectItem>
                <SelectItem value="medium">Medium Health (60-79)</SelectItem>
                <SelectItem value="low">Needs Attention (&lt;60)</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="gap-2"
                data-testid="button-grid-view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="gap-2"
                data-testid="button-list-view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Badge variant="outline" className="ml-auto">
              {filteredClients?.length || 0} results
            </Badge>
          </div>
        </div>

        {/* Client Grid/List */}
        {isLoading ? (
          <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : filteredClients && filteredClients.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "grid"
                ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {filteredClients.map((client) => (
              <motion.div key={client.id} variants={itemVariants}>
                {viewMode === "grid" ? (
                  <ClientCard
                    client={client}
                    onView={() => setLocation(`/clients/${client.id}`)}
                  />
                ) : (
                  <div
                    onClick={() => setLocation(`/clients/${client.id}`)}
                    className="bg-white dark:bg-slate-900 rounded-xl p-4 border hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                        {client.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-blue-600 transition-colors">
                          {client.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{client.occupation}</p>
                        <p className="text-xs text-muted-foreground">{client.email}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <div>
                          <p className="text-xs text-muted-foreground">Net Worth</p>
                          <p className="text-lg font-mono font-bold text-foreground">
                            ${parseFloat(client.netWorth).toLocaleString()}
                          </p>
                        </div>
                        <Badge className={
                          client.healthScore === null || client.healthScore === undefined
                            ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
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
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-4"
          >
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center mb-6 shadow-lg">
              <Search className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {searchQuery || filterBy !== "all" ? "No clients found" : "No clients yet"}
            </h3>
            <p className="text-muted-foreground text-center max-w-md mb-6 text-lg">
              {searchQuery || filterBy !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start by adding your first client to begin managing their wealth"}
            </p>
            {!searchQuery && filterBy === "all" && (
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg">
                <Plus className="h-4 w-4" />
                Add Your First Client
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
