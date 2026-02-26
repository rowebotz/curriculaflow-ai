import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatPanel } from '@/components/editor/ChatPanel';
import { PreviewPanel } from '@/components/editor/PreviewPanel';
import { ExportModal } from '@/components/editor/ExportModal';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { mockLessons } from '@/lib/mockData';
import { Sparkles } from 'lucide-react';
export function EditorPage() {
  const { sessionId } = useParams();
  const isMobile = useIsMobile();
  const [lessonData, setLessonData] = useState<any>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  useEffect(() => {
    if (sessionId) {
      const found = mockLessons.find(l => l.id === sessionId);
      if (found) setLessonData(found.blueprint);
    }
  }, [sessionId]);
  const handleDataUpdate = (newData: any) => {
    setLessonData(newData);
  };
  const handleRefine = () => {
    // This would typically interface with the ChatPanel's inner state
    // For simplicity, we just trigger a toast or a placeholder logic
    console.log("Triggering AI refinement...");
  };
  const WorkspaceContent = () => (
    <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-160px)] border-3 border-ink shadow-sketch-lg">
      <ResizablePanel defaultSize={40} minSize={30}>
        <ChatPanel onBlueprintUpdate={handleDataUpdate} />
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-ink w-1" />
      <ResizablePanel defaultSize={60}>
        <PreviewPanel data={lessonData} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
  const MobileContent = () => (
    <Tabs defaultValue="chat" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-muted border-3 border-ink mb-4 p-1">
        <TabsTrigger value="chat" className="font-bold data-[state=active]:bg-highlighter">Conversation</TabsTrigger>
        <TabsTrigger value="preview" className="font-bold data-[state=active]:bg-highlighter">Blueprint</TabsTrigger>
      </TabsList>
      <TabsContent value="chat" className="h-[calc(100vh-280px)]">
        <ChatPanel onBlueprintUpdate={handleDataUpdate} />
      </TabsContent>
      <TabsContent value="preview" className="h-[calc(100vh-280px)] overflow-y-auto">
        <PreviewPanel data={lessonData} />
      </TabsContent>
    </Tabs>
  );
  return (
    <AppLayout>
      <div className="flex flex-col h-full max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="font-display text-5xl">The Weaver</h2>
            <p className="italic text-muted-foreground">Drafting: {lessonData?.title || 'New Exploration'}</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleRefine}
              className="px-4 py-2 border-2 border-ink font-bold hover:bg-highlighter/20 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Auto-Align
            </button>
            <button 
              onClick={() => setIsExportOpen(true)}
              className="btn-sketch"
            >
              Deploy Module
            </button>
          </div>
        </header>
        {isMobile ? <MobileContent /> : <WorkspaceContent />}
        <ExportModal 
          isOpen={isExportOpen} 
          onClose={() => setIsExportOpen(false)} 
          lessonTitle={lessonData?.title || 'Untitled Lesson'}
        />
      </div>
    </AppLayout>
  );
}