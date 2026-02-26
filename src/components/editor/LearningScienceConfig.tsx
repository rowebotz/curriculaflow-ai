import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { BrainCircuit, Timer, CheckSquare, Search } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
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
    { 
      id: 'spacedRepetition', 
      label: 'Spaced Reinforcement', 
      icon: Timer, 
      desc: 'Combats the Ebbinghaus Forgetting Curve by introducing periodic review of key concepts.' 
    },
    { 
      id: 'retrievalPractice', 
      label: 'Retrieval Practice', 
      icon: BrainCircuit, 
      desc: 'Strengthens neural pathways and long-term recall via active questioning and "brain dumps".' 
    },
    { 
      id: 'formativeCheckpoints', 
      label: 'Formative Checkpoints', 
      icon: CheckSquare, 
      desc: 'Integrated "Stop & Checks" to gauge student mastery pulse and drive adaptive scaffolding.' 
    }
  ];
  const handleMHAssetSearch = () => {
    toast.info("Accessing McGraw Hill Science Assets...", {
      description: "Standard HS-LS2-4 mapped items found in Science Interactive Library."
    });
  };
  return (
    <div className="p-6 border-2 border-brand-black bg-white shadow-sketch hover:shadow-sketch-lg transition-all relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-12 h-12 bg-brand-primary/5 -rotate-45 translate-x-6 -translate-y-6" aria-hidden="true" />
      <h5 className="font-display text-2xl mb-6 border-b-2 border-brand-black/10 pb-2 text-brand-black uppercase tracking-tighter font-black">
        Science <span className="text-brand-primary">Layers</span>
      </h5>
      <div className="space-y-5 mb-8">
        {configs.map((cfg) => (
          <div key={cfg.id} className="flex items-center gap-3 group">
            <Checkbox
              id={cfg.id}
              checked={!!layers[cfg.id as keyof typeof layers]}
              onCheckedChange={(checked) => onUpdate(cfg.id, !!checked)}
              aria-describedby={`${cfg.id}-desc`}
              className="border-2 border-brand-black data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary w-5 h-5 rounded-none focus:ring-2 focus:ring-brand-primary"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label
                    htmlFor={cfg.id}
                    className="font-bold flex items-center gap-2 cursor-pointer text-sm uppercase tracking-tight text-brand-black group-hover:text-brand-primary transition-colors"
                  >
                    <cfg.icon className="w-4 h-4" aria-hidden="true" />
                    {cfg.label}
                  </Label>
                </TooltipTrigger>
                <TooltipContent 
                  id={`${cfg.id}-desc`}
                  side="right" 
                  className="bg-brand-black text-white p-3 text-[10px] font-bold uppercase rounded-none border-none max-w-[180px]"
                >
                  {cfg.desc}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
      <button
        onClick={handleMHAssetSearch}
        aria-label="Search McGraw Hill Science Interactive Library for aligned assets"
        className="w-full py-2 bg-muted border-2 border-brand-black text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-black hover:text-white focus:ring-2 focus:ring-brand-primary transition-colors"
      >
        <Search className="w-3 h-3" aria-hidden="true" />
        Browse McGraw Hill Science Assets
      </button>
    </div>
  );
}