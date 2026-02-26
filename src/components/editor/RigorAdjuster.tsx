import React from 'react';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
interface RigorAdjusterProps {
  currentLevel: string;
  onLevelChange: (level: string) => void;
}
const levels = [
  { id: 'ell', name: 'ELL/Remedial', desc: 'High visual support, simplified lexicon, intensive scaffolding.' },
  { id: 'standard', name: 'Standard', desc: 'Aligned to grade-level standards with moderate scaffolding.' },
  { id: 'advanced', name: 'Advanced', desc: 'Extended inquiry, complex text structures, high DOK depth.' }
];
export function RigorAdjuster({ currentLevel, onLevelChange }: RigorAdjusterProps) {
  const activeLevel = levels.find(l => l.id === currentLevel.toLowerCase()) || levels[1];
  return (
    <div className="p-6 border-2 border-brand-black bg-white shadow-sketch hover:shadow-sketch-lg transition-all">
      <div className="flex items-center justify-between mb-6">
        <h5 className="font-black uppercase text-[10px] tracking-[0.2em] text-brand-black">Differentiation Engine</h5>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-3.5 h-3.5 text-brand-gray hover:text-brand-primary transition-colors" />
            </TooltipTrigger>
            <TooltipContent className="bg-brand-black text-white border-none text-[10px] font-bold p-3 rounded-none">
              <p className="max-w-[150px]">Modifies cognitive load, syntax complexity, and instructional scaffolding.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex bg-muted p-1 border-2 border-brand-black">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onLevelChange(level.id)}
            className={cn(
              "flex-1 py-2 text-[10px] font-black uppercase tracking-wider transition-all",
              currentLevel.toLowerCase() === level.id
                ? "bg-brand-primary text-white shadow-sketch"
                : "text-brand-black hover:bg-brand-black/5"
            )}
          >
            {level.name}
          </button>
        ))}
      </div>
      <div className="mt-6 flex gap-3 p-4 bg-muted/50 border-l-4 border-brand-primary">
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase text-brand-primary mb-1">Pedagogical Intent</p>
          <p className="text-xs text-brand-black font-medium leading-relaxed italic">
            "{activeLevel.desc}"
          </p>
        </div>
      </div>
    </div>
  );
}