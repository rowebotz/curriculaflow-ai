import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { BrainCircuit, Timer, CheckSquare } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
interface ConfigProps {
  layers: {
    spacedRepetition: boolean;
    retrievalPractice: boolean;
    formativeCheckpoints: boolean;
  };
  onUpdate: (key: string, val: boolean) => void;
}
export function LearningScienceConfig({ layers, onUpdate }: ConfigProps) {
  const configs = [
    { id: 'spacedRepetition', label: 'Spaced Reinforcement', icon: Timer, desc: 'Combats Ebbinghaus Forgetting Curve.' },
    { id: 'retrievalPractice', label: 'Retrieval Practice', icon: BrainCircuit, desc: 'Strengthens recall via active questioning.' },
    { id: 'formativeCheckpoints', label: 'Formative Checkpoints', icon: CheckSquare, desc: 'Built-in "Stop & Checks" for mastery pulse.' }
  ];
  return (
    <div className="p-4 border-2 border-ink bg-[#FFF9C4] shadow-sketch rotate-1 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-8 h-8 bg-black/5 -rotate-45 translate-x-4 -translate-y-4" />
      <h5 className="font-display text-xl mb-4 border-b border-ink/20 pb-1">Science Layers</h5>
      <div className="space-y-4">
        {configs.map((cfg) => (
          <div key={cfg.id} className="flex items-center gap-3">
            <Checkbox 
              id={cfg.id} 
              checked={!!layers[cfg.id as keyof typeof layers]} 
              onCheckedChange={(checked) => onUpdate(cfg.id, !!checked)}
              className="border-2 border-ink data-[state=checked]:bg-ink"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor={cfg.id} className="font-bold flex items-center gap-2 cursor-pointer text-sm">
                    <cfg.icon className="w-4 h-4" />
                    {cfg.label}
                  </Label>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-ink text-white p-2 text-xs max-w-[150px]">
                  {cfg.desc}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </div>
  );
}