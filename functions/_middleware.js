export async function onRequest(context) {
  const { request } = context;
  const accept = request.headers.get('Accept') || '';
  
  if (accept.includes('text/markdown')) {
    const url = new URL(request.url);
    // Support root, index.html, and any .html pages
    if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname.endsWith('.html')) {
      const markdown = `# CPT-Dawn

Interactive personal portfolio and landing page.

## About
CPT-Dawn is a digital identity featuring interactive UI elements (aurora effects, floating particles, and eye-tracking).

## Direct Links
- [GitHub](https://github.com/CPT-Dawn) - Source code and projects.
- [X (Twitter)](https://x.com/CPT_Dawn) - Social updates and microblogging.
- [LinkedIn](https://www.linkedin.com/in/cptdawn/) - Professional network.
- [Resume](https://github.com/CPT-Dawn/Resume) - Detailed professional history.

## Technical Info
This site is built with vanilla HTML/JS/CSS and deployed via Cloudflare Pages. It supports AI Agent discovery via RFC-compliant well-known endpoints.
`;
      return new Response(markdown, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'x-markdown-tokens': '200'
        }
      });
    }
  }
  
  const response = await context.next();
  const contentType = response.headers.get('Content-Type') || '';
  
  // Add Vary: Accept to all HTML responses for proper content negotiation caching
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
