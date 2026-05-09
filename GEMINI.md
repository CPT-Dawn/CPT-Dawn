# CPT-Dawn Personal Website

## Project Overview
This project is a personal portfolio/landing page for "CPT-Dawn". It is a static website consisting primarily of an `index.html` file that features interactive animations (aurora, floating particles, trailing eyes) and links to external professional profiles (GitHub, X, LinkedIn, Resume). The project is configured to be deployed using Cloudflare Pages/Workers via `wrangler.jsonc`.

**Main Technologies:**
- HTML, CSS, JavaScript (Vanilla)
- Tailwind CSS (via CDN)
- Cloudflare Wrangler (Deployment)

## Building and Running
The project does not require a build step as it serves static assets directly from the root directory.

To run the project locally for development, you can use Cloudflare Wrangler:
```bash
npx wrangler dev
```

To deploy the project:
```bash
npx wrangler pages deploy .
# or
npx wrangler deploy
```
*(Verify specific deployment command based on the Cloudflare project setup)*

## Development Conventions
- **Simplicity:** The project currently avoids complex build tools (no Webpack, Vite, or npm scripts) and relies on vanilla web technologies in a single HTML file.
- **Styling:** Custom CSS is used for complex animations and visual effects, while Tailwind CSS is imported via CDN for utility classes.
- **Deployment:** The `wrangler.jsonc` file configures the root directory `.` to be served as static assets.
