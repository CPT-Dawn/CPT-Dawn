export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const accept = request.headers.get('Accept') || '';
  
  // Check for Accept: text/markdown OR a .md file extension request
  const isMarkdownRequest = accept.includes('text/markdown') || url.pathname.endsWith('.md');
  
  if (isMarkdownRequest) {
    const targetPath = url.pathname.replace(/\.md$/, '.html');
    const isHome = targetPath === '/' || targetPath === '/index.html' || targetPath === '/index.md';
    
    if (isHome) {
      const markdown = `# CPT-Dawn

**Interactive Personal Portfolio & Landing Page**

CPT-Dawn is a digital identity featuring high-fidelity interactive UI elements, including aurora effects, floating particles, and eye-tracking pupils.

---

## 🚀 Professional Links
- **GitHub**: [github.com/CPT-Dawn](https://github.com/CPT-Dawn)
- **X (Twitter)**: [x.com/CPT_Dawn](https://x.com/CPT_Dawn)
- **LinkedIn**: [linkedin.com/in/cptdawn](https://www.linkedin.com/in/cptdawn/)
- **Resume**: [View Online](https://github.com/CPT-Dawn/Resume)

## 🛠️ Technical Implementation
- **Architecture**: Single-page static application.
- **Styling**: Tailwind CSS (CDN) + Custom CSS Variables.
- **Interactions**: Vanilla JavaScript for particle physics, mouse-tracking eyes, and aurora animations.
- **Deployment**: Hosted on Cloudflare Pages.

## 🤖 AI & Agent Support
This site is fully "Agent Ready" with support for:
- **Markdown for Agents**: Content-negotiated responses for LLMs.
- **WebMCP**: Browser-based tool discovery.
- **API Catalog**: RFC 9727 discovery at \`/.well-known/api-catalog\`.
- **MCP Server Card**: SEP-1649 metadata at \`/.well-known/mcp/server-card.json\`.
- **Web Bot Auth**: Signature directory at \`/.well-known/http-message-signatures-directory\`.
`;
      return new Response(markdown, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'x-markdown-tokens': '250',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
  }
  
  const response = await context.next();
  const contentType = response.headers.get('Content-Type') || '';
  
  // Always include Vary: Accept for HTML to prevent cache collisions
  if (contentType.includes('text/html')) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Vary', 'Accept');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
  
  return response;
}
