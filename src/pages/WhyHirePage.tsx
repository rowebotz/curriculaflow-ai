import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SketchCard } from '@/components/ui/sketch-card';
import { Award, Globe, Zap, Cpu, GraduationCap, Target } from 'lucide-react';
export function WhyHirePage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 space-y-16">
          <header className="border-b-4 border-brand-black pb-12">
            <div className="inline-block px-4 py-1 bg-brand-primary text-white text-xs font-black uppercase tracking-[0.4em] mb-6 border-2 border-brand-black shadow-sketch">
              Candidate Profile
            </div>
            <h2 className="font-display text-6xl md:text-8xl font-black text-brand-black tracking-tighter uppercase leading-[0.85] mb-6">
              Why Hire <span className="text-brand-primary">Stephen?</span>
            </h2>
            <p className="text-2xl text-brand-gray font-medium max-w-3xl italic">
              "Building instructional systems that respect educators and scale with institutional needs."
            </p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-12">
              <SketchCard className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-brand-black pb-3">
                  <GraduationCap className="w-6 h-6 text-brand-primary" />
                  <h3 className="font-display text-3xl font-black uppercase tracking-tight">LMS Leadership</h3>
                </div>
                <div className="space-y-6 text-lg leading-relaxed text-brand-black font-medium">
                  <p>
                    Stephen Rowe builds learning systems that actually get used. As Program Director of 
                    <span className="text-brand-primary font-bold"> Cato Courses</span>, he led the creation and launch 
                    of a custom LMS platform in under a year, working alongside scholars, designers, and executives 
                    to bring rigorous academic content into a modern, digital-first experience.
                  </p>
                  <p>
                    He implemented <span className="underline decoration-brand-primary decoration-2 underline-offset-4">AI chatbots modeled on historical thinkers</span>, 
                    interactive learning tools, analytics dashboards, and secure authentication systems, ensuring 
                    the platform was not only innovative but scalable and measurable in its impact.
                  </p>
                </div>
              </SketchCard>
              <SketchCard className="p-8 md:p-10 rotate-1">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-brand-black pb-3">
                  <Globe className="w-6 h-6 text-brand-primary" />
                  <h3 className="font-display text-3xl font-black uppercase tracking-tight">Global Impact</h3>
                </div>
                <div className="space-y-6 text-lg leading-relaxed text-brand-black font-medium">
                  <p>
                    Before that, as Director of Digital Training at the <span className="text-brand-primary font-bold">Leadership Institute</span>, 
                    Stephen helped train more than <span className="bg-brand-primary/10 px-1 font-bold">24,000 students across 20 countries</span> 
                    and built an online training platform that enrolled over 17,000 learners in four years.
                  </p>
                  <p>
                    He delivered hundreds of hours of live instruction and taught practical AI integration long 
                    before it became a trend. Throughout his career, he has focused on reducing friction for 
                    educators, improving learner engagement, and using data to strengthen outcomes.
                  </p>
                </div>
              </SketchCard>
              <SketchCard className="p-8 md:p-10 -rotate-1">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-brand-black pb-3">
                  <Cpu className="w-6 h-6 text-brand-primary" />
                  <h3 className="font-display text-3xl font-black uppercase tracking-tight">Infrastructure Philosophy</h3>
                </div>
                <div className="space-y-6 text-lg leading-relaxed text-brand-black font-medium">
                  <p>
                    <span className="font-black text-brand-primary uppercase tracking-tighter">CurriculaFlow</span> reflects 
                    that same approach. It is not a theoretical concept but a working example of how AI can support 
                    standards alignment, learning science, interoperability, and responsible data governance in a 
                    real classroom environment.
                  </p>
                  <p>
                    Stephen approaches AI as <span className="font-bold underline decoration-brand-black">infrastructure, not novelty</span>. 
                    He builds tools that empower teachers, respect students, and scale with institutional needs. 
                    That is the mindset he brings to every challenge.
                  </p>
                </div>
              </SketchCard>
            </div>
            <aside className="lg:col-span-4 space-y-8">
              <div className="bg-brand-black text-white p-8 shadow-sketch-lg space-y-8">
                <div className="space-y-2">
                  <h4 className="text-brand-primary font-black uppercase text-xs tracking-widest">Core Competencies</h4>
                  <ul className="space-y-3 font-bold text-sm">
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 shrink-0 mt-0.5 text-brand-primary" />
                      <span>AI Product Architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="w-4 h-4 shrink-0 mt-0.5 text-brand-primary" />
                      <span>LTI 1.3 Advantage Integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award className="w-4 h-4 shrink-0 mt-0.5 text-brand-primary" />
                      <span>Global Program Management</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2 pt-6 border-t border-white/10">
                  <h4 className="text-brand-primary font-black uppercase text-xs tracking-widest">Key Metric</h4>
                  <div className="text-5xl font-display font-black">24K+</div>
                  <p className="text-[10px] uppercase font-bold text-brand-gray">Students trained worldwide</p>
                </div>
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <p className="text-xs italic text-brand-gray leading-relaxed">
                    "Stephen doesn't just deploy technology; he integrates pedagogy into the architectural layer of every platform he builds."
                  </p>
                  <button className="w-full btn-sketch bg-white text-brand-black hover:bg-brand-primary hover:text-white transition-colors">
                    Request Portfolio
                  </button>
                </div>
              </div>
              <div className="border-3 border-brand-black p-6 bg-highlighter/10 rotate-1">
                <h4 className="font-black uppercase text-xs mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Ethical AI Stance
                </h4>
                <p className="text-xs font-bold leading-relaxed">
                  Stephen prioritizes FERPA/COPPA compliance and transparent RAG pipelines to ensure AI tools remain safe and verifiable in academic settings.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}