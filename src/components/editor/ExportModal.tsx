import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, CheckCircle2, Copy, Download, Share2, ShieldCheck,
  Database, FileText, Layout, ExternalLink, Loader2,
  ChevronRight, GraduationCap, School, Layers, Settings2,
  FileJson, FileType, Presentation, FolderOpen, ArrowLeft,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  fullData?: any;
}
const steps = [
  { id: 1, label: 'Gathering Instructional Assets...', icon: Package },
  { id: 2, label: 'Validating Pedagogical Standards...', icon: ShieldCheck },
  { id: 3, label: 'Sealing Classroom Package...', icon: Package },
];
const platforms = [
  { id: 'google-classroom', name: 'Google Classroom', icon: School, color: 'hover:bg-green-50 hover:text-green-700', url: 'https://classroom.google.com' },
  { id: 'canvas', name: 'Canvas', icon: Layout, color: 'hover:bg-red-50 hover:text-red-700', url: 'https://www.instructure.com/canvas' },
  { id: 'blackboard', name: 'Blackboard', icon: Layers, color: 'hover:bg-blue-50 hover:text-blue-700', url: 'https://www.blackboard.com' },
  { id: 'schoology', name: 'Schoology', icon: GraduationCap, color: 'hover:bg-sky-50 hover:text-sky-700', url: 'https://www.schoology.com' },
  { id: 'drive', name: 'Google Drive', icon: FolderOpen, color: 'hover:bg-amber-50 hover:text-amber-700', url: 'https://drive.google.com' },
];
const driveFormats = [
  { id: 'doc', name: 'Google Docs Lesson Plan', icon: FileText, desc: 'Detailed instructional guide with standards.' },
  { id: 'slides', name: 'Slides Presentation', icon: Presentation, desc: 'Classroom-ready visual deck for each module.' },
  { id: 'assignment', name: 'Doc Assignment', icon: FileType, desc: 'Student-facing worksheet with prompts.' },
  { id: 'folder', name: 'Structured Folder', icon: FolderOpen, desc: 'Complete bundle of materials and assessments.' },
];
export function ExportModal({ isOpen, onClose, lessonTitle, fullData }: ExportModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isPushing, setIsPushing] = useState<string | null>(null);
  const [isConfiguringDrive, setIsConfiguringDrive] = useState(false);
  const [driveFormat, setDriveFormat] = useState('doc');
  const [showDocPreview, setShowDocPreview] = useState(false);
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
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isOpen, isComplete]);
  useEffect(() => {
    if (isComplete && syncProgress < 100) {
      const timer = setTimeout(() => setSyncProgress(prev => Math.min(prev + 10, 100)), 100);
      return () => clearTimeout(timer);
    }
  }, [isComplete, syncProgress]);
  const handlePlatformPush = async (platform: typeof platforms[0]) => {
    if (platform.id === 'drive') {
      setIsConfiguringDrive(true);
      return;
    }
    setIsPushing(platform.id);
    toast.loading(`Redirecting to ${platform.name}...`, { duration: 1500 });
    setTimeout(() => {
      window.open(platform.url, '_blank');
      setIsPushing(null);
      toast.success(`Connected to ${platform.name}`);
    }, 1500);
  };
  const handleConfirmDriveExport = () => {
    setIsPushing('drive');
    const selectedFormat = driveFormats.find(f => f.id === driveFormat)?.name;
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: `Generating ${selectedFormat}...`,
        success: () => {
          window.open('https://drive.google.com', '_blank');
          setIsPushing(null);
          onClose();
          return `Successfully exported to Google Drive.`;
        },
        error: 'Drive sync failed.',
      }
    );
  };
  const MockDocPreview = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => setShowDocPreview(false)}
          className="p-2 border-2 border-brand-black hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h4 className="font-display text-2xl uppercase font-black">Document Preview</h4>
      </div>
      <div className="flex-1 bg-white border-2 border-brand-black shadow-sketch-lg p-10 overflow-y-auto font-sans text-left max-h-[400px]">
        <div className="max-w-[8.5in] mx-auto space-y-8">
          <header className="border-b-4 border-brand-black pb-4">
            <h1 className="text-3xl font-bold text-brand-black mb-1">{fullData?.title || lessonTitle}</h1>
            <p className="text-sm text-brand-gray font-bold uppercase tracking-widest">
              Instructional Blueprint • Tier: {fullData?.rigorLevel || 'Standard'}
            </p>
          </header>
          <section className="space-y-4">
            <h2 className="text-lg font-black uppercase border-b border-brand-black/10 pb-1">Learning Standards</h2>
            <div className="flex flex-wrap gap-2">
              {fullData?.modules?.flatMap((m: any) => m.standards || []).filter((v: any, i: any, a: any) => a.indexOf(v) === i).map((s: string) => (
                <span key={s} className="px-2 py-1 bg-muted border border-brand-black text-[10px] font-bold">{s}</span>
              )) || <span className="italic text-muted-foreground">No standards mapped.</span>}
            </div>
          </section>
          <section className="space-y-6">
            <h2 className="text-lg font-black uppercase border-b border-brand-black/10 pb-1">Instructional Modules</h2>
            {fullData?.modules?.map((mod: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-bold text-md text-brand-primary">{idx + 1}. {mod.title}</h3>
                <div className="pl-4 space-y-1">
                  <p className="text-xs font-bold text-brand-gray uppercase">Objectives:</p>
                  <ul className="list-disc pl-4 text-sm space-y-1">
                    {mod.objectives?.map((obj: string, i: number) => <li key={i}>{obj}</li>)}
                  </ul>
                </div>
              </div>
            )) || <p className="italic text-muted-foreground">Generating content...</p>}
          </section>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={() => setShowDocPreview(false)} className="btn-sketch">Return to Options</Button>
      </div>
    </div>
  );
  const DriveConfigView = () => (
    <div className="w-full space-y-8">
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => setIsConfiguringDrive(false)}
          className="p-2 border-2 border-brand-black hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h4 className="font-display text-2xl uppercase font-black">Drive Configuration</h4>
      </div>
      <div className="space-y-4">
        <Label className="text-[10px] font-black uppercase tracking-widest text-brand-gray">Select Export Format</Label>
        <RadioGroup value={driveFormat} onValueChange={setDriveFormat} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {driveFormats.map((format) => (
            <div key={format.id} className="relative">
              <RadioGroupItem value={format.id} id={format.id} className="peer sr-only" />
              <Label
                htmlFor={format.id}
                className="flex items-start gap-3 p-4 border-2 border-brand-black bg-white shadow-sketch hover:shadow-sketch-hover peer-data-[state=checked]:bg-brand-primary peer-data-[state=checked]:text-white transition-all cursor-pointer h-full"
              >
                <format.icon className="w-5 h-5 shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-black text-xs uppercase">{format.name}</p>
                  <p className="text-[10px] opacity-70 leading-tight">{format.desc}</p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Button 
          variant="outline"
          onClick={() => setShowDocPreview(true)}
          className="flex-1 rounded-none border-2 border-brand-black font-black uppercase text-[10px] h-12 shadow-sketch"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview Document
        </Button>
        <Button 
          onClick={handleConfirmDriveExport}
          disabled={!!isPushing}
          className="flex-1 btn-sketch h-12"
        >
          {isPushing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Export"}
        </Button>
      </div>
    </div>
  );
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] border-3 border-ink shadow-sketch-lg bg-paper max-h-[95vh] overflow-y-auto p-0 overflow-hidden">
        <DialogTitle className="sr-only">Export Configuration</DialogTitle>
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-8">
            <DialogTitle className="font-display text-4xl text-center uppercase tracking-tighter">Deploy Lesson</DialogTitle>
            <DialogDescription className="text-center italic text-lg text-muted-foreground">
              Bridge your instructional blueprint to your preferred classroom ecosystem.
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-[480px] flex flex-col items-center justify-center" aria-live="polite">
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
                        className: "w-10 h-10 text-brand-black animate-pulse"
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
              ) : showDocPreview ? (
                <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                  <MockDocPreview />
                </motion.div>
              ) : isConfiguringDrive ? (
                <motion.div key="drive-config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                  <DriveConfigView />
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full space-y-8"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => handlePlatformPush(platform)}
                        disabled={!!isPushing}
                        className={cn(
                          "flex flex-col items-center justify-center p-6 border-2 border-brand-black bg-white shadow-sketch hover:shadow-sketch-lg transition-all group",
                          platform.color,
                          isPushing === platform.id && "opacity-50"
                        )}
                      >
                        {isPushing === platform.id ? (
                          <Loader2 className="w-8 h-8 animate-spin mb-3" />
                        ) : (
                          <platform.icon className="w-8 h-8 mb-3 transition-transform group-hover:scale-110" />
                        )}
                        <span className="text-[10px] font-black uppercase tracking-widest text-center">{platform.name}</span>
                      </button>
                    ))}
                  </div>
                  <Accordion type="single" collapsible className="w-full border-2 border-brand-black bg-white overflow-hidden">
                    <AccordionItem value="advanced" className="border-none">
                      <AccordionTrigger className="px-4 py-3 hover:bg-muted font-black text-[10px] uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-2">
                          <Settings2 className="w-4 h-4" />
                          LTI 1.3 Advantage & Gradebook Sync
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 space-y-6 pt-2">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                              <span>Asset Packaging Progress</span>
                              <span>{syncProgress}%</span>
                            </div>
                            <Progress value={syncProgress} className="h-3 border-2 border-brand-black rounded-none bg-muted" />
                          </div>
                          <div className="p-3 bg-muted border-2 border-brand-black border-dashed flex items-center justify-between">
                            <code className="text-[10px] font-bold truncate pr-4">LTI_SECURE_LAUNCH_ID: 0x8F22...</code>
                            <button onClick={() => toast.success("ID Copied")} className="p-1 hover:text-brand-primary">
                              <Copy className="w-3 h-3" />
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
            {isComplete ? "Close Engine" : "Cancel Deployment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}