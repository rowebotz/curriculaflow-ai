import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, CheckCircle2, Copy, Download, Share2, ShieldCheck, Database, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
}
const steps = [
  { id: 1, label: 'Gathering Assets...', icon: Package },
  { id: 2, label: 'Validating Standards...', icon: ShieldCheck },
  { id: 3, label: 'Sealing LTI 1.3 Cartridge...', icon: Package },
];
export function ExportModal({ isOpen, onClose, lessonTitle }: ExportModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
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
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isOpen, isComplete]);
  useEffect(() => {
    if (isComplete && syncProgress < 100) {
      const timer = setTimeout(() => setSyncProgress(prev => Math.min(prev + 10, 100)), 150);
      return () => clearTimeout(timer);
    }
  }, [isComplete, syncProgress]);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("LTI URL copied to clipboard!");
  };
  const ltiFeatures = [
    { label: 'Gradebook Sync (AGS)', icon: Database },
    { label: 'Rubric Transfer', icon: FileText },
    { label: 'Deep Linking 2.0', icon: Share2 }
  ];
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] border-3 border-ink shadow-sketch-lg bg-paper max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-4xl text-center">LTI 1.3 Advantage Bridge</DialogTitle>
          <DialogDescription className="text-center italic text-lg text-muted-foreground">
            Packaging "{lessonTitle}" for secure LMS deployment.
          </DialogDescription>
        </DialogHeader>
        <div className="py-8 flex flex-col items-center justify-center min-h-[350px]">
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
                    {React.createElement(steps[currentStep].icon, { className: "w-10 h-10 text-ink animate-bounce" })}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold font-display">{steps[currentStep].label}</h4>
                  <div className="flex gap-2 justify-center">
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
                  <CheckCircle2 className="w-12 h-12 text-ink mx-auto mb-1" />
                  <span className="font-display text-2xl">ADVANTAGE SEALED!</span>
                </div>
                <div className="w-full space-y-4">
                  <div className="p-4 bg-white border-2 border-ink text-left space-y-2">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">LTI Advantage Features Enabled:</span>
                    <div className="grid grid-cols-1 gap-2">
                      {ltiFeatures.map((f, i) => (
                        <div key={i} className="flex items-center justify-between text-xs font-bold border-b border-ink/5 pb-1">
                          <div className="flex items-center gap-2">
                            <f.icon className="w-3.5 h-3.5 text-ink" />
                            {f.label}
                          </div>
                          <span className="text-[8px] bg-green-100 text-green-800 px-1 border border-green-800">ACTIVE</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-[10px] font-bold mb-1 uppercase">
                        <span>Syncing Rubrics...</span>
                        <span>{syncProgress}%</span>
                      </div>
                      <Progress value={syncProgress} className="h-2 border border-ink bg-muted rounded-none" />
                    </div>
                  </div>
                  <div className="bg-white border-2 border-ink p-4 text-left shadow-sketch-hover">
                    <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Canvas / Moodle Launch URL</label>
                    <div className="flex gap-2">
                      <code className="bg-muted px-2 py-1 text-xs flex-1 truncate">https://engine.curricula.flow/lti/v1p3/{lessonTitle.toLowerCase().replace(/\s+/g, '-')}</code>
                      <button onClick={() => handleCopy('https://engine.curricula.flow/lti/v1p3/sample')} className="p-1 hover:bg-highlighter border border-ink">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="btn-sketch text-xs bg-white hover:bg-muted py-3">
                      <Download className="w-4 h-4 mr-2" />
                      Common Cartridge
                    </button>
                    <button className="btn-sketch text-xs py-3">
                      <Share2 className="w-4 h-4 mr-2" />
                      Schoology Push
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="border-2 border-ink font-bold"
          >
            {isComplete ? "Return to The Weaver" : "Cancel Deployment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}