# StackSpend Backend

This backend folder is a production-grade audit API for the StackSpend application.

It includes:

- rule-based audit engine
- Supabase persistence layer
- Anthropic summary generation
- shareable audit pages
- strong validation with Zod
- endpoint rate limiting
- Vitest coverage for API and core logic

## Folder layout

- `src/app/` contains API routes and the shared audit page
- `src/lib/` contains business logic and utilities
- `src/services/` contains third-party integrations
- `src/db/` contains schema and migrations
- `src/tests/` contains unit tests
