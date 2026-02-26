import React from "react";
import { Home, PenTool, BarChart3, Coffee, ShieldCheck, Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const location = useLocation();
  const navItems = [
    { name: "Sketchpad", path: "/", icon: Home },
    { name: "The Weaver", path: "/editor", icon: PenTool },
    { name: "Insight Lens", path: "/analytics", icon: BarChart3 },
  ];
  return (
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
            <span className="text-xs font-bold">System: Hot & Ready</span>
          </div>
          <div className="flex flex-col gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase p-2 border border-ink/10 cursor-help">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    <span>FERPA/COPPA Compliant</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-ink text-white p-3 text-xs">
                  <p className="max-w-[180px]">Data is anonymized. We do not store PII. AI interactions are encrypted and transient.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="p-3 bg-muted border-2 border-ink text-[10px] font-bold rotate-1 leading-tight">
              NOTE: Although this project has AI capabilities, there is a limit on requests across all user apps.
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 relative overflow-y-auto">
        <div className="p-8 pb-20">
          {children}
        </div>
        {/* Transparent Data Footer */}
        <footer className="absolute bottom-4 left-8 right-8 flex justify-between items-center text-[10px] text-muted-foreground pointer-events-none">
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>End-to-End Encrypted Workspace</span>
          </div>
          <div className="pointer-events-auto cursor-pointer hover:underline">
            Data Transparency Report 2024
          </div>
        </footer>
      </main>
    </div>
  );
}