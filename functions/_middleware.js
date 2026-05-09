export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const acceptHeader = (request.headers.get('Accept') || '').toLowerCase();
  
  // RFC 7231 Content Negotiation for Markdown
  // Check for text/markdown in the Accept header
  const isMarkdownAccept = acceptHeader.split(',').some(part => part.trim().startsWith('text/markdown'));
  const isMarkdownExtension = url.pathname.endsWith('.md');
  
  if (isMarkdownAccept || isMarkdownExtension) {
    // Only handle homepage and direct .md variants
    const isHome = url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '/index.md';
    
    if (isHome) {
      const markdown = `# CPT-Dawn

**Interactive Personal Portfolio and Digital Identity**

CPT-Dawn is a high-fidelity landing page featuring interactive UI elements like aurora effects, floating particles, and eye-tracking pupils. Built with vanilla web technologies and optimized for AI agents.

## Professional Links
- **GitHub**: [https://github.com/CPT-Dawn](https://github.com/CPT-Dawn)
- **X (Twitter)**: [https://x.com/CPT_Dawn](https://x.com/CPT_Dawn)
- **LinkedIn**: [https://www.linkedin.com/in/cptdawn/](https://www.linkedin.com/in/cptdawn/)
- **Resume**: [https://github.com/CPT-Dawn/Resume](https://github.com/CPT-Dawn/Resume)

## AI & Agent Capabilities
This site implements modern discovery protocols for AI agents:
- **Markdown Negotiation**: Serving this clean context via \`Accept: text/markdown\`.
- **API Catalog**: Discovery at \`/.well-known/api-catalog\`.
- **A2A Agent Card**: Discovery at \`/.well-known/agent-card.json\`.
- **MCP Server**: SEP-1649 metadata at \`/.well-known/mcp/server-card.json\`.
- **Web Bot Auth**: Identification via \`/.well-known/http-message-signatures-directory\`.
- **OAuth Discovery**: Discovery at \`/.well-known/openid-configuration\`.
- **WebMCP**: Browser-based tool discovery via \`navigator.modelContext\`.
- **Sitemap**: Available at \`/sitemap.xml\`.
`;
      
      return new Response(markdown, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
          'Vary': 'Accept',
          'x-markdown-tokens': '280',
          'Cache-Control': 'public, max-age=3600',
          'Link': '</index.html>; rel="alternate"; type="text/html"'
        }
      });
    }
  }
  
  // Fallback to static assets
  const response = await context.next();
  const contentType = (response.headers.get('Content-Type') || '').toLowerCase();
  
  // Ensure Vary: Accept is present on all HTML responses
  if (contentType.includes('text/html')) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Vary', 'Accept');
    // Advertise the Markdown version
    newHeaders.append('Link', '</index.md>; rel="alternate"; type="text/markdown"');
    // Advertise AI Usage Policy
    newHeaders.set('Content-Signal', 'ai-train=no, search=yes, ai-input=yes');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
  
  return response;
}
