import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
interface RigorAdjusterProps {
  currentLevel: string;
  onLevelChange: (level: string) => void;
}
const levels = [
  { id: 'intervention', name: 'Intervention', desc: 'High scaffolding, reduced vocabulary complexity.' },
  { id: 'ell', name: 'ELL', desc: 'Visual heavy, dual-language supports, clear syntax.' },
  { id: 'standard', name: 'Standard', desc: 'Grade-appropriate complexity and rigor.' },
  { id: 'advanced', name: 'Advanced', desc: 'Extension tasks, higher DOK level questioning.' }
];
export function RigorAdjuster({ currentLevel, onLevelChange }: RigorAdjusterProps) {
  const activeLevel = levels.find(l => l.id === currentLevel.toLowerCase()) || levels[2];
  return (
    <div className="p-4 border-2 border-ink bg-white shadow-sketch-hover">
      <div className="flex items-center justify-between mb-4">
        <h5 className="font-bold uppercase text-xs tracking-widest">Rigor Control</h5>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="bg-ink text-white border-none shadow-sketch p-2">
              <p className="max-w-xs text-xs">Adjusts readability, DOK depth, and scaffolding layers automatically.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <RadioGroup 
        defaultValue={currentLevel.toLowerCase()} 
        onValueChange={onLevelChange}
        className="flex flex-wrap gap-4"
      >
        {levels.map((level) => (
          <div key={level.id} className="flex items-center space-x-2">
            <RadioGroupItem value={level.id} id={level.id} className="border-2 border-ink text-ink fill-ink" />
            <Label htmlFor={level.id} className="font-bold text-sm cursor-pointer">{level.name}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="mt-4 p-3 bg-muted/30 border-l-4 border-highlighter italic text-sm">
        <strong>AI Rationale:</strong> {activeLevel.desc}
      </div>
    </div>
  );
}