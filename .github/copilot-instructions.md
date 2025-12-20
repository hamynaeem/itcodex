# Copilot Instructions for Softcoder

## Project Overview
- This is an Angular project generated with Angular CLI 21.0.3.
- The main application code is in `src/app/` with feature folders for each route (e.g., `home`, `about`, `contact`, `services`, `website`, `flutter`).
- Static assets are in `src/assets/`.
- Entry point: `src/main.ts`. Global styles: `src/styles.css`.

## Key Workflows
- **Start dev server:** `ng serve` (or `npm start` if configured)
- **Build:** `ng build` (outputs to `dist/`)
- **Unit tests:** `ng test` (uses Vitest)
- **Scaffold components:** `ng generate component <name>`

## Project Structure & Patterns
- Each feature (e.g., `home`, `about`) is a folder in `src/app/` with its own `.ts`, `.html`, `.css`, and `.spec.ts` files.
- Routing is defined in `src/app/app.routes.ts`.
- App configuration is in `src/app/app.config.ts`.
- Use Angular CLI conventions for file naming and structure.
- Prefer Angular CLI commands for generating and managing code.

## Conventions & Practices
- Keep feature logic isolated in its respective folder under `src/app/`.
- Use `.spec.ts` files for unit tests colocated with the code they test.
- Use relative imports within `src/app/`.
- Global assets (e.g., images) go in `src/assets/`.
- Avoid direct DOM manipulation; use Angular templates and bindings.

## Integration & Dependencies
- Angular CLI manages most dependencies and scripts.
- No custom build or test scripts beyond Angular CLI defaults.
- No e2e test framework is set up by default; add as needed.

## Examples
- To add a new feature page:
  1. Run `ng generate component feature-name`.
  2. Add a route in `src/app/app.routes.ts`.
  3. Place assets in `src/assets/` if needed.

## References
- See `README.md` for more CLI usage and workflow details.
- Key files: `src/app/app.routes.ts`, `src/app/app.config.ts`, `src/main.ts`, `src/styles.css`.

---
For more, see the Angular CLI docs: https://angular.dev/tools/cli
