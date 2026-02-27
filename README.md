# CurriculaFlow

**AI-Powered Instructional Deployment Engine**

**Created by [Stephen Rowe](https://www.digitalrowe.com)**

CurriculaFlow is a full-stack AI instructional design and deployment platform built to support standards-aligned lesson creation, learning science integration, and seamless classroom export. It combines artificial intelligence, predictive analytics, and interoperable deployment workflows into a unified system designed for real teacher environments.

This is not a chat demo. It is a production-ready instructional infrastructure platform.

---

## Overview

CurriculaFlow enables educators to:

- Generate structured lesson blueprints aligned to NGSS, Common Core, and other academic frameworks
- Embed retrieval practice, mastery progression, and spaced reinforcement into lesson design
- Create differentiated learning pathways for ELL, intervention, and advanced learners
- Analyze classroom performance through predictive analytics and standards mastery heatmaps
- Export lessons directly to Google Drive or deploy to major LMS platforms
- Maintain explainable AI transparency and responsible data governance

The platform demonstrates how AI can function as instructional infrastructure rather than novelty automation.

---

## Core Capabilities

### Standards Alignment Engine

Automatically maps lesson content to academic standards with transparent rationale and teacher review controls.

### Learning Science Integration

Applies mastery progression, retrieval practice, formative checkpoints, and scaffolded differentiation as configurable instructional layers.

### Differentiation Engine

Supports multiple learner tracks including ELL, intervention, standard, and advanced pathways.

### Insight Lens Analytics

Provides predictive pulse metrics, standards mastery heatmaps, instructional recommendations, and adaptive grouping insights.

### Classroom Deployment

- Export structured lessons to Google Drive as Docs, Slides, or organized lesson folders
- Deploy to major LMS platforms with secure interoperability
- Preserve grading schema and standards metadata during export

### Responsible AI

Includes transparency mode, explainable standards mapping, and compliance-aware data handling.

---

## Architecture

CurriculaFlow is built as a scalable full-stack application with:

- TypeScript-based backend services
- Session persistence architecture
- Streaming AI response support
- Tool calling and modular AI function layers
- RESTful APIs for session management and chat orchestration
- Modern React frontend with component-driven UI architecture

The system is designed for extensibility, allowing new instructional tools, analytics modules, and deployment targets to be added without restructuring core infrastructure.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Backend | TypeScript, Hono, Durable Objects, OpenAI SDK, `@modelcontextprotocol/sdk` |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, React Router, Lucide Icons |
| Package Manager | Bun |
| Search | SerpAPI |

---

## Getting Started

### Prerequisites

- **Bun** or Node.js
- A modern browser
- Environment variables configured for AI provider access

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd curriculaflow
```

2. Install dependencies:
```bash
bun install
```

3. Configure your environment variables:
```json
{
  "vars": {
    "AI_BASE_URL": "{your-ai-gateway-url}",
    "AI_API_KEY": "{your-api-key}",
    "SERPAPI_KEY": "{your-serpapi-key}"
  }
}
```

4. Generate types:
```bash
bun run cf-typegen
```

---

## Local Development

Start the development server:
```bash
bun dev
```

The app will be available at `http://localhost:3000`.

---

## Extending the Platform

- **New instructional tools:** Add to `worker/tools.ts` and they become automatically available to the AI
- **Custom routes:** Add to `worker/userRoutes.ts`
- **UI components:** Extend from `src/components/ui/` (shadcn)
- **MCP tools:** Add servers to `worker/mcp-client.ts`
- **Analytics modules:** New insight layers can be added without restructuring core infrastructure

---

## Project Structure
```
├── src/
│   ├── components/     # Reusable UI components, including shadcn/ui elements
│   ├── lib/            # Utility functions and chat configuration
│   └── hooks/          # Custom React hooks
├── worker/
│   ├── tools.ts        # AI tool and instructional function definitions
│   ├── userRoutes.ts   # Custom API routes
│   └── mcp-client.ts   # MCP server configuration
└── wrangler.jsonc      # Worker and environment configuration
```

---

## Troubleshooting

- **Build errors:** Run `bun install && bun run cf-typegen` to reset dependencies and regenerate types
- **Sessions lost:** Check your session persistence configuration
- **AI gateway issues:** Verify your `AI_BASE_URL` format matches your provider's setup
- **Logs:** Run `wrangler tail` to stream live logs

---

## Contributing

1. Fork the repository and open a pull request
2. Run `bun install && bun dev` to get started locally
3. Follow the existing TypeScript and ESLint conventions

---

## About

Built by [Stephen Rowe](https://www.digitalrowe.com) — instructional systems and AI-powered curriculum engineering.
