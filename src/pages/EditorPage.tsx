import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatPanel } from '@/components/editor/ChatPanel';
import { PreviewPanel } from '@/components/editor/PreviewPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { mockLessons } from '@/lib/mockData';
export function EditorPage() {
  const { sessionId } = useParams();
  const isMobile = useIsMobile();
  const [lessonData, setLessonData] = useState<any>(null);
  useEffect(() => {
    if (sessionId) {
      const found = mockLessons.find(l => l.id === sessionId);
      if (found) setLessonData(found.blueprint);
    }
  }, [sessionId]);
  const handleDataUpdate = (newData: any) => {
    setLessonData(newData);
  };
  const WorkspaceContent = () => (
    <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-80px)] border-3 border-ink">
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
        <TabsTrigger value="chat" className="font-bold data-[state=active]:bg-highlighter data-[state=active]:border-2 data-[state=active]:border-ink">Conversation</TabsTrigger>
        <TabsTrigger value="preview" className="font-bold data-[state=active]:bg-highlighter data-[state=active]:border-2 data-[state=active]:border-ink">Blueprint</TabsTrigger>
      </TabsList>
      <TabsContent value="chat" className="h-[calc(100vh-180px)]">
        <ChatPanel onBlueprintUpdate={handleDataUpdate} />
      </TabsContent>
      <TabsContent value="preview" className="h-[calc(100vh-180px)]">
        <PreviewPanel data={lessonData} />
      </TabsContent>
    </Tabs>
  );
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-display text-4xl">The Weaver</h2>
            <p className="italic">Drafting: {lessonData?.title || 'Untitled Lesson'}</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 border-2 border-ink font-bold hover:bg-muted">Save Draft</button>
            <button className="btn-sketch">Deploy Module</button>
          </div>
        </header>
        {isMobile ? <MobileContent /> : <WorkspaceContent />}
      </div>
    </AppLayout>
  );
}