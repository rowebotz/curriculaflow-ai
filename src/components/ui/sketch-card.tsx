import React from 'react';
import { cn } from '@/lib/utils';
interface SketchCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export function SketchCard({ children, className, ...props }: SketchCardProps) {
  return (
    <div 
      className={cn(
        "card-sketch p-4 relative group overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Decorative 'tape' element */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-highlighter/40 border border-ink/10 -rotate-2 group-hover:rotate-1 transition-transform" />
      {children}
    </div>
  );
}