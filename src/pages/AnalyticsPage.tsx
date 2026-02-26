import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SketchCard } from '@/components/ui/sketch-card';
import { MasteryHeatmap, EngagementTrends } from '@/components/analytics/AnalyticsCharts';
import { TrendingUp, Users, Target, Lightbulb, AlertCircle } from 'lucide-react';
import { mockAnalyticsData } from '@/lib/mockData';
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
            <div className="p-4 border-2 border-ink bg-white shadow-sketch -rotate-1">
              <div className="text-xs font-bold uppercase text-muted-foreground">Class Average</div>
              <div className="text-4xl font-display">84%</div>
            </div>
            <div className="p-4 border-2 border-ink bg-highlighter shadow-sketch rotate-1">
              <div className="text-xs font-bold uppercase text-ink">Engagement</div>
              <div className="text-4xl font-display text-ink">High</div>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SketchCard className="p-6 h-[400px]">
              <div className="flex items-center gap-2 mb-6 border-b-2 border-ink pb-2">
                <TrendingUp className="w-5 h-5 text-ink" />
                <h3 className="font-bold text-xl uppercase tracking-wider">Engagement Over Time</h3>
              </div>
              <div className="h-[300px] w-full">
                <EngagementTrends data={mockAnalyticsData.engagement} />
              </div>
            </SketchCard>
            <SketchCard className="p-6">
              <div className="flex items-center gap-2 mb-6 border-b-2 border-ink pb-2">
                <Target className="w-5 h-5 text-correction" />
                <h3 className="font-bold text-xl uppercase tracking-wider">Standards Mastery Heatmap</h3>
              </div>
              <div className="h-[350px] w-full">
                <MasteryHeatmap data={mockAnalyticsData.mastery} />
              </div>
            </SketchCard>
          </div>
          <aside className="space-y-8">
            <div className="bg-white border-3 border-ink p-6 shadow-sketch-lg relative">
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-highlighter border-2 border-ink rotate-12 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-ink" />
              </div>
              <h3 className="font-display text-3xl mb-4 underline decoration-highlighter decoration-4">AI Suggestions</h3>
              <div className="space-y-4">
                {mockAnalyticsData.suggestions.map((s, i) => (
                  <div key={i} className="p-4 bg-muted/30 border-l-4 border-ink italic text-lg leading-tight">
                    "{s}"
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-correction text-white border-3 border-ink p-6 shadow-sketch rotate-1">
              <div className="flex items-center gap-2 mb-2 font-bold uppercase">
                <AlertCircle className="w-5 h-5" />
                <span>Critical Insight</span>
              </div>
              <p className="text-lg font-body">
                Module 2 (Human Impact) shows a 15% drop in comprehension. Suggesting an additional inquiry-based lab session.
              </p>
            </div>
            <SketchCard className="p-6 bg-ink text-white">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-widest text-xs">Student Grouping</h3>
              </div>
              <p className="mb-4 opacity-80 text-sm">Suggested peer-teaching pairs based on mastery gaps:</p>
              <ul className="space-y-2 font-bold text-highlighter">
                <li>• Group A: 12 students (Advanced)</li>
                <li>• Group B: 8 students (Moderate)</li>
                <li>• Group C: 10 students (Intervention)</li>
              </ul>
            </SketchCard>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}