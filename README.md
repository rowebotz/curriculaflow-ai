# Cloudflare AI Chat Agent Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rowebotz/curriculaflow-ai)

A production-ready, full-stack AI chat application built on Cloudflare Workers. Features persistent chat sessions powered by Durable Objects, real-time streaming responses, built-in tools (weather, web search), multi-model support (Gemini), and a modern React frontend with shadcn/ui.

## 🚀 Features

- **Persistent Sessions**: Unlimited chat sessions stored in Durable Objects with full CRUD (list, create, delete, rename).
- **Streaming Chat**: Real-time message streaming with tool calling support.
- **AI Tools**: Built-in functions for weather lookup and web search (SerpAPI). Extensible via MCP (Model Context Protocol).
- **Multi-Model Support**: Switch between Gemini models dynamically.
- **Modern UI**: Responsive React app with Tailwind CSS, shadcn/ui components, dark mode, and session sidebar.
- **Session Management**: RESTful APIs for sessions (`/api/sessions`), health checks, and error reporting.
- **Production-Ready**: TypeScript, error boundaries, logging, CORS, and Cloudflare AI Gateway integration.
- **Zero-Cold-Start**: Durable Objects ensure instant responses.

## 🛠️ Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects, `@cloudflare/agents`, OpenAI SDK, `@modelcontextprotocol/sdk`.
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, React Router, Lucide Icons.
- **Tools**: Bun (package manager), Wrangler (CLI), SerpAPI (search), Cloudflare AI Gateway (models).

## ⚙️ Quick Start

### Prerequisites

- [Bun](https://bun.sh) installed (`curl -fsSL https://bun.sh/install | bash`).
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-update/) (`npm i -g wrangler`).
- Cloudflare account and API token.
- Cloudflare AI Gateway setup (for `@cf/meta/llama-3.1-70b-instruct` or Gemini models).

### Installation

1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   cd curriculaflow-engine-6y5duu8nxunfnwg8fyfoc
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure environment (`wrangler.jsonc`):
   ```json
   {
     "vars": {
       "CF_AI_BASE_URL": "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway}/openai",
       "CF_AI_API_KEY": "{your-api-key}",
       "SERPAPI_KEY": "{your-serpapi-key}",
       "OPENROUTER_API_KEY": "{optional}"
     }
   }
   ```

4. Generate types:
   ```bash
   bun run cf-typegen
   ```

### Local Development

1. Start dev server:
   ```bash
   bun dev
   ```

2. Open `http://localhost:3000` (or `${PORT:-3000}`).

3. Test APIs: `curl http://localhost:3000/api/health`.

## 📱 Usage

- **New Chat**: Click "New Chat" or send first message – auto-creates session.
- **Switch Sessions**: Sidebar lists sessions; click to switch.
- **Streaming**: Messages stream in real-time.
- **Tools**: Ask "What's the weather in NYC?" or "Search React hooks".
- **Model Switch**: Select from dropdown (Gemini Flash/Pro).
- **APIs**:
  | Endpoint | Method | Description |
  |----------|--------|-------------|
  | `/api/sessions` | GET | List sessions |
  | `/api/sessions` | POST | Create session `{title, firstMessage}` |
  | `/api/sessions/:id` | DELETE | Delete session |
  | `/api/chat/:sessionId/chat` | POST | Send message `{message, model, stream}` |
  | `/api/chat/:sessionId/messages` | GET | Get chat state |

## ☁️ Deployment

1. Login to Cloudflare:
   ```bash
   wrangler login
   wrangler whoami
   ```

2. Deploy:
   ```bash
   bun run deploy
   ```
   Or bind to custom domain: `wrangler deploy --name my-chatbot`.

3. Set secrets:
   ```bash
   wrangler secret put CF_AI_API_KEY
   wrangler secret put SERPAPI_KEY
   ```

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rowebotz/curriculaflow-ai)

**SPA Routing**: Assets served via Workers; API routes (`/api/*`) handled first.

## 🔧 Extending

- **New Tools**: Add to `worker/tools.ts` → auto-available to AI.
- **Custom Routes**: `worker/userRoutes.ts`.
- **UI Components**: `src/components/ui/` (shadcn).
- **MCP Tools**: Add servers to `worker/mcp-client.ts`.
- **Models**: Update `src/lib/chat.ts` → `@cf/meta/*` or OpenRouter.

## 🐛 Troubleshooting

- **Build Errors**: `bun install && bun run cf-typegen`.
- **Durable Objects**: Check migrations in `wrangler.jsonc`.
- **AI Gateway**: Verify `CF_AI_BASE_URL` format.
- **Sessions Lost**: Durable Objects persist globally.
- Logs: `wrangler tail`.

## 📄 License

MIT. See [LICENSE](LICENSE) for details.

## 🤝 Contributing

1. Fork & PR.
2. `bun install && bun dev`.
3. Follow TypeScript & ESLint rules.

Built with ❤️ by Cloudflare Templates. Questions? [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/).