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
    { role: 'assistant', content: "Hello! I'm CurriculaBot. Paste your lesson ideas, a syllabus snippet, or just a topic, and I'll help you weave it into a structured module." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      // After streaming finishes, check for JSON blocks
      const jsonMatch = fullAssistantContent.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          const parsedData = JSON.parse(jsonMatch[1]);
          if (parsedData) onBlueprintUpdate(parsedData);
        } catch (e) {
          console.warn("Failed to parse AI JSON block:", e);
        }
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I hit a snag while processing that request. Could you try again?" }]);
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="bg-ink text-white px-4 py-2 flex items-center justify-between text-sm font-bold">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4" />
          <span>CURRICULABOT v1.0</span>
        </div>
        <Sparkles className="w-4 h-4 text-highlighter" />
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 pb-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex flex-col", m.role === 'user' ? "items-end" : "items-start")}>
              <div className={cn(
                "max-w-[90%] p-4 border-2 border-ink shadow-sketch transition-all",
                m.role === 'user' ? "bg-muted rotate-1" : "bg-white -rotate-1"
              )}>
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase text-muted-foreground">
                  {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  <span>{m.role === 'user' ? 'Educator' : 'CurriculaBot'}</span>
                </div>
                <div className="text-lg leading-relaxed whitespace-pre-wrap">
                  {/* Strip out the raw JSON block for display if desired, but here we show full for transparency */}
                  {m.content.replace(/```json\s*[\s\S]*?\s*```/g, ' [Blueprint Updated] ')}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 p-4 border-2 border-dashed border-ink/20 animate-pulse bg-highlighter/5">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-bold italic text-sm">Sketching pedagogical structures...</span>
            </div>
          )}
          <div ref={scrollAnchorRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t-3 border-ink bg-paper/50">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Suggest a module on..."
            className="w-full input-sketch min-h-[80px] max-h-[200px] resize-none pr-12"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="absolute bottom-4 right-2 p-2 bg-highlighter border-2 border-ink shadow-sketch hover:shadow-sketch-hover active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}