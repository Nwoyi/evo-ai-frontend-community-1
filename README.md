<h1 align="center">Hyvelox Frontend</h1>

<p align="center">
  Multi-channel AI customer-support web app — built with React, TypeScript and Vite.
</p>

<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License: Apache 2.0" /></a>
  <a href="https://hyvelox.com"><img src="https://img.shields.io/badge/Site-hyvelox.com-1F7A8C" alt="Site" /></a>
</p>

<p align="center">
  <a href="https://hyvelox.com">Website</a> &middot;
  <a href="mailto:support@hyvelox.com">Support</a>
</p>

---

## About

**Hyvelox Frontend** is the web interface of Hyvelox — a multi-channel AI
customer-support SaaS providing the user experience for conversations, contacts,
agents, channels, automations, reports, and settings.

Built with React 19, TypeScript, Vite, TailwindCSS 4 and an in-house design
system, it delivers a fast, accessible, dark-mode-first experience aligned with
the Hyvelox visual identity.

## Upstream

Hyvelox Frontend is a brand-modified fork of
[Evo CRM Frontend](https://github.com/evolution-foundation/evo-ai-frontend-community),
originally developed by Evolution Foundation and licensed under the Apache
License 2.0. All Evolution Foundation trademarks and brand assets have been
removed from the user interface per the upstream Trademark and Brand Assets
Policy §4.2. See [NOTICE](./NOTICE) for full attribution.

The Hyvelox stack is **per-customer single-tenant** — one Docker stack per
customer, no shared multi-tenancy at the application layer.

---

## Tech Stack

| Component | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build | Vite |
| Routing | React Router 7 |
| Styling | TailwindCSS 4 |
| Design system | `@evoapi/design-system` (vendored, internal) |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| WebSocket | ActionCable |
| State | Zustand |
| i18n | i18next |
| Dates | date-fns |

---

## Quick Start

### Prerequisites

- **Node.js** 18+
- **pnpm** 8+
- A running Hyvelox backend stack (see the umbrella `hyvelox` repository)

### Installation

```bash
git clone git@github.com:Nwoyi/evo-ai-frontend-community-1.git hyvelox-frontend
cd hyvelox-frontend

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your settings
```

Set the API URL in `.env.local`:

```env
VITE_API_URL=http://localhost:3000
```

### Running

```bash
pnpm run dev          # Dev server with hot reload
pnpm run build        # Production build
pnpm run preview      # Preview the production build
```

The development server runs on `http://localhost:5173`.

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm run dev` | Development server with hot reload |
| `pnpm run build` | Production build |
| `pnpm run preview` | Preview production build |
| `pnpm run test` | Run tests with Vitest |
| `pnpm run test:watch` | Tests in watch mode |
| `pnpm run test:coverage` | Tests with coverage report |
| `pnpm run eslint` | Run ESLint |
| `pnpm run eslint:fix` | Auto-fix ESLint issues |

---

## Architecture

### Project structure

```
src/
├── assets/           # Static resources (images, icons)
├── components/       # Reusable components
│   ├── base/         # Custom components (badges, buttons)
│   ├── layout/       # Headers, sidebars, notifications
│   └── ui/           # Design system primitives
├── contexts/         # React contexts (auth, notifications, theme)
├── hooks/            # Custom hooks
├── pages/            # Page components organized by domain
│   ├── Auth/         # Login, registration, recovery
│   ├── Customer/     # Contacts, conversations
│   ├── Admin/        # Administrative area
│   └── Settings/     # System settings
├── routes/           # Route configuration
├── services/         # API services by feature
├── styles/           # Global styles
├── types/            # TypeScript types
├── utils/            # Utilities
└── constants/        # Constants and configuration
```

### Path aliases

Configured in TypeScript and Vite for clean imports:

```typescript
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
```

Aliases: `@/components`, `@/contexts`, `@/hooks`, `@/services`, `@/pages`, `@/types`, `@/utils`, `@/styles`, `@/assets`.

For full code conventions, see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Features

- Bearer token authentication
- Real-time WebSocket notifications via ActionCable
- Dark/light theme with full design system
- Internationalization (i18n) — EN, ES, FR, IT, PT, PT-BR
- Conversations and chat with WhatsApp, Email, Web Widget channels
- Contacts management with filters, search and infinite scroll
- Channels configuration (WhatsApp, Email, SMS, etc.)
- Reports and analytics dashboards
- Toast notifications and loading states
- Responsive layout with collapsible sidebar

---

## Documentation

| Resource | Link |
|---|---|
| Website | [hyvelox.com](https://hyvelox.com) |
| Contributing | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| Security | [SECURITY.md](./SECURITY.md) |
| Trademarks | [TRADEMARKS.md](./TRADEMARKS.md) |
| Upstream attribution | [NOTICE](./NOTICE) |

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for
guidelines on how to submit issues, propose features, and open pull requests.

---

## Security

For security issues, **do not open a public issue**. Use GitHub's private
vulnerability reporting on this repository, or email **support@hyvelox.com**.
See [SECURITY.md](./SECURITY.md) for details.

---

## License

Hyvelox Frontend is licensed under the Apache License 2.0. See [LICENSE](./LICENSE).

This project is a brand-modified fork of Evo CRM Frontend
(© Evolution Foundation, Apache-2.0). Full attribution is in [NOTICE](./NOTICE).

## Trademarks

"Hyvelox" is a trademark of Hyvelox. See [TRADEMARKS.md](./TRADEMARKS.md) for
the brand assets policy.

"Evolution Foundation", "Evolution" and "Evo CRM Frontend" are trademarks of
Evolution Foundation and are referenced solely for accurate attribution.

---

<p align="center">
  © 2026 Hyvelox
</p>
