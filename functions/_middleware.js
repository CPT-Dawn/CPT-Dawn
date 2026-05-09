export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const accept = (request.headers.get('Accept') || '').toLowerCase();
  
  // Task: Markdown Negotiation (RFC 7231)
  // Support both Accept header and .md extension
  const isMarkdownRequest = accept.includes('text/markdown') || url.pathname.endsWith('.md');
  
  if (isMarkdownRequest) {
    // Only handle homepage and direct .md variants
    const isHome = url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '/index.md';
    
    if (isHome) {
      const markdown = `# CPT-Dawn

Interactive personal portfolio and digital identity for CPT-Dawn.

## About
A high-fidelity landing page featuring interactive UI elements like aurora effects, floating particles, and eye-tracking pupils. Built with vanilla web technologies (HTML, CSS, JS) and hosted on Cloudflare Pages.

## Professional Links
- **GitHub**: [https://github.com/CPT-Dawn](https://github.com/CPT-Dawn)
- **X (Twitter)**: [https://x.com/CPT_Dawn](https://x.com/CPT_Dawn)
- **LinkedIn**: [https://www.linkedin.com/in/cptdawn/](https://www.linkedin.com/in/cptdawn/)
- **Resume**: [https://github.com/CPT-Dawn/Resume](https://github.com/CPT-Dawn/Resume)

## AI Agent Capabilities
This site is optimized for AI agents and follows modern discovery protocols:
- **WebBot Auth**: Site identity via /.well-known/http-message-signatures-directory
- **API Catalog**: Discovery at /.well-known/api-catalog
- **MCP Server**: SEP-1649 metadata at /.well-known/mcp/server-card.json
- **A2A Agent Card**: discovery at /.well-known/agent-card.json
- **OAuth Discovery**: Protected resource metadata at /.well-known/oauth-protected-resource
- **WebMCP**: In-browser tool discovery via navigator.modelContext
- **Sitemap**: Available at /sitemap.xml
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
  
  // Fallback to static assets or next middleware
  const response = await context.next();
  const contentType = (response.headers.get('Content-Type') || '').toLowerCase();
  
  // Ensure Vary: Accept is present on HTML to prevent cache collisions
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
