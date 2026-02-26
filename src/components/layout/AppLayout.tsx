import React from "react";
import { Home, PenTool, BarChart3, Coffee, ShieldCheck, Lock, Menu, Briefcase } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
export function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const location = useLocation();
  const isMobile = useIsMobile();
  const navItems = [
    { name: "Sketchpad", path: "/", icon: Home },
    { name: "The Weaver", path: "/editor", icon: PenTool },
    { name: "Insight Lens", path: "/analytics", icon: BarChart3 },
    { name: "Hire Stephen?", path: "/why-hire", icon: Briefcase },
  ];
  const NavContent = () => (
    <div className="flex flex-col h-full font-sans">
      <div className="mb-12">
        <h1 className="font-display text-2xl font-black text-brand-black tracking-tighter">
          CURRICULA<span className="text-brand-primary">FLOW</span>
        </h1>
        <p className="text-[10px] text-brand-gray uppercase font-bold tracking-[0.2em] mt-1">Instructional Design Engine</p>
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
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase p-2 border border-brand-black/10 bg-white">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
            <span>FERPA/COPPA Compliant</span>
          </div>
          <div className="p-3 bg-brand-black text-white text-[9px] font-bold uppercase leading-tight tracking-wider">
            Request Limit: Active
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <TooltipProvider>
      <div className="flex h-screen w-full overflow-hidden bg-paper font-sans">
        {!isMobile && (
          <aside className="w-64 notebook-margin bg-white flex flex-col p-6 z-30 shrink-0">
            <NavContent />
          </aside>
        )}
        <div className="flex-1 relative overflow-y-auto flex flex-col">
          {isMobile && (
            <header className="h-20 border-b-2 border-brand-black bg-white flex items-center justify-between px-4 z-40 shrink-0">
              <h1 className="font-display text-xl font-black text-brand-black">
                CURRICULA<span className="text-brand-primary">FLOW</span>
              </h1>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 border-2 border-brand-black shadow-sketch active:shadow-none translate-y-0 active:translate-y-0.5">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-6 bg-white border-r-3 border-brand-black">
                  <TooltipProvider>
                    <NavContent />
                  </TooltipProvider>
                </SheetContent>
              </Sheet>
            </header>
          )}
          <main className={cn("flex-1 relative", isMobile ? "p-4" : "p-10 pb-24")}>
            {children}
            <footer className="mt-20 flex justify-between items-center text-[10px] text-brand-gray font-bold uppercase tracking-widest border-t border-brand-black/5 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Secure Workspace</span>
                </div>
                <div className="px-1.5 py-0.5 border border-brand-black/10 bg-muted/30 text-[8px] font-black">
                  v1.0.4-PRO
                </div>
              </div>
              <Link to="/why-hire" className="hover:text-brand-primary hover:underline transition-all cursor-pointer">
                Stephen Rowe's Job Application Tool
              </Link>
            </footer>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}