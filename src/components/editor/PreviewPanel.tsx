import React from 'react';
import { Layers, Target, BookOpen, AlertCircle, HelpCircle, GraduationCap } from 'lucide-react';
import { SketchCard } from '@/components/ui/sketch-card';
import { RigorAdjuster } from './RigorAdjuster';
import { LearningScienceConfig } from './LearningScienceConfig';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
interface PreviewProps {
  data: any;
  onUpdate?: (newData: any) => void;
}
export function PreviewPanel({ data, onUpdate }: PreviewProps) {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-[#f0f0f0]/30">
        <BookOpen className="w-16 h-16 mb-4 text-muted-foreground opacity-20" />
        <h3 className="text-2xl font-display opacity-40">Your Blueprint Awaits</h3>
        <p className="max-w-xs text-muted-foreground italic">Start talking to CurriculaBot on the left to generate your lesson structure.</p>
      </div>
    );
  }
  const handleRigorChange = (level: string) => {
    onUpdate?.({ ...data, rigorLevel: level });
  };
  const handleLayerUpdate = (key: string, val: boolean) => {
    onUpdate?.({
      ...data,
      pedagogicalLayers: {
        ...data.pedagogicalLayers,
        [key]: val
      }
    });
  };
  return (
    <div className="h-full p-8 overflow-y-auto bg-white">
      <div className="mb-10 text-center border-b-4 border-double border-ink pb-6">
        <h3 className="font-display text-5xl mb-2">{data.title || 'Lesson Blueprint'}</h3>
        <p className="uppercase tracking-widest text-sm font-bold text-muted-foreground flex items-center justify-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Pedagogical Framework: {data.rigorLevel || 'Standard'}
        </p>
      </div>
      <div className="grid md:grid-cols-5 gap-6 mb-12">
        <div className="md:col-span-3">
          <RigorAdjuster 
            currentLevel={data.rigorLevel || 'Standard'} 
            onLevelChange={handleRigorChange} 
          />
        </div>
        <div className="md:col-span-2">
          <LearningScienceConfig 
            layers={data.pedagogicalLayers || {}} 
            onUpdate={handleLayerUpdate} 
          />
        </div>
      </div>
      <div className="space-y-12">
        {data.modules?.map((mod: any, idx: number) => (
          <div key={mod.id} className="relative">
            <div className="absolute -left-6 top-0 w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-bold z-10 shadow-sketch">
              {idx + 1}
            </div>
            <SketchCard className="p-6 ml-2">
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-3xl font-bold">{mod.title}</h4>
                <div className="flex flex-wrap gap-2">
                   {mod.standards?.map((s: string) => (
                     <Popover key={s}>
                       <PopoverTrigger asChild>
                         <button className="text-[10px] font-bold border-2 border-ink bg-highlighter px-2 py-0.5 hover:bg-highlighter/80 transition-colors flex items-center gap-1">
                           {s}
                           <HelpCircle className="w-2.5 h-2.5" />
                         </button>
                       </PopoverTrigger>
                       <PopoverContent className="bg-ink text-white border-none shadow-sketch text-xs p-3">
                         <div className="font-bold mb-1 border-b border-white/20 pb-1">Pedagogical Rationale</div>
                         <p className="italic">{mod.rationale?.[s] || "Alignment optimized for Bloom's Taxonomy progression."}</p>
                       </PopoverContent>
                     </Popover>
                   ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <section>
                  <div className="flex items-center gap-2 mb-3 border-b-2 border-ink/10 pb-1">
                    <Target className="w-4 h-4 text-correction" />
                    <h5 className="font-bold uppercase text-xs">Learning Objectives</h5>
                  </div>
                  <ul className="list-disc list-inside space-y-2 italic text-lg">
                    {mod.objectives?.map((obj: string, i: number) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <div className="flex items-center gap-2 mb-3 border-b-2 border-ink/10 pb-1">
                    <Layers className="w-4 h-4 text-ink" />
                    <h5 className="font-bold uppercase text-xs">Instructional Segments</h5>
                  </div>
                  <div className="space-y-3">
                    <div className="p-2 border border-ink/20 bg-muted/30 text-sm">
                      <span className="font-bold">Mode:</span> {mod.mode || 'Inquiry-Based Discovery'}
                    </div>
                    {data.pedagogicalLayers?.retrievalPractice && (
                      <div className="p-2 border-2 border-ink border-dashed bg-highlighter/10 text-xs font-bold animate-pulse">
                        [Retrieval Practice Activity Inserted Here]
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </SketchCard>
            {data.pedagogicalLayers?.formativeCheckpoints && idx < data.modules.length - 1 && (
              <div className="ml-8 my-6 py-3 border-l-4 border-dotted border-ink flex items-center gap-4">
                <div className="w-6 h-6 bg-ink rotate-45 flex items-center justify-center shadow-sketch">
                   <CheckSquare className="w-3 h-3 text-white -rotate-45" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Formative Mastery Checkpoint</span>
              </div>
            )}
          </div>
        ))}
        {(!data.modules || data.modules.length === 0) && (
           <div className="flex items-center gap-3 p-4 bg-highlighter/10 border-2 border-ink border-dashed">
              <AlertCircle className="w-5 h-5 text-correction" />
              <p className="font-bold italic">Bot is still calculating pedagogical alignment. Keep chatting!</p>
           </div>
        )}
      </div>
    </div>
  );
}