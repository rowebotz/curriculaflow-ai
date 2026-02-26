import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, User, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { chatService } from '@/lib/chat';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
interface Message {
  role: 'user' | 'assistant';
  content: string;
}
interface ChatPanelProps {
  onBlueprintUpdate: (data: any) => void;
  autoAlignTrigger?: number;
  sessionId?: string;
}
export function ChatPanel({ onBlueprintUpdate, autoAlignTrigger = 0, sessionId }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Instructional Engine initialized. Provide your learning objectives or content snippets to generate a standards-aligned lesson blueprint." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback((instant = false) => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({
        behavior: instant ? 'auto' : 'smooth',
        block: 'end'
      });
    }
  }, []);
  const extractAndUpdateBlueprint = useCallback((content: string) => {
    // Improved regex to handle various markdown styles and whitespace
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        const cleanedJson = jsonMatch[1].trim();
        const parsedData = JSON.parse(cleanedJson);
        if (parsedData && typeof parsedData === 'object') {
          onBlueprintUpdate(parsedData);
          return true;
        }
      } catch (e) {
        console.warn("Blueprint extraction failed:", e);
      }
    }
    return false;
  }, [onBlueprintUpdate]);
  const handleSend = useCallback(async (forcedInput?: string) => {
    const messageContent = (forcedInput || input).trim();
    if (!messageContent || isTyping) return;
    const userMsg = { role: 'user' as const, content: messageContent };
    setMessages(prev => [...prev, userMsg]);
    if (!forcedInput) setInput('');
    setIsTyping(true);
    let fullAssistantContent = '';
    try {
      await chatService.sendMessage(messageContent, undefined, (chunk) => {
        fullAssistantContent += chunk;
        setMessages(prev => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.role === 'assistant') {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = { ...lastMsg, content: fullAssistantContent };
            return newHistory;
          } else {
            return [...prev, { role: 'assistant', content: fullAssistantContent }];
          }
        });
      });
      extractAndUpdateBlueprint(fullAssistantContent);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection interrupted. Please resubmit the instructional request." }]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, extractAndUpdateBlueprint]);
  useEffect(() => {
    if (!sessionId) return;
    chatService.switchSession(sessionId);
    const restoreHistory = async () => {
      setIsRestoring(true);
      try {
        const response = await chatService.getMessages();
        if (response.success && response.data?.messages) {
          const history = response.data.messages
            .filter(m => m.role === 'user' || m.role === 'assistant')
            .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
          if (history.length > 0) {
            setMessages(history);
            // Find the latest valid blueprint in history
            for (let i = history.length - 1; i >= 0; i--) {
              if (extractAndUpdateBlueprint(history[i].content)) {
                break;
              }
            }
          }
        }
      } catch (e) {
        console.error("Failed to restore history", e);
      } finally {
        setIsRestoring(false);
      }
    };
    restoreHistory();
  }, [sessionId, extractAndUpdateBlueprint]);
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);
  useEffect(() => {
    if (autoAlignTrigger > 0) {
      handleSend("Please review the current blueprint and ensure it fully aligns with the latest pedagogical standards and rigor levels. Adjust modules if necessary.");
    }
  }, [autoAlignTrigger, handleSend]);
  return (
    <div className="flex flex-col h-full bg-white relative border-r-2 border-brand-black/5 font-sans">
      <div className="bg-brand-black text-white px-4 py-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-brand-primary" />
          <span>CurriculaFlow Engine</span>
        </div>
        {isRestoring ? (
          <div className="flex items-center gap-2 text-brand-primary animate-pulse">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>Restoring Progress...</span>
          </div>
        ) : (
          <Sparkles className="w-4 h-4 text-brand-primary" />
        )}
      </div>
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-8 pb-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex flex-col", m.role === 'user' ? "items-end" : "items-start")}>
              <div className={cn(
                "max-w-[92%] p-5 border-2 border-brand-black shadow-sketch transition-all",
                m.role === 'user' ? "bg-muted font-medium" : "bg-white"
              )}>
                <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-brand-gray">
                  {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3 text-brand-primary" />}
                  <span>{m.role === 'user' ? 'Educator' : 'Assistant'}</span>
                </div>
                <div className="text-base leading-relaxed whitespace-pre-wrap text-brand-black">
                  {m.content.split(/```(?:json)?\s*[\s\S]*?\s*```/g).map((part, idx, arr) => (
                    <React.Fragment key={idx}>
                      {part}
                      {idx < arr.length - 1 && (
                        <span className="block my-4 p-3 bg-brand-primary/5 border-l-4 border-brand-primary text-brand-primary font-black uppercase text-[10px] tracking-widest">
                          [Blueprint Verified & Updated]
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-3 p-5 border-2 border-dashed border-brand-black/20 bg-muted/30">
              <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
              <span className="font-black uppercase tracking-widest text-[10px] text-brand-black/60 italic font-bold">Mapping standards & scaffolding...</span>
            </div>
          )}
          <div ref={scrollAnchorRef} className="h-4" />
        </div>
      </ScrollArea>
      <div className="p-4 border-t-3 border-brand-black bg-white">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Describe lesson objectives or paste content..."
            className="w-full input-sketch min-h-[90px] max-h-[220px] resize-none pr-14 text-sm font-sans"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            className="absolute bottom-4 right-3 p-3 bg-brand-primary text-white border-2 border-brand-black shadow-sketch hover:shadow-sketch-hover active:translate-y-0.5 disabled:opacity-30 disabled:grayscale transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}