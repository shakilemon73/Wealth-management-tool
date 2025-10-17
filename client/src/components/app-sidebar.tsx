import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Target, 
  Calculator,
  PresentationIcon,
  Settings,
  Sparkles,
  BarChart3,
  Zap
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "Overview & metrics"
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
    description: "Manage clients"
  },
  {
    title: "Planning Studio",
    url: "/planning",
    icon: Target,
    description: "Financial planning"
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    description: "Performance insights"
  },
  {
    title: "Scenarios",
    url: "/scenarios",
    icon: Calculator,
    description: "What-if analysis"
  },
  {
    title: "Presentation",
    url: "/presentation",
    icon: PresentationIcon,
    description: "Client meetings"
  },
];

const aiTools = [
  {
    title: "AI Insights",
    url: "/insights",
    icon: Sparkles,
    description: "AI recommendations",
    badge: "NEW"
  },
];

const settingsItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "Preferences"
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar data-testid="sidebar-main" className="border-r border-sidebar-border">
      <SidebarHeader className="p-5 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3 group no-underline">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-chart-1 to-chart-2 shadow-md group-hover:shadow-lg transition-all">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground typography-heading">WealthVision</h1>
            <p className="text-xs text-muted-foreground font-medium">Professional Edition</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 typography-label text-xs mb-2">
            Core Features
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {menuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}
                      className="group relative"
                    >
                      <Link href={item.url} className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <item.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                        <div className="flex-1">
                          <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            {item.title}
                          </span>
                        </div>
                        {isActive && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-4 typography-label text-xs mb-2">
            AI-Powered
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {aiTools.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}
                      className="group relative"
                    >
                      <Link href={item.url} className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <div className={`h-5 w-5 flex items-center justify-center ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400'}`}>
                          <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {isActive && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-l-full" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {settingsItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}
                      className="group relative"
                    >
                      <Link href={item.url} className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <item.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                        <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                          {item.title}
                        </span>
                        {isActive && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Link href="/insights" className="block rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-4 border border-purple-100 dark:border-purple-900 hover:shadow-md transition-all group">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">AI Co-Pilot</p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                Get intelligent insights & smart recommendations
              </p>
            </div>
          </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
