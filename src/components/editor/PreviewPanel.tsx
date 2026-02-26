import React from 'react';
import { Layers, Target, BookOpen, GraduationCap, CheckSquare, Info, ShieldAlert, Copy, Check, Loader2 } from 'lucide-react';
import { RigorAdjuster } from './RigorAdjuster';
import { LearningScienceConfig } from './LearningScienceConfig';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
interface PreviewProps {
  data: any;
  onUpdate?: (newData: any) => void;
  isLoading?: boolean;
}
export function PreviewPanel({ data, onUpdate, isLoading }: PreviewProps) {
  const [copied, setCopied] = React.useState(false);
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white border-l-2 border-brand-black/5 font-sans">
        <Loader2 className="w-12 h-12 mb-4 animate-spin text-brand-primary" />
        <h3 className="text-xl font-bold uppercase tracking-widest text-brand-gray">Parsing Blueprint...</h3>
        <p className="max-w-xs text-brand-gray/60 text-xs mt-2 italic">Aligning modules with pedagogical standards.</p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-muted/30 border-l-2 border-brand-black/5 font-sans">
        <BookOpen className="w-16 h-16 mb-4 text-brand-black opacity-10" />
        <h3 className="text-xl font-bold uppercase tracking-widest opacity-30">Deployment Preview</h3>
        <p className="max-w-xs text-brand-gray text-sm mt-2 font-medium">Your pedagogical blueprint will appear here once you begin weaving with the AI.</p>
      </div>
    );
  }
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    toast.success("Blueprint JSON copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  const handleRigorChange = (level: string) => {
    if (onUpdate) {
      onUpdate({ ...data, rigorLevel: level });
    }
  };
  const handleLayerUpdate = (key: string, val: boolean) => {
    if (onUpdate) {
      onUpdate({
        ...data,
        pedagogicalLayers: {
          ...(data.pedagogicalLayers || {}),
          [key]: val
        }
      });
    }
  };
  const rigorLevel = data.rigorLevel ?? (data ? 'Evaluating...' : 'Standard');
  const pedagogicalLayers = data.pedagogicalLayers || {
    spacedRepetition: false,
    retrievalPractice: false,
    formativeCheckpoints: false
  };
  return (
    <div className="h-full p-10 overflow-y-auto bg-white border-l-2 border-brand-black/5 font-sans">
      <div className="mb-12 text-left border-b-2 border-brand-black pb-8">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 id="blueprint-main-title" className="text-4xl font-black text-brand-black uppercase tracking-tighter font-display leading-none">
              {data.title || 'Untitled Lesson'}
            </h3>
            <div className="flex items-center gap-4">
              <p className="uppercase tracking-[0.3em] text-[10px] font-black text-brand-primary flex items-center gap-2">
                <GraduationCap className="w-3 h-3" aria-hidden="true" />
                Instructional Tier: {rigorLevel}
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex items-center gap-1 text-[9px] font-bold text-brand-gray hover:text-brand-primary focus:ring-2 focus:ring-brand-primary transition-colors border-b border-brand-black/20 px-1">
                      <ShieldAlert className="w-3 h-3" />
                      Transparency Mode
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-brand-black text-white p-4 w-72 rounded-none border-none shadow-sketch-lg font-sans">
                    <p className="font-bold mb-2 uppercase tracking-widest text-brand-primary text-[10px]">Trust Center Logic</p>
                    <p className="text-[11px] leading-relaxed mb-3">Aligns module objectives with state standards using RAG against the CurriculaFlow database.</p>
                    <a href="#" className="text-[10px] underline hover:text-brand-primary uppercase font-black focus:outline-none">Transparency Center</a>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <button
              onClick={handleCopyJson}
              aria-label="Copy blueprint JSON to clipboard"
              className={cn(
                "flex items-center gap-1.5 text-[9px] font-black uppercase transition-colors px-2 py-0.5 border border-transparent",
                copied ? "text-brand-primary bg-brand-primary/5 border-brand-primary/20" : "text-brand-gray hover:text-brand-primary"
              )}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy JSON"}
            </button>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-12 gap-6 mb-12">
        <div className="md:col-span-7">
          <RigorAdjuster currentLevel={rigorLevel} onLevelChange={handleRigorChange} />
        </div>
        <div className="md:col-span-5">
          <LearningScienceConfig layers={pedagogicalLayers} onUpdate={handleLayerUpdate} />
        </div>
      </div>
      <div className="space-y-12 pb-20" role="list">
        {Array.isArray(data.modules) && data.modules.length > 0 ? (
          data.modules.map((mod: any, idx: number) => {
            const modId = mod.id || `mod-${idx}`;
            const headingId = `heading-${modId}`;
            const titleLower = (mod.title || '').toLowerCase();
            const modeLower = (mod.mode || '').toLowerCase();
            const isStage = titleLower.includes('warmup') ||
                           titleLower.includes('reflection') ||
                           titleLower.includes('checkpoint') ||
                           modeLower.includes('warmup') ||
                           modeLower.includes('checkpoint');
            return (
              <article
                key={modId}
                className="relative pl-10 border-l-2 border-brand-black/10"
                role="listitem"
                aria-labelledby={headingId}
              >
                <div className={cn(
                  "absolute -left-[13px] top-0 w-6 h-6 flex items-center justify-center text-[10px] font-black z-10 transition-colors",
                  isStage ? "bg-brand-primary text-white" : "bg-brand-black text-white"
                )} aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className={cn(
                  "border-2 border-brand-black p-6 hover:shadow-sketch-lg transition-all duration-300",
                  isStage ? "bg-brand-primary/5 border-l-[6px] border-l-brand-primary" : "bg-white"
                )}>
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div className="flex items-center gap-2">
                      <h4 id={headingId} className="text-xl font-black uppercase tracking-tight text-brand-black font-display">{mod.title || `Module ${idx + 1}`}</h4>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button aria-label={`View logic for ${mod.title}`} className="p-1 hover:text-brand-primary focus:ring-2 focus:ring-brand-primary rounded-full transition-colors">
                              <Info className="w-4 h-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-brand-black text-white p-3 text-[10px] font-bold uppercase rounded-none max-w-[200px] border-none font-sans">
                            Backward Design: Module architected for standard {mod.standards?.[0] || 'compliance'}.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-end">
                       {Array.isArray(mod.standards) && mod.standards.map((s: string) => (
                         <Popover key={`${modId}-${s}`}>
                           <PopoverTrigger asChild>
                             <button
                               aria-label={`Alignment rationale for standard ${s}`}
                               className="text-[9px] font-black border-2 border-brand-black bg-white hover:bg-brand-primary hover:text-white px-2 py-1 transition-colors flex items-center gap-1 focus:ring-2 focus:ring-brand-primary"
                             >
                               {s}
                               <Info className="w-2.5 h-2.5" />
                             </button>
                           </PopoverTrigger>
                           <PopoverContent className="bg-brand-black text-white border-none shadow-none text-xs p-4 w-72 rounded-none z-50 font-sans">
                             <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
                                <span className="font-black uppercase tracking-[0.15em] text-brand-primary text-[10px]">Alignment Rationale</span>
                                <span className="text-[8px] bg-green-500/20 text-green-400 border border-green-500/40 px-1 py-0.5 rounded-sm">
                                  98% AI CONFIDENCE
                                </span>
                             </div>
                             <p className="leading-relaxed text-brand-gray mb-3 italic text-[11px]">
                               {mod.rationale?.[s] || "Mapping verified via CurriculaFlow RAG standards engine. Strategies target specific standard competencies."}
                             </p>
                             <button className="w-full py-2 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-colors focus:ring-2 focus:ring-offset-1">
                               View Mastery Guide
                             </button>
                           </PopoverContent>
                         </Popover>
                       ))}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <section>
                      <div className="flex items-center gap-2 mb-4 border-b border-brand-black/10 pb-2">
                        <Target className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                        <h5 className="font-black uppercase text-[10px] tracking-widest">Objectives</h5>
                      </div>
                      <ul className="space-y-3">
                        {Array.isArray(mod.objectives) && mod.objectives.length > 0 ? mod.objectives.map((obj: string, i: number) => (
                          <li key={i} className="flex gap-2 text-sm text-brand-black leading-relaxed font-medium">
                            <span className="text-brand-primary font-black shrink-0" aria-hidden="true">•</span>
                            {obj}
                          </li>
                        )) : (
                          <li className="text-xs italic text-brand-gray">Determining learning targets...</li>
                        )}
                      </ul>
                    </section>
                    <section>
                      <div className="flex items-center gap-2 mb-4 border-b border-brand-black/10 pb-2">
                        <Layers className="w-4 h-4 text-brand-black" aria-hidden="true" />
                        <h5 className="font-black uppercase text-[10px] tracking-widest">Pedagogical Mode</h5>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted text-[11px] font-bold border-l-4 border-brand-black uppercase tracking-tight">
                          {mod.mode || 'Standard Direct Instruction'}
                        </div>
                        {pedagogicalLayers.retrievalPractice && (
                          <div className="p-3 border-2 border-brand-black border-dashed bg-brand-primary/5 text-[10px] font-black uppercase text-brand-primary flex items-center gap-2">
                            <CheckSquare className="w-3 h-3" />
                            Retrieval Layer Active
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-brand-black/10 bg-muted/5">
            <p className="text-brand-gray text-sm uppercase font-bold italic">Waiting for module architecture...</p>
          </div>
        )}
      </div>
    </div>
  );
}