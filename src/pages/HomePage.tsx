import React, { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Plus, Clock, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockLessons } from '@/lib/mockData';
import { chatService } from '@/lib/chat';
import type { SessionInfo } from '../../worker/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function HomePage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await chatService.listSessions();
        if (response.success && response.data) {
          setSessions(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, []);
  const handleCreateNew = async () => {
    if (isCreating) return;
    setIsCreating(true);
    try {
      chatService.newSession();
      const sessionId = chatService.getSessionId();
      const res = await chatService.createSession(`New Lesson Draft`, sessionId);
      if (res.success) {
        navigate(`/editor/${sessionId}`);
      } else {
        toast.error("Failed to initialize session. Please try again.");
      }
    } catch (error) {
      console.error("Session creation error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsCreating(false);
    }
  };
  const mostRecentSessionId = sessions.length > 0 ? sessions[0].id : null;
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-brand-black pb-10">
          <div className="relative">
            <div className="inline-block px-3 py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4 border-2 border-brand-black shadow-sketch-hover">
              Teacher Workspace
            </div>
            <h2 className="font-display text-7xl font-black text-brand-black tracking-tighter leading-[0.8] mb-4 uppercase">
              Sketchpad
            </h2>
            <p className="text-xl text-brand-gray font-medium max-w-lg font-sans">
              Manage and deploy your AI-augmented lesson blueprints to standard LMS ecosystems.
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            disabled={isCreating}
            className="btn-sketch text-sm px-10 py-4 h-auto min-w-[240px]"
          >
            {isCreating ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Plus className="mr-2 h-5 w-5 stroke-[3]" />
            )}
            {isCreating ? 'Initializing...' : 'Create New Lesson'}
          </button>
        </header>
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-brand-primary" />
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-brand-black">Active Workstreams</h3>
            </div>
            {sessions.length > 0 && (
              <div className="text-[10px] font-black uppercase text-brand-gray/40 tracking-[0.2em]">
                {sessions.length} Saved Sessions
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isLoading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-24 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-gray">Retrieving drafts...</span>
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => navigate(`/editor/${session.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="border-2 border-brand-black p-8 bg-white shadow-sketch group-hover:shadow-sketch-lg group-hover:-translate-y-1 transition-all h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-brand-primary/5 -rotate-45 translate-x-6 -translate-y-6" />
                    <div className="flex justify-between items-start mb-6">
                      {session.id === mostRecentSessionId ? (
                        <span className="text-[10px] font-black uppercase px-2 py-1 bg-brand-black text-white flex items-center gap-1 border border-brand-black">
                          <Sparkles className="w-3 h-3 text-brand-primary" />
                          Recently Viewed
                        </span>
                      ) : (
                        <span className="text-[10px] font-black uppercase px-2 py-1 bg-muted text-brand-black border-2 border-brand-black">
                          Draft
                        </span>
                      )}
                      <span className="text-[10px] text-brand-gray font-bold uppercase font-sans">
                        {new Date(session.lastActive).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-2xl font-black leading-none mb-3 uppercase tracking-tighter text-brand-black line-clamp-2 font-display">
                      {session.title}
                    </h4>
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-brand-black/10">
                      <span className="text-[9px] font-black uppercase text-brand-primary tracking-widest">Resume Weaving</span>
                      <ArrowRight className="w-4 h-4 text-brand-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))
            )}
            {mockLessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => navigate(`/editor/${lesson.id}`)}
                className={cn(
                  "group cursor-pointer transition-all duration-300",
                  sessions.length > 0 ? "opacity-60 hover:opacity-100" : "opacity-80 hover:opacity-100"
                )}
              >
                <div className={cn(
                  "border-2 p-8 shadow-none group-hover:shadow-sketch group-hover:border-solid group-hover:border-brand-black group-hover:-translate-y-1 transition-all h-full flex flex-col grayscale hover:grayscale-0",
                  lesson.id.startsWith('stem') || lesson.id.startsWith('math')
                    ? "border-brand-black/40 bg-white"
                    : "border-dashed border-brand-black/30 bg-white/50"
                )}>
                  <div className="flex justify-between items-start mb-6">
                    <span className={cn(
                      "text-[10px] font-black uppercase px-2 py-1 border-2 border-brand-black",
                      lesson.subject === 'STEM' ? "bg-blue-50 text-blue-700" :
                      lesson.subject === 'Math' ? "bg-green-50 text-green-700" :
                      "bg-brand-primary/20 text-brand-primary"
                    )}>
                      {lesson.subject}
                    </span>
                    <span className="text-[10px] text-brand-gray font-bold uppercase font-sans">{lesson.date}</span>
                  </div>
                  <h4 className="text-2xl font-black leading-none mb-3 uppercase tracking-tighter text-brand-black/60 group-hover:text-brand-black font-display">{lesson.title}</h4>
                  <p className="text-brand-gray/60 group-hover:text-brand-gray text-sm line-clamp-2 mb-6 font-medium leading-relaxed font-sans">{lesson.description}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-brand-black/10 pt-6">
                    <div className="flex gap-1">
                      {lesson.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] font-black uppercase text-brand-black/40 group-hover:text-brand-black border-2 border-brand-black/20 group-hover:border-brand-black px-1.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-primary/40 group-hover:text-brand-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
            {!isLoading && (
              <button
                onClick={handleCreateNew}
                disabled={isCreating}
                className="border-2 border-dashed border-brand-black/20 flex flex-col items-center justify-center p-12 hover:border-brand-primary hover:bg-brand-primary/5 transition-colors group min-h-[220px]"
              >
                 <Plus className="w-10 h-10 mb-4 text-brand-black/20 group-hover:text-brand-primary transition-colors" />
                 <p className="font-black text-[10px] uppercase tracking-widest text-brand-black/40 group-hover:text-brand-primary">
                   {isCreating ? 'Processing...' : 'Initiate New Blueprint'}
                 </p>
              </button>
            )}
          </div>
        </section>
        <footer className="pt-16 text-center border-t border-brand-black/5 pb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gray opacity-50 font-sans">
            Professional Grade Instructional Deployment Engine
          </p>
        </footer>
      </div>
    </AppLayout>
  );
}