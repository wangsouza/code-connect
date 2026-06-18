# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**code-connect** is a pnpm monorepo with two apps:
- `apps/api` — NestJS REST API (TypeScript), runs on port 3000
- `apps/web` — Vite + TypeScript frontend (no framework, vanilla TS)

## Commands

All commands run from the repo root. Use `pnpm` — this repo uses pnpm workspaces.

```bash
# Install dependencies
pnpm install

# Development (watch mode)
pnpm api:dev        # NestJS API with hot reload
pnpm web:dev        # Vite dev server

# Build
pnpm api:build
pnpm web:build

# Tests
pnpm api:test                          # API unit tests (Jest)
pnpm --filter api test:e2e             # API e2e tests
pnpm --filter api test:cov             # API coverage
pnpm --filter api test -- --testPathPattern=app.controller  # single API test file
pnpm --filter web test                 # web component tests

# Lint / format (API)
pnpm --filter api lint
pnpm --filter api format
```

## Architecture

### Monorepo layout

```
apps/
  api/        NestJS app — src/ holds modules, controllers, services; test/ holds e2e specs
  web/        Vite app — src/ is vanilla TypeScript, no component framework yet
pnpm-workspace.yaml
package.json  root scripts proxy to --filter <app>
```

### API (NestJS)

Standard NestJS module/controller/service pattern. Each feature should live in its own module directory under `apps/api/src/`. The entry point is `main.ts`; `AppModule` is the root module. Jest config lives inside `package.json` (`jest` key); unit test files are co-located with source (`*.spec.ts`), e2e tests live in `apps/api/test/`.

### Web (Vite)

Currently the default Vite TypeScript starter. `src/main.ts` is the entry point. No component framework is installed yet — when one is added (React, Vue, etc.), update this file.

#### Atomic Design structure

Components are organized under `apps/web/src/components/` following Atomic Design:

```
components/
  atoms/        Smallest building blocks — buttons, inputs, labels, icons
  molecules/    Compositions of atoms — form fields, cards, search bars
  organisms/    Complex sections composed of molecules/atoms — headers, feeds, sidebars
  templates/    Page-level layouts wiring organisms together
```

Every component must have a co-located test file (`ComponentName.test.ts` or `.test.tsx`) that covers its essential use case. Tests live alongside the component file.

#### Styling

Tailwind CSS is used for all styling. Do not write custom CSS classes for layout or utility purposes — use Tailwind utility classes directly. Component-specific styles that cannot be expressed with Tailwind may use CSS Modules.

### API (REST principles)

The NestJS API must be strictly RESTful:

- **Resources**: URLs identify resources (nouns), never actions. Use `/posts`, `/users/:id`, not `/getPosts` or `/createUser`.
- **HTTP verbs**: `GET` (read), `POST` (create), `PUT`/`PATCH` (update), `DELETE` (remove). Use `PATCH` for partial updates.
- **Status codes**: Return semantically correct codes — `200 OK`, `201 Created` (with `Location` header), `204 No Content`, `400 Bad Request`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`.
- **Response bodies**: Return the created/updated resource on `POST`/`PUT`/`PATCH`. Never return raw success/failure strings.
- **Versioning**: Prefix all routes with `/v1/` from the start.
- **Pagination**: Collection endpoints must support `page` and `limit` query params and return `{ data, total, page, limit }`.

## Git — Conventional Commits

All commits in both `apps/api` and `apps/web` must follow the [Conventional Commits](https://www.conventionalcommits.org/) spec:

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

**Scope**: use the app name or module — `api`, `web`, `auth`, `posts`, `ui`, etc.

Examples:
```
feat(api): add pagination to GET /v1/posts
fix(web): correct button contrast in dark mode
test(api): cover PostsService.findAll edge cases
refactor(web): extract Avatar into atoms layer
```

Breaking changes: append `!` after the type/scope and add `BREAKING CHANGE:` in the footer.

## Key conventions

- Package manager: **pnpm** only (`.npmrc` and `pnpm-workspace.yaml` are present).
- TypeScript strict mode is enabled in both apps.
- API port is configured via `PORT` env var, defaulting to `3000`.
- Prettier config for the API is in `apps/api/.prettierrc`; ESLint config is `apps/api/eslint.config.mjs` (flat config format).
