import { 
  LayoutDashboard, 
  Users, 
  Target, 
  GitBranch,
  Presentation,
  Settings,
  Sparkles,
  TrendingUp,
  Building2
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  url: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "All Clients",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Planning Studio",
    url: "/planning",
    icon: Target,
  },
  {
    title: "Scenarios",
    url: "/scenarios",
    icon: GitBranch,
  },
  {
    title: "Performance",
    url: "/analytics",
    icon: TrendingUp,
  },
  {
    title: "AI Insights",
    url: "/insights",
    icon: Sparkles,
  },
  {
    title: "Client Presentations",
    url: "/presentation",
    icon: Presentation,
  },
];

const settingsItem: NavItem = {
  title: "Settings",
  url: "/settings",
  icon: Settings,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/60">
      {children}
    </div>
  );
}

function NavItemComponent({ item }: { item: NavItem }) {
  const [location] = useLocation();
  const isActive = location === item.url;

  return (
    <Link href={item.url}>
      <a
        className={cn(
          "group relative flex h-9 items-center gap-3 rounded-lg px-3 transition-all duration-150",
          "text-[14px] font-medium",
          isActive
            ? "bg-primary/12 font-semibold text-foreground"
            : "text-foreground hover:bg-muted/50"
        )}
        data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {isActive && (
          <div
            className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary"
            aria-hidden="true"
          />
        )}
        <item.icon
          className={cn(
            "h-[18px] w-[18px] shrink-0 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )}
          aria-hidden="true"
        />
        <span>{item.title}</span>
      </a>
    </Link>
  );
}

export function AppSidebar() {
  return (
    <Sidebar 
      data-testid="sidebar-main" 
      className="border-r border-sidebar-border"
      aria-label="Main navigation"
    >
      <SidebarHeader className="h-12 px-3 flex items-center border-b border-sidebar-border">
        <Link href="/">
          <a 
            className="flex items-center gap-3 no-underline"
            aria-label="WealthVision Professional - Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
              <Building2 className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">
                WealthVision
              </h1>
              <p className="text-[10px] text-muted-foreground font-medium leading-tight">
                Professional
              </p>
            </div>
          </a>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <div className="space-y-0.5">
          <NavItemComponent item={navItems[0]} />
        </div>

        <Separator className="my-4" />

        <div className="space-y-0.5">
          <SectionLabel>Clients</SectionLabel>
          <NavItemComponent item={navItems[1]} />
        </div>

        <Separator className="my-4" />

        <div className="space-y-0.5">
          <SectionLabel>Strategy</SectionLabel>
          <NavItemComponent item={navItems[2]} />
          <NavItemComponent item={navItems[3]} />
        </div>

        <Separator className="my-4" />

        <div className="space-y-0.5">
          <SectionLabel>Analytics</SectionLabel>
          <NavItemComponent item={navItems[4]} />
          <NavItemComponent item={navItems[5]} />
        </div>

        <Separator className="my-4" />

        <div className="space-y-0.5">
          <SectionLabel>Present</SectionLabel>
          <NavItemComponent item={navItems[6]} />
        </div>
      </SidebarContent>

      <SidebarFooter className="px-2 py-3 border-t border-sidebar-border">
        <NavItemComponent item={settingsItem} />
      </SidebarFooter>
    </Sidebar>
  );
}
