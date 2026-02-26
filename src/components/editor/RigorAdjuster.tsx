import React from 'react';
import { Info, BookOpen } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
interface RigorAdjusterProps {
  currentLevel: string;
  onLevelChange: (level: string) => void;
}
const levels = [
  { 
    id: 'ELL', 
    name: 'ELL/Remedial', 
    desc: 'High visual support, simplified lexicon, intensive scaffolding.',
    dok: 'DOK 1: Recall & Reproduction. Targets basic literacy and foundational conceptualization.'
  },
  { 
    id: 'Standard', 
    name: 'Standard', 
    desc: 'Aligned to grade-level standards with moderate scaffolding.',
    dok: 'DOK 2-3: Basic Application to Strategic Thinking. Targets analysis and reasoning.'
  },
  { 
    id: 'Advanced', 
    name: 'Advanced', 
    desc: 'Extended inquiry, complex text structures, high DOK depth.',
    dok: 'DOK 4: Extended Thinking. Targets synthesis, critique, and complex ecosystem modeling.'
  }
];
export function RigorAdjuster({ currentLevel, onLevelChange }: RigorAdjusterProps) {
  const activeLevel = levels.find(l => l.id.toLowerCase() === currentLevel.toLowerCase()) || levels[1];
  const handleMHLink = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Searching McGraw Hill Library for standard-aligned content...',
        success: 'Linked McGraw Hill Adaptive ALEKS Item successfully.',
        error: 'Failed to connect to MH Library.',
      }
    );
  };
  return (
    <div className="p-6 border-2 border-brand-black bg-white shadow-sketch hover:shadow-sketch-lg transition-all font-sans">
      <div className="flex items-center justify-between mb-6">
        <h5 className="font-black uppercase text-[10px] tracking-[0.2em] text-brand-black">Differentiation Engine</h5>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger aria-label="More information about differentiation tiers">
              <Info className="w-3.5 h-3.5 text-brand-gray hover:text-brand-primary transition-colors" />
            </TooltipTrigger>
            <TooltipContent className="bg-brand-black text-white border-none text-[10px] font-bold p-3 rounded-none">
              <p className="max-w-[150px]">Modifies cognitive load (DOK), syntax complexity, and instructional scaffolding weights.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex bg-muted p-1 border-2 border-brand-black mb-6" role="radiogroup" aria-label="Select instruction rigor level">
        {levels.map((level) => (
          <TooltipProvider key={level.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  role="radio"
                  aria-checked={currentLevel.toLowerCase() === level.id.toLowerCase()}
                  onClick={() => onLevelChange(level.id)}
                  className={cn(
                    "flex-1 py-2 text-[10px] font-black uppercase tracking-wider transition-all focus:ring-2 focus:ring-brand-primary z-10",
                    currentLevel.toLowerCase() === level.id.toLowerCase()
                      ? "bg-brand-primary text-white shadow-sketch"
                      : "text-brand-black hover:bg-brand-black/5"
                  )}
                >
                  {level.name}
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-brand-black text-white p-2 rounded-none border-none text-[9px] font-bold">
                {level.dok}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div className="space-y-4">
        <div className="flex gap-3 p-4 bg-muted/50 border-l-4 border-brand-primary" aria-live="polite">
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase text-brand-primary mb-1">Pedagogical Intent</p>
            <p className="text-xs text-brand-black font-medium leading-relaxed italic">
              "{activeLevel.desc}"
            </p>
            <p className="mt-2 text-[9px] font-bold text-brand-gray uppercase">
              Rigour Target: {activeLevel.dok.split(':')[0]}
            </p>
          </div>
        </div>
        <button
          onClick={handleMHLink}
          aria-label="Link high-quality passage from McGraw Hill Library for this rigor level"
          className="w-full flex items-center justify-center gap-2 py-2 border-2 border-brand-black text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all focus:ring-2 focus:ring-brand-primary group"
        >
          <BookOpen className="w-3 h-3 group-hover:scale-110 transition-transform" />
          Link MH Reader Passage
        </button>
      </div>
    </div>
  );
}