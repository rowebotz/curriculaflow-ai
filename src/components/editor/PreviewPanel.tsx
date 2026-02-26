import React from 'react';
import { Layers, Target, BookOpen, AlertCircle } from 'lucide-react';
import { SketchCard } from '@/components/ui/sketch-card';
interface PreviewProps {
  data: any;
}
export function PreviewPanel({ data }: PreviewProps) {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-[#f0f0f0]/30">
        <BookOpen className="w-16 h-16 mb-4 text-muted-foreground opacity-20" />
        <h3 className="text-2xl font-display opacity-40">Your Blueprint Awaits</h3>
        <p className="max-w-xs text-muted-foreground italic">Start talking to CurriculaBot on the left to generate your lesson structure.</p>
      </div>
    );
  }
  return (
    <div className="h-full p-8 overflow-y-auto bg-white">
      <div className="mb-10 text-center border-b-4 border-double border-ink pb-6">
        <h3 className="font-display text-5xl mb-2">{data.title || 'Lesson Blueprint'}</h3>
        <p className="uppercase tracking-widest text-sm font-bold text-muted-foreground">Generated Strategy Document</p>
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
                <div className="flex gap-2">
                   {mod.standards?.map((s: string) => (
                     <span key={s} className="text-[10px] font-bold border-2 border-ink bg-highlighter px-2 py-0.5">
                       {s}
                     </span>
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
                      <span className="font-bold">Direct Instruction:</span> Concept modeling using visual aids.
                    </div>
                    <div className="p-2 border border-ink/20 bg-muted/30 text-sm">
                      <span className="font-bold">Guided Practice:</span> Collaborative peer mapping.
                    </div>
                  </div>
                </section>
              </div>
            </SketchCard>
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