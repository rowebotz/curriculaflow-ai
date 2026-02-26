import React from 'react';
import { Layers, Target, BookOpen, GraduationCap, CheckSquare, Info, ExternalLink, ShieldAlert, Copy, Check } from 'lucide-react';
import { RigorAdjuster } from './RigorAdjuster';
import { LearningScienceConfig } from './LearningScienceConfig';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
interface PreviewProps {
  data: any;
  onUpdate?: (newData: any) => void;
}
export function PreviewPanel({ data, onUpdate }: PreviewProps) {
  const [copied, setCopied] = React.useState(false);
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-muted/30 border-l-2 border-brand-black/5 font-sans">
        <BookOpen className="w-16 h-16 mb-4 text-brand-black opacity-10" />
        <h3 className="text-xl font-bold uppercase tracking-widest opacity-30">Deployment Preview</h3>
        <p className="max-w-xs text-brand-gray text-sm mt-2">Initialize your lesson weaving session to generate the blueprint.</p>
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
  const rigorLevel = data.rigorLevel || 'Standard';
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
            <h3 className="text-4xl font-black text-brand-black uppercase tracking-tighter font-display leading-none">
              {data.title || 'Lesson Blueprint'}
            </h3>
            <div className="flex items-center gap-4">
              <p className="uppercase tracking-[0.3em] text-[10px] font-black text-brand-primary flex items-center gap-2">
                <GraduationCap className="w-3 h-3" />
                Instructional Tier: {rigorLevel}
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex items-center gap-1 text-[9px] font-bold text-brand-gray hover:text-brand-primary transition-colors border border-brand-black/10 px-1.5 bg-muted/50">
                      <ShieldAlert className="w-3 h-3" />
                      Transparency Mode
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-brand-black text-white p-4 w-72 rounded-none border-none shadow-sketch-lg">
                    <p className="font-bold mb-2 uppercase tracking-widest text-brand-primary text-[10px]">Trust Center Logic</p>
                    <p className="text-[11px] leading-relaxed mb-3 font-sans">Aligns module objectives with state standards using RAG (Retrieval-Augmented Generation) against the CurriculaFlow Trust Center database.</p>
                    <a href="#" className="text-[10px] underline hover:text-brand-primary uppercase font-black font-sans">Transparency & Privacy Center</a>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="bg-brand-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
              v2.4 Advantage
            </div>
            <button 
              onClick={handleCopyJson}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase text-brand-gray hover:text-brand-primary transition-colors"
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
      <div className="space-y-8">
        {Array.isArray(data.modules) && data.modules.length > 0 ? (
          data.modules.map((mod: any, idx: number) => {
            const modId = mod.id || `mod-${idx}-${mod.title?.replace(/\s+/g, '-').toLowerCase()}`;
            return (
              <div key={modId} className="relative pl-8 border-l-2 border-brand-black/10">
                <div className="absolute -left-[13px] top-0 w-6 h-6 bg-brand-black text-white flex items-center justify-center text-[10px] font-black z-10">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="bg-white border-2 border-brand-black p-6 hover:shadow-sketch-lg transition-shadow">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-xl font-black uppercase tracking-tight text-brand-black font-display">{mod.title}</h4>
                      <p className="text-[10px] text-brand-gray font-bold uppercase mt-1">{mod.mode || 'Standard Mode'}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                       {Array.isArray(mod.standards) && mod.standards.map((s: string) => (
                         <Popover key={`${modId}-${s}`}>
                           <PopoverTrigger asChild>
                             <button className="text-[9px] font-black border-2 border-brand-black bg-white hover:bg-brand-primary hover:text-white px-2 py-1 transition-colors flex items-center gap-1">
                               {s}
                               <Info className="w-2.5 h-2.5" />
                             </button>
                           </PopoverTrigger>
                           <PopoverContent className="bg-brand-black text-white border-none shadow-none text-xs p-4 w-72 rounded-none z-50 font-sans">
                             <div className="flex items-center justify-between mb-2 border-b border-white/20 pb-2">
                                <span className="font-black uppercase tracking-widest text-brand-primary">Alignment Rationale</span>
                                {mod.rationale?.[s] && (
                                  <span className="text-[8px] bg-green-500/20 text-green-400 border border-green-500/40 px-1 py-0.5 rounded-sm">VERIFIED</span>
                                )}
                             </div>
                             <p className="leading-relaxed text-brand-gray mb-3 italic">{mod.rationale?.[s] || "Mapping verified via CurriculaFlow standards engine."}</p>
                             <button className="w-full py-2 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-colors">
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
                        <Target className="w-4 h-4 text-brand-primary" />
                        <h5 className="font-black uppercase text-[10px] tracking-widest">Learning Objectives</h5>
                      </div>
                      <ul className="space-y-3">
                        {Array.isArray(mod.objectives) && mod.objectives.map((obj: string, i: number) => (
                          <li key={i} className="flex gap-2 text-sm text-brand-black leading-relaxed font-medium">
                            <span className="text-brand-primary font-black">•</span>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <div className="flex items-center gap-2 mb-4 border-b border-brand-black/10 pb-2">
                        <Layers className="w-4 h-4 text-brand-black" />
                        <h5 className="font-black uppercase text-[10px] tracking-widest">Instructional Strategy</h5>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted text-[11px] font-bold border-l-4 border-brand-black uppercase tracking-tight">
                          {rigorLevel === 'ELL' ? 'Simplified syntax and visual modeling enabled.' :
                           rigorLevel === 'Advanced' ? 'Inquiry depth increased with extension prompts.' :
                           'Grade-level appropriate cognitive load.'}
                        </div>
                        {pedagogicalLayers.retrievalPractice && (
                          <div className="p-3 border-2 border-brand-black border-dashed bg-brand-primary/5 text-[10px] font-black uppercase text-brand-primary flex items-center gap-2">
                            <CheckSquare className="w-3 h-3" />
                            Retrieval Practice Integrated
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-brand-black/10">
            <p className="text-brand-gray text-sm uppercase font-bold">Waiting for module architecture...</p>
          </div>
        )}
      </div>
    </div>
  );
}