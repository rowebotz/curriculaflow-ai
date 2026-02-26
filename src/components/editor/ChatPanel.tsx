import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { chatService } from '@/lib/chat';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
interface Message {
  role: 'user' | 'assistant';
  content: string;
}
export function ChatPanel({ onBlueprintUpdate }: { onBlueprintUpdate: (data: any) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Instructional Engine initialized. Provide your learning objectives or content snippets to generate a standards-aligned lesson blueprint." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = (instant = false) => {
    scrollAnchorRef.current?.scrollIntoView({
      behavior: instant ? 'auto' : 'smooth',
      block: 'end'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);
    let fullAssistantContent = '';
    try {
      await chatService.sendMessage(currentInput, undefined, (chunk) => {
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
      const jsonMatch = fullAssistantContent.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          const parsedData = JSON.parse(jsonMatch[1]);
          if (parsedData) onBlueprintUpdate(parsedData);
        } catch (e) {
          console.warn("Blueprint extraction failed:", e);
        }
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection interrupted. Please resubmit the instructional request." }]);
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <div className="flex flex-col h-full bg-white relative border-r-2 border-brand-black/5">
      <div className="bg-brand-black text-white px-4 py-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-brand-primary" />
          <span>CurriculaFlow Engine</span>
        </div>
        <Sparkles className="w-4 h-4 text-brand-primary" />
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
                  {m.content.split(/```json\s*[\s\S]*?\s*```/g).map((part, idx, arr) => (
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
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Describe lesson objectives or paste content..."
            className="w-full input-sketch min-h-[90px] max-h-[220px] resize-none pr-14 text-sm"
          />
          <button
            onClick={handleSend}
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