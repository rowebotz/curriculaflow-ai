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
  onRestored?: () => void;
  autoAlignTrigger?: number;
  sessionId?: string;
}
const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Instructional Engine initialized. Provide your learning objectives or content snippets to generate a standards-aligned lesson blueprint."
};
export function ChatPanel({ onBlueprintUpdate, onRestored, autoAlignTrigger = 0, sessionId }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);
  const lastProcessedTrigger = useRef(0);
  const lastExtractionRef = useRef<string>('');
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);
  const scrollToBottom = useCallback((instant = false) => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({
        behavior: instant ? 'auto' : 'smooth',
        block: 'end'
      });
    }
  }, []);
  const extractAndUpdateBlueprint = useCallback((content: string) => {
    // Find all JSON blocks and take the LAST one (the most recent revision)
    const matches = Array.from(content.matchAll(/```(?:json)?\s*([\s\S]*?)\s*```/g));
    if (matches.length > 0) {
      const lastMatch = matches[matches.length - 1][1];
      const cleanedJson = lastMatch.trim();
      // Prevent redundant updates if the content hasn't changed
      if (cleanedJson === lastExtractionRef.current) return true;
      try {
        const parsedData = JSON.parse(cleanedJson);
        if (parsedData && typeof parsedData === 'object') {
          lastExtractionRef.current = cleanedJson;
          onBlueprintUpdate(parsedData);
          return true;
        }
      } catch (e) {
        console.warn("Blueprint extraction failed:", e);
      }
    }
    return false;
  }, [onBlueprintUpdate]);
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isTyping || isRestoring) return;
    const userMsg = { role: 'user' as const, content };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    let fullAssistantContent = '';
    try {
      await chatService.sendMessage(content, undefined, (chunk) => {
        if (!isMounted.current) return;
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
      if (isMounted.current) {
        setMessages(prev => [...prev, { role: 'assistant', content: "Connection interrupted. Please resubmit the instructional request." }]);
      }
    } finally {
      if (isMounted.current) setIsTyping(false);
    }
  }, [isTyping, isRestoring, extractAndUpdateBlueprint]);
  const handleUserSend = () => {
    if (!input.trim()) return;
    const currentInput = input;
    setInput('');
    sendMessage(currentInput);
  };
  useEffect(() => {
    if (!sessionId) return;
    setMessages([INITIAL_MESSAGE]);
    lastExtractionRef.current = '';
    chatService.switchSession(sessionId);
    const restoreHistory = async () => {
      setIsRestoring(true);
      try {
        const response = await chatService.getMessages();
        if (!isMounted.current) return;
        if (response.success && response.data?.messages) {
          const history = response.data.messages
            .filter(m => m.role === 'user' || m.role === 'assistant')
            .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
          if (history.length > 0) {
            setMessages(history);
            // Scan backwards for the latest valid blueprint
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
        if (isMounted.current) {
          setIsRestoring(false);
          if (onRestored) onRestored();
        }
      }
    };
    restoreHistory();
  }, [sessionId, extractAndUpdateBlueprint, onRestored]);
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);
  useEffect(() => {
    if (autoAlignTrigger > lastProcessedTrigger.current && !isRestoring && !isTyping) {
      lastProcessedTrigger.current = autoAlignTrigger;
      sendMessage("Please review the current blueprint and ensure it fully aligns with the latest pedagogical standards and rigor levels. Adjust modules if necessary.");
    }
  }, [autoAlignTrigger, sendMessage, isRestoring, isTyping]);
  return (
    <div className="flex flex-col h-full bg-white relative border-r-2 border-brand-black/5 font-sans">
      <div className="bg-brand-black text-white px-4 py-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] z-20">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-brand-primary" />
          <span>CurriculaFlow Engine</span>
        </div>
        {isRestoring ? (
          <div className="flex items-center gap-2 text-brand-primary animate-pulse bg-brand-primary/10 px-2 py-0.5 border border-brand-primary/20">
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
                "max-w-[94%] p-5 md:p-6 border-2 border-brand-black shadow-sketch transition-all",
                m.role === 'user' ? "bg-muted font-medium" : "bg-white"
              )}>
                <div className={cn(
                  "flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest",
                  m.role === 'user' ? "text-brand-gray" : "text-brand-primary"
                )}>
                  {m.role === 'user' ? <User className="w-3 h-3 text-brand-black" /> : <Bot className="w-3 h-3" />}
                  <span>{m.role === 'user' ? 'Educator' : 'Assistant'}</span>
                </div>
                <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap text-brand-black">
                  {m.content.split(/```(?:json)?\s*[\s\S]*?\s*```/g).map((part, idx, arr) => (
                    <React.Fragment key={idx}>
                      {part}
                      {idx < arr.length - 1 && (
                        <span className="block my-4 p-4 bg-brand-primary/5 border-l-4 border-brand-primary text-brand-primary font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                          Blueprint Verified & Updated
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-3 p-5 border-2 border-dashed border-brand-black/20 bg-muted/30 max-w-[94%]">
              <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
              <span className="font-black uppercase tracking-widest text-[10px] text-brand-black/60 italic">Mapping standards & scaffolding...</span>
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
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUserSend())}
            placeholder="Describe lesson objectives or paste content..."
            disabled={isRestoring || isTyping}
            className="w-full input-sketch min-h-[90px] max-h-[220px] resize-none pr-14 text-sm font-sans disabled:opacity-50"
          />
          <button
            onClick={handleUserSend}
            disabled={isTyping || isRestoring || !input.trim()}
            className="absolute bottom-4 right-3 p-3 bg-brand-primary text-white border-2 border-brand-black shadow-sketch hover:shadow-sketch-hover active:translate-y-0.5 disabled:opacity-30 disabled:grayscale transition-all z-10"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}