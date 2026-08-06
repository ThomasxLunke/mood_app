# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start Next.js dev server (http://localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # next lint (config: .eslintrc.json, extends next/core-web-vitals)
npm run test     # run all tests via vitest
npx vitest run tests/home.test.tsx   # run a single test file
npx vitest -t "Home"                 # run tests matching a name
```

Prisma (Postgres via `DATABASE_URL`):
```bash
npx prisma generate      # regenerate client after editing prisma/schema.prisma
npx prisma migrate dev   # create/apply a migration in development
npx prisma studio        # browse the database
```

There is no separate test config file for scripts — Vitest is configured in [vite.config.ts](vite.config.ts) (not `vitest.config.ts`), with `setupFiles: 'setupTests'` ([setupTests.ts](setupTests.ts)) and test globs `**/__tests__/**` and `**/*.test.[jt]sx?`.

## Architecture

This is a Next.js 13 **App Router** journaling app: users write journal entries, an LLM analyzes each entry for mood/sentiment, and results are charted over time.

**Route structure** (`app/`):
- `app/layout.tsx` — root layout, wraps everything in `ClerkProvider` (French localization via `frFR`). No visual chrome here.
- `app/page.tsx` — public landing page. Redirects to `/journal` if signed in, else `/new-user`.
- `app/new-user/page.tsx` — on first login, lazily creates the local `User` row (keyed by Clerk `clerkId`) if one doesn't exist yet, then redirects to `/journal`. This is the only place `User` rows are created.
- `app/(dashboard)/` — route group with its own `layout.tsx` providing the sidebar/header/dark-mode chrome (`AppSidebar`, `DarkModeToggle`, `UserButton`, `ThemeProvider`). Contains `journal/`, `journal/[id]/`, and `history/`.
- `app/api/journal/route.ts` (POST) and `app/api/journal/[id]/route.ts` (PATCH) — create/update a journal entry. Both synchronously call `analyze()` (LLM call) after writing the entry, then upsert the resulting `Analysis` row before responding — entry save latency is tied to LLM latency.
- `app/api/question/route.ts` (POST) — RAG-style Q&A over a user's own journal entries via `qa()`.

**Auth**: Clerk (`@clerk/nextjs`). `middleware.ts` gates all routes except `/` via `authMiddleware`. Server code gets the current app-level `User` via `getUserByClerkID()` in [utils/auth.ts](utils/auth.ts), which looks up Prisma's `User` by Clerk's `userId` — this throws if the `User` row doesn't exist yet, so it depends on the `/new-user` flow having run first.

**Data model** ([prisma/schema.prisma](prisma/schema.prisma)): `User` 1–N `JournalEntry` 1–1 `Analysis`. `Analysis` holds the LLM output: `mood`, `summary`, `subject`, `color` (hex string used directly as a CSS background), `negative` (bool), `sentimentScore` (float, -10..10). `JournalEntry` has a `@@unique([userId, id])` composite key, which is why entry lookups/updates key on `{ userId_id: { userId, id } }` rather than plain `id`.

**AI layer** ([utils/ai.ts](utils/ai.ts)): built on `langchain` (0.0.92, old API surface — imports like `langchain/llms/openai`, `langchain/prompts`) against OpenAI's `gpt-3.5-turbo`.
- `analyze(content)` — prompts the model to return structured JSON validated against a Zod schema (`StructuredOutputParser`), matching the `Analysis` model's fields. Called from both journal API routes after every create/update.
- `qa(question, entries)` — embeds all of a user's entries in an in-memory vector store (`MemoryVectorStore` + `OpenAIEmbeddings`), retrieves relevant ones, and answers via `loadQARefineChain`. Called from `app/api/question/route.ts`.
- `cohere-ai` is a listed dependency but unused in `utils/ai.ts` — don't assume it's wired up anywhere.

**Client data flow**: Client components (`Editor`, `NewEntryCard`, `Question`) call thin fetch wrappers in [utils/api.ts](utils/api.ts) (`createNewEntry`, `updatedEntry`, `askQuestion`) rather than calling API routes directly. `Editor.tsx` autosaves entry content via `react-autosave` and re-renders the `Analysis` sidebar with whatever the PATCH response returns (fresh LLM output each save).

**UI**: shadcn/ui ("new-york" style, see [components.json](components.json)) — generated primitives live in `components/ui/` and should be treated as vendored (regenerate via shadcn CLI rather than hand-editing internals when possible). App-specific components are flat in `components/`. Styling is Tailwind; dark mode via `next-themes` (`ThemeProvider`, `DarkModeToggle`).

**Locale note**: UI copy is a mix of French (dashboard: "Journal", "Historique", "Nouvelle entrée", `frFR` Clerk localization) and English (landing page, some code comments). [tests/home.test.tsx](tests/home.test.tsx) asserts English landing copy that no longer matches `app/page.tsx`'s French copy — that test is currently stale/failing, not a reference for current UI text.
