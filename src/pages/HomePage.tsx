import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SketchCard } from '@/components/ui/sketch-card';
import { Plus, Clock, Tag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockLessons } from '@/lib/mockData';
export function HomePage() {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-brand-black pb-10">
          <div>
            <div className="inline-block px-2 py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Authorized Teacher Workspace
            </div>
            <h2 className="font-display text-7xl font-black text-brand-black tracking-tighter leading-[0.8] mb-4 uppercase">
              Sketchpad
            </h2>
            <p className="text-xl text-brand-gray font-medium max-w-lg">
              Manage and deploy your AI-augmented lesson blueprints to standard LMS ecosystems.
            </p>
          </div>
          <button
            onClick={() => navigate('/editor')}
            className="btn-sketch text-sm px-10 py-4 h-auto"
          >
            <Plus className="mr-2 h-5 w-5 stroke-[3]" />
            Create New Lesson
          </button>
        </header>
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-brand-primary" />
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-brand-black">Active Drafts</h3>
            </div>
            <div className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">
              Last Updated: Today
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {mockLessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => navigate(`/editor/${lesson.id}`)}
                className="group cursor-pointer"
              >
                <div className="border-2 border-brand-black p-8 bg-white shadow-sketch group-hover:shadow-sketch-lg group-hover:-translate-y-1 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase px-2 py-1 bg-brand-primary text-white">
                      {lesson.subject}
                    </span>
                    <span className="text-[10px] text-brand-gray font-bold uppercase">{lesson.date}</span>
                  </div>
                  <h4 className="text-2xl font-black leading-none mb-3 uppercase tracking-tighter text-brand-black">{lesson.title}</h4>
                  <p className="text-brand-gray text-sm line-clamp-2 mb-6 font-medium leading-relaxed">{lesson.description}</p>
                  <div className="flex items-center justify-between border-t border-brand-black/10 pt-6">
                    <div className="flex gap-1">
                      {lesson.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] font-black uppercase text-brand-black border border-brand-black px-1.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => navigate('/editor')}
              className="border-2 border-dashed border-brand-black/20 flex flex-col items-center justify-center p-12 hover:border-brand-primary hover:bg-brand-primary/5 transition-colors group"
            >
               <Plus className="w-10 h-10 mb-4 text-brand-black/20 group-hover:text-brand-primary transition-colors" />
               <p className="font-black text-[10px] uppercase tracking-widest text-brand-black/40 group-hover:text-brand-primary">Initiate New Blueprint</p>
            </button>
          </div>
        </section>
        <footer className="pt-16 text-center border-t border-brand-black/5">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gray opacity-50">
            Professional Grade Instructional Deployment Engine
          </p>
        </footer>
      </div>
    </AppLayout>
  );
}