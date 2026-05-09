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
    - **Markdown Negotiation (RFC 7231):** Served via `functions/_middleware.js` to provide LLM-friendly content when requested via `Accept: text/markdown`.
    - **Discovery Protocols:** Implements `.well-known` endpoints for:
        - **API Catalog (RFC 9727):** `/.well-known/api-catalog`
        - **A2A Agent Card:** `/.well-known/agent-card.json`
        - **MCP Server Card (SEP-1649):** `/.well-known/mcp/server-card.json`
        - **Web Bot Auth:** `/.well-known/http-message-signatures-directory`
        - **OAuth Discovery:** `/.well-known/openid-configuration` & `/.well-known/oauth-protected-resource`
    - **WebMCP:** Integration in `index.html` via `navigator.modelContext.provideContext()` to expose site tools to browser-based agents.
    - **Agent Discovery:** Uses the `_headers` file to broadcast discovery metadata via HTTP `Link` headers and `Vary: Accept`.

## Building and Running
The project is a static site hosted on Cloudflare Pages.

**Local Development:**
```bash
npx wrangler dev
```

**Deployment:**
```bash
# Deploys the current directory to Cloudflare Pages
npx wrangler pages deploy .
```

## Development Conventions
- **Zero Build Step:** Prefers vanilla technologies and CDN imports to maintain a lightweight, immediately deployable structure without a complex node/npm build pipeline.
- **Agent First:** All new content or features should consider their representation in the Markdown version (`functions/_middleware.js`) and ensure corresponding discovery metadata is updated.
- **Header Strictness:** Any new `.well-known` endpoint must be explicitly mapped in the `_headers` file with the correct `Content-Type` and `charset` to ensure compatibility with automated audit tools like `isitagentready.com`.

## Key Files
- `index.html`: Main UI, interactive scripts, and WebMCP integration.
- `functions/_middleware.js`: Edge logic for content negotiation and header management.
- `_headers`: Custom HTTP response headers for Cloudflare Pages.
- `wrangler.jsonc`: Cloudflare configuration.
- `sitemap.xml` & `robots.txt`: Standard SEO and crawler discovery.
- `llms.txt`: Structured context for Large Language Models.
