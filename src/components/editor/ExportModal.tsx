import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, CheckCircle2, Copy, Download, Share2, ShieldCheck, Database, FileText, Layout, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
}
const steps = [
  { id: 1, label: 'Gathering Instructional Assets...', icon: Package, aria: 'Initiating LTI asset gathering' },
  { id: 2, label: 'Validating Pedagogical Standards...', icon: ShieldCheck, aria: 'Checking compliance with state standards' },
  { id: 3, label: 'Sealing LTI 1.3 Advantage Cartridge...', icon: Package, aria: 'Finalizing secure Common Cartridge package' },
];
export function ExportModal({ isOpen, onClose, lessonTitle }: ExportModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isPushing, setIsPushing] = useState(false);
  useEffect(() => {
    if (isOpen && !isComplete) {
      let step = 0;
      const interval = setInterval(() => {
        if (step < steps.length) {
          setCurrentStep(step);
          step++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen, isComplete]);
  useEffect(() => {
    if (isComplete && syncProgress < 100) {
      const timer = setTimeout(() => setSyncProgress(prev => Math.min(prev + 10, 100)), 150);
      return () => clearTimeout(timer);
    }
  }, [isComplete, syncProgress]);
  const sanitizedTitle = lessonTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const launchUrl = `https://engine.curricula.flow/lti/v1p3/${sanitizedTitle || 'lesson-draft'}`;
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("LTI 1.3 Launch URL copied to clipboard!");
  };
  const handlePushToLMS = async () => {
    setIsPushing(true);
    const platform = Math.random() > 0.5 ? 'Canvas' : 'Google Classroom';
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: `Initiating direct handshake with ${platform}...`,
        success: () => {
          setIsPushing(false);
          return `Successfully pushed "${lessonTitle}" to ${platform} sandbox.`;
        },
        error: 'LMS Handshake failed. Please check your LTI credentials.',
      }
    );
  };
  const ltiFeatures = [
    { label: 'Gradebook Sync (AGS)', icon: Database },
    { label: 'Rubric Transfer', icon: FileText },
    { label: 'Deep Linking 2.0', icon: Share2 }
  ];
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] border-3 border-ink shadow-sketch-lg bg-paper max-h-[90vh] overflow-y-auto" aria-labelledby="export-dialog-title" aria-describedby="export-description">
        <DialogHeader>
          <DialogTitle id="export-dialog-title" className="font-display text-4xl text-center">LTI 1.3 Advantage Bridge</DialogTitle>
          <DialogDescription id="export-description" className="text-center italic text-lg text-muted-foreground">
            Packaging "{lessonTitle}" for production-grade LMS deployment.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 flex flex-col items-center justify-center min-h-[400px]" aria-live="polite">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center space-y-6"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-4 border-dashed border-ink rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {React.createElement(steps[currentStep].icon, {
                      className: "w-10 h-10 text-ink animate-bounce",
                      "aria-hidden": "true"
                    })}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold font-display" role="status">
                    {steps[currentStep].label}
                  </h4>
                  <p className="sr-only">{steps[currentStep].aria}</p>
                  <div className="flex gap-2 justify-center" aria-hidden="true">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 border-2 border-ink ${i <= currentStep ? 'bg-highlighter shadow-sketch-hover' : 'bg-muted'}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6 w-full"
              >
                <div className="inline-block p-4 bg-highlighter border-3 border-ink shadow-sketch rotate-2">
                  <CheckCircle2 className="w-12 h-12 text-ink mx-auto mb-1" aria-hidden="true" />
                  <span className="font-display text-2xl" role="status">ADVANTAGE SEALED!</span>
                </div>
                <div className="w-full space-y-6">
                  <Tabs defaultValue="canvas" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-muted border-2 border-ink p-1">
                      <TabsTrigger value="canvas" className="font-bold data-[state=active]:bg-brand-primary data-[state=active]:text-white transition-colors focus:ring-2 focus:ring-brand-primary">
                        Canvas View
                      </TabsTrigger>
                      <TabsTrigger value="google" className="font-bold data-[state=active]:bg-brand-primary data-[state=active]:text-white transition-colors focus:ring-2 focus:ring-brand-primary">
                        Google Classroom
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="canvas" className="p-4 bg-white border-x-2 border-b-2 border-ink text-left space-y-4">
                      <div className="flex items-center gap-2 border-b border-ink/10 pb-2">
                        <Layout className="w-4 h-4 text-brand-gray" />
                        <span className="text-[10px] font-black uppercase text-brand-gray tracking-widest">Sandbox Modules</span>
                      </div>
                      <div className="p-3 border-l-4 border-[#F5F5F5] bg-white shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-[#394B58]" />
                          <div>
                            <p className="text-sm font-bold text-[#394B58]">{lessonTitle}</p>
                            <p className="text-[10px] text-muted-foreground">LTI 1.3 External Tool • 100 points</p>
                          </div>
                        </div>
                        <span className="text-[9px] bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 font-bold rounded-full">CERTIFIED</span>
                      </div>
                    </TabsContent>
                    <TabsContent value="google" className="p-4 bg-white border-x-2 border-b-2 border-ink text-left space-y-4">
                      <div className="flex items-center gap-2 border-b border-ink/10 pb-2">
                        <Share2 className="w-4 h-4 text-brand-gray" />
                        <span className="text-[10px] font-black uppercase text-brand-gray tracking-widest">Classwork Feed</span>
                      </div>
                      <div className="p-4 border-2 border-[#E0E0E0] rounded-lg">
                        <p className="text-sm font-medium mb-3">CurriculaFlow shared an assignment: {lessonTitle}</p>
                        <div className="flex items-center gap-3 p-2 bg-[#F8F9FA] border border-[#DADCE0] rounded cursor-pointer hover:bg-muted">
                          <div className="bg-brand-primary/10 p-2 rounded">
                            <ExternalLink className="w-4 h-4 text-brand-primary" />
                          </div>
                          <span className="text-xs font-medium text-brand-primary truncate">{lessonTitle} (LTI Open)</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <div className="p-4 bg-white border-2 border-ink text-left space-y-2">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Advantage Handshake:</span>
                    <div className="grid grid-cols-1 gap-2">
                      {ltiFeatures.map((f, i) => (
                        <div key={i} className="flex items-center justify-between text-xs font-bold border-b border-ink/5 pb-1">
                          <div className="flex items-center gap-2">
                            <f.icon className="w-3.5 h-3.5 text-ink" aria-hidden="true" />
                            {f.label}
                          </div>
                          <span className="text-[8px] bg-green-100 text-green-800 px-1 border border-green-800">ACTIVE</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-[10px] font-bold mb-1 uppercase">
                        <span>Sync Status...</span>
                        <span role="status">{syncProgress}%</span>
                      </div>
                      <Progress value={syncProgress} className="h-2 border border-ink bg-muted rounded-none" />
                    </div>
                  </div>
                  <div className="bg-white border-2 border-ink p-4 text-left shadow-sketch-hover">
                    <label htmlFor="launch-url" className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Secure Launch URL</label>
                    <div className="flex gap-2">
                      <code id="launch-url" className="bg-muted px-2 py-1 text-xs flex-1 truncate select-all">{launchUrl}</code>
                      <button
                        onClick={() => handleCopy(launchUrl)}
                        aria-label="Copy LTI Launch URL"
                        className="p-1 hover:bg-highlighter border border-ink transition-colors focus:ring-2 focus:ring-brand-primary"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button aria-label="Download Common Cartridge File" className="btn-sketch text-xs bg-white hover:bg-muted py-3 focus:ring-2 focus:ring-brand-primary">
                      <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                      CC 1.3 File
                    </button>
                    <button 
                      onClick={handlePushToLMS}
                      disabled={isPushing}
                      aria-label="Direct Push to Learning Management System" 
                      className="btn-sketch text-xs py-3 focus:ring-2 focus:ring-brand-primary disabled:opacity-50"
                    >
                      {isPushing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />}
                      Push to LMS
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <DialogFooter className="sm:justify-center border-t border-ink/5 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-2 border-ink font-bold hover:bg-muted focus:ring-2 focus:ring-brand-primary"
          >
            {isComplete ? "Done" : "Cancel Deployment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}