import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, CheckCircle2, Copy, Download, Share2, ShieldCheck, 
  Database, FileText, Layout, ExternalLink, Loader2, 
  ChevronRight, GraduationCap, School, Layers, Settings2
} from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
}
const steps = [
  { id: 1, label: 'Gathering Instructional Assets...', icon: Package, aria: 'Initiating LTI asset gathering' },
  { id: 2, label: 'Validating Pedagogical Standards...', icon: ShieldCheck, aria: 'Checking compliance with state standards' },
  { id: 3, label: 'Sealing Classroom Package...', icon: Package, aria: 'Finalizing secure export package' },
];
const platforms = [
  { id: 'google', name: 'Google Classroom', icon: School, color: 'hover:bg-green-50 hover:text-green-700' },
  { id: 'canvas', name: 'Canvas', icon: Layout, color: 'hover:bg-red-50 hover:text-red-700' },
  { id: 'blackboard', name: 'Blackboard', icon: Layers, color: 'hover:bg-blue-50 hover:text-blue-700' },
  { id: 'schoology', name: 'Schoology', icon: GraduationCap, color: 'hover:bg-sky-50 hover:text-sky-700' },
];
export function ExportModal({ isOpen, onClose, lessonTitle }: ExportModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isPushing, setIsPushing] = useState<string | null>(null);
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
      }, 800);
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
    toast.success("Launch URL copied to clipboard!");
  };
  const handlePlatformPush = async (platformName: string) => {
    setIsPushing(platformName);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1800)),
      {
        loading: `Connecting to ${platformName}...`,
        success: () => {
          setIsPushing(null);
          return `Successfully pushed "${lessonTitle}" to ${platformName}.`;
        },
        error: 'Connection failed. Please check your district credentials.',
      }
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] border-3 border-ink shadow-sketch-lg bg-paper max-h-[90vh] overflow-y-auto p-0 overflow-hidden" aria-labelledby="export-dialog-title">
        <DialogTitle id="export-dialog-title" className="sr-only">
          Export to Classroom
        </DialogTitle>
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-8">
            <DialogTitle className="font-display text-4xl text-center uppercase tracking-tighter">Export to Classroom</DialogTitle>
            <DialogDescription className="text-center italic text-lg text-muted-foreground">
              Works with Google Classroom, Canvas, Blackboard, Schoology, and more.
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-[420px] flex flex-col items-center justify-center" aria-live="polite">
            <AnimatePresence mode="wait">
              {!isComplete ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center space-y-8"
                >
                  <div className="relative mx-auto w-24 h-24">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-dashed border-brand-primary rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {React.createElement(steps[currentStep].icon, {
                        className: "w-10 h-10 text-brand-black animate-pulse",
                        "aria-hidden": "true"
                      })}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-2xl font-black font-display uppercase tracking-tight">
                      {steps[currentStep].label}
                    </h4>
                    <div className="flex gap-2 justify-center">
                      {steps.map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-8 h-2 border-2 border-brand-black transition-all",
                            i <= currentStep ? "bg-brand-primary" : "bg-muted"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full space-y-8"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => handlePlatformPush(platform.name)}
                        disabled={!!isPushing}
                        className={cn(
                          "flex flex-col items-center justify-center p-6 border-2 border-brand-black bg-white shadow-sketch hover:shadow-sketch-lg transition-all group",
                          platform.color,
                          isPushing === platform.name && "opacity-50"
                        )}
                      >
                        {isPushing === platform.name ? (
                          <Loader2 className="w-8 h-8 animate-spin mb-3" />
                        ) : (
                          <platform.icon className="w-8 h-8 mb-3 transition-transform group-hover:scale-110" />
                        )}
                        <span className="text-xs font-black uppercase tracking-widest">{platform.name}</span>
                      </button>
                    ))}
                  </div>
                  <Accordion type="single" collapsible className="w-full border-2 border-brand-black bg-white overflow-hidden">
                    <AccordionItem value="district" className="border-none">
                      <AccordionTrigger className="px-4 py-3 hover:bg-muted font-black text-[10px] uppercase tracking-[0.2em] border-none">
                        <div className="flex items-center gap-2">
                          <Settings2 className="w-4 h-4" />
                          District Integration & Advanced Settings
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 space-y-6 pt-2">
                        <div className="flex items-center justify-between p-4 bg-muted/50 border-2 border-brand-black border-dashed">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-brand-primary border-2 border-brand-black">
                              <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Status: Active</p>
                              <p className="text-sm font-bold font-display">LTI 1.3 ADVANTAGE SEALED</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[8px] font-bold text-brand-gray uppercase">Handshake ID</div>
                            <code className="text-[10px] font-bold">SHA-256: 489c...</code>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                              <span>Gradebook Sync Progress</span>
                              <span>{syncProgress}%</span>
                            </div>
                            <Progress value={syncProgress} className="h-3 border-2 border-brand-black rounded-none bg-muted" />
                          </div>
                          <div className="p-3 bg-white border-2 border-brand-black">
                            <label htmlFor="launch-url" className="text-[9px] font-black uppercase text-brand-gray block mb-1">Secure Launch URL</label>
                            <div className="flex gap-2">
                              <code id="launch-url" className="bg-muted px-2 py-1 text-[10px] flex-1 truncate select-all font-mono font-bold">{launchUrl}</code>
                              <button
                                onClick={() => handleCopy(launchUrl)}
                                className="p-1.5 hover:bg-brand-primary hover:text-white border-2 border-brand-black transition-colors"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 py-2 border-2 border-brand-black text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all">
                              <Download className="w-3 h-3" />
                              Common Cartridge
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2 border-2 border-brand-black text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all">
                              <ExternalLink className="w-3 h-3" />
                              LTI Metadata
                            </button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <DialogFooter className="bg-muted/50 p-4 border-t-2 border-brand-black sm:justify-center">
          <Button
            variant="ghost"
            onClick={onClose}
            className="font-black text-[10px] uppercase tracking-[0.3em] hover:bg-brand-black hover:text-white rounded-none h-12 px-12 transition-all"
          >
            {isComplete ? "Done" : "Cancel Export"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}