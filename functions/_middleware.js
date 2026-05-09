export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const acceptHeader = (request.headers.get('Accept') || '').toLowerCase();
  
  // RFC 7231 Content Negotiation for Markdown
  const isMarkdownAccept = acceptHeader.includes('text/markdown');
  const isMarkdownExtension = url.pathname.endsWith('.md');
  
  if (isMarkdownAccept || isMarkdownExtension) {
    // Determine the target path (normalize /index.md and / to index.html logic)
    const path = url.pathname === '/' || url.pathname === '/index.md' || url.pathname === '/index.html' 
      ? '/' 
      : url.pathname;

    if (path === '/') {
      const markdown = `# CPT-Dawn

Interactive personal portfolio and digital identity for CPT-Dawn.

## About
A high-fidelity landing page featuring interactive UI elements (aurora effects, floating particles, eye-tracking pupils). Built with vanilla web technologies and hosted on Cloudflare Pages.

## Professional Links
- **GitHub**: [https://github.com/CPT-Dawn](https://github.com/CPT-Dawn)
- **X (Twitter)**: [https://x.com/CPT_Dawn](https://x.com/CPT_Dawn)
- **LinkedIn**: [https://www.linkedin.com/in/cptdawn/](https://www.linkedin.com/in/cptdawn/)
- **Resume**: [https://github.com/CPT-Dawn/Resume](https://github.com/CPT-Dawn/Resume)

## AI Agent Capabilities
- **WebBot Auth**: Discovery at /.well-known/http-message-signatures-directory
- **API Catalog**: Discovery at /.well-known/api-catalog
- **MCP Server**: SEP-1649 metadata at /.well-known/mcp/server-card.json
- **A2A Agent Card**: Discovery at /.well-known/agent-card.json
- **OAuth Discovery**: Protected resource metadata at /.well-known/oauth-protected-resource
- **WebMCP**: Browser tool discovery via navigator.modelContext
- **Sitemap**: Available at /sitemap.xml
- **LLMS.txt**: Agent context at /llms.txt
`;

      return new Response(markdown, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
          'Vary': 'Accept',
          'x-markdown-tokens': '260',
          'Cache-Control': 'public, max-age=3600',
          'Link': '</>; rel="canonical", </index.html>; rel="alternate"; type="text/html"'
        }
      });
    }
  }

  // Handle standard response
  const response = await context.next();
  const contentType = (response.headers.get('Content-Type') || '').toLowerCase();

  // Enhance HTML responses for Agent Discovery
  if (contentType.includes('text/html')) {
    const newHeaders = new Headers(response.headers);
    
    // Crucial for content negotiation caching
    newHeaders.set('Vary', 'Accept');
    
    // Advertise Markdown and Agent Card
    newHeaders.append('Link', '</index.md>; rel="alternate"; type="text/markdown"');
    newHeaders.append('Link', '</.well-known/agent-card.json>; rel="agent-card"; type="application/json"');
    
    // AI Usage Policy
    newHeaders.set('Content-Signal', 'ai-train=no, search=yes, ai-input=yes');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }

  return response;
}
