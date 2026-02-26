import { Agent } from 'agents';
import type { Env } from './core-utils';
import type { ChatState } from './types';
import { ChatHandler } from './chat';
import { API_RESPONSES } from './config';
import { createMessage, createStreamResponse, createEncoder } from './utils';
export class ChatAgent extends Agent<Env, ChatState> {
  private chatHandler?: ChatHandler;
  initialState: ChatState = {
    messages: [],
    sessionId: crypto.randomUUID(),
    isProcessing: false,
    model: 'google-ai-studio/gemini-2.5-flash'
  };
  async onStart(): Promise<void> {
    const SYSTEM_PROMPT = `You are CurriculaBot, a master instructional design engine.
    Your goal is to weave lesson ideas into high-fidelity, LMS-ready modules using evidence-based learning science.
    CRITICAL OUTPUT RULE:
    At the very end of your response, you MUST include a single JSON block wrapped in \`\`\`json tags. 
    Do not use bolding or other markdown formatting inside the JSON keys or values.
    Ensure the JSON is perfectly valid and follows the schema below.
    Schema Requirements:
    {
      "title": "Lesson Name",
      "rigorLevel": "Intervention" | "ELL" | "Standard" | "Advanced",
      "pedagogicalLayers": {
        "spacedRepetition": boolean,
        "retrievalPractice": boolean,
        "formativeCheckpoints": boolean
      },
      "modules": [
        {
          "id": "unique-string",
          "title": "Module Title",
          "objectives": ["Recall...", "Analyze..."],
          "standards": ["CCSS.ELA-LITERACY.RL.11-12.3"],
          "rationale": {
             "CCSS.ELA-LITERACY.RL.11-12.3": "Deep explanation of how this module hits this standard."
          },
          "mode": "Inquiry-based" | "Direct Instruction" | "Collaborative"
        }
      ]
    }
    PEDAGOGICAL GUIDELINES:
    1. Backward Design: Start with the assessment/standard.
    2. Rigor Levels: Adjust DOK (Depth of Knowledge) based on the teacher's selected level.
    3. Learning Science: Embed retrieval practice (quizzes, recall) and spaced reinforcement if requested.
    4. Rationale: For every standard, explain WHY it's mapped to that specific module using a universal pedagogical framework.
    Instruction: Provide your conversational pedagogical advice first, then conclude with the JSON block.`;
    this.chatHandler = new ChatHandler(
      this.env.CF_AI_BASE_URL,
      this.env.CF_AI_API_KEY,
      this.state.model
    );
  }
  async onRequest(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url);
      const method = request.method;
      if (method === 'GET' && url.pathname === '/messages') {
        return Response.json({ success: true, data: this.state });
      }
      if (method === 'POST' && url.pathname === '/chat') {
        return this.handleChatMessage(await request.json());
      }
      if (method === 'DELETE' && url.pathname === '/clear') {
        this.setState({ ...this.state, messages: [] });
        return Response.json({ success: true, data: this.state });
      }
      return Response.json({ success: false, error: API_RESPONSES.NOT_FOUND }, { status: 404 });
    } catch (error) {
      return Response.json({ success: false, error: API_RESPONSES.INTERNAL_ERROR }, { status: 500 });
    }
  }
  private async handleChatMessage(body: { message: string; model?: string; stream?: boolean }): Promise<Response> {
    const { message, model, stream } = body;
    if (model && model !== this.state.model) {
      this.setState({ ...this.state, model });
      this.chatHandler?.updateModel(model);
    }
    const userMessage = createMessage('user', message.trim());
    this.setState({
      ...this.state,
      messages: [...this.state.messages, userMessage],
      isProcessing: true
    });
    try {
      if (stream) {
        const { readable, writable } = new TransformStream();
        const writer = writable.getWriter();
        const encoder = createEncoder();
        (async () => {
          try {
            this.setState({ ...this.state, streamingMessage: '' });
            const response = await this.chatHandler!.processMessage(
              message,
              this.state.messages,
              (chunk) => {
                this.setState({ ...this.state, streamingMessage: (this.state.streamingMessage || '') + chunk });
                writer.write(encoder.encode(chunk));
              }
            );
            const assistantMessage = createMessage('assistant', response.content, response.toolCalls);
            this.setState({
              ...this.state,
              messages: [...this.state.messages, assistantMessage],
              isProcessing: false,
              streamingMessage: ''
            });
          } catch (e) {
            console.error("Streaming error:", e);
          } finally {
            writer.close();
          }
        })();
        return createStreamResponse(readable);
      }
      const response = await this.chatHandler!.processMessage(message, this.state.messages);
      const assistantMessage = createMessage('assistant', response.content, response.toolCalls);
      this.setState({
        ...this.state,
        messages: [...this.state.messages, assistantMessage],
        isProcessing: false
      });
      return Response.json({ success: true, data: this.state });
    } catch (error) {
      this.setState({ ...this.state, isProcessing: false });
      return Response.json({ success: false, error: API_RESPONSES.PROCESSING_ERROR }, { status: 500 });
    }
  }
}