# Product Validator

Product Validator is an AI-assisted web application by [Mehr Kraft Digital](https://mehrkraftdigital.com) that helps founders turn an early product idea into a concise, practical MVP assessment.

Users describe an idea and receive structured feedback covering:

- Problem and opportunity
- Target users
- MVP scope
- Key features
- Risks and challenges
- A Go / No-Go recommendation

After the analysis, the app directs interested founders to Mehr Kraft Digital's human-led [grant assessment service](https://mehrkraftdigital.com/grant-assessment), where experts review their case for relevant Austrian and EU funding opportunities.

> **Demo notice:** The application uses OpenRouter's free model tier for demonstration purposes. Responses may be slow or occasionally unavailable. If a request fails, try again after a few minutes.

## Technology stack

- **Next.js 16** with the App Router
- **React 19** and TypeScript
- **Tailwind CSS 4** with shadcn/ui primitives
- **OpenRouter Chat Completions API** using the `openrouter/free` model route
- **Lucide React** for interface icons
- **Vercel Analytics** in production

## Getting started

### Requirements

- Node.js 20 or newer
- pnpm (recommended because the repository includes `pnpm-lock.yaml`)
- An OpenRouter API key

### Install dependencies

```bash
pnpm install
```

### Configure environment variables

Create `.env.local` in the project root:

```env
OPENAI_API_KEY=your_openrouter_api_key
```

The variable retains its existing name for compatibility, but the value must be an OpenRouter API key. Never expose it in client-side code or commit it to the repository.

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Production checks

```bash
pnpm lint
pnpm build
pnpm start
```

## Project architecture

The application follows the Next.js App Router structure. The page is server-rendered by default, while interactive behavior is isolated in client components.

```text
.
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # Server-side OpenRouter API endpoint
│   ├── globals.css               # Tailwind theme tokens and global styles
│   ├── layout.tsx                # Root layout, metadata, analytics, cookie consent
│   └── page.tsx                  # Product Validator page and hero content
├── components/
│   ├── analyzing-loader.tsx      # Animated analysis progress state
│   ├── cookie-consent.tsx        # GDPR-style consent banner and preferences
│   ├── grant-cta-banner.tsx      # Grant assessment conversion banner
│   ├── results-grid.tsx          # Six-card analysis result presentation
│   ├── validator-form.tsx        # Idea input, submission, loading, and errors
│   ├── theme-provider.tsx        # Theme provider utility
│   └── ui/                       # Reusable shadcn/ui components
├── hooks/                        # Shared client hooks
├── lib/
│   └── utils.ts                  # Shared class-name utility
├── public/                       # Static assets and icons
├── components.json               # shadcn/ui configuration
├── next.config.mjs               # Next.js configuration
├── package.json                  # Scripts and dependencies
└── tsconfig.json                 # TypeScript configuration
```

## Request and rendering flow

1. `app/page.tsx` renders the marketing shell and mounts `ValidatorForm`.
2. `components/validator-form.tsx` stores the current idea, validates the input length, and submits a `POST` request to `/api/analyze`.
3. While the request is pending, `components/analyzing-loader.tsx` displays the staged analysis animation.
4. `app/api/analyze/route.ts` validates the request, reads the server-only `OPENAI_API_KEY`, and calls OpenRouter.
5. The route returns the structured JSON response to the browser.
6. `components/results-grid.tsx` renders the six analysis categories.
7. `components/grant-cta-banner.tsx` presents the next conversion step and links to the expert grant assessment service.

The API key is only used in the Route Handler, so it is not sent to the browser. User ideas are submitted for the current analysis and are not persisted by this application.

## Cookie consent

`components/cookie-consent.tsx` provides a browser-only consent experience with:

- Strictly necessary cookies enabled by default
- Optional analytics and marketing categories
- Accept all, reject all, and save preferences actions
- Preferences stored locally for 30 days under `mkd_cookie_consent`
- A settings dialog that allows users to revisit category choices

The consent UI is mounted from `app/layout.tsx`, so it is available consistently across routes.

## Conversion flow

The primary business flow is intentionally simple:

1. Help a founder clarify and assess an idea.
2. Explain the result in an actionable format.
3. Present the human-led grant assessment as the next step.
4. Send interested users to `https://mehrkraftdigital.com/grant-assessment`.

The grant assessment is not automated: Mehr Kraft Digital's grant acquisition experts review each case individually and identify relevant Austrian and EU opportunities.

## Legal and external links

The footer links to the externally hosted:

- [Imprint](https://mehrkraftdigital.com/imprint)
- [Privacy Policy](https://mehrkraftdigital.com/privacy)
- [Terms & Conditions](https://mehrkraftdigital.com/terms)

## Deployment

The project is suitable for deployment on Vercel. Add `OPENAI_API_KEY` to the deployment environment variables before using the analyzer in production. Because the app calls a third-party AI service, configure an appropriate rate limit and review OpenRouter's current model, usage, and data policies before treating the demo as a production service.

## License

No open-source license has been specified for this project. Contact Mehr Kraft Digital before redistributing or reusing the code outside the project.

## Maintainer

Mehr Kraft Digital Riazi e.U. — [mehrkraftdigital.com](https://mehrkraftdigital.com)

For grant support, visit [Grant Assessment](https://mehrkraftdigital.com/grant-assessment).

## Security note

Do not commit `.env.local`, API keys, or other credentials. Keep secrets in Vercel project environment variables or the local environment file excluded by Git.

The API route currently expects the model to return valid JSON. If the upstream response is malformed, the request can fail; the UI exposes the failure so the user can retry.

## Browser support

The interface is designed for current evergreen desktop and mobile browsers. Cookie preferences rely on browser `localStorage`; if storage is disabled, the consent prompt may appear again on future visits.

## Useful scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm lint` | Run ESLint |
| `pnpm build` | Create a production build |
| `pnpm start` | Start the production server |
| `pnpm install` | Install dependencies from the lockfile |

## Architectural principles

- Keep the OpenRouter credential server-side.
- Keep interactive state in focused client components.
- Keep presentation concerns separate from the API route.
- Reuse shared design tokens from `app/globals.css`.
- Prefer semantic HTML and accessible controls.
- Keep the conversion path visible without interrupting the core validation task.
- Avoid persisting idea content unless a future product requirement explicitly adds secure storage and an appropriate privacy model.

## Future improvements

Potential production hardening and product extensions include:

- Add server-side rate limiting and abuse protection.
- Validate the AI response with a schema before returning it to the client.
- Add request timeouts and retry handling for upstream failures.
- Add observability for latency and error rates without collecting idea content unnecessarily.
- Add authenticated history only after defining retention, deletion, and GDPR data-subject workflows.
- Move the environment variable to a clearer name such as `OPENROUTER_API_KEY` in a coordinated migration.

---

Built with Next.js, OpenRouter, and Vercel for Mehr Kraft Digital.

**Last updated:** October 2026
