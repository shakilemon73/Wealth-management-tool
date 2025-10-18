import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, ChevronRight } from "lucide-react";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Clients from "@/pages/clients";
import Planning from "@/pages/planning";
import Analytics from "@/pages/analytics";
import Scenarios from "@/pages/scenarios";
import Presentation from "@/pages/presentation";
import Insights from "@/pages/insights";
import Settings from "@/pages/settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/clients" component={Clients} />
      <Route path="/planning" component={Planning} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/scenarios" component={Scenarios} />
      <Route path="/presentation" component={Presentation} />
      <Route path="/insights" component={Insights} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function BreadcrumbNav() {
  const [location] = useLocation();
  
  const getPageName = (path: string) => {
    const routes: Record<string, string> = {
      "/": "Dashboard",
      "/clients": "Clients",
      "/planning": "Planning Studio",
      "/analytics": "Analytics",
      "/scenarios": "Scenarios",
      "/presentation": "Presentation",
      "/insights": "AI Insights",
      "/settings": "Settings",
    };
    return routes[path] || "Page";
  };

  const pageName = getPageName(location);
  const isHome = location === "/";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {isHome ? (
            <BreadcrumbPage className="flex items-center gap-1.5">
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>Dashboard</span>
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink href="/" className="flex items-center gap-1.5">
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>Dashboard</span>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isHome && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{pageName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function App() {
  const sidebarStyle = {
    "--sidebar-width": "14rem",
    "--sidebar-width-icon": "3.5rem",
  } as React.CSSProperties;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="wealthvision-theme">
        <TooltipProvider>
          <SidebarProvider style={sidebarStyle}>
            <a href="#main-content" className="skip-link" data-testid="skip-to-content">
              Skip to main content
            </a>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between gap-4 px-6 py-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger data-testid="button-sidebar-toggle" aria-label="Toggle sidebar" />
                    <BreadcrumbNav />
                  </div>
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                  </div>
                </header>
                <main id="main-content" className="flex-1 overflow-auto bg-background" role="main" aria-label="Main content">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
