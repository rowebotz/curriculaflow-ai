import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, CheckCircle2, Loader2, Copy, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';
interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
}
const steps = [
  { id: 1, label: 'Gathering Assets...', icon: Package },
  { id: 2, label: 'Validating Standards...', icon: CheckCircle2 },
  { id: 3, label: 'Sealing Cartridge...', icon: Package },
];
export function ExportModal({ isOpen, onClose, lessonTitle }: ExportModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
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
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isOpen]);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("LTI URL copied to clipboard!");
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] border-3 border-ink shadow-sketch-lg bg-paper">
        <DialogHeader>
          <DialogTitle className="font-display text-4xl text-center">LTI Bridge</DialogTitle>
          <DialogDescription className="text-center italic text-lg">
            Packaging "{lessonTitle}" for deployment.
          </DialogDescription>
        </DialogHeader>
        <div className="py-12 flex flex-col items-center justify-center min-h-[300px]">
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
                className="text-center space-y-8 w-full"
              >
                <div className="inline-block p-6 bg-highlighter border-3 border-ink shadow-sketch rotate-3">
                  <CheckCircle2 className="w-16 h-16 text-ink mx-auto mb-2" />
                  <span className="font-display text-3xl">DEPLOYED!</span>
                </div>
                <div className="space-y-4 w-full">
                  <div className="bg-white border-2 border-ink p-4 text-left shadow-sketch-hover">
                    <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">LTI 1.3 Launch URL</label>
                    <div className="flex gap-2">
                      <code className="bg-muted px-2 py-1 text-xs flex-1 truncate">https://flow.moodle.com/lti/1.3/launch/{lessonTitle.toLowerCase().replace(/\s+/g, '-')}</code>
                      <button onClick={() => handleCopy('https://flow.moodle.com/lti/1.3/launch/sample')} className="p-1 hover:bg-highlighter border border-ink">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="btn-sketch text-xs bg-white hover:bg-muted py-3">
                      <Download className="w-4 h-4 mr-2" />
                      Download IMSCC
                    </button>
                    <button className="btn-sketch text-xs py-3">
                      <Share2 className="w-4 h-4 mr-2" />
                      Google Classroom
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
            {isComplete ? "Back to Weaver" : "Cancel Packaging"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}