import { useState } from "react";
import { ClientCard } from "@/components/client-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@shared/schema";
import { useLocation } from "wouter";

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const filteredClients = clients?.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.occupation?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8" data-testid="page-clients">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-h1 font-semibold text-foreground">
            Clients
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your client relationships and portfolios
          </p>
        </div>
        <Button className="gap-2" data-testid="button-add-client">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-clients"
          />
        </div>
        <Button variant="outline" className="gap-2" data-testid="button-filter">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : filteredClients && filteredClients.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onView={() => setLocation(`/clients/${client.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchQuery ? "No clients found" : "No clients yet"}
          </h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            {searchQuery
              ? "Try adjusting your search criteria"
              : "Start by adding your first client to begin managing their wealth"}
          </p>
          {!searchQuery && (
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Client
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
