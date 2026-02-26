import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    try {
      // Simulate/Trigger AI response via chatService
      const response = await chatService.sendMessage(input);
      // In a real scenario, the agent returns structured blocks
      // For Phase 1, we simulate parsing a response that might contain lesson updates
      const assistantMsg = { 
        role: 'assistant' as const, 
        content: "I've analyzed your input. I suggest structuring this into 3 modules with focus on inquiry-based learning. I've updated the blueprint with some initial objectives." 
      };
      setMessages(prev => [...prev, assistantMsg]);
      // Dummy update to preview
      onBlueprintUpdate({
        title: input.slice(0, 30),
        modules: [
          { id: '1', title: 'Introduction to ' + input, objectives: ['Identify core concepts'], standards: ['CCSS.ELA-LITERACY.RI.9-10.1'] },
          { id: '2', title: 'Active Exploration', objectives: ['Perform guided experiment'], standards: ['HS-LS1-5'] }
        ]
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="bg-ink text-white px-4 py-2 flex items-center justify-between text-sm font-bold">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4" />
          <span>CURRICULABOT v1.0</span>
        </div>
        <Sparkles className="w-4 h-4 text-highlighter" />
      </div>
      <ScrollArea className="flex-1 p-4" viewportRef={scrollRef}>
        <div className="space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex flex-col", m.role === 'user' ? "items-end" : "items-start")}>
              <div className={cn(
                "max-w-[85%] p-4 border-2 border-ink shadow-sketch transition-all",
                m.role === 'user' ? "bg-muted rotate-1" : "bg-white -rotate-1"
              )}>
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase text-muted-foreground">
                  {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  <span>{m.role === 'user' ? 'Educator' : 'Bot'}</span>
                </div>
                <p className="text-lg leading-relaxed">{m.content}</p>
              </div>
            </div>
          ))}
          {isTyping && <div className="italic text-muted-foreground text-sm p-2">Bot is sketching ideas...</div>}
        </div>
      </ScrollArea>
      <div className="p-4 border-t-3 border-ink">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Type your lesson notes..."
            className="w-full input-sketch min-h-[100px] resize-none pr-12"
          />
          <button 
            onClick={handleSend}
            className="absolute bottom-4 right-2 p-2 bg-highlighter border-2 border-ink shadow-sketch hover:shadow-sketch-hover active:translate-y-0.5"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}