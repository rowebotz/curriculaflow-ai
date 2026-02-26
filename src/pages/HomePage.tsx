import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SketchCard } from '@/components/ui/sketch-card';
import { Button } from '@/components/ui/button';
import { Plus, Clock, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockLessons } from '@/lib/mockData';
export function HomePage() {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex justify-between items-end">
          <div>
            <h2 className="font-display text-6xl mb-2">My Sketchpad</h2>
            <p className="text-xl text-muted-foreground">Ready to weave some knowledge?</p>
          </div>
          <button 
            onClick={() => navigate('/editor')}
            className="btn-sketch text-lg"
          >
            <Plus className="mr-2 h-6 w-6" />
            New Lesson Plan
          </button>
        </header>
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5" />
            <h3 className="font-bold text-xl uppercase tracking-wider">Recent Drafts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockLessons.map((lesson) => (
              <SketchCard 
                key={lesson.id} 
                className="p-6 cursor-pointer"
                onClick={() => navigate(`/editor/${lesson.id}`)}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase px-2 py-1 bg-highlighter border-2 border-ink">
                      {lesson.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">{lesson.date}</span>
                  </div>
                  <h4 className="text-2xl font-bold leading-tight">{lesson.title}</h4>
                  <p className="text-muted-foreground line-clamp-2">{lesson.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {lesson.tags.map(tag => (
                      <span key={tag} className="flex items-center text-xs bg-muted border border-ink/20 px-2 py-1 italic">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SketchCard>
            ))}
            {/* Empty State placeholder card */}
            <div className="border-3 border-dashed border-ink/20 flex flex-col items-center justify-center p-8 opacity-50">
               <Plus className="w-12 h-12 mb-4" />
               <p className="font-bold">Add another idea...</p>
            </div>
          </div>
        </section>
        <footer className="pt-12 text-center text-muted-foreground border-t-2 border-ink/5">
          <p className="italic">"The art of teaching is the art of assisting discovery." — Mark Van Doren</p>
        </footer>
      </div>
    </AppLayout>
  );
}