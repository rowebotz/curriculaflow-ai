import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, PenTool, BarChart3, Settings, Coffee } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
export function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const location = useLocation();
  const navItems = [
    { name: "Sketchpad", path: "/", icon: Home },
    { name: "The Weaver", path: "/editor", icon: PenTool },
    { name: "Insight Lens", path: "/analytics", icon: BarChart3 },
  ];
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-paper">
        {/* Sketchy Sidebar */}
        <aside className="w-64 notebook-margin bg-white flex flex-col p-6 z-30">
          <div className="mb-10">
            <h1 className="font-display text-3xl text-ink">CurriculaFlow</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Deployment Engine</p>
          </div>
          <nav className="flex-1 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 p-3 font-bold transition-all border-2 border-transparent",
                  location.pathname === item.path 
                    ? "bg-highlighter border-ink shadow-sketch" 
                    : "hover:bg-muted"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="pt-6 border-t-2 border-ink/10 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Coffee className="w-4 h-4" />
              <span className="text-xs">System: Hot & Ready</span>
            </div>
            <div className="p-3 bg-muted border-2 border-ink text-xs font-bold rotate-1">
              Note: AI usage limits apply to all sessions.
            </div>
          </div>
        </aside>
        <main className="flex-1 relative overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}