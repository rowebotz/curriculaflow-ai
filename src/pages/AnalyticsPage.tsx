import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SketchCard } from '@/components/ui/sketch-card';
import { MasteryHeatmap } from '@/components/analytics/AnalyticsCharts';
import { TrendingUp, Users, Target, Lightbulb, AlertCircle, Sparkles, Brain } from 'lucide-react';
import { mockAnalyticsData } from '@/lib/mockData';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
export function AnalyticsPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto py-8 md:py-10 lg:py-12 space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="font-display text-6xl mb-2">Insight Lens</h2>
            <p className="text-xl text-muted-foreground italic">Visualizing classroom pulse and standards mastery.</p>
          </div>
          <div className="flex gap-4">
            <div className="p-4 border-2 border-brand-black bg-white shadow-sketch -rotate-1">
              <div className="text-xs font-bold uppercase text-muted-foreground">Predictive Pulse</div>
              <div className="text-4xl font-display text-brand-primary font-black">88%</div>
            </div>
            <div className="p-4 border-2 border-brand-black bg-brand-primary shadow-sketch rotate-1">
              <div className="text-xs font-bold uppercase text-white">Growth Target</div>
              <div className="text-4xl font-display text-white font-black">+12%</div>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SketchCard className="p-6 h-[400px]">
              <div className="flex items-center justify-between mb-6 border-b-2 border-brand-black pb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-black" />
                  <h3 className="font-bold text-xl uppercase tracking-wider">Predictive Outlook</h3>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase">
                  <span className="flex items-center gap-1"><div className="w-3 h-0.5 bg-brand-black" /> Actual</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-0.5 border-t-2 border-dashed border-brand-primary" /> Predicted</span>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockAnalyticsData.engagement}>
                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#00000010" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={{ stroke: '#000000', strokeWidth: 2 }} 
                      tick={{ fill: '#000000', fontWeight: 'bold', fontSize: 10 }} 
                    />
                    <YAxis 
                      axisLine={{ stroke: '#000000', strokeWidth: 2 }} 
                      tick={{ fill: '#000000', fontWeight: 'bold', fontSize: 10 }} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: 'none', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                      itemStyle={{ color: '#E21A23' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#000000" 
                      strokeWidth={3} 
                      dot={{ stroke: '#000000', strokeWidth: 2, r: 4, fill: '#fff' }} 
                      activeDot={{ r: 6, stroke: '#E21A23' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#E21A23" 
                      strokeWidth={3} 
                      strokeDasharray="5 5" 
                      dot={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </SketchCard>
            <SketchCard className="p-6">
              <div className="flex items-center gap-2 mb-6 border-b-2 border-brand-black pb-2">
                <Target className="w-5 h-5 text-brand-primary" />
                <h3 className="font-bold text-xl uppercase tracking-wider">Standards Mastery Heatmap</h3>
              </div>
              <div className="h-[350px] w-full">
                <MasteryHeatmap data={mockAnalyticsData.mastery} />
              </div>
            </SketchCard>
          </div>
          <aside className="space-y-8">
            <div className="bg-white border-3 border-brand-black p-6 shadow-sketch-lg relative">
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-brand-primary border-2 border-brand-black rotate-12 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-3xl mb-4 underline decoration-brand-primary decoration-4">AI Recs</h3>
              <div className="space-y-4">
                {mockAnalyticsData.suggestions.map((s, i) => (
                  <div key={i} className="p-4 bg-muted/30 border-l-4 border-brand-black italic text-lg leading-tight">
                    "{s}"
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border-3 border-brand-black p-6 shadow-sketch rotate-1">
              <div className="flex items-center gap-2 mb-4 font-bold uppercase text-xs border-b border-brand-black/10 pb-2">
                <Users className="w-4 h-4" />
                <span>Student Grouping</span>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase text-brand-gray">Ready for Extension</div>
                  <div className="flex flex-wrap gap-1">
                    {mockAnalyticsData.studentGroups.readyForExtension.map(s => (
                      <span key={s} className="bg-brand-primary/10 border border-brand-primary/20 px-2 py-0.5 text-xs font-bold text-brand-primary">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase text-brand-primary">Intervention Needed</div>
                  <div className="flex flex-wrap gap-1">
                    {mockAnalyticsData.studentGroups.interventionNeeded.map(s => (
                      <span key={s} className="bg-brand-primary text-white px-2 py-0.5 text-xs font-bold uppercase tracking-tighter">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-3 border-brand-black bg-brand-black text-white shadow-sketch relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Brain className="w-32 h-32" />
               </div>
               <div className="flex items-center gap-2 mb-2 font-bold uppercase text-xs">
                  <Sparkles className="w-4 h-4 text-brand-primary" />
                  <span>Coherence Loop</span>
               </div>
               <p className="text-xs leading-relaxed opacity-80 italic">
                 "Historical data from Unit 1 suggests students struggle with 'Nitrogen Fixation'. Scaffolding weights adjusted."
               </p>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}