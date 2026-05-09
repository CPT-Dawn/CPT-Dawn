export async function onRequest(context) {
  const { request } = context;
  const accept = request.headers.get('Accept') || '';
  
  // Task 1: Markdown Negotiation (RFC 7231)
  if (accept.includes('text/markdown')) {
    const url = new URL(request.url);
    
    // Target homepage and basic variants
    if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '/index.md') {
      const markdown = `# CPT-Dawn

Interactive personal portfolio and digital identity for CPT-Dawn.

## About
A high-fidelity landing page featuring interactive UI elements like aurora effects, floating particles, and eye-tracking pupils. Built with vanilla web technologies.

## Professional Links
- **GitHub**: [https://github.com/CPT-Dawn](https://github.com/CPT-Dawn)
- **X (Twitter)**: [https://x.com/CPT_Dawn](https://x.com/CPT_Dawn)
- **LinkedIn**: [https://www.linkedin.com/in/cptdawn/](https://www.linkedin.com/in/cptdawn/)
- **Resume**: [https://github.com/CPT-Dawn/Resume](https://github.com/CPT-Dawn/Resume)

## Agent Capabilities
- **WebMCP**: Browser-based tool discovery.
- **API Catalog**: Discovery at /.well-known/api-catalog
- **Sitemap**: Available at /sitemap.xml
`;
      
      return new Response(markdown, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'x-markdown-tokens': '200',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
  }
  
  const response = await context.next();
  const contentType = response.headers.get('Content-Type') || '';
  
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
