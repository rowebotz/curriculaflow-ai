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
    <TooltipProvider>
      <div className="flex h-screen w-full overflow-hidden bg-paper">
        {/* Authoritative Sidebar */}
        <aside className="w-64 notebook-margin bg-white flex flex-col p-6 z-30">
          <div className="mb-12">
            <h1 className="font-display text-2xl font-black text-brand-black tracking-tighter">
              CURRICULA<span className="text-brand-primary">FLOW</span>
            </h1>
            <p className="text-[10px] text-brand-gray uppercase font-bold tracking-[0.2em] mt-1">McGraw Hill Education</p>
          </div>
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 p-3 font-bold transition-all border-2 border-transparent text-sm uppercase tracking-wide",
                  location.pathname === item.path
                    ? "bg-brand-primary text-white border-brand-black shadow-sketch"
                    : "hover:bg-muted text-brand-black"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="pt-6 border-t-2 border-brand-black/5 space-y-4">
            <div className="flex items-center gap-2 text-brand-gray">
              <Coffee className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">System: Operational</span>
            </div>
            <div className="flex flex-col gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase p-2 border border-brand-black/10 cursor-help bg-white hover:bg-muted transition-colors">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
                    <span>FERPA/COPPA Compliant</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-brand-black text-white p-3 text-xs rounded-none border-none">
                  <p className="max-w-[180px]">Data is anonymized. We do not store PII. AI interactions are encrypted and transient.</p>
                </TooltipContent>
              </Tooltip>
              <div className="p-3 bg-brand-black text-white text-[9px] font-bold uppercase leading-tight tracking-wider">
                Request Limit: Active for Current Session
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 relative overflow-y-auto">
          <div className="p-10 pb-24">
            {children}
          </div>
          <footer className="absolute bottom-4 left-10 right-10 flex justify-between items-center text-[10px] text-brand-gray font-bold uppercase tracking-widest pointer-events-none">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Secure Professional Workspace</span>
            </div>
            <div className="pointer-events-auto cursor-pointer hover:text-brand-primary transition-colors">
              © 2024 McGraw Hill Solutions
            </div>
          </footer>
        </main>
      </div>
    </TooltipProvider>
  );
}