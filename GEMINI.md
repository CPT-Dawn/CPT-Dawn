# CPT-Dawn Project Context

## Project Overview
CPT-Dawn is a high-fidelity personal portfolio and digital identity landing page. It combines an interactive, visually rich frontend with a comprehensive suite of AI agent readiness features, making it both human-accessible and agent-optimized.

**Key Technologies:**
- **Frontend:** Vanilla HTML5, CSS3 (with custom animations), JavaScript (ES6+), and Tailwind CSS (via CDN).
- **Backend/Edge:** Cloudflare Pages with Cloudflare Workers (via `functions/` directory) for middleware and dynamic responses.
- **AI Protocols:** RFC-compliant implementations for Markdown negotiation, A2A discovery, WebMCP, and more.

## Architecture & Features
- **Interactive UI:** Features advanced CSS/JS animations including an aurora background, floating particles, and interactive eye-tracking pupils.
- **AI Agent Readiness:**
    - **Markdown Negotiation (RFC 7231):** Served via `src/index.js` (Worker) to provide LLM-friendly content when requested via `Accept: text/markdown`.
    - **Discovery Protocols:** Implements `.well-known` endpoints for:
        - **API Catalog (RFC 9727):** `/.well-known/api-catalog`
        - **A2A Agent Card:** `/.well-known/agent-card.json`
        - **MCP Server Card (SEP-1649):** `/.well-known/mcp/server-card.json`
        - **Web Bot Auth:** `/.well-known/http-message-signatures-directory`
        - **OAuth Discovery:** `/.well-known/openid-configuration` & `/.well-known/oauth-protected-resource`
    - **WebMCP:** Integration in `index.html` via `navigator.modelContext.provideContext()` to expose site tools to browser-based agents.
    - **Agent Discovery:** Uses `src/index.js` and the `_headers` file to broadcast discovery metadata via HTTP `Link` headers and `Vary: Accept`.

## Building and Running
The project uses the "Workers with Static Assets" feature.

**Local Development:**
```bash
npx wrangler dev
```

**Deployment:**
```bash
npx wrangler deploy
```

## Development Conventions
- **Worker-First:** The site uses `run_worker_first: true` to ensure all requests (including the root) are processed by `src/index.js` for content negotiation.
- **Asset Binding:** Static assets are served via the `env.ASSETS` binding in the worker.
- **Header Strictness:** Any new `.well-known` endpoint must be explicitly mapped in the `_headers` file with the correct `Content-Type` and `charset`.

## Key Files
- `index.html`: Main UI, interactive scripts, and WebMCP integration.
- `src/index.js`: Main Worker script handling content negotiation and asset serving.
- `_headers`: Custom HTTP response headers for Cloudflare.
- `wrangler.jsonc`: Cloudflare configuration for Workers with Static Assets.
- `sitemap.xml` & `robots.txt`: Standard SEO and crawler discovery.
- `llms.txt`: Structured context for Large Language Models.
