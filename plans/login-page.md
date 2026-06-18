# Plan: Login page (Atomic Design) for apps/web

## Context

`code-connect` needs its first real screen: a **Login page** for the web app. Today `apps/web` is just the Vite + vanilla-TS starter — no framework, no Tailwind, no test runner, and no `components/` structure, even though CLAUDE.md mandates Tailwind, co-located component tests, and an Atomic Design layout.

This plan builds the login page from the supplied mockup (a centered dark card: image banner on the left, login form on the right with social logins and a "Crie seu cadastro" link). It also lays the groundwork so the upcoming **register** page can reuse the same base layout with only a different banner and form fields — without re-architecting.

**Decisions confirmed with the user:** install both Tailwind + Vitest; Login button is a UI-only stub (no API call); the login page replaces the Vite starter as the entry view. Components are **factory functions** (`(props) => HTMLElement`) since there is no UI framework.

## 1. Scaffold infrastructure

**Tailwind CSS** (Vite v8 → use the `@tailwindcss/vite` plugin, Tailwind v4):
- Add devDeps: `tailwindcss`, `@tailwindcss/vite`.
- Create `apps/web/vite.config.ts` registering the Tailwind plugin (none exists today).
- Replace `apps/web/src/style.css` body with `@import "tailwindcss";` plus an `@theme` block defining brand tokens derived from the mockup:
  - `--color-brand-green` ≈ `#86efac` (primary button / accent text)
  - `--color-surface` ≈ `#1c2120` (card), `--color-bg` ≈ `#0a0d0c` (page), input gray ≈ `#8b9491`.
- Delete the leftover starter CSS rules (hero/docs/counter) — they become dead once `main.ts` is rewritten.

**Vitest + Testing Library**:
- Add devDeps: `vitest`, `jsdom`, `@testing-library/dom`, `@testing-library/jest-dom`.
- Add `apps/web/vitest.config.ts` (or `test` key in `vite.config.ts`) with `environment: 'jsdom'`, `globals: true`, and a setup file importing `@testing-library/jest-dom`.
- Add scripts to `apps/web/package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`. (Root already proxies `pnpm --filter web test`.)

## 2. Atomic Design component structure

Create under `apps/web/src/components/`. Every component is a factory returning an `HTMLElement`, with a co-located `*.test.ts`.

```
atoms/
  Button/Button.ts            primary/full-width green button, accepts label, type, onClick, icon
  Input/Input.ts              text/password input, accepts type, name, placeholder, value
  Label/Label.ts              field label text
  Checkbox/Checkbox.ts        "Lembrar-me" checkbox + label
  TextLink/TextLink.ts        styled anchor (e.g. "Esqueci a senha", "Crie seu cadastro!")
  Logo/Logo.ts                code-connect wordmark (used on banner if needed)
molecules/
  FormField/FormField.ts      Label + Input composed (one labelled field)
  SocialLogins/SocialLogins.ts  github.png + gmail.png buttons with captions
  RememberForgot/RememberForgot.ts  Checkbox + "Esqueci a senha" link on one row
  Divider/Divider.ts          "ou entre com outras contas" rule with centered text
organisms/
  AuthForm/AuthForm.ts        generic form shell: takes fields[], submit label, footer slot, onSubmit
  LoginForm/LoginForm.ts      composes FormField(email) + FormField(senha) + RememberForgot
                              + submit Button + Divider + SocialLogins + signup TextLink
templates/
  AuthLayout/AuthLayout.ts    REUSE CORE: page wrapper + centered card; props { banner: string, formEl: HTMLElement }
                              renders banner image (left) + form (right), responsive (stacks on small screens)
pages/
  LoginPage/LoginPage.ts      wires AuthLayout({ banner: '/banner-login.png', formEl: LoginForm(...) })
```

**Reuse design for the register page (build now, use later):**
- `AuthLayout` knows nothing about login — it only positions a banner + an arbitrary form element. Register will call `AuthLayout({ banner: '/banner-register.png', formEl: RegisterForm(...) })`.
- `AuthForm` is the field-agnostic form engine; `LoginForm` (and future `RegisterForm`) just supply their field configs and footer. Atoms/molecules (`FormField`, `Button`, `SocialLogins`, `Divider`) are fully shared.

## 3. Wire up entry view

- Rewrite `apps/web/src/main.ts` to mount `LoginPage()` into `#app` (drop the starter HTML, `counter.ts`, hero/vite/ts logo imports).
- Remove now-unused starter files: `src/counter.ts` and `src/assets/{hero.png,vite.svg,typescript.svg}` (verify no other refs first).
- Update `<title>` in `apps/web/index.html` to "Login · code-connect".

## 4. Submit behavior (stub)

`LoginForm`'s `onSubmit` does `e.preventDefault()`, gathers `{ emailOrUser, password, remember }`, runs minimal required-field validation (mark empty fields), and `console.log`s the payload. A `// TODO: wire to /v1/auth once endpoint exists` comment marks the integration point. No network call.

## Critical files

- New: `apps/web/vite.config.ts`, `apps/web/vitest.config.ts`, `apps/web/src/test-setup.ts`
- New: all files under `apps/web/src/components/**` (+ co-located `*.test.ts`)
- Edit: `apps/web/package.json` (deps + test scripts), `apps/web/src/style.css` (Tailwind import + `@theme`), `apps/web/src/main.ts`, `apps/web/index.html`
- Assets already present: `apps/web/public/{banner-login,github,gmail}.png`

## Styling notes (from mockup)

- Page: full-screen dark bg with faint chain-link watermark (optional, can skip initially), card centered, rounded-2xl, subtle border.
- Two-column inside card: left = banner image (rounded), right = form. Stacks vertically below `md`.
- Inputs: gray fill, rounded, full width. Button: bright green, dark bold text, full width, right arrow icon.
- Tailwind utilities only (per CLAUDE.md) — no custom layout CSS classes.

## Verification

1. `pnpm install` (pulls new devDeps).
2. `pnpm web:dev` → open the served URL; confirm the login page matches the mockup (banner left, form right, green button, social logos, signup link) and is responsive when narrowed.
3. Click Login with empty fields → validation flags; fill fields → payload appears in console.
4. `pnpm --filter web test` → all co-located component tests pass (each atom/molecule/organism renders and its key behavior — button click, input value, form submit — is asserted).
5. `pnpm web:build` → type-check + production build succeed (strict tsconfig: no unused locals/params).
