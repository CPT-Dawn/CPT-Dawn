export async function onRequest(context) {
  const request = context.request;
  const accept = request.headers.get('Accept') || '';
  
  if (accept.includes('text/markdown')) {
    const url = new URL(request.url);
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const markdown = `# CPT-Dawn

Direct links:
- [GitHub](https://github.com/CPT-Dawn)
- [X](https://x.com/CPT_Dawn)
- [LinkedIn](https://www.linkedin.com/in/cptdawn/)
- [Resume](https://github.com/CPT-Dawn/Resume)
`;
      return new Response(markdown, {
        headers: {
          'Content-Type': 'text/markdown',
          'x-markdown-tokens': '100'
        }
      });
    }
  }
  
  return await context.next();
}
